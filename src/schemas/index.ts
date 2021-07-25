import * as yup from "yup";

export const postSchema = yup.object().shape({
  title: yup.string().required("Please include title"),
  body: yup.string().required("Post must have a body text"),
});

export const paramsWithIdSchema = yup.object().shape({
  id: yup.string().required("Please include id in the params")
})

export const yupOptions = {
  strict: false,
  abortEarly: false,
  stripUnknown: true,
  recursive: true,
};
