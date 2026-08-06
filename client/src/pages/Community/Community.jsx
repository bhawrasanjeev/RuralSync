import React, { useState } from 'react';
import { mockCommunityPosts } from '../../data/mockData';
import { Modal } from '../../components/Modal/Modal';
import {
  MessageSquare,
  PlusCircle,
  ThumbsUp,
  MessageCircle,
  Share2,
  Tag,
  Calendar,
  Users,
  Award,
  Send,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import './Community.css';

export const CommunityPage = () => {
  const [posts, setPosts] = useState(mockCommunityPosts);
  const [activeTab, setActiveTab] = useState('discussions');
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);

  // New Post Form
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Farming Tips');
  const [newContent, setNewContent] = useState('');

  // Comment state
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentInput, setCommentInput] = useState('');

  // Gram Sabha RSVP
  const [rsvped, setRsvped] = useState(false);

  const handleLikePost = (id) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleAddComment = (postId) => {
    if (!commentInput.trim()) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [
              ...p.comments,
              {
                id: Date.now().toString(),
                authorName: 'Rameshwar Singh Patel',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                content: commentInput,
                timestamp: 'Just now',
              },
            ],
          };
        }
        return p;
      })
    );

    setCommentInput('');
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    const newPost = {
      id: `POST-${Date.now()}`,
      author: {
        name: 'Rameshwar Singh Patel',
        villageRole: 'Ward 3 Resident & Farmer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        wardNo: 3,
      },
      title: newTitle,
      content: newContent,
      category: newCategory,
      timestamp: 'Just now',
      likes: 1,
      commentsCount: 0,
      tags: ['GramDiscussions', newCategory.replace(/\s+/g, '')],
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setCreatePostModalOpen(false);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-emerald-950 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
        <div>
          <span className="text-xs font-bold tracking-wider text-teal-300 bg-teal-950/80 px-2.5 py-1 rounded-full border border-teal-700/50 uppercase">
            Gram Sabha Digital Chopal
          </span>
          <h2 className="text-xl md:text-2xl font-bold mt-2">Village Community & Farmers Forum</h2>
          <p className="text-xs text-teal-100 mt-1 max-w-xl">
            Share progressive agricultural advice, RSVP for upcoming Gram Sabha budget meetings, and support local Self-Help Groups (SHGs).
          </p>
        </div>
        <button
          onClick={() => setCreatePostModalOpen(true)}
          className="px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4 text-emerald-950" />
          Share Discussion / Advice
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('discussions')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'discussions'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Farmers & Citizen Discussions
        </button>

        <button
          onClick={() => setActiveTab('gramSabha')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'gramSabha'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Upcoming Gram Sabha Meetings
        </button>

        <button
          onClick={() => setActiveTab('artisan')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'artisan'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          Women SHG & Artisan Showcase
        </button>
      </div>

      {/* Tab 1: Discussions Feed */}
      {activeTab === 'discussions' && (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="community-post-card">
              {/* Author Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img src={post.author.avatar} alt={post.author.name} className="author-avatar" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{post.author.name}</h4>
                    <p className="text-[11px] text-emerald-800 font-medium">{post.author.villageRole} • Ward {post.author.wardNo}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{post.timestamp}</span>
              </div>

              {/* Title & Body */}
              <h3 className="font-bold text-base text-gray-900 leading-snug">{post.title}</h3>
              <p className="text-xs text-gray-700 mt-2 leading-relaxed">{post.content}</p>

              {/* Tags */}
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {post.category}
                </span>
                {post.tags.map((tg, idx) => (
                  <span key={idx} className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5" /> #{tg}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <button
                  onClick={() => handleLikePost(post.id)}
                  className="flex items-center gap-1.5 hover:text-emerald-700 font-medium"
                >
                  <ThumbsUp className="w-4 h-4 text-emerald-600" />
                  <span>{post.likes} Upvotes</span>
                </button>

                <button
                  onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                  className="flex items-center gap-1.5 hover:text-emerald-700 font-medium"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>{post.commentsCount} Comments</span>
                </button>

                <button
                  onClick={() => alert("Discussion link copied to WhatsApp share.")}
                  className="flex items-center gap-1.5 hover:text-emerald-700 font-medium"
                >
                  <Share2 className="w-4 h-4 text-emerald-600" />
                  <span>Share</span>
                </button>
              </div>

              {/* Comments Drawer */}
              {activeCommentPostId === post.id && (
                <div className="mt-4 pt-3 border-t border-gray-100 bg-gray-50 p-3 rounded-xl space-y-3">
                  <h5 className="font-bold text-xs text-gray-900">Community Replies</h5>
                  {post.comments.length === 0 ? (
                    <p className="text-xs text-gray-500 italic">No comments yet. Be the first to reply!</p>
                  ) : (
                    <div className="space-y-2">
                      {post.comments.map((cm) => (
                        <div key={cm.id} className="p-2 bg-white rounded-lg border border-gray-200 text-xs">
                          <div className="flex items-center justify-between font-bold text-gray-900">
                            <span>{cm.authorName}</span>
                            <span className="text-[10px] text-gray-400 font-normal">{cm.timestamp}</span>
                          </div>
                          <p className="text-gray-700 mt-1">{cm.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Comment Input */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Write your advice or question..."
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                      className="flex-1 text-xs border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="px-3 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Gram Sabha Schedule */}
      {activeTab === 'gramSabha' && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-start justify-between border-b border-gray-100 pb-4">
            <div>
              <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full uppercase">
                Official Meeting Agenda
              </span>
              <h3 className="text-xl font-bold text-gray-900 mt-2">Special Independence Day Gram Sabha Meeting</h3>
              <p className="text-xs text-gray-600 mt-1">
                Mandatory annual meeting of all adult citizens of Gram Panchayat Chandanpura.
              </p>
            </div>
            <button
              onClick={() => setRsvped(!rsvped)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-colors ${
                rsvped
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-emerald-700 text-white hover:bg-emerald-800'
              }`}
            >
              {rsvped ? '✓ RSVP Confirmed (Ward 3 Seat Reserved)' : 'RSVP & Reserve Seat'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-gray-500 block">Date & Time</span>
              <strong className="text-gray-900 text-sm block mt-0.5">15th August 2025 (10:00 AM)</strong>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-gray-500 block">Venue</span>
              <strong className="text-gray-900 text-sm block mt-0.5">Panchayat Community Hall & Grounds</strong>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-gray-500 block">Chaired By</span>
              <strong className="text-gray-900 text-sm block mt-0.5">Sarpanch Smt. Rajeshwari Devi</strong>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm text-gray-900 mb-2">Key Agenda Items to be Passed:</h4>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-gray-700">
              <li>Review and citizen approval of FY2025-26 Gram Panchayat Annual Development Budget.</li>
              <li>Selection of beneficiary list for 18 new PMAY-G housing sanctions.</li>
              <li>Water Conservation Plan: Approval of 2 new check dams on Chandanpura stream.</li>
              <li>Audit of completed solar streetlight installations across Wards 1 to 6.</li>
            </ol>
          </div>
        </div>
      )}

      {/* Tab 3: Artisan & SHG Showcase */}
      {activeTab === 'artisan' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                SHG
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Phoolan Women Self-Help Group</h4>
                <p className="text-xs text-gray-500">Handcrafted Jute Bags & Organic Spices</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Empowering 14 village women through sustainable handicrafts, cold-pressed mustard oil, and eco-friendly shopping bags.
            </p>
            <div className="p-2.5 bg-emerald-50 rounded-lg text-xs font-semibold text-emerald-900 flex justify-between">
              <span>Contact: Meena Bai (President)</span>
              <span>+91 94250 11990</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                ART
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Chandanpura Terracotta Artisans</h4>
                <p className="text-xs text-gray-500">Traditional Clay Water Coolers (Matka)</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Hand-carved clay water pots and earthenware diyas made from local river clay. Zero chemical glazes used.
            </p>
            <div className="p-2.5 bg-amber-50 rounded-lg text-xs font-semibold text-amber-900 flex justify-between">
              <span>Master Craftsman: Ramcharan Kumhar</span>
              <span>+91 98263 44556</span>
            </div>
          </div>
        </div>
      )}

      {/* Create Discussion Modal */}
      {createPostModalOpen && (
        <Modal
          isOpen={createPostModalOpen}
          onClose={() => setCreatePostModalOpen(false)}
          title="Share Post in Gram Sabha Forum"
        >
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Post Title</label>
              <input
                type="text"
                required
                placeholder="e.g., Pest control advice for monsoon cotton crop..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
              >
                <option value="Farming Tips">Farming Tips & Agriculture</option>
                <option value="Village Development">Village Development Proposal</option>
                <option value="Youth & Sports">Youth & Sports Event</option>
                <option value="Women SHG">Women Self-Help Group (SHG)</option>
                <option value="General">General Discussion</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Content</label>
              <textarea
                required
                rows={4}
                placeholder="Write your experience, suggestion, or question for village elders and farmers..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800"
            >
              Publish to Gram Forum
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};
