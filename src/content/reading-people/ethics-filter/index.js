/**
 * Reading People Pillar -- Module 1: Ethics Filter
 * ETHICS-GATED: This module must be completed before any other
 * module in the Reading People pillar is unlocked.
 *
 * Each entry provides:
 *   id               -- stable identifier used in routing, storage, and spaced-rep
 *   slug             -- URL-friendly path segment
 *   title            -- human-readable lesson title
 *   component        -- React component
 *   estimatedMinutes -- approximate interaction time
 *   modalities       -- types of engagement the lesson includes
 *   summary          -- one-sentence description for module overview cards
 */

import Lesson1_WhyEthicsFirst from './Lesson1_WhyEthicsFirst'
import Lesson2_PowerAndConsent from './Lesson2_PowerAndConsent'
import Lesson3_ManipulationVsUnderstanding from './Lesson3_ManipulationVsUnderstanding'
import Lesson4_YourEthicalStance from './Lesson4_YourEthicalStance'

export const ethicsFilterLessons = [
  {
    id: 'reading-people.ethics-filter.why-ethics-first',
    slug: 'why-ethics-first',
    title: 'Why ethics comes first',
    component: Lesson1_WhyEthicsFirst,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'interactive-quiz', 'prompt', 'feynman'],
    summary:
      'Understand why ethical grounding must precede any skill in reading people. Power without ethics is manipulation.',
  },
  {
    id: 'reading-people.ethics-filter.power-and-consent',
    slug: 'power-and-consent',
    title: 'Power and consent',
    component: Lesson2_PowerAndConsent,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'branch-scenario', 'interactive-quiz', 'feynman'],
    summary:
      'Explore the power asymmetry created by observation and the consent spectrum from ambient awareness to covert analysis.',
  },
  {
    id: 'reading-people.ethics-filter.manipulation-vs-understanding',
    slug: 'manipulation-vs-understanding',
    title: 'Manipulation vs understanding',
    component: Lesson3_ManipulationVsUnderstanding,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'drag-match', 'branch-scenario', 'interactive-quiz', 'feynman'],
    summary:
      'Draw the hard line between reading to understand and reading to exploit. Practice classifying real-world scenarios.',
  },
  {
    id: 'reading-people.ethics-filter.your-ethical-stance',
    slug: 'your-ethical-stance',
    title: 'Your ethical stance',
    component: Lesson4_YourEthicalStance,
    estimatedMinutes: 20,
    modalities: ['visual-explainer', 'branch-scenario', 'reflection-journal', 'interactive-quiz', 'feynman'],
    summary:
      'Articulate your personal ethical stance: boundaries, intentions, accountability, and repair. This unlocks the rest of the pillar.',
  },
]

export {
  Lesson1_WhyEthicsFirst,
  Lesson2_PowerAndConsent,
  Lesson3_ManipulationVsUnderstanding,
  Lesson4_YourEthicalStance,
}

export default ethicsFilterLessons
