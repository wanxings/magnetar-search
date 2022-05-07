const fs = require('fs')
const { Random } = require('mockjs')

/**
 * @description 随机生成图片url。
 * @returns {string}
 */
function handleRandomImage(/* width = 50, height = 50 */) {
  //return `https://picsum.photos/${width}/${height}?random=${Random.guid()}`
  return `https://gitee.com/chu1204505056/image/raw/master/table/vab-image-${Random.integer(
    1,
    38
  )}.jpg`
}

/**
 * @description 处理所有 controller 模块，npm run serve时在node环境中自动输出controller文件夹下Mock接口，请勿修改。
 * @returns {[]}
 */
function handleMockArray() {
  const getFiles = (path, baseUrl = './controller') => {
    const files = fs.readdirSync(path)
    return files.flatMap((file) => {
      const fPath = `${path}/${file}`
      const stat = fs.statSync(fPath)
      return stat.isDirectory()
        ? getFiles(fPath, `${baseUrl}/${file}`)
        : `${baseUrl}/${file}`
    })
  }
  return getFiles('mock/controller')
}

module.exports = {
  handleRandomImage,
  handleMockArray,
}
