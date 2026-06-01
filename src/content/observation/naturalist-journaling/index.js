/**
 * Observation Pillar -- Module 5: Naturalist Journaling
 * Barrel file with metadata for all 4 lessons.
 *
 * John Muir Laws' three-prompt framework: I Notice, I Wonder,
 * It Reminds Me Of. Research on observational learning,
 * analogical encoding, and the drawing effect.
 */

import Lesson1_INotice from './Lesson1_INotice'
import Lesson2_IWonder from './Lesson2_IWonder'
import Lesson3_ItRemindsMeOf from './Lesson3_ItRemindsMeOf'
import Lesson4_FieldJournal from './Lesson4_FieldJournal'

export const naturalistJournalingLessons = [
  {
    id: 'observation.naturalist-journaling.i-notice',
    slug: 'i-notice',
    title: 'I Notice',
    component: Lesson1_INotice,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'observation-scene', 'prompt', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Train the eye to report what the senses register before interpretation begins. The first prompt of nature journaling.',
  },
  {
    id: 'observation.naturalist-journaling.i-wonder',
    slug: 'i-wonder',
    title: 'I Wonder',
    component: Lesson2_IWonder,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'observation-scene', 'prompt', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Generate questions from observation. Curiosity as a dopaminergic anchor that widens the encoding window.',
  },
  {
    id: 'observation.naturalist-journaling.it-reminds-me',
    slug: 'it-reminds-me',
    title: 'It Reminds Me Of',
    component: Lesson3_ItRemindsMeOf,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'branch-scenario', 'prompt', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Connect observations to prior knowledge through analogical thinking. Multiple retrieval paths for deeper encoding.',
  },
  {
    id: 'observation.naturalist-journaling.field-journal',
    slug: 'field-journal',
    title: 'Field Journal',
    component: Lesson4_FieldJournal,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'observation-scene', 'prompt', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Combine all three prompts into a sustained practice. Journal structure, the drawing effect, and habit formation.',
  },
]

export {
  Lesson1_INotice,
  Lesson2_IWonder,
  Lesson3_ItRemindsMeOf,
  Lesson4_FieldJournal,
}

export default naturalistJournalingLessons
