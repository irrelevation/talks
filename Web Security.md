# Web Security

## TODO

- A short intro to all ## headings under 2.
- Single vs multi factor auth
- Add Tips from PragProg
- Fill Glossary
- Session: cookie vs tokens
- Tokens: tampering, enveloping, replay, null cypher, and key substitution attacks
- proof read

## Questions

- What can I do as a developer?
- How to facilitate writing secure code?
- ad 2. Why those measures?
- ad 3. How to hack a website/server?

## Outline

1. [TLDR](#tldr)
2. [History and technical background](#history-and-technical-background)
3. [General security measures](#general-#security-measures)
4. [How to address specific attack vectors](#how-to-address-specific-attack-vectors)
5. [Further Reading](#further-reading)

## TLDR

1. It's impossible to prevent vulnerabilities. The best approach to security is to empower yourself and your team to detect vulnerabilities early and fix them quickly.
2. NEVER trust user input!
3. Use libraries (correctly)

# History and technical background

## A brief History of the Internet

### Early 90s

In the beginning the internet was a rather peacefull place. Servers were only sderving static assets, keeping the attack surface small. Maybe even more importantly, there were just not that many sites and servers to attack to begin with.

- Tim Berners Lee developes HTTP and HTML at CERN as a method of text based data transfer. The early versions don't account for encryption or other security related features. First personal websites are created.
- The internet gets a little more colorful with Mosaic and later Netscape Navigator allowing providing functionality for including images in websites.

### Mid 90s

The internet gets a little more dangerous with its rise in popularity and the advent of dynamic assets.

- Rasmus Lerdorf creates PHP (Personal Home Page), a language that allows developers to easyly generate html dynamically.
- Brendan Eich creates JavaScript laying the foundation for the internet as we know it.

## How the Internet works today

[The Internet protocol suite](https://en.wikipedia.org/wiki/Internet_protocol_suite): A bundle of protocols specifying "How the Internet Works"

### Architecture

The 4 layers of Internet Protocols in order of increasing abstraction.

| Name              | Descripton                                                                                                                     | Protocols                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| Link Layer        | The lowest layer, protocols describe how _directly connected_ nodes/links exchange information on a physical and logical level | MAC, Ethernet                                                               |
| Internet Layer    | Protocols define addressing, routing and packeting, enable communication across networks, establish the internet               | IP (v4, v6)                                                                 |
| Transport Layer   | Protocols define how hosts communicate with each other                                                                         | TCP, UDP                                                                    |
| Application Layer | Protocols define how processes communicate with each other                                                                     | DHCP, DNS, FTP, HTTP, HTTPS, IMAP, LDAP, POP, RPC, SMTP, SSH, TLS/SSL, XMPP |

### TCP

The _Transport Control Protocol_ enables reliable communications between hosts.

### IP

The _Internet Protocol_ defines IP adresses, routing and packeting.

### DNS

The _Domain Name System_ provides human understandable aliases for IP addresses

### HTTP

The _Hypertext Transfer Protocol_ lets user agents (aka. browsers) communicate with servers.

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

_Transport Layer Security_ (formerly SSL)

### HTTPS

HTTP + TLS

## Browser Security Model

JavaScript is executed in a _sandbox_ withing wich the following actions are _not_ permitted:

- Start new processes or access other existing processes.
- Read arbitrary chunks of system memory. As a managed memory language, JavaScript can’t read memory outside its sandbox.
- Access the local disk. Modern browsers allow websites to store small amounts of data locally, but this storage is abstracted from the filesystem itself.
- Access the operating system’s network layer.
- Call operating system functions.

JavaScript executing in the browser sandbox _is_ permitted to do the following actions:

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

# General security measures

## The Software Developement Life Cycle (SDLC)

Adhering to a structured approach when developing software has several advantages regarding security. It decreases the amount of bugs and vulnerabilities that will creep into your code. It lets you detect vulnerabilities earlier. It decreases the time it takes you to fix those vulnerabilities. This structured approach is called the Software Developement Life Cycle and is split into 5 Phases:

1. Design & Analysis
2. Writing Code
3. Pre-release Testing
4. Release
5. Post-release Testing and Observation

### Design & Analysis

- Identify the requirements you are trying to address, talk to stakeholders
- Use issue tracking software

### Writing Code

- Use **source control software** (eg. git). Tracking changes over time can be an invaluable resource when debugging (see [git bisect](https://git-scm.com/docs/git-bisect)). Source control enables you to roll back to a previous version if necessary.
- Establish code reviews. If you are using git, use pull requests to make sure code gets reviewed before it gets merged.
- _Containerize_ your application to facilitate automation and testability.
- Choose open source libraries if possible. Transparency allows more eyes to find bugs faster.

### Pre-Release Testing

- Write **unit tests**. Automated testing helps you to catch bugs. More importantly it enables you to change your code without the fear of breaking something. This is essential for maintainability and will decrease the time it takes you to fix bugs. As an added bonus it serves as a form of documentation.
- Everytime you find a bug, write a unit test before fixing it. This will ensure you don't reintroduce it at a later time.
- Don't get fooled by **code coverage**. Just because your code is tested doesn't mean it's correct.
- Run **regression tests**. Every time you add code rerun _all_ your tests to ensure you don't break existing functionality and regress.
- Set up a _continuous integration (CI) server_ to automate tests.
- Set up a _test environment_. Your test environment should resemble your production environment as closely as possible. If you use real user data in your test environment, make sure to scrub it of sensitive information.

### Release

- _Automate_ your release process. This will make the process more _reliable_, _reproducable_ and _revertable_. It reduces the margin for human error, and will decrease the time it takes to publish bug fixes.
- _Platform as a Service (PaaS)_ solutions like Microsoft Azure, AWS, Google App Engine, Netlify, Heroku etc. will handle the bulk of this process for you. Take advantage of them.
- If you want or need to deploy your app yourself, use established DevOps tools (like Jenkins, Puppet, Chef or Ansible) instead of writing automation from scratch.

### Post-Release Testing and Observation

- Run _smoke tests_ on your production environment. This ensures your deployment went as expected and confirms whether the test you ran in your test environment hold in production.
- Run automated _penetration tests_.
- Make your production environment observable through _logging_, _monitoring_ and _error reporting_.
- Log [important events](https://www.sentinelone.com/blog/the-10-commandments-of-logging/) but keep your logs clean of sensitive information.
- Monitor performance and other metrics to detect patterns and vulnerabilities
- Monitor vulnerabilities in your _dependencies_. Most of the code you release was not written by you. Make sure to monitor your dependencies and deploy patches quickly.
- Aggregate errors to detect attacks faster.

## The Application Security Verification Standard (ASVS)

> (The standard)[https://github.com/OWASP/ASVS] provides a basis for designing, building, and testing technical application security controls, including architectural concerns, secure development lifecycle, threat modelling, agile security including continuous integration / deployment, serverless, and configuration concerns.

The standard splits the recommendations in three categories.

1. L1 - The bare minimum
2. L2 - Good enough for most apps
3. L3 - High value, high assurance, or high safety apps

The following best practices cover only parts of the bare minimum.

## Authentication

### Passwords

- must be at least 12 characters
- must be at most 128 characters
- must allow any printable character including Emojis
- Don't put any other limitations on password composition
- must not be truncated
- must be changable
- must require the old password to be changed
- Never force users to change their password or disallow past passwords
- must be checked against known breached passwords
- Provide a password strength meter
- Make sure users can pase in passwords and use password managers
- Make the password hidden/masked by default, but provide options to show the last character and the entire password

### General Authentication Security

- Implement measurements against automated breached credential testing, brute force, and lockout attacks such as:
  - soft lockouts
  - rate limiting
  - CAPTCHA
  - ever increasing delays between attempts
  - IP address restrictions
  - risk-based restrictions (eg. location, first login on a device, recent unlock attempts)
  - Don't allow more than 100 failed attempts per hour per account
- Limit the use of weak authentication like SMS and email
- Notify the user _securely_ about updates to authentication details like
  - credential resets
  - email or address changes
  - logins from unkown or risky locations
- if you have to use unsecure channels like email or SMS for notification, make sure not to disclose sensitive information
- System generated initial passwords and codes should
  - be _securely_ randomly generated
  - be at least 6 characters long
  - expire after a short period of time

### Credential Recovery

- Don't send activation or recovery secrets in clear text
- Don't use password hints or secret questions
- Use secure recovery mechanisms like soft tokens or push notifications

### Out of Band Verification

This method uses a secure secondary communication channel for authentication, usually a physical device like your mobile phone. Ever had to type in that 6 digit code you received on your phone? That was out of band verification.

- Don't offer clear text out of band verification (eg SMS) by default. Use push notifications instead
- Tokens, codes, and authentication request should expire after 10 minutes
- Tokens, codes, and authentication request should only be usable once.

## Session Management

- Sessions must be unique
- It must not be possible to guess a session
- It must not be possible to share a session
- Sessions must be invalidated when no longer required and timed out if inactive.

### General Session Management Security

- Never reveal session tokens in URL parameters

### Session Binding

- Generate a new session token when a user authenticates
- Session tokens should have at least 64 bits of entropy
- Store session tokens _securely_ in the browser via secured cookies or session storage

### Session Termination

- Ensure that logout and expiration invalidate session tokens. The user should not be able to continue the session by hitting the "back" button.
- If you permit users to stay logged in, let them re-authenticate after 30 days

### Cookie based Session Management

- set the "Secure" attribute on session tokens
- set the "HttpOnly" attribute
- set the "SameSite" attribute to limit CSRF attacks
- Use the "\_\_Host-" prefix to ensure the cookie is sent only to the host who set it initially.
- If you several apps under the same domain, make sure to set the "path" attribute as specifically as possible.

### Token-based Session Management (JWT, OAuth)

- Avoid static API secrets and keys, use session tokens like JWT instead
- Allow users to revoke OAuth tokens
- Stateless session tokens should use digital signatures and encryption to protect against tampering, enveloping, replay, null cypher, and key substitution attacks

## Access Control

## Validation, Sanitization and Encoding

## Stored Cryptography

## Error Handling and Logging

## Data Protection

## Communication

## Malicious Code

## Business Logic

## Files and Resources

## API and Web Service

## Configuration

# How to address specific attack vectors

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

### Broken Access Control

### Cryptographic Failure

### Injection

An attacker injects external code in order to execute it. One of the most common types of attacks.

#### (No)SQL Injection

An attacker tricks your database driver into executing queries you did not write.

### Cross-Site-Scripting

# Further Reading

- [First Steps in Web Security (MDN)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Website_security)
- [Web Security for Developers, by Malcolm McDonald](https://nostarch.com/websecurity)
- [Security for Web Developers, by John Paul Mueller](https://www.oreilly.com/library/view/security-for-web/9781491928684/)
