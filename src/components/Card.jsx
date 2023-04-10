import { AutoAwesome } from "@mui/icons-material";
import { Box, Icon } from "@mui/material";


export function Card({ title, value, icon }) {
  return (
    <Box className="p-4 bg-white shadow rounded-lg">
      <div className="flex items-center justify-between">
        <div className="text-gray-600">{title}</div>
        <Icon 
          className="text-gray-400 text-xl"
        />
      </div>
      <div className="text-2xl font-bold mt-2">{value}</div>
    </Box>
  );
}