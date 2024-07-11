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
    <div className="p-4 my-2 border rounded-lg sm:p-6 lg:p-8 bg-gray-50 text-black">
      <h3 className="mb-3 text-xl font-medium">Create a short link on Dub</h3>
      <p className="mb-5 text-sm font-medium">
        This form will create a short link on Dub using the `access_token`
        stored in the session cookie.
      </p>

      <form onSubmit={createShortLink}>
        <div className="flex items-end gap-2 flex-col">
          <input
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
            name="url"
            type="url"
            placeholder="URL"
            required
            defaultValue="https://www.google.com/"
          />
          <button
            className="px-5 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg cursor-pointer"
            disabled={loading}
            type="submit"
          >
            {loading ? "Creating..." : "Create Link"}
          </button>
        </div>
      </form>

      <div>
        <p>
          {shortLink && (
            <a
              className="text-blue-500 underline"
              href={shortLink}
              target="_blank"
              rel="noreferrer"
            >
              {shortLink}
            </a>
          )}
        </p>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};
