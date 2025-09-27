
// Récupérer les éléments
    const modal = document.getElementById("my_modal");
    const openModalBtn = document.querySelectorAll(".openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    

   export function modalShown(){
        const modal = document.getElementById("my_modal");
        const openModalBtn = document.querySelectorAll(".openModalBtn");
        openModalBtn.forEach(button => {
            button.addEventListener("click", () => {
                console.log("bonsoir")
              modal.showModal(); // Afficher la modale
            });
          });
    }
    // Fonction pour ouvrir le modal


    // Fonction pour fermer le modal
    export function modalClosed(){
        closeModalBtn.addEventListener("click", () => {
            const modal = document.getElementById("my_modal");
            const closeModalBtn = document.getElementById("closeModalBtn");
          modal.close()
        })}; // Ferme le modal

        const deleteModalBtn = document.getElementById("delete");

        export function deleteModal (){
          deleteModalBtn.addEventListener("click", () => {
          const deleteModal = document.getElementById("delete");

            deleteModal.close()

        })};



//Modale Delete






        