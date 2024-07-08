# Dub with Sinatra

This example shows how to use Dub with [Sinatra](https://sinatrarb.com/)

## Getting Started

1. Set your `DUB_API_KEY` environment variable:

```shell
export DUB_API_KEY=dub_xxx
```

2. Install dependencies:

```shell
bundle install
```

3. Run the server:

```shell
ruby index.rb
```

4. Create a new link:

```shell
curl -X POST http://localhost:3000/links
```

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