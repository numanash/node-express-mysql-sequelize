const SuperDao = require('./SuperDao');
const models = require('../models');

const Token = models.token;

class TokenDao extends SuperDao {
  constructor() {
    super(Token);
  }

  async findOne() {
    const { where } = this;
    return Token.findOne({ where });
  }

  async remove() {
    const { where } = this;
    return Token.destroy({ where });
  }
}

module.exports = TokenDao;
