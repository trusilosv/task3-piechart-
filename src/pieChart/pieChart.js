function PieChart({ sectors, colorLine }) {
   const listValues = sectors.map((sector) => {
      return { value: sector.value, color: `#${(Math.random().toString(16) + '000000').substring(2, 8).toUpperCase()}` }
   })
   const ListSectors = listValues.map((value, index) => {
      return (
         <div className='df' key={index}>
            <svg width='60' height='60'><circle cx='30' cy='30' r="30" stroke="black" strokeWidth="3" fill={value.color} /></svg>
            <p>{value.value}</p>
         </div>
      )
   }
   )
   const pie = sectors.map((sector, index) => {
      const { x1, x2, y1, y2, flag, radius, bisector, displacement } = sector;
      const motionAnimationX = (flag ? -bisector.flag * displacement.x.x1 : bisector.flag * displacement.x.x1);
      const motionAnimationY = (flag ? -bisector.flag * displacement.y.y1 : bisector.flag * displacement.y.y1);
      return (
         <><path className='pieChart_sector'
            fill={listValues[index].color} stroke={colorLine} strokeWidth="3"
            d={`m${x1 + displacement.value},${y1 + displacement.value} 
            A${radius},${radius} 0 ${flag},1 ${x2 + displacement.value},${y2 + displacement.value} 
            L${radius + displacement.value},${radius + displacement.value} ${x1 + displacement.value},${y1 + displacement.value}`}
            onClick={(e) => {
               e.target.style.transform ? e.target.style.transform = '' :
                  e.target.style.transform = `translate(${motionAnimationX}px,${motionAnimationY}px)`
            }} />
            <circle cx={bisector.x + displacement.value} cy={bisector.y + displacement.value} r="6" stroke="black" strokeWidth="3" fill="red" />
            <circle cx={motionAnimationX + displacement.value + radius} cy={motionAnimationY + displacement.value + radius} r="6" stroke="black" strokeWidth="3" fill="green" />
         </>
      )
   })
   return (
      <>
         <svg key={Math.random()} className='pieChart' height={2 * (sectors[0].radius + sectors[0].displacement.value)} width={2 * (sectors[0].radius + sectors[0].displacement.value)} >
            {pie}
         </svg>
         <div key={Math.random()} className='df'>
            {ListSectors}
         </div>
      </>
   )
}
export default PieChart;