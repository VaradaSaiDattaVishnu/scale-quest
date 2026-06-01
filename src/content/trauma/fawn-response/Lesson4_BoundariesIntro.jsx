import { motion } from 'framer-motion'
import { FeynmanCheck, ReflectionJournal, BreathingDot, BranchScenario } from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 4 -- Introduction to Boundaries
 * What boundaries are (and are not) for someone who learned that having them was dangerous.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'

export default function Lesson4_BoundariesIntro({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Boundaries: An Introduction
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Boundaries are not walls. They are bridges with gates.
        </p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">
          You can stop anytime. The stop button is always available.
        </p>
      </div>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          For someone with a strong fawn response, boundaries can feel like the most dangerous
          thing in the world. A boundary is a place where you end and someone else begins --
          and if you learned that having your own edges was what provoked danger, then the very
          concept of a boundary can trigger intense anxiety, guilt, or fear of abandonment.
          This is not because boundaries are actually dangerous now. It is because your nervous
          system is running an old program that equates boundaries with loss of safety.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Boundaries are not about controlling other people. They are about defining your own
          experience. A boundary says: "This is what I can and cannot do. This is what works for
          me and what does not." It does not say: "You are bad for asking." It says: "I matter
          enough to tell you what is true for me." For someone who grew up without permission to
          have a "me," this is revolutionary -- and terrifying.
        </p>
      </section>

      <VisualStepExplainer
        title="What boundaries are (and are not)"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                  <div className="bg-surface rounded-calm p-3 border border-line-soft">
                    <p className="text-xs font-ui font-medium text-ink-primary mb-2">Boundaries are:</p>
                    <div className="space-y-1">
                      {['Self-knowledge', 'Communication', 'Self-respect', 'A practice'].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: SAGE }} />
                          <p className="text-[10px] text-ink-tertiary">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border border-line-soft">
                    <p className="text-xs font-ui font-medium text-ink-primary mb-2">Boundaries are not:</p>
                    <div className="space-y-1">
                      {['Punishment', 'Walls', 'Selfishness', 'Easy to set'].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: AMBER }} />
                          <p className="text-[10px] text-ink-tertiary">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Boundaries are statements of truth about yourself, not attacks on others. They are difficult for fawners precisely because they require knowing -- and valuing -- what you need.',
          },
        ]}
      />

      {/* ---- BRANCH SCENARIO ---- */}
      <section className="my-10">
        <BranchScenario
          id="fawn-boundary-practice"
          scenario="A coworker regularly asks you to cover their tasks. You are already overwhelmed. They ask again."
          branches={[
            {
              id: 'cover',
              label: '"Sure, no problem!" (while feeling resentful inside)',
              feedback: 'The gap between what you say and what you feel is where the fawn response lives. The "sure" comes from survival. The resentment comes from the self that is not being honored. Both are real.',
            },
            {
              id: 'boundary',
              label: '"I am not able to this time. I have too much on my plate."',
              feedback: 'This is a boundary. Simple, honest, and complete. Notice: it does not explain, apologize, or offer an alternative. It is enough to say what is true. How does your body feel imagining saying this?',
            },
            {
              id: 'negotiate',
              label: '"I can help with one thing, but not all of it."',
              feedback: 'This is also a boundary -- a partial one. It honors both the relationship and your own limits. It is a middle ground that can feel more accessible at first. Every boundary counts.',
            },
          ]}
          onAnswer={savePromptAnswer}
        />
      </section>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          Setting boundaries is a practice, not a performance. You will not do it perfectly. Some
          days you will say yes when you mean no, and that is okay. The goal is not to become a
          boundary expert overnight. The goal is to slowly, over time, build the capacity to notice
          when you are abandoning yourself -- and to make a different choice when you can. Every
          small boundary is a message to your nervous system: "I am allowed to exist. My needs
          are real. I can take up space and still be safe."
        </p>
      </section>

      <InteractiveQuiz
        questions={[
          {
            prompt: 'For someone with a fawn response, boundaries feel dangerous because:',
            options: [
              { id: 'mean', label: 'Boundaries are inherently mean', correct: false },
              { id: 'old', label: 'Having edges once provoked danger in their environment', correct: true },
              { id: 'new', label: 'They have never encountered the concept before', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="fawn-boundaries-feynman"
        prompt="Explain to someone who feels guilty every time they say no why that guilt is a signal, not a verdict."
        rubric={[
          'You identified the guilt as a nervous system response, not evidence of selfishness.',
          'You connected it to the fawn response and its origins.',
          'You normalized the difficulty of boundary-setting.',
          'Your tone was gentle and encouraging.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="What is one small boundary you wish you could set? You do not have to set it yet. Just name it. Naming is enough for now."
          lessonId="trauma.fawn-response.boundaries-intro"
          onSave={addJournalEntry}
        />
      </section>

      <div className="flex justify-center my-8">
        <BreathingDot size={48} />
      </div>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 4 of 5 &middot; Fawn Response</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next: Practice and integration</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}
