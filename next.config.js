const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  images: {
    domains: ['lh3.googleusercontent.com', 'firebasestorage.googleapis.com']
  }
})
