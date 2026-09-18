import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useTranslation } from "react-i18next";

import { Seo } from "@/lib/seo";
import { LocaleLink } from "@/components/LocaleLink";
import { VideoModal } from "@/components/VideoModal";


/* =============================================================================
   BRAND
============================================================================= */

const BRAND = {
  red: "#E5232A",
  green: "#2AA845",
  cyan: "#22A3E0",
  purple: "#5C6BC0",
  gold: "#F2C94C",
  blue: "#1685EA",
};

const LOGO_SRC = "/brand/idoc-hive-logo.png";

/* =============================================================================
   COMMON
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

/* =============================================================================
   TRUST ICONS
============================================================================= */

function TrustIcon({
  index,
}: {
  index: number;
}) {
  const common = {
    viewBox: "0 0 32 32",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className:
      "h-[30px] w-[30px] sm:h-[32px] sm:w-[32px] lg:h-[34px] lg:w-[34px]",
    "aria-hidden": true,
  };

  if (index === 0) {
    return (
      <svg {...common}>
        <path
          d="M16 3.5 26 7.4v7.5c0 6.2-3.8 10.9-10 13.6C9.8 25.8 6 21.1 6 14.9V7.4L16 3.5Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        <path
          d="m11.2 15.8 3.1 3.1 6.7-7"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg {...common}>
        <ellipse
          cx="16"
          cy="7.5"
          rx="9"
          ry="4"
          stroke="currentColor"
          strokeWidth="2.2"
        />

        <path
          d="M7 7.5v7c0 2.2 4 4 9 4s9-1.8 9-4v-7"
          stroke="currentColor"
          strokeWidth="2.2"
        />

        <path
          d="M7 14.5v7c0 2.2 4 4 9 4s9-1.8 9-4v-7"
          stroke="currentColor"
          strokeWidth="2.2"
        />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg {...common}>
        <rect
          x="7"
          y="13"
          width="18"
          height="14"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="2.2"
        />

        <path
          d="M11 13V9.5a5 5 0 0 1 10 0V13"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        <path
          d="M16 18v4"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        <circle
          cx="16"
          cy="18"
          r="1.4"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (index === 3) {
    return (
      <svg {...common}>
        <circle
          cx="16"
          cy="9"
          r="5"
          stroke="currentColor"
          strokeWidth="2.2"
        />

        <path
          d="M7.5 27v-2c0-5 3.7-8.4 8.5-8.4s8.5 3.4 8.5 8.4v2"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        <path
          d="m21.5 18.5 2 2 3.8-4"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (index === 4) {
    return (
      <svg {...common}>
        <circle
          cx="16"
          cy="16"
          r="4.5"
          stroke="currentColor"
          strokeWidth="2"
        />

        <path
          d="
            M13.7 3.8h4.6l.7 3
            c1 .3 1.9.7 2.8 1.2l2.7-1.6
            3.2 3.2-1.6 2.7
            c.5.9.9 1.8 1.2 2.8l3 .7v4.6l-3 .7
            c-.3 1-.7 1.9-1.2 2.8l1.6 2.7-3.2 3.2-2.7-1.6
            c-.9.5-1.8.9-2.8 1.2l-.7 3h-4.6l-.7-3
            c-1-.3-1.9-.7-2.8-1.2l-2.7 1.6-3.2-3.2 1.6-2.7
            c-.5-.9-.9-1.8-1.2-2.8l-3-.7v-4.6l3-.7
            c.3-1 .7-1.9 1.2-2.8L4.3 9.6l3.2-3.2L10.2 8
            c.9-.5 1.8-.9 2.8-1.2l.7-3Z
          "
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path
        d="M16 3.5 26 7.4v7.5c0 6.2-3.8 10.9-10 13.6C9.8 25.8 6 21.1 6 14.9V7.4L16 3.5Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />

      <path
        d="m11.2 15.7 3.3 3.2 6.5-6.8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =============================================================================
   HERO HEADLINE
============================================================================= */

function HeroHeadline({
  text,
}: {
  text: string;
}) {
  const phrase = "governed intelligence";
  const index = text.toLowerCase().indexOf(phrase);

  if (index === -1) {
    return <>{text}</>;
  }

  return (
    <>
      {text.slice(0, index)}

      <span
        className="
          inline-block
          whitespace-nowrap
          bg-[linear-gradient(90deg,#1685EA_0%,#2AA845_32%,#F2C94C_66%,#E5232A_100%)]
          bg-clip-text
          text-transparent
        "
      >
        {text.slice(index)}
      </span>
    </>
  );
}

/* =============================================================================
   WIRES
============================================================================= */

type WireProps = {
  path: string;
  color: string;
  dashDuration?: number;
  signalDuration?: number;
  delay?: number;
  reducedMotion: boolean;
};

function AnimatedWire({
  path,
  color,
  dashDuration = 3.2,
  signalDuration = 5,
  delay = 0,
  reducedMotion,
}: WireProps) {
  return (
    <g>
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.045"
      />

      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.2"
      />

      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="2.3 5.8"
        animate={
          reducedMotion
            ? undefined
            : {
                strokeDashoffset: [0, -42],
              }
        }
        transition={{
          duration: dashDuration,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {!reducedMotion && (
        <>
          <circle
            r="5"
            fill={color}
            opacity="0.18"
            filter="url(#wireBlur)"
          >
            <animateMotion
              path={path}
              dur={`${signalDuration}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
          </circle>

          <circle
            r="2.8"
            fill={color}
            filter="url(#wireGlow)"
          >
            <animateMotion
              path={path}
              dur={`${signalDuration}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
          </circle>

          <circle
            r="0.95"
            fill="#FFFFFF"
          >
            <animateMotion
              path={path}
              dur={`${signalDuration}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        </>
      )}
    </g>
  );
}

/* =============================================================================
   PIPELINE ICONS
============================================================================= */

function PaperPipelineIcon() {
  return (
    <g transform="translate(128 55) scale(0.82)">
      <rect
        x="-7"
        y="-11"
        width="14"
        height="22"
        rx="2"
        fill={BRAND.blue}
      />

      <path
        d="M2-11 7-6H2Z"
        fill="#7ED0F6"
      />

      <path
        d="M-4-4H4M-4 0H4M-4 4H2"
        stroke="#FFFFFF"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </g>
  );
}

function DataPipelineIcon() {
  return (
    <g
      transform="translate(208 55) scale(0.82)"
      fill="none"
      stroke={BRAND.blue}
      strokeWidth="1.7"
    >
      <ellipse
        cx="0"
        cy="-7"
        rx="8"
        ry="3.4"
      />

      <path d="M-8-7V0c0 2 3.6 3.5 8 3.5S8 2 8 0v-7" />

      <path d="M-8 0v7c0 2 3.6 3.5 8 3.5S8 9 8 7V0" />
    </g>
  );
}

function InformationPipelineIcon() {
  return (
    <g
      transform="translate(292 55) scale(0.82)"
      fill="none"
      stroke={BRAND.green}
      strokeWidth="1.7"
      strokeLinecap="round"
    >
      <circle cx="0" cy="0" r="3" />
      <circle cx="-9" cy="-8" r="2.4" />
      <circle cx="9" cy="-8" r="2.4" />
      <circle cx="-9" cy="9" r="2.4" />
      <circle cx="9" cy="9" r="2.4" />

      <path
        d="
          m-7-6 5 4
          M7-6 2-2
          M-7 7l5-4
          M7 7 2 3
        "
      />
    </g>
  );
}

function IntelligencePipelineIcon() {
  return (
    <g
      transform="translate(382 55) scale(0.82)"
      fill="none"
      stroke={BRAND.gold}
      strokeLinecap="round"
    >
      <path
        d="
          M0-11
          C-7-11-11-6-11 0
          C-11 4-9 7-6 9
          V12
          H6
          V9
          C9 7 11 4 11 0
          C11-6 7-11 0-11Z
        "
        strokeWidth="1.7"
      />

      <path
        d="
          M-4 15H4
          M0-17v3
          M-15-11l3 2
          M15-11l-3 2
        "
        strokeWidth="1.45"
      />
    </g>
  );
}

/* =============================================================================
   PIPELINE ARROWS — RESTORED
============================================================================= */

function PipelineChevron({
  x,
}: {
  x: number;
}) {
  return (
    <g
      transform={`translate(${x} 55) scale(0.7)`}
      opacity="0.95"
    >
      <path
        d="M-3.5-5 1.5 0l-5 5"
        fill="none"
        stroke="#000"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/* =============================================================================
   RIGHT HERO CARD ICONS
============================================================================= */

function HeroAiAnswerIcon() {
  return (
    <g transform="translate(318.5 129.5)">
      <rect
        x="-13"
        y="-13"
        width="26"
        height="26"
        rx="7"
        fill="#ECF7FF"
        stroke="#FFFFFF"
      />

      <g
        fill="none"
        stroke={BRAND.blue}
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M-2-7c-3 0-5 2-5 4 0 1 .4 2 1.2 2.8C-7.2.4-8 1.7-8 3.2c0 2.4 2 4.3 4.5 4.3.6 0 1.2-.1 1.7-.3" />

        <path d="M2-7c3 0 5 2 5 4 0 1-.4 2-1.2 2.8C7.2.4 8 1.7 8 3.2c0 2.4-2 4.3-4.5 4.3-.6 0-1.2-.1-1.7-.3" />

        <path d="M-2-7v14M2-7v14" />

        <path d="M-6-2h4M2-2h4M-6 3h4M2 3h4" />
      </g>

      <path
        d="M-10-9v4M-12-7h4"
        stroke={BRAND.cyan}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </g>
  );
}

function HeroSourceIcon() {
  return (
    <g transform="translate(318.5 197.5)">
      <rect
        x="-13"
        y="-13"
        width="26"
        height="26"
        rx="7"
        fill="#E7FBF7"
        stroke="#FFFFFF"
      />

      <path
        d="M-6-8H3l5 5v12H-6Z"
        fill="#22BFA5"
      />

      <path
        d="M3-8v5h5"
        fill="#8CE4D4"
      />

      <path
        d="M-2-1h7M-2 2h7M-2 5h5"
        stroke="#FFFFFF"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </g>
  );
}

function HeroAuditIcon() {
  return (
    <g transform="translate(318.5 246.5)">
      <rect
        x="-13"
        y="-13"
        width="26"
        height="26"
        rx="7"
        fill="#E8FAFC"
        stroke="#FFFFFF"
      />

      <path
        d="
          M0-8
          8-5
          v6
          c0 6-3.5 10-8 12
          -4.5-2-8-6-8-12
          v-6Z
        "
        fill="#20B9C7"
      />

      <path
        d="m-4 1 3 3 5-6"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/* =============================================================================
   EXACT LOGO
============================================================================= */

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
   HERO CARD CONTENT
============================================================================= */

function AIAnswerContent({
  arabic,
}: {
  arabic: boolean;
}) {
  return (
    <div
      dir={arabic ? "rtl" : "ltr"}
      className="h-full w-full overflow-hidden"
    >
      <div className="flex min-w-0 items-start justify-between gap-1">
        <strong
          className="
            min-w-0
            truncate
            text-[7.4px]
            font-bold
            leading-none
            text-slate-900
          "
        >
          {arabic
            ? "إجابة الذكاء الاصطناعي"
            : "AI Answer"}
        </strong>

        <span className="shrink-0 text-[10px] leading-none">
          {arabic ? "‹" : "›"}
        </span>
      </div>

      <p
        className="
          max-w-full
          overflow-hidden
          text-[6.8px]
          font-medium
          text-black
        "
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
        }}
      >
        {arabic
          ? "استناداً إلى 12 مستنداً مصدرياً، إليك المعلومات ذات الصلة..."
          : '"Based on 12 source documents, here\'s the relevant information..."'}
      </p>
    </div>
  );
}

function SourceCitationContent({
  arabic,
}: {
  arabic: boolean;
}) {
  return (
    <div
      dir={arabic ? "rtl" : "ltr"}
      className="h-full w-full overflow-hidden"
    >
      <div className="flex min-w-0 items-center justify-between gap-1">
        <strong
          className="
            min-w-0
            truncate
            text-[7.2px]
            font-bold
            leading-none
            text-slate-900
          "
        >
          {arabic
            ? "مراجع المصادر"
            : "Source Citations"}
        </strong>

        <span className="shrink-0 text-[10px] leading-none">
          {arabic ? "‹" : "›"}
        </span>
      </div>

      <div
        className="
          mt-[5px]
          flex
          max-w-full
          items-center
          gap-[3px]
          overflow-hidden
        "
      >
        {[
          ["PDF", BRAND.red],
          ["W", BRAND.blue],
          ["XL", BRAND.green],
          ["P", "#F2A21B"],
        ].map(([label, color]) => (
          <span
            key={label}
            className="
              flex
              h-[16px]
              min-w-[16px]
              shrink-0
              items-center
              justify-center
              rounded-[3px]
              px-[2px]
              text-[5.2px]
              font-bold
              leading-none
              text-white
            "
            style={{
              backgroundColor: color,
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function AuditTrailContent({
  arabic,
}: {
  arabic: boolean;
}) {
  const rows = arabic
    ? [
        "بدء الاستعلام",
        "فحص الصلاحيات",
        "استرجاع المصادر",
        "إنشاء الإجابة",
      ]
    : [
        "Query initiated",
        "Permission check",
        "Sources retrieved",
        "Answer generated",
      ];

  return (
    <div
      dir={arabic ? "rtl" : "ltr"}
      className="h-full w-full overflow-hidden"
    >
      <div className="flex min-w-0 items-center justify-between gap-1">
        <strong
          className="
            min-w-0
            truncate
            text-[7.2px]
            font-bold
            leading-none
            text-slate-900
          "
        >
          {arabic
            ? "سجل التدقيق"
            : "Audit Trail"}
        </strong>

        <span className="shrink-0 text-[10px] leading-none">
          {arabic ? "‹" : "›"}
        </span>
      </div>

      <div className="mt-[4px] space-y-[2px]">
        {rows.map((row) => (
          <div
            key={row}
            className="flex min-w-0 items-center gap-[3px]"
          >
            <span
              className="
                flex
                h-[8px]
                w-[8px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#21B94B]
                text-[4px]
                font-bold
                text-white
              "
            >
              ✓
            </span>

            <span className="min-w-0 truncate text-[7px] text-black">
              {row}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =============================================================================
   HERO DIAGRAM
============================================================================= */

function HeroDocumentDiagram() {
  const { i18n } = useTranslation();

  const reducedMotion =
    useReducedMotion() ?? false;

  const [
    logoHovered,
    setLogoHovered,
  ] = useState(false);

  const arabic = i18n.language
    .toLowerCase()
    .startsWith("ar");

  const text = useMemo(
    () =>
      arabic
        ? {
            paper: "المستندات",
            paperSub: "المسح والإدخال",
            data: "البيانات",
            dataSub: "الاستخراج والهيكلة",
            information: "المعلومات",
            informationSub: "التصنيف والحوكمة",
            intelligence: "الذكاء",
            intelligenceSub:
              "اسأل واحصل على الإجابات",
            control:
              "بياناتك. بنيتك التحتية. سيطرتك.",
          }
        : {
            paper: "Paper",
            paperSub: "Scan and ingest",
            data: "Data",
            dataSub: "Extract and structure",
            information: "Information",
            informationSub: "Classify and govern",
            intelligence: "Intelligence",
            intelligenceSub: "Ask and get answers",
            control:
              "Your Data. Your Infrastructure. Your Control.",
          },
    [arabic],
  );

  const pdfWire =
    "M94 143 C110 143 115 152 126 152 C141 152 148 159 162 159";

  const docxWire =
    "M94 178 C115 178 134 178 162 178";

  const xlsxWire =
    "M94 213 C111 213 119 207 131 207 C145 207 150 202 162 202";

  const pptxWire =
    "M94 248 C111 248 119 240 132 240 C145 240 151 232 162 232";

  const aiWire =
    "M248 176 C270 176 274 169 276 154 C278 142 283 138 298 138";

  const citationWire =
    "M248 201 C267 201 282 201 298 201";

  const auditWire =
    "M248 229 C267 229 275 237 279 248 C283 259 288 263 298 263";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        mx-auto
        w-[116%]
        -translate-x-[7%]

        sm:w-full
        sm:translate-x-0
      "
    >
      <svg
        viewBox="0 0 458 327"
        preserveAspectRatio="xMidYMid meet"
        className="block h-auto w-full overflow-visible"
        role="img"
        aria-label={
          arabic
            ? "مخطط معالجة المستندات"
            : "Document intelligence workflow"
        }
      >
        <defs>
          <linearGradient
            id="heroTopGlass"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#FFFFFF"
              stopOpacity="0.99"
            />

            <stop
              offset="70%"
              stopColor="#FFFFFF"
              stopOpacity="0.95"
            />

            <stop
              offset="100%"
              stopColor="#EDF9FF"
              stopOpacity="0.86"
            />
          </linearGradient>

          <linearGradient
            id="heroGlassDark"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#F7FCFF"
              stopOpacity="0.96"
            />

            <stop
              offset="35%"
              stopColor="#DCEEF8"
              stopOpacity="0.88"
            />

            <stop
              offset="72%"
              stopColor="#BBD6E7"
              stopOpacity="0.76"
            />

            <stop
              offset="100%"
              stopColor="#8FB3C9"
              stopOpacity="0.66"
            />
          </linearGradient>

          <linearGradient
            id="heroGlassMiddle"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#FFFFFF"
              stopOpacity="0.92"
            />

            <stop
              offset="58%"
              stopColor="#D5EAF5"
              stopOpacity="0.82"
            />

            <stop
              offset="100%"
              stopColor="#AAC9DA"
              stopOpacity="0.68"
            />
          </linearGradient>

          <linearGradient
            id="heroGlassLeftEdge"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#B7D2E1"
              stopOpacity="0.88"
            />

            <stop
              offset="100%"
              stopColor="#779AAE"
              stopOpacity="0.7"
            />
          </linearGradient>

          <linearGradient
            id="heroGlassRightEdge"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#EAF7FC"
              stopOpacity="0.9"
            />

            <stop
              offset="100%"
              stopColor="#9EBBCD"
              stopOpacity="0.7"
            />
          </linearGradient>

          <linearGradient
            id="logoRearGlassTop"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#FFFFFF"
              stopOpacity="0.34"
            />

            <stop
              offset="100%"
              stopColor="#7DA9C0"
              stopOpacity="0.09"
            />
          </linearGradient>

          <linearGradient
            id="logoRearLeft"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#CDEAF6"
              stopOpacity="0.2"
            />

            <stop
              offset="100%"
              stopColor="#416C83"
              stopOpacity="0.13"
            />
          </linearGradient>

          <linearGradient
            id="logoRearRight"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#FFFFFF"
              stopOpacity="0.24"
            />

            <stop
              offset="100%"
              stopColor="#8CB6CA"
              stopOpacity="0.12"
            />
          </linearGradient>

          <radialGradient id="heroCenterGlow">
            <stop
              offset="0%"
              stopColor={BRAND.cyan}
              stopOpacity={
                logoHovered
                  ? "0.64"
                  : "0.44"
              }
            />

            <stop
              offset="36%"
              stopColor={BRAND.purple}
              stopOpacity={
                logoHovered
                  ? "0.28"
                  : "0.16"
              }
            />

            <stop
              offset="100%"
              stopColor="#FFFFFF"
              stopOpacity="0"
            />
          </radialGradient>

          <filter
            id="heroPanelShadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="0"
              dy="6"
              stdDeviation="7"
              floodColor="#4E6C83"
              floodOpacity="0.1"
            />
          </filter>

          <filter
            id="heroStageShadow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feDropShadow
              dx="0"
              dy="12"
              stdDeviation="10"
              floodColor="#264D68"
              floodOpacity="0.28"
            />
          </filter>

          <filter
            id="heroDeepShadow"
            x="-150%"
            y="-150%"
            width="400%"
            height="400%"
          >
            <feDropShadow
              dx="0"
              dy="15"
              stdDeviation="13"
              floodColor="#14364D"
              floodOpacity="0.24"
            />
          </filter>

          <filter
            id="wireGlow"
            x="-500%"
            y="-500%"
            width="1000%"
            height="1000%"
          >
            <feGaussianBlur
              stdDeviation="1.7"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="wireBlur"
            x="-500%"
            y="-500%"
            width="1000%"
            height="1000%"
          >
            <feGaussianBlur stdDeviation="3.2" />
          </filter>

          <filter
            id="heroLogoGlowBlur"
            x="-150%"
            y="-300%"
            width="400%"
            height="700%"
          >
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>

        <path
          d="M423 0H458V101L441 108L417 62Z"
          fill="#DFF5FC"
          opacity="0.66"
        />

        <path
          d="M0 24L22 29V72L0 87Z"
          fill="#EAF7FC"
          opacity="0.62"
        />

        <ellipse
          cx="223"
          cy="210"
          rx="180"
          ry="108"
          fill="#ECF9FF"
          opacity="0.26"
        />

        {/* =============================================================
            TOP PIPELINE — NOTHING REMOVED
        ============================================================== */}

        <motion.g
          initial={{
            opacity: 0,
            y: -7,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.55,
          }}
        >
          <rect
            x="89"
            y="31"
            width="340"
            height="72"
            rx="10"
            fill="url(#heroTopGlass)"
            stroke="#FFFFFF"
            strokeWidth="1"
            filter="url(#heroPanelShadow)"
          />

          <PaperPipelineIcon />

          {/* PAPER → DATA */}
          <PipelineChevron x={168} />

          <DataPipelineIcon />

          {/* DATA → INFORMATION */}
          <PipelineChevron x={250} />

          <InformationPipelineIcon />

          {/* INFORMATION → INTELLIGENCE */}
          <PipelineChevron x={338} />

          <IntelligencePipelineIcon />

          <text
            x="128"
            y="79"
            textAnchor="middle"
            fontSize="7.3"
            fontWeight="700"
            fill="#15263A"
          >
            {text.paper}
          </text>

          <text
            x="208"
            y="79"
            textAnchor="middle"
            fontSize="7.3"
            fontWeight="700"
            fill="#15263A"
          >
            {text.data}
          </text>

          <text
            x="292"
            y="79"
            textAnchor="middle"
            fontSize="7.3"
            fontWeight="700"
            fill="#15263A"
          >
            {text.information}
          </text>

          <text
            x="382"
            y="79"
            textAnchor="middle"
            fontSize="7.3"
            fontWeight="700"
            fill="#15263A"
          >
            {text.intelligence}
          </text>

          <text
            x="128"
            y="91"
            textAnchor="middle"
            fontSize="5.5"
            fill="#000"
          >
            {text.paperSub}
          </text>

          <text
            x="208"
            y="91"
            textAnchor="middle"
            fontSize="5.5"
            fill="#000"
          >
            {text.dataSub}
          </text>

          <text
            x="292"
            y="91"
            textAnchor="middle"
            fontSize="5.5"
            fill="#000"
          >
            {text.informationSub}
          </text>

          <text
            x="382"
            y="91"
            textAnchor="middle"
            fontSize="5.5"
            fill="#000"
          >
            {text.intelligenceSub}
          </text>
        </motion.g>

        {/* =============================================================
            LEFT PAPER STACK
        ============================================================== */}

        <motion.g
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, -2.2, 0],
                }
          }
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {Array.from({
            length: 12,
          }).map((_, index) => (
            <g
              key={index}
              transform={`translate(${
                index * 0.9
              } ${-index * 1.55})`}
            >
              <polygon
                points="7,148 44,129 77,146 40,166"
                fill="#FFFFFF"
                stroke="#D7E6EF"
                strokeWidth="0.65"
              />

              <path
                d="
                  M18 146 44 133
                  M22 150l30-15
                  M27 154l30-15
                "
                stroke="#DBE9F1"
                strokeWidth="0.65"
              />
            </g>
          ))}

          <polygon
            points="5,198 31,184 55,198 30,213"
            fill="#EDF7FC"
          />

          <polygon
            points="5,198 30,213 30,247 5,232"
            fill="#DCEAF2"
          />

          <polygon
            points="30,213 55,198 55,232 30,247"
            fill="#F9FCFE"
          />
        </motion.g>

        {/* =============================================================
            FILE CARDS
        ============================================================== */}

        {[
          {
            y: 129,
            label: "PDF",
            color: BRAND.red,
          },
          {
            y: 164,
            label: "DOCX",
            color: BRAND.blue,
          },
          {
            y: 199,
            label: "XLSX",
            color: BRAND.green,
          },
          {
            y: 234,
            label: "PPTX",
            color: "#F2A21B",
          },
        ].map((card) => (
          <g key={card.label}>
            <rect
              x="67"
              y={card.y}
              width="27"
              height="22"
              rx="3"
              fill={card.color}
              filter="url(#heroPanelShadow)"
            />

            <text
              x="80.5"
              y={card.y + 14}
              textAnchor="middle"
              fontSize="4.3"
              fontWeight="800"
              fill="#FFFFFF"
            >
              {card.label}
            </text>
          </g>
        ))}

        <AnimatedWire
          path={pdfWire}
          color={BRAND.red}
          signalDuration={4.7}
          reducedMotion={reducedMotion}
        />

        <AnimatedWire
          path={docxWire}
          color={BRAND.blue}
          signalDuration={5}
          reducedMotion={reducedMotion}
        />

        <AnimatedWire
          path={xlsxWire}
          color={BRAND.green}
          signalDuration={5.3}
          reducedMotion={reducedMotion}
        />

        <AnimatedWire
          path={pptxWire}
          color={BRAND.gold}
          signalDuration={5.6}
          reducedMotion={reducedMotion}
        />

        {/* =============================================================
            CENTER LOGO
        ============================================================== */}

        <motion.g
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, -2, 0],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ellipse
            cx="204"
            cy="271"
            rx="64"
            ry="15"
            fill="#31556D"
            opacity="0.18"
            filter="url(#heroDeepShadow)"
          />

          <ellipse
            cx="204"
            cy="241"
            rx={logoHovered ? 72 : 60}
            ry={logoHovered ? 34 : 26}
            fill="url(#heroCenterGlow)"
            filter="url(#heroLogoGlowBlur)"
          />

          <polygon
            points="151,225 204,254 258,225 204,196"
            fill="url(#heroGlassDark)"
            stroke="#FFFFFF"
            strokeWidth="1.4"
            filter="url(#heroStageShadow)"
          />

          <polygon
            points="151,225 204,254 204,267 151,238"
            fill="url(#heroGlassLeftEdge)"
            opacity="0.84"
          />

          <polygon
            points="204,254 258,225 258,238 204,267"
            fill="url(#heroGlassRightEdge)"
            opacity="0.9"
          />

          <polygon
            points="165,197 204,219 244,197 204,175"
            fill="url(#heroGlassMiddle)"
            stroke="#FFFFFF"
            strokeWidth="1.2"
          />

          <motion.g
            onMouseEnter={() =>
              setLogoHovered(true)
            }
            onMouseLeave={() =>
              setLogoHovered(false)
            }
            animate={
              logoHovered &&
              !reducedMotion
                ? {
                    y: -3,
                    scale: 1.035,
                  }
                : {
                    y: 0,
                    scale: 1,
                  }
            }
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              transformOrigin:
                "204px 194px",
            }}
          >
            <polygon
              points="158,160 204,134 250,160 204,187"
              fill="url(#logoRearGlassTop)"
              stroke="#FFFFFF"
            />

            <polygon
              points="158,160 204,187 204,240 158,214"
              fill="url(#logoRearLeft)"
            />

            <polygon
              points="204,187 250,160 250,214 204,240"
              fill="url(#logoRearRight)"
            />

            <foreignObject
              x="158"
              y="137"
              width="92"
              height="111"
              pointerEvents="none"
            >
              <div
                className="h-full w-full"
                style={{
                  filter:
                    "brightness(1.025) saturate(1.16) contrast(1.055)",
                }}
              >
                <ExactHiveLogo />
              </div>
            </foreignObject>
          </motion.g>
        </motion.g>

        {/* =============================================================
            RIGHT WIRES
        ============================================================== */}

        <AnimatedWire
          path={aiWire}
          color={BRAND.cyan}
          signalDuration={5}
          reducedMotion={reducedMotion}
        />

        <AnimatedWire
          path={citationWire}
          color={BRAND.green}
          signalDuration={5.3}
          reducedMotion={reducedMotion}
        />

        <AnimatedWire
          path={auditWire}
          color={BRAND.gold}
          signalDuration={5.6}
          reducedMotion={reducedMotion}
        />

        {/* =============================================================
            AI ANSWER CARD
        ============================================================== */}

        <rect
          x="298"
          y="112"
          width="131"
          height="56"
          rx="9"
          fill="url(#heroTopGlass)"
          stroke="#FFFFFF"
          filter="url(#heroPanelShadow)"
        />

        <HeroAiAnswerIcon />

        <foreignObject
          x="338"
          y="120"
          width="81"
          height="38"
        >
          <AIAnswerContent arabic={arabic} />
        </foreignObject>

        {/* =============================================================
            SOURCE CITATIONS
        ============================================================== */}

        <rect
          x="298"
          y="175"
          width="131"
          height="46"
          rx="9"
          fill="url(#heroTopGlass)"
          stroke="#FFFFFF"
          filter="url(#heroPanelShadow)"
        />

        <HeroSourceIcon />

        <foreignObject
          x="338"
          y="184"
          width="81"
          height="28"
        >
          <SourceCitationContent arabic={arabic} />
        </foreignObject>

        {/* =============================================================
            AUDIT TRAIL
        ============================================================== */}

        <rect
          x="298"
          y="225"
          width="131"
          height="79"
          rx="9"
          fill="url(#heroTopGlass)"
          stroke="#FFFFFF"
          filter="url(#heroPanelShadow)"
        />

        <HeroAuditIcon />

        <foreignObject
          x="338"
          y="233"
          width="81"
          height="62"
        >
          <AuditTrailContent arabic={arabic} />
        </foreignObject>

        <text
          x="204"
          y="294"
          textAnchor="middle"
          fontSize="6"
          fontWeight="600"
          fill="#000"
        >
          {text.control}
        </text>
      </svg>
    </motion.div>
  );
}

/* =============================================================================
   TRUST ITEM
============================================================================= */

function TrustItem({
  text,
  index,
}: {
  text: string;
  index: number;
}) {
  const reducedMotion =
    useReducedMotion() ?? false;

  const colors = [
    BRAND.green,
    BRAND.blue,
    BRAND.red,
    BRAND.gold,
    BRAND.purple,
    "#536A8D",
  ];

  const color =
    colors[index % colors.length];

  return (
    <motion.li
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: 25,
              scale: 0.95,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration:
          reducedMotion
            ? 0
            : 0.7,
        delay:
          reducedMotion
            ? 0
            : index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        flex
        min-w-0
        items-center
        gap-3
        border-b
        border-slate-100
        px-2
        py-4

        sm:px-3

        lg:border-b-0
        lg:border-e
        lg:border-slate-200
        lg:px-4
        lg:last:border-e-0
      "
    >
      <span
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
        "
        style={{
          color,
        }}
      >
        <TrustIcon index={index} />
      </span>

      <span
        className="
          min-w-0
          text-[10px]
          font-medium
          leading-[1.45]
          text-slate-600

          sm:text-[11px]
          lg:text-[10px]
          xl:text-[11px]
        "
      >
        {text}
      </span>
    </motion.li>
  );
}

/* =============================================================================
   HERO
============================================================================= */

function HomeHero({
  trust,
  onDemo,
}: {
  trust: string[];
  onDemo: () => void;
}) {
  const {
    t,
    i18n,
  } = useTranslation("home");

  const {
    t: tc,
  } = useTranslation("common");

  const heroRef =
    useRef<HTMLElement>(null);

  const diagramRef =
    useRef<HTMLDivElement>(null);

  const reducedMotion =
    useReducedMotion() ?? false;

  const rtl =
    i18n.dir() === "rtl";

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    gsap.registerPlugin(
      ScrollTrigger,
    );

    const ctx = gsap.context(
      () => {
        if (!diagramRef.current) {
          return;
        }

        gsap.to(
          diagramRef.current,
          {
            yPercent: 3,
            ease: "none",

            scrollTrigger: {
              trigger:
                heroRef.current,

              start: "top top",

              end: "bottom top",

              scrub: 1,
            },
          },
        );
      },
      heroRef,
    );

    return () => {
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={heroRef}
      dir={rtl ? "rtl" : "ltr"}
      className="
        relative
        isolate
        overflow-hidden

        border-b
        border-slate-100

        bg-[#FCFEFF]

        px-5
        pb-7
        pt-24

        sm:px-6
        sm:pb-9
        sm:pt-28

        lg:px-8
        lg:pt-28
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-20

          bg-[radial-gradient(circle_at_72%_40%,rgba(34,163,224,0.07),transparent_31%),radial-gradient(circle_at_18%_65%,rgba(92,107,192,0.035),transparent_28%)]
        "
      />

      <div className="mx-auto max-w-[1480px]">
        <div
          className="
            grid
            items-center
            gap-8

            lg:grid-cols-[0.92fr_1.08fr]
            lg:gap-4

            xl:grid-cols-[0.9fr_1.1fr]
            xl:gap-7
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              z-20
              mx-auto
              w-full
              max-w-[660px]

              lg:mx-0
            "
          >
            <p
              className="
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.24em]
                text-[#1685EA]

                sm:text-[11px]
              "
            >
              {t("hero.eyebrow")}
            </p>

            <h1
              className="
                mt-4
                max-w-[650px]

                text-[40px]
                font-[760]
                leading-[1.1]
                tracking-[-0.045em]
                text-slate-950

                sm:text-[52px]
                md:text-[58px]
                lg:text-[50px]
                xl:text-[61px]
              "
            >
              <HeroHeadline
                text={t("hero.headline")}
              />
            </h1>

            <p
              className="
                mt-5
                max-w-[590px]

                text-[14px]
                font-medium
                leading-[1.72]
                text-[#526582]

                sm:text-[15px]
              "
            >
              {t("hero.body")}
            </p>

            <div
              className="
                mt-7

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
                  min-h-[50px]
                  items-center
                  justify-center
                  gap-3

                  rounded-xl

                  bg-gradient-to-r
                  from-[#1685EA]
                  to-[#22A3E0]

                  px-5

                  text-[12px]
                  font-bold
                  text-white

                  shadow-[0_12px_26px_rgba(34,163,224,0.22)]

                  transition-all
                  duration-300

                  hover:-translate-y-0.5

                  sm:min-w-[200px]
                "
              >
                {tc("cta.book")}

                <ArrowIcon rtl={rtl} />
              </LocaleLink>

              <LocaleLink
                to="/how-it-works"
                className="
                  inline-flex
                  min-h-[50px]
                  items-center
                  justify-center
                  gap-2.5

                  rounded-xl

                  border
                  border-slate-300

                  bg-white/80

                  px-5

                  text-[12px]
                  font-bold
                  text-slate-800

                  shadow-sm
                  backdrop-blur-xl

                  transition-all
                  duration-300

                  hover:-translate-y-0.5

                  sm:min-w-[155px]
                "
              >
                <span
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full

                    bg-[#EAF6FF]
                    text-[#1685EA]
                  "
                >
                  <PlayIcon />
                </span>

                {tc("cta.how")}
              </LocaleLink>
            </div>

            <button
              type="button"
              onClick={onDemo}
              className="
                mt-4

                inline-flex
                items-center
                gap-2

                text-xs
                font-medium
                text-slate-600
                cursor-pointer
              "
            >
              <span
                className="
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full

                  bg-[#1685EA]
                  text-white
                "
              >
                <PlayIcon />
              </span>

              {tc("cta.demo")}
            </button>
          </motion.div>

          <motion.div
            ref={diagramRef}
            initial={{
              opacity: 0,
              x: rtl ? -25 : 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.85,
            }}
            className="
              relative
              z-10

              mx-auto
              w-full
              max-w-[735px]

              lg:mx-0
            "
          >
            <HeroDocumentDiagram />
          </motion.div>
        </div>

        <div
          className="
            mt-4
            border-t
            border-slate-100
            pt-4
          "
        >
          <ul
            className="
              grid
              grid-cols-1

              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-6
            "
          >
            {trust
              .slice(0, 6)
              .map(
                (
                  item,
                  index,
                ) => (
                  <TrustItem
                    key={`${item}-${index}`}
                    text={item}
                    index={index}
                  />
                ),
              )}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   PROBLEM HEADLINE
============================================================================= */

function ProblemHeadline({
  text,
}: {
  text: string;
}) {
  const trimmed =
    text.trim();

  const content =
    trimmed.endsWith(".")
      ? trimmed.slice(
          0,
          -1,
        )
      : trimmed;

  const phrase =
    "trapped in documents";

  const phraseIndex =
    content
      .toLowerCase()
      .indexOf(
        phrase,
      );

  const gradientStyle = {
    backgroundImage: `linear-gradient(
      90deg,
      ${BRAND.blue} 0%,
      ${BRAND.cyan} 28%,
      ${BRAND.green} 52%,
      ${BRAND.gold} 76%,
      ${BRAND.red} 100%
    )`,
  };

  if (
    phraseIndex === -1
  ) {
    return (
      <>
        <span
          className="
            bg-clip-text
            text-transparent
          "
          style={
            gradientStyle
          }
        >
          {content}
        </span>

        <span className="text-[#F02A35]">
          .
        </span>
      </>
    );
  }

  return (
    <>
      {content.slice(
        0,
        phraseIndex,
      )}

      <span
        className="
          bg-clip-text
          text-transparent
        "
        style={
          gradientStyle
        }
      >
        {content.slice(
          phraseIndex,
          phraseIndex +
            phrase.length,
        )}
      </span>

      {content.slice(
        phraseIndex +
          phrase.length,
      )}

      <span className="text-[#F02A35]">
        .
      </span>
    </>
  );
}

/* =============================================================================
   PROBLEM ROW ICON
============================================================================= */

function ProblemItemIcon({
  index,
  variant,
}: {
  index: number;
  variant:
    | "before"
    | "after";
}) {
  const color =
    variant === "before"
      ? "#FF2638"
      : "#0EC34B";

  if (index <= 1) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-[18px] w-[18px]"
        aria-hidden="true"
      >
        <path
          d="M7 3.5h7l4 4V20H7V3.5Z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        <path
          d="M14 3.5V8h4M9.5 12h6M9.5 15h6"
          stroke={color}
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-[18px] w-[18px]"
      >
        <path
          d="M5 8.5h14v10.8H5V8.5Z"
          stroke={color}
          strokeWidth="1.8"
        />

        <path
          d="M4 5h16v4H4V5ZM9 12h6"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (index === 3) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-[18px] w-[18px]"
      >
        <circle
          cx="11"
          cy="11"
          r="6"
          stroke={color}
          strokeWidth="1.8"
        />

        <path
          d="m15.5 15.5 4 4"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (index === 4) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-[18px] w-[18px]"
      >
        <path
          d="M12 3.5 19 6v5.2c0 4.4-2.7 7.7-7 9.6-4.3-1.9-7-5.2-7-9.6V6l7-2.5Z"
          stroke={color}
          strokeWidth="1.8"
        />

        <circle
          cx="12"
          cy="11.5"
          r="1.5"
          fill={color}
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-[18px] w-[18px]"
    >
      <rect
        x="6"
        y="10"
        width="12"
        height="9"
        rx="2"
        stroke={color}
        strokeWidth="1.8"
      />

      <path
        d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10"
        stroke={color}
        strokeWidth="1.8"
      />
    </svg>
  );
}

/* =============================================================================
   ORBIT GLASS CARD
============================================================================= */

function OrbitGlassCard({
  label,
  color,
  path,
  duration,
  begin,
  reducedMotion,
  staticX,
  staticY,
  glassId,
  shineId,
  shadowId,
}: {
  label: string;
  color: string;
  path: string;
  duration: number;
  begin: number;
  reducedMotion: boolean;
  staticX: number;
  staticY: number;
  glassId: string;
  shineId: string;
  shadowId: string;
}) {
  const width = Math.max(
    72,
    Math.min(
      150,
      label.length * 8.2 + 42,
    ),
  );

  const content = (
    <>
      <rect
        x={-width / 2 + 4}
        y="-19"
        width={width}
        height="46"
        rx="13"
        fill="#627C90"
        opacity="0.16"
      />

      <rect
        x={-width / 2 - 6}
        y="-29"
        width={width + 12}
        height="56"
        rx="16"
        fill={color}
        opacity="0.08"
      />

      <rect
        x={-width / 2}
        y="-25"
        width={width}
        height="48"
        rx="14"
        fill={`url(#${glassId})`}
        stroke="#FFFFFF"
        strokeWidth="1.8"
      />

      <rect
        x={-width / 2 + 2}
        y="-23"
        width={width - 4}
        height="21"
        rx="12"
        fill={`url(#${shineId})`}
        opacity="0.95"
      />

      <path
        d={`M${-width / 2 + 12} 18 H${width / 2 - 12}`}
        stroke={color}
        strokeWidth="1.3"
        strokeOpacity="0.32"
        strokeLinecap="round"
      />

      <circle
        cx={-width / 2 + 18}
        cy="-1"
        r="9.5"
        fill={color}
        opacity="0.11"
      />

      <circle
        cx={-width / 2 + 18}
        cy="-1"
        r="3.8"
        fill={color}
      />

      <circle
        cx={-width / 2 + 17}
        cy="-2"
        r="1.1"
        fill="#FFFFFF"
      />

      <text
        x="11"
        y="4.5"
        textAnchor="middle"
        fontSize="13.6"
        fontWeight="750"
        fill="#253C59"
      >
        {label}
      </text>
    </>
  );

  if (reducedMotion) {
    return (
      <g
        transform={`translate(${staticX} ${staticY})`}
        filter={`url(#${shadowId})`}
      >
        {content}
      </g>
    );
  }

  return (
    <g filter={`url(#${shadowId})`}>
      {content}

      <animateMotion
        path={path}
        dur={`${duration}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
        rotate="0"
      />
    </g>
  );
}

/* =============================================================================
   LEFT PROBLEM VISUAL
============================================================================= */

function ProblemArchiveVisual({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const rawId = useId();
  const clean =
    rawId.replace(/:/g, "");

  const glowId =
    `archive-glow-${clean}`;

  const shadowId =
    `archive-shadow-${clean}`;

  const cardShadowId =
    `archive-card-shadow-${clean}`;

  const glassId =
    `archive-glass-${clean}`;

  const shineId =
    `archive-shine-${clean}`;

  const cabinetFrontId =
    `archive-front-${clean}`;

  const cabinetSideId =
    `archive-side-${clean}`;

  const outerOrbit = `
    M280 42
    A238 238 0 0 1 280 518
    A238 238 0 0 1 280 42
  `;

  const innerOrbit = `
    M280 106
    A174 174 0 0 1 280 454
    A174 174 0 0 1 280 106
  `;

  const outerItems = [
    {
      label: "PDF",
      color: BRAND.red,
    },
    {
      label: "TXT",
      color: BRAND.purple,
    },
    {
      label: "DOCX",
      color: BRAND.blue,
    },
    {
      label: "PPT",
      color: "#F2A21B",
    },
  ];

  const innerItems = [
    {
      label: "Paper",
      color: BRAND.blue,
    },
    {
      label: "Data",
      color: BRAND.cyan,
    },
    {
      label: "Information",
      color: BRAND.green,
    },
    {
      label: "Intelligence",
      color: BRAND.gold,
    },
  ];

  const outerStatic = [
    { x: 280, y: 42 },
    { x: 518, y: 280 },
    { x: 280, y: 518 },
    { x: 42, y: 280 },
  ];

  const innerStatic = [
    { x: 280, y: 106 },
    { x: 454, y: 280 },
    { x: 280, y: 454 },
    { x: 106, y: 280 },
  ];

  return (
    <svg
      viewBox="0 0 560 560"
      preserveAspectRatio="xMidYMid meet"
      className="block h-auto w-full overflow-visible"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      aria-hidden="true"
    >
      <defs>
        <radialGradient
          id={glowId}
          cx="48%"
          cy="46%"
          r="60%"
        >
          <stop
            offset="0%"
            stopColor="#FFD4DA"
            stopOpacity="0.92"
          />

          <stop
            offset="42%"
            stopColor="#FFE9EC"
            stopOpacity="0.78"
          />

          <stop
            offset="76%"
            stopColor="#FFF5F6"
            stopOpacity="0.42"
          />

          <stop
            offset="100%"
            stopColor="#FFFFFF"
            stopOpacity="0"
          />
        </radialGradient>

        <linearGradient
          id={glassId}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#FFFFFF"
            stopOpacity="1"
          />

          <stop
            offset="40%"
            stopColor="#FCFEFF"
            stopOpacity="0.98"
          />

          <stop
            offset="72%"
            stopColor="#E6F0F6"
            stopOpacity="0.94"
          />

          <stop
            offset="100%"
            stopColor="#CDDDE8"
            stopOpacity="0.9"
          />
        </linearGradient>

        <linearGradient
          id={shineId}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#FFFFFF"
            stopOpacity="1"
          />

          <stop
            offset="100%"
            stopColor="#FFFFFF"
            stopOpacity="0"
          />
        </linearGradient>

        <linearGradient
          id={cabinetFrontId}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#E3EBF1"
          />

          <stop
            offset="50%"
            stopColor="#B8C7D4"
          />

          <stop
            offset="100%"
            stopColor="#8498AB"
          />
        </linearGradient>

        <linearGradient
          id={cabinetSideId}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#CBD7E1"
          />

          <stop
            offset="100%"
            stopColor="#8195A8"
          />
        </linearGradient>

        <filter
          id={shadowId}
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
        >
          <feDropShadow
            dx="0"
            dy="12"
            stdDeviation="5"
            floodColor="#344D61"
            floodOpacity="0.28"
          />
        </filter>

        <filter
          id={cardShadowId}
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feDropShadow
            dx="0"
            dy="9"
            stdDeviation="4"
            floodColor="#324A5F"
            floodOpacity="0.25"
          />

          <feDropShadow
            dx="0"
            dy="-1.5"
            stdDeviation="1"
            floodColor="#FFFFFF"
            floodOpacity="1"
          />
        </filter>
      </defs>

      <circle
        cx="280"
        cy="280"
        r="276"
        fill={`url(#${glowId})`}
      />

      <circle
        cx="280"
        cy="280"
        r="258"
        fill="#FFFDFD"
        fillOpacity="0.3"
        stroke="#FFDDE1"
        strokeWidth="1.2"
      />

      <circle
        cx="280"
        cy="280"
        r="238"
        fill="none"
        stroke="#FF6470"
        strokeWidth="2.3"
        strokeDasharray="7 10"
        opacity="0.88"
      />

      <motion.circle
        cx="280"
        cy="280"
        r="238"
        fill="none"
        stroke="#FF929C"
        strokeWidth="6"
        strokeDasharray="1 31"
        strokeLinecap="round"
        opacity="0.18"
        animate={
          reducedMotion
            ? undefined
            : {
                strokeDashoffset: [0, -100],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <circle
        cx="280"
        cy="280"
        r="174"
        fill="none"
        stroke="#3FA8E8"
        strokeWidth="2"
        strokeDasharray="6 9"
        opacity="0.8"
      />

      <motion.circle
        cx="280"
        cy="280"
        r="174"
        fill="none"
        stroke="#76CDF7"
        strokeWidth="5"
        strokeDasharray="1 28"
        strokeLinecap="round"
        opacity="0.18"
        animate={
          reducedMotion
            ? undefined
            : {
                strokeDashoffset: [0, 90],
              }
        }
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.g
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -5, 0],
              }
        }
        transition={{
          duration: 8.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        filter={`url(#${shadowId})`}
      >
        {Array.from({
          length: 18,
        }).map((_, index) => (
          <g
            key={index}
            transform={`translate(${
              110 + index * 1.3
            } ${
              109 - index * 2.3
            })`}
          >
            <polygon
              points="0,42 104,9 195,42 89,77"
              fill="#FFFFFF"
              stroke="#B8CDDD"
              strokeWidth="1.1"
            />

            <path
              d="
                M38 39 113 16
                M46 48l79-25
                M56 57l68-21
              "
              stroke="#99B9D0"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>
        ))}
      </motion.g>

      <g filter={`url(#${shadowId})`}>
        <polygon
          points="198,253 302,219 385,255 277,292"
          fill="#E1E9F0"
        />

        <polygon
          points="198,253 277,292 277,431 198,390"
          fill={`url(#${cabinetSideId})`}
        />

        <polygon
          points="277,292 385,255 385,395 277,431"
          fill={`url(#${cabinetFrontId})`}
        />

        <path
          d="M206 262 278 298 376 264"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          opacity="0.68"
        />

        <rect
          x="304"
          y="311"
          width="61"
          height="37"
          rx="5"
          fill="#C6D3DE"
          stroke="#9CADBB"
          strokeWidth="1.2"
        />

        <rect
          x="321"
          y="325"
          width="27"
          height="5"
          rx="2.5"
          fill="#70879A"
        />

        <rect
          x="304"
          y="357"
          width="61"
          height="37"
          rx="5"
          fill="#C2CFDA"
          stroke="#99AAB8"
          strokeWidth="1.2"
        />

        <rect
          x="321"
          y="371"
          width="27"
          height="5"
          rx="2.5"
          fill="#70879A"
        />
      </g>

      <g filter={`url(#${shadowId})`}>
        <polygon
          points="69,323 151,297 225,325 140,354"
          fill="#EFF4F8"
        />

        <polygon
          points="69,323 140,354 140,454 69,420"
          fill="#CBD8E2"
        />

        <polygon
          points="140,354 225,325 225,425 140,454"
          fill="#E4ECF2"
        />

        {Array.from({
          length: 8,
        }).map((_, index) => (
          <g
            key={index}
            transform={`translate(${
              82 + index * 9
            } ${
              313 - index * 2.6
            })`}
          >
            <path
              d="M0 0h40l9 9v55H0Z"
              fill={
                index % 3 === 0
                  ? "#D8A75B"
                  : index % 3 === 1
                    ? "#C8D5E0"
                    : "#E8C27D"
              }
              stroke="#9AABBA"
              strokeWidth="1"
            />
          </g>
        ))}
      </g>

      <motion.g
        animate={
          reducedMotion
            ? undefined
            : {
                rotate: [-5, -1, -5],
                y: [0, -4, 0],
              }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformOrigin:
            "431px 360px",
        }}
      >
        <polygon
          points="407,320 472,337 461,407 396,389"
          fill="#FFFFFF"
          stroke="#C3D3DF"
          strokeWidth="1.2"
        />

        <path
          d="
            M421 343l36 9
            M418 357l37 9
            M415 371l32 8
          "
          stroke="#A5BDCE"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </motion.g>

      {outerItems.map(
        (
          item,
          index,
        ) => (
          <OrbitGlassCard
            key={item.label}
            label={item.label}
            color={item.color}
            path={outerOrbit}
            duration={42}
            begin={-(index * 10.5)}
            reducedMotion={reducedMotion}
            staticX={outerStatic[index].x}
            staticY={outerStatic[index].y}
            glassId={glassId}
            shineId={shineId}
            shadowId={cardShadowId}
          />
        ),
      )}

      {innerItems.map(
        (
          item,
          index,
        ) => (
          <OrbitGlassCard
            key={item.label}
            label={item.label}
            color={item.color}
            path={innerOrbit}
            duration={48}
            begin={-(index * 12)}
            reducedMotion={reducedMotion}
            staticX={innerStatic[index].x}
            staticY={innerStatic[index].y}
            glassId={glassId}
            shineId={shineId}
            shadowId={cardShadowId}
          />
        ),
      )}
    </svg>
  );
}

/* =============================================================================
   RIGHT PROBLEM VISUAL
============================================================================= */

function ProblemGovernanceVisual({
  reducedMotion,
  arabic,
}: {
  reducedMotion: boolean;
  arabic: boolean;
}) {
  const rawId = useId();

  const clean =
    rawId.replace(/:/g, "");

  const glowId =
    `gov-glow-${clean}`;

  const shadowId =
    `gov-shadow-${clean}`;

  const glassId =
    `gov-glass-${clean}`;

  const deepGlassId =
    `gov-deep-${clean}`;

  const shineId =
    `gov-shine-${clean}`;

  const chips = arabic
    ? [
        "محكوم",
        "صلاحيات واعية",
        "إجابات خاصة",
      ]
    : [
        "Governed",
        "Permission-Aware",
        "Private Answers",
      ];

  return (
    <svg
      viewBox="0 0 560 560"
      preserveAspectRatio="xMidYMid meet"
      className="block h-auto w-full overflow-visible"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      aria-hidden="true"
    >
      <defs>
        <radialGradient
          id={glowId}
          cx="52%"
          cy="47%"
          r="61%"
        >
          <stop
            offset="0%"
            stopColor="#D9FFEA"
            stopOpacity="0.95"
          />

          <stop
            offset="52%"
            stopColor="#EDFFF5"
            stopOpacity="0.72"
          />

          <stop
            offset="100%"
            stopColor="#FFFFFF"
            stopOpacity="0"
          />
        </radialGradient>

        <linearGradient
          id={glassId}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#FFFFFF"
            stopOpacity="1"
          />

          <stop
            offset="46%"
            stopColor="#FBFEFF"
            stopOpacity="0.98"
          />

          <stop
            offset="100%"
            stopColor="#D4E8F2"
            stopOpacity="0.9"
          />
        </linearGradient>

        <linearGradient
          id={deepGlassId}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#FFFFFF"
            stopOpacity="0.98"
          />

          <stop
            offset="48%"
            stopColor="#E4F3FA"
            stopOpacity="0.9"
          />

          <stop
            offset="100%"
            stopColor="#BCD8E6"
            stopOpacity="0.77"
          />
        </linearGradient>

        <linearGradient
          id={shineId}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#FFFFFF"
            stopOpacity="1"
          />

          <stop
            offset="100%"
            stopColor="#FFFFFF"
            stopOpacity="0"
          />
        </linearGradient>

        <filter
          id={shadowId}
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
        >
          <feDropShadow
            dx="0"
            dy="10"
            stdDeviation="4.8"
            floodColor="#345C72"
            floodOpacity="0.24"
          />

          <feDropShadow
            dx="0"
            dy="-1"
            stdDeviation="1"
            floodColor="#FFFFFF"
            floodOpacity="0.9"
          />
        </filter>
      </defs>

      <circle
        cx="280"
        cy="280"
        r="278"
        fill={`url(#${glowId})`}
      />

      <circle
        cx="280"
        cy="280"
        r="258"
        fill="#FBFFFC"
        fillOpacity="0.3"
        stroke="#D5F5E1"
        strokeWidth="1.2"
      />

      <circle
        cx="280"
        cy="280"
        r="240"
        fill="none"
        stroke="#3ED67D"
        strokeWidth="2.2"
        strokeDasharray="7 10"
        opacity="0.82"
      />

      <motion.circle
        cx="280"
        cy="280"
        r="240"
        fill="none"
        stroke="#78E6A6"
        strokeWidth="6"
        strokeDasharray="1 31"
        strokeLinecap="round"
        opacity="0.19"
        animate={
          reducedMotion
            ? undefined
            : {
                strokeDashoffset: [0, -100],
              }
        }
        transition={{
          duration: 23,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <g transform="translate(-110 0)">

      <motion.g
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -4, 0],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        filter={`url(#${shadowId})`}
      >
        <rect
          x="74"
          y="54"
          width="397"
          height="65"
          rx="15"
          fill={`url(#${glassId})`}
          stroke="#FFFFFF"
          strokeWidth="1.8"
        />

        <rect
          x="79"
          y="59"
          width="387"
          height="24"
          rx="11"
          fill={`url(#${shineId})`}
          opacity="0.78"
        />

        <circle
          cx="108"
          cy="86"
          r="9"
          fill="none"
          stroke="#668BC5"
          strokeWidth="2.1"
        />

        <path
          d="m114 93 8 8"
          stroke="#668BC5"
          strokeWidth="2.1"
          strokeLinecap="round"
        />

        <foreignObject
          x="138"
          y="69"
          width="300"
          height="36"
        >
          <div
            dir={arabic ? "rtl" : "ltr"}
            className="
              flex
              h-full
              w-full
              min-w-0
              items-center
              overflow-hidden
            "
          >
            <span
              className="
                block
                min-w-0
                max-w-full
                truncate
                whitespace-nowrap

                text-[14px]
                font-semibold
                text-[#526A8C]
              "
            >
              {arabic
                ? "ابحث عن إجابات موثوقة..."
                : "Find trusted answers..."}
            </span>
          </div>
        </foreignObject>
      </motion.g>

      <g opacity="0.54">
        <path
          d="
            M120 205H242
            M242 205V140
            M242 205H390
            M390 205V300
          "
          fill="none"
          stroke="#50ADEA"
          strokeWidth="2"
          strokeDasharray="5 7"
        />

        {[
          [120, 205],
          [242, 205],
          [242, 140],
          [390, 205],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle
              cx={x}
              cy={y}
              r="7"
              fill="#3AAAF0"
              opacity="0.15"
            />

            <circle
              cx={x}
              cy={y}
              r="4"
              fill="#3AAAF0"
            />
          </g>
        ))}
      </g>

      <motion.g
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -6, 0],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        filter={`url(#${shadowId})`}
      >
        <rect
          x="50"
          y="166"
          width="108"
          height="112"
          rx="18"
          fill={`url(#${glassId})`}
          stroke="#FFFFFF"
          strokeWidth="1.8"
        />

        <rect
          x="55"
          y="171"
          width="98"
          height="38"
          rx="14"
          fill={`url(#${shineId})`}
          opacity="0.77"
        />

        <path
          d="M82 190h29l13 13v50H82Z"
          fill="#1685EA"
        />

        <path
          d="M111 190v14h13"
          fill="#7FD2F7"
        />

        <path
          d="
            M92 217h21
            M92 228h21
            M92 239h15
          "
          stroke="#FFFFFF"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </motion.g>

      <motion.g
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, 5, 0],
              }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        filter={`url(#${shadowId})`}
      >
        <rect
          x="400"
          y="154"
          width="106"
          height="114"
          rx="18"
          fill={`url(#${glassId})`}
          stroke="#FFFFFF"
          strokeWidth="1.8"
        />

        <rect
          x="405"
          y="159"
          width="96"
          height="38"
          rx="14"
          fill={`url(#${shineId})`}
          opacity="0.76"
        />

        <path
          d="
            M453 184
            477 192
            v18
            c0 14-8 25-24 31
            -16-6-24-17-24-31
            v-18Z
          "
          fill="#10B94B"
        />

        <path
          d="m440 211 8 8 16-19"
          stroke="#FFFFFF"
          strokeWidth="3.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>

      <g filter={`url(#${shadowId})`}>
        <rect
          x="77"
          y="297"
          width="136"
          height="128"
          rx="21"
          fill={`url(#${deepGlassId})`}
          stroke="#91D3F4"
          strokeWidth="1.8"
        />

        <rect
          x="96"
          y="317"
          width="98"
          height="84"
          rx="11"
          fill="#FFFFFF"
          fillOpacity="0.82"
        />

        <path
          d="
            M115 340h56
            M115 355h42
            M115 370h48
          "
          stroke="#AAC9DC"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>

      <motion.g
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -5, 0],
                scale: [1, 1.015, 1],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformOrigin:
            "280px 300px",
        }}
      >
        <rect
          x="178"
          y="219"
          width="194"
          height="168"
          rx="25"
          fill="#708DA0"
          opacity="0.13"
          transform="translate(6 9)"
        />

        <rect
          x="172"
          y="211"
          width="194"
          height="168"
          rx="25"
          fill={`url(#${glassId})`}
          stroke="#FFFFFF"
          strokeWidth="2"
          filter={`url(#${shadowId})`}
        />

        <rect
          x="179"
          y="218"
          width="180"
          height="70"
          rx="20"
          fill={`url(#${shineId})`}
          opacity="0.72"
        />

        <foreignObject
          x="217"
          y="225"
          width="112"
          height="136"
          pointerEvents="none"
        >
          <div
            className="
              h-full
              w-full
              drop-shadow-[0_10px_10px_rgba(25,58,79,0.22)]
            "
            style={{
              filter:
                "brightness(1.045) saturate(1.18) contrast(1.07)",
            }}
          >
            <ExactHiveLogo />
          </div>
        </foreignObject>
      </motion.g>

      <rect
        x="343"
        y="305"
        width="175"
        height="20"
        rx="10"
        fill="#E5F3F8"
        stroke="#FFFFFF"
        strokeWidth="1.3"
      />

      <circle
        cx="478"
        cy="315"
        r="7"
        fill="#A9DDF3"
      />

      <motion.circle
        cx="362"
        cy="315"
        r="4.5"
        fill="#22A3E0"
        animate={
          reducedMotion
            ? {
                cx: 362,
              }
            : {
                cx: [362, 496, 362],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {chips.map(
        (
          chip,
          index,
        ) => {
          const y =
            344 +
            index * 57;

          return (
            <motion.g
              key={chip}
              initial={{
                opacity: 0,
                x: 14,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.75,
                delay:
                  index * 0.12,
              }}
              filter={`url(#${shadowId})`}
            >
              <rect
                x="286"
                y={y + 5}
                width="243"
                height="50"
                rx="14"
                fill="#7692A5"
                opacity="0.12"
              />

              <rect
                x="281"
                y={y}
                width="243"
                height="50"
                rx="14"
                fill={`url(#${glassId})`}
                stroke="#FFFFFF"
                strokeWidth="1.6"
              />

              <rect
                x="286"
                y={y + 3}
                width="233"
                height="20"
                rx="10"
                fill={`url(#${shineId})`}
                opacity="0.72"
              />

              <rect
                x="292"
                y={y + 9}
                width="32"
                height="32"
                rx="9"
                fill="#E3FCEB"
              />

              {index === 0 ? (
                <>
                  <path
                    d={`
                      M308 ${y + 13}
                      317 ${y + 16}
                      v7
                      c0 5-3 9-9 11
                      -6-2-9-6-9-11
                      v-7Z
                    `}
                    fill="none"
                    stroke="#0DB94A"
                    strokeWidth="2"
                  />

                  <path
                    d={`m304 ${y + 23} 3 3 6-7`}
                    fill="none"
                    stroke="#0DB94A"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              ) : index === 1 ? (
                <>
                  <circle
                    cx="308"
                    cy={y + 20}
                    r="5"
                    fill="none"
                    stroke="#0DB94A"
                    strokeWidth="2"
                  />

                  <path
                    d={`M299 ${y + 35}c0-6 3.5-9 9-9s9 3 9 9`}
                    fill="none"
                    stroke="#0DB94A"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </>
              ) : (
                <>
                  <rect
                    x="302"
                    y={y + 20}
                    width="13"
                    height="12"
                    rx="2"
                    fill="none"
                    stroke="#0DB94A"
                    strokeWidth="2"
                  />

                  <path
                    d={`M304 ${y + 20}v-4a4.5 4.5 0 0 1 9 0v4`}
                    fill="none"
                    stroke="#0DB94A"
                    strokeWidth="2"
                  />
                </>
              )}

              <foreignObject
                x="334"
                y={y + 7}
                width="174"
                height="35"
              >
                <div
                  dir={arabic ? "rtl" : "ltr"}
                  className="
                    flex
                    h-full
                    w-full
                    min-w-0
                    items-center
                    overflow-hidden
                  "
                >
                  <span
                    className="
                      block
                      min-w-0
                      max-w-full
                      truncate
                      whitespace-nowrap

                      text-[13.5px]
                      font-bold
                      leading-none
                      text-[#324A68]
                    "
                  >
                    {chip}
                  </span>
                </div>
              </foreignObject>
            </motion.g>
          );
        },
      )}
      </g>
    </svg>
  );
}

/* =============================================================================
   PROBLEM CARD
============================================================================= */

function ProblemStateCard({
  variant,
  title,
  subtitle,
  items,
  className = "",
}: {
  variant:
    | "before"
    | "after";
  title: string;
  subtitle: string;
  items: string[];
  className?: string;
}) {
  const isBefore =
    variant === "before";

  const color =
    isBefore
      ? "#FF2638"
      : "#0EC34B";

  return (
    <article
      className={`
        ${className}

        group

        relative
        overflow-hidden

        rounded-[22px]

        border

        bg-white/72

        p-5

        shadow-[0_24px_65px_rgba(50,74,94,0.09),inset_0_1px_0_rgba(255,255,255,0.95)]

        backdrop-blur-[18px]

        transition-all
        duration-500

        hover:-translate-y-1

        sm:p-6
        lg:p-7

        ${
          isBefore
            ? "border-[#FFB3BA]"
            : "border-[#A5EAC1]"
        }
      `}
    >
      <div
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          inset-0

          ${
            isBefore
              ? "bg-[radial-gradient(circle_at_7%_3%,rgba(255,38,56,0.10),transparent_43%),linear-gradient(135deg,rgba(255,255,255,0.82),rgba(255,245,246,0.28))]"
              : "bg-[radial-gradient(circle_at_93%_3%,rgba(14,195,75,0.10),transparent_43%),linear-gradient(135deg,rgba(255,255,255,0.82),rgba(243,255,247,0.28))]"
          }
        `}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-5
          right-5
          top-[2px]
          h-px

          bg-gradient-to-r
          from-transparent
          via-white
          to-transparent
        "
      />

      <div className="relative flex items-center gap-4">
        <span
          className="
            problem-card-symbol

            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center

            rounded-full

            border
            border-white/80

            text-white

            shadow-[0_10px_22px_rgba(38,57,75,0.15),inset_0_1px_0_rgba(255,255,255,0.45)]

            sm:h-14
            sm:w-14
          "
          style={{
            backgroundColor: color,
          }}
        >
          {isBefore ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6"
            >
              <path
                d="m7 7 10 10M17 7 7 17"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6"
            >
              <path
                d="m6.5 12.5 3.5 3.5 7.5-8"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>

        <div className="min-w-0">
          <h3
            className="
              text-[19px]
              font-bold
              tracking-[-0.025em]

              sm:text-[21px]
              lg:text-[22px]
            "
            style={{
              color,
            }}
          >
            {title}
          </h3>

          <p
            className="
              mt-0.5
              text-[12px]
              font-medium
              text-[#526483]

              sm:text-[13px]
              lg:text-[14px]
            "
          >
            {subtitle}
          </p>
        </div>
      </div>

      <div className="relative my-5 h-px bg-[#DCE4EB]" />

      <ul className="relative space-y-3 sm:space-y-3.5">
        {items.map(
          (
            item,
            index,
          ) => (
            <li
              key={`${item}-${index}`}
              className="
                problem-card-row

                flex
                min-w-0
                items-center
                gap-3
              "
            >
              <span
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center

                  rounded-[10px]

                  border
                  border-white/80

                  shadow-[0_6px_16px_rgba(53,75,92,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]

                  sm:h-10
                  sm:w-10
                "
                style={{
                  backgroundColor:
                    isBefore
                      ? "rgba(255,38,56,0.07)"
                      : "rgba(14,195,75,0.075)",
                }}
              >
                <ProblemItemIcon
                  index={index}
                  variant={variant}
                />
              </span>

              <span
                className="
                  min-w-0

                  text-[13px]
                  font-medium
                  leading-[1.45]
                  text-[#435576]

                  sm:text-[14px]
                  lg:text-[15px]
                "
              >
                {item}
              </span>
            </li>
          ),
        )}
      </ul>
    </article>
  );
}

/* =============================================================================
   PROBLEM SECTION
============================================================================= */

function ProblemSection({
  before,
  after,
}: {
  before: string[];
  after: string[];
}) {
  const {
    t,
    i18n,
  } = useTranslation("home");

  const reducedMotion =
    useReducedMotion() ?? false;

  const sectionRef =
    useRef<HTMLElement>(null);

  const leftRef =
    useRef<HTMLDivElement>(null);

  const rightRef =
    useRef<HTMLDivElement>(null);

  const arabic =
    i18n.language
      .toLowerCase()
      .startsWith("ar");

  const rtl =
    i18n.dir() === "rtl";

  const eyebrow = arabic
    ? "معرفتك. سيطرتك."
    : "YOUR KNOWLEDGE. YOUR CONTROL.";

  const beforeSubtitle = arabic
    ? "مجزأ، يصعب الوصول إليه"
    : "Fragmented, Hard to Access";

  const afterSubtitle = arabic
    ? "محكوم، موثوق، جاهز"
    : "Governed, Trusted, Ready";

  const bottomText = arabic
    ? "من إدخال المستندات إلى ذكاء قابل للمساءلة."
    : "From document intake to accountable intelligence.";

  const bottomLabel = arabic
    ? "هذه هي DocHive."
    : "THAT’S DOCHIVE.";

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

    const ctx = gsap.context(
      () => {
        const timeline =
          gsap.timeline({
            defaults: {
              ease: "none",
            },

            scrollTrigger: {
              trigger:
                sectionRef.current,

              start:
                "top 92%",

              end:
                "72% 34%",

              scrub: 2,
            },
          });

        timeline
          .fromTo(
            ".problem-eyebrow",
            {
              opacity: 0,
              y: 28,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
            },
          )

          .fromTo(
            ".problem-heading",
            {
              opacity: 0,
              y: 52,
              scale: 0.97,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.4,
            },
            "-=0.25",
          )

          .fromTo(
            ".problem-description",
            {
              opacity: 0,
              y: 34,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
            },
            "-=0.4",
          )

          .fromTo(
            ".problem-mobile-art",
            {
              opacity: 0,
              y: 45,
              scale: 0.96,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.25,
            },
            "-=0.2",
          )

          .fromTo(
            ".problem-before-card",
            {
              opacity: 0,
              x: rtl ? 48 : -48,
              y: 42,
              scale: 0.98,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 1.35,
            },
          )

          .fromTo(
            ".problem-after-card",
            {
              opacity: 0,
              x: rtl ? -48 : 48,
              y: 42,
              scale: 0.98,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 1.35,
            },
            "-=1.08",
          )

          .fromTo(
            ".problem-card-symbol",
            {
              opacity: 0,
              scale: 0.65,
              rotate: -12,
            },
            {
              opacity: 1,
              scale: 1,
              rotate: 0,
              duration: 0.75,
              stagger: 0.08,
            },
            "-=0.65",
          )

          .fromTo(
            ".problem-card-row",
            {
              opacity: 0,
              y: 18,
            },
            {
              opacity: 1,
              y: 0,
              stagger: 0.065,
              duration: 0.6,
            },
            "-=0.5",
          )

          .fromTo(
            ".problem-bottom-strip",
            {
              opacity: 0,
              y: 42,
              scale: 0.985,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
            },
          );

        const media =
          gsap.matchMedia();

        media.add(
          "(min-width: 1280px)",
          () => {
            if (
              leftRef.current
            ) {
              gsap.fromTo(
                leftRef.current,
                {
                  yPercent: -4,
                },
                {
                  yPercent: 6,
                  ease: "none",

                  scrollTrigger: {
                    trigger:
                      sectionRef.current,

                    start:
                      "top bottom",

                    end:
                      "bottom top",

                    scrub: 2.4,
                  },
                },
              );
            }

            if (
              rightRef.current
            ) {
              gsap.fromTo(
                rightRef.current,
                {
                  yPercent: 5,
                },
                {
                  yPercent: -6,
                  ease: "none",

                  scrollTrigger: {
                    trigger:
                      sectionRef.current,

                    start:
                      "top bottom",

                    end:
                      "bottom top",

                    scrub: 2.4,
                  },
                },
              );
            }
          },
        );

        return () => {
          media.revert();
        };
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
      dir={rtl ? "rtl" : "ltr"}
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
        lg:py-24

        xl:min-h-[1020px]

        2xl:min-h-[1080px]
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-30

          bg-[radial-gradient(circle_at_8%_28%,rgba(229,35,42,0.08),transparent_28%),radial-gradient(circle_at_92%_29%,rgba(42,168,69,0.075),transparent_27%),radial-gradient(circle_at_50%_17%,rgba(34,163,224,0.035),transparent_34%)]
        "
      />

      {/* HALF LEFT VISUAL */}

      <div
        ref={leftRef}
        className="
          pointer-events-none
          absolute

          left-[-285px]
          top-[4px]

          z-0

          hidden
          w-[570px]

          overflow-visible
          will-change-transform

          xl:block

          2xl:left-[-335px]
          2xl:top-[-8px]
          2xl:w-[670px]
        "
      >
        <ProblemArchiveVisual
          reducedMotion={reducedMotion}
        />
      </div>

      {/* RIGHT VISUAL */}

      <div
        ref={rightRef}
        className="
          pointer-events-none
          absolute

          z-0

          hidden

          overflow-visible
          will-change-transform

          xl:right-[-120px]
          xl:top-[-4px]
          xl:block
          xl:w-[520px]

          2xl:right-[-155px]
          2xl:top-[-12px]
          2xl:w-[620px]

          min-[1800px]:right-[-175px]
          min-[1800px]:w-[660px]
        "
      >
        <ProblemGovernanceVisual
          reducedMotion={reducedMotion}
          arabic={arabic}
        />
      </div>

      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-[1480px]
        "
      >
        <div
          className="
            relative
            z-20

            mx-auto
            max-w-[900px]

            text-center

            xl:max-w-[660px]

            2xl:max-w-[700px]
          "
        >
          <p
            className="
              problem-eyebrow

              text-[10px]
              font-extrabold
              uppercase
              tracking-[0.27em]
              text-[#1677F2]

              sm:text-[11px]
              lg:text-[12px]
            "
          >
            {eyebrow}
          </p>

          <h2
            className="
              problem-heading

              mx-auto
              mt-4

              max-w-[830px]

              text-[32px]
              font-[760]
              leading-[1.08]
              tracking-[-0.045em]
              text-[#08162F]

              sm:text-[42px]
              md:text-[48px]
              lg:text-[50px]

              xl:max-w-[620px]
              xl:text-[47px]

              2xl:max-w-[680px]
              2xl:text-[53px]
            "
          >
            <ProblemHeadline
              text={t(
                "problem.headline",
              )}
            />
          </h2>

          <p
            className="
              problem-description

              mx-auto
              mt-5

              max-w-[850px]

              text-[14px]
              font-medium
              leading-[1.68]
              text-[#526582]

              sm:text-[15px]
              lg:text-[16px]

              xl:max-w-[630px]

              2xl:max-w-[680px]
            "
          >
            {t(
              "problem.body",
            )}
          </p>
        </div>

        {/* MOBILE / TABLET VISUALS */}

        <div
          className="
            problem-mobile-art

            relative
            z-10

            mx-auto
            mt-10

            grid
            w-full
            max-w-[1040px]
            grid-cols-1
            items-center
            gap-10

            md:grid-cols-2
            md:gap-4

            xl:hidden
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-[500px]
              overflow-visible
            "
          >
            <ProblemArchiveVisual
              reducedMotion={reducedMotion}
            />
          </div>

          <div
            className="
              mx-auto
              w-full
              max-w-[500px]
              overflow-visible
            "
          >
            <ProblemGovernanceVisual
              reducedMotion={reducedMotion}
              arabic={arabic}
            />
          </div>
        </div>

        {/* BEFORE / AFTER */}

        <div
          className="
            relative
            z-20

            mx-auto
            mt-10

            grid
            w-full
            max-w-[1030px]
            gap-5

            md:grid-cols-2

            lg:mt-12
            lg:gap-6

            xl:mt-[78px]

            2xl:mt-[92px]
          "
        >
          <ProblemStateCard
            className="problem-before-card"
            variant="before"
            title={t(
              "problem.beforeTitle",
            )}
            subtitle={beforeSubtitle}
            items={before}
          />

          <ProblemStateCard
            className="problem-after-card"
            variant="after"
            title={t(
              "problem.afterTitle",
            )}
            subtitle={afterSubtitle}
            items={after}
          />
        </div>

        {/* BOTTOM STRIP */}

        <div
          className="
            problem-bottom-strip

            relative
            z-20

            mx-auto
            mt-8

            w-full
            max-w-[1030px]

            overflow-hidden

            rounded-[20px]

            border
            border-white/90

            bg-[linear-gradient(110deg,rgba(232,245,255,0.9),rgba(255,255,255,0.96),rgba(237,248,255,0.85))]

            px-5
            py-5

            shadow-[0_18px_50px_rgba(54,83,104,0.08),inset_0_1px_0_rgba(255,255,255,1)]

            backdrop-blur-[18px]

            sm:px-7

            lg:mt-10
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none

              absolute
              inset-x-6
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

              flex
              flex-col
              gap-5

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div
              className="
                flex
                min-w-0
                items-center
                gap-4
              "
            >
              <span
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center

                  rounded-[12px]

                  border
                  border-white

                  bg-[#EAF4FF]

                  text-[#1677F2]

                  shadow-[0_8px_20px_rgba(22,119,242,0.11),inset_0_1px_0_rgba(255,255,255,1)]
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-7 w-7"
                  aria-hidden="true"
                >
                  <path
                    d="M6 2.8h8l4.5 4.5v13.9H6V2.8Z"
                    fill="#1677F2"
                  />

                  <path
                    d="M14 2.8v4.7h4.5"
                    fill="#63C6F6"
                  />

                  <path
                    d="M9 11h6M9 14.5h6M9 18h4.5"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>

              <p
                className="
                  min-w-0

                  text-[14px]
                  font-bold
                  leading-[1.4]
                  tracking-[-0.015em]
                  text-[#112544]

                  sm:text-[15px]

                  lg:text-[17px]
                "
              >
                {bottomText}
              </p>
            </div>

            <div
              className="
                flex
                shrink-0
                items-center
                gap-5
              "
            >
              <span
                aria-hidden="true"
                className="
                  hidden

                  h-px
                  w-16

                  bg-[#A5CCF3]

                  sm:block
                  lg:w-20
                "
              />

              <span
                className="
                  whitespace-nowrap

                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.23em]
                  text-[#1677F2]

                  sm:text-[11px]
                  lg:text-[12px]
                "
              >
                {bottomLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   TRANSFORM SECTION
============================================================================= */

function TransformHeadline({
  arabic,
}: {
  arabic: boolean;
}) {
  if (arabic) {
    return (
      <>
        <span className="block">
          من الورق إلى البيانات.{" "}
          <span className="text-[#22A3E0]">
            من البيانات
          </span>{" "}
          إلى المعلومات.
        </span>

        <span className="block">
          <span className="text-[#2AA845]">
            من المعلومات
          </span>{" "}
          إلى{" "}
          <span
            className="
              bg-[linear-gradient(90deg,#F2C94C_0%,#F2C94C_62%,#E5232A_100%)]
              bg-clip-text
              text-transparent
            "
          >
            الذكاء
          </span>
          <span className="text-[#F02A35]">.</span>
        </span>
      </>
    );
  }

  return (
    <>
      <span className="block">
        Paper to data.{" "}
        <span className="text-[#22A3E0]">
          Data
        </span>{" "}
        to information.
      </span>

      <span className="block">
        <span className="text-[#2AA845]">
          Information
        </span>{" "}
        to{" "}
        <span
          className="
            bg-[linear-gradient(90deg,#F2C94C_0%,#F2C94C_62%,#E5232A_100%)]
            bg-clip-text
            text-transparent
          "
        >
          intelligence
        </span>
        <span className="text-[#F02A35]">.</span>
      </span>
    </>
  );
}

function TransformConnectorArrow({
  rtl,
}: {
  rtl: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`
        transform-connector-arrow

        pointer-events-none
        absolute
        top-[47%]
        z-30

        hidden
        h-9
        w-9
        -translate-y-1/2

        items-center
        justify-center

        opacity-0

        xl:flex

        ${
          rtl
            ? "-left-[30px] rotate-180"
            : "-right-[30px]"
        }
      `}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="
          h-8
          w-8

          overflow-visible
        "
      >
        <path
          d="M8 24h27"
          stroke="#79A9ED"
          strokeWidth="2.6"
          strokeLinecap="round"
        />

        <path
          d="m29 16 8 8-8 8"
          stroke="#79A9ED"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function TransformStageVisual({
  index,
  reducedMotion,
}: {
  index: number;
  reducedMotion: boolean;
}) {
  const rawId = useId();
  const cleanId = rawId.replace(/:/g, "");

  const shadowId =
    `transform-shadow-${cleanId}`;

  const paperGradientId =
    `transform-paper-${cleanId}`;

  const blueGradientId =
    `transform-blue-${cleanId}`;

  const greenGradientId =
    `transform-green-${cleanId}`;

  const goldGradientId =
    `transform-gold-${cleanId}`;

  const glassGradientId =
    `transform-glass-${cleanId}`;

  const glowGradientId =
    `transform-glow-${cleanId}`;

  const paperCardGradientId =
    `transform-paper-card-${cleanId}`;

  return (
    <motion.svg
      viewBox="0 0 300 210"
      preserveAspectRatio="xMidYMid meet"
      className="
        transform-stage-visual

        block
        h-auto
        w-full
        overflow-visible

        transform-gpu
        will-change-transform
      "
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={paperGradientId}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#FFFFFF"
          />

          <stop
            offset="55%"
            stopColor="#E9F2FB"
          />

          <stop
            offset="100%"
            stopColor="#B8CAE7"
          />
        </linearGradient>

        <linearGradient
          id={blueGradientId}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#22A3E0"
          />

          <stop
            offset="48%"
            stopColor="#1685EA"
          />

          <stop
            offset="100%"
            stopColor="#5C6BC0"
          />
        </linearGradient>

        <linearGradient
          id={greenGradientId}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#73D989"
          />

          <stop
            offset="52%"
            stopColor="#2AA845"
          />

          <stop
            offset="100%"
            stopColor="#1F8D38"
          />
        </linearGradient>

        <linearGradient
          id={goldGradientId}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#FFE89A"
          />

          <stop
            offset="42%"
            stopColor="#F2C94C"
          />

          <stop
            offset="100%"
            stopColor="#D8A41D"
          />
        </linearGradient>

        <linearGradient
          id={glassGradientId}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#FFFFFF"
            stopOpacity="0.98"
          />

          <stop
            offset="55%"
            stopColor="#F6FBFF"
            stopOpacity="0.94"
          />

          <stop
            offset="100%"
            stopColor="#D8E8F5"
            stopOpacity="0.86"
          />
        </linearGradient>

        <radialGradient
          id={glowGradientId}
          cx="50%"
          cy="50%"
          r="50%"
        >
          <stop
            offset="0%"
            stopColor={
              index === 2
                ? "#34E67A"
                : index === 3
                  ? "#FFD142"
                  : "#49B6F5"
            }
            stopOpacity="0.38"
          />

          <stop
            offset="100%"
            stopColor="#FFFFFF"
            stopOpacity="0"
          />
        </radialGradient>

        <filter
          id={shadowId}
          x="-70%"
          y="-70%"
          width="240%"
          height="240%"
        >
          <feDropShadow
            dx="0"
            dy="15"
            stdDeviation="9"
            floodColor="#58758B"
            floodOpacity="0.22"
          />

          <feDropShadow
            dx="0"
            dy="-2"
            stdDeviation="2"
            floodColor="#FFFFFF"
            floodOpacity="0.92"
          />
        </filter>
      </defs>

      <ellipse
        cx="150"
        cy="164"
        rx="89"
        ry="33"
        fill={`url(#${glowGradientId})`}
      />

      <g
        filter={`url(#${shadowId})`}
      >
        <polygon
          points="72,137 148,98 228,138 150,180"
          fill={`url(#${glassGradientId})`}
          stroke="#FFFFFF"
          strokeWidth="2"
        />

        <polygon
          points="72,137 150,180 150,194 72,151"
          fill="#C8DCE9"
          opacity="0.34"
        />

        <polygon
          points="150,180 228,138 228,151 150,194"
          fill="#AFC9DA"
          opacity="0.26"
        />
      </g>

      {index === 0 && (
        <>
          <g
            transform="translate(69 33)"
            filter={`url(#${shadowId})`}
          >
            {Array.from({
              length: 8,
            }).map(
              (
                _,
                stackIndex,
              ) => (
                <g
                  key={stackIndex}
                  transform={`translate(${
                    stackIndex * 1.4
                  } ${
                    -stackIndex * 4.1
                  })`}
                >
                  <polygon
                    points="31,68 94,35 161,69 96,104"
                    fill={`url(#${paperGradientId})`}
                    stroke="#BFD4EC"
                    strokeWidth="1.4"
                  />

                  <path
                    d="
                      M61 67 104 45
                      M71 73l49-25
                      M82 79l42-21
                    "
                    stroke="#7E9FCD"
                    strokeWidth="4.8"
                    strokeLinecap="round"
                    opacity="0.72"
                  />
                </g>
              ),
            )}
          </g>

          <g
            transform="translate(189 97)"
            filter={`url(#${shadowId})`}
          >
            <rect
              x="-22"
              y="-31"
              width="62"
              height="74"
              rx="13"
              fill={`url(#${paperCardGradientId})`}
              stroke="#B9D4FA"
              strokeWidth="1.5"
            />

            <path
              d="M-8-8h28M-8 2h28M-8 12h21"
              stroke="#258EEA"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
        </>
      )}

      {index === 1 && (
        <>
          <g
            transform="translate(112 46)"
            filter={`url(#${shadowId})`}
          >
            <ellipse
              cx="38"
              cy="21"
              rx="45"
              ry="19"
              fill="#4CBDF3"
              stroke="#1474E5"
              strokeWidth="2"
            />

            <path
              d="M-7 21v37c0 11 20 20 45 20s45-9 45-20V21"
              fill={`url(#${blueGradientId})`}
              stroke="#1474E5"
              strokeWidth="2"
            />

            <ellipse
              cx="38"
              cy="58"
              rx="45"
              ry="19"
              fill="#1D8DE8"
              stroke="#F4FBFF"
              strokeWidth="4"
            />

            <path
              d="M-7 58v37c0 11 20 20 45 20s45-9 45-20V58"
              fill={`url(#${blueGradientId})`}
              stroke="#1474E5"
              strokeWidth="2"
            />

            <ellipse
              cx="38"
              cy="95"
              rx="45"
              ry="19"
              fill="#167AE2"
              stroke="#F6FCFF"
              strokeWidth="4"
            />
          </g>

          <g
            transform="translate(205 107)"
            filter={`url(#${shadowId})`}
          >
            <rect
              x="-22"
              y="-31"
              width="62"
              height="74"
              rx="13"
              fill="#FFFFFF"
              fillOpacity="0.94"
              stroke="#B7D3F5"
              strokeWidth="1.5"
            />

            <path
              d="M-8-8h28M-8 2h28M-8 12h21"
              stroke="#278BEA"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
        </>
      )}

      {index === 2 && (
        <>
          <g
            transform="translate(149 96)"
            filter={`url(#${shadowId})`}
          >
            <path
              d="
                M0 0
                -37 -44
                M0 0
                37 -43
                M0 0
                -43 43
                M0 0
                42 42
              "
              stroke="#07B850"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {[
              [0, 0, 17],
              [-37, -44, 15],
              [37, -43, 15],
              [-43, 43, 15],
              [42, 42, 15],
            ].map(
              (
                [
                  x,
                  y,
                  r,
                ],
                nodeIndex,
              ) => (
                <g
                  key={nodeIndex}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={r + 6}
                    fill="#1AE46A"
                    opacity="0.2"
                  />

                  <circle
                    cx={x}
                    cy={y}
                    r={r}
                    fill={`url(#${greenGradientId})`}
                    stroke="#00A84B"
                    strokeWidth="2.2"
                  />

                  <circle
                    cx={x - 4}
                    cy={y - 5}
                    r={r * 0.35}
                    fill="#B9FFD0"
                    opacity="0.95"
                  />
                </g>
              ),
            )}
          </g>

          <g
            transform="translate(213 110)"
            filter={`url(#${shadowId})`}
          >
            <rect
              x="-22"
              y="-31"
              width="62"
              height="74"
              rx="13"
              fill="#FFFFFF"
              fillOpacity="0.95"
              stroke="#B5EDD0"
              strokeWidth="1.5"
            />

            <path
              d="M-8-8h28M-8 2h28M-8 12h21"
              stroke="#08BC55"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
        </>
      )}

      {index === 3 && (
        <>
          <g
            transform="translate(149 92)"
            filter={`url(#${shadowId})`}
          >
            <circle
              cx="0"
              cy="-15"
              r="37"
              fill="#FFD644"
              opacity="0.18"
            />

            <path
              d="
                M0-58
                C-31-58-48-35-48-12
                C-48 6-39 18-26 29
                C-18 36-16 42-16 50
                H16
                C16 42 18 36 26 29
                C39 18 48 6 48-12
                C48-35 31-58 0-58Z
              "
              fill={`url(#${goldGradientId})`}
              stroke="#E8A600"
              strokeWidth="2.2"
            />

            <ellipse
              cx="-12"
              cy="-32"
              rx="8"
              ry="13"
              fill="#FFFFFF"
              opacity="0.85"
              transform="rotate(30 -12 -32)"
            />

            <path
              d="M-14 49h28M-12 58h24M-7 66h14"
              stroke="#43546A"
              strokeWidth="7"
              strokeLinecap="round"
            />

            <path
              d="M-12 17c8 8 11 17 12 32M12 17C4 25 1 34 0 49"
              fill="none"
              stroke="#FFF7B8"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {[
              ["M0-84v-16", 0],
              ["M-57-63l-12-12", 0],
              ["M57-63l12-12", 0],
              ["M-73-17h-17", 0],
              ["M73-17h17", 0],
            ].map(
              (
                [
                  d,
                ],
                rayIndex,
              ) => (
                <path
                  key={rayIndex}
                  d={d}
                  stroke="#FFB400"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              ),
            )}
          </g>

          <g
            transform="translate(221 110)"
            filter={`url(#${shadowId})`}
          >
            <rect
              x="-22"
              y="-31"
              width="62"
              height="74"
              rx="13"
              fill="#FFFFFF"
              fillOpacity="0.96"
              stroke="#F4D98E"
              strokeWidth="1.5"
            />

            <path
              d="M-8-8h28M-8 2h28M-8 12h21"
              stroke="#F1B31B"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
        </>
      )}

      <defs>
        <linearGradient
          id={paperCardGradientId}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#FFFFFF"
          />

          <stop
            offset="100%"
            stopColor="#EEF6FF"
          />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

function TransformStageCard({
  index,
  stage,
  rtl,
  reducedMotion,
}: {
  index: number;
  stage: {
    title: string;
    text: string;
  };
  rtl: boolean;
  reducedMotion: boolean;
}) {
  const theme = [
    {
      border:
        "#C9E1FF",
      numberText:
        "#1068E8",
      numberBg:
        "linear-gradient(145deg,#F4FAFF,#DCEEFF)",
      glow:
        "rgba(22,133,234,0.12)",
    },
    {
      border:
        "#C9E1FF",
      numberText:
        "#1068E8",
      numberBg:
        "linear-gradient(145deg,#F4FAFF,#DCEEFF)",
      glow:
        "rgba(22,133,234,0.12)",
    },
    {
      border:
        "#B8EDD1",
      numberText:
        "#08A84D",
      numberBg:
        "linear-gradient(145deg,#F1FFF7,#D9F8E7)",
      glow:
        "rgba(42,168,69,0.12)",
    },
    {
      border:
        "#F2D98B",
      numberText:
        "#C98200",
      numberBg:
        "linear-gradient(145deg,#FFFBEF,#FFF0BF)",
      glow:
        "rgba(242,201,76,0.16)",
    },
  ][index];

  return (
    <div
      className="
        transform-card-wrap

        relative
        mx-auto
        h-full
        w-full
        max-w-[310px]

        transform-gpu
        will-change-transform

        xl:max-w-none
      "
    >
      <motion.article
        className="
          transform-stage-card

          group
          relative
          flex
          h-full
          min-h-[356px]
          flex-col
          overflow-hidden

          rounded-[18px]

          border

          bg-white/78

          px-5
          pb-5
          pt-4

          shadow-[0_18px_60px_rgba(76,103,126,0.08),inset_0_1px_0_rgba(255,255,255,1)]

          backdrop-blur-[18px]

          transform-gpu
          will-change-transform

          transition-all
          duration-500

          hover:-translate-y-1

          sm:px-5
          sm:pb-5

          xl:min-h-[368px]
        "
        style={{
          borderColor:
            theme.border,

          boxShadow: `0 20px 64px ${theme.glow}, inset 0 1px 0 rgba(255,255,255,1)`,
        }}
        whileHover={
          reducedMotion
            ? undefined
            : {
                scale: 1.006,
              }
        }
        transition={{
          duration: 0.65,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
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
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-12
            -top-14
            h-36
            w-36
            rounded-full
            bg-white/75
            blur-3xl
          "
        />

        <span
          className="
            relative
            z-10

            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center

            rounded-full

            border
            border-white/90

            text-[18px]
            font-extrabold
            tracking-[-0.04em]

            shadow-[0_9px_26px_rgba(49,77,102,0.10),inset_0_1px_0_rgba(255,255,255,1)]
          "
          style={{
            color:
              theme.numberText,

            background:
              theme.numberBg,
          }}
        >
          {index + 1}
        </span>

        <div
          className="
            relative
            z-10

            mx-auto
            -mt-3
            w-full
            max-w-[188px]
          "
        >
          <TransformStageVisual
            index={index}
            reducedMotion={
              reducedMotion
            }
          />
        </div>

        <div
          className="
            relative
            z-10

            mt-auto
            text-start
          "
        >
          <h3
            className="
              text-[19px]
              font-[760]
              leading-[1.12]
              tracking-[-0.035em]
              text-[#07152E]

              sm:text-[20px]

              xl:text-[21px]
            "
          >
            {stage.title}
          </h3>

          <p
            className="
              mt-2.5
              text-[12px]
              font-medium
              leading-[1.55]
              text-[#52688B]

              sm:text-[12.5px]

              xl:text-[13px]
            "
          >
            {stage.text}
          </p>
        </div>
      </motion.article>

      {index < 3 && (
        <TransformConnectorArrow
          rtl={rtl}
        />
      )}
    </div>
  );
}

function TransformSection({
  stages,
}: {
  stages: {
    title: string;
    text: string;
  }[];
}) {
  const {
    i18n,
  } = useTranslation(
    "home",
  );

  const sectionRef =
    useRef<HTMLElement>(
      null,
    );

  const backdropRef =
    useRef<HTMLDivElement>(
      null,
    );

  const reducedMotion =
    useReducedMotion() ??
    false;

  const arabic =
    i18n.language
      .toLowerCase()
      .startsWith("ar");

  const rtl =
    i18n.dir() ===
    "rtl";

  const subtitle =
    arabic
      ? "ينشئ DocHive مساراً محكوماً من إدخال المستندات إلى ذكاء قابل للمساءلة."
      : "DocHive creates a governed path from document intake to accountable intelligence.";

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
          const cardWrappers =
            gsap.utils.toArray<HTMLElement>(
              ".transform-card-wrap",
            );

          const arrows =
            gsap.utils.toArray<HTMLElement>(
              ".transform-connector-arrow",
            );

          const stageVisuals =
            gsap.utils.toArray<SVGElement>(
              ".transform-stage-visual",
            );

          const backgroundLines =
            gsap.utils.toArray<SVGPathElement>(
              ".transform-background-line",
            );

          const backgroundDots =
            gsap.utils.toArray<SVGCircleElement>(
              ".transform-background-dot",
            );

          gsap.set(
            arrows,
            {
              opacity: 0,
              scale: 0.72,
              x:
                rtl
                  ? 7
                  : -7,
              transformOrigin:
                "50% 50%",
            },
          );

          gsap.set(
            backgroundLines,
            {
              opacity: 0,
              strokeDashoffset: 70,
            },
          );

          gsap.set(
            backgroundDots,
            {
              opacity: 0,
              scale: 0.55,
              transformOrigin:
                "50% 50%",
            },
          );

          const timeline =
            gsap.timeline({
              defaults: {
                ease:
                  "power2.out",
              },

              scrollTrigger: {
                trigger:
                  sectionRef.current,

                start:
                  "top 84%",

                end:
                  "72% 34%",

                scrub:
                  1.55,

                invalidateOnRefresh:
                  true,
              },
            });

          timeline
            .fromTo(
              ".transform-eyebrow",
              {
                opacity: 0,
                y: 18,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
              },
            )

            .fromTo(
              ".transform-heading",
              {
                opacity: 0,
                y: 26,
                scale: 0.992,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
              },
              "-=0.32",
            )

            .fromTo(
              ".transform-subtitle",
              {
                opacity: 0,
                y: 16,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.75,
              },
              "-=0.38",
            )

            .to(
              backgroundLines,
              {
                opacity: 0.82,
                strokeDashoffset: 0,
                duration: 0.9,
                stagger: 0.08,
              },
              "-=0.24",
            )

            .to(
              backgroundDots,
              {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.08,
              },
              "-=0.62",
            );

          cardWrappers.forEach(
            (
              card,
              index,
            ) => {
              const stageVisual =
                stageVisuals[
                  index
                ];

              timeline.fromTo(
                card,
                {
                  opacity: 0,
                  y: 48,
                  scale: 0.978,
                },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 1.05,
                  ease:
                    "power2.out",
                },
                index === 0
                  ? "+=0.06"
                  : "+=0.16",
              );

              if (
                stageVisual
              ) {
                timeline.fromTo(
                  stageVisual,
                  {
                    y: 12,
                    scale: 0.985,
                  },
                  {
                    y: 0,
                    scale: 1,
                    duration: 0.82,
                    ease:
                      "power2.out",
                  },
                  "-=0.88",
                );
              }

              if (
                index <
                arrows.length
              ) {
                timeline.to(
                  arrows[index],
                  {
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    duration: 0.42,
                    ease:
                      "power2.out",
                  },
                  "-=0.24",
                );
              }
            },
          );

          if (
            backdropRef.current
          ) {
            gsap.fromTo(
              backdropRef.current,
              {
                yPercent:
                  -1.3,
              },
              {
                yPercent:
                  1.8,

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
                    2.4,

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
        lg:py-24
      "
    >
      <div
        ref={backdropRef}
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
            -left-[300px]
            top-[38px]

            h-[520px]
            w-[600px]

            rounded-[50%]

            bg-[radial-gradient(circle_at_62%_48%,rgba(194,228,255,0.50),rgba(230,245,255,0.34)_48%,rgba(255,255,255,0)_74%)]
          "
        />

        <div
          className="
            absolute
            -right-[260px]
            top-[72px]

            h-[590px]
            w-[690px]

            rounded-[50%]

            bg-[radial-gradient(circle_at_38%_50%,rgba(216,239,255,0.52),rgba(237,248,255,0.34)_52%,rgba(255,255,255,0)_75%)]
          "
        />

        <svg
          viewBox="0 0 1600 820"
          preserveAspectRatio="none"
          className="
            absolute
            inset-0
            h-full
            w-full
          "
        >
          <path
            id="transform-left-orbit"
            className="transform-background-line"
            d="
              M-55 300
              C78 218 221 232 286 345
              C349 454 310 575 210 642
            "
            fill="none"
            stroke="#5EA6FF"
            strokeWidth="1.8"
            strokeDasharray="5 8"
            opacity="0.92"
          />

          <path
            id="transform-right-orbit"
            className="transform-background-line"
            d="
              M1210 330
              C1340 248 1488 261 1558 371
              C1627 479 1598 600 1512 684
            "
            fill="none"
            stroke="#69B2FF"
            strokeWidth="1.65"
            strokeDasharray="5 8"
            opacity="0.82"
          />

          <path
            className="transform-background-line"
            d="
              M1185 430
              C1302 358 1427 367 1497 476
            "
            fill="none"
            stroke="#76C0FF"
            strokeWidth="1.25"
            strokeDasharray="4 9"
            opacity="0.62"
          />

          <circle
            className="transform-background-dot"
            cx="164"
            cy="272"
            r="7"
            fill="#1677F2"
          />

          <circle
            className="transform-background-dot"
            cx="1394"
            cy="286"
            r="6"
            fill="#F2C94C"
          />


        </svg>

        <div
          className="
            absolute
            left-[-42px]
            top-[190px]

            hidden
            h-[300px]
            w-[170px]

            rotate-[1deg]

            bg-[linear-gradient(145deg,rgba(219,239,252,0.42),rgba(255,255,255,0.02))]

            [clip-path:polygon(0_0,70%_8%,100%_48%,67%_100%,0_88%)]

            lg:block
          "
        />

        <div
          className="
            absolute
            right-[-50px]
            top-[184px]

            hidden
            h-[360px]
            w-[220px]

            bg-[linear-gradient(145deg,rgba(227,244,255,0.42),rgba(255,255,255,0.03))]

            [clip-path:polygon(35%_0,100%_18%,100%_85%,30%_100%,0_51%)]

            lg:block
          "
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
            mx-auto
            max-w-[1220px]
            text-center
          "
        >
          <p
            className="
              transform-eyebrow

              text-[10px]
              font-extrabold
              uppercase
              tracking-[0.31em]
              text-[#22A3E0]

              sm:text-[11px]
              lg:text-[12px]
            "
          >
            {arabic
              ? "معرفتك. سيطرتك."
              : "YOUR KNOWLEDGE. YOUR CONTROL."}
          </p>

          <h2
            className="
              transform-heading

              mx-auto
              mt-5

              max-w-[1220px]

              text-[32px]
              font-[780]
              leading-[1.05]
              tracking-[-0.05em]
              text-[#07142D]

              sm:text-[40px]

              md:text-[47px]

              lg:text-[54px]

              xl:text-[59px]
            "
          >
            <TransformHeadline
              arabic={arabic}
            />
          </h2>

          <p
            className="
              transform-subtitle

              mx-auto
              mt-5

              max-w-[850px]

              text-[14px]
              font-medium
              leading-[1.6]
              text-[#536887]

              sm:text-[14px]

              lg:text-[17px]
            "
          >
            {subtitle}
          </p>
        </div>

        <div
          className="
            relative

            mx-auto
            mt-12

            grid
            max-w-[1080px]
            grid-cols-1
            gap-5

            sm:mt-14

            md:grid-cols-2
            md:gap-6

            xl:grid-cols-4
            xl:gap-[24px]
          "
        >
          {stages
            .slice(
              0,
              4,
            )
            .map(
              (
                stage,
                index,
              ) => (
                <TransformStageCard
                  key={`${stage.title}-${index}`}
                  index={index}
                  stage={stage}
                  rtl={rtl}
                  reducedMotion={
                    reducedMotion
                  }
                />
              ),
            )}
        </div>
      </div>
    </section>
  );
}



/* =============================================================================
   HOW IT WORKS SECTION
============================================================================= */

type HowTheme = {
  color: string;
  soft: string;
  border: string;
  glow: string;
};

const HOW_THEMES: HowTheme[] = [
  {
    color: "#1685EA",
    soft: "#EAF5FF",
    border: "#D6E9FF",
    glow: "rgba(22,133,234,0.18)",
  },
  {
    color: "#18B55A",
    soft: "#E9FAF0",
    border: "#D3F1DF",
    glow: "rgba(42,168,69,0.16)",
  },
  {
    color: "#7A28D8",
    soft: "#F2EAFE",
    border: "#E5D8FB",
    glow: "rgba(92,107,192,0.16)",
  },
  {
    color: "#F2A21B",
    soft: "#FFF6E5",
    border: "#FCE9BF",
    glow: "rgba(242,201,76,0.18)",
  },
  {
    color: "#1685EA",
    soft: "#EAF5FF",
    border: "#D6E9FF",
    glow: "rgba(22,133,234,0.18)",
  },
  {
    color: "#18B55A",
    soft: "#E9FAF0",
    border: "#D3F1DF",
    glow: "rgba(42,168,69,0.16)",
  },
  {
    color: "#7A28D8",
    soft: "#F2EAFE",
    border: "#E5D8FB",
    glow: "rgba(92,107,192,0.16)",
  },
  {
    color: "#F2A21B",
    soft: "#FFF6E5",
    border: "#FCE9BF",
    glow: "rgba(242,201,76,0.18)",
  },
  {
    color: "#1685EA",
    soft: "#EAF5FF",
    border: "#D6E9FF",
    glow: "rgba(22,133,234,0.18)",
  },
  {
    color: "#18B55A",
    soft: "#E9FAF0",
    border: "#D3F1DF",
    glow: "rgba(42,168,69,0.16)",
  },
  {
    color: "#E5232A",
    soft: "#FFF0F1",
    border: "#FFDADD",
    glow: "rgba(229,35,42,0.16)",
  },
  {
    color: "#1685EA",
    soft: "#EAF5FF",
    border: "#D6E9FF",
    glow: "rgba(22,133,234,0.18)",
  },
];

function HowHeadline({
  text,
}: {
  text: string;
}) {
  const phrase =
    "accountable answers";

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

      <span className="text-[#176FF2]">
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

function HowStepIcon({
  index,
  theme,
}: {
  index: number;
  theme: HowTheme;
}) {
  const color =
    theme.color;

  const commonStroke = {
    stroke: color,
    strokeWidth: 2.4,
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
          d="M13 5h16l8 8v29H13V5Z"
          {...commonStroke}
        />

        <path
          d="M29 5v9h8"
          {...commonStroke}
        />

        <path
          d="M24 33V18M18 24l6-6 6 6"
          {...commonStroke}
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
          d="M24 5 39 11v11c0 9-5.5 16-15 21-9.5-5-15-12-15-21V11L24 5Z"
          {...commonStroke}
        />

        <path
          d="m17 23 5 5 10-11"
          {...commonStroke}
        />
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
        <path
          d="M16 12h16v24H16z"
          {...commonStroke}
        />

        <path
          d="M20 18h8M20 23h8M20 28h6"
          {...commonStroke}
        />

        <path
          d="M7 16V8h8M33 8h8v8M41 32v8h-8M15 40H7v-8"
          {...commonStroke}
        />
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
        <path
          d="M8 22 24 6h15v15L23 37 8 22Z"
          {...commonStroke}
        />

        <circle
          cx="33"
          cy="13"
          r="2.2"
          fill={color}
        />
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
        <ellipse
          cx="24"
          cy="11"
          rx="13"
          ry="6"
          {...commonStroke}
        />

        <path
          d="M11 11v12c0 3.3 5.8 6 13 6s13-2.7 13-6V11"
          {...commonStroke}
        />

        <path
          d="M11 23v12c0 3.3 5.8 6 13 6s13-2.7 13-6V23"
          {...commonStroke}
        />
      </svg>
    );
  }

  if (index === 5) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-9 w-9"
        aria-hidden="true"
      >
        <path
          d="M24 5 39 11v11c0 9-5.5 16-15 21-9.5-5-15-12-15-21V11L24 5Z"
          {...commonStroke}
        />

        <circle
          cx="24"
          cy="23"
          r="5.2"
          {...commonStroke}
        />

        <path
          d="M24 14.5v3M24 28.5v3M15.5 23h3M29.5 23h3M18 17l2 2M28 27l2 2M30 17l-2 2M20 27l-2 2"
          {...commonStroke}
        />
      </svg>
    );
  }

  if (index === 6) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-9 w-9"
        aria-hidden="true"
      >
        <circle
          cx="21"
          cy="21"
          r="11"
          {...commonStroke}
        />

        <path
          d="m29 29 10 10"
          {...commonStroke}
        />
      </svg>
    );
  }

  if (index === 7) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-9 w-9"
        aria-hidden="true"
      >
        <path
          d="M8 10h32v23H23l-9 8v-8H8V10Z"
          {...commonStroke}
        />

        <circle
          cx="17"
          cy="21"
          r="1.8"
          fill={color}
        />

        <circle
          cx="24"
          cy="21"
          r="1.8"
          fill={color}
        />

        <circle
          cx="31"
          cy="21"
          r="1.8"
          fill={color}
        />
      </svg>
    );
  }

  if (index === 8) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-9 w-9"
        aria-hidden="true"
      >
        <path
          d="M8 5h21l7 7v22H8V5Z"
          {...commonStroke}
        />

        <path
          d="M29 5v8h7M14 18h13M14 24h9"
          {...commonStroke}
        />

        <circle
          cx="31"
          cy="31"
          r="7"
          {...commonStroke}
        />

        <path
          d="m36 36 6 6"
          {...commonStroke}
        />
      </svg>
    );
  }

  if (index === 9) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-9 w-9"
        aria-hidden="true"
      >
        <path
          d="M11 5h21l7 7v31H11V5Z"
          {...commonStroke}
        />

        <path
          d="M32 5v8h7M17 20h15M17 26h15M17 32h10"
          {...commonStroke}
        />
      </svg>
    );
  }

  if (index === 10) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-9 w-9"
        aria-hidden="true"
      >
        <circle
          cx="24"
          cy="15"
          r="8"
          {...commonStroke}
        />

        <path
          d="M10 40v-4c0-8 5.8-13 14-13s14 5 14 13v4"
          {...commonStroke}
        />

        <circle
          cx="36"
          cy="35"
          r="7"
          fill={color}
        />

        <path
          d="m32.5 35 2.3 2.3 4.2-4.8"
          stroke="#FFFFFF"
          strokeWidth="2"
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
      className="h-9 w-9"
      aria-hidden="true"
    >
      <path
        d="M9 5h22l7 7v30H9V5Z"
        {...commonStroke}
      />

      <path
        d="M31 5v8h7M16 19h14M16 25h11"
        {...commonStroke}
      />

      <path
        d="M31 28 40 31v6c0 4-2.7 7-9 9-6.3-2-9-5-9-9v-6l9-3Z"
        fill={color}
        stroke="#FFFFFF"
        strokeWidth="1.4"
      />

      <path
        d="m27.5 36 2.3 2.2 4.5-5"
        stroke="#FFFFFF"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HowStepCard({
  index,
  text,
  mobile = false,
}: {
  index: number;
  text: string;
  mobile?: boolean;
}) {
  const theme =
    HOW_THEMES[
      index %
        HOW_THEMES.length
    ];

  return (
    <article
      className={`
        ${
          mobile
            ? "how-mobile-step-card"
            : "how-desktop-step-card"
        }

        relative
        z-10

        flex
        min-w-0
        items-center

        overflow-hidden

        rounded-[17px]

        border

        bg-white/76

        px-4
        py-3

        shadow-[0_14px_38px_rgba(43,75,108,0.08),inset_0_1px_0_rgba(255,255,255,1)]

        backdrop-blur-[18px]

        transform-gpu
        will-change-transform

        sm:px-4

        lg:min-h-[94px]
        xl:min-h-[96px]
      `}
      style={{
        borderColor:
          theme.border,

        boxShadow: `0 16px 42px ${theme.glow}, inset 0 1px 0 rgba(255,255,255,1)`,
      }}
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-3
          top-0
          h-px

          bg-gradient-to-r
          from-transparent
          via-white
          to-transparent
        "
      />

      <span
        className="
          absolute
          left-3
          top-3

          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center

          rounded-full

          border
          border-white/90

          text-[15px]
          font-extrabold
          leading-none

          shadow-[0_7px_18px_rgba(48,77,105,0.08),inset_0_1px_0_rgba(255,255,255,1)]

          sm:h-9
          sm:w-9
          sm:text-[16px]
        "
        style={{
          color:
            theme.color,

          backgroundColor:
            theme.soft,
        }}
      >
        {index + 1}
      </span>

      <div
        className="
          ms-[41px]

          flex
          min-w-0
          flex-1
          items-center
          gap-4

          sm:ms-[46px]
          sm:gap-4
        "
      >
        <span
          className="
            flex
            h-[44px]
            w-[54px]
            shrink-0
            items-center
            justify-center

            rounded-full

            border
            border-white/90

            shadow-[0_10px_28px_rgba(53,82,107,0.08),inset_0_1px_0_rgba(255,255,255,1)]

            sm:h-[58px]
            sm:w-[58px]
          "
          style={{
            backgroundColor:
              theme.soft,
          }}
        >
          <HowStepIcon
            index={index}
            theme={theme}
          />
        </span>

        <p
          className="
            min-w-0

            text-[12.5px]
            font-semibold
            leading-[1.3]
            tracking-[-0.015em]
            text-[#14274B]

            sm:text-[13.5px]

            xl:text-[14px]
          "
        >
          {text}
        </p>
      </div>
    </article>
  );
}

function HowInlineConnector({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="
        how-desktop-connector

        relative
        z-20

        hidden
        h-full
        min-h-[94px]

        items-center
        justify-center

        lg:flex
      "
    >
      <svg
        viewBox="0 0 52 34"
        fill="none"
        className="
          h-[34px]
          w-[52px]
          overflow-visible
        "
      >
        <path
          d="M6 17h34"
          stroke="#4C93F4"
          strokeWidth="2.1"
          strokeLinecap="round"
          opacity="0.88"
        />

        <path
          d="m34 11 6 6-6 6"
          fill="none"
          stroke="#2478EE"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {!reducedMotion && (
          <>
            <circle
              r="5.5"
              fill="#1685EA"
              opacity="0.14"
            >
              <animate
                attributeName="cx"
                values="8;37"
                dur="7.6s"
                repeatCount="indefinite"
              />

              <animate
                attributeName="cy"
                values="17;17"
                dur="7.6s"
                repeatCount="indefinite"
              />
            </circle>

            <circle
              r="2.2"
              cy="17"
              fill="#1685EA"
            >
              <animate
                attributeName="cx"
                values="8;37"
                dur="7.6s"
                repeatCount="indefinite"
              />
            </circle>
          </>
        )}
      </svg>
    </div>
  );
}

function HowSnakeTurn({
  index,
  reducedMotion,
  rtl,
}: {
  index: number;
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

  const pathId =
    `how-turn-${index}-${clean}`;

  return (
    <div
      aria-hidden="true"
      className="
        how-desktop-connector

        relative
        z-20

        hidden
        h-[54px]
        w-full

        overflow-visible

        lg:block
      "
    >
      <svg
        viewBox="0 0 1000 44"
        preserveAspectRatio="none"
        className={`
          absolute
          inset-0
          h-full
          w-full
          overflow-visible

          ${
            rtl
              ? "-scale-x-100"
              : ""
          }
        `}
      >
        {/* Equal spacing:
            previous row bottom -> 22px -> horizontal line
            horizontal line -> 22px -> next row top
        */}
        <path
          id={pathId}
          d="
            M1000 0
            C1000 8 1000 14 990 19
            C985 22 979 22 970 22
            H30
            C20 22 14 22 9 25
            C1 30 0 36 0 44
          "
          fill="none"
          stroke="#5A9BF4"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.88"
          vectorEffect="non-scaling-stroke"
        />

        <path
          d="
            M1000 0
            C1000 8 1000 14 990 19
            C985 22 979 22 970 22
            H30
            C20 22 14 22 9 25
            C1 30 0 36 0 44
          "
          fill="none"
          stroke="#1685EA"
          strokeWidth="5.5"
          strokeLinecap="round"
          opacity="0.055"
          vectorEffect="non-scaling-stroke"
        />

        {!reducedMotion && (
          <>
            <circle
              r="6"
              fill="#1685EA"
              opacity="0.14"
            >
              <animateMotion
                dur={`${13.5 + index * 0.8}s`}
                repeatCount="indefinite"
              >
                <mpath
                  href={`#${pathId}`}
                />
              </animateMotion>
            </circle>

            <circle
              r="2.6"
              fill="#1685EA"
            >
              <animateMotion
                dur={`${13.5 + index * 0.8}s`}
                repeatCount="indefinite"
              >
                <mpath
                  href={`#${pathId}`}
                />
              </animateMotion>
            </circle>

            <circle
              r="0.9"
              fill="#FFFFFF"
            >
              <animateMotion
                dur={`${13.5 + index * 0.8}s`}
                repeatCount="indefinite"
              >
                <mpath
                  href={`#${pathId}`}
                />
              </animateMotion>
            </circle>
          </>
        )}
      </svg>
    </div>
  );
}

function HowMobileConnector({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="
        how-mobile-connector

        relative
        mx-auto

        h-10
        w-8

        lg:hidden
      "
    >
      <svg
        viewBox="0 0 32 48"
        fill="none"
        className="h-full w-full"
      >
        <path
          d="M16 1v37"
          stroke="#5A9BF4"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="m10 32 6 7 6-7"
          fill="none"
          stroke="#2478EE"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {!reducedMotion && (
          <circle
            r="2.6"
            cx="16"
            fill="#1685EA"
          >
            <animate
              attributeName="cy"
              values="4;35"
              dur="7.6s"
              repeatCount="indefinite"
            />
          </circle>
        )}
      </svg>
    </div>
  );
}

function HowInfrastructureVisual({
  arabic,
  reducedMotion,
}: {
  arabic: boolean;
  reducedMotion: boolean;
}) {
  const rawId =
    useId();

  const clean =
    rawId.replace(
      /:/g,
      "",
    );

  const glassId =
    `how-infra-glass-${clean}`;

  const glassBlueId =
    `how-infra-blue-${clean}`;

  const stageId =
    `how-infra-stage-${clean}`;

  const shadowId =
    `how-infra-shadow-${clean}`;

  const strongShadowId =
    `how-infra-strong-${clean}`;

  const glowId =
    `how-infra-glow-${clean}`;

  const wire1 =
    `how-infra-wire-1-${clean}`;

  const wire2 =
    `how-infra-wire-2-${clean}`;

  const wire3 =
    `how-infra-wire-3-${clean}`;

  return (
    <motion.div
      className="
        how-infrastructure

        relative
        mx-auto
        w-full
        max-w-[390px]

        transform-gpu
        will-change-transform

        lg:max-w-[360px]

        xl:max-w-[390px]
      "
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              x: 24,
              scale: 0.97,
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 1,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
    >
      <svg
        viewBox="0 0 360 560"
        preserveAspectRatio="xMidYMid meet"
        className="
          block
          h-auto
          w-full
          overflow-visible
        "
        aria-label={
          arabic
            ? "بنية المستندات الخاصة"
            : "Private document infrastructure"
        }
        role="img"
      >
        <defs>
          <linearGradient
            id={glassId}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#FFFFFF"
              stopOpacity="0.99"
            />

            <stop
              offset="58%"
              stopColor="#F4FAFF"
              stopOpacity="0.95"
            />

            <stop
              offset="100%"
              stopColor="#D9ECF9"
              stopOpacity="0.88"
            />
          </linearGradient>

          <linearGradient
            id={glassBlueId}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#F6FBFF"
              stopOpacity="0.96"
            />

            <stop
              offset="100%"
              stopColor="#BFDDFC"
              stopOpacity="0.82"
            />
          </linearGradient>

          <linearGradient
            id={stageId}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#FFFFFF"
              stopOpacity="0.98"
            />

            <stop
              offset="100%"
              stopColor="#C9E4F8"
              stopOpacity="0.88"
            />
          </linearGradient>

          <radialGradient
            id={glowId}
            cx="50%"
            cy="48%"
            r="52%"
          >
            <stop
              offset="0%"
              stopColor="#22A3E0"
              stopOpacity="0.26"
            />

            <stop
              offset="58%"
              stopColor="#7AC9FF"
              stopOpacity="0.13"
            />

            <stop
              offset="100%"
              stopColor="#FFFFFF"
              stopOpacity="0"
            />
          </radialGradient>

          <filter
            id={shadowId}
            x="-80%"
            y="-80%"
            width="260%"
            height="260%"
          >
            <feDropShadow
              dx="0"
              dy="12"
              stdDeviation="9"
              floodColor="#3C6D91"
              floodOpacity="0.18"
            />

            <feDropShadow
              dx="0"
              dy="-2"
              stdDeviation="2"
              floodColor="#FFFFFF"
              floodOpacity="0.9"
            />
          </filter>

          <filter
            id={strongShadowId}
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feDropShadow
              dx="0"
              dy="20"
              stdDeviation="14"
              floodColor="#27587A"
              floodOpacity="0.22"
            />
          </filter>
        </defs>

        <ellipse
          cx="190"
          cy="395"
          rx="155"
          ry="135"
          fill={`url(#${glowId})`}
        />

        {/* rear server stack */}

        <g
          transform="translate(93 53)"
          opacity="0.92"
          filter={`url(#${shadowId})`}
        >
          {[0, 73, 146].map(
            (
              y,
              index,
            ) => (
              <g
                key={index}
                transform={`translate(0 ${y})`}
              >
                <polygon
                  points="38,45 118,4 194,45 113,87"
                  fill={`url(#${glassId})`}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />

                <polygon
                  points="38,45 113,87 113,118 38,76"
                  fill="#C5E1F8"
                  fillOpacity="0.76"
                />

                <polygon
                  points="113,87 194,45 194,76 113,118"
                  fill="#A9D2F4"
                  fillOpacity="0.72"
                />

                <circle
                  cx="126"
                  cy="91"
                  r="4"
                  fill="#258EF1"
                />

                <path
                  d="M144 82 181 64M144 93l37-19"
                  stroke="#70A9E8"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              </g>
            ),
          )}
        </g>

        {/* dotted wires */}

        <path
          id={wire1}
          d="M66 275C87 275 91 309 117 309"
          fill="none"
          stroke="#1685EA"
          strokeWidth="1.6"
          strokeDasharray="4 6"
        />

        <path
          id={wire2}
          d="M59 355C88 355 87 383 121 383"
          fill="none"
          stroke="#2AA845"
          strokeWidth="1.6"
          strokeDasharray="4 6"
        />

        <path
          id={wire3}
          d="M272 332C315 332 322 362 346 362V420C346 431 338 437 328 437"
          fill="none"
          stroke="#1685EA"
          strokeWidth="1.6"
          strokeDasharray="4 6"
        />

        {!reducedMotion && (
          <>
            {[wire1, wire2, wire3].map(
              (
                id,
                index,
              ) => (
                <g key={id}>
                  <circle
                    r="5"
                    fill={
                      index === 1
                        ? "#2AA845"
                        : "#1685EA"
                    }
                    opacity="0.15"
                  >
                    <animateMotion
                      dur={`${6.8 + index * 0.8}s`}
                      begin={`${index * -1.7}s`}
                      repeatCount="indefinite"
                    >
                      <mpath
                        href={`#${id}`}
                      />
                    </animateMotion>
                  </circle>

                  <circle
                    r="2.3"
                    fill={
                      index === 1
                        ? "#2AA845"
                        : "#1685EA"
                    }
                  >
                    <animateMotion
                      dur={`${6.8 + index * 0.8}s`}
                      begin={`${index * -1.7}s`}
                      repeatCount="indefinite"
                    >
                      <mpath
                        href={`#${id}`}
                      />
                    </animateMotion>
                  </circle>
                </g>
              ),
            )}
          </>
        )}

        {/* floating file chips */}

        {[
          {
            x: 29,
            y: 243,
            label: "DOCX",
            color: "#1685EA",
          },
          {
            x: 25,
            y: 322,
            label: "XLSX",
            color: "#16B56B",
          },
          {
            x: 287,
            y: 286,
            label: "PDF",
            color: "#F12837",
          },
        ].map(
          (
            item,
            index,
          ) => (
            <motion.g
              key={item.label}
              animate={
                reducedMotion
                  ? undefined
                  : {
                      y: [
                        0,
                        index % 2 ===
                          0
                          ? -5
                          : 5,
                        0,
                      ],
                    }
              }
              transition={{
                duration:
                  7.5 +
                  index *
                    0.8,
                repeat:
                  Infinity,
                ease:
                  "easeInOut",
              }}
              filter={`url(#${shadowId})`}
            >
              <rect
                x={item.x}
                y={item.y}
                width="55"
                height="77"
                rx="10"
                fill={`url(#${glassId})`}
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />

              <rect
                x={item.x + 11}
                y={item.y + 22}
                width="34"
                height="34"
                rx="4"
                fill={item.color}
              />

              <text
                x={item.x + 28}
                y={item.y + 43}
                textAnchor="middle"
                fontSize={
                  item.label ===
                  "DOCX"
                    ? "8.5"
                    : "9.5"
                }
                fontWeight="800"
                fill="#FFFFFF"
              >
                {item.label}
              </text>
            </motion.g>
          ),
        )}

        {/* base */}

        <g
          filter={`url(#${strongShadowId})`}
        >
          <polygon
            points="83,438 195,380 308,439 196,498"
            fill={`url(#${stageId})`}
            stroke="#FFFFFF"
            strokeWidth="2"
          />

          <polygon
            points="83,438 196,498 196,524 83,464"
            fill="#CAE5F8"
            fillOpacity="0.85"
          />

          <polygon
            points="196,498 308,439 308,465 196,524"
            fill="#A9D1EF"
            fillOpacity="0.78"
          />
        </g>

        {/* foreground document */}

        <g
          transform="translate(109 244)"
          filter={`url(#${strongShadowId})`}
        >
          <path
            d="M28 12h112l25 24v187c0 9-7 16-16 16H28c-9 0-16-7-16-16V28c0-9 7-16 16-16Z"
            fill={`url(#${glassId})`}
            stroke="#FFFFFF"
            strokeWidth="2.2"
          />

          <path
            d="M140 12v30h25"
            fill="#D9EDFA"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />

          <foreignObject
            x="34"
            y="29"
            width="55"
            height="62"
            pointerEvents="none"
          >
            <div
              className="h-full w-full"
              style={{
                filter:
                  "brightness(1.03) saturate(1.12) contrast(1.04)",
              }}
            >
              <ExactHiveLogo />
            </div>
          </foreignObject>

          <path
            d="M36 111h94M36 133h104M36 155h89M36 177h103M36 199h74"
            stroke="#94BDEB"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.72"
          />
        </g>
      </svg>
    </motion.div>
  );
}

function HowSection({
  steps,
}: {
  steps: string[];
}) {
  const {
    t,
    i18n,
  } = useTranslation(
    "home",
  );

  const sectionRef =
    useRef<HTMLElement>(
      null,
    );

  const artRef =
    useRef<HTMLDivElement>(
      null,
    );

  const reducedMotion =
    useReducedMotion() ??
    false;

  const arabic =
    i18n.language
      .toLowerCase()
      .startsWith("ar");

  const rtl =
    i18n.dir() ===
    "rtl";

  const displaySteps =
    Array.from({
      length: 12,
    }).map(
      (
        _,
        index,
      ) =>
        steps[index] ??
        "",
    );

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
          const mm =
            gsap.matchMedia();

          const revealHeader =
            gsap.timeline({
              scrollTrigger: {
                trigger:
                  sectionRef.current,

                start:
                  "top 88%",

                end:
                  "top 46%",

                scrub: 1.45,

                invalidateOnRefresh:
                  true,
              },
            });

          revealHeader
            .fromTo(
              ".how-eyebrow",
              {
                opacity: 0,
                y: 18,
              },
              {
                opacity: 1,
                y: 0,
                ease:
                  "power2.out",
                duration: 0.8,
              },
            )
            .fromTo(
              ".how-heading",
              {
                opacity: 0,
                y: 30,
                scale: 0.992,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                ease:
                  "power2.out",
                duration: 1,
              },
              "-=0.32",
            )
            .fromTo(
              ".how-description",
              {
                opacity: 0,
                y: 16,
              },
              {
                opacity: 1,
                y: 0,
                ease:
                  "power2.out",
                duration: 0.72,
              },
              "-=0.38",
            );

          mm.add(
            "(min-width: 1024px)",
            () => {
              const cards =
                gsap.utils.toArray<HTMLElement>(
                  ".how-desktop-step-card",
                );

              const connectors =
                gsap.utils.toArray<HTMLElement>(
                  ".how-desktop-connector",
                );

              gsap.set(
                cards,
                {
                  opacity: 0,
                  y: 18,
                  scale: 0.994,
                  force3D: true,
                  transformOrigin:
                    "50% 50%",
                },
              );

              gsap.set(
                connectors,
                {
                  opacity: 0,
                },
              );

              const flow =
                gsap.timeline({
                  scrollTrigger: {
                    trigger:
                      ".how-desktop-flow",

                    start:
                      "top 86%",

                    end:
                      "bottom 24%",

                    scrub: 2.65,

                    invalidateOnRefresh:
                      true,
                  },
                });

              cards.forEach(
                (
                  card,
                  index,
                ) => {
                  flow.to(
                    card,
                    {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      duration: 1.08,
                      ease:
                        "power1.inOut",
                      force3D: true,
                    },
                    index === 0
                      ? "+=0.04"
                      : "+=0.16",
                  );

                  if (
                    connectors[
                      index
                    ]
                  ) {
                    flow.to(
                      connectors[
                        index
                      ],
                      {
                        opacity: 1,
                        duration: 0.46,
                        ease:
                          "power1.inOut",
                      },
                      "-=0.16",
                    );
                  }
                },
              );

              if (
                artRef.current
              ) {
                gsap.fromTo(
                  artRef.current,
                  {
                    yPercent:
                      1.5,
                  },
                  {
                    yPercent:
                      -1.5,

                    ease:
                      "none",

                    scrollTrigger: {
                      trigger:
                        sectionRef.current,

                      start:
                        "top bottom",

                      end:
                        "bottom top",

                      scrub: 2.8,

                      invalidateOnRefresh:
                        true,
                    },
                  },
                );
              }
            },
          );

          mm.add(
            "(max-width: 1023px)",
            () => {
              const cards =
                gsap.utils.toArray<HTMLElement>(
                  ".how-mobile-step-card",
                );

              const connectors =
                gsap.utils.toArray<HTMLElement>(
                  ".how-mobile-connector",
                );

              cards.forEach(
                (
                  card,
                  index,
                ) => {
                  gsap.fromTo(
                    card,
                    {
                      opacity: 0,
                      y: 18,
                      scale: 0.994,
                      force3D: true,
                    },
                    {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      duration: 1.0,
                      ease:
                        "power1.inOut",
                      force3D: true,

                      scrollTrigger: {
                        trigger:
                          card,

                        start:
                          "top 88%",

                        toggleActions:
                          "play none none reverse",
                      },
                    },
                  );

                  if (
                    connectors[
                      index
                    ]
                  ) {
                    gsap.fromTo(
                      connectors[
                        index
                      ],
                      {
                        opacity: 0,
                      },
                      {
                        opacity: 1,
                        duration: 0.6,

                        scrollTrigger: {
                          trigger:
                            card,

                          start:
                            "bottom 90%",

                          toggleActions:
                            "play none none reverse",
                        },
                      },
                    );
                  }
                },
              );
            },
          );

          return () => {
            mm.revert();
          };
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
      "
    >
      {/* corner geometry */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-[185px]
          -top-[185px]
          -z-20

          h-[340px]
          w-[340px]

          rounded-full

          bg-[radial-gradient(circle_at_70%_70%,rgba(205,232,251,0.64),rgba(235,247,255,0.42)_48%,rgba(255,255,255,0)_72%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-[172px]
          -top-[166px]
          -z-20

          h-[325px]
          w-[325px]

          rounded-full

          bg-[radial-gradient(circle_at_28%_72%,rgba(207,233,251,0.65),rgba(238,248,255,0.42)_48%,rgba(255,255,255,0)_72%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-[210px]
          -right-[205px]
          -z-20

          h-[430px]
          w-[430px]

          rounded-full

          bg-[radial-gradient(circle_at_30%_24%,rgba(213,237,252,0.62),rgba(241,250,255,0.4)_48%,rgba(255,255,255,0)_72%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-30

          bg-[radial-gradient(circle_at_48%_40%,rgba(34,163,224,0.035),transparent_42%)]
        "
      />

      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-[1530px]
        "
      >
        {/* heading */}

        <div
          className="
            mx-auto
            max-w-[1260px]
            text-center
          "
        >
          <div
            className="
              how-eyebrow

              flex
              items-center
              justify-center
              gap-3

              text-[10px]
              font-extrabold
              uppercase
              tracking-[0.30em]
              text-[#176FF2]

              sm:text-[11px]
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-12

                bg-gradient-to-r
                from-transparent
                to-[#176FF2]

                sm:w-16
              "
            />

            <span>
              {arabic
                ? "كيف يعمل"
                : "HOW IT WORKS"}
            </span>

            <span
              aria-hidden="true"
              className="
                h-px
                w-12

                bg-gradient-to-l
                from-transparent
                to-[#176FF2]

                sm:w-16
              "
            />
          </div>

          <h2
            className="
              how-heading

              mx-auto
              mt-5

              max-w-[1250px]

              text-[34px]
              font-[780]
              leading-[1.06]
              tracking-[-0.05em]
              text-[#07142D]

              sm:text-[44px]

              md:text-[52px]

              lg:text-[58px]

              xl:text-[62px]
            "
          >
            <HowHeadline
              text={t(
                "how.headline",
              )}
            />
          </h2>

          <p
            className="
              how-description

              mx-auto
              mt-4

              max-w-[1080px]

              text-[14px]
              font-medium
              leading-[1.6]
              text-[#53698C]

              sm:text-[15px]

              lg:text-[16px]
            "
          >
            {t(
              "how.body",
            )}
          </p>
        </div>

        {/* =============================================================
            DESKTOP / LAPTOP
        ============================================================== */}

        <div
          className="
            mt-12

            hidden

            grid-cols-[minmax(0,1fr)_300px]
            items-center
            gap-7

            lg:grid

            xl:grid-cols-[minmax(0,1fr)_320px]
            xl:gap-9
          "
        >
          <div className="how-desktop-flow relative min-w-0">
            {[
              [0, 1, 2],
              [3, 4, 5],
              [6, 7, 8],
              [9, 10, 11],
            ].map(
              (
                row,
                rowIndex,
              ) => (
                <div
                  key={rowIndex}
                >
                  <div
                    className="
                      grid
                      grid-cols-[minmax(0,1fr)_52px_minmax(0,1fr)_52px_minmax(0,1fr)]
                      items-stretch
                    "
                  >
                    <HowStepCard
                      index={row[0]}
                      text={
                        displaySteps[
                          row[0]
                        ]
                      }
                    />

                    <HowInlineConnector
                      reducedMotion={
                        reducedMotion
                      }
                    />

                    <HowStepCard
                      index={row[1]}
                      text={
                        displaySteps[
                          row[1]
                        ]
                      }
                    />

                    <HowInlineConnector
                      reducedMotion={
                        reducedMotion
                      }
                    />

                    <HowStepCard
                      index={row[2]}
                      text={
                        displaySteps[
                          row[2]
                        ]
                      }
                    />
                  </div>

                  {rowIndex <
                    3 && (
                    <HowSnakeTurn
                      index={
                        rowIndex
                      }
                      reducedMotion={
                        reducedMotion
                      }
                      rtl={rtl}
                    />
                  )}
                </div>
              ),
            )}
          </div>

          <div
            ref={artRef}
            className="
              relative
              z-10
              self-center
            "
          >
            <HowInfrastructureVisual
              arabic={arabic}
              reducedMotion={
                reducedMotion
              }
            />
          </div>
        </div>

        {/* =============================================================
            MOBILE / TABLET
        ============================================================== */}

        <div
          className="
            mx-auto
            mt-10

            max-w-[680px]

            lg:hidden
          "
        >
          {displaySteps.map(
            (
              step,
              index,
            ) => (
              <div
                key={`mobile-${index}`}
              >
                <HowStepCard
                  index={index}
                  text={step}
                  mobile
                />

                {index <
                  displaySteps.length -
                    1 && (
                  <HowMobileConnector
                    reducedMotion={
                      reducedMotion
                    }
                  />
                )}
              </div>
            ),
          )}

          <div className="mt-9">
            <HowInfrastructureVisual
              arabic={arabic}
              reducedMotion={
                reducedMotion
              }
            />
          </div>
        </div>

        {/* footer line */}

        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 16,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.85,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="
            mt-8

            flex
            items-center
            gap-3

            text-[12px]
            font-medium
            text-[#57709B]

            sm:text-[13px]

            lg:mt-4
          "
        >
          <span
            aria-hidden="true"
            className="
              h-10
              w-[2px]
              shrink-0

              bg-[#176FF2]
            "
          />

          <span>
            {arabic
              ? "مستنداتك. قواعدك. بنيتك التحتية."
              : "Your Documents. Your Rules. Your Infrastructure."}
          </span>
        </motion.div>
      </div>
    </section>
  );
}


/* =============================================================================
   GOVERNANCE SECTION
============================================================================= */

type GovernanceCardItem = {
  id: string;
  title: string;
  text: string;
};

type GovernanceTheme = {
  color: string;
  soft: string;
  border: string;
  glow: string;
};

const GOVERNANCE_THEMES: GovernanceTheme[] = [
  {
    color: "#1685EA",
    soft: "#EAF4FF",
    border: "#D5E7FF",
    glow: "rgba(22,133,234,0.14)",
  },
  {
    color: "#19B862",
    soft: "#EAFBF1",
    border: "#D3F1DF",
    glow: "rgba(42,168,69,0.13)",
  },
  {
    color: "#F2A21B",
    soft: "#FFF6DF",
    border: "#F8E7B4",
    glow: "rgba(242,201,76,0.14)",
  },
  {
    color: "#E5232A",
    soft: "#FFF0F2",
    border: "#FFDADD",
    glow: "rgba(229,35,42,0.13)",
  },
];

function GovernanceHeadline({
  text,
}: {
  text: string;
}) {
  const phrase =
    "your rules";

  const index =
    text
      .toLowerCase()
      .indexOf(phrase);

  if (index === -1) {
    return <>{text}</>;
  }

  return (
    <>
      {text.slice(0, index)}

      <span className="text-[#176FF2]">
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

function GovernanceFeatureIcon({
  index,
  theme,
}: {
  index: number;
  theme: GovernanceTheme;
}) {
  const color =
    theme.color;

  const stroke = {
    stroke: color,
    strokeWidth: 2.25,
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
        className="h-10 w-10"
        aria-hidden="true"
      >
        <path
          d="M24 5 39 11v11c0 9-5.5 16-15 21-9.5-5-15-12-15-21V11L24 5Z"
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
        className="h-10 w-10"
        aria-hidden="true"
      >
        <path
          d="M9 5h21l8 8v21H9V5Z"
          {...stroke}
        />

        <path
          d="M30 5v9h8M15 18h13M15 24h8"
          {...stroke}
        />

        <circle
          cx="31"
          cy="31"
          r="7"
          {...stroke}
        />

        <path
          d="m36 36 6 6"
          {...stroke}
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
        <circle
          cx="19"
          cy="16"
          r="7"
          {...stroke}
        />

        <circle
          cx="31"
          cy="18"
          r="6"
          {...stroke}
        />

        <path
          d="M7 40v-4c0-8 5-13 12-13s12 5 12 13v4"
          {...stroke}
        />

        <path
          d="M28 27c7 .4 12 4.5 12 11v2"
          {...stroke}
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
        d="M10 5h20l8 8v30H10V5Z"
        {...stroke}
      />

      <path
        d="M30 5v9h8M16 21h15M16 27h15M16 33h11"
        {...stroke}
      />
    </svg>
  );
}

function GovernanceFeatureCard({
  item,
  index,
}: {
  item: GovernanceCardItem;
  index: number;
}) {
  const theme =
    GOVERNANCE_THEMES[
      index %
        GOVERNANCE_THEMES.length
    ];

  return (
    <article
      className="
        governance-feature-card

        group
        relative
        flex
        min-w-0
        items-center
        gap-5

        overflow-hidden

        rounded-[18px]

        border

        bg-white/72

        px-5
        py-5

        shadow-[0_18px_54px_rgba(52,78,102,0.07),inset_0_1px_0_rgba(255,255,255,1)]

        backdrop-blur-[18px]

        transform-gpu
        will-change-transform

        transition-[transform,box-shadow,border-color]
        duration-500

        hover:-translate-y-1

        sm:px-6
        sm:py-6
      "
      style={{
        borderColor:
          theme.border,

        boxShadow: `0 18px 56px ${theme.glow}, inset 0 1px 0 rgba(255,255,255,1)`,
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

      <span
        className="
          relative
          flex
          h-[66px]
          w-[66px]
          shrink-0
          items-center
          justify-center

          rounded-[18px]

          border
          border-white/90

          shadow-[0_11px_28px_rgba(48,79,104,0.09),inset_0_1px_0_rgba(255,255,255,1)]

          sm:h-[72px]
          sm:w-[72px]
        "
        style={{
          backgroundColor:
            theme.soft,
        }}
      >
        <GovernanceFeatureIcon
          index={index}
          theme={theme}
        />
      </span>

      <div className="relative min-w-0">
        <h3
          className="
            text-[17px]
            font-[760]
            leading-[1.18]
            tracking-[-0.025em]
            text-[#10234A]

            sm:text-[18px]
            lg:text-[19px]
          "
        >
          {item.title}
        </h3>

        <p
          className="
            mt-1.5

            text-[13px]
            font-medium
            leading-[1.42]
            text-[#59709B]

            sm:text-[14px]
          "
        >
          {item.text}
        </p>
      </div>
    </article>
  );
}

function GovernancePanelShell({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`
        governance-proof-panel

        relative
        overflow-hidden

        rounded-[16px]

        border
        border-[#D7E6F7]

        bg-white/78

        shadow-[0_20px_58px_rgba(52,82,108,0.09),inset_0_1px_0_rgba(255,255,255,1)]

        backdrop-blur-[20px]

        transform-gpu
        will-change-transform

        ${className}
      `}
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-3
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
          flex
          h-[42px]
          items-center
          gap-3

          border-b
          border-[#E9F0F8]

          bg-white/78

          px-4
        "
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#BFD1EA]" />
          <span className="h-2 w-2 rounded-full bg-[#C9D8EC]" />
          <span className="h-2 w-2 rounded-full bg-[#D2DEEE]" />
        </div>

        <h4
          className="
            truncate
            text-[11px]
            font-bold
            text-[#21355F]

            sm:text-[12px]
          "
        >
          {title}
        </h4>
      </div>

      {children}
    </article>
  );
}

function GovernanceAiAnswerPanel({
  arabic,
}: {
  arabic: boolean;
}) {
  return (
    <GovernancePanelShell
      title={
        arabic
          ? "إجابة الذكاء الاصطناعي"
          : "AI Answer"
      }
    >
      <div
        dir={
          arabic
            ? "rtl"
            : "ltr"
        }
        className="
          space-y-3
          p-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-3

            rounded-[10px]

            border
            border-[#EDF3FA]

            bg-[linear-gradient(135deg,rgba(244,249,255,0.96),rgba(255,255,255,0.88))]

            p-3
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

              rounded-[8px]

              bg-[#1685EA]

              text-[13px]
              font-extrabold
              text-white
            "
          >
            Q
          </span>

          <p
            className="
              text-[11px]
              font-medium
              leading-[1.35]
              text-[#314A76]

              sm:text-[12px]
            "
          >
            {arabic
              ? "ما سياسة شروط الدفع بعد أمر الشراء 1001؟"
              : "What is the payment term policy after PO 1001?"}
          </p>
        </div>

        <div
          className="
            flex
            items-start
            gap-3

            rounded-[10px]

            border
            border-[#E2EEF4]

            bg-white/86

            p-3

            shadow-[inset_0_1px_0_rgba(255,255,255,1)]
          "
        >
          <span
            className="
              mt-0.5
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center

              rounded-[8px]

              bg-[#12B965]

              text-white
            "
          >
            ✦
          </span>

          <p
            className="
              text-[10.5px]
              font-medium
              leading-[1.45]
              text-[#435A85]

              sm:text-[11px]
            "
          >
            {arabic
              ? "تتبع شروط الدفع سياسة المبيعات المؤسسية. تستحق الفواتير خلال 30 يوماً من التسليم ما لم ينص العقد على غير ذلك."
              : "Payment terms follow the Corporate Sales AG-0123 policy. Invoices are due within 30 days of delivery unless otherwise specified in the contract."}
          </p>
        </div>

        <div>
          <p
            className="
              mb-2
              text-[10px]
              font-bold
              text-[#425A82]
            "
          >
            {arabic
              ? "المصادر"
              : "Sources"}
          </p>

          <div className="flex flex-wrap gap-2">
            {[
              {
                label:
                  arabic
                    ? "المبيعات المؤسسية AG-0123"
                    : "Corporate Sales AG-0123",
                color:
                  "#1685EA",
                bg:
                  "#EAF4FF",
              },
              {
                label:
                  arabic
                    ? "سياسة المالية FN-004"
                    : "Finance Policy FN-004",
                color:
                  "#19B862",
                bg:
                  "#EAFBF1",
              },
              {
                label:
                  arabic
                    ? "تأهيل المورد VDR-101"
                    : "Vendor Onboarding VDR-101",
                color:
                  "#F2A21B",
                bg:
                  "#FFF6DF",
              },
            ].map(
              (
                item,
              ) => (
                <span
                  key={
                    item.label
                  }
                  className="
                    inline-flex
                    max-w-full
                    items-center
                    gap-1.5

                    rounded-[7px]

                    px-2.5
                    py-1.5

                    text-[9px]
                    font-semibold

                    sm:text-[9.5px]
                  "
                  style={{
                    color:
                      item.color,

                    backgroundColor:
                      item.bg,
                  }}
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-3.5 w-3.5 shrink-0"
                  >
                    <path
                      d="M5 2h7l4 4v12H5V2Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />

                    <path
                      d="M12 2v5h4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>

                  <span className="truncate">
                    {item.label}
                  </span>
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </GovernancePanelShell>
  );
}

function GovernanceApprovalPanel({
  arabic,
}: {
  arabic: boolean;
}) {
  return (
    <GovernancePanelShell
      title={
        arabic
          ? "المراجعة والموافقة"
          : "Review & Approval"
      }
    >
      <div
        dir={
          arabic
            ? "rtl"
            : "ltr"
        }
        className="p-4"
      >
        <div
          className="
            rounded-[12px]

            border
            border-[#D5E7FA]

            bg-white/86

            p-3.5

            shadow-[0_8px_22px_rgba(47,84,116,0.05)]
          "
        >
          <div className="flex items-start gap-3">
            <span
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center

                rounded-[9px]

                bg-[#EAF4FF]
                text-[#1685EA]
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
              >
                <path
                  d="M6 2h8l4 4v16H6V2Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />

                <path
                  d="M14 2v5h4M9 11h6M9 15h6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <div className="min-w-0">
              <h5
                className="
                  text-[11px]
                  font-bold
                  leading-[1.3]
                  text-[#213960]

                  sm:text-[12px]
                "
              >
                {arabic
                  ? "شروط دفع تأهيل المورد"
                  : "Vendor onboarding payment terms"}
              </h5>

              <p
                className="
                  mt-1
                  text-[9.5px]
                  font-medium
                  text-[#8796B0]
                "
              >
                {arabic
                  ? "الإجابة المقترحة"
                  : "Proposed answer"}
              </p>

              <p
                className="
                  mt-1
                  text-[10.5px]
                  font-medium
                  leading-[1.45]
                  text-[#485D86]

                  sm:text-[11px]
                "
              >
                {arabic
                  ? "صافي 30 للموردين القياسيين. تتطلب الشروط غير القياسية مراجعة قانونية."
                  : "Net 30 for standard vendors. Non-standard terms require legal review."}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          {[
            {
              label:
                arabic
                  ? "موافق عليه"
                  : "Approved",
              color:
                "#18B85A",
              bg:
                "#EAFBF1",
              icon:
                "✓",
            },
            {
              label:
                arabic
                  ? "بانتظار المراجعة"
                  : "Pending review",
              color:
                "#E5A000",
              bg:
                "#FFF7E5",
              icon:
                "◷",
            },
            {
              label:
                arabic
                  ? "مطلوب تعديل"
                  : "Revision needed",
              color:
                "#E5232A",
              bg:
                "#FFF0F2",
              icon:
                "×",
            },
          ].map(
            (
              item,
            ) => (
              <div
                key={
                  item.label
                }
                className="
                  flex
                  items-center
                  justify-center
                  gap-2

                  rounded-[8px]

                  border

                  px-3
                  py-2

                  text-[10px]
                  font-bold

                  sm:text-[10.5px]
                "
                style={{
                  color:
                    item.color,

                  backgroundColor:
                    item.bg,

                  borderColor:
                    `${item.color}33`,
                }}
              >
                <span
                  className="
                    flex
                    h-4
                    w-4
                    items-center
                    justify-center

                    rounded-full

                    text-[9px]
                    text-white
                  "
                  style={{
                    backgroundColor:
                      item.color,
                  }}
                >
                  {item.icon}
                </span>

                {item.label}
              </div>
            ),
          )}
        </div>
      </div>
    </GovernancePanelShell>
  );
}

function GovernanceAuditPanel({
  arabic,
}: {
  arabic: boolean;
}) {
  const rows =
    arabic
      ? [
          [
            "sarah.chen",
            "22 أبريل 2025",
            "AG-0123",
            "استعلام",
            "—",
          ],
          [
            "alex.kim",
            "22 أبريل 2025",
            "AG-0123",
            "استدلال",
            "مكتمل",
          ],
          [
            "morgan.lee",
            "22 أبريل 2025",
            "FN-004",
            "مراجعة",
            "موافق",
          ],
          [
            "jordan.patel",
            "22 أبريل 2025",
            "VDR-101",
            "وصول",
            "مسموح",
          ],
        ]
      : [
          [
            "sarah.chen",
            "Apr 22, 2025",
            "AG-0123",
            "Query",
            "—",
          ],
          [
            "alex.kim",
            "Apr 22, 2025",
            "AG-0123",
            "Inference",
            "Completed",
          ],
          [
            "morgan.lee",
            "Apr 22, 2025",
            "FN-004",
            "Review",
            "Approved",
          ],
          [
            "jordan.patel",
            "Apr 22, 2025",
            "VDR-101",
            "Access",
            "Allowed",
          ],
        ];

  const headers =
    arabic
      ? [
          "المستخدم",
          "الوقت",
          "المستند",
          "الإجراء",
          "القرار",
        ]
      : [
          "User",
          "Timestamp",
          "Document",
          "Action",
          "Decision",
        ];

  return (
    <GovernancePanelShell
      title={
        arabic
          ? "دليل التدقيق"
          : "Audit Evidence"
      }
    >
      <div
        dir={
          arabic
            ? "rtl"
            : "ltr"
        }
        className="p-3.5"
      >
        <div
          className="
            overflow-hidden

            rounded-[10px]

            border
            border-[#E0EAF5]

            bg-white/82
          "
        >
          <div
            className="
              grid
              grid-cols-[1.05fr_1.15fr_1fr_0.9fr_1fr]

              bg-[#F6F9FD]
            "
          >
            {headers.map(
              (
                header,
              ) => (
                <div
                  key={header}
                  className="
                    min-w-0
                    border-e
                    border-[#E4EDF7]
                    px-2
                    py-2

                    text-[8px]
                    font-bold
                    text-[#52698F]

                    last:border-e-0

                    sm:text-[8.5px]
                  "
                >
                  <span className="block truncate">
                    {header}
                  </span>
                </div>
              ),
            )}
          </div>

          {rows.map(
            (
              row,
              rowIndex,
            ) => (
              <div
                key={
                  rowIndex
                }
                className="
                  grid
                  grid-cols-[1.05fr_1.15fr_1fr_0.9fr_1fr]

                  border-t
                  border-[#E7EEF7]
                "
              >
                {row.map(
                  (
                    cell,
                    cellIndex,
                  ) => (
                    <div
                      key={`${rowIndex}-${cellIndex}`}
                      className="
                        min-w-0
                        border-e
                        border-[#EDF2F8]

                        px-2
                        py-2.5

                        text-[8.2px]
                        font-medium
                        text-[#4E6388]

                        last:border-e-0

                        sm:text-[8.7px]
                      "
                    >
                      {cellIndex ===
                        4 &&
                      (cell ===
                          "Approved" ||
                        cell ===
                          "موافق" ||
                        cell ===
                          "Allowed" ||
                        cell ===
                          "مسموح") ? (
                        <span
                          className={`
                            inline-flex
                            max-w-full
                            items-center

                            rounded-full

                            px-2
                            py-1

                            font-bold

                            ${
                              cell ===
                                  "Approved" ||
                                cell ===
                                  "موافق"
                                ? "bg-[#E8FAEF] text-[#15AA55]"
                                : "bg-[#EAF4FF] text-[#1685EA]"
                            }
                          `}
                        >
                          <span className="truncate">
                            {cell}
                          </span>
                        </span>
                      ) : (
                        <span className="block truncate">
                          {cell}
                        </span>
                      )}
                    </div>
                  ),
                )}
              </div>
            ),
          )}
        </div>
      </div>
    </GovernancePanelShell>
  );
}

function GovernanceBackground({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const rawId =
    useId();

  const clean =
    rawId.replace(
      /:/g,
      "",
    );

  const leftPathId =
    `gov-bg-left-${clean}`;

  const rightPathId =
    `gov-bg-right-${clean}`;

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        -z-20
      "
    >
      <div
        className="
          absolute
          -left-[170px]
          top-[45px]

          h-[360px]
          w-[360px]

          rounded-full

          bg-[radial-gradient(circle_at_68%_52%,rgba(205,231,250,0.62),rgba(238,248,255,0.4)_52%,rgba(255,255,255,0)_74%)]
        "
      />

      <div
        className="
          absolute
          -right-[185px]
          top-[185px]

          h-[410px]
          w-[410px]

          rounded-full

          bg-[radial-gradient(circle_at_34%_45%,rgba(211,236,252,0.62),rgba(241,250,255,0.4)_52%,rgba(255,255,255,0)_75%)]
        "
      />

      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        className="
          absolute
          inset-0
          h-full
          w-full
        "
      >
        <path
          id={leftPathId}
          className="governance-bg-line"
          d="
            M-15 72
            C88 61 175 86 232 146
            C285 202 302 267 302 342
          "
          fill="none"
          stroke="#63A8FF"
          strokeWidth="1.55"
          strokeDasharray="5 7"
          opacity="0.82"
        />

        <path
          id={rightPathId}
          className="governance-bg-line"
          d="
            M1615 116
            C1529 110 1461 143 1424 207
            C1389 267 1377 320 1370 391
          "
          fill="none"
          stroke="#63A8FF"
          strokeWidth="1.55"
          strokeDasharray="5 7"
          opacity="0.82"
        />

        {!reducedMotion && (
          <>
            <circle
              r="4.5"
              fill="#1685EA"
            >
              <animateMotion
                dur="12s"
                repeatCount="indefinite"
              >
                <mpath
                  href={`#${leftPathId}`}
                />
              </animateMotion>
            </circle>

            <circle
              r="4.5"
              fill="#F2C94C"
            >
              <animateMotion
                dur="13.5s"
                begin="-4s"
                repeatCount="indefinite"
              >
                <mpath
                  href={`#${rightPathId}`}
                />
              </animateMotion>
            </circle>
          </>
        )}
      </svg>
    </div>
  );
}

function GovernanceFloatingBadge({
  side,
  type,
  reducedMotion,
}: {
  side: "left" | "right";
  type: "logo" | "document";
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={`
        pointer-events-none
        absolute
        z-0

        hidden

        h-[72px]
        w-[72px]

        items-center
        justify-center

        rounded-[18px]

        border
        border-white/90

        bg-white/76

        shadow-[0_16px_40px_rgba(48,78,104,0.12),inset_0_1px_0_rgba(255,255,255,1)]

        backdrop-blur-[18px]

        lg:flex

        ${
          side ===
          "left"
            ? "left-[6%] top-[125px]"
            : "right-[6%] top-[170px]"
        }
      `}
      animate={
        reducedMotion
          ? undefined
          : {
              y: [0, -6, 0],
            }
      }
      transition={{
        duration:
          side ===
          "left"
            ? 8.2
            : 9.1,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {type ===
      "logo" ? (
        <div
          className="h-[48px] w-[48px]"
          style={{
            filter:
              "brightness(1.035) saturate(1.12) contrast(1.035)",
          }}
        >
          <ExactHiveLogo />
        </div>
      ) : (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-10 w-10"
        >
          <path
            d="M13 5h17l7 7v31H13V5Z"
            stroke="#5C6BC0"
            strokeWidth="2.2"
          />

          <path
            d="M30 5v8h7M19 21h12M19 27h12M19 33h8"
            stroke="#5C6BC0"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </motion.div>
  );
}

function GovernanceSection({
  cards,
}: {
  cards: GovernanceCardItem[];
}) {
  const {
    t,
    i18n,
  } = useTranslation(
    "home",
  );

  const sectionRef =
    useRef<HTMLElement>(
      null,
    );

  const reducedMotion =
    useReducedMotion() ??
    false;

  const arabic =
    i18n.language
      .toLowerCase()
      .startsWith("ar");

  const rtl =
    i18n.dir() ===
    "rtl";

  const featureCards =
    cards.slice(
      0,
      4,
    );

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
          const lines =
            gsap.utils.toArray<SVGPathElement>(
              ".governance-bg-line",
            );

          gsap.set(
            lines,
            {
              opacity: 0,
              strokeDashoffset: 70,
            },
          );

          const timeline =
            gsap.timeline({
              scrollTrigger: {
                trigger:
                  sectionRef.current,

                start:
                  "top 86%",

                end:
                  "72% 26%",

                scrub: 2.15,

                invalidateOnRefresh:
                  true,
              },
            });

          timeline
            .fromTo(
              ".governance-eyebrow",
              {
                opacity: 0,
                y: 16,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.72,
                ease:
                  "power1.out",
              },
            )

            .fromTo(
              ".governance-heading",
              {
                opacity: 0,
                y: 28,
                scale: 0.994,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.95,
                ease:
                  "power1.out",
              },
              "-=0.28",
            )

            .fromTo(
              ".governance-description",
              {
                opacity: 0,
                y: 18,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease:
                  "power1.out",
              },
              "-=0.38",
            )

            .to(
              lines,
              {
                opacity: 0.82,
                strokeDashoffset: 0,
                duration: 0.8,
                stagger: 0.08,
                ease:
                  "power1.out",
              },
              "-=0.28",
            )

            .fromTo(
              ".governance-feature-card",
              {
                opacity: 0,
                y: 30,
                scale: 0.988,
                force3D: true,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.16,
                duration: 0.95,
                ease:
                  "power1.inOut",
                force3D: true,
              },
              "-=0.2",
            )

            .fromTo(
              ".governance-proof-panel",
              {
                opacity: 0,
                y: 34,
                scale: 0.988,
                force3D: true,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.18,
                duration: 1,
                ease:
                  "power1.inOut",
                force3D: true,
              },
              "-=0.12",
            );
        },
        sectionRef,
      );

    return () => {
      ctx.revert();
    };
  }, [
    reducedMotion,
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
      "
    >
      <GovernanceBackground
        reducedMotion={
          reducedMotion
        }
      />

      <GovernanceFloatingBadge
        side="left"
        type="logo"
        reducedMotion={
          reducedMotion
        }
      />

      <GovernanceFloatingBadge
        side="right"
        type="document"
        reducedMotion={
          reducedMotion
        }
      />

      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-[1440px]
        "
      >
        <div
          className="
            mx-auto
            max-w-[980px]
            text-center
          "
        >
          <p
            className="
              governance-eyebrow

              text-[10px]
              font-extrabold
              uppercase
              tracking-[0.30em]
              text-[#176FF2]

              sm:text-[11px]
            "
          >
            {arabic
              ? "الحوكمة أولاً"
              : "GOVERNANCE FIRST"}
          </p>

          <h2
            className="
              governance-heading

              mx-auto
              mt-4

              max-w-[950px]

              text-[35px]
              font-[780]
              leading-[1.05]
              tracking-[-0.05em]
              text-[#07142D]

              sm:text-[46px]

              md:text-[54px]

              lg:text-[59px]
            "
          >
            <GovernanceHeadline
              text={t(
                "governance.headline",
              )}
            />
          </h2>

          <p
            className="
              governance-description

              mx-auto
              mt-4

              max-w-[850px]

              text-[14px]
              font-medium
              leading-[1.48]
              text-[#5B7099]

              sm:text-[15px]

              lg:text-[16px]
            "
          >
            {t(
              "governance.body",
            )}
          </p>
        </div>

        <div
          className="
            mx-auto
            mt-10

            grid
            max-w-[1320px]
            grid-cols-1
            gap-4

            sm:mt-12

            md:grid-cols-2
            md:gap-5
          "
        >
          {featureCards.map(
            (
              item,
              index,
            ) => (
              <GovernanceFeatureCard
                key={`${item.id}-${index}`}
                item={item}
                index={index}
              />
            ),
          )}
        </div>

        <div
          className="
            mx-auto
            mt-5

            grid
            max-w-[1340px]
            grid-cols-1
            gap-4

            md:grid-cols-2

            xl:grid-cols-3
          "
        >
          <GovernanceAiAnswerPanel
            arabic={arabic}
          />

          <GovernanceApprovalPanel
            arabic={arabic}
          />

          <GovernanceAuditPanel
            arabic={arabic}
          />
        </div>
      </div>
    </section>
  );
}


/* =============================================================================
   DEPLOYMENT SECTION
============================================================================= */

type DeploymentCardItem = {
  title: string;
  points: string[];
};

type DeploymentTheme = {
  color: string;
  soft: string;
  border: string;
  glow: string;
  line: string;
};

const DEPLOYMENT_THEMES: DeploymentTheme[] = [
  {
    color: "#1685EA",
    soft: "#EAF4FF",
    border: "#BFDFFF",
    glow: "rgba(22,133,234,0.13)",
    line: "#1685EA",
  },
  {
    color: "#18B862",
    soft: "#E9FAF1",
    border: "#BCEBD2",
    glow: "rgba(42,168,69,0.13)",
    line: "#1DCB78",
  },
  {
    color: "#7A35F2",
    soft: "#F1EAFE",
    border: "#D7C6FF",
    glow: "rgba(92,107,192,0.14)",
    line: "#7A35F2",
  },
];

function DeploymentHeadline({
  text,
}: {
  text: string;
}) {
  const phrase =
    "you control";

  const index =
    text
      .toLowerCase()
      .indexOf(phrase);

  if (index === -1) {
    return <>{text}</>;
  }

  return (
    <>
      {text.slice(0, index)}

      <span className="text-[#176FF2]">
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

function DeploymentIcon({
  index,
  theme,
}: {
  index: number;
  theme: DeploymentTheme;
}) {
  const stroke = {
    stroke: theme.color,
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
          d="m24 6 15 8-15 8-15-8 15-8Z"
          {...stroke}
        />

        <path
          d="M9 14v18l15 9 15-9V14"
          {...stroke}
        />

        <path
          d="M24 22v19"
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
        <rect
          x="10"
          y="8"
          width="28"
          height="12"
          rx="3"
          {...stroke}
        />

        <rect
          x="10"
          y="28"
          width="28"
          height="12"
          rx="3"
          {...stroke}
        />

        <circle
          cx="17"
          cy="14"
          r="2"
          fill={theme.color}
        />

        <circle
          cx="17"
          cy="34"
          r="2"
          fill={theme.color}
        />

        <path
          d="M24 14h8M24 34h8"
          {...stroke}
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-9 w-9"
      aria-hidden="true"
    >
      <path
        d="M24 5 39 11v11c0 9-5.5 16-15 21-9.5-5-15-12-15-21V11L24 5Z"
        {...stroke}
      />
    </svg>
  );
}

function DeploymentSignalCap({
  index,
  reducedMotion,
}: {
  index: number;
  reducedMotion: boolean;
}) {
  const rawId =
    useId();

  const clean =
    rawId.replace(
      /:/g,
      "",
    );

  const pathId =
    `deployment-cap-${index}-${clean}`;

  const theme =
    DEPLOYMENT_THEMES[index];

  const path =
    index === 1
      ? `
        M84 52
        V38
        C84 18 101 8 124 8
        H203
        C226 8 243 18 243 38
        V52
      `
      : `
        M8 52
        V36
        C8 18 22 8 42 8
        H285
        C305 8 319 18 319 36
        V52
      `;

  return (
    <div
      aria-hidden="true"
      className="
        deployment-signal-cap

        pointer-events-none
        absolute
        left-1/2
        top-[-6px]
        z-0

        h-[54px]
        w-[calc(100%-20px)]
        -translate-x-1/2

        overflow-visible
      "
    >
      <svg
        viewBox="0 0 327 54"
        preserveAspectRatio="none"
        className="
          h-full
          w-full
          overflow-visible
        "
      >
        <path
          id={pathId}
          d={path}
          fill="none"
          stroke={theme.line}
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.52"
          vectorEffect="non-scaling-stroke"
        />

        <path
          d={path}
          fill="none"
          stroke={theme.line}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.045"
          vectorEffect="non-scaling-stroke"
        />

        {!reducedMotion && (
          <>
            <circle
              r="5.5"
              fill={theme.line}
              opacity="0.14"
            >
              <animateMotion
                dur={`${12.5 + index * 0.9}s`}
                repeatCount="indefinite"
              >
                <mpath
                  href={`#${pathId}`}
                />
              </animateMotion>
            </circle>

            <circle
              r="2.6"
              fill={theme.line}
            >
              <animateMotion
                dur={`${12.5 + index * 0.9}s`}
                repeatCount="indefinite"
              >
                <mpath
                  href={`#${pathId}`}
                />
              </animateMotion>
            </circle>

            <circle
              r="0.85"
              fill="#FFFFFF"
            >
              <animateMotion
                dur={`${12.5 + index * 0.9}s`}
                repeatCount="indefinite"
              >
                <mpath
                  href={`#${pathId}`}
                />
              </animateMotion>
            </circle>
          </>
        )}

        {index === 1 ? (
          <>
            <circle
              cx="84"
              cy="52"
              r="4.5"
              fill={theme.line}
            />

            <circle
              cx="243"
              cy="52"
              r="4.5"
              fill={theme.line}
            />
          </>
        ) : (
          <>
            <circle
              cx="8"
              cy="52"
              r="4.5"
              fill={theme.line}
            />

            <circle
              cx="319"
              cy="52"
              r="4.5"
              fill={theme.line}
            />
          </>
        )}
      </svg>
    </div>
  );
}

function DeploymentCheck({
  color,
}: {
  color: string;
}) {
  return (
    <span
      className="
        flex
        h-7
        w-7
        shrink-0
        items-center
        justify-center

        rounded-full

        border
        border-white/90

        shadow-[0_7px_18px_rgba(46,73,96,0.07),inset_0_1px_0_rgba(255,255,255,1)]
      "
      style={{
        backgroundColor:
          `${color}14`,
      }}
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        className="h-3.5 w-3.5"
        aria-hidden="true"
      >
        <path
          d="m4 10 4 4 8-9"
          stroke={color}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function DeploymentCard({
  card,
  index,
  reducedMotion,
}: {
  card: DeploymentCardItem;
  index: number;
  reducedMotion: boolean;
}) {
  const theme =
    DEPLOYMENT_THEMES[index];

  return (
    <div
      className="
        deployment-card-wrap

        relative
        min-w-0

        pt-[46px]

        transform-gpu
        will-change-transform
      "
    >
      <DeploymentSignalCap
        index={index}
        reducedMotion={
          reducedMotion
        }
      />

      <article
        className="
          deployment-card

          group
          relative
          z-10

          flex
          h-full
          min-h-[338px]
          flex-col

          overflow-hidden

          rounded-[22px]

          border

          bg-white/70

          px-6
          pb-6
          pt-5

          shadow-[0_26px_74px_rgba(46,75,102,0.10),inset_0_1px_0_rgba(255,255,255,1)]

          backdrop-blur-[22px]

          transition-[transform,box-shadow]
          duration-500

          hover:-translate-y-1

          sm:min-h-[348px]
          sm:px-6
          sm:pb-7
          sm:pt-5

          lg:min-h-[356px]
          lg:px-7
        "
        style={{
          borderColor:
            theme.border,

          boxShadow: `0 28px 80px ${theme.glow}, inset 0 1px 0 rgba(255,255,255,1)`,
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
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-16
            -top-20

            h-44
            w-44

            rounded-full

            bg-white/70

            blur-3xl
          "
        />

        <div
          className="
            relative
            z-10

            flex
            h-[68px]
            w-[68px]
            items-center
            justify-center

            rounded-full

            border
            border-white/90

            shadow-[0_12px_34px_rgba(48,78,104,0.10),inset_0_1px_0_rgba(255,255,255,1)]

            sm:h-[74px]
            sm:w-[74px]
          "
          style={{
            backgroundColor:
              theme.soft,
          }}
        >
          <DeploymentIcon
            index={index}
            theme={theme}
          />
        </div>

        <h3
          className="
            relative
            z-10

            mt-3.5

            text-[21px]
            font-[780]
            leading-[1.12]
            tracking-[-0.04em]
            text-[#07142D]

            sm:text-[22px]

            lg:text-[23px]
          "
        >
          {card.title}
        </h3>

        <ul
          className="
            relative
            z-10

            mt-5

            space-y-3

            sm:mt-5
            sm:space-y-3.5
          "
        >
          {card.points
            .slice(
              0,
              4,
            )
            .map(
              (
                point,
                pointIndex,
              ) => (
                <li
                  key={`${point}-${pointIndex}`}
                  className="
                    deployment-point

                    flex
                    min-w-0
                    items-start
                    gap-3
                  "
                >
                  <DeploymentCheck
                    color={
                      theme.color
                    }
                  />

                  <span
                    className="
                      min-w-0
                      pt-0.5

                      text-[12.5px]
                      font-medium
                      leading-[1.42]
                      text-[#55709C]

                      sm:text-[13.5px]

                      lg:text-[14px]
                    "
                  >
                    {point}
                  </span>
                </li>
              ),
            )}
        </ul>

        <span
          aria-hidden="true"
          className="
            absolute
            bottom-0
            left-1/2

            h-[4px]
            w-[112px]
            -translate-x-1/2

            rounded-t-full
          "
          style={{
            backgroundColor:
              theme.line,

            boxShadow:
              `0 -4px 18px ${theme.glow}`,
          }}
        />
      </article>
    </div>
  );
}

function DeploymentBackground({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const rawId =
    useId();

  const clean =
    rawId.replace(
      /:/g,
      "",
    );

  const leftPathId =
    `deployment-bg-left-${clean}`;

  const rightPathId =
    `deployment-bg-right-${clean}`;

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        -z-20
      "
    >
      <div
        className="
          absolute
          -left-[225px]
          top-[90px]

          h-[505px]
          w-[505px]

          rounded-[44%]

          bg-[radial-gradient(circle_at_67%_48%,rgba(203,231,250,0.58),rgba(235,247,255,0.36)_50%,rgba(255,255,255,0)_74%)]
        "
      />

      <div
        className="
          absolute
          -right-[220px]
          top-[125px]

          h-[520px]
          w-[520px]

          rounded-[44%]

          bg-[radial-gradient(circle_at_34%_52%,rgba(224,216,255,0.52),rgba(245,241,255,0.34)_50%,rgba(255,255,255,0)_75%)]
        "
      />

      <div
        className="
          absolute
          -left-[92px]
          top-[165px]

          h-[255px]
          w-[235px]

          rounded-[36px]

          bg-[linear-gradient(145deg,rgba(214,236,251,0.55),rgba(255,255,255,0.10))]

          [clip-path:polygon(0_0,100%_26%,100%_86%,16%_100%,0_73%)]
        "
      />

      <div
        className="
          absolute
          right-[70px]
          top-[18px]

          hidden
          h-[105px]
          w-[215px]

          rotate-[-34deg]

          rounded-[24px]

          bg-[linear-gradient(145deg,rgba(205,230,252,0.72),rgba(241,248,255,0.42))]

          lg:block
        "
      />

      <div
        className="
          absolute
          -right-[52px]
          top-[185px]

          hidden
          h-[320px]
          w-[230px]

          bg-[linear-gradient(145deg,rgba(229,219,255,0.62),rgba(249,246,255,0.18))]

          [clip-path:polygon(60%_0,100%_0,100%_100%,10%_100%,0_48%)]

          lg:block
        "
      />

      <div
        className="
          absolute
          left-[3.5%]
          top-[88px]

          grid
          grid-cols-3
          gap-4

          opacity-50
        "
      >
        {Array.from({
          length: 9,
        }).map(
          (
            _,
            index,
          ) => (
            <span
              key={index}
              className="
                h-[4px]
                w-[4px]

                rounded-full

                bg-[#77B6F8]
              "
            />
          ),
        )}
      </div>

      <div
        className="
          absolute
          bottom-[56px]
          right-[3.5%]

          grid
          grid-cols-3
          gap-4

          opacity-45
        "
      >
        {Array.from({
          length: 9,
        }).map(
          (
            _,
            index,
          ) => (
            <span
              key={index}
              className="
                h-[4px]
                w-[4px]

                rounded-full

                bg-[#7DBBF8]
              "
            />
          ),
        )}
      </div>

      <svg
        viewBox="0 0 1600 850"
        preserveAspectRatio="none"
        className="
          absolute
          inset-0
          h-full
          w-full
        "
      >
        <path
          id={leftPathId}
          d="
            M-40 150
            C80 109 192 125 270 196
            C345 264 369 348 361 441
          "
          fill="none"
          stroke="#72AEF8"
          strokeWidth="1.25"
          strokeDasharray="4 8"
          opacity="0.22"
        />

        <path
          id={rightPathId}
          d="
            M1640 224
            C1531 199 1442 217 1374 275
            C1312 329 1288 400 1287 482
          "
          fill="none"
          stroke="#8B6BF6"
          strokeWidth="1.25"
          strokeDasharray="4 8"
          opacity="0.20"
        />

        {!reducedMotion && (
          <>
            <circle
              r="3.8"
              fill="#1685EA"
              opacity="0.64"
            >
              <animateMotion
                dur="14s"
                repeatCount="indefinite"
              >
                <mpath
                  href={`#${leftPathId}`}
                />
              </animateMotion>
            </circle>

            <circle
              r="3.8"
              fill="#7A35F2"
              opacity="0.62"
            >
              <animateMotion
                dur="15.5s"
                begin="-5s"
                repeatCount="indefinite"
              >
                <mpath
                  href={`#${rightPathId}`}
                />
              </animateMotion>
            </circle>
          </>
        )}
      </svg>
    </div>
  );
}

function DeploymentSection({
  deployments,
}: {
  deployments: DeploymentCardItem[];
}) {
  const {
    t,
    i18n,
  } = useTranslation(
    "home",
  );

  const sectionRef =
    useRef<HTMLElement>(
      null,
    );

  const reducedMotion =
    useReducedMotion() ??
    false;

  const arabic =
    i18n.language
      .toLowerCase()
      .startsWith("ar");

  const rtl =
    i18n.dir() ===
    "rtl";

  const visibleCards =
    deployments.slice(
      0,
      3,
    );

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
          const mm =
            gsap.matchMedia();

          const headerTimeline =
            gsap.timeline({
              scrollTrigger: {
                trigger:
                  sectionRef.current,

                start:
                  "top 90%",

                end:
                  "top 52%",

                scrub: 1.55,

                invalidateOnRefresh:
                  true,
              },
            });

          headerTimeline
            .fromTo(
              ".deployment-eyebrow",
              {
                opacity: 0,
                y: 12,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease:
                  "power1.out",
              },
            )

            .fromTo(
              ".deployment-heading",
              {
                opacity: 0,
                y: 20,
                scale: 0.996,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.82,
                ease:
                  "power1.inOut",
              },
              "-=0.25",
            )

            .fromTo(
              ".deployment-description",
              {
                opacity: 0,
                y: 12,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.68,
                ease:
                  "power1.out",
              },
              "-=0.34",
            );

          mm.add(
            "(min-width: 1024px)",
            () => {
              const cardWraps =
                gsap.utils.toArray<HTMLElement>(
                  ".deployment-card-wrap",
                );

              const caps =
                gsap.utils.toArray<HTMLElement>(
                  ".deployment-signal-cap",
                );

              gsap.set(
                cardWraps,
                {
                  opacity: 0,
                  y: 24,
                  scale: 0.994,
                  force3D: true,
                  transformOrigin:
                    "50% 50%",
                },
              );

              gsap.set(
                caps,
                {
                  opacity: 0,
                  scaleY: 0.96,
                  transformOrigin:
                    "50% 100%",
                },
              );

              const timeline =
                gsap.timeline({
                  scrollTrigger: {
                    trigger:
                      ".deployment-cards-grid",

                    start:
                      "top 88%",

                    end:
                      "top 30%",

                    scrub: 1.75,

                    invalidateOnRefresh:
                      true,
                  },
                });

              cardWraps.forEach(
                (
                  card,
                  index,
                ) => {
                  const cardPoints =
                    gsap.utils.toArray<HTMLElement>(
                      card.querySelectorAll(
                        ".deployment-point",
                      ),
                    );

                  gsap.set(
                    cardPoints,
                    {
                      opacity: 0,
                      x:
                        rtl
                          ? 8
                          : -8,
                    },
                  );

                  timeline.to(
                    card,
                    {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      duration: 0.82,
                      ease:
                        "power1.inOut",
                      force3D: true,
                    },
                    index === 0
                      ? "+=0.02"
                      : "+=0.07",
                  );

                  if (
                    caps[index]
                  ) {
                    timeline.to(
                      caps[index],
                      {
                        opacity: 1,
                        scaleY: 1,
                        duration: 0.34,
                        ease:
                          "power1.out",
                      },
                      "-=0.48",
                    );
                  }

                  timeline.to(
                    cardPoints,
                    {
                      opacity: 1,
                      x: 0,
                      duration: 0.34,
                      stagger: 0.045,
                      ease:
                        "power1.out",
                    },
                    "-=0.48",
                  );
                },
              );
            },
          );

          mm.add(
            "(max-width: 1023px)",
            () => {
              const cardWraps =
                gsap.utils.toArray<HTMLElement>(
                  ".deployment-card-wrap",
                );

              cardWraps.forEach(
                (
                  card,
                ) => {
                  const cap =
                    card.querySelector<HTMLElement>(
                      ".deployment-signal-cap",
                    );

                  const cardPoints =
                    gsap.utils.toArray<HTMLElement>(
                      card.querySelectorAll(
                        ".deployment-point",
                      ),
                    );

                  gsap.set(
                    cardPoints,
                    {
                      opacity: 0,
                      x:
                        rtl
                          ? 8
                          : -8,
                    },
                  );

                  const itemTimeline =
                    gsap.timeline({
                      scrollTrigger: {
                        trigger:
                          card,

                        start:
                          "top 90%",

                        toggleActions:
                          "play none none reverse",
                      },
                    });

                  itemTimeline
                    .fromTo(
                      card,
                      {
                        opacity: 0,
                        y: 20,
                        scale: 0.995,
                        force3D: true,
                      },
                      {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.72,
                        ease:
                          "power1.inOut",
                        force3D: true,
                      },
                    );

                  if (
                    cap
                  ) {
                    itemTimeline.fromTo(
                      cap,
                      {
                        opacity: 0,
                      },
                      {
                        opacity: 1,
                        duration: 0.35,
                        ease:
                          "power1.out",
                      },
                      "-=0.45",
                    );
                  }

                  itemTimeline.to(
                    cardPoints,
                    {
                      opacity: 1,
                      x: 0,
                      duration: 0.3,
                      stagger: 0.04,
                      ease:
                        "power1.out",
                    },
                    "-=0.36",
                  );
                },
              );
            },
          );

          return () => {
            mm.revert();
          };
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
      "
    >
      <DeploymentBackground
        reducedMotion={
          reducedMotion
        }
      />

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
            mx-auto
            max-w-[1120px]

            text-center
          "
        >
          <div
            className="
              deployment-eyebrow

              flex
              items-center
              justify-center
              gap-3

              text-[10px]
              font-extrabold
              uppercase
              tracking-[0.31em]
              text-[#5C6BC0]

              sm:text-[11px]
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-12

                bg-gradient-to-r
                from-transparent
                to-[#9DB3E8]

                sm:w-16
              "
            />

            <span>
              {arabic
                ? "انشر بطريقتك"
                : "DEPLOY YOUR WAY"}
            </span>

            <span
              aria-hidden="true"
              className="
                h-px
                w-12

                bg-gradient-to-l
                from-transparent
                to-[#9DB3E8]

                sm:w-16
              "
            />
          </div>

          <h2
            className="
              deployment-heading

              mx-auto
              mt-5

              max-w-[1040px]

              text-[35px]
              font-[790]
              leading-[1.03]
              tracking-[-0.052em]
              text-[#07142D]

              sm:text-[45px]

              md:text-[53px]

              lg:text-[58px]

              xl:text-[62px]
            "
          >
            <DeploymentHeadline
              text={t(
                "deployment.headline",
              )}
            />
          </h2>

          <p
            className="
              deployment-description

              mx-auto
              mt-5

              max-w-[920px]

              text-[14px]
              font-medium
              leading-[1.52]
              text-[#5B7098]

              sm:text-[15px]

              lg:text-[16px]
            "
          >
            {t(
              "deployment.body",
            )}
          </p>
        </div>

        <div
          className="
            deployment-cards-grid

            relative

            mx-auto
            mt-8

            grid
            max-w-[1240px]
            grid-cols-1
            gap-5

            sm:mt-10

            md:grid-cols-2

            lg:grid-cols-3
            lg:gap-6

            xl:gap-8
          "
        >
          {visibleCards.map(
            (
              card,
              index,
            ) => (
              <DeploymentCard
                key={`${card.title}-${index}`}
                card={card}
                index={index}
                reducedMotion={
                  reducedMotion
                }
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}


/* =============================================================================
   ARCHITECTURE SECTION
============================================================================= */

type ArchitectureStageTheme = {
  color: string;
  soft: string;
  border: string;
  glow: string;
};

const ARCHITECTURE_THEMES: ArchitectureStageTheme[] = [
  {
    color: "#176FF2",
    soft: "#EAF4FF",
    border: "#D5E7FF",
    glow: "rgba(22,133,234,0.13)",
  },
  {
    color: "#19B862",
    soft: "#E9FAF1",
    border: "#D3F1DF",
    glow: "rgba(42,168,69,0.13)",
  },
  {
    color: "#176FF2",
    soft: "#EAF4FF",
    border: "#7CA9FF",
    glow: "rgba(22,133,234,0.16)",
  },
  {
    color: "#F2A21B",
    soft: "#FFF5D9",
    border: "#F5E3B0",
    glow: "rgba(242,201,76,0.15)",
  },
  {
    color: "#5C6BC0",
    soft: "#EEEFFF",
    border: "#E0E3FB",
    glow: "rgba(92,107,192,0.14)",
  },
];

type ArchitectureLayerDetail = {
  title: string;
  eyebrow: string;
  description: string;
  bullets: string[];
  boundary: string;
  stack: string[];
};

function getArchitectureLayerDetails(
  arabic: boolean,
): ArchitectureLayerDetail[] {
  if (arabic) {
    return [
      {
        title: "الوصول",
        eyebrow: "الهوية والوصول",
        description:
          "يبدأ كل طلب داخل حدود الهوية الحالية لديك. يتم تحديد المستخدم والدور والقسم وصلاحيات المستند قبل أن تصل أي عملية استرجاع إلى طبقة الذكاء الاصطناعي.",
        bullets: [
          "تكامل SSO والهوية المؤسسية",
          "أدوار وصلاحيات دقيقة",
          "سياق وصول ينتقل مع كل طلب",
        ],
        boundary:
          "لا يتم تمرير أي مستند غير مصرح به إلى الاسترجاع أو النموذج.",
        stack: [
          "Identity",
          "SSO",
          "RBAC",
        ],
      },
      {
        title: "التطبيق والسياسات",
        eyebrow: "تنسيق محكوم",
        description:
          "تدير طبقة التطبيق سير العمل والسياسات والموافقات داخل بيئتك. تظل قواعد الوصول والمراجعة والتنفيذ جزءاً من مسار المنتج نفسه.",
        bullets: [
          "Vue 3 + Inertia لواجهة المنتج",
          "Laravel لتنسيق السياسات وسير العمل",
          "مسارات مراجعة وموافقة قابلة للتدقيق",
        ],
        boundary:
          "السياسة ليست طبقة لاحقة؛ يتم تطبيقها أثناء كل خطوة في سير العمل.",
        stack: [
          "Vue 3",
          "Inertia",
          "Laravel",
        ],
      },
      {
        title: "البيانات: PostgreSQL + pgvector",
        eyebrow: "بيانات محكومة واسترجاع",
        description:
          "تحتفظ PostgreSQL بالسجلات والبيانات الوصفية المحكومة، بينما يوفّر pgvector استرجاعاً دلالياً داخل نفس حدود الأذونات ومصادر الأدلة.",
        bullets: [
          "سجلات وبيانات وصفية منظمة",
          "متجهات للاسترجاع الدلالي",
          "روابط المصدر والاستشهادات محفوظة",
        ],
        boundary:
          "تظل البيانات والمتجهات وعلاقات المصدر تحت سيطرتك وفي بيئتك.",
        stack: [
          "PostgreSQL",
          "pgvector",
          "Metadata",
        ],
      },
      {
        title: "النموذج واستدلال الذكاء الاصطناعي",
        eyebrow: "ذكاء اصطناعي خاص",
        description:
          "تستقبل طبقة النموذج السياق المصرح به فقط وتنتج إجابات مرتبطة بمصادرها. يمكن توجيه الاستدلال إلى النماذج ونقاط النهاية التي تعتمدها مؤسستك.",
        bullets: [
          "سياق مصرح به فقط",
          "سياسات للمطالبات والاستجابات",
          "إجابات مستندة إلى مصادر قابلة للفحص",
        ],
        boundary:
          "لا يحتاج المسار إلى إرسال المحتوى إلى خدمة ذكاء اصطناعي عامة متعددة المستأجرين.",
        stack: [
          "Private AI",
          "Inference",
          "Citations",
        ],
      },
      {
        title: "الأمن والمراقبة",
        eyebrow: "دليل وتشغيل",
        description:
          "يتم تسجيل الوصول والاسترجاع والاستدلال والمراجعة والقرار كأحداث قابلة للمراقبة والتدقيق، مع بقاء المفاتيح وضوابط التشغيل داخل حدودك.",
        bullets: [
          "سجل تدقيق للأحداث الحساسة",
          "مراقبة وتشخيص قابلان للربط",
          "مفاتيح وضوابط تشغيل تحت سيطرة العميل",
        ],
        boundary:
          "يمكن ربط كل إجابة وسلوك بالمستخدم والمصدر والسياسة والإجراء.",
        stack: [
          "Audit",
          "Observability",
          "Keys",
        ],
      },
    ];
  }

  return [
    {
      title: "Access",
      eyebrow: "Identity & access",
      description:
        "Every request starts inside your existing identity boundary. User, role, department, and document permissions are resolved before retrieval reaches the AI layer.",
      bullets: [
        "Enterprise identity and SSO integration",
        "Role- and document-level authorization",
        "Permission context travels with every request",
      ],
      boundary:
        "Unauthorized documents never enter retrieval or model context.",
      stack: [
        "Identity",
        "SSO",
        "RBAC",
      ],
    },
    {
      title: "Application and policy",
      eyebrow: "Governed orchestration",
      description:
        "The product layer coordinates workflows, policy checks, and approvals inside your environment. Access rules and review gates remain part of the application path itself.",
      bullets: [
        "Vue 3 + Inertia product experience",
        "Laravel policy and workflow orchestration",
        "Review and approval routes with auditability",
      ],
      boundary:
        "Policy is enforced during the workflow, not added after the answer.",
      stack: [
        "Vue 3",
        "Inertia",
        "Laravel",
      ],
    },
    {
      title: "Data: PostgreSQL + pgvector",
      eyebrow: "Governed data & retrieval",
      description:
        "PostgreSQL holds governed records and metadata while pgvector enables semantic retrieval inside the same permission boundary and source-evidence model.",
      bullets: [
        "Structured records and governed metadata",
        "Vector retrieval for semantic search",
        "Source links and citation relationships retained",
      ],
      boundary:
        "Records, vectors, and source relationships remain under your control.",
      stack: [
        "PostgreSQL",
        "pgvector",
        "Metadata",
      ],
    },
    {
      title: "Model and AI inference",
      eyebrow: "Private AI execution",
      description:
        "The model layer receives only authorized context and returns source-grounded answers. Inference can be routed to the models and endpoints your organization approves.",
      bullets: [
        "Authorized context only",
        "Prompt and response policy controls",
        "Inspectable, source-grounded answers",
      ],
      boundary:
        "The workflow does not require sending content to a public multi-tenant AI service.",
      stack: [
        "Private AI",
        "Inference",
        "Citations",
      ],
    },
    {
      title: "Security and observability",
      eyebrow: "Evidence & operations",
      description:
        "Access, retrieval, inference, review, and decision events are captured for monitoring and audit while keys and operational controls stay inside your boundary.",
      bullets: [
        "Audit evidence for sensitive actions",
        "Correlated monitoring and diagnostics",
        "Customer-controlled keys and operational controls",
      ],
      boundary:
        "Every answer and action can be traced to user, source, policy, and decision.",
      stack: [
        "Audit",
        "Observability",
        "Keys",
      ],
    },
  ];
}


function ArchitectureHeadline({
  text,
}: {
  text: string;
}) {
  const phrases = [
    "you already govern",
    "already govern",
  ];

  const lower =
    text.toLowerCase();

  const phrase =
    phrases.find(
      (candidate) =>
        lower.includes(
          candidate,
        ),
    );

  if (!phrase) {
    return <>{text}</>;
  }

  const index =
    lower.indexOf(
      phrase,
    );

  return (
    <>
      {text.slice(
        0,
        index,
      )}

      <span className="text-[#176FF2]">
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

function ArchitectureStageIcon({
  index,
  theme,
}: {
  index: number;
  theme: ArchitectureStageTheme;
}) {
  const stroke = {
    stroke: theme.color,
    strokeWidth: 2.35,
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
        className="h-10 w-10"
        aria-hidden="true"
      >
        <circle
          cx="18"
          cy="17"
          r="6"
          {...stroke}
        />

        <circle
          cx="30"
          cy="18"
          r="5"
          {...stroke}
        />

        <path
          d="M8 39v-3c0-7 4.6-12 10-12s10 5 10 12v3"
          {...stroke}
        />

        <path
          d="M27 26c6 .5 11 4.5 11 11v2"
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
        className="h-10 w-10"
        aria-hidden="true"
      >
        <rect
          x="12"
          y="8"
          width="24"
          height="32"
          rx="3"
          {...stroke}
        />

        <path
          d="M18 14h12M18 20h12M18 26h8"
          {...stroke}
        />

        <circle
          cx="29"
          cy="34"
          r="2"
          fill={theme.color}
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
          rx="12"
          ry="5"
          {...stroke}
        />

        <path
          d="M12 12v11c0 3 5.4 5.5 12 5.5S36 26 36 23V12"
          {...stroke}
        />

        <path
          d="M12 23v11c0 3 5.4 5.5 12 5.5S36 37 36 34V23"
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
          d="M24 6 27.5 18.5 40 22l-12.5 3.5L24 38l-3.5-12.5L8 22l12.5-3.5L24 6Z"
          {...stroke}
        />

        <path
          d="m36 8 1.8 5.2L43 15l-5.2 1.8L36 22l-1.8-5.2L29 15l5.2-1.8L36 8Z"
          {...stroke}
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
        d="M24 5 39 11v11c0 9-5.5 16-15 21-9.5-5-15-12-15-21V11L24 5Z"
        {...stroke}
      />

      <path
        d="m18 23 4 4 8-9"
        {...stroke}
      />
    </svg>
  );
}

function VueMark() {
  return (
    <svg
      viewBox="0 0 48 42"
      className="h-8 w-9"
      aria-label="Vue"
      role="img"
    >
      <path
        d="M3 4h10l11 18L35 4h10L24 38 3 4Z"
        fill="#41B883"
      />

      <path
        d="M12 4h8l4 7 4-7h8L24 24 12 4Z"
        fill="#34495E"
      />
    </svg>
  );
}

function InertiaMark() {
  return (
    <svg
      viewBox="0 0 48 42"
      className="h-8 w-9"
      aria-label="Inertia"
      role="img"
    >
      <path
        d="m7 7 12 14L7 35h8l12-14L15 7H7Z"
        fill="#7A35F2"
      />

      <path
        d="m21 7 12 14-12 14h8l12-14L29 7h-8Z"
        fill="#9A4BFF"
      />
    </svg>
  );
}

function LaravelMark() {
  return (
    <svg
      viewBox="0 0 48 42"
      fill="none"
      className="h-8 w-9"
      aria-label="Laravel"
      role="img"
    >
      <path
        d="M6 9 16 4l9 5v11l-10 5-9-5V9Z"
        stroke="#F04438"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="m25 9 9-5 8 5v10l-9 5-8-4V9Z"
        stroke="#F04438"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="m15 25 9-5 9 4v10l-9 5-9-5v-9Z"
        stroke="#F04438"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="M16 4v11l9 5M6 9l10 6M34 4v10l8 5M25 9l9 5M24 20v10l9 4"
        stroke="#F04438"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PostgresMark() {
  return (
    <svg
      viewBox="0 0 52 48"
      fill="none"
      className="h-9 w-10"
      aria-label="PostgreSQL"
      role="img"
    >
      <path
        d="M26 5c-9 0-16 6-16 15 0 5 1 9 4 13l5-2c-1-4-2-8-1-11 1-4 4-7 8-7 5 0 8 3 9 7 1 3 0 6-1 8-1 3-1 6 1 9 2 3 6 3 9 1l-2-5c-2 1-3 1-4 0-1-1-1-3 0-5 2-5 3-9 1-14C37 8 32 5 26 5Z"
        fill="#336791"
        stroke="#24527A"
        strokeWidth="1.2"
      />

      <circle
        cx="23"
        cy="17"
        r="1.5"
        fill="#FFFFFF"
      />

      <path
        d="M19 30c3 1 7 1 11-1"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PgVectorMark() {
  return (
    <svg
      viewBox="0 0 52 48"
      fill="none"
      className="h-9 w-10"
      aria-label="pgvector"
      role="img"
    >
      <path
        d="M12 12 25 9l14 8-3 16-14 6-12-10 2-17Z"
        stroke="#234D91"
        strokeWidth="1.6"
        opacity="0.45"
      />

      {[
        [12, 12],
        [25, 9],
        [39, 17],
        [36, 33],
        [22, 39],
        [10, 29],
        [25, 24],
      ].map(
        (
          [
            x,
            y,
          ],
          index,
        ) => (
          <circle
            key={index}
            cx={x}
            cy={y}
            r={
              index === 6
                ? 4
                : 3
            }
            fill="#234D91"
          />
        ),
      )}

      <path
        d="M12 12 25 24 25 9M25 24 39 17M25 24 36 33M25 24 22 39M25 24 10 29"
        stroke="#234D91"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArchitectureTechMarks({
  index,
}: {
  index: number;
}) {
  if (index === 1) {
    return (
      <div
        className="
          mt-3
          flex
          items-center
          justify-center
          gap-3
        "
      >
        <VueMark />
        <InertiaMark />
        <LaravelMark />
      </div>
    );
  }

  if (index === 2) {
    return (
      <div
        className="
          mt-3
          flex
          items-center
          justify-center
          gap-4
        "
      >
        <PostgresMark />

        <span
          aria-hidden="true"
          className="
            h-8
            w-px
            bg-[#D7E4F4]
          "
        />

        <PgVectorMark />
      </div>
    );
  }

  return null;
}

function ArchitectureSignalConnector({
  index,
  reducedMotion,
  rtl,
}: {
  index: number;
  reducedMotion: boolean;
  rtl: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`
        architecture-connector

        pointer-events-none
        absolute
        top-1/2
        z-20

        hidden
        h-[18px]
        w-10
        -translate-y-1/2

        lg:block

        ${
          rtl
            ? "-left-10"
            : "-right-10"
        }
      `}
    >
      <span
        className="
          absolute
          left-0
          right-0
          top-1/2
          h-px
          -translate-y-1/2

          bg-[#9FC0F3]
        "
      />

      <span
        className={`
          absolute
          top-1/2

          h-2.5
          w-2.5
          -translate-y-1/2

          rounded-full

          bg-[#9CBEEF]

          shadow-[0_0_14px_rgba(22,133,234,0.18)]

          ${
            rtl
              ? "right-[-5px]"
              : "left-[-5px]"
          }
        `}
      />

      <span
        className={`
          absolute
          top-1/2

          h-2.5
          w-2.5
          -translate-y-1/2

          rounded-full

          bg-[#9CBEEF]

          shadow-[0_0_14px_rgba(22,133,234,0.18)]

          ${
            rtl
              ? "left-[-5px]"
              : "right-[-5px]"
          }
        `}
      />

      {!reducedMotion && (
        <motion.span
          className="
            absolute
            top-1/2

            h-[5px]
            w-[5px]
            -translate-y-1/2

            rounded-full

            bg-[#176FF2]

            shadow-[0_0_10px_rgba(22,133,234,0.62)]
          "
          initial={{
            left:
              rtl
                ? "82%"
                : "5%",
          }}
          animate={{
            left:
              rtl
                ? [
                    "82%",
                    "5%",
                  ]
                : [
                    "5%",
                    "82%",
                  ],
          }}
          transition={{
            duration:
              4.8 +
              index *
                0.35,
            repeat:
              Infinity,
            ease: "linear",
            delay:
              index *
              0.55,
          }}
        />
      )}
    </div>
  );
}

function ArchitectureMobileConnector({
  index,
  reducedMotion,
}: {
  index: number;
  reducedMotion: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="
        architecture-mobile-connector

        relative
        mx-auto
        h-9
        w-8

        lg:hidden
      "
    >
      <span
        className="
          absolute
          bottom-0
          left-1/2
          top-0
          w-px
          -translate-x-1/2

          bg-[#A8C6F4]
        "
      />

      <span
        className="
          absolute
          left-1/2
          top-0

          h-2.5
          w-2.5
          -translate-x-1/2

          rounded-full
          bg-[#9CBEEF]
        "
      />

      <span
        className="
          absolute
          bottom-0
          left-1/2

          h-2.5
          w-2.5
          -translate-x-1/2

          rounded-full
          bg-[#9CBEEF]
        "
      />

      {!reducedMotion && (
        <motion.span
          className="
            absolute
            left-1/2

            h-[5px]
            w-[5px]
            -translate-x-1/2

            rounded-full

            bg-[#176FF2]

            shadow-[0_0_10px_rgba(22,133,234,0.60)]
          "
          initial={{
            top: "8%",
          }}
          animate={{
            top: [
              "8%",
              "82%",
            ],
          }}
          transition={{
            duration:
              4.8 +
              index *
                0.3,
            repeat:
              Infinity,
            ease: "linear",
          }}
        />
      )}
    </div>
  );
}

function ArchitectureStageCard({
  index,
  title,
  reducedMotion,
  rtl,
  active,
  onSelect,
}: {
  index: number;
  title: string;
  reducedMotion: boolean;
  rtl: boolean;
  active: boolean;
  onSelect: () => void;
}) {
  const theme =
    ARCHITECTURE_THEMES[index];

  return (
    <div
      className="
        architecture-stage-wrap

        relative
        mx-auto
        w-full
        max-w-[340px]

        transform-gpu
        will-change-transform

        lg:max-w-none
      "
    >
      <motion.button
        type="button"
        aria-pressed={active}
        onClick={onSelect}
        whileHover={
          reducedMotion
            ? undefined
            : {
                y: -4,
                scale: 1.012,
              }
        }
        whileTap={
          reducedMotion
            ? undefined
            : {
                scale: 0.992,
              }
        }
        transition={{
          duration: 0.38,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        className="
          architecture-stage-card

          group
          relative
          z-10

          flex
          min-h-[190px]
          w-full
          flex-col
          items-center
          justify-center

          overflow-hidden

          rounded-[20px]

          border

          bg-white/72

          px-4
          py-5

          text-center

          outline-none

          shadow-[0_18px_50px_rgba(53,81,106,0.08),inset_0_1px_0_rgba(255,255,255,1)]

          backdrop-blur-[20px]

          transition-[border-color,box-shadow,background-color]
          duration-500

          focus-visible:ring-2
          focus-visible:ring-[#176FF2]/30
          focus-visible:ring-offset-2

          sm:min-h-[200px]
          sm:px-5

          cursor-pointer
        "
        style={{
          borderColor:
            active
              ? theme.color
              : index === 2
                ? "#9CC0FF"
                : "#DFEAF6",

          background:
            active
              ? `linear-gradient(145deg, rgba(255,255,255,.94), ${theme.soft}A8)`
              : "rgba(255,255,255,.72)",

          boxShadow:
            active
              ? `0 24px 62px ${theme.glow}, 0 0 0 1px ${theme.color}18, inset 0 1px 0 rgba(255,255,255,1)`
              : `0 20px 58px ${theme.glow}, inset 0 1px 0 rgba(255,255,255,1)`,
        }}
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-4
            top-0
            h-px

            bg-gradient-to-r
            from-transparent
            via-white
            to-transparent
          "
        />

        {active && (
          <motion.span
            layoutId="architecture-active-glow"
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-[18%]
              bottom-0
              h-[3px]
              rounded-t-full
            "
            style={{
              backgroundColor:
                theme.color,

              boxShadow:
                `0 -5px 18px ${theme.glow}`,
            }}
          />
        )}

        <span
          className="
            flex
            h-[66px]
            w-[66px]
            shrink-0
            items-center
            justify-center

            rounded-full

            border
            border-white/90

            shadow-[0_10px_30px_rgba(47,78,105,0.08),inset_0_1px_0_rgba(255,255,255,1)]

            sm:h-[70px]
            sm:w-[70px]
          "
          style={{
            backgroundColor:
              theme.soft,
          }}
        >
          <ArchitectureStageIcon
            index={index}
            theme={theme}
          />
        </span>

        <h3
          className="
            mt-3

            max-w-[210px]

            text-[15px]
            font-[760]
            leading-[1.18]
            tracking-[-0.025em]
            text-[#07142D]

            sm:text-[16px]

            xl:text-[17px]
          "
        >
          {title}
        </h3>

        <ArchitectureTechMarks
          index={index}
        />

        <span
          className="
            mt-3
            inline-flex
            items-center
            gap-1.5

            text-[9px]
            font-bold
            uppercase
            tracking-[0.13em]
          "
          style={{
            color:
              theme.color,
          }}
        >
          <span>
            {active
              ? "Selected"
              : "View layer"}
          </span>

          <span
            className={`
              transition-transform
              duration-300

              group-hover:translate-x-0.5

              ${
                rtl
                  ? "rotate-180"
                  : ""
              }
            `}
          >
            →
          </span>
        </span>
      </motion.button>

      {index < 4 && (
        <ArchitectureSignalConnector
          index={index}
          reducedMotion={
            reducedMotion
          }
          rtl={rtl}
        />
      )}
    </div>
  );
}

function ArchitectureLayerDetails({
  detail,
  index,
  arabic,
}: {
  detail: ArchitectureLayerDetail;
  index: number;
  arabic: boolean;
}) {
  const theme =
    ARCHITECTURE_THEMES[index];

  return (
    <motion.div
      key={`${index}-${detail.title}`}
      initial={{
        opacity: 0,
        y: 12,
        scale: 0.995,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className="
        architecture-layer-detail

        relative
        overflow-hidden

        rounded-[20px]

        border
        border-[#DCEAF7]

        bg-[linear-gradient(135deg,rgba(255,255,255,0.90),rgba(244,250,255,0.76))]

        p-4

        shadow-[0_18px_52px_rgba(49,80,107,0.07),inset_0_1px_0_rgba(255,255,255,1)]

        backdrop-blur-[20px]

        sm:p-5
        lg:p-6
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-16
          -top-20
          h-44
          w-44
          rounded-full
          blur-3xl
        "
        style={{
          backgroundColor:
            `${theme.color}12`,
        }}
      />

      <div
        className="
          relative
          z-10

          grid
          gap-5

          lg:grid-cols-[1.35fr_0.65fr]
          lg:gap-7
        "
      >
        <div>
          <div
            className="
              flex
              items-start
              gap-4
            "
          >
            <span
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center

                rounded-[14px]

                border
                border-white/90

                shadow-[0_9px_24px_rgba(47,78,105,0.08),inset_0_1px_0_rgba(255,255,255,1)]
              "
              style={{
                backgroundColor:
                  theme.soft,
              }}
            >
              <ArchitectureStageIcon
                index={index}
                theme={theme}
              />
            </span>

            <div className="min-w-0">
              <p
                className="
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-[0.2em]
                "
                style={{
                  color:
                    theme.color,
                }}
              >
                {detail.eyebrow}
              </p>

              <h4
                className="
                  mt-1.5

                  text-[19px]
                  font-[780]
                  leading-[1.15]
                  tracking-[-0.03em]
                  text-[#07142D]

                  sm:text-[21px]
                "
              >
                {detail.title}
              </h4>
            </div>
          </div>

          <p
            className="
              mt-4

              max-w-[760px]

              text-[12.5px]
              font-medium
              leading-[1.6]
              text-[#566E93]

              sm:text-[13.5px]
            "
          >
            {detail.description}
          </p>

          <div
            className="
              mt-4

              grid
              gap-2.5

              sm:grid-cols-3
            "
          >
            {detail.bullets.map(
              (
                bullet,
                bulletIndex,
              ) => (
                <div
                  key={`${bullet}-${bulletIndex}`}
                  className="
                    flex
                    min-w-0
                    items-start
                    gap-2.5

                    rounded-[12px]

                    border
                    border-white

                    bg-white/72

                    px-3
                    py-3

                    shadow-[0_8px_22px_rgba(46,75,102,0.045),inset_0_1px_0_rgba(255,255,255,1)]
                  "
                >
                  <span
                    className="
                      mt-0.5
                      flex
                      h-5
                      w-5
                      shrink-0
                      items-center
                      justify-center

                      rounded-full

                      text-[10px]
                      font-black
                      text-white
                    "
                    style={{
                      backgroundColor:
                        theme.color,
                    }}
                  >
                    ✓
                  </span>

                  <span
                    className="
                      text-[10.5px]
                      font-semibold
                      leading-[1.4]
                      text-[#40597E]

                      sm:text-[11px]
                    "
                  >
                    {bullet}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        <div
          className="
            rounded-[16px]

            border
            border-white

            bg-white/72

            p-4

            shadow-[0_12px_34px_rgba(47,77,101,0.055),inset_0_1px_0_rgba(255,255,255,1)]
          "
        >
          <p
            className="
              text-[9px]
              font-extrabold
              uppercase
              tracking-[0.18em]
              text-[#7B8EAE]
            "
          >
            {arabic
              ? "حدود التحكم"
              : "CONTROL BOUNDARY"}
          </p>

          <div
            className="
              mt-3
              flex
              items-start
              gap-3
            "
          >
            <span
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center

                rounded-[10px]

                bg-[#EAF4FF]
                text-[#176FF2]
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
              >
                <rect
                  x="6"
                  y="10"
                  width="12"
                  height="10"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />

                <path
                  d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <p
              className="
                text-[11px]
                font-semibold
                leading-[1.5]
                text-[#415A80]

                sm:text-[11.5px]
              "
            >
              {detail.boundary}
            </p>
          </div>

          <div
            className="
              mt-4
              flex
              flex-wrap
              gap-2
            "
          >
            {detail.stack.map(
              (item) => (
                <span
                  key={item}
                  className="
                    rounded-full

                    border
                    border-[#DFEAF6]

                    bg-[#F8FBFE]

                    px-2.5
                    py-1.5

                    text-[9px]
                    font-bold
                    text-[#4E658A]
                  "
                >
                  {item}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ArchitectureDetailModal({
  open,
  onClose,
  arabic,
  reducedMotion,
}: {
  open: boolean;
  onClose: () => void;
  arabic: boolean;
  reducedMotion: boolean;
}) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    const onKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key ===
        "Escape"
      ) {
        onClose();
      }
    };

    document.body.style.overflow =
      "hidden";

    window.addEventListener(
      "keydown",
      onKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        onKeyDown,
      );
    };
  }, [
    open,
    onClose,
  ]);

  if (!open) {
    return null;
  }

  const modalItems = arabic
    ? [
        {
          title: "التجربة",
          text: "Vue 3 مع Inertia · البحث · العارض · صندوق سير العمل · الإدارة",
          color: "#1685EA",
          soft: "#EAF4FF",
        },
        {
          title: "التطبيق والسياسات",
          text: "Laravel modular monolith · APIs · RBAC · workflow · audit enforcement",
          color: "#2AA845",
          soft: "#EAFBF1",
        },
        {
          title: "ذكاء المستندات",
          text: "OCR gateway · التصنيف · الاستخراج · التحقق",
          color: "#5C6BC0",
          soft: "#F0EEFF",
        },
        {
          title: "المعرفة والذكاء الاصطناعي",
          text: "LangGraph · embeddings · vLLM خلف بوابة نموذج داخلية",
          color: "#F2C94C",
          soft: "#FFF8DF",
        },
        {
          title: "البيانات",
          text: "PostgreSQL system of record · pgvector embeddings · object storage للأصول · OpenSearch عند الحاجة إلى نطاق بحث مؤسسي",
          color: "#22A3E0",
          soft: "#EAF8FD",
        },
        {
          title: "التكامل والأمن",
          text: "Identity provider · SIEM · backup · signed offline updates",
          color: "#E5232A",
          soft: "#FFF0F2",
        },
      ]
    : [
        {
          title: "Experience",
          text: "Vue 3 with Inertia · search · viewer · workflow inbox · administration",
          color: "#1685EA",
          soft: "#EAF4FF",
        },
        {
          title: "Application and policy",
          text: "Laravel modular monolith · APIs · RBAC · workflow · audit enforcement",
          color: "#2AA845",
          soft: "#EAFBF1",
        },
        {
          title: "Document intelligence",
          text: "OCR gateway · classification · extraction · validation",
          color: "#5C6BC0",
          soft: "#F0EEFF",
        },
        {
          title: "Knowledge and AI",
          text: "LangGraph · embeddings · vLLM behind an internal model gateway",
          color: "#F2C94C",
          soft: "#FFF8DF",
        },
        {
          title: "Data",
          text: "PostgreSQL system of record · pgvector embeddings · object storage for originals · OpenSearch only when enterprise search scale requires it",
          color: "#22A3E0",
          soft: "#EAF8FD",
        },
        {
          title: "Integration and security",
          text: "Identity provider · SIEM · backup · signed offline updates",
          color: "#E5232A",
          soft: "#FFF0F2",
        },
      ];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={
        arabic
          ? "البنية التفصيلية للمنتج"
          : "Detailed product architecture"
      }
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
            }
      }
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      onMouseDown={(
        event,
      ) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
      className="
        fixed
        inset-0
        z-[150]

        flex
        items-center
        justify-center
        
        overflow-y-auto
        overscroll-contain

        bg-[#10213A]/72

        p-3

        backdrop-blur-[12px]

        sm:p-4
      "
    >
      <motion.div
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                y: 24,
                scale: 0.975,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        onMouseDown={(
          event,
        ) =>
          event.stopPropagation()
        }
        className="
          relative

          my-auto
          w-full
          max-w-[760px]

          overflow-hidden

          rounded-[24px]

          border
          border-white/90

          bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(244,250,255,0.96))]

          shadow-[0_40px_120px_rgba(5,24,46,0.34),inset_0_1px_0_rgba(255,255,255,1)]

          backdrop-blur-[28px]
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-24
            -top-28

            h-64
            w-64

            rounded-full

            bg-[#22A3E0]/10

            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-28
            -left-24

            h-64
            w-64

            rounded-full

            bg-[#5C6BC0]/10

            blur-3xl
          "
        />

        <div
          className="
            relative
            z-10

            flex
            items-start
            justify-between
            gap-4

            border-b
            border-[#E3EDF7]

            p-4
          "
        >
          <div className="min-w-0">
            <p
              className="
                text-[9px]
                font-extrabold
                uppercase
                tracking-[0.24em]
                text-[#1685EA]
              "
            >
              {arabic
                ? "DOCHIVE · ARCHITECTURE"
                : "DOCHIVE · ARCHITECTURE"}
            </p>

            <h3
              className="
                mt-1.5

                text-[22px]
                font-[790]
                leading-[1.15]
                tracking-[-0.035em]
                text-[#07142D]

                sm:text-[26px]
              "
            >
              {arabic
                ? "البنية التفصيلية للمنتج"
                : "Detailed product architecture"}
            </h3>

            <p
              className="
                mt-1.5

                max-w-[560px]

                text-[11.5px]
                font-medium
                leading-[1.5]
                text-[#627797]

                sm:text-[12.5px]
              "
            >
              {arabic
                ? "طبقات المنتج الأساسية التي تعمل داخل بيئتك المحكومة."
                : "The core product layers that run inside your governed environment."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={
              arabic
                ? "إغلاق"
                : "Close"
            }
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center

              rounded-full

              border
              border-[#D9E7F5]

              bg-white/88

              text-[#405A7D]

              shadow-[0_8px_24px_rgba(35,65,91,0.09),inset_0_1px_0_rgba(255,255,255,1)]

              transition
              duration-300

              hover:-translate-y-0.5
              hover:border-[#BCD5F6]
              hover:text-[#1685EA]
            "
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                d="m7 7 10 10M17 7 7 17"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div
          className="
            relative
            z-10

            max-h-[72vh]
            overflow-y-auto
            overscroll-contain

            p-4
          "
        >
          <div className="space-y-2">
            {modalItems.map(
              (
                item,
                index,
              ) => (
                <motion.article
                  key={item.title}
                  initial={
                    reducedMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 12,
                          scale: 0.992,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.45,
                    delay:
                      reducedMotion
                        ? 0
                        : 0.08 +
                          index *
                            0.06,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className="
                    group

                    relative

                    overflow-hidden

                    rounded-[15px]

                    border
                    border-[#DCE7F3]

                    bg-white/72

                    px-4
                    py-4

                    shadow-[0_12px_34px_rgba(37,69,96,0.055),inset_0_1px_0_rgba(255,255,255,1)]

                    backdrop-blur-[18px]

                    transition
                    duration-300

                    hover:-translate-y-0.5
                    hover:border-[#C9DBEF]

                    sm:px-5
                    sm:py-4.5
                  "
                >
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none

                      absolute
                      inset-x-4
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
                      flex
                      items-start
                      gap-3.5
                    "
                  >
                    <span
                      className="
                        mt-0.5

                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center

                        rounded-[10px]

                        border
                        border-white/90

                        text-[12px]
                        font-extrabold

                        shadow-[0_7px_20px_rgba(42,70,94,0.07),inset_0_1px_0_rgba(255,255,255,1)]
                      "
                      style={{
                        color:
                          item.color,

                        backgroundColor:
                          item.soft,
                      }}
                    >
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <div className="min-w-0">
                      <h4
                        className="
                          text-[13.5px]
                          font-[760]
                          leading-[1.2]
                          tracking-[-0.015em]
                          text-[#0B1C36]

                          sm:text-[14.5px]
                        "
                      >
                        {item.title}
                      </h4>

                      <p
                        className="
                          mt-1.5

                          text-[11.5px]
                          font-medium
                          leading-[1.5]
                          text-[#526788]

                          sm:text-[12.5px]
                        "
                      >
                        {item.text}
                      </p>
                    </div>
                  </div>

                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      bottom-0
                      left-0

                      h-[2px]
                      w-full

                      origin-left
                      scale-x-0

                      transition-transform
                      duration-500

                      group-hover:scale-x-100
                    "
                    style={{
                      backgroundColor:
                        item.color,
                    }}
                  />
                </motion.article>
              ),
            )}
          </div>
        </div>

        <div
          className="
            relative
            z-10

            flex
            items-center
            justify-between
            gap-3

            border-t
            border-[#E3EDF7]

            bg-white/56

            p-4

            backdrop-blur-[18px]
          "
        >
          <div
            className="
              hidden
              items-center
              gap-2

              text-[10px]
              font-semibold
              text-[#667A99]

              sm:flex
            "
          >
            <span className="h-2 w-2 rounded-full bg-[#2AA845]" />

            {arabic
              ? "يعمل داخل بيئتك"
              : "Runs inside your environment"}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              inline-flex
              min-h-[42px]
              items-center
              justify-center
              gap-2

              rounded-[11px]

              border
              border-[#CFE0F2]

              bg-white

              px-4

              text-[12px]
              font-bold
              text-[#163359]

              shadow-[0_8px_22px_rgba(37,65,90,0.065),inset_0_1px_0_rgba(255,255,255,1)]

              transition
              duration-300

              hover:-translate-y-0.5
              hover:border-[#B8D2EF]
              hover:text-[#1685EA]
            "
          >
            {arabic
              ? "إغلاق المخطط"
              : "Close diagram"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ArchitectureEnvironment({
  reducedMotion,
  arabic,
  rtl,
  activeIndex,
  onSelect,
  details,
}: {
  reducedMotion: boolean;
  arabic: boolean;
  rtl: boolean;
  activeIndex: number;
  onSelect: (index: number) => void;
  details: ArchitectureLayerDetail[];
}) {
  const titles =
    details.map(
      (
        item,
      ) =>
        item.title,
    );

  return (
    <div
      className="
        architecture-environment

        relative

        mx-auto

        w-full
        max-w-[1460px]

        rounded-[28px]

        border
        border-[#D6E7FA]

        bg-white/58

        p-3

        shadow-[0_24px_82px_rgba(45,77,104,0.08),inset_0_1px_0_rgba(255,255,255,1)]

        backdrop-blur-[22px]

        sm:p-4

        lg:p-5
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-6
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

          rounded-[24px]

          border
          border-dashed
          border-[#AFCFF8]

          px-4
          pb-5
          pt-4

          sm:px-5
          sm:pb-6

          lg:px-6
          lg:pb-7
          lg:pt-4
        "
      >
        <div
          className="
            flex
            flex-col
            gap-3

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div
            className="
              flex
              min-w-0
              items-center
              gap-3

              text-[13px]
              font-bold
              text-[#176FF2]

              sm:text-[14px]
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

                rounded-[9px]

                bg-[#EAF4FF]

                text-[#176FF2]
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <rect
                  x="6"
                  y="10"
                  width="12"
                  height="10"
                  rx="2"
                  fill="currentColor"
                  opacity="0.95"
                />

                <path
                  d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <circle
                  cx="12"
                  cy="15"
                  r="1.2"
                  fill="#FFFFFF"
                />
              </svg>
            </span>

            <span className="truncate">
              {arabic
                ? "يعمل داخل بيئتك"
                : "Runs inside your environment"}
            </span>
          </div>

          <span
            className="
              text-[9px]
              font-extrabold
              uppercase
              tracking-[0.28em]
              text-[#7C91B7]

              sm:text-[10px]
            "
          >
            {arabic
              ? "بيئتك المحكومة"
              : "YOUR GOVERNED ENVIRONMENT"}
          </span>
        </div>

        {/* Desktop / laptop */}
        <div
          className="
            architecture-desktop-flow

            relative

            mt-7

            hidden

            grid-cols-5
            items-stretch
            gap-10

            lg:grid

            xl:gap-11
          "
        >
          {titles.map(
            (
              title,
              index,
            ) => (
              <ArchitectureStageCard
                key={`${title}-${index}`}
                index={index}
                title={title}
                reducedMotion={
                  reducedMotion
                }
                rtl={rtl}
                active={
                  activeIndex ===
                  index
                }
                onSelect={() =>
                  onSelect(
                    index,
                  )
                }
              />
            ),
          )}
        </div>

        {/* Mobile / tablet */}
        <div
          className="
            architecture-mobile-flow

            mx-auto
            mt-6
            max-w-[650px]

            lg:hidden
          "
        >
          {titles.map(
            (
              title,
              index,
            ) => (
              <div
                key={`mobile-${title}-${index}`}
              >
                <ArchitectureStageCard
                  index={index}
                  title={title}
                  reducedMotion={
                    reducedMotion
                  }
                  rtl={rtl}
                  active={
                    activeIndex ===
                    index
                  }
                  onSelect={() =>
                    onSelect(
                      index,
                    )
                  }
                />

                {index <
                  titles.length -
                    1 && (
                  <ArchitectureMobileConnector
                    index={index}
                    reducedMotion={
                      reducedMotion
                    }
                  />
                )}
              </div>
            ),
          )}
        </div>

        {/* Clicked card information */}
        <div
          className="
            mt-6
            border-t
            border-[#DDEAF7]
            pt-5

            sm:mt-7
            sm:pt-6
          "
        >
          <ArchitectureLayerDetails
            detail={
              details[
                activeIndex
              ]
            }
            index={
              activeIndex
            }
            arabic={
              arabic
            }
          />
        </div>
      </div>
    </div>
  );
}

function ArchitectureBackground({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const rawId =
    useId();

  const clean =
    rawId.replace(
      /:/g,
      "",
    );

  const leftPathId =
    `architecture-bg-left-${clean}`;

  const rightPathId =
    `architecture-bg-right-${clean}`;

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        -z-20
      "
    >
      <div
        className="
          absolute
          -left-[250px]
          top-[45px]

          h-[520px]
          w-[520px]

          rounded-[45%]

          bg-[radial-gradient(circle_at_67%_46%,rgba(209,233,251,0.60),rgba(239,248,255,0.40)_52%,rgba(255,255,255,0)_75%)]
        "
      />

      <div
        className="
          absolute
          -right-[300px]
          top-[210px]

          h-[560px]
          w-[560px]

          rounded-[44%]

          bg-[radial-gradient(circle_at_30%_43%,rgba(216,236,251,0.60),rgba(242,249,255,0.38)_52%,rgba(255,255,255,0)_76%)]
        "
      />

      <div
        className="
          absolute
          -left-[58px]
          top-[116px]

          h-[315px]
          w-[260px]

          rounded-[38px]

          bg-[linear-gradient(145deg,rgba(219,237,251,0.54),rgba(255,255,255,0.10))]

          [clip-path:polygon(0_0,100%_32%,100%_85%,17%_100%,0_73%)]
        "
      />

      <div
        className="
          absolute
          right-[-52px]
          top-[235px]

          h-[335px]
          w-[265px]

          bg-[linear-gradient(145deg,rgba(225,239,251,0.54),rgba(255,255,255,0.10))]

          [clip-path:polygon(65%_0,100%_0,100%_100%,13%_100%,0_53%)]
        "
      />

      <div
        className="
          absolute
          right-[4.5%]
          top-[62px]

          grid
          grid-cols-4
          gap-4

          opacity-45
        "
      >
        {Array.from({
          length: 16,
        }).map(
          (
            _,
            index,
          ) => (
            <span
              key={index}
              className="
                h-[4px]
                w-[4px]
                rounded-full
                bg-[#76B5F8]
              "
            />
          ),
        )}
      </div>

      <div
        className="
          absolute
          bottom-[48px]
          left-[3.5%]

          grid
          grid-cols-4
          gap-4

          opacity-42
        "
      >
        {Array.from({
          length: 16,
        }).map(
          (
            _,
            index,
          ) => (
            <span
              key={index}
              className="
                h-[4px]
                w-[4px]
                rounded-full
                bg-[#7CB9F8]
              "
            />
          ),
        )}
      </div>

      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        className="
          absolute
          inset-0
          h-full
          w-full
        "
      >
        <path
          id={leftPathId}
          d="
            M-40 134
            C91 94 204 126 273 214
            C335 293 351 374 337 463
          "
          fill="none"
          stroke="#78B3F6"
          strokeWidth="1.2"
          strokeDasharray="4 9"
          opacity="0.18"
        />

        <path
          id={rightPathId}
          d="
            M1650 250
            C1516 215 1420 239 1357 316
            C1302 384 1282 455 1289 539
          "
          fill="none"
          stroke="#6FAFF7"
          strokeWidth="1.2"
          strokeDasharray="4 9"
          opacity="0.18"
        />

        {!reducedMotion && (
          <>
            <circle
              r="3.6"
              fill="#176FF2"
              opacity="0.55"
            >
              <animateMotion
                dur="15s"
                repeatCount="indefinite"
              >
                <mpath
                  href={`#${leftPathId}`}
                />
              </animateMotion>
            </circle>

            <circle
              r="3.6"
              fill="#5C6BC0"
              opacity="0.52"
            >
              <animateMotion
                dur="16.5s"
                begin="-5s"
                repeatCount="indefinite"
              >
                <mpath
                  href={`#${rightPathId}`}
                />
              </animateMotion>
            </circle>
          </>
        )}
      </svg>
    </div>
  );
}

function ArchitectureSection() {
  const {
    t,
    i18n,
  } = useTranslation(
    "home",
  );

  const sectionRef =
    useRef<HTMLElement>(
      null,
    );

  const reducedMotion =
    useReducedMotion() ??
    false;

  const arabic =
    i18n.language
      .toLowerCase()
      .startsWith("ar");

  const rtl =
    i18n.dir() ===
    "rtl";

  const [
    activeStage,
    setActiveStage,
  ] = useState(2);

  const [
    architectureModal,
    setArchitectureModal,
  ] = useState(false);

  const details =
    useMemo(
      () =>
        getArchitectureLayerDetails(
          arabic,
        ),
      [
        arabic,
      ],
    );

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
          const mm =
            gsap.matchMedia();

          const headerTimeline =
            gsap.timeline({
              scrollTrigger: {
                trigger:
                  sectionRef.current,

                start:
                  "top 89%",

                end:
                  "top 50%",

                scrub:
                  1.55,

                invalidateOnRefresh:
                  true,
              },
            });

          headerTimeline
            .fromTo(
              ".architecture-eyebrow",
              {
                opacity: 0,
                y: 12,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease:
                  "power1.out",
              },
            )

            .fromTo(
              ".architecture-heading",
              {
                opacity: 0,
                y: 24,
                scale: 0.995,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.85,
                ease:
                  "power1.inOut",
              },
              "-=0.24",
            )

            .fromTo(
              ".architecture-description",
              {
                opacity: 0,
                y: 13,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.68,
                ease:
                  "power1.out",
              },
              "-=0.34",
            )

            .fromTo(
              ".architecture-environment",
              {
                opacity: 0,
                y: 28,
                scale: 0.992,
                force3D: true,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.92,
                ease:
                  "power1.inOut",
                force3D: true,
              },
              "-=0.18",
            );

          mm.add(
            "(min-width: 1024px)",
            () => {
              const cards =
                gsap.utils.toArray<HTMLElement>(
                  ".architecture-desktop-flow .architecture-stage-wrap",
                );

              const connectors =
                gsap.utils.toArray<HTMLElement>(
                  ".architecture-desktop-flow .architecture-connector",
                );

              gsap.set(
                cards,
                {
                  opacity: 0,
                  y: 22,
                  scale: 0.994,
                  force3D: true,
                  transformOrigin:
                    "50% 50%",
                },
              );

              gsap.set(
                connectors,
                {
                  opacity: 0,
                  scaleX: 0,
                  transformOrigin:
                    rtl
                      ? "100% 50%"
                      : "0% 50%",
                },
              );

              const flow =
                gsap.timeline({
                  scrollTrigger: {
                    trigger:
                      ".architecture-desktop-flow",

                    start:
                      "top 86%",

                    end:
                      "center 38%",

                    scrub:
                      1.9,

                    invalidateOnRefresh:
                      true,
                  },
                });

              cards.forEach(
                (
                  card,
                  index,
                ) => {
                  flow.to(
                    card,
                    {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      duration: 0.82,
                      ease:
                        "power1.inOut",
                      force3D: true,
                    },
                    index === 0
                      ? "+=0.02"
                      : "+=0.08",
                  );

                  if (
                    connectors[
                      index
                    ]
                  ) {
                    flow.to(
                      connectors[
                        index
                      ],
                      {
                        opacity: 1,
                        scaleX: 1,
                        duration: 0.34,
                        ease:
                          "power1.out",
                      },
                      "-=0.28",
                    );
                  }
                },
              );

              flow.fromTo(
                ".architecture-cta",
                {
                  opacity: 0,
                  y: 12,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease:
                    "power1.out",
                },
                "-=0.18",
              );
            },
          );

          mm.add(
            "(max-width: 1023px)",
            () => {
              const cards =
                gsap.utils.toArray<HTMLElement>(
                  ".architecture-mobile-flow .architecture-stage-wrap",
                );

              const connectors =
                gsap.utils.toArray<HTMLElement>(
                  ".architecture-mobile-connector",
                );

              cards.forEach(
                (
                  card,
                  index,
                ) => {
                  const timeline =
                    gsap.timeline({
                      scrollTrigger: {
                        trigger:
                          card,

                        start:
                          "top 90%",

                        toggleActions:
                          "play none none reverse",
                      },
                    });

                  timeline.fromTo(
                    card,
                    {
                      opacity: 0,
                      y: 18,
                      scale: 0.995,
                      force3D: true,
                    },
                    {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      duration: 0.72,
                      ease:
                        "power1.inOut",
                      force3D: true,
                    },
                  );

                  if (
                    connectors[
                      index
                    ]
                  ) {
                    timeline.fromTo(
                      connectors[
                        index
                      ],
                      {
                        opacity: 0,
                        scaleY: 0.7,
                        transformOrigin:
                          "50% 0%",
                      },
                      {
                        opacity: 1,
                        scaleY: 1,
                        duration: 0.36,
                        ease:
                          "power1.out",
                      },
                      "-=0.3",
                    );
                  }
                },
              );

              gsap.fromTo(
                ".architecture-cta",
                {
                  opacity: 0,
                  y: 12,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.72,
                  ease:
                    "power1.out",

                  scrollTrigger: {
                    trigger:
                      ".architecture-cta",

                    start:
                      "top 92%",

                    toggleActions:
                      "play none none reverse",
                  },
                },
              );
            },
          );

          return () => {
            mm.revert();
          };
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
    <>
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
        "
      >
        <ArchitectureBackground
          reducedMotion={
            reducedMotion
          }
        />

        <div
          className="
            relative
            z-10

            mx-auto
            w-full
            max-w-[1540px]
          "
        >
          <div
            className="
              mx-auto
              max-w-[1120px]
              text-center
            "
          >
            <div
              className="
                architecture-eyebrow

                flex
                flex-col
                items-center
                justify-center

                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.31em]
                text-[#176FF2]

                sm:text-[11px]
              "
            >
              <span>
                DOCHIVE
              </span>

              <span
                aria-hidden="true"
                className="
                  mt-3
                  h-[2px]
                  w-8
                  rounded-full

                  bg-[#77A9F3]
                "
              />
            </div>

            <h2
              className="
                architecture-heading

                mx-auto
                mt-6

                max-w-[1080px]

                text-[34px]
                font-[790]
                leading-[1.04]
                tracking-[-0.052em]
                text-[#07142D]

                sm:text-[45px]

                md:text-[53px]

                lg:text-[58px]

                xl:text-[62px]
              "
            >
              <ArchitectureHeadline
                text={t(
                  "architecture.headline",
                )}
              />
            </h2>

            <p
              className="
                architecture-description

                mx-auto
                mt-5

                max-w-[970px]

                text-[14px]
                font-medium
                leading-[1.58]
                text-[#556A8D]

                sm:text-[15px]

                lg:text-[16px]
              "
            >
              {t(
                "architecture.body",
              )}
            </p>
          </div>

          <div className="mt-11 sm:mt-12">
            <ArchitectureEnvironment
              reducedMotion={
                reducedMotion
              }
              arabic={arabic}
              rtl={rtl}
              activeIndex={
                activeStage
              }
              onSelect={
                setActiveStage
              }
              details={
                details
              }
            />
          </div>

          <div
            className="
              architecture-cta

              mt-8

              flex
              justify-center

              sm:mt-9
            "
          >
            <button
              type="button"
              onClick={() =>
                setArchitectureModal(
                  true,
                )
              }
              className="
                group

                inline-flex
                items-center
                gap-3

                rounded-full

                border
                border-[#D7E7FA]

                bg-white/72

                px-5
                py-3

                text-[13px]
                font-bold
                text-[#176FF2]

                shadow-[0_12px_34px_rgba(22,111,242,0.08),inset_0_1px_0_rgba(255,255,255,1)]

                backdrop-blur-[16px]

                transition
                duration-300

                hover:-translate-y-0.5
                hover:border-[#B9D5FA]
                hover:shadow-[0_16px_40px_rgba(22,111,242,0.12)]

                sm:text-[14px]

                cursor-pointer
              "
            >
              <span>
                {arabic
                  ? "عرض البنية التفصيلية"
                  : "View detailed architecture"}
              </span>

              <span
                className={`
                  transition-transform
                  duration-300

                  group-hover:translate-x-1

                  ${
                    rtl
                      ? "rotate-180"
                      : ""
                  }
                `}
              >
                <ArrowIcon />
              </span>
            </button>
          </div>
        </div>
      </section>

      <ArchitectureDetailModal
        open={
          architectureModal
        }
        onClose={() =>
          setArchitectureModal(
            false,
          )
        }
        arabic={
          arabic
        }
        reducedMotion={
          reducedMotion
        }
      />
    </>
  );
}


/* =============================================================================
   USE CASES SECTION
============================================================================= */

type UseCaseItem = {
  title: string;
  problem: string;
  workflow: string;
  result: string;
  control: string;
};

type UseCaseTheme = {
  color: string;
  soft: string;
  border: string;
  glow: string;
};

const USE_CASE_THEMES: UseCaseTheme[] = [
  {
    color: "#1685EA",
    soft: "#EAF4FF",
    border: "#D2E6FF",
    glow: "rgba(22,133,234,0.12)",
  },
  {
    color: "#21B966",
    soft: "#E9FAF1",
    border: "#D2F0DF",
    glow: "rgba(42,168,69,0.12)",
  },
  {
    color: "#F2A21B",
    soft: "#FFF5DE",
    border: "#F8E6B5",
    glow: "rgba(242,201,76,0.14)",
  },
  {
    color: "#E5232A",
    soft: "#FFF0F2",
    border: "#FFDADD",
    glow: "rgba(229,35,42,0.12)",
  },
  {
    color: "#7A35F2",
    soft: "#F2EAFE",
    border: "#E4D8FB",
    glow: "rgba(92,107,192,0.13)",
  },
  {
    color: "#1685EA",
    soft: "#EAF4FF",
    border: "#D2E6FF",
    glow: "rgba(22,133,234,0.12)",
  },
];

function UseCasesHeadline({
  text,
}: {
  text: string;
}) {
  const phrase =
    "is required";

  const index =
    text
      .toLowerCase()
      .indexOf(phrase);

  if (index === -1) {
    return <>{text}</>;
  }

  return (
    <>
      {text.slice(
        0,
        index,
      )}

      <span className="text-[#176FF2]">
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

function UseCaseIcon({
  index,
  theme,
}: {
  index: number;
  theme: UseCaseTheme;
}) {
  const stroke = {
    stroke: theme.color,
    strokeWidth: 2.2,
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
        className="h-10 w-10"
        aria-hidden="true"
      >
        <path
          d="M12 5h20l7 7v31H12V5Z"
          {...stroke}
        />

        <path
          d="M32 5v8h7M18 20h14M18 26h14M18 32h10"
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
        className="h-10 w-10"
        aria-hidden="true"
      >
        <path
          d="M12 5h20l7 7v31H12V5Z"
          {...stroke}
        />

        <path
          d="M32 5v8h7M18 20h14M18 26h14M18 32h10"
          {...stroke}
        />

        <circle
          cx="34"
          cy="34"
          r="4"
          fill={theme.color}
          opacity="0.16"
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
        <path
          d="M9 31c0-8 6-15 15-15s15 7 15 15"
          {...stroke}
        />

        <path
          d="M13 31h22M18 16v-5M30 16v-5M8 35h32"
          {...stroke}
        />

        <path
          d="M14 35c1 5 5 8 10 8s9-3 10-8"
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
          d="M7 9c7-3 13-2 17 2v29c-4-4-10-5-17-2V9Z"
          {...stroke}
        />

        <path
          d="M41 9c-7-3-13-2-17 2v29c4-4 10-5 17-2V9Z"
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
        <rect
          x="7"
          y="10"
          width="34"
          height="27"
          rx="4"
          {...stroke}
        />

        <path
          d="m10 14 14 11 14-11"
          {...stroke}
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
        d="M6 19 24 7l18 12H6Z"
        {...stroke}
      />

      <path
        d="M10 21v18M18 21v18M30 21v18M38 21v18M6 40h36"
        {...stroke}
      />
    </svg>
  );
}


function UseCaseCard({
  item,
  index,
  reducedMotion,
}: {
  item: UseCaseItem;
  index: number;
  reducedMotion: boolean;
}) {
  const theme =
    USE_CASE_THEMES[
      index %
        USE_CASE_THEMES.length
    ];

  return (
    <div
      className="
        use-case-card-wrap

        relative
        min-w-0

        [perspective:1200px]

        transform-gpu
        will-change-transform
      "
    >
      {/* soft depth layer behind the card */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-3
          bottom-[-8px]
          top-3
          -z-10

          rounded-[22px]

          border
          border-white/80

          bg-white/36

          opacity-80

          shadow-[0_22px_46px_rgba(42,67,92,0.08)]

          backdrop-blur-[12px]
        "
        style={{
          borderColor:
            `${theme.color}18`,
        }}
      />

      <motion.article
        whileHover={
          reducedMotion
            ? undefined
            : {
                y: -6,
                rotateX: 1.1,
                rotateY:
                  index % 2 === 0
                    ? -1.2
                    : 1.2,
                scale: 1.006,
              }
        }
        transition={{
          duration: 0.5,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        className="
          use-case-card

          group
          relative
          min-h-[208px]
          min-w-0

          overflow-hidden

          rounded-[22px]

          border

          bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(247,251,255,0.74))]

          px-5
          py-5

          shadow-[0_24px_70px_rgba(39,69,96,0.10),0_8px_22px_rgba(42,69,94,0.05),inset_0_1px_0_rgba(255,255,255,1)]

          backdrop-blur-[22px]

          transform-gpu
          [transform-style:preserve-3d]

          sm:min-h-[214px]
          sm:px-6
          sm:py-6

          lg:min-h-[220px]
          lg:px-7
        "
        style={{
          borderColor:
            theme.border,

          boxShadow:
            `0 26px 76px ${theme.glow}, 0 9px 24px rgba(39,69,96,0.055), inset 0 1px 0 rgba(255,255,255,1)`,
        }}
      >
        {/* glass reflections */}
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
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            -right-16
            -top-20

            h-44
            w-44

            rounded-full

            blur-3xl
          "
          style={{
            backgroundColor:
              `${theme.color}12`,
          }}
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            bottom-[-55px]
            left-[18%]

            h-24
            w-[64%]

            rounded-full

            bg-white/70

            blur-3xl
          "
        />

        <div
          className="
            relative
            z-10

            flex
            min-w-0
            items-start
            gap-4

            sm:gap-5
          "
          style={{
            transform:
              "translateZ(18px)",
          }}
        >
          <span
            className="
              flex
              h-[64px]
              w-[64px]
              shrink-0
              items-center
              justify-center

              rounded-full

              border
              border-white/95

              shadow-[0_12px_32px_rgba(44,73,98,0.10),inset_0_1px_0_rgba(255,255,255,1)]

              sm:h-[70px]
              sm:w-[70px]
            "
            style={{
              background:
                `linear-gradient(145deg, rgba(255,255,255,.95), ${theme.soft})`,

              boxShadow:
                `0 14px 34px ${theme.glow}, inset 0 1px 0 rgba(255,255,255,1)`,
            }}
          >
            <UseCaseIcon
              index={index}
              theme={theme}
            />
          </span>

          <div
            className="
              min-w-0
              flex-1

              pt-0.5
            "
          >
            <h3
              className="
                text-[18px]
                font-[780]
                leading-[1.16]
                tracking-[-0.03em]
                text-[#07142D]

                sm:text-[19px]

                lg:text-[20px]
              "
            >
              {item.title}
            </h3>

            <p
              className="
                mt-2.5

                text-[12.5px]
                font-medium
                leading-[1.48]
                text-[#667999]

                sm:text-[13px]
              "
            >
              {item.problem}
            </p>

            <p
              className="
                mt-2

                text-[12.5px]
                font-medium
                leading-[1.48]
                text-[#405A7E]

                sm:text-[13px]
              "
            >
              {item.workflow}
            </p>

            <p
              className="
                mt-2

                text-[12.5px]
                font-medium
                leading-[1.48]
                text-[#405A7E]

                sm:text-[13px]
              "
            >
              {item.result}
            </p>

            <p
              className="
                mt-3

                text-[10px]
                font-extrabold
                uppercase
                leading-[1.45]
                tracking-[0.11em]

                sm:text-[10.5px]
              "
              style={{
                color:
                  theme.color,
              }}
            >
              {item.control}
            </p>
          </div>
        </div>

        {/* subtle bottom depth accent, not a wireframe line */}
        <span
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            bottom-0
            left-1/2

            h-[3px]
            w-[28%]
            -translate-x-1/2

            rounded-t-full

            opacity-70
          "
          style={{
            backgroundColor:
              theme.color,

            boxShadow:
              `0 -5px 16px ${theme.glow}`,
          }}
        />
      </motion.article>
    </div>
  );
}

function UseCasesBackground({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        -z-20
      "
    >
      <div
        className="
          absolute
          -left-[245px]
          top-[34px]

          h-[570px]
          w-[570px]

          rounded-[46%]

          bg-[radial-gradient(circle_at_67%_46%,rgba(207,232,250,0.60),rgba(238,248,255,0.38)_52%,rgba(255,255,255,0)_76%)]
        "
      />

      <div
        className="
          absolute
          -right-[270px]
          top-[210px]

          h-[575px]
          w-[575px]

          rounded-[46%]

          bg-[radial-gradient(circle_at_31%_44%,rgba(215,236,252,0.58),rgba(242,249,255,0.38)_52%,rgba(255,255,255,0)_76%)]
        "
      />

      <motion.div
        className="
          absolute
          -left-[70px]
          top-[145px]

          hidden
          h-[355px]
          w-[270px]

          bg-[linear-gradient(145deg,rgba(221,239,252,0.52),rgba(255,255,255,0.08))]

          [clip-path:polygon(0_0,100%_28%,100%_83%,16%_100%,0_72%)]

          lg:block
        "
        animate={
          reducedMotion
            ? undefined
            : {
                y: [
                  0,
                  -8,
                  0,
                ],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="
          absolute
          -right-[76px]
          top-[280px]

          hidden
          h-[390px]
          w-[290px]

          bg-[linear-gradient(145deg,rgba(225,240,252,0.52),rgba(255,255,255,0.08))]

          [clip-path:polygon(65%_0,100%_0,100%_100%,13%_100%,0_52%)]

          lg:block
        "
        animate={
          reducedMotion
            ? undefined
            : {
                y: [
                  0,
                  9,
                  0,
                ],
              }
        }
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div
        className="
          absolute
          right-[6%]
          top-[56px]

          grid
          grid-cols-4
          gap-4

          opacity-42
        "
      >
        {Array.from({
          length: 16,
        }).map(
          (
            _,
            index,
          ) => (
            <span
              key={index}
              className="
                h-[4px]
                w-[4px]

                rounded-full

                bg-[#78B7F8]
              "
            />
          ),
        )}
      </div>
    </div>
  );
}

function UseCasesSection({
  items,
}: {
  items: UseCaseItem[];
}) {
  const {
    t,
    i18n,
  } = useTranslation(
    "home",
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
          const mm =
            gsap.matchMedia();

          const header =
            gsap.timeline({
              scrollTrigger: {
                trigger:
                  sectionRef.current,

                start:
                  "top 90%",

                end:
                  "top 54%",

                scrub:
                  1.65,

                invalidateOnRefresh:
                  true,
              },
            });

          header
            .fromTo(
              ".use-cases-accent",
              {
                opacity: 0,
                scaleX: 0.45,
                transformOrigin:
                  rtl
                    ? "100% 50%"
                    : "0% 50%",
              },
              {
                opacity: 1,
                scaleX: 1,
                duration: 0.58,
                ease:
                  "power1.out",
              },
            )

            .fromTo(
              ".use-cases-heading",
              {
                opacity: 0,
                y: 20,
                scale: 0.996,
                force3D: true,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.92,
                ease:
                  "power1.inOut",
                force3D: true,
              },
              "-=0.18",
            );

          mm.add(
            "(min-width: 768px)",
            () => {
              const cards =
                gsap.utils.toArray<HTMLElement>(
                  ".use-case-card-wrap",
                );

              gsap.set(
                cards,
                {
                  opacity: 0,
                  y: 24,
                  scale: 0.994,
                  rotateX: 2.2,
                  transformPerspective:
                    1200,
                  force3D: true,
                  transformOrigin:
                    "50% 50%",
                },
              );

              const flow =
                gsap.timeline({
                  scrollTrigger: {
                    trigger:
                      ".use-cases-grid",

                    start:
                      "top 88%",

                    end:
                      "bottom 31%",

                    scrub:
                      2.25,

                    invalidateOnRefresh:
                      true,
                  },
                });

              cards.forEach(
                (
                  card,
                  index,
                ) => {
                  flow.to(
                    card,
                    {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      rotateX: 0,
                      duration: 0.95,
                      ease:
                        "power1.inOut",
                      force3D: true,
                    },
                    index === 0
                      ? "+=0.02"
                      : "+=0.08",
                  );
                },
              );
            },
          );

          mm.add(
            "(max-width: 767px)",
            () => {
              const cards =
                gsap.utils.toArray<HTMLElement>(
                  ".use-case-card-wrap",
                );

              cards.forEach(
                (
                  card,
                ) => {
                  gsap.fromTo(
                    card,
                    {
                      opacity: 0,
                      y: 18,
                      scale: 0.996,
                      rotateX: 1.6,
                      transformPerspective:
                        1000,
                      force3D: true,
                    },
                    {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      rotateX: 0,
                      duration: 0.82,
                      ease:
                        "power1.inOut",
                      force3D: true,

                      scrollTrigger: {
                        trigger:
                          card,

                        start:
                          "top 91%",

                        toggleActions:
                          "play none none reverse",
                      },
                    },
                  );
                },
              );
            },
          );

          if (
            backgroundRef.current
          ) {
            gsap.fromTo(
              backgroundRef.current,
              {
                yPercent:
                  -0.8,
              },
              {
                yPercent:
                  1.2,

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
          }

          return () => {
            mm.revert();
          };
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
      id="use-cases"
      dir={
        rtl
          ? "rtl"
          : "ltr"
      }
      className="
        relative
        isolate
        scroll-mt-24
        overflow-hidden

        bg-[#FEFFFF]

        px-4
        py-20

        sm:px-6
        sm:py-24

        lg:px-8
      "
    >
      <div
        ref={backgroundRef}
        className="
          pointer-events-none
          absolute
          inset-0
          -z-20

          will-change-transform
        "
      >
        <UseCasesBackground
          reducedMotion={
            reducedMotion
          }
        />
      </div>

      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-[1480px]
        "
      >
        <div
          className="
            max-w-[850px]
          "
        >
          <span
            aria-hidden="true"
            className="
              use-cases-accent

              block
              h-[2px]
              w-8
              rounded-full

              bg-[#176FF2]
            "
          />

          <h2
            className="
              use-cases-heading

              mt-5

              max-w-[820px]

              text-[36px]
              font-[790]
              leading-[1.05]
              tracking-[-0.052em]
              text-[#07142D]

              sm:text-[46px]

              md:text-[53px]

              lg:text-[58px]

              xl:text-[61px]
            "
          >
            <UseCasesHeadline
              text={t(
                "useCases.headline",
              )}
            />
          </h2>
        </div>

        <div
          className="
            use-cases-grid

            relative

            mt-10

            grid
            grid-cols-1
            gap-4

            sm:mt-12

            md:grid-cols-2
            md:gap-5

            lg:gap-x-6
            lg:gap-y-5
          "
        >
          {items.map(
            (
              item,
              index,
            ) => (
              <UseCaseCard
                key={`${item.title}-${index}`}
                item={item}
                index={index}
                reducedMotion={
                  reducedMotion
                }
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}

/* ===========================================================
/* =============================================================================
   COMPARE SECTION
============================================================================= */

type CompareRow = {
  vs: string;
  focus: string;
};

type CompareTheme = {
  color: string;
  soft: string;
  border: string;
  glow: string;
};

const COMPARE_THEMES: CompareTheme[] = [
  {
    color: "#1685EA",
    soft: "#EAF4FF",
    border: "#D6E8FC",
    glow: "rgba(22,133,234,0.12)",
  },
  {
    color: "#7A35F2",
    soft: "#F1EBFF",
    border: "#E5DCFA",
    glow: "rgba(92,107,192,0.13)",
  },
  {
    color: "#20B966",
    soft: "#EAFBF1",
    border: "#D6F0E1",
    glow: "rgba(42,168,69,0.12)",
  },
  {
    color: "#F2A21B",
    soft: "#FFF6DF",
    border: "#F7E8BD",
    glow: "rgba(242,201,76,0.14)",
  },
];

function CompareHeadline({
  text,
}: {
  text: string;
}) {
  const phrase =
    "governed intelligence layer";

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

function CompareIcon({
  index,
  theme,
}: {
  index: number;
  theme: CompareTheme;
}) {
  const stroke = {
    stroke: theme.color,
    strokeWidth: 2.25,
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
        className="h-9 w-9 sm:h-10 sm:w-10"
        aria-hidden="true"
      >
        <path
          d="M12 5h20l7 7v31H12V5Z"
          {...stroke}
        />

        <path
          d="M32 5v8h7M18 20h14M18 26h14M18 32h10"
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
        className="h-9 w-9 sm:h-10 sm:w-10"
        aria-hidden="true"
      >
        <path
          d="M8 17V8h9M31 8h9v9M40 31v9h-9M17 40H8v-9"
          {...stroke}
        />

        <path
          d="M16 14h16v20H16z"
          {...stroke}
        />

        <path
          d="M20 20h8M20 25h8M20 30h5"
          {...stroke}
        />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-9 w-9 sm:h-10 sm:w-10"
        aria-hidden="true"
      >
        <path
          d="M24 5 39 11v11c0 9-5.5 16-15 21-9.5-5-15-12-15-21V11L24 5Z"
          {...stroke}
        />

        <rect
          x="19"
          y="21"
          width="10"
          height="9"
          rx="2"
          {...stroke}
        />

        <path
          d="M21 21v-2.5a3 3 0 0 1 6 0V21"
          {...stroke}
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-9 w-9 sm:h-10 sm:w-10"
      aria-hidden="true"
    >
      <circle
        cx="21"
        cy="21"
        r="11"
        {...stroke}
      />

      <path
        d="m29 29 11 11"
        {...stroke}
      />
    </svg>
  );
}

function CompareFocus({
  text,
  index,
}: {
  text: string;
  index: number;
}) {
  const phrases = [
    "document intelligence, typed retrieval, structured extraction, and governed AI workflows",
    "Permissions, metadata, search, retention, and organizational use",
    "remain inside the approved customer boundary",
    "OCR, governance, workflow, and private AI complete the governed lifecycle",
  ];

  const phrase =
    phrases[index];

  if (!phrase) {
    return <>{text}</>;
  }

  const matchIndex =
    text
      .toLowerCase()
      .indexOf(
        phrase.toLowerCase(),
      );

  if (matchIndex === -1) {
    return <>{text}</>;
  }

  return (
    <>
      {text.slice(
        0,
        matchIndex,
      )}

      <span className="font-semibold text-[#1685EA]">
        {text.slice(
          matchIndex,
          matchIndex +
            phrase.length,
        )}
      </span>

      {text.slice(
        matchIndex +
          phrase.length,
      )}
    </>
  );
}

function CompareRowCard({
  row,
  index,
  reducedMotion,
}: {
  row: CompareRow;
  index: number;
  reducedMotion: boolean;
}) {
  const theme =
    COMPARE_THEMES[
      index %
        COMPARE_THEMES.length
    ];

  return (
    <div
      className="
        compare-row-wrap

        relative
        min-w-0

        [perspective:1200px]

        transform-gpu
        will-change-transform
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-3
          bottom-[-6px]
          top-[7px]
          -z-10

          rounded-[18px]

          border
          border-white/80

          bg-white/32

          shadow-[0_16px_34px_rgba(38,67,93,0.055)]

          backdrop-blur-[12px]
        "
        style={{
          borderColor:
            `${theme.color}12`,
        }}
      />

      <motion.article
        whileHover={
          reducedMotion
            ? undefined
            : {
                y: -4,
                rotateX: 0.8,
                scale: 1.003,
              }
        }
        transition={{
          duration: 0.46,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        className="
          compare-row-card

          relative
          overflow-hidden

          rounded-[18px]

          border
          border-[#DCE9F7]

          bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(247,251,255,0.78))]

          px-4
          py-4

          shadow-[0_18px_48px_rgba(40,70,96,0.065),inset_0_1px_0_rgba(255,255,255,1)]

          backdrop-blur-[20px]

          transform-gpu
          [transform-style:preserve-3d]

          sm:px-5
          sm:py-5

          lg:px-6
        "
        style={{
          boxShadow:
            `0 20px 56px ${theme.glow}, 0 7px 18px rgba(42,70,94,0.04), inset 0 1px 0 rgba(255,255,255,1)`,
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
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-16
            -top-16

            h-40
            w-40

            rounded-full

            blur-3xl
          "
          style={{
            backgroundColor:
              `${theme.color}0C`,
          }}
        />

        <div
          className="
            relative
            z-10

            grid
            min-w-0
            gap-4

            md:grid-cols-[minmax(220px,0.78fr)_1px_minmax(0,1.72fr)]
            md:items-center
            md:gap-6

            lg:grid-cols-[minmax(300px,0.78fr)_1px_minmax(0,1.72fr)]
            lg:gap-8
          "
          style={{
            transform:
              "translateZ(16px)",
          }}
        >
          <div
            className="
              flex
              min-w-0
              items-center
              gap-4
            "
          >
            <motion.span
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      y: -2,
                      scale: 1.035,
                    }
              }
              transition={{
                duration: 0.36,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="
                flex
                h-[64px]
                w-[64px]
                shrink-0
                items-center
                justify-center

                rounded-[15px]

                border
                border-white/95

                shadow-[0_11px_30px_rgba(42,72,98,0.09),inset_0_1px_0_rgba(255,255,255,1)]

                sm:h-[70px]
                sm:w-[70px]
              "
              style={{
                background:
                  `linear-gradient(145deg, rgba(255,255,255,.96), ${theme.soft})`,

                boxShadow:
                  `0 13px 32px ${theme.glow}, inset 0 1px 0 rgba(255,255,255,1)`,
              }}
            >
              <CompareIcon
                index={index}
                theme={theme}
              />
            </motion.span>

            <h3
              className="
                min-w-0

                text-[18px]
                font-[790]
                leading-[1.14]
                tracking-[-0.032em]
                text-[#07142D]

                sm:text-[20px]

                lg:text-[21px]
              "
            >
              {row.vs}
            </h3>
          </div>

          <span
            aria-hidden="true"
            className="
              hidden
              h-full
              min-h-[62px]
              w-px

              bg-[linear-gradient(180deg,transparent,#D5E5F5_15%,#D5E5F5_85%,transparent)]

              md:block
            "
          />

          <p
            className="
              min-w-0

              border-t
              border-[#E5EEF8]

              pt-4

              text-[13.5px]
              font-medium
              leading-[1.5]
              text-[#5C7095]

              sm:text-[14.5px]

              md:border-t-0
              md:pt-0

              lg:text-[15.5px]
            "
          >
            <CompareFocus
              text={row.focus}
              index={index}
            />
          </p>
        </div>

        <span
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            bottom-0
            left-1/2

            h-[2px]
            w-[16%]
            -translate-x-1/2

            rounded-t-full

            opacity-55
          "
          style={{
            backgroundColor:
              theme.color,

            boxShadow:
              `0 -4px 13px ${theme.glow}`,
          }}
        />
      </motion.article>
    </div>
  );
}

function CompareBackground({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        -z-20
      "
    >
      <div
        className="
          absolute
          -left-[250px]
          -top-[200px]

          h-[520px]
          w-[520px]

          rounded-full

          bg-[radial-gradient(circle_at_69%_70%,rgba(207,232,250,0.62),rgba(239,248,255,0.38)_52%,rgba(255,255,255,0)_75%)]
        "
      />

      <div
        className="
          absolute
          -right-[255px]
          bottom-[-230px]

          h-[520px]
          w-[520px]

          rounded-full

          bg-[radial-gradient(circle_at_32%_30%,rgba(214,235,251,0.62),rgba(242,249,255,0.38)_52%,rgba(255,255,255,0)_75%)]
        "
      />

      <motion.div
        className="
          absolute
          -left-[115px]
          top-[65px]

          hidden
          h-[300px]
          w-[250px]

          bg-[linear-gradient(145deg,rgba(220,238,252,0.56),rgba(255,255,255,0.08))]

          [clip-path:polygon(0_0,100%_30%,100%_82%,16%_100%,0_72%)]

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
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="
          absolute
          -right-[105px]
          bottom-[52px]

          hidden
          h-[300px]
          w-[245px]

          bg-[linear-gradient(145deg,rgba(224,240,252,0.54),rgba(255,255,255,0.08))]

          [clip-path:polygon(64%_0,100%_0,100%_100%,12%_100%,0_52%)]

          lg:block
        "
        animate={
          reducedMotion
            ? undefined
            : {
                y: [
                  0,
                  8,
                  0,
                ],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div
        className="
          absolute
          left-[2.7%]
          top-[66px]

          grid
          grid-cols-4
          gap-4

          opacity-48
        "
      >
        {Array.from({
          length: 16,
        }).map(
          (
            _,
            index,
          ) => (
            <span
              key={index}
              className="
                h-[4px]
                w-[4px]
                rounded-full
                bg-[#79B7F8]
              "
            />
          ),
        )}
      </div>

      <div
        className="
          absolute
          bottom-[55px]
          right-[2.7%]

          grid
          grid-cols-4
          gap-4

          opacity-42
        "
      >
        {Array.from({
          length: 16,
        }).map(
          (
            _,
            index,
          ) => (
            <span
              key={index}
              className="
                h-[4px]
                w-[4px]
                rounded-full
                bg-[#79B7F8]
              "
            />
          ),
        )}
      </div>
    </div>
  );
}

function CompareSection({
  rows,
}: {
  rows: CompareRow[];
}) {
  const {
    t,
    i18n,
  } = useTranslation(
    "home",
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
          const header =
            gsap.timeline({
              scrollTrigger: {
                trigger:
                  sectionRef.current,

                start:
                  "top 90%",

                end:
                  "top 52%",

                scrub:
                  1.7,

                invalidateOnRefresh:
                  true,
              },
            });

          header
            .fromTo(
              ".compare-heading",
              {
                opacity: 0,
                y: 22,
                scale: 0.996,
                force3D: true,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.9,
                ease:
                  "power1.inOut",
                force3D: true,
              },
            )

            .fromTo(
              ".compare-description",
              {
                opacity: 0,
                y: 14,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease:
                  "power1.out",
              },
              "-=0.36",
            )

            .fromTo(
              ".compare-shell",
              {
                opacity: 0,
                y: 24,
                scale: 0.994,
                force3D: true,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease:
                  "power1.inOut",
                force3D: true,
              },
              "-=0.12",
            );

          const rowCards =
            gsap.utils.toArray<HTMLElement>(
              ".compare-row-wrap",
            );

          gsap.set(
            rowCards,
            {
              opacity: 0,
              y: 22,
              scale: 0.995,
              rotateX: 1.8,
              transformPerspective:
                1200,
              force3D: true,
              transformOrigin:
                "50% 50%",
            },
          );

          const flow =
            gsap.timeline({
              scrollTrigger: {
                trigger:
                  ".compare-shell",

                start:
                  "top 86%",

                end:
                  "bottom 31%",

                scrub:
                  2.25,

                invalidateOnRefresh:
                  true,
              },
            });

          rowCards.forEach(
            (
              card,
              index,
            ) => {
              flow.to(
                card,
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                  duration: 0.92,
                  ease:
                    "power1.inOut",
                  force3D: true,
                },
                index === 0
                  ? "+=0.02"
                  : "+=0.08",
              );
            },
          );

          if (
            backgroundRef.current
          ) {
            gsap.fromTo(
              backgroundRef.current,
              {
                yPercent:
                  -0.7,
              },
              {
                yPercent:
                  1.1,

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
      "
    >
      <div
        ref={backgroundRef}
        className="
          pointer-events-none
          absolute
          inset-0
          -z-20

          will-change-transform
        "
      >
        <CompareBackground
          reducedMotion={
            reducedMotion
          }
        />
      </div>

      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-[1480px]
        "
      >
        <div
          className="
            mx-auto
            max-w-[1020px]
            text-center
          "
        >
          <h2
            className="
              compare-heading

              mx-auto

              max-w-[980px]

              text-[35px]
              font-[790]
              leading-[1.04]
              tracking-[-0.052em]
              text-[#07142D]

              sm:text-[45px]

              md:text-[52px]

              lg:text-[58px]

              xl:text-[61px]
            "
          >
            <CompareHeadline
              text={t(
                "compare.headline",
              )}
            />
          </h2>

          <p
            className="
              compare-description

              mx-auto
              mt-5

              max-w-[900px]

              text-[14px]
              font-medium
              leading-[1.55]
              text-[#5B6F93]

              sm:text-[15px]

              lg:text-[16px]
            "
          >
            {t(
              "compare.body",
            )}
          </p>
        </div>

        <div
          className="
            compare-shell

            relative

            mx-auto
            mt-10
            max-w-[1320px]

            rounded-[26px]

            border
            border-[#D7E7F8]

            bg-white/48

            p-3

            shadow-[0_26px_78px_rgba(40,70,96,0.08),inset_0_1px_0_rgba(255,255,255,1)]

            backdrop-blur-[22px]

            sm:mt-12
            sm:p-4

            lg:p-5
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-8
              top-0
              h-px

              bg-gradient-to-r
              from-transparent
              via-white
              to-transparent
            "
          />

          <div className="space-y-3">
            {rows.map(
              (
                row,
                index,
              ) => (
                <CompareRowCard
                  key={`${row.vs}-${index}`}
                  row={row}
                  index={index}
                  reducedMotion={
                    reducedMotion
                  }
                />
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================================================
/* =============================================================================
   FINAL CTA SECTION
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
   HOME PAGE
============================================================================= */

export function HomePage() {
  const {
    t,
  } = useTranslation("home");

  const [
    demo,
    setDemo,
  ] = useState(false);

  const trustRaw = t(
    "trust",
    {
      returnObjects: true,
    },
  );

  const trust =
    Array.isArray(trustRaw)
      ? (trustRaw as string[])
      : [];

  const before = t(
    "problem.before",
    {
      returnObjects: true,
    },
  ) as string[];

  const after = t(
    "problem.after",
    {
      returnObjects: true,
    },
  ) as string[];

  const stages = t(
    "transform.stages",
    {
      returnObjects: true,
    },
  ) as {
    title: string;
    text: string;
  }[];

  const steps = t(
    "how.steps",
    {
      returnObjects: true,
    },
  ) as string[];

  const cards = t(
    "governance.cards",
    {
      returnObjects: true,
    },
  ) as {
    id: string;
    title: string;
    text: string;
  }[];

  const deployments = t(
    "deployment.cards",
    {
      returnObjects: true,
    },
  ) as {
    title: string;
    points: string[];
  }[];

  const useCases = t(
    "useCases.items",
    {
      returnObjects: true,
    },
  ) as {
    title: string;
    problem: string;
    workflow: string;
    result: string;
    control: string;
  }[];

  const compare = t(
    "compare.rows",
    {
      returnObjects: true,
    },
  ) as {
    vs: string;
    focus: string;
  }[];

  return (
    <>
      <Seo
        page="home"
        path="/"
      />

      {/* HERO — COMPLETE */}

      <HomeHero
        trust={trust}
        onDemo={() =>
          setDemo(true)
        }
      />

      {/* PROBLEM — APPROVED VERSION */}

      <ProblemSection
        before={before}
        after={after}
      />

      {/* TRANSFORM — REFERENCE-ACCURATE REDESIGN */}

      <TransformSection
        stages={stages}
      />

      {/* HOW — REFERENCE-ACCURATE REDESIGN */}

      <HowSection
        steps={steps}
      />

      {/* GOVERNANCE — REFERENCE-ACCURATE REDESIGN */}

      <GovernanceSection
        cards={cards}
      />

      {/* DEPLOYMENT — REFERENCE-ACCURATE REDESIGN */}

      <DeploymentSection
        deployments={deployments}
      />

      {/* ARCHITECTURE — REFERENCE-ACCURATE REDESIGN */}

      <ArchitectureSection />

      {/* USE CASES — REFERENCE-ACCURATE REDESIGN */}

      <UseCasesSection
        items={useCases}
      />

      {/* COMPARE — REFERENCE-ACCURATE REDESIGN */}

      <CompareSection
        rows={compare}
      />

      {/* FINAL CTA — REFERENCE-ACCURATE REDESIGN */}

      <FinalCtaSection
        trust={trust}
      />

      <VideoModal
        open={demo}
        onClose={() =>
          setDemo(false)
        }
      />
    </>
  );
}