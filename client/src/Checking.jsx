import React, { useEffect, useState } from 'react';

function Checking() {
    const [item, setItem] = useState("")
    const [count , setCount] = usestate(0);

    const [toDoList, setTodoList] = useState([
        {
            title: 'Study',
            id: "1"
        },
        {
            title: 'playing',
            id: "2"
        }
    ])

    function addToDo() {
        const id = new Date().now()
        setTodoList([...toDoList, { id, title: item }])
        setItem("")
    }
    return (
        <div>
            {toDoList.map(toDo => <p key={toDo.id}>{toDo.title}</p>)}
            <input value={item} type="text" placeholder='Add your todo' onChange={e => setItem(e.target.value)} />
            <button onClick={addToDo}>Add</button>
        </div>
    )
}

export default Checking;