const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Utilisateur = sequelize.define('Utilisateur', {
    Nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    MotDePasse: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Adress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Telephone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country_of_residence: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
  }, {
    hooks: {
      beforeCreate: async (user) => {
        if (user.MotDePasse) {
          const salt = await bcrypt.genSalt(10);
          user.MotDePasse = await bcrypt.hash(user.MotDePasse, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('MotDePasse')) {
          const salt = await bcrypt.genSalt(10);
          user.MotDePasse = await bcrypt.hash(user.MotDePasse, salt);
        }
      }
    }

  });

  // Define associations
  Utilisateur.associate = function (models) {
    // Association with BienImmobilier
    Utilisateur.hasMany(models.BienImmobilier, {
      foreignKey: 'ProprietarieID',
      as: 'biensImmobiliers',
    });

    // Association with RelocationAssistance
    Utilisateur.hasMany(models.RelocationAssistance, {
      foreignKey: 'user_id',
      as: 'relocationAssistances',
    });

    // Association with UserQueries
    Utilisateur.hasMany(models.UserQueries, {
      foreignKey: 'user_id',
      as: 'userQueries',
    });
  };

  // Method to compare passwords
  Utilisateur.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.MotDePasse);
  };

  return Utilisateur;
};
