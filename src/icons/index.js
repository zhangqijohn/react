const SvgDict = {};

const requireAll = requireContext => requireContext.keys().map((filePath) => {
  return (SvgDict[filePath.replace(/^\.\/|\.svg$/g, '')] = requireContext(filePath))
})
const req = require.context('./svg', false, /\.svg$/)
requireAll(req);

export default SvgDict;