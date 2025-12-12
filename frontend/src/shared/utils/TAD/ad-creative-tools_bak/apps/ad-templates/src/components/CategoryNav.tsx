import { LandButton } from "@suminhan/land-design";

interface CategoryItem {
  key: string;
  label: string;
}

interface CategoryNavProps {
  ratios: CategoryItem[];
  selectedRatio: string;
  onCategoryChange: (category: string) => void;
  onUpload?: () => void;
}

export default function CategoryNav({
  ratios,
  selectedRatio,
  onCategoryChange,
  onUpload
}: CategoryNavProps) {
  return (
    <nav className="sticky top-0 z-10 px-4 w-full max-w-[1380px] mx-auto">
      <div className="flex justify-between items-center bg-white opacity-90 backdrop-blur-lg h-12">
        <div className="flex gap-4">
          {ratios.map((ratio) => (
            <button
              key={ratio.key}
              className={`py-2 rounded-lg transition-colors cursor-pointer ${selectedRatio === ratio.key ? "font-bold" : ""
                }`}
              onClick={() => onCategoryChange(ratio.key)}
            >
              {ratio.label}
            </button>
          ))}
        </div>
        
        {onUpload && (
          <LandButton
            type={'background'}
            onClick={onUpload}
            text="新建"
            icon={ <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
           
           
          </LandButton>
        )}
      </div>
    </nav>
  );
}