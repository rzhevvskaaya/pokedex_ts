import Transport from "@/transport/transport";
import Store from "@/store/store";
import View from "@/view/view";
import { Pokemon } from "@/model/model";

class Service {
    async fetchPokemonData(): Promise<Pokemon[]> {
        try {
            const pokemonList: { url: string }[] = await Transport.getData();
            const pokemons: Pokemon[] = [];

            for (const pokemonData of pokemonList) {
                const response = await fetch(pokemonData.url).then(res => res.json());
                const pokemon: Pokemon = {
                    name: response.name,
                    id: response.id,
                    avatar: response.sprites.front_default,
                    status: false
                };
                pokemons.push(pokemon);
            }

            return pokemons;
        } catch (error) {
            console.error("Error fetching Pokemon data:", error);
            return [];
        }
    }

    generateId(number: number): string {
        return number.toString().padStart(4, '0');
    }

    toggleCatchStatus = (pokemon: Pokemon): void => {
        pokemon.status = !pokemon.status;

        const index = Store.pokemonsInStore.findIndex((p: Pokemon) => p.id === pokemon.id);

        if (pokemon.status && index === -1) {
            Store.pokemonsInStore.push(pokemon);
        } else if (!pokemon.status && index !== -1) {
            Store.pokemonsInStore.splice(index, 1);
        }
    };

    handlePagination = (e: Event): void => {
        const target = e.target as Document;
        if (target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) <= 0) {
            Transport.start += 20;

            this.fetchPokemonData().then((pokemons: Pokemon[]) => {
                if (pokemons.length > 0) {
                    View.userView();
                }
            }).catch(error => {
                console.error("Error fetching data:", error);
                View.endView();
            });
        }
    }
}

export default new Service();