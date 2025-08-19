import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SimpleUser } from '@/app/components/common/types';
import { createUserAction, deleteUserAction } from '@/app/actions';
import UserAvatar from '@/app/components/common/UserAvatar';

interface ManageOwnersPopoverProps {
  open: boolean;
  onClose: () => void;
  users: SimpleUser[];
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

const ManageOwnersPopover: React.FC<ManageOwnersPopoverProps> = ({
  open,
  onClose,
  users,
  buttonRef,
}) => {
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPopoverStyle({
        position: 'fixed',
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        zIndex: 1000,
      });
    }
  }, [open, buttonRef]);

  if (!open) return null;

  return createPortal(
    <div className="absolute z-50 w-80 bg-white border border-gray-200 rounded-xl shadow-xl p-6" style={popoverStyle}>
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900 text-base">Manage Owners</h3>
        <button
          className="p-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          onClick={onClose}
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="mb-6">
        <div className="max-h-48 overflow-auto space-y-2">
          {users.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-sm">No users yet</p>
            </div>
          ) : (
            users.map((u) => (
              <div key={u.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150">
                <div className="flex items-center gap-3">
                  <UserAvatar name={u.name} size="sm" />
                  <span className="text-sm font-medium text-gray-900">{u.name}</span>
                </div>
                <form action={deleteUserAction}>
                  <input type="hidden" name="id" value={u.id} />
                  <button
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150"
                    type="submit"
                  >
                    Remove
                  </button>
                </form>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <h4 className="font-medium text-gray-900 text-sm mb-3">Add New Owner</h4>
        <form
          ref={formRef}
          action={async (formData: FormData) => {
            try {
              setError(null);
              await createUserAction(formData);
              formRef.current?.reset();
              window.location.reload();
            } catch (e) {
              setError(e instanceof Error ? e.message : 'Failed to create user');
            }
          }}
          className="space-y-3"
        >
          <div>
            <input
              name="name"
              placeholder="Full name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         transition-all duration-200"
              required
            />
          </div>
          <div>
            <input
              name="email"
              placeholder="Email (optional)"
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         transition-all duration-200"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 px-3 py-2 rounded-lg">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg
                         hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
                         transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         transition-all duration-200 shadow-sm"
            >
              Add Owner
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default ManageOwnersPopover;
