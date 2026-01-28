import { IPoderes } from "./poderes.model";

export interface IHeroi {
    id: number;
    nome: string;
    nomeHeroi: string;
    superpoderes: IPoderes[];
    dataNascimento: Date;
    altura: number;
    peso: number;
}