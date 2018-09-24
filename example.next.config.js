const withCSS = require('@zeit/next-css')

module.exports = withCSS()
module.exports.publicRuntimeConfig = {
    API_URL: "http://localhost:8000/api"
}