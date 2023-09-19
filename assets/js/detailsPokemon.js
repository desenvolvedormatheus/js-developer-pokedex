const sectionCard = document.createElement('section')
sectionCard.setAttribute("id", "cardPokemon")
sectionCard.setAttribute("class", "detailsPokemon")

function getPokeApiPokemonCard(number){
    const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${number}/`
    
    fetch(urlPokemon).then((api) => api.json())
    .then((apiJson) =>{
        urlDetalhes = `https://pokeapi.co/api/v2/encounter-method/${number}`
        
        fetch(urlDetalhes)
        .then((api) => api.json())
        .then((apiJsonDeatlhes) => {
            const pokemonCard = new PokemonCardModel()
    
            pokemonCard.name = apiJson.name
            pokemonCard.number = number
            pokemonCard.photo = apiJson.sprites.other.dream_world.front_default
            pokemonCard.types = apiJson.types.map((typeSlot) => typeSlot.type.name)

            let peso = String(apiJson.weight)
            if(peso.length > 1){
                peso = peso.substring(0, peso.length -1) + '.' + peso.substring(peso.length - 1)
            }
            
            let altura = String(apiJson.height)
            if(altura.length == 1){
                altura = '0.' + altura.substring(altura.length - 1)
            }else if (altura.length > 1){
                altura = altura.substring(0, altura.length -1) + '.' + altura.substring(altura.length - 1)
            }

            pokemonCard.weight = peso
            pokemonCard.height = altura
            pokemonCard.enconter = apiJsonDeatlhes.names[1].name

            return pokemonCard
            
        })
        .then((pokemonCard) =>{

            let cardHtml = `
            <main class="${pokemonCard.types[0]}">
                <header>
                    <h1 class="card-h1">${pokemonCard.name}</h1>
                    <p class="card-number">#${pokemonCard.number}</p>
                    <img src="./assets/icons/pokebola.webp" alt="Pokebola" class="iconPokebola">
                </header>
                <figure class="card-figure">
                    <img src="${pokemonCard.photo}" alt="photo pokemon ${pokemonCard.name}">
                </figure>
            
                <div class="card-details">
            
                    <ul class="card-types">
                        ${pokemonCard.types.map((type) => `<li class="card-type ${type}">${type}</li>`).join('')}
                    </ul>
            
                    <div class="weight-height">
                        <p>${pokemonCard.weight} KG <br>Weight</p>
                        <p>${pokemonCard.height} M <br>Height</p>
                    </div>
            
                    <div class="habitat">
                        <p>Enconter method: ${pokemonCard.enconter}</p>
                    </div>
                    
                </div>
                <button id="btnFecharCard" onclick="fecharCard()"><p>back</p></button>
            </main>
            `
            sectionCard.innerHTML = cardHtml
        })
    })
}


function cardDetalhe(number){   // abrir card
    document.querySelector("#listaPokemon").setAttribute('class', 'displayHidden')
    document.querySelector("body").appendChild(sectionCard)
    getPokeApiPokemonCard(number)
    efeitoSonoro.play()
}

function fecharCard(){          // fechar card
    sectionCard.remove()
    document.querySelector("#listaPokemon").setAttribute('class', 'content')
    efeitoSonoro.play()
}