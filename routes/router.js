const userRouter = require('./usersRouter');


const router = (app) => {
    app.use('/users',userRouter);
}

module.exports = router ;