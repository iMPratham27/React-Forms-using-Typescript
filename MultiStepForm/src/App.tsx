import MultiStepForm from "./components/MultiStepForm"

function App() {

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-800">
          react-hook-form + Zod + Tailwind 📝
        </h4>
        <MultiStepForm />
      </div>
    </div>
  )
}

export default App
