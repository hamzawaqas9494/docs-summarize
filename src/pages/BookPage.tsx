import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Seo } from "@/lib/seo";
import { reviewSchema } from "@/lib/form-schema";

const BRAND = {
  red: "#E5232A",
  green: "#2AA845",
  cyan: "#22A3E0",
  blue: "#1685EA",
  purple: "#5C6BC0",
  gold: "#F2C94C",
} as const;

const endpoint = import.meta.env.VITE_FORM_ENDPOINT;

function SplitGradientHeading({ text }: { text: string }) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const gradientStart = Math.max(1, words.length - 2);

  return (
    <>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={`book-hero-word inline-block will-change-transform ${
            index >= gradientStart
              ? "bg-[linear-gradient(90deg,#1685EA_0%,#22A3E0_48%,#2AA845_100%)] bg-clip-text text-transparent"
              : "text-[#07142D]"
          }`}
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </>
  );
}

function BookHeroVisual({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="relative mx-auto aspect-[540/430] w-full max-w-[560px]" aria-hidden="true">
      <div className="absolute left-[7%] top-[13%] h-[72%] w-[82%] rounded-[42px] border border-white/90 bg-white/52 shadow-[0_38px_90px_rgba(35,67,96,0.11),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-[20px] [transform:perspective(1200px)_rotateY(-7deg)_rotateX(3deg)]" />

      <div className="absolute left-[13%] top-[18%] h-[64%] w-[70%] rounded-[30px] border border-[#DCE9F6] bg-white/88 p-5 shadow-[0_24px_60px_rgba(32,64,94,0.10),inset_0_1px_0_rgba(255,255,255,1)]">
        <div className="flex items-center gap-2">
          {[BRAND.blue, BRAND.cyan, BRAND.green, BRAND.red, BRAND.gold].map((color) => (
            <span key={color} className="h-1 flex-1 rounded-full" style={{ background: color }} />
          ))}
        </div>

        <div className="mt-5 grid gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-[14px] border border-[#E2ECF6] bg-[#FBFDFF] px-4 py-3">
              <div className="h-2.5 rounded-full bg-[#DCE8F4]" style={{ width: `${[48, 68, 56, 76][index]}%` }} />
              <div className="mt-2 h-2 rounded-full bg-[#EDF3F9]" style={{ width: `${[72, 52, 80, 61][index]}%` }} />
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="h-10 rounded-[12px] bg-[linear-gradient(90deg,#1685EA,#22A3E0)] shadow-[0_10px_24px_rgba(22,133,234,0.20)]" />
          <div className="h-10 rounded-[12px] border border-[#D8E5F2] bg-white" />
        </div>
      </div>

      <motion.div
        className="absolute -right-[2%] top-[24%] flex h-[78px] w-[78px] items-center justify-center rounded-[22px] border border-white bg-[#EAF4FF] shadow-[0_20px_44px_rgba(22,133,234,0.16),inset_0_1px_0_rgba(255,255,255,1)]"
        animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9">
          <path d="M24 7 37 12v10c0 10-5.2 16.5-13 21-7.8-4.5-13-11-13-21V12L24 7Z" stroke={BRAND.blue} strokeWidth="2.8" strokeLinejoin="round" />
          <path d="m18 25 4 4 8-9" stroke={BRAND.blue} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-[8%] left-[2%] flex h-[68px] w-[68px] items-center justify-center rounded-[20px] border border-white bg-[#EAFBF4] shadow-[0_18px_40px_rgba(42,168,69,0.15),inset_0_1px_0_rgba(255,255,255,1)]"
        animate={reducedMotion ? undefined : { y: [0, 7, 0] }}
        transition={{ duration: 6.3, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8">
          <circle cx="24" cy="15" r="6" stroke={BRAND.green} strokeWidth="2.8" />
          <path d="M12 38v-3c0-7 5-11 12-11s12 4 12 11v3" stroke={BRAND.green} strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
}

export function BookPage() {
  const { t, i18n } = useTranslation("book");
  const reducedMotion = useReducedMotion() ?? false;
  const rtl = i18n.dir() === "rtl";
  const pageRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const configured = Boolean(endpoint);

  useEffect(() => {
    if (reducedMotion || !pageRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".book-hero-word", { opacity: 0, yPercent: 95 });
      gsap.set([".book-hero-kicker", ".book-hero-body", ".book-hero-art"], { opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".book-hero",
            start: "top 92%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        })
        .fromTo(".book-hero-kicker", { y: 10 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" })
        .to(".book-hero-word", { opacity: 1, yPercent: 0, duration: 0.68, stagger: 0.065, ease: "power3.out" }, "-=0.12")
        .fromTo(
          ".book-hero-body",
          { y: 14, clipPath: "inset(0 0 100% 0)" },
          { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.58, ease: "power2.out" },
          "-=0.28",
        )
        .fromTo(
          ".book-hero-art",
          { x: rtl ? -24 : 24, y: 14 },
          { opacity: 1, x: 0, y: 0, duration: 0.78, ease: "power2.out" },
          "-=0.38",
        );

      gsap.fromTo(
        ".book-hero-art",
        { yPercent: 0 },
        {
          yPercent: -1.2,
          ease: "none",
          scrollTrigger: {
            trigger: ".book-hero",
            start: "top top",
            end: "bottom top",
            scrub: 3,
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.fromTo(
        ".book-form-shell",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".book-form-shell",
            start: "top 88%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".book-field-reveal").forEach((field) => {
        gsap.fromTo(
          field,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: field,
              start: "top 92%",
              end: "top 74%",
              scrub: 1,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          },
        );
      });

      gsap.fromTo(
        ".book-bg-orbit",
        { rotate: rtl ? -2 : 2 },
        {
          rotate: rtl ? 3 : -3,
          ease: "none",
          scrollTrigger: {
            trigger: pageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 5,
            invalidateOnRefresh: true,
          },
        },
      );
    }, pageRef);

    return () => ctx.revert();
  }, [reducedMotion, rtl]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const raw = {
      name: String(form.get("name") ?? ""),
      organization: String(form.get("organization") ?? ""),
      title: String(form.get("title") ?? ""),
      country: String(form.get("country") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      useCase: String(form.get("useCase") ?? ""),
      volume: String(form.get("volume") ?? ""),
      languages: String(form.get("languages") ?? ""),
      deployment: String(form.get("deployment") ?? ""),
      internet: String(form.get("internet") ?? ""),
      identity: String(form.get("identity") ?? ""),
      siem: String(form.get("siem") ?? ""),
      timeline: String(form.get("timeline") ?? ""),
      notes: String(form.get("notes") ?? ""),
      consent: form.get("consent") === "on",
      companyWebsite: String(form.get("companyWebsite") ?? ""),
    };

    const parsed = reviewSchema.safeParse(raw);

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        next[key] =
          key === "email"
            ? t("errors.email")
            : key === "consent"
              ? t("errors.consent")
              : t("errors.required");
      }
      setErrors(next);
      setStatus("idle");
      return;
    }

    setErrors({});

    if (parsed.data.companyWebsite) {
      setStatus("success");
      return;
    }

    if (!endpoint) {
      setStatus("idle");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div ref={pageRef} dir={rtl ? "rtl" : "ltr"} className="relative isolate overflow-hidden bg-[#FBFDFF]">
      <Seo page="book" path="/book" />

      <section className="book-hero relative isolate overflow-hidden px-4 pb-16 pt-[116px] sm:px-6 sm:pb-20 sm:pt-[128px] lg:px-8 lg:pb-[92px] lg:pt-[142px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-30 bg-[linear-gradient(180deg,#F9FCFF_0%,#FFFFFF_100%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-[7%] top-[3%] -z-20 h-[430px] w-[430px] rounded-full bg-[radial-gradient(circle_at_35%_45%,rgba(220,236,252,0.86),rgba(242,249,254,0.54)_58%,rgba(255,255,255,0)_82%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-[13%] bottom-[-38%] -z-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_68%_30%,rgba(222,240,252,0.82),rgba(245,251,255,0.40)_58%,rgba(255,255,255,0)_82%)]" />

        <svg viewBox="0 0 1680 900" className="book-bg-orbit pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-55" aria-hidden="true">
          <path d="M-100 300 C190 55 480 24 760 135" fill="none" stroke="#55B9F3" strokeWidth="1.4" opacity="0.56" />
          <path d="M1090 900 C1390 845 1600 726 1750 530" fill="none" stroke="#62D6C6" strokeWidth="1.3" opacity="0.52" />
        </svg>

        <div className="mx-auto grid w-full max-w-[1480px] items-center gap-8 lg:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] lg:gap-8">
          <div className="relative z-10 max-w-[720px]">
            <p className="book-hero-kicker text-[11px] font-[800] uppercase tracking-[0.32em] text-transparent bg-clip-text bg-[linear-gradient(90deg,#1685EA,#22A3E0,#2AA845)] sm:text-[12px]">
              {t("eyebrow")}
            </p>

            <h1 className="mt-5 max-w-[780px] text-[42px] font-[820] leading-[1.02] tracking-[-0.055em] sm:text-[54px] lg:text-[58px]">
              <SplitGradientHeading text={t("headline")} />
            </h1>

            <p className="book-hero-body mt-6 max-w-[690px] text-[15px] font-medium leading-[1.65] text-[#5E7191] sm:text-[16px] lg:text-[18px]">
              {t("body")}
            </p>
          </div>

          <div className="book-hero-art min-w-0">
            <BookHeroVisual reducedMotion={reducedMotion} />
          </div>
        </div>
      </section>

      <section className="relative isolate px-4 pb-20 pt-2 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28">
        <div className="book-form-shell relative mx-auto max-w-[980px] [perspective:1400px]">
          {/* compact 3D depth */}

          <div
            aria-hidden="true"
            className="absolute inset-x-[42px] bottom-[-15px] h-[58px] rounded-[30px] bg-[#315F88]/10 blur-[18px]"
          />

          <div
            aria-hidden="true"
            className="absolute inset-x-[10px] bottom-[-7px] h-[42px] rounded-[24px] border border-white/90 bg-[linear-gradient(180deg,rgba(239,248,255,.90),rgba(220,238,252,.72))] shadow-[0_18px_38px_rgba(42,73,100,0.07)]"
          />

          <div className="relative z-10 overflow-hidden rounded-[24px] border border-[#D8E6F3] bg-[linear-gradient(145deg,rgba(255,255,255,.97),rgba(247,251,255,.91))] p-4 shadow-[0_26px_64px_rgba(34,66,96,0.10),0_7px_20px_rgba(34,66,96,0.045),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-[18px] sm:p-5 lg:p-6">
            {/* brand accent strip */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-5 top-2.5 z-20 flex h-1 gap-1 overflow-hidden rounded-b-full"
            >
              {[BRAND.blue, BRAND.cyan, BRAND.green, BRAND.red, BRAND.gold].map((color) => (
                <span key={color} className="h-full flex-1 rounded-full" style={{ background: color }} />
              ))}
            </div>

            {/* subtle glass atmosphere */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-[9%] -top-[28%] h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,rgba(218,236,252,0.70),rgba(255,255,255,0)_72%)]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-[28%] -left-[8%] h-[210px] w-[210px] rounded-full bg-[radial-gradient(circle,rgba(220,247,237,0.58),rgba(255,255,255,0)_72%)]"
            />

            {!configured ? (
              <p className="book-field-reveal relative z-10 mb-4 rounded-[12px] border border-[#D8E7F5] bg-[#F7FBFF]/95 px-3.5 py-2.5 text-[12px] font-medium text-[#314B6E] shadow-[0_7px_18px_rgba(39,70,98,0.035),inset_0_1px_0_rgba(255,255,255,1)] sm:text-[13px]">
                {t("unconfigured")}
              </p>
            ) : null}

            {status === "success" ? (
              <p className="relative z-10 rounded-[13px] border border-[#CDEEDC] bg-[#F0FBF5] px-4 py-3 text-[13px] font-semibold text-[#16945A] shadow-[0_9px_22px_rgba(42,168,69,0.06)]">
                {t("success")}
              </p>
            ) : (
              <form
                className="relative z-10 grid gap-3 md:grid-cols-2 md:gap-x-4 md:gap-y-3.5"
                onSubmit={onSubmit}
                noValidate
              >
                <Field name="name" label={t("fields.name")} error={errors.name} required />
                <Field name="organization" label={t("fields.organization")} error={errors.organization} required />
                <Field name="title" label={t("fields.title")} error={errors.title} required />
                <Field name="country" label={t("fields.country")} error={errors.country} required />
                <Field name="email" label={t("fields.email")} type="email" error={errors.email} required dir="ltr" />
                <Field name="phone" label={t("fields.phone")} dir="ltr" />

                <Select name="useCase" label={t("fields.useCase")} options={t("useCases", { returnObjects: true }) as string[]} error={errors.useCase} />
                <Select name="volume" label={t("fields.volume")} options={t("volumes", { returnObjects: true }) as string[]} error={errors.volume} />
                <Select name="languages" label={t("fields.languages")} options={t("languages", { returnObjects: true }) as string[]} error={errors.languages} />
                <Select name="deployment" label={t("fields.deployment")} options={t("deployments", { returnObjects: true }) as string[]} error={errors.deployment} />
                <Select name="internet" label={t("fields.internet")} options={t("internet", { returnObjects: true }) as string[]} error={errors.internet} />

                <Field name="identity" label={t("fields.identity")} error={errors.identity} required />
                <Field name="siem" label={t("fields.siem")} error={errors.siem} required />
                <Select name="timeline" label={t("fields.timeline")} options={t("timelines", { returnObjects: true }) as string[]} error={errors.timeline} />

                <label className="book-field-reveal group grid gap-1.5 text-[12px] md:col-span-2 sm:text-[13px]">
                  <span className="font-semibold text-[#1A3153] transition-colors duration-200 group-focus-within:text-[#1685EA]">
                    {t("fields.notes")}
                  </span>

                  <textarea
                    name="notes"
                    rows={3}
                    className="min-h-[94px] w-full resize-y rounded-[12px] border border-[#D9E6F2] bg-[linear-gradient(180deg,#FCFEFF_0%,#F8FBFE_100%)] px-3.5 py-2.5 text-[13px] text-[#10264A] outline-none shadow-[0_6px_16px_rgba(39,70,98,0.028),inset_0_1px_0_rgba(255,255,255,1)] transition duration-200 hover:border-[#C6DDF2] hover:bg-white focus:border-[#1685EA] focus:bg-white focus:shadow-[0_0_0_3px_rgba(22,133,234,0.09),0_8px_20px_rgba(39,70,98,0.045)]"
                  />
                </label>

                <div className="hidden" aria-hidden="true">
                  <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="book-field-reveal md:col-span-2">
                  <label className="flex items-start gap-2.5 rounded-[12px] border border-[#E0EAF4] bg-[#FAFCFF]/92 px-3.5 py-2.5 text-[12px] leading-relaxed text-[#526783] shadow-[inset_0_1px_0_rgba(255,255,255,1)] transition duration-200 hover:border-[#CFE0F0] hover:bg-white sm:text-[13px]">
                    <input
                      type="checkbox"
                      name="consent"
                      className="mt-[2px] h-4 w-4 shrink-0 accent-[#1685EA]"
                    />
                    <span>{t("consent")}</span>
                  </label>

                  {errors.consent ? (
                    <p className="mt-1.5 text-[12px] text-danger">{errors.consent}</p>
                  ) : null}
                </div>

                {status === "error" ? (
                  <p className="book-field-reveal text-[12px] text-danger md:col-span-2">
                    {t("error")}
                  </p>
                ) : null}

                <div className="book-field-reveal flex md:col-span-2 md:justify-end">
                  <motion.button
                    type="submit"
                    disabled={!configured || status === "sending"}
                    whileHover={
                      reducedMotion || !configured || status === "sending"
                        ? undefined
                        : { y: -2 }
                    }
                    whileTap={
                      reducedMotion || !configured || status === "sending"
                        ? undefined
                        : { scale: 0.992 }
                    }
                    className="group relative inline-flex min-h-[46px] w-full items-center justify-center overflow-hidden rounded-[12px] bg-[linear-gradient(90deg,#1685EA_0%,#22A3E0_100%)] px-6 text-[13px] font-bold text-white shadow-[0_13px_28px_rgba(22,133,234,0.20),inset_0_1px_0_rgba(255,255,255,0.24)] transition duration-300 hover:shadow-[0_17px_34px_rgba(22,133,234,0.26)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-[-32%] w-[28%] -skew-x-12 bg-white/20 opacity-0 blur-[2px] transition-all duration-500 group-hover:left-[108%] group-hover:opacity-100"
                    />

                    <span className="relative z-10">
                      {status === "sending" ? t("sending") : t("submit")}
                    </span>
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  name,
  label,
  error,
  type = "text",
  required,
  dir,
}: {
  name: string;
  label: string;
  error?: string;
  type?: string;
  required?: boolean;
  dir?: "ltr" | "rtl";
}) {
  const id = `field-${name}`;

  return (
    <label
      className="book-field-reveal group grid gap-1.5 text-[12px] sm:text-[13px]"
      htmlFor={id}
    >
      <span className="font-semibold text-[#1A3153] transition-colors duration-200 group-focus-within:text-[#1685EA]">
        {label}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        dir={dir}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="min-h-[44px] w-full rounded-[12px] border border-[#D9E6F2] bg-[linear-gradient(180deg,#FCFEFF_0%,#F8FBFE_100%)] px-3.5 py-2 text-[13px] text-[#10264A] outline-none shadow-[0_6px_16px_rgba(39,70,98,0.028),inset_0_1px_0_rgba(255,255,255,1)] transition duration-200 hover:border-[#C6DDF2] hover:bg-white focus:border-[#1685EA] focus:bg-white focus:shadow-[0_0_0_3px_rgba(22,133,234,0.09),0_8px_20px_rgba(39,70,98,0.045)] aria-[invalid=true]:border-[#E5232A]/60 aria-[invalid=true]:shadow-[0_0_0_3px_rgba(229,35,42,0.07)]"
      />
      {error ? <span id={`${id}-error`} className="text-[11px] text-danger">{error}</span> : null}
    </label>
  );
}

function Select({
  name,
  label,
  options,
  error,
}: {
  name: string;
  label: string;
  options: string[];
  error?: string;
}) {
  const id = `field-${name}`;

  return (
    <label
      className="book-field-reveal group grid gap-1.5 text-[12px] sm:text-[13px]"
      htmlFor={id}
    >
      <span className="font-semibold text-[#1A3153] transition-colors duration-200 group-focus-within:text-[#1685EA]">
        {label}
      </span>
      <select
        id={id}
        name={name}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="min-h-[44px] w-full rounded-[12px] border border-[#D9E6F2] bg-[linear-gradient(180deg,#FCFEFF_0%,#F8FBFE_100%)] px-3.5 py-2 text-[13px] text-[#10264A] outline-none shadow-[0_6px_16px_rgba(39,70,98,0.028),inset_0_1px_0_rgba(255,255,255,1)] transition duration-200 hover:border-[#C6DDF2] hover:bg-white focus:border-[#1685EA] focus:bg-white focus:shadow-[0_0_0_3px_rgba(22,133,234,0.09),0_8px_20px_rgba(39,70,98,0.045)] aria-[invalid=true]:border-[#E5232A]/60 aria-[invalid=true]:shadow-[0_0_0_3px_rgba(229,35,42,0.07)]"
      >
        <option value="" />
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {error ? <span id={`${id}-error`} className="text-[11px] text-danger">{error}</span> : null}
    </label>
  );
}
