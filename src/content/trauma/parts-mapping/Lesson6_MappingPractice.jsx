import { motion } from 'framer-motion'
import { FeynmanCheck, ReflectionJournal, BreathingDot, Prompt } from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 6 -- Mapping Practice
 * Guided exercise for mapping your own parts.
 */

const SAGE = '#4F7A5A'

export default function Lesson6_MappingPractice({
  onComplete, learnTerm, addJournalEntry, savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">Mapping Practice</h1>
        <p className="font-ui text-ink-secondary text-lg">Beginning to see your inner landscape.</p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">
          You can stop anytime. This is exploratory, not diagnostic. Go at your own pace.
        </p>
      </div>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Mapping your parts is an act of gentle self-discovery. It is not about labeling yourself
          or creating a fixed system. It is about beginning to notice the different voices, urges,
          and feelings within you -- and recognizing that each one has a role and a story. This
          map will change over time. It is a living document, not a diagnosis.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          There is no right way to do this. Some people draw circles. Some write lists. Some use
          colors or images. The format matters less than the quality of attention you bring. Approach
          each part with curiosity: "Who are you? What is your job? What are you afraid will happen
          if you stop?" These questions, asked from Self energy, open doors.
        </p>
      </section>

      <VisualStepExplainer
        title="A gentle mapping process"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-xs">
                  {[
                    { step: '1. Settle', desc: 'Take a breath. Arrive in this moment.' },
                    { step: '2. Notice', desc: 'What parts are active right now? Who is "up"?' },
                    { step: '3. Name', desc: 'Give each part a simple name or description.' },
                    { step: '4. Ask', desc: '"What is your job? What are you protecting?"' },
                    { step: '5. Thank', desc: '"Thank you for trying to help."' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="bg-surface rounded-calm px-3 py-2 border border-line-soft"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.12 }}
                    >
                      <p className="text-xs font-ui font-medium text-ink-primary">{item.step}</p>
                      <p className="text-[10px] text-ink-tertiary mt-0.5">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Five steps. That is all. You are not analyzing or fixing. You are meeting your parts with curiosity.',
          },
        ]}
      />

      <section className="my-10">
        <Prompt
          id="parts-map-prompt"
          question="Name one part you can notice right now. What is it doing? What might it be protecting? Write freely -- this is for you."
          onAnswer={savePromptAnswer}
        />
      </section>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          Remember: this app provides education about the parts framework, not therapy. If mapping
          your parts brings up strong feelings or overwhelming memories, that is a sign your system
          is ready for deeper work -- and that deeper work is best supported by a trained IFS
          therapist. This is not a limitation of your courage or readiness. It is a recognition
          that some work requires the safety of a healing relationship.
        </p>
      </section>

      <InteractiveQuiz
        questions={[
          {
            prompt: 'The best approach to mapping your parts is:',
            options: [
              { id: 'analyze', label: 'Clinical analysis and categorization', correct: false },
              { id: 'curiosity', label: 'Gentle curiosity from Self energy', correct: true },
              { id: 'force', label: 'Forcing reluctant parts to reveal themselves', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="parts-mapping-feynman"
        prompt="Walk someone through the beginning of a parts mapping practice. What would you have them do first, and how would you help them feel safe?"
        rubric={[
          'You started with settling and arriving in the body.',
          'You emphasized curiosity over analysis.',
          'You included thanking the part.',
          'You mentioned that strong feelings may mean professional support would help.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Begin your map. Name as many parts as you can notice right now. For each one, write its name and one sentence about what it does. This is a first draft -- it will grow."
          lessonId="trauma.parts-mapping.mapping-practice"
          onSave={addJournalEntry}
        />
      </section>

      <div className="flex justify-center my-8"><BreathingDot size={48} /></div>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 6 of 6 &middot; Parts Mapping</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Module complete. Next module: Self-Compassion</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Complete Module</button>
        </div>
      </footer>
    </article>
  )
}
