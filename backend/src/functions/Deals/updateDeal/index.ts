import { handlerPath } from "@libs/handler-resolver";
import schema from "./schema";
export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "PUT",
        path: "deals/{id}",
        request: {
          schemas: {
            "application/json": schema,
          },
          parameters: {
            paths: {
              id: true,
            },
          },
        },
      },
    },
  ],
};
