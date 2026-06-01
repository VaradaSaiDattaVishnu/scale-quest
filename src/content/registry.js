/**
 * Content registry -- maps lesson IDs to their React content components.
 * LessonView uses this to dynamically render the right content.
 *
 * All 5 pillars, 43 modules, 200 lessons.
 */

// ── Memory Pillar ──────────────────────────────────────────────────────────
import { foundationsLessons } from './memory/foundations'
import { firstPalaceLessons } from './memory/first-palace'
import { majorSystemLessons } from './memory/major-system'
import { paoLessons } from './memory/pao'
import { fsrsLessons } from './memory/fsrs'
import { cardCraftLessons } from './memory/card-craft'
import { facesNamesLessons } from './memory/faces-names'
import { memoryLeagueLessons } from './memory/memory-league'
import { integrationLessons } from './memory/integration'

// ── Observation Pillar ─────────────────────────────────────────────────────
import { inattentionalBlindnessLessons } from './observation/inattentional-blindness'
import { visualIntelligenceLessons } from './observation/visual-intelligence'
import { drawingAsObservationLessons } from './observation/drawing-as-observation'
import { shinzenNotingLessons } from './observation/shinzen-noting'
import { naturalistJournalingLessons } from './observation/naturalist-journaling'
import { photographyAsSeeingLessons } from './observation/photography-as-seeing'
import { phenomenologicalBracketingLessons } from './observation/phenomenological-bracketing'
import { oodaLoopLessons } from './observation/ooda-loop'
import { fieldLogIntegrationLessons } from './observation/field-log-integration'

// ── Reading People Pillar ──────────────────────────────────────────────────
import { ethicsFilterLessons } from './reading-people/ethics-filter'
import { rogersActiveListeningLessons } from './reading-people/rogers-active-listening'
import { nvcLessons } from './reading-people/nvc'
import { microExpressionsLessons } from './reading-people/micro-expressions'
import { constructedEmotionLessons } from './reading-people/constructed-emotion'
import { mentalizationLessons } from './reading-people/mentalization'
import { conversationSimulatorLessons } from './reading-people/conversation-simulator'
import { readingRoomsLessons } from './reading-people/reading-rooms'
import { culturalCalibrationLessons } from './reading-people/cultural-calibration'

// ── Second Brain Pillar ────────────────────────────────────────────────────
import { fileOverAppLessons } from './second-brain/file-over-app'
import { atomicNotesLessons } from './second-brain/atomic-notes'
import { linkingSlipBoxLessons } from './second-brain/linking-slip-box'
import { notesToCardsLessons } from './second-brain/notes-to-cards'
import { dailyNotesLessons } from './second-brain/daily-notes'
import { mocsLessons } from './second-brain/mocs'
import { memexMethodLessons } from './second-brain/memex-method'

// ── Trauma Stabilization Pillar ────────────────────────────────────────────
import { cptsdLessons } from './trauma/cptsd'
import { windowOfToleranceLessons } from './trauma/window-of-tolerance'
import { fawnResponseLessons } from './trauma/fawn-response'
import { polyvagalLessons } from './trauma/polyvagal'
import { partsMappingLessons } from './trauma/parts-mapping'
import { selfCompassionLessons } from './trauma/self-compassion'
import { feltSenseLessons } from './trauma/felt-sense'
import { findingTherapistLessons } from './trauma/finding-therapist'
import { pacingIntegrationLessons } from './trauma/pacing-integration'

// ── Build the registry ─────────────────────────────────────────────────────

const allModules = [
  // Memory
  foundationsLessons,
  firstPalaceLessons,
  majorSystemLessons,
  paoLessons,
  fsrsLessons,
  cardCraftLessons,
  facesNamesLessons,
  memoryLeagueLessons,
  integrationLessons,
  // Observation
  inattentionalBlindnessLessons,
  visualIntelligenceLessons,
  drawingAsObservationLessons,
  shinzenNotingLessons,
  naturalistJournalingLessons,
  photographyAsSeeingLessons,
  phenomenologicalBracketingLessons,
  oodaLoopLessons,
  fieldLogIntegrationLessons,
  // Reading People
  ethicsFilterLessons,
  rogersActiveListeningLessons,
  nvcLessons,
  microExpressionsLessons,
  constructedEmotionLessons,
  mentalizationLessons,
  conversationSimulatorLessons,
  readingRoomsLessons,
  culturalCalibrationLessons,
  // Second Brain
  fileOverAppLessons,
  atomicNotesLessons,
  linkingSlipBoxLessons,
  notesToCardsLessons,
  dailyNotesLessons,
  mocsLessons,
  memexMethodLessons,
  // Trauma
  cptsdLessons,
  windowOfToleranceLessons,
  fawnResponseLessons,
  polyvagalLessons,
  partsMappingLessons,
  selfCompassionLessons,
  feltSenseLessons,
  findingTherapistLessons,
  pacingIntegrationLessons,
]

const registry = {}

allModules.forEach((moduleLessons) => {
  if (moduleLessons) {
    moduleLessons.forEach((lesson) => {
      registry[lesson.id] = lesson.component
    })
  }
})

export default registry
