import {
  useTranslation,
} from "react-i18next";

import {
  LocaleLink,
} from "./LocaleLink";

import {
  LanguageSwitcher,
} from "./LanguageSwitcher";

const LOGO_SRC =
  "/brand/Idochive-logo-header.png";

function FooterBrandLogo() {
  return (
    <img
      src={LOGO_SRC}
      alt=""
      width={40}
      height={40}
      className="
        block
        h-10
        w-10
        shrink-0
        object-contain
      "
      draggable={false}
    />
  );
}

export function Footer() {
  const {
    t,
    i18n,
  } = useTranslation(
    "common",
  );

  const rtl =
    i18n.dir() ===
    "rtl";

  const navLinks = [
    {
      to: "/how-it-works",
      label: t("nav.how"),
    },
    {
      to: "/deployment",
      label: t("nav.deployment"),
    },
    {
      to: "/government",
      label: t("nav.government"),
    },
    {
      to: "/book",
      label: t("nav.book"),
    },
    {
      to: "/privacy",
      label: t("nav.privacy"),
    },
  ];

  return (
    <footer
      dir={
        rtl
          ? "rtl"
          : "ltr"
      }
      className="
        border-t
        border-[#E4ECF5]

        bg-white

        px-4
        pb-7
        pt-10

        sm:px-6
        sm:pb-8
        sm:pt-12

        lg:px-8
        lg:pt-14
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1480px]
        "
      >
        <div
          className="
            grid
            gap-10

            py-8

            md:grid-cols-[1.1fr_1fr_0.8fr]
            md:gap-8

            lg:py-10
            xl:gap-16
          "
        >
          {/* LEFT */}

          <div className="min-w-0">
            <LocaleLink
              to="/"
              className="
                inline-flex
                items-center
                gap-3
              "
              aria-label={t(
                "brand",
              )}
            >
              <FooterBrandLogo />

              <span
                className="
                  text-[20px]
                  font-[800]
                  tracking-[-0.04em]
                  text-[#0A1830]

                  sm:text-[22px]
                "
              >
                {t(
                  "brand",
                )}
              </span>
            </LocaleLink>

            <p
              className="
                mt-4
                max-w-[360px]

                text-[12px]
                font-medium
                leading-[1.55]
                text-[#5D6F8B]

                sm:text-[13px]
              "
            >
              {t(
                "footer.tagline",
              )}
            </p>

            <p
              className="
                mt-3
                max-w-[360px]

                text-[11.5px]
                font-semibold
                leading-[1.45]
                text-[#1685EA]

                sm:text-[12px]
              "
            >
              {t(
                "footer.promise",
              )}
            </p>
          </div>

          {/* CENTER */}

          <div
            className="
              min-w-0

              text-[12px]
              font-medium
              leading-[1.55]
              text-[#566985]

              sm:text-[13px]
            "
          >
            <p
              className="
                text-[12.5px]
                font-[760]
                text-[#132646]

                sm:text-[13.5px]
              "
            >
              {t(
                "footer.owner",
              )}
            </p>

            <p
              className="
                mt-2
                max-w-[390px]
              "
            >
              {t(
                "footer.iso",
              )}
            </p>

            <p className="mt-3">
              <a
                href="mailto:business@idochive.com"
                className="
                  text-[#566985]

                  hover:text-[#1685EA]
                "
              >
                {t(
                  "footer.contact",
                )}
              </a>
            </p>

            <div className="mt-2">
              <p>
                {t(
                  "footer.phones.sa",
                )}
              </p>

              <p>
                {t(
                  "footer.phones.us",
                )}
              </p>

              <p>
                {t(
                  "footer.phones.pk",
                )}
              </p>
            </div>
          </div>

          {/* RIGHT */}

          <div
            className="
              flex
              min-w-0
              flex-col
              items-start
            "
          >
            <nav
              className="
                flex
                flex-col
                gap-1.5
              "
              aria-label="Footer navigation"
            >
              {navLinks.map(
                (
                  link,
                ) => (
                  <LocaleLink
                    key={
                      link.to
                    }
                    to={
                      link.to
                    }
                    className="
                      w-fit

                      py-0.5

                      text-[12px]
                      font-semibold
                      text-[#132646]

                      hover:text-[#1685EA]

                      sm:text-[13px]
                    "
                  >
                    {link.label}
                  </LocaleLink>
                ),
              )}
            </nav>

            <div
              className="
                mt-4
              "
            >
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="
            h-px
            w-full
            bg-[#E0E8F0]
          "
        />

        <div className="pt-5">
          <p
            className="
              text-[10px]
              font-medium
              text-[#8595AA]

              sm:text-[10.5px]
            "
          >
            {t(
              "footer.rights",
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
