const isAdmin = require("../../our-library/isAdmin")

const handler = async event => {
  const body = JSON.parse(event.body)
  console.log(body)

  if (isAdmin(event)) {
    // actually save into database 


    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true })
    }
  }

  // no permission
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: false })
  }
}

module.exports = { handler }