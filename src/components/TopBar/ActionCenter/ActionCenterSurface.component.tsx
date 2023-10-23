import { ReactNode } from "react";
import "./ActionCenterSurface.styles.scss";

interface ActionCenterSurfaceProps {
  grid: [
    [columnStart: number, columnSpan: number],
    [rowStart: number, rowSpan: number]
  ];
  children: ReactNode;
}

export const ActionCenterSurface = ({
  grid,
  children,
}: ActionCenterSurfaceProps) => {
  const [[columnStart, columnSpan], [rowStart, rowSpan]] = grid;

  return (
    <section
      className="action-center-surface-container"
      style={
        {
          "--column-start": columnStart,
          "--column-span": columnSpan,
          "--row-start": rowStart,
          "--row-span": rowSpan,
        } as React.CSSProperties
      }
    >
      {children}
    </section>
  );
};
