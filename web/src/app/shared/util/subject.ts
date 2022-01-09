export class Subject<T> {
    private _observerList: Array<Function> = [];

    public subscribe(observer: Function) {
        this._observerList.push(observer);
    }
    public unsubscribe(observer: Function) {
        const index = this._observerList.indexOf(observer);

        if (index > -1) {
            this._observerList.slice(index, 1);
        }
    }
    public notify(data: T) {
        for (const observer of this._observerList) {
            observer(data);
        }
    }
}