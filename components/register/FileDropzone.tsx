"use client";

import { useState, useRef, useEffect, DragEvent, ChangeEvent } from "react";

interface FileDropzoneProps {
  accept: string;
  maxSizeBytes: number;
  label: string;
  helperText: string;
  isPdf?: boolean;
  valueUrl?: string;
  valueFileName?: string;
  onChange: (fileUrl: string, fileName: string) => void;
  onRemove: () => void;
  error?: string;
}

export function FileDropzone({
  accept,
  maxSizeBytes,
  label,
  helperText,
  isPdf = false,
  valueUrl,
  valueFileName,
  onChange,
  onRemove,
  error,
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (objectUrlRef.current && objectUrlRef.current.startsWith("blob:")) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const validateAndProcess = (file: File) => {
    setLocalError(null);

    // Size validation
    if (file.size > maxSizeBytes) {
      const maxMb = Math.round(maxSizeBytes / (1024 * 1024));
      setLocalError(`File size must be under ${maxMb}MB.`);
      return;
    }

    // Type validation
    if (isPdf && file.type !== "application/pdf") {
      setLocalError("Only PDF documents are accepted.");
      return;
    }

    if (
      !isPdf &&
      !["image/jpeg", "image/png", "image/webp"].includes(file.type)
    ) {
      setLocalError("Only JPG, PNG, or WebP images are accepted.");
      return;
    }

    // Revoke previous blob if any
    if (objectUrlRef.current && objectUrlRef.current.startsWith("blob:")) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const newUrl = URL.createObjectURL(file);
    objectUrlRef.current = newUrl;
    onChange(newUrl, file.name);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcess(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-[var(--ink)]">{label}</span>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInput}
        className="hidden"
        aria-label={label}
      />

      {valueUrl ? (
        // Preview State
        <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {!isPdf ? (
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[var(--surface-2)] border border-[var(--line)] flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={valueUrl}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            )}

            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-[var(--ink)] truncate max-w-[220px] sm:max-w-xs">
                {valueFileName || (isPdf ? "Biodata.pdf" : "Profile Photo")}
              </span>
              <span className="text-xs text-[var(--success)] font-medium">
                Ready for submission
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-[var(--ink)] hover:text-[var(--accent)] font-medium px-3 py-1.5 rounded border border-[var(--line)] hover:border-[var(--ink-muted)] transition-colors"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => {
                if (
                  objectUrlRef.current &&
                  objectUrlRef.current.startsWith("blob:")
                ) {
                  URL.revokeObjectURL(objectUrlRef.current);
                }
                objectUrlRef.current = null;
                onRemove();
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="text-xs text-[var(--danger)] hover:bg-[#FCE8E8] font-medium px-3 py-1.5 rounded transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        // Dropzone State
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-[var(--radius-card)] p-8 text-center cursor-pointer transition-colors duration-200 flex flex-col items-center justify-center gap-2 ${
            isDragging
              ? "border-[var(--accent)] bg-[var(--accent-soft)]/30"
              : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--ink-muted)]"
          }`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
        >
          <div className="w-10 h-10 rounded-full bg-[var(--surface-2)] flex items-center justify-center text-[var(--ink-muted)] mb-1">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </div>

          <span className="text-sm font-medium text-[var(--ink)]">
            Click to upload <span className="text-[var(--ink-muted)]">or drag and drop</span>
          </span>
          <span className="text-xs text-[var(--ink-muted)]">{helperText}</span>
        </div>
      )}

      {(localError || error) && (
        <span className="text-xs text-[var(--danger)] mt-0.5">
          {localError || error}
        </span>
      )}
    </div>
  );
}
