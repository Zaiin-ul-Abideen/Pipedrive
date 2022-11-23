export default {
  type: "object",
  properties: {
    name: { type: "string" },
    owner_id: { type: "number" },
    visible_to: { type: "string" },
  },
  required: ["name"],
};
