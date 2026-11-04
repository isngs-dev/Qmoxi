"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, animate, m, useMotionValue, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Container } from "@/components/layout/Container";
import { MAIN_NAV, isActivePath } from "@/lib/constants/navigation";
import { CONTACT, DEMO_HREF } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  // Scroll-linked offset: the header moves up exactly as far as you scroll down
  // (up to its own height) and slides back down as you scroll up.
  const offsetY = useMotionValue(0);

  const settle = useCallback(
    (to: number) => animate(offsetY, to, { duration: 0.35, ease: [0.22, 1, 0.36, 1] }),
    [offsetY],
  );

  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - lastY.current;
    lastY.current = y;
    setScrolled(y > 24);

    const h = headerRef.current?.offsetHeight ?? 80;
    if (open || y <= 0) {
      offsetY.stop();
      offsetY.set(0);
      return;
    }
    offsetY.stop();
    offsetY.set(Math.min(0, Math.max(-h, offsetY.get() - delta)));

    // When scrolling pauses, ease to fully shown or fully hidden — never stuck half-way.
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      const current = offsetY.get();
      if (current === 0 || current === -h) return;
      settle(y < h || current > -h / 2 ? 0 : -h);
    }, 140);
  });

  useEffect(() => () => clearTimeout(settleTimer.current), []);

  // Opening the menu always brings the header fully into view.
  useEffect(() => {
    if (open) settle(0);
  }, [open, settle]);

  const close = useCallback(() => setOpen(false), []);

  // Body scroll lock + Escape for the mobile menu.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Reset transient menu state if this tree is hidden by Activity.
  useLayoutEffect(() => () => setOpen(false), []);

  return (
    <>
      <m.header
        ref={headerRef}
        style={{ y: offsetY }}
        // Keyboard users tabbing into a tucked-away header get it back immediately.
        onFocusCapture={() => settle(0)}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open
            ? "border-b border-gold/15 bg-black/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container className="flex h-[var(--header-h)] items-center justify-between gap-6">
          <Logo priority height={scrolled ? 42 : 50} className="transition-all duration-500" />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full border border-gold/15 bg-black/40 p-1">
              {MAIN_NAV.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative block rounded-full px-4 py-2 text-[0.82rem] font-medium transition-colors duration-300",
                        active ? "text-black" : "text-gold-100/80 hover:text-gold",
                      )}
                    >
                      {active && (
                        <m.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-0 rounded-full bg-gold"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={DEMO_HREF}
              className="group hidden h-11 items-center gap-2.5 rounded-full bg-gold px-5 text-[0.82rem] font-semibold text-black transition-colors hover:bg-gold-300 sm:inline-flex"
            >
              Request a Demo
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex size-11 items-center justify-center rounded-full border border-gold/30 text-gold lg:hidden"
            >
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-300",
                    open && "translate-y-1.5 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-300",
                    open && "-translate-y-[5px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </Container>
      </m.header>

      <AnimatePresence>{open && <MobileMenu pathname={pathname} onClose={close} />}</AnimatePresence>
    </>
  );
}

function MobileMenu({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Simple focus trap: keep Tab inside the dialog; focus the first link on open.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const focusables = () => Array.from(panel.querySelectorAll<HTMLElement>("a,button"));
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const list = focusables();
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    panel.addEventListener("keydown", onKey);
    return () => panel.removeEventListener("keydown", onKey);
  }, []);

  return (
    <m.div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto bg-black lg:hidden"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
    >
      <div aria-hidden className="hairline-grid pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative flex min-h-full flex-col justify-between gap-10 py-10">
        <nav aria-label="Mobile">
          <ul className="border-t border-gold/15">
            {MAIN_NAV.map((item, i) => {
              const active = isActivePath(pathname, item.href);
              return (
                <m.li
                  key={item.href}
                  className="border-b border-gold/15"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className="group flex items-baseline justify-between py-5"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="eyebrow text-smoke">0{i + 1}</span>
                      <span className={cn("display text-5xl", active ? "text-gold" : "text-white group-hover:text-gold")}>
                        {item.label}
                      </span>
                    </span>
                    {active && <span className="eyebrow text-gold">Current</span>}
                  </Link>
                </m.li>
              );
            })}
          </ul>
        </nav>
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <Link
            href={DEMO_HREF}
            onClick={onClose}
            className="flex h-14 items-center justify-center gap-3 rounded-full bg-gold font-semibold text-black"
          >
            Request a Demo <ArrowRight aria-hidden className="size-4" />
          </Link>
          <div className="grid gap-3 text-sm text-mist">
            <a href={CONTACT.phoneHref} className="flex items-center gap-3">
              <Phone aria-hidden className="size-4 text-gold" /> {CONTACT.phoneDisplay}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 break-all">
              <Mail aria-hidden className="size-4 text-gold" /> {CONTACT.email}
            </a>
          </div>
        </m.div>
      </Container>
    </m.div>
  );
}
