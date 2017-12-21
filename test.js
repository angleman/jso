// test/main.js

function IS(r,i){if(!r)throw Error(i)}IS.NT=function(r,i){if(r)throw Error(i)}; // https://github.com/yieme/IS

var JSO = require('./index')

var debug = false

console.log('Source Value | Stringify Value | Parse Value')
console.log('--- | --- | ---')

function test(obj, expectedValue, expectedDecode) {
  var boolObj = typeof obj == 'boolean'
  var lin = JSON.stringify(obj) + ' (' + typeof obj + ')'
  if (debug) console.log('')
  if (debug) console.log('obj           :', typeof obj, obj)

  if (undefined === expectedValue) expectedValue = JSON.stringify(obj)
  var asString   = JSO.stringify(obj)
  if (debug) console.log('JSO.stringify :', typeof asString, asString)
  if (debug) console.log('expectedValue :', typeof expectedValue, expectedValue)
  IS(asString == expectedValue, 'Expected encode ' + expectedValue)
  if (typeof expectedValue == 'object') {
    lin += ' | ' + JSON.stringify(expectedValue) + ' (' + typeof expectedValue + ')'
  } else {
    lin += ' | ' + expectedValue + ' (' + typeof expectedValue + ')'
  }

  if (undefined === expectedDecode) expectedDecode = obj
  var asObj      = JSO.parse(asString)
  if (debug) console.log('JSO.parse     :', typeof asObj, asObj)
  if (debug) console.log('expectedDecode:', typeof expectedDecode, expectedDecode)

  IS(typeof asObj == typeof expectedDecode, 'Expected decode type ' + expectedDecode)
  var compareJson  = JSON.stringify(expectedDecode)
  IS(JSON.stringify(asObj) == compareJson, 'Expected decode ' + expectedDecode)
  if (boolObj) {
    console.log(lin +  ' | ' + compareJson + ' (truthy ' + JSON.stringify(!!obj) + ')')
  } else {
    console.log(lin +  ' | ' + compareJson + ' (' + typeof expectedDecode + ')')
  }
}

test(true,  '1', 1)
test(false, '0', 0)
test(null,  '0', 0)
test(undefined, '0', 0)
test(0, '0')
test(9, '9')
test(3.14)
test('')
test('hi')
test({hi:"mom"}, 'hi:mom')
test({hi:"you, said"})
test({hi:"m:m"})
test({try:1}, 'try:1')
test({yes:true}, 'yes:1', {yes:1})
test({omit:0}, '{}', {})
test({falsy:false}, '{}', {})
test({nully:null}, '{}', {})
test({nan:NaN}, '{}', {})
test({infinity:Infinity}, '{}', {})
test({not_defined:undefined}, '{}', {})
test({hi:"mom", luv:"you"}, 'hi:mom,luv:you')
test({i:'will',take:0}, 'i:will', {i:'will'})
test({will:"this do"}, 'will:this+do')
