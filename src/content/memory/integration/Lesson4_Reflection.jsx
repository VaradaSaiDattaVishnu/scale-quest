import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
} from '../../../components/visuals'

/**
 * Lesson 4 -- Final Reflection
 * Final reflection on the memory pillar journey. ReflectionJournal.
 */

export default function Lesson4_Reflection({
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
          Final Reflection
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Where you started. Where you are. Where you are going.
        </p>
      </header>

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          You have now completed the entire memory pillar. From the foundations of how memory works, through encoding techniques, memory palaces, spaced repetition systems, flashcard craft, face-name protocols, competitive memory events, and integration projects -- you have built a comprehensive toolkit for deliberate memory practice. This is not the end of learning; it is the beginning of a practice. The techniques work only if you use them. The research is clear: memory is a skill, not a trait. It improves with structured practice and deteriorates with neglect.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Research on long-term skill maintenance by Anderson (1982) and Ericsson (1993) shows that skills developed through deliberate practice can persist for decades if they remain in regular use. Memory champions who continue practicing maintain their abilities well into middle age and beyond. Those who stop see gradual decline -- not because the techniques stop working, but because the neural pathways, like muscles, require continued exercise. The daily review habit you build now is not a chore to endure. It is the practice that keeps the skill alive.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: The Journey ---- */}
      <VisualStepExplainer
        title="Your Memory Journey"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-full max-w-sm">
                  <div className="flex items-center justify-between gap-1">
                    {[
                      { label: 'Foundations', num: '1', color: '#5B6F8C' },
                      { label: 'Encoding', num: '2', color: '#5B6F8C' },
                      { label: 'Palaces', num: '3', color: '#5B6F8C' },
                      { label: 'Spaced Rep', num: '4', color: '#5B6F8C' },
                      { label: 'Linking', num: '5', color: '#5B6F8C' },
                      { label: 'Card-Craft', num: '6', color: '#4F7A5A' },
                      { label: 'Faces', num: '7', color: '#4F7A5A' },
                      { label: 'League', num: '8', color: '#4F7A5A' },
                      { label: 'Integration', num: '9', color: '#4F7A5A' },
                    ].map((mod, i) => (
                      <motion.div
                        key={i}
                        className="text-center flex-1"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center mx-auto"
                          style={{ backgroundColor: `${mod.color}20` }}
                        >
                          <span className="text-[7px] font-ui font-bold" style={{ color: mod.color }}>{mod.num}</span>
                        </div>
                        <p className="text-[6px] font-ui text-ink-tertiary mt-0.5">{mod.label}</p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-2 h-1 bg-line-soft rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: '#4F7A5A' }}
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2, ease: 'easeOut' }}
                    />
                  </div>
                  <p className="text-[10px] font-ui text-center mt-2" style={{ color: '#4F7A5A' }}>
                    Nine modules complete.
                  </p>
                </div>
              </div>
            ),
            caption: 'Nine modules. Foundations to integration. You now have a complete toolkit for deliberate memory practice.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-full max-w-sm grid grid-cols-2 gap-3">
                  {[
                    { label: 'Science', items: 'Forgetting curve, retrieval practice, encoding depth, consolidation' },
                    { label: 'Techniques', items: 'Memory palaces, PAO, Major System, feature anchoring, cloze cards' },
                    { label: 'Systems', items: 'Spaced repetition, daily review, deck maintenance, party protocol' },
                    { label: 'Meta-skills', items: 'Card refactoring, teaching, self-assessment, personal rules' },
                  ].map((cat, i) => (
                    <motion.div
                      key={i}
                      className="bg-surface rounded-calm p-3 border border-line-soft"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <p className="text-[10px] font-ui text-ink-primary font-medium mb-1">{cat.label}</p>
                      <p className="text-[8px] font-ui text-ink-tertiary">{cat.items}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Four layers of knowledge: the science of why it works, the techniques of how to do it, the systems for sustaining it, and the meta-skills for improving it.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <motion.div
                  className="w-full max-w-sm bg-surface rounded-calm border-2 p-5 text-center"
                  style={{ borderColor: '#4F7A5A' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="font-ui text-lg font-semibold mb-2" style={{ color: '#4F7A5A' }}>
                    What comes next is practice.
                  </p>
                  <p className="font-reading text-ink-secondary text-sm leading-relaxed">
                    The techniques do not fade. The neural pathways do not disappear.
                    But they need exercise. A daily review habit, maintained over months
                    and years, is the single most important thing you can do now.
                  </p>
                </motion.div>
              </div>
            ),
            caption: 'Everything you have learned is a seed. Daily practice is the water. The compound interest of consistent memory practice is extraordinary -- but only if you actually practice.',
          },
        ]}
      />

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          A final thought from the research: the relationship between memory and identity is deeper than most people realize. What you remember shapes who you are. Your autobiographical memory -- the narrative of your life -- determines your sense of self. Your semantic memory -- the facts and concepts you carry -- determines what you can think about. Your procedural memory -- the skills you have practiced -- determines what you can do. By deliberately improving your memory, you are not just becoming more efficient at storing facts. You are expanding what you can think about, what you can do, and ultimately, who you are.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Endel Tulving, who spent his career studying memory, wrote: "Memory is a gift of nature, the ability of living organisms to retain and to utilize acquired information." The techniques in this course are tools for making better use of that gift. They are not a replacement for curiosity, effort, or time. They are amplifiers. Use them on material that matters to you, with people who matter to you, for purposes that matter to you. That is when memory practice stops being a chore and becomes a way of living more deliberately.
        </p>
      </section>

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="integration-l4-feynman"
        prompt="If you could go back to the beginning of this course and give yourself three pieces of advice about memory, what would they be? Base them on what you actually experienced, not just what you read."
        rubric={[
          'You gave three specific, experience-based pieces of advice.',
          'Each piece of advice reflected genuine learning, not just parroting.',
          'Your advice was practical and actionable.',
          'Your tone reflected honest reflection, not performance.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="This is the final journal entry for the memory pillar. Reflect on your journey: What surprised you most? What technique resonated most deeply? What will your daily memory practice look like going forward? And -- honestly -- what are you still skeptical about?"
          lessonId="memory.integration.reflection"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 4 &middot; Integration
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Memory pillar complete. The practice continues.
            </p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">
            Complete Memory Pillar
          </button>
        </div>
      </footer>
    </article>
  )
}
