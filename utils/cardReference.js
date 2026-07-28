const { v4: uuid } = require("uuid");

exports.generateCardReference = () => {
    return `CARD-${uuid().replace(/-/g, "").substring(0, 16).toUpperCase()}`;
};