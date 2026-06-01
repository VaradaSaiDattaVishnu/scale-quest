/**
 * Observation Pillar -- Module 6: Photography as Seeing
 * Barrel file with metadata for all 4 lessons.
 *
 * Photography as sustained attention practice.
 * Visual composition principles, Cartier-Bresson's decisive moment,
 * Henkel's photo-taking impairment effect, perceptual learning.
 */

import Lesson1_FrameBeforeShoot from './Lesson1_FrameBeforeShoot'
import Lesson2_LightStudy from './Lesson2_LightStudy'
import Lesson3_SingleSubject from './Lesson3_SingleSubject'
import Lesson4_ReviewSession from './Lesson4_ReviewSession'

export const photographyAsSeeingLessons = [
  {
    id: 'observation.photography-as-seeing.frame-before-shoot',
    slug: 'frame-before-shoot',
    title: 'Frame Before You Shoot',
    component: Lesson1_FrameBeforeShoot,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'observation-scene', 'prompt', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Photography as deliberate attention, not compulsive capturing. The viewfinder as a focusing tool, not a bypass.',
  },
  {
    id: 'observation.photography-as-seeing.light-study',
    slug: 'light-study',
    title: 'Light Study',
    component: Lesson2_LightStudy,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'observation-scene', 'prompt', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Seeing light itself -- direction, quality, temperature, shadow -- as the fundamental medium of visual perception.',
  },
  {
    id: 'observation.photography-as-seeing.single-subject',
    slug: 'single-subject',
    title: 'Single Subject',
    component: Lesson3_SingleSubject,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'observation-scene', 'branch-scenario', 'prompt', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'The discipline of sustained attention on one subject. Perceptual learning through depth rather than breadth.',
  },
  {
    id: 'observation.photography-as-seeing.review-session',
    slug: 'review-session',
    title: 'Review Session',
    component: Lesson4_ReviewSession,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'branch-scenario', 'prompt', 'visual-quiz', 'feynman', 'journal'],
    summary:
      'Reviewing photographs as retrieval practice and metacognitive calibration of your own seeing patterns.',
  },
]

export {
  Lesson1_FrameBeforeShoot,
  Lesson2_LightStudy,
  Lesson3_SingleSubject,
  Lesson4_ReviewSession,
}

export default photographyAsSeeingLessons
