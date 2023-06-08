# bafa-fetch

[![npm](https://img.shields.io/npm/v/bafa-fetch)](https://www.npmjs.com/package/bafa-fetch)
![npm](https://img.shields.io/npm/dw/bafa-fetch?label=↓)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/aoephtua/bafa-fetch/blob/master/LICENSE)

Node.js library to fetch requests of [BAFA Portal](https://fms.portal.bafa.de).

## Installing

Using npm:

    $ npm install bafa-fetch

Once the package is installed, you can import the function:

```javascript
import { getRequests } from './bafa-fetch.mjs';
```

## Usage

```javascript
const { data, status, error } = await getRequests({
    email: 'someone@example.com',
    password: '****'
});
```

See [example.mjs](src/example.mjs) to get an insight.


## Result

```json
{
    "vorgangsnummer": "...",
    "kennzeichen": "...",
    "status": { "key": "5", "description": "Proof of use in progress" },
    "antragsteller": "Surname, First name",
    "viewLink": "...",
    "editLink": null,
    "uploadLink": "https://fms.bafa.de/BafaFrame/upload?themenbereich=...&vorgangsnummer=...",
    "submitVnLink": null,
    "viewVnLink": "...",
    "standort": "Postal code City, Adress line 1",
    "antragsdatum": "YYYY-MM-DD",
    "vnSubmitted": true,
    "zwbDatum": "YYYY-MM-DD",
    "isBevollmaechtigter": 0,
    "bevollmaechtigter": 0
}
```

## License

This project is licensed under [MIT](LICENSE).