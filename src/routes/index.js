const express = require('express');
const roleRoutes = require('../routes/roleRoutes');
const userRoutes = require('../routes/userRoutes');
const userRoleRoutes = require('../routes/userRoleRoutes');



app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/userRoles', userRoleRoutes);

app.listen(3000);

module.exports = router;