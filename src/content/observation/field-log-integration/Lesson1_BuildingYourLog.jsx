import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
  ObservationScene,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 1 -- Building Your Log
 * Designing a personal field log that combines all observation skills
 * from the pillar into a single, sustainable practice.
 */

export default function Lesson1_BuildingYourLog({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ---- TITLE ---- */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Building Your Log
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Designing a personal observation practice that combines
          everything you have learned.
        </p>
      </header>

      {/* Research paragraph: Reflective practice */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Donald Sch&ouml;n's research on reflective practice (1983)
          distinguishes two kinds of reflection: reflection-in-action
          (thinking while doing) and reflection-on-action (thinking
          after doing). Both are essential for building expertise, and
          both require a medium for recording and revisiting
          observations. The field log serves as that medium -- a
          structured place where you capture observations in the moment
          and reflect on them later. Without it, insights evaporate.
          With it, patterns accumulate.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Over the previous modules, you have practiced multiple
          observation methods: the naturalist's three prompts,
          photographic framing and light study, phenomenological
          bracketing and description, and Boyd's OODA loop. Each method
          emphasizes different aspects of attention. The field log
          integrates them into a single practice that you can sustain
          daily, drawing on whichever method fits the moment. The goal
          is not to use all methods every day -- it is to have them
          all available and to build the habit of recording what you
          notice.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Log Architecture ---- */}
      <VisualStepExplainer
        title="Designing your field log"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center py-4">
                <motion.div
                  className="w-72 bg-surface border-2 rounded-gentle p-4"
                  style={{ borderColor: '#4F7A5A' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* Header */}
                  <div className="flex justify-between text-[9px] font-ui text-ink-tertiary mb-3 pb-2 border-b border-line-soft">
                    <span>Date &middot; Time</span>
                    <span>Location &middot; Conditions</span>
                  </div>
                  {/* Method selector */}
                  <div className="flex gap-1 mb-3">
                    {['Notice', 'Frame', 'Bracket', 'OODA'].map((m, i) => (
                      <div
                        key={m}
                        className="flex-1 text-center rounded-sm py-1 border"
                        style={{
                          borderColor: i === 0 ? '#4F7A5A' : 'var(--color-line-soft)',
                          backgroundColor: i === 0 ? 'rgba(79,122,90,0.1)' : 'transparent',
                        }}
                      >
                        <span
                          className="text-[8px] font-ui"
                          style={{ color: i === 0 ? '#4F7A5A' : 'var(--color-ink-tertiary)' }}
                        >
                          {m}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Observation area */}
                  <div className="mb-2">
                    <p className="text-[9px] font-ui" style={{ color: '#4F7A5A' }}>
                      Observation:
                    </p>
                    <div className="h-8 border-b border-line-soft" />
                    <div className="h-8 border-b border-line-soft" />
                  </div>
                  {/* Sketch */}
                  <div
                    className="h-16 rounded-calm mb-2 flex items-center justify-center border"
                    style={{ borderColor: '#B89466', backgroundColor: 'rgba(184,148,102,0.04)' }}
                  >
                    <span className="text-[9px] font-ui" style={{ color: '#B89466' }}>
                      Quick sketch (optional)
                    </span>
                  </div>
                  {/* Reflection */}
                  <div>
                    <p className="text-[9px] font-ui" style={{ color: '#5B6F8C' }}>
                      Reflection:
                    </p>
                    <div className="h-8 border-b border-line-soft" />
                  </div>
                </motion.div>
              </div>
            ),
            caption:
              'A field log entry: date, location, method used, observation, optional sketch, and reflection. Flexible enough to adapt to any observation method.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-3 max-w-sm w-full">
                  {[
                    { label: 'Naturalist', when: 'Outdoors, nature, slow pace', color: '#4F7A5A' },
                    { label: 'Photographic', when: 'Visual scenes, light, composition', color: '#4F7A5A' },
                    { label: 'Phenomenological', when: 'Inner experience, assumptions', color: '#5B6F8C' },
                    { label: 'OODA', when: 'Dynamic situations, decisions', color: '#5B6F8C' },
                  ].map((method, i) => (
                    <motion.div
                      key={method.label}
                      className="bg-surface rounded-calm p-2 border border-line-soft"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.12 }}
                    >
                      <p
                        className="text-[10px] font-ui font-medium"
                        style={{ color: method.color }}
                      >
                        {method.label}
                      </p>
                      <p className="text-[8px] font-ui text-ink-tertiary mt-1">
                        Best for: {method.when}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <p className="text-[10px] font-ui text-ink-tertiary text-center max-w-xs">
                  Match the method to the situation. No single method is best
                  for everything.
                </p>
              </div>
            ),
            caption:
              'Four observation methods, each suited to different situations. Your field log gives you a place to practice any of them.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-sm w-full">
                  {[
                    { min: '2 min', type: 'Quick capture: one observation, three sentences' },
                    { min: '5 min', type: 'Standard entry: method + observation + sketch' },
                    { min: '15 min', type: 'Deep dive: full method + reflection + connections' },
                  ].map((tier, i) => (
                    <motion.div
                      key={tier.min}
                      className="flex items-center gap-3 bg-surface rounded-calm p-3 border border-line-soft"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(79,122,90,0.1)' }}
                      >
                        <span className="text-xs font-ui font-bold" style={{ color: '#4F7A5A' }}>
                          {tier.min}
                        </span>
                      </div>
                      <p className="text-[10px] font-ui text-ink-secondary">
                        {tier.type}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Three time tiers: 2-minute quick capture, 5-minute standard entry, 15-minute deep dive. Having tiers prevents the log from becoming a burden.',
          },
        ]}
      />

      {/* Research paragraph: Structured reflection */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Gibbs' reflective cycle (1988) provides a useful structure for
          the reflection component of a field log: description (what
          happened), feelings (what you felt), evaluation (what was good
          or challenging), analysis (what sense you make of it), conclusion
          (what you learned), and action plan (what you would do
          differently). You do not need to complete all six stages in
          every entry, but having the structure available helps move
          reflection beyond vague impressions toward actionable insight.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The field log also serves a grounding function. Each entry
          anchors you in a specific time, place, and sensory reality. Over
          time, the accumulated entries become a record of your
          attentional growth -- a tangible reminder that you are building
          a skill, not just reading about one. For trauma survivors, this
          external record can be especially valuable: it provides evidence
          of your own capacity to observe, reflect, and learn, independent
          of anyone else's judgment.
        </p>
      </section>

      {/* ---- PROMPT ---- */}
      <Prompt
        id="build-log-prompt"
        question="Design your personal field log. Decide: (1) What format will you use (notebook, app, voice memo)? (2) What will a standard entry include? (3) When will you make entries (time of day, frequency)? (4) What is your minimum viable entry (the smallest version you will do on a low-energy day)?"
        placeholder="Format: ... Standard entry: ... When: ... Minimum: ..."
        onSave={savePromptAnswer}
      />

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Sch&ouml;n distinguishes between:',
            options: [
              {
                id: 'a',
                label: 'Reflection-in-action (while doing) and reflection-on-action (after doing)',
                correct: true,
              },
              {
                id: 'b',
                label: 'Active reflection and passive reflection',
                correct: false,
              },
              {
                id: 'c',
                label: 'Internal reflection and external reflection',
                correct: false,
              },
            ],
          },
          {
            prompt: 'Why have multiple time tiers for field log entries?',
            options: [
              {
                id: 'a',
                label: 'So you always do the maximum entry',
                correct: false,
              },
              {
                id: 'b',
                label: 'To prevent the log from becoming a burden -- any entry is better than none',
                correct: true,
              },
              {
                id: 'c',
                label: 'Because short entries have no value',
                correct: false,
              },
            ],
          },
        ]}
      />

      {/* ---- FEYNMAN CHECK ---- */}
      <FeynmanCheck
        id="fieldlog-l1-feynman"
        prompt="Explain to someone who has never kept a journal why a structured field log is different from a diary -- and why the structure matters for observation skill."
        rubric={[
          'You distinguished structured observation from free-form writing.',
          'You explained how structure (methods, prompts, time tiers) supports the skill.',
          'You connected the log to the observation methods from previous modules.',
          'You made it sound practical, not bureaucratic.',
        ]}
      />

      {/* ---- REFLECTION ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="What is your resistance to keeping a log, if any? What would make it feel like a gift to yourself rather than a task?"
          lessonId="observation.field-log-integration.building-your-log"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 4 &middot; Field Log Integration
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Weekly Review
            </p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">
            Continue
          </button>
        </div>
      </footer>
    </article>
  )
}
