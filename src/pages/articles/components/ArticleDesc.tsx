import { LandButton } from "@suminhan/land-design";
import React, { useState } from "react";
import '../styles/components/index.css'

type Props = {
  noIndent?: boolean;
  useBg?: boolean;
  toggle?: boolean;
  toggleTitle?: string;
  children?: React.ReactNode;
}
const ArticleDesc: React.FC<Props> = ({
  noIndent,
  useBg,
  toggle,
  toggleTitle,
  children = '正文内容...',
}) => {
  const [open, setOpen] = useState<boolean>(!toggle);
  return <div className={`article-desc ${noIndent ? '' : 'indent-2'} ${useBg ? 'p-12 fs-12 bg-gray radius-8 color-gray-3' : 'color-gray-2 text-14'} overflow-hidden`} style={{ height: open ? '' : "40px" }}>
    {toggle && <div className="flex justify-between items-center w-full">
      <div>{toggleTitle}</div>
      <LandButton type="transparent" onClick={() => setOpen(!open)} text={open ? '收起' : '展开'}></LandButton>
    </div>}
    {children}
  </div>
}

export default ArticleDesc;