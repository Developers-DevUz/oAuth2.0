exports.googleAuthCallback = (req, res) => {
    // Autenticación exitosa, redirigir a home.
    res.redirect('/');
};
  