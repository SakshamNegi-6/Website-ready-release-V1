exports.handler = async function(event) {
  const REAL_PASSWORD = process.env.ADMIN_PASSWORD;
  const { attempt } = JSON.parse(event.body);
  if (attempt === REAL_PASSWORD) {
    return { statusCode: 200, body: JSON.stringify({ access: 'granted' }) };
  } else {
    return { statusCode: 401, body: JSON.stringify({ access: 'denied' }) };
  }
};
