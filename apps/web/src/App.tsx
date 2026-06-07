import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Editor from './pages/Editor'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor/:projectId" element={<Editor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" />
    </Router>
  )
}

export default App
