import { forwardRef, type SelectHTMLAttributes } from 'react'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
}

const Select = forwardRef<HTMLSelectElement, Props>(({ label, className = '', children, ...rest }, ref) => {
  return (
    <div>
      {label && <label className="label">{label}</label>}
      <select ref={ref} className={`input cursor-pointer ${className}`} {...rest}>
        {children}
      </select>
    </div>
  )
})
Select.displayName = 'Select'

export default Select
