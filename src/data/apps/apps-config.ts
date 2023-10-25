import { AppConfig, createAppConfig } from "../../helpers/create-app-config";

const calculator = createAppConfig({
  title: "Calculator",

  expandable: true,
  resizable: false,

  height: 300 * 1.414,
  width: 300,

  trafficLightsStyle: {
    top: "0.7rem",
    left: "0.7rem",
  },
});

const calendar = createAppConfig({
  title: "Calendar",
  resizable: true,
});

const facetime = createAppConfig({
  title: "Facetime",
  resizable: true,
});

const finder = createAppConfig({
  title: "Finder",
  resizable: true,
});

const launchpad = createAppConfig({
  title: "Launchpad",
  resizable: true,
});

const mail = createAppConfig({
  title: "Mail",
  resizable: true,
});

// const maps = createAppConfig({
//   title: "Maps",
//   resizable: true,
// });

const messages = createAppConfig({
  title: "Messages",
  resizable: true,
});

const photos = createAppConfig({
  title: "Photos",
  resizable: true,
});

const safari = createAppConfig({
  title: "Safari",
  resizable: true,
});

const systemPreferences = createAppConfig({
  title: "System Preferences",
  resizable: true,
});

const twitter = createAppConfig({
  title: `Dean's Twitter`,
  resizable: true,

  shouldOpenWindow: false,
  externalAction: () => window.open("https://twitter.com/dbring1", "_blank"),

  dockBreaksBefore: true,
});

const viewSource = createAppConfig({
  title: `View Source`,
  resizable: true,

  shouldOpenWindow: false,
  externalAction: () =>
    window.open("https://github.com/dbring/macos-website", "_blank"),
});

const vscode = createAppConfig({
  title: "VSCode",
  resizable: true,

  height: 600,
  width: 800,

  trafficLightsStyle: {
    top: "0.6rem",
    left: "0.6rem",
  },
});

export type AppsConfig = {
  [key: string]: AppConfig;
};

export const appsConfig: AppsConfig = {
  finder,
  calculator,
  calendar,
  facetime,
  launchpad,
  mail,
  messages,
  vscode,
  safari,
  photos,
  "system-preferences": systemPreferences,
  twitter,
  "view-source": viewSource,
};
