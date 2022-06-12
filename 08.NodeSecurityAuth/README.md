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
