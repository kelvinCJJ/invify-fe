// import axios from "axios";
// import { useEffect } from "react";


// const authToken = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;

// console.log(authToken);

// const axiosInstance = () =>   {
//   axios.create({
//     baseURL: process.env.API_URL,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${authToken}`,
//     },
//   });
//   };

// // //add a request interceptor
// // client.interceptors.request.use(
// //   function (config) {
// //     // Do something before request is sent
// //     return config;
// //   }
// //   // function (error) {
// //   //   // Do something with request error
// //   //   return Promise.reject(error);
// //   // }
// // );

// // //add a response interceptor
// // client.interceptors.response.use(
// //   function (response) {
// //     // Do something with response data
// //     return response;
// //   }
// //   // function (error) {
// //   //   // Do something with response error
// //   //   return Promise.reject(error);
// //   // }
// // );

// export default axiosInstance;