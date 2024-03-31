const NunjucksPlugin = require('@more-copy/nunjucks-plugin')
const ConsolePlugin = require('@more-copy/console-plugin')
const TimePlugin = require('@more-copy/time-plugin')
const ReadDataPlugin = require('@more-copy/read-data-plugin')
const path = require('path')

let configMap = [
  // mcp -m edit issue-certificate .data/issue_certificate.json
  // mcp -m edit group-user ./data/group-user.json
  // mcp -m edit monitor ./data/monitor.json
  // mcp -m edit certificate ./data/certificate.json
  // mcp -m edit email-test ./data/emailtest.json
  // mcp -m edit deploy-cert ./data/getDeployListByCertId.json
  {
    mode: 'edit',
    template: [
      {
        input: 'template/edit/config.js',
        output: (name) => `src/components/${name}-edit/config.js`,
      },
      {
        input: 'template/edit/DataForm.vue',
        output: (name) => `src/components/${name}-edit/DataForm.vue`,
      },
      {
        input: 'template/edit/DataFormDialog.vue',
        output: (name) => `src/components/${name}-edit/DataFormDialog.vue`,
      },
      {
        input: 'template/edit/index.vue',
        output: (name) => `src/components/${name}-edit/index.vue`,
      },
    ],
  },

  // mcp -m list issue-certificate .data/issue_certificate.json
  // mcp -m list notify data/notify.json
  //  mcp -m list group-user ./data/group-user.json
  //  mcp -m list host ./data/host.json
  //  mcp -m list monitor ./data/monitor.json
  //  mcp -m list certificate ./data/certificate.json
  {
    mode: 'list',
    template: [
      {
        input: 'template/list/index.vue',
        output: (name) => `src/components/${name}-list/index.vue`,
      },
      {
        input: 'template/list/DataTable.vue',
        output: (name) => `src/components/${name}-list/DataTable.vue`,
      },
      {
        input: 'template/list/DataTableDialog.vue',
        output: (name) => `src/components/${name}-list/DataTableDialog.vue`,
      },
    ],
  },
]

module.exports = (options) => {
  let mode = options.mode
  let name = options.args[0]
  let dataPath = options.args[1]

  let config = configMap.find((item) => item.mode == mode)

  let plugins = []
  for (let item of config.template) {
    plugins.push(
      new NunjucksPlugin({
        input: path.resolve(item.input),
        output: path.resolve(item.output(name)),
      })
    )
  }

  return {
    // 数据
    data: {
      name,
      edit_name: `${name}-edit`,
      list_name: `${name}-list`,
    },

    // 使用插件，有先后顺序
    plugins: [
      // new ParsePlugin(),
      new TimePlugin(),
      // new MkdirPlugin(),

      new ReadDataPlugin({
        filename: dataPath,
      }),

      new ConsolePlugin(),

      ...plugins,
    ],
  }
}
