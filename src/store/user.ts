import {observable} from 'mobx'

interface UserType {
    id: string
    name: string
}

export default class User {
    @observable id: string = ''
    @observable name: string = ''

    login(data: UserType) {
        this.id = data.id
        this.name = data.name
    }
}
