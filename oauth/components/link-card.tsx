import { ArrowTurnRight2, LinkLogo } from "@dub/ui";
import {
  getApexDomain,
  getPrettyUrl,
  linkConstructor,
  truncate,
} from "@dub/utils";
import { useRef } from "react";

export default function LinkCard({
  domain,
  _key: key,
  url,
}: {
  domain: string;
  _key: string;
  url: string;
}) {
  const apexDomain = getApexDomain(url);

  return (
    <li className="animate-scale-in relative flex w-full max-w-md items-center justify-between rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
      <div className="flex items-center gap-x-3">
        <div className="flex-none rounded-full border border-gray-200 bg-gradient-to-t from-gray-100 p-2">
          <LinkLogo apexDomain={apexDomain} className="size-6 sm:size-6" />
        </div>
        <div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <a
              className="font-semibold text-gray-800 hover:text-black"
              href={linkConstructor({ domain, key })}
              target="_blank"
              rel="noreferrer"
            >
              {truncate(linkConstructor({ domain, key, pretty: true }), 20)}
            </a>
          </div>
          <div className="flex items-center gap-1">
            <ArrowTurnRight2 className="h-4 w-4 text-gray-400" />
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="max-w-60 truncate text-sm text-gray-400 underline-offset-4 transition-all hover:text-gray-700 hover:underline sm:max-w-72"
            >
              {getPrettyUrl(url)}
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}
