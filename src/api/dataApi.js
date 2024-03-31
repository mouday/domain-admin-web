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
  updateDomainFieldByIds: '/updateDomainFieldByIds',
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
  getSystemData: '/getSystemData',
  getMonitorTaskNextRunTime: '/getMonitorTaskNextRunTime',

  getUserInfo: '/getUserInfo',
  updateUserInfo: '/updateUserInfo',
  updateUserPassword: '/updateUserPassword',

  getUserList: '/getUserList',
  addUser: '/addUser',
  deleteUser: '/deleteUser',
  updateUserStatus: '/updateUserStatus',
  resetUserPasswordUser: '/resetUserPasswordUser',

  // 调度日志
  getLogSchedulerList: '/getLogSchedulerList',
  clearLogSchedulerList: '/clearLogSchedulerList',

  // 操作日志
  getOperationLogList: '/getOperationLogList',
  clearLogOperationList: '/clearLogOperationList',

  getIpInfo: '/getIpInfo',
  queryDomainCname: '/queryDomainCname',

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
  getSubDomainCert: '/getSubDomainCert',
  updateDomainICPOfUser: '/updateDomainICPOfUser',
  updateDomainRowICP: '/updateDomainRowICP',

  getICP: '/getICP',

  // 分组权限
  addGroupUser: '/addGroupUser',
  updateGroupUserById: '/updateGroupUserById',
  deleteGroupUserById: '/deleteGroupUserById',
  deleteGroupUserByIds: '/deleteGroupUserByIds',
  getGroupUserById: '/getGroupUserById',
  getGroupUserList: '/getGroupUserList',

  // 证书信息
  getCertInformation: '/getCertInformation',

  // 异步任务日志
  getAsyncTaskLogList: '/getAsyncTaskLogList',
  clearAsyncTaskLogList: '/clearAsyncTaskLogList',

  // SSL证书
  getIssueCertificateList: '/getIssueCertificateList',
  issueCertificate: '/issueCertificate',
  renewCertificate: '/renewCertificate',
  getIssueCertificateById: '/getIssueCertificateById',
  verifyCertificateById: '/verifyCertificateById',
  renewIssueCertificateById: '/renewIssueCertificateById',

  getDomainHost: '/getDomainHost',
  deployVerifyFile: '/deployVerifyFile',
  deployCertificateFile: '/deployCertificateFile',
  getCertificateChallenges: '/getCertificateChallenges',
  deleteIssueCertificateById: '/deleteIssueCertificateById',
  deleteCertificateByBatch: '/deleteCertificateByBatch',
  getAllowCommands: '/getAllowCommands',
  notifyWebHook: '/notifyWebHook',

  // 主机管理
  getHostList: '/getHostList',
  addHost: '/addHost',
  getHostById: '/getHostById',
  updateHostById: '/updateHostById',
  deleteHostById: '/deleteHostById',

  // http监控
  addMonitor: '/addMonitor',
  updateMonitorById: '/updateMonitorById',
  updateMonitorActive: '/updateMonitorActive',
  removeMonitorById: '/removeMonitorById',
  deleteMonitorByIds: '/deleteMonitorByIds',
  getMonitorById: '/getMonitorById',
  getMonitorList: '/getMonitorList',
  exportMonitorFile: '/exportMonitorFile',
  importMonitorFromFile: '/importMonitorFromFile',

  // http监控日志
  getLogMonitorList: '/getLogMonitorList',
  clearLogMonitor: '/clearLogMonitor',
  clearAllLogMonitor: '/clearAllLogMonitor',

  getTagList: '/getTagList',

  // 证书托管
  getCertificateList: '/getCertificateList',
  addCertificate: '/addCertificate',
  updateCertificateById: '/updateCertificateById',
  deleteCertificateById: '/deleteCertificateById',
  deleteCertificateByIds: '/deleteCertificateByIds',
  getCertificateById: '/getCertificateById',

  parsePublicCert: '/parsePublicCert',
  sendTestEmail: '/sendTestEmail',

  // 证书部署
  getDeployListByCertId: '/getDeployListByCertId',
  addDeployCert: '/addDeployCert',
  updateDeployCertById: '/updateDeployCertById',
  deleteByDeployCertId: '/deleteByDeployCertId',
  deleteByDeployCertIds: '/deleteByDeployCertIds',
  getDeployCertById: '/getDeployCertById',
  handleDeployCert: '/handleDeployCert',
}
