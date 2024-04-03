import { useAppearanceDelay } from "../lib/react";
import { SpinnerProp } from "../icons/spinner-prop";

export function FullPageSpinner({ isLoading }: { isLoading?: boolean }) {
  const show = useAppearanceDelay(isLoading);

  if (show) {
    return (
      <div className="inset-0 flex items-center justify-center absolute w-full h-full bg-white/50 z-30">
        <SpinnerProp
          className="w-10 h-10 text-primary"
          aria-label="Page loading"
        />
      </div>
    );
  }

  return null;
}
