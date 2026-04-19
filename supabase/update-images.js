import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

const updates = [
  { name: "Pure Castile Liquid Soap",              brand: "Dr. Bronner's",     image_url: "https://m.media-amazon.com/images/I/71fKjPdT-xL._SL1500_.jpg" },
  { name: "Sensitive Skin Facial Cleanser",         brand: "Vanicream",         image_url: "https://m.media-amazon.com/images/I/611NyPcyZtL._SL1500_.jpg" },
  { name: "Brightening Face Serum with Vitamin C",  brand: "TruSkin",           image_url: "https://m.media-amazon.com/images/I/710g6-+-UeL._SL1500_.jpg" },
  { name: "Hydro Boost Water Gel Moisturizer",      brand: "Neutrogena",        image_url: "https://m.media-amazon.com/images/I/71K4KnBq6KL._SL1500_.jpg" },
  { name: "Shampoo + Conditioner 2-in-1",           brand: "Head & Shoulders",  image_url: "https://m.media-amazon.com/images/I/71xhX2-9s3L._SL1500_.jpg" },
  { name: "All-Purpose Cleaning Concentrate",       brand: "Branch Basics",     image_url: "https://m.media-amazon.com/images/I/614ENtEQvOL._AC_SL1500_.jpg" },
  { name: "Dish Soap \u2013 Free & Clear",          brand: "Seventh Generation",image_url: "https://m.media-amazon.com/images/I/71u2KFcbPfL._AC_SL1500_.jpg" },
  { name: "Laundry Detergent Sheets",               brand: "Earth Breeze",      image_url: "https://m.media-amazon.com/images/I/815tvBN9AhL._AC_SL1500_.jpg" },
  { name: "Disinfecting Spray \u2013 Crisp Linen",  brand: "Lysol",             image_url: "https://m.media-amazon.com/images/I/71C+7XEOY9L._AC_SL1500_.jpg" },
  { name: "Febreze Fabric Refresher",               brand: "Febreze",           image_url: "https://m.media-amazon.com/images/I/71lB7nZfhwL._AC_SL1500_.jpg" },
  { name: "Baby Shampoo & Wash",                    brand: "Honest Company",    image_url: "https://m.media-amazon.com/images/I/61i34TRSnlL._AC_SL1500_.jpg" },
  { name: "Diaper Rash Cream",                      brand: "Earth Mama",        image_url: "https://m.media-amazon.com/images/I/61dDrOFjnvL._AC_SL1500_.jpg" },
  { name: "Baby Powder \u2013 Original",            brand: "Johnson's",         image_url: "https://m.media-amazon.com/images/I/61LnA0ZseyL._AC_SL1500_.jpg" },
  { name: "Gentle Baby Wash",                       brand: "Aveeno Baby",       image_url: "https://m.media-amazon.com/images/I/61Oy6CZtOkL._AC_SL1500_.jpg" },
  { name: "Beeswax Food Wraps",                     brand: "Bee's Wrap",        image_url: "https://m.media-amazon.com/images/I/71g8oLa0+OL._AC_SL1500_.jpg" },
  { name: "Non-Stick Cookware Spray",               brand: "PAM",               image_url: "https://m.media-amazon.com/images/I/81l3yhQWcDL._SL1500_.jpg" },
]

async function updateImages() {
  console.log(`Updating image URLs for ${updates.length} products…`)

  for (const { name, brand, image_url } of updates) {
    const { error } = await supabase
      .from('products')
      .update({ image_url })
      .eq('name', name)
      .eq('brand', brand)

    if (error) {
      console.error(`✗ Failed [${brand} — ${name}]: ${error.message}`)
    } else {
      console.log(`✓ Updated: ${brand} — ${name}`)
    }
  }

  console.log('Done.')
}

updateImages()
