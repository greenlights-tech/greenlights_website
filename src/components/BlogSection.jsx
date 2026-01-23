import Masonry from 'masonry-layout'
import { useEffect, useRef, useState } from 'react'
import matter from 'gray-matter';
import { Buffer } from 'buffer';
window.Buffer = Buffer;
import '../styles/blog.css';


// returnt raw data en image urls met contenct van "blog-content/articles/article*.md bestanden zonder dat het uitmaakt hoeveel article*.md er zijn
const rawArticleData = Object.values(import.meta.glob('../../blog-content/articles/*.md', { eager: true, query: '?raw', import: 'default' }));
const imageUrls = Object.values(import.meta.glob('../../blog-content/images/*.{png,jpg,jpeg,svg}', { eager: true, query: '?url', import: 'default' }));

const articles = rawArticleData.map((articleArray, index) => {
  const { data, content } = matter(articleArray);
  const image = imageUrls[index];
  return { id: `article-${index}`, ...data, image, content };
});

const ArticleCard = ({ title, content, date, author, excerpt, image, onClick, isExpanded }) => {
  return (
    <article className={`article-card ${isExpanded ? 'card-expanded' : ''}`} onClick={onClick}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{excerpt}</p>
      {/* <div className='article-footer'>
        <p>{author}</p>
        <small>{date.toLocaleDateString("nl-NL", { day: "2-digit", month: "long", year: "numeric", })}</small>
      </div> */}
      {isExpanded && <p>{content}</p>}
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