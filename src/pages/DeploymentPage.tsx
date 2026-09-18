import { useEffect, useId, useRef } from "react";

import { motion, useReducedMotion } from "framer-motion";

import { useTranslation } from "react-i18next";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Seo } from "@/lib/seo";

import { LocaleLink } from "@/components/LocaleLink";

const BRAND = {
  red: "#E5232A",
  green: "#2AA845",
  cyan: "#22A3E0",
  blue: "#1685EA",
  purple: "#5C6BC0",
  gold: "#F2C94C",
} as const;

const HERO_VISUAL_SRC = "/brand/deployment-hero-reference.png";

const OVERVIEW_VISUAL_SRC = "/brand/deployment-overview-reference.png";

const LOGO_SRC = "/brand/idoc-hive-logo.png";

/* =============================================================================
   HERO HEADING
============================================================================= */

function SplitGradientHeading({ text }: { text: string }) {
  const words = text.trim().split(/\s+/).filter(Boolean);

  const gradientStart = Math.max(1, Math.ceil(words.length / 2));

  return (
    <>
      {words.map((word, index) => {
        const gradient = index >= gradientStart;

        return (
          <span
            key={`${word}-${index}`}
            className={`
                deployment-hero-word

                inline-block

                will-change-transform

                ${
                  gradient
                    ? "bg-[linear-gradient(90deg,#1685EA_0%,#22A3E0_58%,#2AA845_100%)] bg-clip-text text-transparent"
                    : "text-[#07142D]"
                }
              `}
          >
            {word}

            {index < words.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </>
  );
}

/* =============================================================================
   HERO SIGNAL OVERLAY
============================================================================= */

function DeploymentSignalOverlay({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  /*
    Exact trace against the 858 × 670 hero reference image.

    Important:
    - The real colored wire is already inside HERO_VISUAL_SRC.
    - We do NOT redraw a second white wire over it.
    - We only add a slim colored travelling highlight, a signal particle,
      a soft halo and endpoint pulses.
    - This keeps the animation visually locked to the reference artwork.
  */
  const signals = [
    {
      id: "on-premise",
      d: "M189 167 C190 184 194 196 208 201 C220 206 237 204 250 211 C261 217 268 225 271 233",
      color: BRAND.green,
      duration: "3.55s",
      begin: "0s",
      source: {
        cx: 189,
        cy: 167,
      },
      target: {
        cx: 271,
        cy: 233,
      },
      targetBegin: "1.95s",
    },
    {
      id: "private",
      d: "M673 185 C673 207 665 219 650 224 C638 228 626 227 614 228 C579 230 551 244 543 267",
      color: BRAND.blue,
      duration: "3.75s",
      begin: "0.55s",
      source: {
        cx: 673,
        cy: 185,
      },
      target: {
        cx: 543,
        cy: 267,
      },
      targetBegin: "2.45s",
    },
    {
      id: "air-gapped",
      d: "M727 366 C727 385 718 398 700 404 C689 408 675 409 657 409 L598 409",
      color: BRAND.red,
      duration: "3.45s",
      begin: "1.1s",
      source: {
        cx: 727,
        cy: 366,
      },
      target: {
        cx: 598,
        cy: 409,
      },
      targetBegin: "2.85s",
    },
  ];

  if (reducedMotion) {
    return null;
  }

  return (
    <svg
      viewBox="0 0 858 670"
      className="
        pointer-events-none
        absolute
        inset-0
        z-20

        h-full
        w-full
      "
      aria-hidden="true"
    >
      <defs>
        <filter
          id="deployment-signal-particle-glow"
          x="-180%"
          y="-180%"
          width="460%"
          height="460%"
        >
          <feGaussianBlur stdDeviation="3" result="blur" />

          <feMerge>
            <feMergeNode in="blur" />

            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter
          id="deployment-signal-line-glow"
          x="-70%"
          y="-70%"
          width="240%"
          height="240%"
        >
          <feGaussianBlur stdDeviation="1.35" result="blur" />

          <feMerge>
            <feMergeNode in="blur" />

            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {signals.map((signal) => (
        <g key={signal.id}>
          {/*
              A short moving highlight runs exactly over the colored reference
              wire. Because it uses the same brand color, no duplicate white
              wire is visible while scrolling or during the idle loop.
            */}

          <path
            d={signal.d}
            fill="none"
            stroke={signal.color}
            strokeWidth="2.35"
            strokeLinecap="round"
            strokeDasharray="16 150"
            opacity="0.50"
            filter="url(#deployment-signal-line-glow)"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="18;-166"
              dur={signal.duration}
              begin={signal.begin}
              repeatCount="indefinite"
            />
          </path>

          {/* travelling signal */}

          <circle
            cx="0"
            cy="0"
            r="4.1"
            fill={signal.color}
            stroke="white"
            strokeWidth="1.6"
            filter="url(#deployment-signal-particle-glow)"
          >
            <animateMotion
              dur={signal.duration}
              begin={signal.begin}
              repeatCount="indefinite"
              path={signal.d}
            />
          </circle>

          {/* soft travelling halo */}

          <circle
            cx="0"
            cy="0"
            r="9"
            fill={signal.color}
            opacity="0.12"
            filter="url(#deployment-signal-particle-glow)"
          >
            <animateMotion
              dur={signal.duration}
              begin={signal.begin}
              repeatCount="indefinite"
              path={signal.d}
            />
          </circle>

          {/* source node pulse */}

          <circle
            cx={signal.source.cx}
            cy={signal.source.cy}
            r="7"
            fill="none"
            stroke={signal.color}
            strokeWidth="1.7"
            opacity="0.45"
          >
            <animate
              attributeName="r"
              values="7;12;7"
              dur="2.6s"
              begin={signal.begin}
              repeatCount="indefinite"
            />

            <animate
              attributeName="opacity"
              values="0.45;0.04;0.45"
              dur="2.6s"
              begin={signal.begin}
              repeatCount="indefinite"
            />
          </circle>

          {/* destination node pulse */}

          <circle
            cx={signal.target.cx}
            cy={signal.target.cy}
            r="5.5"
            fill="none"
            stroke={signal.color}
            strokeWidth="1.5"
            opacity="0.30"
          >
            <animate
              attributeName="r"
              values="5.5;10;5.5"
              dur="2.6s"
              begin={signal.targetBegin}
              repeatCount="indefinite"
            />

            <animate
              attributeName="opacity"
              values="0.30;0.03;0.30"
              dur="2.6s"
              begin={signal.targetBegin}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}
    </svg>
  );
}

/* =============================================================================
   HERO VISUAL
============================================================================= */

function DeploymentHeroVisual({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.div
      className="
        relative

        mx-auto

        aspect-[858/670]
        w-full

        overflow-visible

        [perspective:1400px]
      "
      animate={
        reducedMotion
          ? undefined
          : {
              y: [0, -4, 0],
            }
      }
      transition={{
        duration: 9.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-[14%]
          bottom-[4%]
          z-0

          h-[12%]

          rounded-[50%]

          bg-[#4176AC]/14

          blur-[28px]
        "
      />

      <img
        src={HERO_VISUAL_SRC}
        alt=""
        width={858}
        height={670}
        className="
          absolute
          inset-0
          z-10

          h-full
          w-full

          select-none
          object-contain
          object-center
        "
        draggable={false}
      />

      {!reducedMotion && (
        <div
          aria-hidden="true"
          className="
            deployment-hero-light

            pointer-events-none
            absolute
            inset-y-[8%]
            left-[-18%]
            z-[15]

            w-[18%]

            rotate-[10deg]

            bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.38),transparent)]

            blur-[18px]

            mix-blend-screen
          "
        />
      )}

      <DeploymentSignalOverlay reducedMotion={reducedMotion} />
    </motion.div>
  );
}

/* =============================================================================
   HERO
============================================================================= */

function DeploymentHero({ rtl }: { rtl: boolean }) {
  const { t } = useTranslation("deployment");

  const sectionRef = useRef<HTMLElement>(null);

  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".deployment-hero-word", {
        opacity: 0,
        yPercent: 105,
        rotateX: 13,
        transformOrigin: "50% 100%",
      });

      gsap.set(
        [
          ".deployment-hero-kicker",
          ".deployment-hero-body",
          ".deployment-hero-art",
        ],
        {
          opacity: 0,
        },
      );

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,

          start: "top 90%",

          toggleActions: "play none none reverse",

          invalidateOnRefresh: true,
        },
      });

      intro
        .fromTo(
          ".deployment-hero-kicker",
          {
            opacity: 0,
            y: 12,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.48,
            ease: "power2.out",
          },
        )
        .to(
          ".deployment-hero-word",
          {
            opacity: 1,
            yPercent: 0,
            rotateX: 0,
            stagger: 0.075,
            duration: 0.72,
            ease: "power3.out",
          },
          "-=0.12",
        )
        .fromTo(
          ".deployment-hero-body",
          {
            opacity: 0,
            y: 17,
            clipPath: "inset(0 0 100% 0)",
          },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.58,
            ease: "power2.out",
          },
          "-=0.34",
        )
        .fromTo(
          ".deployment-hero-art",
          {
            opacity: 0,
            x: rtl ? -26 : 26,
            y: 20,
            clipPath: rtl ? "inset(0 0 0 8%)" : "inset(0 8% 0 0)",
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            clipPath: "inset(0 0 0 0)",
            duration: 0.82,
            ease: "power2.out",
          },
          "-=0.42",
        )
        .fromTo(
          ".deployment-hero-light",
          {
            xPercent: rtl ? 520 : 0,
            opacity: 0,
          },
          {
            xPercent: rtl ? 0 : 520,
            opacity: 0.85,
            duration: 0.72,
            ease: "power1.inOut",
          },
          "-=0.38",
        )
        .to(
          ".deployment-hero-light",
          {
            opacity: 0,
            duration: 0.18,
          },
          "-=0.06",
        );

      /*
            Scroll animation: no scaling.
            Only tiny depth drift/parallax for a stable reference match.
          */
      gsap.fromTo(
        ".deployment-hero-art",
        {
          yPercent: 0,
        },
        {
          yPercent: -1.4,

          ease: "none",

          scrollTrigger: {
            trigger: sectionRef.current,

            start: "top top",

            end: "bottom top",

            scrub: 2.8,

            invalidateOnRefresh: true,
          },
        },
      );

      gsap.fromTo(
        ".deployment-hero-orbit",
        {
          rotate: rtl ? -2 : 2,
        },
        {
          rotate: rtl ? 3 : -3,

          ease: "none",

          scrollTrigger: {
            trigger: sectionRef.current,

            start: "top bottom",

            end: "bottom top",

            scrub: 4,

            invalidateOnRefresh: true,
          },
        },
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion, rtl]);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        isolate
        overflow-hidden

        bg-[linear-gradient(180deg,#F8FBFE_0%,#FCFEFF_38%,#FFFFFF_100%)]

        px-4
        pb-14
        pt-[118px]

        sm:px-6
        sm:pb-[72px]
        sm:pt-[130px]

        lg:px-8
        lg:pb-20
        lg:pt-[140px]

        xl:min-h-[790px]
        xl:pt-[148px]
      "
    >
      {/* reference-style atmosphere */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-20

          bg-[radial-gradient(circle_at_74%_42%,rgba(220,235,255,0.68),rgba(247,251,255,0.24)_38%,rgba(255,255,255,0)_66%)]
        "
      />

      <svg
        viewBox="0 0 1680 900"
        className="
          deployment-hero-orbit

          pointer-events-none
          absolute
          inset-0
          -z-10

          h-full
          w-full

          opacity-55

          will-change-transform
        "
        aria-hidden="true"
      >
        <path
          d="M-100 270 C240 30 540 30 810 150"
          fill="none"
          stroke="#55B8F4"
          strokeWidth="1.5"
          opacity="0.6"
        />

        <path
          d="M1050 880 C1370 820 1580 710 1740 520"
          fill="none"
          stroke="#6EDBC5"
          strokeWidth="1.4"
          opacity="0.7"
        />

        <path
          d="M1070 900 C1420 860 1620 760 1780 560"
          fill="none"
          stroke="#45B8F2"
          strokeWidth="1.2"
          opacity="0.5"
        />
      </svg>

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-[130px]
          bottom-[-190px]
          -z-10

          h-[400px]
          w-[400px]

          rotate-45

          bg-[#EEF6FF]/72
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-105px]
          top-[45px]
          -z-10

          h-[310px]
          w-[310px]

          rotate-45

          bg-[#F0F7FF]/70
        "
      />

      <div
        className="
          mx-auto

          grid
          w-full
          max-w-[1540px]
          items-center

          gap-8

          lg:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)]
          lg:gap-2
        "
      >
        {/* LEFT COPY */}

        <div
          className="
            relative
            z-10

            max-w-[720px]

            lg:pb-5
          "
        >
          <p
            className="
              deployment-hero-kicker

              text-[11px]
              font-[800]
              uppercase
              tracking-[0.34em]

              text-transparent

              bg-clip-text
              bg-[linear-gradient(90deg,#2AA845_0%,#22A3E0_52%,#1685EA_100%)]

              sm:text-[12px]
            "
          >
            {t("eyebrow")}
          </p>

          <h1
            className="
              mt-6

              max-w-[760px]

              text-[43px]
              font-[820]
              leading-[1.015]
              tracking-[-0.058em]
              text-[#07142D]

              [perspective:900px]

              sm:text-[54px]

              md:text-[62px]

              lg:text-[64px]

              xl:text-[70px]
            "
          >
            <SplitGradientHeading text={t("headline")} />
          </h1>

          <p
            className="
              deployment-hero-body

              mt-7

              max-w-[690px]

              text-[15px]
              font-medium
              leading-[1.64]
              text-[#536B90]

              sm:text-[17px]

              lg:text-[18px]
            "
          >
            {t("body")}
          </p>
        </div>

        {/* RIGHT VISUAL */}

        <div
          className="
            deployment-hero-art

            min-w-0

            lg:-ms-2
            lg:w-[102%]

            xl:-ms-5
            xl:w-[107%]
          "
        >
          <DeploymentHeroVisual reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   DEPLOYMENT OVERVIEW — REFERENCE MATCH
============================================================================= */

function OverviewIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path d="m24 6 13 7-13 7-13-7 13-7Z" fill="#1685EA" />

        <path
          d="m11 20 13 7 13-7"
          stroke="#1685EA"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="m11 28 13 7 13-7"
          stroke="#1685EA"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <circle cx="23" cy="23" r="14" stroke="#1685EA" strokeWidth="3" />

        <path
          d="M9 23h28M23 9c4 4 6 9 6 14s-2 10-6 14M23 9c-4 4-6 9-6 14s2 10 6 14"
          stroke="#1685EA"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <circle cx="34" cy="34" r="8" fill="#E5232A" />

        <path
          d="m30 30 8 8M38 30l-8 8"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path d="M14 6h20v36H14V6Z" fill="#2AA845" rx="3" />

        <path
          d="M19 17h10M19 23h10M19 29h7"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        <path d="M31 6v7h3" fill="#A8EAC0" />
      </svg>
    );
  }

  if (index === 3) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <rect x="14" y="14" width="20" height="20" rx="3" fill="#1685EA" />

        <rect x="19" y="19" width="10" height="10" rx="1.5" fill="white" />

        <path
          d="M8 18h6M8 24h6M8 30h6M34 18h6M34 24h6M34 30h6M18 8v6M24 8v6M30 8v6M18 34v6M24 34v6M30 34v6"
          stroke="#1685EA"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (index === 4) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path
          d="M24 6 36 11v10c0 9-5 16-12 21-7-5-12-12-12-21V11l12-5Z"
          fill="#2AA845"
        />

        <rect x="20" y="20" width="8" height="9" rx="2" fill="white" />

        <path
          d="M21.5 20v-2a2.5 2.5 0 0 1 5 0v2"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8" aria-hidden="true">
      <path d="M12 6h20l7 7v29H12V6Z" fill="#1685EA" />

      <path d="M32 6v9h7" fill="#8CCEFF" />

      <path
        d="M18 20h10M18 26h9"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      <circle
        cx="33"
        cy="33"
        r="8"
        fill="#1685EA"
        stroke="white"
        strokeWidth="2"
      />

      <path
        d="m29.5 33 2.5 2.5 4.5-5"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OverviewSignalOverlay({ reducedMotion }: { reducedMotion: boolean }) {
  /*
    These coordinates are traced directly against the
    690 × 675 deployment overview reference crop.

    The static colored wires remain part of the reference image.
    This SVG adds only signal light, moving particles and node pulses,
    so the animation sits directly on top of the original wireframe.
  */
  const signals = [
    {
      d: "M166 193 C165 205 156 218 137 229 C129 240 130 253 136 264 C146 281 165 295 195 309",
      color: BRAND.green,
      duration: "3.15s",
      begin: "0s",
    },
    {
      d: "M494 188 C495 202 491 214 481 221 C472 228 459 230 445 230",
      color: BRAND.blue,
      duration: "2.7s",
      begin: "0.65s",
    },
    {
      d: "M184 494 C201 495 216 488 234 478 C247 471 257 464 269 454",
      color: BRAND.blue,
      duration: "2.95s",
      begin: "1.25s",
    },
  ];

  const pulseNodes = [
    {
      cx: 166,
      cy: 193,
      color: BRAND.green,
      begin: "0s",
    },
    {
      cx: 137,
      cy: 229,
      color: BRAND.green,
      begin: "0.32s",
    },
    {
      cx: 494,
      cy: 188,
      color: BRAND.blue,
      begin: "0.65s",
    },
    {
      cx: 445,
      cy: 230,
      color: BRAND.blue,
      begin: "0.95s",
    },
    {
      cx: 184,
      cy: 494,
      color: BRAND.blue,
      begin: "1.25s",
    },
    {
      cx: 234,
      cy: 478,
      color: BRAND.blue,
      begin: "1.55s",
    },
  ];

  return (
    <svg
      viewBox="0 0 690 675"
      className="
        pointer-events-none
        absolute
        inset-0
        z-20

        h-full
        w-full
      "
      aria-hidden="true"
    >
      <defs>
        <filter
          id="overview-signal-glow"
          x="-120%"
          y="-120%"
          width="340%"
          height="340%"
        >
          <feGaussianBlur stdDeviation="2.2" result="blur" />

          <feMerge>
            <feMergeNode in="blur" />

            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {!reducedMotion &&
        signals.map((signal, index) => (
          <g key={`${signal.color}-${index}`}>
            {/* moving light streak precisely on the reference wire */}

            <path
              d={signal.d}
              fill="none"
              stroke="white"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeDasharray="13 105"
              opacity="0.92"
              filter="url(#overview-signal-glow)"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="22;-118"
                dur={signal.duration}
                begin={signal.begin}
                repeatCount="indefinite"
              />
            </path>

            {/* primary travelling signal */}

            <circle
              cx="0"
              cy="0"
              r="3.8"
              fill={signal.color}
              stroke="white"
              strokeWidth="1.5"
              filter="url(#overview-signal-glow)"
            >
              <animateMotion
                dur={signal.duration}
                begin={signal.begin}
                repeatCount="indefinite"
                path={signal.d}
              />
            </circle>

            {/* soft signal halo */}

            <circle
              cx="0"
              cy="0"
              r="7"
              fill={signal.color}
              opacity="0.12"
              filter="url(#overview-signal-glow)"
            >
              <animateMotion
                dur={signal.duration}
                begin={signal.begin}
                repeatCount="indefinite"
                path={signal.d}
              />
            </circle>
          </g>
        ))}

      {!reducedMotion &&
        pulseNodes.map((node, index) => (
          <g key={`${node.cx}-${node.cy}-${index}`}>
            <circle
              cx={node.cx}
              cy={node.cy}
              r="5.5"
              fill="none"
              stroke={node.color}
              strokeWidth="1.7"
              opacity="0.48"
            >
              <animate
                attributeName="r"
                values="5.5;10.5;5.5"
                dur="2.5s"
                begin={node.begin}
                repeatCount="indefinite"
              />

              <animate
                attributeName="opacity"
                values="0.48;0.06;0.48"
                dur="2.5s"
                begin={node.begin}
                repeatCount="indefinite"
              />
            </circle>

            <circle
              cx={node.cx}
              cy={node.cy}
              r="2.5"
              fill={node.color}
              opacity="0.92"
            >
              <animate
                attributeName="opacity"
                values="0.92;0.55;0.92"
                dur="1.65s"
                begin={node.begin}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
    </svg>
  );
}

function DeploymentOverviewSection({
  overview,
  rtl,
}: {
  overview: string[];
  rtl: boolean;
}) {
  const { t } = useTranslation("deployment");

  const sectionRef = useRef<HTMLElement>(null);

  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const timeline = gsap.timeline({
          defaults: {
            ease: "power2.out",
          },

          scrollTrigger: {
            trigger: sectionRef.current,

            start: "top 92%",

            end: "72% 32%",

            scrub: 1.35,

            invalidateOnRefresh: true,

            fastScrollEnd: true,
          },
        });

        timeline
          .fromTo(
            ".overview-ref-kicker",
            {
              opacity: 0,
              y: 10,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.26,
            },
          )
          .fromTo(
            ".overview-ref-title",
            {
              opacity: 0,
              y: 24,
              clipPath: "inset(0 0 100% 0)",
            },
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 0.58,
            },
            "-=0.08",
          )
          .fromTo(
            ".overview-ref-visual",
            {
              opacity: 0,
              x: rtl ? 24 : -24,
              y: 16,
              clipPath: rtl ? "inset(0 8% 0 0)" : "inset(0 0 0 8%)",
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              clipPath: "inset(0 0 0 0)",
              duration: 0.72,
            },
            "-=0.30",
          )
          .fromTo(
            ".overview-ref-card",
            {
              opacity: 0,
              x: rtl ? -26 : 26,
              y: 12,
              rotateY: rtl ? -4 : 4,
              transformPerspective: 1200,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotateY: 0,
              stagger: 0.12,
              duration: 0.58,
            },
            "-=0.44",
          );
      });

      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          ".overview-ref-title",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",

            scrollTrigger: {
              trigger: ".overview-ref-title",

              start: "top 88%",

              toggleActions: "play none none reverse",
            },
          },
        );

        gsap.utils
          .toArray<HTMLElement>(".overview-ref-card")
          .forEach((card) => {
            gsap.fromTo(
              card,
              {
                opacity: 0,
                y: 26,
                rotateX: 5,
                transformPerspective: 1000,
              },
              {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.62,
                ease: "power2.out",

                scrollTrigger: {
                  trigger: card,

                  start: "top 88%",

                  toggleActions: "play none none reverse",
                },
              },
            );
          });
      });

      gsap.fromTo(
        ".overview-ref-art",
        {
          yPercent: -0.5,
        },
        {
          yPercent: 0.8,
          ease: "none",

          scrollTrigger: {
            trigger: sectionRef.current,

            start: "top bottom",

            end: "bottom top",

            scrub: 3,

            invalidateOnRefresh: true,
          },
        },
      );

      return () => {
        mm.revert();
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion, rtl]);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        isolate
        overflow-hidden

        bg-[linear-gradient(180deg,#FBFDFF_0%,#FFFFFF_100%)]

        px-4
        py-16

        sm:px-6
        sm:py-20

        lg:px-8
        lg:py-[88px]
      "
    >
      {/* reference-like background arcs */}

      <svg
        viewBox="0 0 1680 900"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-20

          h-full
          w-full

          opacity-55
        "
        aria-hidden="true"
      >
        <path
          d="M-80 290 C160 40 440 18 700 125"
          fill="none"
          stroke="#5ABAF5"
          strokeWidth="1.4"
          opacity="0.65"
        />

        <path
          d="M1090 900 C1390 850 1590 735 1750 530"
          fill="none"
          stroke="#53CDE5"
          strokeWidth="1.35"
          opacity="0.55"
        />
      </svg>

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-[150px]
          top-[60px]
          -z-10

          h-[410px]
          w-[410px]

          rounded-full

          bg-[radial-gradient(circle_at_58%_46%,rgba(218,235,255,0.68),rgba(249,252,255,0)_72%)]
        "
      />

      <div
        className="
          mx-auto
          w-full
          max-w-[1460px]
        "
      >
        {/* centered heading */}

        <div
          className="
            mx-auto
            max-w-[900px]

            text-center
          "
        >
          <p
            className="
              overview-ref-kicker

              text-[10px]
              font-[800]
              uppercase
              tracking-[0.32em]

              text-transparent

              bg-clip-text
              bg-[linear-gradient(90deg,#1685EA,#22A3E0,#2AA845)]

              sm:text-[11px]
            "
          >
            {t("eyebrow")}
          </p>

          <h2
            className="
              overview-ref-title

              mt-3

              text-[36px]
              font-[820]
              leading-[1.02]
              tracking-[-0.052em]
              text-[#07142D]

              sm:text-[46px]

              lg:text-[54px]
            "
          >
            {t("overview.headline")}
          </h2>
        </div>

        {/* exact screenshot proportions */}

        <div
          className="
            mt-10

            grid
            items-center
            gap-8

            lg:grid-cols-[minmax(0,0.40fr)_minmax(0,0.60fr)]
            lg:gap-9
          "
        >
          {/* LEFT 3D REFERENCE VISUAL */}

          <div
            className="
              overview-ref-visual

              min-w-0
            "
          >
            <motion.div
              className="
                overview-ref-art

                relative

                mx-auto

                aspect-[690/675]
                w-full
                max-w-[620px]

                [perspective:1300px]
              "
              animate={
                reducedMotion
                  ? undefined
                  : {
                      y: [0, -4, 0],
                    }
              }
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={
                rtl
                  ? {
                      transform: "scaleX(-1)",
                    }
                  : undefined
              }
            >
              <img
                src={OVERVIEW_VISUAL_SRC}
                alt=""
                width={690}
                height={675}
                className="
                  absolute
                  inset-0
                  z-10

                  h-full
                  w-full

                  select-none
                  object-contain
                  object-center
                "
                draggable={false}
              />

              <OverviewSignalOverlay reducedMotion={reducedMotion} />
            </motion.div>
          </div>

          {/* RIGHT LIST */}

          <div
            className="
              grid
              gap-3.5
            "
          >
            {overview.map((item, index) => {
              const tone = [
                "#1685EA",
                "#1685EA",
                "#2AA845",
                "#1685EA",
                "#2AA845",
                "#1685EA",
              ][index % 6];

              const soft = [
                "#EAF4FF",
                "#EAF4FF",
                "#EAF9F1",
                "#EAF4FF",
                "#EAF9F1",
                "#EAF4FF",
              ][index % 6];

              return (
                <motion.div
                  key={item}
                  whileHover={
                    reducedMotion
                      ? undefined
                      : {
                          y: -3,
                          rotateX: 1.3,
                          rotateY: rtl ? -1.1 : 1.1,
                        }
                  }
                  transition={{
                    duration: 0.24,
                    ease: "easeOut",
                  }}
                  className="
                      overview-ref-card

                      group
                      relative

                      min-h-[76px]

                      [perspective:1100px]
                    "
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* subtle 3D rear plate */}

                  <div
                    aria-hidden="true"
                    className="
                        absolute
                        inset-x-[8px]
                        bottom-[-7px]

                        h-[24px]

                        rounded-[17px]

                        border
                        border-white/85

                        opacity-80
                      "
                    style={{
                      background: soft,
                      boxShadow: `0 18px 34px ${tone}18`,
                      transform: "translateZ(-16px)",
                    }}
                  />

                  {/* front card */}

                  <div
                    className="
                        relative
                        z-10

                        flex
                        min-h-[76px]
                        items-center

                        overflow-hidden

                        rounded-[17px]

                        border
                        border-[#D8E6F3]

                        bg-white/94

                        px-4

                        shadow-[0_14px_34px_rgba(39,70,99,0.08),0_4px_12px_rgba(39,70,99,0.04),inset_0_1px_0_rgba(255,255,255,1)]

                        backdrop-blur-[14px]

                        sm:px-5
                      "
                    style={{
                      transform: "translateZ(12px)",
                    }}
                  >
                    <div
                      className="
                          flex
                          h-[48px]
                          w-[48px]
                          shrink-0
                          items-center
                          justify-center

                          rounded-[12px]

                          border
                          border-white

                          shadow-[0_8px_20px_rgba(42,75,104,0.06),inset_0_1px_0_rgba(255,255,255,1)]
                        "
                      style={{
                        background: soft,
                        color: tone,
                      }}
                    >
                      <OverviewIcon index={index} />
                    </div>

                    <p
                      className="
                          min-w-0
                          flex-1

                          ps-5
                          pe-1

                          text-[14px]
                          font-[600]
                          leading-[1.35]
                          text-[#274265]

                          sm:text-[15px]

                          lg:text-[16px]
                        "
                    >
                      {item}
                    </p>

                    <span
                      aria-hidden="true"
                      className="
                          pointer-events-none
                          absolute
                          inset-x-8
                          top-0

                          h-px

                          bg-white
                        "
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   DEPLOYMENT PROFILES — REFERENCE-ACCURATE 3D CARDS
============================================================================= */

function DeploymentProfileIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg
        viewBox="0 0 72 72"
        fill="none"
        className="h-[48px] w-[48px]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="profile-cube-top" x1="18" y1="8" x2="54" y2="34">
            <stop stopColor="#31B4F4" />
            <stop offset="1" stopColor="#1685EA" />
          </linearGradient>

          <linearGradient
            id="profile-cube-left"
            x1="14"
            y1="24"
            x2="38"
            y2="62"
          >
            <stop stopColor="#22A3E0" />
            <stop offset="1" stopColor="#1685EA" />
          </linearGradient>

          <linearGradient
            id="profile-cube-right"
            x1="38"
            y1="27"
            x2="61"
            y2="61"
          >
            <stop stopColor="#1685EA" />
            <stop offset="1" stopColor="#0B63D4" />
          </linearGradient>
        </defs>

        <path d="m36 7 23 13-23 13L13 20 36 7Z" fill="url(#profile-cube-top)" />

        <path d="M13 20v27l23 14V33L13 20Z" fill="url(#profile-cube-left)" />

        <path d="M59 20v27L36 61V33l23-13Z" fill="url(#profile-cube-right)" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg
        viewBox="0 0 72 72"
        fill="none"
        className="h-[48px] w-[48px]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="profile-server-gradient"
            x1="11"
            y1="12"
            x2="60"
            y2="58"
          >
            <stop stopColor="#24DB80" />
            <stop offset="1" stopColor="#05A64A" />
          </linearGradient>
        </defs>

        {[14, 31, 48].map((y) => (
          <g key={y}>
            <rect
              x="11"
              y={y}
              width="50"
              height="14"
              rx="3.8"
              fill="url(#profile-server-gradient)"
            />

            <circle cx="22" cy={y + 7} r="2.5" fill="white" />

            <circle cx="49" cy={y + 7} r="2" fill="#A6F1C5" />

            <circle cx="55" cy={y + 7} r="2" fill="#D9FBE6" />
          </g>
        ))}
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 72 72"
      fill="none"
      className="h-[50px] w-[50px]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="profile-shield-gradient"
          x1="17"
          y1="10"
          x2="55"
          y2="62"
        >
          <stop stopColor="#5C6BC0" />
          <stop offset="0.45" stopColor="#3F51E8" />
          <stop offset="1" stopColor="#2E39C7" />
        </linearGradient>
      </defs>

      <path
        d="M36 7 57 16v17c0 15-8.7 25.2-21 32-12.3-6.8-21-17-21-32V16L36 7Z"
        fill="url(#profile-shield-gradient)"
      />

      <rect x="27" y="30" width="18" height="18" rx="4" fill="white" />

      <path
        d="M30.5 30v-4.2a5.5 5.5 0 0 1 11 0V30"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <circle cx="36" cy="38" r="2.2" fill="#3F51E8" />

      <path
        d="M36 40v4"
        stroke="#3F51E8"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DeploymentProfilesSection({
  profiles,
  rtl,
}: {
  profiles: {
    title: string;
    text: string;
  }[];
  rtl: boolean;
}) {
  const { t } = useTranslation("deployment");

  const sectionRef = useRef<HTMLElement>(null);

  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".profile-ref-card");

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.set(".profile-ref-kicker", {
          opacity: 0,
          y: 10,
        });

        gsap.set(".profile-ref-title", {
          opacity: 0,
          y: 22,
          clipPath: "inset(0 0 100% 0)",
        });

        cards.forEach((card) => {
          gsap.set(card, {
            autoAlpha: 0,
            y: 34,
            x: rtl ? 12 : -12,
          });
        });

        const timeline = gsap.timeline({
          defaults: {
            ease: "power2.out",
          },

          scrollTrigger: {
            trigger: sectionRef.current,

            start: "top 92%",

            end: "62% 40%",

            scrub: 1.25,

            invalidateOnRefresh: true,

            fastScrollEnd: true,
          },
        });

        timeline
          .to(".profile-ref-kicker", {
            opacity: 1,
            y: 0,
            duration: 0.3,
          })
          .to(
            ".profile-ref-title",
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 0.58,
            },
            "-=0.10",
          );

        cards.forEach((card, index) => {
          timeline.to(
            card,
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 0.72,
              ease: "power2.out",
            },
            index === 0 ? ">+=0.18" : ">+=0.30",
          );

          timeline.to(card, {
            duration: 0.22,
          });
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          ".profile-ref-title",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",

            scrollTrigger: {
              trigger: ".profile-ref-title",

              start: "top 88%",

              toggleActions: "play none none reverse",
            },
          },
        );

        cards.forEach((card) => {
          gsap.fromTo(
            card,
            {
              autoAlpha: 0,
              y: 30,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.68,
              ease: "power2.out",

              scrollTrigger: {
                trigger: card,

                start: "top 88%",

                end: "top 62%",

                scrub: 1.05,

                invalidateOnRefresh: true,
              },
            },
          );
        });
      });

      gsap.fromTo(
        ".profile-ref-bg",
        {
          yPercent: -0.7,
        },
        {
          yPercent: 0.9,
          ease: "none",

          scrollTrigger: {
            trigger: sectionRef.current,

            start: "top bottom",

            end: "bottom top",

            scrub: 3.2,

            invalidateOnRefresh: true,
          },
        },
      );

      return () => {
        mm.revert();
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion, rtl, profiles.length]);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        isolate
        overflow-hidden

        bg-[#FCFDFE]

        px-4
        py-16

        sm:px-6
        sm:py-20

        lg:px-8
        lg:py-[88px]
      "
    >
      <div
        aria-hidden="true"
        className="
          profile-ref-bg

          pointer-events-none
          absolute
          inset-0
          -z-30

          bg-[linear-gradient(180deg,#FEFFFF_0%,#FBFDFE_44%,#F9FCFE_100%)]

          will-change-transform
        "
      >
        <div
          className="
            absolute
            -left-[13%]
            top-[7%]

            h-[86%]
            w-[47%]

            rounded-full

            bg-[radial-gradient(circle_at_45%_50%,rgba(228,240,252,0.88)_0%,rgba(241,247,253,0.62)_46%,rgba(252,253,254,0)_75%)]
          "
        />

        <div
          className="
            absolute
            -right-[9%]
            top-[8%]

            h-[76%]
            w-[37%]

            rotate-[39deg]

            bg-[linear-gradient(145deg,rgba(229,240,253,0.72),rgba(248,252,255,0.16)_72%,rgba(255,255,255,0)_100%)]
          "
        />

        <div
          className="
            absolute
            -left-[12%]
            bottom-[-31%]

            h-[52%]
            w-[43%]

            rotate-[42deg]

            bg-[linear-gradient(145deg,rgba(229,241,253,0.62),rgba(249,252,255,0.10)_75%,rgba(255,255,255,0)_100%)]
          "
        />
      </div>

      <svg
        viewBox="0 0 1680 940"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10

          h-full
          w-full
        "
        aria-hidden="true"
      >
        <path
          d="M-95 300 C155 40 430 22 710 126"
          fill="none"
          stroke="#55B9F3"
          strokeWidth="1.35"
          opacity="0.55"
        />

        <path
          d="M1130 935 C1410 878 1608 756 1750 532"
          fill="none"
          stroke="#55B9F3"
          strokeWidth="1.35"
          opacity="0.53"
        />
      </svg>

      <div
        className="
          mx-auto
          w-full
          max-w-[1500px]
        "
      >
        <div
          className="
            mx-auto
            max-w-[1000px]

            text-center
          "
        >
          <p
            className="
              profile-ref-kicker

              text-[11px]
              font-[800]
              uppercase
              tracking-[0.34em]

              text-[#19A7E7]

              sm:text-[12px]
            "
          >
            {t("eyebrow")}
          </p>

          <h2
            className="
              profile-ref-title

              mt-4

              text-[36px]
              font-[820]
              leading-[1.01]
              tracking-[-0.052em]
              text-[#07142D]

              sm:text-[48px]

              lg:text-[58px]
            "
          >
            {t("profiles.headline")}
          </h2>
        </div>

        <div
          className="
            mx-auto
            mt-10

            grid
            max-w-[1320px]
            gap-5

            md:mt-12

            lg:grid-cols-3
            lg:gap-5
          "
        >
          {profiles.map((item, index) => {
            const tone = [BRAND.blue, BRAND.green, BRAND.purple][index % 3];

            const soft = ["#EAF5FF", "#EAFBF4", "#F0EFFD"][index % 3];

            const shadow = [
              "rgba(22,133,234,0.14)",
              "rgba(42,168,69,0.14)",
              "rgba(92,107,192,0.14)",
            ][index % 3];

            return (
              <motion.article
                key={item.title}
                className="
                    profile-ref-card

                    group
                    relative

                    min-h-[310px]

                    [perspective:1400px]

                    lg:min-h-[342px]
                  "
                style={{
                  opacity: reducedMotion ? 1 : 0,
                  transformStyle: "preserve-3d",
                }}
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        y: -5,
                      }
                }
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div
                  aria-hidden="true"
                  className="
                      absolute
                      inset-x-[18px]
                      bottom-[-11px]

                      h-[42px]

                      rounded-[26px]

                      opacity-55

                      blur-[12px]
                    "
                  style={{
                    background: shadow,
                    transform: "translateZ(-42px)",
                  }}
                />

                <div
                  aria-hidden="true"
                  className="
                      absolute
                      inset-x-[12px]
                      bottom-[-8px]

                      h-[34px]

                      rounded-[24px]

                      border
                      border-white/80

                      opacity-70
                    "
                  style={{
                    background: soft,
                    boxShadow: `0 24px 48px ${shadow}`,
                    transform: "translateZ(-32px)",
                  }}
                />

                <div
                  aria-hidden="true"
                  className="
                      absolute
                      inset-x-[6px]
                      bottom-[-4px]

                      h-[29px]

                      rounded-[23px]

                      border
                      border-white/90

                      opacity-90
                    "
                  style={{
                    background: `linear-gradient(180deg,#FFFFFF,${soft})`,
                    boxShadow: `0 17px 34px ${shadow}`,
                    transform: "translateZ(-16px)",
                  }}
                />

                <div
                  className="
                      profile-ref-card-inner

                      relative
                      z-10

                      h-full
                      min-h-[310px]

                      overflow-hidden

                      rounded-[22px]

                      border
                      border-[#D7E5F3]

                      bg-white/90

                      p-6

                      shadow-[0_24px_54px_rgba(32,64,95,0.10),0_7px_20px_rgba(32,64,95,0.05),inset_0_1px_0_rgba(255,255,255,1)]

                      backdrop-blur-[18px]

                      sm:p-6

                      lg:min-h-[342px]
                    "
                  style={{
                    transform: "none",
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        -start-[12%]
                        top-[-18%]

                        h-[52%]
                        w-[66%]

                        rounded-full

                        blur-[28px]
                      "
                    style={{
                      background: soft,
                      opacity: 0.82,
                    }}
                  />

                  <motion.div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        end-[4%]
                        top-[5%]

                        h-[88px]
                        w-[122px]

                        rounded-[24px]

                        opacity-60
                      "
                    style={{
                      background: `linear-gradient(145deg,${tone}16,${tone}08 48%,rgba(255,255,255,0.26))`,
                      transform: "rotate(-40deg)",
                    }}
                    animate={
                      reducedMotion
                        ? undefined
                        : {
                            y: [0, -4, 0],
                            x: [0, 3, 0],
                          }
                    }
                    transition={{
                      duration: 8 + index,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <div
                    className="
                        relative
                        z-10
                      "
                  >
                    <div
                      className="
                          flex
                          h-[86px]
                          w-[86px]
                          items-center
                          justify-center

                          rounded-[20px]

                          border
                          border-white

                          shadow-[0_16px_34px_rgba(38,69,98,0.08),inset_0_1px_0_rgba(255,255,255,1)]

                          [transform:none]
                        "
                      style={{
                        background: soft,
                      }}
                    >
                      <DeploymentProfileIcon index={index} />
                    </div>

                    <h3
                      className="
                          mt-6

                          text-[20px]
                          font-[820]
                          leading-[1.08]
                          tracking-[-0.038em]
                          text-[#07142D]

                          sm:text-[22px]

                          lg:text-[24px]
                        "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                          mt-4

                          max-w-[36ch]

                          text-[13px]
                          font-medium
                          leading-[1.64]
                          text-[#5E7191]

                          sm:text-[14px]

                          lg:text-[14.5px]
                        "
                    >
                      {item.text}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        inset-x-8
                        top-0

                        h-px

                        bg-white
                      "
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   SOVEREIGN AIR-GAPPED TOPOLOGY — REFERENCE-ACCURATE
============================================================================= */

const TOPOLOGY_ITEMS = [
  {
    label: "Offline update transfer",
    kind: "document",
    color: "#1685EA",
    soft: "#EAF4FF",
    alert: false,
  },
  {
    label: "Primary customer data center",
    kind: "servers",
    color: "#13A879",
    soft: "#E8FBF4",
    alert: false,
  },
  {
    label: "Internal load balancer",
    kind: "loadBalancer",
    color: "#7A35F2",
    soft: "#F2ECFF",
    alert: false,
  },
  {
    label: "Application services",
    kind: "cube",
    color: "#F06C1A",
    soft: "#FFF1E8",
    alert: false,
  },
  {
    label: "AI inference nodes",
    kind: "brain",
    color: "#1685EA",
    soft: "#EAF4FF",
    alert: false,
  },
  {
    label: "PostgreSQL + pgvector",
    kind: "database",
    color: "#13A879",
    soft: "#E8FBF4",
    alert: false,
  },
  {
    label: "Object storage",
    kind: "storage",
    color: "#7A35F2",
    soft: "#F2ECFF",
    alert: false,
  },
  {
    label: "Internal WAN / dark fiber",
    kind: "network",
    color: "#F06C1A",
    soft: "#FFF1E8",
    alert: false,
  },
  {
    label: "Disaster-recovery site",
    kind: "recovery",
    color: "#1685EA",
    soft: "#EAF4FF",
    alert: false,
  },
  {
    label: "Replication",
    kind: "replication",
    color: "#13A879",
    soft: "#E8FBF4",
    alert: false,
  },
  {
    label: "No internet egress",
    kind: "blocked",
    color: "#E5232A",
    soft: "#FFEDEF",
    alert: true,
  },
] as const;

function TopologyHeading({ text }: { text: string }) {
  const words = text.trim().split(/\s+/).filter(Boolean);

  return (
    <>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={`
              inline-block

              ${
                index === 0
                  ? "text-[#07142D]"
                  : "bg-[linear-gradient(90deg,#1685EA_0%,#22A3E0_62%,#2AA845_100%)] bg-clip-text text-transparent"
              }
            `}
        >
          {word}

          {index < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </>
  );
}

function TopologyIcon({ kind, color }: { kind: string; color: string }) {
  const strokeProps = {
    stroke: color,
    strokeWidth: 2.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (kind === "document") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path d="M14 6h14l8 8v28H14V6Z" {...strokeProps} />

        <path d="M28 6v9h8" {...strokeProps} />
      </svg>
    );
  }

  if (kind === "servers") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <rect x="10" y="10" width="28" height="10" rx="2.5" {...strokeProps} />

        <rect x="10" y="28" width="28" height="10" rx="2.5" {...strokeProps} />

        <circle cx="16" cy="15" r="1.4" fill={color} />

        <circle cx="16" cy="33" r="1.4" fill={color} />

        <path d="M29 15h4M29 33h4" {...strokeProps} />
      </svg>
    );
  }

  if (kind === "loadBalancer") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <rect x="20" y="7" width="8" height="8" rx="2" {...strokeProps} />

        <circle cx="12" cy="35" r="5" {...strokeProps} />

        <circle cx="24" cy="35" r="5" {...strokeProps} />

        <circle cx="36" cy="35" r="5" {...strokeProps} />

        <path d="M24 15v10M12 30v-5h24v5" {...strokeProps} />
      </svg>
    );
  }

  if (kind === "cube") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path d="m24 6 15 8.5L24 23 9 14.5 24 6Z" {...strokeProps} />

        <path
          d="M9 14.5v18L24 42V23L9 14.5ZM39 14.5v18L24 42"
          {...strokeProps}
        />
      </svg>
    );
  }

  if (kind === "brain") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path
          d="M24 8c-4 0-7 3-7 7-4 0-7 3-7 7 0 3 2 6 5 7-2 5 1 10 6 10h3V8Z"
          {...strokeProps}
        />

        <path
          d="M24 8c4 0 7 3 7 7 4 0 7 3 7 7 0 3-2 6-5 7 2 5-1 10-6 10h-3V8Z"
          {...strokeProps}
        />

        <path
          d="M18 18c3 0 5 2 5 5M30 18c-3 0-5 2-5 5M18 31c3 0 5-2 5-5M30 31c-3 0-5-2-5-5"
          {...strokeProps}
        />
      </svg>
    );
  }

  if (kind === "database" || kind === "storage") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <ellipse cx="24" cy="12" rx="13" ry="6" {...strokeProps} />

        <path d="M11 12v11c0 3.3 5.8 6 13 6s13-2.7 13-6V12" {...strokeProps} />

        <path d="M11 23v11c0 3.3 5.8 6 13 6s13-2.7 13-6V23" {...strokeProps} />
      </svg>
    );
  }

  if (kind === "network") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <circle cx="12" cy="32" r="5" {...strokeProps} />

        <circle cx="31" cy="13" r="5" {...strokeProps} />

        <circle cx="36" cy="35" r="5" {...strokeProps} />

        <path d="m16 29 11-12M16 34l15 1" {...strokeProps} />
      </svg>
    );
  }

  if (kind === "recovery") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <rect x="9" y="9" width="30" height="12" rx="3" {...strokeProps} />

        <rect x="9" y="27" width="30" height="12" rx="3" {...strokeProps} />

        <circle cx="31" cy="15" r="1.5" fill={color} />

        <circle cx="31" cy="33" r="1.5" fill={color} />

        <path d="M15 15h7M15 33h7" {...strokeProps} />
      </svg>
    );
  }

  if (kind === "replication") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path d="M37 17a15 15 0 0 0-24-4l-3 3" {...strokeProps} />

        <path d="M10 9v7h7" {...strokeProps} />

        <path d="M11 31a15 15 0 0 0 24 4l3-3" {...strokeProps} />

        <path d="M38 39v-7h-7" {...strokeProps} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8" aria-hidden="true">
      <circle cx="24" cy="24" r="15" {...strokeProps} />

      <path d="M13.5 13.5 34.5 34.5" {...strokeProps} />
    </svg>
  );
}

function TopologyCodePanel({
  title,
  primary,
  secondary,
  success = false,
  icon,
}: {
  title: string;
  primary: string;
  secondary: string;
  success?: boolean;
  icon: "shield" | "check";
}) {
  return (
    <motion.div
      className="
        topology-code-panel

        relative

        overflow-hidden

        rounded-[18px]

        border
        border-[#BFDDF8]

        bg-white/88

        p-4

        shadow-[0_16px_38px_rgba(35,69,101,0.08),inset_0_1px_0_rgba(255,255,255,1)]

        backdrop-blur-[14px]
      "
      whileHover={{
        y: -3,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
    >
      <div
        className="
          flex
          items-center
          gap-2.5
        "
      >
        <span
          className="
            h-3
            w-3

            rounded-full

            bg-[#FF5C63]
          "
        />

        <span
          className="
            h-3
            w-3

            rounded-full

            bg-[#FDBB2D]
          "
        />

        <span
          className="
            h-3
            w-3

            rounded-full

            bg-[#24CB73]
          "
        />

        <p
          className="
            ms-3

            truncate

            font-mono
            text-[11px]
            text-[#566BB9]

            sm:text-[12px]
          "
        >
          {title}
        </p>
      </div>

      <div
        className="
          relative

          mt-3

          rounded-[11px]

          bg-[linear-gradient(180deg,#F5F8FE_0%,#F2F6FC_100%)]

          px-4
          py-3

          pe-14
        "
      >
        <p
          className="
            font-mono
            text-[12px]
            font-semibold
            leading-[1.45]
            text-[#07142D]

            sm:text-[13px]
          "
        >
          {primary}
        </p>

        <p
          className={`
            mt-1.5

            font-mono
            text-[11px]
            leading-[1.45]

            sm:text-[12px]

            ${success ? "text-[#0FAE63]" : "text-[#7283AB]"}
          `}
        >
          {secondary}
        </p>

        <span
          className={`
            absolute
            end-4
            top-1/2

            flex
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center

            rounded-full

            ${
              icon === "check"
                ? "bg-[#13A879] text-white shadow-[0_9px_22px_rgba(19,168,121,0.20)]"
                : "text-[#13A879]"
            }
          `}
          aria-hidden="true"
        >
          {icon === "check" ? (
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="m6 12 4 4 8-9"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8">
              <path
                d="M16 3 27 8v8c0 7-4.5 11-11 14C9.5 27 5 23 5 16V8l11-5Z"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />

              <path
                d="m11 16 3 3 7-7"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      </div>
    </motion.div>
  );
}

function SovereignTopologySection({ rtl }: { rtl: boolean }) {
  const { t } = useTranslation("deployment");

  const sectionRef = useRef<HTMLElement>(null);

  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".topology-ref-card");

      const codePanels = gsap.utils.toArray<HTMLElement>(
        ".topology-code-panel",
      );

      const mm = gsap.matchMedia();

      /*
            DESKTOP / TABLET
            ----------------
            The heading/shell reveal as one short sequence.

            Every topology card then owns its own ScrollTrigger.
            This is important because the previous single long timeline could
            reach the end of the section before the final item had fully
            completed its reveal.

            With independent triggers:
            - cards still appear one-by-one,
            - the last topology item always reaches full opacity,
            - code panels also get enough scroll distance,
            - nothing is left half-visible when the next section arrives.
          */
      mm.add("(min-width: 768px)", () => {
        gsap.set(
          [
            ".topology-ref-kicker",
            ".topology-ref-title",
            ".topology-ref-body",
            ".topology-ref-shell",
            ".topology-ref-label",
            ".topology-ref-footer",
          ],
          {
            opacity: 0,
          },
        );

        gsap.set(cards, {
          autoAlpha: 0,
          y: 24,
        });

        gsap.set(codePanels, {
          autoAlpha: 0,
          y: 22,
        });

        gsap
          .timeline({
            defaults: {
              ease: "power2.out",
            },

            scrollTrigger: {
              trigger: sectionRef.current,

              start: "top 91%",

              end: "top 48%",

              scrub: 1.15,

              invalidateOnRefresh: true,

              fastScrollEnd: true,
            },
          })
          .to(".topology-ref-kicker", {
            opacity: 1,
            y: 0,
            duration: 0.22,
          })
          .fromTo(
            ".topology-ref-title",
            {
              y: 18,
              clipPath: "inset(0 0 100% 0)",
            },
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 0.5,
            },
            "-=0.08",
          )
          .fromTo(
            ".topology-ref-body",
            {
              y: 10,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.34,
            },
            "-=0.18",
          )
          .fromTo(
            ".topology-ref-shell",
            {
              y: 16,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.36,
            },
            "-=0.10",
          )
          .to(
            ".topology-ref-label",
            {
              opacity: 1,
              duration: 0.16,
            },
            "-=0.16",
          );

        /*
                One-by-one card reveal.
                Cards in the same row use slightly different trigger positions,
                so the left card appears first, then the middle, then the right.
              */
        cards.forEach((card, index) => {
          const column = index % 3;

          const start = ["top 91%", "top 82%", "top 73%"][column];

          const end = ["top 72%", "top 63%", "top 54%"][column];

          gsap.fromTo(
            card,
            {
              autoAlpha: 0,
              y: 24,
            },
            {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",

              scrollTrigger: {
                trigger: card,

                start,

                end,

                scrub: 1.05,

                invalidateOnRefresh: true,

                fastScrollEnd: true,
              },
            },
          );
        });

        /*
                The two bottom code panels also reveal independently.
                This guarantees the final panel can fully finish before the
                following section takes over the viewport.
              */
        codePanels.forEach((panel, index) => {
          gsap.fromTo(
            panel,
            {
              autoAlpha: 0,
              y: 22,
            },
            {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",

              scrollTrigger: {
                trigger: panel,

                start: index === 0 ? "top 90%" : "top 80%",

                end: index === 0 ? "top 70%" : "top 60%",

                scrub: 1.05,

                invalidateOnRefresh: true,

                fastScrollEnd: true,
              },
            },
          );
        });

        gsap.fromTo(
          ".topology-ref-footer",
          {
            opacity: 0,
            y: 8,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.42,
            ease: "power2.out",

            scrollTrigger: {
              trigger: ".topology-ref-footer",

              start: "top 88%",

              toggleActions: "play none none reverse",

              invalidateOnRefresh: true,
            },
          },
        );
      });

      /*
            MOBILE
            ------
            Each item reveals only when that item itself enters the viewport.
            The lower start/end values give the final card enough room to
            become 100% visible before the next content appears.
          */
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          ".topology-ref-title",
          {
            opacity: 0,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.58,
            ease: "power2.out",

            scrollTrigger: {
              trigger: ".topology-ref-title",

              start: "top 88%",

              toggleActions: "play none none reverse",

              invalidateOnRefresh: true,
            },
          },
        );

        cards.forEach((card) => {
          gsap.fromTo(
            card,
            {
              autoAlpha: 0,
              y: 24,
            },
            {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",

              scrollTrigger: {
                trigger: card,

                start: "top 91%",

                end: "top 67%",

                scrub: 1,

                invalidateOnRefresh: true,

                fastScrollEnd: true,
              },
            },
          );
        });

        codePanels.forEach((panel) => {
          gsap.fromTo(
            panel,
            {
              autoAlpha: 0,
              y: 20,
            },
            {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",

              scrollTrigger: {
                trigger: panel,

                start: "top 91%",

                end: "top 68%",

                scrub: 1,

                invalidateOnRefresh: true,

                fastScrollEnd: true,
              },
            },
          );
        });

        gsap.fromTo(
          ".topology-ref-footer",
          {
            opacity: 0,
            y: 8,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",

            scrollTrigger: {
              trigger: ".topology-ref-footer",

              start: "top 90%",

              toggleActions: "play none none reverse",
            },
          },
        );
      });

      /*
            Only the decorative background drifts.
            Card/text layers do not use blur-producing 3D transforms.
          */
      gsap.fromTo(
        ".topology-ref-bg",
        {
          yPercent: -0.5,
        },
        {
          yPercent: 0.7,
          ease: "none",

          scrollTrigger: {
            trigger: sectionRef.current,

            start: "top bottom",

            end: "bottom top",

            scrub: 3.2,

            invalidateOnRefresh: true,
          },
        },
      );

      return () => {
        mm.revert();
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion, rtl]);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        isolate
        overflow-hidden

        bg-[#FCFDFE]

        px-4
        py-16

        sm:px-6
        sm:py-20

        lg:px-8
        lg:pt-[88px]
        lg:pb-[118px]
      "
    >
      {/* background geometry from the reference */}

      <div
        aria-hidden="true"
        className="
          topology-ref-bg

          pointer-events-none
          absolute
          inset-0
          -z-30

          bg-[linear-gradient(180deg,#FEFFFF_0%,#FCFDFE_46%,#F9FCFE_100%)]

          will-change-transform
        "
      >
        <div
          className="
            absolute
            -left-[80px]
            top-[108px]

            h-[54px]
            w-[54px]

            rounded-full

            bg-[#EEF6FC]
          "
        />

        <div
          className="
            absolute
            right-[12%]
            top-[-65px]

            h-[185px]
            w-[185px]

            rounded-full

            bg-[radial-gradient(circle,#E8F4FC_0%,#EFF8FD_65%,rgba(255,255,255,0)_100%)]
          "
        />

        <div
          className="
            absolute
            -left-[10%]
            bottom-[-23%]

            h-[52%]
            w-[40%]

            rotate-[42deg]

            bg-[linear-gradient(145deg,rgba(225,239,252,0.70),rgba(249,252,255,0.08)_72%,rgba(255,255,255,0)_100%)]
          "
        />

        <div
          className="
            absolute
            right-[-7%]
            bottom-[-18%]

            h-[260px]
            w-[260px]

            rounded-full

            bg-[radial-gradient(circle,rgba(226,240,251,0.85),rgba(249,252,255,0)_73%)]
          "
        />
      </div>

      {/* dotted accent */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[7%]
          top-[8%]
          -z-10

          hidden

          grid-cols-5
          gap-[14px]

          lg:grid
        "
      >
        {Array.from({
          length: 20,
        }).map((_, index) => (
          <span
            key={index}
            className="
                h-[3px]
                w-[3px]

                rounded-full

                bg-[#1685EA]
              "
          />
        ))}
      </div>

      <div
        className="
          mx-auto
          w-full
          max-w-[1480px]
        "
      >
        {/* top copy */}

        <div
          className="
            max-w-full
          text-center
          "
        >
          <div
            className="
              flex
              items-center
              justify-center
              gap-4
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-8

                bg-[#1685EA]
              "
            />

            <p
              className="
                topology-ref-kicker

                text-[10px]
                font-[800]
                uppercase
                tracking-[0.32em]
                text-[#1685EA]

                sm:text-[11px]
              "
            >
              SOVEREIGN DEPLOYMENT
            </p>
          </div>

          <h2
            className="
              topology-ref-title

              mt-5

              text-[36px]
              font-[820]
              leading-[1.05]
              tracking-[-0.054em]
              text-[#07142D]

              sm:text-[46px]

              lg:text-[56px]
            "
          >
            <TopologyHeading text={t("topology.headline")} />
          </h2>

          <p
            className="
              topology-ref-body

              mt-5
              max-w-[950px]
              mx-auto

              text-[14px]
              font-medium
              leading-[1.58]
              text-[#5F70A4]

              sm:text-[16px]
            "
          >
            {t("topology.body")}
          </p>
        </div>

        {/* main topology shell */}

        <div
          className="
            topology-ref-shell

            mt-7

            rounded-[17px]

            border
            border-[#B9DBF7]

            bg-white/72

            p-4

            shadow-[0_18px_42px_rgba(35,69,101,0.07),inset_0_1px_0_rgba(255,255,255,1)]

            backdrop-blur-[14px]

            sm:p-5
          "
        >
          <p
            className="
              topology-ref-label

              text-[10px]
              font-[800]
              uppercase
              tracking-[0.30em]
              text-[#1685EA]

              sm:text-[11px]
            "
          >
            SOVEREIGN AIR-GAPPED TOPOLOGY
          </p>

          <div
            className="
              mt-4

              grid
              gap-3

              md:grid-cols-2

              lg:grid-cols-3
            "
          >
            {TOPOLOGY_ITEMS.map((item, index) => (
              <motion.article
                key={item.label}
                className="
                    topology-ref-card

                    group
                    relative

                    min-h-[78px]

                    [perspective:1000px]
                  "
                style={{
                  opacity: reducedMotion ? 1 : 0,
                }}
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        y: -3,
                      }
                }
                transition={{
                  duration: 0.24,
                  ease: "easeOut",
                }}
              >
                {/* compact 3D rear plate */}

                <div
                  aria-hidden="true"
                  className="
                      absolute
                      inset-x-[7px]
                      bottom-[-5px]

                      h-[24px]

                      rounded-[14px]

                      border
                      border-white/80
                    "
                  style={{
                    background: item.soft,
                    boxShadow: `0 14px 28px ${item.color}18`,
                  }}
                />

                <div
                  className="
                      relative
                      z-10

                      flex
                      min-h-[78px]
                      items-center

                      overflow-hidden

                      rounded-[13px]

                      border

                      bg-white/90

                      px-4

                      shadow-[0_12px_28px_rgba(38,70,100,0.065),inset_0_1px_0_rgba(255,255,255,1)]

                      backdrop-blur-[12px]
                    "
                  style={{
                    borderColor: item.alert ? "#FFADB6" : "#B9DBF7",
                    background: item.alert
                      ? "linear-gradient(90deg,#FFFFFF,#FFF4F5)"
                      : "rgba(255,255,255,0.90)",
                  }}
                >
                  <span
                    className="
                        w-[30px]
                        shrink-0

                        text-[11px]
                        font-medium
                        text-[#6372AE]
                      "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div
                    className="
                        flex
                        h-[56px]
                        w-[56px]
                        shrink-0
                        items-center
                        justify-center

                        rounded-full

                        border
                        border-white

                        shadow-[0_9px_20px_rgba(39,71,101,0.055),inset_0_1px_0_rgba(255,255,255,1)]
                      "
                    style={{
                      background: item.soft,
                    }}
                  >
                    <TopologyIcon kind={item.kind} color={item.color} />
                  </div>

                  <p
                    className="
                        min-w-0
                        flex-1

                        ps-5

                        text-[13px]
                        font-medium
                        leading-[1.35]
                        text-[#0A1751]

                        sm:text-[14px]
                      "
                  >
                    {item.label}
                  </p>

                  <span
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        inset-x-8
                        top-0

                        h-px

                        bg-white
                      "
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* reference code cards */}

        <div
          className="
            mt-5

            grid
            gap-4

            md:grid-cols-2
          "
        >
          <TopologyCodePanel
            title="Model registry - approved only"
            primary="gateway/approved-v3 · checksum verified"
            secondary="No public model endpoint. Offline package ready."
            icon="shield"
          />

          <TopologyCodePanel
            title="Air-gap update package"
            primary="idochive-2026.09.signed.tar"
            secondary="Signature valid · rollback available"
            success
            icon="check"
          />
        </div>

        {/* footer phrase */}

        <div
          className="
            topology-ref-footer

            mt-8

            flex
            items-center
            justify-center
            gap-5
          "
        >
          <span
            aria-hidden="true"
            className="
              h-px
              w-12

              bg-[#1685EA]
            "
          />

          <p
            className="
              text-center

              text-[9px]
              font-[800]
              uppercase
              tracking-[0.28em]
              text-[#1685EA]

              sm:text-[10px]
            "
          >
            SECURE TODAY. RESILIENT TOMORROW.
          </p>

          <span
            aria-hidden="true"
            className="
              h-px
              w-12

              bg-[#1685EA]
            "
          />
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   KEY CAPABILITIES — REFERENCE-ACCURATE 3D CARDS
============================================================================= */

function CapabilityHeading() {
  return (
    <>
      <span className="text-[#07142D]">Built for security,</span>{" "}
      <span
        className="
          bg-[linear-gradient(90deg,#3668F1_0%,#1685EA_38%,#22A3E0_67%,#13B8AA_100%)]

          bg-clip-text
          text-transparent
        "
      >
        governance and control.
      </span>
    </>
  );
}

function CapabilityIcon({ index, color }: { index: number; color: string }) {
  const stroke = {
    stroke: color,
    strokeWidth: 2.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (index === 0) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-9 w-9"
        aria-hidden="true"
      >
        <circle cx="24" cy="15" r="7" {...stroke} />

        <path d="M11 39v-4c0-8 5.6-13 13-13s13 5 13 13v4H11Z" {...stroke} />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-9 w-9"
        aria-hidden="true"
      >
        <circle cx="31" cy="15" r="8" {...stroke} />

        <path d="m25.5 20.5-15 15V41h6l3-3h4v-4h4l5.5-5.5" {...stroke} />

        <circle cx="33" cy="13" r="1.5" fill={color} />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-9 w-9"
        aria-hidden="true"
      >
        <path d="M14 6h16l7 7v29H14V6Z" {...stroke} />

        <path d="M30 6v8h7" {...stroke} />

        <path d="M20 22h11M20 28h11M20 34h8" {...stroke} />
      </svg>
    );
  }

  if (index === 3) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-9 w-9"
        aria-hidden="true"
      >
        <ellipse cx="24" cy="12" rx="13" ry="6" {...stroke} />

        <path d="M11 12v11c0 3.3 5.8 6 13 6s13-2.7 13-6V12" {...stroke} />

        <path d="M11 23v11c0 3.3 5.8 6 13 6s13-2.7 13-6V23" {...stroke} />
      </svg>
    );
  }

  if (index === 4) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-9 w-9"
        aria-hidden="true"
      >
        <path d="M10 39V26h6v13M21 39V18h6v21M32 39V10h6v29" {...stroke} />

        <path d="M7 39h34" {...stroke} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9" aria-hidden="true">
      <path
        d="M24 6 37 11v10c0 10-5.2 17-13 21-7.8-4-13-11-13-21V11L24 6Z"
        {...stroke}
      />

      <path d="m20 28 8-10" {...stroke} />

      <circle cx="19" cy="29" r="1.5" fill={color} />
    </svg>
  );
}

function KeyCapabilitiesSection({
  sections,
  rtl,
}: {
  sections: {
    title: string;
    text: string;
  }[];
  rtl: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  const reducedMotion = useReducedMotion() ?? false;

  const themes = [
    {
      color: "#13A879",
      soft: "#E7FBF4",
      border: "#CBEFE2",
      shadow: "rgba(19,168,121,0.12)",
    },
    {
      color: "#1685EA",
      soft: "#EAF4FF",
      border: "#D2E7FA",
      shadow: "rgba(22,133,234,0.12)",
    },
    {
      color: "#F07817",
      soft: "#FFF2E5",
      border: "#F7DEC5",
      shadow: "rgba(240,120,23,0.12)",
    },
    {
      color: "#7137E8",
      soft: "#F1EAFE",
      border: "#E3D7FB",
      shadow: "rgba(113,55,232,0.12)",
    },
    {
      color: "#1685EA",
      soft: "#EAF4FF",
      border: "#D2E7FA",
      shadow: "rgba(22,133,234,0.12)",
    },
    {
      color: "#13A879",
      soft: "#E7FBF4",
      border: "#CBEFE2",
      shadow: "rgba(19,168,121,0.12)",
    },
  ] as const;

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".capability-card");

      const mm = gsap.matchMedia();

      /*
            Desktop/tablet:
            heading first, then every card gets its own scroll segment.
            The cards never rotate during scroll, so all text stays crisp.
          */
      mm.add("(min-width: 768px)", () => {
        gsap.set(
          [
            ".capabilities-eyebrow",
            ".capabilities-title",
            ".capabilities-body",
            ".capabilities-footer",
          ],
          {
            opacity: 0,
          },
        );

        gsap.set(cards, {
          autoAlpha: 0,
        });

        gsap
          .timeline({
            defaults: {
              ease: "power2.out",
            },

            scrollTrigger: {
              trigger: sectionRef.current,

              start: "top 92%",

              end: "top 50%",

              scrub: 1.15,

              invalidateOnRefresh: true,

              fastScrollEnd: true,
            },
          })
          .fromTo(
            ".capabilities-eyebrow",
            {
              y: 10,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.24,
            },
          )
          .fromTo(
            ".capabilities-title",
            {
              y: 20,
              clipPath: "inset(0 0 100% 0)",
            },
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 0.52,
            },
            "-=0.08",
          )
          .fromTo(
            ".capabilities-body",
            {
              y: 10,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.34,
            },
            "-=0.18",
          );

        /*
                Two-column row:
                left card enters first,
                then the right card after a little more scrolling.
                The next physical row naturally follows afterwards.
              */
        cards.forEach((card, index) => {
          const rightColumn = index % 2 === 1;

          gsap.fromTo(
            card,
            {
              autoAlpha: 0,
            },
            {
              autoAlpha: 1,
              ease: "power2.out",

              scrollTrigger: {
                trigger: card,

                start: rightColumn ? "top 76%" : "top 91%",

                end: rightColumn ? "top 56%" : "top 71%",

                scrub: 1.05,

                invalidateOnRefresh: true,

                fastScrollEnd: true,
              },
            },
          );
        });

        gsap.fromTo(
          ".capabilities-footer",
          {
            opacity: 0,
            y: 8,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.42,
            ease: "power2.out",

            scrollTrigger: {
              trigger: ".capabilities-footer",

              start: "top 88%",

              toggleActions: "play none none reverse",

              invalidateOnRefresh: true,
            },
          },
        );
      });

      /*
            Mobile:
            cards are stacked, so each one reveals independently.
          */
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          ".capabilities-title",
          {
            opacity: 0,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.58,
            ease: "power2.out",

            scrollTrigger: {
              trigger: ".capabilities-title",

              start: "top 88%",

              toggleActions: "play none none reverse",
            },
          },
        );

        cards.forEach((card) => {
          gsap.fromTo(
            card,
            {
              autoAlpha: 0,
            },
            {
              autoAlpha: 1,
              ease: "power2.out",

              scrollTrigger: {
                trigger: card,

                start: "top 91%",

                end: "top 68%",

                scrub: 1,

                invalidateOnRefresh: true,

                fastScrollEnd: true,
              },
            },
          );
        });
      });

      gsap.fromTo(
        ".capabilities-bg",
        {
          yPercent: -0.5,
        },
        {
          yPercent: 0.7,
          ease: "none",

          scrollTrigger: {
            trigger: sectionRef.current,

            start: "top bottom",

            end: "bottom top",

            scrub: 3.4,

            invalidateOnRefresh: true,
          },
        },
      );

      return () => {
        mm.revert();
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion, rtl, sections.length]);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        isolate
        overflow-hidden

        bg-[#FCFDFE]

        px-4
        py-16

        sm:px-6
        sm:py-20

        lg:px-8
        lg:pt-[82px]
        lg:pb-[104px]
      "
    >
      {/* reference background */}

      <div
        aria-hidden="true"
        className="
          capabilities-bg

          pointer-events-none
          absolute
          inset-0
          -z-30

          bg-[linear-gradient(180deg,#FEFFFF_0%,#FCFDFE_46%,#F9FCFE_100%)]

          will-change-transform
        "
      >
        <div
          className="
            absolute
            left-[3.5%]
            top-[6%]

            h-[104px]
            w-[104px]

            rounded-full

            bg-[radial-gradient(circle_at_38%_35%,rgba(159,238,218,0.62),rgba(229,250,245,0.56)_55%,rgba(255,255,255,0)_82%)]
          "
        />

        <div
          className="
            absolute
            -right-[10%]
            bottom-[-24%]

            h-[430px]
            w-[430px]

            rotate-[42deg]

            bg-[linear-gradient(145deg,rgba(222,238,252,0.76),rgba(247,251,255,0.10)_70%,rgba(255,255,255,0)_100%)]
          "
        />
      </div>

      {/* top-right blue dots */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[5.5%]
          top-[7%]
          -z-10

          hidden

          grid-cols-5
          gap-[14px]

          lg:grid
        "
      >
        {Array.from({
          length: 20,
        }).map((_, index) => (
          <span
            key={index}
            className="
                h-[3px]
                w-[3px]

                rounded-full

                bg-[#1685EA]
              "
          />
        ))}
      </div>

      {/* bottom-left dotted accent */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[7%]
          left-[6.5%]
          -z-10

          hidden

          grid-cols-5
          gap-[10px]

          opacity-80

          lg:grid
        "
      >
        {Array.from({
          length: 20,
        }).map((_, index) => (
          <span
            key={index}
            className="
                h-[2.5px]
                w-[2.5px]

                rounded-full

                bg-[#1685EA]
              "
          />
        ))}
      </div>

      <div
        className="
          mx-auto
          w-full
          max-w-[1510px]
        "
      >
        {/* centered reference heading */}

        <div
          className="
            mx-auto
            max-w-[1100px]

            text-center
          "
        >
          <div
            className="
              capabilities-eyebrow

              flex
              items-center
              justify-center
              gap-4
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-12

                bg-[#1685EA]
              "
            />

            <p
              className="
                text-[10px]
                font-[800]
                uppercase
                tracking-[0.30em]
                text-[#1685EA]

                sm:text-[11px]
              "
            >
              KEY CAPABILITIES
            </p>

            <span
              aria-hidden="true"
              className="
                h-px
                w-12

                bg-[#1685EA]
              "
            />
          </div>

          <h2
            className="
              capabilities-title

              mt-5

              text-[34px]
              font-[820]
              leading-[1.02]
              tracking-[-0.052em]

              sm:text-[44px]

              lg:text-[52px]
            "
          >
            <CapabilityHeading />
          </h2>

          <p
            className="
              capabilities-body

              mx-auto
              mt-4
              max-w-[900px]

              text-[14px]
              font-medium
              leading-[1.55]
              text-[#6877A7]

              sm:text-[16px]
            "
          >
            Everything you need to deploy and manage document intelligence in
            your environment.
          </p>
        </div>

        {/* exact 2-column / 3-row card layout */}

        <div
          className="
            mx-auto
            mt-9

            grid
            max-w-[1460px]
            gap-4

            md:grid-cols-2

            lg:gap-5
          "
        >
          {sections.map((item, index) => {
            const theme = themes[index % themes.length];

            return (
              <motion.article
                key={item.title}
                className="
                    capability-card

                    group
                    relative

                    min-h-[138px]
                  "
                style={{
                  opacity: reducedMotion ? 1 : 0,
                }}
              >
                {/* deep shadow */}

                <div
                  aria-hidden="true"
                  className="
                      absolute
                      inset-x-[18px]
                      bottom-[-11px]

                      h-[34px]

                      rounded-[22px]

                      opacity-55

                      blur-[11px]
                    "
                  style={{
                    background: theme.shadow,
                  }}
                />

                {/* 3D rear glass plate */}

                <div
                  aria-hidden="true"
                  className="
                      absolute
                      inset-x-[8px]
                      bottom-[-6px]

                      h-[30px]

                      rounded-[20px]

                      border
                      border-white/85

                      opacity-90
                    "
                  style={{
                    background: theme.soft,
                    boxShadow: `0 16px 34px ${theme.shadow}`,
                  }}
                />

                {/* front glass card */}

                <div
                  className="
                      relative
                      z-10

                      flex
                      min-h-[138px]
                      items-center

                      overflow-hidden

                      rounded-[19px]

                      border

                      bg-white/90

                      px-5
                      py-4

                      shadow-[0_18px_44px_rgba(37,68,98,0.085),0_5px_16px_rgba(37,68,98,0.04),inset_0_1px_0_rgba(255,255,255,1)]

                      backdrop-blur-[16px]

                      sm:px-6
                    "
                  style={{
                    borderColor: theme.border,
                  }}
                >
                  {/* icon medallion */}

                  <div
                    className="
                        flex
                        h-[92px]
                        w-[92px]
                        shrink-0
                        items-center
                        justify-center

                        rounded-full

                        border
                        border-white

                        shadow-[0_13px_28px_rgba(37,68,98,0.07),inset_0_1px_0_rgba(255,255,255,1)]
                      "
                    style={{
                      background: theme.soft,
                    }}
                  >
                    <CapabilityIcon index={index} color={theme.color} />
                  </div>

                  {/* divider */}

                  <span
                    aria-hidden="true"
                    className="
                        mx-5

                        h-[92px]
                        w-px
                        shrink-0

                        bg-[#DDE7F2]

                        sm:mx-6
                      "
                  />

                  {/* existing translated content */}

                  <div
                    className="
                        min-w-0
                        flex-1
                      "
                  >
                    <h3
                      className="
                          text-[16px]
                          font-[800]
                          leading-[1.2]
                          tracking-[-0.025em]
                          text-[#07142D]

                          sm:text-[18px]
                        "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                          mt-2

                          max-w-[58ch]

                          text-[12px]
                          font-medium
                          leading-[1.48]
                          text-[#6576A4]

                          sm:text-[13.5px]
                        "
                    >
                      {item.text}
                    </p>
                  </div>

                  {/* white top specular highlight */}

                  <span
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        inset-x-8
                        top-0

                        h-px

                        bg-white
                      "
                  />
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* reference bottom line */}

        <div
          className="
            capabilities-footer

            mt-8

            flex
            items-center
            justify-center
            gap-4
          "
        >
          <span
            aria-hidden="true"
            className="
              h-10
              w-[2px]

              bg-[#1685EA]
            "
          />

          <p
            className="
              text-[13px]
              font-medium
              text-[#4967CC]

              sm:text-[14px]
            "
          >
            Control today. Resilience tomorrow.
          </p>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   SHARED RESPONSIBILITY — REFERENCE-ACCURATE
============================================================================= */

function SharedResponsibilityIcon({
  index,
  color,
}: {
  index: number;
  color: string;
}) {
  const stroke = {
    stroke: color,
    strokeWidth: 2.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (index === 0) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path d="m24 8 12 7-12 7-12-7 12-7Z" {...stroke} />

        <path d="M12 15v15l12 7V22L12 15ZM36 15v15l-12 7" {...stroke} />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <circle cx="24" cy="15" r="6" {...stroke} />

        <path d="M13 37v-3c0-7 4.7-11 11-11s11 4 11 11v3" {...stroke} />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <circle cx="19" cy="16" r="5" {...stroke} />

        <circle cx="31" cy="18" r="4" {...stroke} />

        <path d="M9 37v-3c0-6.2 4.1-10 10-10s10 3.8 10 10v3" {...stroke} />

        <path d="M29 27c5.2.3 8 3.8 8 9" {...stroke} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8" aria-hidden="true">
      <path
        d="M24 8 28 10l4-2 3 4 5 1v5l3 3-3 4v5l-5 1-3 4-4-2-4 2-4-2-4 2-3-4-5-1v-5l-3-4 3-3v-5l5-1 3-4 4 2 4-2Z"
        {...stroke}
      />

      <circle cx="24" cy="21" r="5" {...stroke} />
    </svg>
  );
}

function SharedResponsibilitySection({
  rows,
  rtl,
}: {
  rows: {
    party: string;
    owns: string;
  }[];
  rtl: boolean;
}) {
  const { t } = useTranslation("deployment");

  const sectionRef = useRef<HTMLElement>(null);

  const reducedMotion = useReducedMotion() ?? false;

  const themes = [
    {
      color: "#1685EA",
      soft: "#EAF4FF",
      border: "#D4E7FA",
      shadow: "rgba(22,133,234,0.10)",
    },
    {
      color: "#13A879",
      soft: "#E8FBF4",
      border: "#D3EFE4",
      shadow: "rgba(19,168,121,0.10)",
    },
    {
      color: "#E5232A",
      soft: "#FFEDEF",
      border: "#F8D9DC",
      shadow: "rgba(229,35,42,0.09)",
    },
    {
      color: "#F2B518",
      soft: "#FFF6D8",
      border: "#F4E7B8",
      shadow: "rgba(242,181,24,0.10)",
    },
  ] as const;

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".shared-row");

      gsap.set(
        [
          ".shared-color-bars",
          ".shared-title",
          ".shared-body",
          ".shared-shell",
        ],
        {
          opacity: 0,
        },
      );

      gsap.set(rows, {
        autoAlpha: 0,
        y: 22,
      });

      gsap
        .timeline({
          defaults: {
            ease: "power2.out",
          },

          scrollTrigger: {
            trigger: sectionRef.current,

            start: "top 92%",

            end: "top 50%",

            scrub: 1.15,

            invalidateOnRefresh: true,

            fastScrollEnd: true,
          },
        })
        .fromTo(
          ".shared-color-bars",
          {
            y: 8,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.22,
          },
        )
        .fromTo(
          ".shared-title",
          {
            y: 20,
            clipPath: "inset(0 0 100% 0)",
          },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.54,
          },
          "-=0.06",
        )
        .fromTo(
          ".shared-body",
          {
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.34,
          },
          "-=0.18",
        )
        .fromTo(
          ".shared-shell",
          {
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.42,
          },
          "-=0.08",
        );

      /*
            Each row has its own ScrollTrigger so every responsibility row
            appears completely and in sequence. No pinning, no half-visible
            last row, and no 3D text rotation while scrolling.
          */
      rows.forEach((row, index) => {
        gsap.fromTo(
          row,
          {
            autoAlpha: 0,
            y: 22,
          },
          {
            autoAlpha: 1,
            y: 0,
            ease: "power2.out",

            scrollTrigger: {
              trigger: row,

              start: index === 0 ? "top 89%" : "top 84%",

              end: index === 0 ? "top 68%" : "top 63%",

              scrub: 1.05,

              invalidateOnRefresh: true,

              fastScrollEnd: true,
            },
          },
        );
      });

      gsap.fromTo(
        ".shared-bg",
        {
          yPercent: -0.45,
        },
        {
          yPercent: 0.65,
          ease: "none",

          scrollTrigger: {
            trigger: sectionRef.current,

            start: "top bottom",

            end: "bottom top",

            scrub: 3.4,

            invalidateOnRefresh: true,
          },
        },
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion, rtl, rows.length]);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        isolate
        overflow-hidden

        bg-[#FCFDFE]

        px-4
        py-16

        sm:px-6
        sm:py-20

        lg:px-8
        lg:pt-[86px]
        lg:pb-[116px]
      "
    >
      {/* Reference background atmosphere */}

      <div
        aria-hidden="true"
        className="
          shared-bg

          pointer-events-none
          absolute
          inset-0
          -z-30

          bg-[linear-gradient(180deg,#FEFFFF_0%,#FCFDFE_44%,#F9FCFE_100%)]

          will-change-transform
        "
      >
        <div
          className="
            absolute
            -right-[7%]
            -top-[20%]

            h-[420px]
            w-[420px]

            rounded-full

            bg-[radial-gradient(circle_at_38%_38%,rgba(220,236,250,0.84),rgba(241,248,253,0.58)_58%,rgba(255,255,255,0)_82%)]
          "
        />

        <div
          className="
            absolute
            -left-[13%]
            bottom-[-31%]

            h-[490px]
            w-[490px]

            rotate-[43deg]

            bg-[linear-gradient(145deg,rgba(220,237,252,0.78),rgba(247,251,255,0.10)_70%,rgba(255,255,255,0)_100%)]
          "
        />
      </div>

      {/* top-right dots */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[7.5%]
          top-[9%]
          -z-10

          hidden

          grid-cols-3
          gap-[15px]

          opacity-55

          lg:grid
        "
      >
        {Array.from({
          length: 9,
        }).map((_, index) => (
          <span
            key={index}
            className="
                h-[6px]
                w-[6px]

                rounded-full

                bg-[#A9CEF5]
              "
          />
        ))}
      </div>

      {/* bottom-left dots */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[7%]
          left-[3.5%]
          -z-10

          hidden

          grid-cols-3
          gap-[12px]

          opacity-55

          lg:grid
        "
      >
        {Array.from({
          length: 9,
        }).map((_, index) => (
          <span
            key={index}
            className="
                h-[6px]
                w-[6px]

                rounded-full

                bg-[#A9CEF5]
              "
          />
        ))}
      </div>

      <div
        className="
          mx-auto
          w-full
          max-w-[1510px]
        "
      >
        {/* top reference copy */}

        <div
          className="
            max-w-full
            text-center
          "
        >
          <div
            className="
              shared-color-bars

              flex
              items-center
              justify-center
              gap-1
            "
            aria-hidden="true"
          >
            {["#1685EA", "#22A3E0", "#2AA845", "#E5232A", "#F2B518"].map(
              (color) => (
                <span
                  key={color}
                  className="
                    h-[5px]
                    w-[30px]

                    rounded-full
                  "
                  style={{
                    background: color,
                  }}
                />
              ),
            )}
          </div>

          <h2
            className="
              shared-title

              mt-8

              text-[39px]
              font-[820]
              leading-[1.02]
              tracking-[-0.045em]
              text-[#07142D]

              sm:text-[51px]

              lg:text-[62px]
            "
          >
            {t("shared.headline")}
          </h2>

          <p
            className="
              shared-body

              mt-6
              max-w-[1000px]
              mx-auto

              text-[15px]
              font-medium
              leading-[1.6]
              text-[#64728C]

              sm:text-[16px]
            "
          >
            {t("shared.body")}
          </p>
        </div>

        {/* Reference 4-row responsibility shell */}

        <div
          className="
            shared-shell

            relative

            mx-auto
            mt-10
            max-w-[1240px]

            [perspective:1400px]

            sm:mt-12
          "
        >
          {/* deep 3D shadow */}

          <div
            aria-hidden="true"
            className="
              absolute
              inset-x-[24px]
              bottom-[-18px]

              h-[70px]

              rounded-[28px]

              bg-[#6D94B5]/10

              blur-[18px]
            "
          />

          {/* rear glass plate */}

          <div
            aria-hidden="true"
            className="
              absolute
              inset-x-[10px]
              bottom-[-8px]

              h-[52px]

              rounded-[24px]

              border
              border-white/85

              bg-[#EEF6FC]/82

              shadow-[0_20px_42px_rgba(41,74,104,0.07)]
            "
            style={{
              transform: "translateZ(-18px)",
            }}
          />

          {/* front shell */}

          <div
            className="
              relative
              z-10

              divide-y
              divide-[#DDE7F2]

              overflow-hidden

              rounded-[20px]

              border
              border-[#D7E4F0]

              bg-white/88

              shadow-[0_26px_62px_rgba(36,68,98,0.10),0_7px_22px_rgba(36,68,98,0.045),inset_0_1px_0_rgba(255,255,255,1)]

              backdrop-blur-[18px]
            "
          >
            {rows.map((row, index) => {
              const theme = themes[index % themes.length];

              return (
                <motion.article
                  key={row.party}
                  className="
                      shared-row

                      group
                      relative

                      grid
                      min-h-[118px]
                      items-center

                      gap-4

                      px-5
                      py-5

                      sm:px-7

                      md:grid-cols-[78px_minmax(190px,250px)_1px_minmax(0,1fr)]
                      md:gap-6

                      lg:min-h-[126px]
                      lg:px-8
                    "
                  style={{
                    opacity: reducedMotion ? 1 : 0,
                  }}
                  whileHover={
                    reducedMotion
                      ? undefined
                      : {
                          y: -2,
                        }
                  }
                  transition={{
                    duration: 0.22,
                    ease: "easeOut",
                  }}
                >
                  {/* subtle row brand wash */}

                  <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        -start-[3%]
                        top-1/2

                        h-[82%]
                        w-[24%]
                        -translate-y-1/2

                        rounded-full

                        blur-[28px]
                      "
                    style={{
                      background: theme.soft,
                      opacity: 0.42,
                    }}
                  />

                  {/* icon */}

                  <div
                    className="
                        relative
                        z-10

                        flex
                        h-[64px]
                        w-[64px]
                        items-center
                        justify-center

                        rounded-[16px]

                        border
                        border-white

                        shadow-[0_10px_24px_rgba(40,72,100,0.06),inset_0_1px_0_rgba(255,255,255,1)]
                      "
                    style={{
                      background: theme.soft,
                    }}
                  >
                    <SharedResponsibilityIcon
                      index={index}
                      color={theme.color}
                    />
                  </div>

                  {/* party */}

                  <h3
                    className="
                        relative
                        z-10

                        text-[16px]
                        font-[800]
                        leading-[1.2]
                        tracking-[-0.024em]
                        text-[#07142D]

                        sm:text-[18px]
                      "
                  >
                    {row.party}
                  </h3>

                  {/* divider */}

                  <span
                    aria-hidden="true"
                    className="
                        relative
                        z-10

                        hidden
                        h-[72px]
                        w-px

                        bg-[#DDE7F2]

                        md:block
                      "
                  />

                  {/* ownership */}

                  <p
                    className="
                        relative
                        z-10

                        text-[13px]
                        font-medium
                        leading-[1.5]
                        text-[#61728E]

                        sm:text-[14.5px]
                      "
                  >
                    {row.owns}
                  </p>

                  {/* row top specular highlight */}

                  <span
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        inset-x-8
                        top-0

                        h-px

                        bg-white/80
                      "
                  />
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   HOMEPAGE FINAL CTA DEPENDENCIES
============================================================================= */

function ArrowIcon({ rtl = false }: { rtl?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`h-4 w-4 ${rtl ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path d="M8.5 6.5 18 12l-9.5 5.5v-11Z" fill="currentColor" />
    </svg>
  );
}

function ExactHiveLogo() {
  const rawId = useId();

  const cleanId = rawId.replace(/:/g, "");

  const filterId = `logo-filter-${cleanId}`;

  const maskId = `logo-mask-${cleanId}`;

  return (
    <svg
      viewBox="118 24 316 350"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full overflow-visible"
    >
      <defs>
        <filter
          id={filterId}
          x="0"
          y="0"
          width="566"
          height="512"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feColorMatrix
            type="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              .2126 .7152 .0722 0 0
            "
          />

          <feComponentTransfer>
            <feFuncA type="linear" slope="24" intercept="0" />
          </feComponentTransfer>
        </filter>

        <mask
          id={maskId}
          x="0"
          y="0"
          width="566"
          height="512"
          maskUnits="userSpaceOnUse"
        >
          <image
            href={LOGO_SRC}
            x="0"
            y="0"
            width="566"
            height="512"
            filter={`url(#${filterId})`}
          />
        </mask>
      </defs>

      <image
        href={LOGO_SRC}
        x="0"
        y="0"
        width="566"
        height="512"
        preserveAspectRatio="none"
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}

/* =============================================================================
   FINAL CTA — EXACT HOMEPAGE VERSION
============================================================================= */

function FinalCtaHeadline({ text }: { text: string }) {
  const phrase = "trusted intelligence";

  const lower = text.toLowerCase();

  const index = lower.indexOf(phrase);

  if (index === -1) {
    return <>{text}</>;
  }

  return (
    <>
      {text.slice(0, index)}

      <span className="text-[#1685EA]">
        {text.slice(index, index + phrase.length)}
      </span>

      {text.slice(index + phrase.length)}
    </>
  );
}

function FinalCtaFeatureIcon({ index }: { index: number }) {
  const themes = [
    {
      color: "#1685EA",
      soft: "#EAF4FF",
    },
    {
      color: "#2AA845",
      soft: "#EAFBF1",
    },
    {
      color: "#7A35F2",
      soft: "#F2EAFE",
    },
  ];

  const theme = themes[index % themes.length];

  const stroke = {
    stroke: theme.color,
    strokeWidth: 2.3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <span
      className="
        flex
        h-[68px]
        w-[68px]
        shrink-0
        items-center
        justify-center

        rounded-full

        border
        border-white/95

        shadow-[0_12px_34px_rgba(45,75,101,0.09),inset_0_1px_0_rgba(255,255,255,1)]
      "
      style={{
        background: `linear-gradient(145deg,rgba(255,255,255,.96),${theme.soft})`,
      }}
    >
      {index === 0 && (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-10 w-10"
          aria-hidden="true"
        >
          <path
            d="M24 5 39 11v11c0 9-5.5 16-15 21-9.5-5-15-12-15-21V11L24 5Z"
            {...stroke}
          />
        </svg>
      )}

      {index === 1 && (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-10 w-10"
          aria-hidden="true"
        >
          <circle cx="24" cy="24" r="7" {...stroke} />

          <path
            d="M24 6v5M24 37v5M6 24h5M37 24h5M11.3 11.3l3.5 3.5M33.2 33.2l3.5 3.5M36.7 11.3l-3.5 3.5M14.8 33.2l-3.5 3.5"
            {...stroke}
          />

          <circle cx="24" cy="24" r="15" {...stroke} />
        </svg>
      )}

      {index === 2 && (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-10 w-10"
          aria-hidden="true"
        >
          <circle cx="19" cy="17" r="6" {...stroke} />

          <circle cx="31" cy="18" r="5" {...stroke} />

          <path d="M8 40v-4c0-7.5 4.8-12 11-12s11 4.5 11 12v4" {...stroke} />

          <path d="M28 27c6 .5 11 4.5 11 11v2" {...stroke} />
        </svg>
      )}
    </span>
  );
}

function FinalCtaCalloutIcon({ index }: { index: number }) {
  const color = index === 0 ? "#1685EA" : index === 1 ? "#1685EA" : "#2AA845";

  if (index === 0) {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <rect x="8" y="14" width="16" height="13" rx="3" fill={color} />

        <path
          d="M11 14v-3a5 5 0 0 1 10 0v3"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <circle cx="16" cy="20" r="1.5" fill="#FFFFFF" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path
          d="M5 25h22M7 24V15h5v9M14 24V8h5v16M21 24V12h5v12"
          stroke={color}
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden="true">
      <path
        d="M9 24h14a5 5 0 0 0 .8-9.9A8 8 0 0 0 8.7 13 5.5 5.5 0 0 0 9 24Z"
        stroke={color}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FinalCtaDocumentVisual({
  trust,
  reducedMotion,
  rtl,
}: {
  trust: string[];
  reducedMotion: boolean;
  rtl: boolean;
}) {
  const rawId = useId();

  const clean = rawId.replace(/:/g, "");

  const orbitId = `final-cta-orbit-${clean}`;

  const callouts = trust.slice(0, 3).filter(Boolean);

  return (
    <div
      className="
        final-cta-visual

        relative
        mx-auto
        h-[390px]
        w-full
        max-w-[470px]

        [perspective:1300px]

        sm:h-[430px]

        lg:h-[455px]
        lg:max-w-[500px]
      "
    >
      <div
        aria-hidden="true"
        className="
          absolute
          left-1/2
          top-1/2

          h-[350px]
          w-[350px]
          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-[radial-gradient(circle_at_50%_50%,rgba(34,163,224,0.18),rgba(205,235,255,0.18)_48%,rgba(255,255,255,0)_73%)]

          sm:h-[405px]
          sm:w-[405px]
        "
      />

      <svg
        viewBox="0 0 500 500"
        className="
          pointer-events-none
          absolute
          inset-0
          h-full
          w-full
          overflow-visible
        "
        aria-hidden="true"
      >
        <path
          id={orbitId}
          d="
            M106 321
            C61 230 96 128 189 80
            C284 31 402 77 438 176
            C469 262 427 357 346 399
            C251 449 145 410 106 321Z
          "
          fill="none"
          stroke="#1685EA"
          strokeWidth="1.5"
          strokeDasharray="5 7"
          opacity="0.82"
        />

        {!reducedMotion && (
          <>
            <circle r="7" fill="#1685EA" opacity="0.13">
              <animateMotion dur="13.5s" repeatCount="indefinite">
                <mpath href={`#${orbitId}`} />
              </animateMotion>
            </circle>

            <circle r="3" fill="#1685EA">
              <animateMotion dur="13.5s" repeatCount="indefinite">
                <mpath href={`#${orbitId}`} />
              </animateMotion>
            </circle>
          </>
        )}
      </svg>

      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -6, 0],
              }
        }
        transition={{
          duration: 9.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          final-cta-document

          absolute
          left-1/2
          top-[62px]
          z-10

          w-[68%]
          max-w-[330px]
          -translate-x-1/2

          transform-gpu

          sm:top-[70px]
        "
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <div
          aria-hidden="true"
          className="
            absolute
            inset-x-[7%]
            bottom-[-34px]
            h-[70px]

            rounded-[50%]

            bg-[#5F9FD0]/18

            blur-[22px]
          "
        />

        <div
          aria-hidden="true"
          className="
            absolute
            inset-x-[4%]
            bottom-[-14px]
            h-[34px]

            rounded-[18px]

            border
            border-white/85

            bg-[linear-gradient(180deg,rgba(236,247,255,.86),rgba(188,218,241,.68))]

            shadow-[0_20px_35px_rgba(44,84,114,0.13)]
          "
          style={{
            transform: "translateZ(-18px)",
          }}
        />

        <div
          className="
            relative

            min-h-[315px]

            overflow-hidden

            rounded-[20px]

            border
            border-white/95

            bg-[linear-gradient(145deg,rgba(255,255,255,.96),rgba(237,248,255,.86))]

            px-6
            py-6

            shadow-[0_34px_88px_rgba(33,75,106,0.17),0_8px_28px_rgba(53,102,140,0.08),inset_0_1px_0_rgba(255,255,255,1)]

            backdrop-blur-[24px]

            sm:min-h-[340px]
          "
          style={{
            transform: rtl
              ? "rotateY(5deg) rotateX(1.5deg)"
              : "rotateY(-5deg) rotateX(1.5deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-5
              top-0
              h-px

              bg-gradient-to-r
              from-transparent
              via-white
              to-transparent
            "
          />

          <div
            className="
              relative
              z-10

              flex
              items-center
            "
            style={{
              transform: "translateZ(18px)",
            }}
          >
            <div className="h-[48px] w-[54px] shrink-0">
              <ExactHiveLogo />
            </div>
          </div>

          <div
            className="
              relative
              z-10
              mt-7
              space-y-3
            "
            style={{
              transform: "translateZ(15px)",
            }}
          >
            <span className="block h-3 w-[72%] rounded-full bg-[#DCEAF8]" />
            <span className="block h-3 w-[84%] rounded-full bg-[#E3EEF9]" />
            <span className="block h-3 w-[79%] rounded-full bg-[#DFEBF7]" />
            <span className="block h-3 w-[86%] rounded-full bg-[#E5EFF8]" />
            <span className="block h-3 w-[65%] rounded-full bg-[#DDEAF7]" />

            <span
              className="
                mt-5
                block
                h-[22px]
                w-[51%]

                rounded-[7px]

                bg-[linear-gradient(90deg,#1685EA,#22A3E0)]

                shadow-[0_8px_20px_rgba(22,133,234,0.20)]
              "
            />

            <span className="block h-3 w-[84%] rounded-full bg-[#E0ECF8]" />
            <span className="block h-3 w-[76%] rounded-full bg-[#E7F0F9]" />
            <span className="block h-3 w-[49%] rounded-full bg-[#DDEAF7]" />
            <span className="block h-3 w-[42%] rounded-full bg-[#E5EFF8]" />
          </div>
        </div>
      </motion.div>

      {callouts.map((item, index) => {
        const positions = [
          "right-0 top-[16px] sm:right-[-4px]",
          "left-0 top-[200px] sm:left-[-8px]",
          "right-[-2px] bottom-[24px] sm:right-[-10px]",
        ];

        return (
          <motion.div
            key={`${item}-${index}`}
            animate={
              reducedMotion
                ? undefined
                : {
                    y: [0, index === 1 ? 5 : -5, 0],
                  }
            }
            transition={{
              duration: 8.3 + index * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`
                final-cta-callout

                absolute
                z-30

                flex
                max-w-[180px]
                items-center
                gap-3

                rounded-[16px]

                border
                border-white/95

                bg-white/82

                px-3.5
                py-3

                shadow-[0_18px_48px_rgba(34,76,108,0.12),inset_0_1px_0_rgba(255,255,255,1)]

                backdrop-blur-[20px]

                ${positions[index]}
              `}
          >
            <span
              className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center

                  rounded-full

                  bg-[#F2F8FE]
                "
            >
              <FinalCtaCalloutIcon index={index} />
            </span>

            <span
              className="
                  text-[10.5px]
                  font-bold
                  leading-[1.3]
                  text-[#1A3154]

                  sm:text-[11px]
                "
            >
              {item}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

function FinalCtaSection({ trust }: { trust: string[] }) {
  const { t, i18n } = useTranslation("home");

  const { t: tc } = useTranslation("common");

  const sectionRef = useRef<HTMLElement>(null);

  const backgroundRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion() ?? false;

  const rtl = i18n.dir() === "rtl";

  const centerTrust = trust.slice(0, 3).filter(Boolean);

  const lowerTrust = trust.slice(3, 6).filter(Boolean);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const callouts = gsap.utils.toArray<HTMLElement>(".final-cta-callout");

      /*
            Scroll-driven reveal:
            - short travel distances avoid jank
            - force3D keeps transforms on the compositor
            - the sequence finishes before the section is mostly past
            - floating Framer animations continue after reveal
          */
      gsap.set(callouts, {
        opacity: 0,
        filter: "blur(5px)",
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: "power1.inOut",
        },

        scrollTrigger: {
          trigger: sectionRef.current,

          start: "top 91%",

          end: "66% 34%",

          scrub: 1.65,

          invalidateOnRefresh: true,

          fastScrollEnd: true,
        },
      });

      timeline
        .fromTo(
          ".final-cta-top-line",
          {
            opacity: 0,
            scaleX: 0.12,
            transformOrigin: rtl ? "100% 50%" : "0% 50%",
          },
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.64,
            ease: "power1.out",
          },
        )

        .fromTo(
          ".final-cta-copy",
          {
            opacity: 0,
            y: 22,
            x: rtl ? 14 : -14,
            scale: 0.997,
            force3D: true,
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: 0.88,
            ease: "power1.inOut",
            force3D: true,
          },
          "-=0.26",
        )

        .fromTo(
          ".final-cta-actions",
          {
            opacity: 0,
            y: 12,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.58,
            ease: "power1.out",
          },
          "-=0.36",
        )

        .fromTo(
          ".final-cta-feature",
          {
            opacity: 0,
            y: 16,
            scale: 0.996,
            force3D: true,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.68,
            ease: "power1.inOut",
            force3D: true,
          },
          "-=0.3",
        )

        .fromTo(
          ".final-cta-visual",
          {
            opacity: 0,
            x: rtl ? -24 : 24,
            y: 12,
            scale: 0.992,
            force3D: true,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power1.inOut",
            force3D: true,
          },
          "-=0.48",
        )

        .fromTo(
          ".final-cta-document",
          {
            opacity: 0.4,
            filter: "blur(3px)",
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.52,
            ease: "power1.out",
          },
          "-=0.64",
        )

        .to(
          callouts,
          {
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.1,
            duration: 0.5,
            ease: "power1.out",
          },
          "-=0.34",
        )

        .fromTo(
          ".final-cta-trust",
          {
            opacity: 0,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.065,
            duration: 0.52,
            ease: "power1.out",
          },
          "-=0.3",
        );

      if (backgroundRef.current) {
        gsap.fromTo(
          backgroundRef.current,
          {
            yPercent: -0.45,
          },
          {
            yPercent: 0.75,

            ease: "none",

            scrollTrigger: {
              trigger: sectionRef.current,

              start: "top bottom",

              end: "bottom top",

              scrub: 2.8,

              invalidateOnRefresh: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion, rtl]);

  return (
    <section
      ref={sectionRef}
      dir={rtl ? "rtl" : "ltr"}
      className="
        relative
        isolate
        overflow-hidden

        bg-[#FEFFFF]

        px-4
        py-20

        sm:px-6
        sm:py-24

        lg:px-8
        lg:py-28

        xl:py-[118px]
      "
    >
      <div
        ref={backgroundRef}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-20

          will-change-transform
        "
      >
        <div
          className="
            absolute
            -left-[270px]
            top-[70px]

            h-[520px]
            w-[520px]

            rounded-full

            bg-[radial-gradient(circle_at_67%_48%,rgba(209,233,251,0.61),rgba(240,249,255,0.38)_52%,rgba(255,255,255,0)_75%)]
          "
        />

        <div
          className="
            absolute
            -right-[230px]
            top-[90px]

            h-[565px]
            w-[565px]

            rounded-full

            bg-[radial-gradient(circle_at_34%_48%,rgba(204,231,251,0.64),rgba(239,248,255,0.38)_52%,rgba(255,255,255,0)_76%)]
          "
        />

        <motion.div
          className="
            absolute
            -left-[95px]
            top-[150px]

            hidden
            h-[310px]
            w-[240px]

            bg-[linear-gradient(145deg,rgba(219,238,251,0.55),rgba(255,255,255,0.08))]

            [clip-path:polygon(0_0,100%_30%,100%_83%,16%_100%,0_72%)]

            lg:block
          "
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, -7, 0],
                }
          }
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-[1500px]
        "
      >
        <div
          className="
            final-cta-top-line

            h-[2px]
            w-full

            bg-[linear-gradient(90deg,transparent_0%,#1685EA_8%,#22A3E0_52%,#1685EA_92%,transparent_100%)]

            opacity-80
          "
        />

        <div
          className="
            mt-16

            grid
            items-center
            gap-10

            sm:mt-20

            lg:grid-cols-[minmax(0,1.05fr)_minmax(260px,0.55fr)_minmax(360px,0.88fr)]
            lg:gap-8

            xl:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.58fr)_minmax(400px,0.9fr)]
            xl:gap-10
          "
        >
          {/* left copy */}

          <div className="final-cta-copy min-w-0">
            <h2
              className="
                max-w-[690px]

                text-[36px]
                font-[790]
                leading-[1.045]
                tracking-[-0.052em]
                text-[#07142D]

                sm:text-[46px]

                md:text-[52px]

                lg:text-[50px]

                xl:text-[58px]
              "
            >
              <FinalCtaHeadline text={t("final.headline")} />
            </h2>

            <p
              className="
                mt-6
                max-w-[690px]

                text-[14px]
                font-medium
                leading-[1.58]
                text-[#5D7094]

                sm:text-[16px]

                lg:text-[17px]
              "
            >
              {t("final.body")}
            </p>

            <div
              className="
                final-cta-actions

                mt-8

                flex
                flex-col
                gap-3

                sm:flex-row
                sm:flex-wrap
              "
            >
              <LocaleLink
                to="/book"
                className="
                  group

                  inline-flex
                  min-h-[54px]
                  items-center
                  justify-center
                  gap-3

                  rounded-[13px]

                  bg-[linear-gradient(90deg,#1685EA,#22A3E0)]

                  px-6

                  text-[13px]
                  font-bold
                  text-white

                  shadow-[0_16px_38px_rgba(22,133,234,0.23),inset_0_1px_0_rgba(255,255,255,0.22)]

                  transition
                  duration-300

                  hover:-translate-y-1
                  hover:shadow-[0_20px_44px_rgba(22,133,234,0.28)]

                  sm:min-w-[245px]
                "
              >
                {tc("cta.book")}

                <span
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  <ArrowIcon rtl={rtl} />
                </span>
              </LocaleLink>

              <LocaleLink
                to="/how-it-works"
                className="
                  group

                  inline-flex
                  min-h-[54px]
                  items-center
                  justify-center
                  gap-3

                  rounded-[13px]

                  border
                  border-[#9BB4DA]

                  bg-white/76

                  px-6

                  text-[13px]
                  font-bold
                  text-[#10264B]

                  shadow-[0_12px_30px_rgba(45,74,100,0.07),inset_0_1px_0_rgba(255,255,255,1)]

                  backdrop-blur-[18px]

                  transition
                  duration-300

                  hover:-translate-y-1
                  hover:border-[#7FA7E2]
                  hover:shadow-[0_16px_36px_rgba(45,74,100,0.10)]

                  sm:min-w-[190px]
                "
              >
                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center

                    rounded-full

                    bg-[#EAF4FF]
                    text-[#1685EA]
                  "
                >
                  <PlayIcon />
                </span>

                {tc("cta.how")}
              </LocaleLink>
            </div>

            {lowerTrust.length > 0 && (
              <div
                className="
                  mt-8

                  grid
                  gap-3

                  sm:grid-cols-3
                "
              >
                {lowerTrust.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="
                        final-cta-trust

                        flex
                        min-w-0
                        items-center
                        gap-2.5
                      "
                  >
                    <span
                      className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center

                          rounded-full

                          bg-[#EAF4FF]

                          text-[#1685EA]
                        "
                    >
                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        className="h-4 w-4"
                        aria-hidden="true"
                      >
                        <path
                          d="m4 10 4 4 8-9"
                          stroke="currentColor"
                          strokeWidth="2.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>

                    <span
                      className="
                          text-[10.5px]
                          font-semibold
                          leading-[1.3]
                          text-[#607594]

                          sm:text-[11px]
                        "
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* middle feature column */}

          <div
            className="
              relative
              min-w-0

              border-t
              border-[#D8E7F7]

              pt-8

              lg:border-s
              lg:border-t-0
              lg:ps-8
              lg:pt-0

              xl:ps-10
            "
          >
            <div className="space-y-8 lg:space-y-10">
              {centerTrust.map((item, index) => (
                <motion.div
                  key={`${item}-${index}`}
                  whileHover={
                    reducedMotion
                      ? undefined
                      : {
                          x: rtl ? -3 : 3,
                          y: -2,
                        }
                  }
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                      final-cta-feature

                      flex
                      min-w-0
                      items-center
                      gap-4
                    "
                >
                  <FinalCtaFeatureIcon index={index} />

                  <p
                    className="
                        min-w-0

                        text-[15px]
                        font-[760]
                        leading-[1.3]
                        tracking-[-0.02em]
                        text-[#10254A]

                        sm:text-[16px]

                        xl:text-[17px]
                      "
                  >
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* right 3D glass visual */}

          <FinalCtaDocumentVisual
            trust={trust}
            reducedMotion={reducedMotion}
            rtl={rtl}
          />
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   CERTIFICATION STATUS — REFERENCE-ACCURATE
============================================================================= */

function CertificationStatusSection({ certs }: { certs: string[] }) {
  const { t, i18n } = useTranslation("deployment");

  const sectionRef = useRef<HTMLElement>(null);

  const reducedMotion = useReducedMotion() ?? false;

  const certAnimationKey = `${
    i18n.resolvedLanguage ?? i18n.language
  }:${certs.join("\u001F")}`;

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const pills = gsap.utils.toArray<HTMLElement>(".cert-status-pill");

      gsap.set([".cert-status-title", ".cert-status-note"], {
        opacity: 0,
      });

      gsap.set(pills, {
        autoAlpha: 0,
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: "power2.out",
        },

        scrollTrigger: {
          trigger: sectionRef.current,

          start: "top 90%",

          /*
                  With two pills the sequence is deliberately shorter so both
                  pills are already 100% visible before the note enters.
                */
          end: certs.length <= 2 ? "58% 39%" : "70% 36%",

          scrub: 1.15,

          invalidateOnRefresh: true,

          fastScrollEnd: true,
        },
      });

      timeline.fromTo(
        ".cert-status-title",
        {
          y: 20,
          clipPath: "inset(0 0 100% 0)",
        },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.58,
        },
      );

      pills.forEach((pill, index) => {
        timeline.fromTo(
          pill,
          {
            autoAlpha: 0,
            y: 16,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.44,
          },
          index === 0 ? ">+=0.08" : ">+=0.13",
        );
      });

      timeline.fromTo(
        ".cert-status-note",
        {
          opacity: 0,
          y: 12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        ">+=0.10",
      );

      gsap.fromTo(
        ".cert-status-bg",
        {
          yPercent: -0.45,
        },
        {
          yPercent: 0.65,
          ease: "none",

          scrollTrigger: {
            trigger: sectionRef.current,

            start: "top bottom",

            end: "bottom top",

            scrub: 3.2,

            invalidateOnRefresh: true,
          },
        },
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion, certAnimationKey]);

  const pillGridClass =
    certs.length <= 1
      ? "max-w-[330px] grid-cols-1"
      : certs.length === 2
        ? "max-w-[660px] grid-cols-1 sm:grid-cols-2"
        : "max-w-[1000px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      ref={sectionRef}
      className="
        relative
        isolate
        overflow-hidden

        bg-[#FCFDFE]

        px-4
        py-20

        sm:px-6
        sm:py-24

        lg:min-h-[650px]
        lg:px-8
        lg:py-[108px]
      "
    >
      {/* soft blue-white reference background */}

      <div
        aria-hidden="true"
        className="
          cert-status-bg

          pointer-events-none
          absolute
          inset-0
          -z-30

          bg-[linear-gradient(180deg,#FEFFFF_0%,#FCFDFE_48%,#F9FCFE_100%)]

          will-change-transform
        "
      >
        <div
          className="
            absolute
            -right-[10%]
            -top-[34%]

            h-[480px]
            w-[480px]

            rounded-full

            bg-[radial-gradient(circle_at_34%_72%,rgba(221,237,251,0.90),rgba(241,248,253,0.64)_58%,rgba(255,255,255,0)_82%)]
          "
        />

        <div
          className="
            absolute
            -left-[14%]
            bottom-[-44%]

            h-[520px]
            w-[520px]

            rounded-full

            bg-[radial-gradient(circle_at_72%_28%,rgba(222,238,251,0.88),rgba(242,249,253,0.60)_58%,rgba(255,255,255,0)_82%)]
          "
        />
      </div>

      {/* reference floating dots */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[16.5%]
          top-[25%]

          hidden
          h-[34px]
          w-[34px]

          rounded-full

          bg-[#DCEBFA]/85

          lg:block
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[22%]
          left-[18%]

          hidden
          h-[34px]
          w-[34px]

          rounded-full

          bg-[#DCEBFA]/85

          lg:block
        "
      />

      <div
        className="
          relative
          z-10

          mx-auto
          flex
          w-full
          max-w-[1480px]
          flex-col
          items-center
          justify-center

          text-center

          lg:min-h-[430px]
        "
      >
        <h2
          className="
            cert-status-title

            text-[38px]
            font-[560]
            leading-[1.03]
            tracking-[-0.052em]
            text-[#10264A]

            sm:text-[52px]

            lg:text-[64px]
          "
        >
          {t("cert.headline")}
        </h2>

        <div
          className={`
            mt-10

            grid
            w-full
            items-stretch
            justify-center
            gap-4

            sm:gap-5

            ${pillGridClass}
          `}
        >
          {certs.map((item) => (
            <motion.div
              key={`${i18n.resolvedLanguage ?? i18n.language}-${item}`}
              className="
                  cert-status-pill

                  flex
                  min-h-[62px]
                  w-full
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-[#D8E4F0]

                  bg-white/82

                  px-7
                  py-4

                  text-center
                  text-[16px]
                  font-medium
                  leading-[1.25]
                  text-[#10264A]

                  shadow-[0_8px_22px_rgba(42,72,99,0.035),inset_0_1px_0_rgba(255,255,255,1)]

                  backdrop-blur-[10px]

                  sm:min-h-[68px]
                  sm:px-8
                  sm:text-[18px]
                "
              style={{
                opacity: reducedMotion ? 1 : 0,
              }}
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      y: -3,
                    }
              }
              transition={{
                duration: 0.24,
                ease: "easeOut",
              }}
            >
              {item}
            </motion.div>
          ))}
        </div>

        <p
          className="
            cert-status-note

            mx-auto
            mt-10
            max-w-[1080px]

            text-[15px]
            font-medium
            leading-[1.55]
            text-[#66758F]

            sm:text-[16px]
          "
        >
          {t("cert.note")}
        </p>
      </div>
    </section>
  );
}

/* =============================================================================
   PAGE-WIDE SCROLL REVEAL
============================================================================= */

function useDeploymentScrollReveal() {
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(
        ".deployment-scroll-section",
      );

      sections.forEach((section) => {
        const heading = section.querySelector(".deployment-section-heading");

        const items = section.querySelectorAll(".deployment-reveal-item");

        if (heading) {
          gsap.fromTo(
            heading,
            {
              opacity: 0,
              y: 18,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.62,
              ease: "power2.out",

              scrollTrigger: {
                trigger: heading,

                start: "top 88%",

                toggleActions: "play none none reverse",
              },
            },
          );
        }

        if (items.length > 0) {
          gsap.fromTo(
            items,
            {
              opacity: 0,
              y: 24,
              rotateX: 5,
              transformPerspective: 1200,
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              stagger: 0.08,
              duration: 0.62,
              ease: "power2.out",

              scrollTrigger: {
                trigger: section,

                start: "top 78%",

                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });
    });

    return () => {
      ctx.revert();
    };
  }, [reducedMotion]);
}

/* =============================================================================
   PAGE
============================================================================= */

export function DeploymentPage() {
  const { t, i18n } = useTranslation("deployment");

  const { t: th } = useTranslation("home");

  const trustRaw = th("trust", {
    returnObjects: true,
  });

  const trust = Array.isArray(trustRaw) ? (trustRaw as string[]) : [];

  const overview = t("overview.items", {
    returnObjects: true,
  }) as string[];

  const profiles = t("profiles.items", {
    returnObjects: true,
  }) as {
    title: string;
    text: string;
  }[];

  const sections = t("sections", {
    returnObjects: true,
  }) as {
    title: string;
    text: string;
  }[];

  const shared = t("shared.rows", {
    returnObjects: true,
  }) as {
    party: string;
    owns: string;
  }[];

  const certs = t("cert.items", {
    returnObjects: true,
  }) as string[];

  const rtl = i18n.dir() === "rtl";

  useDeploymentScrollReveal();

  return (
    <div dir={rtl ? "rtl" : "ltr"}>
      <Seo page="deployment" path="/deployment" />

      <DeploymentHero rtl={rtl} />

      <DeploymentOverviewSection overview={overview} rtl={rtl} />

      <DeploymentProfilesSection profiles={profiles} rtl={rtl} />

      <SovereignTopologySection rtl={rtl} />

      <KeyCapabilitiesSection sections={sections} rtl={rtl} />

      <SharedResponsibilitySection rows={shared} rtl={rtl} />

      <CertificationStatusSection certs={certs} />

      <FinalCtaSection trust={trust} />
    </div>
  );
}
