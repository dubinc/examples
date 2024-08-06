import { ArrowTurnRight2, CopyButton, LinkLogo } from "@dub/ui";
import {
  FRAMER_MOTION_LIST_ITEM_VARIANTS,
  getApexDomain,
  getPrettyUrl,
  linkConstructor,
  truncate,
} from "@dub/utils";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

export default function LinkCard({
  domain,
  _key: key,
  url,
  onDelete,
}: {
  domain: string;
  _key: string;
  url: string;
  onDelete: () => void;
}) {
  const apexDomain = getApexDomain(url);

  const cardElem = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const controls = useAnimation();

  const [constrained, setConstrained] = useState(true);

  const [velocity, setVelocity] = useState<number>(0);

  const isDelete = (childNode: HTMLElement, parentNode: HTMLElement) => {
    const childRect = childNode.getBoundingClientRect();
    const parentRect = parentNode.getBoundingClientRect();
    return parentRect.left >= childRect.right ||
      parentRect.right <= childRect.left
      ? true
      : undefined;
  };

  // determine direction of swipe based on velocity
  const direction = useMemo(() => {
    return velocity >= 1 ? "right" : velocity <= -1 ? "left" : undefined;
  }, [velocity]);

  const flyAway = (min: number) => {
    const flyAwayDistance = (direction: "left" | "right") => {
      const parentWidth =
        // @ts-ignore
        cardElem.current?.parentNode?.getBoundingClientRect().width || 0;
      const childWidth = cardElem.current?.getBoundingClientRect().width || 0;
      return direction === "left"
        ? -parentWidth / 2 - childWidth / 2
        : parentWidth / 2 + childWidth / 2;
    };
    if (direction && Math.abs(velocity) > min) {
      setConstrained(false);
      controls.start({
        x: flyAwayDistance(direction),
      });
    }
  };

  useEffect(() => {
    const unsubscribeX = x.onChange(() => {
      if (cardElem.current) {
        const childNode = cardElem.current;
        const parentNode = cardElem.current.parentNode as HTMLElement;
        const deleted = isDelete(childNode, parentNode);
        if (deleted) onDelete();
      }
    });

    return () => unsubscribeX();
  });

  return (
    <motion.li
      variants={FRAMER_MOTION_LIST_ITEM_VARIANTS}
      className="w-full max-w-md"
    >
      <motion.div
        animate={controls}
        drag="x"
        dragConstraints={constrained && { left: 0, right: 0 }}
        dragElastic={1}
        ref={cardElem}
        style={{ x }}
        onDrag={() => setVelocity(x.getVelocity())}
        onDragEnd={() => flyAway(500)}
        whileTap={{ scale: 1.05 }}
        className="relative flex w-full cursor-grab items-center justify-between rounded-xl border border-gray-200 bg-white p-3 shadow-lg active:cursor-grabbing"
      >
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
              <CopyButton
                variant="neutral"
                value={linkConstructor({ domain, key })}
                className="border border-gray-200 bg-gray-50 hover:scale-100 hover:bg-gray-100 active:bg-gray-100"
              />
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
      </motion.div>
    </motion.li>
  );
}
