 function PieChart({sectors,colorLine}) {
     const listValues=sectors.map((sector)=>{
        return {value:sector.value,color:`#${(Math.random().toString(16) + '000000').substring(2, 8).toUpperCase()}`}
     })
     const ListSectors=listValues.map((value)=>{
        return(
           <div className='df'>
              <svg width='60' height='60'><circle cx='30' cy='30' r="30" stroke="black" stroke-width="3" fill={value.color} /></svg>
              <p>{value.value}</p>
           </div>
        )}
     ) 
    const pie=sectors.map((sector,index)=>
    { 
     const {x1,x2,y1,y2,flag,radius,bisector,value} = sector;
    return (
    <><path className='pieChart_sector'
    fill={listValues[index].color} stroke={colorLine} stroke-width="3" 
    d={`m${x1+20},${y1+20} 
    A${radius},${radius} 0 ${flag},1 ${x2+20},${y2+20} 
    L${radius+20},${radius+20} ${x1+20},${y1+20}`}
    onClick={(e)=>{e.target.style.transform=`translate(${(bisector.x/8-radius/8)}px,${(bisector.y/8-radius/8)}px)`}} />
    <circle cx={bisector.x+20} cy={bisector.y+20} r="6" stroke="black" stroke-width="3" fill="red" /></> 
    
    )
    })
   return (
   <>
      <svg className='pieChart' height={2*sectors[0].radius*1.25} width={2*sectors[0].radius*1.25} >
      {pie}
      </svg>
      <div className='df'>
      {ListSectors}
   </div></>
   )
}
export default PieChart;