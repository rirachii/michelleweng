import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';

export const Blog: React.FC = () => {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="border-b border-red-500/50 pb-2 mb-8 flex justify-between items-end">
        <h2 className="text-2xl text-black font-vt323 tracking-widest">MEMORY_DUMP</h2>
        <span className="text-[10px] font-mono text-gray-500">{BLOG_POSTS.length} RECORDS</span>
      </div>

      <div className="space-y-4">
        {BLOG_POSTS.map((post) => (
          <div key={post.id} className="group relative pl-3 border-l-2 border-gray-300 hover:border-red-500 transition-colors duration-300 pb-4">
            <div className="absolute -left-[5px] top-0 w-2 h-2 bg-white border border-gray-400 group-hover:border-red-500 group-hover:bg-red-500 transition-all" />
            
            <div className="flex flex-col gap-1 mb-1">
              <span className="text-red-600 font-mono text-[10px] tracking-widest">
                [{post.date}]
              </span>
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-black transition-colors cursor-pointer uppercase leading-tight">
                <Link to={`/blog/${post.id}`} className="hover:underline decoration-red-500 underline-offset-4">
                  {post.title}
                </Link>
              </h3>
            </div>
            
            <p className="text-gray-600 font-mono text-xs max-w-xl leading-relaxed mb-2 line-clamp-2">
              {post.excerpt}
            </p>
            
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
               <Link to={`/blog/${post.id}`} className="text-[10px] text-red-600 underline font-bold tracking-wide">
                 ACCESS_FILE &gt;&gt;
               </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};