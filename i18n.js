import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from 'react-native-localize';
const deviceLanguage = RNLocalize.getLocales()[0].languageCode;
// the translations
const resources = {
  sk: {
        translation:{
        "On this day celebrate": "V tento deň oslavuje svoje meniny",
        "Enter a name": "Zadajte meno",
        "No results found": "Nenašli sa žiadne výsledky",
        "Nameday": "Meniny",
        "Calendar": "Kalendár",
        "Birthday": "Narodeniny",
        "Inspiration": "Inšpirácia",
        "On this day celebrate ":"V tento den ma meniny ",
        "Sun.": "Ned.",
        "Mon.": "Pon.",
        "Tue.": "Uto.",
        "Wed.": "Str.",
        "Thu.": "Stv.",
        "Fri.": "Pia.",
        "Sat.": "Sob.",
        "Sunday" : "Nedela",
        "Delete": "Zmazat",
        "After pressing OK, the entry will be deleted" :"Po stlaceni OK sa záznam vymaže",
        "Cancel": "Zrušiť",
        "Add name": "Pridat meno",
        "Save": "Ulož",
        "Cancel": "Zrušiť",
        "I guess it's pretty clear to you that I wish you all the best, good health, happy birthday, sweet kisses on the cheeks.":"Hádam je ti celkom jasné, že ti želám všetko krásne, veľa zdravia, šťastíčka, sladké bozky na líčka.",
        "Always have the happiness of the whole mountain, health like the waters in the sea, may as much love belong to you as the shields of the Tatras.":"Maj vždy šťastia celé hory, zdravia ako vody v mori, nech ti toľko lásky patrí, koľko majú štítov Tatry.",
        "I wish you on your birthday, as usual, to fulfill what Your heart hides.": "K narodeninám Ti prajem, ako to zvykom býva, aby sa Ti splnilo, čo Tvoje srdce skrýva.",
        "Wish you joy? That would not be enough. Wish you beauty? You don't have much of her. Wish you luck? What for? You will find him yourself. So I wish you all that you miss, let life give you what it contains! Happy Birthday.": "Zaželať ti radosť? To by bolo málo. Zaželať ti krásu? Veď jej nemáš málo. Zaželať ti šťastie? Načo? Veď ho nájdeš aj sám. Tak ti želám čo všetkým chýba, nech ti život dá to, čo v sebe skrýva! Krásne narodeniny.",
        "All the best for your holiday, accept my wish, may happiness, health, love always stay close to you!":"Všetko dobré k Tvojmu sviatku, prijmi moje želanie, nech Ti šťastie, zdravie, láska nablízku vždy zostane!",
        "Let the sun still shine in the windows of your home, even if the cloud covers it, it will shine again. May your life fulfill you, all your hopes, may happiness smile on you every day, may you never know pain or delusion, we wish you all this birthday today.":"Nech ti stále slnko svieti v oknách tvojho domova, aj keď mráčik zastrie ho, zažiari ti odznova. Nech ti život splní, všetky tvoje nádeje, nech sa šťastie na teba denne usmeje, nech nikdy nespoznáš bolesť ani klam, to všetko ti prajeme k dnešným narodeninám.",
        "I wish you health for your birthday, because it is rare, happiness, because it is beautiful and love, because it is not enough.":"K narodeninám Ti prajem zdravie, lebo je vzácne, šťastie, lebo je krásne a lásku, lebo je jej málo.",
        "Today is your big day, so celebrate it great. Rejoice, have fun, dance, go crazy! It's great to know a person like you, I wish you all the best! ...":"Dnes je Tvoj veľký deň, a tak ho skvelo osláv. Raduj sa, bav sa, tancuj, blázni sa! Je skvelé poznať človeka ako Ty, prajem Ti všetko najlepšie! ...",
        "All the best for your beautiful holiday, lots of sincere love, good health and may the days come that will fulfill all your secret dreams. From the bottom of my heart ...":"Všetko najlepšie k Tvojmu krásnemu sviatku, veľa úprimnej lásky, pevné zdravie a nech prídu dni, ktoré splnia všetky Tvoje tajné sny. Zo srdca želá...",
        "May the sun of happiness shine on you, may the love of your heart warm you, may you never be sad and may the heavens grant you good health.":"Nech Vám slnko šťastia svieti, nech Vám láska srdce hreje, nech Vám nikdy smutno nie je a nech Vám nebesá doprajú pevné zdravie.",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    lng: RNLocalize.getLocales()[0].languageCode,
    compatibilityJSON: 'v3'
  });

  export default i18n;