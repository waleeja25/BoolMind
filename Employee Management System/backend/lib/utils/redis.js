const { exec } = require("child_process");

module.exports = {
  del: async (key) => {
    return await new Promise((res, rej) => {
      const redisResult = exec(
        `redis-cli DEL ${key}`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(error);
            return rej(error);
          }

          if (stderr) {
            console.error(stderr);
            return rej(stderr);
          }

          if (!stdout || stdout.trim() === "") {
             return rej(new Error("No response from redis-cli"));
          }

          if (stdout) {
            return res(stdout);
          }
        },
      );
    });
  },
  set: async (key, value) => {
    return await new Promise((res, rej) => {
      const redisResult = exec(
        `redis-cli SET ${key} ${value}`,
        (error, stdout, stderr) => {
         if (error) {
            console.error(error);
            return rej(error);
          }

          if (stderr) {
            console.error(stderr);
            return rej(stderr);
          }

          if (!stdout || stdout.trim() === "") {
             return rej(new Error("No response from redis-cli"));
          }

          if (stdout) {
            return res(stdout);
          }
        },
      );
    });
  },
  get: async (key) => {
    return await new Promise((res, rej) => {
      const redisResult = exec(
        `redis-cli GET ${key}`,
        (error, stdout, stderr) => {
         if (error) {
            console.error(error);
            return rej(error);
          }

          if (stderr) {
            console.error(stderr);
            return rej(stderr);
          }

          if (!stdout || stdout.trim() === "") {
             return rej(new Error("No response from redis-cli"));
          }

          if (stdout) {
            return res(stdout);
          }
        },
      );
    });
  },
};
