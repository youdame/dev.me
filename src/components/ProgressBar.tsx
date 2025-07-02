import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full bg-white shadow-sm border-b">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            dev.me
          </h1>
          <span className="text-sm text-gray-500">
            {currentStep}단계 / 총 {totalSteps}단계
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index + 1 <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`ml-2 text-sm ${
                  index + 1 <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}
              >
                {step}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`w-8 h-0.5 mx-4 ${
                    index + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};