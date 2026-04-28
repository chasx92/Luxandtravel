import { LegalDocument, termsSections } from '@/components/legal/LegalDocument';

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of Service"
      intro="These Terms of Service govern access to, browsing of and use of the ProfileFinder website and services."
      sections={termsSections}
    />
  );
}
