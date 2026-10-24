import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import authClient from "#/lib/auth/auth-client";

export function HeaderAuth() {
	const { data: session, isPending } = authClient.useSession();

	if (isPending || !session?.user) {
		return null;
	}

	const initial = (session.user.name || session.user.email || "U")
		.charAt(0)
		.toUpperCase();

	return (
		<div className="flex items-center gap-1">
			<Avatar className="size-9">
				<AvatarFallback className="bg-foreground text-xs font-semibold text-background">
					{initial}
				</AvatarFallback>
			</Avatar>
			<Button
				variant="ghost"
				size="icon"
				aria-label="Sign out"
				onClick={() => {
					void authClient.signOut();
				}}
			>
				<LogOut className="size-4" />
			</Button>
		</div>
	);
}
