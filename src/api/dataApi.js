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
  updateDomainCertInfoById: '/updateDomainCertInfoById',
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
}
