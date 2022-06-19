## Node Security Authentication

#### Cors

#### Principle of Least Privilege

#### OAuth

#### Using HTTPS With SSL/TLS

It is always best to talk to our server and make requests using https.

When we browse to a site without the https the data been sent and recived are not secured.

Check -> wireshark

SSL/TLS --> wraps --> http --> https

TLS protocols:
SSL/TLS certificate: This is a certificate used to verify the server's ownership prior to sending encrypted data.
It is used to verify we are actually talking to the server we expcted.

TLS certificate categories

- Self-Signed Certificate:
  Enable HTTPs but not trusted by others. Useful for development.

-CA-Signed Certificate
Trusted by most client on the web. Useful for production.

### Using HTTPS in Nodejs Servers

branch: CreatingSImpleHttpsServer

Using the built in Https module in node and OpenSSL.

To generate an openssl key use:
To Run Code Install Git for Windows
`openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365`

This approach is known as public key cryptography

```js
https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening On Port ${PORT}..`);
  });
```

### Using Helmet

Helmet helps secure Express apps by setting various HTTP header. Its not a silver but has alot of benefits.

It hides sensitive details from the application header,
And

### No Auth

- `Authentication` Verifys Users are who they claim to be, usually with a user name, password, 2fa etc. Authentication is the LogIn

- `Authorization` checks whether that user has permission to a specific resource after been authenticated. Sometimes called `Access Control`. Authorization is the Permission.

### Social SignOn

There are 3main tool to make sure only Authorize User can access a site

- JWT
- API key
- OAuth Token.

Token Based Authentication Only Works well when using https.
JWT:- Is a piece of encoded text. It is just the data in a JSON Object encoded in base64.

Every JWT can be broken down into 3sections.

- header:
- payload: A claim, iat (issues At)
- verify signature:
  Every piece of information caputered by our payload is know as a

OAUTH2:

- Minmize Attack Surfaces

OAUTH Flow.

ResourceOwner (User) --> CLient --> Resource Server --> Authorization Server

Create New Project --> Make Sure Your Project is Selected --> CLick On Credetials --> Create OAuth Client ID --> Configure a consent screen

Passport Js Authentication Middleware...

### Cookies:
This are basically string of data stored in the browser.

### Session:
