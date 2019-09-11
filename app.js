/* Importando modulos necesarios */

const {globalVariables} = require('./config/configuration');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');
const {mongoDbUrl, PORT} = require('./config/configuration');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const {selectOption} = require('./config/customFunctions');
const fileUpload = require('express-fileupload');
const passport = require ('passport')

const app = express();


// Configurando la dependencia mongoose para conectarnos a mongodb
mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(response => {
        console.log("MongoDB Connected Successfully.");
    }).catch(err => {
        console.log("Database connection failed.");
});



/* Configurando express*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


/*  Flash y Session*/
app.use(session({
    secret: 'anysecret',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());


/* Usar las varialbes globales */
app.use(globalVariables);


/* Middleware del fileupload */
app.use(fileUpload());

/* Setup del View Engine para usar Handlebars */
app.engine('handlebars', hbs({defaultLayout: 'default', helpers: {select: selectOption}}));
app.set('view engine' , 'handlebars');


/* Middleware de la dependencia method override*/
app.use(methodOverride('newMethod'));

/*Middleware de la dependencia passport (lo que te pregunte ayer xd)*/
app.use(passport.initialize());
app.use(passport.session());


/* Rutas */
const defaultRoutes = require('./routes/defaultRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);


/* Server (me da risa lo sencillo :v) */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
