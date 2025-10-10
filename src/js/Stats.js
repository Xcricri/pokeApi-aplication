// Script //

// Mengambil id
const pokemonStats = document.getElementById('pokemon-stats');

async function getPokemon(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);//Mengambil data dari api
        if (!response.ok){
            throw new Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        // console.log(data) 

        return {//Mengemballikan data yang dibutuhkan
            name: data.name,
            image: data.sprites.front_default,
            height: data.height,
            type: data.types[0]?.type.name || 'unknown', // Untuk menghindari error jika data tidak ada
            ability: data.abilities[0]?.ability.name || 'unknown'
        };
    } catch (error){
        console.log(error);
    }    
}    


// Fungsi menampilkan data pokemon
document.addEventListener('DOMContentLoaded',() => {//Untuk merender data stats
    async function pokemonSts(){
        try{
            const urlParams = new URLSearchParams(window.location.search); // Mengambil parameter dari url
            const id = urlParams.get('id'); // mengambil id dari parameter url
            const pokemon = await getPokemon(id); //Memanggil fungsi getpokemon dengan id dari parameter url

            
            const cardStats = document.createElement('div');
            cardStats.className = 'pokemon-sts-card';
            cardStats.innerHTML = `
                <h1>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
                <img src= "${pokemon.image}" alt="${pokemon.name}">
                <p>Type: ${pokemon.type}</p>
                <p>Height: ${pokemon.height} cm</p>
                <p>Ability: ${pokemon.ability}</p>
                <a href="../main.html">Kembali ke halaman utama</a>
            `;
            pokemonStats.appendChild(cardStats);

        }catch (error){// Mengecek error
            const errorMessage = document.createElement('p');
            errorMessage.innerHTML = `${error}`;
        }     
    }    
    pokemonSts();// Memanggil fungsi pokemon stats
})    