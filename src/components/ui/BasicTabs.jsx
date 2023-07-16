import { Box, Tab, Tabs } from "@mui/material";
import CustomTabPanel from "./CustomTabPanel";
import { Children, useState } from "react";

export default function BasicTabs({ children }) {
    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }
      
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            {Children.map(children, (child, index) => (
              <Tab label={child.props.label} {...a11yProps(index)} />
            ))}
          </Tabs>
        </Box>
        {Children.map(children, (child, index) => (
          <CustomTabPanel value={value} index={index}>
            {child.props.children}
          </CustomTabPanel>
        ))}
      </Box>
    );
  }
  