import clsx from "clsx";
import "./VSCode.styles.scss";

type VSCodeProps = {
  isBeingDragged: boolean;
};

const VSCode = ({ isBeingDragged }: VSCodeProps) => {
  return (
    <section className="vscode-container">
      <header
        className={clsx("vscode-header", "app-window-drag-handle")}
      ></header>
      <div>
        <iframe
          title="vscode"
          className={clsx(
            "vscode-iframe",
            isBeingDragged && "vscode-iframeDragged"
          )}
          src="https://github1s.com/dbring/macos-website"
        />
      </div>
    </section>
  );
};

export default VSCode;
