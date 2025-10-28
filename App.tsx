
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { Spinner } from './components/ui/Spinner';

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking onboarding status
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = () => {
    setIsLoading(true);
    // Simulate data processing time
    setTimeout(() => {
      setIsOnboarded(true);
      setIsLoading(false);
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-lg text-gray-300">Initializing PlaceGPT...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {isOnboarded ? <Dashboard /> : <LandingPage onOnboardingComplete={handleOnboardingComplete} />}
    </div>
  );
}
