/**
 * Second Brain Pillar -- Module 5: Daily Notes
 * Barrel file with metadata for all 4 lessons.
 *
 * Daily capture workflow. Inbox-zero for notes. Weekly review ritual.
 * Research on capture habit (David Allen's GTD).
 */

import Lesson1_CaptureHabit from './Lesson1_CaptureHabit'
import Lesson2_InboxZeroNotes from './Lesson2_InboxZeroNotes'
import Lesson3_WeeklyProcessing from './Lesson3_WeeklyProcessing'
import Lesson4_Practice from './Lesson4_Practice'

export const dailyNotesLessons = [
  {
    id: 'second-brain.daily-notes.capture-habit',
    slug: 'capture-habit',
    title: 'The capture habit',
    component: Lesson1_CaptureHabit,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Build the capture reflex. See how cognitive offloading frees working memory and reduces anxiety.',
  },
  {
    id: 'second-brain.daily-notes.inbox-zero-notes',
    slug: 'inbox-zero-notes',
    title: 'Inbox zero for notes',
    component: Lesson2_InboxZeroNotes,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'sort-sequence', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Process your inbox into notes, cards, tasks, or trash. Learn the triage questions that keep your system clean.',
  },
  {
    id: 'second-brain.daily-notes.weekly-processing',
    slug: 'weekly-processing',
    title: 'Weekly processing',
    component: Lesson3_WeeklyProcessing,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Design a weekly review ritual. Understand why regular reflection keeps the entire system healthy.',
  },
  {
    id: 'second-brain.daily-notes.practice',
    slug: 'practice',
    title: 'Practice: Daily notes',
    component: Lesson4_Practice,
    estimatedMinutes: 20,
    modalities: ['visual-explainer', 'sort-sequence', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Brain dump, triage, and design your personal capture-process-review workflow.',
  },
]

export {
  Lesson1_CaptureHabit,
  Lesson2_InboxZeroNotes,
  Lesson3_WeeklyProcessing,
  Lesson4_Practice,
}

export default dailyNotesLessons
