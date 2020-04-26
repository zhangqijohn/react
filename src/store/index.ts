import User from './user'
import Setting from './setting'
import UIState from './uiState'

const store = {
    User: new User(),
    Setting: new Setting(),
    UIState: new UIState(),
}

export default store

export type StoreType = typeof store
