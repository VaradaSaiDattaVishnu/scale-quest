import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  BranchScenario,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 4 -- Competition Prep
 * How memory competitions work, what a competition day looks like,
 * and how to structure deliberate practice.
 * Research grounding: K. Anders Ericsson's deliberate practice framework.
 */

export default function Lesson4_CompetitionPrep({
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
          Competition Prep &amp; Deliberate Practice
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          How the world's best memory athletes train -- and what you can borrow.
        </p>
      </header>

      {/* Research paragraph: Memory competitions overview */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The World Memory Championships, founded in 1991 by Tony Buzan and Raymond Keene, consist of ten events testing the memorization of numbers, binary digits, playing cards, names and faces, spoken numbers, historic dates, abstract images, and random words. Competitors are given fixed time to memorize material, then a separate period to recall it. Scoring is strict: in most events, a single error in a row of data invalidates the entire row.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          What separates elite memory athletes from hobbyists is not talent in any traditional sense. K. Anders Ericsson, whose 1993 paper on deliberate practice reshaped how we understand expert performance, studied memory competitors directly. He found that their working memory capacity was normal. Their advantage came from thousands of hours of structured practice using mnemonic systems like PAO, combined with systematic feedback and progressive difficulty.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Ericsson's framework specifies four criteria for practice to count as "deliberate": it must target a specific skill component, operate at the edge of current ability, include immediate feedback, and involve high repetition. Casual practice -- running through a deck without timing, or reviewing PAO images passively -- violates several of these criteria. Deliberate practice for memory means timed attempts with error tracking and targeted correction.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: Competition Day Timeline ---- */}
      <VisualStepExplainer
        title="Anatomy of a Competition Day"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-2 py-4">
                <div className="w-full max-w-md">
                  {[
                    { time: '8:00 AM', event: 'Warm-up: 15-min number drill', color: '#5B6F8C' },
                    { time: '9:00 AM', event: 'Event 1: Speed Numbers (5 min memo)', color: '#4F7A5A' },
                    { time: '10:30 AM', event: 'Event 2: Binary Digits (30 min memo)', color: '#4F7A5A' },
                    { time: '12:00 PM', event: 'Lunch & mental reset', color: '#5B6F8C' },
                    { time: '1:30 PM', event: 'Event 3: Speed Cards (single deck)', color: '#B89466' },
                    { time: '3:00 PM', event: 'Event 4: Names & Faces (15 min memo)', color: '#4F7A5A' },
                    { time: '4:30 PM', event: 'Debrief & error analysis', color: '#5B6F8C' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.time}
                      className="flex items-center gap-3 mb-2"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.12 }}
                    >
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="font-mono text-xs text-ink-tertiary w-16 flex-shrink-0">{item.time}</span>
                      <span className="text-xs font-ui text-ink-secondary">{item.event}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'A typical competition day alternates high-intensity memorization events with rest periods. Mental fatigue management is as important as the techniques themselves.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                  {[
                    { label: 'Memorization Phase', desc: 'Encode material using PAO + memory palace', icon: 'M', color: '#4F7A5A' },
                    { label: 'Recall Phase', desc: 'Write down everything in order', icon: 'R', color: '#B89466' },
                  ].map((phase, i) => (
                    <motion.div
                      key={phase.label}
                      className="bg-surface rounded-calm border border-line-soft p-4 text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <div
                        className="w-10 h-10 rounded-full mx-auto flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: phase.color }}
                      >
                        {phase.icon}
                      </div>
                      <p className="text-xs font-ui font-medium text-ink-primary mt-2">{phase.label}</p>
                      <p className="text-[10px] font-ui text-ink-tertiary mt-1">{phase.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Every event has two phases. Memorization and recall are separate skills that need separate practice. Many beginners practice memorization but neglect recall accuracy.',
          },
        ]}
      />

      {/* Research paragraph: Deliberate practice specifics */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Ericsson found that expert performers across domains -- music, chess, sports, and memory -- share a training structure. They break complex skills into components, practice each component in isolation, and progressively integrate them. For memory athletes, this means isolating PAO encoding speed, palace navigation speed, and recall accuracy as separate drill targets before combining them in full-deck attempts.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          One counterintuitive finding from Ericsson's work: deliberate practice is not enjoyable in the moment. It is effortful, focused, and often frustrating. The athletes who improve fastest are not those who practice the longest, but those who tolerate the discomfort of operating at their limit. Memory champion Jonas von Essen has said that his best training sessions are the ones where he makes the most errors, because those reveal exactly where his system needs reinforcement.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 2: Deliberate Practice Framework ---- */}
      <VisualStepExplainer
        title="The Four Pillars of Deliberate Practice"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  {[
                    { pillar: 'Specific target', example: 'Cards 27-39 encoding speed', color: '#4F7A5A' },
                    { pillar: 'Edge of ability', example: '5 seconds faster than comfortable', color: '#B89466' },
                    { pillar: 'Immediate feedback', example: 'Check accuracy after each attempt', color: '#5B6F8C' },
                    { pillar: 'High repetition', example: '20+ timed attempts per session', color: '#4F7A5A' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.pillar}
                      className="bg-surface rounded-calm border-2 p-3"
                      style={{ borderColor: item.color }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <p className="text-xs font-ui font-semibold" style={{ color: item.color }}>{item.pillar}</p>
                      <p className="text-[10px] font-ui text-ink-tertiary mt-1">{item.example}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'All four pillars must be present for practice to be "deliberate." Remove any one, and improvement slows dramatically. This is what separates focused training from casual repetition.',
          },
        ]}
      />

      {/* Research paragraph: Training schedule */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          Top competitors typically train 1-3 hours per day, with sessions structured around specific weaknesses identified in previous attempts. Alex Mullen has described his training as "boring from the outside" -- hundreds of timed repetitions of the same deck, with a spreadsheet tracking errors by card, by palace location, and by time segment. The spreadsheet is as important as the practice itself, because without data on where errors cluster, practice becomes random rather than targeted.
        </p>
      </section>

      {/* ---- BranchScenario Exercise ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Practice Decision Scenario
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-4">
          Choose the most effective training approach for each situation
        </p>
        <BranchScenario
          scenario="You just timed yourself memorizing a deck in 4 minutes. You made 3 errors, all in the last 15 cards. What do you do next?"
          branches={[
            {
              id: 'full-deck',
              label: 'Try the full deck again, faster',
              feedback: 'This skips the diagnostic step. You do not yet know why the last 15 cards are problematic. Deliberate practice targets the specific weak point first.',
              isOptimal: false,
            },
            {
              id: 'isolate',
              label: 'Drill only cards 37-52 in isolation, then retry the full deck',
              feedback: 'This isolates the weak component, addresses it specifically, then reintegrates. This matches all four pillars of deliberate practice.',
              isOptimal: true,
            },
            {
              id: 'rest',
              label: 'Take a break and try again tomorrow',
              feedback: 'Rest is important, but not before analyzing the error pattern. The information about where you failed is freshest now. Log the errors, then rest.',
              isOptimal: false,
            },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'According to Ericsson, what makes practice "deliberate"?',
            options: [
              { id: 'long', label: 'Practicing for many hours', correct: false },
              { id: 'specific', label: 'Targeting a specific skill at the edge of ability with feedback', correct: true },
              { id: 'enjoy', label: 'Making practice enjoyable and relaxing', correct: false },
            ],
          },
          {
            prompt: 'In memory competitions, what happens if you make one error in a row?',
            options: [
              { id: 'partial', label: 'You get partial credit for that row', correct: false },
              { id: 'invalid', label: 'The entire row is typically invalidated', correct: true },
              { id: 'nothing', label: 'Nothing -- errors are ignored', correct: false },
            ],
          },
          {
            prompt: 'Why do top competitors track errors in spreadsheets?',
            options: [
              { id: 'rules', label: 'Competition rules require it', correct: false },
              { id: 'target', label: 'To identify which specific components need targeted practice', correct: true },
              { id: 'show', label: 'To show coaches their progress', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="pao-lesson4-feynman"
        prompt="Explain to a friend why practicing memory techniques casually for 2 hours is less effective than 30 minutes of deliberate practice. Use Ericsson's four criteria."
        rubric={[
          'You named or described all four criteria: specific target, edge of ability, feedback, repetition.',
          'You contrasted casual practice with deliberate practice using a concrete example.',
          'You explained why errors and discomfort are actually signals of effective training.',
          'Your friend could use this framework to improve their own practice sessions.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 8 &middot; PAO System
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Speed drills for encoding automaticity
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
