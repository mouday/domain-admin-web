import {isJson, isObject, isNumber}from './validator-util.js'

// validateBody
export function jsonObjectValidator(rule, value, callback) {
  if (!value) {
    return callback()
  }

  if (!isJson(value)) {
    return callback(new Error('必须是json'))
  }

  let parseValue = JSON.parse(value)

  if (!isObject(parseValue)) {
    callback(new Error('必须是object对象'))
  } else {
    callback()
  }
}


export function validatorNumber (rule, value, callback){
  if (!value) {
    return callback()
  }

  if (!isNumber(value)) {
    return callback(new Error('只能是非负整数'))
  } else {
    callback()
  }
}