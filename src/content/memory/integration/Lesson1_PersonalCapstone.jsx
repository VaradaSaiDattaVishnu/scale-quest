import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
} from '../../../components/visuals'

/**
 * Lesson 1 -- Personal Capstone
 * Apply all techniques to a personal subject. ReflectionJournal.
 */

export default function Lesson1_PersonalCapstone({
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
          Personal Capstone
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Apply everything you have learned to something that matters to you.
        </p>
      </header>

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The most powerful test of any learning is transfer: can you apply what you have learned to a new context that was never explicitly taught? Perkins and Salomon (1992) distinguished between "near transfer" (applying a skill to a very similar task) and "far transfer" (applying it to a fundamentally different domain). Memory techniques are unusual in that they support both. The palace technique you learned for competition word lists works for memorizing a speech, a recipe, a chapter outline, or a set of client names. The card-craft principles apply to medical school flashcards, language learning, or exam preparation. The question is not whether these techniques work outside competition -- it is what you personally want to remember.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          This capstone lesson is not a quiz or a knowledge check. It is a project. You will choose a subject that matters to you -- something you genuinely want to know better -- and apply the full toolkit: deep understanding first, then memory palace encoding, then flashcard creation, then spaced repetition scheduling. The subject is yours. It might be the history of your family, the pharmacology you need for work, the bird species in your region, the vocabulary of a language you are learning, or the key concepts from a field you want to enter. What matters is that it is real, personal, and intrinsically motivating.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: The Full Toolkit ---- */}
      <VisualStepExplainer
        title="Your Complete Toolkit"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-full max-w-sm">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { tool: 'Deep Understanding', desc: 'Read, research, map the territory', icon: 'M4 12h8M8 4v16', color: '#5B6F8C' },
                      { tool: 'Memory Palace', desc: 'Spatial + visual encoding', icon: 'M4 14h8M6 10h4M8 6h0', color: '#4F7A5A' },
                      { tool: 'Card-Craft', desc: 'Atomic flashcards, cloze + Q&A', icon: 'M4 4h8v12H4z', color: '#5B6F8C' },
                      { tool: 'Spaced Repetition', desc: 'Algorithm-scheduled reviews', icon: 'M4 10C6 6 10 6 12 10C10 14 6 14 4 10', color: '#4F7A5A' },
                      { tool: 'Feature Anchoring', desc: 'For names and faces', icon: 'M8 3A5 5 0 1 0 8 13', color: '#B89466' },
                      { tool: 'Retrieval Practice', desc: 'Test yourself, do not re-read', icon: 'M4 8l4 4 4-8', color: '#B89466' },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="bg-surface rounded-calm p-3 border border-line-soft"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mb-1">
                          <path d={item.icon} stroke={item.color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
                        </svg>
                        <p className="text-[10px] font-ui text-ink-primary font-medium">{item.tool}</p>
                        <p className="text-[8px] font-ui text-ink-tertiary">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption: 'Six tools, one integrated system. Choose the combination that fits your subject. Not every project needs every tool, but the best projects use at least three.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <p className="text-[10px] font-ui font-bold" style={{ color: '#4F7A5A' }}>CAPSTONE PROJECT PLAN</p>
                <div className="w-full max-w-sm">
                  {[
                    { step: 'Choose your subject', desc: 'Something you genuinely want to know better', num: 1 },
                    { step: 'Map the territory', desc: 'Understand the structure before memorizing details', num: 2 },
                    { step: 'Build a palace', desc: 'Design a palace route for the core structure', num: 3 },
                    { step: 'Create atomic cards', desc: 'One fact per card, cloze + Q&A, linked to palace loci', num: 4 },
                    { step: 'Begin spaced repetition', desc: '10 new cards/day, daily reviews', num: 5 },
                    { step: 'Review and refine', desc: 'Fix leeches, update cards, deepen understanding', num: 6 },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3 mb-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(79,122,90,0.15)' }}>
                        <span className="text-[9px] font-ui font-bold" style={{ color: '#4F7A5A' }}>{item.num}</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-ui text-ink-primary font-medium">{item.step}</p>
                        <p className="text-[9px] font-ui text-ink-tertiary">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Six steps from choice to mastery. The project is not finished in a day -- it is the beginning of an ongoing practice with material that matters to you.',
          },
        ]}
      />

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Research on self-determination theory (Deci & Ryan, 2000) shows that intrinsic motivation -- doing something because it is personally meaningful, not because someone assigned it -- is the strongest predictor of sustained learning. External incentives (grades, points, streaks) can jumpstart behavior, but they do not sustain it. What sustains a memory practice over months and years is genuine curiosity about the material. That is why this capstone asks you to choose your own subject. The techniques are tools. Your curiosity is the engine.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          A practical suggestion: start small. Do not choose "all of organic chemistry" or "the complete history of civilization." Choose a narrow, specific domain that you can make meaningful progress on in two to four weeks. "The 50 most common drug interactions in my specialty." "The 100 most useful verbs in Portuguese." "The 30 bird species I am most likely to see in my region." A narrow domain lets you reach a satisfying level of mastery quickly, which builds confidence and momentum for larger projects.
        </p>
      </section>

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="integration-l1-feynman"
        prompt="Describe your capstone project plan. What subject did you choose, and which tools from this course will you use? Be specific about how you will apply at least three techniques."
        rubric={[
          'You chose a specific, personally meaningful subject.',
          'You described at least three techniques you will use.',
          'You gave concrete details about how each technique applies to your subject.',
          'Your plan is realistic and scoped to achieve meaningful progress.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="What subject have you chosen for your capstone project? Why does it matter to you? What would it mean to truly know this material -- not just recognize it, but be able to recall and use it on demand?"
          lessonId="memory.integration.personal-capstone"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 4 &middot; Integration
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Teaching Someone
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
