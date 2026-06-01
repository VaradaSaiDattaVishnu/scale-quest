/**
 * Memory Pillar -- Module 7: Faces and Names
 * Barrel file with metadata for all 6 lessons.
 *
 * VISUAL-FIRST REWRITE: All lessons are 80% visual, 20% text.
 * Uses visual step explainers, SVG face illustrations, drag-match,
 * branch scenarios, and sort sequences. Research paragraphs provide depth.
 *
 * Each entry provides:
 *   id               -- stable identifier used in routing, storage, and spaced-rep
 *   title            -- human-readable lesson title
 *   component        -- lazy-importable React component
 *   estimatedMinutes -- approximate interaction time
 *   modalities       -- types of engagement the lesson includes
 *   summary          -- one-sentence description for module overview cards
 */

import Lesson1_NameGame from './Lesson1_NameGame'
import Lesson2_FeatureAnchoring from './Lesson2_FeatureAnchoring'
import Lesson3_FaceNamePalace from './Lesson3_FaceNamePalace'
import Lesson4_SocialEncoding from './Lesson4_SocialEncoding'
import Lesson5_PartyProtocol from './Lesson5_PartyProtocol'
import Lesson6_Review from './Lesson6_Review'

export const facesNamesLessons = [
  {
    id: 'memory.faces-names.name-game',
    slug: 'name-game',
    title: 'The Name Game',
    component: Lesson1_NameGame,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'drag-match', 'interactive-quiz', 'feynman'],
    summary:
      'Discover why names are uniquely hard to remember through the Baker-Baker paradox and learn the fix: make names meaningful.',
  },
  {
    id: 'memory.faces-names.feature-anchoring',
    slug: 'feature-anchoring',
    title: 'Feature Anchoring',
    component: Lesson2_FeatureAnchoring,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'interactive-quiz', 'feynman'],
    summary:
      'Learn to identify distinctive facial features and attach name-images to them for reliable retrieval.',
  },
  {
    id: 'memory.faces-names.face-name-palace',
    slug: 'face-name-palace',
    title: 'Face-Name Palace',
    component: Lesson3_FaceNamePalace,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'memory-palace-3d', 'interactive-quiz', 'feynman'],
    summary:
      'Place people at palace loci with vivid images. Walk the route to retrieve names in order.',
  },
  {
    id: 'memory.faces-names.social-encoding',
    slug: 'social-encoding',
    title: 'Social Encoding',
    component: Lesson4_SocialEncoding,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'branch-scenario', 'interactive-quiz', 'feynman'],
    summary:
      'Use conversation itself as a memory tool: repeat names, ask about them, and introduce people to deepen encoding.',
  },
  {
    id: 'memory.faces-names.party-protocol',
    slug: 'party-protocol',
    title: 'The Party Protocol',
    component: Lesson5_PartyProtocol,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'sort-sequence', 'interactive-quiz', 'feynman'],
    summary:
      'A complete three-phase protocol for remembering every name at a social event: prepare, encode, consolidate.',
  },
  {
    id: 'memory.faces-names.review',
    slug: 'review',
    title: 'Faces and Names: Review',
    component: Lesson6_Review,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Integrate all techniques into one system with four independent retrieval paths per name.',
  },
]

export {
  Lesson1_NameGame,
  Lesson2_FeatureAnchoring,
  Lesson3_FaceNamePalace,
  Lesson4_SocialEncoding,
  Lesson5_PartyProtocol,
  Lesson6_Review,
}

export default facesNamesLessons
