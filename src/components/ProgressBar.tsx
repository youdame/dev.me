import React from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
  onStepClick?: (step: number) => void;
  completedSteps?: number[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentStep, 
  totalSteps, 
  steps, 
  onStepClick,
  completedSteps = []
}) => {
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
        
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center flex-shrink-0">
              <div
                onClick={() => onStepClick && onStepClick(index + 1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                  onStepClick ? 'cursor-pointer hover:scale-110' : ''
                } ${
                  index + 1 === currentStep
                    ? 'bg-blue-600 text-white shadow-lg'
                    : completedSteps.includes(index + 1)
                    ? 'bg-green-500 text-white'
                    : index + 1 < currentStep
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {completedSteps.includes(index + 1) ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                onClick={() => onStepClick && onStepClick(index + 1)}
                className={`ml-2 text-sm transition-colors duration-200 ${
                  onStepClick ? 'cursor-pointer hover:text-blue-600' : ''
                } ${
                  index + 1 === currentStep 
                    ? 'text-blue-600 font-medium' 
                    : completedSteps.includes(index + 1)
                    ? 'text-green-600 font-medium'
                    : index + 1 < currentStep
                    ? 'text-blue-500'
                    : 'text-gray-500'
                }`}
              >
                {step}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`w-6 h-0.5 mx-3 transition-colors duration-200 ${
                    index + 1 < currentStep || completedSteps.includes(index + 1) 
                      ? 'bg-blue-500' 
                      : 'bg-gray-200'
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