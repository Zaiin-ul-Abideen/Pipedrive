import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import pipedrive from "@configuration/config";

import schema from "./schema";

const addPerson: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const apiIntance = new pipedrive.PersonsApi();
  const { name, org_id, owner_id, phone, email } = event.body;
 
  let opts = pipedrive.NewPerson.constructFromObject({
    name,
    org_id,
    owner_id,
    phone,
    email,
  });

  try{
  const addPerson = await apiIntance.addPerson(opts);
  return formatJSONResponse({
    Person: addPerson,
  });
} catch (error) {
  return formatJSONResponse({
    error: error,
  });
}
};

export const main = middyfy(addPerson);
