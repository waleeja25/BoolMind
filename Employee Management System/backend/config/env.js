function getPort(defaultPort = 5000) {
  const raw = process.env.PORT;
  const value = raw === undefined || raw === '' ? defaultPort : Number(raw);

  if (!Number.isInteger(value) || value <= 0 || value > 65535) {
    throw new Error(`Invalid PORT: "${raw}". PORT must be an integer between 1 and 65535.`);
  }

  return value;
}

module.exports = { getPort };
