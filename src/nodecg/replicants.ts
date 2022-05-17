import { Track } from "./generated"

export type ReplicantMap = {
  "now-playing": Track
}

export const replicantDefaultValues: ReplicantMap = {
  "now-playing": {
    title: "",
    artist: "",
    album: "",
    imageUrl: "",
  },
}
