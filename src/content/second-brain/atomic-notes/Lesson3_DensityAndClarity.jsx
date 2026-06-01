import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 3 -- Density and Clarity
 * How to write notes that are concise yet complete.
 * Research on the generation effect and elaborative interrogation.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

export default function Lesson3_DensityAndClarity({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Density and Clarity
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Write notes that your future self can understand in 30 seconds.
        </p>
      </header>

      {/* Research: Generation effect */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The generation effect, documented by Slamecka and Graf in 1978, shows that information you generate yourself is remembered better than information you passively receive. When you write a note in your own words -- compressing, rephrasing, choosing what to include -- you are generating. This act of generation is itself a form of deep encoding. The note becomes better remembered because writing it required you to process the idea deeply.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          But generation only works if the result is clear and dense. A note that rambles or includes unnecessary context dilutes the signal. The goal is compression without loss: every sentence in an atomic note should earn its place. If a sentence could be removed without reducing understanding, it probably should be.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="Dense, clear, complete"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-4 max-w-md w-full">
                  <div className="bg-surface rounded-calm p-3 border-2" style={{ borderColor: AMBER }}>
                    <p className="text-xs font-ui font-semibold" style={{ color: AMBER }}>Wordy</p>
                    <p className="font-reading text-[10px] text-ink-tertiary mt-2 leading-relaxed">
                      "I was reading about how when people study things by reading them over and over, they think they know the material but actually they don't remember it very well because the brain confuses recognition with actual recall ability..."
                    </p>
                    <p className="text-[10px] font-ui mt-2" style={{ color: AMBER }}>62 words, buried signal</p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border-2" style={{ borderColor: SAGE }}>
                    <p className="text-xs font-ui font-semibold" style={{ color: SAGE }}>Dense</p>
                    <p className="font-reading text-[10px] text-ink-secondary mt-2 leading-relaxed">
                      "Re-reading creates familiarity, not recall. The brain mistakes recognition (easy, passive) for retrieval ability (hard, active). This is the illusion of fluency."
                    </p>
                    <p className="text-[10px] font-ui mt-2" style={{ color: SAGE }}>28 words, clear signal</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'Same idea. Half the words. Twice the clarity. Dense notes respect your future self\'s time.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-4 border border-line-soft max-w-xs w-full">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3">Anatomy of a dense note</p>
                  <div className="space-y-3">
                    <div className="border-l-2 pl-3" style={{ borderColor: SAGE }}>
                      <p className="text-xs font-ui font-semibold" style={{ color: SAGE }}>Title (concept handle)</p>
                      <p className="text-[10px] font-ui text-ink-tertiary">The claim in one phrase</p>
                    </div>
                    <div className="border-l-2 pl-3" style={{ borderColor: SAGE }}>
                      <p className="text-xs font-ui font-semibold" style={{ color: SAGE }}>Core claim (1-2 sentences)</p>
                      <p className="text-[10px] font-ui text-ink-tertiary">The idea stated clearly</p>
                    </div>
                    <div className="border-l-2 pl-3" style={{ borderColor: SLATE }}>
                      <p className="text-xs font-ui font-semibold" style={{ color: SLATE }}>Evidence or example</p>
                      <p className="text-[10px] font-ui text-ink-tertiary">What makes it credible</p>
                    </div>
                    <div className="border-l-2 pl-3" style={{ borderColor: SLATE }}>
                      <p className="text-xs font-ui font-semibold" style={{ color: SLATE }}>Links to related notes</p>
                      <p className="text-[10px] font-ui text-ink-tertiary">How it connects</p>
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption: 'Four parts, nothing extra: concept handle, core claim, supporting evidence, and links. This structure keeps notes short and useful.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-6">
                  {[
                    { label: 'Write', icon: 'W', desc: 'Generate the idea in your own words', color: SAGE },
                    { label: 'Compress', icon: 'C', desc: 'Remove every unnecessary word', color: SAGE },
                    { label: 'Test', icon: 'T', desc: 'Can you understand it months later?', color: SAGE },
                  ].map((step, i) => (
                    <motion.div
                      key={step.label}
                      className="text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.3 }}
                    >
                      <motion.div
                        className="w-14 h-14 rounded-full border-2 flex items-center justify-center mx-auto"
                        style={{ borderColor: step.color }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className="font-ui text-lg font-bold" style={{ color: step.color }}>{step.icon}</span>
                      </motion.div>
                      <p className="text-xs font-ui text-ink-secondary mt-2 font-semibold">{step.label}</p>
                      <p className="text-[10px] font-ui text-ink-tertiary mt-1 max-w-[80px]">{step.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Write it, compress it, test it. If future-you cannot grasp the note in 30 seconds, it needs tightening.',
          },
        ]}
      />

      {/* Research: Elaborative interrogation */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Elaborative interrogation -- asking "why is this true?" and "how does this connect?" -- is one of the highest-rated study techniques in Dunlosky et al.'s 2013 meta-analysis of learning strategies. When you apply this to note-writing, it forces you to go beyond copying. You must understand the idea well enough to articulate why it matters and how it relates to what you already know.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The paradox of dense notes is that writing them takes more effort than writing wordy notes, but reading them takes dramatically less effort. You invest time once during writing; you save time every time you read. Since you will read your notes many more times than you write them, density is the better investment.
        </p>
      </section>

      {/* ---- PROMPT ---- */}
      <section className="my-10">
        <Prompt
          id="density-clarity-prompt"
          question="Take an idea you learned recently and write it as a dense atomic note: concept handle title, 1-2 sentence core claim, one piece of evidence, and one link to a related idea."
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What is the generation effect?',
            options: [
              { id: 'gen', label: 'Information you produce yourself is remembered better than information you passively receive', correct: true },
              { id: 'age', label: 'Younger people remember more than older people', correct: false },
              { id: 'rep', label: 'Repeating information makes it stick', correct: false },
            ],
          },
          {
            prompt: 'What is the 30-second test for a good atomic note?',
            options: [
              { id: 'write', label: 'Can you write it in 30 seconds?', correct: false },
              { id: 'read', label: 'Can your future self understand it in 30 seconds?', correct: true },
              { id: 'share', label: 'Can you share it in 30 seconds?', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="atomic-notes-L3-feynman"
        prompt="Explain why writing notes in your own words (even if it is harder) produces better notes than copying passages from a book."
        rubric={[
          'You named the generation effect.',
          'You explained that generating = deeper encoding.',
          'You contrasted the effort of writing with the payoff of clarity.',
          'Your explanation would make someone want to try it.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="When you take notes, do you tend to copy or generate? What stops you from writing in your own words? Be honest about the friction."
          lessonId="second-brain.atomic-notes.density-and-clarity"
          onSave={addJournalEntry}
        />
      </section>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 4 &middot; Atomic Notes
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Practice
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
