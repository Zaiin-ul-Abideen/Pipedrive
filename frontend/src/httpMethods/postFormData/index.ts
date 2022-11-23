import type { InitialFormDataTypes } from "../../types/formTypes/formTypes";

export const postFormData = async (
  formData: InitialFormDataTypes,
  url: string
): Promise<Boolean> => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return true;
  } else {
    return false;
  }
};
