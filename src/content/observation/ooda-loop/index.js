/**
 * Observation Pillar -- Module 8: Boyd's OODA Loop
 * Barrel file with metadata for all 5 lessons.
 *
 * John Boyd's Observe-Orient-Decide-Act framework applied to
 * rapid perception and decision-making. Klein's RPD model.
 */

import Lesson1_Observe from './Lesson1_Observe'
import Lesson2_Orient from './Lesson2_Orient'
import Lesson3_Decide from './Lesson3_Decide'
import Lesson4_Act from './Lesson4_Act'
import Lesson5_Tempo from './Lesson5_Tempo'

export const oodaLoopLessons = [
  {
    id: 'observation.ooda-loop.observe',
    slug: 'observe',
    title: 'Observe',
    component: Lesson1_Observe,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'observation-scene', 'prompt', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'The first OODA phase: gathering unfiltered information. Open observation vs filtered observation. Klein\'s fixation error.',
  },
  {
    id: 'observation.ooda-loop.orient',
    slug: 'orient',
    title: 'Orient',
    component: Lesson2_Orient,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'branch-scenario', 'prompt', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'The critical phase: making sense through mental models. Five inputs to orientation. Destroying and creating models.',
  },
  {
    id: 'observation.ooda-loop.decide',
    slug: 'decide',
    title: 'Decide',
    component: Lesson3_Decide,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'branch-scenario', 'prompt', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Choosing under uncertainty. Recognition-primed decisions. Satisficing over optimizing. The decision as waypoint, not destination.',
  },
  {
    id: 'observation.ooda-loop.act',
    slug: 'act',
    title: 'Act',
    component: Lesson4_Act,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'branch-scenario', 'prompt', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Action as information generator. Every action changes the environment and feeds the next observation cycle.',
  },
  {
    id: 'observation.ooda-loop.tempo',
    slug: 'tempo',
    title: 'Tempo',
    component: Lesson5_Tempo,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'branch-scenario', 'prompt', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Cycle speed as strategic variable. Fast vs slow tempo. Getting inside the opponent\'s loop. Choosing your own pace.',
  },
]

export {
  Lesson1_Observe,
  Lesson2_Orient,
  Lesson3_Decide,
  Lesson4_Act,
  Lesson5_Tempo,
}

export default oodaLoopLessons
