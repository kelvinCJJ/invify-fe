import { useStateContext } from "@/contexts/ContextProvider";
import { Snackbar as MuiSnackbar, Slide } from "@mui/material";
import { Alert } from "@mui/material";

// const Snackbar = ({ open, setOpen, message, severity }) => {
  const Snackbar = () => {

  const { snackbarOpen, snackbarMessage, snackbarSeverity, closeSnackbar  } = useStateContext();

  if (!snackbarOpen) return null;

  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setSnackbarOpen(false);
  // };

  return (
    snackbarMessage ?
    <MuiSnackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={closeSnackbar}
      TransitionComponent={props => <Slide {...props} direction="left" in />}
    >
      <Alert variant="filled" onClose={closeSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
        {snackbarMessage}
      </Alert>
    </MuiSnackbar>
    : null
    // message ?
    // <MuiSnackbar
    //   anchorOrigin={{ vertical: "top", horizontal: "right" }}
    //   open={open}
    //   autoHideDuration={6000}
    //   onClose={handleClose}
    //   TransitionComponent={props => <Slide {...props} direction="left" />}
    // >
    //   <Alert variant="filled" onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
    //     {message}
    //   </Alert>
    // </MuiSnackbar>
    // : null
  );
};

export default Snackbar;
