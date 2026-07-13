export const imprint = {
  title: 'Legal Notice',
  subtitle: 'Information pursuant to Section 5 DDG and Section 18 MStV',
  sections: [
    {
      heading: 'Service provider',
      lines: [
        'Orhan Erkol',
        'trading under the business name Sunbeam Media',
        'Karl-Knödl-Straße 4',
        '40627 Düsseldorf',
        'Germany',
      ],
    },
    {
      heading: 'Contact',
      lines: ['Email: orhan.erkol@masalnova.com'],
    },
    {
      heading: 'Person responsible for journalistic-editorial content',
      paragraphs: ['Responsible pursuant to Section 18(2) MStV:'],
      lines: ['Orhan Erkol', 'Karl-Knödl-Straße 4', '40627 Düsseldorf', 'Germany'],
    },
    {
      heading: 'Supervisory authority for audiovisual media services',
      paragraphs: ['Supervisory authority pursuant to Section 5(1) no. 8 DDG:'],
      lines: [
        'Landesanstalt für Medien Nordrhein-Westfalen',
        'Zollhof 2, 40221 Düsseldorf, Germany',
        'www.medienanstalt-nrw.de',
      ],
    },
    {
      heading: 'Consumer dispute resolution',
      paragraphs: [
        'We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.',
      ],
    },
  ],
  note: 'MasalNova Çocuk is a service offered by Orhan Erkol under the business name Sunbeam Media.',
};

export const privacy = {
  title: 'Privacy Policy',
  subtitle: 'Last updated: 13 July 2026',
  sections: [
    {
      heading: '1. Controller',
      lines: [
        'Orhan Erkol (Sunbeam Media)',
        'Karl-Knödl-Straße 4, 40627 Düsseldorf, Germany',
        'Email: orhan.erkol@masalnova.com',
      ],
    },
    {
      heading: '2. Hosting and server logs',
      paragraphs: [
        'This website is hosted on GitHub Pages, a service provided by GitHub, Inc., USA. When the website is accessed, technical logs may process data including the IP address, date and time, requested page, amount of data transferred, referrer, browser and operating system information.',
        'The purpose is to provide the website securely, reliably and efficiently. The legal basis is Article 6(1)(f) GDPR. Our legitimate interest is the secure and uninterrupted operation of the website. We have no direct access to the infrastructure logs. GitHub determines their retention period in accordance with its security and retention policies.',
        'GitHub may process data in the United States. GitHub relies on the EU-US Data Privacy Framework and, where applicable, EU Standard Contractual Clauses. Further information: docs.github.com/site-policy/privacy-policies/github-general-privacy-statement',
      ],
    },
    {
      heading: '3. No analytics, advertising or user profiles',
      paragraphs: [
        'MasalNova does not use web analytics, tracking or personalised advertising. We do not set cookies ourselves and do not store information in your browser during a normal page visit. Fonts, images and YouTube preview images are served locally from our website.',
      ],
    },
    {
      heading: '4. YouTube videos and external links',
      paragraphs: [
        'Video preview images are stored locally. A connection to YouTube is established only when you expressly click “Load YouTube” or follow an external YouTube link.',
        'When a video is loaded, Google Ireland Limited and affiliated companies may process data including your IP address, date and time, page visited, referrer, device and browser data, interactions, and cookie or storage information. The youtube-nocookie.com embedding mode does not prevent all data transfers.',
        'By clicking, you consent to this processing for the selected video and to possible access to your device (Article 6(1)(a) GDPR and Section 25(1) TDDDG). If you are under 16, consent from a parent or legal guardian is required. No YouTube player is loaded without your click.',
        'Consent applies only to the player loaded on that page. You can stop further use by leaving or reloading the page. Data already transferred to YouTube cannot be recalled in this way.',
        'Google may process data in the United States. Google LLC is certified under the EU-US Data Privacy Framework; EU Standard Contractual Clauses may also apply. Further information: policies.google.com/privacy and policies.google.com/privacy/frameworks',
      ],
    },
    {
      heading: '5. Contact by email',
      paragraphs: [
        'If you email us, we process your email address, message content, time and technical transmission data to handle your request. The legal basis is Article 6(1)(b) GDPR for contract-related or cooperation enquiries and otherwise Article 6(1)(f) GDPR. Our legitimate interest is responding to enquiries.',
        'We delete the data once the enquiry has been resolved and no statutory retention or evidence obligations remain.',
      ],
    },
    {
      heading: '6. Recipients and disclosure',
      paragraphs: [
        'Data is received only by the technical service providers named above and, where legally required, by public authorities or other authorised bodies. We do not sell personal data.',
      ],
    },
    {
      heading: '7. Your rights',
      paragraphs: ['Subject to the requirements of the GDPR, you have in particular the following rights:'],
      bullets: [
        'Access, rectification and erasure (Articles 15 to 17 GDPR)',
        'Restriction of processing and data portability (Articles 18 and 20 GDPR)',
        'Objection to processing based on Article 6(1)(f) GDPR (Article 21 GDPR)',
        'Withdrawal of consent with effect for the future (Article 7(3) GDPR)',
        'Lodging a complaint with a data protection supervisory authority (Article 77 GDPR)',
      ],
      lines: [
        'Competent authority: Landesbeauftragte für Datenschutz und Informationsfreiheit NRW',
        'Kavalleriestraße 2–4, 40213 Düsseldorf, Germany · www.ldi.nrw.de',
      ],
    },
    {
      heading: '8. Automated decision-making',
      paragraphs: ['No automated decision-making or profiling takes place.'],
    },
    {
      heading: '9. Short explanation for children',
      paragraphs: [
        'MasalNova does not remember which stories you read and does not create a profile about you. YouTube opens only when you click the relevant button. If you are under 16, please ask your parent or legal guardian first.',
      ],
    },
  ],
};

export function legalPlainText(document) {
  const parts = [document.title, document.subtitle];
  for (const section of document.sections) {
    parts.push(section.heading, ...(section.paragraphs ?? []), ...(section.lines ?? []), ...(section.bullets ?? []));
  }
  if (document.note) parts.push(document.note);
  return parts.join('\n');
}
