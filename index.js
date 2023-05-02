const express = require ('express')
const app = express('')
const mongoose = require ('mongoose')

mongoose.connect('mongodb+srv://test:Argentina2021@cluster0.b7kzsr5.mongodb.net/?retryWrites=true&w=majority', {})
.then(() => {
    console.log('se conecto con MongoDB Atlas');
})
.catch((error) => {
    console.log('no se pudo conectar a MongoDB Atlas');
});

const JuegoSchema = new mongoose.Schema({
    nombre: String,
    desarrolador: String,
    plataforma: String,
    lanzamiento: Date,
    genero: String,
    modosdejuego: [{
    nombre: String,
    jugadores: String,
    rondas : String

    }]
});

const Juego = mongoose.model('Juego', JuegoSchema);

const nuevoJuego = new Juego({
    "nombre": "Counter Strike: Global Offensive",
    "desarrollador": "Valve Corporation",
    "plataforma": "PC",
    "lanzamiento": new Date("2012-08-21"),
    "genero": "FPS",
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
            
        }]});

nuevoJuego.save()
.then(() =>{ console.log('se guardo en la colección')
    mongoose.connection.close
    console.log('se desconecto correctamente')
    })
.catch((error) => { console.error('no se guardo en la coleccion')
    mongoose.connection.close 
    console.log('se desconecto correctamente')
});