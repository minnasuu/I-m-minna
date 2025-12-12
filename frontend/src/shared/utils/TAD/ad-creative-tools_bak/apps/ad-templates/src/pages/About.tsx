import Header from '../components/Header';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header
        title="关于我们"
        description="了解更多关于这个项目的信息"
      />
      
      <main className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-4">项目介绍</h2>
            <p className="text-gray-600 mb-6">
              这是一个精心策划的Web UI组件和交互效果集合，旨在为开发者提供灵感和参考。
            </p>
            
            <h3 className="text-xl font-semibold mb-3">特性</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>精选的UI组件和动画效果</li>
              <li>分类浏览和搜索功能</li>
              <li>用户认证系统</li>
              <li>响应式设计</li>
              <li>现代化的技术栈</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}