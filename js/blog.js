const blog = (function () {
    const articles = [
        {
            id: 1,
            header: 'Groene Innovaties',
            image: './../images/blog/article1.jpg',
            text: 'Ontdek hoe groene technologieën de wereld veranderen en duurzame oplossingen bieden voor de toekomst.',
            date: '2025-01-01',
        },
        {
            id: 2,
            header: 'Tech Nieuws',
            image: './../images/blog/article2.png',
            text: 'Laatste updates over software, apps en gadgets die je dagelijks leven makkelijker maken.',
            date: '2025-01-04',
        },
    ];

    const blogGrid = document.querySelector('.blog-grid');
    const msnry = new Masonry(blogGrid, {
        itemSelector: '.grid-item',
        columnWidth: 240,
        gutter: 20,
        fitWidth: true,
    });

    function render() {
        articles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('grid-item');

            const articleImg = document.createElement('img');
            articleImg.src = article.image;

            const articleHeader = document.createElement('h3');
            articleHeader.textContent = article.header;

            const articleText = document.createElement('p');
            articleText.textContent = article.text;

            const articleDate = document.createElement('small');
            articleDate.textContent = new Date(article.date).toLocaleDateString('nl-NL', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            articleElement.appendChild(articleImg);
            articleElement.appendChild(articleHeader);
            articleElement.appendChild(articleText);
            articleElement.appendChild(articleDate);

            blogGrid.appendChild(articleElement);
        })
        msnry.appended([...blogGrid.querySelectorAll('.grid-item')]);
        msnry.layout();
    }

    return { render };
})();

export { blog }