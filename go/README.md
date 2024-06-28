# Dub with Go

This example shows how to use Dub with [Go](https://go.dev/).

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
go get .
```

3. Run the app

```shell
go run .
```

This will create a new link in your Dub workspace and display the shortened URL in the console.

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