import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
  ObservationScene,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 3 -- Describing Experience
 * The phenomenological discipline of description:
 * languaging what appears without explaining it.
 */

export default function Lesson3_DescribingExperience({
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
          Describing Experience
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Finding language for what appears without explaining why.
        </p>
      </header>

      {/* Research paragraph: Description vs explanation */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          After bracketing assumptions and suspending judgment, the next
          step in phenomenological method is description -- articulating
          what you experience in language that stays close to the
          experience itself. This is surprisingly difficult. Our language
          is saturated with causal explanations, evaluative judgments, and
          theoretical terms. Saying "the sunset is beautiful" is an
          evaluation. Saying "the lower sky shifts from amber to deep
          violet, and the clouds catch light on their undersides" is a
          description. The first tells you about the speaker's judgment.
          The second tells you about the sunset.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Amedeo Giorgi (2009), who developed descriptive phenomenological
          psychology, insists that description must be faithful to the
          phenomenon as it gives itself, using language that points back
          to the experience rather than away from it into theory. This
          discipline of description has a cognitive benefit: it forces
          deeper processing. To describe something accurately, you must
          attend to it more closely than you would if you simply labeled
          it. The effort of finding the right words is itself an act of
          seeing.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Levels of Description ---- */}
      <VisualStepExplainer
        title="From labeling to describing"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="space-y-3 w-full max-w-sm">
                  {[
                    {
                      level: 'Label',
                      example: '"A tree"',
                      depth: 10,
                      color: '#B89466',
                    },
                    {
                      level: 'Evaluation',
                      example: '"A beautiful tree"',
                      depth: 20,
                      color: '#B89466',
                    },
                    {
                      level: 'General description',
                      example: '"A tall tree with spreading branches"',
                      depth: 45,
                      color: '#5B6F8C',
                    },
                    {
                      level: 'Specific description',
                      example: '"Trunk leans 15 degrees left; bark darker on the north side; three main branches diverge at roughly equal angles"',
                      depth: 75,
                      color: '#4F7A5A',
                    },
                    {
                      level: 'Experiential description',
                      example: '"The canopy creates a dappled light that shifts as the wind moves; my eye follows the trunk upward and loses the edge where leaves dissolve into sky"',
                      depth: 95,
                      color: '#4F7A5A',
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.level}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <div className="w-20 flex-shrink-0">
                        <div className="h-2 bg-line-soft rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: item.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.depth}%` }}
                            transition={{ delay: i * 0.15 + 0.2, duration: 0.4 }}
                          />
                        </div>
                        <p
                          className="text-[9px] font-ui mt-1"
                          style={{ color: item.color }}
                        >
                          {item.level}
                        </p>
                      </div>
                      <p className="text-[10px] font-ui text-ink-secondary flex-1">
                        {item.example}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Five levels of engagement with the same subject. Each level requires more attention and produces richer encoding. Most people stay in the first two.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-4 max-w-sm w-full">
                  <div className="bg-surface rounded-calm p-3 border border-line-soft">
                    <p
                      className="text-xs font-ui font-medium mb-2"
                      style={{ color: '#B89466' }}
                    >
                      Explains away
                    </p>
                    <p className="text-[10px] font-ui text-ink-secondary">
                      "The shadow falls there because the sun is at 45 degrees"
                    </p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border-2" style={{ borderColor: '#4F7A5A' }}>
                    <p
                      className="text-xs font-ui font-medium mb-2"
                      style={{ color: '#4F7A5A' }}
                    >
                      Describes faithfully
                    </p>
                    <p className="text-[10px] font-ui text-ink-secondary">
                      "The shadow stretches long and thin to the left, darker near the base, dissolving at the edges"
                    </p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Explanation tells you why. Description tells you what. Both have value, but description forces you to stay with the experience longer.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-4 gap-3 max-w-sm w-full">
                  {[
                    { sense: 'Sight', cue: 'shape, color, movement' },
                    { sense: 'Touch', cue: 'texture, weight, temperature' },
                    { sense: 'Sound', cue: 'pitch, rhythm, direction' },
                    { sense: 'Smell', cue: 'intensity, quality, memory' },
                  ].map((s, i) => (
                    <motion.div
                      key={s.sense}
                      className="bg-surface rounded-calm p-2 border border-line-soft text-center"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.12 }}
                    >
                      <p
                        className="text-[10px] font-ui font-medium"
                        style={{ color: '#5B6F8C' }}
                      >
                        {s.sense}
                      </p>
                      <p className="text-[8px] font-ui text-ink-tertiary mt-1">
                        {s.cue}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <p className="text-[10px] font-ui text-ink-tertiary text-center">
                  Use multiple sense channels to anchor description
                </p>
              </div>
            ),
            caption:
              'Phenomenological description draws on all available senses, not just vision. Each sense channel adds another dimension of experience to articulate.',
          },
        ]}
      />

      {/* Research paragraph: Language and perception */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The Sapir-Whorf hypothesis, in its moderate form, suggests that
          language influences perception -- that having precise words for
          something helps you notice and remember it. Roberson, Davies and
          Davidoff (2000) demonstrated that people are better at
          distinguishing colors for which their language has distinct terms.
          The same principle applies to phenomenological description: the
          act of finding precise language for an experience sharpens the
          perception of that experience. You see more because you have
          committed to describing more.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This has a grounding application for trauma-informed work.
          Research by Pennebaker (1997) on expressive writing shows that
          articulating difficult experiences in specific, concrete language
          -- as opposed to vague or abstract terms -- correlates with
          better psychological outcomes. Phenomenological description is
          inherently specific and concrete. It trains you to translate
          experience into words that stay close to what happened, which can
          itself be a form of processing.
        </p>
      </section>

      {/* ---- OBSERVATION SCENE ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Practice: Describe, Do Not Explain
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Look at the scene and describe what you experience. Stay with
          sensory language. Resist the pull toward explanation.
        </p>
        <ObservationScene
          scene="textured-wall"
          mode="describe"
          promptText="I see... I feel... I hear..."
        />
      </section>

      {/* ---- PROMPT ---- */}
      <Prompt
        id="describe-experience-prompt"
        question="Choose a sensation you are having right now (the temperature of your hands, the sound in the room, the texture of what you are sitting on). Describe it in three sentences using only sensory language. No labels, no evaluations, no explanations."
        placeholder="I experience..."
        onSave={savePromptAnswer}
      />

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Which of these is a phenomenological description?',
            options: [
              {
                id: 'a',
                label: '"The room is depressing"',
                correct: false,
              },
              {
                id: 'b',
                label: '"The walls are grey-blue, the light comes from a single window on the left, and the air feels still"',
                correct: true,
              },
              {
                id: 'c',
                label: '"The room needs better lighting because it lacks natural light"',
                correct: false,
              },
            ],
          },
          {
            prompt: 'Why does precise description sharpen perception?',
            options: [
              {
                id: 'a',
                label: 'Finding words for experience forces you to attend more closely to it',
                correct: true,
              },
              {
                id: 'b',
                label: 'Language has no relationship to perception',
                correct: false,
              },
              {
                id: 'c',
                label: 'Description replaces the need to actually look',
                correct: false,
              },
            ],
          },
        ]}
      />

      {/* ---- FEYNMAN CHECK ---- */}
      <FeynmanCheck
        id="bracket-l3-feynman"
        prompt="Explain to someone why saying 'the sunset is beautiful' tells you nothing about the sunset and everything about the speaker. Then describe the same sunset phenomenologically."
        rubric={[
          'You distinguished evaluation from description clearly.',
          'You provided a concrete descriptive alternative.',
          'You connected descriptive precision to deeper seeing.',
          'Your example would make the person want to try describing things differently.',
        ]}
      />

      {/* ---- REFLECTION ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="What did you notice about the difficulty of staying with description? Where did your mind want to jump to explanation or evaluation? What happens when you stay with the sensory details?"
          lessonId="observation.phenomenological-bracketing.describing-experience"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 4 &middot; Phenomenological Bracketing
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Integration
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
