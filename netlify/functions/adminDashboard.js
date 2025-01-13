const cookie = require('cookie')

const handler = async (event) => {

  const incomingCookie = cookie.parse(event.headers.cookie || '')
  if (incomingCookie?.petadoption == "sieurojhawel1234535") {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true })
    }
  }
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: false })
  }

}

module.exports = { handler }