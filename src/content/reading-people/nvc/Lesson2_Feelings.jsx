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
 * Lesson 2 -- Feelings (NVC Step 2)
 * Distinguishing genuine feelings from thoughts disguised as feelings.
 * "I feel that you..." is not a feeling -- it is a judgment.
 */

export default function Lesson2_Feelings({
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
          Feelings, Not Faux-Feelings
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          NVC Step 2: Name what is alive in you without blaming.
        </p>
      </header>

      {/* Research text */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Rosenberg drew a sharp line between feelings and what he called "faux-feelings" --
          statements that sound like feelings but are actually interpretations of others'
          behavior. "I feel abandoned" is a faux-feeling: it implies someone else abandoned
          you. "I feel lonely" is a feeling: it describes your internal state without
          assigning blame.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The distinction matters because faux-feelings smuggle in accusations. "I feel
          manipulated" sounds like an emotional disclosure but it is actually an accusation:
          you manipulated me. The listener hears the accusation, becomes defensive, and the
          conversation derails. Genuine feeling words (sad, scared, frustrated, confused,
          hopeful, relieved) describe your inner landscape without pointing fingers.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research on emotional literacy (Brackett & Rivers, 2014) found that the ability to
          name emotions accurately -- what psychologists call emotional granularity -- predicts
          better emotion regulation, healthier relationships, and reduced aggression. Learning
          to distinguish genuine feelings from faux-feelings is not just an NVC technique. It
          is a core emotional intelligence skill.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="Real feelings vs faux-feelings"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-2 w-full max-w-md justify-center">
                  {[
                    { letter: 'O', label: 'Observe', active: false },
                    { letter: 'F', label: 'Feel', active: true },
                    { letter: 'N', label: 'Need', active: false },
                    { letter: 'R', label: 'Request', active: false },
                  ].map((step, i) => (
                    <div key={step.letter} className="flex items-center">
                      <motion.div
                        className="w-14 h-14 rounded-full flex flex-col items-center justify-center"
                        style={{
                          border: `2px solid ${step.active ? '#4F7A5A' : i === 0 ? '#4F7A5A80' : '#5B6F8C40'}`,
                          backgroundColor: step.active ? 'rgba(79,122,90,0.1)' : 'transparent',
                        }}
                        animate={step.active ? { scale: [1, 1.08, 1] } : {}}
                        transition={step.active ? { duration: 2, repeat: Infinity } : {}}
                      >
                        <span className="font-ui text-lg font-bold" style={{ color: step.active ? '#4F7A5A' : i === 0 ? '#4F7A5A80' : '#5B6F8C40' }}>
                          {step.letter}
                        </span>
                      </motion.div>
                      {i < 3 && (
                        <svg width="20" height="10" viewBox="0 0 20 10" className="mx-1">
                          <path d="M0 5H16M16 5L12 1M16 5L12 9" stroke={i <= 1 ? '#4F7A5A' : '#5B6F8C30'} strokeWidth="1.5" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Step 2 in the NVC flow: after stating your observation, name the feeling it produces in you.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <div className="bg-surface rounded-calm p-4 border-l-4" style={{ borderColor: '#B89466' }}>
                    <p className="text-xs font-ui font-semibold mb-2" style={{ color: '#B89466' }}>Faux-feelings</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mb-2">(contain hidden blame)</p>
                    <ul className="space-y-1">
                      {['Abandoned', 'Betrayed', 'Manipulated', 'Ignored', 'Disrespected', 'Attacked'].map((f) => (
                        <li key={f} className="text-[11px] font-reading text-ink-secondary">-- {f}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-surface rounded-calm p-4 border-l-4" style={{ borderColor: '#4F7A5A' }}>
                    <p className="text-xs font-ui font-semibold mb-2" style={{ color: '#4F7A5A' }}>Genuine feelings</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mb-2">(describe your state)</p>
                    <ul className="space-y-1">
                      {['Lonely', 'Hurt', 'Anxious', 'Sad', 'Confused', 'Frustrated'].map((f) => (
                        <li key={f} className="text-[11px] font-reading text-ink-secondary">-- {f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Faux-feelings imply someone did something to you ("I feel betrayed" = "you betrayed me"). Genuine feelings describe your internal state without embedding an accusation.',
          },
        ]}
      />

      {/* ---- DRAG MATCH ---- */}
      <section className="my-10">
        <DragMatch
          id="feeling-vs-faux"
          instruction="Classify each as a genuine feeling or a faux-feeling."
          pairs={[
            { term: 'I feel scared', match: 'Genuine feeling' },
            { term: 'I feel rejected', match: 'Faux-feeling' },
            { term: 'I feel hopeful', match: 'Genuine feeling' },
            { term: 'I feel unappreciated', match: 'Faux-feeling' },
            { term: 'I feel confused', match: 'Genuine feeling' },
            { term: 'I feel judged', match: 'Faux-feeling' },
          ]}
        />
      </section>

      {/* ---- PROMPT ---- */}
      <section className="my-10">
        <Prompt
          id="feelings-conversion"
          question='Convert this faux-feeling into a genuine feeling: "I feel disrespected when you check your phone while I am talking." What is the actual feeling underneath "disrespected"?'
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why does Rosenberg consider "I feel abandoned" a faux-feeling?',
            options: [
              { id: 'blame', label: 'It implies someone else abandoned you -- hiding blame inside a feeling word', correct: true },
              { id: 'strong', label: 'It is too strong an emotion', correct: false },
              { id: 'common', label: 'It is too commonly used', correct: false },
            ],
          },
          {
            prompt: 'What does emotional granularity predict?',
            options: [
              { id: 'regulation', label: 'Better emotion regulation, healthier relationships, reduced aggression', correct: true },
              { id: 'success', label: 'Financial success', correct: false },
              { id: 'intelligence', label: 'Higher IQ scores', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="feelings-feynman"
        prompt='Explain to someone why "I feel manipulated" is not the same as "I feel anxious" -- and why the difference matters in a difficult conversation.'
        rubric={[
          'You explained that faux-feelings contain hidden blame.',
          'You showed how the listener hears the accusation and becomes defensive.',
          'You gave the genuine feeling that might be underneath the faux-feeling.',
          'You connected this to the practical goal of keeping conversation productive.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 5 &middot; Nonviolent Communication
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Needs
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
