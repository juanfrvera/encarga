export class FakeApi {
    constructor(private localStorageKey: string) { }

    public async getTotalCount() {
        const list = await this.getList();
        return list.length;
    }

    public getList(): Promise<Array<any>> {
        return new Promise((resolve) => {
            const dataString = localStorage.getItem(this.localStorageKey);

            if (dataString != null && dataString.length > 0) {
                resolve(JSON.parse(dataString));
            }
            else {
                resolve([]);
            }
        });
    }

    public async get(id: string) {
        const list = await this.getList();
        return list.find((e) => e.id == id);
    }


    public async create(data) {
        const list = await this.getList();

        data.id = Date.now().toString();
        list.push(data);

        await this.save(list);

        return data;
    }

    public async update(data) {
        const list = await this.getList();

        const index = list.findIndex((e) => e.id == data.id);

        if (index != -1) {
            list[index] = data;
        }

        await this.save(list);

        return data;
    }

    public async delete(id: string) {
        let list = await this.getList();

        list = list.filter((d) => d.id != id);

        this.save(list);
    }


    private save(list) {
        localStorage.setItem(this.localStorageKey, JSON.stringify(list));
    }
}