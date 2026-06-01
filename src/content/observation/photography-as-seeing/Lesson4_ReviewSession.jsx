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
 * Lesson 4 -- Review Session
 * Learning to review your own photographs as a second act of seeing.
 * Editing as attention, not vanity.
 */

export default function Lesson4_ReviewSession({
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
          Review Session
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Reviewing your images as a second, deeper act of seeing.
        </p>
      </header>

      {/* Research paragraph: Review as retrieval */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Most photographs are taken and never reviewed. In the age of
          unlimited storage, the act of reviewing -- deliberately looking
          back at what you captured -- has become rare. Yet the review is
          where the deepest learning happens. When you return to an image
          hours or days after taking it, you see it with fresh eyes. The
          emotional urgency of the moment has faded, and you can evaluate
          the image on its own terms: Did the frame capture what you
          intended? What did you include unconsciously? What is the light
          actually doing?
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          From a cognitive perspective, reviewing photographs is a form of
          retrieval practice (Karpicke & Blunt, 2011). The image serves as
          a cue that reactivates the original observation experience. But
          unlike passive re-reading, active review -- asking specific
          questions about what you see -- forces you to reconstruct the
          scene, strengthening the memory trace. The review session
          transforms a static image into a retrieval opportunity.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Review Protocol ---- */}
      <VisualStepExplainer
        title="A structured review session"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-3 items-center">
                  {[
                    { icon: 'First Pass', desc: 'Emotional response' },
                    { icon: 'Second Pass', desc: 'Compositional analysis' },
                    { icon: 'Third Pass', desc: 'What I learned' },
                  ].map((pass, i) => (
                    <motion.div
                      key={pass.icon}
                      className="bg-surface rounded-calm p-3 border border-line-soft text-center w-28"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <p
                        className="text-xs font-ui font-medium mb-1"
                        style={{ color: i === 2 ? '#4F7A5A' : '#5B6F8C' }}
                      >
                        {pass.icon}
                      </p>
                      <p className="text-[10px] text-ink-tertiary font-ui">
                        {pass.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Three passes through your images: first for gut response, second for compositional analysis, third for what each image teaches you about seeing.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-sm w-full">
                  {[
                    'What drew me to this subject?',
                    'Where does my eye go first?',
                    'What did I include that I did not intend?',
                    'What would I frame differently now?',
                    'What does this image teach me about how I see?',
                  ].map((q, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 bg-surface rounded-calm p-2 border border-line-soft"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span
                        className="text-xs font-ui font-bold w-5 text-center"
                        style={{ color: '#4F7A5A' }}
                      >
                        {i + 1}
                      </span>
                      <p className="text-[10px] font-ui text-ink-secondary">
                        {q}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Five questions for active review. Each one forces a different kind of attention -- emotional, compositional, reflective.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-4 max-w-sm w-full">
                  <div className="bg-surface rounded-calm p-3 border border-line-soft text-center">
                    <p
                      className="text-xs font-ui font-medium mb-1"
                      style={{ color: '#B89466' }}
                    >
                      Passive scroll
                    </p>
                    <div className="h-2 bg-line-soft rounded-full overflow-hidden">
                      <div
                        className="h-full w-[15%] rounded-full"
                        style={{ backgroundColor: '#B89466' }}
                      />
                    </div>
                    <p className="text-[10px] text-ink-tertiary mt-1 font-ui">
                      Minimal retrieval
                    </p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border border-line-soft text-center">
                    <p
                      className="text-xs font-ui font-medium mb-1"
                      style={{ color: '#4F7A5A' }}
                    >
                      Active review
                    </p>
                    <div className="h-2 bg-line-soft rounded-full overflow-hidden">
                      <div
                        className="h-full w-[80%] rounded-full"
                        style={{ backgroundColor: '#4F7A5A' }}
                      />
                    </div>
                    <p className="text-[10px] text-ink-tertiary mt-1 font-ui">
                      Strong retrieval + insight
                    </p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Passively scrolling through photos does almost nothing for learning. Structured review with questions creates genuine retrieval and insight.',
          },
        ]}
      />

      {/* Research paragraph: Metacognitive review */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The review session is also a metacognitive exercise -- thinking
          about your own thinking and seeing. Flavell (1979) introduced the
          concept of metacognition, and subsequent research has consistently
          shown that metacognitive awareness -- knowing what you know and
          what you do not -- is one of the strongest predictors of effective
          learning. When you ask "What does this image teach me about how I
          see?" you are not just evaluating the photograph. You are
          calibrating your own perceptual system.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This self-calibration is especially valuable because our perceptual
          biases are invisible to us in the moment. We all have habitual ways
          of framing, habitual subjects we gravitate toward, habitual aspects
          of light we notice or ignore. The review session makes these
          patterns visible. Over time, a collection of reviewed images
          becomes a mirror of your attentional habits -- showing you not
          just what you see, but how you see.
        </p>
      </section>

      {/* ---- BRANCH SCENARIO ---- */}
      <BranchScenario
        id="review-difficult"
        scenario="During review, you realize most of your photos are poorly framed. You feel discouraged."
        branches={[
          {
            label: 'I treat each poorly framed photo as data about my current habits',
            feedback:
              'Good. The gap between intention and result is information, not judgment. Each photo shows you where your attention was -- and where it was not.',
          },
          {
            label: 'I delete all the bad photos and start over',
            feedback:
              'Deleting removes the learning opportunity. Poor frames are your best teachers -- they show you exactly where your seeing can deepen.',
          },
          {
            label: 'I decide I am not good at photography',
            feedback:
              'Photography skill is not the point here. Seeing skill is. Every image -- including the ones you do not like -- is evidence of your current perception. That evidence is valuable.',
          },
        ]}
      />

      {/* ---- PROMPT ---- */}
      <Prompt
        id="review-session-prompt"
        question="Look at the last five photos on your phone. For each one, answer: (1) What drew me to this? (2) Where does my eye go first? (3) What would I change? Write brief notes for at least three of them."
        placeholder="Photo 1: What drew me..."
        onSave={savePromptAnswer}
      />

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why is reviewing photographs a form of retrieval practice?',
            options: [
              {
                id: 'a',
                label: 'The image cues reactivation of the original observation experience',
                correct: true,
              },
              {
                id: 'b',
                label: 'Looking at photos is the same as re-reading notes',
                correct: false,
              },
              {
                id: 'c',
                label: 'Photos contain all the information you need',
                correct: false,
              },
            ],
          },
          {
            prompt: 'What makes review metacognitive?',
            options: [
              {
                id: 'a',
                label: 'You think about what you see in the image',
                correct: false,
              },
              {
                id: 'b',
                label: 'You think about how you see and what patterns your seeing reveals',
                correct: true,
              },
              {
                id: 'c',
                label: 'You memorize technical photography terms',
                correct: false,
              },
            ],
          },
        ]}
      />

      {/* ---- FEYNMAN CHECK ---- */}
      <FeynmanCheck
        id="photo-l4-feynman"
        prompt="Explain to someone who never reviews their photos why spending 10 minutes reviewing five photos would teach them more about seeing than taking 50 new ones."
        rubric={[
          'You described review as retrieval, not passive scrolling.',
          'You mentioned metacognitive benefits -- learning about your own seeing patterns.',
          'You made the time investment feel worthwhile, not burdensome.',
          'You gave at least one specific review question they could use.',
        ]}
      />

      {/* ---- REFLECTION ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="What patterns did you notice in your recent photos? Do you gravitate toward certain subjects, angles, or kinds of light? What does your camera roll tell you about how you see?"
          lessonId="observation.photography-as-seeing.review-session"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 4 &middot; Photography as Seeing
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next module: Phenomenological Bracketing
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
