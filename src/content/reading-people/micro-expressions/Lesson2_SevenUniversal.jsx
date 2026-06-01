import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  DragMatch,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 2 -- The Seven Universal Expressions
 * Animated SVG faces showing each of Ekman's universal expressions.
 * Happiness, sadness, anger, fear, disgust, contempt, surprise.
 */

/* --- SVG Face Helper --- */
const FaceExpression = ({ label, eyebrows, eyes, mouth, color }) => (
  <div className="flex flex-col items-center">
    <motion.div
      className="w-16 h-16 rounded-full flex items-center justify-center"
      style={{ backgroundColor: `${color}10`, border: `2px solid ${color}` }}
      whileHover={{ scale: 1.1 }}
    >
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="15" stroke={color} strokeWidth="1.5" fill="none" />
        {/* Eyebrows */}
        <path d={eyebrows} stroke={color} strokeWidth="1.5" fill="none" />
        {/* Eyes */}
        <path d={eyes} stroke={color} strokeWidth="1.5" fill={color} />
        {/* Mouth */}
        <path d={mouth} stroke={color} strokeWidth="1.5" fill="none" />
      </svg>
    </motion.div>
    <p className="text-[10px] font-ui mt-1" style={{ color }}>{label}</p>
  </div>
)

export default function Lesson2_SevenUniversal({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  const expressions = [
    { label: 'Happiness', eyebrows: 'M9 11C10 10.5 12 10.5 13 11 M23 11C24 10.5 26 10.5 27 11', eyes: 'M11 14A2 1.5 0 1 0 15 14A2 1.5 0 1 0 11 14 M21 14A2 1.5 0 1 0 25 14A2 1.5 0 1 0 21 14', mouth: 'M12 24C14 27 22 27 24 24', color: '#4F7A5A' },
    { label: 'Sadness', eyebrows: 'M9 12C10 10 13 10 14 11 M22 11C23 10 26 10 27 12', eyes: 'M11 15A2 1.5 0 1 0 15 15A2 1.5 0 1 0 11 15 M21 15A2 1.5 0 1 0 25 15A2 1.5 0 1 0 21 15', mouth: 'M12 26C14 23 22 23 24 26', color: '#5B6F8C' },
    { label: 'Anger', eyebrows: 'M9 13C11 10 13 10 14 11 M22 11C23 10 25 10 27 13', eyes: 'M11 15A2 1.5 0 1 0 15 15A2 1.5 0 1 0 11 15 M21 15A2 1.5 0 1 0 25 15A2 1.5 0 1 0 21 15', mouth: 'M13 25H23', color: '#B89466' },
    { label: 'Fear', eyebrows: 'M9 10C10 8 13 8 14 10 M22 10C23 8 26 8 27 10', eyes: 'M10 14A3 2.5 0 1 0 16 14A3 2.5 0 1 0 10 14 M20 14A3 2.5 0 1 0 26 14A3 2.5 0 1 0 20 14', mouth: 'M13 25C15 27 21 27 23 25', color: '#5B6F8C' },
    { label: 'Disgust', eyebrows: 'M9 12C10 11 13 12 14 13 M22 13C23 12 26 11 27 12', eyes: 'M11 15A2 1.2 0 1 0 15 15A2 1.2 0 1 0 11 15 M21 15A2 1.2 0 1 0 25 15A2 1.2 0 1 0 21 15', mouth: 'M13 25C15 23 18 22 18 22 M18 22C18 22 21 23 23 25', color: '#B89466' },
    { label: 'Contempt', eyebrows: 'M9 11C10 10.5 13 10.5 14 11 M22 11C23 10.5 26 10.5 27 11', eyes: 'M11 14A2 1.5 0 1 0 15 14A2 1.5 0 1 0 11 14 M21 14A2 1.5 0 1 0 25 14A2 1.5 0 1 0 21 14', mouth: 'M13 24C14 24 16 24 18 24 M18 24C20 23 22 22 24 22', color: '#5B6F8C' },
    { label: 'Surprise', eyebrows: 'M9 9C10 7 13 7 14 9 M22 9C23 7 26 7 27 9', eyes: 'M10 14A3 2.5 0 1 0 16 14A3 2.5 0 1 0 10 14 M20 14A3 2.5 0 1 0 26 14A3 2.5 0 1 0 20 14', mouth: 'M15 25A3 3 0 1 0 21 25A3 3 0 1 0 15 25', color: '#4F7A5A' },
  ]

  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ---- TITLE ---- */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          The Seven Universal Expressions
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Seven emotions, found in every culture Ekman studied.
        </p>
      </header>

      {/* Research text */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Ekman's cross-cultural research (1969, 1971) identified seven expressions that
          appear to be universally produced and recognized: happiness, sadness, anger, fear,
          disgust, contempt, and surprise. He tested this with the Fore people of Papua New
          Guinea -- a tribe with minimal contact with Western media -- and found they produced
          and recognized the same facial configurations.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Each expression has a distinct muscular signature. Happiness involves the cheek
          raiser and lip corner puller. Fear involves the inner brow raise, brow raise, and
          lip stretch. Contempt is unique: it is the only asymmetric expression, involving a
          one-sided lip corner pull. These patterns are produced involuntarily, even in people
          who have been blind from birth.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Important caveat: Lisa Feldman Barrett (whose work you will study in the next module)
          has challenged the universality thesis, arguing that cultural context shapes both the
          production and perception of facial expressions more than Ekman's model suggests. We
          present both perspectives because reading people requires holding complexity, not
          choosing sides.
        </p>
      </section>

      {/* ---- The Seven Faces ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-6">
          The Seven Expressions
        </h2>
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
          {expressions.map((expr) => (
            <FaceExpression key={expr.label} {...expr} />
          ))}
        </div>
        <p className="text-xs font-ui text-ink-tertiary text-center mt-4">
          Hover over each face to examine. Notice the distinct muscular patterns.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Key Distinctions ---- */}
      <VisualStepExplainer
        title="Key distinctions to train"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-8">
                  <FaceExpression label="Genuine smile" eyebrows="M9 11C10 10.5 12 10.5 13 11 M23 11C24 10.5 26 10.5 27 11" eyes="M11 14A2 1.5 0 1 0 15 14A2 1.5 0 1 0 11 14 M21 14A2 1.5 0 1 0 25 14A2 1.5 0 1 0 21 14" mouth="M12 24C14 27 22 27 24 24" color="#4F7A5A" />
                  <span className="font-ui text-ink-tertiary text-sm">vs</span>
                  <FaceExpression label="Social smile" eyebrows="M9 11C10 10.5 12 10.5 13 11 M23 11C24 10.5 26 10.5 27 11" eyes="M12 14A1.5 1.5 0 1 0 15 14A1.5 1.5 0 1 0 12 14 M21 14A1.5 1.5 0 1 0 24 14A1.5 1.5 0 1 0 21 14" mouth="M12 24C14 27 22 27 24 24" color="#B89466" />
                </div>
              </div>
            ),
            caption:
              'The Duchenne marker: a genuine smile involves AU6 (eye crinkle). A social smile moves only the mouth. The difference is subtle but learnable. Look at the eyes, not the mouth.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-8">
                  <FaceExpression label="Fear" eyebrows="M9 10C10 8 13 8 14 10 M22 10C23 8 26 8 27 10" eyes="M10 14A3 2.5 0 1 0 16 14A3 2.5 0 1 0 10 14 M20 14A3 2.5 0 1 0 26 14A3 2.5 0 1 0 20 14" mouth="M13 25C15 27 21 27 23 25" color="#5B6F8C" />
                  <span className="font-ui text-ink-tertiary text-sm">vs</span>
                  <FaceExpression label="Surprise" eyebrows="M9 9C10 7 13 7 14 9 M22 9C23 7 26 7 27 9" eyes="M10 14A3 2.5 0 1 0 16 14A3 2.5 0 1 0 10 14 M20 14A3 2.5 0 1 0 26 14A3 2.5 0 1 0 20 14" mouth="M15 25A3 3 0 1 0 21 25A3 3 0 1 0 15 25" color="#4F7A5A" />
                </div>
              </div>
            ),
            caption:
              'Fear and surprise both widen the eyes and raise the brows. The key difference: fear stretches the mouth horizontally (lip stretch). Surprise opens it into an O shape. Context helps -- but context can also mislead.',
          },
        ]}
      />

      {/* ---- DRAG MATCH ---- */}
      <section className="my-10">
        <DragMatch
          id="expression-to-action-units"
          instruction="Match each expression to its key muscular feature."
          pairs={[
            { term: 'Happiness (genuine)', match: 'Eye crinkle + lip corners up' },
            { term: 'Contempt', match: 'One-sided lip corner pull' },
            { term: 'Disgust', match: 'Nose wrinkle + upper lip raise' },
            { term: 'Fear', match: 'Wide eyes + horizontal mouth stretch' },
            { term: 'Anger', match: 'Lowered brows + tight lips' },
            { term: 'Surprise', match: 'Raised brows + O-shaped mouth' },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Which expression is the only asymmetric universal expression?',
            options: [
              { id: 'anger', label: 'Anger', correct: false },
              { id: 'contempt', label: 'Contempt', correct: true },
              { id: 'disgust', label: 'Disgust', correct: false },
            ],
          },
          {
            prompt: 'Why does the lesson present Barrett\'s challenge alongside Ekman\'s findings?',
            options: [
              { id: 'wrong', label: 'Because Ekman was wrong', correct: false },
              { id: 'complexity', label: 'Because reading people requires holding complexity, not choosing sides', correct: true },
              { id: 'balanced', label: 'To appear balanced for legal reasons', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="seven-universal-feynman"
        prompt="Describe the seven universal expressions and the key muscular feature that distinguishes each. Then explain why Barrett's critique matters even if Ekman's findings hold up."
        rubric={[
          'You named all seven expressions.',
          'You described at least three distinct muscular features.',
          'You explained the genuine vs social smile distinction.',
          'You articulated Barrett\'s critique without dismissing Ekman.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 4 &middot; Micro-expressions
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Limits and Errors
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
