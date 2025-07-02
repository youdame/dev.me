import React from 'react';
import { PersonalInfo } from '../types';
import { User, Mail, Phone, MapPin, Github, Linkedin, Globe } from 'lucide-react';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  contentLevel: 'simple' | 'standard' | 'detailed';
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange, contentLevel }) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const allFields = [
    { key: 'name' as keyof PersonalInfo, label: '이름', icon: User, required: true, placeholder: '이름을 입력해주세요' },
    { key: 'email' as keyof PersonalInfo, label: '이메일', icon: Mail, required: true, type: 'email', placeholder: '이메일을 입력해주세요' },
    { key: 'phone' as keyof PersonalInfo, label: '전화번호', icon: Phone, type: 'tel', placeholder: '전화번호를 입력해주세요' },
    { key: 'location' as keyof PersonalInfo, label: '거주지', icon: MapPin, placeholder: '거주지를 입력해주세요' },
    { key: 'github' as keyof PersonalInfo, label: 'GitHub URL', icon: Github, type: 'url', placeholder: 'GitHub URL을 입력해주세요' },
    { key: 'linkedin' as keyof PersonalInfo, label: 'LinkedIn URL', icon: Linkedin, type: 'url', placeholder: 'LinkedIn URL을 입력해주세요' },
    { key: 'website' as keyof PersonalInfo, label: '개인 웹사이트', icon: Globe, type: 'url', placeholder: '웹사이트 URL을 입력해주세요' },
  ];

  // Filter fields based on content level
  const getFieldsForLevel = () => {
    switch (contentLevel) {
      case 'simple':
        return allFields.slice(0, 4); // name, email, phone, location
      case 'standard':
        return allFields.slice(0, 5); // + github
      case 'detailed':
        return allFields; // all fields
      default:
        return allFields.slice(0, 5);
    }
  };

  const fieldsToShow = getFieldsForLevel();

  const getLevelDescription = () => {
    switch (contentLevel) {
      case 'simple':
        return '필수 정보만 간단하게 입력해주세요';
      case 'standard':
        return '기본 정보와 GitHub 링크를 입력해주세요';
      case 'detailed':
        return '모든 연락처와 링크 정보를 입력해주세요';
      default:
        return '당신의 개발자 스토리를 만들기 위해 기본 정보를 알려주세요';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">기본 정보부터 시작해볼까요</h2>
        <p className="text-gray-600">{getLevelDescription()}</p>
        {contentLevel !== 'detailed' && (
          <p className="text-sm text-blue-600 mt-2">
            💡 나중에 설정에서 더 많은 정보를 추가할 수 있어요
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fieldsToShow.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key} className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={field.type || 'text'}
                  value={data[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  placeholder={field.placeholder}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          자기소개 / 소개글
        </label>
        <textarea
          value={data.bio}
          onChange={(e) => handleChange('bio', e.target.value)}
          rows={contentLevel === 'simple' ? 3 : 4}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
          placeholder={
            contentLevel === 'simple' 
              ? '간단한 자기소개를 작성해주세요'
              : '자신에 대한 간단한 소개, 관심사, 개발자로서의 동기 등을 작성해주세요'
          }
        />
      </div>
    </div>
  );
};