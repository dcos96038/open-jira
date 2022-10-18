import type {NextApiRequest, NextApiResponse} from "next";

import {connect, disconnect} from "../../../database/db";
import {Entry} from "../../../interfaces/entry";
import EntryModel from "../../../models/Entry";

type Data = {message: string} | Entry[] | Entry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") return getEntries(res);
  if (req.method === "POST") return postEntry(req, res);

  res.status(400).json({message: "No existe endpoint"});
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await connect();
  const entries = await EntryModel.find().sort({createdAt: "ascending"});

  await disconnect();

  res.status(200).json(entries);
};

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {description = ""} = req.body;

  const newEntry = new EntryModel({
    description,
    createdAt: Date.now(),
  });

  try {
    await connect();
    await newEntry.save();
    await disconnect();

    return res.status(201).json(newEntry);
  } catch (error) {
    await disconnect();
    console.log(error);

    return res.status(500).json({message: "Algo salio mal, revisar consola del servidor"});
  }
};
