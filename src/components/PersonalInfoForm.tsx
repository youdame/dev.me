import React from 'react';
import { PersonalInfo } from '../types';
import { User, Mail, Phone, MapPin, Github, Linkedin, Globe } from 'lucide-react';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const inputFields = [
    { key: 'name' as keyof PersonalInfo, label: 'Full Name', icon: User, required: true },
    { key: 'email' as keyof PersonalInfo, label: 'Email', icon: Mail, required: true, type: 'email' },
    { key: 'phone' as keyof PersonalInfo, label: 'Phone', icon: Phone, type: 'tel' },
    { key: 'location' as keyof PersonalInfo, label: 'Location', icon: MapPin },
    { key: 'github' as keyof PersonalInfo, label: 'GitHub URL', icon: Github, type: 'url' },
    { key: 'linkedin' as keyof PersonalInfo, label: 'LinkedIn URL', icon: Linkedin, type: 'url' },
    { key: 'website' as keyof PersonalInfo, label: 'Personal Website', icon: Globe, type: 'url' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Let's start with the basics</h2>
        <p className="text-gray-600">Tell us about yourself so we can create your developer story</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {inputFields.map((field) => {
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
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bio / About Me
        </label>
        <textarea
          value={data.bio}
          onChange={(e) => handleChange('bio', e.target.value)}
          rows={4}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
          placeholder="Write a brief description about yourself, your interests, and what drives you as a developer..."
        />
      </div>
    </div>
  );
};