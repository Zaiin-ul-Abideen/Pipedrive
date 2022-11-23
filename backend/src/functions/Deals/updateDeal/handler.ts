import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import pipedrive from "@configuration/config";
import schema from "./schema";

const updateDeal: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { id } = event.pathParameters;
  const {
    title,
    value,
    currency,
    user_id,
    person_id,
    org_id,
    pipeline_id,
    stage_id,
    status,
    expected_close_date,
    probability,
    lost_reason,
    visible_to,
  } = event.body;
  const apiInstance = new pipedrive.DealsApi();
  const opts = pipedrive.UpdateDealRequest.constructFromObject({
    title,
    value,
    currency,
    user_id,
    person_id,
    org_id,
    pipeline_id,
    stage_id,
    status,
    expected_close_date,
    probability,
    lost_reason,
    visible_to,
  });

  try {
    const updateDeal = await apiInstance.updateDeal(id, opts);
    return formatJSONResponse({
      Deal: updateDeal,
    });
  } catch (error) {
    return formatJSONResponse({
      error: error,
    });
  }
};

export const main = middyfy(updateDeal);
