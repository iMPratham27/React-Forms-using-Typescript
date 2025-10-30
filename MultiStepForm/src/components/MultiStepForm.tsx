import { useState } from "react";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepSchema, fullSchema, type FormData } from "../schema/userSchema";

const defaultValues: FormData = {
  firstName: "",
  lastName: "",
  address: "",
  job: "",
};

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <Step1 />;
    case 1:
      return <Step2 />;
    case 2:
      return <Step3 />;
    default:
      return <div>Unknown step</div>;
  }
}

export default function MultiStepForm() {
  const [activeStep, setActiveStep] = useState(0);

  // use full schema for typing
  const methods = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    defaultValues,
    mode: "onChange",
  });

  const { handleSubmit, trigger, reset } = methods;

  const handleNext = async () => {
    // only validate fields of the current step
    const stepFields = Object.keys(stepSchema[activeStep].shape) as (keyof FormData)[];
    const valid = await trigger(stepFields);
    if (valid) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleReset = () => {
    setActiveStep(0);
    reset(defaultValues);
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert(JSON.stringify(data, null, 2));
    setActiveStep((prev) => prev + 1);
  };

  return (
    <div className="w-full">
      {/* Stepper */}
      <div className="flex mb-4 gap-2">
        {["Step 1", "Step 2", "Step 3"].map((label, idx) => (
          <div
            key={label}
            className={`flex-1 text-center py-2 rounded-lg text-sm font-medium 
              ${
                idx === activeStep
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
          >
            {label}
          </div>
        ))}
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Last Page */}
          {activeStep === stepSchema.length ? (
            <div className="flex flex-col items-center">
              <p className="text-green-600 font-medium mb-4">
                🎉 Form submitted successfully!
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Reset
              </button>
            </div>
          ) : (
            <>
              {/* Form contents */}
              {getStepContent(activeStep)}

              {/* Buttons */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={`px-4 py-2 rounded-lg ${
                    activeStep === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  Back
                </button>

                {activeStep === stepSchema.length - 1 ? (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Next
                  </button>
                )}
              </div>
            </>
          )}
        </form>
      </FormProvider>
    </div>
  );
}
