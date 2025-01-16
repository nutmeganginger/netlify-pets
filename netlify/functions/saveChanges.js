const cloudinary = require("cloudinary").v2
const sanitizeHtml = require("sanitize-html")
const getDbClient = require("../../our-library/getDbClient")
const isAdmin = require("../../our-library/isAdmin")
const { ObjectId } = require("mongodb")


const cloudinaryConfig = cloudinary.config({
  cloud_name: "dkdbg6fvl",
  api_key: "568646442124532",
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true
})

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

  const expectedSignature = cloudinary.utils.api_sign_request({ public_id: body.public_id, version: body.version }, cloudinaryConfig.api_secret)
  if (expectedSignature === body.signature) {
    pet.photo = body.public_id
  }


  if (isAdmin(event)) {
    // actually save into database 
    if (!ObjectId.isValid(body.id)) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: false })
      }
    }
    const client = await getDbClient()
    await client.db().collection("pets").findOneAndUpdate({ _id: new ObjectId(body.id) }, { $set: pet })

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