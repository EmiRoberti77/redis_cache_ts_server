import { createClient } from "redis";
import { serverEnv } from "../env/serverEnv";

export const createRedisClient = async (): Promise<any> => {
  // const client = createClient({
  //   username: serverEnv.redisUser,
  //   password: serverEnv.redisPassword,
  //   socket: {
  //     host: serverEnv.redisHost,
  //     port: serverEnv.redisPort,
  //   },
  // });
  // client.on("error", (err) => console.log("Redis Client Error", err));
  // await client.connect();
  // return client;

  const redis = createClient();
  redis.on("error", (error) => console.log(error));
  await redis.connect();
  return redis;
};
