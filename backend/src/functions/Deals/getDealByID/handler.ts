import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import pipedrive from "@configuration/config";
import schema from "./schema";

const getDealByID: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {

  const apiInstance = new pipedrive.DealsApi();
  const { id } = event.pathParameters;
  try {
    const getDeal = await apiInstance.getDeal(id);
    return formatJSONResponse({
      Deal: getDeal,
    });
  } catch (error) {
    return formatJSONResponse({
      error: error,
    });
  }
};

export const main = middyfy(getDealByID);
