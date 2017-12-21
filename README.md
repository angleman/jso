# jso

Short JSON strings. JSON API compatible with failover to JSON. Strips non truthy values if shortened

NodeJS global override: `global.JSON = require('jso')`



## Install

```
npm install jso
```

## Usage

```javascript
var jso = require('jso');

```

Source Value | Stringify Value | Parse Value
--- | --- | ---
true (boolean) | 1 (string) | 1 (truthy true)
false (boolean) | 0 (string) | 0 (truthy false)
null (object) | 0 (string) | 0 (number)
undefined (undefined) | 0 (string) | 0 (number)
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
{"omit":0} (object) | {} (string) | {} (object)
{"falsy":false} (object) | {} (string) | {} (object)
{"nully":null} (object) | {} (string) | {} (object)
{"nan":null} (object) | {} (string) | {} (object)
{"infinity":null} (object) | {} (string) | {} (object)
{} (object) | {} (string) | {} (object)
{"hi":"mom","luv":"you"} (object) | hi:mom,luv:you (string) | {"hi":"mom","luv":"you"} (object)
{"i":"will","take":0} (object) | i:will (string) | {"i":"will"} (object)
{"will":"this do"} (object) | will:this+do (string) | {"will":"this do"} (object)

While it may not look like much, every byte helps when you scale :-) In this example we get at 15% headstart on any addition compression we may want to do.


## License: MIT
