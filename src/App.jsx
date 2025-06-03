import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/app/Home';
import ContactPage from './pages/app/contact/page';
import FeedbackPage from './pages/app/feedback/page';
import JobDetailPage from './pages/app/jobs/[id]/page';
import SavedJobsPage from './pages/app/saved-jobs/page';
import RootLayout from './pages/app/layout';
import SignUp from './components/SignUp';
import SignIn from './pages/app/sign-in';

function App() {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/saved-jobs" element={<SavedJobsPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </RootLayout>
    </Router>
  )
}

export default App
