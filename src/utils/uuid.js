export function getUUID() {
  let tempUrl = URL.createObjectURL(new Blob())
  let uuid = tempUrl.toString()
  //释放这个url
  URL.revokeObjectURL(tempUrl)
  return uuid.substring(uuid.lastIndexOf('/') + 1)
}