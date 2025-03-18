let amigos = [];

function sortearAmigoSecreto(amigos) {
    if (amigos.length < 2) {
        throw new Error("É necessário informar pelo menos dois amigos para realizar o sorteio do amigo secreto!");
    }
    
    let sorteio = {};
    let disponiveis = [...amigos];
    
    for (let participante of amigos) {
        let possiveis = disponiveis.filter(p => p !== participante);
        
        if (possiveis.length === 0) {
            return sortearAmigoSecreto(amigos);
        }
        
        let sorteado = possiveis[Math.floor(Math.random() * possiveis.length)];
        sorteio[participante] = sorteado;
        disponiveis = disponiveis.filter(p => p !== sorteado);
    }
    
    return sorteio;
}

function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nome = input.value.trim();

    if (nome) {
        amigos.push(nome);
        const listaAmigos = document.getElementById('listaAmigos');
        const novoAmigo = document.createElement('li');
        novoAmigo.textContent = nome;
        listaAmigos.appendChild(novoAmigo);
        input.value = '';
    } else {
        alert('Por favor, digite um nome.');
    }
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert('É necessário informar pelo menos dois amigos para realizar o sorteio!');
        return;
    }

    const sorteio = sortearAmigoSecreto(amigos);
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    for (const [amigo, sorteado] of Object.entries(sorteio)) {
        const item = document.createElement('li');
        item.textContent = `O amigo sorteado de ${amigo} é ${sorteado}.`;
        resultado.appendChild(item);
    }
}

function verificarBotaoAdicionar() {
    const nomeInput = document.getElementById("nome");
    const botaoAdicionar = document.getElementById("adicionar");
    botaoAdicionar.disabled = nomeInput.value.trim() === "";
}

function atualizarLista() {
    const lista = document.getElementById("listaamigos");
    lista.innerHTML = amigos.map(p => `<li>${p}</li>`).join(" ");
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("nome").addEventListener("input", verificarBotaoAdicionar);
    document.getElementById("adicionar").addEventListener("click", adicionarAmigo);
});
