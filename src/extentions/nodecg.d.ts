import {
  CreateNodecgInstance,
  CreateNodecgConstructor,
} from "ts-nodecg/browser"
import { ReplicantMap } from "../nodecg"

export type nodecg = CreateNodecgInstance<
  "beat-link",
  undefined,
  ReplicantMap,
  undefined
>
export type NodeCG = CreateNodecgConstructor<
  "beat-link",
  undefined,
  ReplicantMap,
  undefined
>
