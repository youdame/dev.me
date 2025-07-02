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
        <h2 className="text-3xl font-bold text-gray-800 mb-2">당신의 개발자 스토리를 들려주세요</h2>
        <p className="text-gray-600">여정, 도전, 그리고 꿈을 공유하여 차별화된 이야기를 만들어보세요</p>
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
                    {data[question.id as keyof NarrativeAnswers].length}자
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="font-semibold text-blue-800 mb-2">💡 좋은 답변을 위한 팁</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• 구체적인 예시와 결과를 포함하세요</li>
          <li>• 문제 해결 과정을 보여주세요</li>
          <li>• 사용한 기술과 도구를 언급하세요</li>
          <li>• 영향과 배운 점에 집중하세요</li>
          <li>• 당신의 개성이 드러나도록 작성하세요</li>
        </ul>
      </div>
    </div>
  );
};