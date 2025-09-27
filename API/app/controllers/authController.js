import jwt from "jsonwebtoken";

export const authController = {
  async auth(req, res, user) {
    // Création d'un token JWT
    const createTokenFromJson = (jsonData) => {
      try {
        console.log("test")
        const secretKey = process.env.TOKEN_KEY;
        // Création du token avec la clé secrète et une durée de validité de 1h
        // pour la creation du token on a besoin de 3 parametres : les données, la clé secrete et la durée de validité
        const token = jwt.sign(jsonData, secretKey, { expiresIn: "24h" });
        // console.log(token)
        return token;
      } catch (error) {
        console.log(error);
        return null;
      }
    };

    // Test du fonctionnement de la création du token
    const jsonData = { id: user.id} //nt récupérées par la variable user en param_tre
    const token = createTokenFromJson(jsonData);
    
    if (token) {
      console.log("Token créé");
      //Tentative de création de cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,           // ✅ OBLIGATOIRE pour cross-origin avec SameSite: 'none'
        sameSite: 'lax',       // ✅ Nécessaire car front ≠ back
        maxAge: 24 * 60 * 60 * 1000, // 24 heures en ms
      });
      return token;
    } else {
     res.status(500).json({ error: "Erreur lors de la création du token" });
    }
  },

  async logout (req, res){
    console.log("Je suis ici")
    //Suppresion du cookie
     res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "Lax"
  });
  res.status(200).json({ message: "Déconnecté" });
  }
};

export default authController;