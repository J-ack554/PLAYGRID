import { forwardRef, type InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Input = forwardRef<HTMLInputElement, Props>(({ label, className = '', ...rest }, ref) => {
  return (
    <div>
      {label && <label className="label">{label}</label>}
      <input ref={ref} className={`input ${className}`} {...rest} />
    </div>
  )
})
Input.displayName = 'Input'

export default Input
