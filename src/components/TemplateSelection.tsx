import React from 'react';
import { templates, themes } from '../data/templates';
import { Check, Palette } from 'lucide-react';

interface TemplateSelectionProps {
  selectedTemplate: string;
  selectedTheme: string;
  onTemplateChange: (template: string) => void;
  onThemeChange: (theme: string) => void;
}

export const TemplateSelection: React.FC<TemplateSelectionProps> = ({
  selectedTemplate,
  selectedTheme,
  onTemplateChange,
  onThemeChange
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">스타일 선택</h2>
        <p className="text-gray-600">당신의 개성을 나타낼 템플릿과 컬러 테마를 선택해주세요</p>
      </div>

      {/* Template Selection */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">레이아웃 템플릿</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => onTemplateChange(template.id)}
              className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg ${
                selectedTemplate === template.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-4 right-4 bg-blue-500 text-white rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              )}
              
              {/* Template Preview */}
              <div className="mb-4 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-gray-400">
                  <Palette className="h-8 w-8" />
                </div>
              </div>
              
              <h4 className="font-semibold text-gray-800 mb-2">{template.name}</h4>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Theme Selection */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">컬러 테마</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {themes.map((theme) => (
            <div
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md ${
                selectedTheme === theme.id
                  ? 'border-gray-800 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              style={{ backgroundColor: theme.background }}
            >
              {selectedTheme === theme.id && (
                <div className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1">
                  <Check className="h-3 w-3" />
                </div>
              )}
              
              <div className="space-y-2">
                <div className="flex space-x-1">
                  <div 
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <div 
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: theme.secondary }}
                  />
                  <div 
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: theme.accent }}
                  />
                </div>
                <p className="text-sm font-medium" style={{ color: theme.text }}>
                  {theme.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-2">🎨 선택 미리보기</h3>
        <p className="text-gray-600 text-sm mb-4">
          선택한 템플릿: <span className="font-medium">{templates.find(t => t.id === selectedTemplate)?.name}</span>
        </p>
        <p className="text-gray-600 text-sm">
          선택한 테마: <span className="font-medium">{themes.find(t => t.id === selectedTheme)?.name}</span>
        </p>
      </div>
    </div>
  );
};