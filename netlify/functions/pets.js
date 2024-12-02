const handler = async () => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: 2 + 2
  }
}

module.exports = { handler }