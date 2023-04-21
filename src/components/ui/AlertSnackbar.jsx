import { Close } from "@mui/icons-material";
import { Alert, IconButton, Snackbar } from "@mui/material";
import { useEffect } from "react";

const AlertSnackbar = ({ open, onClose, severity, message }) => {
   const className="m-2 hidden";

   useEffect (() => {
   if(open) 
   className.replace("hidden", "block");
   });

    return (
      <div className={className}>
          <Alert onClose severity={severity} >
            {message}
          </Alert>
      </div>
    );
  };
  
  
  export default AlertSnackbar;