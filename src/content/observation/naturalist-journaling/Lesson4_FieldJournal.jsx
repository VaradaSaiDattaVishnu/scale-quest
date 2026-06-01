import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
  ObservationScene,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 4 -- Field Journal
 * Putting the three prompts together into a sustained practice.
 * Journal structure, sketching vs writing, and building a habit.
 */

export default function Lesson4_FieldJournal({
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
          Field Journal
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Combining the three prompts into a sustained observation practice.
        </p>
      </header>

      {/* Research paragraph: The history of field journals */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The field journal has been a tool of scientific observation since at
          least the sixteenth century. Darwin's Beagle notebooks, Maria
          Sibylla Merian's insect illustrations, and Thoreau's daily records
          at Walden all share a common structure: direct observation recorded
          in the moment, before memory has a chance to edit or embellish. Laws
          extends this tradition by making the three prompts -- I notice, I
          wonder, It reminds me of -- the organizing framework for each
          journal entry.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research on the act of drawing as a learning strategy (Fernandes,
          Wammes & Meade, 2018) shows that sketching an object -- even
          poorly -- produces significantly better memory than writing a verbal
          description of it. The "drawing effect" appears to work because
          sketching forces you to attend to spatial relationships, proportions,
          and details that words can skip over. A field journal that combines
          sketching with the three-prompt framework engages both visual and
          verbal encoding channels simultaneously.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Journal Layout ---- */}
      <VisualStepExplainer
        title="Anatomy of a field journal entry"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center py-4">
                <motion.div
                  className="w-64 bg-surface border-2 rounded-gentle p-4"
                  style={{ borderColor: '#4F7A5A' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* Date/location bar */}
                  <div className="flex justify-between text-[9px] font-ui text-ink-tertiary mb-3 pb-2 border-b border-line-soft">
                    <span>Date &middot; Time</span>
                    <span>Location</span>
                  </div>
                  {/* Sketch area */}
                  <div
                    className="h-24 rounded-calm mb-3 flex items-center justify-center border"
                    style={{
                      borderColor: '#B89466',
                      backgroundColor: 'rgba(184,148,102,0.05)',
                    }}
                  >
                    <span className="text-[10px] font-ui" style={{ color: '#B89466' }}>
                      Sketch area
                    </span>
                  </div>
                  {/* Three prompts */}
                  {['I notice...', 'I wonder...', 'It reminds me of...'].map(
                    (p, i) => (
                      <div key={p} className="mb-2">
                        <p
                          className="text-[10px] font-ui font-medium"
                          style={{ color: '#4F7A5A' }}
                        >
                          {p}
                        </p>
                        <div className="h-3 border-b border-line-soft" />
                      </div>
                    )
                  )}
                </motion.div>
              </div>
            ),
            caption:
              'A field journal entry: date, location, a sketch, and the three prompts. Simple structure that can be completed in five to fifteen minutes.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-4 max-w-sm w-full">
                  <div className="bg-surface rounded-calm p-3 border border-line-soft text-center">
                    <p
                      className="text-xs font-ui font-medium mb-1"
                      style={{ color: '#B89466' }}
                    >
                      Writing only
                    </p>
                    <div className="h-2 bg-line-soft rounded-full overflow-hidden">
                      <div
                        className="h-full w-[40%] rounded-full"
                        style={{ backgroundColor: '#B89466' }}
                      />
                    </div>
                    <p className="text-[10px] text-ink-tertiary mt-1 font-ui">
                      Verbal encoding
                    </p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border border-line-soft text-center">
                    <p
                      className="text-xs font-ui font-medium mb-1"
                      style={{ color: '#4F7A5A' }}
                    >
                      Writing + sketch
                    </p>
                    <div className="h-2 bg-line-soft rounded-full overflow-hidden">
                      <div
                        className="h-full w-[80%] rounded-full"
                        style={{ backgroundColor: '#4F7A5A' }}
                      />
                    </div>
                    <p className="text-[10px] text-ink-tertiary mt-1 font-ui">
                      Dual encoding
                    </p>
                  </div>
                </div>
                <p className="text-[10px] font-ui text-ink-tertiary text-center max-w-xs">
                  Fernandes et al. (2018): sketching produces better recall
                  than writing alone, even for non-artists
                </p>
              </div>
            ),
            caption:
              'Combining sketching with written notes engages dual coding -- visual and verbal channels working together for stronger memory traces.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex gap-3 items-center">
                  {[
                    { day: 'M', done: true },
                    { day: 'T', done: true },
                    { day: 'W', done: false },
                    { day: 'T', done: true },
                    { day: 'F', done: false },
                    { day: 'S', done: true },
                    { day: 'S', done: true },
                  ].map((d, i) => (
                    <motion.div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: d.done ? '#4F7A5A' : '#5B6F8C',
                        backgroundColor: d.done
                          ? 'rgba(79,122,90,0.12)'
                          : 'transparent',
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <span
                        className="text-xs font-ui font-medium"
                        style={{ color: d.done ? '#4F7A5A' : '#5B6F8C' }}
                      >
                        {d.day}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <p className="text-[10px] font-ui text-ink-tertiary">
                  5 out of 7 days -- imperfect and completely fine
                </p>
              </div>
            ),
            caption:
              'Consistency matters more than perfection. Five minutes five days a week is better than one perfect hour once a month. Gaps are expected and acceptable.',
          },
        ]}
      />

      {/* Research paragraph: Habit formation */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Lally and colleagues (2010) studied habit formation in daily life
          and found that the median time to automaticity -- the point where
          a behavior feels natural and requires minimal deliberation -- was
          66 days, with a wide range from 18 to 254 days. Missing a single
          day did not meaningfully delay the process. What mattered was the
          cumulative density of repetitions, not an unbroken streak. This
          finding directly contradicts the popular "21 days" myth and has a
          reassuring implication for journaling practice: gaps are normal and
          do not reset progress.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          For a trauma-informed approach, this is especially important.
          Rigid streak-based tracking can trigger perfectionism and
          self-criticism in learners who have internalized punitive
          frameworks. A field journal practice should be framed as a
          returning, not a streak -- each entry is a fresh beginning, not a
          test of whether you maintained continuity. The practice is
          defined by the act of coming back, not by never leaving.
        </p>
      </section>

      {/* ---- OBSERVATION SCENE: Full triad ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Practice: A Complete Entry
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Use all three prompts with the scene below.
        </p>
        <ObservationScene
          scene="stream-bank"
          mode="full-triad"
          promptText="I notice... I wonder... It reminds me of..."
        />
      </section>

      {/* ---- PROMPT ---- */}
      <Prompt
        id="field-journal-entry"
        question="Create a complete field journal entry right now. Pick any subject near you -- a plant, an object, a view from your window. Record: (1) Date and location, (2) A brief sketch description, (3) I notice..., (4) I wonder..., (5) It reminds me of..."
        placeholder="Date: ___  Location: ___  I notice..."
        onSave={savePromptAnswer}
      />

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why does sketching improve memory over writing alone?',
            options: [
              {
                id: 'a',
                label: 'Artists have better memories than writers',
                correct: false,
              },
              {
                id: 'b',
                label: 'Sketching forces attention to spatial relationships and details',
                correct: true,
              },
              {
                id: 'c',
                label: 'Writing is too easy to be effective',
                correct: false,
              },
            ],
          },
          {
            prompt: 'How long does habit formation typically take?',
            options: [
              {
                id: 'a',
                label: 'Exactly 21 days',
                correct: false,
              },
              {
                id: 'b',
                label: 'A median of 66 days, with wide individual variation',
                correct: true,
              },
              {
                id: 'c',
                label: 'It never becomes automatic',
                correct: false,
              },
            ],
          },
          {
            prompt: 'What happens to habit formation if you miss a day?',
            options: [
              {
                id: 'a',
                label: 'Progress resets to zero',
                correct: false,
              },
              {
                id: 'b',
                label: 'It has no meaningful effect on the long-term process',
                correct: true,
              },
              {
                id: 'c',
                label: 'The habit becomes twice as hard to form',
                correct: false,
              },
            ],
          },
        ]}
      />

      {/* ---- FEYNMAN CHECK ---- */}
      <FeynmanCheck
        id="naturalist-l4-feynman"
        prompt="Explain to someone who thinks they 'can't draw' why sketching in a field journal still works for them -- even stick figures."
        rubric={[
          'You explained that sketching is about attention, not art skill.',
          'You mentioned dual coding or the drawing effect.',
          'You addressed the fear of imperfection directly.',
          'Your explanation would make the person want to try.',
        ]}
      />

      {/* ---- REFLECTION ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="What was it like to combine all three prompts into a single entry? Did the structure feel supportive or constraining? What would make this a practice you return to?"
          lessonId="observation.naturalist-journaling.field-journal"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 4 &middot; Naturalist Journaling
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next module: Photography as Seeing
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
