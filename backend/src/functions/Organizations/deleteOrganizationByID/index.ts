// import schema from "./schema";
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "DELETE",
        path: "organizations/{id}",
        request: {
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
