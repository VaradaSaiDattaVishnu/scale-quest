import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  EncodingDepthViz,
  NeuronAnimation,
  AnimatedBrain,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 5 -- Encoding Depth: Why Some Things Stick and Others Don't
 * VISUAL + RESEARCH REWRITE: visual illustrations interspersed with
 * research-backed text paragraphs for deeper understanding.
 */

export default function Lesson5_EncodingDepth({
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
          Encoding Depth
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The same information can be remembered or forgotten, depending on how you process it.
        </p>
      </header>

      {/* Research paragraph: Craik & Lockhart levels of processing */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In 1972, Fergus Craik and Robert Lockhart published a paper that transformed how researchers think about memory. Their levels of processing framework proposed a simple but radical idea: how well you remember something depends not on how long you studied it or how many times you repeated it, but on how deeply you processed it at the moment of encoding. Shallow processing -- noticing whether a word is in uppercase, or what it sounds like -- produces fleeting traces. Deep processing -- thinking about what a word means, how it connects to things you know, whether it applies to your own life -- produces memories that last.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          In their classic experiment, subjects were asked different questions about words. Some questions were shallow ("Is this word in capital letters?"), some phonetic ("Does this word rhyme with 'train'?"), and some semantic ("Would this word fit in the sentence 'He met a ____ on the street'?"). None of the subjects were told there would be a memory test. Yet on a surprise recall test, the pattern was striking: semantic processing produced nearly six times better recall than structural processing. The depth of processing at encoding predicted memory better than any other factor -- including whether people were trying to remember.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: Levels of Processing ---- */}
      <VisualStepExplainer
        title="Same Words, Different Fates"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="w-20 h-20 rounded-full bg-surface border border-line-soft flex items-center justify-center">
                      <span className="text-lg">👤</span>
                    </div>
                    <p className="text-xs font-ui text-ink-secondary mt-2 text-center">Person A</p>
                    <p className="text-[10px] font-ui text-ink-tertiary text-center mt-1">
                      Reads, nods, moves on
                    </p>
                  </motion.div>
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="w-20 h-20 rounded-full border-2 flex items-center justify-center" style={{ borderColor: '#4F7A5A', backgroundColor: 'rgba(79,122,90,0.06)' }}>
                      <span className="text-lg">🤔</span>
                    </div>
                    <p className="text-xs font-ui text-ink-secondary mt-2 text-center">Person B</p>
                    <p className="text-[10px] font-ui text-ink-tertiary text-center mt-1">
                      Asks "Why? How? What if?"
                    </p>
                  </motion.div>
                </div>
                <div className="bg-surface rounded-calm px-4 py-2 border border-line-soft">
                  <p className="font-reading text-sm text-ink-secondary text-center italic">
                    "The mitochondria is the powerhouse of the cell."
                  </p>
                </div>
              </div>
            ),
            caption: 'Both people read the same sentence. Both can repeat it right now. But a week later, only Person B remembers. The difference is not talent -- it is processing depth.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <p className="text-xs font-ui text-ink-tertiary uppercase tracking-wide">
                  Craik & Lockhart (1972): Levels of Processing
                </p>
                <div className="w-full max-w-sm space-y-2">
                  {[
                    { level: 'SHALLOW', question: 'Is this word in uppercase?', depth: 15, color: '#A66B5A' },
                    { level: 'MEDIUM', question: 'Does this word rhyme with "cat"?', depth: 40, color: '#B89466' },
                    { level: 'DEEP', question: 'Does this word fit in this sentence?', depth: 85, color: '#4F7A5A' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.level}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.3 }}
                    >
                      <span className="text-[9px] font-ui font-bold w-14" style={{ color: item.color }}>
                        {item.level}
                      </span>
                      <div className="flex-1">
                        <p className="text-[10px] font-ui text-ink-secondary mb-1">{item.question}</p>
                        <div className="h-2 bg-line-soft rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: item.color }}
                            initial={{ width: '0%' }}
                            animate={{ width: `${item.depth}%` }}
                            transition={{ duration: 0.6, delay: i * 0.3 + 0.3 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <p className="text-[10px] font-ui text-ink-tertiary mt-1">
                  Retention on surprise memory test
                </p>
              </div>
            ),
            caption: 'The depth of processing at encoding predicted retention better than the intention to remember. Nobody told subjects they would be tested.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-2">
                <NeuronAnimation mode="encoding" interactive={false} showLabels={false} />
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-[10px] font-ui text-ink-tertiary">Shallow: 1-2 connections</p>
                    <div className="flex gap-1 justify-center mt-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#B89466' }} />
                      <div className="w-2 h-2 rounded-full bg-line-soft" />
                      <div className="w-2 h-2 rounded-full bg-line-soft" />
                      <div className="w-2 h-2 rounded-full bg-line-soft" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-ui text-ink-tertiary">Deep: many connections</p>
                    <div className="flex gap-1 justify-center mt-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4F7A5A' }} />
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4F7A5A' }} />
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4F7A5A' }} />
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4F7A5A' }} />
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption: 'Deep processing creates more neural connections. More connections means more routes in, and more anchors holding the memory in place.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <p className="text-xs font-ui text-ink-tertiary uppercase tracking-wide">
                  Elaborative Interrogation
                </p>
                <div className="bg-surface rounded-calm p-4 border border-line-soft max-w-xs">
                  <p className="font-reading text-sm text-ink-secondary mb-2">
                    "Canada produces more hydroelectric power than any country except China and Brazil."
                  </p>
                  <motion.div
                    className="border-t border-line-soft pt-2 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-xs font-ui font-medium" style={{ color: '#4F7A5A' }}>
                      Ask: WHY is this true?
                    </p>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-1 leading-relaxed">
                      Lots of rivers. Elevation changes. Abundant water.
                      Now the fact is connected to geographic knowledge you already have.
                    </p>
                  </motion.div>
                </div>
              </div>
            ),
            caption: 'The simplest encoding strategy: ask "why?" about every fact. It forces deep processing automatically. 30-70% improvement over re-reading.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <p className="text-xs font-ui text-ink-tertiary uppercase tracking-wide">
                  The Self-Reference Effect
                </p>
                <div className="w-full max-w-sm space-y-2">
                  {[
                    { q: '"Is this word in uppercase?"', depth: 15, color: '#A66B5A' },
                    { q: '"Does this relate to concept X?"', depth: 55, color: '#B89466' },
                    { q: '"Does this describe YOU?"', depth: 92, color: '#4F7A5A' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.3 }}
                    >
                      <div className="flex-1">
                        <p className="text-[10px] font-ui text-ink-secondary mb-1">{item.q}</p>
                        <div className="h-2 bg-line-soft rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: item.color }}
                            initial={{ width: '0%' }}
                            animate={{ width: `${item.depth}%` }}
                            transition={{ duration: 0.6, delay: i * 0.3 + 0.2 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <p className="text-[10px] font-ui text-ink-tertiary mt-1">
                  Connecting to personal experience activates your richest knowledge network
                </p>
              </div>
            ),
            caption: 'Your self-concept is the most elaborated knowledge structure in your brain. Connecting new information to personal experience produces the strongest encoding.',
          },
        ]}
      />

      {/* Research paragraph: Generation effect and elaborative encoding */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The generation effect, discovered by Slamecka and Graf in 1978, adds another dimension to encoding depth. When people generate information themselves -- completing a word fragment, producing an answer from a cue, or creating their own examples -- they remember it significantly better than when they simply read the same information. The act of generation forces deeper processing because your brain must actively search through its knowledge networks, make connections, and construct a response rather than passively receiving one.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This is why taking notes in your own words beats copying the textbook, why teaching a concept to someone else is one of the most powerful study strategies, and why filling in a blank is more effective than reading a complete sentence. Every time you generate rather than receive, you are encoding at a deeper level. The effort you feel is not wasted -- it is the signature of deep processing at work.
        </p>
      </section>

      {/* Research paragraph: Self-reference effect */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The self-reference effect, first demonstrated by Rogers, Kuiper, and Kirker in 1977, reveals the deepest level of encoding available to you. When you relate new information to your own personal experience -- "Does this describe me?" "When have I seen this in my own life?" -- you activate what is arguably the most elaborated and interconnected knowledge structure in your brain: your self-concept. New information anchored to this network inherits its richness, creating far more retrieval pathways than any other encoding strategy.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          In practice, this means the question "How does this relate to my life?" is not a soft, feel-good exercise -- it is a hard-nosed encoding strategy backed by decades of research. When you connect a chemistry concept to a cooking experience, or a historical event to a family story, you are not being lazy. You are engaging the most powerful encoding machinery your brain has.
        </p>
      </section>

      {/* ---- INTERACTIVE ENCODING DEPTH ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          See the Difference
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Toggle encoding layers to watch the memory trace grow
        </p>
        <EncodingDepthViz initialWord="Mitochondria" />
      </section>

      {/* ---- Short bridge ---- */}
      <p className="font-reading text-ink-secondary text-center max-w-lg mx-auto my-6 leading-relaxed">
        This is why memory palaces work at a deeper level: they combine spatial, visual,
        personal, and semantic encoding all at once.
      </p>

      {/* Research paragraph: Distinctiveness */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          There is one more principle that ties all of these encoding strategies together: distinctiveness. Research by Hunt and Worthen shows that memories that are distinctive -- unusual, unexpected, or different from their surroundings -- are encoded more deeply and recalled more reliably. This is why bizarre imagery works in memory palaces, why the one unusual event in an otherwise routine day is what you remember, and why a surprising fact in a textbook sticks while the surrounding paragraphs fade.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Distinctiveness is not the same as mere novelty. A fact becomes distinctive when it stands out against a background of existing knowledge. The more you know about a subject, the more readily you can spot what is unusual, unexpected, or contradictory -- which means the more distinctively you can encode new information. Deep knowledge makes new learning easier, not harder. This is the virtuous cycle at the heart of expertise: the more you know, the better you encode, and the better you encode, the more you know.
        </p>
      </section>

      {/* ---- VISUAL QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What determines how well something is remembered?',
            options: [
              { id: 'reps', label: 'The number of times you re-read it', correct: false },
              { id: 'depth', label: 'How deeply you processed it during encoding', correct: true },
              { id: 'length', label: 'How long the study session was', correct: false },
            ],
          },
          {
            prompt: 'What is elaborative interrogation?',
            options: [
              { id: 'highlight', label: 'Highlighting the key facts', correct: false },
              { id: 'why', label: 'Asking "why is this true?" about each fact', correct: true },
              { id: 'repeat', label: 'Repeating the information out loud', correct: false },
            ],
          },
          {
            prompt: 'Why does the self-reference effect produce such strong memories?',
            options: [
              { id: 'easy', label: 'Thinking about yourself is easier', correct: false },
              { id: 'ego', label: 'People are naturally self-centered', correct: false },
              { id: 'web', label: 'It anchors new info to your richest knowledge network', correct: true },
            ],
          },
        ]}
      />

      {/* Research paragraph: Bringing it together */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          The encoding depth research converges on a practical principle: how you think about something at the moment you encounter it matters more than how often you see it. Asking "why?", generating your own examples, connecting to personal experience, and seeking out what is distinctive -- these are not study hacks. They are direct applications of the most robust findings in memory science. Every technique in this course works because it pushes you toward deeper processing, whether you realize it in the moment or not.
        </p>
      </section>

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="lesson5-feynman"
        prompt="Explain to someone who has always studied by re-reading and highlighting why those strategies produce weaker memories, and what they could do instead."
        rubric={[
          'You explained levels of processing -- shallow vs deep -- without using jargon as a substitute for explanation.',
          'You gave at least one concrete alternative strategy (elaborative interrogation, self-reference, visualization).',
          'You were encouraging rather than critical of their existing approach.',
          'Someone hearing your explanation would understand what to do differently tonight.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 5 of 6 &middot; Foundations
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Consolidation and sleep -- what happens when you're not studying
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
