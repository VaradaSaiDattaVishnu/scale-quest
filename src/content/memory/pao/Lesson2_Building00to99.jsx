import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  SortSequence,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 2 -- Building Your 00-99 PAO List
 * Guides the learner through creating personal PAO images for all 100
 * two-digit numbers. Research grounding: self-reference effect, personal
 * relevance in encoding, best practices from memory athletes.
 */

export default function Lesson2_Building00to99({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  const exampleGrid = [
    { num: '00', person: 'Your mom', action: 'cooking', object: 'a golden pot' },
    { num: '01', person: 'Batman', action: 'flying', object: 'a cape' },
    { num: '12', person: 'Your best friend', action: 'laughing', object: 'a phone' },
    { num: '27', person: 'Michael Jordan', action: 'dunking', object: 'a basketball' },
    { num: '42', person: 'Sherlock Holmes', action: 'inspecting', object: 'a magnifying glass' },
    { num: '99', person: 'Your teacher', action: 'writing', object: 'chalk' },
  ]

  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ---- TITLE ---- */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Building Your 00-99 PAO List
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          100 numbers. 100 people. Your personal memory alphabet.
        </p>
      </header>

      {/* Research paragraph: Self-reference effect */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In 1977, Timothy Rogers, Nicholas Kuiper, and William Kirker published a study that surprised the memory research community. They asked participants to process words in four ways: structurally (is it in uppercase?), phonemically (does it rhyme with X?), semantically (does it mean the same as Y?), and self-referentially (does this describe you?). Self-referential processing produced the best memory -- better even than deep semantic processing.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          This finding, now called the self-reference effect, has been replicated hundreds of times. When information connects to your own identity, experiences, and relationships, it hooks into the richest associative network in your brain. This is why the most effective PAO lists are deeply personal. A competitor who uses their grandmother for 00 will always recall it faster than one who uses a celebrity they barely know.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Memory athletes report that building the initial 00-99 list takes one to two weeks of deliberate work. The investment pays off permanently: once the associations are stable, they become the alphabet you use to encode anything -- numbers, dates, phone numbers, credit cards, historical timelines.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: Building the Grid ---- */}
      <VisualStepExplainer
        title="Your Personal PAO Grid"
        steps={[
          {
            visual: (
              <div className="py-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
                  {exampleGrid.map((item, i) => (
                    <motion.div
                      key={item.num}
                      className="bg-surface rounded-calm border border-line-soft p-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <p className="font-mono text-lg font-bold text-ink-primary text-center">{item.num}</p>
                      <div className="mt-2 space-y-1">
                        <p className="text-[10px] font-ui"><span style={{ color: '#4F7A5A' }} className="font-medium">P:</span> <span className="text-ink-secondary">{item.person}</span></p>
                        <p className="text-[10px] font-ui"><span style={{ color: '#B89466' }} className="font-medium">A:</span> <span className="text-ink-secondary">{item.action}</span></p>
                        <p className="text-[10px] font-ui"><span style={{ color: '#5B6F8C' }} className="font-medium">O:</span> <span className="text-ink-secondary">{item.object}</span></p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Each number gets a Person (P), Action (A), and Object (O). Start with numbers that already have associations for you -- birthdays, jersey numbers, addresses.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="bg-surface rounded-gentle border border-line-soft p-5 max-w-sm">
                  <h3 className="font-ui text-sm font-semibold text-ink-primary mb-3 text-center">Guidelines for Choosing</h3>
                  <div className="space-y-3">
                    {[
                      { icon: 'P', color: '#4F7A5A', text: 'Choose people you can SEE clearly in your mind. Family, friends, celebrities you know well.' },
                      { icon: 'A', color: '#B89466', text: 'Pick distinctive ACTIONS. Not "walking" -- "moonwalking." Not "eating" -- "devouring."' },
                      { icon: 'O', color: '#5B6F8C', text: 'Select objects that are CONCRETE and specific. Not "food" -- "a dripping ice cream cone."' },
                    ].map((rule, i) => (
                      <motion.div
                        key={rule.icon}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                      >
                        <div
                          className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: rule.color }}
                        >
                          {rule.icon}
                        </div>
                        <p className="text-xs font-ui text-ink-secondary leading-relaxed">{rule.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption: 'The more vivid and personal your choices, the faster they will stick. Avoid generic images -- lean into what is naturally memorable for YOU.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <svg width="280" height="160" viewBox="0 0 280 160" fill="none">
                  {/* Progress bar showing 100 cells */}
                  {Array.from({ length: 10 }, (_, row) =>
                    Array.from({ length: 10 }, (_, col) => {
                      const idx = row * 10 + col
                      const filled = idx < 20
                      return (
                        <motion.rect
                          key={idx}
                          x={14 + col * 26}
                          y={10 + row * 14}
                          width="22"
                          height="10"
                          rx="2"
                          fill={filled ? '#4F7A5A' : 'rgba(91,111,140,0.1)'}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.008 }}
                        />
                      )
                    })
                  )}
                  <text x="140" y="158" textAnchor="middle" className="font-ui" fill="#5B6F8C" fontSize="10">
                    20 of 100 assigned -- start with 10 per day
                  </text>
                </svg>
              </div>
            ),
            caption: 'Do not try to build all 100 in one sitting. Assign 10 per day. Review yesterday\'s 10 before adding new ones. In 10 days, you have your full list.',
          },
        ]}
      />

      {/* Research paragraph: Phonetic systems and alternatives */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Some competitors use phonetic systems to generate their PAO associations. The Major System, dating to the 17th century, maps each digit to a consonant sound (0=s/z, 1=t/d, 2=n, etc.) and then fills vowels to form words. The number 27 maps to "n-k" which could become "Nick." The Dominic System, developed by O'Brien himself, maps digits to letters (1=A, 2=B...) and uses initials of famous people (27=BG=Bill Gates).
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Neither phonetic system is strictly better than the other, and many champions use hybrids. The critical factor, confirmed by decades of memory research, is consistency and personal meaning. Whatever system you use to generate the initial associations, the images that survive long-term are the ones that carry emotional weight, sensory detail, and personal relevance. A system that produces vivid images for you is better than a theoretically optimal system that produces bland ones.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 2: Common Pitfalls ---- */}
      <VisualStepExplainer
        title="Common Pitfalls to Avoid"
        steps={[
          {
            visual: (
              <div className="flex gap-6 items-center justify-center py-4">
                <motion.div
                  className="bg-surface rounded-calm border-2 p-4 text-center w-32"
                  style={{ borderColor: '#B89466' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-xs font-ui font-medium" style={{ color: '#B89466' }}>Similar images</p>
                  <p className="text-[10px] font-ui text-ink-tertiary mt-2">"Walking" for 5 numbers</p>
                  <p className="text-[10px] font-ui text-ink-tertiary">Creates confusion</p>
                </motion.div>
                <motion.div
                  className="bg-surface rounded-calm border-2 p-4 text-center w-32"
                  style={{ borderColor: '#4F7A5A' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-xs font-ui font-medium" style={{ color: '#4F7A5A' }}>Distinct images</p>
                  <p className="text-[10px] font-ui text-ink-tertiary mt-2">Each action is unique</p>
                  <p className="text-[10px] font-ui text-ink-tertiary">No overlap</p>
                </motion.div>
              </div>
            ),
            caption: 'The most common mistake: reusing similar actions or objects. If three numbers all involve "throwing," you will confuse them. Every Person, Action, and Object must be unique across your entire list.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm border border-line-soft p-4 max-w-sm">
                  <p className="font-ui text-sm text-ink-primary font-medium mb-3 text-center">Test Yourself Early</p>
                  <div className="flex items-center gap-4 justify-center">
                    <div className="text-center">
                      <motion.div
                        className="w-14 h-14 rounded-calm border-2 flex items-center justify-center"
                        style={{ borderColor: '#5B6F8C' }}
                        animate={{ rotateY: [0, 180, 0] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                      >
                        <span className="font-mono text-lg font-bold text-ink-primary">42</span>
                      </motion.div>
                      <p className="text-[10px] font-ui text-ink-tertiary mt-1">See number</p>
                    </div>
                    <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
                      <path d="M0 8H20M20 8L14 3M20 8L14 13" stroke="#5B6F8C" strokeWidth="1.5" />
                    </svg>
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-calm border-2 flex items-center justify-center" style={{ borderColor: '#4F7A5A' }}>
                        <span className="text-lg">?</span>
                      </div>
                      <p className="text-[10px] font-ui text-ink-tertiary mt-1">Recall image</p>
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption: 'After assigning each batch of 10, test yourself: see the number, recall the image. If you hesitate more than 2 seconds, the image is not vivid enough. Replace it.',
          },
        ]}
      />

      {/* ---- SortSequence Exercise ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Order the PAO Building Steps
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-4">
          Drag these into the correct order for building your list
        </p>
        <SortSequence
          items={[
            { id: 'start', label: 'Start with numbers that already have personal meaning' },
            { id: 'assign', label: 'Assign P, A, O using vivid personal images' },
            { id: 'test', label: 'Test recall: see number, produce image within 2 seconds' },
            { id: 'replace', label: 'Replace any images that cause hesitation' },
            { id: 'batch', label: 'Add next batch of 10 only after current batch is solid' },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What is the self-reference effect?',
            options: [
              { id: 'refer', label: 'Information connected to your own identity is remembered better', correct: true },
              { id: 'repeat', label: 'Repeating something to yourself makes it stick', correct: false },
              { id: 'see', label: 'Seeing your own handwriting helps memory', correct: false },
            ],
          },
          {
            prompt: 'Why should each PAO image be unique across your entire list?',
            options: [
              { id: 'confuse', label: 'Similar images cause confusion between numbers', correct: true },
              { id: 'boring', label: 'Repeated images are boring', correct: false },
              { id: 'rules', label: 'Competition rules require it', correct: false },
            ],
          },
          {
            prompt: 'How should you pace building your 100-number list?',
            options: [
              { id: 'all', label: 'All 100 in one marathon session', correct: false },
              { id: 'ten', label: 'About 10 per day, reviewing previous batches first', correct: true },
              { id: 'random', label: 'Random numbers whenever you feel like it', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="pao-lesson2-feynman"
        prompt="Explain to a friend why using your grandmother as a PAO image for a number would be more effective than using a random stock photo of an old woman."
        rubric={[
          'You mentioned the self-reference effect or personal meaning.',
          'You explained that personal images connect to a richer web of existing memories.',
          'You gave a concrete example of how sensory detail helps encoding.',
          'Your explanation would make sense to someone with no memory training.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Write down your first 10 PAO assignments (numbers 00-09). For each, note why you chose that person, action, and object. What makes each image vivid for you?"
          lessonId="memory.pao.building-00-99"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 8 &middot; PAO System
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Encoding playing cards with PAO
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
