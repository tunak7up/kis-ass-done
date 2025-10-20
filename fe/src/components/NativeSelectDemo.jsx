

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

function NativeSelectDemo({ label, name, options, value, onChange, disabled = false }) {
  return (
    <Box sx={{ minWidth: '10%', margin: '1rem' }}>
      <FormControl fullWidth disabled={disabled}>
        <InputLabel variant="standard" htmlFor={`native-${name}`}>
          {label}
        </InputLabel>
        <NativeSelect
          value={value}
          onChange={(e) => onChange(e.target.value)}
          inputProps={{
            name,
            id: `native-${name}`,
          }}
        >
          {/* <option value="">-- Chọn {label} --</option> */}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}

export default NativeSelectDemo;