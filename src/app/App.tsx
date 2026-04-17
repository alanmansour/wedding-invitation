import { useState, useEffect, useRef } from 'react';
import { EnvelopeOpening } from './components/EnvelopeOpening';
import { InvitationCard } from './components/InvitationCard';
import { ScrollHeart } from './components/ScrollHeart';
import { Countdown } from './components/Countdown';
import mobilePayIcon from '../imports/mobilepay.png';

function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
}

function useParallax() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return offset;
}

type SupportedLanguage = 'en' | 'da' | 'ar' | 'fr';
type TextDirection = 'ltr' | 'rtl';

interface LanguageStrings {
  fonts: {
    title: string;
    secondary: string;
    countdown: string;
    address: string;
  };
  envelope: {
    fallbackGuest: string;
    invitedText: string;
    fonts: {
      title: string;
      secondary: string;
    };
  };
  invitationCard: {
    dearLabel: string;
    dearGuest: string;
    coupleNames: string;
    requestHonor: string;
    celebrationLine: string;
    dateText: string;
    timeText: string;
    addressLine: string;
    venueName: string;
    city: string;
    flipButton: string;
    backButton: string;
    storyTitle: string;
    story: string;
    fonts: {
      title: string;
      secondary: string;
      address: string;
      story: string;
    };
  };
  countdown: {
    title: string;
    subtitle: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    fonts: {
      title: string;
      secondary: string;
      countdown: string;
    };
  };
  sections: {
    location: {
      title: string;
      venueName: string;
      addressLine: string;
      addressCity: string;
      mapButton: string;
      foodTitle: string;
      foodDescription: string;
      parkingTitle: string;
      parkingDescription: string;
      transportTitle: string;
      transportDescription: string;
      fonts: {
        title: string;
        secondary: string;
        tertiary: string;
        address: string;
      };
    };
    celebration: {
      title: string;
      weddingPartyFrom: string;
      weddingTime: string;
      programSoon: string;
    };
    dressCode: {
      title: string;
      subtitle: string;
      formal: string;
      gentlemen: string;
      suitColors: string;
      ladies: string;
      dressColors: string;
      weddingTheme: string;
    };
    gifts: {
      title: string;
      intro: string;
      details: string;
      boxTitle: string;
      boxButton: string;
      instructions: string;
    };
    finalMessage: {
      title: string;
      lead: string;
      message: string;
      closing: string;
      signature: string;
      fonts: {
        title: string;
        secondary: string;
        name: string;
      };
    };
  };
}

const supportedLanguages: SupportedLanguage[] = ['en', 'da', 'ar', 'fr'];

const translations: Record<SupportedLanguage, LanguageStrings> = {
  en: {
    fonts: {
      title: "font-['Pinyon_Script']",
      secondary: "font-['Allura']",
      countdown: "font-['Alex_Brush']",
      address: "font-['Noto_Sans']",
    },
    envelope: {
      fallbackGuest: 'Dear Guest',
      invitedText: "You're Invited",
      fonts: {
        title: "font-['Pinyon_Script']",
        secondary: "font-['Allura']",
      },
    },
    invitationCard: {
      dearLabel: 'Dear',
      dearGuest: 'Dear Guest',
      coupleNames: 'Alan & Milav',
      requestHonor: 'We request the honor of your presence',
      celebrationLine: 'at our wedding celebration',
      dateText: 'Friday, 17th July, 2026',
      timeText: '17:00',
      addressLine: 'Frederikssundsvej 264',
      venueName: 'Diamond Palace',
      city: 'Copenhagen',
      flipButton: 'Flip ✨',
      backButton: 'Back to Invitation',
      storyTitle: 'Our Story',
      story: 'Our story began in 2015 — eleven years ago — a span of time one could easily call a long, winding history. It all started in a quiet little town that embraced our very first steps together. We were classmates studying a new language, strangers to the place, newcomers to the culture, trying to make sense of the world around us. We didn\'t know then that those simple moments — a glance, a word, a shared laugh — were quietly building something far greater than we imagined.\n\nAs the days passed, the feeling of being foreign was no longer just an emotion within us, but a small test of our strength together. We faced successes at times, and losses at others. We lived through moments filled with joy and warmth, and others that were difficult and tinged with heaviness. Yet every time, we found our way back, because one of us was always holding the other\'s hand. Little by little, our friendship deepened into something more — a bond shaped by experience, strengthened by patience, until it became a companionship that cannot be broken.\n\nWe moved from one stage of life to the next, from one city to another, growing, maturing, and dreaming with hearts full of ambition. Until we reached university, where the outlines of our future began to take shape — between lectures, projects, and long nights of work. The road was not easy, but we walked it steadily, supporting each other when the weight grew heavy, and celebrating together whenever a new milestone was reached. Eventually, we became engineers — not only in our careers, but in our shared life as well — building it stone by stone, and guarding it together.\n\nAnd today, we stand at the threshold of a new chapter — one that begins with a young man and a young woman who chose to continue the journey hand in hand, and to share their story with those they love…\n\nA chapter we believe still holds its most beautiful pages unwritten 🤵🏻👰🏻‍♀️',
      fonts: {
        title: "font-['Pinyon_Script']",
        secondary: "font-['Allura']",
        address: "font-['Noto_Sans']",
        story: "font-['Allura']",
      },
    },
    countdown: {
      title: 'The Big Day',
      subtitle: 'Countdown to our celebration',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
      fonts: {
        title: "font-['Pinyon_Script']",
        secondary: "font-['Allura']",
        countdown: "font-['Alex_Brush']",
      },
    },
    sections: {
      location: {
        title: 'The Venue',
        venueName: 'Diamond Palace',
        addressLine: 'Frederikssundsvej 264',
        addressCity: 'Copenhagen, Denmark',
        mapButton: 'Open in Maps',
        foodTitle: 'Food & Drinks',
        foodDescription: 'There will be lots of delicious food and drinks prepared for the celebration.',
        parkingTitle: 'Parking',
        parkingDescription: 'Parking opportunities are available on site and nearby for guests arriving by car.',
        transportTitle: 'Public Transport',
        transportDescription: 'Take bus 5C to Kobbelvænget for easy access to the venue.',
        fonts: {
          title: "font-['Pinyon_Script']",
          secondary: "font-['Pinyon_Script']",
          tertiary: "font-['Allura']",
          address: "font-['Noto_Sans']",
        },
      },
      celebration: {
        title: 'The Celebration',
        weddingPartyFrom: 'The wedding party starts from',
        weddingTime: '17:00',
        programSoon: 'The program will come soon',
      },
      dressCode: {
        title: 'Dress Code',
        subtitle: 'Formal Attire',
        formal: 'Formal Attire',
        gentlemen: 'For the Gentlemen',
        suitColors: 'Suit Colors:',
        ladies: 'For the Ladies',
        dressColors: 'Dress Colors:',
        weddingTheme: 'Wedding Theme: Navy Blue & Pink',
      },
      gifts: {
        title: 'Gifts',
        intro: 'Your presence at our wedding is the greatest gift of all.',
        details: 'However, if you wish to honor us with a gift, we have a MobilePay box for our honeymoon.',
        boxTitle: 'MobilePay Honeymoon Box',
        boxButton: 'Open MobilePay box',
        instructions: 'Otherwise, during the celebration we will have a box where gifts can be placed. If it is money, please put it in an envelope and insert it in the box. If it is a physical gift, please place it beside the box.',
      },
      finalMessage: {
        title: 'Thank You',
        lead: 'We are so grateful to have you in our lives and cannot wait to celebrate this special day with you.',
        message: 'Your love, support, and friendship mean the world to us. Thank you for being part of our journey as we begin this new chapter together.',
        closing: 'With all our love,',
        signature: 'Alan & Milav',
        fonts: {
          title: "font-['Pinyon_Script']",
          secondary: "font-['Allura']",
          name: "font-['Pinyon_Script']",
        },
      },
    },
  },
  da: {
    fonts: {
      title: "font-['Pinyon_Script']",
      secondary: "font-['Allura']",
      countdown: "font-['Alex_Brush']",
      address: "font-['Noto_Sans']",
    },
    envelope: {
      fallbackGuest: 'Kære gæst',
      invitedText: 'Du er inviteret',
      fonts: {
        title: "font-['Pinyon_Script']",
        secondary: "font-['Allura']",
      },
    },
    invitationCard: {
      dearLabel: 'Kære',
      dearGuest: 'Kære gæst',
      coupleNames: 'Alan & Milav',
      requestHonor: 'Ønsker æren af din tilstedeværelse',
      celebrationLine: 'ved deres bryllupsfest',
      dateText: 'Fredag den 17. juli 2026',
      timeText: '17:00',
      addressLine: 'Frederikssundsvej 264',
      venueName: 'Diamond Palace',
      city: 'København',
      flipButton: 'Vend ✨',
      backButton: 'Tilbage til invitationen',
      storyTitle: 'Vores historie',
      story: 'Engang for længe siden...',
      fonts: {
        title: "font-['Pinyon_Script']",
        secondary: "font-['Allura']",
        address: "font-['Noto_Sans']",
        story: "font-['Allura']",
      },
    },
    countdown: {
      title: 'Den store dag',
      subtitle: 'Nedtælling til vores fejring',
      days: 'Dage',
      hours: 'Timer',
      minutes: 'Minutter',
      seconds: 'Sekunder',
      fonts: {
        title: "font-['Pinyon_Script']",
        secondary: "font-['Allura']",
        countdown: "font-['Alex_Brush']",
      },
    },
    sections: {
      location: {
        title: 'Stedet',
        venueName: 'Diamond Palace',
        addressLine: 'Frederikssundsvej 264',
        addressCity: 'København, Danmark',
        mapButton: 'Åbn i kort',
        foodTitle: 'Mad & Drikke',
        foodDescription: 'Der vil være masser af lækker mad og drikke til festen.',
        parkingTitle: 'Parkering',
        parkingDescription: 'Der er parkeringsmuligheder på stedet og i nærheden for gæster, der ankommer i bil.',
        transportTitle: 'Offentlig transport',
        transportDescription: 'Tag bus 5C til Kobbelvænget for nem adgang til stedet.',
        fonts: {
          title: "font-['Pinyon_Script']",
          secondary: "font-['Pinyon_Script']",
          tertiary: "font-['Allura']",
          address: "font-['Noto_Sans']",
        },
      },
      celebration: {
        title: 'Fejringen',
        weddingPartyFrom: 'Bryllupsfesten starter fra',
        weddingTime: '17:00',
        programSoon: 'Programmet følger snart',
      },
      dressCode: {
        title: 'Dresscode',
        subtitle: 'Formelt tøj',
        formal: 'Formelt tøj',
        gentlemen: 'For herrerne',
        suitColors: 'Jakkefarver:',
        ladies: 'For damerne',
        dressColors: 'Kjolefarver:',
        weddingTheme: 'Bryllupstema: Marineblå & Lyserød',
      },
      gifts: {
        title: 'Gaver',
        intro: 'Din tilstedeværelse ved vores bryllup er den største gave.',
        details: 'Men hvis du ønsker at give en gave, har vi en MobilePay-boks til vores bryllupsrejse.',
        boxTitle: 'MobilePay Honeymoon Box',
        boxButton: 'Åbn MobilePay-boksen',
        instructions: 'Ellers vil vi have en boks til gaver under fejringen. Hvis det er penge, læg dem i en kuvert og put den i boksen. Hvis det er en fysisk gave, stil den ved siden af boksen.',
      },
      finalMessage: {
        title: 'Tak',
        lead: 'Vi er så taknemmelige for at have dig i vores liv og kan ikke vente med at fejre denne særlige dag med dig.',
        message: 'Din kærlighed, støtte og venskab betyder alt for os. Tak fordi du er en del af vores rejse, når vi begynder dette nye kapitel sammen.',
        closing: 'Med al vores kærlighed,',
        signature: 'Alan & Milav',
        fonts: {
          title: "font-['Pinyon_Script']",
          secondary: "font-['Allura']",
          name: "font-['Pinyon_Script']",
        },
      },
    },
  },
  ar: {
    fonts: {
      title: "font-['Aref_Ruqaa']",
      secondary: "font-['Aref_Ruqaa']",
      countdown: "font-['Aref_Ruqaa']",
      address: "font-['Noto_Sans']",
    },
    envelope: {
      fallbackGuest: 'ضيفنا العزيز',
      invitedText: 'دعوة خاصة لكم',
      fonts: {
        title: "font-['Aref_Ruqaa']",
        secondary: "font-['Aref_Ruqaa']",
      },
    },
    invitationCard: {
      dearLabel: 'إلى',
      dearGuest: 'الضيف العزيز',
      coupleNames: 'Alan & Milav',
      requestHonor: 'يشرفنا حضوركم ومشاركتم فرحة ',
      celebrationLine: 'حفل زفافنا',
      dateText: 'الجمعة 17 يوليو 2026',
      timeText: '17:00',
      addressLine: 'Frederikssundsvej 264',
      venueName: 'Diamond Palace',
      city: 'كوبنهاغن',
      flipButton: 'اقلب البطاقة ✨',
      backButton: 'العودة إلى الدعوة',
      storyTitle: 'قصتنا',
      story: 'بدأت حكايتنا في عام ٢٠١٥، منذ أحد عشر عامًا، وهي مدة يمكن للمرء أن يقول إن تاريخًا طويلًا قد مضى فيها، في بلدةٍ هادئة احتضنت أولى خطواتنا. كنّا زميلين في دراسة لغة جديدة، غريبين عن المكان، جديدين على الثقافة، نحاول أن نفهم العالم من حولنا. لم نكن نعرف حينها أن تلك اللحظات البسيطة — نظرة، كلمة، ضحكة — كانت تبني شيئًا أكبر مما كنا نتخيّل.\n\nومع مرور الأيام، لم تعد الغربة مجرد شعورٍ في داخلنا، بل امتحانًا صغيرًا لقوّتنا معًا. واجهنا نجاحاتٍ تارة، وخساراتٍ تارة أخرى. مررنا بلحظاتٍ سعيدة ومليئة بالدفء، ولحظاتٍ أخرى صعبة لا تخلو من الكآبة، لكننا — في كل مرة — كنا نجد الطريق من جديد لأن أحدنا كان يمسك بيد الآخر. شيئًا فشيئًا، تحوّلت صداقتنا إلى علاقةٍ أعمق، علاقةٍ صقلتها التجارب، وثبّتها الصبر، حتى أصبحت رفقة دربٍ لا يمكن كسرها.\n\nانتقلنا من مرحلة إلى أخرى، ومن مدينة إلى أخرى، نكبر وننضج ونحلم مفعمين بالطموح. إلى أن وصلنا إلى مرحلة الجامعة، حيث بدأت ملامح مستقبلنا تتشكّل بين المحاضرات والمشاريع والليالي الطويلة. لم يكن الطريق سهلًا، لكننا مضينا فيه بثبات، نساند بعضنا حين يثقل الحمل، ونحتفل معًا حين تتحقق خطوة جديدة. ومع الوقت، أصبحنا مهندسين — ليس فقط في العمل، بل في حياتنا المشتركة أيضًا — نبنيها حجرةً حجرة، ونحرسها معًا.\n\nواليوم، نقف على عتبة فصلٍ جديد، فصلٍ يبدأ بشابٍ وشابة اختارا أن يكملا الطريق يدًا بيد، وأن يشاركا قصتهما مع من يحبّونهما…\n\nفصلٌ نؤمن أن أجمل ما فيه لم يُكتب بعد 🤵🏻👰🏻‍♀️',
      fonts: {
        title: "font-['Pinyon_Script']",
        secondary: "font-['Aref_Ruqaa']",
        address: "font-['Noto_Sans']",
        story: "font-['Pinyon_Script']",
      },
    },
    countdown: {
      title: 'اليوم الموعود',
      subtitle: 'العد التنازلي لاحتفالنا',
      days: 'يوم',
      hours: 'ساعة',
      minutes: 'دقيقة',
      seconds: 'ثانية',
      fonts: {
        title: "font-['Aref_Ruqaa']",
        secondary: "font-['Aref_Ruqaa']",
        countdown: "font-['Alex_Brush']",
      },
    },
    sections: {
      location: {
        title: 'الموقع',
        venueName: 'Diamond Palace',
        addressLine: 'Frederikssundsvej 264',
        addressCity: 'كوبنهاغن، الدنمارك',
        mapButton: 'افتح في الخرائط',
        foodTitle: 'الطعام والمشروبات',
        foodDescription: 'سيكون هناك بوفيه مفتوح ومشروبات كحولية وغير كحولية.',
        parkingTitle: 'موقف السيارات',
        parkingDescription: 'تتوفر مواقف للسيارات في محيط موقع الحفل للضيوف القادمين بسياراتهم.',
        transportTitle: 'وسائل النقل العام',
        transportDescription: 'إذا قررتم المجيئ من محطة كوبنهاغن الرئيسية يمكنم الصعود على حافلة 5C بإتجاه Husum أو Herlev Hospital والخروج عند محطة Kobbelvænget.',
        fonts: {
          title: "font-['Aref_Ruqaa']",
          secondary: "font-['Pinyon_Script']",
          tertiary: "font-['Aref_Ruqaa']",
          address: "font-['Noto_Sans']",
        },
      },
      celebration: {
        title: 'الاحتفال',
        weddingPartyFrom: 'يبدأ حفل الزفاف من الساعة',
        weddingTime: '17:00',
        programSoon: 'سيأتي البرنامج قريبًا',
      },
      dressCode: {
        title: 'قواعد اللباس',
        subtitle: 'ملابس رسمية',
        formal: 'ملابس رسمية',
        gentlemen: 'للرجال والشباب',
        suitColors: 'ألوان البدلات',
        ladies: 'للسيدات والفتيات',
        dressColors: 'ألوان الفساتين',
        weddingTheme: 'ألوان الحفل هي الأزرق الغامق والوردي',
      },
      gifts: {
        title: 'الهدايا',
        intro: 'حضوركم في زفافنا هو أعظم هدية!',
        details: 'إذا أردتم تكريمنا بهدية، فلدينا صندوق MobilePay لشهر العسل.',
        boxTitle: 'MobilePay Honeymoon Box',
        boxButton: 'افتح الصندوق',
        instructions: 'أو،سيكون لدينا خلال الاحتفال صندوق لوضع الهدايا. إذا كانت الهدية مبلغ من المال، يرجى وضعه في ظرف وإدخاله في الصندوق. إذا كانت الهدية مادية غير المال، يرجى وضعها بجانب الصندوق.',
      },
      finalMessage: {
        title: 'شكرًا لكم',
        lead: 'نحن ممتنون جدًا لوجودكم ونتطلع للاحتفال بهذا اليوم الخاص معاً.',
        message: 'محبتكم ودعمكم تعني لنا الكثير. شكراً لكونكم جزءًا من رحلتنا.',
        closing: 'مع كل حبنا،',
        signature: 'Alan & Milav',
        fonts: {
          title: "font-['Aref_Ruqaa']",
          secondary: "font-['Aref_Ruqaa']",
          name: "font-['Pinyon_Script']",
        },
      },
    },
  },
  fr: {
    fonts: {
      title: "font-['Pinyon_Script']",
      secondary: "font-['Allura']",
      countdown: "font-['Alex_Brush']",
      address: "font-['Noto_Sans']",
    },
    envelope: {
      fallbackGuest: 'Cher invité',
      invitedText: 'Vous êtes invité',
      fonts: {
        title: "font-['Pinyon_Script']",
        secondary: "font-['Allura']",
      },
    },
    invitationCard: {
      dearLabel: 'Cher',
      dearGuest: 'Cher invité',
      coupleNames: 'Alan & Milav',
      requestHonor: "Demandons l'honneur de votre présence",
      celebrationLine: 'à leur célébration de mariage',
      dateText: 'Vendredi 17 juillet 2026',
      timeText: '17:00',
      addressLine: 'Frederikssundsvej 264',
      venueName: 'Diamond Palace',
      city: 'Copenhague',
      flipButton: 'Retourner ✨',
      backButton: 'Retour à l invitation',
      storyTitle: 'Notre histoire',
      story: 'Il était une fois...',
      fonts: {
        title: "font-['Pinyon_Script']",
        secondary: "font-['Allura']",
        address: "font-['Noto_Sans']",
        story: "font-['Allura']",
      },
    },
    countdown: {
      title: 'Le grand jour',
      subtitle: 'Compte à rebours jusqu’à notre célébration',
      days: 'Jours',
      hours: 'Heures',
      minutes: 'Minutes',
      seconds: 'Secondes',
      fonts: {
        title: "font-['Pinyon_Script']",
        secondary: "font-['Allura']",
        countdown: "font-['Alex_Brush']",
      },
    },
    sections: {
      location: {
        title: 'Le lieu',
        venueName: 'Diamond Palace',
        addressLine: 'Frederikssundsvej 264',
        addressCity: 'Copenhague, Danemark',
        mapButton: 'Ouvrir dans Maps',
        foodTitle: 'Nourriture et Boissons',
        foodDescription: 'Il y aura beaucoup de délicieux plats et boissons pour la célébration.',
        parkingTitle: 'Parking',
        parkingDescription: 'Des places de parking sont disponibles sur place et à proximité pour les invités arrivant en voiture.',
        transportTitle: 'Transports en commun',
        transportDescription: 'Prenez le bus 5C jusqu’à Kobbelvænget pour un accès facile au lieu.',
        fonts: {
          title: "font-['Pinyon_Script']",
          secondary: "font-['Allura']",
          tertiary: "font-['Allura']",
          address: "font-['Noto_Sans']",
        },
      },
      celebration: {
        title: 'La Célébration',
        weddingPartyFrom: 'La réception commence à partir de',
        weddingTime: '17:00',
        programSoon: 'Le programme arrive bientôt',
      },
      dressCode: {
        title: 'Code vestimentaire',
        subtitle: 'Tenue de soirée',
        formal: 'Tenue de soirée',
        gentlemen: 'Pour les messieurs',
        suitColors: 'Couleurs de costume:',
        ladies: 'Pour les dames',
        dressColors: 'Couleurs de robe:',
        weddingTheme: 'Thème du mariage : bleu marine & rose',
      },
      gifts: {
        title: 'Cadeaux',
        intro: 'Votre présence à notre mariage est le plus beau cadeau.',
        details: 'Cependant, si vous souhaitez nous offrir un cadeau, nous avons une boîte MobilePay pour notre lune de miel.',
        boxTitle: 'MobilePay Honeymoon Box',
        boxButton: 'Ouvrir la boîte MobilePay',
        instructions: 'Sinon, pendant la célébration, il y aura une boîte où déposer les cadeaux. Si c’est de l’argent, veuillez le mettre dans une enveloppe et la déposer dans la boîte. Si c’est un cadeau matériel, placez-le à côté de la boîte.',
      },
      finalMessage: {
        title: 'Merci',
        lead: 'Nous sommes tellement reconnaissants de vous avoir dans notre vie et avons hâte de célébrer ce jour spécial avec vous.',
        message: 'Votre amour, votre soutien et votre amitié comptent énormément pour nous. Merci de faire partie de notre voyage alors que nous commençons ce nouveau chapitre ensemble.',
        closing: 'Avec tout notre amour,',
        signature: 'Alan & Milav',
        fonts: {
          title: "font-['Pinyon_Script']",
          secondary: "font-['Allura']",
          name: "font-['Pinyon_Script']",
        },
      },
    },
  },
};

function normalizeGuestName(pathPart: string) {
  // Check if the text contains Arabic characters
  const hasArabic = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(pathPart);

  if (hasArabic) {
    // For Arabic text, just clean up spaces and separators
    return pathPart
      .replace(/[-_]/g, ' ')
      .split(' ')
      .filter(Boolean)
      .join(' ');
  } else {
    // For Latin text, apply normal capitalization
    return pathPart
      .replace(/[-_]/g, ' ')
      .split(' ')
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

function parseLanguageFromPath(path: string) {
  // Decode URL to handle Arabic characters properly
  const decodedPath = decodeURIComponent(path);
  const cleanedPath = decodedPath.replace(/\\/g, '/').replace(/\/+/g, '/').replace(/^\//, '').replace(/\/$/, '');
  const segments = cleanedPath.split('/').filter(Boolean);

  if (segments.length === 0) {
    return { lang: 'en' as SupportedLanguage, name: '' };
  }

  const firstSegment = segments[0] as SupportedLanguage;
  if (supportedLanguages.includes(firstSegment)) {
    return { lang: firstSegment, name: segments.slice(1).join(' ') };
  }

  return { lang: 'en' as SupportedLanguage, name: segments.join(' ') };
}

export default function App() {
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [guestName, setGuestName] = useState<string>('');
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [direction, setDirection] = useState<TextDirection>('ltr');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const enableAudioOnInteraction = async () => {
    if (!audioEnabled && audioRef.current) {
      try {
        await audioRef.current.play()
        setIsPlaying(true);
        setAudioEnabled(true);
      } catch (error) {
        // Silently handle audio errors
      }
    }
  };

  useEffect(() => {
    const { lang, name } = parseLanguageFromPath(window.location.pathname);
    setLanguage(lang);
    setDirection(lang === 'ar' ? 'rtl' : 'ltr');

    if (name) {
      setGuestName(normalizeGuestName(name));
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  const strings = translations[language];
  const invitationBackgroundImage = '';

  const toggleAudio = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
            setIsPlaying(true);
          }
        } catch (error) {
          // Silently handle audio errors
        }
      }
    }
  };

  const startAudio = async () => {
    if (audioRef.current && !isPlaying) {
      try {
        // Ensure audio is loaded
        if (audioRef.current.readyState === 0) {
          await new Promise((resolve) => {
            const onCanPlay = () => {
              audioRef.current?.removeEventListener('canplay', onCanPlay);
              resolve(void 0);
            };
            audioRef.current?.addEventListener('canplay', onCanPlay);
            audioRef.current?.load();
          });
        }

        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
          setAudioEnabled(true);
        }
      } catch (error) {
        // Silently handle audio errors
      }
    }
  };

  const handleEnvelopeComplete = () => {
    setShowEnvelope(false);
    // Start audio after envelope animation completes
    enableAudioOnInteraction();
  };

  return (
    <div dir={direction} className="min-h-screen bg-black overflow-x-hidden">
      {/* Background music */}
      <audio ref={audioRef} loop>
        <source src={new URL('../imports/perfect.mp3', import.meta.url).href} type="audio/mp3" />
      </audio>

      {showEnvelope && (
        <EnvelopeOpening
          onComplete={handleEnvelopeComplete}
          guestName={guestName}
          strings={strings.envelope}
        />
      )}

      {!showEnvelope && (
        <>
          <ScrollHeart />

          {/* Hero Section with Invitation Card */}
          <section className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-b from-black via-[#1a1a2e] to-black relative overflow-hidden">
            <InvitationCard
              backgroundImage={invitationBackgroundImage}
              guestName={guestName}
              strings={strings.invitationCard}
              isPlaying={isPlaying}
              onToggleAudio={toggleAudio}
            />
          </section>

          <Countdown strings={strings.countdown} />

          {/* Location Section */}
          <LocationSection strings={strings.sections.location} fonts={strings.sections.location.fonts} direction={direction} />

          <CelebrationSection strings={strings.sections.celebration} fonts={strings.fonts} direction={direction} />

          {/* Theme & Dress Code Section */}
          <DressCodeSection strings={strings.sections.dressCode} fonts={strings.fonts} direction={direction} />

          {/* Gifts Section */}
          <GiftsSection strings={strings.sections.gifts} fonts={strings.fonts} direction={direction} />

          {/* Final Message Section */}
          <FinalMessageSection strings={strings.sections.finalMessage} fonts={strings.sections.finalMessage.fonts} direction={direction} />
        </>
      )}
    </div>
  );
}

function LocationSection({ strings, fonts, direction }: { strings: LanguageStrings['sections']['location']; fonts: LanguageStrings['sections']['location']['fonts']; direction: TextDirection }) {
  const { ref, isVisible } = useScrollAnimation();
  const offset = useParallax();

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-b from-black via-[#1a1a2e] to-black relative overflow-hidden"
    >
      {/* Parallax background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          // transform: `translateY(${offset * 0.3}px)`,
          backgroundImage: 'radial-gradient(circle, #f59dbd 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, transparent 100%)',
        }}
      />

      <div
        className={`max-w-4xl w-full transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'
        }`}
      >
        <div className="text-center mb-12">
          <div className={`${fonts.title} text-7xl text-[#f59dbd] mb-4 drop-shadow-lg`}>
            {strings.title}
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#f59dbd] to-transparent mx-auto mb-8" />
        </div>

        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-2xl p-12 shadow-2xl border-2 border-[#f59dbd]/30">
          <div className="text-center space-y-8">
            <div className={`${fonts.secondary} text-5xl text-[#f59dbd] mb-2`}>
              {strings.venueName}
            </div>

            <div className={`${fonts.address} text-xl text-white mb-2`}>
              <div>{strings.addressLine}</div>
            </div>

            <div className={`${fonts.tertiary} text-4xl text-white`}>
              <div className="text-[#f59dbd]">{strings.addressCity}</div>
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Frederikssundsvej+264+Copenhagen"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-[#f59dbd]/50 bg-[#f59dbd]/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#f59dbd] hover:bg-[#f59dbd]/20"
            >
              <span className="text-2xl">📍</span>
              <div className="text-[#f59dbd] font-['Dancing_Script'] text-lg">{strings.mapButton}</div>
            </a>

            <div className={`grid md:grid-cols-3 gap-6 ${direction === 'rtl' ? 'text-right' : 'text-left'} mt-8`}>

              <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-6 border border-[#f59dbd]/20">
                <div className="text-3xl mb-4">🚌</div>
                <div className={`${fonts.tertiary} text-4xl text-[#f59dbd] mb-2`}>{strings.transportTitle}</div>
                <div className={`${fonts.tertiary} text-xl text-white leading-relaxed`}>{strings.transportDescription}</div>
              </div>

              <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-6 border border-[#f59dbd]/20">
                <div className="text-3xl mb-4">🚗</div>
                <div className={`${fonts.tertiary} text-4xl text-[#f59dbd] mb-2`}>{strings.parkingTitle}</div>
                <div className={`${fonts.tertiary} text-xl text-white leading-relaxed`}>{strings.parkingDescription}</div>
              </div>

              <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-6 border border-[#f59dbd]/20">
                <div className="text-3xl mb-4">🍽️</div>
                <div className={`${fonts.tertiary} text-4xl text-[#f59dbd] mb-2`}>{strings.foodTitle}</div>
                <div className={`${fonts.tertiary} text-xl text-white leading-relaxed`}>{strings.foodDescription}</div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CelebrationSection({ strings, fonts, direction }: { strings: LanguageStrings['sections']['celebration']; fonts: LanguageStrings['fonts']; direction: TextDirection }) {
  const { ref, isVisible } = useScrollAnimation();
  const offset = useParallax();

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-b from-black via-[#1a1a2e] to-black relative overflow-hidden"
    >
      {/* Parallax background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(245,157,189,0.15) 25%, transparent 25%, transparent 50%, rgba(245,157,189,0.15) 50%, rgba(245,157,189,0.15) 75%, transparent 75%, transparent)',
          backgroundSize: '80px 80px',
        }}
      />

      <div
        className={`max-w-3xl w-full transition-all duration-1000 delay-150 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}
      >
        <div className="text-center mb-12">
          <div className={`${fonts.title} text-7xl text-[#f59dbd] mb-4 drop-shadow-lg`}>
            {strings.title}
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#f59dbd] to-transparent mx-auto" />
        </div>

        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-3xl p-12 shadow-2xl border-2 border-[#f59dbd]/30 text-center text-white">
          <div className={`${fonts.secondary} text-4xl text-[#f59dbd] mb-6`}>{strings.weddingPartyFrom}</div>
          <div className={`${fonts.secondary} text-7xl text-white mb-8`}>{strings.weddingTime}</div>
          <div className={`${fonts.secondary} text-3xl text-[#f59dbd] leading-relaxed`}>{strings.programSoon}</div>
        </div>
      </div>
    </section>
  );
}

function DressCodeSection({ strings, fonts, direction }: { strings: LanguageStrings['sections']['dressCode']; fonts: LanguageStrings['fonts']; direction: TextDirection }) {
  const { ref, isVisible } = useScrollAnimation();
  const offset = useParallax();

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-b from-black via-[#1a1a2e] to-black relative overflow-hidden"
    >
      {/* Parallax background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          // transform: `translateY(${offset * 0.2}px)`,
          backgroundImage: 'linear-gradient(45deg, #f59dbd 25%, transparent 25%, transparent 75%, #f59dbd 75%, #f59dbd), linear-gradient(45deg, #f59dbd 25%, transparent 25%, transparent 75%, #f59dbd 75%, #f59dbd)',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px',
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, transparent 100%)',
        }}
      />

      <div
        className={`max-w-4xl w-full transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="text-center mb-12">
          <div className={`${fonts.title} text-7xl text-[#f59dbd] mb-4 drop-shadow-lg`}>
            {strings.title}
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#f59dbd] to-transparent mx-auto mb-8" />
          <div className={`${fonts.secondary} text-4xl text-[#f59dbd]`}>{strings.subtitle}</div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-2xl p-8 shadow-2xl border-2 border-[#f59dbd]/30 hover:scale-105 transition-transform duration-300">
            <div className="text-center">
              <div className={`${fonts.secondary} text-4xl text-white mb-6`}>{strings.gentlemen}</div>

              <div className={`${fonts.secondary} text-xl text-[#f59dbd] mb-4`}>{strings.suitColors}</div>

              <div className="w-full h-24 rounded-lg shadow-lg mb-6 border-[#f59dbd]/30" style={{
                background: 'linear-gradient(to right, #ababab 3%, #7F7F7F 27%, #002060 69%, #000000 98%)'
              }} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-2xl p-8 shadow-2xl border-2 border-[#f59dbd]/30 hover:scale-105 transition-transform duration-300">
            <div className="text-center">
              <div className={`${fonts.secondary} text-4xl text-white mb-6`}>{strings.ladies}</div>

              <div className={`${fonts.secondary} text-xl text-[#f59dbd] mb-4`}>{strings.dressColors}</div>

              <div className="w-full h-24 rounded-lg shadow-lg mb-6  border-[#f59dbd]/30" style={{
                background: 'linear-gradient(to right, #001B50 0%, #002060 20%, #F7ADC8 70%, #F9C2B5 100%)'
              }} />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center bg-gradient-to-r from-[#f59dbd] to-[#e37ba5] text-white rounded-2xl p-8 shadow-2xl">
          <div className={`${fonts.secondary} text-3xl`}>{strings.weddingTheme}</div>
        </div>
      </div>
    </section>
  );
}

function GiftsSection({ strings, fonts, direction }: { strings: LanguageStrings['sections']['gifts']; fonts: LanguageStrings['fonts']; direction: TextDirection }) {
  const { ref, isVisible } = useScrollAnimation();
  const offset = useParallax();

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-b from-black via-[#1a1a2e] to-black relative overflow-hidden"
    >
      {/* Parallax background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          // transform: `translateY(${offset * 0.25}px)`,
          backgroundImage: 'repeating-linear-gradient(45deg, #f59dbd, #f59dbd 10px, transparent 10px, transparent 20px)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, transparent 100%)',
        }}
      />


      <div
        className={`max-w-3xl w-full transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 blur-none' : 'opacity-0 blur-sm'
        }`}
      >
        <div className="text-center mb-12">
          <div className={`${fonts.title} text-7xl text-[#f59dbd] mb-4 drop-shadow-lg`}>{strings.title}</div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#f59dbd] to-transparent mx-auto mb-8" />
        </div>

        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-2xl p-12 shadow-2xl border-2 border-[#f59dbd]/30 text-center">
          <div className={`${fonts.secondary} text-3xl text-white mb-6 leading-relaxed`}>{strings.intro}</div>

          <div className={`${fonts.secondary} text-3xl text-[#f59dbd] mb-8 leading-relaxed`}>{strings.details}</div>

          <div className="space-y-6 flex flex-col items-center">
            <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-8 border border-[#f59dbd]/20 hover:border-[#f59dbd]/50 transition-all text-center">
              <div className={`${fonts.secondary} text-2xl text-white mb-4`}>{strings.boxTitle}</div>
              <a
                href="https://qr.mobilepay.dk/box/e687473b-cd36-4156-a782-120031a9b584/pay-in"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-3 rounded-full bg-[#f59dbd]/10 px-5 py-3 text-sm font-semibold text-[#f59dbd] border border-[#f59dbd]/40 hover:bg-[#f59dbd]/20"
              >
                <img src={mobilePayIcon} alt="MobilePay" className="w-6 h-6" />
                {strings.boxButton}
              </a>
            </div>
          </div>

          <div className={`${fonts.secondary} text-3xl text-[#f59dbd] mb-8 leading-relaxed mt-8`}>{strings.instructions}</div>

        </div>
      </div>
    </section>
  );
}

function FinalMessageSection({ strings, fonts, direction }: { strings: LanguageStrings['sections']['finalMessage']; fonts: LanguageStrings['sections']['finalMessage']['fonts']; direction: TextDirection }) {
  const { ref, isVisible } = useScrollAnimation();
  const offset = useParallax();

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-b from-black via-[#1a1a2e] to-black relative overflow-hidden"
    >
      {/* Parallax background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          // transform: `translateY(${offset * 0.15}px)`,
          backgroundImage: 'radial-gradient(circle, #f59dbd 2px, transparent 2px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div
        className={`max-w-3xl w-full text-center transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}
      >
        <div className="mb-12">
          <svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="#f59dbd"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto animate-pulse"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <div className={`${fonts.title} text-8xl text-[#f59dbd] mb-8 drop-shadow-2xl`}>{strings.title}</div>

        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] rounded-2xl p-12 shadow-2xl border-2 border-[#f59dbd]/50">
          <div className={`${fonts.secondary} text-3xl text-white leading-relaxed mb-6`}>{strings.lead}</div>

          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#f59dbd] to-transparent mx-auto my-8" />

          <div className={`${fonts.secondary} text-3xl text-[#f59dbd] leading-relaxed mb-8`}>{strings.message}</div>

          <div className={`${fonts.secondary} text-5xl text-white mb-2`}>{strings.closing}</div>
          <div className={`${fonts.name} text-7xl text-[#f59dbd] mt-4`}>{strings.signature}</div>
        </div>
      </div>
    </section>
  );
}
