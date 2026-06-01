import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  NeuronAnimation,
  SpacingEffectViz,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 4 -- Retrieval Practice: The Evidence and the Craft
 * VISUAL + RESEARCH REWRITE: visual illustrations interspersed with
 * research-backed text paragraphs for deeper understanding.
 */

export default function Lesson4_RetrievalPractice({
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
          Retrieval Practice
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Every time you pull a memory out, it goes back in stronger.
        </p>
      </header>

      {/* Research paragraph: The testing effect */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In 2006, Henry Roediger and Jeffrey Karpicke published a study that upended decades of assumptions about how to learn. They gave students prose passages to study. One group re-read the passages multiple times. Another group read once, then practiced retrieving what they could remember. When tested five minutes later, the re-reading group performed slightly better -- the material was still fresh. But when tested one week later, the retrieval group dramatically outperformed the re-readers, remembering more than twice as much.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This result, known as the testing effect, has been replicated hundreds of times across every kind of material -- vocabulary, science concepts, medical knowledge, historical facts, motor skills. The mechanism is not mysterious: when you attempt to retrieve a memory, you reactivate the neural pathways that encoded it, and each reactivation strengthens those pathways. Re-reading, by contrast, creates a feeling of familiarity without ever exercising the retrieval routes. It is the difference between watching someone else ride a bicycle and actually riding one yourself.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: The Testing Effect ---- */}
      <VisualStepExplainer
        title="The Experiment That Changed Everything"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
                  <motion.div
                    className="bg-surface rounded-calm p-4 border border-line-soft text-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: 'rgba(184, 148, 102, 0.15)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="4" y="3" width="16" height="18" rx="2" stroke="#B89466" strokeWidth="1.5" />
                        <path d="M8 8H16M8 12H16M8 16H12" stroke="#B89466" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <p className="text-xs font-ui font-medium text-ink-primary">Group A</p>
                    <p className="text-[10px] font-ui text-ink-tertiary">Re-read Swahili words 4 times</p>
                  </motion.div>
                  <motion.div
                    className="bg-surface rounded-calm p-4 border border-line-soft text-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: 'rgba(79, 122, 90, 0.15)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="#4F7A5A" strokeWidth="1.5" />
                        <path d="M12 8V12" stroke="#4F7A5A" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M9 15L12 12L15 15" stroke="#4F7A5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="text-xs font-ui font-medium text-ink-primary">Group B</p>
                    <p className="text-[10px] font-ui text-ink-tertiary">Tested on translations from memory</p>
                  </motion.div>
                </div>
                <p className="text-xs font-ui text-ink-tertiary">Same words. Same total time.</p>
              </div>
            ),
            caption: 'Karpicke & Roediger (2006): Two groups studied Swahili vocabulary. Same material, same total time. Only the method differed.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <p className="text-xs font-ui text-ink-tertiary uppercase tracking-wide">One Week Later</p>
                <div className="flex items-end gap-8" style={{ height: '180px' }}>
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="rounded-t-calm"
                      style={{ width: '80px', backgroundColor: '#B89466' }}
                      initial={{ height: 0 }}
                      animate={{ height: 63 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      <span className="block text-center text-sm font-ui font-bold text-white pt-2">35%</span>
                    </motion.div>
                    <p className="text-xs font-ui text-ink-secondary mt-2">Re-reading</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="rounded-t-calm"
                      style={{ width: '80px', backgroundColor: '#4F7A5A' }}
                      initial={{ height: 0 }}
                      animate={{ height: 144 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      <span className="block text-center text-sm font-ui font-bold text-white pt-2">80%</span>
                    </motion.div>
                    <p className="text-xs font-ui text-ink-secondary mt-2">Retrieval</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'The retrieval group remembered more than double. Not because they tried harder -- because retrieval strengthens the trace in a way re-reading cannot.',
          },
          {
            visual: (
              <NeuronAnimation mode="encoding" interactive={false} showLabels={true} />
            ),
            caption: 'Re-reading: information flows in one direction. Neurons receive a signal but pathways are not exercised. It feels like learning, but the trace stays thin.',
          },
          {
            visual: (
              <NeuronAnimation mode="retrieval" interactive={false} showLabels={true} />
            ),
            caption: 'Retrieval: your brain travels the pathways from cue to trace, reconstructing the memory from partial information. Each trip strengthens the route.',
          },
          {
            visual: (
              <NeuronAnimation mode="strengthening" interactive={false} showLabels={true} />
            ),
            caption: 'Repeated retrieval: connections thicken. New cross-links form. The memory becomes part of a rich network, accessible from many directions.',
          },
        ]}
      />

      {/* Research paragraph: Desirable difficulties */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Robert Bjork, one of the most influential memory researchers of the past fifty years, coined the term "desirable difficulties" to describe a paradox at the heart of learning: conditions that make performance worse during practice often make learning better in the long run. Spacing is harder than massing. Retrieval is harder than re-reading. Interleaving topics is harder than blocking. In each case, the difficulty is the point -- it forces deeper processing and stronger encoding.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Bjork distinguishes between "storage strength" (how well something is encoded) and "retrieval strength" (how easily it comes to mind right now). Re-reading boosts retrieval strength temporarily -- the information feels accessible. But it does little for storage strength. Retrieval practice, especially when it feels effortful, builds storage strength directly. The feeling of struggle is not a sign that you are failing. It is a sign that your brain is doing the work that makes memories last.
        </p>
      </section>

      {/* ---- INTERACTIVE NEURONS ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Watch the Network Change
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Click each mode to see how neural connections evolve
        </p>
        <NeuronAnimation mode="idle" interactive={true} showLabels={true} />
      </section>

      {/* Research paragraph: Retrieval-induced forgetting and pretesting */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Retrieval practice has some surprising secondary effects. One is retrieval-induced forgetting: when you practice retrieving some items from a category, the unpracticed items in that same category can temporarily become harder to recall. This sounds alarming, but it is actually adaptive -- your brain is strengthening the pathways you use most and pruning the ones you do not, sharpening your mental organization over time.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Another remarkable finding is the pretesting effect. Attempting to answer a question before you have learned the material -- even when you get it completely wrong -- improves your retention of the correct answer when you encounter it later. The failed retrieval attempt creates a kind of cognitive scaffolding: your brain has already started searching for the answer, activated related knowledge, and identified gaps. When the correct information arrives, it slots into a prepared structure rather than landing on bare ground.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 2: Desirable Difficulty ---- */}
      <VisualStepExplainer
        title="Difficulty is the Point"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  <div className="rounded-calm p-4 border border-line-soft text-center">
                    <p className="text-xs font-ui text-ink-tertiary mb-2">FEELS DURING STUDY</p>
                    <div className="flex items-center gap-2 justify-center">
                      <div className="text-center">
                        <motion.div
                          className="w-10 h-10 rounded-full flex items-center justify-center border-2"
                          style={{ borderColor: '#B89466' }}
                        >
                          <span className="text-lg">😌</span>
                        </motion.div>
                        <p className="text-[9px] font-ui text-ink-tertiary mt-1">Smooth</p>
                      </div>
                      <div className="text-center">
                        <motion.div
                          className="w-10 h-10 rounded-full flex items-center justify-center border-2"
                          style={{ borderColor: '#4F7A5A' }}
                        >
                          <span className="text-lg">😤</span>
                        </motion.div>
                        <p className="text-[9px] font-ui text-ink-tertiary mt-1">Effortful</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-calm p-4 border border-line-soft text-center">
                    <p className="text-xs font-ui text-ink-tertiary mb-2">ACTUAL RETENTION</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-ui" style={{ color: '#B89466', width: '40px' }}>Smooth</span>
                        <div className="flex-1 h-2 bg-line-soft rounded-full overflow-hidden">
                          <div className="h-full w-[25%] rounded-full" style={{ backgroundColor: '#B89466' }} />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-ui" style={{ color: '#4F7A5A', width: '40px' }}>Effortful</span>
                        <div className="flex-1 h-2 bg-line-soft rounded-full overflow-hidden">
                          <div className="h-full w-[80%] rounded-full" style={{ backgroundColor: '#4F7A5A' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption: 'Robert Bjork calls this "desirable difficulty." If study feels smooth and easy, it is probably not working. The struggle IS the mechanism.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="relative w-full max-w-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-ui text-ink-tertiary">Performance during study</span>
                    <span className="text-[10px] font-ui text-ink-tertiary">Long-term learning</span>
                  </div>
                  <div className="flex gap-3">
                    <motion.div
                      className="flex-1 h-2 rounded-full overflow-hidden bg-line-soft"
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: '#B89466' }}
                        initial={{ width: '0%' }}
                        animate={{ width: '90%' }}
                        transition={{ duration: 1 }}
                      />
                    </motion.div>
                    <motion.div
                      className="flex-1 h-2 rounded-full overflow-hidden bg-line-soft"
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: '#B89466' }}
                        initial={{ width: '0%' }}
                        animate={{ width: '20%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </motion.div>
                  </div>
                  <p className="text-[9px] font-ui text-ink-tertiary text-center mt-1">Re-reading: high fluency now, poor retention later</p>

                  <div className="flex gap-3 mt-3">
                    <motion.div
                      className="flex-1 h-2 rounded-full overflow-hidden bg-line-soft"
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: '#4F7A5A' }}
                        initial={{ width: '0%' }}
                        animate={{ width: '40%' }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </motion.div>
                    <motion.div
                      className="flex-1 h-2 rounded-full overflow-hidden bg-line-soft"
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: '#4F7A5A' }}
                        initial={{ width: '0%' }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 1, delay: 0.8 }}
                      />
                    </motion.div>
                  </div>
                  <p className="text-[9px] font-ui text-ink-tertiary text-center mt-1">Retrieval: harder now, stronger later</p>
                </div>
              </div>
            ),
            caption: 'Performance during practice and actual learning can move in opposite directions. Trust the process, not the feeling.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <motion.div
                  className="bg-surface rounded-gentle p-5 border border-line-soft max-w-xs text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <p className="font-ui text-sm text-ink-primary mb-3 font-medium">
                    Even failed retrieval helps.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <motion.div
                      className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#B89466' }}
                    >
                      <span className="text-sm">❓</span>
                    </motion.div>
                    <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
                      <path d="M2 10H18M18 10L12 4M18 10L12 16" stroke="var(--color-ink-tertiary)" strokeWidth="1.5" />
                    </svg>
                    <motion.div
                      className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#4F7A5A' }}
                    >
                      <span className="text-sm">💡</span>
                    </motion.div>
                  </div>
                  <p className="text-[10px] font-ui text-ink-tertiary mt-2">
                    The search activates related pathways. The correction then lands more deeply.
                  </p>
                </motion.div>
              </div>
            ),
            caption: 'Blanking is not failure. The retrieval attempt activates pathways and primes the soil. The answer that follows will encode more deeply than if you never tried.',
          },
        ]}
      />

      {/* Research paragraph: Elaborative interrogation */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          One of the most accessible forms of retrieval practice is elaborative interrogation -- simply asking "why?" or "how?" about every fact you encounter. Instead of reading "Canada produces more hydroelectric power than any country except China and Brazil" and moving on, you pause and ask: why would that be true? The search for an explanation forces you to connect the new fact to existing knowledge (Canada has lots of rivers, elevation changes, abundant water), creating the kind of deep, multi-anchored encoding that lasts.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research consistently shows that elaborative interrogation improves retention by 30-70% compared to re-reading, with almost no additional time investment. It works because it transforms passive intake into active processing. You are no longer a recipient of information -- you are a detective, connecting clues. Every connection you forge is another pathway your brain can use to find that memory later. The more ways in, the harder it is to lose.
        </p>
      </section>

      {/* ---- VISUAL QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why does retrieval practice strengthen memory better than re-reading?',
            options: [
              { id: 'more', label: 'It takes more total time', correct: false },
              { id: 'rebuild', label: 'It forces the brain to reconstruct the trace from partial cues', correct: true },
              { id: 'fun', label: 'It is more enjoyable', correct: false },
            ],
          },
          {
            prompt: 'If studying feels smooth and easy, what does that suggest about retention?',
            options: [
              { id: 'good', label: 'You will remember it well', correct: false },
              { id: 'illusion', label: 'The feeling is likely misleading -- retention may be poor', correct: true },
              { id: 'done', label: 'You are done learning', correct: false },
            ],
          },
          {
            prompt: 'What happens when you try to retrieve something and fail?',
            options: [
              { id: 'waste', label: 'Nothing -- it was a wasted attempt', correct: false },
              { id: 'harm', label: 'It weakens the memory', correct: false },
              { id: 'prime', label: 'Related pathways activate, making the correction more effective', correct: true },
            ],
          },
        ]}
      />

      {/* Research paragraph: Bringing it together */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          The research on retrieval practice converges on a simple but powerful message: the act of remembering is itself a learning event. Every time you pull a memory out, it goes back in stronger. This is not a metaphor -- it is a description of what happens at the neural level. The strategies that feel hardest in the moment -- testing yourself, spacing your reviews, attempting answers before you know them -- are precisely the ones that build the most durable, flexible, and accessible memories. Trust the struggle. It is doing exactly what it is supposed to do.
        </p>
      </section>

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="lesson4-feynman"
        prompt="Explain to a friend who thinks they just 'have a bad memory' why their study method (re-reading and highlighting) might be the problem, not their brain."
        rubric={[
          'You explained why re-reading feels effective but isn\'t (the illusion of competence).',
          'You described retrieval practice as an alternative, not just "studying harder."',
          'You mentioned that difficulty during practice is a good sign, not a bad one.',
          'Your friend would feel encouraged, not criticized.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 6 &middot; Foundations
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Encoding depth -- why some things stick and others don't
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
