import React, { use, useEffect, useState } from 'react';
import { ButtonBase, Button as MuiButton } from '@mui/material';

const Button = ({ severity, children , ...props }) => {
    const [className, setClassName] = useState('text-md  md:text-base rounded-md normal-case p-2 lg:px-4');

    useEffect(() => { 
      let className1 = 'text-md  md:text-base rounded-md normal-case p-2 lg:px-4'

    switch (severity) {
      case 'error':
        className1 += ' text-white bg-error-500 hover:bg-error-800';
        setClassName(className1);
        break;
      case 'warning':
        className1 += ' text-white bg-warning-500 hover:bg-warning-800';
        setClassName(className1);
        break;
      case 'info':
        className1 += ' text-white bg-info-500 hover:bg-info-800 ';
        setClassName(className1);
        break;
      case 'success':
        className1 += ' text-white bg-success-500 hover:bg-success-800';
        setClassName(className1);
        break;
      case 'icon':
        className1 += 'text-white bg-transparent  hover:bg-darkshade-400';
        setClassName(className1);
        break;
      default:
        className1 += ' text-primary-900 bg-lightshade-500 hover:bg-lightshade-600';
        setClassName(className1);
        break;
    }
  }, [severity]);
  
    return (
      <ButtonBase  className={className}  {...props}>
        {children}
      </ButtonBase>
    );
  };
  
  export default Button;