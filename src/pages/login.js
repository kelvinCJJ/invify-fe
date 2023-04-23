import Link from "next/link";
import Logo from "@/components/Logo";
import { ErrorMessage, Formik, useFormik } from "formik";
import axios from "axios";
import { Alert, Grid, TextField } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import jwt, { verify } from "jsonwebtoken";
import Button from "@/components/ui/Button";
import * as Yup from "yup";

export const metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  //yup email validation schema
  const validationSchema = Yup.object({
    email: Yup.string().test("is-email", "Invalid email address", (value) =>
      (value + "").match(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/)
    ),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
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
      setSubmitting(false);
    },
  });

  return (
    <div className="flex h-screen w-screen bg-darkshade-500 text-slate-300  items-center justify-center ">
      <div className="mx-auto flex w-full justify-center items-center flex-col space-y-2 p-3 sm:w-[450px]">
        <Logo className="h-10 w-10" />
        <h1 className="text-3xl font-bold tracking-tight">Welcome to Invify</h1>
        <p className="text-md ">
          Enter your credentials to access your account
        </p>
        {/* <Formik
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
          }) => ( */}
        <form
          onSubmit={formik.handleSubmit}
          className="w-full p-3 flex flex-col  space-y-1"
        >
          {errorMessage ? (
            <Alert variant="filled" severity="error">
              {errorMessage}
            </Alert>
          ) : null}
          <div className="flex flex-col my-2 space-y-2">
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="filled"
              type="email"
              margin="normal"
              color="light"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.errors.email && formik.touched.email}
              helperText={
                formik.errors.email &&
                formik.touched.email &&
                formik.errors.email
              }
            />
            <TextField
              id="filled-password-input"
              name="password"
              label="Password"
              variant="filled"
              type="password"
              margin="normal"
              color="light"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.errors.password && formik.touched.password}
              helperText={
                formik.errors.password &&
                formik.touched.password &&
                formik.errors.password
              }
            />
          </div>
          <Button
            type="submit"
            variant="filled"
            severity=""
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </form>
        {/* )}
        </Formik> */}
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
