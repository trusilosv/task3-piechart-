export default  class Sectors {
   constructor(values=[],radius)
    { 
      this.values=values;
      this.valuesSum=this.values.reduce((accumulator,a)=>accumulator+a,0);
      this.sectors=[];
      this.radius=radius;
      this.createSectors();
   }
   createSectors(){
      let x=2*this.radius,
      y=this.radius,
      valuesum=0,
      bisector=0;
   this.sectors =  this.values.map((value)=>{
      valuesum=valuesum+value;
      console.log(valuesum);
      const sector=this.getCoordinatesSector(x,y,valuesum);
      bisector={x:(x+sector.x2)/2,y:(y+sector.y2)/2}
      x=sector.x2;
      y=sector.y2;
      console.log(bisector)
      return {...sector,flag:value<=this.valuesSum/2?0:1,radius:this.radius,bisector,value};
   })
   }
   getCoordinatesSector(x1=0,y1=0,value)
   { 
      const  angle =value/this.valuesSum*2*Math.PI;      
      const x2 =this.radius+this.radius * Math.cos(angle)
      const y2 =this.radius+this.radius * Math.sin(angle)
      return {x1:x1,y1:y1,x2:x2,y2:y2}
   }
   getSectors(){
      return this.sectors;
   }
}
 
