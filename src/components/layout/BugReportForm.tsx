import { FormEvent, useState } from "react";
import { X } from "lucide-react";

interface BugReportFormProps {
  isOpen: boolean;
  onClose: () => void;
  recipientEmail: string;
}

interface BugReportData {
  title: string;
  steps: string;
  expected: string;
  actual: string;
  contact: string;
}

const INITIAL_FORM_DATA: BugReportData = {
  title: "",
  steps: "",
  expected: "",
  actual: "",
  contact: ""
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

    const subject = `[Bug Report] ${formData.title.trim() || "Litrainer issue"}`;
    const body = [
      `Title: ${formData.title.trim() || "N/A"}`,
      "",
      "Steps to reproduce:",
      formData.steps.trim() || "N/A",
      "",
      "Expected behavior:",
      formData.expected.trim() || "N/A",
      "",
      "Actual behavior:",
      formData.actual.trim() || "N/A",
      "",
      `Contact (optional): ${formData.contact.trim() || "N/A"}`
    ].join("\n");

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
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-[var(--color-fg)]">Report a bug</p>
            <p className="text-xs text-[var(--color-muted)]">Your report is sent to the creator by email.</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-md border border-[var(--color-border)] p-1 text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-hover)] transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="grid gap-3 px-4 py-3">
          <label className="grid gap-1">
            <span className="text-xs text-[var(--color-muted)]">Bug title</span>
            <input
              required
              value={formData.title}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="Short summary"
              className="h-9 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-muted)] outline-none"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs text-[var(--color-muted)]">Steps to reproduce</span>
            <textarea
              required
              rows={3}
              value={formData.steps}
              onChange={(event) => updateField("steps", event.target.value)}
              placeholder="1) ... 2) ..."
              className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-2 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-muted)] outline-none"
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="grid gap-1">
              <span className="text-xs text-[var(--color-muted)]">Expected</span>
              <textarea
                rows={3}
                value={formData.expected}
                onChange={(event) => updateField("expected", event.target.value)}
                className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-2 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-muted)] outline-none"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-xs text-[var(--color-muted)]">Actual</span>
              <textarea
                rows={3}
                value={formData.actual}
                onChange={(event) => updateField("actual", event.target.value)}
                className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-2 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-muted)] outline-none"
              />
            </label>
          </div>

          <label className="grid gap-1">
            <span className="text-xs text-[var(--color-muted)]">Your contact (optional)</span>
            <input
              value={formData.contact}
              onChange={(event) => updateField("contact", event.target.value)}
              placeholder="Email or Lichess username"
              className="h-9 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-muted)] outline-none"
            />
          </label>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-[var(--color-border)] px-4 py-3">
          <button
            type="button"
            onClick={handleClose}
            className="px-3 py-1.5 rounded-md border border-[var(--color-border)] text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1.5 rounded-md border border-[var(--color-border)] text-sm text-[var(--color-fg)] bg-[var(--color-surface-hover)] hover:bg-[var(--color-surface-strong)] transition-colors"
          >
            Send report
          </button>
        </div>
      </form>
    </div>
  );
};

export default BugReportForm;
