"use client";

import {
  ArrowTurnRight2,
  Button,
  Hyperlink,
  LoadingSpinner,
  useLocalStorage,
} from "@dub/ui";
import { ChangeEvent, HTMLProps, useState } from "react";
import LinkCard from "./link-card";
import { cn } from "@dub/utils";
import { motion } from "framer-motion";
import { toast } from "sonner";

type ShortLink = {
  id: string;
  key: string;
  domain: string;
  url: string;
};

export const LinksDemo = () => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortLinks, setShortLinks] = useLocalStorage<ShortLink[]>(
    "short-links",
    []
  );

  const createShortLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
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

    setInputValue("");
    setShortLinks([data, ...shortLinks]);
  };

  const deleteShortLink = async (id: string) => {
    const originalShorLinks = shortLinks.slice();
    setShortLinks(shortLinks.filter((link) => link.id !== id));

    const response = await fetch(`/api/links/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      toast.error("Failed to delete short link.");
      setShortLinks(originalShorLinks);
      return;
    }

    toast.success("Short link deleted.");
  };

  return (
    <div className="px-3 sm:px-10 py-4 flex w-full mx-auto flex-col gap-6">
      <form onSubmit={createShortLink} className="flex flex-col items-center">
        <UrlInput
          name="url"
          type="url"
          placeholder="https://app.dub.co/register"
          required
          autoFocus
          loading={loading}
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
        />
      </form>

      {error && (
        <p className="text-center text-sm text-red-600 text-left">{error}</p>
      )}

      {shortLinks.length > 0 ? (
        <motion.ul
          key={shortLinks.length}
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="text-sm text-gray-600 text-left flex flex-col items-center gap-2"
        >
          {shortLinks.map(({ id, key, domain, url }) => (
            <LinkCard
              key={id}
              domain={domain}
              _key={key}
              url={url}
              onDelete={() => deleteShortLink(id)}
            />
          ))}
        </motion.ul>
      ) : (
        <p className="text-sm text-gray-400">
          Use the field above to create a short link!
        </p>
      )}
    </div>
  );
};

function UrlInput({
  loading,
  ...rest
}: { loading: boolean } & HTMLProps<HTMLInputElement>) {
  return (
    <div className="w-full max-w-md relative flex items-center">
      <Hyperlink className="absolute left-2.5 size-5 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        className="peer block w-full rounded-lg outline-none border border-gray-200 bg-white p-2 pl-10 pr-12 shadow-lg transition-all placeholder:text-gray-400 focus:border-gray-800 focus:outline-none focus:ring-gray-800 sm:text-sm"
        {...rest}
      />
      <button
        type="submit"
        disabled={loading}
        className={cn(
          "absolute flex right-0 top-1/2 -translate-y-1/2 size-10 items-center justify-center rounded font-sans text-sm font-medium text-gray-400",
          loading
            ? "cursor-not-allowed"
            : "hover:text-gray-700 peer-focus:text-gray-700"
        )}
      >
        {loading ? (
          <LoadingSpinner className="h-4 w-4" />
        ) : (
          <ArrowTurnRight2 className="h-4 w-4 -scale-x-100" />
        )}
      </button>
    </div>
  );
}
