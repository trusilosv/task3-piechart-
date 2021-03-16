import Sectors from '../sectors'
export default function PieChart({ values = [1, 2], radius = 120, strokeWidth = 3, stroke = 'black', sectorsColors = ['red', 'green', 'Blue', 'Yellow'] }) {
   const sectors = new Sectors(values, radius);
   const pie = sectors.sectors.map((sector, index) => {
      const { x1, x2, y1, y2, largeArcFlag } = sector;
      return (
         <><path key={index} className='pieChart_sector'
            fill={sectorsColors[index] ? sectorsColors[index] : `#${(Math.random().toString(16) + '000000').substring(2, 8).toUpperCase()}`}
            strokeWidth={strokeWidth}
            stroke={stroke}
            d={`m${x1},${y1} 
            A${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2}
            L${radius},${radius} ${x1},${y1}`} />
         </>
      )
   })
   return (
      <svg className='pieChart' width={2 * radius} height={2 * radius} >
         {pie}
      </svg>
   )
}
