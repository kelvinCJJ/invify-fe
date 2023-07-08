import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ severity, children, ...props }) => {
    let className = 'px-4 py-2 text-xs  md:text-base md:px-6 md:py-3 rounded-md normal-case'
  
    switch (severity) {
      case 'error':
        className += ' text-white bg-error-500 hover:bg-error-800';
        break;
      case 'warning':
        className += ' text-white bg-warning-500 hover:bg-warning-800';
        break;
      case 'info':
        className += ' text-white bg-info-500 hover:bg-info-800 ';
        break;
      case 'success':
        className += ' text-white bg-success-500 hover:bg-success-800';
        break;
      default:
        className += ' text-primary-900 bg-lightshade-500 hover:bg-lightshade-600';
        break;
    }
  
    return (
      <MuiButton className={className} {...props}>
        {children}
      </MuiButton>
    );
  };
  
  export default Button;