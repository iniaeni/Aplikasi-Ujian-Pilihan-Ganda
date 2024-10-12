import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PilihanGanda from './pages/pilihanGanda';
import Dashboard from './pages/dashboard'; 



function App() {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/quiz" element={<PilihanGanda />} />
    </Routes>
</Router>
  );
}

export default App;
