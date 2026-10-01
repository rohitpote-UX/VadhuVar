export interface MaharashtraDistrict {
  id: string;
  nameEn: string;
  nameMr: string;
  division: "Western Maharashtra" | "Konkan" | "Khandesh (North)" | "Marathwada" | "Vidarbha";
  majorCities: { en: string; mr: string }[];
}

export const MAHARASHTRA_DISTRICTS: MaharashtraDistrict[] = [
  {
    id: "pune",
    nameEn: "Pune",
    nameMr: "पुणे",
    division: "Western Maharashtra",
    majorCities: [
      { en: "Pune", mr: "पुणे" },
      { en: "Pimpri-Chinchwad", mr: "पिंपरी-चिंचवड" },
      { en: "Baramati", mr: "बारामती" },
      { en: "Shirur", mr: "शिरूर" },
    ],
  },
  {
    id: "mumbai",
    nameEn: "Mumbai",
    nameMr: "मुंबई",
    division: "Konkan",
    majorCities: [
      { en: "Mumbai", mr: "मुंबई" },
      { en: "Mumbai Suburban", mr: "मुंबई उपनगर" },
    ],
  },
  {
    id: "thane",
    nameEn: "Thane",
    nameMr: "ठाणे",
    division: "Konkan",
    majorCities: [
      { en: "Thane", mr: "ठाणे" },
      { en: "Kalyan-Dombivli", mr: "कल्याण-डोंबिवली" },
      { en: "Navi Mumbai", mr: "नवी मुंबई" },
    ],
  },
  {
    id: "nashik",
    nameEn: "Nashik",
    nameMr: "नाशिक",
    division: "Khandesh (North)",
    majorCities: [
      { en: "Nashik", mr: "नाशिक" },
      { en: "Malegaon", mr: "मालेगाव" },
      { en: "Sinnar", mr: "सिन्नर" },
    ],
  },
  {
    id: "nagpur",
    nameEn: "Nagpur",
    nameMr: "नागपूर",
    division: "Vidarbha",
    majorCities: [
      { en: "Nagpur", mr: "नागपूर" },
      { en: "Kamthi", mr: "कामठी" },
      { en: "Umred", mr: "उमरेड" },
    ],
  },
  {
    id: "kolhapur",
    nameEn: "Kolhapur",
    nameMr: "कोल्हापूर",
    division: "Western Maharashtra",
    majorCities: [
      { en: "Kolhapur", mr: "कोल्हापूर" },
      { en: "Ichalkaranji", mr: "इचलकरंजी" },
      { en: "Jaysingpur", mr: "जयसिंगपूर" },
    ],
  },
  {
    id: "satara",
    nameEn: "Satara",
    nameMr: "सातारा",
    division: "Western Maharashtra",
    majorCities: [
      { en: "Satara", mr: "सातारा" },
      { en: "Karad", mr: "कराड" },
      { en: "Phaltan", mr: "फलटण" },
      { en: "Wai", mr: "वाई" },
    ],
  },
  {
    id: "sangli",
    nameEn: "Sangli",
    nameMr: "सांगली",
    division: "Western Maharashtra",
    majorCities: [
      { en: "Sangli", mr: "सांगली" },
      { en: "Miraj", mr: "मिरज" },
      { en: "Islampur", mr: "इस्लामपूर" },
    ],
  },
  {
    id: "solapur",
    nameEn: "Solapur",
    nameMr: "सोलापूर",
    division: "Western Maharashtra",
    majorCities: [
      { en: "Solapur", mr: "सोलापूर" },
      { en: "Pandharpur", mr: "पंढरपूर" },
      { en: "Barshi", mr: "बार्शी" },
    ],
  },
  {
    id: "chhatrapati-sambhajinagar",
    nameEn: "Chhatrapati Sambhajinagar (Aurangabad)",
    nameMr: "छत्रपती संभाजीनगर (औरंगाबाद)",
    division: "Marathwada",
    majorCities: [
      { en: "Chhatrapati Sambhajinagar", mr: "छत्रपती संभाजीनगर" },
      { en: "Paithan", mr: "पैठण" },
      { en: "Vaijapur", mr: "वैजापूर" },
    ],
  },
  {
    id: "ahilyanagar",
    nameEn: "Ahilyanagar (Ahmednagar)",
    nameMr: "अहिल्यानगर (अहमदनगर)",
    division: "Western Maharashtra",
    majorCities: [
      { en: "Ahilyanagar", mr: "अहिल्यानगर" },
      { en: "Sangamner", mr: "संगमनेर" },
      { en: "Shirdi", mr: "शिर्डी" },
      { en: "Kopargaon", mr: "कोपरगाव" },
    ],
  },
  {
    id: "raigad",
    nameEn: "Raigad",
    nameMr: "रायगड",
    division: "Konkan",
    majorCities: [
      { en: "Alibag", mr: "अलिबाग" },
      { en: "Panvel", mr: "पनवेल" },
      { en: "Mahad", mr: "महाड" },
    ],
  },
  {
    id: "ratnagiri",
    nameEn: "Ratnagiri",
    nameMr: "रत्नागिरी",
    division: "Konkan",
    majorCities: [
      { en: "Ratnagiri", mr: "रत्नागिरी" },
      { en: "Chiplun", mr: "चिपळूण" },
      { en: "Dapoli", mr: "दापोली" },
    ],
  },
  {
    id: "sindhudurg",
    nameEn: "Sindhudurg",
    nameMr: "सिंधुदुर्ग",
    division: "Konkan",
    majorCities: [
      { en: "Sawantwadi", mr: "सावंतवाडी" },
      { en: "Malvan", mr: "मालवण" },
      { en: "Kudal", mr: "कुडाळ" },
    ],
  },
  {
    id: "jalgaon",
    nameEn: "Jalgaon",
    nameMr: "जळगाव",
    division: "Khandesh (North)",
    majorCities: [
      { en: "Jalgaon", mr: "जळगाव" },
      { en: "Bhusawal", mr: "भुसावळ" },
    ],
  },
  {
    id: "dhule",
    nameEn: "Dhule",
    nameMr: "धुळे",
    division: "Khandesh (North)",
    majorCities: [{ en: "Dhule", mr: "धुळे" }, { en: "Shirpur", mr: "शिरपूर" }],
  },
  {
    id: "nanded",
    nameEn: "Nanded",
    nameMr: "नांदेड",
    division: "Marathwada",
    majorCities: [{ en: "Nanded", mr: "नांदेड" }],
  },
  {
    id: "latur",
    nameEn: "Latur",
    nameMr: "लातूर",
    division: "Marathwada",
    majorCities: [{ en: "Latur", mr: "लातूर" }, { en: "Udgir", mr: "उदगीर" }],
  },
  {
    id: "amravati",
    nameEn: "Amravati",
    nameMr: "अमरावती",
    division: "Vidarbha",
    majorCities: [{ en: "Amravati", mr: "अमरावती" }],
  },
  {
    id: "akola",
    nameEn: "Akola",
    nameMr: "अकोला",
    division: "Vidarbha",
    majorCities: [{ en: "Akola", mr: "अकोला" }],
  },
];

export const MAHARASHTRA_CITIES_LIST = [
  "Pune, Maharashtra",
  "Mumbai, Maharashtra",
  "Thane, Maharashtra",
  "Navi Mumbai, Maharashtra",
  "Nashik, Maharashtra",
  "Nagpur, Maharashtra",
  "Kolhapur, Maharashtra",
  "Satara, Maharashtra",
  "Sangli, Maharashtra",
  "Solapur, Maharashtra",
  "Chhatrapati Sambhajinagar, Maharashtra",
  "Ahilyanagar, Maharashtra",
  "Panvel / Raigad, Maharashtra",
  "Ratnagiri, Maharashtra",
  "Sindhudurg, Maharashtra",
  "Jalgaon, Maharashtra",
  "Dhule, Maharashtra",
  "Nanded, Maharashtra",
  "Latur, Maharashtra",
  "Amravati, Maharashtra",
  "Akola, Maharashtra",
  "Bangalore, Karnataka",
  "Hyderabad, Telangana",
  "Delhi NCR",
];
