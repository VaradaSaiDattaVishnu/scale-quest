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
 * Lesson 4 -- Act (OODA)
 * The action phase: executing the decision and generating
 * new information for the next observation cycle.
 */

export default function Lesson4_Act({
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
          Act
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Executing the decision and generating new data for the next cycle.
        </p>
      </header>

      {/* Research paragraph: Action as information */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The Act phase is where the OODA loop meets reality. You have
          observed, oriented, and decided -- now you execute. But Boyd
          understood something crucial about action: it is not the end of
          the loop. It is the beginning of the next one. Every action
          changes the environment, and the changed environment provides
          new data for the next observation cycle. Action is both an
          output of the current loop and an input to the next.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This means that hesitation has a double cost. Not only does it
          delay the current action, it delays the information that action
          would have generated. In dynamic environments, the value of
          information from action often exceeds the value of information
          from further analysis. Karl Weick's concept of "enactment"
          (1988) captures this idea: sometimes you cannot understand a
          situation until you act and observe the consequences. The world
          reveals itself in response to your probing, not just your
          watching.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Action-Feedback Loop ---- */}
      <VisualStepExplainer
        title="Action generates information"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center py-4">
                <svg width="220" height="160" viewBox="0 0 220 160" fill="none">
                  {/* Act node */}
                  <motion.rect
                    x="75"
                    y="10"
                    width="70"
                    height="40"
                    rx="6"
                    fill="rgba(79,122,90,0.12)"
                    stroke="#4F7A5A"
                    strokeWidth="2"
                  />
                  <text x="110" y="34" textAnchor="middle" fill="#4F7A5A" fontSize="11" fontWeight="bold" fontFamily="ui-sans-serif">ACT</text>
                  {/* Environment */}
                  <motion.rect
                    x="45"
                    y="80"
                    width="130"
                    height="40"
                    rx="6"
                    fill="rgba(91,111,140,0.08)"
                    stroke="#5B6F8C"
                    strokeWidth="1.5"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <text x="110" y="104" textAnchor="middle" fill="#5B6F8C" fontSize="10" fontFamily="ui-sans-serif">Environment changes</text>
                  {/* Down arrow */}
                  <motion.path d="M110 50 L110 78" stroke="#4F7A5A" strokeWidth="2" markerEnd="url(#arrowGreen)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.4 }} />
                  {/* Feedback arrow */}
                  <motion.path d="M175 95 Q200 95 200 60 Q200 25 175 25 L148 25" stroke="#B89466" strokeWidth="1.5" strokeDasharray="4 4" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.6 }} />
                  <text x="207" y="64" fill="#B89466" fontSize="8" fontFamily="ui-sans-serif">New</text>
                  <text x="207" y="74" fill="#B89466" fontSize="8" fontFamily="ui-sans-serif">data</text>
                  {/* New observation */}
                  <motion.rect
                    x="25"
                    y="130"
                    width="170"
                    height="25"
                    rx="4"
                    fill="rgba(184,148,102,0.08)"
                    stroke="#B89466"
                    strokeWidth="1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  />
                  <text x="110" y="146" textAnchor="middle" fill="#B89466" fontSize="9" fontFamily="ui-sans-serif">Next OBSERVE cycle begins</text>
                  <defs>
                    <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
                      <path d="M0 0 L8 4 L0 8 Z" fill="#4F7A5A" />
                    </marker>
                  </defs>
                </svg>
              </div>
            ),
            caption:
              'Every action changes the environment, generating new data for the next observation. The loop is continuous, not sequential.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-4 max-w-sm w-full">
                  <div className="bg-surface rounded-calm p-3 border border-line-soft">
                    <p className="text-xs font-ui font-medium mb-1" style={{ color: '#B89466' }}>
                      Hesitation cost
                    </p>
                    <p className="text-[10px] text-ink-tertiary font-ui">
                      Delays both the action and the information that
                      action would have generated.
                    </p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border-2" style={{ borderColor: '#4F7A5A' }}>
                    <p className="text-xs font-ui font-medium mb-1" style={{ color: '#4F7A5A' }}>
                      Action value
                    </p>
                    <p className="text-[10px] text-ink-tertiary font-ui">
                      Even imperfect action generates data that improves
                      the next cycle.
                    </p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'In dynamic situations, hesitation has a double cost: delayed action plus delayed information. An imperfect action that generates data is often better than perfect inaction.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-sm w-full">
                  {[
                    { label: 'Test, don\'t commit', detail: 'Small actions reveal information at low cost' },
                    { label: 'Probe, then adjust', detail: 'Act, observe the result, update your orientation' },
                    { label: 'Speed over precision', detail: 'Many quick cycles beat one slow perfect cycle' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="flex items-center gap-3 bg-surface rounded-calm p-3 border border-line-soft"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(79,122,90,0.15)' }}
                      >
                        <span className="text-xs font-bold" style={{ color: '#4F7A5A' }}>
                          {i + 1}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-ui text-ink-primary font-medium">
                          {item.label}
                        </p>
                        <p className="text-[10px] font-ui text-ink-tertiary">
                          {item.detail}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Three principles of Boyd\'s Act phase: test rather than commit, probe and adjust, and prioritize speed of cycling over precision of any single action.',
          },
        ]}
      />

      {/* Research paragraph: Enactment and sensemaking */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Weick's sensemaking framework (1995) argues that understanding
          often follows action rather than preceding it. We sometimes do
          not know what we think until we see what we do. In complex,
          ambiguous situations, acting and observing the consequences can
          be the most efficient way to gain clarity. This is not reckless
          impulsivity -- it is strategic probing. The key is that the
          action is small enough to be reversible and the observation
          that follows is disciplined enough to extract useful information.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          For trauma-informed practice, the Act phase requires
          sensitivity. Survivors of chronic stress may have learned that
          action is dangerous -- that acting leads to punishment or harm.
          Boyd's framework reframes action as experimental, not
          committal. Each act is a test, not a final answer. It can be
          small, contained, and reversible. And the feedback it generates
          is always yours to interpret at your own pace. The loop cycles
          only as fast as you are ready to cycle it.
        </p>
      </section>

      {/* ---- BRANCH SCENARIO ---- */}
      <BranchScenario
        id="act-scenario"
        scenario="You have an idea for solving a problem at work but are unsure it will work. You have two hours before a meeting."
        branches={[
          {
            label: 'I spend two hours perfecting the idea in my head before presenting it',
            feedback:
              'Mental refinement has value, but without testing against reality, you are refining inside your existing mental model. The model may be wrong.',
          },
          {
            label: 'I quickly prototype or test a small version in 30 minutes, observe the results, then refine',
            feedback:
              'This is the OODA approach: act small, observe the result, re-orient, decide again. You will arrive at the meeting with real data, not just a theory.',
          },
          {
            label: 'I present the idea as-is without testing',
            feedback:
              'This is acting without observation. The act generates data (others\' reactions), but you could have generated some of that data earlier with a quick test.',
          },
        ]}
      />

      {/* ---- PROMPT ---- */}
      <Prompt
        id="act-prompt"
        question="Think of something you have been deliberating about but not acting on. Design the smallest possible action you could take to generate useful information. What would you do? What would you look for in the result?"
        placeholder="Smallest action: ... What I would look for: ..."
        onSave={savePromptAnswer}
      />

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'In Boyd\'s framework, action serves as:',
            options: [
              {
                id: 'a',
                label: 'The final step that ends the decision process',
                correct: false,
              },
              {
                id: 'b',
                label: 'Both an output of the current cycle and input to the next',
                correct: true,
              },
              {
                id: 'c',
                label: 'Something to avoid until you have complete information',
                correct: false,
              },
            ],
          },
          {
            prompt: 'Weick\'s "enactment" concept means:',
            options: [
              {
                id: 'a',
                label: 'You must fully understand before you act',
                correct: false,
              },
              {
                id: 'b',
                label: 'Understanding often follows action -- you learn by doing',
                correct: true,
              },
              {
                id: 'c',
                label: 'Action is always impulsive',
                correct: false,
              },
            ],
          },
        ]}
      />

      {/* ---- FEYNMAN CHECK ---- */}
      <FeynmanCheck
        id="ooda-l4-feynman"
        prompt="Explain to a friend who overthinks everything why taking a small, reversible action is often better than thinking more."
        rubric={[
          'You described the double cost of hesitation (delayed action + delayed information).',
          'You emphasized that the action should be small and reversible.',
          'You framed action as experimental, not committal.',
          'The explanation was compassionate, not dismissive of the overthinking.',
        ]}
      />

      {/* ---- REFLECTION ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="What is your relationship with action? Do you tend to act quickly or deliberate too long? What fears come up around acting before you are sure? What small experiment could you try?"
          lessonId="observation.ooda-loop.act"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 5 &middot; OODA Loop
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Tempo
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
