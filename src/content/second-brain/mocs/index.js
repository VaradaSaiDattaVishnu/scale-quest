/**
 * Second Brain Pillar -- Module 6: Maps of Content (MOCs)
 * Barrel file with metadata for all 4 lessons.
 *
 * Nick Milo's Maps of Content. Only after 30+ evergreen notes.
 * MOCs as emergent structure. Research on schema theory.
 */

import Lesson1_WhatIsAMOC from './Lesson1_WhatIsAMOC'
import Lesson2_WhenToCreate from './Lesson2_WhenToCreate'
import Lesson3_StructureAndFlow from './Lesson3_StructureAndFlow'
import Lesson4_Practice from './Lesson4_Practice'

export const mocsLessons = [
  {
    id: 'second-brain.mocs.what-is-a-moc',
    slug: 'what-is-a-moc',
    title: 'What is a MOC',
    component: Lesson1_WhatIsAMOC,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'cluster-map', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Discover Maps of Content. See how a MOC provides navigable structure to a growing note collection.',
  },
  {
    id: 'second-brain.mocs.when-to-create',
    slug: 'when-to-create',
    title: 'When to create a MOC',
    component: Lesson2_WhenToCreate,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Understand the 30-note threshold and emergence signals. Know when structure will help vs. when it is premature.',
  },
  {
    id: 'second-brain.mocs.structure-and-flow',
    slug: 'structure-and-flow',
    title: 'Structure and flow',
    component: Lesson3_StructureAndFlow,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'sort-sequence', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Build MOCs that serve as thinking tools and writing outlines. Learn grouping, ordering, and annotation.',
  },
  {
    id: 'second-brain.mocs.practice',
    slug: 'practice',
    title: 'Practice: Building MOCs',
    component: Lesson4_Practice,
    estimatedMinutes: 20,
    modalities: ['visual-explainer', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Create a MOC from scratch using a topic you know well. Brainstorm, group, order, annotate, and identify gaps.',
  },
]

export {
  Lesson1_WhatIsAMOC,
  Lesson2_WhenToCreate,
  Lesson3_StructureAndFlow,
  Lesson4_Practice,
}

export default mocsLessons
