/**
 * Memory Pillar -- Module 3: The Major System
 * Barrel file with metadata for all 7 lessons.
 *
 * VISUAL + RESEARCH FORMAT: Each lesson mixes animated visual illustrations
 * with research-backed text paragraphs. Interactive exercises include
 * DragMatch, SortSequence, InteractiveQuiz, and FeynmanCheck widgets.
 *
 * Each entry provides:
 *   id               -- stable identifier used in routing, storage, and spaced-rep
 *   slug             -- URL-friendly segment
 *   title            -- human-readable lesson title
 *   component        -- React component
 *   estimatedMinutes -- approximate interaction time
 *   modalities       -- types of engagement the lesson includes
 *   summary          -- one-sentence description for module overview cards
 */

import Lesson1_ConsonantToDigit from './Lesson1_ConsonantToDigit'
import Lesson2_Building00to99 from './Lesson2_Building00to99'
import Lesson3_Drilling from './Lesson3_Drilling'
import Lesson4_PhoneNumbers from './Lesson4_PhoneNumbers'
import Lesson5_Dates from './Lesson5_Dates'
import Lesson6_Extension000to999 from './Lesson6_Extension000to999'
import Lesson7_Practice from './Lesson7_Practice'

export const majorSystemLessons = [
  {
    id: 'memory.major-system.consonant-to-digit',
    slug: 'consonant-to-digit',
    title: 'Consonant-to-Digit',
    component: Lesson1_ConsonantToDigit,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'drag-match', 'interactive-quiz', 'feynman'],
    summary:
      'Learn the ten consonant-to-digit pairings that form the backbone of the Major System. Drag-match practice and research on mnemonic history.',
  },
  {
    id: 'memory.major-system.building-00-99',
    slug: 'building-00-99',
    title: 'Building 00-99',
    component: Lesson2_Building00to99,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'sort-sequence', 'interactive-quiz', 'feynman'],
    summary:
      'Build your 100-image peg list. Step-by-step conversion from digit pairs to vivid, imageable words. Research on chunking and dual coding.',
  },
  {
    id: 'memory.major-system.drilling',
    slug: 'drilling',
    title: 'Drilling',
    component: Lesson3_Drilling,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'flash-drill', 'drag-match', 'interactive-quiz', 'feynman'],
    summary:
      'Speed drills for automaticity. Flash-card decoding, common pitfalls, and research on the power law of practice.',
  },
  {
    id: 'memory.major-system.phone-numbers',
    slug: 'phone-numbers',
    title: 'Phone Numbers',
    component: Lesson4_PhoneNumbers,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'sort-sequence', 'interactive-quiz', 'feynman'],
    summary:
      'Apply the Major System to memorize ten-digit phone numbers. Step-by-step conversion into image chains. Research on narrative chaining.',
  },
  {
    id: 'memory.major-system.dates',
    slug: 'dates',
    title: 'Dates',
    component: Lesson5_Dates,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'drag-match', 'interactive-quiz', 'feynman'],
    summary:
      'Encode historical dates and birthdays as vivid scenes. Visual timeline of encoded dates. Research on temporal memory and encoding specificity.',
  },
  {
    id: 'memory.major-system.extension-000-999',
    slug: 'extension-000-999',
    title: 'Extension 000-999',
    component: Lesson6_Extension000to999,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'drag-match', 'interactive-quiz', 'neuron-animation', 'feynman'],
    summary:
      'Expand to a 1,000-image system. Three-digit pegs, the PAO technique, and research on competitive memory athletes.',
  },
  {
    id: 'memory.major-system.practice',
    slug: 'practice',
    title: 'Practice',
    component: Lesson7_Practice,
    estimatedMinutes: 20,
    modalities: ['visual-explainer', 'drag-match', 'sort-sequence', 'interactive-quiz', 'neuron-animation', 'feynman', 'journal'],
    summary:
      'Comprehensive mixed practice across all Major System skills. Interleaved exercises, full FeynmanCheck, and reflective journaling.',
  },
]

export {
  Lesson1_ConsonantToDigit,
  Lesson2_Building00to99,
  Lesson3_Drilling,
  Lesson4_PhoneNumbers,
  Lesson5_Dates,
  Lesson6_Extension000to999,
  Lesson7_Practice,
}

export default majorSystemLessons
