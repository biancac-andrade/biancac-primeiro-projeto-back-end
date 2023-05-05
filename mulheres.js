const express = require("express"); // aqui estou iniciando o express
const router = express.Router(); // aqui estou configurando  primeira parte da rota
// const { v4: uuidv4 } = require("uuid");
const cors = require("cors"); // aqui estou trazendo o pacote cors que permite consumir essa api no front end

const conectaBancoDeDados = require('./bancoDeDados') //aqui estou ligando ao arquivo bancoDeDados o banco de dados
conectaBancoDeDados() // estou chamando a função que conecta o banco de dados

const Mulher = require('./mulherModel');
const app = express(); // aqui estou iniciando o app
app.use(express.json());
app.use(cors())
const porta = 3333; // aqui estou criando a porta

// // aqui estou criando lista inicial de mulheres
// const mulheres = [
//   {
//     id: "1",
//     nome: "Simaria Conceição",
//     iamgem: "https://github.com/simaraconceicao.png",
//     minibio: "Desenvolvedora e instrutora",
//   },
//   {
//     id: "2",
//     nome: "Iara Chan",
//     iamgem: "https://bit.ly/3JCXBqP",
//     minibio: " Fundadora da Programaria",
//   },
//   {
//     id: "2",
//     nome: "Nina da Hora",
//     iamgem: "https://bit.ly/3FKpFaz",
//     minibio: "Hacker antirracista",
//   },
// ];

// GET
// function mostraMulheres(request, response) {
//   response.json(mulheres);
// }

async function mostraMulheres(request, response) {
  try {
    const mulheresVindasDoBancoDeDados = await Mulher.find()
    response.json(mulheresVindasDoBancoDeDados)
  } catch (erro) {
    console.log(erro)
  }
  
}

// // POST
// function criaMulheres(request, response) {
//   const novaMulher = {
//     id: uuidv4(),
//     nome: request.body.nome,
//     imagem: request.body.imagem,
//     minibio: request.body.minibio,
//   };

//   mulheres.push(novaMulher);

//   response.json(mulheres);
// }

async function criaMulheres(request, response) {
  const novaMulher = new Mulher({

    nome: request.body.nome,
    imagem: request.body.imagem,
    citacao: request.body.citacao,
    minibio: request.body.minibio,
  })

  try {
    const mulherCriada = await novaMulher.save()
    response.status(201).json(mulherCriada)

  } catch (erro) {
    console.log(erro);
  }
}

// // PATCH
// function corrigeMulher(request, response) {
//   function encontraMulher(mulher) {
//     if (mulher.id === request.params.id) {
//       return mulher
//     }
//   }

//   const mulherEncontrada = mulheres.find(encontraMulher)

//   if (request.body.nome) {
//     mulherEncontrada.nome = request.body.nome
//   }

//   if (request.body.iamgem) {
//     mulherEncontrada.iamgem = request.body.iamgem
//   }

//   if (request.body.minibio) {
//     mulherEncontrada.minibio = request.body.minibio
//   }

//   response.json(mulheres)
// }

async function corrigeMulher(request, response) {

  try {
    const mulherEncontrada = await Mulher.findById(request.params.id)

    if (request.body.nome) {
      mulherEncontrada.nome = request.body.nome;
    }

    if (request.body.iamgem) {
      mulherEncontrada.iamgem = request.body.iamgem;
    }

    if (request.body.minibio) {
      mulherEncontrada.minibio = request.body.minibio;
    }

    if (request.body.citacao) {
      mulherEncontrada.citacao = request.body.citacao;
    }
    
  const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
  response.json(mulherAtualizadaNoBancoDeDados);

  } catch (erro) {
    console.log(erro)
  }
}

// DELETE
// function deletaMulher(request, response) {
//   function todasMenosEla(mulher) {
//     if (mulher.id !== request.params.id) {
//       return mulher
//     }
//   }

//   const mulheresQueFicam = mulheres.filter(todasMenosEla)

//   response.json(mulheresQueFicam)
// }
async function deletaMulher(request, response) {
  
  try {
    await Mulher.findByIdAndDelete(request.params.id)
    response.json({mensagem: 'Mulher deletada com sucesso'})
  } catch (erro) {
    console.log(erro)
  }
}

app.use(router.get("/mulheres", mostraMulheres)); // configurei a rota GET /mulheres
app.use(router.post("/mulheres", criaMulheres)); // configurei a rota POST /mulheres
app.use(router.patch("/mulheres/:id", corrigeMulher)); // configurei a rota PATCH /mulheres/id
app.use(router.delete('/mulheres/:id', deletaMulher)) // configurei a rota Delete /mulheres/:id
// PORTA
function mostraPorta() {
  console.log("Servidor criado e rodando na porta: ", porta);
}

// mostraPorta()
app.listen(porta, mostraPorta); // servidor ouvindo a porta
