/**
 * Trauma Pillar -- Module 4: Polyvagal Theory
 * Porges' three states. Neuroception. Co-regulation. Deb Dana's applied framework.
 */

import Lesson1_ThreeStates from './Lesson1_ThreeStates'
import Lesson2_Neuroception from './Lesson2_Neuroception'
import Lesson3_CoRegulation from './Lesson3_CoRegulation'
import Lesson4_MappingYourLadder from './Lesson4_MappingYourLadder'
import Lesson5_GlimmersAndAnchors from './Lesson5_GlimmersAndAnchors'

export const polyvagalLessons = [
  {
    id: 'trauma.polyvagal.three-states',
    slug: 'three-states',
    title: 'Three states',
    component: Lesson1_ThreeStates,
    estimatedMinutes: 18,
    modalities: ['nervous-system-checkin', 'visual-explainer', 'vagal-ladder', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'The three autonomic states as a language for experience. Ventral vagal, sympathetic, dorsal vagal.',
  },
  {
    id: 'trauma.polyvagal.neuroception',
    slug: 'neuroception',
    title: 'Neuroception',
    component: Lesson2_Neuroception,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'The body decides safe or not safe before you think about it. Automatic threat detection and miscalibration.',
  },
  {
    id: 'trauma.polyvagal.co-regulation',
    slug: 'co-regulation',
    title: 'Co-regulation',
    component: Lesson3_CoRegulation,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'We were never meant to regulate alone. The nervous system\'s need for other nervous systems.',
  },
  {
    id: 'trauma.polyvagal.mapping-your-ladder',
    slug: 'mapping-your-ladder',
    title: 'Mapping your ladder',
    component: Lesson4_MappingYourLadder,
    estimatedMinutes: 16,
    modalities: ['visual-explainer', 'prompt', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Your personal autonomic map. Deb Dana\'s ladder with your own body sensations, triggers, and resources.',
  },
  {
    id: 'trauma.polyvagal.glimmers-and-anchors',
    slug: 'glimmers-and-anchors',
    title: 'Glimmers and anchors',
    component: Lesson5_GlimmersAndAnchors,
    estimatedMinutes: 14,
    modalities: ['visual-explainer', 'prompt', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Small moments of safety your nervous system can build on. Deb Dana\'s glimmer practice.',
  },
]

export {
  Lesson1_ThreeStates,
  Lesson2_Neuroception,
  Lesson3_CoRegulation,
  Lesson4_MappingYourLadder,
  Lesson5_GlimmersAndAnchors,
}

export default polyvagalLessons
