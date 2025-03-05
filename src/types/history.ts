import { Message } from "./message";

export interface IHistory {
  createdAt: string;
  uniqueIdentifier: string;
  updatedAt: string;
  __v: number;
  _id: string;
  messages: Array<Message & { _id: string }>;
}
