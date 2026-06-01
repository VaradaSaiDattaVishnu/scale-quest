import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  NervousSystemCheckin,
  BreathingDot,
} from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 1 -- What Is Complex PTSD?
 * Pete Walker's CPTSD framework. Warm, validating tone throughout.
 * "These responses kept you alive."
 * NervousSystemCheckin appears here as this is the first lesson in the module.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'

export default function Lesson1_WhatIsCPTSD({
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
          What Is Complex PTSD?
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          When the danger was not a single event, but an environment.
        </p>
      </header>

      {/* ---- Gentle Reminder ---- */}
      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">
          You can stop anytime. The stop button is always available.
        </p>
      </div>

      {/* ---- NERVOUS SYSTEM CHECK-IN ---- */}
      <section className="my-8">
        <NervousSystemCheckin onComplete={(result) => savePromptAnswer?.('checkin', result)} />
      </section>

      {/* Research paragraph: Defining CPTSD */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In 1992, psychiatrist Judith Herman proposed a distinction that changed how we understand
          trauma. Standard PTSD, she argued, captures what happens after a single overwhelming event --
          a car accident, a natural disaster, a single assault. But many people experience something
          different: prolonged, repeated trauma, often beginning in childhood, often within relationships
          that were supposed to be safe. Herman called this complex trauma, and the responses it
          produces, Complex PTSD.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Bessel van der Kolk's landmark research (2014) expanded on this, showing that complex trauma
          reshapes the nervous system itself. The body learns to live in a state of chronic threat.
          Survival responses -- fighting, fleeing, freezing, or appeasing -- become the default mode, not
          because something is wrong with you, but because your nervous system adapted to an environment
          where those responses kept you alive.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: CPTSD vs PTSD ---- */}
      <VisualStepExplainer
        title="Understanding the difference"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <motion.div
                  className="w-20 h-20 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: AMBER }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="font-ui text-xs text-center px-2" style={{ color: AMBER }}>
                    Single event
                  </span>
                </motion.div>
                <p className="text-xs font-ui text-ink-tertiary">PTSD: one overwhelming moment</p>
              </div>
            ),
            caption:
              'Standard PTSD typically follows a single overwhelming event. The nervous system gets stuck replaying that one moment.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <motion.div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: AMBER }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                  ))}
                </div>
                <p className="text-xs font-ui text-ink-tertiary">CPTSD: repeated, ongoing</p>
              </div>
            ),
            caption:
              'Complex PTSD develops from repeated exposure to threat over time -- often in childhood, often within close relationships. The environment itself became the source of danger.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-6 py-4">
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                  <div className="bg-surface rounded-calm p-3 border border-line-soft text-center">
                    <p className="text-xs font-ui font-medium text-ink-primary mb-1">PTSD</p>
                    <p className="text-[10px] text-ink-tertiary">Flashbacks, nightmares, avoidance</p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border border-line-soft text-center">
                    <p className="text-xs font-ui font-medium text-ink-primary mb-1">CPTSD adds</p>
                    <p className="text-[10px] text-ink-tertiary">
                      Emotion dysregulation, negative self-concept, relational difficulties
                    </p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'CPTSD includes everything in PTSD, plus three additional areas: difficulty managing emotions, a deep sense of being broken or worthless, and struggles in relationships. These are adaptations, not character flaws.',
          },
        ]}
      />

      {/* Research paragraph: Pete Walker's 4F model */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Therapist Pete Walker identified four fundamental survival responses that develop in
          complex trauma. He called them the 4Fs: Fight, Flight, Freeze, and Fawn. Each one is a
          strategy your nervous system learned to keep you as safe as possible in an unsafe
          environment. None of them are flaws. Every one of them was, at some point, the best option
          available to you.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          In the lessons that follow, we will explore each response in detail. For now, what matters
          is this: these are not personality problems. They are survival strategies that became
          automatic because they had to. Understanding them is the first step toward having more
          choice about when and how they show up.
        </p>
      </section>

      {/* ---- VISUAL: 4F Overview ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-6">
          The Four Survival Responses
        </h2>
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {[
            { label: 'Fight', desc: 'Taking control, confronting, pushing back', icon: 'F' },
            { label: 'Flight', desc: 'Escaping, staying busy, avoiding stillness', icon: 'L' },
            { label: 'Freeze', desc: 'Shutting down, dissociating, going blank', icon: 'R' },
            { label: 'Fawn', desc: 'Pleasing, merging, losing yourself to stay safe', icon: 'W' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="bg-surface rounded-gentle border border-line-soft p-4 text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
            >
              <div
                className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(79, 122, 90, 0.12)' }}
              >
                <span className="font-ui font-bold text-sm" style={{ color: SAGE }}>
                  {item.label[0]}
                </span>
              </div>
              <p className="font-ui text-sm font-medium text-ink-primary mb-1">{item.label}</p>
              <p className="text-[11px] text-ink-tertiary">{item.desc}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-ink-tertiary text-center mt-4 font-ui">
          Most people have one or two dominant responses. All are valid. All made sense once.
        </p>
      </section>

      {/* Research paragraph: Body-based understanding */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          Van der Kolk's research showed that trauma lives in the body as much as in the mind.
          The survival responses are not just thoughts or behaviors -- they are body states.
          Fight lives in clenched jaws and tight fists. Flight lives in restless legs and racing
          hearts. Freeze lives in numbness and heaviness. Fawn lives in a collapsed chest and a
          scanning gaze, always reading the room. Learning to notice these sensations is not
          about fixing them. It is about beginning to understand the language your body has been
          speaking all along.
        </p>
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What makes CPTSD different from standard PTSD?',
            options: [
              { id: 'single', label: 'It follows a single event', correct: false },
              { id: 'repeated', label: 'It develops from repeated, prolonged trauma', correct: true },
              { id: 'worse', label: 'It is more severe in every way', correct: false },
            ],
          },
          {
            prompt: 'The 4F responses are best understood as:',
            options: [
              { id: 'flaws', label: 'Character flaws that need to be eliminated', correct: false },
              { id: 'survival', label: 'Survival strategies that became automatic', correct: true },
              { id: 'choices', label: 'Conscious choices people make', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="cptsd-lesson1-feynman"
        prompt="In your own words, explain why survival responses are not character flaws. Speak as if you were explaining to a friend who feels ashamed of how they react under stress."
        rubric={[
          'You named at least one survival response (fight, flight, freeze, or fawn).',
          'You framed it as a protective adaptation, not a weakness.',
          'Your tone was warm and non-judgmental.',
          'A friend hearing this would feel less alone.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="As you read about the four responses, did any feel familiar? You do not need to name them yet -- just notice what came up. Whatever you noticed is okay."
          lessonId="trauma.cptsd.what-is-cptsd"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Grounding close ---- */}
      <div className="flex justify-center my-8">
        <BreathingDot size={48} />
      </div>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 5 &middot; CPTSD
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: The fight response
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
