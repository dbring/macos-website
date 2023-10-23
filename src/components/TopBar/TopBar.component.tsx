import { ActionCenterToggle } from "./ActionCenter/ActionCenterToggle.component";
import { MenuBar } from "./MenuBar/MenuBar.component";
import "./TopBar.styles.scss";
import { TopBarTime } from "./TopBarTime.component";

const TopBar = () => {
  return (
    <header id="top-bar" className="header">
      <MenuBar />
      <span style={{ flex: "1 1 auto" }}></span>
      <ActionCenterToggle />
      <button>
        <TopBarTime />
      </button>
    </header>
  );
};

export default TopBar;
