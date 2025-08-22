import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

export default function CustomModal(props) {
  return (
    <Dialog
      open={props.isOpen}
      onClose={() => {}} // Empty function prevents closing on backdrop click
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="modal-overlay"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="modal-content"
          >
            <div className="modal-header">
              <DialogTitle
                as="h3"
                className="modal-title"
              >
                {props.label}
              </DialogTitle>
              <div className="mt-2">{props.content}</div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
