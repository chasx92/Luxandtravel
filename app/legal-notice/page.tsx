import { LegalDocument, legalNoticeSections } from '@/components/legal/LegalDocument';

export default function LegalNoticePage() {
  return (
    <LegalDocument
      title="Legal Notice"
      intro="These legal notices identify the publisher, hosting information and key rules governing use of the ProfileFinder website."
      sections={legalNoticeSections}
    />
  );
}
