export interface Category extends CategoryData {
    _id: string,
}

export interface CategoryData {
    name: string,
    shopId: string
}