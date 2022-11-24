import type { InitialFormDataTypes } from "../../types/formTypes/formTypes";

type ResponseBodyType = { status: number };

export const postFormData = async (
  formData: InitialFormDataTypes,
  url: string
): Promise<Boolean> => {
  let responseBody: ResponseBodyType = { status: 0 };

  await fetch(url, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      responseBody = data;
    });

  if (responseBody.status !== 200) {
    return false;
  } else {
    return true;
  }
};
