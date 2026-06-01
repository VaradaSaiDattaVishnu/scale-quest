/**
 * Second Brain Pillar -- Module 2: Atomic Notes
 * Barrel file with metadata for all 4 lessons.
 *
 * Andy Matuschak's evergreen notes. One idea per note principle.
 * Concept handles for retrieval. Research on chunking and working memory.
 */

import Lesson1_OneIdeaPerNote from './Lesson1_OneIdeaPerNote'
import Lesson2_ConceptHandles from './Lesson2_ConceptHandles'
import Lesson3_DensityAndClarity from './Lesson3_DensityAndClarity'
import Lesson4_Practice from './Lesson4_Practice'

export const atomicNotesLessons = [
  {
    id: 'second-brain.atomic-notes.one-idea-per-note',
    slug: 'one-idea-per-note',
    title: 'One idea per note',
    component: Lesson1_OneIdeaPerNote,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'See atomic vs. bloated notes side by side. Understand why one idea per note is the foundation of a usable system.',
  },
  {
    id: 'second-brain.atomic-notes.concept-handles',
    slug: 'concept-handles',
    title: 'Concept handles',
    component: Lesson2_ConceptHandles,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'drag-match', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Learn to name ideas so they are easy to retrieve. Match vague titles to sharp concept handles.',
  },
  {
    id: 'second-brain.atomic-notes.density-and-clarity',
    slug: 'density-and-clarity',
    title: 'Density and clarity',
    component: Lesson3_DensityAndClarity,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Write notes that compress without losing meaning. Understand the generation effect and elaborative interrogation.',
  },
  {
    id: 'second-brain.atomic-notes.practice',
    slug: 'practice',
    title: 'Practice: Building atomic notes',
    component: Lesson4_Practice,
    estimatedMinutes: 20,
    modalities: ['visual-explainer', 'sort-sequence', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Hands-on exercises to create, refine, and connect atomic notes. Turn understanding into fluent skill.',
  },
]

export {
  Lesson1_OneIdeaPerNote,
  Lesson2_ConceptHandles,
  Lesson3_DensityAndClarity,
  Lesson4_Practice,
}

export default atomicNotesLessons
