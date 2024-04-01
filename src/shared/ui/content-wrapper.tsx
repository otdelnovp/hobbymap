import { cn } from "@/shared/ui/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  fullSize?: boolean;
}

function ContentWrapper({ fullSize, className, ...props }: Props) {
  return (
    <main
      className={cn(
        "relative z-0 flex flex-col min-h-[calc(100dvh-theme(space.14)-1px)]",
        !fullSize && "container py-14 p-8",
        className,
      )}
      {...props}
    />
  );
}

export { ContentWrapper };
