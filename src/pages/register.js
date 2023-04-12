import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '@/components/Logo';
import { Formik } from 'formik';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  return (
    <div className="flex h-screen w-screen bg-black-500 text-slate-300  items-center justify-center ">
      <div className="mx-auto flex w-full justify-center items-center flex-col space-y-2 p-3 sm:w-[450px]">
          <Logo className="h-10 w-10" />
          <h1 className="text-3xl font-bold tracking-tight">Welcome to Invify</h1>
          <p className="text-md ">Enter your credentials to access your account</p>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values);
              const user = await axios
                .post("https://localhost:7028/login", values)
                .then((res) => {
                  console.log(res);
                  console.log(res.data);
                })
                .catch((err) => {
                  console.log(err);
                });

              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit} className="w-full p-3 flex flex-col  space-y-1">
                  {errors.email!=null && errors.password!=null ? (
                    <div className=" bg-rose-500 p-2 rounded-md text-center text-base text-slate-100">
                      {errors.email ? errors.email : null}
                      {errors.password ? errors.password : null}
                    </div>
                  ) : null}
                  <div className="flex flex-col my-2">
                    <input
                      type="email"
                      name="email"
                      className="bg-black-400 p-2 my-1 rounded-md  focus:outline-none focus:outline-emerald-400"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Email"
                      value={values.email}
                    />

                    <input
                      type="password"
                      name="password"
                      className="bg-black-400 p-2 my-1 rounded-md focus:outline-none focus:outline-emerald-400"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Password"
                      value={values.password}
                    />
                  </div>
                  <button type="submit" className="bg-slate-500 p-2 text-lg rounded-lg" disabled={isSubmitting}>
                    Submit
                  </button>
              </form>
            )}
          </Formik>
          <p className="px-8 text-center text-sm text-slate-500 ">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
        </div>     
    </div>
  );
}