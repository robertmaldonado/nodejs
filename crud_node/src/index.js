//console.log('hola mondo xxxde robertooo');
import express from 'express'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { engine } from 'express-handlebars';  // la manera mas moderna de importaerlka
import morgan from 'morgan';
import personasRoutes from './routes/personas.routes.js'



//Intialization
const app = express();


// // Registrar el helper 'eq' al configurar express-handlebars
// app.engine("hbs", engine({
//     extname: ".hbs",
//     helpers: {
//         eq: (a, b) => a === b
//     }
// }));


const __dirname = dirname(fileURLToPath(import.meta.url));

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));


/* app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs'); */



// Configuración del motor de plantillas Handlebars
const hbsConfig = {
    defaultLayout: 'main',
    layoutsDir: join(__dirname, 'views', 'layouts'),
    partialsDir: join(__dirname, 'views', 'partials'),
    extname: '.hbs',
    helpers: {
        eq: (a, b) => a === b // Compara si a y b son iguales
    }


};



app.engine('.hbs', engine(hbsConfig));
app.set('view engine', '.hbs');






//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
// app.get('/', (req, res)=>{
//     res.json({"mesage":"hola rob"})
// })

app.get('/', (req, res) => {
    res.render('index')
})

app.use(personasRoutes);


//Public files
app.use(express.static(join(__dirname, 'public')));



//Run Server
app.listen(app.get('port'), () =>
    console.log('Server listening on port', app.get('port')));   