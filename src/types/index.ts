export interface Recipe {
    id: string;
    titulo: string;
    categoria: string;
    tipoComida?: string;
    contenido: string;
    position: number;
    created: number;
}