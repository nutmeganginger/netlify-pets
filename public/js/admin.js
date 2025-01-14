async function start() {
  const ourPromise = await fetch("/.netlify/functions/adminDashboard")
  const ourData = await ourPromise.json()

  if (ourData.success) {
    console.log(ourData)
    document.querySelector("#render-here").innerHTML = ourData.pets
  }
  else {
    window.location = "/login"
  }
}

start()