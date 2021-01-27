import { autorun, makeAutoObservable } from 'mobx'

class AuthStore {
    user = undefined;
    /* 
broadcaster_type: ""
created_at: "2013-08-11T02:57:27.556581Z"
description: "도대체 얼마나 큰 물개이길래 빅물개일까..?"
display_name: "빅물개"
email: "yeomryo@naver.com"
id: "47419300"
login: "big_seal_"
offline_image_url: ""
profile_image_url: "https://static-cdn.jtvnw.net/user-default-pictures-uv/cdd517fe-def4-11e9-948e-784f43822e80-profile_image-300x300.png"
type: ""
view_count: 22
    */
    token = "";
    
    constructor() {
        makeAutoObservable(this);
    }

    setUser = (user) => {
        this.user = user;
    }

    setToken = (token) => {
        this.token = token;
    }

    delToken = () => {
        this.token = "";
    }
}

const authStore = new AuthStore();

autorun(() => {
    console.log(authStore.token);
    console.log(authStore.user);
})

export default authStore;