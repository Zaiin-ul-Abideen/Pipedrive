import * as yup from "yup";

// export type Form = yup.InferType<typeof formSchema>;

export const formSchema = yup.object({
  title: yup.string().min(2).max(25).required("Deal title is Required"),

  value: yup.string().min(1),

  currency: yup.string().min(3).max(3).required("Currency is Required"),

  person_id: yup.number(),

  probability: yup.number(),
});
