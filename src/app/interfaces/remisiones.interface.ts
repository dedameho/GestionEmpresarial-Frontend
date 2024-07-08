import { ICotizacion } from './cotizaciones.interface';

export interface IRemision {
    id: number,
    fecha: Date,
    cotizacionId: number,
    codigo: string,
    ordenCompra: string,
    estado: string,
    Cotizacion:ICotizacion
}