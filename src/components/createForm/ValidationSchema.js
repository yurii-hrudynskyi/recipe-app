import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .min(2, "Title must be at least 3 characters")
    .max(20, "Title must be at most 12 characters")
    .required("This is required field"),
  time: yup
    .number()
    .typeError("This is required field")
    .positive("Timing should be a positive number")
    .integer()
    .required("This is required field"),
  descr: yup.string().max(200).required("This is required field"),
  img: yup.string().required("This is required field")
});
