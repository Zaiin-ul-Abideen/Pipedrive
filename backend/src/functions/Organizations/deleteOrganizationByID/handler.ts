import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import pipedrive from "@configuration/config";
import schema from "./schema";

const deleteOrganizationByID: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const apiInstance = new pipedrive.OrganizationsApi();
  const { id } = event.pathParameters;
  try {
    const deleteOrganization = await apiInstance.deleteOrganization(id);
    return formatJSONResponse({
      Organization: deleteOrganization,
    });
  } catch (error) {
    return formatJSONResponse({
      error: error,
    });
  }
};

export const main = middyfy(deleteOrganizationByID);
