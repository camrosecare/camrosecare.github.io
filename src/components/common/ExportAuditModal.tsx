import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  FileCode,
  Archive,
  FileText,
  AlertTriangle,
  ShieldCheck,
  Eye
} from 'lucide-react';

interface ExportAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportAuditModal: React.FC<ExportAuditModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'download' | 'copy' | 'preview'>('download');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [htmlCode, setHtmlCode] = useState<string>('');
  const [auditMarkdown, setAuditMarkdown] = useState<string>('');
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetch('/index.html')
        .then((res) => res.text())
        .then((text) => {
          if (!text.includes('Cookie check') && text.includes('<!doctype html>')) {
            setHtmlCode(text);
          }
        })
        .catch(() => {});

      fetch('/CONCEPT_A_COMPLETE_OVERVIEW.md')
        .then((res) => res.text())
        .then((text) => {
          if (!text.includes('Cookie check')) {
            setAuditMarkdown(text);
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const triggerSafeDownload = async (url: string, filename: string, fallbackContent?: string) => {
    setDownloadStatus(`Preparing ${filename}...`);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const textOrBlob = await response.blob();

      const slice = await textOrBlob.slice(0, 1000).text();
      if (slice.includes('Cookie check') || slice.includes('ai-studio-auth')) {
        if (fallbackContent) {
          const blob = new Blob([fallbackContent], { type: 'text/plain;charset=utf-8' });
          const blobUrl = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(blobUrl);
          setDownloadStatus(`Downloaded ${filename} successfully!`);
          setTimeout(() => setDownloadStatus(null), 3000);
          return;
        }
      }

      const blobUrl = URL.createObjectURL(textOrBlob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      setDownloadStatus(`Downloaded ${filename} successfully!`);
      setTimeout(() => setDownloadStatus(null), 3000);
    } catch {
      if (fallbackContent) {
        const blob = new Blob([fallbackContent], { type: 'text/plain;charset=utf-8' });
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
        setDownloadStatus(`Downloaded ${filename} successfully!`);
      } else {
        setDownloadStatus(`Direct download initiated via browser.`);
        window.open(url, '_blank', 'noopener,noreferrer');
      }
      setTimeout(() => setDownloadStatus(null), 3000);
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Project Export &amp; Audit Hub
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> Live Source Package
              </span>
            </div>
            <h2 className="text-xl font-black text-white">
              Export Camrose Care Concept A (Current Live Build)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Download the complete current React/Vite project ZIP for VS Code &amp; GitHub, or copy the latest entry HTML and specification.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close export modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-amber-950/40 border border-amber-600/40 flex items-start gap-3 text-xs text-amber-200">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-300 block mb-0.5">
              Running the Exported Project in VS Code
            </span>
            <p className="text-amber-200/90 leading-relaxed">
              The ZIP package bundles the complete live <code className="text-amber-300">src/</code>, <code className="text-amber-300">public/</code>, <code className="text-amber-300">index.html</code>, and <code className="text-amber-300">package.json</code>. Extract it, open the folder in VS Code, and run <code className="text-amber-300">npm install &amp;&amp; npm run dev</code>.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('download')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'download'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Direct Downloads</span>
          </button>
          <button
            onClick={() => setActiveTab('copy')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'copy'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Copy className="w-4 h-4" />
            <span>One-Click Copy Specs</span>
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'preview'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Entry HTML &amp; Spec Inspector</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          {downloadStatus && (
            <div className="mb-4 p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2 animate-pulse">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{downloadStatus}</span>
            </div>
          )}

          {activeTab === 'download' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Option 1: Complete Current React/Vite Project ZIP */}
              <div className="p-5 rounded-2xl bg-slate-800/80 border border-amber-500/40 flex flex-col justify-between hover:border-amber-400 transition-all group">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                    <Archive className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    Recommended for VS Code &amp; GitHub
                  </span>
                  <h3 className="font-bold text-white text-sm mt-0.5 mb-1.5">
                    Complete Live Project ZIP
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    Bundles the current <code className="text-amber-300">src/</code>, <code className="text-amber-300">public/</code>, <code className="text-amber-300">index.html</code>, <code className="text-amber-300">package.json</code>, and <code className="text-amber-300">vite.config.ts</code> directly from the live app.
                  </p>
                </div>
                <button
                  onClick={() => triggerSafeDownload('/camrose_care_concept_a_audit_package.zip', 'camrose_care_concept_a_audit_package.zip')}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Live Project ZIP</span>
                </button>
              </div>

              {/* Option 2: Live Entry HTML */}
              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between hover:border-amber-500/50 transition-all group">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                    <FileCode className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                    Entry &amp; Schema.org
                  </span>
                  <h3 className="font-bold text-white text-sm mt-0.5 mb-1.5">
                    Live Entry HTML (index.html)
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    Clean Vite entry file with updated metadata and Schema.org structured data for 4907 47 Street, Camrose, AB, T4V 1J9.
                  </p>
                </div>
                <button
                  onClick={() => triggerSafeDownload('/index.html', 'index.html', htmlCode)}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download index.html</span>
                </button>
              </div>

              {/* Option 3: Written Site Overview & Spec */}
              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between hover:border-amber-500/50 transition-all group">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Documentation
                  </span>
                  <h3 className="font-bold text-white text-sm mt-0.5 mb-1.5">
                    Complete Overview &amp; Spec
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    Markdown overview covering programs, hours, $50/month school bus service, address, nutrition menus, and grant resources.
                  </p>
                </div>
                <button
                  onClick={() => triggerSafeDownload('/CONCEPT_A_COMPLETE_OVERVIEW.md', 'CONCEPT_A_COMPLETE_OVERVIEW.md', auditMarkdown)}
                  className="w-full py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Overview (.md)</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'copy' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-white text-sm">Copy Live Entry HTML (index.html)</h4>
                  <p className="text-xs text-slate-400">
                    Copies the live root index.html entry file with updated Schema.org metadata.
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(htmlCode, 'html')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all active:scale-95 whitespace-nowrap"
                >
                  {copiedType === 'html' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedType === 'html' ? 'Copied index.html!' : 'Copy index.html'}</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-white text-sm">Copy Complete Written Audit &amp; Specification (Markdown)</h4>
                  <p className="text-xs text-slate-400">
                    Copies all program ratios, 6am–6:30pm schedules, weekly Canada Food Guide menus, $50/month school bus details, and UX specs.
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(auditMarkdown, 'md')}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all active:scale-95 whitespace-nowrap"
                >
                  {copiedType === 'md' ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedType === 'md' ? 'Copied Audit Guide!' : 'Copy Audit Markdown'}</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Live Entry HTML Inspector (index.html)</span>
                <button
                  onClick={() => copyToClipboard(htmlCode, 'html_tab')}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedType === 'html_tab' ? 'Copied!' : 'Copy All Code'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-96">
                <code>
                  {htmlCode || 'Loading index.html preview...'}
                </code>
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span>Camrose Little Angels Daycare Society — Live Export Package</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
