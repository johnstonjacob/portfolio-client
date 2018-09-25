const withCSS = require('@zeit/next-css')

module.exports = withCSS()
module.exports.publicRuntimeConfig = {
    API_URL: "http://localhost:8000/api",
    CV_URL: "https://s3.us-east-2.amazonaws.com/jacobjohnston/jacob-johnston-resume.pdf"
}
