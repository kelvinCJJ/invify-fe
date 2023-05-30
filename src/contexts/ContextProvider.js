import Snackbar from '@/components/ui/Snackbar';
import UniversalModal from '@/components/ui/UniversalModal';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
  snackbar: false,
};

export const ContextProvider = ({ children }) => {

  const [screenSize, setScreenSize] = useState(undefined);
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [modalProps, setModalProps] = useState({
    open: false,
    isAlert : false,
    severity: 'info',
    title: '',
    content: '',
    actions: [],
  });

  //Authentication context provider
  const [authenticated, setAuthenticated] = useState(false)

  // Simulate authentication check
  useEffect(() => {
    // Your authentication logic goes here
    const isAuthenticated = checkAuthentication()

    if (!isAuthenticated) {
      router.push('/login') // Redirect to login page
    } else {
      setAuthenticated(true)
    }
  }, [])

  //check authentication
  const checkAuthentication = async () => {
    // Your authentication logic goes here
    const sessionuser = localStorage.getItem("session_user");
    console.log(sessionuser);
    const user = await axios
          .post(process.env.AUTHURL + "/checkauth", sessionuser.userId)
          .then((res) => {
            if (res.data.success == true) {
              return true;
            }
          });

    return false;

  }

  const openSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
    setSnackbarSeverity('info');
    console.log('closeSnackbar');
  };

  const openModal = (props) => setModalProps({ ...props, open: true });
  const closeModal = () => setModalProps((prev) => ({ ...prev, open: false }));

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    // <StateContext.Provider value={{ currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings }}>
    <StateContext.Provider 
    value={{activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu,
     snackbarOpen, setSnackbarOpen, snackbarMessage, setSnackbarMessage, snackbarSeverity, setSnackbarSeverity, openSnackbar, closeSnackbar,
     openModal, closeModal}}>
      {children}
      <Snackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} onClose={closeSnackbar} />
      <UniversalModal {...modalProps} onClose={closeModal}  />
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
