import { useState } from 'react'
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
 * Lesson 1 -- Pure Contour Drawing
 * Betty Edwards' Drawing on the Right Side of the Brain:
 * blind contour drawing as an observation training technique.
 * L-mode vs R-mode processing.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

/* ── Animated hand contour SVG that draws itself ── */
function HandContourAnimation() {
  const handPath = 'M60,180 C60,160 50,140 45,120 C40,100 50,85 55,75 C58,68 55,55 60,45 C65,35 75,30 80,40 C85,50 80,65 82,70 C84,60 88,40 92,30 C96,20 108,18 110,28 C112,38 108,58 107,68 C110,55 115,35 120,25 C125,15 138,18 138,28 C138,38 132,58 128,70 C132,55 138,40 143,32 C148,24 158,28 156,40 C154,52 146,72 140,85 C150,78 160,75 165,80 C170,85 168,95 160,100 C152,105 135,108 120,115 C110,120 100,140 90,160 C85,170 75,180 60,180'

  return (
    <div className="bg-surface rounded-gentle p-6 border border-line-soft">
      <p className="text-xs font-ui text-ink-tertiary text-center mb-4">
        Watch the contour line trace the edge slowly, without lifting.
      </p>
      <svg viewBox="0 0 220 200" width="100%" className="max-w-xs mx-auto">
        {/* faint guide shape */}
        <path d={handPath} fill="none" stroke={SLATE} strokeWidth="0.5" opacity={0.1} />
        {/* animated drawing line */}
        <motion.path
          d={handPath}
          fill="none"
          stroke={SAGE}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 8, ease: 'linear', repeat: Infinity, repeatDelay: 2 }}
        />
        {/* moving pen tip indicator */}
        <motion.circle
          cx="60" cy="180" r="3"
          fill={AMBER}
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 8, ease: 'linear', repeat: Infinity, repeatDelay: 2 }}
          style={{ offsetPath: `path("${handPath}")` }}
        />
      </svg>
      <p className="text-xs font-ui text-ink-tertiary text-center mt-2">
        In pure contour drawing, you never look at your paper -- only at the subject.
      </p>
    </div>
  )
}

/* ── L-mode vs R-mode brain diagram ── */
function BrainModes() {
  return (
    <svg viewBox="0 0 260 120" width="100%" className="max-w-xs mx-auto">
      {/* brain outline */}
      <ellipse cx="80" cy="60" rx="60" ry="50" fill={AMBER} fillOpacity={0.06} stroke={AMBER} strokeWidth="1.5" />
      <ellipse cx="180" cy="60" rx="60" ry="50" fill={SAGE} fillOpacity={0.06} stroke={SAGE} strokeWidth="1.5" />
      {/* divider */}
      <line x1="130" y1="15" x2="130" y2="105" stroke={SLATE} strokeWidth="1" strokeDasharray="4 3" opacity={0.3} />
      {/* labels */}
      <text x="80" y="40" textAnchor="middle" fontSize="10" fill={AMBER} fontWeight="600">L-mode</text>
      <text x="80" y="55" textAnchor="middle" fontSize="7" fill={AMBER} opacity={0.7}>Labels, names</text>
      <text x="80" y="65" textAnchor="middle" fontSize="7" fill={AMBER} opacity={0.7}>Symbols, shortcuts</text>
      <text x="80" y="75" textAnchor="middle" fontSize="7" fill={AMBER} opacity={0.7}>"I know what a hand</text>
      <text x="80" y="84" textAnchor="middle" fontSize="7" fill={AMBER} opacity={0.7}>looks like"</text>
      <text x="180" y="40" textAnchor="middle" fontSize="10" fill={SAGE} fontWeight="600">R-mode</text>
      <text x="180" y="55" textAnchor="middle" fontSize="7" fill={SAGE} opacity={0.7}>Edges, relationships</text>
      <text x="180" y="65" textAnchor="middle" fontSize="7" fill={SAGE} opacity={0.7}>Actual contours</text>
      <text x="180" y="75" textAnchor="middle" fontSize="7" fill={SAGE} opacity={0.7}>"I see this exact</text>
      <text x="180" y="84" textAnchor="middle" fontSize="7" fill={SAGE} opacity={0.7}>edge curving here"</text>
    </svg>
  )
}

export default function Lesson1_PureContour({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ── TITLE ── */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Pure Contour Drawing
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Teaching your eyes to see edges, not symbols.
        </p>
      </header>

      {/* ── Research: Betty Edwards ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In 1979, Betty Edwards published Drawing on the Right Side of the Brain, a book that reframed drawing as a perceptual skill rather than a motor talent. Edwards argued that most people cannot draw well not because their hands lack coordination, but because their brains substitute symbols for perception. When asked to draw a hand, most people draw their idea of a hand -- five fingers radiating from a palm -- rather than the actual contours, shadows, and proportions of the hand in front of them.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Edwards drew on research by Roger Sperry (Nobel Prize, 1981) on hemispheric specialization to propose a model she called "L-mode" and "R-mode" processing. L-mode (left-hemisphere-dominant) processes information through language, symbols, and categories. R-mode (right-hemisphere-dominant) processes information through spatial relationships, contours, and direct perception. Drawing requires R-mode. But L-mode is the brain's default for most tasks, and it actively interferes with accurate observation by substituting known symbols for raw visual input.
        </p>
      </section>

      {/* ── VISUAL: animated contour drawing ── */}
      <section className="my-10">
        <HandContourAnimation />
      </section>

      {/* ── Research: blind contour drawing ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Edwards' signature exercise is blind contour drawing (which she called "pure contour drawing"). The rules are simple: look only at the subject, never at your paper, and draw very slowly, tracing the edge of what you see with your pen as your eyes trace the edge of the subject. The resulting drawing looks terrible. That is the point. The exercise is not about producing a good drawing -- it is about forcing a cognitive shift from L-mode to R-mode.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          When L-mode cannot check the drawing (because you are not looking at it), it becomes frustrated and disengages. What remains is R-mode: slow, patient, edge-following perception. Students consistently report a distinct subjective shift during the exercise -- time seems to slow, verbal thought quiets, and they become intensely absorbed in the visual detail of what they are looking at. Edwards calls this "the cognitive shift," and it is the perceptual state in which observation is most accurate.
        </p>
      </section>

      {/* ── VISUAL: L-mode vs R-mode ── */}
      <section className="my-10">
        <div className="bg-surface rounded-gentle p-6 border border-line-soft">
          <h3 className="font-ui text-ink-primary text-sm font-semibold text-center mb-4">
            Two modes of seeing
          </h3>
          <BrainModes />
        </div>
      </section>

      {/* ── VISUAL STEP EXPLAINER ── */}
      <VisualStepExplainer
        title="Why pure contour drawing works"
        steps={[
          {
            visual: (
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <svg viewBox="0 0 60 80" width="60">
                    {/* symbol hand -- childlike */}
                    <circle cx="30" cy="50" r="15" fill={AMBER} fillOpacity={0.1} stroke={AMBER} strokeWidth="1.5" />
                    {[0, 1, 2, 3, 4].map((i) => {
                      const angle = (-90 + i * 36) * (Math.PI / 180)
                      return (
                        <line key={i}
                          x1={30 + 15 * Math.cos(angle)} y1={50 + 15 * Math.sin(angle)}
                          x2={30 + 28 * Math.cos(angle)} y2={50 + 28 * Math.sin(angle)}
                          stroke={AMBER} strokeWidth="2" strokeLinecap="round"
                        />
                      )
                    })}
                  </svg>
                  <p className="text-[10px] font-ui mt-1" style={{ color: AMBER }}>L-mode symbol</p>
                </div>
                <div className="text-center">
                  <svg viewBox="0 0 60 80" width="60">
                    <path
                      d="M20,65 C20,55 18,45 22,35 C25,28 30,22 33,30 C35,25 38,18 42,25 C44,30 42,38 40,42 C43,35 47,28 48,35 C49,42 44,50 40,55 C45,52 48,55 46,60 C44,65 35,65 30,65 Z"
                      fill="none" stroke={SAGE} strokeWidth="1.5"
                    />
                  </svg>
                  <p className="text-[10px] font-ui mt-1" style={{ color: SAGE }}>R-mode contour</p>
                </div>
              </div>
            ),
            caption: 'L-mode draws a symbol: "hand = circle + lines." R-mode traces actual edges. The difference is the difference between knowing and seeing.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: AMBER }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="text-[10px] font-ui" style={{ color: AMBER }}>L</span>
                  </motion.div>
                  <span className="text-xs text-ink-tertiary font-ui">frustrates</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M2 10H16M16 10L11 5M16 10L11 15" stroke={SLATE} strokeWidth="1.5" />
                  </svg>
                  <motion.div
                    className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: SAGE }}
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-[10px] font-ui font-bold" style={{ color: SAGE }}>R</span>
                  </motion.div>
                </div>
              </div>
            ),
            caption: 'When you do not look at your paper, L-mode cannot check the drawing. It disengages. R-mode -- slow, spatial, edge-following -- takes over.',
          },
          {
            visual: (
              <div className="bg-elevated rounded-calm p-4 border border-line-soft text-center">
                <p className="text-xs font-ui text-ink-tertiary mb-2">THE COGNITIVE SHIFT</p>
                <div className="flex items-center justify-center gap-3">
                  {['Time slows', 'Verbal thought quiets', 'Edges sharpen'].map((item) => (
                    <span key={item} className="text-[10px] font-ui px-2 py-1 rounded-full border" style={{ borderColor: SAGE, color: SAGE }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ),
            caption: 'Students describe a distinct subjective shift: time dilates, inner narration fades, and visual perception becomes unusually vivid. This is R-mode.',
          },
        ]}
      />

      {/* ── Practice ── */}
      <section className="my-10">
        <Prompt
          id="observation.drawing-as-observation.pure-contour-practice"
          question="Try a 3-minute blind contour drawing now. Pick any object near you (your hand, a cup, a shoe). Look only at the object. Draw very slowly without looking at your paper. When done, describe the experience: what did it feel like? What did you notice about the object that you had not noticed before?"
          placeholder="I drew: ...\nThe experience felt: ...\nI noticed: ..."
          onSave={savePromptAnswer}
        />
      </section>

      {/* ── QUIZ ── */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'According to Betty Edwards, why can\'t most people draw well?',
            options: [
              { id: 'motor', label: 'Their hands lack fine motor control', correct: false },
              { id: 'symbol', label: 'Their brains substitute symbols for actual perception', correct: true },
              { id: 'talent', label: 'Drawing is an innate talent that most people lack', correct: false },
            ],
          },
          {
            prompt: 'What is the purpose of not looking at your paper during pure contour drawing?',
            options: [
              { id: 'hard', label: 'To make the exercise more challenging', correct: false },
              { id: 'lmode', label: 'To disengage L-mode so R-mode can take over', correct: true },
              { id: 'focus', label: 'To improve hand-eye coordination', correct: false },
            ],
          },
          {
            prompt: 'The "cognitive shift" Edwards describes involves:',
            options: [
              { id: 'fast', label: 'Faster, more efficient visual processing', correct: false },
              { id: 'slow', label: 'Slower perception, quieted verbal thought, heightened edge awareness', correct: true },
              { id: 'both', label: 'Simultaneous L-mode and R-mode activation', correct: false },
            ],
          },
        ]}
      />

      {/* ── FeynmanCheck ── */}
      <FeynmanCheck
        id="observation.drawing-as-observation.pure-contour-feynman"
        prompt="Explain to a friend why drawing exercises can improve observation, even if the drawings themselves look terrible."
        rubric={[
          'You distinguished between drawing as art and drawing as perception training.',
          'You explained L-mode vs R-mode (or symbol vs contour processing).',
          'You described why not looking at the paper matters.',
          'You made clear that the goal is seeing, not drawing quality.',
        ]}
      />

      {/* ── ReflectionJournal ── */}
      <section className="my-10">
        <ReflectionJournal
          prompt="If you tried the blind contour exercise, what was it like? Did you feel the cognitive shift Edwards describes? If not, what got in the way? There is no wrong answer."
          lessonId="observation.drawing-as-observation.pure-contour"
          onSave={addJournalEntry}
        />
      </section>

      {/* ── Footer ── */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 4 &middot; Drawing as Observation
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Negative Space
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
