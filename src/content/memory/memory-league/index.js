/**
 * Memory Pillar -- Module 8: Memory League
 * Barrel file with metadata for all 5 lessons.
 *
 * VISUAL-FIRST REWRITE: All lessons are 80% visual, 20% text.
 * Covers the five core competitive memory events: speed numbers,
 * speed cards, random words, names and faces, and abstract images.
 *
 * Each entry provides:
 *   id               -- stable identifier used in routing, storage, and spaced-rep
 *   title            -- human-readable lesson title
 *   component        -- lazy-importable React component
 *   estimatedMinutes -- approximate interaction time
 *   modalities       -- types of engagement the lesson includes
 *   summary          -- one-sentence description for module overview cards
 */

import Lesson1_Numbers from './Lesson1_Numbers'
import Lesson2_Cards from './Lesson2_Cards'
import Lesson3_Words from './Lesson3_Words'
import Lesson4_Names from './Lesson4_Names'
import Lesson5_Images from './Lesson5_Images'

export const memoryLeagueLessons = [
  {
    id: 'memory.memory-league.numbers',
    slug: 'numbers',
    title: 'Speed Numbers',
    component: Lesson1_Numbers,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'interactive-quiz', 'feynman'],
    summary:
      'Learn the Major System and PAO for converting digits to images. The gateway to competitive memory.',
  },
  {
    id: 'memory.memory-league.cards',
    slug: 'cards',
    title: 'Speed Cards',
    component: Lesson2_Cards,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'interactive-quiz', 'feynman'],
    summary:
      'Memorize a full shuffled deck using card-to-image systems and three-card compression at palace loci.',
  },
  {
    id: 'memory.memory-league.words',
    slug: 'words',
    title: 'Random Words',
    component: Lesson3_Words,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'interactive-quiz', 'feynman'],
    summary:
      'Turn any word list into a vivid palace journey. The most transferable competitive memory skill.',
  },
  {
    id: 'memory.memory-league.names',
    slug: 'names',
    title: 'Names and Faces',
    component: Lesson4_Names,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'interactive-quiz', 'feynman'],
    summary:
      'Apply feature anchoring and name-to-image at competitive speed: 5-8 seconds per face.',
  },
  {
    id: 'memory.memory-league.images',
    slug: 'images',
    title: 'Abstract Images',
    component: Lesson5_Images,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'interactive-quiz', 'feynman'],
    summary:
      'Encode meaningless shapes through forced association and pareidolia. Pure visual memory training.',
  },
]

export {
  Lesson1_Numbers,
  Lesson2_Cards,
  Lesson3_Words,
  Lesson4_Names,
  Lesson5_Images,
}

export default memoryLeagueLessons
