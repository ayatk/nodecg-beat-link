import {
  CreateNodecgInstance,
  CreateNodecgConstructor,
} from "ts-nodecg/browser"
import { ReplicantMap } from "../nodecg"

declare global {
  const nodecg: CreateNodecgInstance<
    "beat-link",
    undefined,
    ReplicantMap,
    undefined
  >
  const NodeCG: CreateNodecgConstructor<
    "beat-link",
    undefined,
    ReplicantMap,
    undefined
  >
}
