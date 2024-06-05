# Dub with Flask

This example shows how to use Dub with [Flask](https://flask.palletsprojects.com/en/2.3.x/)

## Getting Started

1. Create and activate a virtual environment:

```shell
python3 -m venv .venv
source .venv/bin/activate
```

2. Install dependencies:

```shell
pip install -r requirements.txt
```

3. Set your Dub API key and Workspace ID as environment variables:

```shell
export DUB_API_KEY="p4z..."
export DUB_WORKSPACE_ID="ws_clrei..."
```

4. Run the Flask app:

```shell
python app.py
```

5. Open the URL in your browser [http://localhost:5000/create-link](http://localhost:5000/create-link)

This will create a new link in your Dub workspace and display the API response in the browser.

## Resources

- [Dub API Reference](https://dub.co/docs/api-reference)
- [Create API Key](https://app.dub.co/settings/tokens)
- [Get Workspace ID](https://dub.co/help/article/how-to-get-workspace-id)

## Contributing

Thanks for taking the time to contribute! Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make will benefit everybody and are very appreciated.

Please try to create bug reports that are:

- _Reproducible._ Include steps to reproduce the problem.
- _Specific._ Include as much detail as possible: which version, what environment, etc.
- _Unique._ Do not duplicate existing opened issues.
- _Scoped to a Single Bug._ One bug per report.

## License

MIT License