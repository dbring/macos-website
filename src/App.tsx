import { useEffect } from "react";
import "./App.scss";
import { Dock } from "./components/Dock/Dock.component";
import TopBar from "./components/TopBar/TopBar.component";

const darkBackground = "/assets/wallpapers/3-1.jpg";
const lightBackground = "/assets/wallpapers/3-2.jpg";

const App = () => {
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
      <main>
        <TopBar />
        <Dock />
      </main>
      <div className="background-cover" aria-hidden="true"></div>
    </>
  );
};

export default App;
