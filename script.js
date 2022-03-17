//Jogadores Iniciais
var joao = { nome: "João", vitorias: 0, empates: 0, derrotas: 0, pontos: 0 };
var maria = { nome: "Maria", vitorias: 0, empates: 0, derrotas: 0, pontos: 0 };
var jose = { nome: "José", vitorias: 0, empates: 0, derrotas: 0, pontos: 0 };

var numeroPartidas = document.getElementById("numeroPartidas")
var qtdPartidas = 0;
numeroPartidas.innerHTML = "Número de Partidas: " + qtdPartidas;


function adicionarJogador(){
  if (qtdPartidas == 0){
    var nomeJogador = document.getElementById("nome").value;
    var novoJogador = {nome: nomeJogador, vitorias: 0, empates: 0, derrotas: 0, pontos: 0 };
    jogadores.push(novoJogador);
    exibeJogadores(jogadores);
    document.getElementById("nome").value = "";
  }else {
    alert("Jogo já iniciado, não é possível inserir jogador!");
    document.getElementById("nome").value = "";
  }
}

function calculaPontos(jogador) {
  var pontos = jogador.vitorias * 3 + jogador.empates;
  return pontos;
}

//Lista de jogadores
var jogadores = [joao, maria, jose];

function exibeJogadores(jogadores) {
  var elemento = "";
  for (var i = 0; i < jogadores.length; i++) {
    elemento += "<tr><td>" + jogadores[i].nome + "</td>";
    elemento += "<td>" + jogadores[i].vitorias + "</td>";
    elemento += "<td>" + jogadores[i].empates + "</td>";
    elemento += "<td>" + jogadores[i].derrotas + "</td>";
    elemento += "<td>" + jogadores[i].pontos + "</td>";
    elemento += "<td><button onClick='adicionarVitoria(" + i + ")'>Vitória</button></td>";
    elemento += "<td><button onClick='excluirJogador(" + i + ")'>Excluir</button></td></tr>";
  }
  var tabelaJogadores = document.getElementById("tabelaJogadores");
  tabelaJogadores.innerHTML = elemento;
}

exibeJogadores(jogadores);

function adicionarVitoria(i) {
  var jogador = jogadores[i];
  jogador.vitorias++;
  jogador.pontos = calculaPontos(jogador);
  for (var indice = 0; indice < jogadores.length; indice++){
    if(indice != i){
      jogadores[indice].derrotas++
    }
  }
  qtdPartidas++;
  numeroPartidas.innerHTML = "Número de Partidas: " + qtdPartidas;
  exibeJogadores(jogadores);
}

//Se houve empate, todos receberam 1 empate no somatório
function adicionarEmpate(){
  for (var i = 0; i < jogadores.length; i++) {
    var jogador = jogadores[i];
    jogador.empates++;
    jogador.pontos = calculaPontos(jogador);
    exibeJogadores(jogadores);
  }
  qtdPartidas++;
  numeroPartidas.innerHTML = "Número de Partidas: " + qtdPartidas;
}

function zerarPontuacao(){
  for (var i = 0; i < jogadores.length; i++) {
    var jogador = jogadores[i];
    jogador.vitorias = 0;
    jogador.empates = 0;
    jogador.derrotas = 0;
    jogador.pontos = 0;
    qtdPartidas = 0;
    numeroPartidas.innerHTML = "Número de Partidas: " + qtdPartidas;
    exibeJogadores(jogadores);
    var vencedor = document.getElementById("vencedor")
    vencedor.innerHTML = "";
    var erroAdicionar = document.getElementById("erroAdicionar")
    erroAdicionar.innerHTML = "";
    document.getElementById("nome").value = "";
  }
}

function excluirJogador(i){
  jogadores.splice(i,1);
  exibeJogadores(jogadores);
}

//Não estamos considerando o empate, somente um vencedor.
function finalizarJogo(){
  var maior = 0;
  if(qtdPartidas == 0){
    alert("Jogo ainda não iniciado!");
  }else{
    for (var i = 0; i < jogadores.length - 1; i++) {
        var jogadorMaior = jogadores[maior];
        var proxJogador = jogadores[i+1];
        if(jogadorMaior.pontos < proxJogador.pontos){
        maior = i+1;
        } 
    }
    var vencedor = document.getElementById("vencedor")
    vencedor.innerHTML = "O Vencedor é o(a) Jogador(a): " + jogadores[maior].nome;
    }
}