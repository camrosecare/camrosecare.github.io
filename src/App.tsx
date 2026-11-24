import { lazy, Suspense, useState } from 'react';
import { ConceptA_PremiumElegant } from './components/concepts/ConceptA_PremiumElegant';
import { ParentAssistantChatbot } from './components/common/ParentAssistantChatbot';

const TourModal = lazy(() =>
  import('./components/common/TourModal').then((module) => ({ default: module.TourModal }))
);

const ParentHandbookModal = lazy(() =>
  import('./components/philosophy/ParentHandbookModal').then((module) => ({
    default: module.ParentHandbookModal
  }))
);

export default function App() {
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [isHandbookModalOpen, setIsHandbookModalOpen] = useState(false);

  const handleOpenTour = (programId?: string) => {
    const inquiryForm = typeof document !== 'undefined'
      ? document.getElementById('tour-inquiry-form')
      : null;

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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 w-full">
        <ConceptA_PremiumElegant
          onOpenTour={handleOpenTour}
          onOpenSubsidy={() => {}}
        />
      </main>

      <ParentAssistantChatbot
        onOpenTour={() => handleOpenTour()}
        onOpenSubsidy={() => {}}
        onOpenHandbook={() => setIsHandbookModalOpen(true)}
      />

      <Suspense fallback={null}>
        {isTourModalOpen && (
          <TourModal
            isOpen={isTourModalOpen}
            onClose={() => setIsTourModalOpen(false)}
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
            onOpenSubsidy={() => {}}
          />
        )}
      </Suspense>
    </div>
  );
}
