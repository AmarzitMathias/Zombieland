


export function dynamicClass() {
  const cards = document.querySelectorAll(".card")
  // biome-ignore lint/complexity/noForEach: <explanation>
  cards.forEach((card) => {
    card.classList.add('card--activity');
  });
  const figcaption = document.querySelectorAll("figcaption")
  // biome-ignore lint/complexity/noForEach: <explanation>
  figcaption.forEach((figcaption) => {
    figcaption.classList.add('figcaption--activity');
  })
  const button = document.getElementById("button-activity")
  button.addEventListener("click", (e) => {
    const containerCards = document.querySelector(".container-card--activity")
    containerCards.classList.remove("only-display-6-cards")
    button.style.visibility = "hidden"
    cards.forEach((card) => {
      card.style.display = "flex";
    });

  })
}


//Permet d'afficher toutes les activités lorsque tu sélectionnes une catégorie dans le filtre
export function showAllActivities() {
  const containerCards = document.querySelector(".container-card--activity")
  containerCards.classList.remove("only-display-6-cards")
  // selectionne le champs du formulaire select
  const filter = document.getElementById('filter-select');
let filterValue;
  // pose un écouteur de changement de valeur sur ce select
  filter.addEventListener('change', () => {
    filterValue = filter.value;
    console.log(filterValue)
    return filterValue
  });

}

