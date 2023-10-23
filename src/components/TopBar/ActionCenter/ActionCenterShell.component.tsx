import { ReactNode, useEffect, useRef } from "react";
import "./ActionCenterShell.styles.scss";

type MenuShellProps = {
  children: ReactNode;
};

export const ActionCenterShell = ({ children }: MenuShellProps) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <section className="action-center-shell-container" ref={ref} tabIndex={-1}>
      {children}
    </section>
  );
};
