const fs = require('fs-extra')
const path = require('path')

const folder = path.resolve(__dirname, '../../live')

fs.ensureDirSync(path.resolve(__dirname, folder))

exports.rcFolder = folder
