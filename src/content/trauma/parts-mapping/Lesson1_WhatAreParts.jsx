import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  NervousSystemCheckin,
  BreathingDot,
} from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 1 -- What Are Parts?
 * IFS-informed (Schwartz). Parts are not pathology. NervousSystemCheckin (first lesson).
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'

export default function Lesson1_WhatAreParts({
  onComplete, learnTerm, addJournalEntry, savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">What Are Parts?</h1>
        <p className="font-ui text-ink-secondary text-lg">You are not broken. You are multiple.</p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">You can stop anytime. The stop button is always available.</p>
      </div>

      <section className="my-8">
        <NervousSystemCheckin onComplete={(result) => savePromptAnswer?.('checkin', result)} />
      </section>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Have you ever said "part of me wants to go, but part of me wants to stay"? That everyday
          language points to something real. The human mind is naturally multiple -- not in a
          disordered way, but as a normal feature of how consciousness is organized. We all have
          different aspects, voices, and perspectives within us. Richard Schwartz, the creator of
          Internal Family Systems (IFS), called these "parts."
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Parts are not pathology. They are the mind's way of organizing experience. Every part
          has a role, a purpose, and a positive intention -- even the ones that cause you pain.
          The angry part is protecting you. The anxious part is watching for danger. The critic
          is trying to keep you safe by keeping you small. Understanding your parts is not about
          getting rid of any of them. It is about understanding what they are trying to do and
          building a relationship with them.
        </p>
      </section>

      <VisualStepExplainer
        title="The parts framework"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="relative">
                  <motion.div
                    className="w-24 h-24 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: SAGE }}
                    animate={{ borderColor: [SAGE, '#6B9B78', SAGE] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <span className="text-xs font-ui font-medium" style={{ color: SAGE }}>Self</span>
                  </motion.div>
                  {[
                    { label: 'Protector', angle: 0 },
                    { label: 'Critic', angle: 72 },
                    { label: 'Caretaker', angle: 144 },
                    { label: 'Child', angle: 216 },
                    { label: 'Warrior', angle: 288 },
                  ].map((part, i) => {
                    const r = 65
                    const x = Math.cos((part.angle * Math.PI) / 180) * r
                    const y = Math.sin((part.angle * Math.PI) / 180) * r
                    return (
                      <motion.div
                        key={i}
                        className="absolute w-14 h-14 rounded-full border bg-white flex items-center justify-center border-line-soft"
                        style={{ left: `calc(50% + ${x}px - 28px)`, top: `calc(50% + ${y}px - 28px)` }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.15 }}
                      >
                        <span className="text-[8px] font-ui text-ink-secondary text-center">{part.label}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ),
            caption:
              'The Self is at the center. Parts orbit around it, each with their own role and voice. This is normal -- not disordered. Everyone has parts.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-xs">
                  {[
                    { part: 'Every part has a positive intention', desc: 'Even the ones that cause pain' },
                    { part: 'Parts are not the enemy', desc: 'They are protectors who took on extreme roles' },
                    { part: 'No part needs to be eliminated', desc: 'They need to be understood and unburdened' },
                    { part: 'The Self can lead', desc: 'When parts trust the Self, they relax' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="bg-surface rounded-calm px-3 py-2 border border-line-soft"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.12 }}
                    >
                      <p className="text-xs font-ui font-medium text-ink-primary">{item.part}</p>
                      <p className="text-[10px] text-ink-tertiary mt-0.5">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'These are the core principles of the parts framework. Every part has good reasons for what it does. The goal is relationship, not elimination.',
          },
        ]}
      />

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          Schwartz's key insight was that internal conflict -- the feeling of being at war with
          yourself -- is actually a conflict between parts. The part that wants to eat and the
          part that wants to diet. The part that craves connection and the part that is terrified
          of intimacy. These are not contradictions in your character. They are different parts
          with different concerns, each trying to help in its own way. When you can notice "a part
          of me feels angry" instead of "I am angry," something shifts. You create space. You
          become the observer rather than being consumed by the experience.
        </p>
      </section>

      <InteractiveQuiz
        questions={[
          {
            prompt: 'In the parts framework, the inner critic is:',
            options: [
              { id: 'enemy', label: 'An enemy that needs to be silenced', correct: false },
              { id: 'protector', label: 'A protector trying to keep you safe through criticism', correct: true },
              { id: 'truth', label: 'Always telling the truth about you', correct: false },
            ],
          },
          {
            prompt: 'Having parts is:',
            options: [
              { id: 'normal', label: 'A normal feature of human consciousness', correct: true },
              { id: 'disorder', label: 'A sign of a disorder', correct: false },
              { id: 'rare', label: 'Something only traumatized people experience', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="parts-what-are-feynman"
        prompt="Explain the concept of 'parts' to someone who says 'I am just a mess.' Help them see their internal experiences differently."
        rubric={[
          'You reframed "mess" as "multiple parts with different concerns."',
          'You named the positive intention behind difficult parts.',
          'You introduced the idea of Self as observer.',
          'Your tone was warm and normalizing.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Can you notice a part right now? Maybe a part that is skeptical of this, or a part that is curious, or a part that feels seen. What would you call it?"
          lessonId="trauma.parts-mapping.what-are-parts"
          onSave={addJournalEntry}
        />
      </section>

      <div className="flex justify-center my-8"><BreathingDot size={48} /></div>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 1 of 6 &middot; Parts Mapping</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next: Self energy</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}
