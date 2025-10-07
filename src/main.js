// Script//



// Mengambil id
const PokemonContainer = document.getElementById('pokemon-container');

// Fungsi untuk mengambil data pokemon
async function getPokemon(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);//Mengambil data dari api
        if (!response.ok){
            throw new Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        // console.log(data) untuk melihat data di console

        return {//Mengemballikan data yang dibutuhkan
            name: data.name,
            image: data.sprites.front_default,
        };
    } catch (error){
        console.log(error);
    }    
}    


// Fungsi menampilkan data pokemon
setTimeout(() => {//Untuk merender data

    async function displayPokemon(){
        for (let i = 1; i<= 50; i++){//Looping 100 card pokemon
            try{
                const pokemon = await getPokemon(i);
                const card = document.createElement('div');
                const link = document.createElement('a');
                card.className = 'pokemon-card';//Menambahkan class pada card
        
                card.innerHTML = `
                    <img src= "${pokemon.image}" alt="${pokemon.name}">
                    <a href="#">${pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1)}</a>
                `;    
                PokemonContainer.appendChild(card);//Menambahkan card pada container

            }catch (error){// Mengecek error
                const errorMessage = document.createElement('p');
                errorMessage.innerText = `${error}`;
                PokemonContainer.appendChild(errorMessage); //Menampilkan error pada container
            }    
        }    
    }    
    displayPokemon();// Memanggil fungsi display pokemon
},1500)    


// Logika untuk mencari pokemon
const searchInput = document.getElementById('Search-input')
const resultDiv = document.getElementById('result');

searchInput.addEventListener('input', async () => {
    const query = searchInput.value.trim();//Mengosongkan spasi di awal dan akhir input
        
    //Mengosongkan nilai input
    resultDiv.innerHTML = ''.charAt(0)+''.slice(1);
    resultDiv.style.display = 'none';

    if (!query) {//Jika input kosong akan mengosongkan result
        resultDiv.innerHTML = ``;
        resultDiv.style.display = `none`;
        return;
    } else {
        try {
            const responsePokemon = await getPokemon(query); //Mengambil data pokemon berdasarkan input
            
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
        resultDiv.style.display = 'block'; //Jika ada data pokemon akan menampilkan result
    }
});


