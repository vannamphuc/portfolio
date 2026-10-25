import { MailIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar.tsx";
import { Badge } from "#/components/ui/badge.tsx";
import {
  Card,
  CardHeader,
  CardPanel,
  CardTitle,
} from "#/components/ui/card.tsx";
import { Separator } from "#/components/ui/separator.tsx";
import Me from "#/assets/me.jpg"

export interface CardProfileStat {
  label: string;
  value: string;
}

export interface CardProfileProps {
  name?: string;
  initials?: string;
  title?: string;
  badge?: string;
  email?: string;
  avatarUrl?: string;
  stats?: CardProfileStat[];
  className?: string;
}

export function CardProfile({
  name = "Van Nam Phuc",
  initials = "VP",
  title = "Full-Stack & Mobile Engineer",
  badge = "Open to work",
  email = "phucnamvan@gmail.com",
  avatarUrl = Me,
  stats = [
    { label: "Experience", value: "2+ Yrs" },
    { label: "Production Apps", value: "5+" },
    { label: "FPT College", value: "8.5 GPA" },
  ],
  className,
}: CardProfileProps) {
  return (
    <Card className={`overflow-hidden ${className ?? ""}`}>
      <Cover />
      <CardHeader className="-mt-10 relative pb-2">
        <Avatar className="size-20 border-4 border-background">
          {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
          <AvatarFallback className="bg-foreground font-semibold text-background text-xl">
            {initials}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="mt-3 flex items-center gap-2">
          {name}
          {badge && (
            <Badge variant="secondary" className="font-mono text-[10px]">
              {badge}
            </Badge>
          )}
        </CardTitle>
        <p className="text-muted-foreground text-sm">{title}</p>
      </CardHeader>
      <CardPanel className="pt-2">
        {email && (
          <div className="flex flex-col gap-1.5 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <MailIcon className="size-3.5" />
              {email}
            </div>
          </div>
        )}
        {stats.length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="grid grid-cols-3 gap-2 text-center">
              {stats.map((stat) => (
                <Stat key={stat.label} label={stat.label} value={stat.value} />
              ))}
            </div>
          </>
        )}
      </CardPanel>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-semibold text-base">{value}</div>
      <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.15em]">
        {label}
      </div>
    </div>
  );
}

function Cover() {
  return (
    <div
      className="h-24"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--primary) 18%, transparent), color-mix(in srgb, var(--primary) 6%, transparent) 60%, transparent), radial-gradient(120% 100% at 0% 0%, color-mix(in srgb, var(--foreground) 8%, transparent), transparent 60%)",
      }}
    />
  );
}
