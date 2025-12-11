import React, { useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import { useNavigate } from 'react-router-dom';
import { createArticle } from '../../../shared/utils/backendClient';
import type { CreateArticleRequest } from '../../../shared/utils/backendClient';
import BackButton from '../../../shared/components/BackButton';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ArticleEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateArticleRequest>({
    title: '',
    summary: '',
    content: '',
    publishDate: new Date().toISOString().split('T')[0],
    tags: [],
    readTime: 5,
    coverImage: '',
    link: '',
    type: 'tech',
  });
  const [tagsInput, setTagsInput] = useState('');

  const handleEditorChange = ({ text }: { text: string }) => {
    setFormData(prev => ({ ...prev, content: text }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
    setFormData(prev => ({ ...prev, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createArticle(formData);
      alert('Article created successfully!');
      navigate('/articles');
    } catch (error) {
      console.error('Failed to create article:', error);
      alert('Failed to create article.');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <BackButton />
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white mt-4">Write New Article</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border dark:bg-gray-800 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Publish Date</label>
            <input
              type="date"
              name="publishDate"
              value={formData.publishDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border dark:bg-gray-800 dark:text-white"
              required
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
             <select
               name="type"
               value={formData.type}
               onChange={handleChange}
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border dark:bg-gray-800 dark:text-white"
             >
               <option value="tech">Tech</option>
               <option value="essay">Essay</option>
             </select>
          </div>

           <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Read Time (minutes)</label>
            <input
              type="number"
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Summary</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma separated)</label>
          <input
            type="text"
            value={tagsInput}
            onChange={handleTagsChange}
            placeholder="React, TypeScript, UI"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border dark:bg-gray-800 dark:text-white"
          />
        </div>
        
         <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cover Image URL</label>
            <input
              type="text"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border dark:bg-gray-800 dark:text-white"
            />
          </div>

        <div className="h-[500px]">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
          <MdEditor
            style={{ height: '100%' }}
            renderHTML={text => mdParser.render(text)}
            onChange={handleEditorChange}
            value={formData.content}
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Article
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleEditorPage;

