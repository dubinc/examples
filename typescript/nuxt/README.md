# Dub with Nuxt

This example shows how to use Dub with [Nuxt](https://nuxt.com/docs).

## Getting Started

1. Add your Dub API key to your `.env` file:

```shell
cp .env.example .env
```

```
DUB_API_KEY=p4z...
```

2. Install dependencies:

```shell
pnpm install
```

3. Run the Nuxt dev server:

```shell
pnpm run dev
```

4. Run the following command in your terminal:

```shell
curl --request POST \
  --url http://localhost:3000/api/links
```

This will create a new link in your Dub workspace and display the API response in the terminal.

## Resources

- [Dub API Reference](https://dub.co/docs/api-reference)
- [Create API Key](https://dub.co/docs/api-reference/tokens)

## Contributing

Thanks for taking the time to contribute! Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make will benefit everybody and are very appreciated.

Please try to create bug reports that are:

- _Reproducible._ Include steps to reproduce the problem.
- _Specific._ Include as much detail as possible: which version, what environment, etc.
- _Unique._ Do not duplicate existing opened issues.
- _Scoped to a Single Bug._ One bug per report.

## License

MIT License
