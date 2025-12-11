import React from 'react';
import Link from 'next/link';
import { Layout } from '../../../components/Layout';
import { RetroCard } from '../../../components/RetroCard';
import { BLOG_POSTS } from '../../../constants';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
          <h1 className="text-4xl text-red-600 font-bold font-vt323">ERR_404: FILE_NOT_FOUND</h1>
          <Link href="/" className="text-gray-500 hover:text-black underline font-mono">
            &lt;&lt; RETURN_TO_ROOT
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout activeSection="blog">
      <div className="max-w-3xl mx-auto py-20 space-y-8">
        <Link href="/" className="text-xs font-mono text-gray-400 hover:text-black transition-colors flex items-center gap-2 group mb-8">
           <span className="group-hover:-translate-x-1 transition-transform">&lt;&lt;</span> 
           RETURN_TO_SYSTEM
        </Link>
        
        <RetroCard borderColor="border-black">
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
               <div className="flex justify-between items-baseline mb-2">
                 <span className="text-red-600 font-mono text-xs tracking-widest">[{post.date}]</span>
                 <div className="flex gap-2">
                    {post.tags.map(tag => (
                       <span key={tag} className="text-[10px] border border-gray-300 text-gray-500 px-1 uppercase">{tag}</span>
                    ))}
                 </div>
               </div>
               <h1 className="text-3xl md:text-5xl font-bold text-black font-vt323 tracking-wide">{post.title}</h1>
            </div>

            <div 
              className="prose prose-sm md:prose-base font-mono text-gray-800 max-w-none prose-headings:font-bold prose-headings:text-black prose-a:text-red-600 hover:prose-a:text-red-500"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </div>
        </RetroCard>
      </div>
    </Layout>
  );
}
