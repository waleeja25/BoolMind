const { redisClient } = require("../config");

async function getCache(key) {
  try {
    return await redisClient.get(key);
  } catch (err) {
    console.error("Redis Get Error");
    return null;
  }
}

async function setCache(key, value, ttl = 60) {
  try {
    await redisClient.set(key, value, {
      EX: ttl,
    });
  } catch (err) {
    console.error("Redis Set Error");
  }
}

async function delCache(pattern) {
  try {
    const keys = await redisClient.keys(pattern);

    if (keys.length > 0) {
      await redisClient.del(...keys);
    }
  } catch (err) {
    console.error("Redis Del Error");
  }
}

module.exports = { getCache, setCache, delCache };
