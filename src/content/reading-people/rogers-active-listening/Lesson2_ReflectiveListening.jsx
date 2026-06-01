import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  Prompt,
  BranchScenario,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 2 -- Reflective Listening
 * The core technique of Rogerian therapy: reflecting back what
 * someone has said to show understanding and deepen connection.
 */

export default function Lesson2_ReflectiveListening({
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
          Reflective Listening
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Mirror their meaning, not just their words.
        </p>
      </header>

      {/* Research text */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Reflective listening is not parroting. It is the act of receiving what someone has
          communicated -- their words, their tone, their emotional undertone -- and offering
          it back in a way that shows you understood. Rogers (1951) considered it the primary
          vehicle of empathic understanding: the listener becomes a mirror that reflects not
          the surface but the meaning beneath it.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The technique serves two functions simultaneously. First, it validates the speaker:
          someone heard me and understood. Second, it gives the speaker a chance to hear their
          own experience reflected back, which often deepens their own self-understanding. In
          research by Weger et al. (2014), active listening responses led to significantly
          greater feelings of being understood compared to simple acknowledgments or advice.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Ethics reminder: Reflective listening is powerful precisely because it creates deep
          trust quickly. That trust must be handled with care. Using reflective listening to
          build rapport you intend to exploit violates the ethical stance you articulated in
          Module 1.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Conversation Diagrams ---- */}
      <VisualStepExplainer
        title="How reflective listening flows"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <svg width="300" height="180" viewBox="0 0 300 180" fill="none" className="mx-auto">
                  {/* Speaker */}
                  <circle cx="60" cy="50" r="20" stroke="#5B6F8C" strokeWidth="2" fill="rgba(91,111,140,0.06)" />
                  <text x="60" y="54" textAnchor="middle" className="text-[9px] font-ui" fill="#5B6F8C">Speaker</text>
                  {/* Speech bubble */}
                  <motion.rect
                    x="95" y="30" width="140" height="40" rx="8"
                    stroke="#5B6F8C" strokeWidth="1.5" fill="rgba(91,111,140,0.04)"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                  <text x="165" y="48" textAnchor="middle" className="text-[9px] font-reading" fill="#5B6F8C">
                    "I just feel overwhelmed lately"
                  </text>
                  <text x="165" y="60" textAnchor="middle" className="text-[8px] font-reading" fill="#5B6F8C">
                    (voice drops, eyes look away)
                  </text>
                  {/* Listener */}
                  <circle cx="60" cy="140" r="20" stroke="#4F7A5A" strokeWidth="2" fill="rgba(79,122,90,0.06)" />
                  <text x="60" y="144" textAnchor="middle" className="text-[9px] font-ui" fill="#4F7A5A">Listener</text>
                  {/* Reflection bubble */}
                  <motion.rect
                    x="95" y="120" width="190" height="40" rx="8"
                    stroke="#4F7A5A" strokeWidth="1.5" fill="rgba(79,122,90,0.04)"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                  />
                  <motion.text
                    x="190" y="138" textAnchor="middle" className="text-[9px] font-reading" fill="#4F7A5A"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                  >
                    "It sounds like things have been building up"
                  </motion.text>
                  <motion.text
                    x="190" y="150" textAnchor="middle" className="text-[8px] font-reading" fill="#4F7A5A"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                  >
                    (warm tone, slight lean forward)
                  </motion.text>
                  {/* Arrow */}
                  <motion.path
                    d="M60 72V118"
                    stroke="#B89466" strokeWidth="1.5" strokeDasharray="4 3"
                    animate={{ strokeDashoffset: [0, -14] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                </svg>
              </div>
            ),
            caption:
              'The listener does not just hear the words. They read the emotional undertone (voice dropping, eyes looking away) and reflect the meaning: "things have been building up." This shows understanding at a deeper level than the words alone.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <div className="bg-surface rounded-calm p-4 border border-line-soft">
                    <p className="text-xs font-ui font-semibold mb-2" style={{ color: '#B89466' }}>Not reflecting</p>
                    <div className="space-y-2">
                      <p className="text-[11px] font-reading text-ink-secondary">"You should try meditation"</p>
                      <p className="text-[11px] font-reading text-ink-secondary">"I know how you feel"</p>
                      <p className="text-[11px] font-reading text-ink-secondary">"That happened to me too"</p>
                    </div>
                  </div>
                  <div className="bg-surface rounded-calm p-4 border border-line-soft">
                    <p className="text-xs font-ui font-semibold mb-2" style={{ color: '#4F7A5A' }}>Reflecting</p>
                    <div className="space-y-2">
                      <p className="text-[11px] font-reading text-ink-secondary">"It sounds like a lot at once"</p>
                      <p className="text-[11px] font-reading text-ink-secondary">"You are carrying more than usual"</p>
                      <p className="text-[11px] font-reading text-ink-secondary">"The weight of it is getting heavy"</p>
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Advising, relating, and reassuring are common responses but they are not reflective listening. Reflection stays with the speaker\'s experience -- it does not redirect to yours.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-4 border border-line-soft max-w-sm w-full">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3 text-center">Levels of Reflection</p>
                  <div className="space-y-2">
                    {[
                      { level: 'Surface', example: '"You feel overwhelmed"', depth: '30%', color: '#B89466' },
                      { level: 'Content', example: '"Work and home are both demanding right now"', depth: '60%', color: '#5B6F8C' },
                      { level: 'Feeling', example: '"There is a heaviness you have not been able to put down"', depth: '90%', color: '#4F7A5A' },
                    ].map((item) => (
                      <div key={item.level} className="flex items-center gap-3">
                        <div className="w-14 text-right">
                          <span className="text-[10px] font-ui font-semibold" style={{ color: item.color }}>{item.level}</span>
                        </div>
                        <div className="flex-1 h-3 bg-line-soft rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: item.color }}
                            initial={{ width: 0 }}
                            animate={{ width: item.depth }}
                            transition={{ duration: 1.5, delay: 0.3 }}
                          />
                        </div>
                        <p className="text-[9px] font-reading text-ink-tertiary w-40">{item.example}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption:
              'Reflection has depth levels. Surface reflection repeats the emotion label. Content reflection captures the situation. Feeling reflection captures the lived experience beneath both.',
          },
        ]}
      />

      {/* ---- BRANCH SCENARIO ---- */}
      <section className="my-10">
        <BranchScenario
          id="reflective-listening-practice"
          scenario='A friend says: "I have been applying to jobs for months and nothing is working. I am starting to think there is something wrong with me."'
          branches={[
            {
              label: '"Have you tried updating your resume? I know a good service."',
              outcome: 'This is advice, not reflection. It skips past the emotional content ("something wrong with me") and jumps to problem-solving. The speaker may feel their distress was not heard.',
              ethicalScore: 'low',
            },
            {
              label: '"That sounds really discouraging -- months of effort without a result."',
              outcome: 'This is a solid reflection. It captures the emotional weight (discouraging) and the factual reality (months without result). The speaker is likely to feel understood and may open up further.',
              ethicalScore: 'high',
            },
            {
              label: '"You are feeling rejected, and it is making you question yourself."',
              outcome: 'This is a deep reflection -- it names the underlying process (self-questioning from repeated rejection). Be careful: if the speaker did not use the word "rejected," this could feel like an interpretation rather than a reflection. Check their response.',
              ethicalScore: 'high',
            },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Reflective listening primarily serves to:',
            options: [
              { id: 'solve', label: 'Solve the speaker\'s problem', correct: false },
              { id: 'show', label: 'Show the speaker they were understood', correct: true },
              { id: 'diag', label: 'Diagnose what is wrong', correct: false },
            ],
          },
          {
            prompt: 'Which response is the best example of reflective listening?',
            options: [
              { id: 'advice', label: '"You should talk to your manager about that"', correct: false },
              { id: 'reflect', label: '"It sounds like you feel stuck between two bad options"', correct: true },
              { id: 'reassure', label: '"Do not worry, it will work out"', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="reflective-listening-feynman"
        prompt="Explain the difference between reflecting and advising. Why does the distinction matter for someone who is trying to be heard?"
        rubric={[
          'You explained what reflective listening actually does (mirrors meaning).',
          'You explained why advice can feel dismissive even when well-intentioned.',
          'You gave a concrete example of each.',
          'You connected the distinction to the experience of being understood.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 4 &middot; Rogers & Active Listening
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Paraphrasing
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
