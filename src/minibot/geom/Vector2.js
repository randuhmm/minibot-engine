

class Vector2
/** @lends geom.Vector2# */
{

  // x: 0,
  // y: 0,

  /**
   * Description of constructor.
   * @class Short description of class.
   * Long Description of class.
   * @constructs
   */
  constructor(x, y)
  {
    this.x = x || 0;
    this.y = y || 0;
  }

  reset(x, y)
  {
    this.x = x;
    this.y = y;
    return this;
  }

  toString(decPlaces)
  {
    decPlaces = decPlaces || 3;
    var scalar = Math.pow(10,decPlaces);
    return "[" + Math.round (this.x * scalar) / scalar + ", " + Math.round (this.y * scalar) / scalar + "]";
  }

  clone()
  {
    return new Vector2(this.x, this.y);
  }

  copyTo(v)
  {
    v.x = this.x;
    v.y = this.y;
  }

  copyFrom(v) {
    this.x = v.x;
    this.y = v.y;
  }

  magnitude() {
    return Math.sqrt((this.x*this.x)+(this.y*this.y));
  }

  magnitudeSquared() {
    return (this.x*this.x)+(this.y*this.y);
  }

  normalise() {
    return this.normailize();
  }

  normalize() {

    var m = this.magnitude();
    if(m == 0) return this;

    this.x = this.x/m;
    this.y = this.y/m;

    return this;
  }

  reverse() {
    this.x = -this.x;
    this.y = -this.y;

    return this;
  }

  plusEq(v) {
    this.x+=v.x;
    this.y+=v.y;

    return this;
  }

  plusNew(v) {
    return new Vector2(this.x+v.x, this.y+v.y);
  }

  minusEq(v) {
    this.x-=v.x;
    this.y-=v.y;

    return this;
  }

  minusNew(v) {
    return new Vector2(this.x-v.x, this.y-v.y);
  }

  multiplyEq(scalar) {
    this.x*=scalar;
    this.y*=scalar;

    return this;
  }

  multiplyNew(scalar) {
    var returnvec = this.clone();
    return returnvec.multiplyEq(scalar);
  }

  divideEq(scalar) {
    this.x/=scalar;
    this.y/=scalar;
    return this;
  }

  divideNew(scalar) {
    var returnvec = this.clone();
    return returnvec.divideEq(scalar);
  }

  dot(v) {
    return (this.x * v.x) + (this.y * v.y) ;
  }

  angle(useRadians) {
    return Math.atan2(this.y,this.x) * (useRadians ? 1 : Vector2.TO_DEGREES);
  }

  rotate(angle, useRadians) {
    var cosRY = Math.cos(angle * (useRadians ? 1 : Vector2.TO_RADIANS));
    var sinRY = Math.sin(angle * (useRadians ? 1 : Vector2.TO_RADIANS));

    Vector2.temp.copyFrom(this);

    this.x= (Vector2.temp.x*cosRY)-(Vector2.temp.y*sinRY);
    this.y= (Vector2.temp.x*sinRY)+(Vector2.temp.y*cosRY);

    return this;
  }

  equals(v) {
    return((this.x==v.x)&&(this.y==v.x));
  }

  isCloseTo(v, tolerance) {
    if(this.equals(v)) return true;

    Vector2.temp.copyFrom(this);
    Vector2.temp.minusEq(v);

    return(Vector2.temp.magnitudeSquared() < tolerance*tolerance);
  }

  rotateAroundPoint(point, angle, useRadians) {
    Vector2.temp.copyFrom(this);
    //trace("rotate around point "+t+" "+point+" " +angle);
    Vector2.temp.minusEq(point);
    //trace("after subtract "+t);
    Vector2.temp.rotate(angle, useRadians);
    //trace("after rotate "+t);
    Vector2.temp.plusEq(point);
    //trace("after add "+t);
    this.copyFrom(Vector2.temp);

  }

  isMagLessThan(distance) {
    return(this.magnitudeSquared()<distance*distance);
  }

  isMagGreaterThan(distance) {
    return(this.magnitudeSquared()>distance*distance);
  }


  // still AS3 to convert :
  // public function projectOnto(v:Vector2) : Vector2
  // {
  // var dp:Number = dot(v);
  //
  // var f:Number = dp / ( v.x*v.x + v.y*v.y );
  //
  // return new Vector2( f*v.x , f*v.y);
  // }
  //
  //
  // public function convertToNormal():void
  // {
  // var tempx:Number = x;
  // x = -y;
  // y = tempx;
  //
  //
  // }
  // public function getNormal():Vector2
  // {
  //
  // return new Vector2(-y,x);
  //
  // }
  //
  //
  //
  // public function getClosestPointOnLine ( vectorposition : Point, targetpoint : Point ) : Point
  // {
  // var m1 : Number = y / x ;
  // var m2 : Number = x / -y ;
  //
  // var b1 : Number = vectorposition.y - ( m1 * vectorposition.x ) ;
  // var b2 : Number = targetpoint.y - ( m2 * targetpoint.x ) ;
  //
  // var cx : Number = ( b2 - b1 ) / ( m1 - m2 ) ;
  // var cy : Number = m1 * cx + b1 ;
  //
  // return new Point ( cx, cy ) ;
  // }
  //

}

Vector2.TO_DEGREES = 180 / Math.PI;
Vector2.TO_RADIANS = Math.PI / 180;
Vector2.temp = new Vector2();

export default Vector2

