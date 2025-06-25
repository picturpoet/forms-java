import React from 'react';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  formPdf: File | null;
  supportingFiles: File[];
  onFormPdfChange: (file: File | null) => void;
  onSupportingFilesChange: (files: File[]) => void;
}

export function FileUpload({
  formPdf,
  supportingFiles,
  onFormPdfChange,
  onSupportingFilesChange
}: FileUploadProps) {
  const handleFormPdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 10_000_000) {
      alert('File too large. Please upload a smaller PDF (max 10MB).');
      return;
    }
    onFormPdfChange(file);
  };

  const handleSupportingFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onSupportingFilesChange([...supportingFiles, ...files]);
  };

  const removeSupportingFile = (index: number) => {
    const newFiles = supportingFiles.filter((_, i) => i !== index);
    onSupportingFilesChange(newFiles);
  };

  return (
    <div className="space-y-8">
      {/* Form APR Upload */}
      <div>
        <label className="block text-sm font-semibold text-text mb-3">
          Form APR (Required)
        </label>
        <div className="border-2 border-dashed border-grey/30 rounded-2xl p-8 text-center hover:border-brand-dark/50 transition-all duration-200 bg-gradient-to-br from-brand-light/20 to-transparent file-upload-area">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFormPdfChange}
            className="hidden"
            id="form-pdf-upload"
          />
          <label htmlFor="form-pdf-upload" className="cursor-pointer block">
            {formPdf ? (
              <div className="flex items-center justify-center gap-3 text-brand-dark">
                <div className="w-12 h-12 bg-brand-dark rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <p className="font-semibold">{formPdf.name}</p>
                  <p className="text-sm text-text-light">
                    {(formPdf.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8 text-brand-dark" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-text font-medium mb-1">
                    Click to upload Form APR (PDF)
                  </p>
                  <p className="text-sm text-text-light">Max 10MB</p>
                </div>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Supporting Documents Upload */}
      <div>
        <label className="block text-sm font-semibold text-text mb-3">
          Supporting Documents (Optional)
        </label>
        <div className="border-2 border-dashed border-grey/30 rounded-2xl p-8 text-center hover:border-brand-dark/50 transition-all duration-200 file-upload-area">
          <input
            type="file"
            multiple
            accept=".pdf,.xlsx,.csv,.xls"
            onChange={handleSupportingFilesChange}
            className="hidden"
            id="supporting-files-upload"
          />
          <label htmlFor="supporting-files-upload" className="cursor-pointer block">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-mna-orange/20 rounded-2xl flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-mna-orange" strokeWidth={2} />
              </div>
              <div>
                <p className="text-text font-medium mb-1">
                  Click to upload supporting documents
                </p>
                <p className="text-sm text-text-light">PDF, XLSX, CSV files</p>
              </div>
            </div>
          </label>
        </div>

        {/* Supporting Files List */}
        {supportingFiles.length > 0 && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-mna-orange" strokeWidth={2} />
              <p className="text-sm font-semibold text-text">
                Uploaded Files ({supportingFiles.length})
              </p>
            </div>
            <div className="space-y-2">
              {supportingFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-brand-light/50 p-4 rounded-xl border border-brand-dark/10 group hover:bg-brand-light/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-dark rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text">{file.name}</p>
                      <p className="text-xs text-text-light">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeSupportingFile(index)}
                    className="text-grey hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" strokeWidth={2} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}