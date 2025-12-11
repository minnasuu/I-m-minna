import React, { useRef } from 'react';
import LineAnchor from './LineAnchor/LineAnchor';

type Props = {
 children?: React.ReactNode;
 showLineAnchor?: boolean;
}

const ArticleLayout: React.FC<Props> = ({ children, showLineAnchor = true }) => {
  const contentRef = useRef<HTMLDivElement>(null);


  return (
    <>
      <div ref={contentRef} className="flex flex-col gap-12 mt-8">
        {children}
      </div>
      {showLineAnchor && (
        <LineAnchor
          contentRef={contentRef}
          autoExtract={true}
        />
      )}
    </>
  );
};

export default ArticleLayout;
