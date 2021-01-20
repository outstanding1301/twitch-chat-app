import { action, autorun, makeAutoObservable, makeObservable, observable } from 'mobx'

class TestStore {
    value = 0;
    
    constructor() {
        makeAutoObservable(this);
    }

    increaseValue = () => {
        this.value += 1;
    }

    decreaseValue = () => {
        this.value -= 1;
    }
}

const testStore = new TestStore();

autorun(() => {
    console.log(testStore.value);
})

export default testStore;