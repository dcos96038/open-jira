import {Card, CardActionArea, CardActions, CardContent, Typography} from "@mui/material";
import {useRouter} from "next/router";
import {DragEvent, useContext} from "react";

import {UIContext} from "../../context/ui/UIContext";
import {Entry} from "../../interfaces/entry";
import {getFormattedDistanceToNow} from "../../utils/dateFunctions";

interface Props {
  entry: Entry;
}

const EntryCard: React.FC<Props> = ({entry}) => {
  const {setDragging} = useContext(UIContext);
  const router = useRouter();

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", entry._id);

    setDragging(true);
  };

  const onDragEnd = () => {
    setDragging(false);
  };

  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  };

  return (
    <Card
      draggable
      sx={{marginBottom: 1}}
      onClick={onClick}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{whiteSpace: "pre-line"}}>{entry.description}</Typography>
        </CardContent>

        <CardActions sx={{display: "flex", justifyContent: "end", paddingRight: 1}}>
          <Typography variant="body2">Hace {getFormattedDistanceToNow(entry.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default EntryCard;
