export class Usuario {

    //usuario
    public id: string;
    public idWS:string;
    public token: string;
    public nombreUsuario: string;
    public email: string;

    //negocio
    public lon:number;
    public lat:number;
    public nombreNegocio:string;
    public imagen:string;
    public imagenMin:string;
    public opc:string;
    public plan:string;
    public active:boolean;

    constructor( 
        //usuario
        nombreUsuario: string, id: string, token: string, email: string,
        //negocio
        nombreNegocio: string, imagen: string, imagenMin: string, lon:number, lat:number, plan:string, active:boolean
    ){
        
        //usuario
        this.id = id;
        this.idWS ='sin-id';
        this.token = token;
        this.nombreUsuario = nombreUsuario;
        this.email = email;
    
        //negocio
        this.lon = lon;
        this.lat = lat;
        this.nombreNegocio = nombreNegocio;
        this.imagen = imagen;
        this.imagenMin = imagenMin;
        this.opc = 'negocio';
        this.plan = plan;
        this.active = active;

    }

}

