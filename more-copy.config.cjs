const NunjucksPlugin = require('more-copy/plugins/nunjucks-plugin/index.js')
const ReadFilePlugin = require('more-copy/plugins/read-file-plugin/index.js')
const ConsolePlugin = require('more-copy/plugins/console-plugin/index.js')
const TimePlugin = require('more-copy/plugins/time-plugin/index.js')
const WriteFilePlugin = require('more-copy/plugins/write-file-plugin/index.js')

const path = require('path')

let params = process.argv.slice(2)
console.log(params)

let [type, name, dataFilename, input, output] = params

// const data = JSON.parse(fs.readFileSync(dataFilename))
const data = require(dataFilename)
// console.log(data);

// 模板目录
const template = path.resolve('./template')

// console.log(template)

// 输出目录
const output_dir = `src/views/${name}-${type}`

function pathResolve(filename) {
  return path.join(template, filename)
}

module.exports = {
  // 数据
  data: {
    name,
    edit_name: `${name}-edit`,
    list_name: `${name}-list`,
    ...data,
  },

  // 使用插件，有先后顺序
  plugins: [
    // new ParsePlugin(),
    new TimePlugin(),
    // new MkdirPlugin(),
    new ConsolePlugin(),
    
    new ReadFilePlugin({
      filename: pathResolve(input),
    }),
    
    new NunjucksPlugin(),
    new WriteFilePlugin({
      filename: path.join(output_dir, output),
      mkdir: true,
    }),
  ],
}
