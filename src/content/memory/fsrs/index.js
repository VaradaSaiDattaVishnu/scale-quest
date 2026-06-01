/**
 * Memory Pillar -- Module 5: FSRS & Daily Habit
 * Barrel file with metadata for all 5 lessons.
 *
 * VISUAL-FIRST DESIGN: All lessons mix animated visual explainers with
 * research-grounded text paragraphs, interactive exercises, and reflection.
 *
 * Each entry provides:
 *   id               -- stable identifier used in routing, storage, and spaced-rep
 *   slug             -- URL-safe path segment
 *   title            -- human-readable lesson title
 *   component        -- React component
 *   estimatedMinutes -- approximate interaction time
 *   modalities       -- types of engagement the lesson includes
 *   summary          -- one-sentence description for module overview cards
 */

import Lesson1_WhatIsFSRS from './Lesson1_WhatIsFSRS'
import Lesson2_SettingUpReviews from './Lesson2_SettingUpReviews'
import Lesson3_First100Cards from './Lesson3_First100Cards'
import Lesson4_RetentionTargets from './Lesson4_RetentionTargets'
import Lesson5_MonthlyReoptimization from './Lesson5_MonthlyReoptimization'

export const fsrsLessons = [
  {
    id: 'memory.fsrs.what-is-fsrs',
    slug: 'what-is-fsrs',
    title: 'What Is FSRS?',
    component: Lesson1_WhatIsFSRS,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'sort-sequence', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Meet the Free Spaced Repetition Scheduler: trace the lineage from Ebbinghaus to FSRS and see how ML-based prediction outperforms SM-2.',
  },
  {
    id: 'memory.fsrs.setting-up-reviews',
    slug: 'setting-up-reviews',
    title: 'Setting Up Your Daily Reviews',
    component: Lesson2_SettingUpReviews,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'branch-scenario', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Design your daily review habit using implementation intentions and the habit loop. Learn why due cards always come before new cards.',
  },
  {
    id: 'memory.fsrs.first-100-cards',
    slug: 'first-100-cards',
    title: 'Your First 100 Cards',
    component: Lesson3_First100Cards,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'sort-sequence', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Build your initial deck at a sustainable pace (10 cards/day) using the minimum information principle for maximum FSRS accuracy.',
  },
  {
    id: 'memory.fsrs.retention-targets',
    slug: 'retention-targets',
    title: 'Understanding Retention Targets',
    component: Lesson4_RetentionTargets,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'branch-scenario', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'See the exponential cost curve of desired retention and learn why 0.90 is the sweet spot for most learners.',
  },
  {
    id: 'memory.fsrs.monthly-reoptimization',
    slug: 'monthly-reoptimization',
    title: 'Monthly Re-optimization',
    component: Lesson5_MonthlyReoptimization,
    estimatedMinutes: 20,
    modalities: ['visual-explainer', 'drag-match', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Keep FSRS calibrated to your changing memory: understand parameter drift, the optimization process, and when to re-run it.',
  },
]

export {
  Lesson1_WhatIsFSRS,
  Lesson2_SettingUpReviews,
  Lesson3_First100Cards,
  Lesson4_RetentionTargets,
  Lesson5_MonthlyReoptimization,
}

export default fsrsLessons
