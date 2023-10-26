import clsx from "clsx";
import { motion } from "framer-motion";
import type { AppID } from "../../../stores/Apps.store";
import "./Placeholder.styles.scss";

type PlaceholderAppTypes = {
  appID: AppID;
};

const PlaceholderApp = ({ appID }: PlaceholderAppTypes) => {
  return (
    <section className="placeholder-container">
      <header
        className={clsx("app-window-drag-handle", "placeholder-title-bar")}
      ></header>
      <section className="placeholder-main-area">
        <motion.img
          className="placeholder-img"
          initial={{ scale: 0, rotate: 180 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 20,
          }}
          draggable={false}
          src={`/assets/app-icons/${appID}/256.webp`}
        />
        <h1>Apps coming soon!</h1>
      </section>
    </section>
  );
};

export default PlaceholderApp;
