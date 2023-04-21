import Link from "next/link";
import Logo from "@/components/Logo";
import { ErrorMessage, Formik } from "formik";
import axios from "axios";
import { Alert, Grid, TextField } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import jwt, { verify } from "jsonwebtoken";

export const metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="flex h-screen w-screen bg-darkshade-500 text-slate-300  items-center justify-center ">
      <div className="mx-auto flex w-full justify-center items-center flex-col space-y-2 p-3 sm:w-[450px]">
        <Logo className="h-10 w-10" />
        <h1 className="text-3xl font-bold tracking-tight">Welcome to Invify</h1>
        <p className="text-md ">
          Enter your credentials to access your account
        </p>
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
            //console.log(values);
            const credential = JSON.stringify(values, null, 2);
            //console.log(credential);
            try {
              const user = await axios
                .post(process.env.AUTHURL + "/login", values)
                .then((res) => {
                  // console.log(res);
                  // console.log(res.data);
                  if (res.data.success == true && res.data.value) {
                    const Uservalue = JSON.stringify(res.data.value, null, 2);
                    localStorage.setItem("session_user", Uservalue);
                    localStorage.setItem("token", res.data.value.token);
                    //console.log(tokenJson);
                    router.push("/dashboard");
                  } else {
                    setErrorMessage(res.data.message);
                  }
                });
            } catch (err) {
              console.log(err);
              setErrorMessage(err.response.data.message);
            }
            // const status = await signIn("emailpassword", {
            //   credential,
            //   redirect: false,
            //   // The pagcredentiale where you want to redirect to after a
            //   // successful login
            //   callbackUrl: "https://localhost:3000/dashboard",
            // });
            // console.log(status);
            //setErrorMessage("Invalid credentials");
            //alert(JSON.stringify(values, null, 2));
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
          }) => (
            <form
              onSubmit={handleSubmit}
              className="w-full p-3 flex flex-col  space-y-1"
            >
              {errorMessage ? (
                <Alert variant="filled" severity="error">
                  {errorMessage}
                </Alert>
              ) : null}
              <div className="flex flex-col my-2 space-y-2">
                {/* <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                /> */}
                {/* <input
                  type="email"
                  name="email"
                  className="bg-black-400 p-2  rounded-md  focus:outline-none focus:outline-emerald-400"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email"
                  value={values.email}
                />
                <input
                  type="password"
                  name="password"
                  className="bg-black-400 p-2 rounded-md focus:outline-none focus:outline-emerald-400"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Password"
                  value={values.password}
                /> */}
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="filled"
                  type="email"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={errors.email && touched.email}
                  helperText={errors.email && touched.email && errors.email}
                />
                <TextField
                  id="filled-password-input"
                  name="password"
                  label="Password"                  
                  variant="filled"
                  type="password"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={errors.password && touched.password}
                  helperText={
                    errors.password && touched.password && errors.password
                  }
                />
              </div>
              <button
                type="submit"
                className="bg-slate-500 p-2 text-lg rounded-lg"
                disabled={isSubmitting}
              >
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
