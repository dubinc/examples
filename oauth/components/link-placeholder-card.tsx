import { FRAMER_MOTION_LIST_ITEM_VARIANTS } from "@dub/utils";
import { motion } from "framer-motion";

export function LinkPlaceholderCard() {
  return (
    <motion.li
      variants={FRAMER_MOTION_LIST_ITEM_VARIANTS}
      className="w-full max-w-md flex items-center rounded-xl border border-gray-200 bg-white p-3 shadow-lg"
    >
      <div className="mr-2 h-10 w-10 rounded-full bg-gray-200" />
      <div>
        <div className="mb-2.5 flex items-center space-x-2">
          <div className="h-6 w-28 rounded-md bg-gray-200" />
          <div className="h-6 w-6 rounded-full bg-gray-200" />
          <div className="h-6 w-20 rounded-md bg-gray-200" />
        </div>
        <div className="h-3.5 w-60 rounded-md bg-gray-200 sm:w-80" />
      </div>
    </motion.li>
  );
}
