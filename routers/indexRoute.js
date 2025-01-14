
const authRouter = require('./authenticarionRoute');
const productRouter = require('./productRoute');
const Routers = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/products', productRouter);




};

module.exports = Routers;