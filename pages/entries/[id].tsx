import {
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import React, {ChangeEvent, useContext, useMemo, useState} from "react";
import {GetServerSideProps, NextPage} from "next";
import {isValidObjectId} from "mongoose";

import Layout from "../../components/layouts/Layout";
import {Entry, EntryStatus} from "../../interfaces/entry";
import {getEntryById} from "../../database/dbEntries";
import {EntriesContext} from "../../context/entries/EntriesContext";
import {getFormattedDistanceToNow} from "../../utils/dateFunctions";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
  entry: Entry;
}

const EntryPage: NextPage<Props> = ({entry}) => {
  const {updateEntry} = useContext(EntriesContext);

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };

    updateEntry(updatedEntry, true);
  };

  return (
    <Layout title={inputValue.substring(0, 20)}>
      <Grid container justifyContent="center" sx={{marginTop: 2}}>
        <Grid item md={6} sm={8} xs={12}>
          <Card>
            <CardHeader
              subheader={`Creada hace ${getFormattedDistanceToNow(entry.createdAt)}`}
              title={`Entrada: ${inputValue}`}
            />
            <CardContent>
              <TextField
                autoFocus
                fullWidth
                multiline
                error={isNotValid}
                helperText={isNotValid && "Ingrese un valor"}
                label="Nueva Entrada"
                placeholder="Nueva Entrada"
                sx={{marginTop: 2, marginBottom: 1}}
                value={inputValue}
                onBlur={() => setTouched(true)}
                onChange={onInputChange}
              />
              <FormControl sx={{marginTop: 2}}>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      control={<Radio />}
                      label={capitalize(option)}
                      value={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                disabled={inputValue.length <= 0}
                startIcon={<SaveAsOutlinedIcon />}
                variant="contained"
                onClick={onSave}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton sx={{position: "fixed", bottom: 30, right: 30, backgroundColor: "error.dark"}}>
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const {id} = params as {id: string};

  const entry = await getEntryById(id);

  if (!isValidObjectId(id)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
