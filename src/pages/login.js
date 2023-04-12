import Link from "next/link";
import Logo from "@/components/Logo";
import { ErrorMessage, Formik } from "formik";
import axios from "axios";
import { Grid } from "@mui/material";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export const metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="flex h-screen w-screen bg-black-500 text-slate-300  items-center justify-center ">
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
            console.log(values);
            try {
              const user = await axios
                .post("https://localhost:7028/login", values)
                .then((res) => {
                  console.log(res);
                  if (res.success == true) {
                    res.value ? signIn("credentials",{} ) : setErrorMessage("Invalid credentials");
                    redirect("/dashboard");
                  }
                 else {
                    setErrorMessage("Invalid credentials");
                  }                  
                });
            } catch (err) {
              console.log(err);
              setErrorMessage(err.response.data.message);
            }

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
            <form
              onSubmit={handleSubmit}
              className="w-full p-3 flex flex-col  space-y-1"
            >
              {errorMessage ? (
                <div className=" bg-rose-500 p-2 rounded-md text-center text-base text-slate-100">
                  {errorMessage}
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
