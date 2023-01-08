import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Step1 from './components/Step1.jsx';
import Step2 from './components/Step2.jsx';
import Step3 from './components/Step3.jsx';
import './index.css';

function App() {
  return (
    <>
      <h1>Authentication</h1>

      <Routes>
        <Route path="/" element={<Step1 />} />
        <Route path="/step1" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
      </Routes>
    </>
  );
}

export default App;
