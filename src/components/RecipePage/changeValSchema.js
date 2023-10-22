import * as yup from "yup";

export const changeValSchema = yup.object().shape({
  title: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .min(2, "Title must be at least 3 characters")
    .max(20, "Title must be at most 12 characters"),
  time: yup
    .number()
    .typeError("This field must be specified")
    .positive("Timing should be a positive number")
    .integer(),
  descr: yup.string().max(200),
  img: yup.string()
});
