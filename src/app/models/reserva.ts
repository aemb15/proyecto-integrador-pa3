export interface Reserva{
    id?: string;
    habitacionId: string;
    fechaInicio: Date;
    fechaFin: Date;
    nombreCliente: string;
    estado: string;
}