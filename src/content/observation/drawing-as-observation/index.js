/**
 * Observation Pillar -- Module 3: Drawing as Observation
 * Barrel file with metadata for all 4 lessons.
 *
 * Covers Betty Edwards' Drawing on the Right Side of the Brain,
 * L-mode vs R-mode processing, contour drawing, negative space,
 * and Kimon Nicolaides' gesture drawing method.
 */

import Lesson1_PureContour from './Lesson1_PureContour'
import Lesson2_NegativeSpace from './Lesson2_NegativeSpace'
import Lesson3_ModifiedContour from './Lesson3_ModifiedContour'
import Lesson4_GestureDrawing from './Lesson4_GestureDrawing'

export const drawingAsObservationLessons = [
  {
    id: 'observation.drawing-as-observation.pure-contour',
    slug: 'pure-contour',
    title: 'Pure Contour Drawing',
    component: Lesson1_PureContour,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'self-drawing-animation', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Watch a hand contour draw itself as you learn Betty Edwards\' L-mode/R-mode framework. Try blind contour drawing to shift your perception.',
  },
  {
    id: 'observation.drawing-as-observation.negative-space',
    slug: 'negative-space',
    title: 'Negative Space',
    component: Lesson2_NegativeSpace,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'toggle-negative-space', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Toggle negative space on a chair to see the invisible shapes. Learn why drawing what is NOT the object produces more accurate results.',
  },
  {
    id: 'observation.drawing-as-observation.modified-contour',
    slug: 'modified-contour',
    title: 'Modified Contour Drawing',
    component: Lesson3_ModifiedContour,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'self-drawing-animation', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'The practical fusion: 90% observation, 10% checking. Watch an animated leaf draw itself as you learn the expert artist\'s looking ratio.',
  },
  {
    id: 'observation.drawing-as-observation.gesture-drawing',
    slug: 'gesture-drawing',
    title: 'Gesture Drawing',
    component: Lesson4_GestureDrawing,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'self-drawing-animation', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Capture the whole in 30 seconds. Animated gesture figures demonstrate how speed forces holistic perception over detailed analysis.',
  },
]

export {
  Lesson1_PureContour,
  Lesson2_NegativeSpace,
  Lesson3_ModifiedContour,
  Lesson4_GestureDrawing,
}

export default drawingAsObservationLessons
