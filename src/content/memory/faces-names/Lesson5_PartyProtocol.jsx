import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  SortSequence,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 5 -- Party Protocol
 * Real-world application protocol. Visual checklist animation.
 */

export default function Lesson5_PartyProtocol({
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
          The Party Protocol
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          A complete system for remembering every name at an event.
        </p>
      </header>

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          All the techniques from this module -- the Baker-Baker insight, feature anchoring, face-name palaces, and social encoding -- combine into a practical protocol you can use at any social event. Memory competitors call this kind of structured approach a "system," and what makes it effective is not any single technique but the integration of all of them into a reliable, repeatable workflow. Anders Ericsson's research on deliberate practice shows that expertise develops not from talent but from consistent application of structured techniques over time.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The protocol has three phases: preparation (before the event), encoding (during introductions), and consolidation (during and after the event). Each phase has specific actions. The preparation phase involves activating your face-name palace and setting an intention to remember names. The encoding phase uses the first 10-15 seconds of each introduction. The consolidation phase involves brief mental reviews during the event and a quick journaling session afterward to commit names to long-term storage via flashcards.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: The Protocol ---- */}
      <VisualStepExplainer
        title="The Complete Protocol"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <p className="text-[10px] font-ui font-bold" style={{ color: '#5B6F8C' }}>PHASE 1: BEFORE THE EVENT</p>
                <div className="w-full max-w-sm space-y-2">
                  {[
                    { check: 'Mentally walk your face-name palace -- clear the loci', timing: '5 minutes before' },
                    { check: 'Set intention: "I will remember names tonight"', timing: '1 minute before' },
                    { check: 'Take a slow breath -- reduce social anxiety', timing: 'At the door' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 p-2 bg-surface rounded-calm border border-line-soft"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <motion.div
                        className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(79,122,90,0.15)' }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ delay: i * 0.4 + 0.5, duration: 0.3 }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2 2 4-4" stroke="#4F7A5A" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </motion.div>
                      <div>
                        <p className="text-[10px] font-ui text-ink-secondary">{item.check}</p>
                        <p className="text-[8px] font-ui text-ink-tertiary">{item.timing}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Phase 1: Preparation. Clear your palace, set your intention, and calm your nervous system. Five minutes of setup dramatically increases encoding quality.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <p className="text-[10px] font-ui font-bold" style={{ color: '#4F7A5A' }}>PHASE 2: DURING INTRODUCTIONS (~15 seconds each)</p>
                <div className="w-full max-w-sm">
                  <div className="relative">
                    {[
                      { second: '0-3s', action: 'Hear name, repeat it: "Nice to meet you, Priya"' },
                      { second: '3-5s', action: 'Scan face -- identify anchor feature' },
                      { second: '5-10s', action: 'Convert name to image, attach to feature' },
                      { second: '10-15s', action: 'Place person at next palace locus' },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 mb-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.3 }}
                      >
                        <div
                          className="w-12 h-6 rounded-sm flex-shrink-0 flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(79,122,90,0.1)' }}
                        >
                          <span className="text-[8px] font-ui font-bold" style={{ color: '#4F7A5A' }}>{item.second}</span>
                        </div>
                        <p className="text-[10px] font-ui text-ink-secondary">{item.action}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption: 'Phase 2: Encoding. The critical window is 15 seconds. With practice, this becomes automatic. The rest of the conversation is for genuine connection.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <p className="text-[10px] font-ui font-bold" style={{ color: '#5B6F8C' }}>PHASE 3: CONSOLIDATION</p>
                <div className="w-full max-w-sm space-y-2">
                  {[
                    { check: 'Every 20 minutes: quick mental palace walk (30 seconds)', when: 'During event' },
                    { check: 'Use names when saying goodbye', when: 'Leaving' },
                    { check: 'Write down all names from palace walk', when: 'In the car / at home' },
                    { check: 'Create flashcards for names worth keeping long-term', when: 'That evening' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 p-2 bg-surface rounded-calm border border-line-soft"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <motion.div
                        className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(91,111,140,0.15)' }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2 2 4-4" stroke="#5B6F8C" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </motion.div>
                      <div>
                        <p className="text-[10px] font-ui text-ink-secondary">{item.check}</p>
                        <p className="text-[8px] font-ui text-ink-tertiary">{item.when}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Phase 3: Consolidation. Brief palace walks during the event keep the traces active. After the event, write down names and create flashcards for the ones that matter.',
          },
        ]}
      />

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The 20-minute review interval during Phase 3 is not arbitrary. Ebbinghaus's forgetting curve shows the steepest decline in the first 20 minutes after encoding. A brief mental review at that point -- a 30-second palace walk while standing by the refreshments -- catches memories at the point of maximum vulnerability. This single mid-event review can more than double retention compared to waiting until the event ends.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The post-event journaling step bridges the gap between your temporary palace storage and your permanent spaced repetition system. Names that are worth remembering long-term -- colleagues, potential collaborators, friends of friends -- become flashcards. The palace can then be cleared and reused for the next event. Think of the palace as RAM and your flashcard deck as the hard drive. The protocol moves important data from volatile to permanent storage before it is lost.
        </p>
      </section>

      {/* ---- SORT SEQUENCE ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Order the Protocol Steps
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Arrange the party protocol steps in the correct order.
        </p>
        <SortSequence
          items={[
            { id: 'clear', label: 'Clear your face-name palace before arriving' },
            { id: 'name', label: 'Hear the name and repeat it aloud' },
            { id: 'anchor', label: 'Identify distinctive feature and create name-image' },
            { id: 'place', label: 'Place the person at a palace locus' },
            { id: 'review', label: 'Do a quick palace walk every 20 minutes' },
            { id: 'journal', label: 'Write down names and create flashcards after the event' },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why review your palace every 20 minutes during an event?',
            options: [
              { id: 'steep', label: 'The forgetting curve is steepest in the first 20 minutes', correct: true },
              { id: 'forget', label: 'You will completely forget everything after 20 minutes', correct: false },
              { id: 'habit', label: 'It is a good habit for mindfulness', correct: false },
            ],
          },
          {
            prompt: 'What is the purpose of creating flashcards after the event?',
            options: [
              { id: 'permanent', label: 'Transfer names from temporary palace to permanent spaced repetition', correct: true },
              { id: 'backup', label: 'As a backup in case the palace fails', correct: false },
              { id: 'practice', label: 'To practice card-making skills', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="faces-names-l5-feynman"
        prompt="Your friend is going to a wedding where they will meet 30+ new people. Walk them through the complete party protocol in practical terms."
        rubric={[
          'You covered all three phases: preparation, encoding, consolidation.',
          'You gave specific timing guidance (15 seconds for encoding, 20-minute reviews).',
          'You mentioned the post-event step of creating flashcards.',
          'Your advice was practical enough to use immediately.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 5 of 6 &middot; Faces and Names
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Review
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
