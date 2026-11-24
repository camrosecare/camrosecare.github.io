import { ConceptMeta, DaycareProgram, Testimonial, DaycareFeature } from '../types/concept';
import heroPlayImg from '../assets/images/daycare_hero_warm_play_1793373280284.webp';
import heroPrimaryColorsImg from '../assets/images/daycare_hero_primary_colors_1793374269533.webp';
import babyMascotImg from '../assets/images/welcoming_baby_mascot_1793374256600.webp';
import realBabyWavingImg from '../assets/images/real_animated_baby_waving_1793374696496.webp';
import outdoorPlayImg from '../assets/images/daycare_outdoor_nature_1793373280808.webp';
import toddlerSensoryImg from '../assets/images/daycare_toddler_sensory_1793373282471.webp';
import infantNurturingImg from '../assets/images/daycare_infant_nurturing_1793373282303.webp';
import montessoriActivityImg from '../assets/images/daycare_montessori_activity_1793373282634.webp';
import artSunshineDinoImg from '../assets/images/kids_artwork_sunshine_1793448930455.webp';
import artRainbowSchoolImg from '../assets/images/kids_artwork_rainbow_1793448945663.webp';
import artRocketSpaceImg from '../assets/images/kids_artwork_rocket_1793448961516.webp';

export const BUSINESS_INFO = {
  name: 'Camrose Care',
  legalName: 'Camrose Little Angels Daycare Society',
  address: '4907 47 Street, Camrose, AB, T4V 1J9',
  city: 'Camrose, Alberta',
  phone: '(780) 678-0701',
  email: 'littleangels@camrosecare.ca',
  hours: 'Monday – Friday: 6:00 AM – 6:30 PM',
  status: 'Alberta Licensed & Regulated Child Care Facility',
  subsidyNote: 'Alberta Child Care Affordability Grant & Provincial Subsidy Eligible (Federal-Provincial Agreement)',
  ageRange: '0 to 12 Years Old',
  mission: 'Fostering a nurturing, play-based early learning community where every child is valued as capable, curious, and resourceful.',
  registrationUrl: 'https://web.kinderlogix.com/registration.php?cid=2261'
};

export const IMAGES = {
  heroPlay: heroPlayImg,
  heroPrimaryColors: heroPrimaryColorsImg,
  babyMascot: babyMascotImg,
  realBabyWaving: realBabyWavingImg,
  realBabyTransparent: '/real_baby_transparent.webp',
  outdoorPlay: outdoorPlayImg,
  toddlerSensory: toddlerSensoryImg,
  infantNurturing: infantNurturingImg,
  montessoriActivity: montessoriActivityImg,
  artSunshineDino: artSunshineDinoImg,
  artRainbowSchool: artRainbowSchoolImg,
  artRocketSpace: artRocketSpaceImg
};

export const BABY_AUDIO_TRACKS = [
  {
    id: 'greeting',
    title: 'Welcome to Camrose Care',
    dialogue: 'Welcome to Camrose Care!',
    src: '/audio/baby_greeting.mp3'
  },
  {
    id: 'love',
    title: 'Hello! I love you!',
    dialogue: 'Hello! I love you! Come play with us!',
    src: '/audio/baby_love.mp3'
  },
  {
    id: 'explore',
    title: 'Explore our happy world',
    dialogue: 'Come and explore our happy little world!',
    src: '/audio/baby_explore.mp3'
  },
  {
    id: 'friends',
    title: 'Making new friends',
    dialogue: 'We love learning, playing and making new friends!',
    src: '/audio/baby_friends.mp3'
  },
  {
    id: 'parents',
    title: 'Mommy & Daddy',
    dialogue: "Mommy and Daddy, let's discover something wonderful!",
    src: '/audio/baby_parents.mp3'
  },
  {
    id: 'play',
    title: 'Come play with us',
    dialogue: 'Come play with us!',
    src: '/audio/baby_play.mp3'
  }
];

export const CONCEPTS_DATA: ConceptMeta[] = [
  {
    id: 'concept-a',
    name: 'Concept A: Primary Joy (Red, Blue, Yellow & White)',
    tagline: 'Cheerful primary palette with animated welcoming baby mascot & rich motion',
    badge: 'Vibrant & Welcoming',
    paletteDescription: 'Royal Blue (#1D4ED8), Warm Cherry Red (#DC2626), Sunburst Yellow (#F59E0B), Pure White (#FFFFFF)',
    typography: 'Outfit Sans + Plus Jakarta Sans',
    keyAtmosphere: 'High-energy, joyous, motion-packed, friendly welcoming baby mascot greeting parents',
    bestSuitedFor: 'Families looking for an active, cheerful, loving, and energetic early childhood environment.',
    accentColor: '#DC2626'
  },
  {
    id: 'concept-b',
    name: 'Concept B: Royal Blue & Cherry Red Elegance',
    tagline: 'Refined deep royal blue, warm crimson red buttons & radiant golden stars',
    badge: 'Trustworthy & Polished',
    paletteDescription: 'Deep Sapphire Blue (#1E3A8A), Crimson Red (#E11D48), Warm Gold (#FBBF24), Crisp White',
    typography: 'Fraunces Serif + Plus Jakarta Sans',
    keyAtmosphere: 'Trustworthy, accredited, high-standard professional childcare with smooth motion transitions',
    bestSuitedFor: 'Parents who prioritize government accreditation, security, certified educators, and structured warmth.',
    accentColor: '#1E3A8A'
  },
  {
    id: 'concept-c',
    name: 'Concept C: Modern Montessori Primary',
    tagline: 'Clean white canvas with geometric primary red, blue & yellow learning blocks',
    badge: 'Montessori & Autonomous',
    paletteDescription: 'Pure Crisp White, Primary Cyan/Cobalt (#2563EB), Poppy Red (#EF4444), Sunflower (#FACC15)',
    typography: 'DM Sans + Clean Swiss Tabular',
    keyAtmosphere: 'Ordered, purposeful, clean lines, hands-on sensory exploration, child-centric autonomy',
    bestSuitedFor: 'Parents who love Montessori philosophy, prepared child-height environments, and focus.',
    accentColor: '#2563EB'
  },
  {
    id: 'concept-d',
    name: 'Concept D: Digital Interactive Studio',
    tagline: 'Rich interactive widgets, animated subsidy calculator & live baby guide',
    badge: 'Tech-Forward & Dynamic',
    paletteDescription: 'Navy Cobalt (#0F2942), Radiant Yellow (#FBBF24), Vivid Red (#EF4444), Pure White',
    typography: 'Outfit Bold + Plus Jakarta Sans',
    keyAtmosphere: 'Modern working parents, instant fee calculators, live operating badges, high-impact motion',
    bestSuitedFor: 'Working shift parents needing extended 6:00 AM – 6:30 PM hours and rapid transparent enrollment.',
    accentColor: '#F59E0B'
  }
];

export const DAYCARE_PROGRAMS: DaycareProgram[] = [
  {
    id: 'infants',
    title: 'Infant Nurture Program',
    ageRange: '0 – 18 Months',
    description: 'A gentle, safe, and sensory-rich environment providing responsive care, individual feeding and sleep rhythms, and tender emotional bonding.',
    highlights: ['Quiet dedicated sleep room', '1:3 Educator-to-infant ratio', 'Sensory texture mats & visual exploration', 'Daily digital sleep & feed log'],
    ratio: '1:3 to 1:4 Ratio',
    schedule: 'Full-time / Part-time slots',
    image: IMAGES.infantNurturing
  },
  {
    id: 'toddlers',
    title: 'Toddler Discovery Studio',
    ageRange: '19 Months – 3 Years',
    description: 'Active exploration designed to encourage gross motor development, language milestones, curiosity, and peer social interaction.',
    highlights: ['Natural loose-parts play', 'Language & singing circles', 'Potty training collaboration', 'Indoor active movement zone'],
    ratio: '1:6 Educator ratio',
    schedule: 'Full-time / Part-time slots',
    image: IMAGES.toddlerSensory
  },
  {
    id: 'preschool',
    title: 'Early Learning & Preschool',
    ageRange: '3 – 4.5 Years',
    description: 'A rich play-based curriculum focusing on early literacy, foundational math concepts, emotional regulation, and collaborative project work.',
    highlights: ['Montessori & Reggio-inspired learning', 'Early phonics & story workshops', 'Science & nature laboratory', 'Social conflict resolution skills'],
    ratio: '1:8 Educator ratio',
    schedule: 'Full-time & half-day preschool',
    image: IMAGES.montessoriActivity
  },
  {
    id: 'schoolage',
    title: 'Kindergarten & Out-of-School Care',
    ageRange: '4.5 – 12 Years',
    description: 'Supportive before & after-school care offering nutritious snacks, homework assistance, creative STEAM projects, and energizing outdoor play.',
    highlights: ['Own school bus add-on ($50/mo, all Camrose schools)', 'STEAM maker activities & board games', 'Homework support lounge', 'PA Day & Summer camp options'],
    ratio: '1:10 to 1:15 Ratio',
    schedule: 'Before & After School + PD Days',
    image: IMAGES.outdoorPlay
  }
];

export const CORE_FEATURES: DaycareFeature[] = [
  {
    tag: 'Licensed & Accredited',
    title: 'Government Regulated & Subsidized',
    description: 'Fully licensed under Alberta Early Learning Child Care regulations. Eligible for the Alberta Affordability Grant and parental subsidies reducing monthly costs.'
  },
  {
    tag: 'Extended Hours',
    title: '6:00 AM to 6:30 PM Flexibility',
    description: 'Designed specifically for hard-working Alberta families, healthcare workers, and shift schedules with comprehensive, stress-free drop-off and pick-up.'
  },
  {
    tag: 'Certified Educators',
    title: 'Accredited Level 1, 2 & 3 Staff',
    description: 'Every educator undergoes strict criminal record checks, vulnerable sector screenings, First Aid/CPR certification, and ongoing early learning training.'
  },
  {
    tag: 'Healthy Nutrition',
    title: 'Fresh Hot Meals & Wholesome Snacks',
    description: 'Nutritious balanced breakfasts, hot lunches, and afternoon snacks prepared in-house following Canada’s Food Guide standards with dietary allergy care.'
  },
  {
    tag: 'Secure & Safe',
    title: 'Protected Access & Natural Grounds',
    description: 'Keypad-secured entrances, fenced outdoor green play yards, age-appropriate equipment, and sanitization protocols keeping children safe every day.'
  },
  {
    tag: 'Parent Partnership',
    title: 'Transparent Daily Updates',
    description: 'Direct communication with teachers, photo highlights of milestone moments, meal and nap tracking, and an open-door policy for all families.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'Sarah M.',
    relation: 'Parent of 2-year-old',
    location: 'Camrose, AB',
    program: 'Toddler Discovery Studio',
    quote: 'As a working mother with early morning hospital shifts, the 6:00 AM opening time has been a life saver. More importantly, the teachers treat our daughter with so much love and gentle care. She runs through the door with a smile every single morning.',
    rating: 5,
    date: '2025'
  },
  {
    id: 't2',
    author: 'David & Amanda K.',
    relation: 'Parents of 4-year-old',
    location: 'Camrose, AB',
    program: 'Early Learning & Preschool',
    quote: 'Our son was quite shy before joining Camrose Little Angels. Within two months, his vocabulary exploded and he made wonderful little friends. The outdoor play yard and natural wooden learning toys make such a noticeable difference.',
    rating: 5,
    date: '2025'
  },
  {
    id: 't3',
    author: 'Michelle R.',
    relation: 'Parent of Grade 1 student',
    location: 'Camrose, AB',
    program: 'Out-of-School Care',
    quote: 'Having reliable, caring after-school care right here in town gives us complete peace of mind. The educators help with homework reading, provide wholesome warm snacks, and keep the kids creatively engaged until pick-up.',
    rating: 5,
    date: '2025'
  }
];

export interface GalleryPoster {
  id: string;
  title: string;
  artist: string;
  age: string;
  medium: string;
  image: string;
  date: string;
  clipColor: 'blue' | 'red' | 'yellow';
  description: string;
  likes: number;
}

export const CREATIVE_GALLERY_POSTERS: GalleryPoster[] = [
  {
    id: 'poster-1',
    title: 'Sunny Garden & Dino Pal',
    artist: 'Leo',
    age: 'Age 4',
    medium: 'Tempera & Finger Paint',
    image: IMAGES.artSunshineDino,
    date: 'Preschool Studio',
    clipColor: 'red',
    description: 'A cheerful golden sun shining warm rays over blooming tulips and a friendly little blue dinosaur friend.',
    likes: 24
  },
  {
    id: 'poster-2',
    title: 'Our Daycare Rainbow School',
    artist: 'Mia',
    age: 'Age 5',
    medium: 'Watercolor & Crayon Resist',
    image: IMAGES.artRainbowSchool,
    date: 'Kinder Prep',
    clipColor: 'blue',
    description: 'Friends and teacher holding hands outside the yellow school house beneath a radiant arching rainbow and butterflies.',
    likes: 31
  },
  {
    id: 'poster-3',
    title: 'Rocket Voyage to the Stars',
    artist: 'Noah',
    age: 'Age 4',
    medium: 'Acrylic & Splatter Star Dust',
    image: IMAGES.artRocketSpace,
    date: 'Pre-K Creative Hub',
    clipColor: 'yellow',
    description: 'A scarlet red and sun-yellow rocket zooming past craters and planets into deep cosmic blue space.',
    likes: 19
  },
  {
    id: 'poster-4',
    title: 'Sensory Color Exploration',
    artist: 'Lucas & Lily',
    age: 'Ages 2 & 3',
    medium: 'Textured Shaving Foam & Dye',
    image: IMAGES.toddlerSensory,
    date: 'Toddler Studio',
    clipColor: 'red',
    description: 'Hands-on tactile discovery blending squishy vibrant primary colors into marbled swirls.',
    likes: 28
  },
  {
    id: 'poster-5',
    title: 'Architects of the Sky',
    artist: 'Sofia',
    age: 'Age 5',
    medium: 'Montessori Wooden Blocks',
    image: IMAGES.montessoriActivity,
    date: 'Montessori Discovery',
    clipColor: 'blue',
    description: 'Geometric towers balancing cylinders, arches, and colorful primary bridges built with patience and pride.',
    likes: 22
  },
  {
    id: 'poster-6',
    title: 'Sunny Meadow Explorers',
    artist: 'Kinder Explorers',
    age: 'Ages 3–5',
    medium: 'Outdoor Nature Collage',
    image: IMAGES.outdoorPlay,
    date: 'Nature Yard',
    clipColor: 'yellow',
    description: 'Gathered leaves, pine needles, and dandelion flowers pressed with love on a sunny Alberta morning.',
    likes: 35
  }
];

