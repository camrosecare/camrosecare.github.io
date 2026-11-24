export type ChatActionType = 'tour' | 'register' | 'subsidy' | 'handbook' | 'call' | 'email';

export type ResponseClassification = 'official' | 'guidance' | 'boundary' | 'fallback';

export type ChildAgeGroup = 'infant' | 'toddler' | 'preschool' | 'schoolage';

export interface ChatAction {
  label: string;
  type: ChatActionType;
}

export interface StarterQuestion {
  id: string;
  label: string;
  query: string;
}

export interface ConversationContext {
  activeTopicId?: string;
  childAgeGroup?: ChildAgeGroup;
  childAgeMention?: string;
}

export interface KnowledgeEntry {
  id: string;
  classification: 'official' | 'guidance';
  topic: string;
  sourceCitation: string;
  phrases: string[];
  keywords: string[];
  answer: string;
  ageTailoredNotes?: Partial<Record<ChildAgeGroup, string>>;
  followUpDetails?: string;
  highlights?: string[];
  followUps: StarterQuestion[];
  actions?: ChatAction[];
}

export interface ChatbotResponse {
  matched: boolean;
  classification: ResponseClassification;
  topic: string;
  sourceCitation: string;
  answer: string;
  highlights?: string[];
  actions: ChatAction[];
  followUps: StarterQuestion[];
  updatedContext: ConversationContext;
}

export const STARTER_QUESTIONS: StarterQuestion[] = [
  { id: 'spaces', label: 'Spaces & Ages Accepted', query: 'What ages do you accept and are spaces available?' },
  { id: 'curriculum', label: 'Reggio Emilia Curriculum', query: 'Tell me about your Reggio Emilia curriculum and preschool learning approach' },
  { id: 'hours', label: 'Hours & Shift Drop-Off', query: 'What are your opening hours and shift drop-off options?' },
  { id: 'subsidy', label: 'Alberta $10/Day & Subsidy', query: 'How do Alberta $10/Day grants, subsidies, and fees work?' },
  { id: 'separation', label: 'First-Day & Separation Tips', query: 'How can I ease first-day separation anxiety for my child?' },
  { id: 'camrose', label: 'Camrose Family & Shift Tips', query: 'Tips for raising kids and handling shift work routines in Camrose' },
  { id: 'register', label: 'How to Register', query: 'How do I register my child and what deposit or documents are needed?' }
];

const AGE_GROUP_LABELS: Record<ChildAgeGroup, string> = {
  infant: 'Infant Nurture (0–18 months)',
  toddler: 'Toddler Discovery Studio (19 months–3 years)',
  preschool: 'Early Learning & Preschool (3–4.5 years)',
  schoolage: 'Kindergarten & Out-of-School Care (4.5–12 years)'
};

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  // ================= OFFICIAL CAMROSE LITTLE ANGELS POLICIES =================
  {
    id: 'spaces-availability-ages',
    classification: 'official',
    topic: 'Ages Accepted & Spaces Availability',
    sourceCitation: 'Official Camrose Little Angels Policy (§1.3–1.4, §2.1–2.3 Requirements)',
    phrases: [
      'spaces available',
      'seat availability',
      'spots available',
      'available places',
      'any openings',
      'waitlist',
      'ages accepted',
      'youngest age',
      'how old',
      'age group'
    ],
    keywords: [
      'space',
      'spaces',
      'spot',
      'spots',
      'seat',
      'seats',
      'availability',
      'available',
      'opening',
      'openings',
      'vacancy',
      'age',
      'ages',
      'youngest',
      'infant',
      'newborn',
      'toddler',
      'preschool',
      'kindergarten',
      'schoolage',
      'ratio',
      'ratios',
      'months',
      'years'
    ],
    answer:
      'Camrose Little Angels Daycare Society welcomes children from infancy (0 months) through 12 years old across four licensed classrooms. Because classroom openings vary by age group and preferred start date, we do not display live spot counts here—please call/text Director/Owner Syed Faran at (780) 678-0701 or submit a tour/registration request to confirm current spots.',
    ageTailoredNotes: {
      infant:
        'Based on what you shared about your infant, they would fit our Infant Nurture Program (0–18 months, 1:3 to 1:4 ratio) with a quiet dedicated sleep room and daily digital feed/sleep logs.',
      toddler:
        'Based on what you shared about your toddler, they would fit our Toddler Discovery Studio (19 months–3 years, 1:6 ratio) featuring potty-training collaboration and an indoor movement zone.',
      preschool:
        'For preschool age (3–4.5 years), our Early Learning & Preschool room runs at a 1:8 educator ratio with Montessori & Reggio-inspired play-based learning.',
      schoolage:
        'For school age (4.5–12 years), our Kindergarten & Out-of-School Care (1:10 to 1:15 ratio) supports before/after school routines, PD days, and our own school bus transportation add-on ($50/month between all schools inside Camrose and the daycare).'
    },
    followUpDetails:
      'When checking spots with Syed Faran, it helps to mention your child’s birth date, preferred start date, and whether you need full-time (Mon–Fri) or before/after school care. You can also book a 25–30 minute tour first to see the classroom.',
    highlights: [
      'Infant Nurture: 0 – 18 months (youngest age accepted: newborn infancy; 1:3 to 1:4 ratio)',
      'Toddler Discovery Studio: 19 months – 3 years (1:6 educator ratio)',
      'Early Learning & Preschool: 3 – 4.5 years (1:8 educator ratio)',
      'Kindergarten & Out-of-School Care: 4.5 – 12 years (1:10 to 1:15 ratio)'
    ],
    followUps: [
      { id: 'f-fees', label: 'How do fees & grants work?', query: 'How do Alberta $10/Day grants, subsidies, and fees work?' },
      { id: 'f-sep', label: 'Tips for easing first day', query: 'How can I ease first-day separation anxiety for my child?' },
      { id: 'f-reg', label: 'What does registration need?', query: 'How do I register my child and what deposit or documents are needed?' }
    ],
    actions: [
      { label: 'Call (780) 678-0701', type: 'call' },
      { label: 'Book a Tour', type: 'tour' },
      { label: 'Open Register Now', type: 'register' }
    ]
  },
  {
    id: 'hours-schedules',
    classification: 'official',
    topic: 'Opening Days, Shift Hours & Holidays',
    sourceCitation: 'Official Camrose Little Angels Policy (§1.5 Requirements & Daily Schedule)',
    phrases: [
      'opening hours',
      'operating hours',
      'what time do you open',
      'what time do you close',
      'shift work',
      'early drop off',
      'statutory holidays',
      'weekends'
    ],
    keywords: [
      'hour',
      'hours',
      'open',
      'opening',
      'close',
      'closing',
      'time',
      'timing',
      'timings',
      'schedule',
      'schedules',
      'monday',
      'friday',
      'weekend',
      'weekends',
      'holiday',
      'holidays',
      'pickup',
      'pick-up',
      'dropoff',
      'drop-off',
      'routine',
      'nap'
    ],
    answer:
      'We are open Monday through Friday from 6:00 AM to 6:30 PM (closed weekends and Alberta statutory holidays). These extended hours are intentionally set up to support healthcare professionals, agricultural families, and early or late shift schedules in Camrose.',
    ageTailoredNotes: {
      infant: 'In the Infant room, babies follow their own individual feeding and sleep rhythms alongside our 6:00 AM – 6:30 PM centre window.',
      toddler: 'In Toddler Discovery, children ease in with cozy early arrivals (6:00–8:30 AM) and enjoy an afternoon rest window from 12:30 PM – 2:30 PM.',
      preschool: 'Preschoolers follow morning circle time (8:30 AM), outdoor recess, hot lunch (11:30 AM), quiet rest or calm table puzzles (12:30–2:30 PM), and late-afternoon STEM play.'
    },
    followUpDetails:
      'Parents dropping off before 8:30 AM can take advantage of our gentle arrival window with soft music, cozy reading corners, and a wholesome morning snack at 8:30 AM. Remember to inform a staff member and sign your child IN and OUT each day.',
    highlights: [
      '6:00 AM – 8:30 AM: Early shift arrival & morning breakfast snack',
      '8:30 AM – 11:30 AM: Circle time, play-based discovery & outdoor recess',
      '11:30 AM – 12:30 PM: Hot cooked lunch | 12:30 PM – 2:30 PM: Rest & naptime',
      '3:30 PM – 6:30 PM: Afternoon STEM, maker stations & flexible pick-up'
    ],
    followUps: [
      { id: 'f-shift-tips', label: 'Camrose shift routine tips', query: 'Tips for raising kids and handling shift work routines in Camrose' },
      { id: 'f-meals', label: 'What meals are served?', query: 'What meals and snacks are provided and how are allergies handled?' },
      { id: 'f-pack', label: 'What to pack for day 1', query: 'What should I pack for my child in Alberta seasons?' }
    ],
    actions: [
      { label: 'Book a Tour', type: 'tour' },
      { label: 'Open Register Now', type: 'register' }
    ]
  },
  {
    id: 'fees-subsidy-discounts',
    classification: 'official',
    topic: 'Alberta $10/Day Grant, Subsidies, Fees & Discounts',
    sourceCitation: 'Official Camrose Little Angels Policy (§1.6 Requirements & Registration Agreement)',
    phrases: [
      'fee structure',
      'monthly fee',
      'fee discounts',
      'affordability grant',
      '10/day',
      '10 a day',
      'childcare subsidy',
      'registration deposit',
      'when are fees due',
      'payment due'
    ],
    keywords: [
      'fee',
      'fees',
      'cost',
      'costs',
      'price',
      'pricing',
      'tuition',
      'invoice',
      'pay',
      'payment',
      'discount',
      'discounts',
      'subsidy',
      'subsidies',
      'subsidized',
      'grant',
      'grants',
      'affordability',
      '10/day',
      'deposit',
      'refund',
      'refundable',
      'monthly',
      '1st',
      'notice',
      'arrears'
    ],
    answer:
      'Camrose Little Angels Daycare participates in the Canada-Alberta Early Learning and Child Care ($10/Day) Affordability Grant program. Eligible families with children under kindergarten age receive automatic provincial fee reductions directly on their monthly invoice, and qualifying families (household income under $180,000) can apply for additional provincial subsidies. For exact current classroom rates or family discounts, please call/text Director Syed Faran at (780) 678-0701 or use the Subsidy Estimator.',
    followUpDetails:
      'Under our Registration Agreement: a $100 deposit is required at enrollment (refundable when at least 4 weeks’ written notice is provided before withdrawal), monthly fees are payable in full on the 1st of every month, and families receiving subsidy must report employment or school enrollment changes promptly to the subsidy office.',
    highlights: [
      'Registration Deposit: $100 deposit (refundable with at least 4 weeks’ written notice before leaving)',
      'Billing Schedule: Monthly fees are payable in full on the 1st of each month',
      'Withdrawal Policy: 4 weeks’ advance written notice is required prior to leaving',
      'Subsidy Changes: Subsidized families must submit a change of information form to the subsidy office if employment/school changes'
    ],
    followUps: [
      { id: 'f-reg2', label: 'How does registration work?', query: 'How do I register my child and what deposit or documents are needed?' },
      { id: 'f-spaces2', label: 'Check age groups accepted', query: 'What ages do you accept and are spaces available?' },
      { id: 'f-contact2', label: 'How to contact Director', query: 'Where are you located and how can I contact the director?' }
    ],
    actions: [
      { label: 'Estimate Subsidy', type: 'subsidy' },
      { label: 'Call (780) 678-0701', type: 'call' },
      { label: 'Open Register Now', type: 'register' }
    ]
  },
  {
    id: 'registration-admission',
    classification: 'official',
    topic: 'Admissions, Registration & Required Checklist',
    sourceCitation: 'Official Camrose Little Angels Policy (Registration Packet & Parent Checklist)',
    phrases: [
      'how to register',
      'how do i enroll',
      'admission form',
      'admission requirements',
      'parent checklist',
      'required documents'
    ],
    keywords: [
      'register',
      'registration',
      'enroll',
      'enrol',
      'enrollment',
      'enrolment',
      'admission',
      'admissions',
      'apply',
      'application',
      'packet',
      'form',
      'forms',
      'document',
      'documents',
      'intake',
      'immunization',
      'immunizations',
      'custody',
      'checklist',
      'consent',
      'consents',
      'waiver'
    ],
    answer:
      'You can complete the full packet online through the Register Now button or schedule an in-person tour first to review forms together. The packet collects child/parent intake details, emergency contacts (other than a parent), custody/immunization info, consents (Emergency Procedures, Media, and Charlie Killam School Playground / Byer’s Park), and the $100 registration deposit agreement.',
    followUpDetails:
      'Clicking any Register Now button opens our official Kinderlogix online registration portal in a new tab so you can complete your child’s application directly, or call/text Director Syed Faran at (780) 678-0701 if you would like help during a tour.',
    highlights: [
      'First Day Essentials: 2 labeled extra outfits, clean indoor shoes left at the centre, weather gear, nap blanket & spill-proof bottle',
      'Health Records: Updated immunization records & alternate emergency contact number (not your own)',
      'Daily Procedure: Always let staff know on arrival/pickup and sign your child IN/OUT daily'
    ],
    followUps: [
      { id: 'f-pack2', label: 'Seasonal packing advice', query: 'What should I pack for my child in Alberta seasons?' },
      { id: 'f-sep2', label: 'First-day transition tips', query: 'How can I ease first-day separation anxiety for my child?' },
      { id: 'f-safety2', label: 'Safety & pickup rules', query: 'What are your safety, sick policy, and pickup security rules?' }
    ],
    actions: [
      { label: 'Open Register Now', type: 'register' },
      { label: 'Book a Tour', type: 'tour' },
      { label: 'Parent Handbook', type: 'handbook' }
    ]
  },
  {
    id: 'meals-nutrition-allergies',
    classification: 'official',
    topic: 'Fresh Meals, Snacks & Allergy Care',
    sourceCitation: 'Official Camrose Little Angels Policy (Daily Nutrition Menu & Handbook)',
    phrases: [
      'meals and food',
      'food provided',
      'hot lunch',
      'snacks provided',
      'nut free',
      'nut-free',
      'food allergies',
      'dietary restrictions'
    ],
    keywords: [
      'meal',
      'meals',
      'food',
      'lunch',
      'breakfast',
      'snack',
      'snacks',
      'menu',
      'kitchen',
      'nutrition',
      'milk',
      'water',
      'allergy',
      'allergies',
      'allergic',
      'nut',
      'nuts',
      'peanut',
      'gluten',
      'dairy',
      'vegetarian',
      'diet',
      'dietary'
    ],
    answer:
      'Yes! Nutritious meals are prepared fresh in-house daily following Canada’s Food Guide in our inspected commercial kitchen—including morning snack (8:30 AM), hot cooked lunch (11:30 AM), and afternoon snack with fresh fruit (3:00 PM), plus filtered drinking water and milk.',
    followUpDetails:
      'Children eat family-style at the table to practice social conversation and gentle independence. We maintain a 100% nut-aware/nut-free facility and support dairy-free, gluten-free, egg, vegetarian, and documented allergies—plus our registration packet includes an Allergy/Food Restriction Removal form if dietary needs change later.',
    highlights: [
      '100% Nut-Aware / Nut-Free facility',
      'Accommodates dairy-free, gluten-free, egg, vegetarian, and documented dietary restrictions',
      'Monday–Friday meals include French baguettes, pancakes, pasta, meatballs, chicken strips/nuggets, hot dogs, pierogies, soy chunks, vegetables, yogurt, cheese, crackers, wafers, cookies, cereals and juice'
    ],
    followUps: [
      { id: 'f-toddler-tr', label: 'Feeding & nap transitions', query: 'How do nap, feeding, and potty training transitions work?' },
      { id: 'f-meds', label: 'Medication & health rules', query: 'What are your safety, sick policy, and pickup security rules?' },
      { id: 'f-hours2', label: 'Daily routine schedule', query: 'What are your opening hours and shift drop-off options?' }
    ],
    actions: [
      { label: 'Open Register Now', type: 'register' },
      { label: 'Book a Tour', type: 'tour' }
    ]
  },
  {
    id: 'bus-transportation-schools',
    classification: 'official',
    topic: 'Daycare School Bus Transportation ($50/Month Add-On)',
    sourceCitation: 'Official Camrose Little Angels Policy (School Bus & Transit Guide)',
    phrases: [
      'school bus',
      'transportation availability',
      'bus pickup',
      'bus stop',
      'before and after school',
      'which schools',
      'bus fee',
      '50/month',
      '$50'
    ],
    keywords: [
      'bus',
      'buses',
      'transport',
      'transportation',
      'transit',
      'school',
      'schools',
      'add-on',
      'addon',
      '50',
      'before',
      'after',
      'osc'
    ],
    answer:
      'Yes! Camrose Little Angels Daycare has its own school bus and offers transportation as an optional add-on for $50/month between all schools inside Camrose and the daycare for Kindergarten and Out-of-School Care (4.5–12 years) students.',
    followUpDetails:
      'To add our $50/month school bus service for your child or confirm route timings for your Camrose school, please call/text Director Syed Faran at (780) 678-0701 or ask during your tour.',
    highlights: [
      'Dedicated Daycare School Bus: Operated directly by Camrose Little Angels Daycare Society',
      'Add-On Rate: $50/month between school and the daycare',
      'All Camrose Schools: Available for all schools inside Camrose',
      'Supervised Before & After School Care: Safe boarding and arrival'
    ],
    followUps: [
      { id: 'f-camrose2', label: 'Camrose school readiness tips', query: 'How does play-based learning prepare children for school?' },
      { id: 'f-hours3', label: 'After-school pickup hours', query: 'What are your opening hours and shift drop-off options?' }
    ],
    actions: [
      { label: 'Call (780) 678-0701', type: 'call' },
      { label: 'Book a Tour', type: 'tour' }
    ]
  },
  {
    id: 'facilities-playgrounds-gym',
    classification: 'official',
    topic: 'Indoor Play Zones, Playgrounds & Weather Policy',
    sourceCitation: 'Official Camrose Little Angels Policy (Programs & Registration Weather Policy)',
    phrases: [
      'indoor gym',
      'outside playground',
      'outdoor playground',
      'byers park',
      'charlie killam',
      'weather policy'
    ],
    keywords: [
      'gym',
      'indoor',
      'outdoor',
      'outside',
      'playground',
      'playgrounds',
      'yard',
      'park',
      'charlie',
      'killam',
      'byer',
      'byers',
      'weather',
      'windchill',
      'cold',
      'hot',
      'humidex',
      'aqi',
      'air',
      'activities',
      'facilities',
      'facility',
      'steam'
    ],
    answer:
      'Children enjoy dedicated indoor active movement/maker zones inside the centre plus our fenced outdoor cedar discovery yards on-site. With parent consent, classrooms also have supervised daily access to Charlie Killam School Playground and Byer’s Park under Alberta Childcare Licensing guidelines (we have indoor active movement zones rather than a separate full-size school gym).',
    followUpDetails:
      'Our educators actively follow Alberta Weather & Air Quality cut-offs so kids stay safe during Camrose cold snaps or hot summers—moving active play indoors when windchill, humidex, or smoke crosses licensed thresholds.',
    highlights: [
      'Winter Cut-Off (Windchill): Daycare stays indoors colder than -20°C (OSC colder than -25°C) or gusts > 40 km/h',
      'Summer Cut-Off (Humidex): Daycare stays indoors hotter than +27°C (OSC hotter than +30°C)',
      'Air Quality: All children remain indoors when Air Quality Index reaches 5 or higher'
    ],
    followUps: [
      { id: 'f-pack3', label: 'Winter & summer packing tips', query: 'What should I pack for my child in Alberta seasons?' },
      { id: 'f-play3', label: 'Play-based learning benefits', query: 'How does play-based learning prepare children for school?' }
    ],
    actions: [
      { label: 'Book a Tour', type: 'tour' },
      { label: 'Parent Handbook', type: 'handbook' }
    ]
  },
  {
    id: 'safety-staff-health',
    classification: 'official',
    topic: 'Safety, Certified Staff, Wellness & Medication Rules',
    sourceCitation: 'Official Camrose Little Angels Policy (Parent Handbook & Safety Standards)',
    phrases: [
      'safety and staff',
      'sick policy',
      'illness policy',
      'medication approval',
      'pick up security',
      'authorized pickup',
      'first aid'
    ],
    keywords: [
      'safe',
      'safety',
      'secure',
      'security',
      'keycode',
      'keypad',
      'door',
      'staff',
      'educator',
      'educators',
      'teacher',
      'teachers',
      'certified',
      'criminal',
      'police',
      'first',
      'aid',
      'cpr',
      'sick',
      'illness',
      'fever',
      'vomit',
      'vomiting',
      'wellness',
      'health',
      'medication',
      'medicine',
      'handbook',
      'policies',
      'policy',
      'signout',
      'authorized',
      'id'
    ],
    answer:
      'Our facility features keycode-secured access doors, daily staff sign-in/out, photo ID verification for authorized pick-up adults (18+), and commercial-grade daily sanitization. Every educator holds Level 1, 2, or 3 Early Childhood Certification, clean criminal/vulnerable sector checks, and pediatric First Aid / CPR-C.',
    followUpDetails:
      'Please keep children home if they are sick—children must meet the 24-hour symptom-free window for fever or vomiting before returning. If someone else is picking up your child, please list them as authorized and phone ahead so staff can verify photo ID smoothly.',
    highlights: [
      'Wellness / Sick Rule: 24-hour symptom-free policy for fever or vomiting',
      'Medication Policy: Staff cannot administer any medication without written parent approval & original labeled container',
      'Emergency Contacts: Always maintain an alternate emergency contact number (other than parent phones) on file'
    ],
    followUps: [
      { id: 'f-handbook2', label: 'See Parent Handbook', query: 'How do I register my child and what deposit or documents are needed?' },
      { id: 'f-location2', label: 'Location & contact info', query: 'Where are you located and how can I contact the director?' }
    ],
    actions: [
      { label: 'Parent Handbook', type: 'handbook' },
      { label: 'Open Register Now', type: 'register' }
    ]
  },
  {
    id: 'location-contact-tour',
    classification: 'official',
    topic: 'Location, Contact & Booking an In-Person Tour',
    sourceCitation: 'Official Camrose Little Angels Policy (§1.1–1.2, §3.3 Requirements & Contact Hub)',
    phrases: [
      'where are you located',
      'address',
      'directions',
      'phone number',
      'contact person',
      'director',
      'book a visit',
      'book a tour',
      'schedule a tour'
    ],
    keywords: [
      'address',
      'location',
      'where',
      'map',
      'directions',
      'ave',
      'avenue',
      'phone',
      'call',
      'text',
      'email',
      'contact',
      'syed',
      'faran',
      'director',
      'owner',
      'tour',
      'visit',
      'appointment',
      'orientation',
      'speak',
      'talk'
    ],
    answer:
      'Camrose Little Angels Daycare Society is located at 4907 47 Street, Camrose, AB, T4V 1J9 (with parent drop-off parking). You can reach Director/Owner Syed Faran directly by call/text at (780) 678-0701 or email littleangels@camrosecare.ca, or book a 25–30 minute in-person tour right here.',
    followUpDetails:
      'During a family tour, you’ll get to meet our Level 1–3 educators, walk through your child’s age-specific classroom and outdoor discovery yard, and ask any questions about schedules or Alberta Affordability Grants.',
    highlights: [
      'Address: 4907 47 Street, Camrose, AB, T4V 1J9',
      'Director / Owner: Syed Faran',
      'Phone / Text: (780) 678-0701 | Email: littleangels@camrosecare.ca',
      'Tour Duration: Typically 25–30 minutes to explore rooms & review enrollment'
    ],
    followUps: [
      { id: 'f-spaces3', label: 'Which age rooms do you have?', query: 'What ages do you accept and are spaces available?' },
      { id: 'f-sep3', label: 'How to prep for Day 1', query: 'How can I ease first-day separation anxiety for my child?' }
    ],
    actions: [
      { label: 'Book a Tour', type: 'tour' },
      { label: 'Call (780) 678-0701', type: 'call' },
      { label: 'Email Director', type: 'email' }
    ]
  },
  {
    id: 'reggio-emilia-curriculum-philosophy',
    classification: 'official',
    topic: 'Our Reggio Emilia Approach & Preschool Curriculum (Ages 3–6)',
    sourceCitation: 'Official Camrose Little Angels Program & Philosophy (Reggio Emilia Approach)',
    phrases: [
      'reggio emilia',
      'reggio approach',
      'your curriculum',
      'preschool curriculum',
      'preschool learning',
      'what curriculum',
      'learning philosophy',
      'our philosophy',
      'child-centered learning',
      'child centered learning',
      'environment as third teacher',
      'emergent curriculum',
      'project-based learning',
      'project based learning',
      'loris malaguzzi',
      'play as essential learning'
    ],
    keywords: [
      'reggio',
      'emilia',
      'curriculum',
      'philosophy',
      'approach',
      'pedagogy',
      'malaguzzi',
      'emergent',
      'project',
      'projects',
      'project-based',
      'collaborative',
      'collaboration',
      'facilitator',
      'co-learner',
      'inquiry',
      'inquiry-driven',
      'studio',
      'sensory',
      'curiosity',
      'creativity',
      'preschool',
      'dramatic'
    ],
    answer:
      'Camrose Little Angels Daycare Society follows the Reggio Emilia Approach (especially across Ages 3–6)—nurturing curiosity, creativity, and collaboration through Child-Centered Learning that respects each child, honors their voice, and supports learning through discovery. Inspired by Loris Malaguzzi (“There are three teachers of children: adults, other children, and their physical environment”), our educators serve as co-learners, collaborators, and facilitators.',
    ageTailoredNotes: {
      infant:
        'Even in our Infant Nurture room (0–18 months), educators honor each baby’s individual voice and rhythm through calm, sensory-rich spaces and natural materials.',
      toddler:
        'In Toddler Discovery Studio (19 months–3 years), children explore open-ended sensory provocations, music, and early collaborative play that bridge naturally into our Preschool Reggio studio.',
      preschool:
        'For Preschool (Ages 3–6), our daily rhythm brings all 6 Reggio Emilia pillars to life: an intentional studio environment (art studio, natural materials, sensory, building, science & dramatic play), emergent curriculum driven by children’s curiosity, and deep inquiry-driven projects.',
      schoolage:
        'For Kindergarten and Out-of-School Care (4.5–12 years), children apply project-based critical thinking, teamwork, and creative maker studio exploration before and after school.'
    },
    followUpDetails:
      'Our 6 core Reggio Emilia pillars work together in a safe, warm, inclusive community: (1) Environment as Third Teacher (art studio, natural materials, sensory, building, science & dramatic play), (2) Collaborative Learning (Ages 3–6 teamwork & community), (3) Emergent Curriculum adapting to children’s interests, (4) Teacher as Co-learner / Collaborator / Facilitator, (5) Project-Based Learning building critical thinking & problem-solving, and (6) Play as Essential Learning for holistic development and joyful learning.',
    highlights: [
      'Core Foundation: Child-Centered Learning — respecting the child, honoring their voice, learning through discovery',
      'Environment as Third Teacher: Art studio, natural materials, sensory, building, science & dramatic play spaces',
      'Emergent Curriculum & Project-Based Learning: Adapts to curiosities to build critical thinking & problem-solving',
      'Teacher as Co-learner / Facilitator + Collaborative Learning (Ages 3–6) + Play as Essential Learning'
    ],
    followUps: [
      { id: 'reg-ages', label: 'Ages accepted & classroom ratios', query: 'What ages do you accept and are spaces available?' },
      { id: 'reg-play', label: 'Play & school readiness', query: 'How does play-based learning prepare children for school?' },
      { id: 'reg-tour', label: 'Tour our Preschool studio', query: 'Where are you located and how can I contact the director?' }
    ],
    actions: [
      { label: 'Book a Tour', type: 'tour' },
      { label: 'Parent Handbook', type: 'handbook' },
      { label: 'Open Register Now', type: 'register' }
    ]
  },

  // ================= GENERAL CHILDCARE & PARENTING GUIDANCE =================
  {
    id: 'separation-anxiety-readiness',
    classification: 'guidance',
    topic: 'Easing First-Day Transitions & Separation Anxiety',
    sourceCitation: 'General Childcare & Parenting Guidance',
    phrases: [
      'separation anxiety',
      'first day tips',
      'crying at drop off',
      'easing first-day',
      'prepare my child',
      'transition to daycare',
      'nervous about daycare',
      'shy child'
    ],
    keywords: [
      'separation',
      'anxiety',
      'crying',
      'cry',
      'tears',
      'first-day',
      'transition',
      'adjust',
      'adjusting',
      'settling',
      'nervous',
      'scared',
      'shy',
      'goodbye',
      'clingy',
      'attach',
      'attachment',
      'readiness',
      'prepare'
    ],
    answer:
      'It is completely normal for young children (and parents!) to feel a mix of excitement and tears during the first 1–3 weeks of daycare. Consistent, warm, and predictable goodbyes help children build trust quickly with their classroom educators.',
    ageTailoredNotes: {
      infant:
        'For babies (0–18 mos), sharing your home feeding/nap cues and bringing a familiar small comfort blanket helps caregivers mirror home rhythms gently.',
      toddler:
        'For toddlers (19 mos–3 yrs), a short playful goodbye ritual—like a high-five at the cubby or handing them directly to their teacher—works much better than sneaking away or lingering.',
      preschool:
        'For preschoolers (3–4.5 yrs), reading picture books about school beforehand and letting them pick their backpack or indoor shoes builds a sense of pride and readiness.'
    },
    followUpDetails:
      'Most toddlers settle within minutes once engaged with sensory play or breakfast friends. Keeping a brief, cheerful farewell routine teaches your child that morning drop-offs are safe and that you always come back at pick-up.',
    highlights: [
      'Practice short goodbye rituals: keep farewells warm, confident, and brief (avoid sneaking out)',
      'Visit together first: touring the classroom ahead of time turns an unfamiliar space into a friendly place',
      'Bring a comfort item: a labeled small blanket or cuddly toy is welcome for nap/rest time',
      'Talk positively about pickup: link pickup to a concrete routine (e.g., "I’ll be back right after afternoon snack!")'
    ],
    followUps: [
      { id: 'g-pack', label: 'What should we pack?', query: 'What should I pack for my child in Alberta seasons?' },
      { id: 'g-play', label: 'How play-based learning helps', query: 'How does play-based learning prepare children for school?' },
      { id: 'g-tour', label: 'Visit classrooms in person', query: 'Where are you located and how can I contact the director?' }
    ],
    actions: [
      { label: 'Book a Tour', type: 'tour' },
      { label: 'Open Register Now', type: 'register' }
    ]
  },
  {
    id: 'toddler-transitions-routines',
    classification: 'guidance',
    topic: 'Nap, Feeding & Potty-Training Transitions',
    sourceCitation: 'General Childcare & Parenting Guidance',
    phrases: [
      'potty training',
      'toilet training',
      'nap transition',
      'feeding transition',
      'one nap',
      'weaning',
      'sleep routine'
    ],
    keywords: [
      'potty',
      'toilet',
      'diaper',
      'diapers',
      'pull-ups',
      'napping',
      'naptime',
      'sleep',
      'sleeping',
      'bottle',
      'cup',
      'feeding',
      'wean',
      'weaning',
      'pacifier',
      'soother',
      'milestone',
      'milestones',
      'routines'
    ],
    answer:
      'Big toddler milestones—like moving toward an open cup, dropping to one afternoon nap, or starting potty learning—go smoothest when home and daycare follow calm, pressure-free cues together.',
    ageTailoredNotes: {
      infant:
        'For infants, group rooms generally accommodate individualized two-nap and bottle/puree schedules until your baby naturally shows signs of transitioning.',
      toddler:
        'In toddlerhood, children often settle smoothly into one post-lunch rest window because peer rhythm makes group napping feel natural—and educators follow parents’ lead once dry-diaper readiness signs appear.',
      preschool:
        'For preschoolers who have outgrown daytime naps, quiet rest alternatives (books, puzzles, calm table toys) help recharge energy without frustration.'
    },
    followUpDetails:
      'For potty learning, easy pull-down elastic waist pants and 2–3 extra labeled changes of clothes make accidents stress-free while children build confidence at their own pace.',
    highlights: [
      'Wait for readiness cues (staying dry 2+ hours, showing interest) before pushing potty training',
      'Dress toddlers in simple elastic-waist bottoms for quick independent bathroom success',
      'Keep nap routines steady on weekends to help Monday mornings feel effortless',
      'Communicate home sleep/appetite notes at drop-off so educators can adjust gently'
    ],
    followUps: [
      { id: 'g-sep2', label: 'Easing morning drop-offs', query: 'How can I ease first-day separation anxiety for my child?' },
      { id: 'g-meals2', label: 'See daycare meal schedule', query: 'What meals and snacks are provided and how are allergies handled?' },
      { id: 'g-reg3', label: 'Start registration packet', query: 'How do I register my child and what deposit or documents are needed?' }
    ],
    actions: [
      { label: 'Book a Tour', type: 'tour' },
      { label: 'Parent Handbook', type: 'handbook' }
    ]
  },
  {
    id: 'play-based-learning-social',
    classification: 'guidance',
    topic: 'Play-Based Learning, Language & Social Readiness',
    sourceCitation: 'General Childcare & Parenting Guidance',
    phrases: [
      'play-based learning',
      'play based learning',
      'social emotional',
      'social-emotional',
      'kindergarten readiness',
      'prepare for school',
      'flight framework',
      'montessori',
      'speech development'
    ],
    keywords: [
      'play',
      'play-based',
      'learning',
      'learn',
      'flight',
      'montessori',
      'social',
      'emotional',
      'sharing',
      'friends',
      'language',
      'speech',
      'talking',
      'vocabulary',
      'behavior',
      'behaviour',
      'development',
      'steam',
      'literacy',
      'counting',
      'skills'
    ],
    answer:
      'Alberta’s Flight early learning framework emphasizes play-based, relationship-driven discovery—where sensory bins, block engineering, storytelling, and pretend play naturally teach foundational literacy, early math, and emotional self-regulation.',
    ageTailoredNotes: {
      infant:
        'For babies, play-based care looks like tummy-time sensory mats, responsive singing, peek-a-boo turn-taking, and warm verbal narration that lays the groundwork for speech.',
      toddler:
        'For toddlers, pouring, scooping, music circles, and parallel play help expand vocabulary and practice gentle feelings naming ("my turn", "wait", "happy").',
      preschool:
        'For preschoolers, collaborative dramatic play, phonics games, nature magnifying explorations, and guided conflict resolution build the confidence needed for Kindergarten.'
    },
    followUpDetails:
      'Children learn lifelong school-readiness skills—like listening in small circles, taking turns, zipping coats, and solving simple puzzles—much deeper through joyful hands-on play than through passive worksheets.',
    highlights: [
      'Social-Emotional Growth: Practicing turn-taking, empathy, and naming big feelings with supportive teachers',
      'Pre-Literacy & Numeracy: Building vocabulary through songs/stories and sorting/counting with loose parts',
      'Physical & Creative Skills: Fine-motor strength from clay, paintbrushes, and wooden blocks plus outdoor gross-motor play'
    ],
    followUps: [
      { id: 'g-bus2', label: 'School bus ($50/mo add-on)', query: 'Which elementary schools do you offer school bus transportation for?' },
      { id: 'g-spaces3', label: 'Explore our age classrooms', query: 'What ages do you accept and are spaces available?' }
    ],
    actions: [
      { label: 'Book a Tour', type: 'tour' },
      { label: 'Open Register Now', type: 'register' }
    ]
  },
  {
    id: 'alberta-seasonal-packing',
    classification: 'guidance',
    topic: 'Alberta Seasonal Clothing & Daycare Packing Tips',
    sourceCitation: 'General Childcare & Parenting Guidance (+ Centre Packing Checklist)',
    phrases: [
      'what to pack',
      'what should i pack',
      'alberta seasons',
      'winter clothes',
      'winter gear',
      'indoor shoes',
      'layering clothes',
      'first day bag'
    ],
    keywords: [
      'pack',
      'packing',
      'bring',
      'clothing',
      'clothes',
      'dress',
      'layer',
      'layers',
      'shoes',
      'boots',
      'snowsuit',
      'mittens',
      'mitts',
      'gloves',
      'hat',
      'sunhat',
      'sunscreen',
      'backpack',
      'bag',
      'label',
      'labeled',
      'season',
      'seasons',
      'winter',
      'summer',
      'spring',
      'fall',
      'mud'
    ],
    answer:
      'Dressing kids for Central Alberta’s fast-changing weather is all about breathable layers, easy-on footwear, and waterproof outerwear so they can enjoy outdoor discovery comfortably year-round.',
    ageTailoredNotes: {
      infant: 'For infants and crawlers, pack cozy footless sleepers or grippy socks plus 2–3 extra outfits and seasonal pram/stroller blankets.',
      toddler: 'For toddlers, velcro or slip-on indoor sneakers and waterproof mitts (rather than finger gloves) make getting out to the yard quick and tear-free.',
      preschool: 'For preschoolers, practicing coat zips and boot pulls together at home builds awesome morning independence.'
    },
    followUpDetails:
      'Every item brought to Camrose Little Angels (coats, mitts, water bottles, indoor shoes, and spare clothes) should be clearly labeled with your child’s name—and remember indoor shoes stay permanently at the centre so floors remain clean and safe for active play.',
    highlights: [
      'Fall / Winter (Camrose): Insulated snowsuit, waterproof mittens (easier than fingered gloves for young kids), neck warmer, warm toque & winter boots',
      'Spring / Summer: Breathable cotton layers, wide-brim sun hat, splash-proof boots for puddles, and labeled refillable water bottle',
      'Year-Round Cubby Staples: 2 full labeled extra outfits (including socks/underwear) + clean non-marking velcro/slip-on indoor shoes'
    ],
    followUps: [
      { id: 'g-weather', label: 'Daycare winter & heat cut-offs', query: 'What is your outdoor playground and weather cut-off policy?' },
      { id: 'g-reg4', label: 'Review full parent checklist', query: 'How do I register my child and what deposit or documents are needed?' }
    ],
    actions: [
      { label: 'Parent Handbook', type: 'handbook' },
      { label: 'Open Register Now', type: 'register' }
    ]
  },
  {
    id: 'camrose-family-living',
    classification: 'guidance',
    topic: 'Raising Kids & Shift-Work Routines in Camrose, AB',
    sourceCitation: 'General Childcare & Parenting Guidance (Camrose Community Context)',
    phrases: [
      'raising kids in camrose',
      'living in camrose',
      'shift work routines',
      'shift worker',
      'camrose community',
      'hospital shifts',
      'new to camrose',
      'camrose schools'
    ],
    keywords: [
      'camrose',
      'alberta',
      'community',
      'raising',
      'living',
      'moved',
      'moving',
      'family',
      'families',
      'parenting',
      'shift',
      'shifts',
      'nurse',
      'nursing',
      'hospital',
      'commute',
      'grocery',
      'downtown',
      'parks',
      'balance',
      'morning',
      'routine'
    ],
    answer:
      'Camrose is a welcoming, close-knit Central Alberta community—with walkable parks like Byer’s Park and Mirror Lake paths, local schools nearby, and many healthcare (St. Mary’s Hospital), agriculture, and trades families balancing early or rotating shifts.',
    followUpDetails:
      'To keep mornings peaceful when you work a 6:30 AM or 7:00 AM shift: pack cubby clothes and backpacks the night before, keep breakfast light or let your child join our 8:30 AM morning snack at daycare, and aim for a quick, calm drop-off between 6:00 AM and 8:30 AM.',
    highlights: [
      'Prep the night before: lay out indoor/outdoor layers and spare clothes so 6:00 AM mornings stay calm and unhurried',
      'Central location advantage: 4907 47 Street in Camrose offers convenient access to downtown routes and commuting corridors to St. Mary’s Hospital',
      'Smooth local school transitions: Camrose families can add our own daycare school bus ($50/month) for transportation between all schools inside Camrose and the daycare',
      'Community connection: Joining local family tours and chatting with other Camrose parents at pick-up helps newcomers build a trusted village fast'
    ],
    followUps: [
      { id: 'g-hours4', label: 'Centre 6:00 AM – 6:30 PM hours', query: 'What are your opening hours and shift drop-off options?' },
      { id: 'g-bus3', label: 'School bus ($50/mo add-on)', query: 'Which schools does your school bus cover?' },
      { id: 'g-tour4', label: 'Book a Tour in Camrose', query: 'Where are you located and how can I contact the director?' }
    ],
    actions: [
      { label: 'Book a Tour', type: 'tour' },
      { label: 'Call (780) 678-0701', type: 'call' }
    ]
  }
];

const STOP_WORDS = new Set([
  'a',
  'an',
  'the',
  'is',
  'are',
  'am',
  'was',
  'were',
  'be',
  'been',
  'do',
  'does',
  'did',
  'can',
  'could',
  'would',
  'should',
  'will',
  'have',
  'has',
  'had',
  'i',
  'you',
  'we',
  'they',
  'my',
  'our',
  'your',
  'what',
  'when',
  'where',
  'which',
  'who',
  'how',
  'why',
  'in',
  'on',
  'at',
  'to',
  'for',
  'of',
  'with',
  'and',
  'or',
  'about',
  'there',
  'here',
  'this',
  'that',
  'please',
  'tell',
  'me',
  'know',
  'any',
  'if',
  'it',
  'get',
  'got',
  'tips',
  'advice',
  'help'
]);

function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (Math.abs(m - n) > 2) return 3;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

function extractAgeGroupFromText(normalized: string): {
  ageGroup?: ChildAgeGroup;
  ageMention?: string;
} {
  if (/\b(newborn|infant|baby)\b/.test(normalized)) {
    return { ageGroup: 'infant', ageMention: 'Infant (0–18 mos)' };
  }
  const monthMatch = normalized.match(/\b(\d{1,2})\s*(?:month|months|mo|mos)\b/);
  if (monthMatch) {
    const months = parseInt(monthMatch[1], 10);
    if (months <= 18) return { ageGroup: 'infant', ageMention: `${months} months (Infant)` };
    if (months < 36) return { ageGroup: 'toddler', ageMention: `${months} months (Toddler)` };
    if (months < 54) return { ageGroup: 'preschool', ageMention: `${months} months (Preschool)` };
    return { ageGroup: 'schoolage', ageMention: `${months} months (School Age)` };
  }

  const yearMatch = normalized.match(/\b(\d+(?:\.\d+)?)\s*(?:year|years|yr|yrs)\b/);
  if (yearMatch) {
    const yrs = parseFloat(yearMatch[1]);
    if (yrs < 1.5) return { ageGroup: 'infant', ageMention: `${yrs} yr (Infant)` };
    if (yrs < 3) return { ageGroup: 'toddler', ageMention: `${yrs} yrs (Toddler)` };
    if (yrs < 4.5) return { ageGroup: 'preschool', ageMention: `${yrs} yrs (Preschool)` };
    if (yrs <= 12) return { ageGroup: 'schoolage', ageMention: `${yrs} yrs (School Age)` };
  }

  if (/\b(toddler|two year old|2 year old)\b/.test(normalized)) {
    return { ageGroup: 'toddler', ageMention: 'Toddler (19m–3y)' };
  }
  if (/\b(preschool|preschooler|pre-k|3 year old|4 year old)\b/.test(normalized)) {
    return { ageGroup: 'preschool', ageMention: 'Preschool (3–4.5y)' };
  }
  if (/\b(kindergarten|kinder|school age|school-age|grade \d|osc)\b/.test(normalized)) {
    return { ageGroup: 'schoolage', ageMention: 'Kindergarten / OSC (4.5–12y)' };
  }

  return {};
}

function isConversationalGreeting(normalized: string): boolean {
  return /^(hi|hello|hey|good morning|good afternoon|good evening|greetings|how are you|what can you do|thanks|thank you|awesome|great|sounds good|ok thanks)[!?.\s]*$/i.test(
    normalized
  );
}

function isFollowUpRequest(normalized: string): boolean {
  return /^(tell me more|more details|more info|what else|anything else|continue|go on|expand on that|explain more|what about my child|and for my child|yes please|sure|yes)[!?.\s]*$/i.test(
    normalized
  );
}

function isMedicalAdviceOrEmergency(normalized: string): boolean {
  if (
    /\b(911|medical advice|diagnose|diagnosis|treat|treatment|what dose|dosage of|tylenol|advil|ibuprofen|prescription advice|should i give my child medicine)\b/i.test(
      normalized
    )
  ) {
    return true;
  }
  if (/\b(bleeding|unconscious|seizure|choking|not breathing|anaphylaxis|emergency right now)\b/i.test(normalized)) {
    return true;
  }
  return false;
}

function isUnverifiedCentreSpecificQuery(normalized: string): boolean {
  // Exact live vacancy count / waitlist spot / unstated specific tuition dollar rate
  if (
    /\bexact\b.{0,20}\b(fee|fees|price|cost|tuition|rate|amount)\b|\b(how much per month for|biweekly|how many kids on waitlist|how many spots left|how many seats left|current waitlist number|spot number)\b/i.test(
      normalized
    )
  ) {
    return true;
  }
  return false;
}

export function matchParentQuestion(
  rawQuery: string,
  context: ConversationContext = {}
): ChatbotResponse {
  const normalized = rawQuery.toLowerCase().trim().replace(/\s+/g, ' ');
  const detectedAge = extractAgeGroupFromText(normalized);
  const nextContext: ConversationContext = {
    activeTopicId: context.activeTopicId,
    childAgeGroup: detectedAge.ageGroup || context.childAgeGroup,
    childAgeMention: detectedAge.ageMention || context.childAgeMention
  };

  // 1. Conversational Greetings / Thank You
  if (!normalized || isConversationalGreeting(normalized)) {
    const isThanks = /thank|awesome|great|sounds good/i.test(normalized);
    return {
      matched: true,
      classification: 'guidance',
      topic: isThanks ? 'Happy to Help!' : 'Welcome to Camrose Little Angels',
      sourceCitation: 'General Childcare & Parenting Guidance',
      answer: isThanks
        ? 'You’re very welcome! Feel free to ask another question about our programs, Alberta $10/Day subsidies, parenting transitions, or life with kids in Camrose—or contact Director Syed Faran at (780) 678-0701 anytime.'
        : 'Hello! I can help with official Camrose Little Angels Daycare details (ages 0–12, hours 6:00 AM–6:30 PM, subsidies, meals, school buses, and registration) as well as general early-childhood parenting tips and Camrose family routines. What’s on your mind today?',
      followUps: STARTER_QUESTIONS.slice(0, 3),
      actions: [
        { label: 'Book a Tour', type: 'tour' },
        { label: 'Open Register Now', type: 'register' }
      ],
      updatedContext: nextContext
    };
  }

  // 2. Medical Advice & Emergencies Guardrail (§6.1)
  if (isMedicalAdviceOrEmergency(normalized)) {
    return {
      matched: true,
      classification: 'boundary',
      topic: 'Safety Boundary — Medical Advice & Emergencies',
      sourceCitation: 'Official Safety Boundary (Client Requirements §6.1)',
      answer:
        'I cannot provide medical advice, medication dosing, or handle medical emergencies. If this is an urgent emergency, please call 911 or contact a licensed healthcare provider immediately. For non-emergency daycare health policies (such as our written medication approval form or 24-hour symptom-free rule), please contact the daycare directly.',
      followUps: [
        { id: 'b-health', label: 'Review daycare health policy', query: 'What are your safety, sick policy, and pickup security rules?' },
        { id: 'b-contact', label: 'Contact Director directly', query: 'Where are you located and how can I contact the director?' }
      ],
      actions: [
        { label: 'Parent Handbook', type: 'handbook' },
        { label: 'Call (780) 678-0701', type: 'call' }
      ],
      updatedContext: nextContext
    };
  }

  // 3. Explicit follow-up / "tell me more" on the active conversation topic
  if (isFollowUpRequest(normalized) && context.activeTopicId) {
    const activeEntry = KNOWLEDGE_BASE.find((e) => e.id === context.activeTopicId);
    if (activeEntry) {
      const ageExtra =
        nextContext.childAgeGroup && activeEntry.ageTailoredNotes?.[nextContext.childAgeGroup]
          ? ` ${activeEntry.ageTailoredNotes[nextContext.childAgeGroup]}`
          : '';
      return {
        matched: true,
        classification: activeEntry.classification,
        topic: `${activeEntry.topic} — More Details`,
        sourceCitation: activeEntry.sourceCitation,
        answer: `${activeEntry.followUpDetails || activeEntry.answer}${ageExtra}`,
        highlights: activeEntry.highlights,
        followUps: activeEntry.followUps,
        actions: activeEntry.actions || [],
        updatedContext: nextContext
      };
    }
  }

  // 4. Score all entries with phrase + token + fuzzy matching
  const tokens = normalized
    .replace(/[^a-z0-9/\-\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length >= 2 && !STOP_WORDS.has(t));

  let bestEntry: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;

    for (const phrase of entry.phrases) {
      if (normalized.includes(phrase)) {
        score += 12;
      }
    }

    for (const token of tokens) {
      let tokenMatched = false;
      for (const kw of entry.keywords) {
        if (token === kw) {
          score += 6;
          tokenMatched = true;
          break;
        }
        if (token.length >= 4 && (kw.startsWith(token) || token.startsWith(kw))) {
          score += 4;
          tokenMatched = true;
          break;
        }
        if (token.length >= 5 && kw.length >= 5 && levenshteinDistance(token, kw) <= 2) {
          score += 3;
          tokenMatched = true;
          break;
        }
      }
      if (!tokenMatched && entry.answer.toLowerCase().includes(token) && token.length >= 5) {
        score += 1.5;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  // If user specifically mentioned ONLY an age group ("I have a 2 year old" / "what about toddlers?") while on an active topic, carry forward or route to age/program guidance
  if ((!bestEntry || bestScore < 5) && detectedAge.ageGroup) {
    if (context.activeTopicId) {
      const activeEntry = KNOWLEDGE_BASE.find((e) => e.id === context.activeTopicId);
      if (activeEntry) {
        const ageNote = activeEntry.ageTailoredNotes?.[detectedAge.ageGroup];
        return {
          matched: true,
          classification: activeEntry.classification,
          topic: `${activeEntry.topic} (${AGE_GROUP_LABELS[detectedAge.ageGroup]})`,
          sourceCitation: activeEntry.sourceCitation,
          answer: ageNote || `${activeEntry.answer} For ${AGE_GROUP_LABELS[detectedAge.ageGroup]}, our educators tailor daily care to their developmental pace.`,
          highlights: activeEntry.highlights,
          followUps: activeEntry.followUps,
          actions: activeEntry.actions || [],
          updatedContext: { ...nextContext, activeTopicId: activeEntry.id }
        };
      }
    }

    const spacesEntry = KNOWLEDGE_BASE[0];
    return {
      matched: true,
      classification: 'official',
      topic: `Programs for ${AGE_GROUP_LABELS[detectedAge.ageGroup]}`,
      sourceCitation: spacesEntry.sourceCitation,
      answer: `${spacesEntry.ageTailoredNotes?.[detectedAge.ageGroup] || spacesEntry.answer} To check current classroom openings for your child’s start date, please call/text Director Syed Faran at (780) 678-0701.`,
      highlights: spacesEntry.highlights,
      followUps: spacesEntry.followUps,
      actions: spacesEntry.actions || [],
      updatedContext: { ...nextContext, activeTopicId: spacesEntry.id }
    };
  }

  // 5. Strict fallback rule ONLY for unverified / out-of-scope details
  if (!bestEntry || bestScore < 5 || isUnverifiedCentreSpecificQuery(normalized)) {
    return {
      matched: false,
      classification: 'fallback',
      topic: 'Detail Not Listed in Parent Guide',
      sourceCitation: 'Strict Fallback Policy (Client Requirements §3.2)',
      answer:
        'That specific detail is not listed in our Parent & Registration Guide. For an accurate answer tailored to your family—such as exact monthly classroom rates or current spot openings—please call or text Director/Owner Syed Faran at (780) 678-0701, book a tour, or start your registration packet.',
      followUps: STARTER_QUESTIONS.slice(0, 3),
      actions: [
        { label: 'Call (780) 678-0701', type: 'call' },
        { label: 'Book a Tour', type: 'tour' },
        { label: 'Open Register Now', type: 'register' }
      ],
      updatedContext: nextContext
    };
  }

  const tailoredNote =
    nextContext.childAgeGroup && bestEntry.ageTailoredNotes?.[nextContext.childAgeGroup]
      ? ` ${bestEntry.ageTailoredNotes[nextContext.childAgeGroup]}`
      : '';

  return {
    matched: true,
    classification: bestEntry.classification,
    topic: bestEntry.topic,
    sourceCitation: bestEntry.sourceCitation,
    answer: `${bestEntry.answer}${tailoredNote}`,
    highlights: bestEntry.highlights,
    followUps: bestEntry.followUps,
    actions: bestEntry.actions || [],
    updatedContext: {
      ...nextContext,
      activeTopicId: bestEntry.id
    }
  };
}
