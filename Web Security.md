# Web Security

## A brief History of the Internet

### Early 90s
- Tim Berners Lee developes HTTP(89-91) & HTML(93) @ CERN
- text based data transfer, no encryption, first web sites
- evolution, images Mosaic -> Netscape Navigator

### Mid 90s
- templating: in 94 Rasmus Lerdorf creates PHP (Personal Home Page), dynamic generation of HTML
- interactivity: in 95 Brendan Eich creates Mocha->LiveScript->JavaScript


## How the Internet works today

[The Internet protocol suite](https://en.wikipedia.org/wiki/Internet_protocol_suite): A bundle of protocols specifying "How the Internet Works"

### Architecture

The 4 layers of Internet Protocols in order of increasing abstraction.

| Name | Descripton | Protocols |
| --- | --- | --- |
| Link Layer | The lowest layer, protocols describe how *directly connected* nodes/links exchange information on a physical and logical level | MAC, Ethernet |
| Internet Layer | Protocols define addressing, routing and packeting, enable communication across networks, establish the internet | IP (v4, v6) |
| Transport Layer | Protocols define how hosts communicate with each other | TCP, UDP |
| Application Layer | Protocols define how processes communicate with each other | DHCP, DNS, FTP, HTTP, HTTPS, IMAP, LDAP, POP, RPC, SMTP, SSH, TLS/SSL, XMPP |


## Browser Security Model

JavaScript is executed in a sandbox withing wich the following actions are *not* permitted:
- Start new processes or access other existing processes. 
- Read arbitrary chunks of system memory. As a managed memory language, JavaScript can’t read memory outside its sandbox.
- Access the local disk. Modern browsers allow websites to store small amounts of data locally, but this storage is abstracted from the filesystem itself. 
- Access the operating system’s network layer. 
- Call operating system functions.

JavaScript executing in the browser sandbox is permitted to do the following actions:
- Read and manipulate the DOM of the current web page. 
- Listen to and respond to user actions on the current page by registering event listeners.
- Make HTTP calls on behalf of the user.
- Open new web pages or refresh the URL of the current page, but only in response to a user action. 
- Write new entries to the browser history and go backward and forward in history.
- Ask for the user’s location.
- Ask permission to send desktop notifications.

## Further Reading
[Web Security for Developers](https://nostarch.com/websecurity)
