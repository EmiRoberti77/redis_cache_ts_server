import Ajv, { JSONSchemaType } from "ajv";
import { PromptParams } from "../models/promptParams";

const ajv = new Ajv();

const schema: JSONSchemaType<PromptParams> = {
  type: "object",
  properties: {
    user: { type: "string" },
    question: { type: "string" },
    answer: { type: "string" },
    dateTime: { type: "string", nullable: true },
  },
  required: ["user", "question", "answer"],
  additionalProperties: false,
};

export const validatePrompt = ajv.compile(schema);
