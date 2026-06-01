import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
  BranchScenario,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 5 -- Tempo
 * The speed of cycling through OODA as a strategic variable.
 * Fast tempo, slow tempo, and knowing when to use which.
 */

export default function Lesson5_Tempo({
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
          Tempo
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The speed of the loop as a strategic variable.
        </p>
      </header>

      {/* Research paragraph: Tempo as advantage */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Boyd's most famous strategic insight was not about any single
          phase of the OODA loop -- it was about the speed of the entire
          cycle. The pilot (or organization, or individual) who cycles
          through Observe-Orient-Decide-Act faster than their adversary
          gains a compounding advantage. By the time the slower party has
          oriented and decided, the faster party has already acted,
          changed the environment, and started a new observation. The
          slower party is always responding to a situation that no longer
          exists. Boyd called this "getting inside the opponent's OODA
          loop."
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          But tempo is not always about raw speed. Boyd also recognized
          that there are situations where slowing down is the strategic
          move. When the environment is stable and the cost of error is
          high, a slower, more deliberate loop may be superior. The skill
          is not just cycling fast -- it is knowing when to speed up and
          when to slow down. This is what Boyd called "operating at a
          variety of tempos" -- the ability to shift speed in response
          to the demands of the situation.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Tempo Comparison ---- */}
      <VisualStepExplainer
        title="Fast tempo vs slow tempo"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-6 items-center">
                  <div className="text-center">
                    <motion.div
                      className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#4F7A5A' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <span className="text-xs font-ui font-bold" style={{ color: '#4F7A5A' }}>
                        OODA
                      </span>
                    </motion.div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">Fast tempo</p>
                    <p className="text-[10px] font-ui" style={{ color: '#4F7A5A' }}>Many cycles</p>
                  </div>
                  <span className="text-ink-tertiary font-ui">vs</span>
                  <div className="text-center">
                    <motion.div
                      className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#5B6F8C' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    >
                      <span className="text-xs font-ui font-bold" style={{ color: '#5B6F8C' }}>
                        OODA
                      </span>
                    </motion.div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">Slow tempo</p>
                    <p className="text-[10px] font-ui" style={{ color: '#5B6F8C' }}>Deeper cycles</p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Fast tempo: many quick cycles, rapid adaptation, good for dynamic situations. Slow tempo: fewer, deeper cycles, more thorough analysis, good for complex stable situations.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-2 gap-3 max-w-sm w-full">
                  {[
                    { when: 'Speed up', conditions: ['Environment changing fast', 'Low cost of error', 'Information comes from action', 'Opponent cycling fast'] },
                    { when: 'Slow down', conditions: ['Environment stable', 'High cost of error', 'Information comes from analysis', 'No opponent or no time pressure'] },
                  ].map((col, i) => (
                    <div key={col.when} className="bg-surface rounded-calm p-3 border border-line-soft">
                      <p
                        className="text-xs font-ui font-medium mb-2"
                        style={{ color: i === 0 ? '#4F7A5A' : '#5B6F8C' }}
                      >
                        {col.when}
                      </p>
                      {col.conditions.map((c, j) => (
                        <p key={j} className="text-[9px] font-ui text-ink-tertiary mb-1">
                          &bull; {c}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Knowing when to speed up and when to slow down is more important than raw speed. The right tempo depends on the environment, not just your capability.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-full max-w-sm">
                  <div className="flex items-end gap-1 justify-center" style={{ height: '100px' }}>
                    {[
                      { cycle: 1, height: 30, time: 0.3 },
                      { cycle: 2, height: 45, time: 0.3 },
                      { cycle: 3, height: 60, time: 0.3 },
                      { cycle: 4, height: 75, time: 0.3 },
                      { cycle: 5, height: 88, time: 0.3 },
                      { cycle: 6, height: 95, time: 0.3 },
                    ].map((c, i) => (
                      <motion.div
                        key={c.cycle}
                        className="w-8 rounded-t-sm"
                        style={{ backgroundColor: '#4F7A5A' }}
                        initial={{ height: 0 }}
                        animate={{ height: `${c.height}px` }}
                        transition={{ delay: i * 0.2, duration: 0.3 }}
                      >
                        <span className="block text-center text-[7px] font-ui text-white pt-1">
                          {c.cycle}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-[10px] font-ui text-ink-tertiary text-center mt-2">
                    Each cycle improves understanding. Six fast cycles often
                    beat two slow ones.
                  </p>
                </div>
              </div>
            ),
            caption:
              'The compounding advantage: each cycle improves your orientation. Fast cycling means more updates, more corrections, better adaptation over time.',
          },
        ]}
      />

      {/* Research paragraph: Tempo in everyday life */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Outside of military strategy, tempo applies to any domain where
          you are adapting to a changing situation. In learning, a faster
          feedback loop -- practice, observe the result, adjust, practice
          again -- accelerates skill development. Ericsson's research on
          deliberate practice (1993) emphasizes the role of immediate
          feedback in building expertise. The OODA framework adds the
          explicit recognition that you must observe and orient before
          adjusting -- not just repeat blindly, but cycle through the
          full loop.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          For trauma-informed practice, tempo awareness is healing. Many
          survivors have been forced to operate at a tempo set by someone
          else -- hypervigilant and reactive, or frozen and unable to act.
          Learning to choose your own tempo -- to recognize when you need
          to speed up and when you need to slow down -- is an act of
          agency. The OODA loop is not a prescription for constant
          acceleration. It is a framework for conscious choice about the
          pace of your engagement with the world.
        </p>
      </section>

      {/* ---- BRANCH SCENARIO ---- */}
      <BranchScenario
        id="tempo-scenario"
        scenario="You are learning a new skill. After three practice sessions, you are not improving. What do you do?"
        branches={[
          {
            label: 'Practice more at the same pace',
            feedback:
              'More repetitions without observation and orientation is just blind repetition. The OODA approach would be: observe what is not working, re-orient (what am I misunderstanding?), decide on an adjustment, act differently.',
          },
          {
            label: 'Slow down: observe my practice more carefully, identify what specifically is not working, adjust one thing, try again',
            feedback:
              'This is the OODA loop applied to learning. You are slowing the tempo to deepen the observation and orientation phases, then acting with more precision.',
          },
          {
            label: 'Speed up: try many different approaches quickly to find what works',
            feedback:
              'This can work if the cost of error is low and the domain allows rapid experimentation. Fast tempo, many cycles, each generating data. Valid when exploration is more important than precision.',
          },
        ]}
      />

      {/* ---- PROMPT ---- */}
      <Prompt
        id="tempo-prompt"
        question="Think about the tempo of your daily life. Where are you cycling too fast (acting without observing)? Where are you cycling too slow (observing without acting)? Where is your tempo well-matched to the situation?"
        placeholder="Too fast: ... Too slow: ... Well-matched: ..."
        onSave={savePromptAnswer}
      />

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: '"Getting inside the opponent\'s OODA loop" means:',
            options: [
              {
                id: 'a',
                label: 'Predicting what the opponent will do',
                correct: false,
              },
              {
                id: 'b',
                label: 'Cycling through your loop faster so the opponent is always responding to an outdated situation',
                correct: true,
              },
              {
                id: 'c',
                label: 'Copying the opponent\'s strategy',
                correct: false,
              },
            ],
          },
          {
            prompt: 'When should you slow your OODA tempo?',
            options: [
              {
                id: 'a',
                label: 'Always -- slower is always better',
                correct: false,
              },
              {
                id: 'b',
                label: 'When the environment is stable and the cost of error is high',
                correct: true,
              },
              {
                id: 'c',
                label: 'Never -- faster always wins',
                correct: false,
              },
            ],
          },
        ]}
      />

      {/* ---- FEYNMAN CHECK ---- */}
      <FeynmanCheck
        id="ooda-l5-feynman"
        prompt="Using a non-military example (learning a sport, cooking a new recipe, navigating a new city), explain how the OODA loop works and why tempo matters."
        rubric={[
          'You walked through all four phases with a concrete, relatable example.',
          'You showed how each action generates information for the next cycle.',
          'You explained why tempo matters (faster cycling = faster adaptation).',
          'You noted that the right tempo depends on the situation.',
        ]}
      />

      {/* ---- REFLECTION ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Looking back at this module: how does the OODA framework relate to your own decision-making patterns? Is there a phase you tend to skip or get stuck in? What would it look like to cycle more consciously?"
          lessonId="observation.ooda-loop.tempo"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 5 of 5 &middot; OODA Loop
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next module: Field Log Integration
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
