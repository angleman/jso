'use strict'

function allowed(str) {
  return (typeof str == 'string' &&
    str.indexOf(',')  < 0 && str.indexOf(':')  < 0 &&  // , sJSON seperator        : sJSON seperators
    str.indexOf('.')  < 0 && str.indexOf('+')  < 0 &&  // . web token seperator    + sJSON space
    str.indexOf('?')  < 0 && str.indexOf('&')  < 0 &&  // ? url param              & url param
    str.indexOf('=')  < 0 && str.indexOf('#')  < 0 &&  // = url param              & url param
    str.indexOf('%')  < 0 &&                           // % special encode param
    str.indexOf('\\') < 0 && str.indexOf('`')  < 0 &&  // \ escape character       ` template
    str.indexOf("\n") < 0 && str.indexOf("\t") < 0 &&  // common breaking control characters
    str.indexOf("\"") < 0 && str.indexOf("\\") < 0     // these tend to break things so disallow
  )
}

function stringify(obj) {
  var type = typeof obj
  if (type == 'undefined') return '0'
  if (type == 'boolean')  return (obj) ? '1' : '0'
  if (type != 'object')   return JSON.stringify(obj) // no additional shrinking at this point
  if (!obj) return '0'
  var result = ''
  var addColon = true
  for (var i in obj) {
    var val = obj[i]
    var typ = typeof val
    if (typ == 'string' && !allowed(val)) return JSON.stringify(obj) // unallowed character encountered
    if (!!val && JSON.stringify(val) != 'null') { // only encode truthy values
      if (result.length) result += ','
      switch (typ) {
        case 'boolean':
          result += i + ((addColon) ? ':1' : '')
          break
        case 'string' :
          if (typ == 'string' && !allowed(val)) return JSON.stringify(obj)
          result += i + ':' + val.split(' ').join('+')
          break
        case 'number':
          result += i + ((addColon || val != 1) ? ':' + val : '')
          break
        default:
          return JSON.stringify(obj)
      }
      addColon = false
    }
  }
  return (result) ? result : '{}'
}



function parse(str) {
  if (typeof str == 'string' && str.substr(0,1) != '{' && str.substr(0,1) != '[' && str.indexOf('"') < 0 && str.indexOf(':') >= 0) { // if quick check shows is isn't JSON
    var result = {}
    var part   = str.split(',')
    for (var i in part) {
      var [ key, value ] = part[i].split(':')
      if (value === undefined) value = 1
      result[key] = (value == '0' || parseFloat(value)) ? parseFloat(value) : value.split('+').join(' ')
    }
    return result
  }
  try {
    return JSON.parse(str)
  } catch(e) {
    return str
  }
}



module.exports = {
  parse:     parse,
  stringify: stringify
}
