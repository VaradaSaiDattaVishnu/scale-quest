import { motion } from 'framer-motion'
import { FeynmanCheck, BranchScenario } from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 3 -- Mentalization Failures
 * How mentalization breaks down: pseudo-mentalization,
 * teleological mode, psychic equivalence, pretend mode.
 */

export default function Lesson3_Failures({
  onComplete, learnTerm, addJournalEntry, savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">Mentalization Failures</h1>
        <p className="font-ui text-ink-secondary text-lg">Recognizing when your mentalizing has broken down.</p>
      </header>

      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Fonagy identified several modes of failed mentalization that people fall into when
          mentalizing capacity is overwhelmed. Recognizing these modes in yourself is one of
          the most practically useful skills in this entire pillar.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Psychic equivalence: inner reality and outer reality are treated as identical. "I
          feel it, so it must be true." If you feel someone is angry at you, they are angry
          at you -- no alternative explanation is considered. This mode erases the distinction
          between perception and reality.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Pretend mode: thoughts and feelings are disconnected from reality entirely.
          Intellectualizing without emotional contact. Someone can describe their situation
          in therapeutic language while being completely out of touch with what they actually
          feel. This often looks like insight but is actually avoidance.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Teleological mode: only observable, concrete actions count. "If you loved me, you
          would have called." The person cannot consider that love might exist without a
          specific behavioral proof. Internal states are only believed when expressed in
          physical, visible form.
        </p>
      </section>

      <VisualStepExplainer
        title="Three failure modes"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-3 gap-3 w-full max-w-lg">
                  {[
                    { mode: 'Psychic Equivalence', sign: '"I feel it, so it is true"', color: '#B89466' },
                    { mode: 'Pretend Mode', sign: '"I understand it intellectually but feel nothing"', color: '#5B6F8C' },
                    { mode: 'Teleological', sign: '"If you cared, you would show it this way"', color: '#B89466' },
                  ].map((item) => (
                    <div key={item.mode} className="bg-surface rounded-calm p-3 border border-line-soft text-center">
                      <p className="text-[10px] font-ui font-semibold mb-2" style={{ color: item.color }}>{item.mode}</p>
                      <p className="text-[9px] font-reading text-ink-secondary italic">{item.sign}</p>
                    </div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Three failure modes. Psychic equivalence collapses perception into reality. Pretend mode disconnects thought from feeling. Teleological mode demands visible proof of invisible states.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-5 border border-line-soft max-w-sm w-full">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3 text-center">Detection Signals</p>
                  <div className="space-y-2">
                    {[
                      { signal: 'Absolute certainty about what someone else thinks', mode: 'Psychic equivalence' },
                      { signal: 'Talking about feelings without feeling them', mode: 'Pretend mode' },
                      { signal: 'Demanding specific actions as proof of care', mode: 'Teleological' },
                      { signal: 'Unable to consider alternative explanations', mode: 'Psychic equivalence' },
                      { signal: 'Intellectualizing when the situation calls for emotion', mode: 'Pretend mode' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-[9px] font-ui text-ink-tertiary w-28 flex-shrink-0">{item.mode}</span>
                        <p className="text-[10px] font-reading text-ink-secondary">{item.signal}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption:
              'These signals help you detect when you (or someone you are reading) have fallen out of genuine mentalization. The first step to recovery is recognition.',
          },
        ]}
      />

      <BranchScenario
        id="mentalization-failure-scenario"
        scenario='Your partner comes home quiet and distant. You immediately feel: "They are upset with me about what I said this morning." You feel certain.'
        branches={[
          {
            label: 'Act on your certainty: apologize for this morning before they say anything',
            outcome: 'This is psychic equivalence: you felt it, so it must be true. But they might be tired, stressed about work, or processing something unrelated. Your certainty is a signal that mentalizing has broken down, not that your reading is accurate.',
            ethicalScore: 'low',
          },
          {
            label: 'Notice the certainty and pause: "I feel sure they are upset with me, but I am in psychic equivalence mode. Let me ask instead of assume."',
            outcome: 'This is meta-mentalization -- mentalizing about your own mentalizing. Recognizing the failure mode is the recovery. You noticed the absolute certainty and flagged it as a symptom, not proof.',
            ethicalScore: 'high',
          },
          {
            label: 'Ask: "You seem quiet tonight. Everything okay?"',
            outcome: 'This is good -- you observed without assuming the cause. You gave them the chance to explain rather than projecting your narrative. Simple and effective.',
            ethicalScore: 'high',
          },
        ]}
      />

      <InteractiveQuiz
        questions={[
          {
            prompt: 'Psychic equivalence means:',
            options: [
              { id: 'ident', label: 'Treating inner feelings as identical to outer reality', correct: true },
              { id: 'psych', label: 'Having psychic abilities', correct: false },
              { id: 'agree', label: 'When two people feel the same thing', correct: false },
            ],
          },
          {
            prompt: 'Pretend mode is dangerous because:',
            options: [
              { id: 'looks', label: 'It looks like insight but is actually avoidance of real feeling', correct: true },
              { id: 'lying', label: 'The person is lying deliberately', correct: false },
              { id: 'harm', label: 'It always leads to harmful behavior', correct: false },
            ],
          },
          {
            prompt: 'The best signal that you are in psychic equivalence is:',
            options: [
              { id: 'certain', label: 'Absolute certainty about what someone else is thinking', correct: true },
              { id: 'confused', label: 'Feeling confused about someone', correct: false },
              { id: 'curious', label: 'Genuine curiosity about their perspective', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="failures-feynman"
        prompt="Describe the three mentalization failure modes in your own words. For each, give a real-world example and explain how you would recognize it in yourself."
        rubric={[
          'You described all three modes accurately.',
          'You gave a concrete, believable example for each.',
          'You explained detection signals for recognizing each mode in yourself.',
          'You connected recognition to recovery.',
        ]}
      />

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 3 of 4 &middot; Mentalization</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next: Mentalization Practice</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}
