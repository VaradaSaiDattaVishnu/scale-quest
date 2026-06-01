/**
 * Second Brain Pillar -- Module 4: Notes to Cards
 * Barrel file with metadata for all 4 lessons.
 *
 * Bridge between note system and spaced repetition.
 * When a note should become a card. Research on desirable
 * difficulties and generation effect.
 */

import Lesson1_WhenToCard from './Lesson1_WhenToCard'
import Lesson2_CardFromNote from './Lesson2_CardFromNote'
import Lesson3_BidirectionalFlow from './Lesson3_BidirectionalFlow'
import Lesson4_Practice from './Lesson4_Practice'

export const notesToCardsLessons = [
  {
    id: 'second-brain.notes-to-cards.when-to-card',
    slug: 'when-to-card',
    title: 'When to card',
    component: Lesson1_WhenToCard,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Learn when a note should become a flashcard and when it should stay as a note. Understand desirable difficulties.',
  },
  {
    id: 'second-brain.notes-to-cards.card-from-note',
    slug: 'card-from-note',
    title: 'Card from note',
    component: Lesson2_CardFromNote,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'See the transformation from atomic note to flashcard. Apply the minimum information principle.',
  },
  {
    id: 'second-brain.notes-to-cards.bidirectional-flow',
    slug: 'bidirectional-flow',
    title: 'Bidirectional flow',
    component: Lesson3_BidirectionalFlow,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Cards refine notes, notes produce cards. See the feedback loop that compounds understanding.',
  },
  {
    id: 'second-brain.notes-to-cards.practice',
    slug: 'practice',
    title: 'Practice: Notes to cards',
    component: Lesson4_Practice,
    estimatedMinutes: 20,
    modalities: ['visual-explainer', 'sort-sequence', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Hands-on exercises to evaluate, extract, and link flashcards from your atomic notes.',
  },
]

export {
  Lesson1_WhenToCard,
  Lesson2_CardFromNote,
  Lesson3_BidirectionalFlow,
  Lesson4_Practice,
}

export default notesToCardsLessons
