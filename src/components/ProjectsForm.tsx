import React, { useState } from 'react';
import { Project } from '../types';
import { Plus, Trash2, ExternalLink, Github, Upload, X } from 'lucide-react';

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onChange }) => {
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    technologies: [],
    githubUrl: '',
    liveUrl: '',
    highlights: ['']
  });

  const addProject = () => {
    if (newProject.title && newProject.description) {
      const project: Project = {
        id: Date.now().toString(),
        title: newProject.title,
        description: newProject.description,
        technologies: newProject.technologies || [],
        githubUrl: newProject.githubUrl || '',
        liveUrl: newProject.liveUrl || '',
        image: newProject.image,
        highlights: newProject.highlights?.filter(h => h.trim()) || []
      };
      onChange([...data, project]);
      setNewProject({
        title: '',
        description: '',
        technologies: [],
        githubUrl: '',
        liveUrl: '',
        highlights: ['']
      });
    }
  };

  const removeProject = (id: string) => {
    onChange(data.filter(p => p.id !== id));
  };

  const addTechnology = (tech: string) => {
    if (tech.trim() && !newProject.technologies?.includes(tech.trim())) {
      setNewProject({
        ...newProject,
        technologies: [...(newProject.technologies || []), tech.trim()]
      });
    }
  };

  const removeTechnology = (tech: string) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies?.filter(t => t !== tech) || []
    });
  };

  const addHighlight = () => {
    setNewProject({
      ...newProject,
      highlights: [...(newProject.highlights || []), '']
    });
  };

  const updateHighlight = (index: number, value: string) => {
    const highlights = [...(newProject.highlights || [])];
    highlights[index] = value;
    setNewProject({ ...newProject, highlights });
  };

  const removeHighlight = (index: number) => {
    setNewProject({
      ...newProject,
      highlights: newProject.highlights?.filter((_, i) => i !== index) || []
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewProject({ ...newProject, image: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">프로젝트 소개</h2>
        <p className="text-gray-600">당신의 실력과 경험을 보여줄 수 있는 최고의 작품들을 추가해주세요</p>
      </div>

      {/* Existing Projects */}
      {data.length > 0 && (
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-gray-800">등록된 프로젝트</h3>
          {data.map((project) => (
            <div key={project.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{project.title}</h4>
                  <p className="text-gray-600 mt-1">{project.description}</p>
                </div>
                <button
                  onClick={() => removeProject(project.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              
              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex gap-4">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" 
                     className="text-gray-600 hover:text-gray-800 flex items-center gap-1">
                    <Github className="h-4 w-4" />
                    <span className="text-sm">코드</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                     className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    <ExternalLink className="h-4 w-4" />
                    <span className="text-sm">라이브 데모</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Project Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">새 프로젝트 추가</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="프로젝트 제목 *"
            value={newProject.title || ''}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="GitHub URL"
              value={newProject.githubUrl || ''}
              onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="url"
              placeholder="라이브 URL"
              value={newProject.liveUrl || ''}
              onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <textarea
          placeholder="프로젝트 설명 *"
          value={newProject.description || ''}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 resize-none"
        />

        {/* Technologies */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">사용 기술</label>
          {newProject.technologies && newProject.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {newProject.technologies.map((tech) => (
                <span key={tech} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                  {tech}
                  <button onClick={() => removeTechnology(tech)} className="ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="기술 추가 (엔터키로 추가)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addTechnology((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = '';
                }
              }}
            />
          </div>
        </div>

        {/* Project Highlights */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">주요 성과</label>
          {newProject.highlights?.map((highlight, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="주요 성과나 특징"
                value={highlight}
                onChange={(e) => updateHighlight(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              {newProject.highlights && newProject.highlights.length > 1 && (
                <button
                  onClick={() => removeHighlight(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addHighlight}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 mt-2"
          >
            <Plus className="h-4 w-4" />
            성과 추가
          </button>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">프로젝트 이미지 (선택사항)</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Upload className="h-4 w-4" />
              <span className="text-sm">이미지 업로드</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            {newProject.image && (
              <div className="relative">
                <img src={newProject.image} alt="프로젝트 미리보기" className="w-16 h-16 object-cover rounded-lg" />
                <button
                  onClick={() => setNewProject({ ...newProject, image: undefined })}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={addProject}
          disabled={!newProject.title || !newProject.description}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5" />
          프로젝트 추가
        </button>
      </div>
    </div>
  );
};