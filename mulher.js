const express = require("express");
const router = express.Router();

const app = express();
const porta = 3333;

function mostraMulher(request, response) {
  response.json({
    nome: 'Simaria Conceição',
    iamgem: 'https://github.com/simaraconceicao.png',
    minibio: 'Desenvolvedora e instrutora'
  })
}

function mostraPorta() {
  console.log("Servidor criado e rodando na porta: ", porta);
}

app.use(router.get("/mulher", mostraMulher));
// mostraPorta()
app.listen(porta, mostraPorta);
