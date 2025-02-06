import React from 'react'
import { Label, Radio } from "flowbite-react";


const FilterCards = () => {
  const filterData = [
    {
      filterType: "Location",
      array: ["Delhi", "Chandigarh", "Pune", "Bangalore", "Mumbai"]
    },
    {
      filterType: "Industry",
      array: ["FrontEnd Developer", "Backend Developer", "FullStack Developer",]
    },
    {
      filterType: "Salary",
      array: ["0-40K", "42-1lakh", "1lakh to 5lakh",]
    },
  ]


  return (
    <div className='p-3 w-full rounded-md'>
      <h1 className='text-lg font-extrabold'>Filter Jobs</h1>
      <hr className='mt-3 mb-3' />
      <div>
        {filterData.map((items, index) => (
          <fieldset key={index} className="flex max-w-md flex-col  p-1">
            <legend className="font-bold mb-1  text-lg underline pb-1">{items.filterType} : </legend>
            {items.array.map((points, index) => (
              <div key={index} className='flex items-center space-x-2 my-2 '>
                <Radio id={points} name="countries" value="USA" defaultChecked />
                <Label htmlFor={points}  className='text-gray-300 cursor-pointer'>{points}</Label>
              </div>
            ))}
          </fieldset>
        ))}
        <div className="flex items-center gap-2">
        </div>
      </div>
    </div >
  )
}

export default FilterCards
