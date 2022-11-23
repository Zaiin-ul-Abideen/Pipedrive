import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import pipedrive from "@configuration/config";
import schema from "./schema";

const deleteDealByID: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const apiInstance = new pipedrive.DealsApi();
  const { id } = event.pathParameters;  
  try {
    const deleteDeal = await apiInstance.deleteDeal(id);
    return formatJSONResponse({
      Deal: deleteDeal,
    });
  } catch (error) {
    return formatJSONResponse({
      error: error,
    });
  }
};

export const main = middyfy(deleteDealByID);
