const SvgDict = {};

const path = require('path')
const files = require.context('./svg', false, /\.svg$/)
files.keys().forEach(key => {
  const name = path.basename(key, '.svg')
  SvgDict[name] = files(key).default || files(key)
})

export default SvgDict;
