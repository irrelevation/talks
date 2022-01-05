# Web Security

## Table of Contents

1. [Table of Contents & TLDR](#web-security)
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

_Transport Layer Security_ (formerly SSL) provides encrypted transmission of data.

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

## OWASP - Top 10 Proactive Controls

[This document](https://owasp.org/www-project-proactive-controls/) describes the 10 most important security aspects every developer should be familiar with and incorporate in every project.

### 1. Define Security Requirements

Different apps require different levels of security. Before you start writing code analyze your security requirements

- Don't reinvent the wheel. Use a standard catalog like [The OWASP Application Security Verification Standard](#the-application-security-verification-standard) to choose measurable and testable requirements according to your needs.

### 2. Leverage Security Frameworks and Libraries

A lot of security features are readily available via libraries. Your job is to use these libraries correctly.

- Use libraries from **trusted (open) sources**, that are **actively maintained** and **widely used**.
- Check your libraries for known vulnerabilities (eg. with [retire.js](https://retirejs.github.io/retire.js/) for JavaScript)
- Keep your dependencies up to date.

### 3. Secure Database Access

- Secure queries - [Use query parameterization](https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html)
- Secure configuration - Check your DB configuration, not all database systems have "secure by default" configs
- Secure Authentication - Only allow authenticated access.
- Secure Communication - Only allow communication via secure channels.

### 4. Encode and Escape Data

These techniques address injection and Cross-Site-Scripting attacks. They prevent the input from being interpreted as code instead of data. Encoding transforms special characters into safe characters. Escaping inserts a special character to signal, that the following is to be interpreted as data and not as code.

- Encode and Escape all untrusted input

### 5. Validate All Inputs

This technique ensures that input is properly formated. Note that properly formated input can still be dangerous. You can use valid email addresses for SQL injection and valid URLS for Cross-Site-Scripting. Use Validation as a complementary technique.

- Always validate _server_-side. Client-side validation is good for UX purposes, but not for security.
- Validate the **Syntax**. Check the expected length, format and characterset.
  - via whitelisting - actually reduces the attack surface
  - _not_ via blacklisting - only catches obvious attacks
  - If you use Regular Expressions for validation be wary of ReDos attacks. There are tools to test your Regular expressions.
- Validate the **Semantics**. Check if the input "makes sense". Start dates have to happen before end dates. Age, duration etc can't be negative.
- Avoid **serialized data**. It is nearly impossible to validate properly. Try using formats like JSON instead.
- If you have to work with serialized data
  - encrypt it to prevent tampering
  - enforce strict type constraints
  - run it isolated in environments with low privileges
  - log deserialization exceptions properly
  - monitor deserialization
- If you have to accept **HTML** input use a library to sanitize it.

### 6. Implement Digital Identity

What kind of authentication should I use? Password? OAuth? How should I manage sessions? Cookies? Tokens? To answer these questions get help from established sources like the [Digital Identity Guidelines](https://pages.nist.gov/800-63-3/sp800-63b.html) issued by the National Institute for Standards and Technology or the [The Application Security Verification Standard](#the-application-security-verification-standard) issued by OWASP. The most important part is to figure out the what level of security is appropriate for your application. The mentioned guideline suggests three categories your app can fall into.

1. Level 1 - The bare minimum.
2. Level 2 - Good enough for most apps
3. Level 3 - High risk applications

#### Authentication

Making sure that you are who you claim to be. Choose an authentication method according to your use case.

##### Level 1 - Low risk applications

Applications that don't contain private data.

- Use **single-factor** authentication
- Your authetication of choice is usually a **passord**

###### Passwords

- should be at least 12 characters
- should be at most 128 characters
- should allow any printable character including Emojis
- Don't put any other limitations on password composition
- must not be truncated
- must be changable
- must require the old password to be changed
- Never force users to change their password or disallow past passwords
- must be checked against known breached passwords
- Provide a password strength meter
- Make sure users can pase in passwords and use password managers
- Make the password hidden/masked by default, but provide options to show the last character and the entire password

###### Password Recovery

You need to provide a secure way for people to recover their password. This step usually relies on 2-Factor-Authetication.

- Don't send activation or recovery secrets in clear text
- Don't use password hints or secret questions
- Use secure recovery mechanisms like soft tokens or push notifications

###### Password Storage

Store passwords securely. Passwords should be hashed, salted and peppered.

##### Level 2 - Higher risk applications

Applications that contain personal information.

- Use Multi-Factor Authentication. Combine 2 or more of the following authentication methods:
  1. Something you know - Password or PIN
  2. Something you own - token or phone
  3. Something you are - biometrics, like finger prints or face scans.
- Never use biometric data only, it is easy to steal.
- Combine biometrics with 2.

##### Level 3 - High value, high assurance, or high safety apps

Applications that when breached could cause personal harm, significant financial loss, harm to the public interest, or civil or criminal violations.

- Use cryptographic based authentication

#### Session Management

Sessions allow a user to stay "logged in" for a certain amount of time. There are two major versions to choose from: Cookie based sessions and token basen sessions.

- Sessions IDs must be long, unique, and random
- It must not be possible to guess a session
- It must not be possible to share a session
- Sessions must be invalidated when no longer required.
- Sessions must have a maximum lifetime and be timed out if inactive. The more valuable the data, the shorter the lifetime / time til timeout.

##### Cookie based Session Management

Cookie based sessions are called "stateful". The server manages the session data. It puts all the relevant information in a cookie and sends it to the client. The client then resends this cookie with every consecutive request, allowing the server to identify the client.

- Set the "Secure" attribute to ensure that a secure transport mechanism (TLS) is used
- Set the "HttpOnly" attribute to prevent the cooke being accessed via JavaScript
- Set the "SameSite" attribute to limit CSRF attacks
- Use the "\_\_Host-" prefix to ensure the cookie is sent only to the host who set it initially.
- If you host several apps under the same domain, make sure to set the "path" attribute as restrictive as possible.

##### Token-based Session Management

Token based sessions are called "stateless". The client manages the session data. The app generates a short-lived access token. The client only resends this token with consecutive requests.

- Avoid static API secrets and keys, use session tokens like JWT instead
- Allow users to revoke OAuth tokens
- Stateless session tokens should use digital signatures and encryption to protect against tampering, enveloping, replay, null cypher, and key substitution attacks
- Never reveal session tokens in URL parameters

###### JWT - JSON Web Tokens

JSON Web Tokens is an open standard for session management via JSON Objects. One of the key aspects is, that the server never stores the token. It can verify the token via a signature.

### 7. Enforce Access Controls / Authorization

Making sure you are allowed to do what you are trying to do. This is achieved through granting and revoking privileges and checking privileges on resource access.

- Design access control up front. It is hard to retrofit.
- Force access control on all requests.
- Enforce access control rules on a trusted service layer, otherwise it can be bypassed.
- Make sure users have the correct roles and access priviledges.
- Protect role and permission metada.
- Deny by default. When you create a new feature, make sure access is restricted until it is properly configured.
- Adhere to the **principle of least privilege**. Don't grant more privileges than necessary. Revoke privileges when they are obsolete.
- All information used for access control must require authorization to change it.
- Log all access control events.
- Monitor access control failures.

### 8. Protect Data Everywhere

Categorize the data you are working with. Identify the different kinds of data you are working with (eg. public data, user data, employee data) and asses the need for security on a per category level. While public data can be handled in an unsecure fashion, handle private data with care.

- Avoid storing sensitive information if possible.
- Encrypt at rest. If you have to store sensitive data, make sure it is encrypted properly.
- Encrypt in transit. If you transmit sensitive data, make sure the transmission is encrypted.
- Don't implement your own encryption! Use trusted open resources instead.

### 9. Implement Security Logging and Monitoring

Security Logging and Monitoring is a crucial step to enable you to detect attacks.

- Log security related information for
  - moinitoring intrusion detection
  - forensic analysis
  - compliance
- Follow a common logging schema across systems
- Ensure timestamps are consistent across services.
- Don't log snesitive data if possible. Take care to strip personal information before you log.

- Monitor your logs for
  - submitted data that failed validation
  - violations of access controls
- Implement automatic threat responses, eg session invalidation, locking accounts...

For a comprehensive list of things to monitor, take a look at [App Sensor](https://owasp.org/www-project-appsensor/)

> ...guidance to implement application layer intrusion detection and automated response.

### 10. Handle all Errors and Exceptions

Error and exception handling is important for your app to work reliably and securely.
It is also a useful source for intrusion detection, because attacks may trigger errors.

- Keep your error handling DRY.
- Test your error handling.
- Don't leak critical information in error messages that are displayed to a user.

## The Application Security Verification Standard

> The standard provides a basis for designing, building, and testing technical application security controls, including architectural concerns, secure development lifecycle, threat modelling, agile security including continuous integration / deployment, serverless, and configuration concerns.

[The standard](https://github.com/OWASP/ASVS) is full of great guidelines. Definitely worth a read.

# How to address specific attack vectors

## OWASP Top 10 Web Application Security Risks

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

An attacker injects external code in order to execute it. It is one of the most common types of attacks. It is usually achieved by tricking your program into interpreting an input as code instead of data.

#### (No)SQL Injection

An attacker tricks your database driver into executing queries you did not write.

### Cross-Site-Scripting

# Further Reading

## Articles

- [First Steps in Web Security (MDN)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Website_security)

## Online Resources

- [The OWASP Top 10 Proactive Controls](https://owasp.org/www-project-proactive-controls/)
- [The Application Security Verification Standard](https://github.com/OWASP/ASVS)
- [The OWASP Top 10 Web Application Security Risks](https://owasp.org/Top10/)

## Books

- [Web Security for Developers, by Malcolm McDonald](https://nostarch.com/websecurity)
- [Security for Web Developers, by John Paul Mueller](https://www.oreilly.com/library/view/security-for-web/9781491928684/)
