import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  Prompt,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 1 -- What Micro-expressions Are
 * Paul Ekman's discovery of involuntary, fleeting facial expressions
 * that reveal concealed emotions. Ethics-gated context.
 */

export default function Lesson1_WhatMicroexpressionsAre({
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
          What Micro-expressions Are
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Involuntary flashes of emotion. Visible for 1/25th of a second.
        </p>
      </header>

      {/* Research text */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In the 1960s, psychologist Paul Ekman began studying facial expressions across
          cultures. He discovered that certain expressions are universal -- produced and
          recognized by people in isolated tribes, modern cities, and everywhere in between.
          But his most striking finding came from studying concealed emotions: when someone
          tries to hide what they feel, the genuine expression often leaks through as a
          micro-expression -- a fleeting contraction of facial muscles lasting 1/25th to
          1/5th of a second.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Ekman and his colleague Wallace Friesen developed the Facial Action Coding System
          (FACS) in 1978, cataloging every muscular movement the human face can produce. Each
          movement is called an Action Unit (AU). A genuine smile, for example, involves both
          the zygomatic major (AU12, pulling the lip corners up) and the orbicularis oculi
          (AU6, crinkling the eyes). A social smile uses only AU12. The eyes tell the truth.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Ethics note: Ekman himself has warned about the misuse of this research. Reading
          micro-expressions does not tell you what someone is thinking -- only that an emotion
          flickered across their face. The emotion could be about you, about something they
          remembered, about physical discomfort, or about nothing you can identify. Leaping
          from "I saw a micro-expression" to "I know what they are hiding" is exactly the
          kind of error this pillar is designed to prevent.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="The anatomy of a micro-expression"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(91,111,140,0.08)', border: '2px solid #5B6F8C' }}>
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <circle cx="20" cy="20" r="16" stroke="#5B6F8C" strokeWidth="1.5" fill="none" />
                        <circle cx="14" cy="16" r="2" fill="#5B6F8C" />
                        <circle cx="26" cy="16" r="2" fill="#5B6F8C" />
                        <path d="M14 26C16 28 24 28 26 26" stroke="#5B6F8C" strokeWidth="1.5" fill="none" />
                      </svg>
                    </div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">Posed expression</p>
                    <p className="text-[9px] font-ui text-ink-tertiary">0.5 - 4 seconds</p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(79,122,90,0.08)', border: '2px solid #4F7A5A' }}
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <circle cx="20" cy="20" r="16" stroke="#4F7A5A" strokeWidth="1.5" fill="none" />
                        <circle cx="14" cy="16" r="2" fill="#4F7A5A" />
                        <circle cx="26" cy="16" r="2" fill="#4F7A5A" />
                        <path d="M14 28C16 24 24 24 26 28" stroke="#4F7A5A" strokeWidth="1.5" fill="none" />
                      </svg>
                    </motion.div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">Micro-expression</p>
                    <p className="text-[9px] font-ui text-ink-tertiary">1/25 - 1/5 second</p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Posed expressions are voluntary and sustained. Micro-expressions are involuntary and fleeting -- a flash of the genuine emotion before the face returns to its social mask.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-5 border border-line-soft max-w-sm w-full">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3 text-center">
                    FACS Action Units
                  </p>
                  <div className="space-y-2">
                    {[
                      { au: 'AU1+2', muscle: 'Frontalis', result: 'Brow raise (surprise)' },
                      { au: 'AU4', muscle: 'Corrugator', result: 'Brow lower (anger/concern)' },
                      { au: 'AU6+12', muscle: 'Orbicularis + Zygomatic', result: 'Genuine smile' },
                      { au: 'AU12 only', muscle: 'Zygomatic only', result: 'Social smile (no eye crinkle)' },
                      { au: 'AU9', muscle: 'Levator labii', result: 'Nose wrinkle (disgust)' },
                    ].map((item) => (
                      <div key={item.au} className="flex items-center gap-2 text-[10px]">
                        <span className="font-ui font-semibold w-16" style={{ color: '#4F7A5A' }}>{item.au}</span>
                        <span className="font-ui text-ink-tertiary w-24">{item.muscle}</span>
                        <span className="font-reading text-ink-secondary flex-1">{item.result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption:
              'Ekman\'s Facial Action Coding System (FACS) catalogs every facial movement by muscle. A genuine smile requires eye crinkle (AU6). A social smile does not. The eyes always tell the truth.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-4 border-l-4 max-w-sm w-full" style={{ borderColor: '#B89466' }}>
                  <p className="text-xs font-ui font-semibold mb-2" style={{ color: '#B89466' }}>
                    ETHICS WARNING
                  </p>
                  <p className="text-[11px] font-reading text-ink-secondary leading-relaxed">
                    A micro-expression tells you an emotion appeared on someone's face. It does NOT
                    tell you: why they felt it, what they were thinking, whether they are lying,
                    or what it means for you. Any interpretation beyond "I saw a flash of [emotion]"
                    is your projection, not their signal.
                  </p>
                </div>
              </div>
            ),
            caption:
              'The biggest ethical danger: over-interpretation. Seeing a micro-expression of contempt does not mean someone is lying. It does not mean they are thinking about you. It means a muscle moved. Everything else is inference.',
          },
        ]}
      />

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'How long does a typical micro-expression last?',
            options: [
              { id: 'long', label: '2-5 seconds', correct: false },
              { id: 'short', label: '1/25th to 1/5th of a second', correct: true },
              { id: 'min', label: '10-30 seconds', correct: false },
            ],
          },
          {
            prompt: 'What distinguishes a genuine smile from a social smile?',
            options: [
              { id: 'size', label: 'Genuine smiles are bigger', correct: false },
              { id: 'eyes', label: 'Genuine smiles include eye crinkle (AU6)', correct: true },
              { id: 'teeth', label: 'Genuine smiles show teeth', correct: false },
            ],
          },
          {
            prompt: 'Seeing a micro-expression tells you:',
            options: [
              { id: 'thought', label: 'What the person is thinking', correct: false },
              { id: 'lying', label: 'Whether they are lying', correct: false },
              { id: 'emotion', label: 'That an emotion flickered across their face', correct: true },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="microexpressions-intro-feynman"
        prompt="Explain to someone what a micro-expression is and, equally important, what it does NOT tell you. Why is the limitation just as important as the capability?"
        rubric={[
          'You defined micro-expressions accurately (involuntary, brief).',
          'You explained what FACS action units are.',
          'You clearly stated the limits: no mind-reading, no lie detection.',
          'You connected the limitation to the ethics of over-interpretation.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 4 &middot; Micro-expressions
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: The Seven Universal Expressions
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
