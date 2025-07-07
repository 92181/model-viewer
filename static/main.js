// Set Main Icon;
qq='M23 55Q27 63 36 68 33 61 35 58C37 64 41 63 43 68 46 63 38 56 41 50 44 44 68 49 68 39 68 35 52 34 49 24Q39 16 44 4 41 5 39 7 39 4 37 0 30 7 25 17 13 16 7 21 13 20 16 21 3 25 0 37 5 32 9 31 3 43 9 55 9 46 12 42 13 54 27 67 22 58 23 55M37 18Q33 17 30 18 32 11 36 7 37 11 37 18M40 25Q46 27 48 31 41 30 40 25';

document.querySelector("[qn]").innerHTML="<path d='"+qq+"' fill='currentColor'></path>";

// Set Favicon;
let qj="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 68 68'%3E%3Cpath d='"+qq+"' fill='%23";

if(window.matchMedia("(prefers-color-scheme:dark)").matches) 
{
  document.querySelector("link").href=qj+"fff'/%3E%3C/svg%3E";
}
else
{
  document.querySelector("link").href=qj+"000'/%3E%3C/svg%3E";
};

// Get Canvas & Focus;
const CanvasGL=document.querySelector("canvas");CanvasGL.focus();CanvasGL.oncontextmenu=function(e){e.preventDefault()};

const sh=document.querySelector("#search input"),g6=document.querySelector("input"),r3=window.devicePixelRatio,lz=document.getElementById("elist");

let p2=2*Math.PI,rd=Math.PI/180;

// Handle Inputs;
function inp(e)
{
  e.select();
};

// Handle Settings Menu;
let fg=document.getElementById("setml").children,fc=document.getElementById("setll").children,fa=2,z=0;

while(z<fg.length)
{
  let g=z;

  fg[g].onclick=function()
  {
    if(g!=fa)
    {
      fg[g].style.border="var(--brdr)";fg[fa].style.border="";

      fc[g].style.display="flex";fc[fa].style.display="";

      fa=g;
    };
  };

  z+=1;
};

// Close And Open Setting Menu;
const fi=document.getElementById("overlay"),fq=fi.children;

function smo()
{
  fi.style.display="flex";
};

function smu()
{
  fi.style.display="";CanvasGL.focus();
};

// Configure Theme;
function thm(p)
{
  let c,b,r,h=document.documentElement;

  if(!p)
  {
    c="#000";b="#fff";r="#E6E6E6";
  }
  else if(p==1)
  {
    c="#fff";b="#0b0b0b";r="#303030";
  }
  else
  {
    c="#fff";b="#000";r="#1E1E1E";
  };

  h.style.setProperty("--main-color",c);h.style.setProperty("--bkgr-color",b);h.style.setProperty("--brdr-color",r);
};

thm(2);

// Degree Settings;
let dg=1;

function deg(p)
{
  if(p){dg=1;}else{dg=0;};
};

// Initialize Radio Buttons;
let rdb=document.querySelectorAll("#setmn .radio"),rdf=[thm,0,deg],s=0;

while(s<rdb.length)
{
  let f=rdf[s],k=rdb[s].children,i=0;

  while(i<k.length)
  {
    let j=i;

    k[i].onclick=function()
    { 
      // Handle Button Style;
      this.parentElement.querySelector("[style]").removeAttribute("style");this.style="border:var(--brdr)"; 
      
      // Trigger Logic;
      f(j);
    };

    i+=1;
  };

  s+=1;
};

// Get Euclidean Distance Between Vectors;
function ecd(dx,dy,dz)
{
  return Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2)+Math.pow(dz,2));
};

// Set Wireframe Color Of A Vertice;
function f39(j,fe,m)
{
  // Find All Faces Of Selected Vertice (Could Be Optimized: GLI Hash);
  let i=0,v=fe.length,z=g5;

  while(i<v)
  {
    if(fe[i]==z){m[i]=j;};i+=1;
  };
};

// Apply Wireframe Color Change;
function f38(a,m)
{
  a.geometry.setAttribute('mode',new THREE.BufferAttribute(new Float32Array(m),1));
  
  r9=1;
};

// Scale Selected Vertices;
function sca()
{
  let x=parseFloat(ci[0].value),y=parseFloat(ci[1].value),z=parseFloat(ci[2].value);

  // Get Value Difference & Save Initial;
  let dx=x/lx[0],dy=y/lx[1],dz=z/lx[2],e=0;lx=[x,y,z];

  // Scale Around (Custom Origin);
  let tt=org(),ox=tt[0];oy=tt[1];oz=tt[2];

  while(e<qw)
  {
    let o=qk[e],f=o.s,v=o.v,k=o.sc;

    while(k>0)
    {
      k-=1;

      let j=f[k]*3;

      v[j]=(v[j]-ox)*dx+ox;
      v[j+1]=(v[j+1]-oy)*dy+oy;
      v[j+2]=(v[j+2]-oz)*dz+oz;
    };

    f42(o,o.f,v);e+=1;
  };

  r9=1;
};

// Rotate Selected Vertices;
function rot()
{
  let d=parseFloat(ci[0].value),x,y,z;

  // If True, Convert Radians To Degrees;
  if(dg){d*=rd;};

  // Get Rotation Axis;
  if(!cr[0].selectedIndex)
  {
    x=d;y=z=0;
  }
  else if(cr[0].selectedIndex==1)
  {
    y=d;x=z=0;
  }
  else
  {
    z=d;x=y=0;
  };

  // Get Value Difference & Save Initial;
  let dx=x-lx[0],dy=y-lx[1],dz=z-lx[2],e=0;lx=[x,y,z];

  const cx=Math.cos(dx),sx=Math.sin(dx),cy=Math.cos(dy),sy=Math.sin(dy),cz=Math.cos(dz),sz=Math.sin(dz);

  // Rotate Around (Custom Origin);
  let tt=org(),ox=tt[0];oy=tt[1];oz=tt[2];

  while(e<qw)
  {
    let o=qk[e],f=o.s,v=o.v,k=o.sc;

    while(k>0)
    {
      k-=1;

      let j=f[k]*3,x=v[j]-ox,y=v[j+1]-oy,z=v[j+2]-oz;

      // Rotate Around The X-Axis;
      const fy=y*cx-z*sx;z=y*sx+z*cx;

      // Rotate Around The Y-Axis;
      const fx=x*cy+z*sy;v[j+2]=-x*sy+z*cy+oz;

      // Rotate Around The Z-Axis;
      v[j]=fx*cz-fy*sz+ox;v[j+1]=fx*sz+fy*cz+oy;
    };

    f42(o,o.f,v);e+=1;
  };

  r9=1;
};

// Move Position Of Vertices;
function pos()
{
  let x=parseFloat(ci[0].value),y=parseFloat(ci[1].value),z=parseFloat(ci[2].value);
  
  // Get Value Difference & Save Initial;
  let dx=x-lx[0],dy=y-lx[1],dz=z-lx[2],e=0;lx=[x,y,z];

  // Apply To All Meshes;
  while(e<qw)
  {
    let o=qk[e],f=o.s,v=o.v,k=o.sc;

    while(k>0)
    {
      k-=1;

      let j=f[k]*3;v[j]+=dx;v[j+1]+=dy;v[j+2]+=dz;
    };

    f42(o,o.f,v);e+=1;
  };

  r9=1;
};

// Get Average Position Of Selection (Center, Origin);
function pav()
{
  let e=0,x=0,y=0,z=0,a=0;
  
  while(e<qw)
  {
    let o=qk[e],f=o.s,v=o.v,k=o.sc;

    while(k>0)
    {
      k-=1;

      let j=f[k]*3;x+=v[j];y+=v[j+1];z+=v[j+2];
    };

    a+=o.sc;e+=1;
  };

  if(a)
  {
    return [x/a,y/a,z/a];
  }
  else
  {
    return [0,0,0];
  };
};

// Custom Origin Set;
function cuo()
{
  lo=[parseFloat(ci[0].value),parseFloat(ci[1].value),parseFloat(ci[2].value)];
};

// Handle Origin Selection;
function org()
{
  // 1: Geometric Center, 2: Custom Origin, 3: Scene Origin;
  if(!cr[1].selectedIndex)
  {
    return pav();
  }
  else if(cr[1].selectedIndex==1)
  {
    return lo;
  }
  else
  {
    return [0,0,0];
  };
};

// Find All Vertices That Are Linked To The Given One;
function gli()
{
  trx=performance.now();

  // Loop Over All Groups;
  let e=0,y,b,l,s;

  while(e<qw)
  {
    y=qk[e];

    if(y.sc>0)
    {
      l=y.a;b=y.f;s=y.s;

      // Define Variables;
      let nm=y.sc,g=0,v=new Map(),a=new Map(),z=b.length,k,c,j,f,i=0;

      // Prime;
      while(g<nm){a.set(s[g],'');g+=1;};

      // Build Indice Position Map;
      while(i<z)
      {
        // Generate Key And Get Result;
        k=b[i];c=v.get(k);

        // Create Array And Push;
        if(c==undefined){c=[];};c.push(i);v.set(k,c);

        i+=1;
      };

      // Retrieve All Linked Vertices;
      i=0;while(i<nm)
      {
        c=v.get(s[i]);

        // Check Each Indice Location Their Neighboring Vertices;
        j=0;while(j<c.length)
        {
          // Retrieve A Position And Set It's Color;
          k=c[j];f=k%3;l[k]=1;

          // Check Indice Position Within Face And Get Sibling Vertices;
          if(f==0){n=b[k+1];m=b[k+2];}else if(f==1){n=b[k];m=b[k+1];}else{n=b[k-2];m=b[k-1];};

          // If Not Defined Yet, Define It And Push Vertice To Linked;
          if(a.get(n)==undefined){a.set(n,'');s[nm]=n;nm+=1;};if(a.get(m)==undefined){a.set(m,'');s[nm]=m;nm+=1;};

          j+=1;
        };

        i+=1;
      };

      // Apply To Geometry & Save;
      f38(y.mesh,l);y.sc=nm;

      console.log(performance.now()-trx);
    };

    e+=1;
  };
};

// Convert Unindexed Geometry To Indexed Geometry;
function tin(p,f)
{
  let k,c,i=0,v=new Map(),h=0;

  // Loop Over All Vertices;
  while(i<p.length)
  {
    // Generate Key And Get Result;
    k=p[i]+''+p[i+1]+''+p[i+2];c=v.get(k);

    // Insert Into Hashmap If Not Found
    if(c==undefined)
    {
      c=h/3;v.set(k,c);

      p[h]=p[i];p[h+1]=p[i+1];p[h+2]=p[i+2];h+=3;
    }

    f.push(c);i+=3;
  };

  return h;
};

// Compute Vertex Normals For Lighting;
function cvn(v)
{
  const l=v.length,n=new Array(l);

  // Define Variables;
  let e0,e1,e2,e3,e4,e5,n0,n1,n2,i=0;

  // For Every Face;
  while(i<l)
  {
    // Get The Edges Of The Face;
    e0=v[i+3]-v[i];
    e1=v[i+4]-v[i+1];
    e2=v[i+5]-v[i+2];

    e3=v[i+6]-v[i];
    e4=v[i+7]-v[i+1];
    e5=v[i+8]-v[i+2];

    // Use A Cross Product On The Edges;
    n0=e1*e5-e2*e4;n1=e2*e3-e0*e5;n2=e0*e4-e1*e3;

    // Normalize Normal Vector (0-1);
    const l=Math.sqrt(n0*n0+n1*n1+n2*n2);

    if(l>0)
    {
      n0/=l;n1/=l;n2/=l;
    };

    // Fill Normal Array;
    n[i]=n[i+3]=n[i+6]=n0;n[i+1]=n[i+4]=n[i+7]=n1;n[i+2]=n[i+5]=n[i+8]=n2;

    i+=9;
  };

  return n;
};

pt=new THREE.ShaderMaterial({side:THREE.DoubleSide,alphaToCoverage:true,
  vertexShader:`
    attribute vec3 center;varying vec3 c,p,n; 
        
    attribute float mode;
    varying float vMode;

    void main()
    {
      vMode=mode;c=center;p=position;n=normal;
      gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
    }`,
  fragmentShader:`
    varying vec3 c,p,n;float t=1.0;vec3 l;
    varying float vMode;

    float ambient = 0.2;

    void main()
    {
      if(gl_FrontFacing)
      {
        l=n;
      }
      else 
      {   
        l=-n;
      };

      vec3 newc = ambient + (1.0 - ambient) * mix(vec3(dot(l,normalize(cameraPosition-p))),vec3(1.0,0.6,0.1),vMode*0.4);
      vec3 newk=mix(vec3(0.1,0.1,0.1),vec3(1.0,0.3,0.0),vMode);

      vec3 a=fwidth(c.xyz);vec3 e=smoothstep((t-1.0)*a,t*a,c.xyz);

      gl_FragColor=vec4(mix(newk,newc,min(min(e.x,e.y),e.z)),1.0);
    }`
  });

// Set Position And Calculate Normals;
function f42(o,fe,fw)
{
  let b=o.mesh.geometry;

  // Convert Indexed To Unindexed;
  let x=[],z=0,v=0,i=0,f;

  while(i<fe.length)
  {
    f=fe[i]*3;x[z]=fw[f];x[z+1]=fw[f+1];x[z+2]=fw[f+2];

    i+=1;z+=3;
  };

  // Set Position And Calculate Normals;
  b.setAttribute('position',new THREE.Float32BufferAttribute(x,3));b.setAttribute('normal',new THREE.Float32BufferAttribute(cvn(x),3));

  // Fill Selection Mode Array;
  let h=o.a;i=h.length;

  while(i<z)
  {
    h[i]=h[i+1]=h[i+2]=0;i+=3;
  };

  b.setAttribute("mode",new THREE.BufferAttribute(new Float32Array(h),1));


  b.computeBoundingSphere();b.computeBoundingBox();

  let ty=b.getAttribute("center");
  if(!ty||ty.array.length!=z)
  {
    // recalc
  };


  // Write Barycentric Coordinates;
  const c=new Float32Array(z);

  while(v<z)
  {
    c.set([1,0,0,0,1,0,0,0,1],v);v+=9;
  };

  b.setAttribute("center",new THREE.BufferAttribute(c,3));
};

// Drag Menu Item (Mesh);
let dv=0,dc=0,dk=0;

function drs(v)
{
  if(v.buttons==1)
  {
    let h=parseInt(v.layerY/26.95);dk=lz.children[h*2].nextElementSibling;dc=dk.cloneNode(!0);

    // Clone & Set Properties;
    dc.style.position="absolute";dc.style.pointerEvents="none";dc.style.opacity="0.5";dc.style.top=(h*1.6+h*25.35+1.6)+"px";

    lz.appendChild(dc);lz.onmousemove=drg;lz.onmouseup=function(){dro(this)};
  };
};

function drg(e)
{
  // Calculate Entry Position (Size: 28.45);
  let c=lz.children[parseInt(e.layerY/28.45+0.5)*2];dc.style.top=(e.layerY-15)+"px";

  if(dv!=c)
  {
    dv.style="";dv=c;c.style.background="var(--brdr-color)";
  };
};

function dro(e)
{
  e.onmousemove=drs;e.onmouseup=0;dv.style="";dc.remove();

  if(dv&&dk!=dv.previousElementSibling)
  {
    dv.after(dk.nextElementSibling);dv.after(dk);
  };

  dv=0;
};

// Change Entry Title;
function cht(e)
{
  e.children[0].style.pointerEvents="all";e.children[0].select();
};

function chi(e)
{
  qk[parseInt(e.parentElement.parentElement.getAttribute("mesh"))].t=e.value;e.style.pointerEvents="";
};

// Hide Mesh Function (Click);
function hdm(e)
{
  hdb(qk[parseInt(e.parentElement.getAttribute("mesh"))].mesh,e);
};

// Hide Meshes (KeyH, Click);
function hdb(r,e)
{
  if(r.visible)
  {
    // Hide Mesh & Change Icon;
    r.visible=!1;e.innerHTML=`<use xlink:href="#bx">`;
  }
  else
  {
    // Show Mesh & Change Icon;
    r.visible=!0;e.innerHTML=`<use xlink:href="#bz">`;
  };

  r9=1;
};

// Add New Independent Geometry To Scene;
function mad(fz,fw,t)
{
  // Create New HTML Entry;
  lz.innerHTML+=`
    <div class="entry" mesh="`+qw+`">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M20.5 7.27783L12 12.0001M12 12.0001L3.49997 7.27783M12 12.0001L12 21.5001M21 16.0586V7.94153C21 7.59889 21 7.42757 20.9495 7.27477C20.9049 7.13959 20.8318 7.01551 20.7354 6.91082C20.6263 6.79248 20.4766 6.70928 20.177 6.54288L12.777 2.43177C12.4934 2.27421 12.3516 2.19543 12.2015 2.16454C12.0685 2.13721 11.9315 2.13721 11.7986 2.16454C11.6484 2.19543 11.5066 2.27421 11.223 2.43177L3.82297 6.54288C3.52345 6.70928 3.37369 6.79248 3.26463 6.91082C3.16816 7.01551 3.09515 7.13959 3.05048 7.27477C3 7.42757 3 7.59889 3 7.94153V16.0586C3 16.4013 3 16.5726 3.05048 16.7254C3.09515 16.8606 3.16816 16.9847 3.26463 17.0893C3.37369 17.2077 3.52345 17.2909 3.82297 17.4573L11.223 21.5684C11.5066 21.726 11.6484 21.8047 11.7986 21.8356C11.9315 21.863 12.0685 21.863 12.2015 21.8356C12.3516 21.8047 12.4934 21.726 12.777 21.5684L20.177 17.4573C20.4766 17.2909 20.6263 17.2077 20.7354 17.0893C20.8318 16.9847 20.9049 16.8606 20.9495 16.7254C21 16.5726 21 16.4013 21 16.0586Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/>
      </svg>
      <div ondblclick="cht(this)"><input onblur="chi(this)" value="`+t+`"></div>
      <svg onclick="hdm(this)" viewBox="0 0 24 24" fill="none">
        <use xlink:href="#bz">
      </svg>
    </div>
    <div class="bordertest"></div>`;

  // Create And Process Geometry;
  let a=new THREE.BufferGeometry(),m=new THREE.Mesh(a,pt);m.idx=qw;

  // Define Static Mesh Structure;
  qk[qw]={t:t,v:fw,f:fz,mesh:m,s:[],a:[],sc:0};f42(qk[qw],fz,fw);scene.add(m);

  qw+=1;r9=1;
};

// Deselect All Vertices For All Groups;
function f40()
{
  let i=0,z=0;
  
  while(i<qw)
  {
    let g=qk[i];

    if(g.sc>0)
    {
      // Reset Mode Array;
      let c=g.a,l=c.length;

      while(z<l)
      {
        c[z]=c[z+1]=c[z+2]=0;z+=3; // wrong?
      };

      g.mesh.geometry.setAttribute('mode',new THREE.BufferAttribute(new Float32Array(c),1)); // mode array ok? 
      
      g.sc=0;
    }

    i+=1;
  };

  r9=1;
};

// Select All Vertices From A Single Group;
function f41(a,q,w){while(q<w/3){mode[q]=1;q+=1};qk[a].geometry.setAttribute('mode',new THREE.BufferAttribute(new Float32Array(mode),1));r9=1;};

// Define General Variables;
cv=[];cf=[];qk=[];qw=0;qm=[];qt=0;k6=0;

// Import Model;
g6.onchange=function(e)
{
  const f=e.target.files[0],n=f.name.split("."),r=new FileReader();

  r.onload=function(e)
  {
    switch (n[1]) 
    {
      case "stl":
      {
        stl(e.target.result,n[0]);break;
      }  
      case "obj":
      {
        obj(e.target.result,n[0]);break;
      }  
    };
  };

  r.readAsArrayBuffer(f);
};

// Create Camera & Scene, Add Fog & Background Color;
camera=new THREE.PerspectiveCamera(75,0,1,10000);camera.position.y=150;camera.position.z=200;camera.rotation.x=-0.4;scene=new THREE.Scene();

// Create Renderer;
r0=new THREE.WebGLRenderer({alpha:true,antialias:true,canvas:CanvasGL});r0.setClearColor(0,0);r0.setPixelRatio(r3);

// Handle Resizing;
function f2()
{
  CanvasGL.style=CanvasGL.width=CanvasGL.height="";dw=CanvasGL.offsetWidth;dh=CanvasGL.clientHeight;
  
  // Set Canvas Dimensions;
  CanvasGL.style.width=dw+"px";camera.aspect=dw/dh;camera.updateProjectionMatrix();r0.setSize(dw,dh,false);
  
  r9=1;
};

let k0=k1=k2=k3=k4=k5=ku=r9=0;kx=2;

// Create Scene Grid;
function grd(d,s,c,l)
{
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute([-1,1,0,1,1,0,-1,-1,0,-1,-1,0,1,1,0,1,-1,0],3));

  const m=new THREE.ShaderMaterial({side:THREE.DoubleSide,transparent:true,
    vertexShader:`
    varying vec3 worldPosition;
    
    void main()
    {
      vec3 pos = position.xzy*`+d+`;
      worldPosition = pos;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
    `,
    fragmentShader:`
    varying vec3 worldPosition;
    
    float getGrid(float size) 
    {
      vec2 r = worldPosition.xz / size;
      
      vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
      float line = min(grid.x, grid.y);
  
      return `+l+` - min(line, `+l+`);
    }
    
    void main()
    {	
      float d = 1.0 - min(distance(cameraPosition.xz, worldPosition.xz) / `+d+`, 1.0);
  
      float a = getGrid(`+s+`) * pow(d, 2.0);
      
      gl_FragColor = vec4(vec3(`+c+`), a);if(a<=0.01){discard;}
    }`
  });

  const r=new THREE.Mesh(g,m);r.frustumCulled=0;

  return r;
};

// Create Line Axis;
function lin(d,l)
{
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute([-1,1,0,1,1,0,-1,-1,0,-1,-1,0,1,1,0,1,-1,0],3));

  const m=new THREE.ShaderMaterial({side:THREE.DoubleSide,transparent:true,vertexShader:`
    varying vec3 worldPosition;

    void main()
    {
      vec3 pos=position.xzy*`+d+`;
      worldPosition = pos;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
    `,
    fragmentShader:`
    varying vec3 worldPosition;

    void main()
    {	
      float d = 1.0 - min(distance(cameraPosition.xz, worldPosition.xz) / `+d+`, 1.0);
  
      vec2 r = worldPosition.xz;
      vec2 grid = abs(r) / fwidth(r);
      
      float g1=(`+l+`-min(grid.y,`+l+`));float g2=(`+l+`-min(grid.x,`+l+`));

      gl_FragColor=vec4(mix(vec3(0.0,1.0,0.0),vec3(1.0,0.0,0.0),g1),(g2+g1)*pow(d,2.0));
    }`
  });

  const r=new THREE.Mesh(g,m);r.frustumCulled=0;

  return r;
};

// Create Grid For Scene;
let gr=grd("2000.0","20.0","0.5,0.5,0.5",(2.3).toFixed(1)),li=lin("2000.0",(2.7).toFixed(1));

scene.add(gr);scene.add(li);

// Remove Mesh;
function rmm(e)
{
  let p=document.querySelector(`[mesh="`+e+`"]`);p.nextElementSibling.remove();p.remove();
  
  scene.remove(qk[e].mesh);qk[e].mesh.geometry.dispose();qk[e]={};
};

// Get Menu Elements;
const cm=document.getElementById("cntx"),ct=cm.children[0].children[0],ch=cm.getElementsByClassName("cnt"); // Move!
const ci=cm.querySelectorAll("input"); // Move!

const cc=document.getElementsByClassName("slct"),cr=cm.querySelectorAll("select");

let lx,lo=[0,0,0],fn;

// Cntx Menu Input Listeners;
ci[0].onchange=ci[1].onchange=ci[2].onchange=cr[0].onchange=cr[1].onchange=function(){fn();};

// Menu Close Function
function cts()
{
  k6=0;cm.style="";CanvasGL.focus();
};

// Key Down;
window.onkeydown=function(e)
{
  if(!e.metaKey)
  {
    // On Canvas;
    if(e.target==CanvasGL)
    {
      switch(e.code)
      {
        case "KeyN":
        {
          let e=0,o;

          while(e<qw)
          {
            o=qk[e];

            if(o.sc>0)
            {
              let cur_mesh = new Mesh(),cur_subdivider = subdivider(cur_mesh);
              cur_mesh.builMesh(o.v,[],o.f);
              cur_mesh = cur_subdivider.subdivide(2);
              let v=cur_mesh.exportMesh(),f=[];
              v.length=tin(v,f);

              o.v=v;o.f=f;f42(o,f,v);
            };

            e+=1;
          };

          f40();r9=1;

          break;
        }

        case "KeyL":
        {
          gli();r9=1;

          break;
        }
        case "KeyJ":
        {
          // Join The Selected Meshes Into 1 Mesh;
          let e=0,y=0,o;

          while(e<qw)
          {
            o=qk[e];

            if(o.sc>0)
            {
              y=o;e+=1;break;
            };

            e+=1;
          };

          while(e<qw)
          {
            o=qk[e];

            if(o.sc>0)
            {
              let h,l,n,x;

              // Copy Vertices;
              n=y.v.length;x=n/3;h=n+o.v.length;l=0;

              while(n<h)
              {
                y.v[n]=o.v[l];n+=1;l+=1;
              };

              // Copy Faces;
              n=y.f.length;h=n+o.f.length;l=0;

              while(n<h)
              {
                y.f[n]=o.f[l]+x;n+=1;l+=1;
              };

              // Remove Combined Mesh;
              rmm(e);
            };

            e+=1;
          };

          f42(y,y.f,y.v);r9=1;f40();

          break;
        }
        case "KeyH":
        {
          // Hide Mesh (Key);
          let e=0;

          while(e<qw)
          {
            if(qk[e].sc>0)
            {
              hdb(qk[e].mesh,document.querySelector(`[mesh="`+e+`"]`).children[2]);
            };

            e+=1;
          };

          break;
        }
        case "KeyI":
        {
          // Import Mesh;
          g6.click();
          
          break;
        }
        case "KeyP":
        {
          // Export Mesh (Binary STL);
          f14();
          
          break;
        }
        case "KeyX":
        {
          // Delete Selected Vertices & Faces;
          let e=0;

          while(e<qw)
          {
            let g=qk[e],f,v;

            if(g.sc>0)
            {
              f=g.f;v=g.v;

              // If All Vertices Selected;
              if(g.sc==v.length/3)
              {
                rmm(e);r9=1;e+=1;continue;
              };

              while(g.sc>0)
              {
                // Remove Vertice From Array;
                let z=g.s[g.sc-1],i=z*3,h=v.length;

                while(i<h)
                {
                  v[i]=v[i+3];v[i+1]=v[i+4];v[i+2]=v[i+5];

                  i+=3;
                };

                g.v.length-=3;

                // Get Faces And Remove Them (Could Be Optimized?: GLI);
                let l=0;i=0;h=f.length;

                while(l<h)
                {
                  while(f[l]==z||f[l+1]==z||f[l+2]==z)
                  {
                    l+=3;
                  };

                  // Shiftdown Faces;
                  f[i]=f[l];f[i+1]=f[l+1];f[i+2]=f[l+2];

                  // Lower Index;
                  if(f[l]>z){f[i]-=1;};if(f[l+1]>z){f[i+1]-=1;};if(f[l+2]>z){f[i+2]-=1;};

                  i+=3;l+=3;
                };

                g.f.length-=(l-i);l=0;

                // Shiftdown Selection Array;
                while(l<g.sc)
                {
                  if(g.s[l]>z)
                  {
                    g.s[l]-=1;
                  };

                  l+=1;
                };

                g.sc-=1;
              };

              g.a.length=0;f42(g,f,v);r9=1;
            };

            e+=1;
          };

          break;
        }
        case "KeyR":
        {
          if(k6==0||k6!=2)
          {
            // Set Menu;
            ci[1].style=ci[2].style="display:none";cm.style="display:block";ct.textContent="Rotate";ch[0].textContent="Angle";cc[0].style=cc[1].style="";

            // Reset Input;
            ci[0].value="0°";lx=[0,0,0];

            fn=rot;k6=2;
          };
          
          break;
        }
        case "KeyT":
        {
          if(k6==0||k6!=3)
          {
            // Set Menu;
            ci[1].style=ci[2].style="";cm.style="display:block";ct.textContent=ch[0].textContent="Scale";cc[0].style="display:none";cc[1].style="";

            // Reset Input;
            ci[0].value=ci[1].value=ci[2].value="1";lx=[1,1,1];

            fn=sca;k6=3;
          };
          
          break;
        };
        case "KeyG":
        {
          if(k6==0||k6!=1)
          {
            // Set Menu;
            ci[1].style=ci[2].style="";cm.style="display:block";ct.textContent="Move";ch[0].textContent="Position";cc[0].style=cc[1].style="display:none";

            // Set Input Values & Save Initial Position;
            lx=pav();ci[0].value=lx[0];ci[1].value=lx[1];ci[2].value=lx[2];

            fn=pos;k6=1;
          };
          
          break;
        }
        case "KeyO":
        {
          if(k6==0||k6!=4)
          {
            // Set Menu;
            ci[1].style=ci[2].style="";cm.style="display:block";ct.textContent="Custom Origin";ch[0].textContent="Origin";cc[0].style=cc[1].style="display:none";

            // Set Input Values & Save Initial Position;
            lx=pav();ci[0].value=lo[0];ci[1].value=lo[1];ci[2].value=lo[2];

            fn=cuo;k6=4;
          };
          
          break;
        }
        case "ShiftLeft":{kx=4;break}
        case "KeyW":{k0=1;r9=1;break}
        case "KeyS":{k1=1;r9=1;break}
        case "KeyA":{k2=1;r9=1;break}
        case "KeyD":{k3=1;r9=1;break}
        case "KeyQ":{k4=1;r9=1;break}
        case "KeyE":{k5=1;r9=1;break}
      };
    };

    switch(e.code)
    {
      case "Slash":
      {
        // Focus Searchbar;
        sh.focus();e.preventDefault();break;
      }
      case "Escape":
      case "Enter":
      {
        if(k6>0){cts();e.preventDefault();};break;
      }
    };
  };
};

window.onkeyup=function(k){switch(k.code){case"ShiftLeft":{kx=2;break}case"KeyW":{k0=0;break}case"KeyS":{k1=0;break}case"KeyA":{k2=0;break}case"KeyD":{k3=0;break}case"KeyQ":{k4=0;break}case"KeyE":{k5=0;break}}};

// Mouse Rotation;
g9=[];gx=0;

CanvasGL.onwheel=function(e)
{
  camera.translateZ(e.deltaY/10);

  e.preventDefault();r9=1;
};

CanvasGL.onmousedown=function(e)
{
  let y=e.offsetY*r3,x=e.offsetX*r3;

  // Catch Click On Control Points;
  if(e.buttons<2)
  {            
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    pointer.x = ( x / (dw*r3) ) * 2 - 1;
    pointer.y = - ( y / (dh*r3) ) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(pointer, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObject(scene);

    if(intersects.length>0)
    {
      // Get the first intersected triangle
      const f=intersects[0],obj=f.object,j=qk[f.object.idx],fw=j.v;fe=j.f;

      // Define Variables;
      const g=f.faceIndex*3,u=f.point,h=fe[g]*3,n=fe[g+1]*3,m=fe[g+2]*3,c=j.a;

      // Calculate Euclidean Distance To Each Face Vertice;
      const c0=ecd(fw[h]-u.x,fw[h+1]-u.y,fw[h+2]-u.z),c1=ecd(fw[n]-u.x,fw[n+1]-u.y,fw[n+2]-u.z),c2=ecd(fw[m]-u.x,fw[m+1]-u.y,fw[m+2]-u.z);

      // Get Closest Vector;
      if(c0<c1&&c0<c2)
      {
        g5=h/3;
      }
      else if(c1<c2)
      {
        g5=n/3;
      }
      else
      {
        g5=m/3;
      };

      const qy=j.s,qt=j.sc;

      if(kx==2)
      {
        // Handle Single Selection;
        f40();qy[0]=g5;f39(1,fe,c);f38(obj,c);
        
        j.sc=1;
      }
      else
      {
        // Check If Already Selected;
        i=0;

        while(i<qt&&qy[i]!=g5)
        {
          i+=1
        };

        // Handle Shift Selection;
        if(i==qt)
        {
          f39(1,fe,c);f38(obj,c);qy[qt]=g5;j.sc+=1;
        }
        else
        {
          j.sc-=1;f39(0,fe,c);f38(obj,c);
          
          while(i<qt-1)
          {
            qy[i]=qy[i+1];i+=1;
          };
        };
      };
    }
    else
    {
      f40();
    };
  };

  r9=1;
};

// Handle Camera Rotation;
kh=new THREE.Euler(-0.4,0,0,'YXZ');kj=Math.PI/2;

window.onmousemove=function(e)
{
  if(e.buttons>=2)
  {
    kh.y=(kh.y-e.movementX*0.005)%p2;if(kh.y<0){kh.y+=p2}kh.x=Math.max(kj-Math.PI,Math.min(kj,kh.x-e.movementY*0.005));
    camera.quaternion.setFromEuler(kh);

    r9=1;
  };
};

// Function To Import STL File;
function stl(d,t)
{
  let cf=[],i4=0;

  // Format Check, ASCII Or Binary;
  let rz=new Uint8Array(d);i=d.byteLength;
  
  if(rz[0]==115&&rz[1]==111&&rz[2]==108&&rz[3]==105&&rz[4]==100)
  {
    // Decode To String And Skip Data Until Next Line (\n);
    j=new TextDecoder().decode(d);z=5;while(rz[z]!=10){z+=1;};

    while(z<i)
    {
      // Skip Data Till Vertex;
      if(rz[z]==120&&rz[z+1]==32)
      {
        z+=2;a="";while(rz[z]!=32){a+=j[z];z+=1}cf[i4]=parseFloat(a);z+=1;
        a="";while(rz[z]!=32){a+=j[z];z+=1}cf[i4+1]=parseFloat(a);z+=1;
        a="";while(rz[z]!=10){a+=j[z];z+=1}cf[i4+2]=parseFloat(a);

        i4+=3;
      };

      z+=1;
    };
  }
  else
  {
    // Import Binary STL Face Data;
    j=new DataView(d);z=84;
    
    while(z<i)
    {
      cf[i4]=j.getFloat32(z+16,1);cf[i4+1]=j.getFloat32(z+20,1);cf[i4+2]=j.getFloat32(z+12,1);i4+=3;
      cf[i4]=j.getFloat32(z+28,1);cf[i4+1]=j.getFloat32(z+32,1);cf[i4+2]=j.getFloat32(z+24,1);i4+=3;
      cf[i4]=j.getFloat32(z+40,1);cf[i4+1]=j.getFloat32(z+44,1);cf[i4+2]=j.getFloat32(z+36,1);i4+=3;

      z+=50;
    };
  };

  // Convert Geometry & Add Mesh;
  let fr=[];cf.length=tin(cf,fr);mad(fr,cf,t);
};

// Function To Import OBJ Files;
function obj(d,t)
{
  const g=new TextDecoder().decode(new Uint8Array(d));
  
  let i=0,y=0,z=g.length,s,v=[],f=[];

  while(i<z)
  {
    if(g[i+1]==' ')
    {
      switch(g[i])
      {
        case 'v':
        {
          s="";i+=2;while(i<z&&g[i]>' '){s+=g[i];i+=1;};v.push(parseFloat(s));
          s="";i+=1;while(i<z&&g[i]>' '){s+=g[i];i+=1;};v.push(parseFloat(s));
          s="";i+=1;while(i<z&&g[i]>' '){s+=g[i];i+=1;};v.push(parseFloat(s));

          break;
        }
        case 'f':
        {
          let u=0;i+=1;

          // Dynamic Loop (Triangles: 3, Quads: 4);
          while(g[i]==' ')
          {
            s="";while(i<z&&g[i]!='/'){s+=g[i];i+=1;};f[y]=parseInt(s)-1;y+=1;

            // Skip Till Next Or End;
            while(i<z&&g[i]>' ')
            {
              i+=1;
            };
            
            u+=1;
          };

          // Triangalize Quads;
          if(u==4)
          {
            f[y]=f[y-4];f[y+1]=f[y-2];

            y+=2;
          };

          break;
        };
      };
    };

    i+=1;
  };

  if(f.length==0)
  {
    v.length=tin(v,f);mad(f,v,t);
  }
  else
  {
    mad(f,v,t);
  };
};

// Load Files From Server;
(async function()
{
  res=await fetch("./models/cube.obj");obj(await res.arrayBuffer(),"Wavefront Cube");
  res=await fetch("./models/torus.stl");stl(await res.arrayBuffer(),"Torus STL");
  res=await fetch("./models/turbine.stl");stl(await res.arrayBuffer(),"Turbine Mesh");
})();

// Render Loop;
function f0()
{
  if(r9)
  {
    r9=0;

    // Apply Camera Movement;
    if(k0){camera.translateZ(-kx);r9=1}if(k1){camera.translateZ(kx);r9=1}if(k2){camera.translateX(-kx);r9=1}
    if(k3){camera.translateX(kx);r9=1}if(k4){camera.translateY(kx);r9=1}if(k5){camera.translateY(-kx);r9=1}
    
    // Render Scene;
    r0.render(scene,camera);
  }

  requestAnimationFrame(f0);
};

window.onload=function()
{
  window.onresize=f2;f2();r9=1;f0();
};

// Export Binary STL File Of Active Meshes;
function f14()
{
  let l=0,z=0,x=[];

  // Convert Indexed To Unindexed Geometry & Combine;
  while(l<qw)
  {
    let u=qk[l];

    if(u.mesh.visible)
    {
      let f=u.f,v=u.v,y,i=0;

      while(i<f.length)
      {
        y=f[i]*3;x[z]=v[y];x[z+1]=v[y+1];x[z+2]=v[y+2];

        i+=1;z+=3;
      };
    };

    l+=1;
  };

  let j=new DataView(new ArrayBuffer(80+4+(50*z/9))),o=84;j.setUint32(80,z/9,1);

  i=0;while(i<z)
  {
    j.setFloat32(o+12,x[i],1);j.setFloat32(o+16,x[i+1],1);j.setFloat32(o+20,x[i+2],1);
    j.setFloat32(o+24,x[i+3],1);j.setFloat32(o+28,x[i+4],1);j.setFloat32(o+32,x[i+5],1);
    j.setFloat32(o+36,x[i+6],1);j.setFloat32(o+40,x[i+7],1);j.setFloat32(o+44,x[i+8],1);

    i+=9;o+=50;
  };

  // Handle Download;
  let a=document.createElement("a");a.href=URL.createObjectURL(new Blob([j],{type:"application/octet-stream"}));

  a.download="file.stl";a.click();URL.revokeObjectURL(a.href);a.remove();
};