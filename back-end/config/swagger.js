const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
 
exports.initialize = (router) => {
    router.use('/doc', swaggerUi.serve);
    router.get('/doc', swaggerUi.setup(swaggerDocument));
}