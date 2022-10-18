import {List, Paper} from "@mui/material";
import {DragEvent, useContext, useMemo} from "react";

import {EntriesContext} from "../../context/entries/EntriesContext";
import {UIContext} from "../../context/ui/UIContext";
import {EntryStatus} from "../../interfaces/entry";

import EntryCard from "./EntryCard";
import styles from "./EntryList.module.css";

interface Props {
  status: EntryStatus;
}

const EntryList: React.FC<Props> = ({status}) => {
  const {entries, updateEntry} = useContext(EntriesContext);
  const {isDragging, setDragging} = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [entries],
  );

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");

    const entry = entries.find((entry) => entry._id === id)!;

    updateEntry({
      ...entry,
      status: status,
    });
    setDragging(false);
  };

  return (
    <div className={isDragging ? styles.dragging : ""} onDragOver={allowDrop} onDrop={onDropEntry}>
      <Paper
        sx={{
          height: "calc(100vh - 150px)",
          backgroundColor: "transparent",
          overflow: "auto",
          padding: "3px 5px",
        }}
      >
        <List sx={{opacity: isDragging ? 0.3 : 1, transition: "all .3"}}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default EntryList;
