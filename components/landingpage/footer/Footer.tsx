import Link from "next/link";
import { footerData } from "./footer.data";
import { ContactInfo, SocialLink } from "./footer.types";
import { schoolLogo } from "../landingData";
import Image from "next/image";


/* ── SVG Icons ── */
function LocationIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .95.68l1.45 4.36a1 1 0 0 1-.23 1.02L8.5 10.5a11.05 11.05 0 0 0 5 5l.94-1.95a1 1 0 0 1 1.02-.23l4.36 1.45a1 1 0 0 1 .68.95V19a2 2 0 0 1-2 2C9.16 21 3 14.84 3 7V5z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/* ── Contact icon resolver ── */
function ContactIcon({ type }: { type: ContactInfo["icon"] }) {
  if (type === "location") return <LocationIcon />;
  if (type === "mail") return <MailIcon />;
  return <PhoneIcon />;
}

/* ── Social icon resolver ── */
function SocialIcon({ platform }: { platform: SocialLink["platform"] }) {
  if (platform === "facebook") return <FacebookIcon />;
  if (platform === "instagram") return <InstagramIcon />;
  return <LinkedInIcon />;
}

/* ── Main Footer ── */
export default function Footer() {
  const { contact, brand, social, usefulLinks, quickLinks, copyright } =
    footerData;

  return (
    <footer className="bg-[#263238] text-gray-300">

      {/* ── Top contact bar ── */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {contact.map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              {/* Circle icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-dashed border-white/25 flex items-center justify-center text-white">
                <ContactIcon type={item.icon} />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-white font-semibold text-sm hover:text-emerald-400 transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-white font-semibold text-sm">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand column */}
        <div className="lg:col-span-1">
          {/* Logo text */}
          <div className="flex items-center gap-2 mb-4">
            <div className="">
              <Image
                src={schoolLogo.png}
                alt="eSchool logo"
                width={34}
                height={34}
                className="object-contain"
                unoptimized
              />
            </div>
            <span className="text-white text-xl font-extrabold tracking-wide">
              Hamro<span className="text-emerald-400">LMS</span>
            </span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            {brand.tagline}
          </p>

          {/* Social icons */}
          <div className="flex gap-3">
            {social.map((s) => (
              <a
                key={s.platform}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.platform}
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-emerald-500 flex items-center justify-center text-white transition-colors duration-200"
              >
                <SocialIcon platform={s.platform} />
              </a>
            ))}
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="text-white font-bold text-base mb-5">Useful Links</h4>
          <ul className="space-y-3">
            {usefulLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-gray-400 text-sm hover:text-emerald-400 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold text-base mb-5">Quick Links</h4>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-gray-400 text-sm hover:text-emerald-400 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Map embed */}
        <div>
          <h4 className="text-white font-bold text-base mb-5">Find Us</h4>
          <div className="rounded-xl overflow-hidden border border-white/10 h-44">
            <iframe
              title="School Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56932.11229694988!2d87.24619!3d26.45331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef740da8e08d25%3A0x79f51539f7e43ee1!2sBiratnagar%2C%20Morang!5e0!3m2!1sen!2snp!4v1680000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* ── Bottom copyright bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 text-center">
          <p className="text-gray-400 text-sm font-medium">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
