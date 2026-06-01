import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LevelMap from './components/LevelMap'
import Level from './components/Level'
import Glossary from './components/Glossary'
import Achievements from './components/Achievements'

function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LevelMap />} />
        <Route path="/level/:levelId" element={<Level />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="/achievements" element={<Achievements />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
