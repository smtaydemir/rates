<img src="http://www.gradworthy.co/assets/flat-cash-6ced839afa615b1ef94f75efa9c019a9.png" width="120">

# rates
Get current exchange rates directly from your terminal!

[![npm version][npm-image]][npm-url]
[![npm downloads monthly][dm-image]][dm-url]
[![npm downloads total][dt-image]][dt-url]
[![npm dependencies][dep-image]][dep-url]
[![npm devDependencies][devdep-image]][devdep-url]
[![github license][license-image]][license-url]

## install

```bash
[sudo] npm install -g rates
```

## update

```bash
[sudo] npm update -g rates
```

## use

```bash
rates -h

  Options:

    -h, --help                         output usage information
    -V, --version                      output the version number
    -f, --from <currency>              currency (from)
    -t, --to <currency>                currency (to)
    -a, --amount [number]              amount (optional)
    -p, --provider [google|yahoo|ecb]  provider name like Google, Yahoo, European Central Bank (optional)
```

```bash
rates -f usd -t eur
```

![cat](https://raw.githubusercontent.com/smtaydemir/rates/master/ss1.png)

```bash
rates -f eur -t usd -a 42 
```

![cat](https://raw.githubusercontent.com/smtaydemir/rates/master/ss2.png)


[npm-image]: https://img.shields.io/npm/v/rates.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/rates
[dm-image]: https://img.shields.io/npm/dm/rates.svg?style=flat-square
[dm-url]: https://www.npmjs.com/package/rates
[dt-image]: https://img.shields.io/npm/dt/rates.svg?style=flat-square
[dt-url]: https://www.npmjs.com/package/rates
[dep-image]: https://img.shields.io/david/smtaydemir/rates.svg?style=flat-square
[dep-url]: https://github.com/smtaydemir/rates
[devdep-image]: https://img.shields.io/david/dev/smtaydemir/rates.svg?style=flat-square
[devdep-url]: https://github.com/smtaydemir/rates
[license-image]: https://img.shields.io/github/license/smtaydemir/rates.js.svg?style=flat-square
[license-url]: https://opensource.org/licenses/MIT
