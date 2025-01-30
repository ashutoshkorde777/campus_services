// src/ControlledSwitches.jsx
import * as React from 'react';
import Switch from '@mui/material/Switch';

export default function ControlledSwitches() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div style={{
      position: 'absolute', 
      top: '10px', 
      right: '10px', 
      zIndex: '1000'
    }}>
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </div>
  );
}
