import Link from 'next/link';

type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type LegalDocumentProps = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

const baseSections: LegalSection[] = [
  {
    title: 'Independent service',
    paragraphs: [
      'ProfileFinder is an independent service. It is not affiliated with, endorsed by, sponsored by, authorized by or officially connected to Tinder, Bumble, Hinge, Instagram, Facebook, Meta, Match Group or any other third-party platform mentioned on the website.',
      'All third-party names, trademarks, logos and references remain the property of their respective owners and are used only for identification or descriptive purposes.',
    ],
  },
  {
    title: 'Nature and limits of results',
    paragraphs: [
      'ProfileFinder provides informational results based on public or lawfully accessible online information available at the time of the search.',
      'Results may be incomplete, inaccurate, outdated, or relate to a different person with a similar name, location, photo or profile details. The presence or absence of results does not prove conduct, identity, intent, relationship status, infidelity or wrongdoing.',
    ],
  },
  {
    title: 'Authorized use',
    paragraphs: [
      'Users agree to use ProfileFinder only for lawful, personal and legitimate purposes, and remain solely responsible for searches they perform and how they interpret or use results.',
    ],
    bullets: [
      'Do not use the service for harassment, stalking, intimidation, blackmail, defamation or abusive surveillance.',
      'Do not publish, expose, shame or publicly disclose information about another person.',
      'Do not use results for employment, housing, credit, insurance, legal, financial or other high-impact decisions.',
      'Do not bypass privacy settings, security systems or access restrictions of third-party platforms.',
      'Do not scrape, resell, redistribute or commercially exploit the service or its results without authorization.',
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    title: 'Legal notice',
    paragraphs: [
      'Website name: ProfileFinder. Website URL: https://profilefinder.ai. Publisher: ProfileFinder. Contact email: contact@profilefinder.ai.',
      'Hosting provider: Vercel. ProfileFinder may update these legal details when company registration, publication director or hosting information changes.',
    ],
  },
  {
    title: 'Purpose of the service',
    paragraphs: [
      'ProfileFinder provides an online service designed to help users search for and analyze publicly available or lawfully accessible online information, including information that may help identify whether a person appears to have an active or visible profile on certain online platforms or digital services.',
      'Depending on the service purchased and available information, ProfileFinder may provide search results, profile indicators, public data, links, screenshots, summaries, matching signals or other informational elements.',
    ],
  },
  ...baseSections,
  {
    title: 'Paid services',
    paragraphs: [
      'Some ProfileFinder services are paid. The price, content and scope of each service are displayed before purchase. Payment is processed through a secure third-party payment provider, and ProfileFinder does not directly store full credit card details.',
      'ProfileFinder may refuse, cancel or refund an order in case of suspected fraud, abusive use, technical impossibility, unlawful request or violation of these terms.',
    ],
  },
  {
    title: 'Right of withdrawal and refunds',
    paragraphs: [
      'Where the service purchased consists of digital content or a personalized digital service that begins immediately after payment, the user acknowledges that execution may start before the end of any statutory withdrawal period.',
      'Due to the digital and personalized nature of the service, payments are generally non-refundable once a search has been initiated or results have been delivered. ProfileFinder may, at its sole discretion, offer a new search, credit, partial refund or full refund in the event of a proven technical issue preventing delivery.',
    ],
  },
  {
    title: 'Intellectual property',
    paragraphs: [
      'All elements of the ProfileFinder website and services, including text, designs, interfaces, graphics, logos, icons, software, databases, processes, trademarks, visuals and content, are protected by intellectual property laws.',
      'Unless expressly authorized, users may not copy, reproduce, modify, distribute, sell, license, publish, extract, reuse, reverse engineer or exploit any part of the website or service.',
    ],
  },
  {
    title: 'Liability',
    paragraphs: [
      'To the maximum extent permitted by law, ProfileFinder shall not be liable for indirect, incidental, special or consequential damages, emotional distress, relationship disputes, decisions made based on results, third-party platform restrictions, inaccurate public information, misuse of the service by users, or unauthorized access resulting from user negligence.',
      'Nothing in these terms excludes liability where such exclusion is prohibited by law.',
    ],
  },
  {
    title: 'Governing law and contact',
    paragraphs: [
      'These terms are governed by French law, unless mandatory consumer protection rules provide otherwise. In the event of a dispute, the parties agree to first attempt to resolve the matter amicably.',
      'For any question regarding these terms, the website, services, personal data or a legal request, contact ProfileFinder at contact@profilefinder.ai.',
    ],
  },
];

export const privacySections: LegalSection[] = [
  {
    title: 'Personal data collected',
    paragraphs: [
      'ProfileFinder may collect and process personal data in accordance with applicable data protection laws, including the General Data Protection Regulation where applicable.',
    ],
    bullets: [
      'Name, email address, account information, login and authentication data.',
      'Order, payment and billing information processed through secure payment providers.',
      'Technical data such as IP address, browser type, device information, logs and usage data.',
      'Customer support messages and information voluntarily submitted by users to perform a search.',
    ],
  },
  {
    title: 'Purposes of processing',
    paragraphs: [
      'Personal data may be used to create and manage accounts, process orders and payments, deliver purchased services, perform requested searches, send results, provide customer support, improve the website, ensure security, prevent fraud or abuse, comply with legal obligations, manage disputes and send service-related communications.',
      'Marketing communications may be sent only where permitted by law or with the user consent, and users may unsubscribe at any time.',
    ],
  },
  {
    title: 'Search-related data',
    paragraphs: [
      'To provide the service, users may submit information about a person or profile to be searched. Users confirm that they have a lawful and legitimate reason to submit this information and use the service.',
      'Search-related data and results are retained only for as long as necessary to provide the service, ensure customer support, maintain security, keep proof of transaction, prevent abuse and comply with legal obligations.',
    ],
  },
  {
    title: 'Sharing with third parties',
    paragraphs: [
      'ProfileFinder may share personal data with trusted third-party service providers only where necessary, including hosting providers, payment processors, analytics providers, customer support tools, email delivery providers, security and fraud prevention providers, technical infrastructure providers, and legal, accounting or compliance advisors where necessary.',
      'ProfileFinder may also disclose personal data if required by law, court order, legal proceedings, public authority request or to protect its rights, safety, users or services. ProfileFinder does not sell users personal data.',
    ],
  },
  {
    title: 'International transfers and retention',
    paragraphs: [
      'Some service providers may be located outside the user country or outside the European Economic Area. Where applicable, ProfileFinder takes reasonable steps to ensure transfers are carried out in accordance with applicable data protection laws.',
      'ProfileFinder retains personal data only for as long as necessary for the purposes for which it was collected. Order, transaction and billing data may be retained for periods required by accounting, tax and legal obligations.',
    ],
  },
  {
    title: 'Security',
    paragraphs: [
      'ProfileFinder implements reasonable technical and organizational measures to protect personal data against unauthorized access, loss, misuse, alteration, disclosure or destruction.',
      'No method of transmission over the Internet or electronic storage is completely secure. Users are responsible for protecting their own account credentials, devices and communications.',
    ],
  },
  {
    title: 'User rights',
    paragraphs: [
      'Subject to applicable law, users may have rights of access, rectification, erasure, restriction of processing, objection, data portability, withdrawal of consent where processing is based on consent, and the right to lodge a complaint with a competent data protection authority.',
      'To exercise these rights or make a request concerning information processed through ProfileFinder, contact contact@profilefinder.ai. ProfileFinder may request proof of identity before responding.',
    ],
  },
  {
    title: 'Cookies',
    paragraphs: [
      'ProfileFinder may use cookies and similar technologies to enable essential website functions, secure the website, remember preferences, measure traffic, analyze usage, improve services, and personalize content or marketing where permitted.',
      'Users may manage cookie preferences through the cookie banner, where available, or through browser settings. Some cookies are strictly necessary for the website to function.',
    ],
  },
];

export const legalNoticeSections: LegalSection[] = [
  {
    title: 'Publisher',
    paragraphs: [
      'The ProfileFinder website, accessible at https://profilefinder.ai, is published by ProfileFinder.',
      'Contact email address: contact@profilefinder.ai. Publication Director: ProfileFinder.',
    ],
  },
  {
    title: 'Hosting',
    paragraphs: [
      'Hosting provider: Vercel. Website: https://vercel.com.',
      'ProfileFinder may update the hosting provider details if the website infrastructure changes.',
    ],
  },
  {
    title: 'Terms governing use',
    paragraphs: [
      'These legal notices are intended to govern access to, browsing of and use of the ProfileFinder website and services.',
      'Access to the website and use of the services imply full acceptance of the Terms of Service and Privacy Policy.',
    ],
  },
  ...baseSections,
];

export function LegalDocument({ title, intro, sections }: LegalDocumentProps) {
  return (
    <main className="min-h-screen bg-[#0f1115] text-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-5 py-10 sm:px-8 lg:py-14">
        <Link href="/" className="text-sm font-bold text-white/70 transition hover:text-white">
          ProfileFinder
        </Link>

        <header className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="mb-3 text-sm font-bold uppercase text-rose-300">Last updated: April 28, 2026</p>
          <h1 className="text-3xl font-black tracking-normal sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/72">{intro}</p>
        </header>

        <nav className="flex flex-wrap gap-3 text-sm font-bold">
          <Link className="rounded-[8px] border border-white/10 px-4 py-2 text-white/80 hover:bg-white/10" href="/terms">Terms</Link>
          <Link className="rounded-[8px] border border-white/10 px-4 py-2 text-white/80 hover:bg-white/10" href="/privacy">Privacy</Link>
          <Link className="rounded-[8px] border border-white/10 px-4 py-2 text-white/80 hover:bg-white/10" href="/legal-notice">Legal notice</Link>
        </nav>

        <section className="space-y-5">
          {sections.map((section) => (
            <article key={section.title} className="rounded-[8px] border border-white/10 bg-white/[0.035] p-5 sm:p-6">
              <h2 className="text-xl font-black">{section.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-7 text-white/72 sm:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul className="list-disc space-y-2 pl-5">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
