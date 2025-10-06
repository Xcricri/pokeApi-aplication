// Script//

// Mengambil id
const PokemonContainer = document.getElementById('pokemon-container');

// Fungsi untuk mengambil data pokemon
async function getPokemon(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok){
            throw new Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        // console.log(data) 
        return {
            name: data.name,
            image: data.sprites.front_default,
        };
    } catch (error){
        console.log(error);
    }    
}    


// Fungsi menampilkan data pokemon
setTimeout(() => {
    async function displayPokemon(){
        for (let i = 1; i<= 100; i++){
            try{
                const pokemon = await getPokemon(i);
                const card = document.createElement('div');
                const link = document.createElement('a');
                card.className = 'pokemon-card';   
        
                card.innerHTML = `
                    <img src= "${pokemon.image}" alt="${pokemon.name}">
                    <a href="#">${pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1)}</a> 
                `;    
                PokemonContainer.appendChild(card); 

            }catch (error){// Mengecek error
                const errorMessage = document.createElement('p');
                errorMessage.innerText = `${error}`;
                PokemonContainer.appendChild(errorMessage);
            }    
        }    
    }    
    displayPokemon();
},1500)    


// Logika untuk mencari pokemon
const searchInput = document.getElementById('Search-input')
const resultDiv = document.getElementById('result');

searchInput.addEventListener('input', async () => {
    const query = searchInput.value.trim();
        
    //Mengosongkan nilai input
    resultDiv.innerHTML = '';   
    resultDiv.style.display = 'none';

    if (!query) {
        resultDiv.innerHTML = ``;
        resultDiv.style.display = `none`;
        return;
    }

    try {
        const responsePokemon = await getPokemon(query);
        
        if (responsePokemon) {
            resultDiv.innerHTML = `
                <div>
                    <h2>${responsePokemon.name.charAt(0).toUpperCase() + responsePokemon.name.slice(1)}</h2>
                    <img src= "${responsePokemon.image}" alt="${responsePokemon.name}">
                    <a href ='#'>Lihat detail pokemon</a>
                </div>
                `;
            
        } else{
            resultDiv.innerHTML = `<p>Pokemon tidak ditemukan</p>`;
        }

    } catch (error) {
        resultDiv.innerHTML = `<p>Pokemon tidak ditemukan</p>`;
        console.log(error);
    }

    resultDiv.style.display = 'block';
});


