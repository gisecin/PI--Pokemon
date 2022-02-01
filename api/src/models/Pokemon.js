const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    createInDb: {
      type: DataTypes.BOOLEAN, // nos crea una opcion de falso o verdadero para saber
      allowNull: false,        //donde buscar si en el api o en la base de datos
      defaultValue: true,  //esta parte es si el usuario lo creo entonces lo busca en la base de datos
    },                     //en la api estan los que ya existen

    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },

    hp:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    strength:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },

    defense:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    speed:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    weight:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    height:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    img:{
      type:DataTypes.STRING,
      allowNull:false,
    }

  });
};