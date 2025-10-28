
import React, { useState, useCallback } from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { UploadCloudIcon, FileTextIcon, CheckCircleIcon, ArrowRightIcon } from './icons/Icons';
import { Spinner } from './ui/Spinner';

interface LandingPageProps {
  onOnboardingComplete: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onOnboardingComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSimulateUpload = () => {
    if (!file) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
    }, 2000);
  };

  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };
  
  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
          Welcome to PlaceGPT
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
          The AI-powered placement accelerator for engineering colleges. Boost your placement rates with zero upfront cost.
        </p>
      </div>

      <Card className="mt-10 w-full max-w-2xl bg-gray-800/60 backdrop-blur-xl border-blue-500/30">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Live Placement Simulator</CardTitle>
          <CardDescription>Upload last year’s résumé file (CSV/Excel) to see the predicted lift.</CardDescription>
        </CardHeader>
        <CardContent>
          {!uploadSuccess ? (
            <div className="space-y-6">
               <label 
                className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-900/50 hover:bg-gray-800/50 transition-colors"
                onDragOver={onDragOver}
                onDrop={onDrop}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                  <UploadCloudIcon className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-400"><span className="font-semibold text-blue-400">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">.XLSX, .XLS, or .CSV</p>
                </div>
                <input id="dropzone-file" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
              </label>

              {file && (
                <div className="flex items-center justify-between p-3 rounded-md bg-gray-700">
                  <div className="flex items-center space-x-3">
                    <FileTextIcon className="w-6 h-6 text-blue-400" />
                    <span className="text-sm font-medium text-gray-200">{file.name}</span>
                  </div>
                  <button onClick={() => setFile(null)} className="text-gray-400 hover:text-white">&times;</button>
                </div>
              )}

              <Button onClick={handleSimulateUpload} disabled={!file || isUploading} className="w-full text-lg">
                {isUploading ? <Spinner size="sm" /> : 'Simulate Now'}
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-6 animate-fade-in">
              <CheckCircleIcon className="w-16 h-16 text-green-400 mx-auto" />
              <h3 className="text-3xl font-bold">Predicted Lift: <span className="text-green-400">34%</span></h3>
              <p className="text-gray-300">Our AI model predicts a 34% increase in your placement rate based on the provided data. Ready to onboard your students?</p>
               <div className="bg-gray-700/50 p-4 rounded-lg text-left text-sm">
                  <p className="font-semibold text-gray-200">Zero-Friction Onboarding:</p>
                  <ul className="list-disc list-inside mt-2 text-gray-400 space-y-1">
                    <li>Agent-DataJanitor maps columns and cleans data.</li>
                    <li>Anonymized student IDs ensure compliance.</li>
                    <li>A sharable "Skill Graph" is ready in minutes.</li>
                  </ul>
              </div>
              <Button onClick={onOnboardingComplete} className="w-full text-lg group">
                Proceed to Dashboard
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingPage;
