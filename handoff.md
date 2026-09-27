# Handoff — Emanuel's Chapel Funeral Home site

**Date:** 2026-09-27
**Branch:** `main` @ `08f0966` — clean tree, pushed, deployed
**Live:** https://www.emanuelschapelfh.com — **launched, indexed, HTTPS enforced**

---

## 1. Goal

Ship the Emanuel's Chapel Funeral Home site on its production domain.

React 19 + TypeScript + Vite 8 + Tailwind 3 SPA on React Router 7. Netlify hosting and
Forms, Sanity CMS for obituaries. Client: Emanuel Jones. Editor: Lakedia. Built by KLC
Consulting Group.

**Phase 1 is complete and the site is live.** The 2026-09-23 handoff listed the production
domain as the one thing blocking launch; that is done. This session cut the domain over,
found and fixed two defects the previous audit missed, and ran the accessibility pass that
had never been run.

---

## 2. The domain — read this first

**The production domain is `emanuelschapelfh.com`.** Three spellings get confused:

| Spelling | Reality |
|---|---|
| `emaneuelschapelfh.com` | **Does not exist.** A recurring typo — extra `e` after `eman`. |
| `emanuelschapelfh.com` | **The real domain.** GoDaddy, `ns33/ns34.domaincontrol.com`. |
| `emanuelschapel.com` | Owned by an unrelated party, parked on Squarespace. |

The last one is what the client's Sept 2026 pricing flyer prints and what the previous
handoff named as the launch target. Both are stale — that domain was never available, which
is why the `fh` variant was bought.

`www` is primary; the apex 301s to it.

### The DNS zone carries live Microsoft 365 email

Resold through GoDaddy. `owner@emanuelschapelfh.com` is the real mailbox; `info@` and
`contact@` are aliases onto it.

| Record | Value |
|---|---|
| MX | `emanuelschapelfh-com.mail.protection.outlook.com` |
| SPF | `v=spf1 include:secureserver.net -all` |
| M365 verification | `NETORGFT21168338.onmicrosoft.com` |
| DKIM | `selector1` + `selector2` → Microsoft |
| DMARC | `v=DMARC1; p=quarantine; rua=mailto:dmarc_rua@onsecureserver.net` |

**Any future DNS work on this zone must touch only the apex `A` and the `www` `CNAME`.**
Leave MX, TXT, `autodiscover`, and every `_`-prefixed record alone. Do not use GoDaddy's
"connect to a website builder" flow — it rewrites the whole zone.

### Do not trust a local `nslookup` on this zone

The resolver on the build machine (`103.86.96.100`) returns NODATA for MX and TXT records
that genuinely exist, and cannot reach GoDaddy's authoritative nameservers or `8.8.8.8`.
It reported "no MX" on a domain with working email. Query over DoH instead:

```bash
curl -s -H 'accept: application/dns-json' \
  "https://cloudflare-dns.com/dns-query?name=emanuelschapelfh.com&type=MX"
```

### Live DNS

| Record | Value |
|---|---|
| apex `A` | `75.2.60.5` (`apex-loadbalancer.netlify.com`) |
| `www` `CNAME` | `emanuelchapelrebrand.netlify.app` |

---

## 3. Current State

### Verified live on the production domain

| Area | State |
|---|---|
| Pages | 10 routes + dynamic obituary tributes + 404 catch-all — all 200 |
| TLS | Let's Encrypt issued; `force_ssl: true`; HTTP 301s to HTTPS |
| Apex → www | 301 |
| Staging hostname | 301s to production, per-path (see §5) |
| Indexing | **Open.** `robots.txt` allows, `Sitemap:` line present, meta `index, follow` |
| Sitemap | 10 URLs, correct host, `lastmod` on every entry, well-formed |
| Canonical / OG / Twitter | All on the production domain |
| schema.org `FuneralHome` | `url` / `logo` / `image` on the production domain |
| Security headers | CSP, HSTS, Permissions-Policy, X-Frame-Options, X-Content-Type-Options |
| Sanity CORS | Production origins added — obituaries load |
| Forms | 4 Netlify forms; **pricing form tested end-to-end on production** |
| Accessibility | axe clean on 11/11 pages (see §4) |
| Social sharing | Static `<head>` baked per route at build; every route serves its own card (see §5) |
| Content freshness | Sanity webhook rebuilds the site on any obituary change |

### The indexing flip worked as designed

`PRELAUNCH` in `vite.config.ts` derives from whether Netlify's `URL` is still a
`*.netlify.app` host. Attaching the domain changed `URL`, and the next build wrote the real
`robots.txt`, stopped emitting `_headers`, and flipped the meta tags on its own. Nothing was
edited.

**But the ordering matters, and it is not optional:** DNS must resolve to Netlify *before*
the rebuild. The build bakes canonical/OG/sitemap/schema.org URLs from `URL`, so rebuilding
while the domain still points at parking publishes a site advertising a hostname that serves
a parking page — and does it with indexing already open.

### Environment

- Two clones, kept in sync: primary `C:\Users\leroy\.claude\projects\Emanuels_Chapel\emanuelschapel-site`,
  mirror `C:\Users\leroy\OneDrive\Desktop\KLC\Clients\EmanualsChapel\emanuels-chapel`
  (synced with `git fetch && git reset --hard origin/main`).
- Netlify site `emanuelchapelrebrand`, id `0d233326-7227-43ca-910d-cdefae790aa9`.
  CLI **is** authenticated (as Emanuel Jones / `emanuelschapel@yahoo.com`).
- Sanity project `51ugvyhp`, dataset `production`, Studio at `emanuels-chapel.sanity.studio`.
  CORS allowlist now includes both production origins.
- `gh` CLI installed but **not authenticated** — PRs have to be opened via compare URL.
- Local preview: `npx vite preview --port 4173` (4173 and 5173 only; other ports are blocked
  by both the browser pane and Sanity CORS).
- Build with the real URL to reproduce production exactly:
  `URL=https://www.emanuelschapelfh.com npm run build`

---

## 4. Accessibility — first axe pass (2026-09-27)

Handoff §6 item 2 had this as "never done". It has now been run over all 10 routes plus the
404, with axe-core 4.10.2.

**Result: 11/11 pages clean**, apart from one confirmed false positive.

### What was found and fixed

All three violations came from shared layout, so every page reported the same ones.

| Rule | Impact | Cause | Fix |
|---|---|---|---|
| `region` | moderate | `AvailabilityBar` renders above `<header>` and `MobileCallBar` after `<footer>`, both plain `<div>`s — so the 24/7 phone number and the mobile call button belonged to no landmark and were skipped by region navigation | Both are now labelled `<section>` elements |
| `heading-order` | moderate | Footer used `h4` for its three column headings (`h2 → h4`, no `h3`). Same skip in Home value cards, Planning Ahead benefit cards, the hidden About staff cards, and the Obituaries notices | Retagged to the correct level |

Neither fix changes the design — every one of those headings takes its size from its classes,
not its tag. Verified visually.

The `AvailabilityBar` could not be folded into `<header>`: `Header.tsx` already renders one,
and nesting banner landmarks is worse than the original problem.

### The color-contrast report is a false positive — do not "fix" it

axe reports `[serious] color-contrast` on `.shrink-0 > span` on every page, and five more
on the home page. **Both are artifacts.** The elements sit on `bg-ink` (`#141414`) through
transparent intermediate ancestors; axe fails to walk past them and falls back to the page
background `#fcfaf9`.

| Comparison | Ratio | |
|---|---|---|
| pink `#ff96c5` on ink `#141414` — the real pairing | **9.14:1** | passes |
| white/85 on ink — the real pairing | **13.43:1** | passes |
| pink on `#fcfaf9` — what axe measured | 1.94:1 | not a real pairing |

A future audit will flag this again. It is not a defect. Recompute before acting.

---

## 5. Changes Made

Commits on `main`, newest first. `91ededb` is this session's starting point.

| Commit | Change |
|---|---|
| `08f0966` | Bake a static `<head>` into one HTML file per route |
| `927d383` | Record the prerender spike results |
| `479eef2` | Use the named `@sanity/image-url` export |
| `f2e1746` | Add Google Search Console verification file |
| `89c41d8` | Fix accessibility landmark and heading-order violations |
| `216f9f8` | Redirect the staging hostname to the production domain |
| `91ededb` | Block indexing until the real domain is attached; fix broken schema.org logo |
| `aa1322a` | Real favicon set (ICO + 32/180/192/512 + manifest) from the wreath monogram |
| `022b14f` | Logos cut to display size (627 KB → 34 KB, 173 KB → 22 KB); 26 unused images removed |
| `e60b228` | Privacy policy at `/privacy` |
| `0d40fb2` | 404 page with `noindex` |

### Config changes made outside git

- **Netlify:** `custom_domain` = `www.emanuelschapelfh.com`, `domain_aliases` =
  `["emanuelschapelfh.com"]`. TLS provisioned automatically; `force_ssl` enabled.
- **Sanity CORS:** added `https://www.emanuelschapelfh.com` and `https://emanuelschapelfh.com`,
  both credential-less (the dataset is public read).
- **GoDaddy DNS:** apex `A` → `75.2.60.5`, `www` `CNAME` → `emanuelchapelrebrand.netlify.app`.
  Parking records removed. Mail records untouched and verified intact afterwards.

### Prerendered heads — how it works

Every shared link on the site used to render the same generic homepage card, because the app
sets its `<head>` in a `useEffect` and no social scraper runs JavaScript. A family sharing a
tribute got the funeral home's homepage title, homepage description and no image at all.

The build now writes one HTML file per route with the real tags baked in.

| File | Role |
|---|---|
| `src/data/seo-routes.ts` | Per-route title/description/sitemap weight. Read by the pages **and** the build — this is why the build can see the copy at all. |
| `src/lib/seoTags.ts` | The tag set as data, plus its HTML serialiser. |
| `src/lib/tributeSeo.ts` | One tribute's head and JSON-LD. Was inside `Tribute.tsx`, where the build could not reach it. |
| `src/lib/links.ts` | `livestreamHref`, split out of `sanity.ts` so the build can use it without pulling in `@sanity/client`. |
| `vite.config.ts` | Emits the files in `closeBundle`, reusing the Sanity fetch the sitemap already does. |

**Three things to know before changing any of it:**

1. **`seoTags.ts` is the single definition of which attribute carries which tag,** and it has
   to stay that way. `useSeo` upserts by selector. If the build emitted `name="og:title"`
   while the hook looked for `property="og:title"`, the hook would not find the baked tag,
   would append a second one, and every page would ship duplicate Open Graph tags — valid
   HTML that scrapers resolve inconsistently. Verified: exactly one of each tag on first
   paint and after client-side navigation.
2. **Files are `<route>.html`, never `<route>/index.html`.** See §7 item 14 — the directory
   form triggers a trailing-slash redirect that breaks every canonical URL.
3. **The sitemap route list and the pages' SEO copy are now the same list.** Adding a route
   means adding it to `SEO_ROUTES` and nowhere else.

A new obituary needs a build before it has a baked head or a sitemap entry. That is what the
webhook below is for.

### How fresh is the site, really

Three independent clocks. Confusing them is what makes a publish look broken.

| What | Updates | Gated by |
|---|---|---|
| Obituary lists and tribute content | **Seconds** | Sanity CDN (`max-age=3`), read on page mount or tab return |
| Static `<head>` (share card) and sitemap entry | **~2 min** | Webhook → Netlify build |

`useRemote` (`src/lib/useSanity.ts`) fetches on mount and on return to the foreground —
`visibilitychange` plus `focus`, with a ten-second cooldown since the last fetch. It does
not poll. Before the foreground refetch existed, a page left open never updated at all,
which read as "publishing did not work" when the data had in fact been current within
seconds.

Measured on 2026-09-27 with a real publish-then-delete: the obituary appeared on the site
within seconds and the webhook build finished about two minutes later. A deletion behaves
the same way. If one appears to linger, reload before assuming staleness — an open tab that
has not been focused is showing its mount-time fetch.

**Takedown timing matters here.** On a removal the page body corrects immediately — anyone
loading the URL gets "We couldn't find that tribute" — but the prerendered `<head>` still
carries the person's name and short bio until the rebuild finishes, so a social scraper
hitting that URL inside the window still receives them. Off the site immediately, off the
share cards in about two minutes. `ALLOW_INDEXING`-style shortcuts do not help; only a build
does, and the webhook already starts one.

**One nuance on unmatched paths.** `index.html` doubles as the SPA fallback, so a mistyped
URL now serves home's baked head, including `robots: index, follow`, until React renders the
404 and switches it to `noindex, nofollow` (verified — one tag, correct value). Google runs
JS, so it sees the correction. Not a regression: before this change `index.html` carried no
robots meta at all, which is equally indexable. Narrowing the Netlify rule to return a real
404 for unmatched paths (§8) would remove the window entirely.

### Sanity webhook → Netlify build hook

A Netlify build hook (`Sanity obituary publish`, branch `main`) is wired to a Sanity webhook
named **Rebuild site on obituary change**: dataset `production`, published documents only,
triggering on create / update / delete where `_type == "obituary"`.

Publishing an obituary now rebuilds the site on its own. Before this, a tribute went live
immediately but stayed absent from the sitemap and shared as a generic card until somebody
happened to deploy.

**The build hook URL is a secret** — anyone holding it can trigger builds. It is not in the
repo and is not recorded in this document. Find it in Netlify under Site configuration →
Build & deploy → Build hooks, or in Sanity under Manage → API → Webhooks.

Creating that webhook through the management API is worse than it looks: the accepted body
depends on `type`, the triggers live under a `rule` object rather than a top-level `on`, and
`filter` is a GROQ string inside `rule` but is rejected at the top level. `npx sanity hook
create` is interactive and cannot be scripted. If it needs changing, the Manage UI is the
sane route.

### The staging-hostname defect

The pre-launch design had a hole worth understanding, because the same shape could recur.

`PRELAUNCH` correctly lifted the indexing block when the domain was attached — but nothing
retired the old hostname. **Netlify does not redirect `*.netlify.app` to the primary domain
on its own.** So from the moment the block lifted, the complete site was reachable and
indexable on two hostnames with an `Allow: /` robots.txt: duplicate content splitting link
equity for a business that lives on local search.

The canonical tag could not defend against it, because `src/lib/seo.ts` sets the canonical in
a `useEffect` — it only exists for crawlers that execute JS.

Fixed in `netlify.toml` with a forced 301 from the netlify.app host, placed **above** the SPA
catch-all (Netlify applies the first matching rule, and `/*` would swallow it).

---

## 6. Active Files

### Deliberate constraints — do not change without asking

- **`src/components/home/Hero.tsx:10-13`** — the hero plinth deliberately carries **no
  call/immediate-need buttons**. This records the client's own instruction ("there are a LOT
  of Call now indicators… remove all three floating CTAs"). A generic checklist will keep
  flagging this; it is not a defect.
- **`TODO (client)` comments** — leave them until the client supplies the asset.
- **Palette rule** — pink (`#FF96C5`) never carries white text. `Button.tsx` encodes the only
  three treatments; do not compose one-off Tailwind button strings in pages.
- **`public/__forms.html`** — any field added to a React form must be declared here or
  Netlify silently drops it. (The `package` field is declared and verified working.)
- **`public/googlea67b9d453a067c5b.html`** — Google Search Console verification. It looks
  like a stray file and it is not. Google re-checks it periodically and revokes verification
  if it stops resolving, so deleting it silently un-verifies the property some weeks later,
  with nothing in the build to explain why. Leave it.
- **Heading tags now carry accessibility meaning.** Several headings use a tag that does not
  match their visual size on purpose — the size comes from the classes. Do not "tidy" an
  `h2` that looks small back into an `h4`; see §4.
- **`src/lib/seoTags.ts` must stay the only place that decides a tag's attribute form**, and
  `src/data/seo-routes.ts` the only place route copy lives. Moving a title back into a page
  component makes it invisible to the build, which silently returns that route to sharing as
  a generic card — nothing fails, the card just goes wrong. See §5.
- **The netlify.app redirect in `netlify.toml` must stay above the `/*` rule.**

### Unused but intentionally kept

`src/components/sections/SplitHero.tsx` — no longer used after Planning moved to `PageHero`.
Kept as a valid two-panel layout. Safe to delete if nobody wants it.

---

## 7. Failed Attempts

Recorded so nobody retries them. Items 1–11 are from the 2026-09-23 session and still stand;
12–13 are new.

**Image work**

1. **Text inpainting with one wide radius (45px)** left a pale, flat ghost exactly where the
   text had been. Fixed by filling from the smallest neighbourhood with real pixels.
2. **Planning hero variant B** produced a mirrored ghost dove and duplicated candles.
   Discarded; variant A shipped.
3. **Mirror-extending the chapel interior** smeared into mush — the room is in perspective.
   Cropped instead.
4. **Extending the hands photo to the right** mirrored a blown-out window into a bright wedge.
   Extended left instead.
5. **Wreath bbox for the favicon** caught anti-aliased ascenders. Fixed with an alpha
   threshold (>60) and a row limit (y < 262).

**Process**

6. **Rebuilt the whole Contact "Follow Along" strip** when asked only to change its CTA.
   Reverted in `eb223dd`.
7. **Recommended adding CTAs to the home hero** without noticing `Hero.tsx` carries an
   explicit comment saying it deliberately has none.
8. **Assumed the owner portrait and title were placeholders** — twice. Both are real.

**Tooling**

9. **`vite preview` on port 4174** — the browser pane refuses navigation. Use 4173.
10. **PIL `GaussianBlur` rejects float images** in this build. Worked around with a
    three-pass box-blur in numpy.
11. **Netlify skipped a deploy** with `"Skipped due to account credit usage exceeded"` — a
    billing state, not a build failure.

**New this session**

12. **`nslookup` on `emanuelschapelfh.com` reported no MX records** on a domain with working
    Microsoft 365 email, and reported NXDOMAIN-adjacent nonsense for TXT. The local resolver
    filters or truncates these answers and cannot reach the authoritative nameservers. Acting
    on that output would have meant telling the client their DNS had no mail configured, one
    step before editing the zone. Always confirm over DoH — see §2.
13. **`netlify api provisionSiteTLSCertificate` returned `Unprocessable Entity`.** Not a
    failure: Netlify had already provisioned the certificate automatically once DNS resolved.
    Check `getSite` for `ssl: true` before trying to force it.
14. **Prerendering as `dist/<route>/index.html` (directory index) is disqualified.** Netlify's
    `pretty_urls` 301-redirects `/obituaries/foo` → `/obituaries/foo/`. Every canonical URL and
    every sitemap entry on this site is slash-less, so each tribute would take an extra hop and
    the served URL would disagree with its own `og:url`. Emit `dist/<route>.html` instead —
    measured at 200 with zero redirects at the exact slash-less URL. See §9.
15. **A draft deploy cannot be used to test any of this.** The account sets `sso_login: true`
    with `sso_login_context: "non_production"`, so every non-production deploy answers 401 to
    an unauthenticated fetch — including `curl` and every social scraper. Do not disable that
    setting for a test; spike against production using paths that do not exist yet
    (`/spike-test`, a non-existent obituary slug) and restore with `createSiteBuild`.

---

## 8. Next Steps

### Highest value

1. **Google Business Profile.** The listing exists (the schema.org geo was matched against it
   on 2026-09-16), and its **website field still points somewhere other than the new domain**.
   This is worth more local search traffic than anything left in the codebase. Its contact
   email should move to `info@` as well.
2. **Google Search Console.** Not created. Add `https://www.emanuelschapelfh.com` and submit
   `/sitemap.xml`. Create it under `owner@`, not the yahoo address. Everything on the site
   side is verified ready: sitemap valid, Googlebot gets 200, no blocking headers.

### Email — move off the yahoo address

The site itself publishes **no** email address anywhere (only `your@email.com` placeholders in
three form inputs), so all of this is dashboard config. No code, no redeploy.

4. **Netlify form notifications** — all four currently go to `emanuelschapel@yahoo.com`.
   Point them at `info@`. Subject prefixes (`[IMMEDIATE NEED]`, `[PRICING]`, `[PRE-PLANNING]`,
   `[INQUIRY]`) already handle filtering.
5. **A second human on Immediate Need.** `info@`, `contact@` and `owner@` are all aliases onto
   one mailbox, so adding another alias as a second recipient achieves nothing — it delivers
   the same mail twice to the same inbox. The 24/7 urgent path currently has a single point of
   failure. Add a recipient with their own mailbox.
6. **Configure send-as for the aliases in M365.** By default a reply from the `owner@` mailbox
   goes out as `owner@` even when the family wrote to `contact@`, which reads like their
   message was forwarded to someone's personal account.
7. **Netlify deploy notifications** (3 hooks) — point at KLC, not the client.
8. **Netlify account login/recovery** — change last, after M365 has run clean for a couple of
   weeks. It is the recovery address for the whole hosting account.
9. **Leave the GoDaddy registrar account on yahoo.** If `owner@emanuelschapelfh.com` becomes
   the recovery address for the account controlling `emanuelschapelfh.com`'s DNS, then a DNS
   or mail misconfiguration locks you out of the only tool that can fix it.

### Still open from Phase 1

10. **Lakedia's Sanity invite was never accepted** — `<pending>` at `wardceremony@gmail.com`
    since 2026-09-17. The person meant to publish obituaries cannot log in, and Sanity has 0
    published obituaries. Resend, ideally to a domain address.
11. **Counsel review of `/privacy`.** It accurately describes the site's data handling, which
    is not the same as legal advice. It discloses that the Google Maps embed on Contact can
    set cookies — the only cookie on the site. Making that map click-to-load would remove it.
12. **Analytics (GA4).** Not installed. If yes, it pulls in a cookie banner *and* a conversion
    URL for the forms (the inline success panels currently give nothing to measure).
13. **Office hours** — held; `openingHoursSpecification` is deliberately omitted from the
    schema.org markup until they exist.
14. **Phone mockup on Contact** still shows `@emanuelchapel`, never a live handle. Decorative,
    `TODO (client)` in place. Needs a screenshot of the real profile.
15. **Zip code** `60609` — `site.ts` carries a TODO to confirm; Western at 51st is near the
    60609/60632 line. The flyer says 60609.
16. **`SHOW_TEAM`** is false. Staff section is intact and one word from returning, but the
    headshots are stock. (Its heading levels were corrected this session so it comes back
    clean.)

### Optional tidy-ups

17. **Netlify's HUD widget throws a CSP error** on every page load — it injects an inline
    script that `script-src 'self'` blocks. No visitor impact; the site ships zero inline
    scripts of its own. Disable the HUD in Netlify site settings to clear the console.
18. Narrow the Netlify rule to return a real 404 for unmatched asset extensions instead of the
    SPA shell. (`/no-such-page` currently returns 200 with the React 404 page, which is
    `noindex`, so this is cosmetic.)
19. Delete `SplitHero.tsx` if nobody wants the two-panel layout.
20. Old feature branches `feat/image-refresh-sept-2026` and `feat/pricing-packages` are merged
    and can be deleted.

---

## 9. Prerender spike — measured results (2026-09-27)

Run before building the prerender work in §8 item 3, to find out how Netlify actually serves
emitted route files. Both variants were deployed to production on throwaway paths and removed.

| Variant | Result |
|---|---|
| `dist/<route>/index.html` | **301 → trailing slash.** `og:url` then disagrees with the served URL, and every sitemap entry redirects. Rejected. |
| `dist/<route>.html` | **200, zero redirects**, served at the exact slash-less URL. `pretty_urls` resolves the extension. Use this. |

Also measured, on a flat file at `/obituaries/<slug>`:

- `facebookexternalhit` receives the route-specific `<title>`, `og:title`, `og:url`, `og:image`.
- React hydrates normally; `location.pathname` is correct and the right route renders.
- **No duplicate head tags.** `useSeo` upserts by selector (`link[rel="canonical"]`,
  `meta[property="og:title"]`, …), so it updates the baked tags in place. The emitting plugin
  **must** use those exact attribute forms or every page ships two of each tag.
- After hydration the client overwrites the baked values. For a real obituary it writes the
  same values back. For a missing one it correctly switches to the not-found state with
  `noindex` — so a crawler that does not run JS still gets the good baked meta, which is the
  point.

**Known caveat:** the `.html` form stays reachable (`/obituaries/foo.html` returns 200), so
each page has two working URLs. The baked `<link rel="canonical">` consolidates them for search
engines, which is enough. Do **not** "fix" it with a blanket `/*.html → /:splat` redirect:
`__forms.html` must keep its exact path or Netlify stops registering the forms, and
`googlea67b9d453a067c5b.html` must keep its exact path or Search Console un-verifies.

---

## 10. Launch verification log (2026-09-27)

Run again after any infrastructure change.

```bash
B=https://www.emanuelschapelfh.com

curl -sI $B/ | grep -i strict-transport      # HSTS present
curl -s  $B/robots.txt                        # Allow: / + Sitemap: line
curl -s  $B/sitemap.xml | grep -c "<loc>"     # 10
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" \
     https://emanuelchapelrebrand.netlify.app/services   # 301 -> production
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" \
     https://emanuelschapelfh.com/            # 301 -> www

# Sanity CORS from the production origin
curl -sI -H "Origin: https://www.emanuelschapelfh.com" \
  "https://51ugvyhp.apicdn.sanity.io/v2025-01-01/data/query/production?query=%2A%5B_type%3D%3D%22obituary%22%5D&perspective=published" \
  | grep -i access-control-allow-origin
```

**Form test, 2026-09-27 20:58 UTC** — submitted through `/pricing` on production. Netlify
recorded it on the `pricing` form with every field intact, including `package = gold`, which
was the field the previous handoff flagged as unverified. Inline success panel rendered.
Notification went to `emanuelschapel@yahoo.com`; the submission is marked as a KLC test in
its name and message fields.

**Obituary pipeline test, 2026-09-27 21:07 UTC** — a `launch-test` obituary was published in
Sanity and the next build picked it up into the sitemap automatically, which proves the
tribute pipeline works end to end. It was then deleted and the site rebuilt.

Two things that surfaced and are worth keeping:

- **The sitemap only regenerates at build time.** Deleting a document in Sanity does not
  remove its URL from the live sitemap; a rebuild is required. Publishing a new obituary has
  the same lag in reverse — it appears in the sitemap on the next build, not on Publish.
- **A tribute URL with no matching document renders a graceful "We couldn't find that
  tribute" page with `noindex, nofollow`**, so a deleted obituary cannot be indexed even if a
  crawler saw the URL while it was still listed. This is why the `noindex` prop exists in
  `src/lib/seo.ts`.
