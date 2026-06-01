import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 2 -- Teaching Someone
 * Feynman method applied. FeynmanCheck.
 */

export default function Lesson2_TeachingSomeone({
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
          Teaching Someone
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The deepest encoding is explaining to another person.
        </p>
      </header>

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Richard Feynman -- the Nobel Prize-winning physicist -- was famous for his ability to explain complex ideas simply. His method was straightforward: if you cannot explain something in plain language, you do not truly understand it. The gaps in your explanation reveal the gaps in your understanding. This principle has been validated by research on the "protege effect" (Chase, Chin, Oppezzo, & Schwartz, 2009): students who prepare to teach material learn it more deeply than students who prepare to take a test on the same material. The act of organizing knowledge for someone else forces you to identify the logical structure, find the right analogies, and confront the parts you are fuzzy on.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Teaching is the ultimate retrieval practice. When you explain a concept to someone, you are not reading from notes -- you are reconstructing the idea from memory in real time, adapting to the listener's reactions, finding new ways to phrase what you know. Each explanation is a fresh retrieval that strengthens the memory trace. And the social dimension adds emotional engagement, which the amygdala tags for enhanced consolidation. This is why many memory competitors report that their deepest learning happens not during training but when they teach their techniques to others.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: The Feynman Method ---- */}
      <VisualStepExplainer
        title="The Feynman Method for Memory"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-full max-w-sm">
                  {[
                    { step: 'Choose a concept', desc: 'Pick one technique or idea from this course', color: '#5B6F8C' },
                    { step: 'Explain it simply', desc: 'Write or speak as if teaching a smart 12-year-old', color: '#4F7A5A' },
                    { step: 'Find the gaps', desc: 'Where did you get stuck or vague? Those are your gaps.', color: '#B89466' },
                    { step: 'Go back and learn', desc: 'Return to the material to fill those specific gaps', color: '#5B6F8C' },
                    { step: 'Simplify further', desc: 'Rewrite until the explanation is clear, concrete, and complete', color: '#4F7A5A' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3 mb-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                        <span className="text-[9px] font-ui font-bold" style={{ color: item.color }}>{i + 1}</span>
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
            caption: 'Five steps. The magic is in step 3: finding the gaps. When your explanation gets vague, that is exactly where your understanding needs work.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-6 items-center">
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#B89466' }}
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <span className="text-[10px] font-ui text-center px-1" style={{ color: '#B89466' }}>Studying for a test</span>
                    </motion.div>
                    <p className="text-[9px] font-ui text-ink-tertiary mt-2">Surface processing</p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#4F7A5A' }}
                    >
                      <span className="text-[10px] font-ui text-center px-1" style={{ color: '#4F7A5A' }}>Preparing to teach</span>
                    </motion.div>
                    <p className="text-[9px] font-ui text-ink-tertiary mt-2">Deep processing</p>
                  </div>
                </div>
                <p className="text-[10px] font-ui text-ink-secondary max-w-xs text-center">
                  The protege effect: preparing to teach activates deeper processing than preparing to be tested on the same material.
                </p>
              </div>
            ),
            caption: 'When you expect to teach, you organize knowledge differently: you look for the logical structure, the best analogies, and the simplest explanations. This is deep encoding by design.',
          },
        ]}
      />

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The practical challenge of this lesson is to teach one memory technique from this course to a real person. Not to summarize it or send them a link -- to actually explain it in conversation, adapting to their questions and reactions. Choose someone who would benefit: a friend studying for exams, a colleague who complains about forgetting names, a family member who thinks they have a "bad memory." The technique you choose to teach does not matter. What matters is the act of teaching it, which will deepen your own understanding more than any additional review could.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          If teaching a live person is not possible right now, the Feynman alternative is to write out the explanation as if you were teaching it. Write in plain language, use concrete examples, and resist the urge to copy textbook phrases. The test of understanding is whether you can explain a concept in your own words, with your own examples, in a way that would make sense to someone who has never encountered it before.
        </p>
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What does the Feynman method reveal about your understanding?',
            options: [
              { id: 'gaps', label: 'The specific gaps where your understanding is vague', correct: true },
              { id: 'total', label: 'Your total knowledge score', correct: false },
              { id: 'speed', label: 'How fast you can recall', correct: false },
            ],
          },
          {
            prompt: 'What is the "protege effect"?',
            options: [
              { id: 'teach', label: 'Preparing to teach material leads to deeper learning than preparing for a test', correct: true },
              { id: 'mentor', label: 'Having a mentor improves memory', correct: false },
              { id: 'young', label: 'Younger students learn faster', correct: false },
            ],
          },
          {
            prompt: 'Why is teaching considered the ultimate retrieval practice?',
            options: [
              { id: 'reconstruct', label: 'You reconstruct knowledge from memory in real time, adapting to the listener', correct: true },
              { id: 'repeat', label: 'You repeat the information more times', correct: false },
              { id: 'notes', label: 'You read from detailed notes', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="integration-l2-feynman"
        prompt="Pick one memory technique from this entire course and teach it to a smart 12-year-old. Use simple language, a concrete example, and make it so clear they could try it today."
        rubric={[
          'You chose a specific technique and named it clearly.',
          'Your explanation used plain language with no jargon.',
          'You included a concrete, step-by-step example.',
          'A 12-year-old could attempt the technique after reading your explanation.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 4 &middot; Integration
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Your Twenty Rules
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
