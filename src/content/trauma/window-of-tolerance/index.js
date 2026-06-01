/**
 * Trauma Pillar -- Module 2: Window of Tolerance
 * Dan Siegel's model. Hyper/hypo-arousal, widening practice, daily mapping.
 */

import Lesson1_WhatIsWindow from './Lesson1_WhatIsWindow'
import Lesson2_HyperArousal from './Lesson2_HyperArousal'
import Lesson3_HypoArousal from './Lesson3_HypoArousal'
import Lesson4_WideningPractice from './Lesson4_WideningPractice'
import Lesson5_DailyMapping from './Lesson5_DailyMapping'

export const windowOfToleranceLessons = [
  {
    id: 'trauma.window-of-tolerance.what-is-window',
    slug: 'what-is-window',
    title: 'What is the Window of Tolerance?',
    component: Lesson1_WhatIsWindow,
    estimatedMinutes: 18,
    modalities: ['nervous-system-checkin', 'visual-explainer', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Dan Siegel\'s model: the zone where you can feel without drowning. Animated window diagram with hyper and hypo zones.',
  },
  {
    id: 'trauma.window-of-tolerance.hyper-arousal',
    slug: 'hyper-arousal',
    title: 'Hyperarousal',
    component: Lesson2_HyperArousal,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'body-map', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'When the nervous system runs too hot. Anxiety, panic, and rage mapped in the body.',
  },
  {
    id: 'trauma.window-of-tolerance.hypo-arousal',
    slug: 'hypo-arousal',
    title: 'Hypoarousal',
    component: Lesson3_HypoArousal,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'body-map', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'When the nervous system goes too quiet. Numbness, shutdown, and disconnection as dorsal vagal states.',
  },
  {
    id: 'trauma.window-of-tolerance.widening-practice',
    slug: 'widening-practice',
    title: 'Widening your window',
    component: Lesson4_WideningPractice,
    estimatedMinutes: 16,
    modalities: ['visual-explainer', 'breathing-dot', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Gentle, body-based practices for gradually expanding your window of tolerance. Titration and pendulation introduced.',
  },
  {
    id: 'trauma.window-of-tolerance.daily-mapping',
    slug: 'daily-mapping',
    title: 'Daily mapping',
    component: Lesson5_DailyMapping,
    estimatedMinutes: 14,
    modalities: ['visual-explainer', 'prompt', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Building the habit of noticing your nervous system state throughout the day. Interoceptive awareness as a skill.',
  },
]

export {
  Lesson1_WhatIsWindow,
  Lesson2_HyperArousal,
  Lesson3_HypoArousal,
  Lesson4_WideningPractice,
  Lesson5_DailyMapping,
}

export default windowOfToleranceLessons
