import { motion } from 'framer-motion'
import { FeynmanCheck, ReflectionJournal, BranchScenario, Prompt } from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 4 -- Mentalization Practice
 * Perspective-taking exercises. Building the habit of curiosity
 * over certainty in reading others.
 */

export default function Lesson4_Practice({
  onComplete, learnTerm, addJournalEntry, savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">Mentalization Practice</h1>
        <p className="font-ui text-ink-secondary text-lg">Curiosity is stronger than certainty.</p>
      </header>

      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The core practice of mentalization is simple but demanding: hold in mind that other
          people have inner worlds as rich and contradictory as your own, and that your best
          guess about what is happening in those worlds is always provisional. The mark of
          good mentalization is not accuracy. It is curiosity -- the willingness to be wrong
          and to keep updating.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Ethics reminder: mentalization is perhaps the most powerful reading skill in this
          pillar. When you can accurately model someone's inner world, you have deep
          influence. Use it for connection, not control. The ethical stance you articulated
          in Module 1 applies with full force here.
        </p>
      </section>

      <VisualStepExplainer
        title="The mentalization practice loop"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-3 w-full max-w-sm">
                  {[
                    { step: '1', label: 'Notice', desc: 'Something in their behavior catches your attention' },
                    { step: '2', label: 'Hypothesize', desc: '"They might be feeling... because..."' },
                    { step: '3', label: 'Hold lightly', desc: 'This is my best guess, not a fact' },
                    { step: '4', label: 'Check', desc: 'Ask, or observe more before concluding' },
                    { step: '5', label: 'Update', desc: 'Revise your model based on new information' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.step}
                      className="flex items-center gap-3 bg-surface rounded-calm p-3 border border-line-soft"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.3 }}
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(79,122,90,0.1)', border: '1.5px solid #4F7A5A' }}>
                        <span className="text-xs font-bold" style={{ color: '#4F7A5A' }}>{item.step}</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-ui font-semibold" style={{ color: '#4F7A5A' }}>{item.label}</p>
                        <p className="text-[10px] font-reading text-ink-tertiary">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Five-step mentalization loop. The key insight: steps 3-5 distinguish genuine mentalization from psychic equivalence. If you skip "hold lightly" and "update," you are asserting, not mentalizing.',
          },
        ]}
      />

      <BranchScenario
        id="mentalization-practice-scenario"
        scenario="A friend cancels dinner plans for the third time in a month. Your first thought: 'They do not value our friendship anymore.'"
        branches={[
          {
            label: 'Mentalize: "They might be overwhelmed with work, dealing with something I do not know about, or struggling with social energy. My hurt is real, but their reason might not be about me."',
            outcome: 'This is genuine mentalization. You acknowledge your feeling (hurt) while generating multiple hypotheses about their inner world. You hold your reading lightly and stay curious.',
            ethicalScore: 'high',
          },
          {
            label: 'Withdraw: stop inviting them, match their distance',
            outcome: 'This is teleological mode -- responding to behavior without considering the mental state behind it. You are treating "they cancelled" as the full story, without imagining what might be happening in their life.',
            ethicalScore: 'low',
          },
          {
            label: 'Tell them: "I can tell you do not want to be friends anymore"',
            outcome: 'This is psychic equivalence -- treating your feeling as fact. You are asserting knowledge of their inner state based on your emotional reaction, not on their actual perspective.',
            ethicalScore: 'low',
          },
        ]}
      />

      <Prompt
        id="mentalization-exercise"
        question="Think of someone whose behavior recently confused or frustrated you. Now generate three different hypotheses about what might be going on in their inner world. Make each hypothesis genuinely plausible, not strawman alternatives."
        onSave={savePromptAnswer}
      />

      <InteractiveQuiz
        questions={[
          {
            prompt: 'The mark of good mentalization is:',
            options: [
              { id: 'accuracy', label: 'Perfect accuracy about what others think', correct: false },
              { id: 'curiosity', label: 'Curiosity and willingness to be wrong', correct: true },
              { id: 'speed', label: 'Speed of judgment', correct: false },
            ],
          },
          {
            prompt: 'Which step distinguishes genuine mentalization from psychic equivalence?',
            options: [
              { id: 'notice', label: 'Noticing behavior', correct: false },
              { id: 'hold', label: 'Holding your hypothesis lightly', correct: true },
              { id: 'hypo', label: 'Generating a hypothesis', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="mentalization-practice-feynman"
        prompt="Walk someone through the five-step mentalization loop using a real scenario from your life. Show where the loop could break down and how to prevent that."
        rubric={[
          'You walked through all five steps with a concrete example.',
          'You identified where the loop is most likely to break down.',
          'You showed how "hold lightly" prevents psychic equivalence.',
          'You emphasized curiosity as the core stance.',
        ]}
      />

      <ReflectionJournal
        prompt="Which mentalization failure mode (psychic equivalence, pretend mode, or teleological) do you fall into most often? When does it happen? What triggers it? What would it look like to catch it earlier?"
        lessonId="reading-people.mentalization.practice"
        onSave={addJournalEntry}
      />

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 4 of 4 &middot; Mentalization</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next module: Conversation Simulator</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}
