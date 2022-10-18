import {useSnackbar} from "notistack";
import {useEffect, useReducer} from "react";

import entriesApi from "../../apis/entriesApi";
import {Entry} from "../../interfaces/entry";

import {EntriesContext} from "./EntriesContext";
import {entriesReducer} from "./entriesReducer";

export interface EntriesState {
  entries: Entry[];
}

interface Props {
  children: React.ReactNode;
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: React.FC<Props> = ({children}) => {
  const {enqueueSnackbar} = useSnackbar();
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = async (description: string) => {
    try {
      const resp = await entriesApi.post<Entry>("/entries", {
        description,
      });

      if (resp.status === 201) {
        dispatch({type: "Entries - Add Entry", payload: resp.data});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateEntry = async (entry: Entry, showSnackbar: boolean = false) => {
    try {
      const resp = await entriesApi.put<Entry>(`/entries/${entry._id}`, {
        description: entry.description,
        status: entry.status,
      });

      const {data} = resp;

      if (resp.status === 200) {
        dispatch({type: "Entries - Update Entry", payload: data});
        if (showSnackbar) {
          enqueueSnackbar("Entrada actualizada!", {
            variant: "success",
            autoHideDuration: 1500,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        }
      }
    } catch (error) {
      console.log({error});
    }
  };

  const refreshEntries = async () => {
    try {
      const resp = await entriesApi.get<Entry[]>("/entries");

      if (resp.status === 200) {
        dispatch({type: "Entries - Refresh Data", payload: resp.data});
      }
    } catch (error) {}
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider value={{...state, addNewEntry, updateEntry}}>
      {children}
    </EntriesContext.Provider>
  );
};
