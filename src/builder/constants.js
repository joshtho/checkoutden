export const THEME_PRESETS = [
  { name: 'Forest', primary: '#14532d', secondary: '#16a34a', accent: '#166534' },
  { name: 'Ocean', primary: '#1e3a8a', secondary: '#3b82f6', accent: '#1d4ed8' },
  { name: 'Royal', primary: '#581c87', secondary: '#a855f7', accent: '#7e22ce' },
  { name: 'Sunset', primary: '#9a3412', secondary: '#f97316', accent: '#ea580c' },
  { name: 'Rose', primary: '#9f1239', secondary: '#fb7185', accent: '#e11d48' },
  { name: 'Slate', primary: '#1e293b', secondary: '#64748b', accent: '#475569' },
];

export const TIPS = {
  heroImage:
    "This is the first thing visitors see. Use a high-quality, relevant image that immediately communicates what you're offering.",
  description:
    'Keep it concise and benefit-focused. Lead with what the customer gains \u2014 not features. 2-3 short paragraphs is ideal.',
  ctaButton:
    'This button instant scrolls to checkout on mobile. Use clear, action-driven text like "Get Instant Access" or "Start Now". Avoid vague labels like "Submit".',
  price:
    'Display the price prominently \u2014 no surprises. Offering a discount can boost customer motivation.',
  italicText:
    'This is your emotional hook \u2014 speak to the pain point your product solves. Keep it authentic and conversational.',
  secondaryText:
    'Bridge the emotional hook to the call-to-action. Reinforce the transformation your product delivers.',
  closingWord:
    'A single powerful word or phrase that encapsulates your offer \u2014 think of it as your tagline.',
  additionalImage:
    "Supporting visuals build trust: show what's included, a preview, social proof, or your face. People buy from people.",
  checkoutTitle:
    'Restate the offer or ask a yes-question ("Ready for a new outlook?"). This question should be forward thinking, to where their problem/want/need can be solved by clicking.',
  subtitle:
    'A brief line that tells the buyer exactly what to do next. Keep it to one sentence.',
  checkoutUrl:
    'Paste your payment link (Square, Stripe, Gumroad, etc.). Always test it before publishing!',
  footer:
    'Your name or brand adds legitimacy. Keep it simple.',
};

export const BLANK_TEMPLATE = {
  theme: { ...THEME_PRESETS[0] },
  mainImage: '',
  description: '',
  price: '0.00',
  discountMode: false,
  originalPrice: '',
  italicText: '',
  secondaryText: '',
  closingWord: '',
  additionalImages: ['', ''],
  title: '',
  subtitle: '',
  checkoutUrl: '',
  ctaLabel: 'Scroll to Checkout',
  buyButtonLabel: '',
  footerName: '',
  almostThere: "You're almost there!",
  colors: {},
};

export const DEFAULT_PAGE_DATA = {
  theme: { ...THEME_PRESETS[0] },
  mainImage: '/images/explore-your-nature.jpeg',
  description:
    'This course is designed to help you discover insights towards the connection to oneself as well as a greater connection to all.\n\nWhether you\'re looking for personal growth, inspiration, or simply a new approach to your inner landscape, this course has something for everyone.\n\nUnlock instant access to Jordan River\'s course on how to "Explore your Nature"',
  price: '33.00',
  discountMode: false,
  originalPrice: '',
  italicText:
    'Feeling disconnected in a fast-paced world? Your true nature is waiting to be explored.\n\nIn a world that moves fast, pause and come home to yourself.\n\nYou weren\'t made to keep up — you were made to root down, remember, and rise up!\n\nIf you\'re feeling lost, uninspired, and overwhelmed: That\'s not who you are — it\'s just a sign you\'ve been too far from your nature.\n\nBehind the noise of modern life is a quiet truth: your nature holds the key to your joy.',
  secondaryText:
    'In an ever-evolving world, it\'s easy to feel out of sync — constantly chasing results... yet feeling uninspired, lost, or alone. But your true nature hasn\'t gone anywhere. It\'s quietly waiting behind the noise.\n\nAnd the key to reconnecting?',
  closingWord: 'Exploration.',
  additionalImages: ['/images/receive.png', '/images/whoami.jpg'],
  title: 'Ready to explore your nature?',
  subtitle: 'Click below for a one on one exploration with a trusted guide:',
  checkoutUrl: 'https://square.link/u/JaOryQ09',
  ctaLabel: 'Start Now!',
  buyButtonLabel: '($33.00 USD)',
  footerName: 'Jordan Rivers',
  almostThere: "You're almost there!",
  colors: {},
};
