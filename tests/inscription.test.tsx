import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Inscription from "../src/components/Inscription/Inscription.tsx"; // Assurez-vous que le chemin d'importation est correct
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

it("Devrait inscrire l'utilisateur", async () => {
	const user = {
		name: "Juliette",
		lastname: "Adnet",
		email: "juliette.adnet@gmail.com",
		password: "julietadnet00",
	};

	// Mock de la fonction fetch pour simuler l'API
	const mockFetch = vi.fn().mockResolvedValue({
		ok: true,
		json: () => ({
			name: user.name,
			lastname: user.lastname,
			email: user.email,
			password: user.password,
		}),
	});
	global.fetch = mockFetch; // On remplace `fetch` par notre mock

	// On render le composant
	render(
		<MemoryRouter>
			<Inscription />
		</MemoryRouter>,
	);

	// On sélectionne les champs d'entrée
	const nomInput = screen.getByPlaceholderText("Nom de famille");
	const prenomInput = screen.getByPlaceholderText("Prénom");
	const emailInput = screen.getByPlaceholderText("Votre Email");
	const passwordInput = screen.getByPlaceholderText("****");

	// On remplit les champs du formulaire
	fireEvent.change(nomInput, { target: { value: user.lastname } });
	fireEvent.change(prenomInput, { target: { value: user.name } });
	fireEvent.change(emailInput, { target: { value: user.email } });
	fireEvent.change(passwordInput, { target: { value: user.password } });

	// On clique sur le bouton Valider
	const registrationButton = screen.getByText("Valider");
	fireEvent.click(registrationButton);

	// Vérification de l'appel API (fetch)
	await waitFor(() => {
    //On vérifie que l'appel d'API est bien passé et qu'il contient bien ce que l'on souhaite
		expect(mockFetch).toHaveBeenCalledTimes(1); // Vérifie que fetch a été appelé une fois
		expect(mockFetch).toHaveBeenCalledWith(
			`${import.meta.env.VITE_API_URL}/api/registration`,
			expect.objectContaining({
				method: "POST",
				body: JSON.stringify({
					lastname: user.lastname,
					firstname: user.name,
					email: user.email,
					password: user.password,
				}),
			}),
		);
	});
});

describe("Test des erreurs pour les champs de formulaire", () => {
	// Test pour le champ "Nom"
	it("Devrait afficher un message d'erreur pour nom vide", async () => {
		const mockFetch = vi.fn().mockResolvedValueOnce({
			ok: false,
			json: () => ({
				message: "Nom requis",
			}),
		});
		global.fetch = mockFetch;

		render(
			<MemoryRouter>
				<Inscription />
			</MemoryRouter>,
		);

		const user = {
			name: "Juliette",
			lastname: "",
			email: "juliette.adnet@gmail.com",
			password: "julietadnet00",
		};

		// On sélectionne les champs d'entrée
		const nomInput = screen.getByPlaceholderText("Nom de famille");
		const prenomInput = screen.getByPlaceholderText("Prénom");
		const emailInput = screen.getByPlaceholderText("Votre Email");
		const passwordInput = screen.getByPlaceholderText("****");

		// On remplit les champs du formulaire
		fireEvent.change(nomInput, { target: { value: user.lastname } });
		fireEvent.change(prenomInput, { target: { value: user.name } });
		fireEvent.change(emailInput, { target: { value: user.email } });
		fireEvent.change(passwordInput, { target: { value: user.password } });

		//On sélectionne le bouton Valider et on clique dessus
		const registrationButton = screen.getByText("Valider");
		fireEvent.click(registrationButton);

		await waitFor(() => {
			expect(nomInput.value).toBe(""); // Ici, on s'assure que la valeur de l'input est bien vide
      //On vérifie que l'appel d'API est bien passé et qu'il contient bien ce que l'on souhaite
			expect(mockFetch).toHaveBeenCalledTimes(1); // Vérifie que fetch a été appelé une fois
			expect(mockFetch).toHaveBeenCalledWith(
				`${import.meta.env.VITE_API_URL}/api/registration`,
				expect.objectContaining({
					method: "POST",
					body: JSON.stringify({
						lastname: user.lastname,
						firstname: user.name,
						email: user.email,
						password: user.password,
					}),
				}),
			);
			expect(screen.getByText(/Erreur: Nom requis/)).toBeInTheDocument();
		});
	});

	// Test pour le champ "Prénom"
	it("Devrait afficher un message d'erreur pour prénom vide", async () => {
		const mockFetch = vi.fn().mockResolvedValueOnce({
			ok: false,
			json: () => ({
				message: "Prénom requis",
			}),
		});
		global.fetch = mockFetch;

		render(
			<MemoryRouter>
				<Inscription />
			</MemoryRouter>,
		);

		const user = {
			name: "",
			lastname: "Adnet",
			email: "juliette.adnet@gmail.com",
			password: "julietadnet00",
		};

		// On sélectionne les champs d'entrée
		const nomInput = screen.getByPlaceholderText("Nom de famille");
		const prenomInput = screen.getByPlaceholderText("Prénom");
		const emailInput = screen.getByPlaceholderText("Votre Email");
		const passwordInput = screen.getByPlaceholderText("****");

		// On remplit les champs du formulaire
		fireEvent.change(nomInput, { target: { value: user.lastname } });
		fireEvent.change(prenomInput, { target: { value: user.name } });
		fireEvent.change(emailInput, { target: { value: user.email } });
		fireEvent.change(passwordInput, { target: { value: user.password } });

		//On sélectionne le bouton Valider et on clique dessus
		const registrationButton = screen.getByText("Valider");
		fireEvent.click(registrationButton);

		await waitFor(() => {
			expect(prenomInput.value).toBe(""); // Ici, on s'assure que la valeur de l'input est bien vide

      //On vérifie que l'appel d'API est bien passé et qu'il contient bien ce que l'on souhaite
      expect(mockFetch).toHaveBeenCalledTimes(1); // Vérifie que fetch a été appelé une fois
			expect(mockFetch).toHaveBeenCalledWith(
				`${import.meta.env.VITE_API_URL}/api/registration`,
				expect.objectContaining({
					method: "POST",
					body: JSON.stringify({
						lastname: user.lastname,
						firstname: user.name,
						email: user.email,
						password: user.password,
					}),
				}),
			);
			expect(screen.getByText(/Erreur: Prénom requis/)).toBeInTheDocument();
		});
	});

	// Test pour le champ "Email"
	it("Devrait afficher un message d'erreur pour email vide", async () => {
		const mockFetch = vi.fn().mockResolvedValueOnce({
			ok: false,
			json: () => ({
				message: "Email requis",
			}),
		});
		global.fetch = mockFetch;

		render(
			<MemoryRouter>
				<Inscription />
			</MemoryRouter>,
		);

		const user = {
			name: "Juliette",
			lastname: "Adnet",
			email: "",
			password: "julietadnet00",
		};

		// On sélectionne les champs d'entrée
		const nomInput = screen.getByPlaceholderText("Nom de famille");
		const prenomInput = screen.getByPlaceholderText("Prénom");
		const emailInput = screen.getByPlaceholderText("Votre Email");
		const passwordInput = screen.getByPlaceholderText("****");

		// On remplit les champs du formulaire
		fireEvent.change(nomInput, { target: { value: user.lastname } });
		fireEvent.change(prenomInput, { target: { value: user.name } });
		fireEvent.change(emailInput, { target: { value: user.email } });
		fireEvent.change(passwordInput, { target: { value: user.password } });

    //On sélectionne le bouton Valider et on clique dessus
		const registrationButton = screen.getByText("Valider");
		fireEvent.click(registrationButton);

		await waitFor(() => {
			expect(emailInput.value).toBe(""); // Ici, on s'assure que la valeur de l'input est bien vide

      //On vérifie que l'appel d'API est bien passé et qu'il contient bien ce que l'on souhaite
      expect(mockFetch).toHaveBeenCalledTimes(1); // Vérifie que fetch a été appelé une fois
			expect(mockFetch).toHaveBeenCalledWith(
				`${import.meta.env.VITE_API_URL}/api/registration`,
				expect.objectContaining({
					method: "POST",
					body: JSON.stringify({
						lastname: user.lastname,
						firstname: user.name,
						email: user.email,
						password: user.password,
					}),
				}),
			);
			expect(screen.getByText(/Erreur: Email requis/)).toBeInTheDocument();
		});
	});

	// Test pour le champ "Mot de passe"
	it("Devrait afficher un message d'erreur pour mot de passe vide", async () => {
		const mockFetch = vi.fn().mockResolvedValueOnce({
			ok: false,
			json: () => ({
				message: "Mot de passe requis",
			}),
		});
		global.fetch = mockFetch;

		render(
			<MemoryRouter>
				<Inscription />
			</MemoryRouter>,
		);

		const user = {
			name: "Juliette",
			lastname: "Adnet",
			email: "juliette.adnet@gmail.com",
			password: "",
		};

		// On sélectionne les champs d'entrée
		const nomInput = screen.getByPlaceholderText("Nom de famille");
		const prenomInput = screen.getByPlaceholderText("Prénom");
		const emailInput = screen.getByPlaceholderText("Votre Email");
		const passwordInput = screen.getByPlaceholderText("****");

		// On remplit les champs du formulaire
		fireEvent.change(nomInput, { target: { value: user.lastname } });
		fireEvent.change(prenomInput, { target: { value: user.name } });
		fireEvent.change(emailInput, { target: { value: user.email } });
		fireEvent.change(passwordInput, { target: { value: user.password } });

    //On sélectionne le bouton Valider et on clique dessus
		const registrationButton = screen.getByText("Valider");
		fireEvent.click(registrationButton);

		await waitFor(() => {
      //On vérifie que l'appel d'API est bien passé et qu'il contient bien ce que l'on souhaite
			expect(passwordInput.value).toBe(""); // Ici, on s'assure que la valeur de l'input est bien vide
      expect(mockFetch).toHaveBeenCalledTimes(1); // Vérifie que fetch a été appelé une fois
			expect(mockFetch).toHaveBeenCalledWith(
				`${import.meta.env.VITE_API_URL}/api/registration`,
				expect.objectContaining({
					method: "POST",
					body: JSON.stringify({
						lastname: user.lastname,
						firstname: user.name,
						email: user.email,
						password: user.password,
					}),
				}),
			);
			expect(screen.getByText(/Erreur: Mot de passe requis/)).toBeInTheDocument();
		});
	});

	it("Devrait afficher un message d'erreur pour un mot de passe de moins de 6 caractères et mesurer la longueur du mot de passe", async () => {
		const mockFetch = vi.fn().mockResolvedValueOnce({
			ok: false,
			json: () => ({
				message: "Le mot de passe doit comporter au moins 6 caractères",
			}),
		});
		global.fetch = mockFetch;
		// On render le composant
		render(
			<MemoryRouter>
				<Inscription />
			</MemoryRouter>,
		);

		const user = {
			name: "Juliette",
			lastname: "Adnet",
			email: "juliette.adnet@gmail.com",
			password: "",
		};

		// On sélectionne les champs d'entrée
		const nomInput = screen.getByPlaceholderText("Nom de famille");
		const prenomInput = screen.getByPlaceholderText("Prénom");
		const emailInput = screen.getByPlaceholderText("Votre Email");
		const passwordInput = screen.getByPlaceholderText("****");

		// On remplit les champs du formulaire
		fireEvent.change(nomInput, { target: { value: user.lastname } });
		fireEvent.change(prenomInput, { target: { value: user.name } });
		fireEvent.change(emailInput, { target: { value: user.email } });
		fireEvent.change(passwordInput, { target: { value: user.password } });

		// On mesure la longueur du mot de passe
		const passwordLength = passwordInput.value.length;

		// On vérifie que la longueur du mot de passe est bien inférieure à 6
		expect(passwordLength).toBeLessThan(6); // La longueur du mot de passe doit être inférieure à 6

		// On clique sur le bouton Valider
		const registrationButton = screen.getByText("Valider");
		fireEvent.click(registrationButton);

		// Vérification que le message d'erreur pour le mot de passe trop court est bien affiché
		await waitFor(() => {
      //On vérifie que l'appel d'API est bien passé et qu'il contient bien ce que l'on souhaite
      expect(mockFetch).toHaveBeenCalledTimes(1); // Vérifie que fetch a été appelé une fois
			expect(mockFetch).toHaveBeenCalledWith(
				`${import.meta.env.VITE_API_URL}/api/registration`,
				expect.objectContaining({
					method: "POST",
					body: JSON.stringify({
						lastname: user.lastname,
						firstname: user.name,
						email: user.email,
						password: user.password,
					}),
				}),
			);
			expect(
				screen.getByText(
					"Erreur: Le mot de passe doit comporter au moins 6 caractères",
				),
			).toBeInTheDocument();
		});
	});
});
