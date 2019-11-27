const path = require('path')
const express = require('express')
const fallback = require('express-history-api-fallback')
// Connectors

const distPath = path.resolve(__dirname, '../dist')
const publicPath = path.resolve(__dirname, '../ui-public')

const CACHE_CONTROL = 'no-store, no-cache, must-revalidate, private'

module.exports = app => {
  app.use(express.static(distPath, { setHeaders }))
  app.use('/public', express.static(publicPath, { setHeaders }))
  app.use(fallback(path.join(distPath, 'index.html'), {
    headers: {
      'Cache-Control': CACHE_CONTROL
    }
  }))
}

function setHeaders (res, path, stat) {
  res.set('Cache-Control', CACHE_CONTROL)
}
