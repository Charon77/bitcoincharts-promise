bitcoincharts-promise
=====

[![Build Status](https://travis-ci.org/Charon77/bitcoincharts-promise.svg?branch=master)](https://travis-ci.org/Charon77/bitcoincharts-promise)

(Unofficial) Promise-based [bitcoincharts](http://bitcoincharts.com/about/markets-api/) client.

## Installation

bitcoincharts-promise is available as `bitcoincharts-promise` on npm.

```
npm install bitcoincharts-promise
```

## Usage

```javascript
const bitcoincharts = require('bitcoincharts-promise'),

const options = {
    timeframe: 1,
    resolution: '30-min',
    transpose: false // Set true to unzip the resulting array
}

bitcoincharts.OHLC(options).then(result=>{
    console.log(result)
})
```

## License

This module is [ISC licensed](https://github.com/Charon77/bitcoincharts-promise/blob/master/LICENSE.txt).
