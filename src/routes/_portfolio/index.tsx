import { createFileRoute } from "@tanstack/react-router";
import { About } from "#/components/sections/about";
import { Contact } from "#/components/sections/contact";
import { Experience } from "#/components/sections/experience";
import { Hero } from "#/components/sections/hero";
import { Services } from "#/components/sections/services";
import { Skills } from "#/components/sections/skills";
import { Works } from "#/components/sections/works";

export const Route = createFileRoute("/_portfolio/")({
	component: Home,
});

function Home() {
	return (
		<>
			<Hero />
			<About />
			<Experience />
			<Works />
			<Services />
			<Skills />
			<Contact />
		</>
	);
}
