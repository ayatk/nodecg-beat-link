import { bringOnline, MixstatusProcessor } from "prolink-connect"
import { State } from "prolink-connect/lib/status/types"
import { NodeCG } from "./nodecg"

export const prolink = (nodecg: NodeCG) => {
  const logger = new nodecg.Logger("prolink")
  // const nowPlayingStatus = nodecg.Replicant("now-playing")

  const connect = async () => {
    // This will begin listening for prolink devices on the network that send
    // regular announcment packets over UDP.
    //
    // This will FAIL if Rekordbox is running on the same computer, or a second
    // instance of the prolink-connect library is running on the same machine.
    logger.info("Bringing the network online")
    const network = await bringOnline()

    // Once online we can listen for appearning on the network
    network.deviceManager.on("connected", (device) =>
      logger.info("New device on network:", device.name)
    )

    // To configure the online network to be "connected" we must need to specify
    // what network device to use to announce ourselves as a "virtual" device
    // onto the network, and what ID we want to announce ourselves as. By
    // announcing ourselves this will cause other devices to send us more detailed
    // information.
    //
    // There are two ways to configure the network:
    //
    // 1. Automatically - You can ask prolink-connect to wait for a device to
    //    appear on the network to determine what network interface devices exist
    //    on. Device ID 5 will be used in auto configure mode.
    //
    // 2. Manually - In this case you will need to manually specify the network
    //    device and device ID.
    //
    // NOTES on the Device ID:
    //
    //  It's recommended that you use a Device ID of `5` for the virtual device.
    //  Using a ID between 1 - 6 will take up ONE SLOT on the network that normally
    //  a CDJ would occupy. When a 1-6 ID is used You may ONLY HAVE 5 CDJs on the
    //  network. Attempting to connect a 6th CDJ will conflict with the virtual
    //  device announced on the network by prolink-connect. (On models older than
    //  2000s the rande is 1-4.)
    //
    //  There are some cases where you may want your virtual device to announce
    //  itself with "real" device ID, but this library does not currently support
    //  the scenarios that would requrie that (Becoming master and sending a master
    //  tempo)

    // 1. AUTO CONFIGURATION
    logger.info("Auto configuring the network")
    await network.autoconfigFromPeers()

    // 2. MANUAL CONFIGURATION
    //
    // const configuredIface = getNetworkInterfaceInfoIPv4()
    // network.configure({vcdjId: 2, iface: configuredIface})

    // We can now connect to the network.
    //
    // This will begin announcing ourself on the network, as well as enable various
    // services on the network service object.
    logger.info("Connecting to the network")
    network.connect()

    // If you're using trypescript, you can now type guard [0] to coerce the type
    // to ProlinkNetworkConnected, marking all services as non-null.
    //
    // [0]: https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates
    //
    // You don't need to do this if you're not using trypescript
    if (!network.isConnected()) {
      logger.error("Failed to connect to the network")
      return
    }
    const processor = new MixstatusProcessor()
    network.statusEmitter.on("status", (s) => processor.handleState(s))
    processor.on("nowPlaying", async (state: State) => {
      const { trackDeviceId, trackId, trackSlot, trackType } = state
      const track = await network.db.getMetadata({
        trackId,
        trackType,
        trackSlot,
        deviceId: trackDeviceId,
      })

      logger.info(`${track?.artist?.name} - ${track?.title}`)
    })
  }

  void connect()
}
