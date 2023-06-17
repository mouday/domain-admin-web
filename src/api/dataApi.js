/**
 * 接口配置
 */
export default {
  login: '/login',

  getDomainList: '/getDomainList',
  addDomain: '/addDomain',
  getDomainById: '/getDomainById',
  deleteDomainById: '/deleteDomainById',
  deleteDomainByIds: '/deleteDomainByIds',
  updateDomainById: '/updateDomainById',
  updateDomainFieldById: '/updateDomainFieldById',
  updateDomainExpireMonitorById: '/updateDomainExpireMonitorById',
  updateDomainCertInfoById: '/updateDomainCertInfoById',
  updateDomainRowInfoById: '/updateDomainRowInfoById',
  getUpdateDomainStatusOfUser: '/getUpdateDomainStatusOfUser',
  getCheckDomainStatusOfUser: '/getCheckDomainStatusOfUser',
  updateAllDomainCertInfoOfUser: '/updateAllDomainCertInfoOfUser',
  importDomainFromFile: '/importDomainFromFile',
  exportDomainFile: '/exportDomainFile',
  getAllDomainListOfUser: '/getAllDomainListOfUser',
  sendDomainInfoListEmail: '/sendDomainInfoListEmail',
  checkDomainCert: '/checkDomainCert',
  updateDomainSetting: '/updateDomainSetting',
  getDomainFilterData: '/getDomainFilterData',

  getAllSystemConfig: '/getAllSystemConfig',
  updateSystemConfig: '/updateSystemConfig',
  getSystemVersion: '/getSystemVersion',

  getUserInfo: '/getUserInfo',
  updateUserInfo: '/updateUserInfo',
  updateUserPassword: '/updateUserPassword',

  getUserList: '/getUserList',
  addUser: '/addUser',
  deleteUser: '/deleteUser',
  updateUserStatus: '/updateUserStatus',

  getLogSchedulerList: '/getLogSchedulerList',
  clearLogSchedulerList: '/clearLogSchedulerList',

  getIpInfo: '/getIpInfo',

  getNotifyOfUser: '/getNotifyOfUser',
  updateNotifyOfUser: '/updateNotifyOfUser',
  testWebhookNotifyOfUser: '/testWebhookNotifyOfUser',
  testWorkWeixinNotifyOfUser: '/testWorkWeixinNotifyOfUser',
  getTemplateData: '/getTemplateData',

  // 分组管理
  addGroup: '/addGroup',
  updateGroupById: '/updateGroupById',
  deleteGroupById: '/deleteGroupById',
  getGroupList: '/getGroupList',
  getGroupById: '/getGroupById',

  domainRelationGroup: '/domainRelationGroup',

  // 实验室
  getWhoisRaw: '/getWhoisRaw',

  // 主机地址
  getAddressListByDomainId: '/getAddressListByDomainId',
  addAddress: '/addAddress',
  deleteAddressById: '/deleteAddressById',
  getAddressById: '/getAddressById',
  updateAddressById: '/updateAddressById',
  updateAddressListInfoByDomainId: '/updateAddressListInfoByDomainId',
  updateAddressRowInfoById: '/updateAddressRowInfoById',

  // 域名列表
  getDomainInfoList: '/getDomainInfoList',
  addDomainInfo: '/addDomainInfo',
  updateDomainInfoRowById: '/updateDomainInfoRowById',  
  updateDomainInfoOfUser: '/updateDomainInfoOfUser',
  deleteDomainInfoById: '/deleteDomainInfoById',
  deleteDomainInfoByIds: '/deleteDomainInfoByIds',
  getDomainInfoById: '/getDomainInfoById',
  updateDomainInfoById: '/updateDomainInfoById',
  updateDomainInfoFieldById: '/updateDomainInfoFieldById',
  checkDomainExpire: '/checkDomainExpire',
  importDomainInFromFile: '/importDomainInFromFile',
  
}
