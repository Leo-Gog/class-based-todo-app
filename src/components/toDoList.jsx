import Task from "./toDoTask"

export default function List({arr, func, removeBtn, name="მიმდინარე:"}){
    return(
    <div>
        <p><span className="head">{name}</span></p>
        <ul>
            {arr.map((value) => {
                return(
                    <Task value={value} func={func} removeBtn={removeBtn} key={value.id} />
                )
            })}
        </ul>
    </div>
        
       
    )
}