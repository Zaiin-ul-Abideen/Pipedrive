import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
// import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import pipedrive from "@configuration/config";
const { google } = require("googleapis");

import schema from "./schema";

const addPersonViaGoogleSheet: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1ykYOkP_OcDeLjWKj6q2m2CJGsJKD1RGRQ2UFIhTxo2k";

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Persons!B:F",
  });
  const lastRow = getRows.data.values.length;

  let propsValues = getRows.data.values[lastRow - 1];

  const name = propsValues[0];
  const org_id = parseInt(propsValues[1])!;
  const owner_id = parseInt(propsValues[2])!;


  const phone = [{ value: propsValues[3] ?? "" }];
  const email = [{ value: propsValues[4] ?? "" }];

  const apiIntance = new pipedrive.PersonsApi();

  let opts = pipedrive.NewPerson.constructFromObject({
    name,
    org_id,
    owner_id,
    phone,
    email,
  });


  try {
    const addPerson = await apiIntance.addPerson(opts);
    return formatJSONResponse({
      Person: addPerson,
    });
  } catch (error) {
    return formatJSONResponse({
      error: error,
    });
  }
};

export const main = middyfy(addPersonViaGoogleSheet);
