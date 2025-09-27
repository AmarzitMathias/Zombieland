import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Account from '../src/components/Account/Account.tsx'; // Assurez-vous que le chemin d'importation est correct
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { MemoryRouter, Router } from 'react-router-dom';

import { server } from './server/server.ts'

// Mock de `localStorage` pour simuler les valeurs dans les tests
const mockLocalStorage = (() => {
  //Objet qui imite les paires clés/valeur
  //Record = Signifie que toutes les clés et valeurs sont des chaînes
  let store: Record<string, string> = {};
  return {
    //Simule un getItem
    getItem: (key: string) => store[key] || null,
    //Simule un setItem
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    //Simule un removeItem
    removeItem: (key: string) => {
      delete store[key];
    },
    //Supprime toutes les valeurs contenues dans store
    clear: () => {
      store = {};
    },
  };
})();

global.localStorage = mockLocalStorage;

describe('Account Component', () => {
  //Avant chaque test, il se passe:
  beforeEach(() => {
    //On créé un appel à l'api fictif
    global.fetch = vi.fn();

        // On crée un JWT fictif avec un id
    const token = {
      id: '400',
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // expiration dans 1 heure
    };

    // On encode le JWT en base64 (simule un JWT)
    const encodedToken = btoa(JSON.stringify(token));

    // On ajoute ce token fictif dans le localStorage
    mockLocalStorage.setItem('JWT', encodedToken);
  });

  //Après chaque test, il se passe:
  afterEach(() => {
    //on vide tout les mocks
    vi.resetAllMocks();
    //on vide le mock du local storage
    mockLocalStorage.clear();
  });

  //Test d'intégration
  it("Devrait afficher les informations de l'utilisateur correctement", async () => {

    const token = mockLocalStorage.getItem('JWT')
    // Mock fetch pour renvoyer des données utilisateur
    global.fetch.mockResolvedValueOnce({
      json: async () => ({
        account: {
          firstname: "Marcel",
          lastname: "Lasnard",
          email: "marcel.lasnard@test.com",
          tickets: [],
        },
      }),
    });
    
    //On fait un render de notre composant account avec un memoryRouter sinon message d'erreur
    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    );

    // Vérifie que le prénom, nom, et email sont affichés
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/api/account`, // L'URL attendue
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${token}`, // Vérifier que l'Authorization est correcte
          }),
        })
      );
      expect(screen.getByText('Prénom: Marcel')).toBeInTheDocument();
      expect(screen.getByText('Nom de famille: Lasnard')).toBeInTheDocument();
      expect(screen.getByText('Email: marcel.lasnard@test.com')).toBeInTheDocument();
    });
  });

  //!Test d'intégration
  it("N'affiche rien lorsque le fetch ne fonctionne pas", async () => {
    // Mock fetch si le fetch échoue, cela peut se passer si l'utilisateur possède déjà un token mais que la BDD crash
    global.fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Prénom:')).toBeInTheDocument();
      expect(screen.getByText('Nom de famille:')).toBeInTheDocument();
      expect(screen.getByText('Email:')).toBeInTheDocument();
    });
  });

  //Test unitaire
  it('Devrait appeler la fonction deconnecter et nettoyer le token du localStorage', async () => {
     // Mock fetch pour renvoyer des données utilisateur
     global.fetch.mockResolvedValueOnce({
      json: async () => ({
        account: {
          firstname: "Marcel",
          lastname: "Lasnard",
          email: "marcel.lasnard@test.com",
          tickets: [],
        },
      }),
    });

    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    );

    // On s'assure qu'un token est présent dans le mockLocalStorage
   const token = mockLocalStorage.getItem('JWT');
  
  // Vérifie que le token est bien présent avant l'action de déconnexion
  expect(token).not.toBeNull();

    // Trouver le bouton de déconnexion et cliquer dessus
    const logoutButton = screen.getByText('Se déconnecter');
    fireEvent.click(logoutButton);

    // Vérifier que localStorage a été vidé et redirigé
    await waitFor(() => {
      expect(mockLocalStorage.getItem('JWT')).toBeNull();
    });
  });

  //Test unitaire
  it('Devrait ouvrir la modale pour modifier le prénom lorsque le premier bouton "modifier" est cliqué', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({
        account: {
          firstname: "Marcel",
          lastname: "Lasnard",
          email: "marcel.lasnard@test.com",
          tickets: [],
        },
      }),
    });

    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    );

    // Trouver et cliquer sur le bouton "Modifier" pour le prénom
    const modifyButton = screen.getAllByText('Modifier');
    fireEvent.click(modifyButton[0]);

    // Vérifie que la modale est ouverte et a le bon texte
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Êtes-vous sûr de vouloir modifier votre prénom ?')).toBeInTheDocument();
    });
  });

  it(' Devrait ouvrir la modale pour modifier le nom lorsque le premier bouton "modifier" est cliqué', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({
        account: {
          firstname: "Marcel",
          lastname: "Lasnard",
          email: "marcel.lasnard@test.com",
          tickets: [],
        },
      }),
    });

    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    );

    // Trouver et cliquer sur le bouton "Modifier" pour le nom
    const modifyButton = screen.getAllByText('Modifier');

    // On prend le troisème car il y a déjà 4 boutons modifier et que chaque bouton a une modal qui contient aussi un bouton modifier
    fireEvent.click(modifyButton[2]);

    // Vérifie que la modale est ouverte
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Êtes-vous sûr de vouloir modifier votre nom ?')).toBeInTheDocument();
    });
  });

  it("Devrait ouvrir la modale pour modifier l'email lorsque le premier bouton modifier est cliqué", async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({
        account: {
          firstname: "Marcel",
          lastname: "Lasnard",
          email: "marcel.lasnard@test.com",
          tickets: [],
        },
      }),
    });

    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    );

    // Trouver et cliquer sur le bouton "Modifier" pour l'email
    const modifyButton = screen.getAllByText('Modifier');

    // On prend le cinquième car il y a déjà 4 boutons modifier et que chaque bouton a une modal qui contient aussi un bouton modifier

    fireEvent.click(modifyButton[4]);

    // Vérifie que la modale est ouverte
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Êtes-vous sûr de vouloir modifier votre email ?')).toBeInTheDocument();
    });
  });

  it("Devrait ouvrir la modale pour modifier le mot de passe lorsque le premier bouton modifier est cliqué", async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({
        account: {
          firstname: "Marcel",
          lastname: "Lasnard",
          email: "marcel.lasnard@test.com",
          tickets: [],
        },
      }),
    });

    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    );

    // Trouver et cliquer sur le bouton "Modifier" pour le mot de passe
    const modifyButton = screen.getAllByText('Modifier');

    // On prend le septième car il y a déjà 4 boutons modifier et que chaque bouton a une modal qui contient aussi un bouton modifier
    fireEvent.click(modifyButton[6]);

    // Vérifie que la modale est ouverte
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Êtes-vous sûr de vouloir modifier votre mot de passe ?')).toBeInTheDocument();
    });
  });

  //Test d'intégration
  it('Devrait afficher aucun ticket lorsque le bouton "Mes réservations" est cliqué', async () => {
    const token = mockLocalStorage.getItem('JWT')
    global.fetch.mockResolvedValueOnce({
      json: async () => ({
        account: {
          firstname: "Marcel",
          lastname: "Lasnard",
          email: "marcel.lasnard@test.com",
          tickets: [],
        },
      }),
    });

    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    );


    const reservationButton = screen.getByText('Mes réservations');
    fireEvent.click(reservationButton);

    // Vérifier que le message "Aucune réservation" est affiché
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/api/account`, // L'URL attendue
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${token}`, // Vérifier que l'Authorization est correcte
          }),
        })
      );
      expect(screen.getByText("Vous n'avez pas encore de tickets")).toBeInTheDocument();
      
    });
  });

  //Test d'intégration
  it('Devrait afficher un ticket lorsque le bouton "Mes réservations" est cliqué', async () => {
    const token = mockLocalStorage.getItem('JWT')

    const ticket= {
      created_at: "2025-03-29T18:25:48.760Z",
              date: "2025-03-20",
              id: 400,
              id_tariff: 1,
              id_user: 404,
              updated_at: "2025-03-29T18:25:48.760Z",
    }

    global.fetch.mockResolvedValueOnce({
      json: async () => ({
        account: {
          firstname: "Marcel",
          lastname: "Lasnard",
          email: "marcel.lasnard@test.com",
          tickets: [
            {
              created_at: ticket.created_at,
              date: ticket.date,
              id: ticket.id,
              id_tariff: ticket.id_tariff,
              id_user: ticket.id_user,
              updated_at: ticket.updated_at,
            },
          ],
        },
      }),
    });

    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    );

    const reservationButton = screen.getByText('Mes réservations');
    fireEvent.click(reservationButton);

    // Vérifier que le message "Aucune réservation" est affiché
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/api/account`, // L'URL attendue
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${token}`, // Vérifier que l'Authorization est correcte
          }),
        })
      );
            // Vérifier les en-têtes du tableau
            expect(screen.getByText("Id")).toBeInTheDocument();
            expect(screen.getByText("Date d'accès")).toBeInTheDocument();
            expect(screen.getByText("Pris le")).toBeInTheDocument();
            // Vérifier que les informations du ticket sont affichées dans le tableau
            expect(screen.getByText(ticket.id)).toBeInTheDocument(); // Vérifier l'ID du ticket
            expect(screen.getByText(ticket.date)).toBeInTheDocument(); // Vérifier la date d'accès
            expect(screen.getByText(ticket.created_at)).toBeInTheDocument(); // Vérifier la date de création
    });
  });

  //test unitaire
  it('Devrait ouvrir la modale pour supprimer un compte en cliquant sur le bouton "Supprimer mon compte"', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({
        account: {
          firstname: "Marcel",
          lastname: "Lasnard",
          email: "marcel.lasnard@test.com",
          tickets: [],
        },
      }),
    });
    
    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    );

    // Trouver et cliquer sur le bouton "Supprimer mon compte"
    const deleteButton = screen.getByText('Supprimer mon compte');
    fireEvent.click(deleteButton);
    // Vérifie que la modale de suppression est ouverte
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      // Cibler le dialog avec la classe "deletemodal" en même temps que son rôle
      expect(screen.getByText('Voulez-vous vraiment supprimer votre compte ?')).toBeInTheDocument();

    });
  });

  it("Devrait amener à l'accueil sans token en cliquant sur le bouton Supprimer mon compte et valider", async () => {

    // On s'assure qu'un token est présent dans le mockLocalStorage
   const token = mockLocalStorage.getItem('JWT');
  console.log(token)

   // Vérifie que le token est bien présent 
   expect(token).not.toBeNull();
    
    global.fetch.mockResolvedValueOnce({
      json: async () => ({
        account: {
          firstname: "Marcel",
          lastname: "Lasnard",
          email: "marcel.lasnard@test.com",
          tickets: [],
        },
      }),
    }).mockResolvedValueOnce({
      ok: true,
      status: 200, // Suppression réussie
      json: async () => ({ message: "Succès" }), // Retourne un message de succès
    });
    
    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    );

    // Trouver et cliquer sur le bouton "Supprimer mon compte"
    const deleteButton = screen.getByText('Supprimer mon compte');
    fireEvent.click(deleteButton);
    // Vérifie que la modale de suppression est ouverte
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      // Cibler le dialog avec la classe "deletemodal" en même temps que son rôle
      expect(screen.getByText('Voulez-vous vraiment supprimer votre compte ?')).toBeInTheDocument();
    });
    const validateButton = screen.getAllByText('Valider');

    fireEvent.click(validateButton[1]);
    console.log(localStorage)

    // Attendre que la requête fetch soit appelée 
  await waitFor(async () => {
    // Vérifie que fetch a été appelé une deuxième fois (pour que cela sélectionne le message de succès)
    expect(global.fetch).toHaveBeenCalledTimes(2); 
    // Vérifier que fetch a été appelé avec l'URL correcte et avec le token
    expect(global.fetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/api/account/delete`, // L'URL attendue
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${token}`, // Vérifier que l'Authorization est correcte
        }),
        method: 'DELETE', // Vérifier que la méthode est bien DELETE
      })
    );
    // Vérifier que le token est supprimé de localStorage
    expect(localStorage.getItem('JWT')).toBeNull();

  });
});
})