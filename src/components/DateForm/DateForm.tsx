import defaultValue from '@uth/constants/defaultValue'
import { range } from 'lodash'
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";


interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function DateForm({value, onChange, errorMessage}: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 2000
  })
 
  useEffect(() => {
     if (value) {
      setDate({
        date: value?.getDate(),
        month: value?.getMonth(),
        year: value?.getFullYear(),
      })
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {value: valueForm, name} = event.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueForm)
    }
    setDate(newDate)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className="mt-8 flex flex-wrap flex-col sm:flex-row">
      <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">
        Birthday
      </div>
      <div className="sm:w-[80%] sm:pl-5">
        <motion.div
          className="flex justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Day Selector */}
          <motion.select
            value={value?.getDate() || date.date}
            onChange={handleChange}
            name="date"
            className="h-10 bg-gray-50 hover:bg-gray-100 cursor-pointer w-[32%] text-center max-w-32 rounded-lg border border-gray-300 px-4 md:px-0 lg:px-4 text-gray-700 outline-none focus:ring-2 focus:ring-orange-500"
            whileHover={{ scale: 1.02 }}
            whileFocus={{ scale: 1.03 }}
          >
            <option disabled>Day</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </motion.select>

          {/* Month Selector */}
          <motion.select
            value={value?.getMonth() || date.month}
            onChange={handleChange}
            name="month"
            className="h-10 bg-gray-50 hover:bg-gray-100 cursor-pointer w-[32%] px-4 md:px-0 lg:px-4 rounded-lg border border-gray-300 px-4 text-gray-700 outline-none focus:ring-2 focus:ring-orange-500"
            whileHover={{ scale: 1.02 }}
            whileFocus={{ scale: 1.03 }}
          >
            <option disabled>Month</option>
            {months.map((item, index) => (
              <option value={index} key={index}>
                {item}
              </option>
            ))}
          </motion.select>

          {/* Year Selector */}
          <motion.select
            value={value?.getFullYear() || date.year}
            onChange={handleChange}
            name="year"
            className="h-10 bg-gray-50 hover:bg-gray-100 cursor-pointer w-[32%] px-4 md:px-0 lg:px-4 rounded-lg border border-gray-300 px-4 text-gray-700 outline-none focus:ring-2 focus:ring-orange-500"
            whileHover={{ scale: 1.02 }}
            whileFocus={{ scale: 1.03 }}
          >
            <option disabled>Year</option>
            {range(1990, new Date().getFullYear() + 1).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </motion.select>
        </motion.div>

        {/* Error Message */}
        <motion.div
          className="mt-1 text-red-600 min-h-[1.25rem] text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {errorMessage}
        </motion.div>
      </div>
    </div>
  );
}
