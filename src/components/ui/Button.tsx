import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link } from "react-router-dom";

/**
 * The only three button treatments on the site. If a fourth is needed, add it here —
 * do not compose one-off Tailwind strings in pages.
 *
 *  primary   ink fill, white text        → the one action on a page that matters most
 *  accent    pink fill, ink text          → secondary action (white-on-pink fails contrast; never do it)
 *  outline   ink or white border          → tertiary; `tone="light"` when sitting on a dark surface
 */
type Variant = "primary" | "accent" | "outline";
type Tone = "dark" | "light";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded px-6 py-4 font-body text-[15px] font-bold leading-none " +
  "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2 " +
  "min-h-[48px]"; // 48px tap target — grieving hands on phones

const variants: Record<Variant, Record<Tone, string>> = {
  primary: {
    dark: "bg-ink text-white hover:bg-ink-soft focus-visible:ring-offset-ivory",
    light: "bg-white text-ink hover:bg-blush focus-visible:ring-offset-ink",
  },
  accent: {
    dark: "bg-pink text-ink hover:bg-pink-deep focus-visible:ring-offset-ivory",
    light: "bg-pink text-ink hover:bg-pink-deep focus-visible:ring-offset-ink",
  },
  outline: {
    dark: "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-white focus-visible:ring-offset-ivory",
    light: "border-[1.5px] border-white/70 text-white hover:bg-white hover:text-ink focus-visible:ring-offset-ink",
  },
};

interface CommonProps {
  variant?: Variant;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}

type LinkProps = CommonProps & { to: string; href?: never } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;
type AnchorProps = CommonProps & { href: string; to?: never } & AnchorHTMLAttributes<HTMLAnchorElement>;
type NativeProps = CommonProps & { to?: never; href?: never } & ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = LinkProps | AnchorProps | NativeProps;

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  { variant = "primary", tone = "dark", className = "", children, ...rest },
  ref,
) {
  const cls = `${base} ${variants[variant][tone]} ${className}`.trim();

  if ("to" in rest && rest.to) {
    const { to, ...a } = rest as LinkProps;
    return (
      <Link ref={ref as never} to={to} className={cls} {...a}>
        {children}
      </Link>
    );
  }
  if ("href" in rest && rest.href) {
    const a = rest as AnchorProps;
    return (
      <a ref={ref as never} className={cls} {...a}>
        {children}
      </a>
    );
  }
  const b = rest as NativeProps;
  return (
    <button ref={ref as never} type="button" className={cls} {...b}>
      {children}
    </button>
  );
});
