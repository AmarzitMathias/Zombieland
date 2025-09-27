import "dotenv/config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    process.env.PG_URL,
    // 'postgres://zombieland:zombieland@localhost:5432/zombieland',
    {
    // on va faire la correspondance des champs updatedAt et createdAt
        define: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
        dialect: 'postgres',
    }
);

// test
try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }





