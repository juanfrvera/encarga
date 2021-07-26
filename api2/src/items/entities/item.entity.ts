import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'item' })
export class Item {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar' })
    titulo: string;

    @Column({ type: 'real' })
    precio?: number;

    @Column({ type: 'varchar' })
    descripcion?: string;
}
