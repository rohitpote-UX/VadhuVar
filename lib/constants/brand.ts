export const BRAND_NAME = "Vivaha Studio";
export const BRAND_NAME_MR = "विवाह स्टुडिओ";

export const BRAND = {
  name: BRAND_NAME,
  nameMr: BRAND_NAME_MR,
  taglineEn: "Matchmaking, handled personally.",
  taglineMr: "आयुष्यभराच्या सहजीवनाची एक सुंदर सुरुवात.",
  eyebrowEn: "PERSONAL MATCHMAKING",
  eyebrowMr: "विश्वासाने जुळणारे नाते",
  shortDescriptionEn:
    "A private matchmaking salon for Maharashtra. Profiles are stored with absolute confidentiality and reviewed personally by our matchmaker.",
  shortDescriptionMr:
    "महाराष्ट्रातील कुटुंबांसाठी एक विश्वासार्ह, खाजगी वधू-वर सूचक सेवा. प्रत्येक प्रोफाइल पूर्ण गोपनीयतेसह जपले जाते.",
  contact: {
    city: "Pune",
    cityMr: "पुणे",
    state: "Maharashtra",
    stateMr: "महाराष्ट्र",
    country: "India",
    countryMr: "भारत",
    address: "Koregaon Park, Pune 411001",
    addressMr: "कोरेगाव पार्क, पुणे ४११००१",
    email: "concierge@vivahastudio.com",
    phone: "+91 98220 12345",
    displayPhone: "+91 98220 12345",
  },
  hoursEn: "Monday to Saturday, 10:00 AM – 6:30 PM IST",
  hoursMr: "सोमवार ते शनिवार, सकाळी १०:०० ते सायंकाळी ६:३०",
  supportedLanguages: ["mr", "en"] as const,
  defaultLanguage: "mr" as const,
} as const;

export type SupportedLanguage = (typeof BRAND.supportedLanguages)[number];
