// Comprehensive SEO Keywords for TrafficBox

export const primaryKeywords = [
  'buy organic traffic',
  'organic website traffic',
  'AI SEO audit',
  'AI-powered SEO analysis',
  'deep SEO audit',
  'artificial intelligence SEO',
  'TrafficBoxes',
  'organic traffic for sale',
  'targeted organic visitors',
  'SEO audit with AI',
  'automated SEO analysis',
  'machine learning SEO',
  'AI website audit',
  'organic traffic generation',
  'SEO intelligence platform'
]

export const serviceKeywords = [
  'organic traffic marketplace',
  'AI-driven SEO audit',
  'artificial intelligence website analysis',
  'automated SEO reporting',
  'deep website audit',
  'organic visitor generation',
  'targeted website traffic',
  'AI SEO tools',
  'machine learning audit',
  'intelligent SEO analysis',
  'organic traffic packages',
  'website traffic for sale',
  'AI-powered insights',
  'automated competitor analysis',
  'smart SEO recommendations',
  'organic traffic boost',
  'AI website optimization',
  'intelligent keyword analysis',
  'automated technical audit',
  'organic traffic solutions',
  'AI SEO platform',
  'smart traffic generation'
]

export const platformKeywords = [
  'e-commerce SEO',
  'WordPress SEO',
  'Shopify SEO',
  'Google Ads',
  'Facebook Ads',
  'Instagram marketing',
  'LinkedIn marketing',
  'YouTube SEO',
  'video marketing',
]

export const contentKeywords = [
  'content strategy',
  'blog writing',
  'copywriting',
  'landing page optimization',
  'A/B testing',
  'marketing analytics',
  'Google Analytics',
  'Search Console',
  'online reputation management',
  'keyword research tools',
]

export const businessKeywords = [
  'SEO consulting',
  'digital strategy',
  'online visibility',
  'search rankings',
  'website traffic',
  'SEO optimization',
  'marketing ROI',
  'business growth',
  'online marketing strategy',
  'digital transformation',
  'marketing consultant',
  'SEO expert',
  'digital marketing specialist',
  'online marketing expert',
  'SEO professional',
]

export const locationKeywords = [
  'SEO services near me',
  'local digital marketing',
  'SEO company',
  'digital marketing firm',
  'SEO specialists',
  'marketing agency',
  'online marketing company',
  'SEO consultants',
]

export const industryKeywords = [
  'small business SEO',
  'enterprise SEO',
  'startup marketing',
  'B2B marketing',
  'B2C marketing',
  'SaaS marketing',
  'healthcare SEO',
  'legal SEO',
  'real estate SEO',
  'restaurant marketing',
  'retail SEO',
  'automotive SEO',
  'financial services SEO',
  'technology marketing',
]

export const longTailKeywords = [
  'how to improve website ranking',
  'best SEO practices 2025',
  'digital marketing strategies that work',
  'increase organic traffic fast',
  'SEO audit checklist',
  'keyword research best practices',
  'local SEO optimization tips',
  'content marketing for SEO',
  'link building strategies',
  'technical SEO guide',
  'mobile SEO optimization',
  'voice search optimization tips',
  'e-commerce SEO best practices',
  'WordPress SEO optimization',
  'Google Ads management services',
  'social media marketing strategies',
  'conversion rate optimization techniques',
  'email marketing automation',
  'influencer marketing campaigns',
  'brand awareness strategies',
]

// Combine all keywords for easy access
export const allKeywords = [
  ...primaryKeywords,
  ...serviceKeywords,
  ...platformKeywords,
  ...contentKeywords,
  ...businessKeywords,
  ...locationKeywords,
  ...industryKeywords,
  ...longTailKeywords,
]

// Keywords by page type
export const pageKeywords = {
  home: [...primaryKeywords, ...serviceKeywords.slice(0, 10)],
  about: ['SEO agency', 'digital marketing team', 'SEO experts', 'marketing professionals'],
  services: [...serviceKeywords, ...platformKeywords],
  blog: ['SEO blog', 'digital marketing tips', 'SEO guides', 'marketing insights'],
  contact: ['SEO consultation', 'digital marketing quote', 'SEO services inquiry'],
  portfolio: ['SEO case studies', 'digital marketing results', 'SEO success stories'],
  pricing: ['SEO pricing', 'digital marketing packages', 'SEO service costs'],
}