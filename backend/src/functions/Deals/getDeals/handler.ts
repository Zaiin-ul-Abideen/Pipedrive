import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import pipedrive from "@configuration/config";
import schema from "./schema";

const getDeals: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async () => {
  const apiInstance = new pipedrive.DealsApi();
  try {
    const getDeals = await apiInstance.getDeals();
    return formatJSONResponse({
      Deals: getDeals,
    });
  } catch (error) {
    return formatJSONResponse({
      error: error,
    });
  }
};

export const main = middyfy(getDeals);
