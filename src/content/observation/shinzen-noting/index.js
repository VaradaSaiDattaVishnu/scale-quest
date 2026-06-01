/**
 * Observation Pillar -- Module 4: Shinzen Noting
 * Barrel file with metadata for all 4 lessons.
 *
 * Covers Shinzen Young's Unified Mindfulness system: See/Hear/Feel
 * as sensory categories, In/Out as direction, noting practice,
 * and equanimity. Research: Jha et al. 2007, Lutz et al. 2008,
 * Brewer et al. 2011, Khoury et al. 2013.
 */

import Lesson1_SeeHearFeel from './Lesson1_SeeHearFeel'
import Lesson2_InsideOutside from './Lesson2_InsideOutside'
import Lesson3_NotingPractice from './Lesson3_NotingPractice'
import Lesson4_Equanimity from './Lesson4_Equanimity'

export const shinzenNotingLessons = [
  {
    id: 'observation.shinzen-noting.see-hear-feel',
    slug: 'see-hear-feel',
    title: 'See / Hear / Feel',
    component: Lesson1_SeeHearFeel,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'interactive-diagram', 'observation-scene', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Learn Shinzen Young\'s three sensory categories. Interact with the sensory triad diagram and practice categorizing real-time experience.',
  },
  {
    id: 'observation.shinzen-noting.inside-outside',
    slug: 'inside-outside',
    title: 'Inside / Outside',
    component: Lesson2_InsideOutside,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'interactive-grid', 'observation-scene', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Expand the 3-category system into a 6-cell grid with the In/Out dimension. Learn to decompose vague emotional states into observable sensory events.',
  },
  {
    id: 'observation.shinzen-noting.noting-practice',
    slug: 'noting-practice',
    title: 'Noting Practice',
    component: Lesson3_NotingPractice,
    estimatedMinutes: 20,
    modalities: ['visual-explainer', 'noting-timer', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Two minutes of guided real-time noting with an interactive timer. See your attention distribution visualized after the practice.',
  },
  {
    id: 'observation.shinzen-noting.equanimity',
    slug: 'equanimity',
    title: 'Equanimity',
    component: Lesson4_Equanimity,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'observation-scene', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Complete the system with non-reactive observation. Visualize pain x resistance = suffering. Practice equanimity with a hospital corridor scene.',
  },
]

export {
  Lesson1_SeeHearFeel,
  Lesson2_InsideOutside,
  Lesson3_NotingPractice,
  Lesson4_Equanimity,
}

export default shinzenNotingLessons
