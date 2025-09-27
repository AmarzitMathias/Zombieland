import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Inscription from '../src/components/Inscription/Inscription.tsx'; // Assurez-vous que le chemin d'importation est correct
import Connexion from '../src/components/Connexion/Connexion'; // Assurez-vous que le chemin est correct
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';


// Test d'inscription et de connexion combinés
it('Devrait inscrire et connecter l\'utilisateur', async () => {
    //Les différents champs de l'utilisateur  (plus facile pour modifier les valeurs)
    const user = {
        name: "Juliette",
        lastname: "Adnet",
        email: "juliette.adnet@gmail.com",
        password: "julietadnet00"
      }

  // Mock pour l'inscription
  const mockFetchInscription = vi.fn().mockResolvedValueOnce({
    ok: true,
    json: () => ({
      message: 'Utilisateur inscrit',
    }),
  });
  global.fetch = mockFetchInscription; // Mock du fetch pour l'inscription

  // Render du composant Inscription
  render(
    <MemoryRouter>
      <Inscription />
    </MemoryRouter>
  );

  // Remplir le formulaire d'inscription
  const nomInput = screen.getByPlaceholderText('Nom de famille');
  const prenomInput = screen.getByPlaceholderText('Prénom');
  const emailInput = screen.getByPlaceholderText('Votre Email');
  const passwordInput = screen.getByPlaceholderText('****');

  fireEvent.change(nomInput, { target: { value: user.lastname } });
  fireEvent.change(prenomInput, { target: { value: user.name } });
  fireEvent.change(emailInput, { target: { value: user.email } });
  fireEvent.change(passwordInput, { target: { value: user.password } });

  // Soumettre le formulaire d'inscription
  const submitButtonInscription = screen.getByText('Valider');
  fireEvent.click(submitButtonInscription);

  // Attendre la réponse du mock pour l'inscription
  await waitFor(() => {
    //On vérifie que l'appel d'API est bien passé et qu'il contient bien ce que l'on souhaite
    expect(mockFetchInscription).toHaveBeenCalledTimes(1);
    expect(mockFetchInscription).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/api/registration`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
            lastname: user.lastname,
          firstname: user.name,  
          email: user.email,
          password: user.password,
        }),
      })
    );
  });

  // Vérification de la redirection après inscription
  expect(window.location.href).toBe('http://localhost:3000/');

  // Mock pour la connexion
  const mockFetchConnexion = vi.fn().mockResolvedValueOnce({
    ok: true,
    json: () => ({
      token: 'fake-jwt-token',
    }),
  });
  global.fetch = mockFetchConnexion; // Mock du fetch pour la connexion

  // Render du composant Connexion
  render(
    <MemoryRouter>
      <Connexion />
    </MemoryRouter>
  );
  // Remplir le formulaire de connexion
  const emailConnexionInput = screen.getByPlaceholderText('daisy@site.com');
  const passwordConnexion = screen.getAllByPlaceholderText('****');
  const passwordConnexionInput = passwordConnexion[1];
  fireEvent.change(emailConnexionInput, { target: { value: user.email } });
  fireEvent.change(passwordConnexionInput, { target: { value: user.password } });

  // Soumettre le formulaire de connexion
  const ButtonConnexion = screen.getAllByText('Valider');
  const submitButtonConnexion = ButtonConnexion[1]
  fireEvent.click(submitButtonConnexion);

  // Attendre la réponse du mock pour la connexion
  await waitFor(() => {
    //On vérifie que l'appel d'API est bien passé et qu'il contient bien ce que l'on souhaite
    expect(mockFetchConnexion).toHaveBeenCalledTimes(1);
    expect(mockFetchConnexion).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/api/connect`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      })
    );
  });
  // Vérification que le token est stocké dans le localStorage après connexion
  expect(localStorage.getItem('JWT')).toBe('fake-jwt-token');

});
