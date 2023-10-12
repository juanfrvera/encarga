import { OrderLine } from './order-line';

export interface Order {
    lines?: OrderLine[];
    shopPath: string | null;
}
