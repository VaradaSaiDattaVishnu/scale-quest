import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
  ObservationScene,
  BranchScenario,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 4 -- Integration
 * Combining bracketing, epoche, and description into a unified
 * practice. Applying phenomenological observation to daily life.
 */

export default function Lesson4_Integration({
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
          Integration
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Bringing bracketing, epoch&eacute;, and description together
          into daily practice.
        </p>
      </header>

      {/* Research paragraph: The integrated method */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The three skills you have practiced -- bracketing assumptions,
          suspending judgment, and describing experience faithfully --
          are not separate techniques. They are three facets of a single
          perceptual orientation that Husserl called the "phenomenological
          attitude." In this attitude, you approach experience as a
          question rather than a conclusion. Instead of asking "What is
          this?" (which pulls you toward categories and labels), you ask
          "How does this appear to me?" (which keeps you in the texture
          of direct experience).
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research on mindfulness-based stress reduction (MBSR) by
          Kabat-Zinn (1990) shares significant overlap with the
          phenomenological attitude. Both emphasize non-judgmental
          awareness of present-moment experience. However, the
          phenomenological approach adds an explicit descriptive
          component: you do not just notice -- you articulate. This
          articulation serves as both a deepening practice (you see more
          because you describe more) and a record that can be reviewed
          later, similar to the field journal in naturalist observation.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: The Integrated Cycle ---- */}
      <VisualStepExplainer
        title="The phenomenological cycle"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center py-4">
                <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
                  {/* Circular path */}
                  <circle
                    cx="110"
                    cy="110"
                    r="80"
                    stroke="#5B6F8C"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    fill="none"
                  />
                  {/* Three nodes */}
                  {[
                    { cx: 110, cy: 30, label: 'Bracket', color: '#B89466' },
                    { cx: 185, cy: 150, label: 'Suspend', color: '#5B6F8C' },
                    { cx: 35, cy: 150, label: 'Describe', color: '#4F7A5A' },
                  ].map((node, i) => (
                    <g key={node.label}>
                      <motion.circle
                        cx={node.cx}
                        cy={node.cy}
                        r="28"
                        fill={node.color}
                        opacity="0.15"
                        stroke={node.color}
                        strokeWidth="2"
                        animate={{ r: [26, 30, 26] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
                      />
                      <text
                        x={node.cx}
                        y={node.cy + 4}
                        textAnchor="middle"
                        fill={node.color}
                        fontSize="10"
                        fontFamily="ui-sans-serif"
                        fontWeight="600"
                      >
                        {node.label}
                      </text>
                    </g>
                  ))}
                  {/* Center */}
                  <text
                    x="110"
                    y="114"
                    textAnchor="middle"
                    fill="#4F7A5A"
                    fontSize="11"
                    fontFamily="ui-sans-serif"
                    fontWeight="bold"
                  >
                    Experience
                  </text>
                </svg>
              </div>
            ),
            caption:
              'The three moves form a cycle: bracket your assumptions, suspend your judgment, then describe what appears. The experience itself is at the center.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-sm w-full">
                  {[
                    {
                      step: 'Notice an assumption',
                      detail: '"I know what this is / means / is for"',
                      color: '#B89466',
                    },
                    {
                      step: 'Bracket it',
                      detail: 'Set the assumption to one side, gently',
                      color: '#B89466',
                    },
                    {
                      step: 'Suspend judgment',
                      detail: 'Hold off on good/bad, right/wrong, like/dislike',
                      color: '#5B6F8C',
                    },
                    {
                      step: 'Attend to experience',
                      detail: 'What appears? Through which senses?',
                      color: '#4F7A5A',
                    },
                    {
                      step: 'Describe faithfully',
                      detail: 'Sensory, specific, concrete language',
                      color: '#4F7A5A',
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.step}
                      className="flex items-center gap-3 bg-surface rounded-calm p-2 border border-line-soft"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.12 }}
                    >
                      <span
                        className="text-xs font-ui font-bold w-5 text-center flex-shrink-0"
                        style={{ color: item.color }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-[10px] font-ui text-ink-primary font-medium">
                          {item.step}
                        </p>
                        <p className="text-[9px] font-ui text-ink-tertiary">
                          {item.detail}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'The five-step micro-practice. It can be done in two minutes with any experience -- a meal, a conversation, a walk, a moment of discomfort.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-3 gap-3 max-w-sm w-full">
                  {[
                    { context: 'Morning coffee', bracket: 'Routine, habit', notice: 'Temperature, weight of mug, bitter-sweet taste gradient' },
                    { context: 'A conversation', bracket: 'What I think they mean', notice: 'Tone, pacing, my body\'s response' },
                    { context: 'Walking outside', bracket: 'Familiar route', notice: 'Ground texture underfoot, air temperature on skin' },
                  ].map((ex, i) => (
                    <motion.div
                      key={ex.context}
                      className="bg-surface rounded-calm p-2 border border-line-soft"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <p
                        className="text-[10px] font-ui font-medium mb-1"
                        style={{ color: '#4F7A5A' }}
                      >
                        {ex.context}
                      </p>
                      <p className="text-[8px] font-ui text-ink-tertiary">
                        Bracket: {ex.bracket}
                      </p>
                      <p className="text-[8px] font-ui text-ink-tertiary">
                        Notice: {ex.notice}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Everyday application: any moment can become a phenomenological exercise. The practice is portable and requires no equipment.',
          },
        ]}
      />

      {/* Research paragraph: Long-term benefits */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Research on dispositional mindfulness (Baer et al., 2006) shows
          that the capacity for non-judgmental, present-moment awareness
          correlates with lower anxiety, greater emotional regulation, and
          better cognitive flexibility. The phenomenological attitude,
          practiced regularly, cultivates exactly these capacities. It does
          not require meditation or stillness -- it can be embedded in any
          activity, from eating to walking to having a conversation.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          For a trauma-informed approach, the integration lesson serves as
          a reminder that this practice is always voluntary. There is no
          correct amount to bracket, no required depth of description.
          Some days the practice will feel natural and revealing. Other
          days it will feel effortful or irrelevant. Both are fine. The
          practice is defined by the returning -- coming back to it when
          it serves you, without obligation or self-judgment.
        </p>
      </section>

      {/* ---- BRANCH SCENARIO ---- */}
      <BranchScenario
        id="integration-scenario"
        scenario="You are eating a familiar meal. You realize you have been eating on autopilot, barely tasting anything."
        branches={[
          {
            label: 'I bracket "familiar meal" and attend to the actual taste, texture, temperature of this bite',
            feedback:
              'Good. The bracket transforms the familiar into the fresh. You might discover flavors and textures you have been skipping for years.',
          },
          {
            label: 'I notice that I was on autopilot and simply acknowledge it',
            feedback:
              'This is itself a phenomenological observation. Noticing autopilot is the first step. You can choose to bracket from here or simply carry the awareness forward.',
          },
          {
            label: 'I decide I should always eat mindfully from now on',
            feedback:
              'This is a well-intentioned but rigid response. The phenomenological attitude is not a rule -- it is an option. Sometimes autopilot is fine. The skill is knowing you have a choice.',
          },
        ]}
      />

      {/* ---- PROMPT ---- */}
      <Prompt
        id="integration-practice"
        question="Choose one everyday activity you will do in the next few hours (eating, walking, showering, a conversation). Apply the full cycle: (1) Notice an assumption. (2) Bracket it. (3) Suspend judgment. (4) Attend. (5) Describe what you experience."
        placeholder="Activity: ... My assumption: ... Bracketing it, I experience..."
        onSave={savePromptAnswer}
      />

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'The phenomenological attitude asks:',
            options: [
              {
                id: 'a',
                label: '"What is this?" (categories and labels)',
                correct: false,
              },
              {
                id: 'b',
                label: '"How does this appear to me?" (texture of experience)',
                correct: true,
              },
              {
                id: 'c',
                label: '"Why is this happening?" (causal explanation)',
                correct: false,
              },
            ],
          },
          {
            prompt: 'How does phenomenological practice relate to mindfulness?',
            options: [
              {
                id: 'a',
                label: 'They are identical practices',
                correct: false,
              },
              {
                id: 'b',
                label: 'They share non-judgmental awareness, but phenomenology adds explicit description',
                correct: true,
              },
              {
                id: 'c',
                label: 'They are completely unrelated',
                correct: false,
              },
            ],
          },
        ]}
      />

      {/* ---- FEYNMAN CHECK ---- */}
      <FeynmanCheck
        id="bracket-l4-feynman"
        prompt="Explain to a friend how they could apply phenomenological observation to their morning routine. Walk them through the five steps with a specific example."
        rubric={[
          'You walked through all five steps with a concrete example.',
          'You made it sound doable, not philosophical.',
          'You emphasized that the practice is voluntary, not obligatory.',
          'The friend would know exactly what to try tomorrow morning.',
        ]}
      />

      {/* ---- REFLECTION ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Looking back at this module: what has shifted in how you relate to your own assumptions and automatic reactions? Is there one moment from these lessons that stands out?"
          lessonId="observation.phenomenological-bracketing.integration"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 4 &middot; Phenomenological Bracketing
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next module: Boyd's OODA Loop
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
