import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  Prompt,
  BranchScenario,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 4 -- Requests (NVC Step 4)
 * Making clear, positive, doable requests -- not demands.
 */

export default function Lesson4_Requests({
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
          Requests, Not Demands
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          NVC Step 4: Ask for what would meet your need -- and accept no.
        </p>
      </header>

      {/* Research text */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The final step of NVC is making a request: a specific, positive, doable action that
          would help meet the need you identified. Rosenberg emphasized three qualities: the
          request must say what you want (not what you do not want), it must be concrete
          enough that the listener knows exactly what to do, and -- critically -- it must be a
          genuine request, not a demand. The test: if the other person says no, do you accept
          that, or do you punish them?
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          A demand masquerading as a request is manipulation. It uses the language of NVC
          while violating its spirit. "Would you be willing to..." is only a request if "no"
          is an acceptable answer. If saying no leads to guilt, withdrawal, or retaliation,
          it was a demand with polite packaging.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Ethics check: this is where the ethics filter from Module 1 directly applies. NVC
          is a powerful persuasion tool. Using it to engineer compliance -- even with
          compassionate language -- crosses the line from understanding to manipulation. The
          request step is where that line is most easily crossed.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="Anatomy of a genuine request"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-2 w-full max-w-md justify-center">
                  {['O', 'F', 'N', 'R'].map((letter, i) => (
                    <div key={letter} className="flex items-center">
                      <motion.div
                        className="w-14 h-14 rounded-full flex items-center justify-center"
                        style={{
                          border: `2px solid ${i === 3 ? '#4F7A5A' : '#4F7A5A80'}`,
                          backgroundColor: i === 3 ? 'rgba(79,122,90,0.1)' : 'transparent',
                        }}
                        animate={i === 3 ? { scale: [1, 1.08, 1] } : {}}
                        transition={i === 3 ? { duration: 2, repeat: Infinity } : {}}
                      >
                        <span className="font-ui text-lg font-bold" style={{ color: i === 3 ? '#4F7A5A' : '#4F7A5A80' }}>
                          {letter}
                        </span>
                      </motion.div>
                      {i < 3 && (
                        <svg width="20" height="10" viewBox="0 0 20 10" className="mx-1">
                          <path d="M0 5H16M16 5L12 1M16 5L12 9" stroke="#4F7A5A" strokeWidth="1.5" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Step 4 completes the flow: Observe, Feel, Need, Request. The full sequence builds understanding before asking for anything.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <div className="bg-surface rounded-calm p-4 border-l-4" style={{ borderColor: '#B89466' }}>
                    <p className="text-xs font-ui font-semibold mb-2" style={{ color: '#B89466' }}>Demands</p>
                    <ul className="space-y-2">
                      <li className="text-[11px] font-reading text-ink-secondary">"You need to stop doing that"</li>
                      <li className="text-[11px] font-reading text-ink-secondary">"Do not be so negative"</li>
                      <li className="text-[11px] font-reading text-ink-secondary">"I need you to be more supportive"</li>
                    </ul>
                  </div>
                  <div className="bg-surface rounded-calm p-4 border-l-4" style={{ borderColor: '#4F7A5A' }}>
                    <p className="text-xs font-ui font-semibold mb-2" style={{ color: '#4F7A5A' }}>Requests</p>
                    <ul className="space-y-2">
                      <li className="text-[11px] font-reading text-ink-secondary">"Would you be willing to put your phone away during dinner?"</li>
                      <li className="text-[11px] font-reading text-ink-secondary">"Could you tell me one thing that went well today?"</li>
                      <li className="text-[11px] font-reading text-ink-secondary">"Would you sit with me for ten minutes tonight?"</li>
                    </ul>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Demands tell someone what to stop or what to be. Requests ask for a specific, positive, doable action -- and leave room for no.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="bg-surface rounded-calm p-5 border border-line-soft max-w-sm w-full">
                  <p className="font-ui text-xs font-semibold text-ink-primary mb-3 text-center">The Demand Test</p>
                  <div className="space-y-3">
                    <div className="p-2 rounded-calm text-center" style={{ backgroundColor: 'rgba(79,122,90,0.06)' }}>
                      <p className="text-[11px] font-reading text-ink-secondary">You make a request. They say no.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-2 rounded-calm text-center" style={{ backgroundColor: 'rgba(79,122,90,0.06)', border: '1px solid rgba(79,122,90,0.2)' }}>
                        <p className="text-[10px] font-ui font-semibold" style={{ color: '#4F7A5A' }}>Request</p>
                        <p className="text-[9px] font-reading text-ink-tertiary mt-1">You accept and explore alternatives</p>
                      </div>
                      <div className="p-2 rounded-calm text-center" style={{ backgroundColor: 'rgba(184,148,102,0.06)', border: '1px solid rgba(184,148,102,0.2)' }}>
                        <p className="text-[10px] font-ui font-semibold" style={{ color: '#B89466' }}>Demand</p>
                        <p className="text-[9px] font-reading text-ink-tertiary mt-1">You guilt, withdraw, or punish</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption:
              'The demand test is simple: what happens when they say no? If you accept it and look for alternatives, it was a request. If you punish, withdraw, or guilt, it was a demand in disguise.',
          },
        ]}
      />

      {/* ---- BRANCH SCENARIO ---- */}
      <section className="my-10">
        <BranchScenario
          id="request-vs-demand"
          scenario='You have just completed the full NVC sequence with your partner: "When I see the kitchen left messy after you cook (observation), I feel frustrated (feeling), because I need order in shared spaces to feel calm (need). Would you be willing to clean up within an hour of cooking (request)?" They respond: "I hear you, but honestly, no. I am too tired after cooking to clean right away."'
          branches={[
            {
              label: 'Accept the no and explore: "What timing would work for you?"',
              outcome: 'This proves it was a genuine request. You cared about the need being met, not about getting your way in this specific form. Exploring alternatives together is the heart of NVC.',
              ethicalScore: 'high',
            },
            {
              label: 'Say "Fine" but go cold and withdraw for the evening',
              outcome: 'This reveals it was a demand. The polite NVC language masked a non-negotiable expectation. The withdrawal is punishment for saying no. This is manipulation with compassionate vocabulary.',
              ethicalScore: 'low',
            },
            {
              label: 'Repeat the request more firmly: "But I really need this"',
              outcome: 'Repeating escalates a request into pressure. You are signaling that "no" was not actually acceptable. If you need something non-negotiable, be honest about that rather than framing it as a request.',
              ethicalScore: 'medium',
            },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What makes a request different from a demand?',
            options: [
              { id: 'no', label: 'The listener can say no without facing punishment', correct: true },
              { id: 'polite', label: 'A request uses polite language', correct: false },
              { id: 'quiet', label: 'A request is spoken softly', correct: false },
            ],
          },
          {
            prompt: 'Which is a properly formed NVC request?',
            options: [
              { id: 'stop', label: '"Stop being so messy"', correct: false },
              { id: 'willing', label: '"Would you be willing to wash the dishes before bed tonight?"', correct: true },
              { id: 'need', label: '"I need you to be more responsible"', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="requests-feynman"
        prompt='Explain the "demand test" to someone and why it matters for ethical communication. Give an example of a request that passes the test and one that fails.'
        rubric={[
          'You clearly stated the demand test: what happens when they say no.',
          'You gave a concrete passing example and a failing example.',
          'You connected the test to the ethics of manipulation vs understanding.',
          'You acknowledged that sometimes needs are non-negotiable and how to handle that honestly.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 5 &middot; Nonviolent Communication
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: NVC Practice
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
