/**
 * Memory Pillar -- Module 9: Integration
 * Barrel file with metadata for all 4 lessons.
 *
 * VISUAL-FIRST REWRITE: All lessons are 80% visual, 20% text.
 * Capstone projects, teaching practice, personal rule-writing,
 * and final reflection. ReflectionJournal on every lesson.
 *
 * Each entry provides:
 *   id               -- stable identifier used in routing, storage, and spaced-rep
 *   title            -- human-readable lesson title
 *   component        -- lazy-importable React component
 *   estimatedMinutes -- approximate interaction time
 *   modalities       -- types of engagement the lesson includes
 *   summary          -- one-sentence description for module overview cards
 */

import Lesson1_PersonalCapstone from './Lesson1_PersonalCapstone'
import Lesson2_TeachingSomeone from './Lesson2_TeachingSomeone'
import Lesson3_TwentyRules from './Lesson3_TwentyRules'
import Lesson4_Reflection from './Lesson4_Reflection'

export const integrationLessons = [
  {
    id: 'memory.integration.personal-capstone',
    slug: 'personal-capstone',
    title: 'Personal Capstone',
    component: Lesson1_PersonalCapstone,
    estimatedMinutes: 20,
    modalities: ['visual-explainer', 'feynman', 'journal'],
    summary:
      'Apply every technique to a subject that matters to you. Choose your domain, build your plan, begin your practice.',
  },
  {
    id: 'memory.integration.teaching-someone',
    slug: 'teaching-someone',
    title: 'Teaching Someone',
    component: Lesson2_TeachingSomeone,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'interactive-quiz', 'feynman'],
    summary:
      'The deepest encoding is teaching. Use the Feynman method to explain a memory technique to a real person.',
  },
  {
    id: 'memory.integration.twenty-rules',
    slug: 'twenty-rules',
    title: 'Your Twenty Rules',
    component: Lesson3_TwentyRules,
    estimatedMinutes: 20,
    modalities: ['visual-explainer', 'feynman', 'journal'],
    summary:
      'Write your personal rules for memory, born from your experience and refined by your practice.',
  },
  {
    id: 'memory.integration.reflection',
    slug: 'reflection',
    title: 'Final Reflection',
    component: Lesson4_Reflection,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'feynman', 'journal'],
    summary:
      'Reflect on your memory journey: what surprised you, what resonated, and what your practice looks like going forward.',
  },
]

export {
  Lesson1_PersonalCapstone,
  Lesson2_TeachingSomeone,
  Lesson3_TwentyRules,
  Lesson4_Reflection,
}

export default integrationLessons
