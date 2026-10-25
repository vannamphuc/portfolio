import { Link } from "@tanstack/react-router";
import {
	ArrowUpRight,
	Github,
	Linkedin,
	Loader2,
	Mail,
	MapPin,
	Phone,
	Send,
} from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { env } from "#/env/client";
import { $sendContactEmail } from "#/lib/mail";
import { SMOOTH_SCROLL } from "./shared";

const CONTACT_EMAIL = env.VITE_MY_EMAIL;
const CONTACT_PHONE = env.VITE_CONTACT_PHONE;
const CONTACT_PHONE_RAW = `+84${CONTACT_PHONE.split("0").join("").replaceAll(" ", "")}`;
const LINKEDIN_URL = env.VITE_LINKEDIN_URL;
const GITHUB_URL = env.VITE_GITHUB_URL;

function ContactForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState<"idle" | "sending" | "error" | "sent">(
		"idle",
	);
	const [errorMessage, setErrorMessage] = useState("");

	async function onSubmit(e: FormEvent) {
		e.preventDefault();
		if (!name.trim() || !email.trim() || !message.trim()) {
			setStatus("error");
			setErrorMessage("Please fill in your name, email, and message.");
			return;
		}

		try {
			setStatus("sending");
			setErrorMessage("");
			const result = await $sendContactEmail({
				data: {
					name: name.trim(),
					email: email.trim(),
					subject: subject.trim(),
					message: message.trim(),
				},
			});
			if (!result.success) {
				throw new Error("Contact message was not sent");
			}
			setStatus("sent");
			setName("");
			setEmail("");
			setSubject("");
			setMessage("");
		} catch (err) {
			console.error("Failed to send message:", err);
			setStatus("error");
			setErrorMessage(
				"Failed to send message. Please try again or email me directly.",
			);
		}
	}

	return (
		<form
			onSubmit={onSubmit}
			className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur md:p-8"
		>
			<div className="grid gap-4 sm:grid-cols-2">
				<label className="grid gap-1.5 text-sm font-medium">
					Name
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Your name"
						autoComplete="name"
						className="h-11 rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
					/>
				</label>
				<label className="grid gap-1.5 text-sm font-medium">
					Email
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="you@example.com"
						type="email"
						autoComplete="email"
						className="h-11 rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
					/>
				</label>
			</div>
			<label className="mt-4 grid gap-1.5 text-sm font-medium">
				Subject
				<input
					value={subject}
					onChange={(e) => setSubject(e.target.value)}
					placeholder="Project inquiry"
					autoComplete="off"
					className="h-11 rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
				/>
			</label>
			<label className="mt-4 grid gap-1.5 text-sm font-medium">
				Message
				<textarea
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Tell me about your project..."
					rows={5}
					className="min-h-32 resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
				/>
			</label>
			{status === "error" && (
				<p className="mt-3 rounded-xl bg-destructive/10 px-4 py-2 text-xs font-medium text-destructive">
					{errorMessage || "Please fill in your name, email and message."}
				</p>
			)}
			{status === "sent" && (
				<p className="mt-3 rounded-xl bg-primary/10 px-4 py-2 text-xs font-medium text-primary">
					✓ Message sent successfully! I usually reply within 24 hours.
				</p>
			)}
			<Button
				type="submit"
				size="lg"
				disabled={status === "sending"}
				className="mt-5 w-full rounded-xl sm:w-auto"
			>
				{status === "sending" ? (
					<>
						<Loader2 className="animate-spin" /> Sending...
					</>
				) : (
					<>
						<Send /> Send message
					</>
				)}
			</Button>
		</form>
	);
}

export function Contact() {
	return (
		<section id="contact" className="scroll-mt-24 border-t border-border">
			<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
				<div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
					<div className="rounded-3xl border border-border/60 bg-foreground p-8 text-background md:p-12">
						<p className="font-mono text-xs uppercase tracking-widest opacity-70">
							{"// have a project in mind?"}
						</p>
						<h2 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
							Let&apos;s work
							<br />
							together.
						</h2>
						<p className="mt-4 max-w-xl text-sm leading-relaxed opacity-80">
							Check out my work above, then drop me a message. I usually reply
							within 24 hours. Best of luck!
						</p>
						<ul className="mt-6 space-y-2.5 text-sm font-medium">
							<li>
								<a
									href={`mailto:${CONTACT_EMAIL}`}
									className="inline-flex items-center gap-2.5 opacity-90 transition-opacity hover:opacity-100 hover:underline"
								>
									<Mail className="size-4" /> {CONTACT_EMAIL}
								</a>
							</li>
							<li>
								<a
									href={`tel:${CONTACT_PHONE_RAW}`}
									className="inline-flex items-center gap-2.5 opacity-90 transition-opacity hover:opacity-100 hover:underline"
								>
									<Phone className="size-4" /> {CONTACT_PHONE}
								</a>
							</li>
							<li>
								<a
									href={LINKEDIN_URL}
									target="_blank"
									rel="noreferrer noopener"
									className="inline-flex items-center gap-2.5 opacity-90 transition-opacity hover:opacity-100 hover:underline"
								>
									<Linkedin className="size-4" />{" "}
									linkedin.com/in/van-nam-phuc-41a73622b
								</a>
							</li>
							<li>
								<a
									href={GITHUB_URL}
									target="_blank"
									rel="noreferrer noopener"
									className="inline-flex items-center gap-2.5 opacity-90 transition-opacity hover:opacity-100 hover:underline"
								>
									<Github className="size-4" /> github.com/vannamphuc
								</a>
							</li>
							<li className="inline-flex items-center gap-2.5 opacity-90">
								<MapPin className="size-4" /> Ho Chi Minh City - Viet Nam
							</li>
						</ul>
						<div className="mt-8 flex flex-wrap gap-3">
							<Button
								asChild
								variant="secondary"
								size="lg"
								className="rounded-xl bg-background text-foreground hover:bg-background/90"
							>
								<a href={`mailto:${CONTACT_EMAIL}`}>
									<Mail /> Send me an email
								</a>
							</Button>
							<Button
								asChild
								size="lg"
								variant="outline"
								className="rounded-xl border-background/40 bg-transparent text-background hover:bg-background/10 hover:text-background"
							>
								<Link to="/" hash="works" hashScrollIntoView={SMOOTH_SCROLL}>
									Review my work <ArrowUpRight />
								</Link>
							</Button>
						</div>
					</div>
					<ContactForm />
				</div>
				<footer className="flex flex-wrap items-center justify-between gap-3 pt-8 text-xs text-muted-foreground">
					<p>© 2026 Van Nam Phuc. All rights reserved.</p>
					<p>React Native • ReactJS • Node.js • Twilio VoIP • AWS</p>
				</footer>
			</div>
		</section>
	);
}
