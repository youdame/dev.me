import React from 'react';
import { ResumeData } from '../types';
import { themes } from '../data/templates';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, ExternalLink, Calendar } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const currentTheme = themes.find(t => t.id === data.selectedTheme) || themes[0];
  
  const containerStyle = {
    backgroundColor: currentTheme.background,
    color: currentTheme.text,
    minHeight: '100vh'
  };

  const cardStyle = {
    backgroundColor: currentTheme.card,
    color: currentTheme.text
  };

  const primaryColor = currentTheme.primary;
  const secondaryColor = currentTheme.secondary;

  if (data.selectedTemplate === 'minimal') {
    return (
      <div style={containerStyle} className="p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            {data.profileImage && (
              <img 
                src={data.profileImage} 
                alt={data.personalInfo.name}
                className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
              />
            )}
            <div>
              <h1 className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
                {data.personalInfo.name}
              </h1>
              <p className="text-xl opacity-80">{data.personalInfo.bio}</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm opacity-70">
              {data.personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {data.personalInfo.email}
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {data.personalInfo.phone}
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {data.personalInfo.location}
                </div>
              )}
            </div>
          </div>

          {/* Narrative Stories */}
          <div className="space-y-6">
            {Object.entries(data.narrativeAnswers).map(([key, answer]) => {
              if (!answer.trim()) return null;
              const questions = {
                hardestProblem: 'Most Challenging Problem',
                proudestAchievement: 'Proudest Achievement',
                learningExperience: 'Learning Journey',
                futureGoals: 'Future Aspirations',
                workStyle: 'Work Approach',
                motivation: 'What Drives Me'
              };
              return (
                <div key={key} style={cardStyle} className="rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3" style={{ color: primaryColor }}>
                    {questions[key as keyof typeof questions]}
                  </h3>
                  <p className="leading-relaxed">{answer}</p>
                </div>
              );
            })}
          </div>

          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: primaryColor }}>Featured Projects</h2>
              <div className="space-y-6">
                {data.projects.map((project) => (
                  <div key={project.id} style={cardStyle} className="rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold" style={{ color: primaryColor }}>
                        {project.title}
                      </h3>
                      <div className="flex gap-3">
                        {project.githubUrl && (
                          <a href={project.githubUrl} className="opacity-60 hover:opacity-100">
                            <Github className="h-5 w-5" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a href={project.liveUrl} className="opacity-60 hover:opacity-100">
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="mb-4 opacity-80">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-3 py-1 rounded-full text-sm"
                            style={{ backgroundColor: currentTheme.background, color: primaryColor }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: primaryColor }}>Technology Stack</h2>
            <div style={cardStyle} className="rounded-xl p-6 shadow-sm">
              {Object.entries(data.techStack).map(([category, items]) => {
                if (items.length === 0) return null;
                return (
                  <div key={category} className="mb-4 last:mb-0">
                    <h3 className="font-semibold mb-2 capitalize opacity-80">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <span 
                          key={item} 
                          className="px-3 py-1 rounded-full text-sm"
                          style={{ backgroundColor: currentTheme.background, color: primaryColor }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default modern template
  return (
    <div style={containerStyle} className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="space-y-6">
            {/* Profile */}
            <div style={cardStyle} className="rounded-xl p-6 shadow-sm text-center">
              {data.profileImage && (
                <img 
                  src={data.profileImage} 
                  alt={data.personalInfo.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
              )}
              <h1 className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>
                {data.personalInfo.name}
              </h1>
              <p className="text-sm opacity-80 mb-4">{data.personalInfo.bio}</p>
              
              <div className="space-y-2 text-sm">
                {data.personalInfo.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" style={{ color: primaryColor }} />
                    <span className="truncate">{data.personalInfo.email}</span>
                  </div>
                )}
                {data.personalInfo.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" style={{ color: primaryColor }} />
                    <span>{data.personalInfo.phone}</span>
                  </div>
                )}
                {data.personalInfo.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" style={{ color: primaryColor }} />
                    <span>{data.personalInfo.location}</span>
                  </div>
                )}
                {data.personalInfo.github && (
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4" style={{ color: primaryColor }} />
                    <span className="truncate">{data.personalInfo.github.replace('https://github.com/', '')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tech Stack */}
            <div style={cardStyle} className="rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4" style={{ color: primaryColor }}>Tech Stack</h2>
              {Object.entries(data.techStack).map(([category, items]) => {
                if (items.length === 0) return null;
                return (
                  <div key={category} className="mb-4 last:mb-0">
                    <h3 className="text-sm font-semibold mb-2 capitalize opacity-80">{category}</h3>
                    <div className="flex flex-wrap gap-1">
                      {items.map((item) => (
                        <span 
                          key={item} 
                          className="px-2 py-1 rounded text-xs"
                          style={{ backgroundColor: currentTheme.background, color: primaryColor }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Projects */}
            {data.projects.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: primaryColor }}>Projects</h2>
                <div className="grid gap-6">
                  {data.projects.map((project) => (
                    <div key={project.id} style={cardStyle} className="rounded-xl p-6 shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold" style={{ color: primaryColor }}>
                          {project.title}
                        </h3>
                        <div className="flex gap-2">
                          {project.githubUrl && (
                            <a href={project.githubUrl} className="opacity-60 hover:opacity-100">
                              <Github className="h-4 w-4" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a href={project.liveUrl} className="opacity-60 hover:opacity-100">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="text-sm opacity-80 mb-3">{project.description}</p>
                      {project.highlights.length > 0 && (
                        <ul className="text-sm opacity-80 mb-3 list-disc list-inside space-y-1">
                          {project.highlights.map((highlight, index) => (
                            <li key={index}>{highlight}</li>
                          ))}
                        </ul>
                      )}
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech) => (
                            <span 
                              key={tech} 
                              className="px-2 py-1 rounded text-xs"
                              style={{ backgroundColor: currentTheme.background, color: primaryColor }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Narrative Answers */}
            <div className="space-y-4">
              {Object.entries(data.narrativeAnswers).map(([key, answer]) => {
                if (!answer.trim()) return null;
                const questions = {
                  hardestProblem: 'Challenging Problem Solved',
                  proudestAchievement: 'Proudest Achievement',
                  learningExperience: 'Learning Journey',
                  futureGoals: 'Future Goals',
                  workStyle: 'Work Approach',
                  motivation: 'What Drives Me'
                };
                return (
                  <div key={key} style={cardStyle} className="rounded-xl p-6 shadow-sm">
                    <h3 className="font-semibold mb-3" style={{ color: primaryColor }}>
                      {questions[key as keyof typeof questions]}
                    </h3>
                    <p className="text-sm leading-relaxed opacity-90">{answer}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};