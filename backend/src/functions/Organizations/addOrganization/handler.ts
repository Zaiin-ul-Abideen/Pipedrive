import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import pipedrive from "@configuration/config";
import schema from "./schema";

const addOrganization: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const apiInstance = new pipedrive.OrganizationsApi();
  const { name,owner_id,visible_to } = event.body;
  let opts = pipedrive.NewOrganization.constructFromObject({
    name,owner_id,visible_to
  });

  try {
    const addOrganization = await apiInstance.addOrganization(opts);
    return formatJSONResponse({
      Organization: addOrganization,
    });
  } catch (error) {
    return formatJSONResponse({
      error: error,
    });
  }
};

export const main = middyfy(addOrganization);
