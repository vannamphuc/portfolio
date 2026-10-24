import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { type FormEvent, useRef, useState } from "react";
import { AuthShell, useAuthTypingImpulse } from "#/components/auth-shell";
import {
	bumpParticleTypingImpulse,
	pulseParticleSubmitImpulse,
} from "#/components/particle-field";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Kbd } from "#/components/ui/kbd";
import { Label } from "#/components/ui/label";
import { Separator } from "#/components/ui/separator";
import authClient from "#/lib/auth/auth-client";
import { $getSessionUser } from "#/lib/auth/functions";

export const Route = createFileRoute("/admin/login")({
	component: AdminLoginPage,
});

function AdminLoginPage() {
	return (
		<AuthShell variant="welcome">
			<LoginForm />
		</AuthShell>
	);
}

function LoginForm() {
	return (
		<>
			<div className="absolute top-6 left-6 flex items-center gap-2 font-mono text-sm lg:hidden">
				<span className="inline-block h-2 w-2 rounded-full bg-foreground" />
				<span className="tracking-[0.2em] uppercase">Van Nam Phuc</span>
			</div>

			<div className="w-full max-w-lg">
				<div className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.3em]">
					Welcome back
				</div>
				<h1 className="mt-2 text-3xl leading-tight font-bold">
					Sign in with a link
				</h1>
				<p className="mt-2 text-muted-foreground text-sm">
					Enter your email and we will send you a sign-in link. Admin
					accounts continue to the admin area.
				</p>

				<MagicLinkForm />
				<OrSeparator />
				<OAuthButtons />
			</div>
		</>
	);
}

function OrSeparator() {
	return (
		<div className="my-6 flex items-center gap-3">
			<Separator className="flex-1" />
			<span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
				or
			</span>
			<Separator className="flex-1" />
		</div>
	);
}

function MagicLinkForm() {
	const navigate = useNavigate();
	const formRef = useRef<HTMLFormElement>(null);
	const typingImpulse = useAuthTypingImpulse();
	const [email, setEmail] = useState("");
	const [sentTo, setSentTo] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [pending, setPending] = useState(false);

	async function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!email.trim()) return;
		pulseParticleSubmitImpulse(typingImpulse);
		setPending(true);
		setError(null);
		try {
			const result = await authClient.signIn.magicLink({
				email: email.trim().toLowerCase(),
				callbackURL: "/admin",
			});
			if (result.error) {
				setError(result.error.message || "Could not send link.");
				return;
			}
			setSentTo(email.trim().toLowerCase());
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not send link.");
		} finally {
			setPending(false);
		}
	}

	async function continueNow() {
		const session = await $getSessionUser();
		if (session.isAdmin) {
			void navigate({ to: "/admin" });
		} else {
			void navigate({ to: "/", hash: "contact" });
		}
	}

	return (
		<>
			<form
				ref={formRef}
				onSubmit={(e) => {
					void onSubmit(e);
				}}
				onKeyDown={(e) => bumpParticleTypingImpulse(typingImpulse, e)}
				className="mt-8 flex flex-col gap-4"
			>
				<div className="flex flex-col gap-1.5">
					<Label htmlFor="magic-link-email">Email</Label>
					<Input
						id="magic-link-email"
						type="email"
						required
						placeholder="you@example.com"
						autoComplete="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<Button type="submit" size="lg" disabled={pending} className="mt-2">
					{pending ? "Sending…" : "Send sign-in link"}
				</Button>
				{error && (
					<p className="rounded-xl bg-destructive/10 px-4 py-2 text-xs font-medium text-destructive">
						{error}
					</p>
				)}
				{!sentTo && !error ? (
					<p className="text-center text-muted-foreground text-xs">
						<Kbd className="font-mono">⌘↵ | Shift+↵</Kbd> to submit
					</p>
				) : null}
			</form>

			{sentTo ? (
				<div className="mt-4 rounded-lg border border-border/70 bg-background/40 px-3 py-2 text-muted-foreground text-sm">
					Link sent to <span className="text-foreground">{sentTo}</span>.
					Open your inbox to continue.
					<Button
						variant="link"
						className="h-auto p-0 pl-2 text-xs font-bold"
						onClick={() => {
							void continueNow();
						}}
					>
						I already signed in — continue
					</Button>
				</div>
			) : null}
		</>
	);
}

function OAuthButtons() {
	const [error, setError] = useState<string | null>(null);

	async function signInSocial(provider: "google" | "github") {
		setError(null);
		try {
			await authClient.signIn.social({
				provider,
				callbackURL: "/admin",
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Sign in failed.");
		}
	}

	return (
		<div className="flex flex-col gap-2">
			<Button
				variant="outline"
				size="lg"
				type="button"
				onClick={() => {
					void signInSocial("google");
				}}
			>
				<GoogleIcon />
				Continue with Google
			</Button>
			<Button
				variant="outline"
				size="lg"
				type="button"
				onClick={() => {
					void signInSocial("github");
				}}
			>
				<GithubIcon />
				Continue with GitHub
			</Button>
			{error && (
				<p className="rounded-xl bg-destructive/10 px-4 py-2 text-xs font-medium text-destructive">
					{error}
				</p>
			)}
			<p className="mt-2 text-center text-muted-foreground text-xs">
				<Button asChild variant="link" className="h-auto p-0 text-xs">
					<Link to="/">Back to home</Link>
				</Button>
			</p>
		</div>
	);
}

function GoogleIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
			<path
				fill="currentColor"
				d="M21.35 11.1H12v2.98h5.35c-.23 1.4-1.64 4.1-5.35 4.1-3.22 0-5.85-2.67-5.85-5.95s2.63-5.95 5.85-5.95c1.84 0 3.07.78 3.77 1.45l2.57-2.5C16.71 3.8 14.59 2.9 12 2.9 6.97 2.9 2.9 6.97 2.9 12s4.07 9.1 9.1 9.1c5.26 0 8.74-3.69 8.74-8.89 0-.6-.06-1.05-.14-1.51Z"
			/>
		</svg>
	);
}

function GithubIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
			<path
				fill="currentColor"
				d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
			/>
		</svg>
	);
}
