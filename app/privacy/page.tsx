import { LegalDocument, privacySections } from '@/components/legal/LegalDocument';

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      intro="This Privacy Policy explains how ProfileFinder may collect, use, retain and protect personal data in connection with the website and services."
      sections={privacySections}
    />
  );
}
