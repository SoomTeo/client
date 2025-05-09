import cn from "classnames";
import { LabelHTMLAttributes } from "react";

const Label = ({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={cn(
      "text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className,
    )}
    {...props}
  />
);
Label.displayName = "Label";

export { Label };
