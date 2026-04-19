import Anthropic from '@anthropic-ai/sdk'
import { supabase } from '../supabase'

const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
})

const SYSTEM_PROMPT = `You are a helpful product safety advisor for Clean Shopper, a personal product research assistant for ingredient-aware consumers. You help users find safe, clean products and understand ingredient safety.

You have access to the Clean Shopper product catalog below. When recommending or discussing products, only reference products from this catalog. Include the product's safety rating when mentioning it.

Safety rating meanings:
- clean: ingredients are safe and non-toxic
- caution: some ingredients may be concerning for sensitive individuals
- avoid: contains ingredients that are potentially harmful or toxic

PRODUCT CATALOG:
{products}

When responding:
- Be warm, helpful, and informative — like a knowledgeable friend, not a salesperson
- Reference specific products from the catalog when relevant, including their safety rating
- Explain ingredient safety in plain, accessible language
- If asked about a product not in the catalog, say so honestly and suggest catalog alternatives
- Keep responses concise and focused — enough to inform, never overwhelming
- If the user asks about specific ingredients, explain what they are and why they may or may not be a concern`

export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true })

  if (error) throw new Error(error.message)
  return data
}

export async function sendChatMessage(conversationHistory, products) {
  const productContext = products
    .map(p => `- ${p.name} by ${p.brand || 'Unknown brand'} | Category: ${p.category} | Safety: ${p.safety_score} | ${p.description}`)
    .join('\n')

  const systemPrompt = SYSTEM_PROMPT.replace('{products}', productContext)

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: systemPrompt,
    messages: conversationHistory.map(m => ({ role: m.role, content: m.content })),
  })

  return response.content[0].text
}
