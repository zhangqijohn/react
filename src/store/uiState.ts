import {observable} from 'mobx'

interface UIStateType {
    menuCollapsed: boolean
}

export default class UIState implements UIStateType {
    @observable menuCollapsed = false
    constructor() {
        this.toggleMenuCollapsed = this.toggleMenuCollapsed.bind(this)
    }
    toggleMenuCollapsed() {
        this.menuCollapsed = !this.menuCollapsed
    }
}
