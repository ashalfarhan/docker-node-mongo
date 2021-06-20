import * as yup from "yup";

export const studentValidation = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().min(18).required(),
  major: yup
    .string()
    .oneOf(["biology", "chemistry", "science", "computer"])
    .required(),
});
