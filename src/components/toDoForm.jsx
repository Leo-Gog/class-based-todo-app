export default function Form({func}) {
       return (
        <form onSubmit={func}>
          <input type="text" id="todo-input" placeholder="ჩაწერე რისი გაკეთება გსურს ..."/>
          <button>დამატება</button>
        </form>
    )
}