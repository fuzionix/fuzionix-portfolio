const BASE_URL = "https://fuzionix.dev";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Taylon Chan",
  url: BASE_URL,
  jobTitle: ["UI Designer", "Full-Stack Developer"],
  worksFor: {
    "@type": "Organization",
    name: "Fuzionix",
    url: BASE_URL,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hong Kong",
    addressCountry: "HK",
  },
  sameAs: [
    "https://github.com/Fuzionix",
  ],
  knowsAbout: [
    "Design Systems",
    "Product Design",
    "Computer Graphics",
    "Front-End Development",
    "Creative Technology",
    "UI Engineering",
    "Typography",
    "Motion Design",
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Fuzionix",
  url: BASE_URL,
  founder: {
    "@type": "Person",
    name: "Taylon Chan",
  },
  foundingLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hong Kong",
      addressCountry: "HK",
    },
  },
  description: "Independent design and development studio specializing in digital craft, product design systems, and creative technology.",
  sameAs: ["https://github.com/Fuzionix"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Fuzionix",
  url: BASE_URL,
  author: {
    "@type": "Person",
    name: "Taylon Chan",
  },
  description: "Portfolio of Taylon Chan — independent designer & developer based in Hong Kong.",
  inLanguage: "en",
  copyrightHolder: {
    "@type": "Person",
    name: "Taylon Chan",
  },
  copyrightYear: new Date().getFullYear(),
};

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}