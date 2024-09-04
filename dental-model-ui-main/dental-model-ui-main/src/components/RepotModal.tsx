import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { useState } from "react";
import CustomOption from "./CustomOption";

type PredictionTypes = {
  x: number;
  y: number;
  width: number;
  height: number;
  teeth_number: number;
};

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  closeModal: () => void;
  prediction: PredictionTypes;
  findings: string[];
  recommendations: string[];
};

const predefinedFindings = [
  "Bone loss",
  "Bone resection",
  "Condylar shape changes",
  "Condylar size changes",
  "Error",
  "Idiopathic Condylar Resorption of TMJ",
  "Lesion not in contact with tooth",
  "Mucous Retention Cyst",
  "Odontogenic cutaneous fistula",
  "Other",
  "Pathological Fractures",
  "Periodontitis",
  "Retained tooth",
  "Sinusitis",
  "Supernumerary tooth",
  "TMJ Disc Displacements",
  "Nothing",
];

const predefinedRecommendations = [
  "Bridge",
  "Chemical treatment",
  "Extraction",
  "Leave alone and Monitor",
  "Oral hygiene",
  "Orthodontic treatment",
  "Periodontal treatment",
  "Scaling",
  "Surgical treatment",
  "No Treatment",
];

const ReportModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  closeModal,
  prediction,
  findings,
  recommendations,
}) => {
  const [currentFindings, setCurrentFindings] = useState(findings);
  const [currentRecommendations, setCurrentRecommendations] =
    useState(recommendations);

  const handleAddFinding = (finding: string) => {
    if (!currentFindings.includes(finding)) {
      setCurrentFindings([...currentFindings, finding]);
    }
  };

  const handleAddRecommendation = (recommendation: string) => {
    if (!currentRecommendations.includes(recommendation)) {
      setCurrentRecommendations([...currentRecommendations, recommendation]);
    }
  };

  function close() {
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-hidden"
        onClose={close}
      >
        <div className="flex h-full">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="transform transition ease-in-out duration-300"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="w-full max-w-md h-full bg-[#17161680] shadow-xl fixed left-0 top-0">
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-white p-3"
                >
                  Patient Teeth Number: {prediction.teeth_number}
                </DialogTitle>
                <div className="p-4 h-full overflow-y-auto">
                  <div className="mt-4">
                    <h4 className="text-md font-medium text-white">
                      Add Findings
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {predefinedFindings.map((finding, index) => (
                        <CustomOption
                          key={index}
                          text={finding}
                          onClick={() => handleAddFinding(finding)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-md font-medium text-white">
                      Add Recommendations
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {predefinedRecommendations.map(
                        (recommendation, index) => (
                          <CustomOption
                            key={index}
                            text={recommendation}
                            onClick={() =>
                              handleAddRecommendation(recommendation)
                            }
                          />
                        ),
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ReportModal;
