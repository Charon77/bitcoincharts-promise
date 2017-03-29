
BitcoinchartsFactory = (request) => {
	return {
		getPrice ({timeframe = 1, resolution = '30-min'} = {})
		{
			// Get from bitcoin chart
			return new Promise((resolve, reject) => {
				getOHLC(arguments[0])
					.then((OLHCArray)=>{
						return resolve(OLHCArray[OLHCArray.length - 1])
					})
					.catch((error) => {
						console.log("Error:", error)
						return reject(error);
					});
			});
		},
				
		getOHLC({timeframe = 1, resolution = '30-min', transpose = false} = {})
		{
			return new Promise((resolve, reject) => {
				_getRawBitcoinOHLC(arguments[0])
				.then((arr) => {
					if (!transpose) {
						let OLHCArray = _addToOLHCArray();
						return resolve(
							arr.map((olhc)=> {
							let [t,o,l,h,c,v,w,x] = olhc
							return {
								timestamp: t,
								open: o,
								low: l,
								high: h,
								close: c,
								volume_btc: v,
								volume_cur: w,
								weighted_price: x}
							})
						);
					} else {
						let OLHCArray = _addToOLHCArray();
						arr.map((e) => {
							_addToOLHCArray(e, OLHCArray);
						});
						return resolve(OLHCArray);
					}
				})
				.catch((error) =>
				{
					console.log("Error: getOHLC, _getRawBitcoinOHLC");
					console.log(error);
					return reject(error);
				})
				;
			});
		},
			
		getLast(OLHCArray, ticker)
		{
			return OLHCArray[OLHCArray.length - 1];
		},
			
			
		_getRawBitcoinOHLC({
				timeframe = 1,
				customTime,
				resolution = '30-min'		
			} = {})
		{
			return new Promise ((resolve, reject) => {
				let query = {
					m: 'btcoidIDR',
					i: resolution,
					SubmitButton: 'Draw',
					r: timeframe
				}
				if (customTime) {
					{delete query.r}
					[query.c, query.s, query.e] = [1, customTime.startDate, customTime.endDate]
				}
				
				let r = request({
					// Resolution is Daily, Weekly, 30-min, etc
					url: 'https://bitcoincharts.com/charts/chart.json',
					qs: query,
					json: true
				},
				(error, response, body) => {
					if (error || !body) {
						console.log("_getRawBitcoinOLHC");
						return reject(error);
					}
					// Format: Timestamp, Open, High, Low, Close, Volume(BTC), Volume (Currency), Weighted Price
					return resolve(body);
				})
				
			});
		},
			
		_addToOLHCArray(element, obj)
		{
			if (obj==null)
			{
				obj = {};
				obj.timestamp = [];
				obj.open = [];
				obj.low = [];
				obj.high = [];
				obj.close = [];
				obj.volume = [];
				return obj;
			}
			// open: [...], low: [...], high: [...], close: [...], volume: [...] };
			obj.timestamp.push(element[0]);
			obj.open.push(element[1]);
			obj.low.push(element[2]);
			obj.high.push(element[3]);
			obj.close.push(element[4]);
			obj.volume.push(element[5]);
		}
	}
}

// Running for Node.js
if (typeof(module) == 'object') {
	const request = require('request')
	module.exports = BitcoinchartsFactory(request)
}

// Running for Require.js
if (typeof(define) == 'function') {
	console.log("Define called")
	define(['request'], (request) => {
		return BitcoinchartsFactory(request)
	})
} else {
	console.log("DEFINE iS")
	console.log(define)
}

