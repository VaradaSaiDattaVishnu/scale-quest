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
 * Lesson 2 -- Power and Consent
 * ETHICS-GATED: explores the dynamics of observational power
 * and the principle of consent in reading others.
 */

export default function Lesson2_PowerAndConsent({
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
          Power and Consent
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Observation without consent is surveillance.
        </p>
      </header>

      {/* Research text */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          When you observe someone closely -- their posture, their micro-expressions, the
          tremor in their voice -- you are gathering information they may not have chosen to
          share. This creates an asymmetry: you know something about them that they do not
          know you know. In every relationship, from therapy to friendship, this kind of
          asymmetry carries ethical weight.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The concept of informed consent, developed in medical ethics and formalized in the
          Nuremberg Code (1947) and later the Belmont Report (1979), holds that people have
          the right to know when they are being studied, observed, or assessed. While everyday
          social perception is not a clinical trial, the principle applies: the more
          deliberately and systematically you observe someone, the more your observation
          resembles assessment -- and the more consent matters.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Sociologist Erving Goffman (1959) described social life as a performance: people
          present a "front stage" self while maintaining a "backstage" self that is private.
          Reading people skillfully means you can sometimes see through the front stage.
          Whether you have the right to do so -- and what you do with what you see -- is an
          ethical question, not a technical one.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Power Asymmetry ---- */}
      <VisualStepExplainer
        title="The observation power gap"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-12">
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#5B6F8C', backgroundColor: 'rgba(91,111,140,0.08)' }}
                    >
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <circle cx="16" cy="12" r="6" stroke="#5B6F8C" strokeWidth="2" />
                        <path d="M6 28C6 22 10 18 16 18C22 18 26 22 26 28" stroke="#5B6F8C" strokeWidth="2" fill="none" />
                      </svg>
                    </motion.div>
                    <p className="text-xs font-ui text-ink-tertiary mt-2">Observer</p>
                    <p className="text-[10px] font-ui" style={{ color: '#4F7A5A' }}>Sees signals</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <motion.svg
                      width="60" height="20" viewBox="0 0 60 20"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <path d="M0 10H55M55 10L48 4M55 10L48 16" stroke="#B89466" strokeWidth="2" />
                    </motion.svg>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-1">Information flows one way</p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#5B6F8C', backgroundColor: 'rgba(91,111,140,0.08)' }}
                    >
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <circle cx="16" cy="12" r="6" stroke="#5B6F8C" strokeWidth="2" />
                        <path d="M6 28C6 22 10 18 16 18C22 18 26 22 26 28" stroke="#5B6F8C" strokeWidth="2" fill="none" />
                      </svg>
                    </motion.div>
                    <p className="text-xs font-ui text-ink-tertiary mt-2">Observed</p>
                    <p className="text-[10px] font-ui" style={{ color: '#B89466' }}>Unaware</p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Skilled observation creates a one-way information flow. The observer gains insight the observed person did not choose to share. This is inherently asymmetric.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                  {[
                    { label: 'Therapy', desc: 'Explicit consent', color: '#4F7A5A' },
                    { label: 'Friendship', desc: 'Implicit trust', color: '#5B6F8C' },
                    { label: 'Strangers', desc: 'No consent', color: '#B89466' },
                  ].map((ctx) => (
                    <div key={ctx.label} className="bg-surface rounded-calm p-3 border border-line-soft text-center">
                      <div
                        className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center"
                        style={{ backgroundColor: `${ctx.color}15`, border: `2px solid ${ctx.color}` }}
                      >
                        <span className="text-[10px] font-bold" style={{ color: ctx.color }}>
                          {ctx.label[0]}
                        </span>
                      </div>
                      <p className="text-xs font-ui font-semibold text-ink-primary">{ctx.label}</p>
                      <p className="text-[10px] font-ui text-ink-tertiary mt-1">{ctx.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Different contexts carry different levels of consent. In therapy, observation is explicitly agreed upon. With strangers, there is no agreement at all. Your ethical responsibility scales accordingly.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-5 border border-line-soft max-w-sm w-full">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3 text-center">
                    The Consent Spectrum
                  </p>
                  <div className="space-y-2">
                    {[
                      { level: 'Invited', desc: '"Please help me understand myself"', pct: '100%', color: '#4F7A5A' },
                      { level: 'Mutual', desc: 'Both people observing each other openly', pct: '75%', color: '#4F7A5A' },
                      { level: 'Ambient', desc: 'Normal social awareness', pct: '50%', color: '#5B6F8C' },
                      { level: 'Covert', desc: 'Deliberate, hidden analysis', pct: '25%', color: '#B89466' },
                    ].map((item) => (
                      <div key={item.level} className="flex items-center gap-3">
                        <div className="w-16 text-right">
                          <span className="text-[10px] font-ui font-semibold" style={{ color: item.color }}>
                            {item.level}
                          </span>
                        </div>
                        <div className="flex-1 h-3 bg-line-soft rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: item.color, width: item.pct }}
                            initial={{ width: 0 }}
                            animate={{ width: item.pct }}
                            transition={{ duration: 1.5, delay: 0.3 }}
                          />
                        </div>
                        <p className="text-[10px] font-ui text-ink-tertiary w-36">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption:
              'Consent exists on a spectrum. The further you move toward covert, deliberate analysis, the higher your ethical obligation becomes. Most everyday interaction sits in the ambient zone.',
          },
        ]}
      />

      {/* ---- BRANCH SCENARIO ---- */}
      <section className="my-10">
        <BranchScenario
          id="power-consent-dilemma"
          scenario="You notice a colleague's hands trembling during a team meeting. Their voice catches when the project deadline is mentioned. You can see they are struggling -- possibly with anxiety, possibly with something personal. No one else seems to notice."
          branches={[
            {
              label: 'Use this observation to privately ask if they are okay',
              outcome: 'This respects their autonomy. You noticed something and offered support without exposing them. The key: you let them decide what to share.',
              ethicalScore: 'high',
            },
            {
              label: 'Mention it to your manager to flag a potential performance issue',
              outcome: 'This weaponizes your observation. You used private signals -- ones they did not choose to share -- to create consequences they did not consent to.',
              ethicalScore: 'low',
            },
            {
              label: 'File it away mentally and do nothing',
              outcome: 'This is neutral, but consider: if you saw someone in distress and could help without overstepping, doing nothing is also a choice. Ethics is not only about avoiding harm.',
              ethicalScore: 'medium',
            },
          ]}
        />
      </section>

      {/* More research text */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          The philosopher Emmanuel Levinas argued that the face of another person carries an
          ethical demand: to see someone is to be called into responsibility for them. This is
          not a sentimental idea. It is a structural one. The act of perception creates
          obligation. When you develop the ability to perceive more -- to read what others
          cannot -- your obligation does not decrease. It intensifies.
        </p>
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What creates the power asymmetry in reading people?',
            options: [
              { id: 'edu', label: 'Having more education than the other person', correct: false },
              { id: 'info', label: 'Gaining information the other person did not choose to share', correct: true },
              { id: 'age', label: 'Being older than the other person', correct: false },
            ],
          },
          {
            prompt: 'According to Goffman, what does skilled reading allow you to perceive?',
            options: [
              { id: 'front', label: 'Only the front stage performance', correct: false },
              { id: 'back', label: 'Behind the front stage into the backstage self', correct: true },
              { id: 'neither', label: 'Neither -- Goffman studied economics', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="power-consent-feynman"
        prompt="Explain the concept of the 'consent spectrum' in reading people. Why does covert analysis carry more ethical weight than ambient social awareness?"
        rubric={[
          'You distinguished between different levels of observational consent.',
          'You explained why deliberate, hidden analysis increases ethical obligation.',
          'You used a concrete example to illustrate the difference.',
          'You did not conflate all observation as equally problematic.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 4 &middot; Ethics Filter
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Manipulation vs Understanding
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
