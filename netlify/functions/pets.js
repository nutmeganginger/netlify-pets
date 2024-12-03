const handler = async () => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: "megan".toUpperCase()
  }
}

module.exports = { handler }