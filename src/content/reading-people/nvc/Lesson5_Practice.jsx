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
 * Lesson 5 -- NVC Practice
 * Full integration: converting real judgments into complete
 * O-F-N-R sequences through BranchScenario trees.
 */

export default function Lesson5_Practice({
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
          NVC in Practice
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Convert judgments into connection. The full O-F-N-R sequence.
        </p>
      </header>

      {/* Research text */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          NVC is not a script. It is a way of thinking about what is happening in human
          interaction. In practice, you will rarely deliver a perfect O-F-N-R sequence.
          People talk in interruptions, tangents, and overlaps. The value of NVC is the
          internal process: before you speak, can you identify the observation, the feeling,
          the need, and the request? Even if you only say one of them aloud, the internal
          clarity changes how you show up.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research on conflict resolution (Johnson & Johnson, 2005) shows that conflicts
          resolved through needs-based dialogue produce more durable agreements than those
          resolved through compromise or dominance. When both parties understand each other's
          needs, creative solutions emerge that neither could have imagined alone.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Full Sequence ---- */}
      <VisualStepExplainer
        title="The full O-F-N-R in action"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-5 border border-line-soft max-w-md w-full">
                  <p className="text-xs font-ui text-ink-tertiary mb-1">JUDGMENT:</p>
                  <p className="text-sm font-reading text-ink-secondary mb-4 italic">
                    "My partner never helps around the house. They are so lazy and selfish."
                  </p>
                  <div className="space-y-3">
                    {[
                      { step: 'O', label: 'Observe', text: '"This week, I did the dishes four times and you did them once."' },
                      { step: 'F', label: 'Feel', text: '"I feel exhausted and a little resentful."' },
                      { step: 'N', label: 'Need', text: '"I need fairness in how we share household work."' },
                      { step: 'R', label: 'Request', text: '"Would you be willing to alternate nights on dishes this week?"' },
                    ].map((item, i) => (
                      <motion.div
                        key={item.step}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.5 }}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: 'rgba(79,122,90,0.1)', border: '1.5px solid #4F7A5A' }}
                        >
                          <span className="text-xs font-bold" style={{ color: '#4F7A5A' }}>{item.step}</span>
                        </div>
                        <div>
                          <p className="text-[10px] font-ui font-semibold" style={{ color: '#4F7A5A' }}>{item.label}</p>
                          <p className="text-[11px] font-reading text-ink-secondary">{item.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption:
              'The same frustration expressed as judgment ("lazy and selfish") vs NVC (specific observation, genuine feeling, identified need, doable request). Both describe the same situation. Only one leads to connection.',
          },
        ]}
      />

      {/* ---- BRANCH SCENARIO 1 ---- */}
      <section className="my-10">
        <BranchScenario
          id="nvc-practice-workplace"
          scenario='Your colleague took credit for your idea in a meeting. Your internal reaction: "They are a backstabbing credit-thief." Convert this to NVC.'
          branches={[
            {
              label: '"When I heard my proposal presented as yours in the meeting (O), I felt hurt and confused (F), because I need recognition for my contributions (N). Would you be willing to mention my role when you present it to the director? (R)"',
              outcome: 'This is clean NVC. Specific observation, genuine feelings, identified need, and a doable request. Notice the request leaves room for "no" -- which means you need to be prepared for that.',
              ethicalScore: 'high',
            },
            {
              label: '"You stole my idea and I need you to fix it right now."',
              outcome: 'This mixes evaluation ("stole"), faux-feeling (implied betrayal), and demand ("fix it right now"). It will trigger defensiveness and escalate the conflict.',
              ethicalScore: 'low',
            },
            {
              label: 'Say nothing but bring it up with your manager instead.',
              outcome: 'This avoids the conversation but creates a different kind of power play. Consider whether you are protecting yourself or avoiding vulnerability. Sometimes direct NVC is harder but more ethical.',
              ethicalScore: 'medium',
            },
          ]}
        />
      </section>

      {/* ---- PROMPT: Your own conversion ---- */}
      <section className="my-10">
        <Prompt
          id="nvc-own-conversion"
          question="Think of a judgment you are currently holding about someone in your life. Write the judgment, then convert it into a full O-F-N-R sequence. Be honest about what the judgment is -- this is where the real learning happens."
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- BRANCH SCENARIO 2 ---- */}
      <section className="my-10">
        <BranchScenario
          id="nvc-practice-family"
          scenario='Your parent says: "You never call anymore. You obviously do not care about this family." You feel a surge of guilt and irritation. How do you respond using NVC -- not to defend yourself, but to understand the need behind their words?'
          branches={[
            {
              label: 'Hear the need: "It sounds like you are missing connection with me (N), and that is coming out as frustration (F). What kind of contact would feel good to you? (R)"',
              outcome: 'This is empathic NVC -- you apply the framework to understand their communication, not just to express your own. You hear the need (connection) behind the evaluation ("you do not care").',
              ethicalScore: 'high',
            },
            {
              label: '"That is not true. I called last week."',
              outcome: 'This is defense, not connection. Even if factually correct, it addresses the evaluation ("never call") without touching the need (wanting more closeness). The argument will escalate.',
              ethicalScore: 'low',
            },
            {
              label: '"I hear that you are upset. I will try to call more often."',
              outcome: 'This is a common pattern: acknowledge and comply. It avoids conflict but also avoids real understanding. "Try to call more often" is vague -- it will likely not change the dynamic.',
              ethicalScore: 'medium',
            },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'In practice, the most important function of the O-F-N-R framework is:',
            options: [
              { id: 'script', label: 'Delivering a perfect scripted statement', correct: false },
              { id: 'internal', label: 'Internal clarity about what is actually happening', correct: true },
              { id: 'win', label: 'Winning the conversation', correct: false },
            ],
          },
          {
            prompt: 'When someone expresses a judgment ("You do not care"), NVC suggests you:',
            options: [
              { id: 'defend', label: 'Defend yourself with facts', correct: false },
              { id: 'need', label: 'Hear the unmet need behind the judgment', correct: true },
              { id: 'ignore', label: 'Ignore the comment', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="nvc-practice-feynman"
        prompt="Walk someone through converting a real judgment into a full NVC sequence. Use a judgment you have actually held. Explain each step and why it matters."
        rubric={[
          'You started with a real judgment, not a sanitized example.',
          'You clearly showed each step of the O-F-N-R conversion.',
          'You explained why the NVC version is more likely to create connection.',
          'You acknowledged the difficulty of doing this in real time.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="What did you notice about yourself when converting judgments to NVC? Was it harder to identify the feeling, the need, or the request? What does that tell you about where your growth edge is?"
          lessonId="reading-people.nvc.practice"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 5 of 5 &middot; Nonviolent Communication
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next module: Micro-expressions
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
