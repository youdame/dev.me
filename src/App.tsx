import React, { useState } from 'react';
import { ResumeData, PersonalInfo, TechStack, Project, NarrativeAnswers, CustomQuestion } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ProgressBar } from './components/ProgressBar';
import { ContentLevelSelection } from './components/ContentLevelSelection';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { TechStackForm } from './components/TechStackForm';
import { ProjectsForm } from './components/ProjectsForm';
import { NarrativeForm } from './components/NarrativeForm';
import { TemplateSelection } from './components/TemplateSelection';
import { ResumePreview } from './components/ResumePreview';
import { ChevronLeft, ChevronRight, Download, Share2, Eye, Edit, Settings } from 'lucide-react';

function App() {
  const [currentStep, setCurrentStep] = useState(0); // Start with content level selection
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = ['내용 선택', '기본 정보', '기술 스택', '프로젝트', '나의 이야기', '디자인'];
  
  // Initialize with empty data
  const initialData: ResumeData = {
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      github: '',
      linkedin: '',
      website: '',
      bio: ''
    },
    techStack: {
      languages: [],
      frameworks: [],
      tools: [],
      databases: []
    },
    projects: [],
    narrativeAnswers: {
      hardestProblem: '',
      proudestAchievement: '',
      learningExperience: '',
      futureGoals: '',
      workStyle: '',
      motivation: ''
    },
    customQuestions: [],
    selectedTemplate: 'modern',
    selectedTheme: 'blue',
    contentLevel: 'standard'
  };

  const [resumeData, setResumeData] = useLocalStorage<ResumeData>('dev-me-resume-data', initialData);

  const updatePersonalInfo = (data: PersonalInfo) => {
    setResumeData({ ...resumeData, personalInfo: data });
    markStepCompleted(1);
  };

  const updateTechStack = (data: TechStack) => {
    setResumeData({ ...resumeData, techStack: data });
    markStepCompleted(2);
  };

  const updateProjects = (data: Project[]) => {
    setResumeData({ ...resumeData, projects: data });
    markStepCompleted(3);
  };

  const updateNarrativeAnswers = (data: NarrativeAnswers) => {
    setResumeData({ ...resumeData, narrativeAnswers: data });
    markStepCompleted(4);
  };

  const updateCustomQuestions = (data: CustomQuestion[]) => {
    setResumeData({ ...resumeData, customQuestions: data });
  };

  const updateTemplate = (template: string) => {
    setResumeData({ ...resumeData, selectedTemplate: template });
  };

  const updateTheme = (theme: string) => {
    setResumeData({ ...resumeData, selectedTheme: theme });
    markStepCompleted(5);
  };

  const updateContentLevel = (level: string) => {
    setResumeData({ ...resumeData, contentLevel: level as 'simple' | 'standard' | 'detailed' });
    markStepCompleted(0);
  };

  const markStepCompleted = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (step: number) => {
    // Allow navigation to any step after content level is selected
    if (resumeData.contentLevel && step <= steps.length) {
      setCurrentStep(step - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return resumeData.contentLevel;
      case 1:
        return resumeData.personalInfo.name.trim() && resumeData.personalInfo.email.trim();
      case 2:
        return Object.values(resumeData.techStack).some(arr => arr.length > 0);
      case 3:
        return true; // Projects are optional
      case 4:
        return true; // Narrative answers are optional
      case 5:
        return resumeData.selectedTemplate && resumeData.selectedTheme;
      default:
        return true;
    }
  };

  const handleExportPDF = () => {
    window.print();
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${resumeData.personalInfo.name} - 개발자 이력서`,
          url: url,
        });
      } catch (error) {
        console.log('공유 오류:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert('링크가 클립보드에 복사되었습니다!');
      } catch (error) {
        console.log('클립보드 복사 오류:', error);
      }
    }
  };

  if (isPreviewMode) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Preview Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                dev.me
              </h1>
              <p className="text-sm text-gray-600">이력서 미리보기</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPreviewMode(false)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Edit className="h-4 w-4" />
                편집
              </button>
              
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                PDF 다운로드
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                공유하기
              </button>
            </div>
          </div>
        </div>

        <ResumePreview data={resumeData} />
      </div>
    );
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ContentLevelSelection
            selectedLevel={resumeData.contentLevel}
            onLevelChange={updateContentLevel}
          />
        );
      case 1:
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onChange={updatePersonalInfo}
            contentLevel={resumeData.contentLevel}
          />
        );
      case 2:
        return (
          <TechStackForm
            data={resumeData.techStack}
            onChange={updateTechStack}
          />
        );
      case 3:
        return (
          <ProjectsForm
            data={resumeData.projects}
            onChange={updateProjects}
          />
        );
      case 4:
        return (
          <NarrativeForm
            data={resumeData.narrativeAnswers}
            customQuestions={resumeData.customQuestions}
            onChange={updateNarrativeAnswers}
            onCustomQuestionsChange={updateCustomQuestions}
            contentLevel={resumeData.contentLevel}
          />
        );
      case 5:
        return (
          <TemplateSelection
            selectedTemplate={resumeData.selectedTemplate}
            selectedTheme={resumeData.selectedTheme}
            onTemplateChange={updateTemplate}
            onThemeChange={updateTheme}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ProgressBar
        currentStep={currentStep + 1}
        totalSteps={steps.length}
        steps={steps}
        onStepClick={resumeData.contentLevel ? handleStepClick : undefined}
        completedSteps={completedSteps}
      />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 lg:p-12">
            {renderCurrentStep()}
          </div>
          
          {/* Navigation */}
          <div className="bg-gray-50 px-8 py-6 flex justify-between items-center border-t border-gray-100">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              이전
            </button>
            
            <div className="flex items-center gap-4">
              {/* Content Level Indicator */}
              {resumeData.contentLevel && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Settings className="h-4 w-4" />
                  <span>
                    {resumeData.contentLevel === 'simple' && '간단하게'}
                    {resumeData.contentLevel === 'standard' && '기본'}
                    {resumeData.contentLevel === 'detailed' && '상세하게'}
                  </span>
                </div>
              )}

              {currentStep === steps.length - 1 && (
                <button
                  onClick={() => setIsPreviewMode(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  미리보기
                </button>
              )}
              
              {currentStep < steps.length - 1 && (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  다음
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;