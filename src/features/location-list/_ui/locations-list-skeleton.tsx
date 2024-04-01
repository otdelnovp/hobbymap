import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export const LocationListSkeleton = () => {
  return (
    <div className="w-full md:w-1/2 mb-3">
      <Card className="relative">
        <CardHeader className="p-3">
          <CardTitle>
            <Skeleton className="h-6 mb-1" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-3" />
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <Skeleton className="h-3 mb-1" />
          <Skeleton className="h-3 mb-1" />
        </CardContent>
        <CardFooter className="p-3 pt-0">
          <Skeleton className="h-8 w-full md:w-32" />
        </CardFooter>
      </Card>
    </div>
  );
};
