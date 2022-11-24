// import type { Form } from "./formSchema";

export type InitialFormDataTypes = {
  title: undefined | string;
  value?: string | undefined;
  currency?: string ;
  person_id: number | string;
  org_id?: number;
  status?: string | undefined;
  expected_close_date: string | undefined;
  probability?: string | number;
  user_id?: number;
};
