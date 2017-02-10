## Wordcut ported to TypeScript

Thai word breaker for Node.js

Under development ...

## Installation

`npm install wordcut`

## Usage

```javascript
var wordcut = require("wordcut");

wordcut.init();
console.log(wordcut.cut("กากา"));
```

With additional custom dictionary

```javascript
//see test/test_customdict.js
wordcut.init([customdict/*.txt],true);
```

## Command line interface

`worcut < input_file > output_file`

**Options**

`--delim  --dict`

## Web API

**Start service**

`node server.js`

**Trying web API**

`curl -X POST --data-binary '{"line":"กากา"}' http://localhost:8882/segment`

## Development

- Explanation in Thai about version 0.0.3 http://veer66.wordpress.com/2014/02/19/wordcut2014