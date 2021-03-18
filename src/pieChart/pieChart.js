import Sectors from '../sectors'
import React, { useRef, useState } from 'react'
import './pie-chart.scss'

export default function PieChart({
   values = [1, 2],
   radius = 80,
   strokeWidth = 3,
   stroke = 'black',
   sectorsColors = ['red', 'green', 'Blue', 'Yellow'] }) {

   const [PieSectors, setPieSectors] = useState(new Sectors(values, radius));
   const pieChartText = useRef(null);
   const pieChartRange = useRef(null);

   const onChange = () => {
      if (toArray(pieChartText.current.value).length !== 0) {
         pieChartRange.current.disabled = false;
         setPieSectors(new Sectors(toArray(pieChartText.current.value), +pieChartRange.current.value));
      } else pieChartRange.current.disabled = true;
   }

   const rndColor = () => `#${(Math.random().toString(16) + '000000').substring(2, 8).toUpperCase()}`;
   const toArray = (string) => {
      return string.split(',').map(item => +item).filter(item => Number.isInteger(item) && item);
   }
   const pie = PieSectors.sectors.map((sector, index, sectors) => {
      const { x1, x2, y1, y2, largeArcFlag, radius } = sector;
      if (sectors.length <= 1)
         return <circle key={index} fill={sectorsColors[0]}
            strokeWidth={strokeWidth}
            stroke={stroke}
            r={radius} cx={radius + strokeWidth} cy={radius + strokeWidth} />
      else
         return (

            <path key={index} className='pieChart_sector'
               fill={sectorsColors[index] || rndColor()}
               strokeWidth={strokeWidth}
               stroke={stroke}
               d={`m${x1 + strokeWidth},${y1 + strokeWidth} 
               A${radius},${radius} 0 ${largeArcFlag},1 ${x2 + strokeWidth},${y2 + strokeWidth}
               L${radius + strokeWidth},${radius + strokeWidth} ${x1 + strokeWidth},${y1 + strokeWidth}`
               }
            />
         )
   })


   return (
      <div className='PieChart' key='PieChart'>
         <input
            className='PieChart__input-text'
            type='text'
            ref={pieChartText}
            required placeholder='Array value'
            onChange={onChange}
         >
         </input>
         <input className='PieChart__input-range'
            disabled={true}
            ref={pieChartRange}
            type='range' min='80'
            max='350' placeholder='Radius'
            onChange={onChange}
         >
         </input>
         <svg className='pieChart'
            width={2 * (PieSectors.sectors[0].radius + strokeWidth)}
            height={2 * (PieSectors.sectors[0].radius + strokeWidth)}
         >
            {pie}
         </svg>
      </div>
   )
}
