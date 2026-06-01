import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 3 -- Random Words
 * Random words event. Visual word list.
 */

export default function Lesson3_Words({
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
          Random Words
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Turn any word list into a vivid, unforgettable story.
        </p>
      </header>

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The random words event tests one of the most transferable memory skills: the ability to quickly convert any word into a vivid image and place it in a spatial sequence. In competition, athletes are given a list of random, unrelated words -- "elephant, scissors, cloud, justice, marble" -- and must memorize as many as possible in the correct order. Top competitors memorize over 100 words in five minutes. Unlike numbers or cards, words do not require a pre-built encoding system. Each word is already meaningful; the challenge is to make it imageable and to link it to a location.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The technique is straightforward: convert each word to its most vivid, concrete image and place that image at the next locus in your palace. Concrete nouns ("hammer," "tiger") are easy -- they are already images. Abstract nouns ("justice," "freedom") require a quick translation into something visual: a judge's gavel for justice, a bird escaping a cage for freedom. Verbs ("run," "explode") become scenes at the locus. The skill that improves with practice is the speed of this word-to-image conversion. Beginners take several seconds per word; experts do it in under a second.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Random Words ---- */}
      <VisualStepExplainer
        title="The Word-to-Image Pipeline"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-2 flex-wrap justify-center max-w-sm">
                  {['elephant', 'scissors', 'cloud', 'justice', 'marble', 'whisper', 'volcano', 'piano'].map((word, i) => (
                    <motion.div
                      key={word}
                      className="px-3 py-2 rounded-calm border bg-surface"
                      style={{ borderColor: '#5B6F8C' }}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-xs font-ui text-ink-secondary">{word}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="text-[10px] font-ui text-ink-tertiary">A random word list. No patterns, no connections. You create the structure.</p>
              </div>
            ),
            caption: 'The raw material: a list of unrelated words. Some are concrete (elephant), some abstract (justice). Your job is to turn each into an image and place it in sequence.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-full max-w-sm">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-surface rounded-calm p-3 border border-line-soft">
                      <p className="text-[10px] font-ui font-bold mb-2" style={{ color: '#4F7A5A' }}>CONCRETE WORDS</p>
                      <p className="text-[10px] font-ui text-ink-secondary">"elephant" = a giant elephant</p>
                      <p className="text-[10px] font-ui text-ink-secondary">"scissors" = giant scissors cutting</p>
                      <p className="text-[9px] font-ui text-ink-tertiary mt-1">Already vivid. Use directly.</p>
                    </div>
                    <div className="bg-surface rounded-calm p-3 border border-line-soft">
                      <p className="text-[10px] font-ui font-bold mb-2" style={{ color: '#B89466' }}>ABSTRACT WORDS</p>
                      <p className="text-[10px] font-ui text-ink-secondary">"justice" = a judge's gavel</p>
                      <p className="text-[10px] font-ui text-ink-secondary">"whisper" = lips close to an ear</p>
                      <p className="text-[9px] font-ui text-ink-tertiary mt-1">Need translation to image.</p>
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption: 'Concrete words are already images. Abstract words need a one-step translation: pick the most vivid, personal association. Speed comes from having go-to images for common abstract words.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <p className="text-[10px] font-ui font-bold" style={{ color: '#4F7A5A' }}>WORDS AT PALACE LOCI</p>
                <div className="w-full max-w-sm space-y-2">
                  {[
                    { locus: 'Front door', word: 'elephant', image: 'Massive elephant blocking the doorway, trumpeting' },
                    { locus: 'Hallway', word: 'scissors', image: 'Giant scissors snipping the wallpaper' },
                    { locus: 'Kitchen', word: 'cloud', image: 'A rain cloud hovering over the stove, dripping' },
                    { locus: 'Living room', word: 'justice', image: 'A gavel smashing the coffee table' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-2 p-2 bg-surface rounded-calm border border-line-soft"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(79,122,90,0.15)' }}>
                        <span className="text-[8px] font-ui font-bold" style={{ color: '#4F7A5A' }}>{i + 1}</span>
                      </div>
                      <div>
                        <p className="text-[9px] font-ui text-ink-primary font-medium">{item.locus}: "{item.word}"</p>
                        <p className="text-[9px] font-ui text-ink-tertiary italic">{item.image}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Each word becomes an image interacting with its palace locus. Make the image big, exaggerated, multi-sensory. The locus provides the sequence; the image provides the content.',
          },
        ]}
      />

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The random words event is often recommended as the best starting point for memory training because it requires no pre-built system -- no number codes, no card assignments. You can start immediately with just a palace and the ability to form mental images. This makes it an excellent gateway event. Many memory coaches recommend spending the first month of training exclusively on random words to build the foundational skills of image formation, palace navigation, and encoding speed.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          A useful training technique is to practice with word lists of increasing length: start with 10 words, then 20, then 50. Time yourself, but prioritize accuracy. Keep a log of your scores and review errors to identify weak points. Common issues include: weak images for abstract words (fix by pre-assigning go-to images for common abstractions), blurry loci (fix by mentally walking your palace more vividly), and sequence errors (fix by making images interact with their specific locus, not just sit near it).
        </p>
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What makes the random words event a good starting point for memory training?',
            options: [
              { id: 'no-system', label: 'It requires no pre-built encoding system', correct: true },
              { id: 'easy', label: 'Words are easier than numbers', correct: false },
              { id: 'short', label: 'The lists are always short', correct: false },
            ],
          },
          {
            prompt: 'How should you handle an abstract word like "freedom"?',
            options: [
              { id: 'translate', label: 'Translate it to a concrete image (a bird escaping a cage)', correct: true },
              { id: 'skip', label: 'Skip it and move to the next word', correct: false },
              { id: 'repeat', label: 'Repeat the word mentally several times', correct: false },
            ],
          },
          {
            prompt: 'What causes sequence errors in the random words event?',
            options: [
              { id: 'weak-loci', label: 'Images not strongly linked to their specific locus', correct: true },
              { id: 'speed', label: 'Going too slowly', correct: false },
              { id: 'abstract', label: 'Having too many abstract words', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="memory-league-l3-feynman"
        prompt="Take this word list: mountain, envelope, thunder, patience, guitar. Walk through how you would memorize them in order using a memory palace."
        rubric={[
          'You chose specific palace loci and named them.',
          'You converted each word to a vivid image.',
          'You linked each image to its locus in a specific way.',
          'You handled the abstract word (patience) with a concrete translation.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 5 &middot; Memory League
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Names and Faces
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
