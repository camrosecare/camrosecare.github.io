import { Suspense, lazy, useState } from 'react';
import { ConceptId } from './types/concept';
import { ShowcaseBar, ViewportMode } from './components/showcase/ShowcaseBar';
import { ConceptA_PremiumElegant } from './components/concepts/ConceptA_PremiumElegant';
import { ParentAssistantChatbot } from './components/common/ParentAssistantChatbot';

const ConceptB_PlayfulCreative = lazy(() =>
  import('./components/concepts/ConceptB_PlayfulCreative').then((m) => ({
    default: m.ConceptB_PlayfulCreative
  }))
);
const ConceptC_ModernMontessori = lazy(() =>
  import('./components/concepts/ConceptC_ModernMontessori').then((m) => ({
    default: m.ConceptC_ModernMontessori
  }))
);
const ConceptD_CreativeDigital = lazy(() =>
  import('./components/concepts/ConceptD_CreativeDigital').then((m) => ({
    default: m.ConceptD_CreativeDigital
  }))
);
const TourModal = lazy(() =>
  import('./components/common/TourModal').then((m) => ({ default: m.TourModal }))
);
const SubsidyCalculatorModal = lazy(() =>
  import('./components/common/SubsidyCalculatorModal').then((m) => ({
    default: m.SubsidyCalculatorModal
  }))
);
const ConceptComparisonModal = lazy(() =>
  import('./components/common/ConceptComparisonModal').then((m) => ({
    default: m.ConceptComparisonModal
  }))
);
const ApprovalModal = lazy(() =>
  import('./components/common/ApprovalModal').then((m) => ({ default: m.ApprovalModal }))
);
const ExportAuditModal = lazy(() =>
  import('./components/common/ExportAuditModal').then((m) => ({ default: m.ExportAuditModal }))
);
const ParentHandbookModal = lazy(() =>
  import('./components/philosophy/ParentHandbookModal').then((m) => ({
    default: m.ParentHandbookModal
  }))
);

export default function App() {
  const [activeConcept, setActiveConcept] = useState<ConceptId>('concept-a');
  const [viewport, setViewport] = useState<ViewportMode>('full');
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [isSubsidyModalOpen, setIsSubsidyModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isHandbookModalOpen, setIsHandbookModalOpen] = useState(false);

  const handleOpenTour = (programId?: string) => {
    const inquiryForm = typeof document !== 'undefined' ? document.getElementById('tour-inquiry-form') : null;
    if (inquiryForm) {
      window.dispatchEvent(
        new CustomEvent('camrose:open-tour-inquiry', {
          detail: { programId }
        })
      );
      return;
    }
    setIsTourModalOpen(true);
  };

  const handleApproveSuccess = (selectedId: ConceptId, _notes: string, _requestedPages: string[]) => {
    setActiveConcept(selectedId);
  };

  const renderActiveConcept = () => {
    const props = {
      onOpenTour: handleOpenTour,
      onOpenSubsidy: () => setIsSubsidyModalOpen(true),
      onOpenExport: () => setIsExportModalOpen(true)
    };

    switch (activeConcept) {
      case 'concept-a':
        return <ConceptA_PremiumElegant {...props} />;
      case 'concept-b':
        return (
          <Suspense fallback={<div className="min-h-screen bg-white" />}>
            <ConceptB_PlayfulCreative {...props} />
          </Suspense>
        );
      case 'concept-c':
        return (
          <Suspense fallback={<div className="min-h-screen bg-white" />}>
            <ConceptC_ModernMontessori {...props} />
          </Suspense>
        );
      case 'concept-d':
        return (
          <Suspense fallback={<div className="min-h-screen bg-white" />}>
            <ConceptD_CreativeDigital {...props} />
          </Suspense>
        );
      default:
        return <ConceptA_PremiumElegant {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Executive Showcase Toolbar */}
      <ShowcaseBar
        activeConcept={activeConcept}
        onSelectConcept={setActiveConcept}
        viewport={viewport}
        onChangeViewport={setViewport}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onOpenApproval={() => setIsApprovalModalOpen(true)}
        onOpenSubsidy={() => setIsSubsidyModalOpen(true)}
        onOpenExport={() => setIsExportModalOpen(true)}
      />

      {/* Main Preview Container with Viewport Simulation */}
      <main className="flex-1 w-full bg-slate-900 flex items-start justify-center">
        {viewport === 'full' && (
          <div className="w-full">
            {renderActiveConcept()}
          </div>
        )}

        {viewport === 'tablet' && (
          <div className="my-8 w-[768px] max-w-[95vw] bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-slate-800">
            {/* Tablet Mock Header */}
            <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-white">iPad Preview (768px)</span>
              <span>camrosecare.ca</span>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
              </div>
            </div>
            <div className="max-h-[85vh] overflow-y-auto">
              {renderActiveConcept()}
            </div>
          </div>
        )}

        {viewport === 'mobile' && (
          <div className="my-8 w-[390px] max-w-[95vw] bg-white rounded-[40px] shadow-2xl overflow-hidden border-[10px] border-slate-800">
            {/* Mobile Mock Header & Dynamic Island */}
            <div className="bg-slate-800 px-6 pt-3 pb-2 flex flex-col items-center justify-center text-[10px] text-slate-400">
              <div className="w-24 h-4 bg-black rounded-full mb-1"></div>
              <span>Mobile Safari (390px)</span>
            </div>
            <div className="max-h-[80vh] overflow-y-auto">
              {renderActiveConcept()}
            </div>
          </div>
        )}
      </main>

      {/* Fact-Based Client-Side Parent FAQ Chatbot */}
      <ParentAssistantChatbot
        onOpenTour={() => handleOpenTour()}
        onOpenSubsidy={() => setIsSubsidyModalOpen(true)}
        onOpenHandbook={() => setIsHandbookModalOpen(true)}
      />

      {/* Lazy-Loaded Modals */}
      <Suspense fallback={null}>
        {isTourModalOpen && (
          <TourModal
            isOpen={isTourModalOpen}
            onClose={() => setIsTourModalOpen(false)}
          />
        )}

        {isSubsidyModalOpen && (
          <SubsidyCalculatorModal
            isOpen={isSubsidyModalOpen}
            onClose={() => setIsSubsidyModalOpen(false)}
            onOpenTour={() => {
              setIsSubsidyModalOpen(false);
              handleOpenTour();
            }}
          />
        )}

        {isCompareModalOpen && (
          <ConceptComparisonModal
            isOpen={isCompareModalOpen}
            onClose={() => setIsCompareModalOpen(false)}
            activeConcept={activeConcept}
            onSelectConcept={setActiveConcept}
            onOpenApproval={() => {
              setIsCompareModalOpen(false);
              setIsApprovalModalOpen(true);
            }}
          />
        )}

        {isApprovalModalOpen && (
          <ApprovalModal
            isOpen={isApprovalModalOpen}
            onClose={() => setIsApprovalModalOpen(false)}
            activeConcept={activeConcept}
            onApproveSuccess={handleApproveSuccess}
          />
        )}

        {isExportModalOpen && (
          <ExportAuditModal
            isOpen={isExportModalOpen}
            onClose={() => setIsExportModalOpen(false)}
          />
        )}

        {isHandbookModalOpen && (
          <ParentHandbookModal
            isOpen={isHandbookModalOpen}
            onClose={() => setIsHandbookModalOpen(false)}
            onOpenTour={() => {
              setIsHandbookModalOpen(false);
              handleOpenTour();
            }}
            onOpenSubsidy={() => {
              setIsHandbookModalOpen(false);
              setIsSubsidyModalOpen(true);
            }}
          />
        )}
      </Suspense>
    </div>
  );
}
