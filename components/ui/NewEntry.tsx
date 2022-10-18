import {Box, Button, TextField} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import {ChangeEvent, useContext, useState} from "react";

import {EntriesContext} from "../../context/entries/EntriesContext";
import {UIContext} from "../../context/ui/UIContext";

const NewEntry: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const {addNewEntry} = useContext(EntriesContext);
  const {isAddingEntry, setIsAddingEntry} = useContext(UIContext);

  const onTextFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    setInputValue("");
    setTouched(false);
    setIsAddingEntry(false);
  };

  return (
    <Box sx={{marginBottom: 2, paddingX: 2}}>
      {isAddingEntry ? (
        <>
          <TextField
            autoFocus
            fullWidth
            multiline
            error={inputValue.length <= 0 && touched}
            helperText={inputValue.length <= 0 && touched && "Ingrese un texto"}
            label="Nueva Entrada"
            placeholder="Nueva Entrada"
            sx={{marginTop: 2, marginBottom: 1}}
            value={inputValue}
            onBlur={() => setTouched(true)}
            onChange={onTextFieldChange}
          />
          <Box display="flex" justifyContent="space-between">
            <Button color="error" variant="outlined" onClick={() => setIsAddingEntry(false)}>
              Cancelar
            </Button>
            <Button color="secondary" endIcon={<SaveIcon />} variant="outlined" onClick={onSave}>
              Agregar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          fullWidth
          startIcon={<AddCircleOutlineOutlinedIcon />}
          variant="outlined"
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar Tarea
        </Button>
      )}
    </Box>
  );
};

export default NewEntry;
