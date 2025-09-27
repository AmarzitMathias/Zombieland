import "./Login.css";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { Link } from 'react-router-dom';
import { useEffect } from "react";

function Login() {

  useEffect(() => {
    document.title = 'Zombieland - Login';
  }, []);
  
  return (
    <>
    <Navbar />
      <div className="section-login relative w-full h-screen flex items-center justify-center text-white p-4">
        
        <h1 className="title-login">
          Créer un compte Zombieland ou connectez-vous pour accéder à votre
          espace
        </h1>
        <div className="all-section h-[400px] p-5 rounded-2xl shadow-md">
          
        <div className="section-register">
          <h2 className="title-login title-register">Plongez au coeur de l'apocalypse !</h2>
          <p className="text-login ">
            Créez votre compte et préparez votre survie en réservant vos billets
            et packs de survie.
          </p>
          <p className="text-login ">Accédez à vos réservations, trouvez les meilleurs attractions,</p>
          <p className="text-login ">
            Anticipez votre venue et organisez votre plan d’évasion grâce à
            votre compte.
            </p>

            <div className="flex justify-center items-center">
            {/* Classe que l'on a faite: btn-reservation */}
          <Link to="/registration" className="btn btn-register btn-login cursor-pointer">Créer un compte</Link>
          </div>
        </div>
        <div className="section-connect">
          <h2 className="title-login title-connect">Vous avez déjà un compte?</h2>
          <div className="flex justify-center items-center">
          {/* Classe que l'on a faite: btn-reservation */}
        <Link to="/connect" className="btn btn-register btn-login cursor-pointer">Se connecter</Link>


          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}
export default Login;
