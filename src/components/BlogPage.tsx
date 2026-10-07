import React from 'react';
import { ArrowLeft, Clock, Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { BlogPost, AppRoute, CompanySettings } from '../types';
import { INITIAL_BLOG_POSTS } from '../data/initialData';

interface BlogPageProps {
  currentSlug?: string;
  settings: CompanySettings;
  onNavigate: (route: AppRoute) => void;
  onOpenProjectModal: (serviceName?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  currentSlug,
  settings,
  onNavigate,
  onOpenProjectModal,
}) => {
  const currentPost = currentSlug
    ? INITIAL_BLOG_POSTS.find((p) => p.slug === currentSlug)
    : null;

  if (currentPost) {
    return (
      <article className="min-h-screen bg-slate-50/60 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Back button */}
          <button
            onClick={() => onNavigate({ type: 'blog' })}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>{currentPost.category}</span>
              <span aria-hidden="true">·</span>
              <span>{currentPost.date}</span>
              <span aria-hidden="true">·</span>
              <span>{currentPost.readTime}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {currentPost.title}
            </h1>

            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center">
                {currentPost.author.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">
                  {currentPost.author.name}
                </div>
                <div className="text-xs text-slate-500">
                  {currentPost.author.role}
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6 text-slate-700 text-base leading-relaxed">
            <p className="text-lg font-medium text-slate-800 italic border-l-4 border-blue-600 pl-4 py-1">
              {currentPost.excerpt}
            </p>
            {currentPost.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Bottom Card */}
          <div className="rounded-2xl bg-slate-900 text-white p-8 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold text-white">
                Need high-performance web engineering for your business?
              </h3>
              <p className="text-xs text-slate-400">
                Partner with PCSecure to design and deploy custom digital experiences.
              </p>
            </div>
            <button
              onClick={() => onOpenProjectModal()}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition shrink-0"
            >
              Start a Project
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <div id="blog-catalog-page" className="min-h-screen bg-slate-50/60 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Insights & Engineering Notes
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Perspectives on Modern Web Craft
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Technical analysis, design system patterns, Core Web Vitals optimizations, and conversion strategies from the PCSecure engineering desk.
          </p>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIAL_BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => onNavigate({ type: 'blog', slug: post.slug })}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-200"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span>{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900">
                <span className="text-slate-500">{post.date}</span>
                <span className="inline-flex items-center gap-1 text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
