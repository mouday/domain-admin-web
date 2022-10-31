/**
 * 接口配置
 */
export default {
  login: '/login',

  getDomainList: '/getDomainList',
  addDomain: '/addDomain',
  getDomainById: '/getDomainById',
  deleteDomainById: '/deleteDomainById',
  updateDomainById: '/updateDomainById',
  updateDomainCertInfoById: '/updateDomainCertInfoById',
  updateAllDomainCertInfoOfUser: '/updateAllDomainCertInfoOfUser',
  importDomainFromFile: '/importDomainFromFile',
  getAllDomainListOfUser: '/getAllDomainListOfUser',
  sendDomainInfoListEmail: '/sendDomainInfoListEmail',
  checkDomainCert: '/checkDomainCert',

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
}
