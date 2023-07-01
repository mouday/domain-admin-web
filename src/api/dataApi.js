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
  // getUpdateDomainStatusOfUser: '/getUpdateDomainStatusOfUser',
  // getCheckDomainStatusOfUser: '/getCheckDomainStatusOfUser',
  updateAllDomainCertInfoOfUser: '/updateAllDomainCertInfoOfUser',
  importDomainFromFile: '/importDomainFromFile',
  exportDomainFile: '/exportDomainFile',
  getAllDomainListOfUser: '/getAllDomainListOfUser',
  // checkDomainCert: '/checkDomainCert',
  // updateDomainSetting: '/updateDomainSetting',
  // getDomainFilterData: '/getDomainFilterData',
  getDomainGroupFilter: '/getDomainGroupFilter',

  getAllSystemConfig: '/getAllSystemConfig',
  updateSystemConfig: '/updateSystemConfig',
  getSystemVersion: '/getSystemVersion',
  getSystemEnvConfig: '/getSystemEnvConfig',
  getCronConfig: '/getCronConfig',
  updateCronConfig: '/updateCronConfig',

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

  // getNotifyOfUser: '/getNotifyOfUser',
  // updateNotifyOfUser: '/updateNotifyOfUser',
  // testWebhookNotifyOfUser: '/testWebhookNotifyOfUser',
  // testWorkWeixinNotifyOfUser: '/testWorkWeixinNotifyOfUser',
  // getTemplateData: '/getTemplateData',
  getNotifyListOfUser: '/getNotifyListOfUser',
  addNotify: '/addNotify',
  deleteNotifyById: '/deleteNotifyById',
  updateNotifyStatusById: '/updateNotifyStatusById',
  updateNotifyById: '/updateNotifyById',
  getNotifyById: '/getNotifyById',
  handleTestNotifyById: '/handleTestNotifyById',
  handleNotifyByEventId: '/handleNotifyByEventId',

  // 分组管理
  addGroup: '/addGroup',
  updateGroupById: '/updateGroupById',
  deleteGroupById: '/deleteGroupById',
  deleteGroupByIds: '/deleteGroupByIds',
  getGroupList: '/getGroupList',
  getGroupById: '/getGroupById',

  domainRelationGroup: '/domainRelationGroup',

  // 实验室
  getWhoisRaw: '/getWhoisRaw',

  // 主机地址
  getAddressListByDomainId: '/getAddressListByDomainId',
  addAddress: '/addAddress',
  deleteAddressById: '/deleteAddressById',
  deleteAddressByIds: '/deleteAddressByIds',
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
  // checkDomainExpire: '/checkDomainExpire',
  importDomainInFromFile: '/importDomainInFromFile',
  exportDomainInfoFile: '/exportDomainInfoFile',
  getDomainInfoGroupFilter: '/getDomainInfoGroupFilter',
  
  getICP: '/getICP'
}
