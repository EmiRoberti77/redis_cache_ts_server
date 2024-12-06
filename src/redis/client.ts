import { createClient } from "redis";
import { serverEnv } from "../env/serverEnv";
import { timeStamp } from "../constants";

export const createRedisClient = async (): Promise<any> => {
  switch (serverEnv.redisUseCloud) {
    case true:
      return await createClientCloudRedis();
    case false:
      return await createClientLocalRedis();
  }
};

const createClientCloudRedis = async () => {
  const client = createClient({
    username: serverEnv.redisUser,
    password: serverEnv.redisPassword,
    socket: {
      host: serverEnv.redisHost,
      port: serverEnv.redisPort,
    },
  });
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
  console.log("cloud redis -> connected", timeStamp());
  return client;
};

const createClientLocalRedis = async () => {
  const redis = createClient();
  redis.on("error", (error) => console.log(error));
  await redis.connect();
  console.log("local redis -> connected", timeStamp());
  return redis;
};
