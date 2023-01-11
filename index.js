const express = require('express')
const app = express()
app.listen(3000, console.log('Server ON'))

const { getJoyas, getJoyasFilter, prepararHATEOAS } = require('./consultas')

app.use((req, res, next) => {
  const parametros = req.params;
  const url = req.url;
  console.log(`
    Hoy ${new Date()}
    Se ha recibido una consulta en la ruta ${url}
    con los parámetros: `, parametros)
  return next();
});

app.get('/joyas', async (req, res) => {
  try {
    const queryStrings = req.query;
    const inventory = await getJoyas(queryStrings);
    const HATEOAS = await prepararHATEOAS(inventory);
    res.json(HATEOAS);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
})

app.get('/joyas/filtros', async (req, res) => {
  try {
    const queryStrings = req.query
    const inventario = await getJoyasFilter(queryStrings)
    res.json(inventario)
  }
  catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
})

app.get("*", (req, res) => {
  res.status(404).send("Esta ruta no existe")
})




