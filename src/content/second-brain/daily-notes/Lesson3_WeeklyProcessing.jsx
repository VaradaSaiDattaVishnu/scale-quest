import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 3 -- Weekly Processing
 * The weekly review ritual that keeps your system alive.
 * Research on reflection, metacognition, and habit formation.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

export default function Lesson3_WeeklyProcessing({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Weekly Processing
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          A ritual that keeps your knowledge system alive and growing.
        </p>
      </header>

      {/* Research: Weekly review */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          David Allen's weekly review is the keystone habit of Getting Things Done. He calls it "the secret weapon" because without it, the entire system degrades. The weekly review is when you step back from doing and instead look at your system: what was captured, what was processed, what is still pending, and what needs attention. Applied to a note system, this is the session where you ensure your inbox is empty, your notes are linked, and your thinking is coherent.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research on self-regulated learning (Zimmerman, 2002) shows that learners who regularly reflect on their process -- not just their content -- outperform those who do not. The weekly review is a structured form of this reflection. You are not just tidying your notes; you are examining your own thinking patterns, noticing what ideas are clustering, and identifying gaps in your understanding.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="The weekly review"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-4 border border-line-soft max-w-sm w-full">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-4">Weekly review checklist</p>
                  {[
                    { step: 'Empty the inbox', time: '10 min', color: SAGE },
                    { step: 'Review this week\'s notes', time: '10 min', color: SAGE },
                    { step: 'Add missing links', time: '10 min', color: SLATE },
                    { step: 'Update structure notes', time: '5 min', color: SLATE },
                    { step: 'Identify gaps or questions', time: '5 min', color: AMBER },
                    { step: 'Set intentions for next week', time: '5 min', color: AMBER },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center justify-between mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border-2 flex-shrink-0" style={{ borderColor: item.color }} />
                        <span className="text-xs font-ui text-ink-secondary">{item.step}</span>
                      </div>
                      <span className="text-[10px] font-ui text-ink-tertiary">{item.time}</span>
                    </motion.div>
                  ))}
                  <div className="mt-3 pt-3 border-t border-line-soft flex justify-between">
                    <span className="text-xs font-ui font-semibold text-ink-primary">Total</span>
                    <span className="text-xs font-ui font-semibold" style={{ color: SAGE }}>~45 min</span>
                  </div>
                </div>
              </div>
            ),
            caption: 'A 45-minute weekly session that keeps your entire system healthy. Six steps, each focused and time-boxed.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-6">
                  {[
                    { label: 'Mon-Fri', desc: 'Capture + daily triage', phase: 'Doing', color: SAGE },
                    { label: 'Saturday', desc: 'Weekly review', phase: 'Reflecting', color: AMBER },
                    { label: 'Sunday', desc: 'Rest + emerge', phase: 'Integrating', color: SLATE },
                  ].map((day, i) => (
                    <motion.div
                      key={day.label}
                      className="text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.3 }}
                    >
                      <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center" style={{ borderColor: day.color }}>
                        <span className="font-ui text-[10px] font-bold" style={{ color: day.color }}>{day.phase}</span>
                      </div>
                      <p className="text-xs font-ui text-ink-secondary mt-2 font-semibold">{day.label}</p>
                      <p className="text-[10px] font-ui text-ink-tertiary">{day.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Weekdays for capture and quick processing. One session for the full review. Rest for letting ideas integrate subconsciously.',
          },
        ]}
      />

      {/* Research: Habit formation */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          James Clear's research synthesis on habit formation (Atomic Habits, 2018) shows that habits stick when they have four properties: they are obvious (cued), attractive (rewarding), easy (low friction), and satisfying (immediate feedback). A successful weekly review has all four: a fixed time slot (cue), the satisfaction of a clean system (reward), a checklist that reduces thinking (easy), and visible progress in your notes (feedback).
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          If the weekly review feels like a chore, the friction is too high. Reduce it: shorten the session, simplify the checklist, or pair it with something enjoyable (coffee, music, a favorite location). The review does not have to be perfect. It has to happen.
        </p>
      </section>

      {/* ---- PROMPT ---- */}
      <section className="my-10">
        <Prompt
          id="weekly-processing-prompt"
          question="Design your ideal weekly review session. When would you do it? Where? How long? What would the checklist include? What would make it enjoyable enough to do every week?"
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why does David Allen call the weekly review "the secret weapon"?',
            options: [
              { id: 'clean', label: 'Because it keeps things organized', correct: false },
              { id: 'degrade', label: 'Because without it, the entire system gradually degrades', correct: true },
              { id: 'fast', label: 'Because it makes you faster', correct: false },
            ],
          },
          {
            prompt: 'What makes a weekly review habit stick?',
            options: [
              { id: 'discipline', label: 'Pure willpower and discipline', correct: false },
              { id: 'clear', label: 'Fixed cue, low friction, visible reward, and enjoyment', correct: true },
              { id: 'app', label: 'Having the right app', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="daily-notes-L3-feynman"
        prompt="Explain to someone who has never done a weekly review why spending 45 minutes once a week will save them hours of confusion."
        rubric={[
          'You explained that without review, systems degrade.',
          'You listed the key steps of a review.',
          'You addressed the time objection (45 min saves hours).',
          'You suggested making it enjoyable, not just dutiful.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Have you ever tried a regular review practice? What made it stick or fall apart? What would need to be different this time?"
          lessonId="second-brain.daily-notes.weekly-processing"
          onSave={addJournalEntry}
        />
      </section>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 4 &middot; Daily Notes
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Practice
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
