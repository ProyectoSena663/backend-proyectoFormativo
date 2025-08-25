type Parte_prenda_camisa = 'Cuello'|'Brazalete'|'Dobladillo inferior'|'Mangas'|'Interior'|'Fondo';
type Parte_prenda_pantalon = 'zona inferior'|'entubado'|'parches'|'bota corta'|'bota larga'
type Parte_prenda_gorra = 'maya'|'gorra plana'|'gorra ovalada'|'correa'

export class PersonalizacionDto {
    id_per ?: string;
    parte_prenda_camisa?: Parte_prenda_camisa;
    parte_prenda_pantalon?: Parte_prenda_pantalon;
    parte_prenda_gorra?: Parte_prenda_gorra;
    color : string;
    fk_id_du?: number;

    constructor(
        color: string,
        fk_id_du?: number,
        parte_prenda_camisa?: Parte_prenda_camisa,
        parte_prenda_pantalon?: Parte_prenda_pantalon,
        parte_prenda_gorra?: Parte_prenda_gorra,
        id_per?: string,
    ) {
        this.id_per = id_per;
        this.parte_prenda_camisa = parte_prenda_camisa;
        this.parte_prenda_pantalon = parte_prenda_pantalon;
        this.parte_prenda_gorra = parte_prenda_gorra;
        this.color = color;
        this.fk_id_du = fk_id_du;
    }
}