import type {NextApiRequest, NextApiResponse} from "next";

import mongoose from "mongoose";

import {connect, disconnect} from "../../../database/db";
import EntryModel from "../../../models/Entry";
import {Entry} from "../../../interfaces/entry";

type Data = {message: string} | Entry | null;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {id} = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({message: "El ID no es valido" + id});
  }

  if (req.method === "PUT") {
    return updateEntry(req, res);
  }

  if (req.method === "GET") {
    return getEntryById(req, res);
  }

  res.status(400).json({message: "Metodo no existe"});
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {id} = req.query;

  try {
    await connect();

    const entryToUpdate = await EntryModel.findById(id);

    if (!entryToUpdate) {
      await disconnect();

      return res.status(400).json({message: "No hay entrada con ese ID" + id});
    }

    const {description = entryToUpdate.description, status = entryToUpdate.status} = req.body;

    const updatedEntry = await EntryModel.findByIdAndUpdate(
      id,
      {description, status},
      {runValidators: true, new: true},
    );

    return res.status(200).json(updatedEntry);
  } catch (error: any) {
    await disconnect();

    return res.status(400).json({message: error.errors.status.message});
  }
};

const getEntryById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {id} = req.query;

  try {
    await connect();

    const entryById = await EntryModel.findById(id);

    if (!entryById) {
      await disconnect();

      return res.status(400).json({message: "No hay entrada con el ID: " + id});
    }

    return res.status(200).json(entryById);
  } catch (error) {
    console.log({error});
  }
};
