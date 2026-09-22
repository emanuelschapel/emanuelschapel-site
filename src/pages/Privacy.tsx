import { Link } from 'react-router-dom';
import { site, formattedAddress } from '../data/site';
import { PHONE, PHONE_HREF } from '../data/navigation';
import { useSeo } from '../lib/seo';

/**
 * Privacy policy.
 *
 * Written against what this site actually does, not from a template: four Netlify forms,
 * Sanity for obituary content, Google Fonts on every page, and a Google Maps embed on the
 * Contact page. If any of those change, this page has to change with them.
 *
 * TODO (client): have counsel review before launch. This is an accurate description of the
 * site's data handling, which is not the same thing as legal advice.
 */
const EFFECTIVE = 'September 22, 2026';

export default function Privacy() {
  useSeo({
    title: "Privacy Policy | Emanuel's Chapel Funeral Home",
    description:
      "How Emanuel's Chapel Funeral Home collects, uses, and protects the information you share through this website.",
    path: '/privacy',
  });

  return (
    <main className="bg-white">
      <section className="bg-blush border-b border-rule px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-10 bg-pink" />
            <span className="text-ink text-xs tracking-[0.4em] font-body uppercase">Legal</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-4">Privacy Policy</h1>
          <p className="font-body text-muted">Effective {EFFECTIVE}</p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto space-y-10">
          <Block title="Who this covers">
            <p>
              This policy describes how {site.legalName} (&ldquo;we&rdquo;) handles information collected
              through this website. It does not cover information you give us in person, over the
              phone, or in the documents involved in arranging a service &mdash; those are governed by
              our practices as a licensed funeral establishment and by Illinois law.
            </p>
            <p>
              Questions about anything here: call <a href={PHONE_HREF} className={LINK}>{PHONE}</a>,
              use our <Link to="/contact" className={LINK}>contact form</Link>, or write to us at{' '}
              {formattedAddress}.
            </p>
          </Block>

          <Block title="What you give us">
            <p>
              The only information this site collects from you is what you type into one of its four
              forms. Nothing on this site asks for payment details, and we never ask for a Social
              Security number, a card number, or any government identifier through the website.
            </p>
            <ul className={LIST}>
              <li><strong>Immediate need</strong> &mdash; your name, phone, email; your loved one&rsquo;s name, where they are currently located, whether a death has occurred, the type of service you are considering, and anything you write in the message field.</li>
              <li><strong>Contact</strong> &mdash; your name, phone, email, the reason you are writing, a service type if you pick one, and your message.</li>
              <li><strong>Pre-planning</strong> &mdash; your name, phone, email, how you prefer to be contacted, what you are interested in, and your message.</li>
              <li><strong>Pricing request</strong> &mdash; your name, phone, email, the package and service you are asking about, whether you want the General Price List, and your message.</li>
            </ul>
            <p>
              Some of this is sensitive, and some of it concerns a person who has died. We treat it
              the same way we treat everything else a family tells us: as confidential.
            </p>
          </Block>

          <Block title="What we do with it">
            <p>
              We use it to answer you. A form submission reaches our funeral directors as an email so
              that someone can call or write back, and we keep it so we can pick up where the
              conversation left off. We do not use it to build advertising profiles.
            </p>
            <p className="font-bold text-ink">
              We do not sell your information, rent it, or trade it. We do not share it with
              advertisers or data brokers.
            </p>
          </Block>

          <Block title="Who else touches it">
            <ul className={LIST}>
              <li><strong>Netlify</strong> hosts this website and processes its forms. Your submission is stored in our account there and forwarded to us by email. Netlify also keeps ordinary server logs, which include visitor IP addresses.</li>
              <li><strong>Our email provider</strong> carries the message once it leaves Netlify, the same as any email you might send us directly.</li>
              <li><strong>Sanity</strong> stores the obituary and tribute content we publish. Your browser loads that content directly from Sanity when you read an obituary. Sanity holds no form submissions.</li>
              <li><strong>Google</strong> serves the fonts used across the site, and the map on our Contact page. Loading a page therefore tells Google your IP address and browser, in the same way visiting any site that uses those services does.</li>
            </ul>
            <p>
              We may also disclose information where the law requires it, or where it is necessary to
              protect someone&rsquo;s safety.
            </p>
          </Block>

          <Block title="Cookies and tracking">
            <p>
              This site sets no cookies of its own, and runs no analytics, advertising, or tracking
              scripts. There is nothing here that follows you to other websites.
            </p>
            <p>
              One exception is worth naming plainly: the <strong>Google Map on our Contact page</strong> is
              embedded from Google, and Google may set cookies through that embed. You can avoid it by
              not visiting that page, or by blocking third-party cookies in your browser.
            </p>
            <p>
              If we add website analytics later, we will update this page before doing so.
            </p>
          </Block>

          <Block title="How long we keep it">
            <p>
              Form submissions are kept as long as they are useful to the family we are serving and to
              our records as a funeral establishment, and are then deleted. If you would like us to
              delete an enquiry sooner, ask &mdash; see below.
            </p>
          </Block>

          <Block title="Your choices">
            <p>
              You can ask us what you have sent through this site, ask for a copy, ask us to correct
              it, or ask us to delete it. Call <a href={PHONE_HREF} className={LINK}>{PHONE}</a> or send
              the request through our <Link to="/contact" className={LINK}>contact form</Link> and tell
              us what you would like. We will confirm who you are before acting on a request, because
              these records often concern someone else&rsquo;s family.
            </p>
            <p>
              There is nothing to unsubscribe from: this site does not sign you up for a mailing list,
              and we only write back about the enquiry you sent.
            </p>
          </Block>

          <Block title="Children">
            <p>
              This site is intended for adults making funeral arrangements. We do not knowingly collect
              information from children under 13. If you believe a child has sent us something through
              this site, contact us and we will delete it.
            </p>
          </Block>

          <Block title="Security">
            <p>
              The site is served over HTTPS, and submissions travel encrypted. No website can promise
              perfect security, but we do not keep anything here that we do not need, and the forms
              deliberately do not ask for financial or identity details.
            </p>
          </Block>

          <Block title="Changes">
            <p>
              If we change how this site handles information, we will update this page and the
              effective date above. Material changes will be reflected here before they take effect.
            </p>
          </Block>

          <div className="border-t border-rule pt-8">
            <p className="font-body text-muted">
              Questions, or something you would like removed?{' '}
              <Link to="/contact" className={LINK}>Contact us</Link> or call{' '}
              <a href={PHONE_HREF} className={LINK}>{PHONE}</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

const LINK = 'text-ink font-bold underline underline-offset-4 hover:text-pink-deep transition-colors';
const LIST = 'space-y-3 list-disc pl-5 marker:text-pink';

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl text-ink mb-4">{title}</h2>
      <div className="space-y-4 font-body text-muted leading-relaxed">{children}</div>
    </section>
  );
}
