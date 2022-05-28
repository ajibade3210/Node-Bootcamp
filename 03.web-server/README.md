# Create Basic Servers Wiv Node Js.

The Browser is a client that we use to make call to the DNS server to find the actual IP address off the server's Browser then send a request to the server with it.

The Web server senda a respnse which could vary from Jsons, Html File, XML, texts etc.

### Http

This defines defines a application layer protocol for transmitting hypermedia documents such as HTML.
It helps communicate between the Browser and the web servers.

### Http Port (i.e)

This specify an endpoinnt of communication in our operating sys. It is used to specify logical construct that identifies a specific process or a type of network service.

Ports are needed to direct traffic to the right appplication in or system.

## API

API specify how two applications talk to each other. It defines how a server response to requests made. Taking us where the type of the function call selected is supported, and how they are used. (i.e fetching a User list).

## Http VERBS

GET
POST
PUT
PATCH
DELETE....

## Http Requests:

Every Http Request has 4 main parts.

- Method: POST
- Path: /message (alias **resource**)
- Body: {"text":"hello", "photo":"smile.jpg"}
- Headers: Host.facebook.com

## Http Response

Every Http Response has 3 main parts.

- Headers: Content-Type: application/json
- Body: {text:"hi", photo: "wave.jpg"}
- StatusCode: 200

## Http Status Code

HTTP response status codes indicate whether a specific HTTP request has been successfully completed. Responses are grouped in five classes:

- Informational responses (100–199)
- Successful responses (200–299)
- Redirection messages (300–399)
- Client error responses (400–499)
- Server error responses (500–599)

```
(req, res)=> {

}
```

Where req and res are a readOnly and writeOnly stream in Node Js.

## Endpoints: This are different urls that our server can hit.

i.e

- Get/friends
- Get/friends/5
- Post/friends
- Put/friend/5

## Same Origin Policy:

The same-origin policy is a critical security mechanism that restricts how a document or script loaded by one origin can interact with a resource from another origin.

It helps isolate potentially malicious documents, reducing possible attack vectors.

**Origin** is the combination of the protocol, host, port.
The browser and Js use the "same origin policy". This helps protect the users privacy.

We you need to talk to several website, It is advisable to make sure you use a **Cors**.

**Cors** Is a way of relaxing the restriction that the same origin enforces.

If we dont set "access control allow all origin" header then the same origin policy apply.

This settiing is always set on the header section of our responses.

If you are trying to lock down your site it is best to set the "access control allow all origin" to a limited site.

**Cors** follows the practice of White Listing.

**White Listing:** Deny access by default. Is the practice of explicitly allowing access to a particular privilege or serice.

**Black Listing:** This is the opposite of White Listing. Here you have to block access manually. It easy to miss some users.

It is always better to use White Listing.

It is the Browser that enforces the same origin policy.

## Dependency Used:
