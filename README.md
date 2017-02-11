## Wordcut ported to TypeScript

Thai word breaker library for Node.js

Under development ...

## Installation

```
yarn add wordcut-ts
```

## Usage

```typescript
import { Wordcut } from "wordcut-ts";

var wordcut = new Wordcut(); 
wordcut.initNoDict();

console.log(wordcut.cut("กากา"));
```

With additional custom dictionary

```typescript
wordcut.init("customdict/*.txt" ,true);
```

## Web API

```bash
node server.js
curl -X POST --data-binary '{"line":"กากา"}' http://localhost:8882/segment
```

## Development

- Explanation in Thai about version 0.0.3 http://veer66.wordpress.com/2014/02/19/wordcut2014