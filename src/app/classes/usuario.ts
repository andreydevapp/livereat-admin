export class Usuario {

    public nombre: string;
    public id: string;
    public idWS:string;
    public token: string;
    public imgUrl: string;
    public email: string;
    public logueadoConFb:boolean;
    public opc:string;

    constructor( nombre: string, id: string, token: string, imgUrl: string, email: string) {
        
        this.nombre = nombre;
        this.id = id;
        this.idWS = 'sin-id';
        this.token = token;
        this.imgUrl = imgUrl;
        this.email = email;
        this.logueadoConFb = false;
        this.opc = 'cliente';

    }



}

