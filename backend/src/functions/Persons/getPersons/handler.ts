import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import pipedrive from "@configuration/config";
import schema from "./schema";

const getPersons: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async () => {
  const apiInstance = new pipedrive.PersonsApi();
  try {
    const getPersons = await apiInstance.getPersons();
    return formatJSONResponse({
      Persons: getPersons,
    });
  } catch (error) {
    return formatJSONResponse({
      error: error,
    });
  }
};

export const main = middyfy(getPersons);
