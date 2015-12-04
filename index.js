var cheerio = require('cheerio');
var colors = require('colors');
var parseString = require('xml2js').parseString;
var program = require('commander');
var request = require('request');

program
  .version(require('./package.json').version)
  .option('-f, --from <currency>', 'currency (from)')
  .option('-t, --to <currency>'  , 'currency (to)')
  .option('-a, --amount [number]', 'amount (optional)', parseFloat)
  .option('-p, --provider [google|yahoo|ecb]', 'provider name like Google, Yahoo, European Central Bank (optional)')
  .parse(process.argv);

if (!program.from || !program.to) {
  console.error('Please enter currencies.'.red);
  return;
}

var from     = program.from.toUpperCase();
var to       = program.to.toUpperCase();
var amount   = program.amount || 1;
var provider = program.provider || 'google';
var url      = '';

if (provider === 'google') {
  url = 'https://www.google.com/finance/converter?a='+ amount +'&from='+ from +'&to='+ to;
}
else if (provider === 'yahoo') {
  url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22' + from + to + '%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
}
else if (provider === 'ecb') {
  if (from !== 'EUR') {
    console.error('European Central Bank is available for only EUR currency.'.red);
    return;
  }

  url = 'http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';
}
else {
  console.error('Unknown provider.'.red);
  return;
}

request(url, function (error, response, body) {

  if (error || response.statusCode !== 200) {
    console.error('Something went wrong, please try again.'.red);
    return;
  }

  if (provider === 'google') {
    $ = cheerio.load(body);
    var result = $('div#currency_converter_result').text().split(' = ');
    console.log(result[0].trim().cyan);
    console.log(result[1].trim().yellow);
  }
  else if (provider === 'yahoo') {
    var result = JSON.parse(body);

    console.log((amount +' '+from).cyan);
    console.log(((amount * result.query.results.rate.Rate).toFixed(2) +' '+ to).yellow);
  }
  else if (provider === 'ecb') {
    parseString(body, function (error, result) {
      if (error) {
        console.error('Something went wrong, please try again.'.red);
        return;
      }

      var result = result['gesmes:Envelope']['Cube'][0]['Cube'][0]['Cube'];

      result.forEach(function(cube) {
        if (cube['$'].currency.toUpperCase() === to) {
          console.log((amount +' '+from).cyan);
          console.log((amount * cube['$'].rate +' '+ to).yellow);
        }
      });
    });
  }
});
