import { useFormContext, Controller } from "react-hook-form";

type TextFieldCustomProps = {
    label: string,
    name: string,
}

export const TextFieldCustom: React.FC<TextFieldCustomProps> = ({label, name}) => {

    const { control } = useFormContext();

    return (
        <Controller // wraps controlled inputs
            name={name}
            control={control} // manager for controlled inputs
            render={({field, fieldState}) => (
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                    
                    <input 
                        {...field}
                        className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 
                            ${fieldState.error 
                                ? "border-red-500 focus:ring-red-400" : 
                                "border-gray-300 focus:ring-blue-400"
                            }`
                        }
                    />

                    {fieldState.error && (
                        <span className="text-xs text-red-500 mt-1">
                            {fieldState.error.message}
                        </span>
                    )}
                </div>
            )}
        />
    );
}