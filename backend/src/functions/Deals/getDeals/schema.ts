export default {
  type: "object",
  properties: {
    title: { type: "string" },
    value: { type: "string" },
    currency: { type: "string" },
    user_id: { type: "number" },
    person_id: { type: "number" },
    org_id: { type: "number" },
    pipeline_id: { type: "number" },
    status: { type: "string" },
    expected_close_date: { type: "Date" },
    probability: { type: "number" },
    add_time: { type: "string" },
  },
  required: ["title"],
} as const;
