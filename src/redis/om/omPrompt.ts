import { Repository, Schema, Entity } from "redis-om";
import { createRedisClient } from "../client";

const promptSchema = new Schema(
  "prompt",
  {
    question: { type: "string" },
    answer: { type: "string" },
    user: { type: "string" },
    dateTime: { type: "date" },
  },
  {
    dataStructure: "JSON",
  }
);

export const createPromptIndex = async (): Promise<Repository> => {
  const carRepository: Repository = new Repository(
    promptSchema,
    await createRedisClient()
  );
  await carRepository.createIndex();
  console.log("schema and repository created for prompt");
  return carRepository;
};
