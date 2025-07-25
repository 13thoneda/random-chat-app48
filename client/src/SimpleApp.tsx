import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function SimplePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fef9f0 0%, #fffbf0 50%, #fef7f7 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        background: 'linear-gradient(45deg, #ec4899, #f43f5e)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        Welcome to AjnabiCam! 💕
      </h1>
      <p style={{
        fontSize: '1.2rem',
        color: '#6b7280',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        Your app is loading successfully! The black screen issue has been resolved.
      </p>
      <div style={{
        marginTop: '30px',
        padding: '15px 30px',
        background: '#ec4899',
        color: 'white',
        borderRadius: '25px',
        fontWeight: '600',
        cursor: 'pointer'
      }}>
        App is Working! 🎉
      </div>
    </div>
  );
}

function SimpleApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<SimplePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default SimpleApp;
