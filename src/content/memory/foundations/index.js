/**
 * Memory Pillar -- Module 1: Foundations
 * Barrel file with metadata for all 6 lessons.
 *
 * VISUAL-FIRST REWRITE: All lessons are now 80% visual, 20% text.
 * Uses animated brain, neuron networks, interactive charts, step-by-step
 * visual explainers, and visual quizzes. No walls of text.
 *
 * Each entry provides:
 *   id               -- stable identifier used in routing, storage, and spaced-rep
 *   title            -- human-readable lesson title
 *   component        -- lazy-importable React component
 *   estimatedMinutes -- approximate interaction time
 *   modalities       -- types of engagement the lesson includes
 *   summary          -- one-sentence description for module overview cards
 */

import Lesson1_WhatMemoryIs from './Lesson1_WhatMemoryIs'
import Lesson2_ForgettingCurve from './Lesson2_ForgettingCurve'
import Lesson3_WhyPalacesWork from './Lesson3_WhyPalacesWork'
import Lesson4_RetrievalPractice from './Lesson4_RetrievalPractice'
import Lesson5_EncodingDepth from './Lesson5_EncodingDepth'
import Lesson6_ConsolidationAndSleep from './Lesson6_ConsolidationAndSleep'

export const foundationsLessons = [
  {
    id: 'memory.foundations.what-is-memory',
    slug: 'what-is-memory',
    title: 'What memory actually is',
    component: Lesson1_WhatMemoryIs,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'animated-brain', 'neuron-animation', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'See the three stages of memory in action: animated brain regions, firing neurons, and the illusion of competence visualized.',
  },
  {
    id: 'memory.foundations.forgetting-curve',
    slug: 'forgetting-curve',
    title: 'The forgetting curve (and why it\'s good news)',
    component: Lesson2_ForgettingCurve,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'interactive-curve', 'spacing-viz', 'interactive-timeline', 'visual-quiz', 'feynman'],
    summary:
      'Watch the forgetting curve draw itself, then add reviews to change its shape. See cramming vs spacing side by side.',
  },
  {
    id: 'memory.foundations.why-palaces-work',
    slug: 'why-palaces-work',
    title: 'Why memory palaces work',
    component: Lesson3_WhyPalacesWork,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'memory-palace-3d', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Walk through a 3D memory palace. Place vivid images at loci. See dual coding and spatial memory in action.',
  },
  {
    id: 'memory.foundations.retrieval-practice',
    slug: 'retrieval-practice',
    title: 'Retrieval practice',
    component: Lesson4_RetrievalPractice,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'neuron-animation', 'visual-quiz', 'feynman'],
    summary:
      'Watch neurons fire and connections form. See why retrieval strengthens pathways while re-reading leaves them thin.',
  },
  {
    id: 'memory.foundations.encoding-depth',
    slug: 'encoding-depth',
    title: 'Encoding depth',
    component: Lesson5_EncodingDepth,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'encoding-depth-viz', 'visual-quiz', 'feynman'],
    summary:
      'Compare shallow vs deep encoding side by side. Toggle encoding layers and watch the memory trace grow.',
  },
  {
    id: 'memory.foundations.consolidation-and-sleep',
    slug: 'consolidation-and-sleep',
    title: 'Consolidation and sleep',
    component: Lesson6_ConsolidationAndSleep,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'sleep-consolidation-viz', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Watch memories migrate during sleep. See slow-wave and REM phases consolidate traces in real time.',
  },
]

export {
  Lesson1_WhatMemoryIs,
  Lesson2_ForgettingCurve,
  Lesson3_WhyPalacesWork,
  Lesson4_RetrievalPractice,
  Lesson5_EncodingDepth,
  Lesson6_ConsolidationAndSleep,
}

export default foundationsLessons
