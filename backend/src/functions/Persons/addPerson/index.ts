import { handlerPath } from "@libs/handler-resolver";
import schema from "./schema";

export default {
  // handler: "src/functions/Persons/addPerson/handler.main",
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "POST",
        path: "persons",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
