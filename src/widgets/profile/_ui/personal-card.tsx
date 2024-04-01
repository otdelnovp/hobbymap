import { Session } from "next-auth";
import { Facebook, Instagram, Send } from "lucide-react";

import {
  ProfileAvatar,
  getProfileDisplayHobby,
  getProfileDisplayName,
  getProfileDisplayRole,
} from "@/entities/user/profile";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";
import { Button } from "@/shared/ui/button";

import { EditProfileDialog } from "./edit-profile-dialog";
import { isAdmin } from "@/entities/user/_domain/ability";

export function PersonalCard({ session }: { session: Session }) {
  const user = session.user;

  const socialLinkTemplate = ({
    title,
    link,
    icon,
  }: {
    title: string;
    link: string;
    icon: React.ReactElement;
  }) =>
    user.instagram ? (
      <Tooltip>
        <TooltipTrigger>
          <Button variant="ghost" size="icon" asChild>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {icon}
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">{title}</TooltipContent>
      </Tooltip>
    ) : null;

  return (
    <Card className="relative">
      <CardHeader className="items-center text-center">
        <ProfileAvatar profile={user} className="w-20 h-20 mb-3" />
        <CardTitle className="text-lg flex items-center">
          <span>{getProfileDisplayName(user)}</span>
          <EditProfileDialog userId={user.id ?? ""} />
        </CardTitle>
        <CardDescription>{user.email}</CardDescription>
        <CardContent>
          {isAdmin(session?.user) ? (
            <p className="text-sm">
              <span className="text-muted-foreground mr-1">Role:</span>
              {getProfileDisplayRole(user)}
            </p>
          ) : null}
          {isAdmin(session?.user) && user.hobby ? (
            <p className="text-sm">
              <span className="text-muted-foreground mr-1">Hobby:</span>
              {getProfileDisplayHobby(user)}
            </p>
          ) : null}
          <TooltipProvider>
            <div className="flex justify-center mt-4">
              {user.instagram &&
                socialLinkTemplate({
                  title: "Instagram",
                  link: `https://instagram.com/${user.instagram}`,
                  icon: <Instagram className="w-5 h-5" />,
                })}
              {user.facebook &&
                socialLinkTemplate({
                  title: "Facebook",
                  link: `https://facebook.com/${user.facebook}`,
                  icon: <Facebook className="w-5 h-5" />,
                })}
              {user.telegram &&
                socialLinkTemplate({
                  title: "Telegram",
                  link: `https://t.me/${user.telegram}`,
                  icon: <Send className="w-5 h-5" />,
                })}
            </div>
          </TooltipProvider>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
