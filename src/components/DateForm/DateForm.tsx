import defaultValue from '@uth/constants/defaultValue'
import { range } from 'lodash'
import React, { useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateForm({value, onChange, errorMessage}: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1980
  })

  console.log('check date',value?.getFullYear(), ' ',  )
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {value, name} = event.target
    const newDate = {
      ...date,
      [name]: value
    }
    setDate(newDate)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className="mt-6 flex flex-wrap flex-col sm:flex-row">
      <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">BirthDay</div>
      <div className="sm:w-[80%] sm:pl-5">
        <div className="flex justify-between">
          <select value={value?.getDate() || date.date} onChange={handleChange} name='date' className="h-10 bg-white hover:border-orange cursor-pointer w-[32%] rounded-sm border border-black/10 px-3">
            <option disabled>Day</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select value={value?.getMonth() || date.month} onChange={handleChange} name='month' className="h-10 w-[32%] bg-white hover:border-orange cursor-pointer rounded-sm border border-black/10 px-3">
            <option disabled>Month</option>
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select defaultValue={value?.getFullYear() || date.year} onChange={handleChange} name='year' className="h-10 w-[32%] bg-white hover:border-orange cursor-pointer rounded-sm border border-black/10 px-3">
            <option disabled>Year</option>
            {range(1980, (new Date()).getFullYear()).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-1 text-red-600 min-h-[1.25rem] text-sm">{errorMessage}</div>
    </div>

  )
}
