# Sessions

"Stateful" in the context of sessions means "I save session information on the server".
"Stateless" means "I save session infos on the client side".

| Capabilities | Cookies | Authorization Header |
| --- | --- | --- |
| Can contain identifiers & session objects | ✔ | ✔ |
| Works with multiple domains | ❌ | ✔ |
| Works "out of the box" | ✔ | ❌ |
| Works in XHR contexts | ✔ | ✔ |
| Works in other contexts (eg DOM, websockets) | ✔ | ❌ |

## Tokens

Pros:
  - scalable
  - works well for cross origin APIs

Cons:
  - Easy to read and manipulate.
  - You need to ensure confidentiality.
  - You need to ensure integrity.
  - you have to write the token handling logic
  - Only present on XHR calls, unless you implement a service worker
  
### Reference Tokens
The token is just an identifier. It does not contain sensitive information.
The client sends it to a resource server with every request. The resource server sends it to the auth server to request the actual information.

Pros:
  - Easy to revoke. If a you loose the reference token (eg you loose your phone) you can revoke it and no information has been lost.

Cons:
  - Additional round trips. The resource server has to send a request to the auth server to validate the token on every incoming request.
    In practice you probably want to cache the actual infos for a _short_ amount of time to reduce the load of your auth server.
    Keep in mind that when the token gets invalidated, caching will cause it to still be valid for the lifetime of the cache so keep your TimeToLive(TTL) as short as possible.

### Self Contained Tokens

The token contains all information necessary to validate it. JWTs are an example.
Allways check the validity of a token before using it!
Don't confuse decoding for validation!

Pros:
  - No roundtrips to the auth server

Cons:
  - You have no control over the access token and they can't be easily revoked.
    That's why these tokens should be short lived.
    
## Cookies
Work well for small and medium apps. Don't choose token based authentication just because "that's the way you do things".
Cookie does not mean stateful backend. I t lives on the client and is just a browser storage mechanism and a transport mechanism.

Pros:
  - servers are generally considered safe trusted environments and a good place to store session information. In order to change session infos saved on a server an attacker would have to have access to the server anyways and at that point session security is not our biggest worry anymore.
  - Cookies are automatically handled by the browser

Cons:
  - not easily scalable
  - vulnerable to CSRF attacks
  - you have to implement CORS policies against CSRF attacks.
    - Use existing middleware solutions if possible. CORS is error prone if you on't know what you're doing.
    - Otherwise use strict whitelisting on origin headers (don't pattern match, use equality comparisions only) and implements tests for common mistakes
  
## JSON Web Tokens (JWT)

base 64 encoded string. encryption is optional but recommended if your session data contains sensitive information.

- Make sure your app rejects unsigned JWTs (i.e. JWTs with the `alg:none` header).

### Symmetric Signatures

encryption:
HMAC = data (i.e. token) + secret key

decryption:
HMAC + secret key = data

Pros:
  - Easier to use
  
Cons:
  - Limited applicability. If you sign somethin, but someone else needs to verify it, you're out of luck, bc you can't share your key.

### Asymmetric Signatures
RSA
encryption:
data + private key = signature

decryption:
data + signature + public key = true/false

How "login with google" works:
Open ID connect - asymmetricly encrypted JWT

### How to store your keys

### keyrotation
You have to rotate (i.e. change) keys regularly.

problem:
you want to be able to change keys from time to time, but you need a way to inform people about what public key to use.
solutions:
Key identifier (kid) - added to the header, so you can easyly switch keys in the future and let people know about it
Key URLs - added to the header so the other party can look up necessary infos there. As the verifying side, you have to be a little more careful here, and make sure you are actually visiting the correct URL and not getting tricked into using fake key information.

https://jwt.io/

## Vulnerabilities
TODO compare vulnerabilities for different session implementations.

- Session Hijacking
- Session Riding

## Security measures
- Focus on preventing XSS when dealing with frontends
- In sensitive contexts add measures that address successfull XSS scenarios.
  - Defend against session highjacking by keeping tokens out of the browser. Add a backend-for-frontend (BFF) to your app, a thin proxy that handles tokens.
  - Defend against session riding by monitoring and restricting traffic in the BFF.

## Resources

### Videos
- [The Parts of JWT Security Nobody Talks About](https://www.youtube.com/watch?v=DPrhem174Ws)
- [Common API Security Pitfalls](https://www.youtube.com/watch?v=Ss1tZjooo9I)
