import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  NervousSystemCheckin,
  BreathingDot,
} from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 1 -- Three States of the Autonomic Nervous System
 * Porges' Polyvagal Theory as a LANGUAGE, not a diagnosis.
 * NervousSystemCheckin (first lesson of module).
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'

export default function Lesson1_ThreeStates({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Three States
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          A language for what your nervous system is doing right now.
        </p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">
          You can stop anytime. The stop button is always available.
        </p>
      </div>

      <section className="my-8">
        <NervousSystemCheckin onComplete={(result) => savePromptAnswer?.('checkin', result)} />
      </section>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Stephen Porges' Polyvagal Theory offers a map of the autonomic nervous system that
          many people find immediately useful -- not as a clinical tool, but as a language. It
          describes three states your nervous system can occupy, each with its own felt sense,
          its own behaviors, and its own logic. This is not a diagnostic framework. It is a way
          of understanding your own experience from the inside out.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The three states correspond to three branches of the autonomic nervous system, each of
          which evolved at a different point in evolutionary history. Understanding them helps
          explain why safety feels like it does, why fear feels like it does, and why shutdown
          feels like it does -- and why you cannot "think" your way from one state to another.
        </p>
      </section>

      <VisualStepExplainer
        title="The three states"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-2 py-4">
                <div className="w-full max-w-xs space-y-3">
                  <motion.div
                    className="rounded-gentle p-4 text-center"
                    style={{ backgroundColor: 'rgba(79, 122, 90, 0.1)', border: `2px solid ${SAGE}` }}
                    animate={{ borderColor: [SAGE, '#6B9B78', SAGE] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <p className="text-sm font-ui font-medium" style={{ color: SAGE }}>Ventral Vagal</p>
                    <p className="text-[10px] text-ink-tertiary mt-1">Safe and social</p>
                    <p className="text-[10px] text-ink-tertiary">Connected, curious, calm, present</p>
                  </motion.div>
                  <div className="rounded-gentle p-4 text-center" style={{ backgroundColor: 'rgba(184, 148, 102, 0.08)', border: `1px solid ${AMBER}` }}>
                    <p className="text-sm font-ui font-medium" style={{ color: AMBER }}>Sympathetic</p>
                    <p className="text-[10px] text-ink-tertiary mt-1">Mobilized</p>
                    <p className="text-[10px] text-ink-tertiary">Fight or flight. Action energy.</p>
                  </div>
                  <div className="rounded-gentle p-4 text-center" style={{ backgroundColor: 'rgba(156, 163, 175, 0.08)', border: '1px solid #9CA3AF' }}>
                    <p className="text-sm font-ui font-medium text-ink-tertiary">Dorsal Vagal</p>
                    <p className="text-[10px] text-ink-tertiary mt-1">Immobilized</p>
                    <p className="text-[10px] text-ink-tertiary">Shutdown, collapse, conservation</p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'The three states form a ladder. Ventral vagal at the top: safe, social, connected. Sympathetic in the middle: mobilized, activated. Dorsal vagal at the bottom: immobilized, shut down. We move up and down this ladder throughout every day.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="max-w-xs space-y-3">
                  {[
                    { state: 'Ventral Vagal', feels: 'Present. Breathing is easy. You can think, connect, play.', color: SAGE },
                    { state: 'Sympathetic', feels: 'Activated. Heart rate up. Ready to act. Restless or anxious.', color: AMBER },
                    { state: 'Dorsal Vagal', feels: 'Heavy. Foggy. Numb. Far away. Collapsed.', color: '#9CA3AF' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="bg-surface rounded-calm p-3 border border-line-soft"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <p className="text-xs font-ui font-medium" style={{ color: item.color }}>{item.state}</p>
                      <p className="text-[10px] text-ink-tertiary mt-1">{item.feels}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Each state has a distinct felt sense -- a way it shows up in your body. Learning to recognize which state you are in is the foundation of polyvagal awareness.',
          },
        ]}
      />

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          An important clarification: Polyvagal Theory is best understood as a useful language,
          not a settled science. Some of Porges' specific neuroanatomical claims have been debated
          by researchers. What remains clinically valuable -- and widely used by therapists -- is
          the three-state model as a way of understanding and communicating about nervous system
          states. We use it here as a language for experience, not a biological diagnosis.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          None of these states are good or bad. Each serves a purpose. The sympathetic system gives
          you the energy to act, protect, and move. The dorsal vagal system conserves energy when
          resources are low. The ventral vagal system allows for connection, creativity, and
          flexible thinking. Problems arise not from any single state, but from getting stuck in
          one state without the ability to move fluidly between them.
        </p>
      </section>

      <InteractiveQuiz
        questions={[
          {
            prompt: 'The three autonomic states are:',
            options: [
              { id: 'correct', label: 'Ventral vagal, sympathetic, dorsal vagal', correct: true },
              { id: 'wrong1', label: 'Fight, flight, freeze', correct: false },
              { id: 'wrong2', label: 'Calm, anxious, depressed', correct: false },
            ],
          },
          {
            prompt: 'Polyvagal Theory is best used as:',
            options: [
              { id: 'diagnosis', label: 'A clinical diagnosis', correct: false },
              { id: 'language', label: 'A language for understanding nervous system states', correct: true },
              { id: 'cure', label: 'A cure for trauma', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="pvt-three-states-feynman"
        prompt="Describe the three autonomic states to a friend using everyday language -- not jargon. Help them recognize each state from their own experience."
        rubric={[
          'You described all three states.',
          'You used body-based language, not just emotion words.',
          'You emphasized that none are good or bad.',
          'Your examples were drawn from daily life.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Which state do you think you are in right now? What body signals told you? There is no wrong answer."
          lessonId="trauma.polyvagal.three-states"
          onSave={addJournalEntry}
        />
      </section>

      <div className="flex justify-center my-8">
        <BreathingDot size={48} />
      </div>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 1 of 5 &middot; Polyvagal</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next: Neuroception</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}
