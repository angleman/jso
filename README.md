# sjn

Short JSON strings. JSON API compatible with failover to JSON. Strips falsy values. Only shortens flat objects.

## Install

```sh
npm i sjn
```

## Usage

```javascript
var sJSON = require('sjn');

sJSON.stringify({hello:'world'}) // hello:world
sJSON.parse('hello:world')       // {hello: 'world'}
```

## Values

Source Value | Stringify Value | Parse return Value
--- | --- | ---
false (boolean) | 0 (string) | 0 (number, truthy false)
null (object) | 0 (string) | 0 (number, truthy false)
undefined (undefined) | 0 (string) | 0 (number, truthy false)
0 (number) | 0 (string) | 0 (number)
9 (number) | 9 (string) | 9 (number)
3.14 (number) | 3.14 (string) | 3.14 (number)
"" (string) | "" (string) | "" (string)
"hi" (string) | "hi" (string) | "hi" (string)
{"hi":"mom"} (object) | hi:mom (string) | {"hi":"mom"} (object)
{"hi":"you, said"} (object) | {"hi":"you, said"} (string) | {"hi":"you, said"} (object)
{"hi":"m:m"} (object) | {"hi":"m:m"} (string) | {"hi":"m:m"} (object)
{"try":1} (object) | try:1 (string) | {"try":1} (object)
{"yes":true} (object) | yes:1 (string) | {"yes":1} (object)
{"omit":0} (object) | {} (string, falsy value removed) | {} (object)
{"falsy":false} (object) | {} (string, falsy value removed) | {} (object)
{"nully":null} (object) | {} (string, falsy value removed) | {} (object)
{"nan":null} (object) | {} (string, falsy value removed) | {} (object)
{"infinity":null} (object) | {} (string, falsy value removed) | {} (object)
{} (object) | {} (string) | {} (object)
{"hi":"mom","luv":"you"} (object) | hi:mom,luv:you (string) | {"hi":"mom","luv":"you"} (object)
{"i":"will","take":0} (object) | i:will (string) | {"i":"will"} (object)
{"will":"this do"} (object) | will:this+do (string, + for spaces) | {"will":"this do"} (object)
{"first":1,"second":1,"third":1} (object) | first:1,second,third (string, 1 assumed, truthy, after first entry) | {"first":1,"second":1,"third":1} (object)
"hello:" (string) | "hello:" (string) | "hello:" (string)
"hello:world" (string) | "hello:world" (string) | "hello:world" (string)
{"400":400} (object) | 400:400 (string) | {"400":400} (object)
{"100":1,"200":1,"300":1} (object) | 100:1,200,300 (string, 1 assumed, truthy, after first entry) | {"100":1,"200":1,"300":1} (object)

## Why?

Because every byte helps when you scale :-)

## License: MIT
