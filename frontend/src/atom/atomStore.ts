import { atom } from "jotai";
import { Dayjs } from "dayjs";

export type TaskType = {
  task: string;
  assignedto: string;
  deadLine: Dayjs;
};

export const taskAtom = atom<TaskType []>([]);