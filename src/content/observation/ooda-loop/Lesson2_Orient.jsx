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
 * Lesson 2 -- Orient (OODA)
 * Boyd's critical phase: making sense of observations through
 * mental models, culture, experience, and analysis/synthesis.
 */

export default function Lesson2_Orient({
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
          Orient
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The most critical phase: making sense of what you observed.
        </p>
      </header>

      {/* Research paragraph: Orientation as the schwerpunkt */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Boyd considered Orientation the most important phase of the
          OODA loop -- he called it the "schwerpunkt" (center of gravity)
          of the entire cycle. Orientation is where raw observations are
          processed through your mental models, cultural traditions,
          previous experiences, genetic heritage, and the capacity for
          analysis and synthesis. It is, in effect, your entire worldview
          applied to the data at hand. And here is Boyd's key insight:
          orientation shapes what you observe next. Your mental models
          determine what you notice and what you miss.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This creates a feedback loop that can be either virtuous or
          vicious. If your mental models are accurate and flexible, they
          help you observe more effectively -- you know where to look and
          what matters. If they are rigid or outdated, they filter out
          precisely the information that would force an update. Boyd
          called this "implicit guidance and control" -- the unconscious
          influence of orientation on every other phase of the loop.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Orientation Components ---- */}
      <VisualStepExplainer
        title="What shapes your orientation"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center py-4">
                <svg width="240" height="200" viewBox="0 0 240 200" fill="none">
                  {/* Central Orient node */}
                  <motion.rect
                    x="75"
                    y="70"
                    width="90"
                    height="60"
                    rx="8"
                    fill="rgba(79,122,90,0.12)"
                    stroke="#4F7A5A"
                    strokeWidth="2"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <text x="120" y="104" textAnchor="middle" fill="#4F7A5A" fontSize="12" fontWeight="bold" fontFamily="ui-sans-serif">
                    ORIENT
                  </text>
                  {/* Input factors */}
                  {[
                    { x: 30, y: 20, label: 'Cultural\ntradition' },
                    { x: 120, y: 15, label: 'Previous\nexperience' },
                    { x: 210, y: 20, label: 'Mental\nmodels' },
                    { x: 30, y: 175, label: 'Genetic\nheritage' },
                    { x: 210, y: 175, label: 'Analysis &\nsynthesis' },
                  ].map((factor, i) => (
                    <g key={i}>
                      <motion.line
                        x1={factor.x}
                        y1={factor.y > 100 ? factor.y - 15 : factor.y + 15}
                        x2={120}
                        y2={100}
                        stroke="#5B6F8C"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                        opacity="0.4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: i * 0.15, duration: 0.4 }}
                      />
                      {factor.label.split('\n').map((line, j) => (
                        <text
                          key={j}
                          x={factor.x}
                          y={factor.y + j * 12}
                          textAnchor="middle"
                          fill="#5B6F8C"
                          fontSize="8"
                          fontFamily="ui-sans-serif"
                        >
                          {line}
                        </text>
                      ))}
                    </g>
                  ))}
                </svg>
              </div>
            ),
            caption:
              'Five inputs shape orientation: cultural tradition, previous experience, mental models, genetic heritage, and the capacity for analysis and synthesis. All operate simultaneously.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-4">
                  <div className="text-center">
                    <motion.div
                      className="w-24 h-24 rounded-calm border-2 flex items-center justify-center p-2"
                      style={{ borderColor: '#B89466' }}
                    >
                      <div className="text-center">
                        <p className="text-[9px] font-ui" style={{ color: '#B89466' }}>Rigid model</p>
                        <motion.div
                          className="w-8 h-8 rounded-sm border mx-auto mt-1"
                          style={{ borderColor: '#B89466' }}
                        />
                      </div>
                    </motion.div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">
                      Filters out new data
                    </p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="w-24 h-24 rounded-calm border-2 flex items-center justify-center p-2"
                      style={{ borderColor: '#4F7A5A' }}
                    >
                      <div className="text-center">
                        <p className="text-[9px] font-ui" style={{ color: '#4F7A5A' }}>Flexible model</p>
                        <motion.div
                          className="w-8 h-8 rounded-full border mx-auto mt-1"
                          style={{ borderColor: '#4F7A5A' }}
                          animate={{ borderRadius: ['50%', '30%', '50%'] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      </div>
                    </motion.div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">
                      Updates with new data
                    </p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Rigid mental models resist update. Flexible models reshape in response to new data. Boyd argued that the ability to "destroy and create" mental models is the key strategic advantage.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-3 w-full max-w-sm justify-center">
                  <div className="bg-surface rounded-calm p-2 border border-line-soft text-center w-20">
                    <p className="text-[10px] font-ui" style={{ color: '#4F7A5A' }}>Observe</p>
                  </div>
                  <motion.svg width="24" height="12" viewBox="0 0 24 12" fill="none">
                    <path d="M0 6H20M20 6L15 1M20 6L15 11" stroke="#5B6F8C" strokeWidth="1.5" />
                  </motion.svg>
                  <div className="rounded-calm p-2 border-2 text-center w-20" style={{ borderColor: '#4F7A5A' }}>
                    <p className="text-[10px] font-ui font-medium" style={{ color: '#4F7A5A' }}>Orient</p>
                  </div>
                  <motion.svg width="24" height="12" viewBox="0 0 24 12" fill="none">
                    <path d="M20 6H0M0 6L5 1M0 6L5 11" stroke="#B89466" strokeWidth="1.5" />
                  </motion.svg>
                  <div className="bg-surface rounded-calm p-2 border border-line-soft text-center w-20">
                    <p className="text-[10px] font-ui" style={{ color: '#B89466' }}>Observe</p>
                  </div>
                </div>
                <p className="text-[10px] font-ui text-ink-tertiary text-center max-w-xs">
                  Orientation feeds back to observation -- what you believe
                  shapes what you look for next
                </p>
              </div>
            ),
            caption:
              'The critical feedback loop: orientation shapes subsequent observation. If your model says "look left," you will miss what is happening on the right.',
          },
        ]}
      />

      {/* Research paragraph: Destroying and creating */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Boyd's most radical insight was that winning -- in combat, in
          business, in any adaptive challenge -- requires the ability to
          "destroy and create" mental models rapidly. He called this
          process "destructive deduction" followed by "creative
          induction." When your current model no longer matches the
          environment, you must dismantle it and build a new one from the
          available data. People who cling to outdated models -- even
          models that worked brilliantly yesterday -- become predictable
          and brittle.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Klein's Recognition-Primed Decision model (1998) adds
          empirical detail: experts under pressure do not weigh options
          analytically. They recognize the situation as similar to a
          known pattern, mentally simulate a course of action, and
          execute. But this works only when the pattern recognition is
          fed by accurate, updated observation. When the situation is
          genuinely novel -- when no existing pattern matches -- the
          expert must slow down and orient afresh. Knowing when to trust
          your pattern and when to update it is the core skill.
        </p>
      </section>

      {/* ---- BRANCH SCENARIO ---- */}
      <BranchScenario
        id="orient-scenario"
        scenario="You are driving a familiar route. Road construction has changed the layout. Your mental model says 'turn right here,' but the road now goes straight."
        branches={[
          {
            label: 'I follow my mental model and turn right',
            feedback:
              'This is the fixation error: trusting the old model over current observation. The right turn may no longer exist or may be unsafe.',
          },
          {
            label: 'I notice the mismatch, slow down, and observe the current layout before acting',
            feedback:
              'This is Boyd\'s approach: when the model and the environment disagree, update the model. The pause to re-observe is the key move.',
          },
          {
            label: 'I feel confused and stop',
            feedback:
              'The confusion is a signal that your orientation needs updating. Stopping is better than acting on an outdated model, but the next step is re-observation: what is actually here now?',
          },
        ]}
      />

      {/* ---- PROMPT ---- */}
      <Prompt
        id="orient-prompt"
        question="Think of a belief or mental model you hold about some area of your life (work, relationships, a skill). Write: (1) The model. (2) Evidence that supports it. (3) Evidence that might challenge it. (4) How would you know if it needs updating?"
        placeholder="My model is... Evidence for: ... Evidence against: ..."
        onSave={savePromptAnswer}
      />

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Boyd considered which phase the most important in the OODA loop?',
            options: [
              { id: 'a', label: 'Observe', correct: false },
              { id: 'b', label: 'Orient', correct: true },
              { id: 'c', label: 'Act', correct: false },
            ],
          },
          {
            prompt: 'What does "destroy and create" mean in Boyd\'s framework?',
            options: [
              {
                id: 'a',
                label: 'Physically dismantling and rebuilding equipment',
                correct: false,
              },
              {
                id: 'b',
                label: 'Dismantling outdated mental models and building new ones from current data',
                correct: true,
              },
              {
                id: 'c',
                label: 'Destroying enemy resources and creating new alliances',
                correct: false,
              },
            ],
          },
        ]}
      />

      {/* ---- FEYNMAN CHECK ---- */}
      <FeynmanCheck
        id="ooda-l2-feynman"
        prompt="Explain to someone why being aware of your own mental models -- the filters you use to interpret the world -- makes you a better observer and decision-maker."
        rubric={[
          'You explained that mental models shape what you notice and miss.',
          'You gave a concrete example of a model filtering out important data.',
          'You connected model-awareness to the ability to update and adapt.',
          'The explanation was practical, not academic.',
        ]}
      />

      {/* ---- REFLECTION ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="What mental models do you rely on most? Are any of them outdated? How would you know? What would it take to update one?"
          lessonId="observation.ooda-loop.orient"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 5 &middot; OODA Loop
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Decide
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
