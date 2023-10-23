import { ReactNode } from "react";
import "./ActionCenterTile.styles.scss";

interface IActionCenterTileProps {
  grid: [rowStart: number, rowSpan: number];
  children: ReactNode;
}

export const ActionCenterTile = ({
  grid,
  children,
}: IActionCenterTileProps) => {
  const [rowStart, rowsPan] = grid;

  return (
    <div
      className="action-center-tile-container"
      style={
        {
          "--row-start": rowStart,
          "--row-span": rowsPan,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
