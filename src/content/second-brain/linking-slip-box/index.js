/**
 * Second Brain Pillar -- Module 3: Linking & Slip-Box
 * Barrel file with metadata for all 4 lessons.
 *
 * Niklas Luhmann's Zettelkasten (70,000 notes, 70 books).
 * Link types: sequence, branching, reference.
 * Research on associative memory and network effects.
 */

import Lesson1_WhatIsZettelkasten from './Lesson1_WhatIsZettelkasten'
import Lesson2_LinkTypes from './Lesson2_LinkTypes'
import Lesson3_StructureNotes from './Lesson3_StructureNotes'
import Lesson4_Practice from './Lesson4_Practice'

export const linkingSlipBoxLessons = [
  {
    id: 'second-brain.linking-slip-box.what-is-zettelkasten',
    slug: 'what-is-zettelkasten',
    title: 'What is Zettelkasten',
    component: Lesson1_WhatIsZettelkasten,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'network-graph', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Discover Luhmann\'s slip-box system. Watch a network graph form as notes connect. See why links beat categories.',
  },
  {
    id: 'second-brain.linking-slip-box.link-types',
    slug: 'link-types',
    title: 'Link types',
    component: Lesson2_LinkTypes,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'drag-match', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Learn sequence, branching, and reference links. Match link types to their purpose in a knowledge network.',
  },
  {
    id: 'second-brain.linking-slip-box.structure-notes',
    slug: 'structure-notes',
    title: 'Structure notes',
    component: Lesson3_StructureNotes,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Build hub notes that organize clusters of atomic notes. Understand when structure should emerge vs. be planned.',
  },
  {
    id: 'second-brain.linking-slip-box.practice',
    slug: 'practice',
    title: 'Practice: Linking your notes',
    component: Lesson4_Practice,
    estimatedMinutes: 20,
    modalities: ['visual-explainer', 'sort-sequence', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Hands-on exercises to create links, choose link types, and build structure notes from existing atomic notes.',
  },
]

export {
  Lesson1_WhatIsZettelkasten,
  Lesson2_LinkTypes,
  Lesson3_StructureNotes,
  Lesson4_Practice,
}

export default linkingSlipBoxLessons
