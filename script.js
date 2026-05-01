const video = document.getElementById("video");

// carregar lista
fetch("canais.json")
.then(r => r.json())
.then(canais => {
    window.canais = canais;
    renderLista(canais);
});

// montar lista
function renderLista(lista){
    const div = document.getElementById("lista");
    div.innerHTML = "";

    lista.forEach(c => {
        const item = document.createElement("div");
        item.className = "canal";
        item.innerText = c.nome;

        item.onclick = () => play(c.url);

        div.appendChild(item);
    });
}

// tocar canal
function play(url){
    if(Hls.isSupported()){
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
    } else {
        video.src = url;
    }
}

// busca
document.getElementById("buscar").addEventListener("input", e => {
    const termo = e.target.value.toLowerCase();
    const filtrado = window.canais.filter(c => 
        c.nome.toLowerCase().includes(termo)
    );
    renderLista(filtrado);
});
