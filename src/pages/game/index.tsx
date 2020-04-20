import React from "react";
import { getGame } from "../../api/game";
import { getUser } from "../../api/user";

class GameComponent extends React.Component<any, any> {
    game = [];
    user = [];

    getGame () {
        getGame().then((res:any) => {
            this.game = res.data
        })
    }

    getUser () {
        getUser().then((res:any) => {
            this.user = res.data.data
        })
    }

    componentDidMount(): void {
        this.getGame();
        this.getUser()
    }

    render() {
        return (
            <div className="q1-game">
                //TODO 渲染api数据
            </div>
        )
    }
}

export default GameComponent;