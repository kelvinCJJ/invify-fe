import React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Alert } from "@mui/material";
import Button from "./Button";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: 'absolute',
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     zIndex: 50,
//   },
// }));

const UniversalModal = ({
  open,
  onClose,
  isAlert,
  severity,
  title,
  content,
  actions,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="absolute w-3/4 md:w-1/3 bg-darkshade-500 shadow-md md:rounded-md p-2 md:p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        {isAlert ? (
          <Alert variant="filled" severity={severity} sx={{ width: "100%" }}>
            {content}
          </Alert>
        ) : (
          <>
            <div>
            <Typography variant="h2">{title}</Typography>
            </div>
            <Typography>{content}</Typography>
          </>
        )}
        <div className="flex flex-row mx-2 mt-2 justify-center space-x-2 md:space-x-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              severity={action.severity}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default UniversalModal;
