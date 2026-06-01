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
 * Lesson 2 -- Negative Space
 * Drawing what is NOT the object to bypass L-mode symbol systems.
 * Edwards' second major perceptual exercise.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

/* ── Chair with negative space highlighted ── */
function ChairNegativeSpace({ showNegative }) {
  return (
    <svg viewBox="0 0 200 220" width="100%" className="max-w-[200px] mx-auto">
      {/* background frame */}
      <rect x="20" y="10" width="160" height="200" rx="4" fill="#F0ECE6" stroke={SLATE} strokeWidth="0.5" />
      {/* negative space shapes -- visible when toggled */}
      {showNegative && (
        <g>
          <motion.path
            d="M55,50 L55,120 L75,120 L75,90 L90,90 L90,120 L110,120 L110,50 Z"
            fill={SAGE} fillOpacity={0.15} stroke={SAGE} strokeWidth="1"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          />
          <motion.path
            d="M55,130 L75,130 L75,120 L90,120 L90,130 L110,130 L110,190 L55,190 Z"
            fill={SAGE} fillOpacity={0.1} stroke={SAGE} strokeWidth="1" strokeDasharray="3 2"
            initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}
          />
          <motion.path
            d="M120,50 L120,190 L160,190 L160,50 Z"
            fill={SAGE} fillOpacity={0.08} stroke={SAGE} strokeWidth="0.5" strokeDasharray="2 3"
            initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 } }}
          />
          <motion.path
            d="M20,10 L55,10 L55,50 L20,50 Z"
            fill={SAGE} fillOpacity={0.08} stroke={SAGE} strokeWidth="0.5" strokeDasharray="2 3"
            initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}
          />
        </g>
      )}
      {/* chair outline */}
      <path
        d="M55,50 L55,190 M110,50 L110,190 M55,50 L110,50 M55,120 L110,120 M75,120 L75,190 M90,120 L90,190 M55,90 L110,90"
        fill="none" stroke={SLATE} strokeWidth={showNegative ? 1.5 : 2} strokeLinecap="round"
      />
    </svg>
  )
}

export default function Lesson2_NegativeSpace({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  const [showNegative, setShowNegative] = useState(false)

  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ── TITLE ── */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Negative Space
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Drawing what is NOT the object to see what IS.
        </p>
      </header>

      {/* ── Research: negative space and L-mode bypass ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Betty Edwards' second major perceptual technique targets the same problem from a different angle. In pure contour drawing, you bypass L-mode by not looking at your paper. In negative-space drawing, you bypass it by not drawing the object at all. Instead, you draw the shapes of the empty space around and between the parts of the object. These shapes have no names, no symbols, no pre-existing mental template -- L-mode literally has nothing to substitute, so it stays out of the way.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The concept of negative space comes from Gestalt psychology, particularly the figure-ground relationship described by Edgar Rubin in 1915. In any visual scene, the brain automatically separates what it considers the "figure" (the object of interest) from the "ground" (everything else). We attend to figures and ignore ground. Negative-space drawing reverses this: you attend to the ground, and the figure emerges as a by-product. The results are often startlingly accurate -- more so than when people try to draw the object directly.
        </p>
      </section>

      {/* ── VISUAL: Chair with negative space ── */}
      <section className="my-10">
        <div className="bg-surface rounded-gentle p-6 border border-line-soft">
          <div className="flex justify-center gap-3 mb-4">
            <button
              onClick={() => setShowNegative(false)}
              className={`btn text-sm ${!showNegative ? 'btn-primary' : 'btn-ghost'}`}
            >
              Object only
            </button>
            <button
              onClick={() => setShowNegative(true)}
              className={`btn text-sm ${showNegative ? 'btn-primary' : 'btn-ghost'}`}
            >
              Show negative space
            </button>
          </div>
          <ChairNegativeSpace showNegative={showNegative} />
          <p className="text-xs font-ui text-ink-tertiary text-center mt-4">
            {showNegative
              ? 'The green shapes are negative space -- the spaces around and between the chair\'s parts. They have no name, so L-mode cannot substitute a symbol.'
              : 'A simple chair. Your brain sees "chair" and stops looking. Toggle negative space to see what you are missing.'}
          </p>
        </div>
      </section>

      {/* ── Research: figure-ground and perception ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The figure-ground phenomenon is so fundamental that it operates pre-attentively -- before conscious awareness gets involved. Rubin's famous vase/faces illusion demonstrates that the same visual input can be organized as two different figures depending on which part the brain assigns as "ground." This is not a parlour trick. It reveals that perception is an act of construction, not passive reception. What you see as the object and what you see as the background is a decision your brain makes -- and it can be redirected.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          For observation training, the practical insight is this: if you can only see the figure, you are seeing less than half of the visual information in the scene. The ground -- the spaces between, around, and behind objects -- contains its own shapes, proportions, and relationships. Architects, photographers, and graphic designers are trained to see negative space as a matter of professional necessity. Edwards' contribution was showing that anyone can develop this skill, and that it dramatically improves observational accuracy.
        </p>
      </section>

      {/* ── VISUAL STEP EXPLAINER ── */}
      <VisualStepExplainer
        title="How negative space bypasses L-mode"
        steps={[
          {
            visual: (
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <svg viewBox="0 0 80 80" width="80">
                    <rect width="80" height="80" rx="4" fill="#F0ECE6" />
                    <circle cx="40" cy="40" r="20" fill={AMBER} fillOpacity={0.15} stroke={AMBER} strokeWidth="1.5" />
                    <text x="40" y="44" textAnchor="middle" fontSize="8" fill={AMBER}>"Cup"</text>
                  </svg>
                  <p className="text-[10px] font-ui mt-1" style={{ color: AMBER }}>L-mode: names it</p>
                </div>
                <div className="text-center">
                  <svg viewBox="0 0 80 80" width="80">
                    <rect width="80" height="80" rx="4" fill={SAGE} fillOpacity={0.08} stroke={SAGE} strokeWidth="1" />
                    <circle cx="40" cy="40" r="20" fill="#F0ECE6" stroke={SLATE} strokeWidth="0.5" />
                    <text x="15" y="20" fontSize="6" fill={SAGE}>shape</text>
                    <text x="55" y="75" fontSize="6" fill={SAGE}>shape</text>
                  </svg>
                  <p className="text-[10px] font-ui mt-1" style={{ color: SAGE }}>R-mode: sees shapes</p>
                </div>
              </div>
            ),
            caption: 'L-mode sees "cup" and stops processing. Negative-space drawing shifts attention to the nameless shapes around the cup. L-mode has no shortcut for these.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-2">
                <div className="grid grid-cols-2 gap-4 max-w-xs">
                  <div className="bg-elevated rounded-calm p-3 border border-line-soft text-center">
                    <p className="text-[10px] font-ui text-ink-tertiary">DIRECT DRAWING</p>
                    <p className="text-xs font-ui mt-1" style={{ color: AMBER }}>Proportions often wrong</p>
                    <p className="text-[10px] text-ink-tertiary mt-1">L-mode symbols override perception</p>
                  </div>
                  <div className="bg-elevated rounded-calm p-3 border border-line-soft text-center">
                    <p className="text-[10px] font-ui text-ink-tertiary">NEGATIVE SPACE</p>
                    <p className="text-xs font-ui mt-1" style={{ color: SAGE }}>Proportions often accurate</p>
                    <p className="text-[10px] text-ink-tertiary mt-1">No symbol to override with</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'Students who draw the negative space around a chair produce more accurate proportions than those who draw the chair directly. The absence of symbols makes room for perception.',
          },
        ]}
      />

      {/* ── Practice ── */}
      <section className="my-10">
        <Prompt
          id="observation.drawing-as-observation.negative-space-practice"
          question="Choose a simple object with interesting spaces (a chair, a plant, a pair of scissors). Instead of drawing the object, draw ONLY the shapes of the space around and between its parts. Spend 5 minutes. Then describe: what shapes did you discover that you had never noticed before?"
          placeholder="Object: ...\nShapes I found: ...\nWhat surprised me: ..."
          onSave={savePromptAnswer}
        />
      </section>

      {/* ── QUIZ ── */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Negative-space drawing bypasses L-mode because:',
            options: [
              { id: 'names', label: 'The spaces around objects have no names or pre-existing symbols', correct: true },
              { id: 'hard', label: 'It is simply more difficult, requiring more concentration', correct: false },
              { id: 'dark', label: 'Negative space is always darker than positive space', correct: false },
            ],
          },
          {
            prompt: 'The figure-ground relationship was first described by:',
            options: [
              { id: 'edwards', label: 'Betty Edwards', correct: false },
              { id: 'rubin', label: 'Edgar Rubin', correct: true },
              { id: 'sperry', label: 'Roger Sperry', correct: false },
            ],
          },
          {
            prompt: 'Why do negative-space drawings often have more accurate proportions than direct drawings?',
            options: [
              { id: 'motor', label: 'Because drawing empty space is easier for the hand', correct: false },
              { id: 'symbol', label: 'Because there are no stored symbols to distort perception of the shapes', correct: true },
              { id: 'simple', label: 'Because negative shapes are always simpler than objects', correct: false },
            ],
          },
        ]}
      />

      {/* ── FeynmanCheck ── */}
      <FeynmanCheck
        id="observation.drawing-as-observation.negative-space-feynman"
        prompt="Explain to a curious friend what negative space is and why drawing it produces more accurate results than drawing the object directly."
        rubric={[
          'You defined negative space clearly (the shapes around/between the object).',
          'You explained the figure-ground relationship.',
          'You connected it to L-mode bypass (no symbols for empty space).',
          'You gave a concrete example.',
        ]}
      />

      {/* ── ReflectionJournal ── */}
      <section className="my-10">
        <ReflectionJournal
          prompt="After learning about negative space, look around your current environment. What shapes do you notice between objects that you normally ignore? Does seeing negative space change how the room feels?"
          lessonId="observation.drawing-as-observation.negative-space"
          onSave={addJournalEntry}
        />
      </section>

      {/* ── Footer ── */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 4 &middot; Drawing as Observation
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Modified Contour Drawing
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
