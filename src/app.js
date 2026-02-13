const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');

//routas
const pacienteRouter = require('./routes/paciente');
const basculaRouter = require('./routes/bascula');
const termometroRouter = require('./routes/termometro');


const app = express();
const PORT = 3000;

//middlewares
// Interpreta los datos de formularios HTML 
app.use(bodyParser.urlencoded({ extended: true}));
// Interpreta los datos en formato JSON 
app.use(express.json());
//Configurar el directorio de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
// Permite usar ?_method=DELETE o _method en el cuerpo del formato
app.use(methodOverride('_method'));
//----------------


app.set('view engine', 'ejs');
app.set('views', './src/views');

// Rutas 
// Ruta principal
app.get('/', (req, res) => {
    res.redirect('/paciente/pacientes');
});

app.use('/paciente', pacienteRouter);
app.use('/bascula', basculaRouter);
app.use('/termometro', termometroRouter);

app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Error 404',
    message: 'La página que buscas no existe'
  });
});

//----------------

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});