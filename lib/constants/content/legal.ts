// Legal pages — text carried over from qmoxi.com/privacy-policy and /accessibility-statement.
// The live pages contained unfilled "[Insert …]" placeholders; contact fields are filled with the
// published contact details, and the unfilled accessibility "effective date" sentence was omitted.
import { CONTACT } from "@/lib/constants/site";

export type LegalBlock = { h?: string; p?: string[]; list?: string[] };

const contactLines = [
  `Email: ${CONTACT.email}`,
  `Phone: ${CONTACT.phoneDisplay}`,
  `Address: ${CONTACT.street}, ${CONTACT.city}, ${CONTACT.region} ${CONTACT.postalCode}`,
];

export const PRIVACY: { title: string; updated: string; blocks: LegalBlock[] } = {
  title: "Qmoxi Privacy Policy",
  updated: "Effective December 14, 2023",
  blocks: [
    {
      h: "Privacy Policy",
      p: [
        "Qmoxi (“us”, “we”, or “our”) operates https://qmoxi.com/. This page informs you of our policies regarding the collection, use, and disclosure of Personal Information we receive from users of the Site.",
        "We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy.",
      ],
    },
    {
      h: "Introduction",
      p: [
        "We respect your privacy. We collect information submitted by your browser, including browser type/version, operating system, referrer URL, and timestamps of server requests. Your hostname and IP address will be anonymized where applicable.",
        "The website you have entered is operated by Qmoxi. We respect the privacy rights of all site users and recognize the importance of protecting collected information. This Privacy Policy describes how we treat information obtained while using our site or related services.",
        "By using the Site, you agree to this Privacy Policy. If you have questions or comments regarding this policy or any aspect of the Site, please contact us.",
        "While using our Site, you may be asked to provide personally identifiable information (such as name, phone number, or email address). You are not required to provide this information to browse the Site; it is only required if you choose to submit a request for contact.",
      ],
    },
    {
      h: "Collection and Use of Information",
      p: [
        "We collect only the information necessary to operate effectively.",
        "Information is collected only when you voluntarily provide it (e.g., completing forms, registrations, or subscriptions). This information may be used to:",
      ],
      list: ["Administer and operate the Site", "Provide a customized and efficient user experience", "Communicate with you as requested"],
    },
    { p: ["All submitted information is governed by this Privacy Policy."] },
    {
      h: "Log Data",
      p: ["Like many website operators, we collect information your browser sends when you visit our Site (“Log Data”). This may include:"],
      list: ["IP address", "Browser type and version", "Pages visited", "Time and date of visit", "Time spent on pages", "Other usage statistics"],
    },
    {
      p: [
        "We may use third-party services such as Google Analytics to collect, monitor, and analyze this data to better understand user behavior and improve our services.",
      ],
    },
    {
      h: "Use of Information",
      p: ["We may use your information for the following purposes:"],
      list: [
        "Sending newsletters or marketing communications",
        "Notifying you of updates or changes to services",
        "Troubleshooting and improving website functionality",
        "Enabling participation in interactive features",
      ],
    },
    {
      p: [
        "We do not sell or provide personally identifiable information submitted by you (such as email addresses or phone numbers) to third parties for their marketing purposes.",
        "We may share aggregated, anonymized data with partners or advertisers to improve services and audience targeting.",
      ],
    },
    {
      h: "Communication",
      p: [
        "If you provide your contact information, you may receive communications from Qmoxi. You may opt out of these communications at any time by contacting us.",
      ],
    },
    {
      h: "Advertising",
      p: ["Our Site may use advertising features such as:"],
      list: ["Google Analytics Advertising (Remarketing, Display Advertising, etc.)", "Facebook/Instagram advertising tools"],
    },
    {
      p: ["These features may use first-party and third-party cookies.", "To opt out:"],
      list: ["Google Ads: https://support.google.com/ads/answer/2662922", "Facebook Ads: https://www.facebook.com/settings/?tab=ads"],
    },
    {
      h: "Protection of Information",
      p: ["We take reasonable measures to protect your Personal Information. However:"],
      list: ["No method of transmission over the Internet is 100% secure", "No storage system is completely secure"],
    },
    { p: ["While we use commercially acceptable safeguards, we cannot guarantee absolute security."] },
    {
      h: "Third-Party Websites",
      p: [
        "This Privacy Policy applies only to Qmoxi.com.",
        "We are not responsible for the privacy practices of third-party websites (including platforms such as Facebook, Instagram, LinkedIn, YouTube, etc.) that may be accessed through our Site. Users should review the privacy policies of those third parties independently.",
      ],
    },
    {
      h: "Cookies",
      p: ["Cookies are small data files stored on your device.", "We use cookies to:"],
      list: ["Improve user experience", "Store preferences", "Deliver relevant content and advertising", "Authenticate sessions"],
    },
    {
      p: [
        "You may configure your browser to refuse cookies; however, some parts of the Site may not function properly as a result.",
        "Third-party advertisers may also use cookies, which are not controlled by Qmoxi.",
      ],
    },
    {
      h: "User Sniping / Tracking Technologies",
      p: ["We may use third-party services (such as pixel tracking technologies) to collect information when you interact with our Site. This may include:"],
      list: ["Browser information", "IP address", "Pages visited", "Cookie data"],
    },
    {
      p: ["This data may be used for marketing purposes.", "For more information, please review: https://leadpost.com/privacy-policy"],
    },
    {
      h: "Foreign Jurisdiction",
      p: ["Qmoxi is not responsible for compliance with privacy laws or data protection regulations outside applicable jurisdictions."],
    },
    {
      h: "Compliance with Laws",
      p: ["Qmoxi may disclose information where necessary to:"],
      list: ["Comply with legal obligations", "Respond to lawful requests", "Prevent fraud, illegal activity, or harm"],
    },
    { p: ["Such disclosures may be made at our sole discretion in accordance with applicable laws."] },
    {
      h: "Children and Parents",
      p: [
        "Our Site is not intended for children under the age of 13. We do not knowingly collect personal information from children.",
        "If you believe a child has provided personal information, please contact us so we can promptly remove it.",
      ],
    },
    {
      h: "Online Account and Registration",
      p: [
        "Registration: To create an account, you may be required to provide a valid email address for verification and security purposes.",
        "Account Information: Qmoxi administrators may access the following:",
      ],
      list: [
        "Username (login credentials)",
        "Encrypted password/PIN",
        "Profile information (name, phone, address, email)",
        "Content submitted on the Site",
        "Communication between users and administrators",
      ],
    },
    {
      p: ["This information will not be sold or shared with third parties and will not be publicly displayed without your consent."],
    },
    {
      h: "Changes to This Privacy Policy",
      p: [
        "Qmoxi may update this Privacy Policy periodically. Changes become effective upon posting.",
        "Your continued use of the Site after updates constitutes acceptance of the revised policy.",
      ],
    },
    { h: "Effective Date", p: ["This Privacy Policy is effective as of December 14, 2023."] },
    {
      h: "Contact Us",
      p: ["If you have questions about this Privacy Policy, please contact us:"],
      list: contactLines,
    },
  ],
};

export const ACCESSIBILITY: { title: string; blocks: LegalBlock[] } = {
  title: "Accessibility Statement",
  blocks: [
    {
      p: [
        "Qmoxi is committed to providing a website that is accessible to the widest possible audience, regardless of technology or ability. We strive to ensure that Qmoxi.com complies with applicable accessibility standards and best practices, and we are actively working to increase the accessibility and usability of our digital properties.",
      ],
    },
    {
      h: "Accessibility Standards",
      p: [
        "Qmoxi endeavors to conform, where feasible, with the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA, published by the World Wide Web Consortium (W3C). These guidelines explain how to make web content more accessible for individuals with a wide range of disabilities, including visual, auditory, cognitive, and motor impairments.",
      ],
    },
    {
      h: "Ongoing Efforts",
      p: [
        "Accessibility is an ongoing process. Qmoxi is continuously reviewing and enhancing its website to improve accessibility and usability. This includes periodic evaluations, updates to content and functionality, and the incorporation of accessibility considerations into design and development practices.",
      ],
    },
    {
      h: "Limitations and Disclaimers",
      p: [
        "While Qmoxi makes reasonable efforts to ensure accessibility, some content may not yet be fully adapted to the strictest accessibility standards. We do not warrant or guarantee that all content will be fully accessible at all times, particularly where third-party integrations or external content are involved.",
      ],
    },
    {
      h: "Third-Party Content",
      p: [
        "Qmoxi.com may contain links to third-party websites or integrate third-party tools. Qmoxi does not control and is not responsible for the accessibility of such external content but encourages vendors and partners to provide accessible digital experiences.",
      ],
    },
    {
      h: "Feedback and Assistance",
      p: [
        "Qmoxi welcomes feedback regarding the accessibility of its website. If you encounter any accessibility barriers or require assistance accessing content, please contact us:",
      ],
      list: contactLines,
    },
    {
      p: [
        "When contacting us, please include details of the issue encountered, the specific page or feature involved, and your preferred method of communication. Qmoxi will make reasonable efforts to respond and provide assistance in a timely manner.",
      ],
    },
    {
      h: "Updates",
      p: ["This Accessibility Statement may be updated periodically to reflect improvements or changes in accessibility practices."],
    },
  ],
};
