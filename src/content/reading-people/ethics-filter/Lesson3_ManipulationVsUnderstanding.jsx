import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  BranchScenario,
  DragMatch,
  Prompt,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 3 -- Manipulation vs Understanding
 * ETHICS-GATED: draws the hard line between reading to understand
 * and reading to exploit. BranchScenario for ethical dilemmas.
 */

export default function Lesson3_ManipulationVsUnderstanding({
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
          Manipulation vs Understanding
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The same perception, two opposite intentions.
        </p>
      </header>

      {/* Research text */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The distinction between manipulation and understanding is not always obvious in the
          moment. Both begin with the same act: perceiving what someone else is feeling,
          thinking, or needing. The divergence happens at the level of intent. Understanding
          asks: "How can I respond to what this person actually needs?" Manipulation asks:
          "How can I use what I see to get what I want?"
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Psychologist Robert Cialdini, in his research on influence (1984), identified six
          principles of persuasion -- reciprocity, commitment, social proof, authority,
          liking, and scarcity. Each can be used ethically (helping someone make a decision
          that genuinely serves them) or exploitatively (engineering compliance for personal
          gain). The principles themselves are neutral. The ethics live in the application.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Philosopher Martin Buber distinguished between "I-Thou" relationships (treating
          another as a full subject) and "I-It" relationships (treating another as an object
          to be used). Manipulation always reduces the other person to an "It" -- a mechanism
          to be leveraged. Understanding preserves their status as "Thou" -- a person to be
          met.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: The Fork ---- */}
      <VisualStepExplainer
        title="The fork in every observation"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <svg width="240" height="160" viewBox="0 0 240 160" fill="none" className="mx-auto">
                  {/* Central observation point */}
                  <circle cx="120" cy="30" r="18" stroke="#5B6F8C" strokeWidth="2" fill="rgba(91,111,140,0.08)" />
                  <text x="120" y="34" textAnchor="middle" className="text-[10px] font-ui" fill="#5B6F8C">
                    Observe
                  </text>
                  {/* Fork lines */}
                  <motion.path
                    d="M108 46L60 110"
                    stroke="#4F7A5A"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                  />
                  <motion.path
                    d="M132 46L180 110"
                    stroke="#B89466"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                  />
                  {/* Understanding */}
                  <circle cx="60" cy="128" r="22" stroke="#4F7A5A" strokeWidth="2" fill="rgba(79,122,90,0.08)" />
                  <text x="60" y="125" textAnchor="middle" className="text-[9px] font-ui" fill="#4F7A5A">Under-</text>
                  <text x="60" y="135" textAnchor="middle" className="text-[9px] font-ui" fill="#4F7A5A">standing</text>
                  {/* Manipulation */}
                  <circle cx="180" cy="128" r="22" stroke="#B89466" strokeWidth="2" fill="rgba(184,148,102,0.08)" />
                  <text x="180" y="125" textAnchor="middle" className="text-[9px] font-ui" fill="#B89466">Manipu-</text>
                  <text x="180" y="135" textAnchor="middle" className="text-[9px] font-ui" fill="#B89466">lation</text>
                </svg>
              </div>
            ),
            caption:
              'Every act of reading someone reaches a fork. The same observation can lead to understanding (serving their needs) or manipulation (exploiting their needs). The fork is always there.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <div className="bg-surface rounded-calm p-4 border-l-4" style={{ borderColor: '#4F7A5A' }}>
                    <p className="text-xs font-ui font-semibold mb-2" style={{ color: '#4F7A5A' }}>Understanding</p>
                    <ul className="space-y-1">
                      {['Respects autonomy', 'Preserves dignity', 'Invites dialogue', 'Serves their interest'].map((t) => (
                        <li key={t} className="text-[11px] font-reading text-ink-secondary flex items-start gap-1">
                          <span style={{ color: '#4F7A5A' }}>--</span> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-surface rounded-calm p-4 border-l-4" style={{ borderColor: '#B89466' }}>
                    <p className="text-xs font-ui font-semibold mb-2" style={{ color: '#B89466' }}>Manipulation</p>
                    <ul className="space-y-1">
                      {['Bypasses autonomy', 'Reduces to object', 'Engineers compliance', 'Serves your interest'].map((t) => (
                        <li key={t} className="text-[11px] font-reading text-ink-secondary flex items-start gap-1">
                          <span style={{ color: '#B89466' }}>--</span> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ),
            caption:
              'The markers of each path. Understanding preserves the other person as a subject with their own agency. Manipulation reduces them to a mechanism to be leveraged for your outcome.',
          },
        ]}
      />

      {/* ---- DRAG MATCH: Classify Behaviors ---- */}
      <section className="my-10">
        <DragMatch
          id="manipulation-vs-understanding-match"
          instruction="Drag each behavior to its category."
          pairs={[
            { term: 'Noticing someone is sad and asking how they are', match: 'Understanding' },
            { term: 'Noticing someone is insecure and flattering them to gain favor', match: 'Manipulation' },
            { term: 'Reading anxiety in a friend and giving them space', match: 'Understanding' },
            { term: 'Reading a boss\'s ego needs to engineer a promotion', match: 'Manipulation' },
            { term: 'Sensing a partner\'s frustration and initiating honest conversation', match: 'Understanding' },
            { term: 'Sensing a partner\'s guilt and using it to avoid accountability', match: 'Manipulation' },
          ]}
        />
      </section>

      {/* ---- BRANCH SCENARIO: Grey Zone ---- */}
      <section className="my-10">
        <BranchScenario
          id="grey-zone-dilemma"
          scenario="You are in a job interview. You notice the interviewer lights up when discussing innovation but becomes tense when process is mentioned. You could steer the conversation toward innovation topics to create rapport and improve your chances."
          branches={[
            {
              label: 'Steer toward innovation topics to build rapport',
              outcome: 'This is a grey zone. You are reading the room and adapting -- normal social intelligence. But ask: are you presenting yourself authentically, or performing a version of yourself designed to exploit what you saw? The line is thinner than it appears.',
              ethicalScore: 'medium',
            },
            {
              label: 'Respond authentically, even if it means discussing process',
              outcome: 'This prioritizes honesty over advantage. If you genuinely care about innovation, discussing it is authentic. If you are a process-oriented person pretending otherwise, you are building a relationship on a false signal.',
              ethicalScore: 'high',
            },
            {
              label: 'Use the observation to judge whether this is the right workplace for you',
              outcome: 'This uses reading skills for mutual benefit -- understanding fit. You are not manipulating the interviewer; you are gathering data about whether the environment matches who you actually are.',
              ethicalScore: 'high',
            },
          ]}
        />
      </section>

      {/* Research bridge */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          Notice that the hardest cases are not the extremes. Outright manipulation is easy to
          identify. Genuine understanding is easy to recognize. The difficult ethical work
          happens in the grey zones -- where adaptation and authenticity blur, where helping
          and influencing overlap, where you are not sure whether you are serving the other
          person or serving yourself through them.
        </p>
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'According to Buber, manipulation treats the other person as:',
            options: [
              { id: 'thou', label: '"Thou" -- a full subject', correct: false },
              { id: 'it', label: '"It" -- an object to be used', correct: true },
              { id: 'self', label: '"Self" -- a reflection of you', correct: false },
            ],
          },
          {
            prompt: 'The hardest ethical dilemmas in reading people occur:',
            options: [
              { id: 'extreme', label: 'In extreme cases of clear manipulation', correct: false },
              { id: 'grey', label: 'In grey zones where adaptation and authenticity blur', correct: true },
              { id: 'never', label: 'They do not occur if you are a good person', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="manipulation-vs-understanding-feynman"
        prompt="Explain the difference between manipulation and understanding to someone who says 'All social interaction is manipulation anyway.' Where does their argument break down?"
        rubric={[
          'You addressed the cynical claim directly rather than dismissing it.',
          'You identified the key differentiator: intent and respect for autonomy.',
          'You acknowledged the grey zones honestly.',
          'You gave a concrete example where the distinction is clear.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 4 &middot; Ethics Filter
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Your Ethical Stance
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
