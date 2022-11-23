import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import pipedrive from "@configuration/config";
import schema from "./schema";

const getOrganizations: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async () => {
  const apiInstance = new pipedrive.OrganizationsApi();
  try {
    const getOrganizations = await apiInstance.getOrganizations();
    return formatJSONResponse({
      Organizations: getOrganizations,
    });
  } catch (error) {
    return formatJSONResponse({
      error: error,
    });
  }
};

export const main = middyfy(getOrganizations);
