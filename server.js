const Container = require("./container.js");
const productos = new Container("./productos.json");
const productosEnBase = require("./productos.json");

const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));


/*Peticiones Get*/

app.get("/api/productos", ( req , res ) => {
    res.send({ productos: productosEnBase });
})

app.get("/api/productos/:id", ( req , res ) => {
    const { id } = req.params;
    const producto = productosEnBase.find( obj => obj.id == id );
    res.send({ producto : { producto }}) 
})


/*Peticiones Post*/
app.post("/api/productos", ( req , res ) => {
    const obj = req.body;
    async function cargarProducto( producto ) {
        await productos.save( obj );
    }
    const nuevoProducto = cargarProducto( obj );
    res.status(200).send({ nuevoProducto: obj });
})

/*Peticiones PUT*/

/*app.put("/api/productos/:id", ( req , res ) => {
    const { id } = req.params;
    const { titleAct , priceAct , thumbnailAct } = req.body;
    let productoAmodificar = productosEnBase.find( obj => obj.id == id );
    productoAmodificar = {
        title: titleAct,
        price: priceAct,
        thumbnail : thumbnailAct,
        id : id,
    };
})
*/

/*Peticiones DELETE*/

app.delete("/api/productos/:id" , ( req , res ) => {
    const { id } = req.params;
    const producto = productosEnBase.find( obj => obj.id == id );
    async function borrarDeBase(id){
        await productos.deleteById(id)
    }
    const productoBorrado = borrarDeBase(id);
    res.send({ productoBorrado: producto})
})


const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Listening app port ${server.address().port}`);
})



server.on("error" , (error)=> {
    console.log("Error ======>" , error.message);
})