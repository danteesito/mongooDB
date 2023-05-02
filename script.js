const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');

app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://test:Argentina2021@cluster0.b7kzsr5.mongodb.net/?retryWrites=true&w=majority', {})
    .then(() => {
    console.log('Se conectó con MongoDB Atlas');
    })
    .catch((error) => {
    console.log('No se pudo conectar a MongoDB Atlas', error);
    });

const JuegoSchema = new mongoose.Schema({
    nombre: String,
    desarrollador: String,
    plataforma: String,
    lanzamiento: Date,
    genero: String,
    modos: String,
    modosdejuego: [{
    nombre: String,
    jugadores: String,
    rondas: String
    }]
});

const Juego = mongoose.model('Juego', JuegoSchema);

const nuevoJuego = new Juego({
    "nombre": "Counter Strike Global Offensive",
    "desarrollador": "desarrollador: Valve Corporation",
    "plataforma": "plataforma: PC",
    "lanzamiento": Date("2012-08-21"), 
    "modos": "sus modos de juego son:",
    "genero": "Su genero es FPS",
    "modosdejuego": [

    {
        "nombre": "El modo Competitivo",
        "jugadores": "Son 5 jugadores",
        "rondas": "Son entre 30 y 16 rondas"
    },
    {
        "nombre": "El modo Casual",
        "jugadores": "Son 10 jugadores",
        "rondas": "Son 15 rondas"
    },
    {
        "nombre": "Modo Deathmatch",
        "jugadores": "Son 20 jugadores",
        "rondas": "Las rondas son infinitas hasta llegar a una determinada puntuacion"  
    }
    ]
});

Juego.findOne({ nombre: "Counter Strike Global Offensive" })
    .then((juegoExistente) => {
    if (juegoExistente) {
        console.log('El juego ya existe en la colección');
    } else {
        nuevoJuego.save()
        .then(() => { 
            console.log('Se guardó el nuevo juego en la colección');
        })
    }
    })

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});

app.get('/Listado', (req, res) => {
    Juego.find({})
    .then(juegos => {
        console.log('Se renderizó correctamente');
        res.render('script', { juegos: juegos });
    })
    .catch(err => {
        console.log('Error al renderizar el listado', err);
    });
});
