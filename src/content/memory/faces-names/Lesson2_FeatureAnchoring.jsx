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
 * Lesson 2 -- Feature Anchoring
 * Pick a distinctive facial feature. Visual showing feature identification with SVG faces.
 */

export default function Lesson2_FeatureAnchoring({
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
          Feature Anchoring
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Find the distinctive feature. Attach the name to it.
        </p>
      </header>

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Feature anchoring is the practice of identifying one distinctive physical feature on a person's face and using it as the attachment point for your name-image association. Research by Baddeley (1982) on face recognition showed that we process faces holistically -- as whole patterns rather than collections of parts. But when it comes to linking a name to a face, you need a specific anchor point. The most distinctive feature acts as that anchor, giving your name-image something concrete to attach to.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The key insight is selectivity: you do not need to catalog every feature. You need one that stands out. It might be unusually shaped eyebrows, a prominent nose, deep-set eyes, a wide smile, or a distinctive jawline. The feature does not need to be objectively unusual -- it just needs to be the first thing you notice. That subjective distinctiveness is what makes it a reliable retrieval cue, because it is what your visual system will lock onto again the next time you see the face.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Feature Identification ---- */}
      <VisualStepExplainer
        title="Finding the Anchor Feature"
        steps={[
          {
            visual: (
              <div className="flex gap-6 items-start justify-center py-4">
                {/* Face 1 */}
                <div className="text-center">
                  <svg width="100" height="120" viewBox="0 0 100 120" fill="none">
                    <ellipse cx="50" cy="55" rx="35" ry="42" stroke="#5B6F8C" strokeWidth="1.5" fill="rgba(91,111,140,0.04)" />
                    {/* Eyes */}
                    <ellipse cx="35" cy="48" rx="6" ry="4" stroke="#5B6F8C" strokeWidth="1.2" />
                    <ellipse cx="65" cy="48" rx="6" ry="4" stroke="#5B6F8C" strokeWidth="1.2" />
                    <circle cx="35" cy="48" r="2" fill="#5B6F8C" />
                    <circle cx="65" cy="48" r="2" fill="#5B6F8C" />
                    {/* Prominent nose */}
                    <motion.path
                      d="M50 50C50 50 44 62 42 65C44 67 56 67 58 65C56 62 50 50 50 50Z"
                      stroke="#4F7A5A"
                      strokeWidth="2"
                      fill="rgba(79,122,90,0.1)"
                      animate={{ strokeWidth: [2, 3, 2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    {/* Mouth */}
                    <path d="M40 78C43 82 57 82 60 78" stroke="#5B6F8C" strokeWidth="1.2" />
                    {/* Ears */}
                    <path d="M15 50C12 45 12 60 15 58" stroke="#5B6F8C" strokeWidth="1.2" />
                    <path d="M85 50C88 45 88 60 85 58" stroke="#5B6F8C" strokeWidth="1.2" />
                  </svg>
                  <motion.p
                    className="text-[10px] font-ui font-medium mt-1"
                    style={{ color: '#4F7A5A' }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Anchor: prominent nose
                  </motion.p>
                </div>
                {/* Face 2 */}
                <div className="text-center">
                  <svg width="100" height="120" viewBox="0 0 100 120" fill="none">
                    <ellipse cx="50" cy="55" rx="35" ry="42" stroke="#5B6F8C" strokeWidth="1.5" fill="rgba(91,111,140,0.04)" />
                    {/* Thick eyebrows */}
                    <motion.path
                      d="M25 38C30 34 40 34 45 38"
                      stroke="#4F7A5A"
                      strokeWidth="3"
                      strokeLinecap="round"
                      animate={{ strokeWidth: [3, 4, 3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.path
                      d="M55 38C60 34 70 34 75 38"
                      stroke="#4F7A5A"
                      strokeWidth="3"
                      strokeLinecap="round"
                      animate={{ strokeWidth: [3, 4, 3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    {/* Eyes */}
                    <ellipse cx="35" cy="48" rx="5" ry="4" stroke="#5B6F8C" strokeWidth="1.2" />
                    <ellipse cx="65" cy="48" rx="5" ry="4" stroke="#5B6F8C" strokeWidth="1.2" />
                    <circle cx="35" cy="48" r="2" fill="#5B6F8C" />
                    <circle cx="65" cy="48" r="2" fill="#5B6F8C" />
                    {/* Nose */}
                    <path d="M50 52L46 62H54L50 52" stroke="#5B6F8C" strokeWidth="1.2" />
                    {/* Mouth */}
                    <path d="M40 75C43 79 57 79 60 75" stroke="#5B6F8C" strokeWidth="1.2" />
                  </svg>
                  <motion.p
                    className="text-[10px] font-ui font-medium mt-1"
                    style={{ color: '#4F7A5A' }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Anchor: bold eyebrows
                  </motion.p>
                </div>
              </div>
            ),
            caption: 'Scan the face for one standout feature. It does not need to be objectively unusual -- just the first thing YOU notice. That subjective salience is what makes it a reliable anchor.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
                  {[
                    { feature: 'Eyebrows', icon: 'M4 8C6 5 10 5 12 8' },
                    { feature: 'Nose', icon: 'M8 3L5 12H11L8 3' },
                    { feature: 'Smile', icon: 'M3 8C5 12 11 12 13 8' },
                    { feature: 'Eyes', icon: 'M3 8C3 5 13 5 13 8C13 11 3 11 3 8' },
                    { feature: 'Jawline', icon: 'M3 3C3 3 8 14 13 3' },
                    { feature: 'Ears', icon: 'M8 3C4 3 3 8 3 12C3 12 8 13 8 13' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="bg-surface rounded-calm p-3 border border-line-soft text-center"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <svg width="20" height="16" viewBox="0 0 16 16" fill="none" className="mx-auto mb-1">
                        <path d={item.icon} stroke="#4F7A5A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                      </svg>
                      <p className="text-[10px] font-ui text-ink-secondary">{item.feature}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Common anchor features. Practice scanning real faces in conversation. Within seconds you should identify: "Their most distinctive feature is their ___."',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-full max-w-sm bg-surface rounded-calm border border-line-soft p-4">
                  <p className="text-[10px] font-ui font-bold mb-3" style={{ color: '#4F7A5A' }}>LINKING NAME TO FEATURE</p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-ui font-bold" style={{ color: '#4F7A5A' }}>1</span>
                      <p className="text-[10px] font-ui text-ink-secondary">Notice: "His eyebrows are very thick"</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-ui font-bold" style={{ color: '#4F7A5A' }}>2</span>
                      <p className="text-[10px] font-ui text-ink-secondary">His name is "Grant" -- sounds like "granite"</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-ui font-bold" style={{ color: '#4F7A5A' }}>3</span>
                      <p className="text-[10px] font-ui text-ink-secondary italic">Image: his thick eyebrows are made of solid granite, heavy and chiseled</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-ui font-bold" style={{ color: '#4F7A5A' }}>4</span>
                      <p className="text-[10px] font-ui text-ink-secondary">Next time you see him: thick eyebrows, granite, Grant.</p>
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption: 'The complete chain: notice the feature, convert the name to an image, attach the image to the feature. The feature becomes your retrieval trigger.',
          },
        ]}
      />

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The reason feature anchoring works connects to Tulving's encoding specificity principle: a retrieval cue is effective to the extent that it was encoded alongside the target memory. By deliberately noticing a feature and attaching the name-image to it during encoding, you create a strong cue-target bond. When you see the face again, your visual system automatically processes the same features -- and the distinctive one triggers the name association.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          A common objection is that this process seems slow and deliberate. It is -- at first. But like any skill, feature anchoring speeds up dramatically with practice. Competitive memorizers who specialize in the names-and-faces event at memory championships report that the entire process -- scan, anchor, link -- takes less than five seconds per face after a few weeks of practice. The initial slowness is the investment. The return is a lifetime of reliably remembering the names of people you meet.
        </p>
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What makes a good anchor feature?',
            options: [
              { id: 'notice', label: 'It is the first thing you notice on the face', correct: true },
              { id: 'unusual', label: 'It must be objectively unusual', correct: false },
              { id: 'beautiful', label: 'It must be attractive', correct: false },
            ],
          },
          {
            prompt: 'In the feature anchoring chain, what comes after identifying the distinctive feature?',
            options: [
              { id: 'convert', label: 'Convert the name to a vivid image', correct: true },
              { id: 'repeat', label: 'Repeat the name ten times', correct: false },
              { id: 'write', label: 'Write the name down', correct: false },
            ],
          },
          {
            prompt: 'Why does the name-image need to be attached to the facial feature specifically?',
            options: [
              { id: 'cue', label: 'The feature becomes the retrieval cue when you see the face again', correct: true },
              { id: 'fun', label: 'It makes the image more fun', correct: false },
              { id: 'rule', label: 'It is an arbitrary rule', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="faces-names-l2-feynman"
        prompt="Walk through the complete feature anchoring process for a person named 'Cliff' who has very deep-set eyes. Show each step."
        rubric={[
          'You identified the anchor feature (deep-set eyes).',
          'You converted the name to an image (cliff, rocky ledge).',
          'You linked the image to the feature (eyes like deep cliff caves).',
          'You described how seeing the face again triggers recall.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 6 &middot; Faces and Names
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Face-Name Palace
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
