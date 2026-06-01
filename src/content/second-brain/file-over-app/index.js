/**
 * Second Brain Pillar -- Module 1: File-over-App
 * Barrel file with metadata for all 4 lessons.
 *
 * Steph Ango's File-over-App philosophy. Why plain text outlasts every app.
 * Markdown, plain text formats. Research on digital preservation.
 */

import Lesson1_WhyPlainFiles from './Lesson1_WhyPlainFiles'
import Lesson2_FormatsThatLast from './Lesson2_FormatsThatLast'
import Lesson3_FolderStructure from './Lesson3_FolderStructure'
import Lesson4_MigrationMindset from './Lesson4_MigrationMindset'

export const fileOverAppLessons = [
  {
    id: 'second-brain.file-over-app.why-plain-files',
    slug: 'why-plain-files',
    title: 'Why plain files',
    component: Lesson1_WhyPlainFiles,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'See why apps die but plain text persists. Animated timeline of tool churn vs. the permanence of simple files.',
  },
  {
    id: 'second-brain.file-over-app.formats-that-last',
    slug: 'formats-that-last',
    title: 'Formats that last',
    component: Lesson2_FormatsThatLast,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'drag-match', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Compare format durability side by side. Match formats to their dependencies. Understand why Markdown is the gold standard.',
  },
  {
    id: 'second-brain.file-over-app.folder-structure',
    slug: 'folder-structure',
    title: 'Folder structure',
    component: Lesson3_FolderStructure,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'sort-sequence', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Build a shallow, navigable folder hierarchy. Order the note lifecycle from capture to archive.',
  },
  {
    id: 'second-brain.file-over-app.migration-mindset',
    slug: 'migration-mindset',
    title: 'Migration mindset',
    component: Lesson4_MigrationMindset,
    estimatedMinutes: 15,
    modalities: ['visual-explainer', 'prompt', 'interactive-quiz', 'feynman', 'journal'],
    summary:
      'Learn to treat tools as interchangeable and files as permanent. Overcome sunk-cost attachment to apps.',
  },
]

export {
  Lesson1_WhyPlainFiles,
  Lesson2_FormatsThatLast,
  Lesson3_FolderStructure,
  Lesson4_MigrationMindset,
}

export default fileOverAppLessons
