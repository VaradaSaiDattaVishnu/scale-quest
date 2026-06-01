import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
  BranchScenario,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 1 -- Why Ethics First
 * ETHICS-GATED: establishes the ethical foundation before any reading-people skill.
 * Reading people is power. Power without ethics is manipulation.
 */

export default function Lesson1_WhyEthicsFirst({
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
          Why Ethics Comes First
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Skill without ethics is not skill. It is danger.
        </p>
      </header>

      {/* Research text: The case for ethics-first */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Every technique in this pillar gives you the ability to perceive what others may not
          know they are revealing. Micro-expressions, vocal patterns, body language, emotional
          undercurrents -- these are intimate signals. The moment you learn to read them, you
          hold a form of power over the people around you. That power can be used to connect,
          to heal, to understand. Or it can be used to exploit, to manipulate, to control.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          History is full of people who read others brilliantly and used that skill to cause
          harm. Con artists, cult leaders, and abusive partners are often exceptional readers
          of people. Their failure was never one of perception -- it was one of ethics. This
          is why Tapasya begins every pillar of interpersonal skill with an ethics gate. You
          cannot skip this module. It is the foundation on which everything else rests.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research in social psychology (Fiske, 1993) confirms that power asymmetries distort
          perception: those with more power pay less attention to those with less. Learning to
          read people can amplify this asymmetry unless you deliberately build ethical
          guardrails into your practice from the start.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: The Ethics-Skill Relationship ---- */}
      <VisualStepExplainer
        title="Why ethics cannot wait"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-8">
                  <motion.div
                    className="w-24 h-24 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: '#4F7A5A', backgroundColor: 'rgba(79,122,90,0.08)' }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="font-ui text-sm font-bold" style={{ color: '#4F7A5A' }}>
                      Ethics
                    </span>
                  </motion.div>
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                    <path d="M0 10H35M35 10L28 4M35 10L28 16" stroke="#5B6F8C" strokeWidth="2" />
                  </svg>
                  <motion.div
                    className="w-24 h-24 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: '#B89466', backgroundColor: 'rgba(184,148,102,0.08)' }}
                  >
                    <span className="font-ui text-sm font-bold" style={{ color: '#B89466' }}>
                      Skill
                    </span>
                  </motion.div>
                </div>
                <p className="text-xs font-ui text-ink-tertiary">Ethics is the prerequisite, not the afterthought</p>
              </div>
            ),
            caption:
              'Ethics comes before skill, not after. You do not learn to read people and then decide how to use it. You decide your ethical stance first, then develop the skill within those boundaries.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
                  <div className="bg-surface rounded-calm p-4 border border-line-soft text-center">
                    <svg width="40" height="40" viewBox="0 0 40 40" className="mx-auto mb-2">
                      <circle cx="20" cy="20" r="16" fill="none" stroke="#4F7A5A" strokeWidth="2" />
                      <path d="M14 20L18 24L26 16" stroke="#4F7A5A" strokeWidth="2.5" fill="none" />
                    </svg>
                    <p className="text-xs font-ui font-semibold" style={{ color: '#4F7A5A' }}>Understanding</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-1">Sees to connect</p>
                  </div>
                  <div className="bg-surface rounded-calm p-4 border border-line-soft text-center">
                    <svg width="40" height="40" viewBox="0 0 40 40" className="mx-auto mb-2">
                      <circle cx="20" cy="20" r="16" fill="none" stroke="#B89466" strokeWidth="2" />
                      <path d="M14 14L26 26M26 14L14 26" stroke="#B89466" strokeWidth="2.5" />
                    </svg>
                    <p className="text-xs font-ui font-semibold" style={{ color: '#B89466' }}>Manipulation</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-1">Sees to exploit</p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'The same observation skill serves both purposes. The difference is not what you see -- it is what you do with what you see. Your ethical stance determines which path you walk.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <motion.div
                  className="w-full max-w-xs h-4 rounded-full overflow-hidden bg-surface border border-line-soft"
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: '#4F7A5A' }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
                  />
                </motion.div>
                <div className="flex justify-between w-full max-w-xs">
                  <span className="text-[10px] font-ui text-ink-tertiary">No skill</span>
                  <span className="text-[10px] font-ui text-ink-tertiary">High skill</span>
                </div>
                <p className="text-xs font-ui text-ink-secondary mt-2">
                  As skill grows, so must ethical awareness
                </p>
              </div>
            ),
            caption:
              'Skill and ethical responsibility scale together. The more accurately you read someone, the more carefully you must handle what you perceive. There is no level of skill at which ethics becomes optional.',
          },
        ]}
      />

      {/* Research text: Power and perception */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The psychologist Dacher Keltner, studying power dynamics at UC Berkeley, found that
          gaining power literally changes how the brain processes other people. Those who feel
          powerful show reduced mirror neuron activity -- they literally become less capable of
          empathy unless they actively work against it. Learning to read people without
          ethical grounding can accelerate this effect: you see more, but care less.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This is not a theoretical risk. It is a documented neurological pattern. The
          antidote is not to avoid learning these skills, but to build the ethical framework
          first -- to make empathy and respect structural, not optional.
        </p>
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why does Tapasya teach ethics before any reading-people technique?',
            options: [
              { id: 'legal', label: 'To avoid legal liability', correct: false },
              { id: 'power', label: 'Because reading people creates power that requires ethical guardrails', correct: true },
              { id: 'easy', label: 'Because ethics is easier to learn first', correct: false },
            ],
          },
          {
            prompt: 'What did Keltner\'s research find about power and empathy?',
            options: [
              { id: 'more', label: 'Power increases empathy naturally', correct: false },
              { id: 'less', label: 'Power reduces mirror neuron activity, decreasing empathy', correct: true },
              { id: 'none', label: 'Power has no effect on empathy', correct: false },
            ],
          },
          {
            prompt: 'A skilled con artist who reads people brilliantly has a failure of:',
            options: [
              { id: 'perc', label: 'Perception', correct: false },
              { id: 'intel', label: 'Intelligence', correct: false },
              { id: 'eth', label: 'Ethics', correct: true },
            ],
          },
        ]}
      />

      {/* ---- PROMPT ---- */}
      <section className="my-10">
        <Prompt
          id="ethics-first-reflection"
          question="Think of a time someone read you accurately -- your mood, your hesitation, your discomfort. How did it feel? Did they use that perception to help you or to gain advantage?"
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="ethics-first-feynman"
        prompt="Explain to a friend why learning to read people without thinking about ethics first could be harmful. Use a concrete example."
        rubric={[
          'You described a specific scenario where reading people could cause harm.',
          'You connected the idea of power asymmetry to the risk.',
          'You did not dismiss ethics as obvious or unnecessary.',
          'Your explanation would make sense to someone who has never studied psychology.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 4 &middot; Ethics Filter
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Power and Consent
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
