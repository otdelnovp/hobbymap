import { cn } from "@/shared/ui/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size?: "large" | "middle" | "small";
}

function PageTitle({ size, className, ...props }: Props) {
  return (
    <h1
      className={cn(
        "text-2xl lg:text-3xl font-extrabold tracking-tight mb-6",
        size === "middle" && "text-xl lg:text-2xl font-bold mb-4",
        size === "small" && "text-lg lg:text-xl font-medium mb-2",
        className,
      )}
      {...props}
    />
  );
}

export { PageTitle };
