import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CONTACT_EMAIL, CONTACT_ADDRESS_LINES, WHATSAPP_NUMBER_DISPLAY, whatsappLink } from "../lib/constants";
import InstallAppButton from "./InstallAppButton";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  FacebookPageIcon, InstagramIcon, LinkedInIcon, PinterestIcon, TikTokIcon, YouTubeIcon,
} from "./PlatformIcons";

const WHATSAPP_LINK = whatsappLink("Hi, I'd like to know more");

const SOCIAL_LINKS = [
  { label: "Pinterest", Icon: PinterestIcon, href: "https://za.pinterest.com/chatsched/" },
  { label: "Facebook", Icon: FacebookPageIcon, href: "https://facebook.com/chatsched" },
  { label: "TikTok", Icon: TikTokIcon, href: "https://www.tiktok.com/@chatsched" },
  { label: "YouTube", Icon: YouTubeIcon, href: "https://www.youtube.com/@chatsched" },
  { label: "LinkedIn", Icon: LinkedInIcon, href: "https://www.linkedin.com/company/chatsched/" },
  { label: "Instagram", Icon: InstagramIcon, href: "https://www.instagram.com/chatsched/" },
] as const;

const LINK_CLASS = "block text-sm py-1 mb-1 hover:text-billboard-yellow transition-colors break-words";
const HEADING_CLASS = "font-mono text-xs uppercase tracking-wider text-billboard-muted mb-3";

export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <footer className="bg-billboard-ink text-billboard-paperDim pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 pb-12 border-b border-[#3A342B]">

          {/* Brand + tagline */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 pr-4">
            <img src="/brand/logo-horizontal-dark.svg" alt="ChatSched" className="h-9 w-auto mb-2" />
            <p className="text-sm max-w-[32ch] mb-4">Tenders, RFQs and compliance help for South African small businesses.</p>
            <div aria-label="ChatSched social media" className="flex flex-wrap gap-2 mb-5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`ChatSched on ${social.label}`}
                  title={`ChatSched on ${social.label}`}
                  className="inline-flex items-center justify-center w-9 h-9 border-2 border-billboard-paperDim/30 rounded bg-billboard-inkSoft/10 text-billboard-paper hover:bg-billboard-yellow hover:text-billboard-ink hover:border-billboard-yellow transition-colors"
                >
                  <span aria-hidden="true" className="inline-flex"><social.Icon /></span>
                </a>
              ))}
            </div>
            <LanguageSwitcher compact />
          </div>

          {/* Services */}
          <div>
            <h2 className={HEADING_CLASS}>Services</h2>
            <Link to="/tender-readiness" className={LINK_CLASS}>Free readiness check</Link>
            <Link to="/tenders" className={LINK_CLASS}>Tenders &amp; RFQs</Link>
            <Link to="/bid-support" className={LINK_CLASS}>Bid Support</Link>
            <Link to="/compliance-setup" className={LINK_CLASS}>Compliance Setup</Link>
            <Link to="/consult" className={LINK_CLASS}>Coaching &amp; Consults</Link>
            <Link to="/services" className={LINK_CLASS}>All services</Link>
            <Link to="/tools" className={LINK_CLASS}>Free tools</Link>
            <Link to="/pricing" className={LINK_CLASS}>Pricing</Link>
          </div>

          {/* Company */}
          <div>
            <h2 className={HEADING_CLASS}>Company</h2>
            <Link to="/about" className={LINK_CLASS}>About ChatSched</Link>
            <Link to="/how-it-works" className={LINK_CLASS}>How it works</Link>
            <Link to="/for-partners" className={LINK_CLASS}>For partners</Link>
          </div>

          {/* Trust & Help */}
          <div>
            <h2 className={HEADING_CLASS}>Trust &amp; Help</h2>
            <Link to="/trust" className={LINK_CLASS}>Trust Centre</Link>
            <Link to="/faq" className={LINK_CLASS}>FAQ</Link>
            <Link to="/contact" className={LINK_CLASS}>Contact</Link>
          </div>

          {/* Contact */}
          <div>
            <h2 className={HEADING_CLASS}>Contact</h2>
            <a href={`mailto:${CONTACT_EMAIL}`} className={`${LINK_CLASS} whitespace-nowrap break-normal leading-normal`}>{CONTACT_EMAIL}</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>{WHATSAPP_NUMBER_DISPLAY}</a>
            <p className="text-sm leading-relaxed mb-3">{CONTACT_ADDRESS_LINES.join(", ")}</p>
            <InstallAppButton className="inline-flex items-center gap-1.5 text-xs font-semibold text-billboard-paperDim hover:text-billboard-yellow transition-colors" />
          </div>
        </div>

        {/* Who we are not (draft wording: a South African attorney must approve it). */}
        <p className="py-6 border-b border-[#3A342B] text-xs text-billboard-muted max-w-3xl">
          ChatSched is not a law firm, audit firm, accounting firm, registered tax practitioner or B-BBEE verification agency. Regulated work is done by independent, qualified partners.
        </p>

        {/* Bottom bar */}
        <div className="pt-5 text-xs text-billboard-muted flex flex-wrap justify-between gap-2">
          <span>{t("footer.copyright")}</span>
          <span className="flex flex-wrap gap-x-4 gap-y-1">
            <Link to="/privacy" className="hover:text-billboard-yellow">{t("footer.privacyPolicy")}</Link>
            <Link to="/terms" className="hover:text-billboard-yellow">{t("footer.terms")}</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
