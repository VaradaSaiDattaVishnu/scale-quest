/**
 * Memory Pillar -- Module 4: PAO (Person-Action-Object)
 * Barrel file with metadata for all 8 lessons.
 *
 * VISUAL-FIRST DESIGN: All lessons mix animated visual explainers with
 * research-grounded text paragraphs, interactive exercises, and reflection.
 *
 * Each entry provides:
 *   id               -- stable identifier used in routing, storage, and spaced-rep
 *   slug             -- URL-safe path segment
 *   title            -- human-readable lesson title
 *   component        -- React component
 *   estimatedMinutes -- approximate interaction time
 *   modalities       -- types of engagement the lesson includes
 *   summary          -- one-sentence description for module overview cards
 */

import Lesson1_Concept from './Lesson1_Concept'
import Lesson2_Building00to99 from './Lesson2_Building00to99'
import Lesson3_CardsEncoding from './Lesson3_CardsEncoding'
import Lesson4_CompetitionPrep from './Lesson4_CompetitionPrep'
import Lesson5_SpeedDrills from './Lesson5_SpeedDrills'
import Lesson6_TwoCardSystem from './Lesson6_TwoCardSystem'
import Lesson7_PracticeDeck from './Lesson7_PracticeDeck'
import Lesson8_FirstTimed from './Lesson8_FirstTimed'

export const paoLessons = [
  {
    id: 'memory.pao.concept',
    slug: 'concept',
    title: 'Person-Action-Object Concept',
    component: Lesson1_Concept,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'interactive-quiz', 'drag-match', 'feynman', 'journal'],
    summary:
      'Learn the PAO system: how every two-digit number becomes a Person doing an Action with an Object, and how three images combine into one scene.',
  },
  {
    id: 'memory.pao.building-00-99',
    slug: 'building-00-99',
    title: 'Building Your 00-99 PAO List',
    component: Lesson2_Building00to99,
    estimatedMinutes: 20,
    modalities: ['visual-explainer', 'sort-sequence', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Create your personal PAO list for all 100 two-digit numbers using the self-reference effect and vivid personal imagery.',
  },
  {
    id: 'memory.pao.cards-encoding',
    slug: 'cards-encoding',
    title: 'Cards Encoding with PAO',
    component: Lesson3_CardsEncoding,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'drag-match', 'interactive-quiz', 'feynman'],
    summary:
      'Map all 52 playing cards to PAO images using suit-based number ranges and dual coding for full-deck memorization.',
  },
  {
    id: 'memory.pao.competition-prep',
    slug: 'competition-prep',
    title: 'Competition Prep & Deliberate Practice',
    component: Lesson4_CompetitionPrep,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'branch-scenario', 'interactive-quiz', 'feynman'],
    summary:
      'Understand how memory competitions work and apply Ericsson\'s deliberate practice framework to structure your training.',
  },
  {
    id: 'memory.pao.speed-drills',
    slug: 'speed-drills',
    title: 'Speed Drills for Automaticity',
    component: Lesson5_SpeedDrills,
    estimatedMinutes: 20,
    modalities: ['visual-explainer', 'interactive-drill', 'sort-sequence', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Build encoding speed through flash drills, sequence drills, and reverse drills based on the power law of practice.',
  },
  {
    id: 'memory.pao.two-card-system',
    slug: 'two-card-system',
    title: 'The Two-Card System',
    component: Lesson6_TwoCardSystem,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'drag-match', 'interactive-quiz', 'feynman'],
    summary:
      'Advanced encoding: combine two cards per scene for faster deck memorization using cognitive load theory.',
  },
  {
    id: 'memory.pao.practice-deck',
    slug: 'practice-deck',
    title: 'Full Practice Deck Walkthrough',
    component: Lesson7_PracticeDeck,
    estimatedMinutes: 25,
    modalities: ['visual-explainer', 'progress-tracker', 'sort-sequence', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Walk through your first full 52-card deck encoding with scene anchoring, errorless learning, and a visual progress tracker.',
  },
  {
    id: 'memory.pao.first-timed',
    slug: 'first-timed',
    title: 'Your First Timed Attempt',
    component: Lesson8_FirstTimed,
    estimatedMinutes: 25,
    modalities: ['visual-explainer', 'timer', 'branch-scenario', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Take your first timed full-deck attempt, analyze error patterns, and establish your personal baseline for ongoing improvement.',
  },
]

export {
  Lesson1_Concept,
  Lesson2_Building00to99,
  Lesson3_CardsEncoding,
  Lesson4_CompetitionPrep,
  Lesson5_SpeedDrills,
  Lesson6_TwoCardSystem,
  Lesson7_PracticeDeck,
  Lesson8_FirstTimed,
}

export default paoLessons
