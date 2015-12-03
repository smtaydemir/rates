var request = require('request');
var colors = require('colors');
var args = process.argv;
args.splice(0,2);

var currencyOne = args[0];
var currencyTwo = args[1];
var multiplier  = args[2];
if(currencyOne && currencyTwo) {
  currencyOne = currencyOne.toUpperCase();
  currencyTwo = currencyTwo.toUpperCase();

  request('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22'+currencyOne+currencyTwo+'%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=', function (error, response, body) {
    if (!error && response.statusCode == 200)
      var content = JSON.parse(body);
    if(!multiplier) {
      console.log(
        "\n"+
        colors.cyan("1 "+currencyOne+" \n")+
        colors.yellow(content.query.results.rate.Rate+" "+currencyTwo)+
        "\n"
      );
    } else {
      console.log(
        "\n"+
        colors.cyan(multiplier+" "+currencyOne+" \n")+
        colors.yellow((content.query.results.rate.Rate*multiplier).toFixed(2)+" "+currencyTwo)+
        "\n"
        );
    }
  });

} else {
  console.log("\n"+colors.red.bold("Enter currency")+"\n");
}
