/**
 * Trauma Pillar -- Module 1: CPTSD
 * Pete Walker's framework. The 4F model: Fight, Flight, Freeze, Fawn.
 *
 * Each entry provides:
 *   id               -- stable identifier used in routing, storage, and spaced-rep
 *   title            -- human-readable lesson title
 *   component        -- React component
 *   estimatedMinutes -- approximate interaction time
 *   modalities       -- types of engagement the lesson includes
 *   summary          -- one-sentence description for module overview cards
 */

import Lesson1_WhatIsCPTSD from './Lesson1_WhatIsCPTSD'
import Lesson2_FightResponse from './Lesson2_FightResponse'
import Lesson3_FlightResponse from './Lesson3_FlightResponse'
import Lesson4_FreezeResponse from './Lesson4_FreezeResponse'
import Lesson5_FawnResponseIntro from './Lesson5_FawnResponseIntro'

export const cptsdLessons = [
  {
    id: 'trauma.cptsd.what-is-cptsd',
    slug: 'what-is-cptsd',
    title: 'What is Complex PTSD?',
    component: Lesson1_WhatIsCPTSD,
    estimatedMinutes: 18,
    modalities: ['nervous-system-checkin', 'visual-explainer', 'body-map', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Herman and van der Kolk\'s research on complex trauma. The 4F survival responses visualized as adaptations, not flaws.',
  },
  {
    id: 'trauma.cptsd.fight-response',
    slug: 'fight-response',
    title: 'The fight response',
    component: Lesson2_FightResponse,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'body-map', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'When safety meant taking control. The fight response mapped in the body, understood as protection.',
  },
  {
    id: 'trauma.cptsd.flight-response',
    slug: 'flight-response',
    title: 'The flight response',
    component: Lesson3_FlightResponse,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'body-map', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'When safety meant never standing still. Workaholism, perfectionism, and restlessness as survival strategies.',
  },
  {
    id: 'trauma.cptsd.freeze-response',
    slug: 'freeze-response',
    title: 'The freeze response',
    component: Lesson4_FreezeResponse,
    estimatedMinutes: 16,
    modalities: ['visual-explainer', 'body-map', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'When the safest thing was to disappear. Freeze, dissociation, and shutdown as the nervous system\'s last resort.',
  },
  {
    id: 'trauma.cptsd.fawn-response-intro',
    slug: 'fawn-response-intro',
    title: 'The fawn response: an introduction',
    component: Lesson5_FawnResponseIntro,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'People-pleasing as survival. A brief introduction to the fawn response before the full deep-dive module.',
  },
]

export {
  Lesson1_WhatIsCPTSD,
  Lesson2_FightResponse,
  Lesson3_FlightResponse,
  Lesson4_FreezeResponse,
  Lesson5_FawnResponseIntro,
}

export default cptsdLessons
