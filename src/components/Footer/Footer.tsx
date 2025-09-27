import "./Footer.css";

function Footer() {
	return (
		<>
			<footer className="footer bg-base-200 text-base-content p-10 flex justify-around flex-nowrap">
				<aside>
					<img src="/image\Logo.png" className="logo-footer"></img>
					<p>
						ZOMBIELAND
						<br />
						Créateur de peur depuis 2025
					</p>
				</aside>
				<nav>
					<h6 className="footer-title">Informations sur l'entreprise</h6>
					<a className="link link-hover">À propos</a>
					<a className="link link-hover">Contact</a>
				</nav>
				<nav>
					<h6 className="footer-title">Mentions légales</h6>
					<a className="link link-hover">Condition d'utilisation</a>
					<a className="link link-hover">Politique de condentialité</a>
					<a className="link link-hover">Politique de cookies</a>
				</nav>
			</footer>
		</>
	);
}

export default Footer;
