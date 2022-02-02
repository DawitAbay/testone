import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import StatusChip from "../chip/StatusChip";

const ChipSelect = () =>{
  const [value, setValue] = useState("not started");
  return (
    <Select
      labelId="demo-mutiple-checkbox-label"
      id="demo-mutiple-checkbox"
      value={value}
      onChange={({ target: { value } }) => {
        setValue(value);
      }}
      input={<Input />}
      renderValue={(selected) => <StatusChip status={selected} />}
    >
      {["not started", "completed", "in progress", "blocked"].map(
        (statusLabel) => (
          <MenuItem key={statusLabel} value={statusLabel}>
            <StatusChip status={statusLabel} />
          </MenuItem>
        )
      )}
    </Select>
  );
}

export default ChipSelect;
