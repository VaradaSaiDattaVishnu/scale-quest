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
 * Lesson 4 -- Silence as Skill
 * The most underrated tool in active listening: the deliberate
 * use of silence to create space for deeper expression.
 */

export default function Lesson4_SilenceAsSkill({
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
          Silence as Skill
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          What you do not say may be the most powerful thing you offer.
        </p>
      </header>

      {/* Research text */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In a culture that equates conversation with talking, silence feels like failure --
          an awkward gap to be filled. But Rogers and subsequent therapists discovered that
          silence is one of the most potent tools in the listener's repertoire. When used
          skillfully, silence communicates: "I am here. There is no rush. What you need to
          say matters more than my need to respond."
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Research by Ladany et al. (2004) found that therapist silence, when timed
          appropriately, correlated with deeper client self-exploration. The key is "timed
          appropriately" -- silence after an emotional disclosure gives the speaker room to
          process. Silence during a factual exchange may feel like disengagement. The skill
          is knowing when silence serves the other person and when it serves your own
          avoidance.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          For reading people, silence is also a perceptual tool. When you stop talking, you
          can observe more -- body shifts, micro-expressions, the way someone's breathing
          changes. Most of what people communicate nonverbally happens in the pauses, not
          during speech.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="The power of the pause"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-4 w-full max-w-sm">
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      {[0.8, 0.6, 0.9, 0.4, 0.7, 0.3, 0.1, 0.05, 0.05].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-sm"
                          style={{ backgroundColor: i < 6 ? '#5B6F8C' : '#4F7A5A', height: `${h * 60}px` }}
                          animate={i >= 6 ? { opacity: [0.3, 0.8, 0.3] } : {}}
                          transition={i >= 6 ? { duration: 3, repeat: Infinity, delay: (i - 6) * 0.5 } : {}}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[9px] font-ui text-ink-tertiary">speaking</span>
                      <span className="text-[9px] font-ui" style={{ color: '#4F7A5A' }}>silence</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs font-ui text-ink-secondary">
                  When speech fades, nonverbal signals emerge
                </p>
              </div>
            ),
            caption:
              'During speech, verbal content dominates attention. In silence, nonverbal signals become visible: shifts in posture, changes in breathing, micro-expressions that were masked by the act of talking.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <div className="bg-surface rounded-calm p-4 border-l-4" style={{ borderColor: '#4F7A5A' }}>
                    <p className="text-xs font-ui font-semibold mb-2" style={{ color: '#4F7A5A' }}>
                      Productive Silence
                    </p>
                    <ul className="space-y-1">
                      {[
                        'After an emotional disclosure',
                        'When someone is searching for words',
                        'To let a realization settle',
                        'To show there is no rush',
                      ].map((t) => (
                        <li key={t} className="text-[10px] font-reading text-ink-secondary">-- {t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-surface rounded-calm p-4 border-l-4" style={{ borderColor: '#B89466' }}>
                    <p className="text-xs font-ui font-semibold mb-2" style={{ color: '#B89466' }}>
                      Unproductive Silence
                    </p>
                    <ul className="space-y-1">
                      {[
                        'When someone is confused and needs help',
                        'As a power move to create discomfort',
                        'From disengagement or distraction',
                        'To withhold validation punitively',
                      ].map((t) => (
                        <li key={t} className="text-[10px] font-reading text-ink-secondary">-- {t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Silence is a tool, not a default. Productive silence creates space. Unproductive silence creates distance or discomfort. The difference lies in intent and timing.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-6">
                <motion.div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ border: '3px solid #4F7A5A', backgroundColor: 'rgba(79,122,90,0.06)' }}
                  animate={{
                    scale: [1, 1.15, 1],
                    borderColor: ['#4F7A5A', '#5B6F8C', '#4F7A5A'],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <motion.span
                    className="font-ui text-lg font-bold"
                    style={{ color: '#4F7A5A' }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 6, repeat: Infinity }}
                  >
                    ...
                  </motion.span>
                </motion.div>
                <p className="text-xs font-ui text-ink-tertiary mt-2">
                  Breathe. Observe. Wait.
                </p>
              </div>
            ),
            caption:
              'Practice: when someone finishes speaking, count to three before responding. In those three seconds, notice what you observe -- their expression, their posture, what they do with their hands. This is where reading happens.',
          },
        ]}
      />

      {/* ---- PROMPT ---- */}
      <section className="my-10">
        <Prompt
          id="silence-practice-reflection"
          question="Think of a conversation where someone held space for you in silence. What did it feel like? Now think of a conversation where silence felt uncomfortable or punishing. What was different?"
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why is silence valuable for reading people?',
            options: [
              { id: 'nonverbal', label: 'Nonverbal signals become visible when speech stops', correct: true },
              { id: 'power', label: 'It creates a power advantage', correct: false },
              { id: 'rest', label: 'It gives your brain a rest', correct: false },
            ],
          },
          {
            prompt: 'When is silence most likely unproductive?',
            options: [
              { id: 'emotional', label: 'After an emotional disclosure', correct: false },
              { id: 'power-move', label: 'When used as a power move to create discomfort', correct: true },
              { id: 'searching', label: 'When someone is searching for words', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="silence-feynman"
        prompt="Explain why silence is considered a skill rather than just an absence of speech. What does skillful silence accomplish that constant responding cannot?"
        rubric={[
          'You distinguished skillful silence from passive silence.',
          'You explained what becomes observable during silence.',
          'You connected silence to the speaker feeling heard.',
          'You gave an example of productive vs unproductive silence.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="How comfortable are you with silence in conversations? What drives your urge to fill pauses? What might you be avoiding by always responding quickly?"
          lessonId="reading-people.rogers-active-listening.silence-as-skill"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 4 &middot; Rogers & Active Listening
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next module: Nonviolent Communication
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
