import { createGroup } from '@/app/actions/groupActions'
import ToggleInputButton from '@/app/components/common/button/ToggleInputButton'
import AddTaskInput from '@/app/components/common/AddTaskInput'

// AddNewGroupCard shows an inline control to create a new group
export default function AddNewGroupCard() {
  return (
    <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
      <div className="p-6 text-center">
        <form
          action={async (formData: FormData) => {
            const name = String(formData.get('name') || 'New Group')
            await createGroup(name)
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Toggle input visibility and submit via Enter */}
          <ToggleInputButton targetId="new-group-name" className="text-gray-400 hover:text-gray-600 flex items-center gap-2 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="font-medium">Add new group</span>
          </ToggleInputButton>
          <AddTaskInput id="new-group-name" name="name" placeholder="Enter group name" />
        </form>
      </div>
    </div>
  )
}


