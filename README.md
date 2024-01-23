# node-express-utils
Useful Express JS utils written in Typescript 

### This module provide the following functionalities as an express middleware
- Logger
- JWT based authentication

## Logger
It provides the logger which is available with all the requests.

```
const express = require('express');
const app = express();
const { logger } = require("express-essentials-utils");

app.use(logger());

app.listen(3000, () => console.log('Server started at port 3000'));
```

## JWT based authentication
This requires two secrets to configure the module.

```
const express = require('express');
const app = express();
const { jwt, verifyJwtToken } = require("express-essentials-utils");

// configuring jwt module with secrets
// in accepts jwt options
app.use(jwt({
    secret: "secret_string",
    cipherSecret: "some_other_secret_string",
}));

// using `verifyJwtToken` with a protected route
app.post('/posts', verifyJwtToken, (req, res, next) => {
    // do something

    // get decrepted token details
    const tokenData = request.getTokenData();

    // do something with tokenData
});

app.post('/login', (req, res, next) => {
    // do something

    // create token
    const data = 'some_data_in_string_format';

    // OR stringify the JSON object/array
    // const data = JSON.stringify({name: "test"});

    // accepts the input in string format
    const encryptedToken = req.createToken(data);
    req.send({encryptedToken});
})

app.listen(3000, () => console.log('Server started at port 3000'));

```

### JWT Options
The options include following properties

Property | Required | Description
--- | --- | ---
`secret` | true | Secret for signing the key
`cipherSecret` | true | Secret for encryption/decryption
`headerName` | false | Sepcifies the name of the header key in which the token will be received. default: `authorization`