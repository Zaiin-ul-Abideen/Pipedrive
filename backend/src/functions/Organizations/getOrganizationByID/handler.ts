import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import pipedrive from "@configuration/config";
import schema from "./schema";

const getOrganizationByID: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const apiInstance = new pipedrive.OrganizationsApi();
  const { id } = event.pathParameters;
  try {
    const getOrganization = await apiInstance.getOrganization(id);
    return formatJSONResponse({
      Organization: getOrganization,
    });
  } catch (error) {
    return formatJSONResponse({
      error: error,
    });
  }
};

export const main = middyfy(getOrganizationByID);
