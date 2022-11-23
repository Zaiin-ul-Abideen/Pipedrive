import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import pipedrive from "@configuration/config";
import schema from "./schema";

const deleteDeals: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const apiInstance = new pipedrive.DealsApi();
  const { ids } = event.body;

  try {
    const deleteDeals = await apiInstance.deleteDeals(ids);
    return formatJSONResponse({
      Deals: deleteDeals,
    });
  } catch (error) {
    return formatJSONResponse({
      error: error,
    });
  }
};

export const main = middyfy(deleteDeals);
