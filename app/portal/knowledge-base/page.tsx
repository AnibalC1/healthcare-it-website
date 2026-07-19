'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  video_url: string | null;
  video_duration: number | null;
  difficulty: string;
  views: number;
}

export default function KnowledgeBasePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchArticles();
  }, [categoryFilter]);

  const fetchArticles = async () => {
    let query = supabase
      .from('knowledge_base_articles')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (categoryFilter !== 'all') {
      query = query.eq('category', categoryFilter);
    }

    const { data } = await query;

    if (data) {
      setArticles(data);
    }

    setLoading(false);
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.summary?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800',
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'getting-started': '🚀',
      'troubleshooting': '🔧',
      'security': '🔒',
      'compliance': '📋',
      'best-practices': '⭐',
    };
    return icons[category] || '📖';
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '';
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/portal/dashboard" className="text-blue-600 hover:text-blue-700 text-sm mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-sm text-gray-600 mt-1">Self-service guides and video tutorials</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {['all', 'getting-started', 'troubleshooting', 'security', 'compliance', 'best-practices'].map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  categoryFilter === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Categories' : category.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No articles found</h2>
            <p className="text-gray-600">
              {searchQuery ? 'Try a different search term.' : 'Articles will be added soon.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Link key={article.id} href={`/portal/knowledge-base/${article.slug}`} className="block">
                <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow h-full flex flex-col">
                  {/* Video Thumbnail or Icon */}
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-t-lg flex items-center justify-center">
                    {article.video_url ? (
                      <div className="text-white text-center">
                        <div className="text-6xl mb-2">▶️</div>
                        <div className="text-sm">Video Tutorial</div>
                        {article.video_duration && (
                          <div className="text-xs mt-1">{formatDuration(article.video_duration)}</div>
                        )}
                      </div>
                    ) : (
                      <div className="text-6xl">{getCategoryIcon(article.category)}</div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-gray-500">
                        {article.category.replace(/-/g, ' ').toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(article.difficulty)}`}>
                        {article.difficulty}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-1">{article.summary}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>👁️ {article.views} views</span>
                      <span className="text-blue-600 font-medium flex items-center gap-1">
                        Read more
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
