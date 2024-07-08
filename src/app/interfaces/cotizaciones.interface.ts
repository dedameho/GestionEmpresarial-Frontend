import { ICliente } from './clientes.interface';
import { IProducto } from './productos.interface';

export interface ICotizacion {
    id: number,
    fecha: Date,
    clienteId: number,
    total: number,
    subtotal: number,
    iva: number,
    estado: string,
    codigo: string,
    updatedAt: string,
    Cliente: ICliente
}

export interface ICrearCotizacion {
    cotizacion: {
        clienteId: number,
        subtotal: number,
        total: number,
        estado: string
    },
    detalles: IDetalleCotizacion[]
}

export interface IDetalleCotizacion {
    id?: number,
    cotizacionId?: number,
    productoId: number,
    cantidad: number,
    precio: number,
    Producto?: IProducto
}

export interface ICotizacionCompleta {
    id: number,
    fecha: Date,
    clienteId: number,
    total: number,
    subtotal: number,
    iva: number,
    estado: string,
    codigo: string,
    updatedAt: Date,
    Cliente: ICliente,
    DetalleCotizacions: IDetalleCotizacion[]
}