export class FakeApi {
    constructor(private localStorageKey: string) { }

    public count() {
        return this.getList().length;
    }

    public getList(): Array<any> {
        const dataString = localStorage.getItem(this.localStorageKey);

        if (dataString != null && dataString.length > 0) {
            return JSON.parse(dataString);
        }
        else {
            return [];
        }
    }

    public get(id: string) {
        const list = this.getList();

        return list.find((e) => e.id == id);
    }


    public create(data) {
        const list = this.getList();

        data.id = Date.now().toString();
        list.push(data);

        this.save(list);

        return data;
    }

    public update(data) {
        const list = this.getList();

        const index = list.findIndex((e) => e.id == data.id);

        if (index != -1) {
            list[index] = data;
        }

        this.save(list);

        return data;
    }

    public delete(id: string) {
        let list = this.getList();

        list = list.filter((d) => d.id != id);

        this.save(list);
    }


    private save(list) {
        localStorage.setItem(this.localStorageKey, JSON.stringify(list));
    }
}