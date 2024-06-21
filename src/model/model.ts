export interface Pokemon {
    avatar: string;
    name: string;
    id: number;
    status: boolean;
}

export interface PokemonData {
    name: string;
    url: string;
}

export interface ApiResponse {
    results: PokemonData[];
}