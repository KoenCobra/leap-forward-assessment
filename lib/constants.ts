export const LEVEL_CARDS = [
  {
    title: "Light",
    description:
      "Voor leerlingen van 10 tot 12 jaar op zoek om eens te proeven van een job-ervaring in verschillende sectoren. Vol spelplezier en handige tips.",
    image: "/images/profile1.png",
    borderColor: "border-teal-500",
  },
  {
    title: "Casual",
    description:
      "Voor spelers zonder technische achtergrond. Fijn spelplezier met een medium moeilijkheidsgraad en veel helpvolle tips.",
    image: "/images/profile2.png",
    borderColor: "border-secondary-yellow",
  },
  {
    title: "Expert",
    description:
      "Voor de meest ervaren spelers met technische knowhow. Uitgedaagd om hun kennis te testen met steeds moeilijkere puzzels en een minimum aan hulp.",
    image: "/images/profile3.png",
    borderColor: "border-red-400",
  },
];

export const USER_IMAGES = {
  manager: "manager.png",
};

export const BACKGROUND_IMAGES = {
  printingHouse: "printing-house",
};

export const DESCRIPTION_CARD = {
  printingHouse: {
    title: "Drukkerij",
    description:
      "Je moet je goed bewust zijn van wat jij allemaal moet doen. Als drukafwerker heb je een heel uiteenlopend takenpakket. Sommige van onderstaande taken behoren echter niet tot het takenpakket, stop er snel mee voor je baas het ziet!",
    backgroundImage: BACKGROUND_IMAGES.printingHouse,
    userImage: USER_IMAGES.manager,
  },
};

export const API_URL = "https://lab.lfwd.be/dev-test/quiz_data.json";

export const CACHE_TIME = 1000 * 60 * 10;
