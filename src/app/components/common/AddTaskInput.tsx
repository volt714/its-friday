'use client'

// AddTaskInput is a hidden input that can be toggled into view to quickly add text
// It submits the parent form on Enter and hides itself when blurred with an empty value

export default function AddTaskInput({ id, name, placeholder }: { id: string; name: string; placeholder: string }) {
  return (
    <input
      id={id}
      name={name}
      placeholder={placeholder}
      style={{ display: 'none' }}
      className="border rounded px-3 py-1 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          // Prevent the browser's default submit to avoid double submissions
          e.preventDefault()
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


