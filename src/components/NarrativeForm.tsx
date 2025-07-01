import React from 'react';
import { NarrativeAnswers } from '../types';
import { narrativeQuestions } from '../data/techStack';
import { MessageCircle } from 'lucide-react';

interface NarrativeFormProps {
  data: NarrativeAnswers;
  onChange: (data: NarrativeAnswers) => void;
}

export const NarrativeForm: React.FC<NarrativeFormProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof NarrativeAnswers, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Tell Your Developer Story</h2>
        <p className="text-gray-600">Share your journey, challenges, and aspirations to create a narrative that stands out</p>
      </div>

      <div className="space-y-8">
        {narrativeQuestions.map((question) => (
          <div key={question.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                <MessageCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <label className="block text-lg font-medium text-gray-800 mb-3">
                  {question.question}
                </label>
                <textarea
                  value={data[question.id as keyof NarrativeAnswers]}
                  onChange={(e) => handleChange(question.id as keyof NarrativeAnswers, e.target.value)}
                  placeholder={question.placeholder}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                />
                <div className="mt-2 text-right">
                  <span className={`text-sm ${
                    data[question.id as keyof NarrativeAnswers].length > 50 
                      ? 'text-green-600' 
                      : 'text-gray-400'
                  }`}>
                    {data[question.id as keyof NarrativeAnswers].length} characters
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Tips for Great Answers</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Be specific with examples and outcomes</li>
          <li>• Show your problem-solving process</li>
          <li>• Mention technologies and tools you used</li>
          <li>• Focus on impact and learnings</li>
          <li>• Let your personality shine through</li>
        </ul>
      </div>
    </div>
  );
};