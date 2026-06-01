/**
 * Memory Pillar -- Module 2: Your First Palace
 * Barrel file with metadata for all 5 lessons.
 *
 * Teaches the user to build, populate, and recall their first memory palace.
 * Covers method of loci, locus selection, vivid encoding (BEAM), bidirectional
 * review, and the first timed recall attempt.
 *
 * Each entry provides:
 *   id               -- stable identifier used in routing, storage, and spaced-rep
 *   slug             -- URL-friendly segment
 *   title            -- human-readable lesson title
 *   component        -- lazy-importable React component
 *   estimatedMinutes -- approximate interaction time
 *   modalities       -- types of engagement the lesson includes
 *   summary          -- one-sentence description for module overview cards
 */

import Lesson1_WalkingThrough from './Lesson1_WalkingThrough'
import Lesson2_ChoosingLoci from './Lesson2_ChoosingLoci'
import Lesson3_VividEncoding from './Lesson3_VividEncoding'
import Lesson4_ForwardBackward from './Lesson4_ForwardBackward'
import Lesson5_FirstRecall from './Lesson5_FirstRecall'

export const firstPalaceLessons = [
  {
    id: 'memory.first-palace.walking-through',
    slug: 'walking-through',
    title: 'Walking Through',
    component: Lesson1_WalkingThrough,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'memory-palace-3d', 'inline-svg', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Learn the method of loci by mentally walking through your home. Discover Simonides and the neuroscience of place cells.',
  },
  {
    id: 'memory.first-palace.choosing-loci',
    slug: 'choosing-loci',
    title: 'Choosing Loci',
    component: Lesson2_ChoosingLoci,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'inline-svg', 'sort-sequence', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Pick 10-20 stable, distinct, well-lit locations along your palace route. Learn why specificity prevents interference.',
  },
  {
    id: 'memory.first-palace.vivid-encoding',
    slug: 'vivid-encoding',
    title: 'Vivid Encoding',
    component: Lesson3_VividEncoding,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'inline-svg', 'drag-match', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Make images bizarre, emotional, active, and magnified. Explore the von Restorff isolation effect and bizarreness research.',
  },
  {
    id: 'memory.first-palace.forward-backward',
    slug: 'forward-backward',
    title: 'Forward / Backward',
    component: Lesson4_ForwardBackward,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'inline-svg', 'interactive-toggle', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Walk the palace forward, then backward. Build bidirectional retrieval pathways and discover weak links.',
  },
  {
    id: 'memory.first-palace.first-recall',
    slug: 'first-recall',
    title: 'First Recall',
    component: Lesson5_FirstRecall,
    estimatedMinutes: 20,
    modalities: ['visual-explainer', 'memory-palace-3d', 'timer', 'self-assessment', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Your first full palace recall attempt with timer and self-assessment. Learn why the testing effect makes this the most powerful lesson.',
  },
]

export {
  Lesson1_WalkingThrough,
  Lesson2_ChoosingLoci,
  Lesson3_VividEncoding,
  Lesson4_ForwardBackward,
  Lesson5_FirstRecall,
}

export default firstPalaceLessons
