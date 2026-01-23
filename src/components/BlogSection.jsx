import Masonry from 'masonry-layout'
import { useEffect, useRef, useState } from 'react'
import matter from 'gray-matter';
import { Buffer } from 'buffer';
window.Buffer = Buffer;
import '../styles/blog.css';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";


// returnt raw data en image urls met contenct van "blog-content/articles/article*.md bestanden zonder dat het uitmaakt hoeveel article*.md er zijn
const rawArticleData = Object.values(import.meta.glob('../../blog-content/articles/*.md', { eager: true, query: '?raw', import: 'default' }));
const imageUrls = Object.values(import.meta.glob('../../blog-content/images/*.{png,jpg,jpeg,svg}', { eager: true, query: '?url', import: 'default' }));
const backgrounds = ['article-color-darkgreen', 'article-color-yellow', 'article-color-blue', 'article-color-gray', 'article-color-green'];

const articles = rawArticleData.map((articleArray, index) => {
  const { data, content } = matter(articleArray);
  const image = imageUrls[index];
  const background = backgrounds[index % backgrounds.length];
  return { id: `article-${index}`, ...data, image, content, background };
});

const ArticleCard = ({ title, content, date, author, excerpt, image, onClick, isExpanded, background }) => {
  return (
    <article className={`article-card ${isExpanded ? 'card-expanded' : ''} ${background}`} onClick={onClick}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p className={`${isExpanded ? 'excerpt' : ''}`} >{excerpt}</p>
      {isExpanded ? (
        <>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
            components={{
              h2: ({ children }) => <h4>{children}</h4>,
              h3: ({ children }) => <h5>{children}</h5>,
              ul: ({ children }) => <ul className='ul'>{children}</ul>,
              li: ({ children }) => <li className='ul'>{children}</li>,
            }}
          >
            {content}
          </ReactMarkdown>
          <div className='article-footer'>
            <small>{author}</small>
            <small>{date.toLocaleDateString("nl-NL", { day: "2-digit", month: "long", year: "numeric", })}</small>
          </div>
        </>
      ) : (
        <div className='article-footer'>
          <small>{author}</small>
          <small>{date.toLocaleDateString("nl-NL", { day: "2-digit", month: "long", year: "numeric", })}</small>
        </div>
      )}
    </article>
  );
};

export const BlogSection = ({ className }) => {
  const gridRef = useRef(null);
  const msnryRef = useRef(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (!gridRef.current) return

    msnryRef.current = new Masonry(gridRef.current, {
      itemSelector: '.article-card',
      columnWidth: '.grid-sizer',
      percentPosition: true,
      gutter: 40
    })

    return () => msnryRef.current?.destroy()
  }, []);

  useEffect(() => {
    if (!msnryRef.current) return;
    msnryRef.current.layout();
  }, [expandedId]);

  return (
    <div id='blog' className={`blog-component ${className}`} ref={gridRef}>
      <div className="grid-sizer"></div>
      {articles.map((article, index) => (
        <ArticleCard
          isExpanded={expandedId === article.id}
          onClick={() => { setExpandedId(expandedId === article.id ? null : article.id) }}
          key={index}
          {...article}
        />
      ))}
    </div>
  );
};