const key = 'domain-list/table-column'

export function setTableColumn(columns) {
  localStorage.setItem(key, JSON.stringify(columns))
}

export function getTableColumn() {
  let value = localStorage.getItem(key)
  if (value) {
    return JSON.parse(value)
  } else {
    return []
  }
}
