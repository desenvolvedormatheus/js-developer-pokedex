function cardDetalhe(pokeNumber) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNumber}/`)
    .then((detalhe) => detalhe.json())
    .then((detalhe) => console.log(detalhe))
}
