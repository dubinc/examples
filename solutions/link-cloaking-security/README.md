## Link Cloaking Security

This example shows how to secure your site from being embedded in third-party sites by using the `X-Frame-Options` and `Content-Security-Policy` headers.

To do that, you will need to whitelabel your Dub short domain by setting the following response headers on your site (the destination URL that you want to cloak):

```
X-Frame-Options: ALLOW-FROM [shortdomain.com]
Content-Security-Policy: frame-ancestors 'self' [shortdomain.com]
```

This will ensure that your site cannot be embedded in third-party sites but can still be cloaked by your Dub short domain.

Learn more:

- Code example: [git.new/zAD0CkJ](https://git.new/zAD0CkJ)
- Demo site: [link-cloaking-security.vercel.app](https://link-cloaking-security.vercel.app)
- Demo short link (enabled): [dub.link/secure-cloak](https://dub.link/secure-cloak)
- Any other iframes (disabled): [iframetester.com/?url=https://link-cloaking-security.vercel.app](https://iframetester.com/?url=https://link-cloaking-security.vercel.app)
- Link cloaking on Dub: [dub.link/cloaking](https://dub.link/cloaking)
