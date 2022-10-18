import {isValidObjectId} from "mongoose";

import {Entry} from "../interfaces/entry";
import EntryModel from "../models/Entry";

import {connect, disconnect} from "./db";

export const getEntryById = async (id: string): Promise<Entry | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }

  await connect();
  const entry = await EntryModel.findById(id).lean();

  await disconnect();

  return JSON.parse(JSON.stringify(entry));
};
