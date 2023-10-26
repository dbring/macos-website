import { FinderMenuType } from "../data/menu/finder.menu.config";

export type SubMenuType = {
  [key: string]: {
    title: string;
    breakAfter?: boolean;
    disabled?: boolean;
  };
};

export type MenuType = {
  title: string;
  menu: SubMenuType;
};

export type AppleMenuConfigType = {
  apple: MenuType;
  default: MenuType;
  file: MenuType;
  edit: MenuType;
  view: MenuType;
  go: MenuType;
  window: MenuType;
  help: MenuType;
};

const appleMenu: MenuType = {
  title: "apple",
  menu: {
    "about-this-mac": {
      title: "About This Mac",
      breakAfter: true,
    },
    "system-preferences": {
      title: "System Preferences...",
    },
    "app-store": {
      title: "App Store...",
      breakAfter: true,
    },
    "recent-items": {
      title: "Recent Items",
      breakAfter: true,
    },
    "force-quit": {
      title: "Force Quit...",
      breakAfter: true,
    },
    sleep: {
      title: "Sleep",
    },
    restart: {
      title: "Restart...",
    },
    shutdown: {
      title: "Shut Down...",
      breakAfter: true,
    },
    "lock-screen": {
      title: "Lock Screen",
    },
    logout: {
      title: "Log Out User...",
    },
  },
};

export const createMenuConfig = (et: FinderMenuType): AppleMenuConfigType => ({
  apple: appleMenu,
  ...et,
});
