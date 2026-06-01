import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  DragMatch,
  SortSequence,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
  NeuronAnimation,
} from '../../../components/visuals'

/**
 * Lesson 7 -- Comprehensive Practice
 * Mixed exercises covering all Major System applications.
 * FeynmanCheck + ReflectionJournal to close the module.
 */

export default function Lesson7_Practice({
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
          Comprehensive Practice
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Everything together. Decode, encode, chain, and reflect.
        </p>
      </header>

      {/* ---- Research paragraph: Integration and transfer ---- */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Psychologists distinguish between near transfer (applying a skill to a very similar task) and far transfer (applying it to a structurally different task). Most practice in education targets near transfer, but the Major System is one of the rare techniques where far transfer is well documented. Ericsson and Chase (1982) studied a college student named S.F. who used a digit-to-mnemonic system to increase his digit span from seven to over eighty digits. Crucially, S.F.'s improvement transferred to novel digit strings he had never seen -- the system gave him a general encoding tool, not just practice at one specific sequence.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          What makes this lesson different from the previous six is the focus on mixed practice. Rohrer and Taylor (2007) demonstrated that interleaving different types of problems during practice produces better learning than blocked practice (doing all problems of one type, then all of another). The brain has to actively discriminate which strategy to apply, which strengthens the retrieval pathways for each strategy independently. In this lesson, you will switch between decoding numbers, encoding words, chaining stories, and applying the system to dates and phone numbers -- all interleaved.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The desirable difficulty hypothesis (Bjork, 1994) predicts that this interleaved practice will feel harder than blocked practice -- and it should. The difficulty is not a sign that the method is failing. It is the mechanism by which the brain builds flexible, transferable skill. If this lesson feels more effortful than the previous ones, that is evidence that it is doing its job.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: The full skill tree ---- */}
      <VisualStepExplainer
        title="Skills you have built"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-3 gap-3 max-w-sm">
                  {[
                    { skill: 'Digit-to-Sound', lesson: 'L1', color: '#4F7A5A' },
                    { skill: 'Sound-to-Word', lesson: 'L2', color: '#4F7A5A' },
                    { skill: 'Speed Decoding', lesson: 'L3', color: '#4F7A5A' },
                    { skill: 'Phone Numbers', lesson: 'L4', color: '#5B6F8C' },
                    { skill: 'Dates', lesson: 'L5', color: '#5B6F8C' },
                    { skill: '3-Digit Extension', lesson: 'L6', color: '#5B6F8C' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.skill}
                      className="bg-surface rounded-calm border border-line-soft p-3 text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.12 }}
                    >
                      <div className="w-8 h-8 rounded-full mx-auto flex items-center justify-center mb-2"
                        style={{ backgroundColor: `${item.color}18` }}>
                        <span className="text-[10px] font-ui font-bold" style={{ color: item.color }}>{item.lesson}</span>
                      </div>
                      <p className="text-xs font-ui font-medium text-ink-primary">{item.skill}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Six skills built across the module: the phonetic code, peg words, speed drills, and three application domains. This lesson integrates all of them.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex gap-4 items-end">
                  {[
                    { label: 'Blocked', pct: 65, color: '#B89466' },
                    { label: 'Interleaved', pct: 92, color: '#4F7A5A' },
                  ].map((bar, i) => (
                    <div key={bar.label} className="flex flex-col items-center w-24">
                      <motion.div
                        className="w-full rounded-t-sm"
                        style={{ backgroundColor: bar.color }}
                        initial={{ height: 0 }}
                        animate={{ height: bar.pct }}
                        transition={{ duration: 0.8, delay: i * 0.3 }}
                      />
                      <p className="text-xs font-ui font-bold mt-2" style={{ color: bar.color }}>
                        {bar.pct}%
                      </p>
                      <p className="text-[9px] font-ui text-ink-tertiary">{bar.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-ui text-ink-tertiary text-center max-w-xs mt-2">
                  Retention after one week. Interleaved practice feels harder but produces far better results.
                </p>
              </div>
            ),
            caption: 'Rohrer & Taylor (2007): interleaved practice outperforms blocked practice by roughly 40% on delayed tests. The difficulty is the point.',
          },
          {
            visual: (
              <NeuronAnimation mode="strengthening" interactive={false} showLabels={true} />
            ),
            caption: 'Each exercise below re-activates and strengthens a different pathway. Mixed practice forces the brain to select the right pathway, which builds discrimination and flexibility.',
          },
        ]}
      />

      {/* ---- EXERCISE 1: Basic Code DragMatch ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Round 1: Basic Code
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Match each consonant sound back to its digit
        </p>
        <DragMatch
          id="major-system-practice-code"
          pairs={[
            { left: 'sh, ch, j', right: '6' },
            { left: 'f, v', right: '8' },
            { left: 'p, b', right: '9' },
            { left: 'k, g', right: '7' },
            { left: 'n', right: '2' },
            { left: 'l', right: '5' },
          ]}
        />
      </section>

      {/* ---- Research paragraph: Testing effect in mixed practice ---- */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          The testing effect -- the finding that retrieving information strengthens it more than re-studying -- applies with special force to mixed practice. Karpicke and Roediger (2008) found that retrieval practice produced a 150% improvement over re-study, and that this advantage grew larger, not smaller, over time. Each exercise below is a retrieval event. The effort you feel as you decode, build images, and chain stories is the mechanism that turns fragile knowledge into durable skill. If it feels easy, increase the challenge by attempting to answer before revealing options.
        </p>
      </section>

      {/* ---- EXERCISE 2: Word-to-Number DragMatch ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Round 2: Decode Words
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Match each Major System word to the number it encodes
        </p>
        <DragMatch
          id="major-system-practice-decode"
          pairs={[
            { left: 'comb', right: '73' },
            { left: 'rain', right: '42' },
            { left: 'tail', right: '15' },
            { left: 'soap', right: '09' },
            { left: 'motor', right: '314' },
            { left: 'tulip', right: '159' },
          ]}
        />
      </section>

      {/* ---- EXERCISE 3: Phone Number Sequence ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Round 3: Reconstruct a Phone Number
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Put the images in order to form the number 215-739-4086
        </p>
        <SortSequence
          id="major-system-practice-phone"
          items={[
            { id: 'net', label: 'Net (21)' },
            { id: 'lime', label: 'Lime (53)' },
            { id: 'camp', label: 'Camp (73)' },
            { id: 'rsvp', label: 'Rose (40)' },
            { id: 'fish', label: 'Fish (86)' },
          ]}
        />
      </section>

      {/* ---- VISUAL EXPLAINER 2: Integration strategies ---- */}
      <VisualStepExplainer
        title="Where to go from here"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  {[
                    { title: 'Daily drills', desc: '5 min/day decoding random numbers', time: '5 min' },
                    { title: 'Real numbers', desc: 'Encode one real phone or date per day', time: '3 min' },
                    { title: 'Expand pegs', desc: 'Add 5 new peg words per week', time: '10 min' },
                    { title: 'Memory palace', desc: 'Combine with loci for long sequences', time: '15 min' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
                      className="bg-surface rounded-calm border border-line-soft p-3"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4F7A5A' }} />
                        <p className="text-xs font-ui font-semibold text-ink-primary">{item.title}</p>
                      </div>
                      <p className="text-[10px] font-ui text-ink-tertiary">{item.desc}</p>
                      <p className="text-[9px] font-ui mt-1" style={{ color: '#5B6F8C' }}>{item.time}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Four habits for continued growth. Consistency matters more than duration. Five minutes daily beats an hour weekly.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <svg width="220" height="120" viewBox="0 0 220 120" fill="none">
                  <line x1="20" y1="100" x2="200" y2="100" stroke="var(--color-ink-tertiary)" strokeWidth="1" opacity="0.3" />
                  <text x="110" y="116" fill="var(--color-ink-tertiary)" fontSize="8" textAnchor="middle">Weeks of practice</text>
                  <motion.path
                    d="M20 90 C50 85, 70 60, 100 40 C130 25, 160 18, 200 15"
                    stroke="#4F7A5A"
                    strokeWidth="2.5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.5, ease: 'easeOut' }}
                  />
                  <motion.text x="25" y="85" fill="#B89466" fontSize="8"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    Week 1
                  </motion.text>
                  <motion.text x="160" y="12" fill="#4F7A5A" fontSize="8"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
                    Fluent
                  </motion.text>
                </svg>
                <p className="text-[10px] font-ui text-ink-tertiary text-center max-w-xs">
                  Most practitioners report functional fluency within 4-6 weeks of daily practice.
                </p>
              </div>
            ),
            caption: 'The growth curve for Major System fluency. Rapid gains in the first weeks, then steady refinement. Automaticity typically arrives within one to two months.',
          },
        ]}
      />

      {/* ---- EXERCISE 4: Mixed Quiz ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Decode: what number does "camp" represent?',
            options: [
              { id: '73', label: '73 (K-M-P... wait, only first consonants of each pair count: K=7, M=3)', correct: false },
              { id: '739', label: '739 (K-M-P)', correct: true },
              { id: '72', label: '72 (K-N)', correct: false },
            ],
          },
          {
            prompt: 'Which strategy produces better long-term retention?',
            options: [
              { id: 'blocked', label: 'Blocked practice (one skill at a time)', correct: false },
              { id: 'interleaved', label: 'Interleaved practice (skills mixed together)', correct: true },
              { id: 'none', label: 'Both are equally effective', correct: false },
            ],
          },
          {
            prompt: 'To memorize the date 1776, you should...',
            options: [
              { id: 'repeat', label: 'Repeat "1776" until it sticks', correct: false },
              { id: 'encode', label: 'Convert to consonants, build an image, link it to the event in a vivid scene', correct: true },
              { id: 'write', label: 'Write it down ten times', correct: false },
            ],
          },
          {
            prompt: 'The desirable difficulty hypothesis says that harder practice...',
            options: [
              { id: 'discourages', label: 'Discourages learners and should be avoided', correct: false },
              { id: 'builds', label: 'Builds stronger, more transferable skills', correct: true },
              { id: 'wastes', label: 'Wastes time compared to easier practice', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="major-system-l7-feynman"
        prompt="Imagine a friend says 'I can never remember numbers.' Explain the Major System to them from scratch: what it is, how it works, and how they would use it to remember a phone number."
        rubric={[
          'You explained the consonant-to-digit code clearly.',
          'You described how vowels act as free fillers.',
          'You walked through a concrete example from number to image to story.',
          'You mentioned why images are easier to remember than digits (dual coding or similar).',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="You have now learned a complete number-to-image system. What surprised you most? Where do you see yourself using this? What still feels uncertain? Write honestly."
          lessonId="memory.major-system.practice"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Research paragraph: Closing perspective ---- */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          The Major System is one of the oldest and most tested mnemonic techniques in existence. From Stanislaus Mink von Wennsshein in the seventeenth century to Alex Mullen winning world championships in the twenty-first, the core principle has not changed: convert abstract digits into concrete images, and let the brain's powerful visual and spatial memory systems do the heavy lifting. What you have learned in this module is not a parlor trick. It is a genuine cognitive tool, grounded in dual coding theory, elaborative encoding, and the retrieval practice effect. The only variable left is practice -- and five minutes a day is enough to make it permanent.
        </p>
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 7 of 7 &middot; The Major System
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Module complete
            </p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">
            Complete Module
          </button>
        </div>
      </footer>
    </article>
  )
}
