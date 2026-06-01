/**
 * Observation Pillar -- Module 2: Visual Intelligence
 * Barrel file with metadata for all 4 lessons.
 *
 * Covers Amy Herman's Visual Intelligence method, art-based observation
 * training used by FBI/CIA/medical schools, and the 4 A's framework
 * (Assess, Analyze, Articulate, Adapt).
 */

import Lesson1_DescribeDontInterpret from './Lesson1_DescribeDontInterpret'
import Lesson2_FourAs from './Lesson2_FourAs'
import Lesson3_ArtworkDrill from './Lesson3_ArtworkDrill'
import Lesson4_FieldApplication from './Lesson4_FieldApplication'

export const visualIntelligenceLessons = [
  {
    id: 'observation.visual-intelligence.describe-dont-interpret',
    slug: 'describe-dont-interpret',
    title: 'Describe, Don\'t Interpret',
    component: Lesson1_DescribeDontInterpret,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'artwork-scene', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Learn Amy Herman\'s foundational skill: separate what you see from what you infer. Practice with artwork-style scenes.',
  },
  {
    id: 'observation.visual-intelligence.four-as',
    slug: 'four-as',
    title: 'The Four A\'s',
    component: Lesson2_FourAs,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'interactive-diagram', 'observation-scene', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Master the Assess-Analyze-Articulate-Adapt framework with interactive cycle diagrams and a medical scenario walkthrough.',
  },
  {
    id: 'observation.visual-intelligence.artwork-drill',
    slug: 'artwork-drill',
    title: 'Artwork Drill',
    component: Lesson3_ArtworkDrill,
    estimatedMinutes: 20,
    modalities: ['visual-explainer', 'artwork-scenes', 'prompt', 'observation-scene', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Extended practice with multiple art-style scenes. Apply the Four A\'s and experience how depth increases with sustained looking.',
  },
  {
    id: 'observation.visual-intelligence.field-application',
    slug: 'field-application',
    title: 'Field Application',
    component: Lesson4_FieldApplication,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'domain-transfer', 'prompt', 'observation-scene', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Take Visual Intelligence from gallery to field. Address three communication failures and plan real-world observation exercises.',
  },
]

export {
  Lesson1_DescribeDontInterpret,
  Lesson2_FourAs,
  Lesson3_ArtworkDrill,
  Lesson4_FieldApplication,
}

export default visualIntelligenceLessons
