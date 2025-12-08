// blog.render staat nu als comment in main.js
// // en in index.html staat de <section id="blog"> als comment zodat de blogs niet getoond worden voor deze live versie
import { article1Content } from "./articles/article1";
import { article2Content } from "./articles/article2";
import { article3Content } from "./articles/article3";
import { article4Content } from "./articles/article4";
import { article5Content } from "./articles/article5";
import { article6Content } from "./articles/article6";

const blog = (function () {
  const blogGrid = document.querySelector(".blog-grid");

  // Toegevoegd omdat Blog momenteel niet getoond wordt en je anders een foutmelding krijgt
  if (!blogGrid) {
    // Retourneert een object met een lege render functie,
    // zodat de aanroep elders (blog.render()) geen fout geeft.
    return { render: () => {} };
  }

  const articles = [
    {
      id: article1Content.id,
      header: article1Content.title,
      image: article1Content.image,
      text: article1Content.text,
      date: article1Content.date,
    },
    {
      id: article2Content.id,
      header: article2Content.title,
      image: article2Content.image,
      text: article2Content.text,
      date: article2Content.date,
    },
    {
      id: article3Content.id,
      header: article3Content.title,
      image: article3Content.image,
      text: article3Content.text,
      date: article3Content.date,
    },
    {
      id: article4Content.id,
      header: article4Content.title,
      image: article4Content.image,
      text: article4Content.text,
      date: article4Content.date,
    },
    {
      id: article5Content.id,
      header: article5Content.title,
      image: article5Content.image,
      text: article5Content.text,
      date: article5Content.date,
    },
    {
      id: article6Content.id,
      header: article6Content.title,
      image: article6Content.image,
      text: article6Content.text,
      date: article6Content.date,
    },
  ];

  const gridSizer = document.createElement("div");
  gridSizer.classNameList.add("grid-sizer");
  blogGrid.prepend(gridSizer);

  const msnry = new Masonry(blogGrid, {
    itemSelector: ".grid-item",
    columnWidth: ".grid-sizer",
    percentPosition: true,
    fitWidth: false,
  });

  function render() {
    articles.forEach((article) => {
      const articleElement = document.createElement("div");
      articleElement.classNameList.add("grid-item");

      const articleImg = document.createElement("img");
      articleImg.src = article.image;

      const articleHeader = document.createElement("h3");
      articleHeader.textContent = article.header;

      const articleText = document.createElement("p");
      articleText.textContent = article.text;
      articleText.style.whiteSpace = "pre-line";

      const articleDate = document.createElement("small");
      articleDate.textContent = new Date(article.date).toLocaleDateString(
        "nl-NL",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      );

      articleElement.appendChild(articleImg);
      articleElement.appendChild(articleHeader);
      articleElement.appendChild(articleText);
      articleElement.appendChild(articleDate);

      blogGrid.appendChild(articleElement);
    });
    msnry.appended([...blogGrid.querySelectorAll(".grid-item")]);
    msnry.layout();
  }

  return { render };
})();

export { blog };
