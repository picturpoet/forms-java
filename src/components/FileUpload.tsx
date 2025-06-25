import React from 'react';
import { Upload, FileText, X } from 'lucide-react';

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
    <div className="space-y-6">
      {/* Form APR Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Form APR (Required)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFormPdfChange}
            className="hidden"
            id="form-pdf-upload"
          />
          <label htmlFor="form-pdf-upload" className="cursor-pointer">
            {formPdf ? (
              <div className="flex items-center justify-center gap-2 text-green-600">
                <FileText className="w-5 h-5" />
                <span className="text-sm font-medium">{formPdf.name}</span>
              </div>
            ) : (
              <div>
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Click to upload Form APR (PDF)
                </p>
                <p className="text-xs text-gray-400 mt-1">Max 10MB</p>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Supporting Documents Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Supporting Documents (Optional)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
          <input
            type="file"
            multiple
            accept=".pdf,.xlsx,.csv,.xls"
            onChange={handleSupportingFilesChange}
            className="hidden"
            id="supporting-files-upload"
          />
          <label htmlFor="supporting-files-upload" className="cursor-pointer">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              Click to upload supporting documents
            </p>
            <p className="text-xs text-gray-400 mt-1">PDF, XLSX, CSV files</p>
          </label>
        </div>

        {/* Supporting Files List */}
        {supportingFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-gray-700">
              Uploaded Files ({supportingFiles.length})
            </p>
            {supportingFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{file.name}</span>
                </div>
                <button
                  onClick={() => removeSupportingFile(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}