import { Template, Theme } from '../types';

export const templates: Template[] = [
  {
    id: 'modern',
    name: '모던 그리드',
    description: '프로젝트를 강조하는 깔끔한 그리드 레이아웃',
    preview: 'grid-layout'
  },
  {
    id: 'minimal',
    name: '미니멀 스토리',
    description: '스토리 중심의 서사적 레이아웃',
    preview: 'story-layout'
  },
  {
    id: 'creative',
    name: '크리에이티브 쇼케이스',
    description: '창의적인 개발자를 위한 대담한 디자인',
    preview: 'creative-layout'
  }
];

export const themes: Theme[] = [
  {
    id: 'blue',
    name: '프로페셔널 블루',
    primary: '#3B82F6',
    secondary: '#1E40AF',
    accent: '#60A5FA',
    background: '#F8FAFC',
    card: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#6B7280'
  },
  {
    id: 'purple',
    name: '크리에이티브 퍼플',
    primary: '#8B5CF6',
    secondary: '#7C3AED',
    accent: '#A78BFA',
    background: '#FAFAF9',
    card: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#6B7280'
  },
  {
    id: 'dark',
    name: '프로페셔널 다크',
    primary: '#10B981',
    secondary: '#059669',
    accent: '#34D399',
    background: '#111827',
    card: '#1F2937',
    text: '#F9FAFB',
    textSecondary: '#D1D5DB'
  },
  {
    id: 'orange',
    name: '따뜻한 오렌지',
    primary: '#F97316',
    secondary: '#EA580C',
    accent: '#FB923C',
    background: '#FFFBEB',
    card: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#6B7280'
  },
  {
    id: 'green',
    name: '신선한 그린',
    primary: '#22C55E',
    secondary: '#16A34A',
    accent: '#4ADE80',
    background: '#F0FDF4',
    card: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#6B7280'
  },
  {
    id: 'pink',
    name: '우아한 핑크',
    primary: '#EC4899',
    secondary: '#DB2777',
    accent: '#F472B6',
    background: '#FDF2F8',
    card: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#6B7280'
  }
];