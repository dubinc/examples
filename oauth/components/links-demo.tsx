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
import { LinkPlaceholderCard } from "./link-placeholder-card";
import { CornerDownLeft, Link2 } from "lucide-react";

type ShortLink = {
  id: string;
  key: string;
  domain: string;
  url: string;
};

export const LinksDemo = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortLinks, setShortLinks] = useLocalStorage<ShortLink[]>(
    "short-links",
    []
  );

  const createShortLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      toast.error(data.error);
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
    <div className="px-3 sm:px-10 flex w-full mx-auto flex-col gap-2">
      <form onSubmit={createShortLink} className="flex flex-col items-center">
        <UrlInput
          name="url"
          type="string"
          placeholder="https://app.dub.co/register"
          required
          loading={loading}
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
        />
      </form>

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
        {shortLinks.length < 3 &&
          [...Array(3 - shortLinks.length)].map((_, idx) => (
            <LinkPlaceholderCard key={idx} />
          ))}
      </motion.ul>
    </div>
  );
};

function UrlInput({
  loading,
  ...rest
}: { loading: boolean } & HTMLProps<HTMLInputElement>) {
  return (
    <div className="w-full max-w-md relative flex items-center">
      <Link2 className="absolute inset-y-0 left-0 my-2 ml-3 w-5 text-gray-400" />
      <input
        {...rest}
        className="peer block w-full rounded-lg border-2 border-gray-100 bg-white p-2 pl-10 pr-12 shadow-lg placeholder:text-gray-400 focus:border-gray-600 focus:outline-none focus:ring-gray-600 sm:text-sm"
      />
      <button
        type="submit"
        disabled={loading}
        className={cn(
          "absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded font-sans text-sm font-medium text-gray-400",
          loading
            ? "cursor-not-allowed bg-gray-100"
            : "hover:border-gray-700 hover:text-gray-700 peer-focus:text-gray-700"
        )}
      >
        {loading ? (
          <LoadingSpinner className="h-4 w-4" />
        ) : (
          <CornerDownLeft className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
