/**
 * https://github.com/mouday/domain-admin/issues/113
 * 现在下载的通配符证书压缩包内文件名为 *.xx.com.pem，在Windows下会提示文件名错误，
 * 建议涉及泛域名的修改为_.xx.com这种格式
 * *.xx.com.pem => xx.com.pem
 * @param {string} domain 
 */
export function formatExportDomain(domain){
    return domain.replace(/\*\./g, '');
}