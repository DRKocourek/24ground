
const calibrationPoints = [
    //{wx: -2578, wy: -43712, mx: 2905, my: -7396}, //grindavik south RNW
    //{wx: -7200, wy: -44861, mx: 6337, my: -11908}, //Saba 07
    {wx: -45472, wy: 27487, mx:2776, my: -4102}, //Sathemptona 26
    //{wx: 25317, wy: 13274, mx: 9312, my: -5683}, //Skopelos 05
    //{wx: 22255, wy: -16485, mx:9014, my: -8906}, // Lukla 09
    //{wx: 17068, wy: 40880, mx: 8527, my: -2641}, //Henstridge 17
    //{wx: -11149,wy: 17456, mx: 5904, my: -5174}, // Boltic spawnpoint
    {wx: 5377, wy: -4485, mx: 7462, my: -7583}, // Saint Barth's 09
    {wx: 21486, wy: 32885, mx: 8920, my: -3506}, // Larnaca gate 6
    {wx: -3697, wy: 21084, mx: 6620, my: -4792}, // IRFD gate 1
    {wx: -8236, wy: -32018, mx: 6246, my: -10598}, // ITKO gate 3
    //{wx: -6931, wy: -31204, mx: 6397, my: -10535}, // ITKO D2
    //{wx: -8632, wy: -32296, mx: 6229, my: -10598}, // ITKO gate 2
    {wx: 17431, wy: -19981, mx: 8583, my: -9273}, // IPPH gate 20
    //{wx: -1383, wy: 19407, mx: 6849, my: -4963}, // IRFD rwy 25C


]

const affine = solveAffine(calibrationPoints);

const scaleX = Math.hypot(affine.a, affine.d);
const scaleY = Math.hypot(affine.b, affine.e);

console.log("pixels per world-unit (X):", scaleX);
console.log("pixels per world-unit (Y):", scaleY);

console.log(affine);

function computeErrors(points, t) {
  for (const p of points) {
    const px = t.a * p.wx + t.b * p.wy + t.c;
    const py = t.d * p.wx + t.e * p.wy + t.f;

    const err = Math.hypot(px - p.mx, py - p.my);
    console.log(err.toFixed(2), "px");
  }
}
computeErrors(calibrationPoints, affine);


function solveAffine(points) {
  let Sxx=0,Sxy=0,Sx=0,Syy=0,Sy=0,N=points.length;
  let Sxmx=0,Symx=0,Smx=0;
  let Sxmy=0,Symy=0,Smy=0;

  for (const p of points) {
    const { wx:x, wy:y, mx, my } = p;
    Sxx += x*x;
    Sxy += x*y;
    Syy += y*y;
    Sx  += x;
    Sy  += y;

    Sxmx += x*mx;
    Symx += y*mx;
    Smx  += mx;

    Sxmy += x*my;
    Symy += y*my;
    Smy  += my;
    
  }

  const M = [
    [Sxx, Sxy, Sx],
    [Sxy, Syy, Sy],
    [Sx,  Sy,  N ]
  ];

  const inv = invert3x3(M);

  const ax = inv[0][0]*Sxmx + inv[0][1]*Symx + inv[0][2]*Smx;
  const bx = inv[1][0]*Sxmx + inv[1][1]*Symx + inv[1][2]*Smx;
  const cx = inv[2][0]*Sxmx + inv[2][1]*Symx + inv[2][2]*Smx;

  const ay = inv[0][0]*Sxmy + inv[0][1]*Symy + inv[0][2]*Smy;
  const by = inv[1][0]*Sxmy + inv[1][1]*Symy + inv[1][2]*Smy;
  const cy = inv[2][0]*Sxmy + inv[2][1]*Symy + inv[2][2]*Smy;

  return { a: ax, b: bx, c: cx, d: ay, e: by, f: cy };
}


function invert3x3(m) {
  const a = m[0][0], b = m[0][1], c = m[0][2];
  const d = m[1][0], e = m[1][1], f = m[1][2];
  const g = m[2][0], h = m[2][1], i = m[2][2];

  const A =  (e*i - f*h);
  const B = -(d*i - f*g);
  const C =  (d*h - e*g);
  const D = -(b*i - c*h);
  const E =  (a*i - c*g);
  const F = -(a*h - b*g);
  const G =  (b*f - c*e);
  const H = -(a*f - c*d);
  const I =  (a*e - b*d);

  const det = a*A + b*B + c*C;

  if (Math.abs(det) < 1e-12) {
    throw new Error("Matrix not invertible (degenerate calibration)");
  }

  const invDet = 1 / det;


  return [
    [A * invDet, D * invDet, G * invDet],
    [B * invDet, E * invDet, H * invDet],
    [C * invDet, F * invDet, I * invDet]
  ];
}