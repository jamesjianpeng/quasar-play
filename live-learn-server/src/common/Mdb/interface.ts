import { type } from "os";

export interface IMdb {
  url: string
  key: string
}

export type IMdbOptions = Array<IMdb>
