import React from 'react';
import { ContentLevel } from '../types';
import { contentLevels } from '../data/contentLevels';
import { Check, Clock, FileText, Zap } from 'lucide-react';

interface ContentLevelSelectionProps {
  selectedLevel: string;
  onLevelChange: (level: string) => void;
}

export const ContentLevelSelection: React.FC<ContentLevelSelectionProps> = ({
  selectedLevel,
  onLevelChange
}) => {
  const getIcon = (levelId: string) => {
    switch (levelId) {
      case 'simple':
        return <Zap className="h-6 w-6" />;
      case 'standard':
        return <FileText className="h-6 w-6" />;
      case 'detailed':
        return <Clock className="h-6 w-6" />;
      default:
        return <FileText className="h-6 w-6" />;
    }
  };

  const getColor = (levelId: string) => {
    switch (levelId) {
      case 'simple':
        return 'from-green-500 to-emerald-500';
      case 'standard':
        return 'from-blue-500 to-indigo-500';
      case 'detailed':
        return 'from-purple-500 to-violet-500';
      default:
        return 'from-blue-500 to-indigo-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">어떤 이력서를 만들까요?</h2>
        <p className="text-gray-600">필요에 맞는 이력서 유형을 선택해주세요</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contentLevels.map((level) => (
          <div
            key={level.id}
            onClick={() => onLevelChange(level.id)}
            className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
              selectedLevel === level.id
                ? 'border-transparent shadow-xl scale-105'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {selectedLevel === level.id && (
              <div className="absolute top-4 right-4 bg-white text-green-600 rounded-full p-2 shadow-lg">
                <Check className="h-4 w-4" />
              </div>
            )}
            
            {/* Header with gradient background */}
            <div className={`bg-gradient-to-r ${getColor(level.id)} rounded-xl p-4 mb-4 text-white`}>
              <div className="flex items-center gap-3 mb-2">
                {getIcon(level.id)}
                <h3 className="text-xl font-bold">{level.name}</h3>
              </div>
              <p className="text-sm opacity-90">{level.description}</p>
            </div>
            
            {/* Features list */}
            <div className="space-y-3">
              {level.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>

            {/* Selection indicator */}
            {selectedLevel === level.id && (
              <div className={`mt-4 bg-gradient-to-r ${getColor(level.id)} text-white text-center py-2 rounded-lg font-medium text-sm`}>
                선택됨
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
        <h3 className="font-semibold text-amber-800 mb-2">💡 추천</h3>
        <p className="text-amber-700 text-sm">
          <strong>처음 사용하시나요?</strong> '기본' 옵션으로 시작해보세요. 
          나중에 언제든지 내용을 추가하거나 수정할 수 있습니다.
        </p>
      </div>
    </div>
  );
};