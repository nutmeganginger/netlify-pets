const sanitizeHtml = require("sanitize-html")
const getDbClient = require("../../our-library/getDbClient")
const isAdmin = require("../../our-library/isAdmin")

function cleanUp(x) {
  return sanitizeHtml(x, {
    allowedTags: [],
    allowedAttributes: {}
  })
}

const handler = async event => {
  const body = JSON.parse(event.body)

  let pet = {
    name: cleanUp(body.name),
    species: cleanUp(body.species),
    description: cleanUp(body.description),
    birthYear: new Date().getFullYear()
  }

  if (body.birthYear > 999 && body.birthYear < 4000) {
    pet.birthYear = body.birthYear
  }

  if (pet.species != "Cat" && pet.species != "Dog") {
    pet.species = "Dog"
  }

  if (isAdmin(event)) {
    // actually save into database 
    const client = await getDbClient()
    await client.db().collection("pets").insertOne(pet)
    client.close()

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