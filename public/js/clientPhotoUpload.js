let serverSignature
let serverTimestamp
let cloudinaryReturnedObject
let isFormLocked = false

async function getSignature() {
  const signaturePromise = await fetch("/.netlify/functions/getSignature")
  const theResponse = await signaturePromise.json()
  console.log(theResponse)
  serverSignature = theResponse.signature
  serverTimestamp = theResponse.timestamp
}

getSignature()

document.querySelector("#file-field").addEventListener("change", async function () {

  isFormLocked = true
  document.querySelector("#submit-btn").style.opacity = ".1"

  const data = new FormData()
  data.append("file", document.querySelector("#file-field").files[0])
  data.append("api_key", "568646442124532")
  data.append("signature", serverSignature)
  data.append("timestamp", serverTimestamp)

  // send to cloudinary

  const cloudinaryResponse = await axios.post("https://api.cloudinary.com/v1_1/dkdbg6fvl/auto/upload", data, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: function (e) {
      console.log(e.loaded / e.total)
    }
  })

  console.log(cloudinaryResponse.data)
  cloudinaryReturnedObject = cloudinaryResponse.data
  document.querySelector("#photo-preview").innerHTML = `<img src="https://res.cloudinary.com/dkdbg6fvl/image/upload/w_190,h_190,c_fill/${cloudinaryResponse.data.public_id}.jpg" />`

  isFormLocked = false
  document.querySelector("#submit-btn").style.opacity = "1"


})