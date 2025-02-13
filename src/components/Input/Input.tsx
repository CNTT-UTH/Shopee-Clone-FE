import { LegacyRef } from "react"
import type { UseFormRegister, RegisterOptions } from "react-hook-form"
interface Props {
    type?: React.HTMLInputTypeAttribute,
    errorMessage?: string
    placeholder?: string
    className?: string
    classNameInput?: string
    name: string
    register: UseFormRegister<any>
    refProp?: LegacyRef<HTMLInputElement> | null
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    onFocus?: React.FocusEventHandler<HTMLInputElement>
    Rules?: RegisterOptions
}
export default function Input({refProp, type, errorMessage, placeholder, className = "mt-6", name, register, Rules, classNameInput = "outline-none border-2 rounded-md focus:border-gray-500 border-gray-300 w-full p-3 focus:shadow-md", ...rest}: Props) {
  return (
    <div className={className}> 
        <input 
        {...register(name, Rules)}
        type={type}
        placeholder={placeholder}
        className={classNameInput}
        ref={refProp}
        {...rest}
        />
        <div className="text-red-500 text-sm ml-2 mt-1 min-h-[14px]">{errorMessage}</div>
    </div>
  )
}