/**
 * Reading People Pillar -- Module 3: Nonviolent Communication (NVC)
 * Marshall Rosenberg's four-step model: Observation, Feeling, Need, Request.
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

import Lesson1_Observations from './Lesson1_Observations'
import Lesson2_Feelings from './Lesson2_Feelings'
import Lesson3_Needs from './Lesson3_Needs'
import Lesson4_Requests from './Lesson4_Requests'
import Lesson5_Practice from './Lesson5_Practice'

export const nvcLessons = [
  {
    id: 'reading-people.nvc.observations',
    slug: 'observations',
    title: 'Observations without evaluation',
    component: Lesson1_Observations,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'drag-match', 'prompt', 'interactive-quiz', 'feynman'],
    summary:
      'NVC Step 1: separate what you see from what you think it means. The hardest step and the most important.',
  },
  {
    id: 'reading-people.nvc.feelings',
    slug: 'feelings',
    title: 'Feelings, not faux-feelings',
    component: Lesson2_Feelings,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'drag-match', 'prompt', 'interactive-quiz', 'feynman'],
    summary:
      'NVC Step 2: distinguish genuine feelings from faux-feelings that smuggle blame. Build emotional granularity.',
  },
  {
    id: 'reading-people.nvc.needs',
    slug: 'needs',
    title: 'Universal human needs',
    component: Lesson3_Needs,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'drag-match', 'interactive-quiz', 'feynman'],
    summary:
      'NVC Step 3: trace every feeling to an unmet need. This reframe turns judgment into understanding.',
  },
  {
    id: 'reading-people.nvc.requests',
    slug: 'requests',
    title: 'Requests, not demands',
    component: Lesson4_Requests,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'branch-scenario', 'interactive-quiz', 'feynman'],
    summary:
      'NVC Step 4: make specific, positive, doable requests. The demand test reveals whether you are asking or commanding.',
  },
  {
    id: 'reading-people.nvc.practice',
    slug: 'practice',
    title: 'NVC in practice',
    component: Lesson5_Practice,
    estimatedMinutes: 20,
    modalities: ['visual-explainer', 'branch-scenario', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Full integration: convert real judgments into O-F-N-R sequences through branching scenario practice.',
  },
]

export {
  Lesson1_Observations,
  Lesson2_Feelings,
  Lesson3_Needs,
  Lesson4_Requests,
  Lesson5_Practice,
}

export default nvcLessons
