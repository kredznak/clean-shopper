import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

const products = [
  // Personal Care
  {
    name: "Pure Castile Liquid Soap",
    brand: "Dr. Bronner's",
    category: "Personal Care",
    safety_score: "clean",
    description: "Organic, fair-trade certified soap made with plant-based oils. Free from synthetic preservatives, detergents, and foaming agents.",
    image_url: "https://m.media-amazon.com/images/I/71fKjPdT-xL._SL1500_.jpg",
  },
  {
    name: "Sensitive Skin Facial Cleanser",
    brand: "Vanicream",
    category: "Personal Care",
    safety_score: "clean",
    description: "Fragrance-free, dye-free gentle cleanser formulated without common chemical irritants. Ideal for eczema-prone and reactive skin.",
    image_url: "https://m.media-amazon.com/images/I/611NyPcyZtL._SL1500_.jpg",
  },
  {
    name: "Natural Deodorant Cream",
    brand: "Primally Pure",
    category: "Personal Care",
    safety_score: "clean",
    description: "Aluminum-free deodorant made with tallow, arrowroot, and beeswax. No synthetic fragrance, parabens, or propylene glycol.",
    image_url: "",
  },
  {
    name: "Brightening Face Serum with Vitamin C",
    brand: "TruSkin",
    category: "Personal Care",
    safety_score: "caution",
    description: "Stabilized vitamin C serum with hyaluronic acid for brightening. Contains a few synthetic preservatives worth noting for sensitive skin.",
    image_url: "https://m.media-amazon.com/images/I/710g6-+-UeL._SL1500_.jpg",
  },
  {
    name: "Hydro Boost Water Gel Moisturizer",
    brand: "Neutrogena",
    category: "Personal Care",
    safety_score: "caution",
    description: "Lightweight hyaluronic acid moisturizer that absorbs quickly. Contains synthetic fragrance and several preservatives flagged by EWG.",
    image_url: "https://m.media-amazon.com/images/I/71K4KnBq6KL._SL1500_.jpg",
  },
  {
    name: "Shampoo + Conditioner 2-in-1",
    brand: "Head & Shoulders",
    category: "Personal Care",
    safety_score: "avoid",
    description: "Contains zinc pyrithione for dandruff control alongside synthetic fragrance and parabens. Multiple ingredients linked to hormone disruption.",
    image_url: "https://m.media-amazon.com/images/I/71xhX2-9s3L._SL1500_.jpg",
  },

  // Home Cleaning
  {
    name: "All-Purpose Cleaning Concentrate",
    brand: "Branch Basics",
    category: "Home Cleaning",
    safety_score: "clean",
    description: "Plant- and mineral-based concentrate free from synthetic fragrance, dyes, and preservatives. One bottle dilutes into multiple cleaners.",
    image_url: "https://m.media-amazon.com/images/I/614ENtEQvOL._AC_SL1500_.jpg",
  },
  {
    name: "Oxygen Boost Powder",
    brand: "Branch Basics",
    category: "Home Cleaning",
    safety_score: "clean",
    description: "Sodium percarbonate-based laundry booster that whitens and removes stains without chlorine bleach or optical brighteners.",
    image_url: "",
  },
  {
    name: "Dish Soap – Free & Clear",
    brand: "Seventh Generation",
    category: "Home Cleaning",
    safety_score: "clean",
    description: "Plant-based dish soap with no synthetic fragrance, dyes, or triclosan. Biodegradable surfactants and EPA Safer Choice certified.",
    image_url: "https://m.media-amazon.com/images/I/71u2KFcbPfL._AC_SL1500_.jpg",
  },
  {
    name: "Laundry Detergent Sheets",
    brand: "Earth Breeze",
    category: "Home Cleaning",
    safety_score: "caution",
    description: "Pre-measured dissolvable laundry sheets with no plastic packaging. Formula is largely clean but contains a few undisclosed fragrance compounds.",
    image_url: "https://m.media-amazon.com/images/I/815tvBN9AhL._AC_SL1500_.jpg",
  },
  {
    name: "Disinfecting Spray – Crisp Linen",
    brand: "Lysol",
    category: "Home Cleaning",
    safety_score: "avoid",
    description: "Contains quaternary ammonium compounds and undisclosed synthetic fragrance linked to respiratory irritation. Not recommended for daily or enclosed-space use.",
    image_url: "https://m.media-amazon.com/images/I/71C+7XEOY9L._AC_SL1500_.jpg",
  },
  {
    name: "Febreze Fabric Refresher",
    brand: "Febreze",
    category: "Home Cleaning",
    safety_score: "avoid",
    description: "Contains VOCs and undisclosed fragrance compounds. Associated with respiratory and endocrine concerns; safer odor-neutralizing alternatives exist.",
    image_url: "https://m.media-amazon.com/images/I/71lB7nZfhwL._AC_SL1500_.jpg",
  },

  // Baby Care
  {
    name: "Baby Lotion – Fragrance Free",
    brand: "Burt's Bees Baby",
    category: "Baby Care",
    safety_score: "clean",
    description: "Nourishing shea butter lotion with no fragrance, parabens, or phthalates. Pediatrician-tested and EWG Verified for infant use.",
    image_url: "",
  },
  {
    name: "Baby Shampoo & Wash",
    brand: "Honest Company",
    category: "Baby Care",
    safety_score: "clean",
    description: "Tear-free, plant-derived cleanser with no sulfates, synthetic fragrance, or dyes. Dermatologist-tested and certified MADE SAFE.",
    image_url: "https://m.media-amazon.com/images/I/61i34TRSnlL._AC_SL1500_.jpg",
  },
  {
    name: "Diaper Rash Cream",
    brand: "Earth Mama",
    category: "Baby Care",
    safety_score: "clean",
    description: "Non-nano zinc oxide formula with organic calendula and shea butter. Free from talc, petroleum, synthetic fragrance, and parabens.",
    image_url: "https://m.media-amazon.com/images/I/61dDrOFjnvL._AC_SL1500_.jpg",
  },
  {
    name: "Baby Powder – Original",
    brand: "Johnson's",
    category: "Baby Care",
    safety_score: "avoid",
    description: "Talc-based powder with documented concerns around respiratory risk and contamination. Cornstarch-based alternatives are strongly recommended for infants.",
    image_url: "https://m.media-amazon.com/images/I/61LnA0ZseyL._AC_SL1500_.jpg",
  },
  {
    name: "Gentle Baby Wash",
    brand: "Aveeno Baby",
    category: "Baby Care",
    safety_score: "caution",
    description: "Oat-based wash marketed as gentle and natural. Contains synthetic preservatives and trace fragrance not ideal for newborns or highly sensitive skin.",
    image_url: "https://m.media-amazon.com/images/I/61Oy6CZtOkL._AC_SL1500_.jpg",
  },

  // Kitchen
  {
    name: "Castile Soap Dish Spray",
    brand: "Dr. Bronner's",
    category: "Kitchen",
    safety_score: "clean",
    description: "Pre-diluted castile soap spray for dishes and kitchen surfaces. No synthetic surfactants, preservatives, or fragrance — just peppermint essential oil.",
    image_url: "",
  },
  {
    name: "Beeswax Food Wraps",
    brand: "Bee's Wrap",
    category: "Kitchen",
    safety_score: "clean",
    description: "Reusable food storage wraps made from organic cotton, beeswax, and jojoba oil. A plastic-free, non-toxic alternative to cling wrap.",
    image_url: "https://m.media-amazon.com/images/I/71g8oLa0+OL._AC_SL1500_.jpg",
  },
  {
    name: "Non-Stick Cookware Spray",
    brand: "PAM",
    category: "Kitchen",
    safety_score: "caution",
    description: "Convenient cooking spray but contains soy lecithin, dimethyl silicone, and propellants. Aerosol use in an enclosed kitchen warrants ventilation.",
    image_url: "https://m.media-amazon.com/images/I/81l3yhQWcDL._SL1500_.jpg",
  },
]

async function seed() {
  console.log(`Inserting ${products.length} products…`)

  const { data, error } = await supabase
    .from('products')
    .insert(products)
    .select()

  if (error) {
    console.error('Insert failed:', error.message)
    process.exit(1)
  }

  console.log(`✓ Inserted ${data.length} products successfully.`)
  data.forEach(p => console.log(`  [${p.id}] ${p.brand} — ${p.name} (${p.category}, ${p.safety_score})`))
}

seed()
