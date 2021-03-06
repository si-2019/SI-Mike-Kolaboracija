/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ClanGrupe', {
    idClanGrupe: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    idStudent: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Korisnik',
        key: 'id'
      }
    },
    idGrupaProjekta: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'GrupaProjekta',
        key: 'idgrupaprojekta'
      }
    },
    ostvareniBodovi: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    kreator: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'ClanGrupe'
  });
};
