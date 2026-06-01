/**
 * Observation Pillar -- Module 1: Inattentional Blindness
 * Barrel file with metadata for all 4 lessons.
 *
 * Covers Simons & Chabris gorilla experiment, Rensink change blindness,
 * cocktail party effect / selective attention research, and a daily
 * attention audit practice.
 */

import Lesson1_GorillaEffect from './Lesson1_GorillaEffect'
import Lesson2_ChangeBlindness from './Lesson2_ChangeBlindness'
import Lesson3_AttentionFilters from './Lesson3_AttentionFilters'
import Lesson4_DailyAudit from './Lesson4_DailyAudit'

export const inattentionalBlindnessLessons = [
  {
    id: 'observation.inattentional-blindness.gorilla-effect',
    slug: 'gorilla-effect',
    title: 'The Gorilla Effect',
    component: Lesson1_GorillaEffect,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'observation-scene', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'See how half of all viewers miss a gorilla in plain sight. Animated demonstrations of inattentional blindness and the attention spotlight.',
  },
  {
    id: 'observation.inattentional-blindness.change-blindness',
    slug: 'change-blindness',
    title: 'Change Blindness',
    component: Lesson2_ChangeBlindness,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'flicker-demo', 'observation-scene', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Experience Rensink\'s flicker paradigm firsthand. Watch a scene change and discover how little of the visual world you actually store.',
  },
  {
    id: 'observation.inattentional-blindness.attention-filters',
    slug: 'attention-filters',
    title: 'Attention Filters',
    component: Lesson3_AttentionFilters,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'interactive-filter', 'observation-scene', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Toggle between Broadbent and Treisman attention models. See how the cocktail party effect reveals the limits of selective filtering.',
  },
  {
    id: 'observation.inattentional-blindness.daily-audit',
    slug: 'daily-audit',
    title: 'Daily Attention Audit',
    component: Lesson4_DailyAudit,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'observation-scene', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Build a five-point daily practice for broadening attention. Combine all module insights into a sustainable observation habit.',
  },
]

export {
  Lesson1_GorillaEffect,
  Lesson2_ChangeBlindness,
  Lesson3_AttentionFilters,
  Lesson4_DailyAudit,
}

export default inattentionalBlindnessLessons
