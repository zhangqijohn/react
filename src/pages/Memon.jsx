import React, {useState, useMemo} from 'react'

function Button({ name, children }) {
    function changeName(name) {
        console.log('11')
        return name + '改变name'
    }
    console.log(name, children )
    const otherName =  useMemo(()=>changeName(name),[name]) //  优化性能
    // const otherName =  changeName(name)
    return (
        <>
            <div>{'name: '+ otherName}</div>
            <div>{'content:' +children}</div>
        </>

    )
}

function Memon(props) {
    const [name, setName] = useState('名称')
    const [content,setContent] = useState('内容')
    return (
        <>
            <button onClick={() => setName('张三')}>name</button>
            <button onClick={() => setContent('码代码')}>content</button>
            <button name={name}>{'name: '+ name + ',content:' + content}</button>
            <div>
                <Button name={name}>{content}</Button>
            </div>
        </>
    )
}

export default Memon
