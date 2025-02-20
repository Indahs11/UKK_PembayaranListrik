'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  level.init({
    id_level:{
      type: DataTypes.INTEGER,
      primaryKey: true,      
      autoIncrement: true
    },
    nama_level: DataTypes.STRING,
    administrator: DataTypes.STRING,
    pimpinan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'level',
    tableName: 'level'
  });
  return level;
};