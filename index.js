'use strict'

function allowed(str) {
  return (typeof str == 'string' &&
    str.indexOf(',')  < 0 && str.indexOf(':')  < 0 &&  // , sJSON seperator        : sJSON seperators
    str.indexOf('.')  < 0 && str.indexOf('+')  < 0 &&  // . web token seperator    + sJSON space
    str.indexOf('?')  < 0 && str.indexOf('&')  < 0 &&  // ? url param              & url param
    str.indexOf('=')  < 0 && str.indexOf('#')  < 0 &&  // = url param              & url param
    str.indexOf('%')  < 0 && str.indexOf('*')  < 0 &&  // % special encode param   * wildcard
    str.indexOf('\\') < 0 && str.indexOf('`')  < 0 &&  // \ escape character       ` template
    str.indexOf("\n") < 0 && str.indexOf("\t") < 0 &&  // common breaking control characters
    str.indexOf("\"") < 0 && str.indexOf("\\") < 0     // these tend to break things so disallow
  )
}

function stringify(obj) {
//  console.log('****stringify', typeof obj, obj, typeof JSON.stringify(obj), JSON.stringify(obj))
  var type = typeof obj
  if (type == 'undefined') return '0'
  if (type == 'boolean')  return (obj) ? '1' : '0'
  if (type != 'object')   return JSON.stringify(obj) // no additional shrinking at this point
  if (!obj) return '0'
  var result = ''

  for (var i in obj) {
    var val = obj[i]
    var typ = typeof val
//    console.log('---', i, typ, allowed(val), !!val, JSON.stringify(val))
    if (typ == 'string' && !allowed(val)) return JSON.stringify(obj) // unallowed character encountered
//    console.log('--- 2')
    if (!!val && JSON.stringify(val) != 'null') { // only encode truthy values
      if (result.length) result += ','
//      console.log('--- 3')
      switch (typ) {
        case 'boolean':
//        console.log('*boo', i, typeof val, val)
          result += i + ':1'
          break
        case 'string' :
//          console.log('*str', i, typeof val, val)
          if (typ == 'string' && !allowed(val)) return JSON.stringify(obj)
          result += i + ':' + val.split(' ').join('+')
          break
        case 'number':
//          console.log('*num', i, typeof val, val)
          result += i + ':' + val
          break
        default:
//          console.log('*def', i, typeof val, val, "*** break")
          return JSON.stringify(obj)
      }
//      console.log('- - switch', typ)
//    } else {
//      console.log('- - skip', i, JSON.stringify(val))
    }
  }
//  console.log('- - done', result)
  return (result) ? result : '{}'
}



function parse(str) {
  if (typeof str == 'string' && str.substr(0,1) != '{' && str.substr(0,1) != '[' && str.indexOf('"') < 0 && str.indexOf(':') >= 0) { // if quick check shows is isn't JSON
    var result = {}
    var part   = str.split(',')
    for (var i in part) {
      var [ key, value ] = part[i].split(':')
//      console.log('--- parse', key, value, typeof value, (value == '0' || parseFloat(value)))
      result[key] = (value == '0' || parseFloat(value)) ? parseFloat(value) : value.split('+').join(' ')
    }
    return result
  }
  return JSON.parse(str)
}



module.exports = {
  parse:     parse,
  stringify: stringify
}
