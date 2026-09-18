import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  useTranslation,
} from "react-i18next";

import gsap from "gsap";

import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

import {
  Seo,
} from "@/lib/seo";

import {
  LocaleLink,
} from "@/components/LocaleLink";

import {
  DashboardMockup,
  ApprovalMockup,
  StatusMockup,
} from "@/mockups/OperationsMockups";

const BRAND = {
  red: "#E5232A",
  green: "#2AA845",
  cyan: "#22A3E0",
  blue: "#1685EA",
  purple: "#5C6BC0",
  gold: "#F2C94C",
} as const;

const HERO_VISUAL_SRC =
  "/brand/how-it-works-hero-seamless.png";

const LOGO_SRC =
  "/brand/idoc-hive-logo.png";

/* =============================================================================
   COMMON — HOMEPAGE FINAL CTA DEPENDENCIES
============================================================================= */

function ArrowIcon({
  rtl = false,
}: {
  rtl?: boolean;
}) {
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
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M8.5 6.5 18 12l-9.5 5.5v-11Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ExactHiveLogo() {
  const rawId = useId();

  const cleanId = rawId.replace(/:/g, "");

  const filterId =
    `logo-filter-${cleanId}`;

  const maskId =
    `logo-mask-${cleanId}`;

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
            <feFuncA
              type="linear"
              slope="24"
              intercept="0"
            />
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
   HERO REFERENCE VISUAL
============================================================================= */

function AnimatedWireOverlay({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const signals = [
    {
      d: "M128 243 C145 248 162 255 180 263 C188 266 195 268 202 270",
      color: BRAND.blue,
      duration: "2.15s",
      begin: "0s",
    },
    {
      d: "M304 296 C312 299 320 303 327 307 C334 310 341 312 349 314",
      color: BRAND.green,
      duration: "2.05s",
      begin: "0.35s",
    },
    {
      d: "M447 339 C457 343 467 347 476 351 C484 354 491 357 498 359",
      color: BRAND.red,
      duration: "2.05s",
      begin: "0.7s",
    },
    {
      d: "M600 383 C605 386 609 389 613 392 C620 394 626 394 632 392",
      color: BRAND.gold,
      duration: "1.95s",
      begin: "1.05s",
    },
    {
      d: "M632 392 C638 392 641 386 641 378 L641 285 C641 266 652 255 671 255 L694 255",
      color: BRAND.blue,
      duration: "2.75s",
      begin: "1.35s",
    },
  ];

  const nodes = [
    {
      cx: 180,
      cy: 263,
      color: BRAND.blue,
      begin: "0s",
    },
    {
      cx: 327,
      cy: 307,
      color: BRAND.green,
      begin: "0.35s",
    },
    {
      cx: 476,
      cy: 351,
      color: BRAND.red,
      begin: "0.7s",
    },
    {
      cx: 613,
      cy: 392,
      color: BRAND.gold,
      begin: "1.05s",
    },
  ];

  return (
    <svg
      viewBox="0 0 955 675"
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
          id="how-signal-glow"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur
            stdDeviation="2.2"
            result="blur"
          />

          <feMerge>
            <feMergeNode
              in="blur"
            />

            <feMergeNode
              in="SourceGraphic"
            />
          </feMerge>
        </filter>
      </defs>

      {!reducedMotion &&
        signals.map(
          (
            signal,
            index,
          ) => (
            <g
              key={`${signal.color}-${index}`}
            >
              <path
                d={signal.d}
                fill="none"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeDasharray="15 120"
                opacity="0.88"
                filter="url(#how-signal-glow)"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="35;-135"
                  dur={signal.duration}
                  begin={signal.begin}
                  repeatCount="indefinite"
                />
              </path>

              <circle
                cx="0"
                cy="0"
                r="3.7"
                fill={signal.color}
                stroke="white"
                strokeWidth="1.7"
                filter="url(#how-signal-glow)"
              >
                <animateMotion
                  dur={signal.duration}
                  begin={signal.begin}
                  repeatCount="indefinite"
                  path={signal.d}
                  rotate="auto"
                />
              </circle>

              <circle
                cx="0"
                cy="0"
                r="6.2"
                fill={signal.color}
                opacity="0.13"
                filter="url(#how-signal-glow)"
              >
                <animateMotion
                  dur={signal.duration}
                  begin={signal.begin}
                  repeatCount="indefinite"
                  path={signal.d}
                  rotate="auto"
                />
              </circle>
            </g>
          ),
        )}

      {nodes.map(
        (
          node,
          index,
        ) => (
          <g
            key={`${node.cx}-${node.cy}-${index}`}
          >
            {!reducedMotion && (
              <>
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="7"
                  fill="none"
                  stroke={node.color}
                  strokeWidth="1.8"
                  opacity="0.5"
                >
                  <animate
                    attributeName="r"
                    values="7;12;7"
                    dur="2.65s"
                    begin={node.begin}
                    repeatCount="indefinite"
                  />

                  <animate
                    attributeName="opacity"
                    values="0.5;0.05;0.5"
                    dur="2.65s"
                    begin={node.begin}
                    repeatCount="indefinite"
                  />
                </circle>

                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="3.1"
                  fill={node.color}
                  opacity="0.9"
                >
                  <animate
                    attributeName="opacity"
                    values="0.9;0.55;0.9"
                    dur="1.7s"
                    begin={node.begin}
                    repeatCount="indefinite"
                  />
                </circle>
              </>
            )}
          </g>
        ),
      )}
    </svg>
  );
}

function HeroProcessVisual({
  rtl,
  reducedMotion,
}: {
  rtl: boolean;
  reducedMotion: boolean;
}) {
  return (
    <div
      className="
        relative
        mx-auto

        aspect-[955/675]
        w-full

        overflow-visible
      "
      style={
        rtl
          ? {
              transform:
                "scaleX(-1)",
            }
          : undefined
      }
    >
      <img
        src={HERO_VISUAL_SRC}
        alt=""
        width={955}
        height={675}
        className="
          absolute
          inset-0

          h-full
          w-full

          object-contain
          object-center

          select-none
        "
        draggable={false}
      />

      {!reducedMotion && (
        <div
          aria-hidden="true"
          className="
            how-ref-light-sweep

            pointer-events-none
            absolute
            inset-y-[7%]
            left-[-22%]
            z-[15]

            w-[24%]

            rotate-[9deg]

            bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.38),transparent)]

            blur-[16px]

            mix-blend-screen
          "
        />
      )}

      <AnimatedWireOverlay
        reducedMotion={
          reducedMotion
        }
      />
    </div>
  );
}

/* =============================================================================
   HERO
============================================================================= */

function TailGradientHeadingText({
  text,
  animateWords = false,
}: {
  text: string;
  animateWords?: boolean;
}) {
  const words =
    text
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  /*
    Main headings keep a dark beginning.
    For normal multi-word headings, only the final TWO words use
    the brand gradient. For a short 2-word heading, only the final
    word is gradient so the heading still starts black.
  */
  const gradientStart =
    words.length >= 3
      ? words.length - 2
      : Math.max(
          words.length - 1,
          0,
        );

  return (
    <>
      {words.map(
        (
          word,
          index,
        ) => {
          const gradient =
            index >=
            gradientStart;

          return (
            <span
              key={`${word}-${index}`}
              className={`
                inline-block

                ${
                  animateWords
                    ? "how-hero-word will-change-transform"
                    : ""
                }

                ${
                  gradient
                    ? "bg-[linear-gradient(90deg,#1685EA_0%,#22A3E0_62%,#2AA845_100%)] bg-clip-text text-transparent"
                    : "text-[#07142D]"
                }
              `}
            >
              {word}
              {index <
              words.length -
                1
                ? "\u00A0"
                : ""}
            </span>
          );
        },
      )}
    </>
  );
}


function HowHero({
  rtl,
}: {
  rtl: boolean;
}) {
  const {
    t,
  } = useTranslation(
    "howItWorks",
  );

  const sectionRef =
    useRef<HTMLElement>(
      null,
    );

  const reducedMotion =
    useReducedMotion() ??
    false;

  useEffect(() => {
    if (
      reducedMotion ||
      !sectionRef.current
    ) {
      return;
    }

    gsap.registerPlugin(
      ScrollTrigger,
    );

    const ctx =
      gsap.context(
        () => {
          gsap.set(
            ".how-hero-word",
            {
              opacity: 0,
              yPercent: 105,
              rotateX: 12,
              transformOrigin:
                "50% 100%",
            },
          );

          gsap.set(
            [
              ".how-ref-eyebrow",
              ".how-ref-body",
              ".how-ref-visual",
            ],
            {
              opacity: 0,
            },
          );

          const intro =
            gsap.timeline({
              scrollTrigger: {
                trigger:
                  sectionRef.current,

                start:
                  "top 88%",

                toggleActions:
                  "play none none reverse",

                invalidateOnRefresh:
                  true,
              },
            });

          intro
            .fromTo(
              ".how-ref-eyebrow",
              {
                opacity: 0,
                y: 12,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease:
                  "power2.out",
              },
            )
            .to(
              ".how-hero-word",
              {
                opacity: 1,
                yPercent: 0,
                rotateX: 0,
                stagger: 0.085,
                duration: 0.72,
                ease:
                  "power3.out",
              },
              "-=0.12",
            )
            .fromTo(
              ".how-ref-body",
              {
                opacity: 0,
                y: 18,
                clipPath:
                  "inset(0 0 100% 0)",
              },
              {
                opacity: 1,
                y: 0,
                clipPath:
                  "inset(0 0 0% 0)",
                duration: 0.62,
                ease:
                  "power2.out",
              },
              "-=0.36",
            )
            .fromTo(
              ".how-ref-visual",
              {
                opacity: 0,
                y: 18,
                x:
                  rtl
                    ? -22
                    : 22,
                clipPath:
                  rtl
                    ? "inset(0 0 0 9%)"
                    : "inset(0 9% 0 0)",
              },
              {
                opacity: 1,
                y: 0,
                x: 0,
                clipPath:
                  "inset(0 0 0 0)",
                duration: 0.8,
                ease:
                  "power2.out",
              },
              "-=0.4",
            )
            .fromTo(
              ".how-ref-light-sweep",
              {
                xPercent:
                  rtl
                    ? 360
                    : 0,
                opacity: 0,
              },
              {
                xPercent:
                  rtl
                    ? 0
                    : 360,
                opacity: 0.82,
                duration: 0.68,
                ease:
                  "power1.inOut",
              },
              "-=0.38",
            )
            .to(
              ".how-ref-light-sweep",
              {
                opacity: 0,
                duration: 0.2,
              },
              "-=0.08",
            );

          gsap.fromTo(
            ".how-ref-visual",
            {
              yPercent: 0,
            },
            {
              yPercent: -1.15,
              ease: "none",

              scrollTrigger: {
                trigger:
                  sectionRef.current,

                start:
                  "top top",

                end:
                  "bottom top",

                scrub: 2.8,

                invalidateOnRefresh:
                  true,
              },
            },
          );
        },
        sectionRef,
      );

    return () => {
      ctx.revert();
    };
  }, [
    reducedMotion,
    rtl,
  ]);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        isolate
        overflow-hidden

        bg-[linear-gradient(180deg,#F8FAFC_0%,#FAFCFE_34%,#FDFEFE_72%,#FFFFFF_100%)]

        px-4
        pb-12
        pt-[116px]

        sm:px-6
        sm:pb-16
        sm:pt-[128px]

        lg:px-8
        lg:pb-20
        lg:pt-[136px]

        xl:min-h-[790px]
        xl:pt-[144px]
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10

          bg-[radial-gradient(circle_at_76%_34%,rgba(231,241,255,0.72),rgba(248,251,254,0.30)_31%,rgba(255,255,255,0)_60%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          -z-20

          h-[205px]

          bg-[#F8FAFC]
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

          lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]
          lg:gap-0
        "
      >
        {/* LEFT CONTENT — reference proportions */}

        <div
          className="
            relative
            z-10

            max-w-[630px]

            lg:pb-8
          "
        >
          <p
            className="
              how-ref-eyebrow

              text-[11px]
              font-[800]
              uppercase
              tracking-[0.32em]

              text-transparent

              bg-clip-text
              bg-[linear-gradient(90deg,#2AA845_0%,#22A3E0_54%,#1685EA_100%)]

              sm:text-[12px]
            "
          >
            {t(
              "eyebrow",
            )}
          </p>

          <h1
            className="
              how-ref-title

              mt-6

              max-w-[620px]

              text-[43px]
              font-[820]
              leading-[1.01]
              tracking-[-0.058em]
              text-[#07142D]

              [perspective:900px]

              sm:text-[53px]

              md:text-[61px]

              lg:text-[64px]

              xl:text-[70px]
            "
          >
            <TailGradientHeadingText
              text={t(
                "headline",
              )}
              animateWords
            />
          </h1>

          <p
            className="
              how-ref-body

              mt-7

              max-w-[610px]

              text-[15px]
              font-medium
              leading-[1.58]
              text-[#52698E]

              sm:text-[17px]

              lg:text-[18px]
            "
          >
            {t(
              "body",
            )}
          </p>
        </div>

        {/* RIGHT VISUAL — exact reference asset + animated wires */}

        <div
          className="
            how-ref-visual

            min-w-0

            lg:-ms-1
            lg:w-[101%]

            xl:-ms-3
            xl:w-[104%]
          "
        >
          <HeroProcessVisual
            rtl={rtl}
            reducedMotion={
              reducedMotion
            }
          />
        </div>
      </div>

      <span
        aria-hidden="true"
        className="
          absolute
          bottom-[82px]
          left-[5.5%]

          hidden
          h-9
          w-9

          rounded-[6px]

          bg-[#FFE2E4]

          lg:block
        "
      />

      <span
        aria-hidden="true"
        className="
          absolute
          bottom-[42px]
          left-[25%]

          hidden
          h-10
          w-10

          rounded-[6px]

          bg-[#DCEAFF]

          lg:block
        "
      />
    </section>
  );
}

/* =============================================================================
   OPERATIONAL PATH — REFERENCE-ACCURATE
============================================================================= */

function StepArrow({
  rtl,
}: {
  rtl: boolean;
}) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={`
        h-3.5
        w-3.5
        shrink-0

        ${rtl ? "rotate-180" : ""}
      `}
      aria-hidden="true"
    >
      <path
        d="m7 4 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AuditCopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <rect
        x="8"
        y="8"
        width="10"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ActiveStepVisual({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      className="
        relative

        h-[126px]
        w-[132px]

        shrink-0

        [perspective:900px]

        sm:h-[142px]
        sm:w-[150px]
      "
      animate={
        reducedMotion
          ? undefined
          : {
              y: [
                0,
                -5,
                0,
              ],
            }
      }
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    >
      {/* soft 3D floor shadow */}

      <div
        className="
          absolute
          inset-x-[13%]
          bottom-[4%]

          h-[22%]

          rounded-[50%]

          bg-[#2E6FAF]/18

          blur-[12px]
        "
      />

      {/* dashed wireframe */}

      <svg
        viewBox="0 0 150 142"
        className="
          absolute
          inset-0
          h-full
          w-full
        "
      >
        <path
          d="
            M26 91
            C15 70 22 43 44 32
            C70 18 104 23 123 46
            C139 65 136 94 117 110
          "
          fill="none"
          stroke="#75B9F4"
          strokeWidth="1.5"
          strokeDasharray="3 5"
          opacity="0.75"
        />

        {!reducedMotion && (
          <circle
            cx="26"
            cy="91"
            r="3.5"
            fill="#1685EA"
          >
            <animateMotion
              dur="5.5s"
              repeatCount="indefinite"
              path="
                M26 91
                C15 70 22 43 44 32
                C70 18 104 23 123 46
                C139 65 136 94 117 110
              "
            />
          </circle>
        )}
      </svg>

      {/* rear document */}

      <div
        className="
          absolute
          left-[28%]
          top-[25%]

          h-[62%]
          w-[43%]

          rounded-[10px]

          border
          border-white

          bg-[#EDF6FF]

          shadow-[0_13px_28px_rgba(42,78,111,0.12)]
        "
        style={{
          transform:
            "translateZ(-14px) translateX(-10px)",
        }}
      />

      {/* middle document */}

      <div
        className="
          absolute
          left-[34%]
          top-[20%]

          h-[65%]
          w-[44%]

          rounded-[10px]

          border
          border-white

          bg-[#F5FAFF]

          shadow-[0_14px_30px_rgba(42,78,111,0.13)]
        "
        style={{
          transform:
            "translateZ(-5px) translateX(-3px)",
        }}
      />

      {/* front document */}

      <div
        className="
          absolute
          left-[42%]
          top-[16%]

          h-[69%]
          w-[46%]

          rounded-[11px]

          border
          border-white

          bg-[linear-gradient(145deg,#FFFFFF,#EDF6FF)]

          p-[12%]

          shadow-[0_18px_35px_rgba(37,74,108,0.18),inset_0_1px_0_rgba(255,255,255,1)]
        "
        style={{
          transform:
            "rotateY(-8deg) translateZ(10px)",
        }}
      >
        <div className="space-y-[11%]">
          <span className="block h-[4px] w-[72%] rounded-full bg-[#7AB6F0]" />
          <span className="block h-[4px] w-[92%] rounded-full bg-[#B9D7F5]" />
          <span className="block h-[4px] w-[82%] rounded-full bg-[#B9D7F5]" />
          <span className="block h-[4px] w-[68%] rounded-full bg-[#B9D7F5]" />
        </div>
      </div>

      {/* blue upload badge */}

      <div
        className="
          absolute
          right-[3%]
          bottom-[13%]

          flex
          aspect-square
          w-[31%]
          items-center
          justify-center

          rounded-full

          bg-[#1685EA]

          text-white

          shadow-[0_12px_26px_rgba(22,133,234,0.28),inset_0_1px_0_rgba(255,255,255,0.28)]
        "
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          className="h-[56%] w-[56%]"
        >
          <path
            d="M18 27V9"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          <path
            d="m11 16 7-7 7 7"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* pedestal */}

      <div
        className="
          absolute
          left-[25%]
          bottom-[3%]

          h-[16%]
          w-[58%]

          rounded-[10px]

          border
          border-white

          bg-[linear-gradient(180deg,#E8F3FF,#BFDDFB)]

          shadow-[0_14px_26px_rgba(40,77,111,0.16)]
        "
        style={{
          transform:
            "perspective(500px) rotateX(58deg)",
          transformOrigin:
            "50% 0%",
        }}
      />
    </motion.div>
  );
}

function OperationalPath({
  steps,
  active,
  setActive,
  rtl,
}: {
  steps: {
    title: string;
    text: string;
    audit: string;
    status: string;
  }[];
  active: number;
  setActive: (
    value: number,
  ) => void;
  rtl: boolean;
}) {
  const {
    t,
  } = useTranslation(
    "howItWorks",
  );

  const sectionRef =
    useRef<HTMLElement>(
      null,
    );

  const reducedMotion =
    useReducedMotion() ??
    false;

  const current =
    steps[active];

  useEffect(() => {
    if (
      reducedMotion ||
      !sectionRef.current
    ) {
      return;
    }

    gsap.registerPlugin(
      ScrollTrigger,
    );

    const ctx =
      gsap.context(
        () => {
          /*
            Progressive scroll reveal:
            the section now reveals as the user scrolls rather than
            playing everything immediately on first entry.
          */
          const timeline =
            gsap.timeline({
              defaults: {
                ease:
                  "power1.inOut",
              },

              scrollTrigger: {
                trigger:
                  sectionRef.current,

                start:
                  "top 92%",

                end:
                  "55% 40%",

                scrub:
                  1.35,

                invalidateOnRefresh:
                  true,

                fastScrollEnd:
                  true,
              },
            });

          timeline
            .fromTo(
              ".operation-ref-kicker",
              {
                opacity: 0,
                y: 10,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.28,
              },
            )
            .fromTo(
              ".operation-ref-title",
              {
                opacity: 0,
                y: 22,
                clipPath:
                  "inset(0 0 100% 0)",
              },
              {
                opacity: 1,
                y: 0,
                clipPath:
                  "inset(0 0 0% 0)",
                duration: 0.62,
              },
              "-=0.08",
            )
            .fromTo(
              ".operation-ref-description",
              {
                opacity: 0,
                y: 15,
                clipPath:
                  "inset(0 0 100% 0)",
              },
              {
                opacity: 1,
                y: 0,
                clipPath:
                  "inset(0 0 0% 0)",
                duration: 0.48,
              },
              "-=0.22",
            )
            .fromTo(
              ".operation-ref-shell",
              {
                opacity: 0,
                y: 24,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.58,
              },
              "-=0.15",
            )
            .fromTo(
              ".operation-ref-step",
              {
                opacity: 0,
                x:
                  rtl
                    ? 16
                    : -16,
                y: 5,
              },
              {
                opacity: 1,
                x: 0,
                y: 0,
                stagger: 0.055,
                duration: 0.42,
              },
              "-=0.34",
            )
            .fromTo(
              ".operation-panel-status",
              {
                opacity: 0,
                y: 8,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.24,
              },
              "-=0.22",
            )
            .fromTo(
              ".operation-panel-title",
              {
                opacity: 0,
                y: 18,
                clipPath:
                  "inset(0 0 100% 0)",
              },
              {
                opacity: 1,
                y: 0,
                clipPath:
                  "inset(0 0 0% 0)",
                duration: 0.42,
              },
              "-=0.12",
            )
            .fromTo(
              ".operation-panel-body",
              {
                opacity: 0,
                y: 13,
                clipPath:
                  "inset(0 0 100% 0)",
              },
              {
                opacity: 1,
                y: 0,
                clipPath:
                  "inset(0 0 0% 0)",
                duration: 0.38,
              },
              "-=0.18",
            )
            .fromTo(
              ".operation-panel-visual",
              {
                opacity: 0,
                y: 10,
                x:
                  rtl
                    ? -12
                    : 12,
              },
              {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 0.36,
              },
              "-=0.24",
            )
            .fromTo(
              ".operation-panel-audit",
              {
                opacity: 0,
                y: 10,
                clipPath:
                  "inset(0 0 100% 0)",
              },
              {
                opacity: 1,
                y: 0,
                clipPath:
                  "inset(0 0 0% 0)",
                duration: 0.34,
              },
              "-=0.18",
            )
            .fromTo(
              ".operation-ref-mockup",
              {
                opacity: 0,
                y: 16,
              },
              {
                opacity: 1,
                y: 0,
                stagger: 0.09,
                duration: 0.42,
              },
              "-=0.12",
            );

          /*
            Very subtle depth drift while the section is passing the
            viewport. No scaling is used.
          */
          gsap.fromTo(
            ".operation-ref-shell",
            {
              yPercent:
                0,
            },
            {
              yPercent:
                -1.1,

              ease:
                "none",

              scrollTrigger: {
                trigger:
                  sectionRef.current,

                start:
                  "top bottom",

                end:
                  "bottom top",

                scrub:
                  3,

                invalidateOnRefresh:
                  true,
              },
            },
          );
        },
        sectionRef,
      );

    return () => {
      ctx.revert();
    };
  }, [
    reducedMotion,
    rtl,
  ]);

  if (!current) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="
        relative
        isolate
        overflow-hidden

        bg-[#FBFDFF]

        px-4
        py-[68px]

        sm:px-6
        sm:py-[76px]

        lg:px-8
        lg:py-[84px]
      "
    >
      {/* reference-style corner geometry */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-100px]
          top-[-40px]
          -z-10

          h-[300px]
          w-[300px]

          rotate-[42deg]

          bg-[#EAF4FF]/75
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-[120px]
          bottom-[-170px]
          -z-10

          h-[300px]
          w-[300px]

          rotate-[42deg]

          bg-[#EEF7FF]/80
        "
      />

      {/* dotted accent */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[1.4%]
          top-[22%]
          -z-10

          hidden

          grid-cols-5
          gap-[10px]

          lg:grid
        "
      >
        {Array.from({
          length: 25,
        }).map(
          (
            _,
            index,
          ) => (
            <span
              key={index}
              className="
                h-[2px]
                w-[2px]

                rounded-full

                bg-[#22A3E0]/60
              "
            />
          ),
        )}
      </div>

      <div
        className="
          mx-auto
          w-full
          max-w-[1360px]
        "
      >
        {/* centered reference heading */}

        <div
          className="
            operation-ref-heading

            mx-auto
            max-w-[900px]

            text-center
          "
        >
          <div
            className="
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-7

                bg-[#A9CCE9]
              "
            />

            <p
              className="
                operation-ref-kicker

                text-[10px]
                font-[800]
                uppercase
                tracking-[0.30em]

                text-transparent

                bg-clip-text
                bg-[linear-gradient(90deg,#2AA845,#22A3E0,#1685EA)]

                sm:text-[11px]
              "
            >
              {t(
                "eyebrow",
              )}
            </p>

            <span
              aria-hidden="true"
              className="
                h-px
                w-7

                bg-[#A9CCE9]
              "
            />
          </div>

          <h2
            className="
              operation-ref-title

              mt-3

              text-[36px]
              font-[820]
              leading-[1.025]
              tracking-[-0.052em]

              text-[#07142D]

              sm:text-[46px]

              lg:text-[54px]

              xl:text-[58px]
            "
          >
            <TailGradientHeadingText
              text={t(
                "headline",
              )}
            />
          </h2>

          <p
            className="
              operation-ref-description

              mx-auto
              mt-3
              max-w-[760px]

              text-[12px]
              font-medium
              leading-[1.55]
              text-[#586E8F]

              sm:text-[13px]

              lg:text-[14px]
            "
          >
            {t(
              "body",
            )}
          </p>
        </div>

        {/* main reference shell */}

        <div
          className="
            operation-ref-shell

            relative

            mt-7

            grid
            gap-4

            lg:grid-cols-[250px_minmax(0,1fr)]
            lg:gap-5
          "
        >
          {/* LEFT STEPS */}

          <ol
            className="
              grid
              grid-cols-1
              gap-[5px]

              sm:grid-cols-2

              lg:grid-cols-1
            "
          >
            {steps.map(
              (
                step,
                index,
              ) => {
                const selected =
                  active ===
                  index;

                return (
                  <li
                    key={
                      step.title
                    }
                    className="operation-ref-step"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setActive(
                          index,
                        )
                      }
                      aria-current={
                        selected
                      }
                      className={`
                        group
                        relative

                        flex
                        min-h-[36px]
                        w-full
                        items-center
                        gap-2.5

                        overflow-hidden

                        rounded-[9px]

                        border

                        px-2.5
                        py-1.5

                        text-start

                        shadow-[0_7px_18px_rgba(47,77,104,0.055)]

                        transition-all
                        duration-300

                        ${
                          selected
                            ? "border-[#1685EA] bg-[#1685EA] text-white shadow-[0_10px_24px_rgba(22,133,234,0.22)]"
                            : "border-[#E3ECF5] bg-white/92 text-[#3C5477] hover:border-[#BCD5ED] hover:text-[#07142D]"
                        }
                      `}
                    >
                      <span
                        className={`
                          flex
                          h-[23px]
                          min-w-[30px]
                          shrink-0
                          items-center
                          justify-center

                          rounded-full

                          px-1.5

                          text-[9px]
                          font-[800]

                          ${
                            selected
                              ? "bg-white text-[#1685EA]"
                              : "bg-[#F0F6FC] text-[#6B819E]"
                          }
                        `}
                      >
                        {String(
                          index +
                            1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      <span
                        className="
                          min-w-0
                          flex-1

                          truncate

                          text-[10.5px]
                          font-[650]

                          sm:text-[11px]
                        "
                      >
                        {
                          step.title
                        }
                      </span>

                      <span
                        className={`
                          ${
                            selected
                              ? "text-white"
                              : "text-[#7D96B4]"
                          }
                        `}
                      >
                        <StepArrow
                          rtl={rtl}
                        />
                      </span>

                      {selected && (
                        <span
                          aria-hidden="true"
                          className="
                            absolute
                            inset-y-0
                            end-0

                            w-[34%]

                            bg-[linear-gradient(90deg,transparent,rgba(34,163,224,0.40))]
                          "
                        />
                      )}
                    </button>
                  </li>
                );
              },
            )}
          </ol>

          {/* RIGHT EXPERIENCE PANEL */}

          <div
            className="
              relative

              overflow-hidden

              rounded-[18px]

              border
              border-[#DCE8F4]

              bg-white/90

              p-3

              shadow-[0_22px_58px_rgba(36,69,98,0.10),inset_0_1px_0_rgba(255,255,255,1)]

              backdrop-blur-[16px]

              sm:p-4
            "
          >
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

            <AnimatePresence
              mode="wait"
              initial={false}
            >
              <motion.div
                key={`${active}-${current.title}`}
                initial={
                  reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 8,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={
                  reducedMotion
                    ? {
                        opacity: 0,
                      }
                    : {
                        opacity: 0,
                        y: -6,
                      }
                }
                transition={{
                  duration:
                    reducedMotion
                      ? 0
                      : 0.28,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
              >
                {/* top active information */}

                <div
                  className="
                    relative

                    min-h-[194px]

                    rounded-[14px]

                    border
                    border-[#E5EDF6]

                    bg-[#FCFEFF]

                    px-5
                    py-5

                    shadow-[0_10px_28px_rgba(43,76,104,0.05)]

                    sm:min-h-[205px]
                    sm:px-6
                  "
                >
                  <div
                    className="
                      max-w-[72%]

                      sm:max-w-[76%]
                    "
                  >
                    <span
                      className="
                        operation-panel-status

                        inline-flex
                        items-center

                        rounded-full

                        bg-[#E8FAF0]

                        px-2.5
                        py-1

                        text-[8.5px]
                        font-[800]
                        uppercase
                        tracking-[0.08em]
                        text-[#2AA845]

                        sm:text-[9px]
                      "
                    >
                      {
                        current.status
                      }
                    </span>

                    <h3
                      className="
                        operation-panel-title

                        mt-3

                        text-[24px]
                        font-[820]
                        leading-[1.05]
                        tracking-[-0.04em]

                        text-[#07142D]

                        sm:text-[28px]
                      "
                    >
                      {
                        current.title
                      }
                    </h3>

                    <p
                      className="
                        operation-panel-body

                        mt-3

                        max-w-[690px]

                        text-[11.5px]
                        font-medium
                        leading-[1.55]
                        text-[#617391]

                        sm:text-[12.5px]
                      "
                    >
                      {
                        current.text
                      }
                    </p>
                  </div>

                  <div
                    className="
                      operation-panel-visual

                      absolute
                      end-4
                      top-3

                      hidden

                      sm:block
                    "
                  >
                    <ActiveStepVisual
                      reducedMotion={
                        reducedMotion
                      }
                    />
                  </div>

                  {/* brand-colored audit strip — replaces black reference bar */}

                  <div
                    className="
                      operation-panel-audit

                      group
                      relative

                      mt-5
                      overflow-hidden

                      rounded-[9px]

                      bg-[linear-gradient(100deg,#0F6FD6_0%,#1685EA_38%,#22A3E0_68%,#5C6BC0_100%)]

                      px-3.5
                      py-2.5

                      shadow-[0_12px_26px_rgba(22,133,234,0.18)]

                      sm:me-[155px]
                    "
                  >
                    {!reducedMotion && (
                      <motion.span
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute
                          inset-y-0
                          -left-[28%]

                          w-[22%]

                          skew-x-[-18deg]

                          bg-white/14

                          blur-[5px]
                        "
                        animate={{
                          x: [
                            "0%",
                            "620%",
                          ],
                        }}
                        transition={{
                          duration: 3.8,
                          repeat: Infinity,
                          repeatDelay: 2.4,
                          ease: "easeInOut",
                        }}
                      />
                    )}

                    <div
                      className="
                        relative
                        z-10

                        flex
                        items-center
                        gap-3
                      "
                    >
                      <p
                        className="
                          min-w-0
                          flex-1

                          overflow-hidden

                          font-mono
                          text-[9px]
                          leading-[1.45]
                          text-white/92

                          sm:text-[10px]
                        "
                      >
                        {
                          current.audit
                        }
                      </p>

                      <span
                        className="
                          shrink-0
                          text-white/80
                        "
                      >
                        <AuditCopyIcon />
                      </span>
                    </div>
                  </div>
                </div>

                {/* three lower cards from existing mockups */}

                <div
                  className="
                    mt-3

                    grid
                    gap-3

                    md:grid-cols-3
                  "
                >
                  {[
                    <DashboardMockup key="dashboard" />,
                    <ApprovalMockup key="approval" />,
                    <StatusMockup key="status" />,
                  ].map(
                    (
                      mockup,
                      index,
                    ) => (
                      <motion.div
                        key={
                          index
                        }
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
                        className="
                          operation-ref-mockup

                          min-h-[145px]
                          overflow-hidden

                          rounded-[12px]

                          border
                          border-[#E3ECF5]

                          bg-white

                          p-2

                          shadow-[0_11px_26px_rgba(39,72,101,0.07)]
                        "
                      >
                        {mockup}
                      </motion.div>
                    ),
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   EXCEPTIONS — REFERENCE-ACCURATE 3D CARDS
============================================================================= */

type ExceptionTheme = {
  color: string;
  soft: string;
  border: string;
  shadow: string;
};

const EXCEPTION_THEMES: ExceptionTheme[] = [
  {
    color: "#13A879",
    soft: "#E8FBF4",
    border: "#CDEFE3",
    shadow: "rgba(19,168,121,0.13)",
  },
  {
    color: "#1685EA",
    soft: "#EAF4FF",
    border: "#D2E7FA",
    shadow: "rgba(22,133,234,0.13)",
  },
  {
    color: "#7A35F2",
    soft: "#F1EAFE",
    border: "#E4D8FB",
    shadow: "rgba(122,53,242,0.12)",
  },
  {
    color: "#F59A16",
    soft: "#FFF4E5",
    border: "#F8DFC0",
    shadow: "rgba(245,154,22,0.13)",
  },
  {
    color: "#13A879",
    soft: "#E8FBF4",
    border: "#CDEFE3",
    shadow: "rgba(19,168,121,0.13)",
  },
  {
    color: "#1685EA",
    soft: "#EAF4FF",
    border: "#D2E7FA",
    shadow: "rgba(22,133,234,0.13)",
  },
];

function ExceptionIcon({
  index,
  color,
}: {
  index: number;
  color: string;
}) {
  const stroke = {
    stroke: color,
    strokeWidth: 2.5,
    strokeLinecap:
      "round" as const,
    strokeLinejoin:
      "round" as const,
  };

  if (index === 0) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-9 w-9"
        aria-hidden="true"
      >
        <path
          d="M12 7h18l7 7v17H12V7Z"
          {...stroke}
        />

        <path
          d="M30 7v8h7"
          {...stroke}
        />

        <path
          d="M18 20h10M18 26h7"
          {...stroke}
        />

        <circle
          cx="31"
          cy="32"
          r="7"
          {...stroke}
        />

        <path
          d="m36 37 5 5"
          {...stroke}
        />
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
        <path
          d="M11 6h20l7 7v22H11V6Z"
          {...stroke}
        />

        <path
          d="M31 6v8h7"
          {...stroke}
        />

        <path
          d="M17 20h10M17 26h8"
          {...stroke}
        />

        <rect
          x="27"
          y="27"
          width="13"
          height="12"
          rx="3"
          fill={color}
        />

        <path
          d="M30 27v-2a3.5 3.5 0 0 1 7 0v2"
          stroke={color}
          strokeWidth="2.2"
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
        className="h-10 w-10"
        aria-hidden="true"
      >
        <ellipse
          cx="24"
          cy="12"
          rx="13"
          ry="6"
          {...stroke}
        />

        <path
          d="M11 12v10c0 3.3 5.8 6 13 6s13-2.7 13-6V12"
          {...stroke}
        />

        <path
          d="M11 22v10c0 3.3 5.8 6 13 6s13-2.7 13-6V22"
          {...stroke}
        />
      </svg>
    );
  }

  if (index === 3) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-10 w-10"
        aria-hidden="true"
      >
        <path
          d="M24 7c-4 0-7 3-7 7-4 0-7 3-7 7 0 3 2 6 5 7-2 5 1 10 6 10h3V7Z"
          {...stroke}
        />

        <path
          d="M24 7c4 0 7 3 7 7 4 0 7 3 7 7 0 3-2 6-5 7 2 5-1 10-6 10h-3V7Z"
          {...stroke}
        />

        <path
          d="M18 17c3 0 5 2 5 5M30 17c-3 0-5 2-5 5M18 30c3 0 5-2 5-5M30 30c-3 0-5-2-5-5"
          {...stroke}
        />
      </svg>
    );
  }

  if (index === 4) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-10 w-10"
        aria-hidden="true"
      >
        <circle
          cx="20"
          cy="16"
          r="7"
          {...stroke}
        />

        <path
          d="M8 38v-4c0-7 5-11 12-11 5 0 9 2 11 6"
          {...stroke}
        />

        <circle
          cx="34"
          cy="33"
          r="8"
          fill={color}
        />

        <path
          d="m30 33 3 3 5-6"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-10 w-10"
      aria-hidden="true"
    >
      <path
        d="M24 7 28 9l4-2 3 4 5 1v5l3 3-3 4v5l-5 1-3 4-4-2-4 2-4-2-4 2-3-4-5-1v-5l-3-4 3-3v-5l5-1 3-4 4 2 4-2Z"
        {...stroke}
      />

      <circle
        cx="24"
        cy="21"
        r="6"
        {...stroke}
      />
    </svg>
  );
}

function ExceptionsSection({
  items,
}: {
  items: {
    when: string;
    outcome: string;
    detail: string;
  }[];
}) {
  const {
    t,
    i18n,
  } = useTranslation(
    "howItWorks",
  );

  const sectionRef =
    useRef<HTMLElement>(
      null,
    );

  const reducedMotion =
    useReducedMotion() ??
    false;

  const rtl =
    i18n.dir() ===
    "rtl";

  useEffect(() => {
    if (
      reducedMotion ||
      !sectionRef.current
    ) {
      return;
    }

    gsap.registerPlugin(
      ScrollTrigger,
    );

    const ctx =
      gsap.context(
        () => {
          const cards =
            gsap.utils.toArray<HTMLElement>(
              ".exception-card",
            );

          /*
            Heading reveal remains scroll-driven.
          */
          gsap
            .timeline({
              scrollTrigger: {
                trigger:
                  sectionRef.current,

                start:
                  "top 88%",

                end:
                  "top 54%",

                scrub:
                  1.2,

                invalidateOnRefresh:
                  true,
              },
            })
            .fromTo(
              ".exception-ref-line",
              {
                opacity: 0,
                scaleX: 0.25,
              },
              {
                opacity: 1,
                scaleX: 1,
                duration: 0.34,
                ease:
                  "power1.out",
              },
            )
            .fromTo(
              ".exception-ref-heading",
              {
                opacity: 0,
                y: 18,
                clipPath:
                  "inset(0 0 100% 0)",
              },
              {
                opacity: 1,
                y: 0,
                clipPath:
                  "inset(0 0 0% 0)",
                duration: 0.55,
                ease:
                  "power2.out",
              },
              "-=0.12",
            )
            .fromTo(
              ".exception-ref-body",
              {
                opacity: 0,
                y: 12,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease:
                  "power2.out",
              },
              "-=0.22",
            );

          /*
            IMPORTANT:
            There is deliberately NO pinned card shell now.
            Each card owns its own ScrollTrigger, so every card can travel
            fully into the viewport before its reveal finishes.

            On the 2-column layout:
            - left card reveals first
            - scrolling a little further reveals the right card
            - then the next row repeats the same rhythm

            This creates the requested true one-by-one experience without
            leaving the final row half-visible.
          */
          cards.forEach(
            (
              card,
              index,
            ) => {
              const title =
                card.querySelector<HTMLElement>(
                  ".exception-card-title",
                );

              const rightColumn =
                index %
                  2 ===
                1;

              const start =
                rightColumn
                  ? "top 74%"
                  : "top 90%";

              const end =
                rightColumn
                  ? "top 53%"
                  : "top 69%";

              gsap.set(
                card,
                {
                  autoAlpha: 0,
                  y: 42,
                  x:
                    rtl
                      ? 12
                      : -12,
                  rotateX: 9,
                  rotateY:
                    rtl
                      ? -6
                      : 6,
                  z: -32,
                  transformPerspective:
                    1400,
                  transformOrigin:
                    "50% 72%",
                },
              );

              if (title) {
                gsap.set(
                  title,
                  {
                    opacity: 0,
                    y: 8,
                    clipPath:
                      "inset(0 0 100% 0)",
                  },
                );
              }

              const cardTimeline =
                gsap.timeline({
                  scrollTrigger: {
                    trigger:
                      card,

                    start,

                    end,

                    scrub:
                      1.05,

                    invalidateOnRefresh:
                      true,

                    fastScrollEnd:
                      true,
                  },
                });

              cardTimeline
                .to(
                  card,
                  {
                    autoAlpha: 1,
                    y: 0,
                    x: 0,
                    rotateX: 0,
                    rotateY: 0,
                    z: 0,
                    duration: 0.72,
                    ease:
                      "power2.out",
                  },
                );

              if (title) {
                cardTimeline.to(
                  title,
                  {
                    opacity: 1,
                    y: 0,
                    clipPath:
                      "inset(0 0 0% 0)",
                    duration: 0.34,
                    ease:
                      "power1.out",
                  },
                  "-=0.30",
                );
              }
            },
          );

          /*
            Decorative dots appear after the section heading.
          */
          gsap.fromTo(
            ".exception-ref-dot",
            {
              opacity: 0,
              scale: 0.4,
            },
            {
              opacity: 1,
              scale: 1,
              stagger: 0.018,
              duration: 0.26,
              ease:
                "power1.out",

              scrollTrigger: {
                trigger:
                  ".exception-ref-heading",

                start:
                  "top 70%",

                toggleActions:
                  "play none none reverse",
              },
            },
          );

          /*
            Very light background parallax only.
          */
          gsap.fromTo(
            ".exception-ref-bg",
            {
              yPercent:
                -0.6,
            },
            {
              yPercent:
                0.9,

              ease:
                "none",

              scrollTrigger: {
                trigger:
                  sectionRef.current,

                start:
                  "top bottom",

                end:
                  "bottom top",

                scrub:
                  3,

                invalidateOnRefresh:
                  true,
              },
            },
          );
        },
        sectionRef,
      );

    return () => {
      ctx.revert();
    };
  }, [
    reducedMotion,
    rtl,
    items.length,
  ]);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        isolate
        overflow-hidden

        bg-[#FEFFFF]

        px-4
        py-16

        sm:px-6
        sm:py-20

        lg:px-8
        lg:pt-[86px]
        lg:pb-[130px]
      "
    >
      {/* soft reference-style background geometry */}

      <div
        aria-hidden="true"
        className="
          exception-ref-bg

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
            -left-[170px]
            -top-[145px]

            h-[410px]
            w-[410px]

            rotate-45

            bg-[#EAF4FF]/62
          "
        />

        <div
          className="
            absolute
            -right-[175px]
            bottom-[-190px]

            h-[390px]
            w-[390px]

            rotate-45

            bg-[#EEF6FF]/72
          "
        />

        <div
          className="
            absolute
            left-[4%]
            top-[9%]

            h-10
            w-10

            rounded-full

            bg-[#8FEED0]/72
          "
        />
      </div>

      {/* top-right dotted pattern */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[4.5%]
          top-[8%]
          -z-10

          hidden

          grid-cols-6
          gap-[13px]

          lg:grid
        "
      >
        {Array.from({
          length: 30,
        }).map(
          (
            _,
            index,
          ) => (
            <span
              key={index}
              className="
                exception-ref-dot

                h-[3px]
                w-[3px]

                rounded-full

                bg-[#1685EA]/65
              "
            />
          ),
        )}
      </div>

      <div
        className="
          mx-auto
          w-full
          max-w-[1420px]
        "
      >
        {/* reference heading */}

        <div
          className="
            mx-auto
            max-w-[1040px]

            text-center
          "
        >
          <div
            aria-hidden="true"
            className="
              exception-ref-line

              mx-auto
              mb-5

              h-px
              w-[170px]

              bg-[linear-gradient(90deg,transparent,#1685EA,#22A3E0,transparent)]
            "
          />

          <h2
            className="
              exception-ref-heading

              text-[34px]
              font-[820]
              leading-[1.03]
              tracking-[-0.052em]

              text-[#07142D]

              sm:text-[44px]

              lg:text-[52px]
            "
          >
            <TailGradientHeadingText
              text={t(
                "exceptions.headline",
              )}
            />
          </h2>

          <p
            className="
              exception-ref-body

              mx-auto
              mt-4
              max-w-[850px]

              text-[13px]
              font-medium
              leading-[1.6]
              text-[#607392]

              sm:text-[15px]
            "
          >
            {t(
              "exceptions.body",
            )}
          </p>
        </div>

        {/* 2-column reference card grid */}

        <div
          className="
            mx-auto
            mt-9

            grid
            max-w-[1320px]
            gap-4

            md:grid-cols-2

            lg:gap-5
          "
        >
          {items.map(
            (
              item,
              index,
            ) => {
              const theme =
                EXCEPTION_THEMES[
                  index %
                    EXCEPTION_THEMES.length
                ];

              return (
                <motion.article
                  key={
                    item.when
                  }
                  whileHover={
                    reducedMotion
                      ? undefined
                      : {
                          y: -6,
                          rotateX: 3.2,
                          rotateY:
                            rtl
                              ? -2.6
                              : 2.6,
                          z: 10,
                        }
                  }
                  transition={{
                    duration:
                      0.28,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className={`
                    exception-card

                    group
                    relative

                    min-h-[152px]

                    [perspective:1400px]

                    ${
                      reducedMotion
                        ? "opacity-100"
                        : "opacity-0"
                    }
                  `}
                  style={{
                    transformStyle:
                      "preserve-3d",
                  }}
                >
                  {/* 3D deep rear plate */}

                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      inset-x-[16px]
                      bottom-[-14px]

                      h-[42px]

                      rounded-[22px]

                      border
                      border-white/80

                      opacity-70

                      blur-[0.35px]
                    "
                    style={{
                      background:
                        theme.soft,
                      boxShadow:
                        `0 28px 54px ${theme.shadow}`,
                      transform:
                        "translateZ(-34px)",
                    }}
                  />

                  {/* 3D middle plate */}

                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      inset-x-[8px]
                      bottom-[-8px]

                      h-[36px]

                      rounded-[21px]

                      border
                      border-white/90

                      opacity-90
                    "
                    style={{
                      background:
                        `linear-gradient(180deg,#FFFFFF,${theme.soft})`,
                      boxShadow:
                        `0 18px 34px ${theme.shadow}`,
                      transform:
                        "translateZ(-17px)",
                    }}
                  />

                  {/* actual front glass card */}

                  <div
                    className="
                      relative
                      z-10

                      flex
                      min-h-[152px]
                      items-center

                      overflow-hidden

                      rounded-[20px]

                      border

                      bg-white/92

                      px-5
                      py-5

                      shadow-[0_28px_64px_rgba(35,67,96,0.13),0_10px_26px_rgba(35,67,96,0.07),inset_0_1px_0_rgba(255,255,255,1)]

                      backdrop-blur-[18px]

                      transition-transform
                      duration-300

                      group-hover:-translate-y-[2px]

                      sm:px-6
                    "
                    style={{
                      borderColor:
                        theme.border,
                      transform:
                        "translateZ(20px)",
                    }}
                  >
                    {/* colored soft light */}

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        -start-8
                        top-1/2

                        h-28
                        w-28
                        -translate-y-1/2

                        rounded-full

                        blur-[24px]
                      "
                      style={{
                        background:
                          theme.soft,
                      }}
                    />

                    <div
                      className="
                        relative
                        z-10

                        flex
                        w-full
                        items-center
                      "
                    >
                      {/* icon */}

                      <div
                        className="
                          flex
                          w-[96px]
                          shrink-0
                          items-center
                          justify-center

                          self-stretch

                          border-e
                          border-[#DCE7F3]

                          pe-5

                          sm:w-[112px]
                          sm:pe-6
                        "
                      >
                        <div
                          className="
                            flex
                            h-[74px]
                            w-[74px]
                            items-center
                            justify-center

                            rounded-full

                            border
                            border-white

                            shadow-[0_16px_34px_rgba(40,72,100,0.11),inset_0_1px_0_rgba(255,255,255,1)]

                            [transform:translateZ(28px)]
                          "
                          style={{
                            background:
                              theme.soft,
                            color:
                              theme.color,
                          }}
                        >
                          <ExceptionIcon
                            index={
                              index
                            }
                            color={
                              theme.color
                            }
                          />
                        </div>
                      </div>

                      {/* original item content only */}

                      <div
                        className="
                          min-w-0
                          flex-1

                          ps-5

                          sm:ps-6
                        "
                      >
                        <h3
                          className="
                            exception-card-title

                            text-[16px]
                            font-[800]
                            leading-[1.24]
                            tracking-[-0.03em]

                            text-[#07142D]

                            sm:text-[18px]
                          "
                        >
                          {
                            item.when
                          }
                        </h3>

                        <p
                          className="
                            mt-1.5

                            text-[12px]
                            font-[800]
                            leading-[1.35]

                            sm:text-[13px]
                          "
                          style={{
                            color:
                              theme.color,
                          }}
                        >
                          {
                            item.outcome
                          }
                        </p>

                        <p
                          className="
                            mt-2

                            text-[12px]
                            font-medium
                            leading-[1.52]
                            text-[#667895]

                            sm:text-[13.5px]
                          "
                        >
                          {
                            item.detail
                          }
                        </p>
                      </div>
                    </div>

                    <div
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
            },
          )}
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   FINAL CTA — EXACT HOMEPAGE VERSION
============================================================================= */

function FinalCtaHeadline({
  text,
}: {
  text: string;
}) {
  const phrase =
    "trusted intelligence";

  const lower =
    text.toLowerCase();

  const index =
    lower.indexOf(
      phrase,
    );

  if (index === -1) {
    return <>{text}</>;
  }

  return (
    <>
      {text.slice(
        0,
        index,
      )}

      <span className="text-[#1685EA]">
        {text.slice(
          index,
          index +
            phrase.length,
        )}
      </span>

      {text.slice(
        index +
          phrase.length,
      )}
    </>
  );
}

function FinalCtaFeatureIcon({
  index,
}: {
  index: number;
}) {
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

  const theme =
    themes[
      index %
        themes.length
    ];

  const stroke = {
    stroke: theme.color,
    strokeWidth: 2.3,
    strokeLinecap:
      "round" as const,
    strokeLinejoin:
      "round" as const,
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
        background:
          `linear-gradient(145deg,rgba(255,255,255,.96),${theme.soft})`,
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
          <circle
            cx="24"
            cy="24"
            r="7"
            {...stroke}
          />

          <path
            d="M24 6v5M24 37v5M6 24h5M37 24h5M11.3 11.3l3.5 3.5M33.2 33.2l3.5 3.5M36.7 11.3l-3.5 3.5M14.8 33.2l-3.5 3.5"
            {...stroke}
          />

          <circle
            cx="24"
            cy="24"
            r="15"
            {...stroke}
          />
        </svg>
      )}

      {index === 2 && (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-10 w-10"
          aria-hidden="true"
        >
          <circle
            cx="19"
            cy="17"
            r="6"
            {...stroke}
          />

          <circle
            cx="31"
            cy="18"
            r="5"
            {...stroke}
          />

          <path
            d="M8 40v-4c0-7.5 4.8-12 11-12s11 4.5 11 12v4"
            {...stroke}
          />

          <path
            d="M28 27c6 .5 11 4.5 11 11v2"
            {...stroke}
          />
        </svg>
      )}
    </span>
  );
}

function FinalCtaCalloutIcon({
  index,
}: {
  index: number;
}) {
  const color =
    index === 0
      ? "#1685EA"
      : index === 1
        ? "#1685EA"
        : "#2AA845";

  if (index === 0) {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <rect
          x="8"
          y="14"
          width="16"
          height="13"
          rx="3"
          fill={color}
        />

        <path
          d="M11 14v-3a5 5 0 0 1 10 0v3"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <circle
          cx="16"
          cy="20"
          r="1.5"
          fill="#FFFFFF"
        />
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
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className="h-7 w-7"
      aria-hidden="true"
    >
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
  const rawId =
    useId();

  const clean =
    rawId.replace(
      /:/g,
      "",
    );

  const orbitId =
    `final-cta-orbit-${clean}`;

  const callouts =
    trust
      .slice(
        0,
        3,
      )
      .filter(Boolean);

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
            <circle
              r="7"
              fill="#1685EA"
              opacity="0.13"
            >
              <animateMotion
                dur="13.5s"
                repeatCount="indefinite"
              >
                <mpath
                  href={`#${orbitId}`}
                />
              </animateMotion>
            </circle>

            <circle
              r="3"
              fill="#1685EA"
            >
              <animateMotion
                dur="13.5s"
                repeatCount="indefinite"
              >
                <mpath
                  href={`#${orbitId}`}
                />
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
                y: [
                  0,
                  -6,
                  0,
                ],
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
          transformStyle:
            "preserve-3d",
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
            transform:
              "translateZ(-18px)",
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
            transform:
              rtl
                ? "rotateY(5deg) rotateX(1.5deg)"
                : "rotateY(-5deg) rotateX(1.5deg)",
            transformStyle:
              "preserve-3d",
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
              transform:
                "translateZ(18px)",
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
              transform:
                "translateZ(15px)",
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

      {callouts.map(
        (
          item,
          index,
        ) => {
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
                      y: [
                        0,
                        index === 1
                          ? 5
                          : -5,
                        0,
                      ],
                    }
              }
              transition={{
                duration:
                  8.3 +
                  index *
                    0.8,
                repeat:
                  Infinity,
                ease:
                  "easeInOut",
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
                <FinalCtaCalloutIcon
                  index={index}
                />
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
        },
      )}
    </div>
  );
}

function FinalCtaSection({
  trust,
}: {
  trust: string[];
}) {
  const {
    t,
    i18n,
  } = useTranslation(
    "home",
  );

  const {
    t: tc,
  } = useTranslation(
    "common",
  );

  const sectionRef =
    useRef<HTMLElement>(
      null,
    );

  const backgroundRef =
    useRef<HTMLDivElement>(
      null,
    );

  const reducedMotion =
    useReducedMotion() ??
    false;

  const rtl =
    i18n.dir() ===
    "rtl";

  const centerTrust =
    trust
      .slice(
        0,
        3,
      )
      .filter(Boolean);

  const lowerTrust =
    trust
      .slice(
        3,
        6,
      )
      .filter(Boolean);

  useEffect(() => {
    if (
      reducedMotion ||
      !sectionRef.current
    ) {
      return;
    }

    gsap.registerPlugin(
      ScrollTrigger,
    );

    const ctx =
      gsap.context(
        () => {
          const callouts =
            gsap.utils.toArray<HTMLElement>(
              ".final-cta-callout",
            );

          /*
            Scroll-driven reveal:
            - short travel distances avoid jank
            - force3D keeps transforms on the compositor
            - the sequence finishes before the section is mostly past
            - floating Framer animations continue after reveal
          */
          gsap.set(
            callouts,
            {
              opacity: 0,
              filter:
                "blur(5px)",
            },
          );

          const timeline =
            gsap.timeline({
              defaults: {
                ease:
                  "power1.inOut",
              },

              scrollTrigger: {
                trigger:
                  sectionRef.current,

                start:
                  "top 91%",

                end:
                  "66% 34%",

                scrub:
                  1.65,

                invalidateOnRefresh:
                  true,

                fastScrollEnd:
                  true,
              },
            });

          timeline
            .fromTo(
              ".final-cta-top-line",
              {
                opacity: 0,
                scaleX: 0.12,
                transformOrigin:
                  rtl
                    ? "100% 50%"
                    : "0% 50%",
              },
              {
                opacity: 1,
                scaleX: 1,
                duration: 0.64,
                ease:
                  "power1.out",
              },
            )

            .fromTo(
              ".final-cta-copy",
              {
                opacity: 0,
                y: 22,
                x:
                  rtl
                    ? 14
                    : -14,
                scale: 0.997,
                force3D: true,
              },
              {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                duration: 0.88,
                ease:
                  "power1.inOut",
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
                ease:
                  "power1.out",
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
                ease:
                  "power1.inOut",
                force3D: true,
              },
              "-=0.3",
            )

            .fromTo(
              ".final-cta-visual",
              {
                opacity: 0,
                x:
                  rtl
                    ? -24
                    : 24,
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
                ease:
                  "power1.inOut",
                force3D: true,
              },
              "-=0.48",
            )

            .fromTo(
              ".final-cta-document",
              {
                opacity: 0.4,
                filter:
                  "blur(3px)",
              },
              {
                opacity: 1,
                filter:
                  "blur(0px)",
                duration: 0.52,
                ease:
                  "power1.out",
              },
              "-=0.64",
            )

            .to(
              callouts,
              {
                opacity: 1,
                filter:
                  "blur(0px)",
                stagger: 0.1,
                duration: 0.5,
                ease:
                  "power1.out",
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
                ease:
                  "power1.out",
              },
              "-=0.3",
            );

          if (
            backgroundRef.current
          ) {
            gsap.fromTo(
              backgroundRef.current,
              {
                yPercent:
                  -0.45,
              },
              {
                yPercent:
                  0.75,

                ease:
                  "none",

                scrollTrigger: {
                  trigger:
                    sectionRef.current,

                  start:
                    "top bottom",

                  end:
                    "bottom top",

                  scrub:
                    2.8,

                  invalidateOnRefresh:
                    true,
                },
              },
            );
          }
        },
        sectionRef,
      );

    return () => {
      ctx.revert();
    };
  }, [
    reducedMotion,
    rtl,
  ]);

  return (
    <section
      ref={sectionRef}
      dir={
        rtl
          ? "rtl"
          : "ltr"
      }
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
                  y: [
                    0,
                    -7,
                    0,
                  ],
                }
          }
          transition={{
            duration: 13,
            repeat:
              Infinity,
            ease:
              "easeInOut",
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
              <FinalCtaHeadline
                text={t(
                  "final.headline",
                )}
              />
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
              {t(
                "final.body",
              )}
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
                {tc(
                  "cta.book",
                )}

                <span
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  <ArrowIcon
                    rtl={rtl}
                  />
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

                {tc(
                  "cta.how",
                )}
              </LocaleLink>
            </div>

            {lowerTrust.length >
              0 && (
              <div
                className="
                  mt-8

                  grid
                  gap-3

                  sm:grid-cols-3
                "
              >
                {lowerTrust.map(
                  (
                    item,
                    index,
                  ) => (
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
                  ),
                )}
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
              {centerTrust.map(
                (
                  item,
                  index,
                ) => (
                  <motion.div
                    key={`${item}-${index}`}
                    whileHover={
                      reducedMotion
                        ? undefined
                        : {
                            x:
                              rtl
                                ? -3
                                : 3,
                            y: -2,
                          }
                    }
                    transition={{
                      duration:
                        0.35,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    className="
                      final-cta-feature

                      flex
                      min-w-0
                      items-center
                      gap-4
                    "
                  >
                    <FinalCtaFeatureIcon
                      index={index}
                    />

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
                ),
              )}
            </div>
          </div>

          {/* right 3D glass visual */}

          <FinalCtaDocumentVisual
            trust={trust}
            reducedMotion={
              reducedMotion
            }
            rtl={rtl}
          />
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   PAGE
============================================================================= */

export function HowItWorksPage() {
  const {
    t,
    i18n,
  } = useTranslation(
    "howItWorks",
  );

  const {
    t: th,
  } = useTranslation(
    "home",
  );

  const trustRaw =
    th(
      "trust",
      {
        returnObjects:
          true,
      },
    );

  const trust =
    Array.isArray(
      trustRaw,
    )
      ? (trustRaw as string[])
      : [];


  const stepsRaw =
    t(
      "steps",
      {
        returnObjects:
          true,
      },
    );

  const exceptionsRaw =
    t(
      "exceptions.items",
      {
        returnObjects:
          true,
      },
    );

  const steps =
    useMemo(
      () =>
        Array.isArray(
          stepsRaw,
        )
          ? (stepsRaw as {
              title: string;
              text: string;
              audit: string;
              status: string;
            }[])
          : [],
      [
        stepsRaw,
      ],
    );

  const exceptions =
    useMemo(
      () =>
        Array.isArray(
          exceptionsRaw,
        )
          ? (exceptionsRaw as {
              when: string;
              outcome: string;
              detail: string;
            }[])
          : [],
      [
        exceptionsRaw,
      ],
    );

  const [
    active,
    setActive,
  ] = useState(0);

  const rtl =
    i18n.dir() ===
    "rtl";

  useEffect(() => {
    if (
      active >=
      steps.length
    ) {
      setActive(0);
    }
  }, [
    active,
    steps.length,
  ]);

  return (
    <div
      dir={
        rtl
          ? "rtl"
          : "ltr"
      }
    >
      <Seo
        page="how"
        path="/how-it-works"
      />

      <HowHero
        rtl={rtl}
      />

      <OperationalPath
        steps={
          steps
        }
        active={
          active
        }
        setActive={
          setActive
        }
        rtl={rtl}
      />

      <ExceptionsSection
        items={
          exceptions
        }
      />

      <FinalCtaSection
        trust={trust}
      />
    </div>
  );
}
