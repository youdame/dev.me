import { Template, Theme } from '../types';

export const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern Grid',
    description: 'Clean grid layout with emphasis on projects',
    preview: 'grid-layout'
  },
  {
    id: 'minimal',
    name: 'Minimal Story',
    description: 'Story-driven layout with narrative focus',
    preview: 'story-layout'
  },
  {
    id: 'creative',
    name: 'Creative Showcase',
    description: 'Bold design for creative developers',
    preview: 'creative-layout'
  }
];

export const themes: Theme[] = [
  {
    id: 'blue',
    name: 'Professional Blue',
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
    name: 'Creative Purple',
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
    name: 'Professional Dark',
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
    name: 'Warm Orange',
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
    name: 'Fresh Green',
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
    name: 'Elegant Pink',
    primary: '#EC4899',
    secondary: '#DB2777',
    accent: '#F472B6',
    background: '#FDF2F8',
    card: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#6B7280'
  }
];