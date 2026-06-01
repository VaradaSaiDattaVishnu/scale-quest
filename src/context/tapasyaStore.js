import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ---------------------------------------------------------------------------
// CURRICULUM DEFINITION
// ---------------------------------------------------------------------------
// Five pillars. No points, no badges, no streaks, no leaderboards.
// The trauma pillar's pacing overrides everything else.
// Fast progress is a WARNING SIGN, not a success metric.
// ---------------------------------------------------------------------------

export const PILLARS = [
  // =========================================================================
  // PILLAR 1 -- MEMORY  (9 modules, 52 lessons)
  // =========================================================================
  {
    id: 'memory',
    title: 'Memory',
    description:
      'Build a reliable, expandable memory through palace technique, the Major System, PAO, spaced repetition, and deliberate card-craft.',
    color: 'slate',
    modules: [
      {
        id: 'memory.foundations',
        title: 'Foundations',
        description: 'What memory actually is and why it works the way it does.',
        lessons: [
          { id: 'memory.foundations.what-is-memory',       title: 'What Memory Is' },
          { id: 'memory.foundations.forgetting-curve',     title: 'The Forgetting Curve' },
          { id: 'memory.foundations.why-palaces-work',     title: 'Why Palaces Work' },
          { id: 'memory.foundations.retrieval-practice',   title: 'Retrieval Practice' },
          { id: 'memory.foundations.encoding-depth',       title: 'Encoding Depth' },
          { id: 'memory.foundations.consolidation-and-sleep',  title: 'Consolidation & Sleep' },
        ],
      },
      {
        id: 'memory.first-palace',
        title: 'Your First Palace',
        description: 'Walk through a familiar space and turn it into a memory palace.',
        lessons: [
          { id: 'memory.first-palace.walking-through',    title: 'Walking Through' },
          { id: 'memory.first-palace.choosing-loci',      title: 'Choosing Loci' },
          { id: 'memory.first-palace.vivid-encoding',     title: 'Vivid Encoding' },
          { id: 'memory.first-palace.forward-backward',   title: 'Forward / Backward Review' },
          { id: 'memory.first-palace.first-recall',       title: 'Your First Recall' },
        ],
      },
      {
        id: 'memory.major-system',
        title: 'The Major System',
        description: 'A consonant-to-digit code that turns numbers into images.',
        lessons: [
          { id: 'memory.major-system.consonant-to-digit',  title: 'Consonant-to-Digit' },
          { id: 'memory.major-system.building-00-99',      title: 'Building Your 00-99 Images' },
          { id: 'memory.major-system.drilling',            title: 'Drilling' },
          { id: 'memory.major-system.phone-numbers',       title: 'Phone Numbers' },
          { id: 'memory.major-system.dates',               title: 'Dates' },
          { id: 'memory.major-system.extension-000-999',   title: 'Extension to 000-999' },
          { id: 'memory.major-system.practice',            title: 'Practice' },
        ],
      },
      {
        id: 'memory.pao',
        title: 'PAO',
        description: 'Person-Action-Object: the encoding system used in memory competition.',
        lessons: [
          { id: 'memory.pao.concept',          title: 'Person-Action-Object Concept' },
          { id: 'memory.pao.building-00-99',   title: 'Building Your 00-99 PAO' },
          { id: 'memory.pao.cards-encoding',   title: 'Cards Encoding' },
          { id: 'memory.pao.competition-prep', title: 'Competition Prep' },
          { id: 'memory.pao.speed-drills',     title: 'Speed Drills' },
          { id: 'memory.pao.two-card-system',  title: 'Two-Card System' },
          { id: 'memory.pao.practice-deck',    title: 'Practice Deck' },
          { id: 'memory.pao.first-timed',      title: 'First Timed Attempt' },
        ],
      },
      {
        id: 'memory.fsrs',
        title: 'FSRS & Daily Habit',
        description: 'Free Spaced Repetition Scheduler -- the algorithm behind long-term retention.',
        lessons: [
          { id: 'memory.fsrs.what-is-fsrs',          title: 'What FSRS Is' },
          { id: 'memory.fsrs.setting-up-reviews',    title: 'Setting Up Reviews' },
          { id: 'memory.fsrs.first-100-cards',       title: 'First 100 Cards' },
          { id: 'memory.fsrs.retention-targets',     title: 'Retention Targets' },
          { id: 'memory.fsrs.monthly-reoptimization', title: 'Monthly Re-optimization' },
        ],
      },
      {
        id: 'memory.card-craft',
        title: 'Card-Craft',
        description: 'Writing excellent flashcards is a skill. This module teaches it.',
        lessons: [
          { id: 'memory.card-craft.wozniak-rules',            title: "Wozniak's Rules" },
          { id: 'memory.card-craft.atomic-cards',              title: 'Atomic Cards' },
          { id: 'memory.card-craft.cloze-vs-qa',              title: 'Cloze vs Q&A' },
          { id: 'memory.card-craft.refactoring-bad-cards',     title: 'Refactoring Bad Cards' },
          { id: 'memory.card-craft.connecting-to-palaces',     title: 'Connecting Cards to Palaces' },
          { id: 'memory.card-craft.thousand-card-milestone',   title: 'The 1000-Card Milestone' },
        ],
      },
      {
        id: 'memory.faces-names',
        title: 'Faces and Names',
        description: 'Remembering people: the most socially useful memory skill.',
        lessons: [
          { id: 'memory.faces-names.name-game',        title: 'The Name Game' },
          { id: 'memory.faces-names.feature-anchoring', title: 'Feature Anchoring' },
          { id: 'memory.faces-names.face-name-palace',  title: 'Face-Name Palace' },
          { id: 'memory.faces-names.social-encoding',   title: 'Social Encoding' },
          { id: 'memory.faces-names.party-protocol',    title: 'Party Protocol' },
          { id: 'memory.faces-names.review',            title: 'Review' },
        ],
      },
      {
        id: 'memory.memory-league',
        title: 'Memory League',
        description: 'Five competitive disciplines: Numbers, Cards, Words, Names, Images.',
        lessons: [
          { id: 'memory.memory-league.numbers', title: 'Numbers' },
          { id: 'memory.memory-league.cards',   title: 'Cards' },
          { id: 'memory.memory-league.words',   title: 'Words' },
          { id: 'memory.memory-league.names',   title: 'Names' },
          { id: 'memory.memory-league.images',  title: 'Images' },
        ],
      },
      {
        id: 'memory.integration',
        title: 'Integration',
        description: 'Bring it all together: apply memory technique to your own life.',
        lessons: [
          { id: 'memory.integration.personal-capstone', title: 'Personal Subject Capstone' },
          { id: 'memory.integration.teaching-someone',  title: 'Teaching Someone' },
          { id: 'memory.integration.twenty-rules',      title: 'Writing Your "Twenty Rules"' },
          { id: 'memory.integration.reflection',        title: 'Reflection' },
        ],
      },
    ],
  },

  // =========================================================================
  // PILLAR 2 -- OBSERVATION  (9 modules)
  // =========================================================================
  {
    id: 'observation',
    title: 'Observation',
    description:
      'Train the eye, ear, and attention. Move from passive seeing to active noticing.',
    color: 'stone',
    modules: [
      {
        id: 'observation.inattentional-blindness',
        title: 'Inattentional Blindness',
        description: 'What you miss when you are not looking -- and why it matters.',
        lessons: [
          { id: 'observation.inattentional-blindness.gorilla-effect',     title: 'The Gorilla Effect' },
          { id: 'observation.inattentional-blindness.change-blindness',   title: 'Change Blindness' },
          { id: 'observation.inattentional-blindness.attention-filters',  title: 'Attention Filters' },
          { id: 'observation.inattentional-blindness.daily-audit',        title: 'Daily Audit' },
        ],
      },
      {
        id: 'observation.visual-intelligence',
        title: 'Visual Intelligence',
        description: 'Amy Herman-style drills: describe what you actually see, not what you assume.',
        lessons: [
          { id: 'observation.visual-intelligence.describe-dont-interpret', title: 'Describe, Do Not Interpret' },
          { id: 'observation.visual-intelligence.four-as',                 title: 'The Four A\'s' },
          { id: 'observation.visual-intelligence.artwork-drill',           title: 'Artwork Drill' },
          { id: 'observation.visual-intelligence.field-application',       title: 'Field Application' },
        ],
      },
      {
        id: 'observation.drawing-as-observation',
        title: 'Drawing as Observation',
        description: 'Edwards contour drawing: use your hand to train your eye.',
        lessons: [
          { id: 'observation.drawing-as-observation.pure-contour',    title: 'Pure Contour Drawing' },
          { id: 'observation.drawing-as-observation.negative-space',  title: 'Negative Space' },
          { id: 'observation.drawing-as-observation.modified-contour', title: 'Modified Contour' },
          { id: 'observation.drawing-as-observation.gesture-drawing', title: 'Gesture Drawing' },
        ],
      },
      {
        id: 'observation.shinzen-noting',
        title: 'Shinzen Noting',
        description: 'See / Hear / Feel: a systematic vocabulary for raw sensory experience.',
        lessons: [
          { id: 'observation.shinzen-noting.see-hear-feel',      title: 'See / Hear / Feel' },
          { id: 'observation.shinzen-noting.inside-outside',     title: 'Inside vs Outside' },
          { id: 'observation.shinzen-noting.noting-practice',    title: 'Noting Practice' },
          { id: 'observation.shinzen-noting.equanimity',         title: 'Equanimity' },
        ],
      },
      {
        id: 'observation.naturalist-journaling',
        title: 'Naturalist Journaling',
        description: 'Record the natural world the way field biologists do.',
        lessons: [
          { id: 'observation.naturalist-journaling.i-notice',       title: 'I Notice...' },
          { id: 'observation.naturalist-journaling.i-wonder',       title: 'I Wonder...' },
          { id: 'observation.naturalist-journaling.it-reminds-me',  title: 'It Reminds Me Of...' },
          { id: 'observation.naturalist-journaling.field-journal',  title: 'Field Journal' },
        ],
      },
      {
        id: 'observation.photography-as-seeing',
        title: 'Photography as Seeing',
        description: 'The camera as a tool for sustained attention -- not social media.',
        lessons: [
          { id: 'observation.photography-as-seeing.frame-before-shoot', title: 'Frame Before You Shoot' },
          { id: 'observation.photography-as-seeing.light-study',        title: 'Light Study' },
          { id: 'observation.photography-as-seeing.single-subject',     title: 'Single Subject, Multiple Angles' },
          { id: 'observation.photography-as-seeing.review-session',     title: 'Review Session' },
        ],
      },
      {
        id: 'observation.phenomenological-bracketing',
        title: 'Phenomenological Bracketing',
        description: 'Suspend judgment. See the thing itself before layering interpretation.',
        lessons: [
          { id: 'observation.phenomenological-bracketing.what-is-bracketing',  title: 'What Is Bracketing' },
          { id: 'observation.phenomenological-bracketing.epoch-practice',      title: 'Epoch Practice' },
          { id: 'observation.phenomenological-bracketing.describing-experience', title: 'Describing Experience' },
          { id: 'observation.phenomenological-bracketing.integration',         title: 'Integration' },
        ],
      },
      {
        id: 'observation.ooda-loop',
        title: "Boyd's OODA Loop",
        description: 'Observe-Orient-Decide-Act: rapid perception under pressure.',
        lessons: [
          { id: 'observation.ooda-loop.observe',  title: 'Observe' },
          { id: 'observation.ooda-loop.orient',   title: 'Orient' },
          { id: 'observation.ooda-loop.decide',   title: 'Decide' },
          { id: 'observation.ooda-loop.act',      title: 'Act' },
          { id: 'observation.ooda-loop.tempo',    title: 'Tempo' },
        ],
      },
      {
        id: 'observation.field-log-integration',
        title: 'Field Log Integration',
        description: 'Combine all observation skills into a personal field-log practice.',
        lessons: [
          { id: 'observation.field-log-integration.building-your-log',  title: 'Building Your Log' },
          { id: 'observation.field-log-integration.weekly-review',      title: 'Weekly Review' },
          { id: 'observation.field-log-integration.cross-pillar-links', title: 'Cross-Pillar Links' },
          { id: 'observation.field-log-integration.reflection',         title: 'Reflection' },
        ],
      },
    ],
  },

  // =========================================================================
  // PILLAR 3 -- READING PEOPLE  (9 modules, ethics-gated)
  // =========================================================================
  {
    id: 'reading-people',
    title: 'Reading People',
    description:
      'Understand others with honesty and care. Every module is ethics-gated: this knowledge carries responsibility.',
    color: 'zinc',
    ethicsGated: true,
    modules: [
      {
        id: 'reading-people.ethics-filter',
        title: 'Ethics Filter Deep',
        description: 'Before you learn to read people, you learn why it matters ethically.',
        lessons: [
          { id: 'reading-people.ethics-filter.why-ethics-first',    title: 'Why Ethics First' },
          { id: 'reading-people.ethics-filter.power-and-consent',   title: 'Power and Consent' },
          { id: 'reading-people.ethics-filter.manipulation-vs-understanding', title: 'Manipulation vs Understanding' },
          { id: 'reading-people.ethics-filter.your-ethical-stance',  title: 'Your Ethical Stance' },
        ],
      },
      {
        id: 'reading-people.rogers-active-listening',
        title: 'Rogers & Active Listening',
        description: 'Carl Rogers\' unconditional positive regard and the practice of real listening.',
        lessons: [
          { id: 'reading-people.rogers-active-listening.unconditional-positive-regard', title: 'Unconditional Positive Regard' },
          { id: 'reading-people.rogers-active-listening.reflective-listening',          title: 'Reflective Listening' },
          { id: 'reading-people.rogers-active-listening.paraphrasing',                  title: 'Paraphrasing' },
          { id: 'reading-people.rogers-active-listening.silence-as-skill',              title: 'Silence as a Skill' },
        ],
      },
      {
        id: 'reading-people.nvc',
        title: 'NVC (Nonviolent Communication)',
        description: 'Marshall Rosenberg\'s four-step model for honest, empathic communication.',
        lessons: [
          { id: 'reading-people.nvc.observations',  title: 'Observations' },
          { id: 'reading-people.nvc.feelings',       title: 'Feelings' },
          { id: 'reading-people.nvc.needs',          title: 'Needs' },
          { id: 'reading-people.nvc.requests',       title: 'Requests' },
          { id: 'reading-people.nvc.practice',       title: 'Practice' },
        ],
      },
      {
        id: 'reading-people.micro-expressions',
        title: 'Micro-expressions (Honest Version)',
        description: 'What the face actually reveals -- and the limits of that knowledge.',
        lessons: [
          { id: 'reading-people.micro-expressions.what-microexpressions-are', title: 'What Micro-expressions Are' },
          { id: 'reading-people.micro-expressions.seven-universal',           title: 'Seven Universal Expressions' },
          { id: 'reading-people.micro-expressions.limits-and-errors',         title: 'Limits and Errors' },
          { id: 'reading-people.micro-expressions.practice',                  title: 'Practice' },
        ],
      },
      {
        id: 'reading-people.constructed-emotion',
        title: "Barrett's Constructed Emotion",
        description: 'Lisa Feldman Barrett\'s theory: emotions are constructed, not detected.',
        lessons: [
          { id: 'reading-people.constructed-emotion.classical-vs-constructed',  title: 'Classical vs Constructed View' },
          { id: 'reading-people.constructed-emotion.concepts-and-predictions',  title: 'Concepts and Predictions' },
          { id: 'reading-people.constructed-emotion.emotional-granularity',     title: 'Emotional Granularity' },
          { id: 'reading-people.constructed-emotion.implications',              title: 'Implications' },
        ],
      },
      {
        id: 'reading-people.mentalization',
        title: 'Mentalization',
        description: 'The ability to understand behavior in terms of underlying mental states.',
        lessons: [
          { id: 'reading-people.mentalization.what-is-mentalization',   title: 'What Is Mentalization' },
          { id: 'reading-people.mentalization.self-and-other',          title: 'Self and Other' },
          { id: 'reading-people.mentalization.failures',                title: 'Mentalization Failures' },
          { id: 'reading-people.mentalization.practice',                title: 'Practice' },
        ],
      },
      {
        id: 'reading-people.conversation-simulator',
        title: 'Conversation Simulator',
        description: 'Practice reading cues in structured conversation scenarios.',
        lessons: [
          { id: 'reading-people.conversation-simulator.active-scenario',    title: 'Active Scenario' },
          { id: 'reading-people.conversation-simulator.debrief-and-review', title: 'Debrief and Review' },
          { id: 'reading-people.conversation-simulator.pattern-recognition', title: 'Pattern Recognition' },
          { id: 'reading-people.conversation-simulator.integration',        title: 'Integration' },
        ],
      },
      {
        id: 'reading-people.reading-rooms',
        title: 'Reading Rooms (Group Dynamics)',
        description: 'Observe how groups behave: roles, alliances, power, silence.',
        lessons: [
          { id: 'reading-people.reading-rooms.group-roles',       title: 'Group Roles' },
          { id: 'reading-people.reading-rooms.power-dynamics',    title: 'Power Dynamics' },
          { id: 'reading-people.reading-rooms.silence-and-space', title: 'Silence and Space' },
          { id: 'reading-people.reading-rooms.field-practice',    title: 'Field Practice' },
        ],
      },
      {
        id: 'reading-people.cultural-calibration',
        title: 'Cultural Calibration',
        description: 'Everything above is culture-dependent. Calibrate for the room you are in.',
        lessons: [
          { id: 'reading-people.cultural-calibration.cultural-context',   title: 'Cultural Context' },
          { id: 'reading-people.cultural-calibration.high-low-context',   title: 'High / Low Context' },
          { id: 'reading-people.cultural-calibration.avoiding-projection', title: 'Avoiding Projection' },
          { id: 'reading-people.cultural-calibration.reflection',         title: 'Reflection' },
        ],
      },
    ],
  },

  // =========================================================================
  // PILLAR 4 -- SECOND BRAIN  (7 modules)
  // =========================================================================
  {
    id: 'second-brain',
    title: 'Second Brain',
    description:
      'A personal knowledge system: plain files, atomic notes, slip-box linking, and the Memex method.',
    color: 'neutral',
    modules: [
      {
        id: 'second-brain.file-over-app',
        title: 'File-over-App Philosophy',
        description: 'Own your data. Plain text outlasts every app.',
        lessons: [
          { id: 'second-brain.file-over-app.why-plain-files',    title: 'Why Plain Files' },
          { id: 'second-brain.file-over-app.formats-that-last',  title: 'Formats That Last' },
          { id: 'second-brain.file-over-app.folder-structure',   title: 'Folder Structure' },
          { id: 'second-brain.file-over-app.migration-mindset',  title: 'Migration Mindset' },
        ],
      },
      {
        id: 'second-brain.atomic-notes',
        title: 'Atomic Notes (Matuschak)',
        description: 'One idea per note. Small enough to combine, big enough to stand alone.',
        lessons: [
          { id: 'second-brain.atomic-notes.one-idea-per-note',  title: 'One Idea per Note' },
          { id: 'second-brain.atomic-notes.concept-handles',    title: 'Concept Handles' },
          { id: 'second-brain.atomic-notes.density-and-clarity', title: 'Density and Clarity' },
          { id: 'second-brain.atomic-notes.practice',           title: 'Practice' },
        ],
      },
      {
        id: 'second-brain.linking-slip-box',
        title: 'Linking and the Slip-Box',
        description: 'Luhmann\'s Zettelkasten: notes gain value from connections.',
        lessons: [
          { id: 'second-brain.linking-slip-box.what-is-zettelkasten', title: 'What Is Zettelkasten' },
          { id: 'second-brain.linking-slip-box.link-types',           title: 'Link Types' },
          { id: 'second-brain.linking-slip-box.structure-notes',      title: 'Structure Notes' },
          { id: 'second-brain.linking-slip-box.practice',             title: 'Practice' },
        ],
      },
      {
        id: 'second-brain.notes-to-cards',
        title: 'Notes to Cards',
        description: 'Bridge your note system into your spaced-repetition system.',
        lessons: [
          { id: 'second-brain.notes-to-cards.when-to-card',      title: 'When to Make a Card' },
          { id: 'second-brain.notes-to-cards.card-from-note',    title: 'Card from Note' },
          { id: 'second-brain.notes-to-cards.bidirectional-flow', title: 'Bidirectional Flow' },
          { id: 'second-brain.notes-to-cards.practice',          title: 'Practice' },
        ],
      },
      {
        id: 'second-brain.daily-notes',
        title: 'Daily Notes and Processing',
        description: 'A lightweight daily capture habit and a weekly processing routine.',
        lessons: [
          { id: 'second-brain.daily-notes.capture-habit',    title: 'Capture Habit' },
          { id: 'second-brain.daily-notes.inbox-zero-notes', title: 'Inbox-Zero Notes' },
          { id: 'second-brain.daily-notes.weekly-processing', title: 'Weekly Processing' },
          { id: 'second-brain.daily-notes.practice',         title: 'Practice' },
        ],
      },
      {
        id: 'second-brain.mocs',
        title: 'MOCs (Maps of Content)',
        description: 'Only after 30 evergreen notes. A MOC is an index, not a starting point.',
        requiresEvergreenCount: 30,
        lessons: [
          { id: 'second-brain.mocs.what-is-a-moc',     title: 'What Is a MOC' },
          { id: 'second-brain.mocs.when-to-create',     title: 'When to Create One' },
          { id: 'second-brain.mocs.structure-and-flow',  title: 'Structure and Flow' },
          { id: 'second-brain.mocs.practice',           title: 'Practice' },
        ],
      },
      {
        id: 'second-brain.memex-method',
        title: 'The Memex Method',
        description: 'The entire system working together: capture, link, review, create.',
        lessons: [
          { id: 'second-brain.memex-method.vannevar-bush',       title: 'Vannevar Bush\'s Memex' },
          { id: 'second-brain.memex-method.your-memex',          title: 'Your Memex' },
          { id: 'second-brain.memex-method.creative-output',     title: 'Creative Output' },
          { id: 'second-brain.memex-method.reflection',          title: 'Reflection' },
        ],
      },
    ],
  },

  // =========================================================================
  // PILLAR 5 -- TRAUMA STABILIZATION  (9 modules, encrypted / paced)
  // =========================================================================
  // This pillar has the hardest unlock rules in the app.
  // Module N+1 requires:
  //   1. 14 calendar days since Module N was first opened
  //   2. All lessons in Module N completed (minimum 5)
  //   3. 7 nervous-system check-ins recorded in the last 14 days
  // Minimum calendar time for the entire track: ~12 months.
  // =========================================================================
  {
    id: 'trauma',
    title: 'Trauma Stabilization',
    description:
      'Slow, paced, optional. Grounding and self-understanding for complex trauma. This pillar\'s pacing overrides everything else.',
    color: 'warm',
    traumaPaced: true,
    modules: [
      {
        id: 'trauma.cptsd',
        title: 'What CPTSD Is (Walker\'s 4Fs)',
        description: 'Fight, flight, freeze, fawn. Understanding the four survival responses.',
        lessons: [
          { id: 'trauma.cptsd.what-is-cptsd',       title: 'What Is CPTSD' },
          { id: 'trauma.cptsd.fight-response',       title: 'The Fight Response' },
          { id: 'trauma.cptsd.flight-response',      title: 'The Flight Response' },
          { id: 'trauma.cptsd.freeze-response',      title: 'The Freeze Response' },
          { id: 'trauma.cptsd.fawn-response-intro',  title: 'The Fawn Response (Intro)' },
        ],
      },
      {
        id: 'trauma.window-of-tolerance',
        title: 'Window of Tolerance',
        description: 'The zone where you can think, feel, and function. Learning to notice its edges.',
        lessons: [
          { id: 'trauma.window-of-tolerance.what-is-window',    title: 'What Is the Window' },
          { id: 'trauma.window-of-tolerance.hyper-arousal',      title: 'Hyper-arousal' },
          { id: 'trauma.window-of-tolerance.hypo-arousal',       title: 'Hypo-arousal' },
          { id: 'trauma.window-of-tolerance.widening-practice',  title: 'Widening Practice' },
          { id: 'trauma.window-of-tolerance.daily-mapping',      title: 'Daily Mapping' },
        ],
      },
      {
        id: 'trauma.fawn-response',
        title: 'The Fawn Response',
        description: 'People-pleasing as a survival strategy. Recognizing it, understanding it.',
        lessons: [
          { id: 'trauma.fawn-response.what-is-fawning',        title: 'What Is Fawning' },
          { id: 'trauma.fawn-response.origins',                 title: 'Origins' },
          { id: 'trauma.fawn-response.recognizing-patterns',    title: 'Recognizing Patterns' },
          { id: 'trauma.fawn-response.boundaries-intro',        title: 'Boundaries (Intro)' },
          { id: 'trauma.fawn-response.practice',                title: 'Practice' },
        ],
      },
      {
        id: 'trauma.polyvagal',
        title: 'Polyvagal as Language',
        description: 'Ventral, sympathetic, dorsal: a vocabulary for your nervous system.',
        lessons: [
          { id: 'trauma.polyvagal.three-states',              title: 'Three States' },
          { id: 'trauma.polyvagal.neuroception',              title: 'Neuroception' },
          { id: 'trauma.polyvagal.co-regulation',             title: 'Co-regulation' },
          { id: 'trauma.polyvagal.mapping-your-ladder',       title: 'Mapping Your Ladder' },
          { id: 'trauma.polyvagal.glimmers-and-anchors',      title: 'Glimmers and Anchors' },
        ],
      },
      {
        id: 'trauma.parts-mapping',
        title: 'Parts Mapping (IFS-informed)',
        description: 'Internal Family Systems: exiles, managers, firefighters. You contain multitudes.',
        lessons: [
          { id: 'trauma.parts-mapping.what-are-parts',       title: 'What Are Parts' },
          { id: 'trauma.parts-mapping.self-energy',           title: 'Self Energy' },
          { id: 'trauma.parts-mapping.exiles',                title: 'Exiles' },
          { id: 'trauma.parts-mapping.managers',              title: 'Managers' },
          { id: 'trauma.parts-mapping.firefighters',          title: 'Firefighters' },
          { id: 'trauma.parts-mapping.mapping-practice',      title: 'Mapping Practice' },
        ],
      },
      {
        id: 'trauma.self-compassion',
        title: 'Self-Compassion (Neff MSC)',
        description: 'Kristin Neff\'s Mindful Self-Compassion: kindness, common humanity, mindfulness.',
        lessons: [
          { id: 'trauma.self-compassion.three-components',    title: 'Three Components' },
          { id: 'trauma.self-compassion.self-kindness',       title: 'Self-Kindness' },
          { id: 'trauma.self-compassion.common-humanity',     title: 'Common Humanity' },
          { id: 'trauma.self-compassion.mindfulness',         title: 'Mindfulness' },
          { id: 'trauma.self-compassion.self-compassion-break', title: 'Self-Compassion Break' },
        ],
      },
      {
        id: 'trauma.felt-sense',
        title: 'Felt Sense and Focusing',
        description: 'Eugene Gendlin\'s Focusing: listening to the body\'s knowing.',
        lessons: [
          { id: 'trauma.felt-sense.what-is-felt-sense',   title: 'What Is Felt Sense' },
          { id: 'trauma.felt-sense.clearing-a-space',     title: 'Clearing a Space' },
          { id: 'trauma.felt-sense.handle-and-resonance', title: 'Handle and Resonance' },
          { id: 'trauma.felt-sense.asking',               title: 'Asking' },
          { id: 'trauma.felt-sense.receiving',            title: 'Receiving' },
        ],
      },
      {
        id: 'trauma.finding-therapist',
        title: 'Finding a Therapist',
        description: 'Practical guidance on finding trauma-informed professional support.',
        lessons: [
          { id: 'trauma.finding-therapist.why-therapy',         title: 'Why Therapy' },
          { id: 'trauma.finding-therapist.modalities',          title: 'Modalities' },
          { id: 'trauma.finding-therapist.red-and-green-flags', title: 'Red and Green Flags' },
          { id: 'trauma.finding-therapist.first-session',       title: 'The First Session' },
          { id: 'trauma.finding-therapist.ongoing-fit',         title: 'Ongoing Fit' },
        ],
      },
      {
        id: 'trauma.pacing-integration',
        title: 'Pacing and Integration',
        description: 'The final module. There is no hurry. Integration takes as long as it takes.',
        lessons: [
          { id: 'trauma.pacing-integration.why-slow',           title: 'Why Slow' },
          { id: 'trauma.pacing-integration.titration',          title: 'Titration' },
          { id: 'trauma.pacing-integration.pendulation',        title: 'Pendulation' },
          { id: 'trauma.pacing-integration.your-pace',          title: 'Your Pace' },
          { id: 'trauma.pacing-integration.reflection',         title: 'Reflection' },
        ],
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// HELPERS -- used inside the store and available for import
// ---------------------------------------------------------------------------

/**
 * Generate a short, collision-resistant ID.
 */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

/**
 * Flatten every lesson from every module in a pillar into a single array.
 */
function allLessonsInPillar(pillarId) {
  const pillar = PILLARS.find((p) => p.id === pillarId)
  if (!pillar) return []
  return pillar.modules.flatMap((m) => m.lessons)
}

/**
 * Flatten every lesson from a single module.
 */
function allLessonsInModule(moduleId) {
  for (const pillar of PILLARS) {
    const mod = pillar.modules.find((m) => m.id === moduleId)
    if (mod) return mod.lessons
  }
  return []
}

/**
 * Return the pillar object that owns a given module ID.
 */
function pillarForModule(moduleId) {
  return PILLARS.find((p) => p.modules.some((m) => m.id === moduleId)) || null
}

// ---------------------------------------------------------------------------
// PACING -- the heart of the trauma-informed design
// ---------------------------------------------------------------------------

/**
 * Compute the learner's current pace label based on the last 7 days
 * of session data plus check-in distress markers.
 *
 *   'overrun'  -- stop-button used 2+ times OR 3+ distress markers
 *   'pushing'  -- more than 35 min/day avg OR more than 4 trauma sessions
 *   'rested'   -- less than 5 min/day avg
 *   'engaged'  -- healthy middle ground
 *
 * "Fast progress is a WARNING SIGN, not success."
 */
export function computePace(sessions, checkins) {
  const now = Date.now()
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000

  const recentSessions = (sessions || []).filter(
    (s) => s.startedAt >= sevenDaysAgo
  )
  const recentCheckins = (checkins || []).filter(
    (c) => c.at >= sevenDaysAgo
  )

  const totalMinutes = recentSessions.reduce((sum, s) => {
    const end = s.endedAt || now
    return sum + (end - s.startedAt) / 60000
  }, 0)

  const stopButtonUses = recentSessions.filter((s) => s.stopButtonUsed).length

  const traumaSessions = recentSessions.filter(
    (s) => s.pillar === 'trauma'
  ).length

  // Distress markers: check-ins with sympathetic/dorsal state at intensity >= 4
  const distressMarkers = recentCheckins.filter(
    (c) =>
      (c.state === 'sympathetic' || c.state === 'dorsal') && c.intensity >= 4
  ).length

  if (stopButtonUses >= 2 || distressMarkers >= 3) return 'overrun'
  if (totalMinutes > 35 * 7 || traumaSessions > 4) return 'pushing'
  if (totalMinutes < 5 * 7) return 'rested'
  return 'engaged'
}

// ---------------------------------------------------------------------------
// TRAUMA MODULE UNLOCK LOGIC
// ---------------------------------------------------------------------------

/**
 * Determine whether a specific trauma module is unlocked.
 *
 * Rules:
 *   - Module 0 (trauma.cptsd) is always available once the learner
 *     enters the trauma pillar.
 *   - Module N+1 requires ALL of:
 *       1. 14 calendar days since Module N was first opened
 *       2. Every lesson in Module N is completed
 *       3. At least 7 nervous-system check-ins recorded in the last 14 days
 *
 * This means the absolute minimum calendar time for the entire 9-module
 * trauma track is 8 * 14 = 112 days (~4 months) if someone is perfectly
 * consistent, but realistic pacing will be closer to 12+ months.
 *
 * @param {string} moduleId        e.g. 'trauma.fawn-response'
 * @param {string[]} completedLessons  all completed lesson IDs
 * @param {object[]} checkins       all check-in records
 * @param {object}   moduleOpenDates  { [moduleId]: timestamp }
 * @returns {boolean|{ locked: true, reason: string }}
 */
export function isTraumaModuleUnlocked(
  moduleId,
  completedLessons,
  checkins,
  moduleOpenDates
) {
  const traumaPillar = PILLARS.find((p) => p.id === 'trauma')
  if (!traumaPillar) return false

  const moduleIndex = traumaPillar.modules.findIndex((m) => m.id === moduleId)
  if (moduleIndex === -1) return false

  // First module is always available
  if (moduleIndex === 0) return true

  const previousModule = traumaPillar.modules[moduleIndex - 1]

  // Requirement 1: 14 days since previous module was opened
  const previousOpenedAt = moduleOpenDates[previousModule.id]
  if (!previousOpenedAt) {
    return { locked: true, reason: 'Previous module has not been opened yet.' }
  }
  const daysSinceOpened = (Date.now() - previousOpenedAt) / (1000 * 60 * 60 * 24)
  if (daysSinceOpened < 14) {
    const daysLeft = Math.ceil(14 - daysSinceOpened)
    return {
      locked: true,
      reason: `${daysLeft} day${daysLeft === 1 ? '' : 's'} until this module opens. There is no hurry.`,
    }
  }

  // Requirement 2: all lessons in previous module completed
  const previousLessons = previousModule.lessons.map((l) => l.id)
  const completedInPrevious = previousLessons.filter((id) =>
    completedLessons.includes(id)
  )
  if (completedInPrevious.length < previousLessons.length) {
    const remaining = previousLessons.length - completedInPrevious.length
    return {
      locked: true,
      reason: `${remaining} lesson${remaining === 1 ? '' : 's'} remaining in "${previousModule.title}".`,
    }
  }

  // Requirement 3: 7 check-ins in the last 14 days
  const fourteenDaysAgo = Date.now() - 14 * 24 * 60 * 60 * 1000
  const recentCheckins = (checkins || []).filter((c) => c.at >= fourteenDaysAgo)
  if (recentCheckins.length < 7) {
    const needed = 7 - recentCheckins.length
    return {
      locked: true,
      reason: `${needed} more check-in${needed === 1 ? '' : 's'} needed in the last 14 days. Take your time.`,
    }
  }

  return true
}

// ---------------------------------------------------------------------------
// STORE
// ---------------------------------------------------------------------------

const useTapasyaStore = create(
  persist(
    (set, get) => ({
      // ---- identity ----
      userName: '',

      // ---- curriculum (static reference) ----
      pillars: PILLARS,

      // ---- progress ----
      completedLessons: [],
      currentPillar: null,
      currentModule: null,
      currentLesson: null,

      // Timestamps for when trauma modules were first opened.
      // { [moduleId]: timestamp }
      moduleOpenDates: {},

      // ---- sessions ----
      // Each: { id, startedAt, endedAt, pillar, module, stopButtonUsed }
      sessions: [],

      // ---- nervous-system check-ins ----
      // Each: { id, at, state, intensity, glimmer, note }
      //   state:     'ventral' | 'sympathetic' | 'dorsal' | 'mixed'
      //   intensity: 1-5
      //   glimmer:   optional string (a small moment of safety / joy)
      //   note:      optional freeform string
      checkins: [],

      // ---- vault notes ----
      // Each: { id, createdAt, updatedAt, type, title, body, links }
      //   type: 'fleeting' | 'literature' | 'evergreen' | 'moc'
      notes: [],

      // ---- FSRS cards (simplified v1) ----
      // Each: { id, front, back, createdAt, due, stability, difficulty,
      //         reps, lapses, state }
      //   state: 'new' | 'learning' | 'review' | 'relearning'
      cards: [],

      // ---- review history ----
      // Each: { id, cardId, at, rating, elapsed, scheduled }
      //   rating: 'again' | 'hard' | 'good' | 'easy'
      reviews: [],

      // ---- journal ----
      // Each: { id, lessonId, at, body }
      journalEntries: [],

      // ---- inline prompt answers ----
      // Each: { id, lessonId, promptKey, at, answer }
      promptAnswers: [],

      // ---- settings ----
      settings: {
        darkMode: false,
        reducedMotion: false,
        dailyCheckinEnabled: true,
      },

      // =====================================================================
      // ACTIONS
      // =====================================================================

      setUserName: (name) => set({ userName: name }),

      // ---- navigation ----
      setCurrentPillar: (pillarId) =>
        set({ currentPillar: pillarId, currentModule: null, currentLesson: null }),

      setCurrentModule: (moduleId) => {
        const state = get()
        // Record the first time a trauma module is opened
        if (
          moduleId &&
          moduleId.startsWith('trauma.') &&
          !state.moduleOpenDates[moduleId]
        ) {
          set({
            currentModule: moduleId,
            currentLesson: null,
            moduleOpenDates: {
              ...state.moduleOpenDates,
              [moduleId]: Date.now(),
            },
          })
        } else {
          set({ currentModule: moduleId, currentLesson: null })
        }
      },

      setCurrentLesson: (lessonId) => set({ currentLesson: lessonId }),

      // ---- lesson completion ----
      completeLesson: (lessonId) => {
        const { completedLessons } = get()
        if (completedLessons.includes(lessonId)) return
        set({ completedLessons: [...completedLessons, lessonId] })
      },

      // ---- sessions ----
      startSession: (pillar, module) => {
        const session = {
          id: uid(),
          startedAt: Date.now(),
          endedAt: null,
          pillar: pillar || null,
          module: module || null,
          stopButtonUsed: false,
        }
        set({ sessions: [...get().sessions, session] })
        return session.id
      },

      endSession: (sessionId) => {
        set({
          sessions: get().sessions.map((s) =>
            s.id === sessionId ? { ...s, endedAt: Date.now() } : s
          ),
        })
      },

      /**
       * The stop button is the most important UI element in the app.
       * Using it is a sign of healthy self-regulation, not failure.
       * It ends the session AND records that the learner chose to stop.
       */
      useStopButton: (sessionId) => {
        set({
          sessions: get().sessions.map((s) =>
            s.id === sessionId
              ? { ...s, endedAt: Date.now(), stopButtonUsed: true }
              : s
          ),
        })
      },

      // ---- check-ins ----
      addCheckin: ({ state, intensity, glimmer, note }) => {
        const checkin = {
          id: uid(),
          at: Date.now(),
          state,
          intensity: Math.max(1, Math.min(5, intensity)),
          glimmer: glimmer || null,
          note: note || null,
        }
        set({ checkins: [...get().checkins, checkin] })
        return checkin.id
      },

      // ---- vault notes ----
      addNote: ({ type, title, body, links }) => {
        const now = Date.now()
        const note = {
          id: uid(),
          createdAt: now,
          updatedAt: now,
          type: type || 'fleeting',
          title: title || '',
          body: body || '',
          links: links || [],
        }
        set({ notes: [...get().notes, note] })
        return note.id
      },

      updateNote: (noteId, changes) => {
        set({
          notes: get().notes.map((n) =>
            n.id === noteId
              ? { ...n, ...changes, updatedAt: Date.now() }
              : n
          ),
        })
      },

      // ---- FSRS cards (simplified) ----
      addCard: ({ front, back }) => {
        const card = {
          id: uid(),
          front,
          back,
          createdAt: Date.now(),
          due: Date.now(),
          stability: 0,
          difficulty: 0,
          reps: 0,
          lapses: 0,
          state: 'new',
        }
        set({ cards: [...get().cards, card] })
        return card.id
      },

      /**
       * Record a review and update the card. This is a simplified FSRS
       * implementation for v1 -- just enough to demonstrate the concept.
       * rating: 'again' | 'hard' | 'good' | 'easy'
       */
      reviewCard: (cardId, rating) => {
        const now = Date.now()
        const cards = get().cards
        const card = cards.find((c) => c.id === cardId)
        if (!card) return

        // Simplified interval calculation (real FSRS is more nuanced)
        const intervals = { again: 1, hard: 3, good: 7, easy: 14 }
        const multipliers = { again: 0.5, hard: 0.8, good: 1.0, easy: 1.3 }
        const baseDays = intervals[rating] || 7
        const newStability = Math.max(
          0.1,
          (card.stability || 1) * (multipliers[rating] || 1)
        )
        const intervalMs = baseDays * newStability * 24 * 60 * 60 * 1000

        const review = {
          id: uid(),
          cardId,
          at: now,
          rating,
          elapsed: card.due ? now - card.due : 0,
          scheduled: now + intervalMs,
        }

        const isLapse = rating === 'again' && card.state === 'review'

        set({
          reviews: [...get().reviews, review],
          cards: cards.map((c) =>
            c.id === cardId
              ? {
                  ...c,
                  due: now + intervalMs,
                  stability: newStability,
                  difficulty: Math.max(
                    0,
                    Math.min(
                      10,
                      c.difficulty + (rating === 'again' ? 1 : rating === 'easy' ? -0.5 : 0)
                    )
                  ),
                  reps: c.reps + 1,
                  lapses: isLapse ? c.lapses + 1 : c.lapses,
                  state:
                    rating === 'again'
                      ? c.state === 'new'
                        ? 'learning'
                        : 'relearning'
                      : 'review',
                }
              : c
          ),
        })
      },

      // ---- journal ----
      addJournalEntry: ({ lessonId, body }) => {
        const entry = {
          id: uid(),
          lessonId: lessonId || null,
          at: Date.now(),
          body: body || '',
        }
        set({ journalEntries: [...get().journalEntries, entry] })
        return entry.id
      },

      // ---- prompt answers ----
      savePromptAnswer: ({ lessonId, promptKey, answer }) => {
        const entry = {
          id: uid(),
          lessonId,
          promptKey,
          at: Date.now(),
          answer,
        }
        // Replace existing answer for same lesson+prompt, or add new
        const existing = get().promptAnswers
        const idx = existing.findIndex(
          (p) => p.lessonId === lessonId && p.promptKey === promptKey
        )
        if (idx >= 0) {
          const updated = [...existing]
          updated[idx] = entry
          set({ promptAnswers: updated })
        } else {
          set({ promptAnswers: [...existing, entry] })
        }
        return entry.id
      },

      // ---- settings ----
      updateSettings: (newSettings) => {
        set({ settings: { ...get().settings, ...newSettings } })
      },

      // ---- reset (with confirmation text -- UI should double-confirm) ----
      resetProgress: () =>
        set({
          completedLessons: [],
          currentPillar: null,
          currentModule: null,
          currentLesson: null,
          moduleOpenDates: {},
          sessions: [],
          checkins: [],
          notes: [],
          cards: [],
          reviews: [],
          journalEntries: [],
          promptAnswers: [],
        }),

      // =====================================================================
      // COMPUTED / DERIVED (called as functions, not reactive selectors)
      // =====================================================================

      /**
       * Current pace label: 'overrun' | 'pushing' | 'rested' | 'engaged'
       */
      getComputedPace: () => {
        const { sessions, checkins } = get()
        return computePace(sessions, checkins)
      },

      /**
       * Check whether a module (any pillar) is unlocked.
       *
       * Non-trauma pillars: a module is unlocked if the previous module
       * in the same pillar has at least one completed lesson, OR if it
       * is the first module in its pillar.
       *
       * Trauma pillar: delegates to isTraumaModuleUnlocked with its
       * strict 14-day + completion + check-in requirements.
       *
       * Second Brain MOCs module: requires 30 evergreen notes.
       */
      isModuleUnlocked: (moduleId) => {
        const state = get()

        // Find which pillar this module belongs to
        const pillar = pillarForModule(moduleId)
        if (!pillar) return false

        const moduleIndex = pillar.modules.findIndex((m) => m.id === moduleId)
        if (moduleIndex === -1) return false
        const mod = pillar.modules[moduleIndex]

        // Special: MOCs module requires 30 evergreen notes
        if (mod.requiresEvergreenCount) {
          const evergreenCount = state.notes.filter(
            (n) => n.type === 'evergreen'
          ).length
          if (evergreenCount < mod.requiresEvergreenCount) {
            return {
              locked: true,
              reason: `Requires ${mod.requiresEvergreenCount} evergreen notes. You have ${evergreenCount}.`,
            }
          }
        }

        // Trauma pillar: strict pacing
        if (pillar.traumaPaced) {
          return isTraumaModuleUnlocked(
            moduleId,
            state.completedLessons,
            state.checkins,
            state.moduleOpenDates
          )
        }

        // First module in any pillar is always unlocked
        if (moduleIndex === 0) return true

        // Non-trauma: previous module needs at least one completed lesson
        const previousModule = pillar.modules[moduleIndex - 1]
        const previousLessons = previousModule.lessons.map((l) => l.id)
        const hasCompletedAny = previousLessons.some((id) =>
          state.completedLessons.includes(id)
        )
        return hasCompletedAny ? true : { locked: true, reason: 'Complete at least one lesson in the previous module.' }
      },

      /**
       * Get the next suggested lesson across all pillars.
       * Prefers the current pillar/module if set, otherwise picks
       * the first incomplete lesson in the first pillar.
       *
       * Returns null if there is nothing to suggest (everything done,
       * or all next modules are locked).
       */
      getNextLesson: () => {
        const state = get()

        // If we have a current module, find the first incomplete lesson there
        if (state.currentModule) {
          const lessons = allLessonsInModule(state.currentModule)
          const next = lessons.find(
            (l) => !state.completedLessons.includes(l.id)
          )
          if (next) return next
        }

        // If we have a current pillar, find the first incomplete lesson
        if (state.currentPillar) {
          const lessons = allLessonsInPillar(state.currentPillar)
          const next = lessons.find(
            (l) => !state.completedLessons.includes(l.id)
          )
          if (next) return next
        }

        // Fallback: first incomplete lesson across all pillars
        for (const pillar of PILLARS) {
          for (const mod of pillar.modules) {
            // Skip locked modules
            const unlocked = state.isModuleUnlocked(mod.id)
            if (unlocked !== true) continue

            const next = mod.lessons.find(
              (l) => !state.completedLessons.includes(l.id)
            )
            if (next) return next
          }
        }

        return null
      },

      /**
       * Return all lessons for a given pillar ID, annotated with
       * completion status, module grouping, and lock state.
       */
      getLessonsByPillar: (pillarId) => {
        const state = get()
        const pillar = PILLARS.find((p) => p.id === pillarId)
        if (!pillar) return []

        return pillar.modules.map((mod) => {
          const unlocked = state.isModuleUnlocked(mod.id)
          return {
            moduleId: mod.id,
            moduleTitle: mod.title,
            moduleDescription: mod.description,
            unlocked: unlocked === true,
            lockReason: unlocked !== true ? unlocked.reason : null,
            lessons: mod.lessons.map((l) => ({
              ...l,
              completed: state.completedLessons.includes(l.id),
            })),
          }
        })
      },

      /**
       * Count of evergreen notes (used for MOC unlock check and UI display).
       */
      getEvergreenCount: () => {
        return get().notes.filter((n) => n.type === 'evergreen').length
      },

      /**
       * Get cards that are due for review right now.
       */
      getDueCards: () => {
        const now = Date.now()
        return get().cards.filter((c) => c.due <= now)
      },

      /**
       * Pacing summary for the UI. Includes the pace label,
       * session totals, and whether the trauma track is ahead of
       * a healthy schedule.
       */
      getPacingSummary: () => {
        const state = get()
        const pace = computePace(state.sessions, state.checkins)

        const now = Date.now()
        const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000

        const recentSessions = state.sessions.filter(
          (s) => s.startedAt >= sevenDaysAgo
        )
        const totalMinutes = recentSessions.reduce((sum, s) => {
          const end = s.endedAt || now
          return sum + (end - s.startedAt) / 60000
        }, 0)

        const traumaSessions = recentSessions.filter(
          (s) => s.pillar === 'trauma'
        ).length

        const stopButtonUses = recentSessions.filter(
          (s) => s.stopButtonUsed
        ).length

        return {
          pace,
          totalMinutesLast7Days: Math.round(totalMinutes),
          sessionsLast7Days: recentSessions.length,
          traumaSessionsLast7Days: traumaSessions,
          stopButtonUsesLast7Days: stopButtonUses,
          message: {
            overrun:
              'You have been pushing hard. Consider taking a break. The material will be here when you return.',
            pushing:
              'You are spending a lot of time here. Slower is often deeper. There is no deadline.',
            rested:
              'Welcome back. Pick up wherever feels right -- or just do a check-in.',
            engaged:
              'Steady pace. You are doing well.',
          }[pace],
        }
      },
    }),
    {
      name: 'tapasya-storage',
    }
  )
)

export default useTapasyaStore
