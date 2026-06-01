/**
 * Trauma Pillar -- Module 5: Parts Mapping
 * IFS-informed (Schwartz). Parts, Self, Exiles, Managers, Firefighters.
 */

import Lesson1_WhatAreParts from './Lesson1_WhatAreParts'
import Lesson2_SelfEnergy from './Lesson2_SelfEnergy'
import Lesson3_Exiles from './Lesson3_Exiles'
import Lesson4_Managers from './Lesson4_Managers'
import Lesson5_Firefighters from './Lesson5_Firefighters'
import Lesson6_MappingPractice from './Lesson6_MappingPractice'

export const partsMappingLessons = [
  {
    id: 'trauma.parts-mapping.what-are-parts',
    slug: 'what-are-parts',
    title: 'What are parts?',
    component: Lesson1_WhatAreParts,
    estimatedMinutes: 18,
    modalities: ['nervous-system-checkin', 'visual-explainer', 'parts-diagram', 'visual-quiz', 'feynman', 'journal'],
    summary: 'The mind is naturally multiple. Parts as protectors, not pathology.',
  },
  {
    id: 'trauma.parts-mapping.self-energy',
    slug: 'self-energy',
    title: 'Self energy',
    component: Lesson2_SelfEnergy,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'visual-quiz', 'feynman', 'journal'],
    summary: 'The 8 C\'s of Self. The calm center that observes all parts with compassion.',
  },
  {
    id: 'trauma.parts-mapping.exiles',
    slug: 'exiles',
    title: 'Exiles',
    component: Lesson3_Exiles,
    estimatedMinutes: 16,
    modalities: ['visual-explainer', 'visual-quiz', 'feynman', 'journal'],
    summary: 'The wounded parts that carry burdens of shame, terror, and grief.',
  },
  {
    id: 'trauma.parts-mapping.managers',
    slug: 'managers',
    title: 'Managers',
    component: Lesson4_Managers,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'visual-quiz', 'feynman', 'journal'],
    summary: 'Proactive protectors: the critic, the perfectionist, the controller.',
  },
  {
    id: 'trauma.parts-mapping.firefighters',
    slug: 'firefighters',
    title: 'Firefighters',
    component: Lesson5_Firefighters,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'visual-quiz', 'feynman', 'journal'],
    summary: 'Reactive protectors that extinguish exile pain at any cost.',
  },
  {
    id: 'trauma.parts-mapping.mapping-practice',
    slug: 'mapping-practice',
    title: 'Mapping practice',
    component: Lesson6_MappingPractice,
    estimatedMinutes: 16,
    modalities: ['visual-explainer', 'prompt', 'visual-quiz', 'feynman', 'journal'],
    summary: 'Guided practice for beginning to map your own internal landscape.',
  },
]

export {
  Lesson1_WhatAreParts,
  Lesson2_SelfEnergy,
  Lesson3_Exiles,
  Lesson4_Managers,
  Lesson5_Firefighters,
  Lesson6_MappingPractice,
}

export default partsMappingLessons
