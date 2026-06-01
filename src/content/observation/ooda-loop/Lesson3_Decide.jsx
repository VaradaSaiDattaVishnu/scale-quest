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
 * Lesson 3 -- Decide (OODA)
 * The decision phase: selecting a course of action based on
 * orientation. Recognition-primed decisions vs analytical choices.
 */

export default function Lesson3_Decide({
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
          Decide
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Choosing a course of action under uncertainty.
        </p>
      </header>

      {/* Research paragraph: Decision under uncertainty */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          After observing and orienting, the third phase of the OODA loop
          is to decide. Boyd understood that in most real-world situations,
          you never have complete information. The decision is always made
          under uncertainty, with partial data and time pressure. The goal
          is not to make the perfect decision -- it is to make a decision
          that is good enough, fast enough, to maintain initiative. A good
          decision executed now is often better than a perfect decision
          executed too late.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Gary Klein's Recognition-Primed Decision (RPD) model describes
          how experienced practitioners actually decide in the field.
          Rather than comparing multiple options analytically, experts
          recognize the current situation as similar to one they have
          encountered before, mentally simulate the most typical response,
          and check whether it would work. If the simulation reveals a
          flaw, they modify the action or move to the next most typical
          response. This is not intuition in the mystical sense -- it is
          pattern recognition built on extensive experience, tested through
          mental simulation.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Decision Models ---- */}
      <VisualStepExplainer
        title="How experts decide under pressure"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-6">
                  <div className="text-center max-w-[120px]">
                    <motion.div
                      className="w-24 h-20 rounded-calm border-2 flex items-center justify-center"
                      style={{ borderColor: '#B89466' }}
                    >
                      <div className="text-center">
                        <p className="text-[8px] font-ui" style={{ color: '#B89466' }}>
                          A vs B vs C vs D
                        </p>
                        <p className="text-[8px] font-ui text-ink-tertiary mt-1">
                          compare all
                        </p>
                      </div>
                    </motion.div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">
                      Analytical (slow)
                    </p>
                  </div>
                  <div className="text-center max-w-[120px]">
                    <motion.div
                      className="w-24 h-20 rounded-calm border-2 flex items-center justify-center"
                      style={{ borderColor: '#4F7A5A' }}
                    >
                      <div className="text-center">
                        <p className="text-[8px] font-ui" style={{ color: '#4F7A5A' }}>
                          Recognize &rarr; Simulate
                        </p>
                        <p className="text-[8px] font-ui text-ink-tertiary mt-1">
                          first viable option
                        </p>
                      </div>
                    </motion.div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">
                      Recognition-primed (fast)
                    </p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Two decision modes: analytical (compare all options) and recognition-primed (find the first viable option through pattern recognition). Experts under pressure use RPD.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-sm w-full">
                  {[
                    { step: 'Recognize pattern', desc: '"This looks like a situation where X usually works"', color: '#4F7A5A' },
                    { step: 'Mental simulation', desc: '"If I do X, what happens? Does it work?"', color: '#5B6F8C' },
                    { step: 'Check for flaws', desc: '"Are there reasons X would fail here?"', color: '#B89466' },
                    { step: 'Execute or modify', desc: '"Execute X, or adjust and re-simulate"', color: '#4F7A5A' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.step}
                      className="flex items-center gap-3 bg-surface rounded-calm p-2 border border-line-soft"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <span
                        className="text-xs font-ui font-bold w-5 text-center flex-shrink-0"
                        style={{ color: item.color }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-[10px] font-ui text-ink-primary font-medium">
                          {item.step}
                        </p>
                        <p className="text-[9px] font-ui text-ink-tertiary">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'The RPD cycle: recognize, simulate, check, execute. If the simulation reveals a flaw, modify and re-simulate. This is faster than analytical comparison and draws on experience.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <svg width="200" height="120" viewBox="0 0 200 120" fill="none">
                  {/* Decision tree */}
                  <motion.circle cx="100" cy="20" r="12" stroke="#4F7A5A" strokeWidth="2" fill="rgba(79,122,90,0.1)" />
                  <text x="100" y="24" textAnchor="middle" fill="#4F7A5A" fontSize="8" fontFamily="ui-sans-serif">Start</text>
                  {/* Left branch */}
                  <motion.line x1="88" y1="32" x2="55" y2="60" stroke="#5B6F8C" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.3 }} />
                  <circle cx="55" cy="70" r="10" stroke="#B89466" strokeWidth="1.5" fill="rgba(184,148,102,0.08)" />
                  <text x="55" y="73" textAnchor="middle" fill="#B89466" fontSize="7" fontFamily="ui-sans-serif">Flaw?</text>
                  {/* Modify path */}
                  <motion.line x1="55" y1="80" x2="55" y2="100" stroke="#B89466" strokeWidth="1" strokeDasharray="3 3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.3 }} />
                  <text x="55" y="112" textAnchor="middle" fill="#B89466" fontSize="7" fontFamily="ui-sans-serif">Modify</text>
                  {/* Right branch */}
                  <motion.line x1="112" y1="32" x2="145" y2="60" stroke="#4F7A5A" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.3 }} />
                  <circle cx="145" cy="70" r="10" stroke="#4F7A5A" strokeWidth="1.5" fill="rgba(79,122,90,0.1)" />
                  <text x="145" y="73" textAnchor="middle" fill="#4F7A5A" fontSize="7" fontFamily="ui-sans-serif">Works</text>
                  <motion.line x1="145" y1="80" x2="145" y2="100" stroke="#4F7A5A" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.3 }} />
                  <text x="145" y="112" textAnchor="middle" fill="#4F7A5A" fontSize="7" fontWeight="bold" fontFamily="ui-sans-serif">Execute</text>
                </svg>
              </div>
            ),
            caption:
              'The decision tree in action: recognize pattern, simulate action, check for flaws. If flaws found, modify and re-simulate. If clear, execute.',
          },
        ]}
      />

      {/* Research paragraph: Satisficing vs optimizing */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Herbert Simon introduced the concept of "satisficing" in 1956 --
          choosing an option that meets your criteria of adequacy rather
          than searching exhaustively for the best possible option. Boyd's
          decision phase is inherently a satisficing process: find the
          first option that works, not the best option among all
          possibilities. Under time pressure, the cost of searching for
          the optimal decision almost always exceeds the cost of executing
          a merely good one.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This has implications beyond combat. In everyday life, decision
          paralysis often comes from trying to optimize -- weighing every
          option, imagining every outcome, fearing the wrong choice. Boyd's
          framework offers a permission structure: observe well, orient
          honestly, choose the first viable option, and act. If the action
          produces new information (it always does), you cycle through the
          loop again. The decision is not a destination. It is a waypoint
          in a continuous cycle.
        </p>
      </section>

      {/* ---- BRANCH SCENARIO ---- */}
      <BranchScenario
        id="decide-scenario"
        scenario="You are managing a project. Two team members propose different approaches. Both have merits. You need to decide by end of day."
        branches={[
          {
            label: 'I gather more data to find the objectively best option',
            feedback:
              'More data can help, but under time pressure, the search for the optimal answer can become decision paralysis. At some point, "good enough and now" beats "perfect and too late."',
          },
          {
            label: 'I mentally simulate each option, check for obvious flaws, and choose the first that works',
            feedback:
              'This is the RPD approach. You are not guessing -- you are using your experience to simulate outcomes. If neither simulation reveals a fatal flaw, either option is viable.',
          },
          {
            label: 'I defer to whoever feels more confident',
            feedback:
              'Confidence is not evidence. The more confident option is not necessarily the more viable one. Mental simulation based on your own experience is a stronger basis for decision.',
          },
        ]}
      />

      {/* ---- PROMPT ---- */}
      <Prompt
        id="decide-prompt"
        question="Think of a decision you are currently facing. Apply the RPD process: (1) What pattern does this situation match from your experience? (2) What is the typical response? (3) Mentally simulate: what happens if you do that? (4) Any flaws? Write your findings."
        placeholder="Pattern: ... Typical response: ... Simulation: ..."
        onSave={savePromptAnswer}
      />

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'In Klein\'s RPD model, experts decide by:',
            options: [
              {
                id: 'a',
                label: 'Comparing all available options analytically',
                correct: false,
              },
              {
                id: 'b',
                label: 'Recognizing patterns and mentally simulating the first viable response',
                correct: true,
              },
              {
                id: 'c',
                label: 'Following gut feeling without any evaluation',
                correct: false,
              },
            ],
          },
          {
            prompt: 'Satisficing means:',
            options: [
              {
                id: 'a',
                label: 'Settling for a bad option out of laziness',
                correct: false,
              },
              {
                id: 'b',
                label: 'Choosing the first option that meets your adequacy criteria',
                correct: true,
              },
              {
                id: 'c',
                label: 'Always choosing the mathematically optimal option',
                correct: false,
              },
            ],
          },
        ]}
      />

      {/* ---- FEYNMAN CHECK ---- */}
      <FeynmanCheck
        id="ooda-l3-feynman"
        prompt="Explain to someone who struggles with decision paralysis why choosing a good-enough option quickly is often better than searching for the perfect one."
        rubric={[
          'You described the cost of searching for the optimal choice under time pressure.',
          'You explained mental simulation as a quick-but-rigorous check.',
          'You framed the decision as a waypoint, not a final destination.',
          'The explanation was empathetic, not dismissive of the struggle.',
        ]}
      />

      {/* ---- REFLECTION ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Are you more of an optimizer or a satisficer? How does that tendency serve you? Where does it create problems?"
          lessonId="observation.ooda-loop.decide"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 5 &middot; OODA Loop
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Act
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
