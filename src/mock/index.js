import Mock from 'mockjs'

// 导入所有文件
const files = import.meta.globEager('./api/*.json')

const mockApiConfigs = []

for (let fileName in files) {
  const result = fileName.match(/\.(?<apiName>.*)\.json/)

  mockApiConfigs.push({
    url: result.groups.apiName,
    data: files[fileName],
  })
}

/**
 * 生成数据
 */
export function useMock() {
  for (let config of mockApiConfigs) {
    Mock.mock(config.url, config.data)
  }
}
