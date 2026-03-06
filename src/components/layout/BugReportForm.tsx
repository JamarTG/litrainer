import { FormEvent, useState } from "react";
import { X } from "lucide-react";
import Button from "../shared/Button";

interface BugReportFormProps {
  isOpen: boolean;
  onClose: () => void;
  recipientEmail: string;
}

interface BugReportData {
  message: string;
}

const INITIAL_FORM_DATA: BugReportData = {
  message: ""
};

const BugReportForm: React.FC<BugReportFormProps> = ({ isOpen, onClose, recipientEmail }) => {
  const [formData, setFormData] = useState<BugReportData>(INITIAL_FORM_DATA);

  if (!isOpen) {
    return null;
  }

  const updateField = (field: keyof BugReportData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = "[Bug Report] Litrainer issue";
    const body = formData.message.trim() || "No details provided.";

    window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    onClose();
    setFormData(INITIAL_FORM_DATA);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-start sm:items-center justify-center p-0 sm:p-4">
      <button
        type="button"
        aria-label="Close bug report form"
        className="absolute inset-0 modal-backdrop"
        onClick={handleClose}
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full h-full rounded-none border-0 bg-[var(--color-surface)] shadow-sm sm:h-auto sm:max-w-lg sm:rounded-xl sm:border sm:border-[var(--color-border)]"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="text-lg font-semibold text-[var(--color-fg)]">Report a bug</p>
            <p className=" text-[var(--color-muted)]">Your report is sent to the creator by email.</p>
          </div>
          <Button
            type="button"
            onClick={handleClose}
            className="p-0 px-0 py-0 rounded-lg text-base"
            aria-label="Close"
          >
            <X size={22} />
          </Button>
        </div>

        <div className="grid gap-3 px-4 py-3">
  
            <textarea
              required
              rows={6}
              value={formData.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="Describe the issue you found..."
              className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-2 text-base text-[var(--color-fg)] placeholder:text-[var(--color-muted)] outline-none"
            />
     
        </div>

        <div className="flex items-center justify-end gap-2  px-4 py-3">
          <Button
            type="submit"
            className="px-3 py-1.5 text-base rounded-md"
          >
            Send report
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BugReportForm;
