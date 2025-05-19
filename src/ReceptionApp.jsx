// ReceptionApp.jsx
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const intakeQuestions = [
  {
    id: 1,
    question: "What type of project are you building?",
    options: [
      "Tool / Utility",
      "Game",
      "Explorer / Mapper",
      "Narrative / Symbolic Space",
      "Marketplace",
      "Educational App",
      "Social Platform",
      "Other"
    ]
  },
  {
    id: 2,
    question: "What is the core function of your app?",
    options: [
      "Perform a task",
      "Search or discover",
      "Create or modify content",
      "Deliver experience",
      "Analyze or measure",
      "Other"
    ]
  },
  {
    id: 3,
    question: "What inputs does your app use?",
    options: ["Text", "Audio", "Video", "File Upload", "User Interaction", "AI Prompt", "Other"]
  }
];

const ReceptionApp = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [agreed, setAgreed] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
    setStep(step + 1);
  };

  const confirmAgreement = () => {
    setAgreed(true);
  };

  const completePrompt = (index) => {
    if (!completedSteps.includes(index)) {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  const renderStatusBar = () => {
    return (
      <div className="flex gap-1 my-4">
        {Array.from({ length: intakeQuestions.length }, (_, i) => (
          <div
            key={i}
            className={`w-8 h-3 rounded ${
              completedSteps.includes(i)
                ? "bg-green-500"
                : i === step && agreed
                ? "bg-yellow-400"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Reception Intake</h1>
      {!agreed ? (
        <div>
          {step < intakeQuestions.length ? (
            <Card className="mb-4">
              <CardContent>
                <p className="font-semibold mb-2">
                  {intakeQuestions[step].question}
                </p>
                {intakeQuestions[step].options.map((opt, i) => (
                  <Button
                    key={i}
                    className="block w-full text-left mb-1"
                    onClick={() => handleAnswer(intakeQuestions[step].id, opt)}
                  >
                    {opt}
                  </Button>
                ))}
              </CardContent>
            </Card>
          ) : (
            <div>
              <h2 className="text-lg font-semibold mb-2">Summary:</h2>
              <ul className="mb-4">
                {Object.entries(answers).map(([qId, ans]) => (
                  <li key={qId}>Q{qId}: {ans}</li>
                ))}
              </ul>
              <Button onClick={confirmAgreement}>Yes. That is the item in question.</Button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-2">Prompt Execution</h2>
          {renderStatusBar()}
          {intakeQuestions.map((q, i) => (
            <Card key={i} className="mb-3">
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Prompt {i + 1}</p>
                    <p className="text-sm">Build task based on: "{answers[q.id]}"</p>
                  </div>
                  <Button onClick={() => completePrompt(i)} disabled={completedSteps.includes(i)}>
                    Mark Complete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {completedSteps.length === intakeQuestions.length && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Final Questions</h3>
              <p>Is this the app you envisioned?</p>
              <p>Are there any improvements you can imagine?</p>
              <Button className="mt-2">Export Blueprint</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReceptionApp;
