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
        console.log(data)

        return {//Mengemballikan data yang dibutuhkan
            name: data.name,
            image: data.sprites.front_default,
            hp: data.stats[0].base_stat,
            attack: data.stats[2]?.base_stat,
            speed: data.stats[3]?.base_stat,
            special_attack: data.stats[4]?.base_stat,
            special_defense: data.stats[5]?.base_stat,
            type: data.types[0]?.type.name || 'unknown', // Untuk menghindari error jika data tidak ada
            ability: data.abilities[0]?.ability.name || 'unknown',
            height: data.height,
            gender: data.gender
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

            // Menambahkan data ke dalam div 
            const cardStats = document.createElement('div');
            cardStats.className = 'pokemon-sts-card';
            cardStats.innerHTML = `
                <h1>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
                <img src= "${pokemon.image}" alt="${pokemon.name}">
                <p>Type: ${pokemon.type}</p>
                <p>Ability: ${pokemon.ability}</p>
                <a href="../main.html">Kembali ke halaman utama</a>
            `;
            pokemonStats.appendChild(cardStats);

            // Menambahkan data ke dalam chart
            const chart = document.createElement('canvas');
            chart.id = 'pokemon-chart';
            chart.className = 'pokemon-chart';
            const ctx = chart.getContext('2d');

            const pokemonChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Hp', 'Attack', 'Speed', 'Special Attack', 'Special Defense'],
                    datasets: [{
                        label: `${pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1)} Stats`,
                        data: [pokemon.hp, pokemon.attack, pokemon.speed, pokemon.special_attack, pokemon.special_defense],
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            pokemonStats.appendChild(chart);

        }catch (error){// Mengecek error
            const errorMessage = document.createElement('p');
            errorMessage.innerHTML = `${error}`;
        }     
    }    
    pokemonSts();// Memanggil fungsi pokemon stats
})    
