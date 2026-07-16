import type { Article } from '../types';

export const CATEGORIES = [
  'All',
  'Figma',
  'AI for Design',
  'AI for Product',
  'UX',
  'UI',
  'Branding',
  'Design Systems',
  'Product Design',
  'Product Strategy',
  'Design Leadership',
  'Engineering Leadership',
  'Technology Management',
  'Leadership & Management',
];

/**
 * Static placeholder set matching the design prototype. Swap for a fetch to a
 * backend/edge function that pulls & normalizes RSS feeds (browsers can't hit
 * arbitrary feeds directly due to CORS) — keep this same Article shape.
 */
export const ARTICLES: Article[] = [
  { id: 'a1', category: 'Figma', headline: 'Config 2026: the features quietly reshaping design workflows', summary: 'A grounded look at what actually changes day-to-day — from variables to AI-assisted layout — and what is still hype.', source: 'Figma Blog', time: '2h ago' },
  { id: 'a2', category: 'Design Leadership', headline: 'Managing designers in the age of AI', summary: 'Craft, judgement and taste become the moat. How to restructure a design org around them without slowing delivery.', source: "Lenny's Newsletter", time: '5h ago' },
  { id: 'a3', category: 'AI for Design', headline: 'AI design patterns that actually ship', summary: 'Beyond the demo: interaction models for generative features that respect trust, latency and user control.', source: 'Smashing Magazine', time: '8h ago' },
  { id: 'a4', category: 'UX', headline: 'The new rules of information scent', summary: 'Research on how people navigate dense, AI-augmented interfaces — and where classic heuristics still hold.', source: 'Nielsen Norman Group', time: 'yesterday' },
  { id: 'a5', category: 'Design Systems', headline: 'Tokens, themes and the multi-brand system', summary: 'A field guide to structuring semantic tokens so one system can dress many brands without forking.', source: 'design.systems', time: 'yesterday' },
  { id: 'a6', category: 'Product Strategy', headline: 'Strategy is a story you can act on', summary: 'Turning fuzzy vision into a spine of bets your team can prioritise against every single week.', source: 'Reforge', time: '1d ago' },
  { id: 'a7', category: 'AI for Product', headline: 'Shipping AI features without losing trust', summary: 'Guardrails, graceful failure and honest affordances — the product patterns that keep users on board.', source: 'Vercel', time: '1d ago' },
  { id: 'a8', category: 'UI', headline: 'Micro-interactions that feel expensive', summary: 'The physics of motion, easing and timing that separate a premium interface from a busy one.', source: 'Linear Blog', time: '2d ago' },
  { id: 'a9', category: 'Branding', headline: 'Rebranding without breaking recognition', summary: 'How mature companies evolve identity while keeping the equity they already own in customers minds.', source: "It's Nice That", time: '2d ago' },
  { id: 'a10', category: 'Engineering Leadership', headline: 'The staff-plus design partner', summary: 'What high-leverage collaboration between senior design and engineering leadership really looks like.', source: 'The Pragmatic Engineer', time: '3d ago' },
  { id: 'a11', category: 'Technology Management', headline: 'Platform teams and the design org', summary: 'Aligning internal platforms and design systems so both compound instead of competing for headcount.', source: 'LeadDev', time: '3d ago' },
];
