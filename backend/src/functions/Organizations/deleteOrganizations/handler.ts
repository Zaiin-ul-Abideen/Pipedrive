import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import pipedrive from "@configuration/config";
import schema from "./schema";

const deleteOrganizations: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const apiInstance = new pipedrive.OrganizationsApi();
  const { ids } = event.body;

  try {
    const deleteOrganizations = await apiInstance.deleteOrganizations(ids);
    return formatJSONResponse({
      Organizations: deleteOrganizations,
    });
  } catch (error) {
    return formatJSONResponse({
      error: error,
    });
  }
};

export const main = middyfy(deleteOrganizations);
