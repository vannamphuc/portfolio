import type { ReactNode, RefObject } from "react";
import { createContext, useContext, useRef } from "react";
import { AuthSplitLayout } from "#/components/auth-split-layout.tsx";
import { ParticleField } from "#/components/particle-field.tsx";

type ImpulseRef = RefObject<number>;
const TypingImpulseContext = createContext<ImpulseRef | null>(null);

export function useAuthTypingImpulse(): ImpulseRef {
  const ctx = useContext(TypingImpulseContext);
  if (!ctx) throw new Error("useAuthTypingImpulse outside <AuthShell>");
  return ctx;
}

type Variant = "welcome" | "request-access" | "onboarding";

// Concentric-ring figure sampled by ParticleField. Inline SVG data URI so
// the shell works without binary figure assets.
const FIGURE_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'>" +
  "<rect width='400' height='400' fill='black'/>" +
  "<g fill='none' stroke='white' stroke-width='10'>" +
  "<circle cx='200' cy='200' r='150'/>" +
  "<circle cx='200' cy='200' r='110'/>" +
  "<circle cx='200' cy='200' r='70'/>" +
  "<circle cx='200' cy='200' r='30'/>" +
  "</g></svg>";

const FIGURE_SRC = `data:image/svg+xml,${encodeURIComponent(FIGURE_SVG)}`;

const FIGURES: Record<Variant, string> = {
  welcome: FIGURE_SRC,
  "request-access": FIGURE_SRC,
  onboarding: FIGURE_SRC,
};

export function AuthShell({
  children,
  variant = "welcome",
}: {
  children: ReactNode;
  variant?: Variant;
}) {
  const typingImpulseRef = useRef(0);
  const src = FIGURES[variant];
  return (
    <TypingImpulseContext.Provider value={typingImpulseRef}>
      <AuthSplitLayout
        rightClassName="lg:w-[620px]"
        left={
          <>
            <ParticleField
              src={src}
              sampleStep={3}
              threshold={34}
              dotSize={1}
              renderScale={1}
              align="center"
              typingImpulseRef={typingImpulseRef}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(900px 600px at 50% 50%, transparent 45%, color-mix(in srgb, var(--background) 88%, transparent) 92%)",
              }}
            />
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-12">
              <div className="pointer-events-auto flex items-center gap-2 font-mono text-sm">
                <span className="inline-block h-2 w-2 rounded-full bg-foreground" />
                <span className="tracking-[0.2em] uppercase">Van Nam Phuc</span>
              </div>
              {/* {variant === "request-access" ? (
                <div className="max-w-md">
                  <div className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.3em]">
                    Quiet onboarding
                  </div>
                  <p className="mt-3 font-heading text-xl leading-snug md:text-2xl">
                    A waitlist screen with a particle figure and a single soft
                    CTA — for invite-only entry points.
                  </p>
                </div>
              ) : variant === "onboarding" ? (
                <div className="max-w-md">
                  <div className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.3em]">
                    First steps
                  </div>
                  <p className="mt-3 font-heading text-xl leading-snug md:text-2xl">
                    A guided multi-step setup, paced so each screen carries one
                    decision at a time.
                  </p>
                </div>
              ) : (
                <div className="max-w-md">
                  <div className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.3em]">
                    Sign-in design
                  </div>
                  <p className="mt-3 font-heading text-xl leading-snug md:text-2xl">
                    Split layout with a particle field on the left and a single
                    centered form on the right.
                  </p>
                </div>
              )} */}
            </div>
          </>
        }
        right={children}
      />
    </TypingImpulseContext.Provider>
  );
}
