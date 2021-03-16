export default class Sectors {
   constructor(values = [], radius, displacement) {
      this.values = values;
      this.valuesSum = this.values.reduce((accumulator, a) => accumulator + a, 0);
      this.sectors = [];
      this.radius = radius;
      this.displacement = displacement;
      this.createSectors();

   }
   createSectors() {
      let x = 2 * this.radius,
         y = this.radius,
         valuesum = 0,
         bisector = 0,
         displacement = {};


      this.sectors = this.values.map((value) => {
         valuesum = valuesum + value;
         const sector = this.getCoordinatesSector(x, y, valuesum);
         bisector = { x: (x + sector.x2) / 2, y: (y + sector.y2) / 2, flag: (x + sector.x2) / 2 - this.radius <= 0 ? -1 : 1 }
         x = sector.x2;
         y = sector.y2;
         displacement = quadratic({ value: this.displacement }, 0, 0, bisector.x - this.radius, bisector.y - this.radius);

         return { ...sector, flag: value <= this.valuesSum / 2 ? 0 : 1, radius: this.radius, bisector, value, displacement };
      })
   }
   getCoordinatesSector(x1 = 0, y1 = 0, value) {
      const angle = value / this.valuesSum * 2 * Math.PI;
      const x2 = this.radius + this.radius * Math.cos(angle)
      const y2 = this.radius + this.radius * Math.sin(angle)
      return { x1: x1, y1: y1, x2: x2, y2: y2 }
   }
   getSectors() {
      return this.sectors;
   }
}

function coordinateCoefficient(x1, x2, y1, y2) {
   return (x1 - x2) / (y1 - y2)
}
function quadratic(displacement = { value: 40 }, x1, y1, x2, y2) {
   const coefficient = coordinateCoefficient(x1, x2, y1, y2);
   const a = 1 + 1 / (coefficient ** 2),
      b = -(2 * x1 * coefficient + 2 * y1) / coefficient,
      c = x1 ** 2 + y1 ** 2 - displacement.value ** 2;
   displacement.x = quadraticRoots(a, b, c);
   displacement.y = { y1: displacement.x.x1 / coefficient, y2: displacement.x.x1 / coefficient }
   return displacement;
}
function quadraticRoots(a, b, c) {
   const d = Math.abs(b ** 2 - 4 * a * c),
      x1 = (-b + Math.sqrt(d)) / (2 * a),
      x2 = (-b - Math.sqrt(d)) / (2 * a)

   return { x1: x1, x2: x2 }
}
