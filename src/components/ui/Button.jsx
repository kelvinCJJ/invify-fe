import React from 'react';
import { ButtonBase, Button as MuiButton } from '@mui/material';

const Button = ({ severity, children, ...props }) => {
    let className = 'text-md  md:text-base rounded-md normal-case p-2'
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
      case 'icon':
        className += 'text-white bg-transparent  hover:bg-darkshade-400';
        break;
      default:
        className += ' text-primary-900 bg-lightshade-500 hover:bg-lightshade-600';
        break;
    }
  
    return (
      <ButtonBase className={className} {...props}>
        {children}
      </ButtonBase>
    );
  };
  
  export default Button;