const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
   // defino el modelo
   sequelize.define(
      "videogame",
      {
         id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
         },
         name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
         },
         description: {
            type: DataTypes.TEXT,
         },
         platforms: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
               // Obtener las plataformas como un array
               const platformsString = this.getDataValue("platforms");
               return platformsString ? platformsString.split(",") : [];
            },
            set(value) {
               // Almacenar las plataformas como un string separado por comas
               if (Array.isArray(value)) {
                  this.setDataValue("platforms", value.join(","));
               } else {
                  this.setDataValue("platforms", value);
               }
            },
         },
         image: {
            type: DataTypes.STRING,
            allowNull: true,
         },
         release: {
            type: DataTypes.DATE,
            allowNull: false,
         },
         rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
      },
      { timestamps: false }
   );
};
