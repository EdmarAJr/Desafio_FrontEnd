const ulTopFilmes = document.querySelector(".topFilmes");
const ulFilmesVinte = document.querySelector(".filmesPrincipal");
const botoesDinamicos = document.querySelector(".botoesGenero");
let filmes = [];



const criarElementoFilme = (filme) => {
    const listaTopFilmes = document.createElement("li");
    listaTopFilmes.innerHTML = `
    <img src = "${filme.poster_path}">
    <img class="estrelaFavorito" src="icones/EstrelaFavorito.svg">

    <div class="nomedoFilmeRodape">
      <h5>${filme.original_title}</h5>
      
      <div class="notaDoFilme">
        <img class="estrelaDaNota" src="icones/Estrela.svg">
        <span>${filme.vote_average}</span>
      </div>
    </div>
    <div class="sacola"><button class="botaoFilmes"><span>Sacola</span> <span>R$ ${filme.price}</span></button></div>
    `
    return listaTopFilmes;

 }

 const exibirFilmes = (filmes)=>{
     ulFilmesVinte.innerHTML = "";
    
    for (let i = 0; i < 20; i++) {
                
        const elementoFilme = criarElementoFilme(filmes[i]);
        ulFilmesVinte.append(elementoFilme);     
    }

 };

fetch(" https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR")
.then( resposta => {
    return resposta.json();
})

.then(respostaJson => {
     filmes = respostaJson.results;
   
    for (let i = 0; i < 5 ; i++) {
       
        const elementoFilme = criarElementoFilme(filmes[i]);
        ulTopFilmes.append(elementoFilme);    
      
    }
    
exibirFilmes(filmes);
      
    botaoTodos = addEventListener('click', () => {
        ulFilmesVinte.innerHTML = '';
        
      exibirFilmes(filmes);
    });
    
}); 


//------------------------------------filmes------------------------------------------------------

fetch ("https://tmdb-proxy-workers.vhfmag.workers.dev/3/genre/movie/list?language=pt-BR")
.then( resposta => {
    return resposta.json();
})

.then (respostaJson => {
    const generos = respostaJson.genres;

    
    for (const genero of generos.slice(0, 4)) {
       
        
        const botaoGenero = document.createElement("button");
        botaoGenero.innerText = (genero.name);
        botoesDinamicos.append(botaoGenero);
        botoesDinamicos.addEventListener("click", ()=>{
            fetch (`https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=${genero.id}&language=pt-BR`)
            .then( resposta => {
                  return resposta.json();
             })

            .then (respostaJson => {

                exibirFilmes(respostaJson.results)

              });
            });

    }
});


/*Pessoal, Victor me deu uma dica que facilita muito a vida, então tô espalhando a palavra 
pro caso de alguém também não saber: quando a gente usa o innerHTML dá pra criar vários elementos na sequência. 
Eu estava usando o createElement pra cada coisinha do card dos filmes e agora vejam como ficou:

 filmesTopli.innerHTML = `
    <div class="filtro"></div>

    <img class="estrela" src="estrela.png">

    <div class="titulo-nota">
      <h5>${filme.original_title}</h5>
      
      <div class="nota">
        <img src="estrela-dourada.png">
        <span>${filme.vote_average}</span>
      </div>
    </div>

    <button>Sacola ${formatarPreco(filme.price)}</button>
  `; */