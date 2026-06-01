import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  Prompt,
  DragMatch,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 3 -- Paraphrasing
 * The skill of restating someone's message in your own words
 * to confirm understanding and build trust.
 */

export default function Lesson3_Paraphrasing({
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
          Paraphrasing
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Prove you heard them -- in your own words.
        </p>
      </header>

      {/* Research text */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Paraphrasing is the bridge between hearing and understanding. Where reflective
          listening mirrors the emotional tone, paraphrasing restates the content -- the
          meaning, the facts, the story -- in the listener's own words. It is a comprehension
          check that simultaneously builds trust: "Let me make sure I have this right..."
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Research by McNaughton et al. (2008) showed that paraphrasing in educational
          settings improved both the speaker's sense of being understood and the listener's
          actual comprehension of the message. It forces the listener to process the content
          deeply enough to reformulate it -- the same depth-of-processing principle that
          strengthens memory (Craik & Lockhart, 1972).
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The ethical dimension: paraphrasing is one of the most transparent forms of active
          listening. You are openly demonstrating your understanding, giving the speaker the
          chance to correct you. There is no hidden advantage. It is perception made visible.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="The anatomy of a good paraphrase"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-5 border border-line-soft max-w-sm w-full">
                  <div className="space-y-4">
                    <div className="p-3 rounded-calm" style={{ backgroundColor: 'rgba(91,111,140,0.06)', border: '1px solid rgba(91,111,140,0.2)' }}>
                      <p className="text-[10px] font-ui text-ink-tertiary mb-1">SPEAKER SAYS:</p>
                      <p className="text-xs font-reading" style={{ color: '#5B6F8C' }}>
                        "My manager keeps giving me more projects but never acknowledges when I finish them. I am doing twice the work of anyone else on the team and no one seems to notice."
                      </p>
                    </div>
                    <motion.div
                      className="flex justify-center"
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                        <path d="M10 0V20M10 20L4 14M10 20L16 14" stroke="#B89466" strokeWidth="2" />
                      </svg>
                    </motion.div>
                    <div className="p-3 rounded-calm" style={{ backgroundColor: 'rgba(79,122,90,0.06)', border: '1px solid rgba(79,122,90,0.2)' }}>
                      <p className="text-[10px] font-ui text-ink-tertiary mb-1">PARAPHRASE:</p>
                      <p className="text-xs font-reading" style={{ color: '#4F7A5A' }}>
                        "So you are carrying a heavier load than your colleagues, and the part that stings is that the effort is invisible -- more work keeps coming but recognition does not."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption:
              'A good paraphrase captures the key content (heavier workload, no recognition) and the emotional core (the effort feels invisible) -- without parroting the exact words.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-3 gap-3 w-full max-w-md">
                  {[
                    { label: 'Parroting', desc: 'Repeats exact words', quality: 'Weak', color: '#B89466' },
                    { label: 'Summarizing', desc: 'Condenses facts only', quality: 'Partial', color: '#5B6F8C' },
                    { label: 'Paraphrasing', desc: 'Restates meaning + feeling', quality: 'Strong', color: '#4F7A5A' },
                  ].map((item) => (
                    <div key={item.label} className="bg-surface rounded-calm p-3 border border-line-soft text-center">
                      <div
                        className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center"
                        style={{ border: `2px solid ${item.color}`, backgroundColor: `${item.color}10` }}
                      >
                        <span className="text-[10px] font-bold" style={{ color: item.color }}>{item.quality}</span>
                      </div>
                      <p className="text-xs font-ui font-semibold text-ink-primary">{item.label}</p>
                      <p className="text-[10px] font-ui text-ink-tertiary mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Parroting repeats words without processing. Summarizing captures facts but misses feeling. Paraphrasing integrates both -- restating meaning and emotional tone in your own language.',
          },
        ]}
      />

      {/* ---- DRAG MATCH ---- */}
      <section className="my-10">
        <DragMatch
          id="paraphrasing-classify"
          instruction="Classify each response as parroting, summarizing, or paraphrasing."
          pairs={[
            { term: '"You said your manager gives you projects without acknowledgment"', match: 'Parroting' },
            { term: '"So the workload is unequal and unrecognized"', match: 'Summarizing' },
            { term: '"The invisibility of your effort is what hurts most"', match: 'Paraphrasing' },
            { term: '"Nobody notices, nobody notices"', match: 'Parroting' },
            { term: '"You carry more than your share and it goes unseen"', match: 'Paraphrasing' },
            { term: '"More projects, no recognition, twice the work"', match: 'Summarizing' },
          ]}
        />
      </section>

      {/* ---- PROMPT ---- */}
      <section className="my-10">
        <Prompt
          id="paraphrasing-practice"
          question='Practice: Your friend says "I keep starting new habits but I always fall off after a week. I do not think I have the discipline for any of this." Write a paraphrase that captures both the content and the feeling.'
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What distinguishes paraphrasing from parroting?',
            options: [
              { id: 'own', label: 'Paraphrasing uses your own words to capture meaning and feeling', correct: true },
              { id: 'longer', label: 'Paraphrasing is longer', correct: false },
              { id: 'formal', label: 'Paraphrasing uses more formal language', correct: false },
            ],
          },
          {
            prompt: 'Why is paraphrasing ethically transparent?',
            options: [
              { id: 'visible', label: 'It makes your understanding visible, inviting correction', correct: true },
              { id: 'polite', label: 'It is more polite than other responses', correct: false },
              { id: 'neutral', label: 'It does not reveal your opinion', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="paraphrasing-feynman"
        prompt="Explain to someone why paraphrasing is more than just 'repeating what they said.' What makes it a skill, and how does it build trust?"
        rubric={[
          'You distinguished paraphrasing from parroting clearly.',
          'You explained the depth-of-processing involved in reformulating.',
          'You connected paraphrasing to trust-building.',
          'You gave a concrete example of a good paraphrase.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 4 &middot; Rogers & Active Listening
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Silence as Skill
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
