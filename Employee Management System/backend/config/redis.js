const { createClient } = require("redis");

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => {
  console.log("Redis Error:", err.message);
});

async function connectRedis() {
  try {
    await redisClient.connect();
    console.log("Redis Connected");
  } catch (err) {
    console.log("Redis is unavailable. Continuing without cache.");
  }
}

module.exports = {
  redisClient,
  connectRedis,
};