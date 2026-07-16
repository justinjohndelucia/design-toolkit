import type { Tool } from '../types';

export const TOOL_ORDER = ['AI', 'Design', 'Research', 'Development', 'Workshops'];

export const TOOLS: Tool[] = [
  { name: 'NotebookLM', category: 'AI', url: 'https://notebooklm.google.com', desc: 'AI research notebook that grounds answers in your own sources.', keywords: ['research', 'notes', 'ai', 'summarise', 'google'] },
  { name: 'Adobe Firefly', category: 'AI', url: 'https://firefly.adobe.com', desc: 'Generative image and effects model built for commercial-safe creative.', keywords: ['image', 'generate', 'ai', 'art', 'adobe'] },
  { name: 'Figma Weave', category: 'AI', url: 'https://www.figma.com', desc: 'AI-assisted generation and editing inside the Figma canvas.', keywords: ['ai', 'figma', 'generate', 'design'] },
  { name: 'Figma', category: 'Design', url: 'https://www.figma.com', desc: 'Collaborative interface design, prototyping and design systems.', keywords: ['ui', 'ux', 'prototype', 'design', 'wireframe'] },
  { name: 'Mobbin', category: 'Design', url: 'https://mobbin.com', desc: 'Searchable library of real product UI patterns and flows.', keywords: ['inspiration', 'patterns', 'ui', 'reference', 'flows'] },
  { name: 'Aspect Ratio Calculator', category: 'Design', url: 'https://calculateaspectratio.com', desc: 'Quickly resolve proportional dimensions for any canvas.', keywords: ['ratio', 'dimensions', 'size', 'maths', 'proportion'] },
  { name: 'Accessible Web Contrast Checker', category: 'Design', url: 'https://webaim.org/resources/contrastchecker/', desc: 'Check colour pairings against WCAG AA and AAA contrast.', keywords: ['colour', 'color', 'contrast', 'accessibility', 'a11y', 'wcag'] },
  { name: 'Make Tints & Shades', category: 'Design', url: 'https://maketintsandshades.com', desc: 'Generate a full tint and shade ramp from any base colour.', keywords: ['colour', 'color', 'tints', 'shades', 'palette', 'ramp'] },
  { name: 'Condens', category: 'Research', url: 'https://condens.io', desc: 'Repository for analysing and sharing qualitative research.', keywords: ['research', 'ux research', 'analysis', 'interviews', 'tags'] },
  { name: 'Microsoft Clarity', category: 'Research', url: 'https://clarity.microsoft.com', desc: 'Free heatmaps and session recordings for behavioural insight.', keywords: ['research', 'analytics', 'heatmap', 'recordings', 'ms', 'clarity'] },
  { name: 'GitHub', category: 'Development', url: 'https://github.com', desc: 'Version control, code review and collaboration for teams.', keywords: ['code', 'dev', 'git', 'repository', 'engineering'] },
  { name: 'Slido', category: 'Workshops', url: 'https://www.slido.com', desc: 'Live polls, Q&A and word clouds for interactive sessions.', keywords: ['presentation', 'polls', 'workshop', 'q&a', 'audience', 'vote'] },
  { name: 'Mentimeter', category: 'Workshops', url: 'https://www.mentimeter.com', desc: 'Build interactive presentations with real-time audience input.', keywords: ['presentation', 'polls', 'workshop', 'slides', 'audience', 'vote'] },
];
