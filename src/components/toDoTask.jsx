export default function Task({value,func,removeBtn}){
    return (
        <li id={value.id} data-status={value.status}>
            {value.todo}
            <button onClick={func}>{value.status===true?'დასრულება':'დაბრუნება'}</button>
            {removeBtn}
        </li>
    )
}