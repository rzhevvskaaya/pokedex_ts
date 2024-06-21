import { PokemonData, ApiResponse } from '@/model/model';

class Transport {
    private end: number;
    start: number;

    constructor(end: number = 20, start: number = 0) {
        this.end = end;
        this.start = start;
    }
    getData = async (): Promise<PokemonData[]> => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.end}&offset=${this.start}.`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data: ApiResponse = await response.json();
            return data.results;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

}
export default new Transport;

