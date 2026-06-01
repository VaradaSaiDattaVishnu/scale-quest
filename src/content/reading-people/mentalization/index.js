/**
 * Reading People Pillar -- Module 6: Mentalization
 * Fonagy & Bateman's mentalization-based treatment concepts.
 * Theory of mind. Perspective-taking. Failure modes.
 */

import Lesson1_WhatIsMentalization from './Lesson1_WhatIsMentalization'
import Lesson2_SelfAndOther from './Lesson2_SelfAndOther'
import Lesson3_Failures from './Lesson3_Failures'
import Lesson4_Practice from './Lesson4_Practice'

export const mentalizationLessons = [
  {
    id: 'reading-people.mentalization.what-is-mentalization',
    slug: 'what-is-mentalization',
    title: 'What is mentalization',
    component: Lesson1_WhatIsMentalization,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'interactive-quiz', 'feynman'],
    summary: 'Understanding behavior through mental states. When mentalization fails, reading people becomes projection.',
  },
  {
    id: 'reading-people.mentalization.self-and-other',
    slug: 'self-and-other',
    title: 'Self and other',
    component: Lesson2_SelfAndOther,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary: 'You cannot read others until you can read yourself. The pre-reading self-check protocol.',
  },
  {
    id: 'reading-people.mentalization.failures',
    slug: 'failures',
    title: 'Mentalization failures',
    component: Lesson3_Failures,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'branch-scenario', 'interactive-quiz', 'feynman'],
    summary: 'Psychic equivalence, pretend mode, teleological mode. Recognize when your mentalizing breaks down.',
  },
  {
    id: 'reading-people.mentalization.practice',
    slug: 'practice',
    title: 'Mentalization practice',
    component: Lesson4_Practice,
    estimatedMinutes: 20,
    modalities: ['visual-explainer', 'branch-scenario', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary: 'The five-step mentalization loop. Curiosity over certainty. Ethics of modeling inner worlds.',
  },
]

export {
  Lesson1_WhatIsMentalization,
  Lesson2_SelfAndOther,
  Lesson3_Failures,
  Lesson4_Practice,
}

export default mentalizationLessons
