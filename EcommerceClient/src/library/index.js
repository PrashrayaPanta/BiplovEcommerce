import dayjs from "dayjs";

export const imgUrl = (public_id) => {
  return `${import.meta.env.VITE_API_URL}/${public_id}`;
};

// import dayjs from "dayjs";

// import LocalizedFormat from "dayjs/plugin/localizedFormat";

// dayjs.extend(LocalizedFormat);

export const BackendvalidationError = (formik, response) => {
  // console.log(response);

  console.log("I am inside backend validatiion error");

  // console.log(formik);

  console.log(response);

  if ("errors" in response.data) {
    for (let k in response.data.errors) {
      formik.setFieldError(k, response.data.errors[k]);
    }
  }
};

export const ToStorage = (key, value, remember = false) => {
  remember
    ? localStorage.setItem(key, value)
    : sessionStorage.setItem(key, value);
};

export const FromStorage = (key) => {
  return localStorage.getItem(key) || sessionStorage.getItem(key);
};

export const ClearStorage = (key) => {
  localStorage.clear(key);
  sessionStorage.clear(key);
};

export const dtFormat = (date) => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss"); // Adjust format as needed
};

//   export const imgURL = (public_id) => {
//     // console.log(public_id);

//     // console.log(public_id)

//     // console.log(`import.meta.env.VITE_API_URL/image/${filename}`);

//     return `${import.meta.env.VITE_API_URL}/api/${public_id}`;
//   };
