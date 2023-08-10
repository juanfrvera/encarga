export interface Item extends ItemData {
    _id: string,
}

export interface ItemData {
    name: string,
    description: string,
    price: string,
    categoryIdList: string[],
    shopId: string
}