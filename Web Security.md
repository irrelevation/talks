# Web Security

## Questions

- How to hack a website/server?
- What can I do as a developer?
- How to facilitate writing secure code?
- How is Information delivered over the Internet?

## A brief History of the Internet

### Early 90s
- Tim Berners Lee developes HTTP(89-91) & HTML(93) @ CERN
- text based data transfer, no encryption, first web sites
- evolution, images Mosaic -> Netscape Navigator

### Mid 90s
- templating: in 94 Rasmus Lerdorf creates PHP (Personal Home Page), dynamic generation of HTML
- interactivity: in 95 Brendan Eich creates Mocha->LiveScript->JavaScript


## How the Internet works (today)

[The Internet protocol suite](https://en.wikipedia.org/wiki/Internet_protocol_suite): A bundle of protocols specifying "How the Internet Works"

### Architecture

The 4 layers of Internet Protocols in order of increasing abstraction.

| Name | Descripton | Protocols |
| --- | --- | --- |
| Link Layer | The lowest layer, protocols describe how *directly connected* nodes/links exchange information on a physical and logical level | MAC, Ethernet |
| Internet Layer | Protocols define addressing, routing and packeting, enable communication across networks, establish the internet | IP (v4, v6) |
| Transport Layer | Protocols define how hosts communicate with each other | TCP, UDP |
| Application Layer | Protocols define how processes communicate with each other | DHCP, DNS, FTP, HTTP, HTTPS, IMAP, LDAP, POP, RPC, SMTP, SSH, TLS/SSL, XMPP |

### TCP
The *Transport Control Protocol* enables reliable communications between hosts.

### IP
The *Internet Protocol* defines IP adresses, routing and packeting.

### DNS
The *Domain Name System* provides human understandable aliases for IP addresses

### HTTP
The *Hypertext Transfer Protocol* lets user agents (aka. browsers) communicate with servers.

#### Request Format
- Method / verb
- URL
- Headers
- Body

#### Response Format
- Protocol version
- Status code
- Human understandable status code
- Headers
- Body

### TLS
*Transport Layer Security* (formerly SSL)

### HTTPS
HTTP + TLS


## Browser Security Model

JavaScript is executed in a *sandbox* withing wich the following actions are *not* permitted:
- Start new processes or access other existing processes. 
- Read arbitrary chunks of system memory. As a managed memory language, JavaScript can’t read memory outside its sandbox.
- Access the local disk. Modern browsers allow websites to store small amounts of data locally, but this storage is abstracted from the filesystem itself. 
- Access the operating system’s network layer. 
- Call operating system functions.

JavaScript executing in the browser sandbox *is* permitted to do the following actions:
- Read and manipulate the DOM of the current web page. 
- Listen to and respond to user actions on the current page by registering event listeners.
- Make HTTP calls on behalf of the user.
- Open new web pages or refresh the URL of the current page, but only in response to a user action. 
- Write new entries to the browser history and go backward and forward in history.
- Ask for the user’s location.
- Ask permission to send desktop notifications.


## The anatomy of logging into a website

### via session
1. The user visits `www.yourwebsite.com` in their browser
2. The browser tries to resolve the domain to an IP address. It looks in the Systems DNS cache. If it wasn't successfull it tries the ISP's DNS cache. If it looks it up on the DNS Server
3. The browser tries to initiate a TCP connection to this IP address (via a TCP handshake)
4. The Browser sends an HTTP GET request. TCP splits it into packets and sends it to the IP address.
5. The session upgrades to HTTPS: One of the hosts initiaties a TLS session via TLS handshake, they decide on a cypher and exchange keys.
6. The server sends back the encrypted HTTP response. The browser decrypts the response, parses it and displays the page. It sends requests for additional resources linked in the HTML file.
7. The user types in her name and password and klicks "login". The browser generates an HTTP POST request.
8. The server validates the credentials and establishes a session by sending a response with a `Set-Cookie` header. The browser stores the cookie for the duration specified in the header and sends it back with each subsequent request.


### via token
TODO


## The Software Developement Life Cycle (SDLC)

## OWASP Top 10

The Open Web Application Security Project maintains [a list of the most critical security risks](https://owasp.org/www-project-top-ten/). They also provide insights in how to avoid these risks.

1. Broken Access Control
2. Cryptographic Failures
3. Injection and Cross-Site-Scripting
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable and Outdated Components
7. Identification and Authentication Failures
8. Software and Data Integrity Failures
9. Security Logging and Monitoring Failures
10. Server-Side-Request-Forgery (SSRF)


###Broken Access Control


###Cryptographic Failure


###Cross Site Scripting
CH7




## Further Reading
[First Steps in Web Security (MDN)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Website_security)
[Web Security for Developers, by Malcolm McDonald](httpps://nostarch.com/websecurity)
[Security for Web Developers, by John Paul Mueller](https://www.oreilly.com/library/view/security-for-web/9781491928684/)
