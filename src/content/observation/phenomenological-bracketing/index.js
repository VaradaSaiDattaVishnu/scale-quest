/**
 * Observation Pillar -- Module 7: Phenomenological Bracketing
 * Barrel file with metadata for all 4 lessons.
 *
 * Husserl's phenomenological reduction, epoche (suspension of judgment),
 * seeing the thing itself. Research on phenomenology in psychology.
 */

import Lesson1_WhatIsBracketing from './Lesson1_WhatIsBracketing'
import Lesson2_EpochPractice from './Lesson2_EpochPractice'
import Lesson3_DescribingExperience from './Lesson3_DescribingExperience'
import Lesson4_Integration from './Lesson4_Integration'

export const phenomenologicalBracketingLessons = [
  {
    id: 'observation.phenomenological-bracketing.what-is-bracketing',
    slug: 'what-is-bracketing',
    title: 'What Is Bracketing?',
    component: Lesson1_WhatIsBracketing,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'observation-scene', 'prompt', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Husserl\'s method of setting aside assumptions to see the thing itself. Layers of interpretation made visible.',
  },
  {
    id: 'observation.phenomenological-bracketing.epoch-practice',
    slug: 'epoch-practice',
    title: 'Epoche Practice',
    component: Lesson2_EpochPractice,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'branch-scenario', 'prompt', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'The art of suspending judgment. Creating a micro-gap between automatic reaction and conscious response.',
  },
  {
    id: 'observation.phenomenological-bracketing.describing-experience',
    slug: 'describing-experience',
    title: 'Describing Experience',
    component: Lesson3_DescribingExperience,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'observation-scene', 'prompt', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Finding faithful language for experience. Description as a seeing practice. Five levels from label to experiential.',
  },
  {
    id: 'observation.phenomenological-bracketing.integration',
    slug: 'integration',
    title: 'Integration',
    component: Lesson4_Integration,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'branch-scenario', 'prompt', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Combining bracketing, epoche, and description into a portable daily practice. The phenomenological cycle applied.',
  },
]

export {
  Lesson1_WhatIsBracketing,
  Lesson2_EpochPractice,
  Lesson3_DescribingExperience,
  Lesson4_Integration,
}

export default phenomenologicalBracketingLessons
