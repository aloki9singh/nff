export default function Todo({ todo, toggleComplete, deleteTodo }) {
  console.log(todo);
  return (
    <>
      <li className="flex justify-between capitalize hover:bg-[#A145CD] mx-5">
        <div className="flex items-center ml-2 mt-4 ">
          <input
            type="checkbox"
            checked={todo.completed ? "checked" : ""}
            onChange={() => toggleComplete(todo)}
            className="bg-amber-200 hover:bg-amber-400 cursor-pointer 
    w-6 h-6 border-3 border-rose-500 rounded-lg checked:bg-green-500"
          />
          <p
            onClick={() => toggleComplete(todo)}
            className={`cursor-pointer overflow-hidden text-ellipsis text-inline ml-3 ${
              todo.completed ? "line-through" : ""
            }`}
            style={{ maxWidth: "" }}
          >
            {todo.text}
          </p>
        </div>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </li>

      <style>
        {`[type='checkbox'].checkmark-gray:checked {
            background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='111827' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
            @apply text-white;
          }`}
      </style>
    </>
  );
}
