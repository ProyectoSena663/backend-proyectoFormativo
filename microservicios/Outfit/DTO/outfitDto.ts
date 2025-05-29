export class OutfitDTO {
    id_ou: number;
    fk_id_per: number;

    constructor(id_ou: number, fk_id_per: number) {
        this.id_ou = id_ou;
        this.fk_id_per = fk_id_per;
    }
}