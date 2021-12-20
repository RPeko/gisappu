import { GeomPolygon } from "./geom_polygon";

export class Objekat{
    id: number;
    ko: number;
    kultura: string;
    geom: GeomPolygon;
    vrstaPrava: string;
    brParcele: string;
    povrsina: number;
    brojimen: string;
    isEdit: true;
    isSelected: false;
}

export const ObjekatSchema = {
    isSelected: "isSelected",
    kultura: "text",
    vrstaPrava: "text",
    brParcele: "text",
    povrsina: "number",
    brojimen: "text",
    isEdit: "isEdit"
}