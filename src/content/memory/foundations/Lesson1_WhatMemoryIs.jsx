import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  AnimatedBrain,
  NeuronAnimation,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 1 -- What Memory Actually Is
 * VISUAL + RESEARCH REWRITE: visual illustrations interspersed with
 * research-backed text paragraphs for deeper understanding.
 */

export default function Lesson1_WhatMemoryIs({
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
          What Memory Actually Is
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Not a filing cabinet. A living, three-stage process.
        </p>
      </header>

      {/* Research paragraph: Atkinson-Shiffrin model */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          For most of the twentieth century, scientists debated what memory actually is. In 1968, Richard Atkinson and Richard Shiffrin proposed a model that still frames how researchers think about it: memory is not a single event but a chain of three stages -- encoding, consolidation, and retrieval. Information enters through the senses, gets processed by the hippocampus into a fragile trace, and only becomes durable if the brain has time and the right conditions to stabilize it.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This three-stage model matters for a practical reason: each stage can fail independently, and each responds to different strategies. Poor encoding can be fixed with deeper processing. Poor consolidation can be fixed with sleep and spacing. Poor retrieval can be fixed with practice. Understanding which stage is breaking down is the first step to fixing it.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: The Three Stages ---- */}
      <VisualStepExplainer
        title="Three stages, not one"
        steps={[
          {
            visual: (
              <AnimatedBrain activeStage="encoding" interactive={false} size="lg" />
            ),
            caption: 'Stage 1: ENCODING. Information enters the brain through the hippocampus. It converts experience into a memory trace.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4">
                <AnimatedBrain activeStage="encoding" interactive={false} size="md" />
                <div className="flex gap-4 text-center">
                  <div className="bg-surface rounded-calm p-3 border border-line-soft flex-1">
                    <p className="text-xs font-ui text-ink-tertiary mb-1">Shallow</p>
                    <div className="h-2 bg-line-soft rounded-full overflow-hidden">
                      <div className="h-full w-[20%] rounded-full" style={{ backgroundColor: '#B89466' }} />
                    </div>
                    <p className="text-[10px] text-ink-tertiary mt-1 font-ui">Reading passively</p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border border-line-soft flex-1">
                    <p className="text-xs font-ui text-ink-tertiary mb-1">Deep</p>
                    <div className="h-2 bg-line-soft rounded-full overflow-hidden">
                      <div className="h-full w-[85%] rounded-full" style={{ backgroundColor: '#4F7A5A' }} />
                    </div>
                    <p className="text-[10px] text-ink-tertiary mt-1 font-ui">Connecting, questioning</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'Not all encoding is equal. Passive reading creates a faint trace. Connecting ideas to what you know creates a strong one.',
          },
          {
            visual: (
              <AnimatedBrain activeStage="consolidation" interactive={false} size="lg" />
            ),
            caption: 'Stage 2: CONSOLIDATION. After encoding, the brain stabilizes the trace -- mostly during sleep. Waves pulse across the cortex, replaying what you learned.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3">
                <AnimatedBrain activeStage="consolidation" interactive={false} size="md" />
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <motion.div
                      className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#B89466' }}
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-xs font-ui font-bold" style={{ color: '#B89466' }}>1hr</span>
                    </motion.div>
                    <p className="text-[10px] text-ink-tertiary mt-1 font-ui">Cramming</p>
                    <p className="text-[10px] text-ink-tertiary font-ui">No consolidation</p>
                  </div>
                  <span className="text-ink-tertiary">vs</span>
                  <div className="text-center">
                    <motion.div
                      className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#4F7A5A' }}
                    >
                      <span className="text-xs font-ui font-bold" style={{ color: '#4F7A5A' }}>3d</span>
                    </motion.div>
                    <p className="text-[10px] text-ink-tertiary mt-1 font-ui">Spaced study</p>
                    <p className="text-[10px] text-ink-tertiary font-ui">Sleep in between</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'Cramming skips consolidation entirely. The trace never stabilizes. Spacing gives the brain time to finish its work.',
          },
          {
            visual: (
              <AnimatedBrain activeStage="retrieval" interactive={false} size="lg" />
            ),
            caption: 'Stage 3: RETRIEVAL. Bringing a memory back. Pathways light up from the prefrontal cortex to the hippocampus. Each successful retrieval strengthens the trace.',
          },
          {
            visual: (
              <NeuronAnimation mode="encoding" interactive={false} showLabels={true} />
            ),
            caption: 'During encoding, new neural connections form between neurons -- thin, fragile pathways.',
          },
          {
            visual: (
              <NeuronAnimation mode="retrieval" interactive={false} showLabels={true} />
            ),
            caption: 'During retrieval, those pathways are re-activated. Signals travel the same routes, reinforcing them.',
          },
          {
            visual: (
              <NeuronAnimation mode="strengthening" interactive={false} showLabels={true} />
            ),
            caption: 'Repeated retrieval makes connections thicker and stronger. New cross-connections form. This is how memory becomes durable.',
          },
        ]}
      />

      {/* ---- Short text bridge ---- */}
      <p className="font-reading text-ink-secondary text-center max-w-lg mx-auto my-6 leading-relaxed">
        Each stage can fail independently -- and each responds to different strategies.
        The techniques in this app target all three.
      </p>

      {/* Research paragraph: Hippocampus and encoding depth */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The hippocampus -- a curved structure deep in the temporal lobe -- acts as the brain's intake hub. Every new experience passes through it before becoming a lasting memory. Patients who have lost hippocampal function, like the famous case of Henry Molaison (known for decades as "H.M."), can hold a conversation perfectly but forget it minutes later. They can encode nothing new. The hippocampus is that essential.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          In 1972, Fergus Craik and Robert Lockhart showed that the depth at which you process information during encoding predicts how well you remember it -- better than how long you studied, how many times you repeated it, or even whether you intended to remember. Shallow processing (noticing the font of a word) produces almost no lasting trace. Deep processing (asking how a concept connects to what you already know) produces strong, durable memories. This finding, called the levels of processing framework, is one of the most replicated results in cognitive psychology.
        </p>
      </section>

      {/* ---- INTERACTIVE BRAIN ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-4">
          Explore the Brain
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-4">
          Click each region to see what it does
        </p>
        <AnimatedBrain interactive={true} size="lg" />
      </section>

      {/* Research paragraph: Retrieval practice effect */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In 2008, Jeffrey Karpicke published a striking finding: students who practiced retrieving information from memory retained dramatically more than students who spent the same time re-reading. The act of pulling a memory out -- even if it feels effortful and uncertain -- strengthens the trace in ways that passive review cannot. Neuroscientists now believe this happens because retrieval reactivates and reconsolidates the memory, essentially re-encoding it each time with stronger connections.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This has a counterintuitive implication: the best time to practice remembering something is when you are starting to forget it. If recall feels easy and automatic, the practice is not doing much work. If it feels like a stretch -- if you have to search for the answer -- that effort is precisely what strengthens the trace. The feeling of difficulty is not a sign that something is wrong. It is the mechanism doing its job.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 2: The Illusion of Competence ---- */}
      <VisualStepExplainer
        title="The Illusion of Competence"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-gentle border-2 flex items-center justify-center"
                      style={{ borderColor: '#B89466', backgroundColor: 'rgba(184, 148, 102, 0.08)' }}
                    >
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <rect x="6" y="4" width="24" height="28" rx="2" stroke="#B89466" strokeWidth="2" />
                        <line x1="10" y1="12" x2="26" y2="12" stroke="#B89466" strokeWidth="1.5" opacity="0.5" />
                        <line x1="10" y1="18" x2="26" y2="18" stroke="#B89466" strokeWidth="1.5" opacity="0.5" />
                        <line x1="10" y1="24" x2="20" y2="24" stroke="#B89466" strokeWidth="1.5" opacity="0.5" />
                      </svg>
                    </motion.div>
                    <p className="text-xs font-ui text-ink-tertiary mt-2">Re-reading</p>
                  </div>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
                      <path d="M0 10H25M25 10L18 4M25 10L18 16" stroke="var(--color-ink-tertiary)" strokeWidth="2" />
                    </svg>
                  </motion.div>
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-gentle border-2 flex items-center justify-center"
                      style={{ borderColor: '#B89466', backgroundColor: 'rgba(184, 148, 102, 0.08)' }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="font-ui text-sm" style={{ color: '#B89466' }}>
                        "I know this"
                      </span>
                    </motion.div>
                    <p className="text-xs font-ui text-accent-noticed mt-2 font-medium">Familiarity</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'Re-reading makes text feel familiar. Your brain reads familiarity as "I know this." But recognition is not retrieval.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-surface rounded-calm p-4 border border-line-soft text-center">
                    <p className="text-xs font-ui text-ink-tertiary mb-2">RECOGNITION</p>
                    <p className="text-sm font-ui text-ink-secondary">"Does this look familiar?"</p>
                    <div className="mt-2 flex items-center justify-center gap-1">
                      <span className="text-xs" style={{ color: '#B89466' }}>Easy</span>
                      <div className="h-1 w-16 bg-line-soft rounded-full overflow-hidden">
                        <div className="h-full w-[90%] rounded-full" style={{ backgroundColor: '#B89466' }} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface rounded-calm p-4 border border-line-soft text-center">
                    <p className="text-xs font-ui text-ink-tertiary mb-2">RETRIEVAL</p>
                    <p className="text-sm font-ui text-ink-secondary">"What do you know about X?"</p>
                    <div className="mt-2 flex items-center justify-center gap-1">
                      <span className="text-xs" style={{ color: '#4F7A5A' }}>Hard</span>
                      <div className="h-1 w-16 bg-line-soft rounded-full overflow-hidden">
                        <div className="h-full w-[30%] rounded-full" style={{ backgroundColor: '#4F7A5A' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption: 'Recognition is easy and misleading. Retrieval is hard and actually strengthens the trace. They feel opposite but only one builds memory.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-2 gap-8 w-full max-w-sm">
                  <div className="text-center">
                    <motion.div
                      className="h-24 rounded-calm border-2 flex items-center justify-center mb-2"
                      style={{ borderColor: '#B89466', backgroundColor: 'rgba(184,148,102,0.06)' }}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl font-bold" style={{ color: '#B89466' }}>35%</span>
                        <span className="text-[10px] font-ui text-ink-tertiary">retained</span>
                      </div>
                    </motion.div>
                    <p className="text-xs font-ui text-ink-secondary">Re-read 4x</p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="h-24 rounded-calm border-2 flex items-center justify-center mb-2"
                      style={{ borderColor: '#4F7A5A', backgroundColor: 'rgba(79,122,90,0.06)' }}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl font-bold" style={{ color: '#4F7A5A' }}>80%</span>
                        <span className="text-[10px] font-ui text-ink-tertiary">retained</span>
                      </div>
                    </motion.div>
                    <p className="text-xs font-ui text-ink-secondary">Retrieval practice</p>
                  </div>
                </div>
                <p className="text-[10px] font-ui text-ink-tertiary">Same material. Same time. One week later.</p>
              </div>
            ),
            caption: 'Karpicke & Roediger (2006): Students who practiced retrieval remembered 80%. Those who re-read remembered 35%. Same time spent.',
          },
        ]}
      />

      {/* Research paragraph: Illusion of fluency */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Psychologists call this the illusion of fluency -- and it is one of the most common reasons people overestimate how much they know. When you re-read a textbook chapter, the text feels familiar. Your eyes move smoothly. Nothing surprises you. Your brain reads this fluency as evidence that the material is "learned." But familiarity and actual recall are processed by different brain systems. You can recognize a face without being able to describe it. You can feel that a fact is known without being able to produce it on demand.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Elizabeth Loftus's research on memory distortion adds another layer: not only do we misjudge what we know, we sometimes reconstruct memories that feel vivid and certain but are partially or entirely wrong. Memory is not a recording. It is a reconstruction -- and each reconstruction is shaped by what we expect, what we have learned since, and what we want to be true. Recognizing this is not cause for alarm. It is the starting point for building memory strategies that actually work.
        </p>
      </section>

      {/* ---- VISUAL QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            visual: <AnimatedBrain activeStage="encoding" interactive={false} size="sm" />,
            prompt: 'Which memory stage is shown above?',
            options: [
              { id: 'enc', label: 'Encoding', correct: true },
              { id: 'con', label: 'Consolidation', correct: false },
              { id: 'ret', label: 'Retrieval', correct: false },
            ],
          },
          {
            visual: <AnimatedBrain activeStage="retrieval" interactive={false} size="sm" />,
            prompt: 'What is happening in this brain?',
            options: [
              { id: 'sleep', label: 'Sleeping', correct: false },
              { id: 'ret', label: 'Retrieving a memory', correct: true },
              { id: 'forget', label: 'Forgetting', correct: false },
            ],
          },
          {
            prompt: 'Which study method actually strengthens memory traces?',
            options: [
              { id: 'reread', label: 'Re-reading highlighted notes', correct: false },
              { id: 'retrieve', label: 'Closing the book and recalling from memory', correct: true },
              { id: 'copy', label: 'Copying notes word-for-word', correct: false },
            ],
          },
        ]}
      />

      {/* Research paragraph: Putting it together */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          Here is the picture so far: memory is a three-stage process, not a single act of willpower. The hippocampus encodes new information, sleep consolidates it, and retrieval practice strengthens it. Passive re-reading creates an illusion of learning without the substance. The strategies that actually work -- deep processing, spaced practice, active recall -- feel harder in the moment but produce dramatically better results. Everything that follows in this course builds on these foundations.
        </p>
      </section>

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="lesson1-feynman"
        prompt="In 90 seconds, explain to a smart 12-year-old why someone who only re-reads a textbook is unlikely to remember it well."
        rubric={[
          'You named at least one mechanism (retrieval practice, encoding effort).',
          'You used a concrete example, not just abstractions.',
          "You did not say 'because the brain works that way' as if it explained anything.",
          'A 12-year-old could repeat the gist back.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Has anything in this lesson reframed why your memory has felt unreliable? Write what's true for you, not what sounds right."
          lessonId="memory.foundations.what-is-memory"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 6 &middot; Foundations
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: The forgetting curve (and why it's good news)
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
