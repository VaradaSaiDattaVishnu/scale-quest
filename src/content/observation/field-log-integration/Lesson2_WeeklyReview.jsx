import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
  BranchScenario,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 2 -- Weekly Review
 * The practice of reviewing your field log entries to find patterns,
 * track growth, and deepen observation skills over time.
 */

export default function Lesson2_WeeklyReview({
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
          Weekly Review
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Finding patterns in your observations through regular review.
        </p>
      </header>

      {/* Research paragraph: Review and metacognition */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Capturing observations is only half the practice. The other
          half is reviewing them. Sch&ouml;n's reflection-on-action
          happens not during the observation itself but afterward, when
          you return to your entries with fresh eyes and a wider
          perspective. The weekly review is where scattered daily
          observations become visible patterns -- where you notice that
          you consistently observe visual details but neglect sound, or
          that your OODA loop observations cluster around interpersonal
          situations.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research on metacognitive monitoring (Dunlosky & Rawson, 2012)
          shows that people who regularly review their own learning
          processes develop more accurate self-assessment. They know what
          they know and what they do not. The weekly review of your field
          log serves the same function: it calibrates your awareness of
          your own observation habits, revealing blind spots you cannot
          see in the moment but that become obvious when you look across
          a week's entries.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Review Process ---- */}
      <VisualStepExplainer
        title="A structured weekly review"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-sm w-full">
                  {[
                    { step: 'Read through all entries', time: '5 min', color: '#5B6F8C' },
                    { step: 'Mark recurring themes or subjects', time: '3 min', color: '#4F7A5A' },
                    { step: 'Note which methods you used most/least', time: '2 min', color: '#B89466' },
                    { step: 'Identify one observation that surprised you', time: '2 min', color: '#4F7A5A' },
                    { step: 'Write a one-paragraph summary', time: '3 min', color: '#5B6F8C' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.step}
                      className="flex items-center gap-3 bg-surface rounded-calm p-2 border border-line-soft"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.12 }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${item.color}15` }}
                      >
                        <span className="text-[9px] font-ui font-bold" style={{ color: item.color }}>
                          {item.time}
                        </span>
                      </div>
                      <p className="text-[10px] font-ui text-ink-secondary">
                        {item.step}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <p className="text-[10px] font-ui text-ink-tertiary">
                  Total: ~15 minutes per week
                </p>
              </div>
            ),
            caption:
              'A 15-minute weekly review: read, mark themes, check method balance, find surprises, summarize. Short enough to sustain, deep enough to reveal patterns.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <svg width="220" height="140" viewBox="0 0 220 140" fill="none">
                  {/* Week timeline */}
                  <line x1="20" y1="70" x2="200" y2="70" stroke="#5B6F8C" strokeWidth="1" opacity="0.3" />
                  {/* Daily dots */}
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => {
                    const x = 30 + i * 27
                    const hasEntry = [0, 1, 3, 5, 6].includes(i)
                    return (
                      <g key={i}>
                        <motion.circle
                          cx={x}
                          cy="70"
                          r={hasEntry ? 8 : 5}
                          fill={hasEntry ? '#4F7A5A' : 'transparent'}
                          stroke={hasEntry ? '#4F7A5A' : '#5B6F8C'}
                          strokeWidth="1.5"
                          opacity={hasEntry ? 0.7 : 0.3}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.08 }}
                        />
                        <text x={x} y="95" textAnchor="middle" fill="#5B6F8C" fontSize="8" fontFamily="ui-sans-serif">
                          {d}
                        </text>
                      </g>
                    )
                  })}
                  {/* Review bracket */}
                  <motion.rect
                    x="15"
                    y="20"
                    width="190"
                    height="30"
                    rx="4"
                    fill="rgba(184,148,102,0.08)"
                    stroke="#B89466"
                    strokeWidth="1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  />
                  <text x="110" y="40" textAnchor="middle" fill="#B89466" fontSize="9" fontFamily="ui-sans-serif">
                    Weekly Review: patterns across entries
                  </text>
                </svg>
              </div>
            ),
            caption:
              'Individual entries are dots. The weekly review connects the dots, revealing patterns that no single entry could show.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-sm w-full">
                  {[
                    { q: 'What did I observe most this week?', purpose: 'Reveals attentional habits' },
                    { q: 'What did I NOT observe?', purpose: 'Reveals blind spots' },
                    { q: 'Which method felt most natural?', purpose: 'Shows current strengths' },
                    { q: 'Where did I skip or rush?', purpose: 'Shows growth edges' },
                    { q: 'What surprised me?', purpose: 'Shows where perception is expanding' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.q}
                      className="flex items-start gap-2 bg-surface rounded-calm p-2 border border-line-soft"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <p className="text-[10px] font-ui text-ink-secondary flex-1">
                        {item.q}
                      </p>
                      <p className="text-[9px] font-ui text-ink-tertiary flex-shrink-0 w-28 text-right">
                        {item.purpose}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Five review questions, each serving a different metacognitive purpose. The combination reveals a complete picture of your observation practice.',
          },
        ]}
      />

      {/* Research paragraph: Pattern detection */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Pattern detection across entries is a form of higher-order
          observation -- observing your observations. This recursive
          quality is what makes the weekly review a genuine learning
          accelerator. Chi, Feltovich and Glaser (1981) showed that
          experts in physics categorize problems by deep structural
          features (underlying principles) while novices categorize by
          surface features (what the problem looks like). The weekly
          review trains you to see the deep structure of your own
          attention, not just the surface content of individual
          observations.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This review practice should be treated gently. It is not a
          performance evaluation. There is no target number of entries,
          no minimum quality threshold. The review is simply an
          invitation to look back with curiosity: what did I notice this
          week? What patterns emerge? What would I like to notice more
          of next week? The tone is inquiry, not judgment.
        </p>
      </section>

      {/* ---- BRANCH SCENARIO ---- */}
      <BranchScenario
        id="review-gap"
        scenario="You sit down for your weekly review and realize you only made two entries this week."
        branches={[
          {
            label: 'I review the two entries I have and look for any patterns or surprises',
            feedback:
              'Good. Two entries is enough to review. Any data is data. What matters is the act of looking back, not the volume of entries.',
          },
          {
            label: 'I feel disappointed and skip the review',
            feedback:
              'The review is even more valuable on low-entry weeks. It reveals what blocked your practice -- and that information is itself an important observation.',
          },
          {
            label: 'I resolve to do better next week by making an entry every day',
            feedback:
              'Resolutions without investigation rarely work. First review what you have. Then ask: what made those two entries happen? Can I create more of those conditions?',
          },
        ]}
      />

      {/* ---- PROMPT ---- */}
      <Prompt
        id="weekly-review-prompt"
        question="Imagine you have kept a field log for one week. Design your review ritual: (1) When will you review (day and time)? (2) What questions will you ask? (3) What will you do with the insights? (4) How will you keep this sustainable?"
        placeholder="Review time: ... Questions: ... Action: ..."
        onSave={savePromptAnswer}
      />

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'The weekly review primarily serves to:',
            options: [
              {
                id: 'a',
                label: 'Grade the quality of your entries',
                correct: false,
              },
              {
                id: 'b',
                label: 'Reveal patterns, blind spots, and growth in your observation practice',
                correct: true,
              },
              {
                id: 'c',
                label: 'Ensure you met a minimum number of entries',
                correct: false,
              },
            ],
          },
          {
            prompt: 'What does "observing your observations" develop?',
            options: [
              {
                id: 'a',
                label: 'Metacognitive awareness -- knowing what and how you observe',
                correct: true,
              },
              {
                id: 'b',
                label: 'Faster reading speed',
                correct: false,
              },
              {
                id: 'c',
                label: 'Perfect memory of all observations',
                correct: false,
              },
            ],
          },
        ]}
      />

      {/* ---- FEYNMAN CHECK ---- */}
      <FeynmanCheck
        id="fieldlog-l2-feynman"
        prompt="Explain to someone why reviewing a week of observations reveals things that each individual observation cannot show."
        rubric={[
          'You explained that patterns only emerge across multiple data points.',
          'You distinguished surface content from deep structure.',
          'You made the 15-minute time investment sound worthwhile.',
          'You addressed the case of low-entry weeks without judgment.',
        ]}
      />

      {/* ---- REFLECTION ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="What do you think you would discover if you reviewed a week of your observations? What attentional habits do you suspect you have? What would you most like to learn about how you see?"
          lessonId="observation.field-log-integration.weekly-review"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 4 &middot; Field Log Integration
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Cross-Pillar Links
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
