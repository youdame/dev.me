import { ContentLevel } from '../types';

export const contentLevels: ContentLevel[] = [
  {
    id: 'simple',
    name: '간단하게',
    description: '핵심 정보만 포함한 깔끔한 이력서',
    features: [
      '기본 정보 + 기술 스택',
      '프로젝트 최대 3개',
      '간단한 자기소개',
      '빠른 작성 (5분 내)'
    ]
  },
  {
    id: 'standard',
    name: '기본',
    description: '균형 잡힌 표준 이력서',
    features: [
      '기본 정보 + 기술 스택',
      '프로젝트 제한 없음',
      '개발자 스토리 3개 질문',
      '적당한 작성 시간 (10분 내)'
    ]
  },
  {
    id: 'detailed',
    name: '상세하게',
    description: '모든 기능을 활용한 완전한 이력서',
    features: [
      '모든 개인 정보 항목',
      '프로젝트 제한 없음',
      '개발자 스토리 전체 질문',
      '프로필 이미지 업로드',
      '상세한 작성 (15분 이상)'
    ]
  }
];