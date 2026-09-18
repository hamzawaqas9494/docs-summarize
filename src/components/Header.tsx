import {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
} from "react-router";

import {
  useTranslation,
} from "react-i18next";

import {
  LocaleLink,
} from "./LocaleLink";

import {
  LanguageSwitcher,
} from "./LanguageSwitcher";

import {
  stripLocale,
} from "@/lib/locale";

const LOGO_SRC =
  "/brand/Idochive-logo-header.png";

const links = [
  {
    to: "/how-it-works",
    key: "nav.how",
  },
  {
    to: "/deployment",
    key: "nav.deployment",
  },
  {
    to: "/#use-cases",
    key: "nav.solutions",
  },
  {
    to: "/deployment",
    key: "nav.security",
  },
] as const;

function BrandLogo() {
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

function MenuIcon({
  open,
}: {
  open: boolean;
}) {
  if (open) {
    return (
      <span
        className="
          relative
          block
          h-5
          w-5
        "
        aria-hidden="true"
      >
        <span
          className="
            absolute
            left-0
            top-[9px]
            h-[2px]
            w-5
            rotate-45
            rounded-full
            bg-current
          "
        />

        <span
          className="
            absolute
            left-0
            top-[9px]
            h-[2px]
            w-5
            -rotate-45
            rounded-full
            bg-current
          "
        />
      </span>
    );
  }

  return (
    <span
      className="
        flex
        h-5
        w-5
        flex-col
        items-center
        justify-center
        gap-[5px]
      "
      aria-hidden="true"
    >
      <span className="h-[2px] w-5 rounded-full bg-current" />
      <span className="h-[2px] w-5 rounded-full bg-current" />
      <span className="h-[2px] w-5 rounded-full bg-current" />
    </span>
  );
}

export function Header() {
  const {
    t,
  } = useTranslation(
    "common",
  );

  const {
    pathname,
    hash,
  } = useLocation();

  const path =
    stripLocale(
      pathname,
    );

  const [
    open,
    setOpen,
  ] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [
    pathname,
    hash,
  ]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [
    open,
  ]);

  const getActive = (
    key: (typeof links)[number]["key"],
  ) => {
    if (
      key ===
      "nav.solutions"
    ) {
      return (
        path === "/" &&
        hash ===
          "#use-cases"
      );
    }

    if (
      key ===
      "nav.security"
    ) {
      return (
        path ===
          "/deployment" &&
        hash ===
          "#security"
      );
    }

    if (
      key ===
      "nav.deployment"
    ) {
      return (
        path ===
          "/deployment" &&
        hash !==
          "#security"
      );
    }

    return (
      key === "nav.how" &&
      path ===
        "/how-it-works"
    );
  };

  return (
    <>
      <header
        className="
          fixed
          inset-x-0
          top-0
          z-50

          border-b
          border-[#DCE9F6]

          bg-white
        "
      >
        <div
          className="
            mx-auto

            flex
            h-[72px]
            w-full
            max-w-[1480px]
            items-center
            justify-between

            px-4

            sm:h-[78px]
            sm:px-6

            lg:px-8
          "
        >
          {/* BRAND */}

          <LocaleLink
            to="/"
            className="
              flex
              min-w-0
              shrink-0
              items-center
              gap-3
            "
            aria-label={t(
              "brand",
            )}
          >
            <BrandLogo />

            <span
              className="
                min-w-0
                leading-none
              "
            >
              <span
                className="
                  block
                  truncate

                  text-[16px]
                  font-[800]
                  tracking-[-0.035em]
                  text-[#07142D]

                  sm:text-[18px]
                "
              >
                {t(
                  "brand",
                )}
              </span>

              <span
                className="
                  mt-1
                  block
                  truncate

                  text-[9px]
                  font-medium
                  text-[#536A8F]

                  sm:text-[10px]
                "
              >
                {t(
                  "logoLine",
                )}
              </span>
            </span>
          </LocaleLink>

          {/* DESKTOP NAV */}

          <nav
            className="
              hidden
              items-center
              gap-2

              lg:flex
            "
            aria-label="Primary navigation"
          >
            {links.map(
              (
                link,
              ) => {
                const active =
                  getActive(
                    link.key,
                  );

                return (
                  <LocaleLink
                    key={
                      link.key
                    }
                    to={
                      link.to
                    }
                    className={`
                      inline-flex
                      min-h-10
                      items-center
                      justify-center

                      px-3
                      py-2

                      text-[13px]
                      font-semibold

                      hover:text-[#1685EA]

                      xl:px-4
                      xl:text-[13.5px]

                      ${
                        active
                          ? "text-[#1685EA]"
                          : "text-[#314A70]"
                      }
                    `}
                  >
                    {t(
                      link.key,
                    )}
                  </LocaleLink>
                );
              },
            )}
          </nav>

          {/* DESKTOP ACTIONS */}

          <div
            className="
              hidden
              shrink-0
              items-center
              gap-3

              lg:flex
            "
          >
            <div className="px-1">
              <LanguageSwitcher />
            </div>

            <LocaleLink
              to="/book"
              className="
                inline-flex
                min-h-[44px]
                items-center
                justify-center

                rounded-[12px]

                bg-[linear-gradient(90deg,#1685EA_0%,#22A3E0_100%)]

                px-5

                text-[13px]
                font-bold
                text-white
              "
            >
              {t(
                "cta.book",
              )}
            </LocaleLink>
          </div>

          {/* MOBILE BUTTON */}

          <button
            type="button"
            onClick={() =>
              setOpen(
                (
                  value,
                ) =>
                  !value,
              )
            }
            aria-expanded={
              open
            }
            aria-controls="mobile-primary-navigation"
            aria-label={
              open
                ? t(
                    "closeMenu",
                  )
                : t(
                    "menu",
                  )
            }
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center

              rounded-[10px]

              border
              border-[#D9E7F5]

              bg-white

              text-[#19375E]

              lg:hidden
            "
          >
            <span className="sr-only">
              {open
                ? t(
                    "closeMenu",
                  )
                : t(
                    "menu",
                  )}
            </span>

            <MenuIcon
              open={open}
            />
          </button>
        </div>
      </header>

      {/* MOBILE NAV */}

      {open ? (
        <div
          id="mobile-primary-navigation"
          className="
            fixed
            inset-0
            z-40

            bg-[#07142D]/20

            pt-[72px]

            sm:pt-[78px]

            lg:hidden
          "
          onMouseDown={(
            event,
          ) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setOpen(
                false,
              );
            }
          }}
        >
          <div
            className="
              mx-3
              mt-3

              rounded-[18px]

              border
              border-[#DCE9F6]

              bg-white

              p-3

              sm:mx-5
              sm:p-4
            "
          >
            <nav
              className="
                flex
                flex-col
                gap-1
              "
              aria-label="Mobile primary navigation"
            >
              {links.map(
                (
                  link,
                ) => {
                  const active =
                    getActive(
                      link.key,
                    );

                  return (
                    <LocaleLink
                      key={
                        link.key
                      }
                      to={
                        link.to
                      }
                      className={`
                        flex
                        min-h-12
                        items-center

                        px-4

                        text-[14px]
                        font-semibold

                        hover:text-[#07142D]

                        ${
                          active
                            ? "text-[#1685EA]"
                            : "text-[#274466]"
                        }
                      `}
                    >
                      {t(
                        link.key,
                      )}
                    </LocaleLink>
                  );
                },
              )}
            </nav>

            <div
              className="
                my-3
                h-px
                bg-[#E4EDF7]
              "
            />

            <div
              className="
                grid
                gap-3

                sm:grid-cols-[1fr_auto]
                sm:items-center
              "
            >
              <div className="px-1">
                <LanguageSwitcher />
              </div>

              <LocaleLink
                to="/book"
                className="
                  inline-flex
                  min-h-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-[linear-gradient(90deg,#1685EA_0%,#22A3E0_100%)]
                  px-5
                  text-[13px]
                  font-bold
                  text-white
                "
              >
                {t(
                  "cta.book",
                )}
              </LocaleLink>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
