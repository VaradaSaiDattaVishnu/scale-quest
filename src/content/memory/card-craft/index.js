/**
 * Memory Pillar -- Module 6: Card-Craft
 * Barrel file with metadata for all 6 lessons.
 *
 * VISUAL-FIRST REWRITE: All lessons are 80% visual, 20% text.
 * Uses visual step explainers, interactive quizzes, drag-match,
 * sort-sequence, and branch scenarios. Research paragraphs provide depth.
 *
 * Each entry provides:
 *   id               -- stable identifier used in routing, storage, and spaced-rep
 *   title            -- human-readable lesson title
 *   component        -- lazy-importable React component
 *   estimatedMinutes -- approximate interaction time
 *   modalities       -- types of engagement the lesson includes
 *   summary          -- one-sentence description for module overview cards
 */

import Lesson1_WozniakRules from './Lesson1_WozniakRules'
import Lesson2_AtomicCards from './Lesson2_AtomicCards'
import Lesson3_ClozeVsQA from './Lesson3_ClozeVsQA'
import Lesson4_RefactoringBadCards from './Lesson4_RefactoringBadCards'
import Lesson5_ConnectingToPalaces from './Lesson5_ConnectingToPalaces'
import Lesson6_ThousandCardMilestone from './Lesson6_ThousandCardMilestone'

export const cardCraftLessons = [
  {
    id: 'memory.card-craft.wozniak-rules',
    slug: 'wozniak-rules',
    title: 'Wozniak\'s Rules',
    component: Lesson1_WozniakRules,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'drag-match', 'interactive-quiz', 'feynman'],
    summary:
      'Learn the principles behind every effective flashcard, from Piotr Wozniak\'s 20 rules of formulating knowledge.',
  },
  {
    id: 'memory.card-craft.atomic-cards',
    slug: 'atomic-cards',
    title: 'Atomic Cards',
    component: Lesson2_AtomicCards,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'sort-sequence', 'interactive-quiz', 'feynman'],
    summary:
      'See why one fact per card eliminates interference, and learn the splitting process for bloated cards.',
  },
  {
    id: 'memory.card-craft.cloze-vs-qa',
    slug: 'cloze-vs-qa',
    title: 'Cloze vs. Q&A',
    component: Lesson3_ClozeVsQA,
    estimatedMinutes: 12,
    modalities: ['visual-explainer', 'interactive-quiz', 'feynman'],
    summary:
      'Compare cloze deletion and Q&A formats side by side. Know when each format serves you best.',
  },
  {
    id: 'memory.card-craft.refactoring-bad-cards',
    slug: 'refactoring-bad-cards',
    title: 'Refactoring Bad Cards',
    component: Lesson4_RefactoringBadCards,
    estimatedMinutes: 18,
    modalities: ['visual-explainer', 'branch-scenario', 'interactive-quiz', 'feynman'],
    summary:
      'Diagnose and fix common card failure modes: ambiguity, overload, and missing context.',
  },
  {
    id: 'memory.card-craft.connecting-to-palaces',
    slug: 'connecting-to-palaces',
    title: 'Connecting Cards to Palaces',
    component: Lesson5_ConnectingToPalaces,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'memory-palace-3d', 'interactive-quiz', 'feynman'],
    summary:
      'Bridge your memory palaces to your flashcard deck for multiple retrieval paths to the same facts.',
  },
  {
    id: 'memory.card-craft.thousand-card-milestone',
    slug: 'thousand-card-milestone',
    title: 'The 1,000-Card Milestone',
    component: Lesson6_ThousandCardMilestone,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Plan your path to 1,000 well-crafted cards with sustainable pacing and regular deck maintenance.',
  },
]

export {
  Lesson1_WozniakRules,
  Lesson2_AtomicCards,
  Lesson3_ClozeVsQA,
  Lesson4_RefactoringBadCards,
  Lesson5_ConnectingToPalaces,
  Lesson6_ThousandCardMilestone,
}

export default cardCraftLessons
