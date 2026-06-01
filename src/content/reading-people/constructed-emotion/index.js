/**
 * Reading People Pillar -- Module 5: Constructed Emotion
 * Lisa Feldman Barrett's theory. Emotions are predictions,
 * not reactions. Implications for reading people with humility.
 */

import Lesson1_ClassicalVsConstructed from './Lesson1_ClassicalVsConstructed'
import Lesson2_ConceptsAndPredictions from './Lesson2_ConceptsAndPredictions'
import Lesson3_EmotionalGranularity from './Lesson3_EmotionalGranularity'
import Lesson4_Implications from './Lesson4_Implications'

export const constructedEmotionLessons = [
  {
    id: 'reading-people.constructed-emotion.classical-vs-constructed',
    slug: 'classical-vs-constructed',
    title: 'Classical vs constructed emotion',
    component: Lesson1_ClassicalVsConstructed,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'interactive-quiz', 'feynman'],
    summary: 'Two paradigms of emotion. Barrett challenges Ekman. A skilled reader holds both.',
  },
  {
    id: 'reading-people.constructed-emotion.concepts-and-predictions',
    slug: 'concepts-and-predictions',
    title: 'Concepts and predictions',
    component: Lesson2_ConceptsAndPredictions,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'prompt', 'interactive-quiz', 'feynman'],
    summary: 'The brain as prediction engine. Same sensation, different emotion. Your concepts shape what you perceive.',
  },
  {
    id: 'reading-people.constructed-emotion.emotional-granularity',
    slug: 'emotional-granularity',
    title: 'Emotional granularity',
    component: Lesson3_EmotionalGranularity,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'drag-match', 'interactive-quiz', 'feynman', 'journal'],
    summary: 'The more precisely you name emotions, the better you regulate and perceive. Granularity is a trainable skill.',
  },
  {
    id: 'reading-people.constructed-emotion.implications',
    slug: 'implications',
    title: 'Implications for reading people',
    component: Lesson4_Implications,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'branch-scenario', 'interactive-quiz', 'feynman', 'journal'],
    summary: 'Readings are interpretations, not detections. Five practical guidelines for humble, accurate perception.',
  },
]

export {
  Lesson1_ClassicalVsConstructed,
  Lesson2_ConceptsAndPredictions,
  Lesson3_EmotionalGranularity,
  Lesson4_Implications,
}

export default constructedEmotionLessons
