import { createConnection } from "typeorm";

export default ()=> {
    createConnection().then(async () => {
        console.log('Connection success')
    }).catch(error => {
        console.log('TypeOrm connection is error' + error)
    });
}