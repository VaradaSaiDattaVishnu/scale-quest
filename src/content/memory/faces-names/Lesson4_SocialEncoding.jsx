import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  BranchScenario,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 4 -- Social Encoding
 * Encode names through conversation context.
 * BranchScenario of a social situation.
 */

export default function Lesson4_SocialEncoding({
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
          Social Encoding
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Use conversation itself as a memory tool.
        </p>
      </header>

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The techniques covered so far -- name-to-image conversion, feature anchoring, face-name palaces -- are powerful but internal. They happen silently in your head. Social encoding adds an external dimension: using the conversation itself to deepen the memory trace. Research on the generation effect (Slamecka & Graf, 1978) shows that information you actively generate is remembered better than information you passively receive. By using a new name in conversation -- repeating it naturally, asking about its origin, or introducing the person to someone else -- you generate the name from memory in a social context, strengthening the trace.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Craik and Lockhart's levels of processing framework also applies here. When you merely hear a name, you are processing it at a shallow, phonological level. When you use the name in a question -- "So, Priya, how did you get started in that field?" -- you are processing it at a deeper, semantic level, embedding it in a meaningful social interaction. The conversation becomes part of the encoding context, giving you additional retrieval cues later: "I met her at that event, she was telling me about how she got into neuroscience..."
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Social Encoding Techniques ---- */}
      <VisualStepExplainer
        title="Encoding Through Conversation"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-full max-w-sm">
                  {[
                    { technique: 'Use their name immediately', example: '"Nice to meet you, Priya."', depth: 'Phonological rehearsal' },
                    { technique: 'Ask about the name', example: '"Priya -- is that Sanskrit in origin?"', depth: 'Semantic processing' },
                    { technique: 'Introduce them to someone', example: '"This is Priya, she works in neuroscience."', depth: 'Generation effect' },
                    { technique: 'Use it in a follow-up question', example: '"So Priya, what drew you to that?"', depth: 'Contextual embedding' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3 mb-3 p-3 bg-surface rounded-calm border border-line-soft"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                        style={{ backgroundColor: 'rgba(79,122,90,0.15)' }}
                      >
                        <span className="text-[9px] font-ui font-bold" style={{ color: '#4F7A5A' }}>{i + 1}</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-ui text-ink-primary font-medium">{item.technique}</p>
                        <p className="text-[10px] font-ui text-ink-secondary italic">"{item.example.replace(/"/g, '')}"</p>
                        <p className="text-[9px] font-ui mt-0.5" style={{ color: '#5B6F8C' }}>{item.depth}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Four social encoding techniques, each deepening the memory trace. Use as many as feel natural in the first two minutes of meeting someone.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-4 items-center">
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#B89466' }}
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <span className="text-[10px] font-ui text-center px-1" style={{ color: '#B89466' }}>Hear name once</span>
                    </motion.div>
                    <p className="text-[9px] font-ui text-ink-tertiary mt-1">~30% recall</p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#5B6F8C' }}
                    >
                      <span className="text-[10px] font-ui text-center px-1" style={{ color: '#5B6F8C' }}>Use name 2x</span>
                    </motion.div>
                    <p className="text-[9px] font-ui text-ink-tertiary mt-1">~55% recall</p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#4F7A5A' }}
                    >
                      <span className="text-[10px] font-ui text-center px-1" style={{ color: '#4F7A5A' }}>Use + anchor + image</span>
                    </motion.div>
                    <p className="text-[9px] font-ui text-ink-tertiary mt-1">~85% recall</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'Stacking techniques compounds the effect. Hearing a name once: ~30% recall. Using it in conversation plus feature anchoring plus a vivid image: ~85% recall.',
          },
        ]}
      />

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          An important nuance: social encoding works best when it feels natural. Research on social anxiety and memory by Richards and colleagues (2002) showed that self-conscious attention during social interactions impairs encoding. If you are so focused on "doing the technique correctly" that you stop listening to the person, the technique defeats itself. The goal is to use the name naturally -- once or twice in the first minute -- while genuinely attending to what the person is saying. The conversation content itself becomes part of the memory.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          A practical tip from memory coaches: do your internal work (feature anchoring, name-to-image) in the first few seconds of the handshake or greeting, then shift entirely to being present in the conversation. The first impression is the encoding window. After that, your job is to be a good listener. The social context you create through genuine attention will itself serve as a retrieval cue later.
        </p>
      </section>

      {/* ---- BRANCH SCENARIO ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Social Situation
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          You are at a networking event. Someone introduces themselves as Priya. What do you do?
        </p>
        <BranchScenario
          scenario="You shake hands with Priya at a conference mixer. She mentions she works in computational neuroscience. You have about 60 seconds before others join the conversation."
          branches={[
            {
              label: 'Nod politely and immediately ask about her work',
              feedback: 'You skipped the name encoding entirely. You might remember what she does but not her name. Take a few seconds for the name first.',
              isOptimal: false,
            },
            {
              label: 'Repeat her name ("Nice to meet you, Priya"), notice her distinctive feature, create a quick image, then ask a follow-up using her name',
              feedback: 'Excellent. You used the name immediately (phonological rehearsal), anchored to a feature, created an image, and embedded the name in a real question. All within a natural conversation flow.',
              isOptimal: true,
            },
            {
              label: 'Close your eyes to visualize the name-image, then ask her to spell her name',
              feedback: 'The visualization instinct is right, but closing your eyes in a social setting signals disengagement. Keep the internal work subtle -- a brief mental image during the handshake is enough.',
              isOptimal: false,
            },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why does using a name in conversation strengthen the memory?',
            options: [
              { id: 'generation', label: 'The generation effect: producing the name from memory strengthens the trace', correct: true },
              { id: 'polite', label: 'It is more polite', correct: false },
              { id: 'repetition', label: 'Simple repetition always works', correct: false },
            ],
          },
          {
            prompt: 'When should you do your internal encoding work (feature anchoring, image creation)?',
            options: [
              { id: 'first', label: 'In the first few seconds during the greeting', correct: true },
              { id: 'after', label: 'After the conversation ends', correct: false },
              { id: 'during', label: 'Throughout the entire conversation', correct: false },
            ],
          },
          {
            prompt: 'What can impair name encoding during social interactions?',
            options: [
              { id: 'anxiety', label: 'Self-conscious attention that pulls focus from the person', correct: true },
              { id: 'noise', label: 'Background noise', correct: false },
              { id: 'time', label: 'The conversation being too short', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="faces-names-l4-feynman"
        prompt="Describe the complete name-encoding protocol for meeting someone at a dinner party, from handshake to sitting down. Include both internal and social techniques."
        rubric={[
          'You described internal techniques (feature anchoring, name-to-image).',
          'You described social techniques (using the name, asking about it).',
          'You addressed timing -- internal work first, then be present.',
          'Your protocol would feel natural, not robotic.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 6 &middot; Faces and Names
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Party Protocol
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
