/**
 * Reading People Pillar -- Module 2: Rogers & Active Listening
 * Carl Rogers' person-centered therapy principles applied to
 * the practice of reading people with empathy and accuracy.
 *
 * Each entry provides:
 *   id               -- stable identifier used in routing, storage, and spaced-rep
 *   slug             -- URL-friendly path segment
 *   title            -- human-readable lesson title
 *   component        -- React component
 *   estimatedMinutes -- approximate interaction time
 *   modalities       -- types of engagement the lesson includes
 *   summary          -- one-sentence description for module overview cards
 */

import Lesson1_UnconditionalPositiveRegard from './Lesson1_UnconditionalPositiveRegard'
import Lesson2_ReflectiveListening from './Lesson2_ReflectiveListening'
import Lesson3_Paraphrasing from './Lesson3_Paraphrasing'
import Lesson4_SilenceAsSkill from './Lesson4_SilenceAsSkill'

export const rogersActiveListeningLessons = [
  {
    id: 'reading-people.rogers-active-listening.unconditional-positive-regard',
    slug: 'unconditional-positive-regard',
    title: 'Unconditional positive regard',
    component: Lesson1_UnconditionalPositiveRegard,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Rogers\' foundational discovery: accurate perception requires genuine acceptance. Judgment narrows what you can see.',
  },
  {
    id: 'reading-people.rogers-active-listening.reflective-listening',
    slug: 'reflective-listening',
    title: 'Reflective listening',
    component: Lesson2_ReflectiveListening,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'branch-scenario', 'interactive-quiz', 'feynman'],
    summary:
      'Mirror meaning, not words. Animated conversation diagrams showing how reflective responses deepen understanding.',
  },
  {
    id: 'reading-people.rogers-active-listening.paraphrasing',
    slug: 'paraphrasing',
    title: 'Paraphrasing',
    component: Lesson3_Paraphrasing,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'drag-match', 'prompt', 'interactive-quiz', 'feynman'],
    summary:
      'Restate content and feeling in your own words. Practice distinguishing paraphrasing from parroting and summarizing.',
  },
  {
    id: 'reading-people.rogers-active-listening.silence-as-skill',
    slug: 'silence-as-skill',
    title: 'Silence as skill',
    component: Lesson4_SilenceAsSkill,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'The most underrated listening tool. Learn when silence creates space and when it creates distance.',
  },
]

export {
  Lesson1_UnconditionalPositiveRegard,
  Lesson2_ReflectiveListening,
  Lesson3_Paraphrasing,
  Lesson4_SilenceAsSkill,
}

export default rogersActiveListeningLessons
