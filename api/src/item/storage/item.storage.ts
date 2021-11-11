import { ItemCreationData } from "../data/item.creation.data";
import { Item } from "../entities/item.entity";

export abstract class ItemStorage {
    public abstract create(data: ItemCreationData): Promise<Item>
}