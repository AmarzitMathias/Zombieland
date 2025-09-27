import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
	const token = localStorage.getItem("JWT");
	return (
		<>
			{/* import du composant menu burger (mobile) de Tailwind CSS */}
			<div className=" dropdown bg-transparent fixed top-0 left-5 w-full z-50 ">
				<div className="accueil-link">
					<Link to="/">
						<img
							src="/image/Logo.png"
							className=" flex flex-row logo-accueil btn-ghost text-xl logo-navbar"
							alt="logo accueil"
						/>
					</Link>
				</div>

				<button className=" btn btn-square bg-transparent menu btn-ghost lg:hidden menu-burger">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block h-5 w-5 stroke-current"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>

					{/* Menu du burger qui s'affiche lorsqu'on lorsqu'on le sélectionne */}
					<ul
						tabIndex={0}
						className="dropdown-content bg-base-0 rounded-box z-[1] w-52 p-2 menu"
					>
						<li>
							<Link to="/">Accueil</Link>
						</li>
						<li>
							<Link to="/activities">Activités</Link>
						</li>
						{token && (
						<li>
							<Link to="/reservation">Réservation</Link>
						</li>
						)}
						<li>
							<Link to="/information">Informations pratiques</Link>
						</li>
						{!token && (
							<li>
								<Link to="/login">S'inscrire / Se connecter</Link>
							</li>
						)}
						{token && (
							<li>
								<Link to="/account">Mon Compte</Link>
							</li>
						)}
					</ul>
				</button>
				{/* Menu horizontal pour ordinateur */}
				<div className="flex flex-row-reverse absolute top-0 right-5 navbar">
					<ul className=" menu menu-horizontal px-1 menu-bureau ">
						<li className="text-xl font-irish-grover">
							<Link to="/">Accueil</Link>
						</li>
						<li className="text-xl font-irish-grover">
							<Link to="/activities">Activité</Link>
						</li>
						{token && (
						<li className="text-xl font-irish-grover">
							<Link to="/reservation">Réservation</Link>
						</li>
						)}
						<li className="text-xl font-irish-grover">
							<Link to="/information">Informations pratiques</Link>
						</li>
						{!token && (
							<li className="button btn btn-active btn-secondary">
								<Link to="/login">S'inscrire / Se connecter</Link>
							</li>
						)}
						{token && (
							<li className="button btn btn-active btn-secondary">
								<Link to="/account">Mon Compte</Link>
							</li>
						)}

					</ul>
				</div>
			</div>
		</>
	);
}

export default Navbar;
