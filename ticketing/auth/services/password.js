const bcrypt = require('bcryptjs');

const password = async (password) => {
    const salt = await bcrypt.genSaltSync(10);
	password = await bcrypt.hash(password, salt)
    return password
}

const comparePassword = async(storedPassword, suppliedPassword) => {
    const passwordSuccess = await bcrypt.compare(storedPassword, suppliedPassword);
    return passwordSuccess;
}

module.exports = {
    password,
    comparePassword
}