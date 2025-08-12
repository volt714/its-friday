'use client'

export default function AddTaskInput({ id, name, placeholder }: { id: string; name: string; placeholder: string }) {
  return (
    <input
      id={id}
      name={name}
      placeholder={placeholder}
      style={{ display: 'none' }}
      className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.currentTarget.form?.requestSubmit()
        }
      }}
      onBlur={(e) => {
        if (!e.currentTarget.value) {
          e.currentTarget.style.display = 'none'
        }
      }}
    />
  )
}


