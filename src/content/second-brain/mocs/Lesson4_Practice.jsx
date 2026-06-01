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
 * Lesson 4 -- Practice: Building MOCs
 * Hands-on exercises to create, structure, and use MOCs.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

export default function Lesson4_Practice({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Practice: Building MOCs
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Create a map from your own knowledge.
        </p>
      </header>

      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The best way to learn MOC-building is to do it with a topic you already know. You do not need a full note system to practice -- you can work from ideas in your head. The act of listing, grouping, and ordering ideas is the same skill whether the notes exist physically or mentally. This lesson walks you through creating a MOC from scratch.
        </p>
      </section>

      {/* ---- VISUAL ---- */}
      <VisualStepExplainer
        title="Build your first MOC"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-4">
                  {[
                    { step: '1', label: 'List', desc: 'Brainstorm all ideas' },
                    { step: '2', label: 'Group', desc: 'Cluster by theme' },
                    { step: '3', label: 'Order', desc: 'Sequence within groups' },
                    { step: '4', label: 'Annotate', desc: 'Add context' },
                    { step: '5', label: 'Gaps', desc: 'Mark what is missing' },
                  ].map((s, i) => (
                    <motion.div
                      key={s.step}
                      className="text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center" style={{ borderColor: SAGE }}>
                        <span className="font-ui text-xs font-bold" style={{ color: SAGE }}>{s.step}</span>
                      </div>
                      <p className="text-[10px] font-ui text-ink-secondary mt-1 font-semibold">{s.label}</p>
                      <p className="text-[10px] font-ui text-ink-tertiary max-w-[50px]">{s.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Five steps to build a MOC: list everything you know, group by theme, order to tell a story, annotate for context, mark gaps for future work.',
          },
        ]}
      />

      {/* ---- PRACTICE PROMPT 1 ---- */}
      <section className="my-10">
        <Prompt
          id="moc-practice-1"
          question="Choose a topic you know well (your profession, a hobby, a subject you studied). Brainstorm at least 10 ideas you could write atomic notes about. Just list them -- don't organize yet."
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- PRACTICE PROMPT 2 ---- */}
      <section className="my-10">
        <Prompt
          id="moc-practice-2"
          question="Now group your brainstormed ideas into 2-4 clusters. Give each cluster a heading. Within each cluster, order the ideas to build a narrative. This is your MOC."
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- PRACTICE PROMPT 3 ---- */}
      <section className="my-10">
        <Prompt
          id="moc-practice-3"
          question="Look at your MOC. What gaps do you notice? What important ideas are missing? Write 2-3 open questions that your future notes could address."
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What is the first step in building a MOC?',
            options: [
              { id: 'structure', label: 'Create the perfect category structure', correct: false },
              { id: 'list', label: 'Brainstorm all ideas related to the domain', correct: true },
              { id: 'title', label: 'Choose a title', correct: false },
            ],
          },
          {
            prompt: 'Why should a MOC include open questions?',
            options: [
              { id: 'complete', label: 'To make it look complete', correct: false },
              { id: 'gaps', label: 'To mark gaps in your knowledge that guide future note-taking', correct: true },
              { id: 'style', label: 'It is a stylistic convention', correct: false },
            ],
          },
          {
            prompt: 'A good MOC can be used as:',
            options: [
              { id: 'folder', label: 'A replacement for folders', correct: false },
              { id: 'outline', label: 'A navigation tool, a thinking tool, and a writing outline', correct: true },
              { id: 'backup', label: 'A backup of your notes', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="mocs-L4-feynman"
        prompt="Walk someone through building their first MOC from scratch, using a topic they already know well. What would each step look like?"
        rubric={[
          'You described the brainstorming step (list everything).',
          'You explained grouping and ordering.',
          'You mentioned annotations and gap-marking.',
          'Your listener could start building a MOC immediately.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="How did it feel to map a domain of your knowledge? What did the exercise reveal about how you organize your thinking? Were the gaps surprising?"
          lessonId="second-brain.mocs.practice"
          onSave={addJournalEntry}
        />
      </section>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 4 &middot; MOCs
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next module: The Memex Method
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
