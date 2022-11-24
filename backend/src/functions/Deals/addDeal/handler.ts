import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import pipedrive from "@configuration/config";
import schema from "./schema";

const addDeal: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const {
    title,
    value,
    currency,
    user_id,
    person_id,
    org_id,
    pipeline_id,
    status,
    expected_close_date,
    probability,
    add_time,
  } = event.body;
  const apiInstance = new pipedrive.DealsApi();
  const opts = {
    title,
    value,
    currency,
    user_id,
    person_id,
    org_id,
    pipeline_id,
    status,
    expected_close_date,
    probability,
    add_time,
  };

  try {
    const addDeal = await apiInstance.addDeal(opts);
    return formatJSONResponse({
      Deal: addDeal,
      status: 200,
    });
  } catch (error) {
    return formatJSONResponse({
      error: error,
      status: 500,
    });
  }
};

export const main = middyfy(addDeal);
