const cookie = require('cookie')

function isAdmin(event) {
  const incomingCookie = cookie.parse(event.headers.cookie || "")
  if (incomingCookie?.petadoption == "sieurojhawel1234535") {
    return true
  }
  return false
}

module.exports = isAdmin