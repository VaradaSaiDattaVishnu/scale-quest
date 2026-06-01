/**
 * Reading People Pillar -- Module 4: Micro-expressions
 * Paul Ekman's research on universal facial expressions.
 * CRITICAL: includes limits, error rates, and ethical guardrails.
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

import Lesson1_WhatMicroexpressionsAre from './Lesson1_WhatMicroexpressionsAre'
import Lesson2_SevenUniversal from './Lesson2_SevenUniversal'
import Lesson3_LimitsAndErrors from './Lesson3_LimitsAndErrors'
import Lesson4_Practice from './Lesson4_Practice'

export const microExpressionsLessons = [
  {
    id: 'reading-people.micro-expressions.what-microexpressions-are',
    slug: 'what-microexpressions-are',
    title: 'What micro-expressions are',
    component: Lesson1_WhatMicroexpressionsAre,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'interactive-quiz', 'feynman'],
    summary:
      'Ekman\'s discovery of involuntary facial expressions. FACS action units. Ethics of reading what others did not choose to reveal.',
  },
  {
    id: 'reading-people.micro-expressions.seven-universal',
    slug: 'seven-universal',
    title: 'The seven universal expressions',
    component: Lesson2_SevenUniversal,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'svg-faces', 'drag-match', 'interactive-quiz', 'feynman'],
    summary:
      'Animated SVG faces showing happiness, sadness, anger, fear, disgust, contempt, and surprise with their muscular signatures.',
  },
  {
    id: 'reading-people.micro-expressions.limits-and-errors',
    slug: 'limits-and-errors',
    title: 'Limits and errors',
    component: Lesson3_LimitsAndErrors,
    estimatedMinutes: 20,
    modalities: ['visual-explainer', 'branch-scenario', 'interactive-quiz', 'feynman'],
    summary:
      'The Othello Error, base rate neglect, and confirmation bias. The most important lesson in this module.',
  },
  {
    id: 'reading-people.micro-expressions.practice',
    slug: 'practice',
    title: 'Responsible practice',
    component: Lesson4_Practice,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'branch-scenario', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'The See-Contextualize-Ask protocol. Practice observing without over-interpreting. Humility as a skill.',
  },
]

export {
  Lesson1_WhatMicroexpressionsAre,
  Lesson2_SevenUniversal,
  Lesson3_LimitsAndErrors,
  Lesson4_Practice,
}

export default microExpressionsLessons
