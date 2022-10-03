export function getUUID() {
  let tempUrl = URL.createObjectURL(new Blob())
  let uuid = tempUrl.toString()
  //释放这个url
  URL.revokeObjectURL(tempUrl)
  return uuid.substring(uuid.lastIndexOf('/') + 1)
}

// console.log(getUUID())
// d258ce8f-af39-4f90-91b0-c82e09113eda
