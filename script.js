const cards = document.querySelectorAll(`.card`);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle(`show`, entry.isIntersecting);
            if (entry.isIntersecting) observer.unobserve(entry.target);
        });
    },
    { threshold: 1 }
);

const lastCardObserver = new IntersectionObserver(
    (entries) => {
        const lastCard = entries[0];
        if (!lastCard.isIntersecting) return;
        addNewCards();
        lastCardObserver.unobserve(lastCard.target);
        lastCardObserver.observe(document.querySelector(`.card:last-child`));
    },
    { rootMargin: `100px` }
);

cards.forEach((card) => {
    observer.observe(card);
});

lastCardObserver.observe(document.querySelector(`.card:last-child`));
const cardContainer = document.querySelector(`.card-container`);

function addNewCards() {
    for (let i = 0; i <= 10; i++) {
        const card = document.createElement(`div`);
        card.innerText = `New Card`;
        card.classList.add(`card`);
        observer.observe(card);
        cardContainer.append(card);
    }
}
