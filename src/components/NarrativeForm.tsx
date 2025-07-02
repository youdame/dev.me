import React, { useState } from 'react';
import { NarrativeAnswers, CustomQuestion } from '../types';
import { narrativeQuestions } from '../data/techStack';
import { MessageCircle, Plus, X, Edit3, Trash2 } from 'lucide-react';

interface NarrativeFormProps {
  data: NarrativeAnswers;
  customQuestions: CustomQuestion[];
  onChange: (data: NarrativeAnswers) => void;
  onCustomQuestionsChange: (questions: CustomQuestion[]) => void;
  contentLevel: 'simple' | 'standard' | 'detailed';
}

export const NarrativeForm: React.FC<NarrativeFormProps> = ({ 
  data, 
  customQuestions, 
  onChange, 
  onCustomQuestionsChange, 
  contentLevel 
}) => {
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ question: '', placeholder: '' });

  const handleChange = (field: keyof NarrativeAnswers, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleCustomAnswerChange = (questionId: string, value: string) => {
    onChange({ ...data, [questionId]: value });
  };

  const addCustomQuestion = () => {
    if (newQuestion.question.trim()) {
      const customQuestion: CustomQuestion = {
        id: `custom_${Date.now()}`,
        question: newQuestion.question.trim(),
        placeholder: newQuestion.placeholder.trim() || '답변을 입력해주세요...',
        isCustom: true
      };
      
      onCustomQuestionsChange([...customQuestions, customQuestion]);
      
      // Initialize answer for the new question
      onChange({ ...data, [customQuestion.id]: '' });
      
      setNewQuestion({ question: '', placeholder: '' });
      setShowCustomForm(false);
    }
  };

  const removeCustomQuestion = (questionId: string) => {
    onCustomQuestionsChange(customQuestions.filter(q => q.id !== questionId));
    
    // Remove the answer for this question
    const newData = { ...data };
    delete newData[questionId];
    onChange(newData);
  };

  // Filter questions based on content level
  const getQuestionsForLevel = () => {
    switch (contentLevel) {
      case 'simple':
        return narrativeQuestions.slice(0, 1); // Only first question
      case 'standard':
        return narrativeQuestions.slice(0, 3); // First 3 questions
      case 'detailed':
        return narrativeQuestions; // All questions
      default:
        return narrativeQuestions.slice(0, 3);
    }
  };

  const questionsToShow = getQuestionsForLevel();
  const allQuestions = [...questionsToShow, ...customQuestions];

  const getLevelDescription = () => {
    switch (contentLevel) {
      case 'simple':
        return '핵심 질문 1개로 간단하게 자신을 표현해보세요';
      case 'standard':
        return '3개의 주요 질문으로 당신의 개발자 여정을 들려주세요';
      case 'detailed':
        return '모든 질문에 답하여 완전한 개발자 스토리를 만들어보세요';
      default:
        return '당신의 개발자 스토리를 들려주세요';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">당신의 개발자 스토리를 들려주세요</h2>
        <p className="text-gray-600">{getLevelDescription()}</p>
        {contentLevel !== 'detailed' && (
          <p className="text-sm text-blue-600 mt-2">
            💡 나중에 설정에서 더 많은 질문을 추가할 수 있어요
          </p>
        )}
      </div>

      <div className="space-y-8">
        {allQuestions.map((question, index) => (
          <div key={question.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg flex-shrink-0 ${
                'isCustom' in question ? 'bg-purple-100' : 'bg-blue-100'
              }`}>
                <MessageCircle className={`h-5 w-5 ${
                  'isCustom' in question ? 'text-purple-600' : 'text-blue-600'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-white text-xs px-2 py-1 rounded-full ${
                      'isCustom' in question ? 'bg-purple-600' : 'bg-blue-600'
                    }`}>
                      {index + 1}/{allQuestions.length}
                      {'isCustom' in question && ' 🎨'}
                    </span>
                    <label className="block text-lg font-medium text-gray-800">
                      {question.question}
                    </label>
                  </div>
                  {'isCustom' in question && (
                    <button
                      onClick={() => removeCustomQuestion(question.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-1"
                      title="질문 삭제"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <textarea
                  value={data[question.id as keyof NarrativeAnswers] || ''}
                  onChange={(e) => {
                    if ('isCustom' in question) {
                      handleCustomAnswerChange(question.id, e.target.value);
                    } else {
                      handleChange(question.id as keyof NarrativeAnswers, e.target.value);
                    }
                  }}
                  placeholder={question.placeholder}
                  rows={contentLevel === 'simple' ? 3 : 4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                />
                <div className="mt-2 text-right">
                  <span className={`text-sm ${
                    (data[question.id as keyof NarrativeAnswers] || '').length > 50 
                      ? 'text-green-600' 
                      : 'text-gray-400'
                  }`}>
                    {(data[question.id as keyof NarrativeAnswers] || '').length}자
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Custom Question Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-purple-800 mb-1">나만의 질문 추가하기</h3>
              <p className="text-sm text-purple-600">
                당신만의 특별한 이야기를 담을 수 있는 질문을 만들어보세요
              </p>
            </div>
            {!showCustomForm && (
              <button
                onClick={() => setShowCustomForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                질문 추가
              </button>
            )}
          </div>

          {showCustomForm && (
            <div className="space-y-4 bg-white rounded-lg p-4 border border-purple-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  질문 내용 *
                </label>
                <input
                  type="text"
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                  placeholder="예: 개발자로서 가장 중요하게 생각하는 가치는 무엇인가요?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  답변 가이드 (선택사항)
                </label>
                <input
                  type="text"
                  value={newQuestion.placeholder}
                  onChange={(e) => setNewQuestion({ ...newQuestion, placeholder: e.target.value })}
                  placeholder="답변 작성에 도움이 될 가이드를 입력해주세요"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={addCustomQuestion}
                  disabled={!newQuestion.question.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  질문 추가
                </button>
                <button
                  onClick={() => {
                    setShowCustomForm(false);
                    setNewQuestion({ question: '', placeholder: '' });
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  취소
                </button>
              </div>
            </div>
          )}

          {customQuestions.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-purple-700 mb-2">
                🎨 추가된 나만의 질문: {customQuestions.length}개
              </p>
              <div className="flex flex-wrap gap-2">
                {customQuestions.map((question) => (
                  <span
                    key={question.id}
                    className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                  >
                    {question.question.length > 30 
                      ? `${question.question.substring(0, 30)}...` 
                      : question.question
                    }
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="font-semibold text-blue-800 mb-2">💡 좋은 답변을 위한 팁</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• 구체적인 예시와 결과를 포함하세요</li>
          <li>• 문제 해결 과정을 보여주세요</li>
          <li>• 사용한 기술과 도구를 언급하세요</li>
          <li>• 영향과 배운 점에 집중하세요</li>
          <li>• 당신의 개성이 드러나도록 작성하세요</li>
          <li>• 나만의 질문으로 차별화된 스토리를 만들어보세요</li>
        </ul>
      </div>
    </div>
  );
};