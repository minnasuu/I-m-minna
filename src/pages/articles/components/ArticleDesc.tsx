import React, { useState } from "react";
import styled from "styled-components";

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
  return <StyledArticlesDesc className={`${noIndent ? '' : 'indent-2'} ${useBg ? 'p-12 fs-12 bg-gray radius-8 color-gray-3' : 'color-gray-2 fs-14'} overflow-hidden`} style={{ height: open ? '' : "54px" }}>
    {toggle && <div className="flex justify-between items-center width-100">
      <div>{toggleTitle}</div>
      <button onClick={() => setOpen(!open)}>展开</button>
    </div>}
    {children}
  </StyledArticlesDesc>
}
const StyledArticlesDesc = styled.div`
button{
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  color: var(--color-primary-6);
  font-size: 12px;
  font-weight: 500;
}
    em{
        font-weight: bold;
        font-style: italic;
    }
    .bold{
        font-weight: bold;
    }
    iframe{
        border: none;
        border-radius: 8px;
    }
    .highlight{
        background: var(--color-primary-1);
        border-radius: 2px;
        padding: 2px 4px;
    }
    ol,
    ul{
        padding-left: 2em;
        li{
            text-indent: 0;
        }
    }
`
export default ArticleDesc;