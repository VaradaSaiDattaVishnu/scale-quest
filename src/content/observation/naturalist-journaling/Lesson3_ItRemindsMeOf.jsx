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
 * Lesson 3 -- It Reminds Me Of
 * The third prompt in Laws' triad: connecting observation to prior knowledge.
 * Analogical thinking and depth of encoding.
 */

export default function Lesson3_ItRemindsMeOf({
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
          It Reminds Me Of
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Connecting what you see to what you already know.
        </p>
      </header>

      {/* Research paragraph: Analogical encoding */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The third prompt in Laws' triad -- "It reminds me of" -- is where
          observation meets memory. After noticing and wondering, this prompt
          invites you to connect the present experience to something already in
          your knowledge base: a past experience, another organism, a pattern
          from a different domain. This is analogical thinking, and it is one
          of the deepest forms of encoding the brain can perform.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Dedre Gentner's research on analogical reasoning (1983, 2003) shows
          that comparing two things -- even superficially different ones --
          forces the mind to extract structural relationships. When you say
          "this lichen pattern reminds me of a river delta seen from the air,"
          you are not just making a poetic comparison. You are aligning
          relational structures: branching, flow, self-similarity across
          scales. That alignment creates multiple retrieval paths for both the
          new observation and the existing memory.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Connection Webs ---- */}
      <VisualStepExplainer
        title="How connections deepen encoding"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
                  {/* Central node */}
                  <motion.circle
                    cx="100"
                    cy="80"
                    r="20"
                    stroke="#4F7A5A"
                    strokeWidth="2"
                    fill="rgba(79,122,90,0.1)"
                    animate={{ r: [18, 22, 18] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <text
                    x="100"
                    y="84"
                    textAnchor="middle"
                    fill="#4F7A5A"
                    fontSize="10"
                    fontFamily="ui-sans-serif"
                  >
                    New obs.
                  </text>
                  {/* Connected nodes */}
                  {[
                    { cx: 40, cy: 40, label: 'Memory A' },
                    { cx: 160, cy: 30, label: 'Experience' },
                    { cx: 50, cy: 130, label: 'Pattern' },
                    { cx: 165, cy: 125, label: 'Concept' },
                  ].map((node, i) => (
                    <g key={node.label}>
                      <motion.line
                        x1="100"
                        y1="80"
                        x2={node.cx}
                        y2={node.cy}
                        stroke="#B89466"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: i * 0.3, duration: 0.6 }}
                      />
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r="14"
                        stroke="#5B6F8C"
                        strokeWidth="1.5"
                        fill="rgba(91,111,140,0.08)"
                      />
                      <text
                        x={node.cx}
                        y={node.cy + 3}
                        textAnchor="middle"
                        fill="#5B6F8C"
                        fontSize="8"
                        fontFamily="ui-sans-serif"
                      >
                        {node.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            ),
            caption:
              'Each connection you make between a new observation and an existing memory creates an additional retrieval path. More paths means more durable encoding.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-4 max-w-sm w-full">
                  <div className="bg-surface rounded-calm p-3 border border-line-soft">
                    <p
                      className="text-xs font-ui font-medium mb-1"
                      style={{ color: '#B89466' }}
                    >
                      Isolated
                    </p>
                    <div className="h-2 bg-line-soft rounded-full overflow-hidden">
                      <div
                        className="h-full w-[25%] rounded-full"
                        style={{ backgroundColor: '#B89466' }}
                      />
                    </div>
                    <p className="text-[10px] text-ink-tertiary mt-1 font-ui">
                      1 retrieval path
                    </p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border border-line-soft">
                    <p
                      className="text-xs font-ui font-medium mb-1"
                      style={{ color: '#4F7A5A' }}
                    >
                      Connected
                    </p>
                    <div className="h-2 bg-line-soft rounded-full overflow-hidden">
                      <div
                        className="h-full w-[85%] rounded-full"
                        style={{ backgroundColor: '#4F7A5A' }}
                      />
                    </div>
                    <p className="text-[10px] text-ink-tertiary mt-1 font-ui">
                      4+ retrieval paths
                    </p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'An isolated observation has one thin retrieval path. An observation connected to existing knowledge has many -- and is dramatically more likely to be recalled.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-sm w-full">
                  {[
                    {
                      notice: 'Bark with deep furrows',
                      reminds: 'A topographic map of mountains',
                    },
                    {
                      notice: 'Spider web with dew',
                      reminds: 'A chandelier I saw in a museum',
                    },
                    {
                      notice: 'Mushroom gills radiating',
                      reminds: 'Pages of an open book',
                    },
                  ].map((pair, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 bg-surface rounded-calm p-2 border border-line-soft"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <span className="text-[10px] font-ui text-ink-tertiary flex-1">
                        {pair.notice}
                      </span>
                      <span style={{ color: '#B89466' }} className="text-xs">
                        &rarr;
                      </span>
                      <span
                        className="text-[10px] font-ui flex-1"
                        style={{ color: '#4F7A5A' }}
                      >
                        {pair.reminds}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Examples of "It reminds me of" in action. Each connection is a bridge between the new and the known -- and bridges strengthen both sides.',
          },
        ]}
      />

      {/* Research paragraph: Elaborative encoding */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Craik and Tulving's classic 1975 study demonstrated that elaborative
          encoding -- connecting new information to existing knowledge --
          produces significantly stronger memories than rote repetition. The
          "It reminds me of" prompt is essentially an elaborative encoding
          exercise embedded in field practice. By linking an observation to
          something personally meaningful, you engage both semantic memory
          (conceptual knowledge) and episodic memory (personal experience),
          creating a richer, more durable trace.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          In trauma-informed practice, this prompt also serves a grounding
          function. Connecting the present observation to a safe, neutral, or
          pleasant memory creates an associative bridge that anchors the
          observer in the present moment. It is not about avoiding difficult
          associations -- it is about building a rich web of connections that
          gives the mind many places to land.
        </p>
      </section>

      {/* ---- BRANCH SCENARIO ---- */}
      <BranchScenario
        id="reminds-me-branches"
        scenario="You notice a pattern of cracks in dried mud near a stream. The cracks form irregular polygons."
        branches={[
          {
            label: 'It reminds me of a giraffe pattern',
            feedback:
              'Good -- you are using visual analogy. This cross-domain connection anchors the observation in a familiar image and encodes it more deeply.',
          },
          {
            label: 'It reminds me of fractured pottery I saw in a museum',
            feedback:
              'Excellent -- you are linking to a specific episodic memory. The personal experience strengthens the retrieval path even further.',
          },
          {
            label: 'I cannot think of anything it reminds me of',
            feedback:
              'That is honest and fine. Try zooming in on one detail -- the shape of a single polygon, the width of a crack. Sometimes the connection emerges from a smaller focus.',
          },
        ]}
      />

      {/* ---- PROMPT ---- */}
      <Prompt
        id="reminds-me-practice"
        question="Choose something you observed in the earlier lessons. Complete: 'It reminds me of ______ because ______.' Try to connect to a personal experience, not just a category."
        placeholder="It reminds me of..."
        onSave={savePromptAnswer}
      />

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt:
              'Why does "It reminds me of" strengthen memory encoding?',
            options: [
              {
                id: 'a',
                label: 'It creates multiple retrieval paths to the observation',
                correct: true,
              },
              {
                id: 'b',
                label: 'It helps you name things faster',
                correct: false,
              },
              {
                id: 'c',
                label: 'It replaces the need for spaced repetition',
                correct: false,
              },
            ],
          },
          {
            prompt: 'Analogical thinking works by:',
            options: [
              {
                id: 'a',
                label: 'Finding surface similarities between things',
                correct: false,
              },
              {
                id: 'b',
                label: 'Aligning structural relationships across different domains',
                correct: true,
              },
              {
                id: 'c',
                label: 'Memorizing category labels more efficiently',
                correct: false,
              },
            ],
          },
        ]}
      />

      {/* ---- FEYNMAN CHECK ---- */}
      <FeynmanCheck
        id="naturalist-l3-feynman"
        prompt="Explain why saying 'this bark pattern reminds me of a river delta' is not just poetic -- it is a memory strategy."
        rubric={[
          'You named the mechanism: multiple retrieval paths or elaborative encoding.',
          'You distinguished structural analogy from surface similarity.',
          'You connected it to how the brain encodes and retrieves.',
          'The explanation was clear enough for a non-specialist.',
        ]}
      />

      {/* ---- REFLECTION ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="What did you discover about how your mind makes connections? Were some connections surprising? Did any feel grounding or settling?"
          lessonId="observation.naturalist-journaling.it-reminds-me"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 4 &middot; Naturalist Journaling
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Field Journal
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
