import { useEffect, useRef } from "react";
import "./App.scss";
import { ContextMenu } from "./components/Desktop/ContextMenu/ContextMenu.component";
import { WindowsArea } from "./components/Desktop/Window/WindowsArea.component";
import { Dock } from "./components/Dock/Dock.component";
import TopBar from "./components/TopBar/TopBar.component";

const darkBackground = "/assets/wallpapers/3-1.jpg";
const lightBackground = "/assets/wallpapers/3-2.jpg";

const App = () => {
  const outerRef = useRef<HTMLDivElement | null>(null);

  const preloadImage = (path: string) => {
    const img = new Image();
    img.src = path;
  };

  useEffect(() => {
    preloadImage(darkBackground);
    preloadImage(lightBackground);
  });
  return (
    <>
      <main ref={outerRef} className="main">
        <ContextMenu outerRef={outerRef} />
        <TopBar />
        <WindowsArea />
        <Dock />
      </main>
      <div className="background-cover" aria-hidden="true"></div>
    </>
  );
};

export default App;
