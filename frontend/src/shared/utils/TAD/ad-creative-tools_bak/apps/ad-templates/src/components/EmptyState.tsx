interface EmptyStateProps {
  category: string;
}

const categoryMessages: Record<string, { title: string; description: string }> = {
  all: {
    title: "暂无模版",
    description: "还没有任何模版，快来上传第一个吧！"
  },
  my: {
    title: "我的模版",
    description: "你还没有上传任何模版，开始创作你的第一个作品吧！"
  },
  style: {
    title: "样式分类",
    description: "这个分类下还没有样式模版，快来分享你的设计灵感！"
  },
  animation: {
    title: "动画分类",
    description: "动画效果分类还是空的，上传一些酷炫的动画模版吧！"
  },
  interaction: {
    title: "交互分类",
    description: "交互模版分类等待你的创意，快来添加一些有趣的交互效果！"
  },
  copywriting: {
    title: "文案分类",
    description: "文案创意分类需要你的灵感，分享一些优秀的文案设计吧！"
  },
  other: {
    title: "其他分类",
    description: "其他分类还没有内容，上传一些独特的模版来丰富这个分类！"
  }
};

export default function EmptyState({ category }: EmptyStateProps) {
  const message = categoryMessages[category] || categoryMessages.all;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md flex flex-col items-center justify-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {message.title}
        </h3>

        <p className="text-gray-500">
          {message.description}
        </p>
      </div>
    </div>
  );
}
