// ---------------------------------------------------------------------------
// SVG Luxurious PG for Ladies — central content configuration
//
// This file is the single source of truth for the site's content. Update the
// values here (phone numbers, pricing, rooms, amenities, etc.) without
// touching any component/UI code. Anything wrapped in [BRACKETS] is a
// placeholder — replace it with the real value before launch.
// ---------------------------------------------------------------------------

export const pg = {
  name: 'SVG Luxurious PG for Ladies',
  shortName: 'SVG Luxurious PG',
  tagline: "Near PES College, Banashankari",
  logoText: 'SVG',

  phoneDisplay: '+91 73968 38373',
  phoneTel: '+917396838373',
  whatsappNumber: '917396838373', // owner's WhatsApp number, digits only with country code
  email: 'anirudreddy69@gmail.com',

  address: {
    line1: 'SVG Luxurious PG for Ladies, Near PES College',
    line2: '50 Feet Main Road, 4th Main Rd, Nagendra Block, Banashankari',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560050',
    full: 'SVG Luxurious PG for Ladies, Near PES College, 50 Feet Main Road, 4th Main Rd, Nagendra Block, Banashankari, Bengaluru, Karnataka 560050',
  },

  mapsEmbedSrc:
    'https://www.google.com/maps?q=' +
    encodeURIComponent(
      'SVG Luxurious PG for Ladies, Near PES College, 50 Feet Main Road, 4th Main Rd, Nagendra Block, Banashankari, Bengaluru, Karnataka 560050'
    ) +
    '&output=embed',
  mapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent(
      'SVG Luxurious PG for Ladies, Near PES College, 50 Feet Main Road, 4th Main Rd, Nagendra Block, Banashankari, Bengaluru, Karnataka 560050'
    ),

  visitingHours: 'Everyday, 9 AM – 8 PM',

  rating: {
    value: 5.0,
    count: 20,
    source: 'Google Reviews',
  },

  social: {
    // TODO: add real links if available
    instagram: '',
    facebook: '',
  },
}

export function waLink(message) {
  const number = pg.whatsappNumber?.replace(/\D/g, '')
  const text = encodeURIComponent(message)
  if (!number) return `https://wa.me/?text=${text}`
  return `https://wa.me/${number}?text=${text}`
}

// The single generic WhatsApp message used by every "chat with us" entry
// point on the site (navbar, hero, floating button, mobile bar, contact card).
export const defaultWaMessage = `Hi, I am interested in staying at ${pg.name}. I would like to know about room availability and pricing.`

export const stayDurations = ['1-3 months', '3-6 months', '6-12 months', '1 year or more']

export const heroImage = '/images/building.webp'

export const highlights = [
  { label: 'Women Only' },
  { label: 'Home-Style Food' },
  { label: 'Daily Housekeeping' },
  { label: '24/7 Wi-Fi' },
  { label: 'Responsive Owner' },
]

// Only amenities corroborated by resident reviews are listed as confirmed.
// Add more once you confirm them — do not invent unconfirmed amenities.
export const amenities = [
  { name: 'Home-Cooked Food', description: 'Wholesome daily meals, residents especially love the breakfast.' },
  { name: 'High-Speed Wi-Fi', description: 'Available around the clock across the residence.' },
  { name: 'Hot Water', description: 'Available for daily use.' },
  { name: 'Daily Housekeeping', description: 'Rooms and common areas cleaned every day.' },
  { name: 'Refrigerator', description: 'Shared refrigerator access for residents.' },
  { name: 'Washing Machine', description: 'On-site laundry facility for residents.' },
  { name: 'Furnished Rooms', description: 'Beds, wardrobes and study tables provided, as shown in the gallery.' },
]

export const safety = [
  {
    title: 'Women-Only Residence',
    description: 'A residence exclusively for women, as reflected in its name and design.',
  },
  {
    title: 'Attentive, On-Site Owner',
    description:
      'Residents consistently mention that the owner responds instantly and resolves issues without delay.',
  },
  {
    title: 'Well-Maintained Premises',
    description: 'Daily cleaning and upkeep keep common areas and rooms consistently hygienic.',
  },
]

export const rooms = [
  {
    id: 'twin-sharing',
    type: 'Twin Sharing Room',
    image: '/images/room-1.webp',
    gallery: ['/images/room-1.webp', '/images/room-2.webp'],
    occupancy: '2 residents',
    bedType: 'Twin single beds',
    furniture: 'Wardrobe, mirror unit and study table per resident',
    priceLabel: '[PRICE ON REQUEST]',
    availability: '[AVAILABILITY ON REQUEST]',
    description:
      'A comfortably furnished twin-sharing room with individual wardrobes and study space for two residents, finished with warm wood-tone furniture.',
    included: ['Furnished beds & wardrobes', 'Daily housekeeping', 'Wi-Fi', 'Hot water'],
    notIncluded: ['[NOT INCLUDED — TO BE CONFIRMED]'],
    deposit: '[DEPOSIT INFORMATION ON REQUEST]',
  },
  {
    id: 'single-occupancy',
    type: 'Single Occupancy Room',
    image: '/images/room-4.webp',
    gallery: ['/images/room-4.webp', '/images/room-5.webp'],
    occupancy: '1 resident',
    bedType: 'Single bed',
    furniture: 'Wardrobe, study table and curtained window',
    priceLabel: '[PRICE ON REQUEST]',
    availability: '[AVAILABILITY ON REQUEST]',
    description:
      'A private, quiet room for residents who prefer their own space, furnished with a single bed, wardrobe and dedicated study table.',
    included: ['Furnished bed & wardrobe', 'Daily housekeeping', 'Wi-Fi', 'Hot water'],
    notIncluded: ['[NOT INCLUDED — TO BE CONFIRMED]'],
    deposit: '[DEPOSIT INFORMATION ON REQUEST]',
  },
  {
    id: 'triple-sharing',
    type: 'Triple Sharing Room',
    image: '/images/room-3.webp',
    gallery: ['/images/room-3.webp'],
    occupancy: '3 residents',
    bedType: 'Multiple single beds',
    furniture: 'Shared wardrobes and study tables',
    priceLabel: '[PRICE ON REQUEST]',
    availability: '[AVAILABILITY ON REQUEST]',
    description:
      'A furnished multi-sharing room designed for residents who enjoy shared company, with wardrobe and study space for each resident.',
    included: ['Furnished beds & wardrobes', 'Daily housekeeping', 'Wi-Fi', 'Hot water'],
    notIncluded: ['[NOT INCLUDED — TO BE CONFIRMED]'],
    deposit: '[DEPOSIT INFORMATION ON REQUEST]',
  },
]

export const galleryImages = [
  { src: '/images/building.webp', category: 'Exterior', alt: 'SVG Luxurious PG building exterior in Banashankari' },
  { src: '/images/room-1.webp', category: 'Rooms', alt: 'Furnished twin sharing room with wardrobes' },
  { src: '/images/room-2.webp', category: 'Rooms', alt: 'Twin sharing room with study table' },
  { src: '/images/room-3.webp', category: 'Rooms', alt: 'Triple sharing furnished room' },
  { src: '/images/room-4.webp', category: 'Rooms', alt: 'Single occupancy furnished room' },
  { src: '/images/room-5.webp', category: 'Rooms', alt: 'Single room with curtained windows' },
]

// Real resident reviews, as provided via Google Reviews. Do not alter meaning.
export const testimonials = [
  {
    name: 'Jessica James',
    meta: '4 reviews · 5 months ago',
    text: "Genuinely saying... Very good pg with proper facilities and good breakfast specially and moreover pg owner is really really good n very understanding and does works without any hesitation instantly. Overall very very good. Not bluffing jus giving a genuine review",
    rating: 5,
  },
  {
    name: 'Yamini Korada',
    meta: '3 reviews · 5 months ago',
    text: 'Excellent pg with good facilities and food is very yummy and pg owner also provides good hospitality',
    rating: 5,
  },
  {
    name: 'khachitai P Dore',
    meta: '4 reviews · 5 months ago',
    text: 'Good and healthy food. Owner is kind and manages well. Facilities are also good with every day cleaning, wifi 24*7, hot water, fridge and washing machine utilities.',
    rating: 5,
  },
  {
    name: 'Harshithamahadev Naik',
    meta: '1 review · 5 months ago',
    text: 'Very good pg with good comforts and facilities and food aswell. Pg owner is very good n responds instantly.',
    rating: 5,
  },
  {
    name: 'jahnavi ss',
    meta: '5 reviews · 5 months ago',
    text: 'Good environment and hygiene. What stands out is their quick response and immediate action whenever needed.',
    rating: 5,
  },
  {
    name: 'Snowita Dias',
    meta: '1 review · 5 months ago',
    text: 'Great PG with good facilities. In case if any issue arises it is resolved by the owner instantly.',
    rating: 5,
  },
  {
    name: 'Gopika EL',
    meta: '1 review · 5 months ago',
    text: 'Good to maintainance and response, owner can quick response to problems, good food.',
    rating: 5,
  },
  {
    name: 'Arpita Ghosh',
    meta: '1 review · 5 months ago',
    text: 'The owner is very good just like every facilities all over.',
    rating: 5,
  },
  {
    name: 'Sinchana NS',
    meta: '1 review · 7 months ago',
    text: 'Good at maintenance and response, good food.',
    rating: 5,
  },
  {
    name: 'Lakshmi Reddy',
    meta: '4 reviews · 7 months ago',
    text: 'Very good pg with all facilities.',
    rating: 5,
  },
]

export const nearby = [
  { category: 'Colleges', items: ['PES College (adjacent to the property)', 'National College'] },
  { category: 'Offices', items: ['Giri Nagar'] },
  { category: 'Transport', items: ['Sri Nagar Bus Stop'] },
  { category: 'Everyday Essentials', items: ['Karewell Hospital'] },
]

export const faqs = [
  {
    q: 'What room types are available?',
    a: 'SVG Luxurious PG for Ladies offers twin sharing, single occupancy and triple sharing rooms. See the Rooms section for details on each.',
  },
  {
    q: 'Is food included?',
    a: 'Yes, home-style food is provided — residents frequently highlight the breakfast in their reviews. For the full meal plan, please enquire directly.',
  },
  {
    q: 'Is Wi-Fi available?',
    a: 'Yes, residents have confirmed 24/7 Wi-Fi access across the property.',
  },
  {
    q: 'Is housekeeping available?',
    a: 'Yes, daily housekeeping is provided for rooms and common areas.',
  },
  {
    q: 'What is included in the rent?',
    a: '[TO BE CONFIRMED — please enquire via WhatsApp or call for the current inclusions.]',
  },
  {
    q: 'What are the deposit requirements?',
    a: '[TO BE CONFIRMED — please enquire directly for current deposit terms.]',
  },
  {
    q: 'What is the minimum stay?',
    a: '[TO BE CONFIRMED — please enquire directly for minimum stay duration.]',
  },
  {
    q: 'What documents are required?',
    a: '[TO BE CONFIRMED — please enquire directly for the list of required documents.]',
  },
  {
    q: 'Are visitors allowed?',
    a: '[TO BE CONFIRMED — please enquire directly about the visitor policy.]',
  },
  {
    q: 'Is parking available?',
    a: '[TO BE CONFIRMED — please enquire directly about parking availability.]',
  },
  {
    q: 'How can I schedule a visit or enquire about availability?',
    a: 'Use the WhatsApp or Call buttons anywhere on this site, or fill in the enquiry form, and the owner will get back to you directly.',
  },
]
