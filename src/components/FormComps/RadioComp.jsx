import React from "react";
import {

  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,

} from "@mui/material";

const RadioComp = (props) => {
  const {
    input: { name, onChange, onBlur, value, ...restInput },
    meta,
    ...rest
  } = props;



  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{name}</FormLabel>
      <RadioGroup
        row
        aria-label="job-status"
        defaultValue="unemployed"
        // name="job-status-radio"
        {...rest}
        name={name}
        // helperText={meta.touched ? meta.error : undefined}
        error={meta.error && meta.touched}
        // inputProps={restInput}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      // sx={{ display: "flex", flexWrap: "wrap" }}
      >
        <FormControlLabel
          control={<Radio color="secondary" type={`${restInput.type}`} />}

        />
        <FormControlLabel
          control={
            <Radio
              color="secondary"
              type={`${restInput.type}`}
            // inputProps={restInput.type}
            // type="radio"
            //   {...rest}
            //   name={name}
            //   helperText={meta.touched ? meta.error : undefined}
            //   error={meta.error && meta.touched}
            //   inputProps={restInput}
            //   onChange={onChange}
            //   value={value}
            />
          }

        />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioComp;
