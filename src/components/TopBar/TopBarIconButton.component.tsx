import clsx from "clsx";
import { FC } from "react";
import "./TopBarIconButton.styles.scss";

export const TopBarIconButton: FC<JSX.IntrinsicElements["button"]> = (
  props
) => <button {...props} className={clsx("button", props.className)} />;
