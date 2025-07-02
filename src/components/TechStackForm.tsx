import React, { useState } from 'react';
import { TechStack } from '../types';
import { techStackOptions } from '../data/techStack';
import { Plus, X } from 'lucide-react';

interface TechStackFormProps {
  data: TechStack;
  onChange: (data: TechStack) => void;
}

export const TechStackForm: React.FC<TechStackFormProps> = ({ data, onChange }) => {
  const [customInput, setCustomInput] = useState({ languages: '', frameworks: '', tools: '', databases: '' });

  const handleToggle = (category: keyof TechStack, item: string) => {
    const currentItems = data[category];
    const newItems = currentItems.includes(item)
      ? currentItems.filter(i => i !== item)
      : [...currentItems, item];
    
    onChange({ ...data, [category]: newItems });
  };

  const handleCustomAdd = (category: keyof TechStack) => {
    const value = customInput[category].trim();
    if (value && !data[category].includes(value)) {
      onChange({ ...data, [category]: [...data[category], value] });
      setCustomInput({ ...customInput, [category]: '' });
    }
  };

  const handleRemove = (category: keyof TechStack, item: string) => {
    onChange({ ...data, [category]: data[category].filter(i => i !== item) });
  };

  const renderCategory = (category: keyof TechStack, title: string, options: string[]) => (
    <div key={category} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      
      {/* Selected items */}
      {data[category].length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">선택된 기술:</p>
          <div className="flex flex-wrap gap-2">
            {data[category].map((item) => (
              <span
                key={item}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer"
                onClick={() => handleRemove(category, item)}
              >
                {item}
                <X className="h-3 w-3 ml-1" />
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Available options */}
      <div className="flex flex-wrap gap-2 mb-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleToggle(category, option)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              data[category].includes(option)
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Custom input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={customInput[category]}
          onChange={(e) => setCustomInput({ ...customInput, [category]: e.target.value })}
          placeholder={`${title} 직접 추가`}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          onKeyPress={(e) => e.key === 'Enter' && handleCustomAdd(category)}
        />
        <button
          onClick={() => handleCustomAdd(category)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">기술 스택</h2>
        <p className="text-gray-600">사용하는 기술들을 선택해주세요. 없는 기술이 있다면 직접 추가할 수 있어요!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderCategory('languages', '프로그래밍 언어', techStackOptions.languages)}
        {renderCategory('frameworks', '프레임워크 & 라이브러리', techStackOptions.frameworks)}
        {renderCategory('tools', '도구 & 플랫폼', techStackOptions.tools)}
        {renderCategory('databases', '데이터베이스', techStackOptions.databases)}
      </div>
    </div>
  );
};