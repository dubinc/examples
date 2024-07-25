"use client";

import { useState } from "react";

export const CreateLink = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortLink, setShortLink] = useState("");

  const createShortLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setShortLink("");
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/links", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setLoading(false);

    if (!response.ok) {
      setError(data.error);
      return;
    }

    setShortLink(data.shortLink);
  };

  return (
    <div className="border rounded bg-gray-50 px-10 py-10 flex w-full mx-auto flex-col gap-4">
      <form onSubmit={createShortLink}>
        <div className="flex items-center space-x-2">
          <input
            className="bg-white border border-gray-300 text-sm rounded flex-grow p-3"
            name="url"
            type="url"
            placeholder="URL"
            required
            defaultValue="https://www.google.com/"
          />
          <button
            className="px-5 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded cursor-pointer"
            disabled={loading}
            type="submit"
          >
            {loading ? "Creating..." : "Create Link"}
          </button>
        </div>
      </form>

      <p className="text-sm text-gray-600">
        This form will create a short link on Dub using the `access_token`
        stored in the session cookie.
      </p>

      {shortLink && (
        <p className="text-sm text-gray-600 text-left">
          <a
            className="text-blue-500 underline text-base tracking-wide"
            href={shortLink}
            target="_blank"
            rel="noreferrer"
          >
            {shortLink}
          </a>
        </p>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
