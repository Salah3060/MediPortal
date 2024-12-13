/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";

export default function CAvailibility({
  handleBlur,
  handleChange,
  values,
  index,
}) {
  return (
    <>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Clinic Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.WorkspaceName[index]}
        name={`WorkspaceName[${index}]`}
        sx={{ gridColumn: "span 4" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Clinic phone"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.workspacePhone[index]}
        name={`workspacePhone[${index}]`}
        sx={{ gridColumn: "span 4" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Clinic Location"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.workspaceLocation[index]}
        name={`workspaceLocation[${index}]`}
        sx={{ gridColumn: "span 4" }}
      />
    </>
  );
}
