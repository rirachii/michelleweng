import React from 'react';
import { PROJECTS } from '../constants';
import { RetroCard } from './RetroCard';
import { GlitchText } from './GlitchText';

export const Projects: React.FC = () => {
  return (
    <div className="space-y-12 max-w-6xl mx-auto">
       <div className="border-b border-blue-500/50 pb-2 mb-12 flex justify-between items-end">
        <h2 className="text-4xl text-black font-vt323 tracking-widest">EXECUTABLES</h2>
        <span className="text-xs font-mono text-gray-500">DIR: /usr/local/projects</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
          <RetroCard 
            key={project.id} 
            borderColor={
              project.status === 'ONLINE' ? 'border-green-700' : 
              project.status === 'BETA' ? 'border-yellow-600' : 'border-red-700'
            }
            className="hover:bg-gray-50 transition-colors group"
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-black font-mono">{project.name}</h3>
                  <span className={`text-[10px] px-2 py-0.5 border ${
                      project.status === 'ONLINE' ? 'border-green-600 text-green-700' : 
                      project.status === 'BETA' ? 'border-yellow-600 text-yellow-700' : 'border-red-600 text-red-700'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <div className="w-full h-1 bg-gray-200 mb-4 overflow-hidden">
                   <div className="h-full bg-gray-400 w-1/3 group-hover:w-full transition-all duration-700 ease-in-out" />
                </div>

                <p className="text-gray-600 text-sm font-mono mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-[10px] text-gray-500">
                      [{tech}]
                    </span>
                  ))}
                </div>
              </div>

              <a 
                href={project.link} 
                className="w-full border border-dashed border-gray-400 text-gray-500 text-center py-2 text-xs hover:bg-black hover:text-white hover:border-solid transition-all uppercase"
              >
                 Run {project.name}.exe
              </a>
            </div>
          </RetroCard>
        ))}
      </div>
    </div>
  );
};