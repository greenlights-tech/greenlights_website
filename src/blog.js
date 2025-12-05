// <section id="blog"> staat nu als comment in index.html zodat de blogs niet getoond worden voor deze live versie

const blog = (function () {
  const blogGrid = document.querySelector(".blog-grid");
  if (!blogGrid) {
    console.warn('blogmodule: Kan blogGrid niet maken. wss blog tag in html uitgecomment.');
    return;
  }

  const rawArticleData = Object.entries(import.meta.glob("./articles/article*.js", { eager: true }));
  // returnt raw data met contenct van article*.js bestanden zonder dat het uitmaakt hoeveel article*.js er zijn

  function buildArticleObjects() {
    const articles = [];
    for (let i = 0; i < rawArticleData.length; i++) {
      articles.push(rawArticleData[i][1].articleContent);
    }
    return articles;
  }

  function sortArticles(articles) {
    return articles.sort((a, b) => parseNLDate(b.date) - parseNLDate(a.date));
  }

  function parseNLDate(str) {
    const [day, month, year] = str.split(/[-/]/).map(Number);
    return new Date(year, month - 1, day);
  }

  function createMasonry() {
    const gridSizer = document.createElement("div");
    gridSizer.classList.add("grid-sizer");
    blogGrid.prepend(gridSizer);

    return new Masonry(blogGrid, {
      itemSelector: ".grid-item",
      columnWidth: ".grid-sizer",
      percentPosition: true,
      fitWidth: false,
    });
  }

  function populateBlogGrid(articleList) {
    articleList.forEach(article => {
      const articleElement = document.createElement('div');
      articleElement.classList.add('grid-item');

      articleElement.innerHTML = `
        <img src="${article.image}" alt="${article.title}">
        <h3>${article.title}</h3>
        <p style="white-space: pre-line;">${article.text}</p>
        <small>${article.date}</small>
      `;

      blogGrid.appendChild(articleElement);
    });
  }

  function render() {
    const sortedArticles = sortArticles(buildArticleObjects(rawArticleData));
    const msnry = createMasonry();
    populateBlogGrid(sortedArticles);
    msnry.appended([...blogGrid.querySelectorAll(".grid-item")]);
    msnry.layout();
  }

  return { render };
})();

export { blog };
