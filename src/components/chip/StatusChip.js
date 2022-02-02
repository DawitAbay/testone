import React from "react";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import { green, blue, grey, red } from "@material-ui/core/colors";

const colorForStatus= (status)=> {
  switch (status) {
    case "completed":
      return green;
    case "in progress":
      return blue;
    case "blocked":
      return red;
    default:
      return grey;
  }
}

const StatusChip =({status })=> {
  return (
    <Chip
      label={status}
      avatar={status === "completed" && <DoneIcon style={{ color: "white" }} />}
      style={{ backgroundColor: colorForStatus(status)[300], color: "white" }}
    />
  );
}

export default StatusChip;
