# OAuth 2.0
OAuth 2.0 offers **authorization** and delegation. It doe s not specify what content to transfer and does not provide authentication by design.

## OAuth 2.0 Flows

## Refresh tokens
Used to get new access tokens. Keeps the TTL of access tokens short. Work well on the backend, but need some extra security measures when used client-side. In that case you should use refresh token rotation, i.e. refresh tokens can only be used once and a new refresh token is issued whenever you refresh your access token.

# OpenIDConnect
OpenIDConnect offers **authentication**. It is running on OAuth 2.0 and is more oppinionated on the kind of information you exchange.

## OIDC Flows

# Resources

## Videos

- [Introduction to OAuth 2.0 and OpenID Connect](https://www.youtube.com/watch?v=GyCL8AJUhww)
- [An Illustrated Guide to OAuth and OpenID Connect](https://www.youtube.com/watch?v=t18YB3xDfXI)
