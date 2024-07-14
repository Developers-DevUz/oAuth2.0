// middlewares.js
const authorizeRole = (role) => {
	return (req, res, next) => {
		if (req.user.role !== role) {
			return res.sendStatus(403); // Si el usuario no tiene el rol, prohibido
		}
		next();
	};
};

module.exports = { authorizeRole };