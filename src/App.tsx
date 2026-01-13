import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import WordManagePage from './pages/WordManagePage';
import TypingPracticePage from './pages/TypingPracticePage';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div style={{ paddingBottom: '2rem' }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="/" element={
              <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                <h1>타자 연습 마스터에 오신 것을 환영합니다</h1>
                <p>나만의 단어장으로 영어 실력과 타자 속도를 향상시키세요.</p>
              </div>
            } />

            <Route path="/words" element={
              <PrivateRoute>
                <WordManagePage />
              </PrivateRoute>
            } />

            <Route path="/practice" element={
              <PrivateRoute>
                <TypingPracticePage />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
