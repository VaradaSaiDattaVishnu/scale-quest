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
 * Lesson 4 -- Your Ethical Stance
 * ETHICS-GATED: the personal commitment that unlocks the rest of
 * the Reading People pillar. ReflectionJournal for ethical stance.
 */

export default function Lesson4_YourEthicalStance({
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
          Your Ethical Stance
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Not a rule to follow. A position to own.
        </p>
      </header>

      {/* Research text */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          An ethical stance is not a checklist. It is a position you hold about what you will
          and will not do with the perceptions you develop. It is personal -- no one can hand
          it to you. And it must be revisited, because the situations you encounter will test
          it in ways you cannot predict.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Psychologist Lawrence Kohlberg's research on moral development (1958) showed that
          ethical reasoning matures through stages -- from rule-following to principled
          reasoning. At the highest stages, ethical behavior is not about obeying external
          rules but about internalizing principles that guide action even when no one is
          watching and no rule applies.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Carol Gilligan (1982) critiqued Kohlberg's framework for centering justice over
          care. She argued that ethical maturity includes the ability to hold relationships,
          context, and care alongside abstract principles. In reading people, both matter:
          you need principles to prevent exploitation, and you need care to guide how you
          use what you perceive.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Building Your Stance ---- */}
      <VisualStepExplainer
        title="What an ethical stance includes"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="space-y-3 w-full max-w-sm">
                  {[
                    { label: 'Boundaries', desc: 'What you will not do, regardless of situation', icon: 'B' },
                    { label: 'Intentions', desc: 'What you aim to achieve by reading others', icon: 'I' },
                    { label: 'Accountability', desc: 'How you check yourself when tempted', icon: 'A' },
                    { label: 'Repair', desc: 'What you do when you cross your own lines', icon: 'R' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="flex items-center gap-3 bg-surface rounded-calm p-3 border border-line-soft"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.3, duration: 0.5 }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(79,122,90,0.1)', border: '2px solid #4F7A5A' }}
                      >
                        <span className="font-ui text-sm font-bold" style={{ color: '#4F7A5A' }}>
                          {item.icon}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-ui font-semibold text-ink-primary">{item.label}</p>
                        <p className="text-[10px] font-ui text-ink-tertiary">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'A complete ethical stance has four components: boundaries (what you will not do), intentions (what you aim for), accountability (how you self-correct), and repair (what you do when you fail).',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <motion.div
                  className="w-full max-w-xs"
                  animate={{ rotate: [0, 0, 0] }}
                >
                  <svg width="280" height="180" viewBox="0 0 280 180" fill="none" className="mx-auto">
                    {/* Circular process */}
                    <motion.circle
                      cx="140" cy="90" r="60"
                      stroke="#4F7A5A"
                      strokeWidth="2"
                      strokeDasharray="8 4"
                      fill="none"
                      animate={{ strokeDashoffset: [0, -24] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                    <text x="140" y="50" textAnchor="middle" className="text-[10px] font-ui" fill="#4F7A5A">Encounter</text>
                    <text x="210" y="95" textAnchor="middle" className="text-[10px] font-ui" fill="#5B6F8C">Observe</text>
                    <text x="140" y="140" textAnchor="middle" className="text-[10px] font-ui" fill="#B89466">Check stance</text>
                    <text x="70" y="95" textAnchor="middle" className="text-[10px] font-ui" fill="#4F7A5A">Respond</text>
                    <text x="140" y="95" textAnchor="middle" className="text-[11px] font-ui font-semibold" fill="#4F7A5A">Ethics</text>
                    <text x="140" y="107" textAnchor="middle" className="text-[11px] font-ui font-semibold" fill="#4F7A5A">Loop</text>
                  </svg>
                </motion.div>
              </div>
            ),
            caption:
              'Your ethical stance is not a one-time decision. It is a loop: encounter, observe, check your stance, respond, and reflect. Every interaction is a chance to practice ethical reading.',
          },
        ]}
      />

      {/* ---- BRANCH SCENARIO: The Test ---- */}
      <section className="my-10">
        <BranchScenario
          id="ethical-stance-test"
          scenario="A close friend confides in you that they are going through a breakup. Over the next week, you notice micro-signals of distress they are clearly trying to hide: forced smiles, tension in their jaw, avoiding eye contact during certain topics. You can read exactly what triggers them."
          branches={[
            {
              label: 'Use what you see to gently bring up the topic and create space for them to open up',
              outcome: 'This uses your perception in service of their wellbeing. You are not exposing what you see -- you are creating an opening they can choose to take or decline. The key word is "gently" -- you lead with care, not analysis.',
              ethicalScore: 'high',
            },
            {
              label: 'Avoid the triggers entirely so they never have to face the pain',
              outcome: 'This is protective but potentially paternalistic. You are making a decision for them based on your reading. Sometimes people need to face their triggers in a safe space. Consider whether you are protecting them or protecting yourself from their discomfort.',
              ethicalScore: 'medium',
            },
            {
              label: 'Tell them exactly what you are observing in clinical detail',
              outcome: 'This is honest but potentially overwhelming. Telling someone "I noticed your jaw tenses when your ex is mentioned and you break eye contact for 2-3 seconds" may feel more like assessment than friendship. Honesty without sensitivity can be its own form of harm.',
              ethicalScore: 'medium',
            },
          ]}
        />
      </section>

      {/* ---- REFLECTION JOURNAL: Your Stance ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Write your personal ethical stance for reading people. What will you use these skills for? What lines will you not cross? How will you check yourself? What will you do if you slip? This is not a test -- it is a commitment to yourself."
          lessonId="reading-people.ethics-filter.your-ethical-stance"
          onSave={addJournalEntry}
        />
      </section>

      {/* Research bridge */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Your ethical stance will evolve. The version you write today will be different in
          six months, because you will have encountered situations that revealed gaps or
          contradictions you could not see from here. That is not a failure. It is the
          process working. The point is not to write a perfect stance. It is to write a
          real one -- and then to live with it, test it, and revise it honestly.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          With this foundation in place, you are ready to learn the skills of reading people.
          Everything that follows in this pillar builds on the ethical stance you have just
          articulated. Return to it when the techniques get powerful. Return to it when you
          are tempted. It is the ground you stand on.
        </p>
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'According to Kohlberg, the highest stage of ethical reasoning involves:',
            options: [
              { id: 'rules', label: 'Following rules strictly', correct: false },
              { id: 'princ', label: 'Internalized principles that guide action without external rules', correct: true },
              { id: 'avoid', label: 'Avoiding punishment', correct: false },
            ],
          },
          {
            prompt: 'What are the four components of an ethical stance described in this lesson?',
            options: [
              { id: 'biar', label: 'Boundaries, Intentions, Accountability, Repair', correct: true },
              { id: 'know', label: 'Knowledge, Skill, Practice, Mastery', correct: false },
              { id: 'see', label: 'See, Interpret, Judge, Act', correct: false },
            ],
          },
          {
            prompt: 'Why does the lesson say your ethical stance will evolve?',
            options: [
              { id: 'weak', label: 'Because ethics are inherently weak', correct: false },
              { id: 'gaps', label: 'Because new situations reveal gaps you could not see before', correct: true },
              { id: 'change', label: 'Because right and wrong change over time', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="ethical-stance-feynman"
        prompt="Explain why an ethical stance needs all four components (boundaries, intentions, accountability, repair) and what happens if any one is missing."
        rubric={[
          'You explained each component in your own words.',
          'You described a concrete failure mode for at least one missing component.',
          'You connected the components to the practice of reading people specifically.',
          'Your explanation would help someone build their own stance.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 4 &middot; Ethics Filter
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next module: Rogers & Active Listening
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
