const express = require("express");
const router = express.Router();

const app = express();
const porta = 3333;

const mulheres = [
  {
    nome: "Simaria Conceição",
    iamgem: "https://github.com/simaraconceicao.png",
    minibio: "Desenvolvedora e instrutora",
  },
  {
    nome: "Iara Chan",
    iamgem: "https://bit.ly/3JCXBqP",
    minibio: ' Fundadora da Programaria',
  },
  {
    nome: "Nina da Hora",
    iamgem: "https://bit.ly/3FKpFaz",
    minibio: "Hacker antirracista",
  },
];

function mostraMulheres(request, response) {
  response.json(mulheres);
}

function mostraPorta() {
  console.log("Servidor criado e rodando na porta: ", porta);
}

app.use(router.get("/mulheres", mostraMulheres));
// mostraPorta()
app.listen(porta, mostraPorta);
