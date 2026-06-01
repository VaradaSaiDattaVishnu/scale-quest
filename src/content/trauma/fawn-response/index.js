/**
 * Trauma Pillar -- Module 3: Fawn Response
 * Pete Walker's fawn type. People-pleasing as survival. Boundaries.
 */

import Lesson1_WhatIsFawning from './Lesson1_WhatIsFawning'
import Lesson2_Origins from './Lesson2_Origins'
import Lesson3_RecognizingPatterns from './Lesson3_RecognizingPatterns'
import Lesson4_BoundariesIntro from './Lesson4_BoundariesIntro'
import Lesson5_Practice from './Lesson5_Practice'

export const fawnResponseLessons = [
  {
    id: 'trauma.fawn-response.what-is-fawning',
    slug: 'what-is-fawning',
    title: 'What is fawning?',
    component: Lesson1_WhatIsFawning,
    estimatedMinutes: 18,
    modalities: ['nervous-system-checkin', 'visual-explainer', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'The survival strategy that hides in plain sight. Fawning as merging, not generosity.',
  },
  {
    id: 'trauma.fawn-response.origins',
    slug: 'origins',
    title: 'Where fawning comes from',
    component: Lesson2_Origins,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Attachment theory and the impossible bind of needing and fearing the same person.',
  },
  {
    id: 'trauma.fawn-response.recognizing-patterns',
    slug: 'recognizing-patterns',
    title: 'Recognizing fawn patterns',
    component: Lesson3_RecognizingPatterns,
    estimatedMinutes: 16,
    modalities: ['branch-scenario', 'visual-explainer', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Seeing the pattern with curiosity. Interactive scenarios for recognizing fawn activation.',
  },
  {
    id: 'trauma.fawn-response.boundaries-intro',
    slug: 'boundaries-intro',
    title: 'Introduction to boundaries',
    component: Lesson4_BoundariesIntro,
    estimatedMinutes: 16,
    modalities: ['branch-scenario', 'visual-explainer', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Why boundaries feel dangerous when you learned that having edges was unsafe. Gentle practice.',
  },
  {
    id: 'trauma.fawn-response.practice',
    slug: 'practice',
    title: 'Practice: working with fawn',
    component: Lesson5_Practice,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'prompt', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Small experiments in finding your own voice. Self-compassion as the foundation for change.',
  },
]

export {
  Lesson1_WhatIsFawning,
  Lesson2_Origins,
  Lesson3_RecognizingPatterns,
  Lesson4_BoundariesIntro,
  Lesson5_Practice,
}

export default fawnResponseLessons
