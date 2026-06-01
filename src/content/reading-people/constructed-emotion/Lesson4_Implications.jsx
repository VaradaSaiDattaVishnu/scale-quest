import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  BranchScenario,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 4 -- Implications for Reading People
 * What the constructed emotion framework means for anyone
 * trying to understand what another person is feeling.
 */

export default function Lesson4_Implications({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Implications for Reading People
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          If emotions are constructed, what does that mean for perceiving them in others?
        </p>
      </header>

      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          If Barrett is right -- and the evidence is substantial -- then "reading" someone's
          emotion is not detecting a signal. It is constructing a perception, using your own
          concepts, your own past experiences, and the context you perceive (which may differ
          from the context they perceive). This does not mean reading people is impossible.
          It means it is always an act of interpretation, not detection.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The practical implications are profound. First, you should hold your readings
          lightly -- they are hypotheses, not facts. Second, asking is always more accurate
          than assuming. Third, increasing your own emotional granularity improves your
          ability to perceive nuance in others. Fourth, cultural context matters enormously:
          the same face in a different culture may be expressing a different emotion or no
          emotion your vocabulary can name.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This module does not invalidate Ekman's work. It contextualizes it. Facial
          expressions are real signals -- but what they signal is more variable, more
          context-dependent, and more culturally shaped than the classical view suggests.
          Holding both perspectives makes you a more accurate -- and more humble -- reader.
        </p>
      </section>

      <VisualStepExplainer
        title="Practical guidelines"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-3 w-full max-w-sm">
                  {[
                    { num: '1', rule: 'Hold readings as hypotheses, not facts', icon: '?' },
                    { num: '2', rule: 'Asking is more accurate than assuming', icon: 'Q' },
                    { num: '3', rule: 'Increase your own granularity to perceive more', icon: 'G' },
                    { num: '4', rule: 'Cultural context changes what expressions mean', icon: 'C' },
                    { num: '5', rule: 'You see through your concepts -- expand them', icon: 'E' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.num}
                      className="flex items-center gap-3 bg-surface rounded-calm p-3 border border-line-soft"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.3 }}
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(79,122,90,0.1)', border: '1.5px solid #4F7A5A' }}>
                        <span className="text-xs font-bold" style={{ color: '#4F7A5A' }}>{item.num}</span>
                      </div>
                      <p className="text-[11px] font-reading text-ink-secondary">{item.rule}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Five guidelines from the constructed emotion framework. These do not replace what you learned in previous modules -- they add a layer of epistemological humility to every reading.',
          },
        ]}
      />

      <BranchScenario
        id="implications-scenario"
        scenario="A colleague from Japan bows slightly and says 'I understand' with a neutral expression when you deliver critical feedback. You are American and accustomed to reading neutral faces as disengaged or dismissive."
        branches={[
          {
            label: 'Assume they are dismissing your feedback based on their neutral expression',
            outcome: 'This applies your cultural concept of "neutral = disengaged" to a context where it may not apply. In many Japanese professional contexts, a neutral expression during critical feedback signals respect and receptiveness, not disengagement.',
            ethicalScore: 'low',
          },
          {
            label: 'Recognize that your reading is shaped by your cultural concepts and ask: "I want to make sure I communicated clearly. Would you share your thoughts on the feedback?"',
            outcome: 'This is constructed emotion theory in action. You recognize your perception is a construction, not a detection. You ask rather than assume. You invite their perspective rather than imposing yours.',
            ethicalScore: 'high',
          },
          {
            label: 'Repeat the feedback more firmly, assuming they did not take it seriously',
            outcome: 'This doubles down on your cultural interpretation. It may come across as disrespectful -- repeating something to someone who already indicated understanding. Your reading of "not serious" is your construction, not their signal.',
            ethicalScore: 'low',
          },
        ]}
      />

      <InteractiveQuiz
        questions={[
          {
            prompt: 'If emotions are constructed, then "reading" someone\'s emotion is:',
            options: [
              { id: 'detect', label: 'Detecting a clear signal', correct: false },
              { id: 'construct', label: 'Constructing an interpretation using your own concepts', correct: true },
              { id: 'impossible', label: 'Completely impossible', correct: false },
            ],
          },
          {
            prompt: 'The constructed emotion framework and Ekman\'s work are:',
            options: [
              { id: 'contra', label: 'Completely contradictory -- one must be wrong', correct: false },
              { id: 'complement', label: 'Different perspectives that a skilled reader holds together', correct: true },
              { id: 'same', label: 'Basically saying the same thing', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="implications-feynman"
        prompt="Explain to someone why constructed emotion theory does not make reading people impossible but does make it more humble. What changes in your approach when you accept that your readings are constructions?"
        rubric={[
          'You explained why readings are interpretations, not detections.',
          'You gave practical guidelines that follow from the theory.',
          'You did not dismiss reading people as impossible.',
          'You connected epistemological humility to ethical responsibility.',
        ]}
      />

      <ReflectionJournal
        prompt="Think of a time you were confident you knew what someone was feeling -- and were wrong. With what you now know about constructed emotion, what might have led to your error? What concept were you applying that did not match their experience?"
        lessonId="reading-people.constructed-emotion.implications"
        onSave={addJournalEntry}
      />

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 4 of 4 &middot; Constructed Emotion</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next module: Mentalization</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}
