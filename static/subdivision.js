var MatrixMath = {
    identity : function () {
        var m = new Float32Array(16);

        m[ 0] = 1;
        m[ 1] = 0;
        m[ 2] = 0;
        m[ 3] = 0;
        m[ 4] = 0;
        m[ 5] = 1;
        m[ 6] = 0;
        m[ 7] = 0;
        m[ 8] = 0;
        m[ 9] = 0;
        m[10] = 1;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;

        return m;
    },

    perspective : function (fieldOfViewInRadians, aspect, near, far) {
        var m = new Float32Array(16);
        var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);

        var rangeInv = 1.0 / (near -far);
        
        m[ 0] = f / aspect;
        m[ 1] = 0;
        m[ 2] = 0;
        m[ 3] = 0;
        m[ 4] = 0;
        m[ 5] = f;
        m[ 6] = 0;
        m[ 7] = 0;
        m[ 8] = 0;
        m[ 9] = 0;
        m[10] = (near + far) * rangeInv;
        m[11] = -1;
        m[12] = 0;
        m[13] = 0;
        m[14] = near * far * rangeInv * 2;
        m[15] = 0;

        return m;
    },

    lookAt : function (cameraPosition, target, up) {
        var m = new Float32Array(16);
        var zAxis = cameraPosition.subtract(target);
        zAxis = zAxis.normalize();
        var xAxis = up.cross(zAxis);
        xAxis = xAxis.normalize();
        var yAxis = zAxis.cross(xAxis);
        yAxis = yAxis.normalize();
    
        m[ 0] = xAxis.value[0];
        m[ 1] = xAxis.value[1];
        m[ 2] = xAxis.value[2];
        m[ 3] = 0;
        m[ 4] = yAxis.value[0];
        m[ 5] = yAxis.value[1];
        m[ 6] = yAxis.value[2];
        m[ 7] = 0;
        m[ 8] = zAxis.value[0];
        m[ 9] = zAxis.value[1];
        m[10] = zAxis.value[2];
        m[11] = 0;
        m[12] = cameraPosition.value[0];
        m[13] = cameraPosition.value[1];
        m[14] = cameraPosition.value[2];
        m[15] = 1;
    
        return m;
    },

    frustum : function (left, right, bottom, top, near, far) {
        var m = new Float32Array(16);
    
        var dx = right - left;
        var dy = top - bottom;
        var dz = far - near;
    
        m[ 0] = 2 * near / dx;
        m[ 1] = 0;
        m[ 2] = 0;
        m[ 3] = 0;
        m[ 4] = 0;
        m[ 5] = 2 * near / dy;
        m[ 6] = 0;
        m[ 7] = 0;
        m[ 8] = (left + right) / dx;
        m[ 9] = (top + bottom) / dy;
        m[10] = -(far + near) / dz;
        m[11] = -1;
        m[12] = 0;
        m[13] = 0;
        m[14] = -2 * near * far / dz;
        m[15] = 0;
    
        return m;
    },

    orthographic : function (left, right, bottom, top, near, far) {
        var m = new Float32Array(16);
    
        m[ 0] = 2 / (right - left);
        m[ 1] = 0;
        m[ 2] = 0;
        m[ 3] = 0;
        m[ 4] = 0;
        m[ 5] = 2 / (top - bottom);
        m[ 6] = 0;
        m[ 7] = 0;
        m[ 8] = 0;
        m[ 9] = 0;
        m[10] = 2 / (near - far);
        m[11] = 0;
        m[12] = (left + right) / (left - right);
        m[13] = (bottom + top) / (bottom - top);
        m[14] = (near + far) / (near - far);
        m[15] = 1;
    
        return m;
    },

    translation : function (tx, ty, tz) {
        var m = new Float32Array(16);
    
        m[ 0] = 1;
        m[ 1] = 0;
        m[ 2] = 0;
        m[ 3] = 0;
        m[ 4] = 0;
        m[ 5] = 1;
        m[ 6] = 0;
        m[ 7] = 0;
        m[ 8] = 0;
        m[ 9] = 0;
        m[10] = 1;
        m[11] = 0;
        m[12] = tx;
        m[13] = ty;
        m[14] = tz;
        m[15] = 1;
    
        return m;
    },

    xRotation : function (angleInRadians) {
        var m = new Float32Array(16);
        var c = Math.cos(angleInRadians);
        var s = Math.sin(angleInRadians);
    
        m[ 0] = 1;
        m[ 1] = 0;
        m[ 2] = 0;
        m[ 3] = 0;
        m[ 4] = 0;
        m[ 5] = c;
        m[ 6] = s;
        m[ 7] = 0;
        m[ 8] = 0;
        m[ 9] = -s;
        m[10] = c;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;
    
        return m;
    },

    yRotation : function (angleInRadians) {
        var m = new Float32Array(16);
        var c = Math.cos(angleInRadians);
        var s = Math.sin(angleInRadians);
    
        m[ 0] = c;
        m[ 1] = 0;
        m[ 2] = -s;
        m[ 3] = 0;
        m[ 4] = 0;
        m[ 5] = 1;
        m[ 6] = 0;
        m[ 7] = 0;
        m[ 8] = s;
        m[ 9] = 0;
        m[10] = c;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;
    
        return m;
    },

    zRotation : function (angleInRadians) {
        var m = new Float32Array(16);
        var c = Math.cos(angleInRadians);
        var s = Math.sin(angleInRadians);
    
        m[ 0] = c;
        m[ 1] = s;
        m[ 2] = 0;
        m[ 3] = 0;
        m[ 4] = -s;
        m[ 5] = c;
        m[ 6] = 0;
        m[ 7] = 0;
        m[ 8] = 0;
        m[ 9] = 0;
        m[10] = 1;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;
    
        return m;
    },

    axisRotation : function (axis, angleInRadians) {
        var m = new Float32Array(16);
    
        var x = axis.value[0];
        var y = axis.value[1];
        var z = axis.value[2];
        var n = Math.sqrt(x * x + y * y + z * z);
        x /= n;
        y /= n;
        z /= n;
        var xx = x * x;
        var yy = y * y;
        var zz = z * z;
        var c = Math.cos(angleInRadians);
        var s = Math.sin(angleInRadians);
        var oneMinusCosine = 1 - c;
    
        m[ 0] = xx + (1 - xx) * c;
        m[ 1] = x * y * oneMinusCosine + z * s;
        m[ 2] = x * z * oneMinusCosine - y * s;
        m[ 3] = 0;
        m[ 4] = x * y * oneMinusCosine - z * s;
        m[ 5] = yy + (1 - yy) * c;
        m[ 6] = y * z * oneMinusCosine + x * s;
        m[ 7] = 0;
        m[ 8] = x * z * oneMinusCosine + y * s;
        m[ 9] = y * z * oneMinusCosine - x * s;
        m[10] = zz + (1 - zz) * c;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;
    
        return m;
    },

    scaling : function (sx, sy, sz) {
        var m = new Float32Array(16);
    
        m[ 0] = sx;
        m[ 1] = 0;
        m[ 2] = 0;
        m[ 3] = 0;
        m[ 4] = 0;
        m[ 5] = sy;
        m[ 6] = 0;
        m[ 7] = 0;
        m[ 8] = 0;
        m[ 9] = 0;
        m[10] = sz;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;
    
        return m;
    },

    multiply: function (a, b) {
        var m = new Float32Array(16);
        var b00 = b[0 * 4 + 0];
        var b01 = b[0 * 4 + 1];
        var b02 = b[0 * 4 + 2];
        var b03 = b[0 * 4 + 3];
        var b10 = b[1 * 4 + 0];
        var b11 = b[1 * 4 + 1];
        var b12 = b[1 * 4 + 2];
        var b13 = b[1 * 4 + 3];
        var b20 = b[2 * 4 + 0];
        var b21 = b[2 * 4 + 1];
        var b22 = b[2 * 4 + 2];
        var b23 = b[2 * 4 + 3];
        var b30 = b[3 * 4 + 0];
        var b31 = b[3 * 4 + 1];
        var b32 = b[3 * 4 + 2];
        var b33 = b[3 * 4 + 3];
        var a00 = a[0 * 4 + 0];
        var a01 = a[0 * 4 + 1];
        var a02 = a[0 * 4 + 2];
        var a03 = a[0 * 4 + 3];
        var a10 = a[1 * 4 + 0];
        var a11 = a[1 * 4 + 1];
        var a12 = a[1 * 4 + 2];
        var a13 = a[1 * 4 + 3];
        var a20 = a[2 * 4 + 0];
        var a21 = a[2 * 4 + 1];
        var a22 = a[2 * 4 + 2];
        var a23 = a[2 * 4 + 3];
        var a30 = a[3 * 4 + 0];
        var a31 = a[3 * 4 + 1];
        var a32 = a[3 * 4 + 2];
        var a33 = a[3 * 4 + 3];
        m[ 0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
        m[ 1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
        m[ 2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
        m[ 3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
        m[ 4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
        m[ 5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
        m[ 6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
        m[ 7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
        m[ 8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
        m[ 9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
        m[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
        m[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
        m[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
        m[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
        m[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
        m[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
        
        return m;
    },

    copy: function (b) {
        var m = new Float32Array(16);
        m[ 0] = b[ 0];
        m[ 1] = b[ 1];
        m[ 2] = b[ 2];
        m[ 3] = b[ 3];
        m[ 4] = b[ 4];
        m[ 5] = b[ 5];
        m[ 6] = b[ 6];
        m[ 7] = b[ 7];
        m[ 8] = b[ 8];
        m[ 9] = b[ 9];
        m[10] = b[10];
        m[11] = b[11];
        m[12] = b[12];
        m[13] = b[13];
        m[14] = b[14];
        m[15] = b[15];
        return m;
    }
    
};

/**
 * A Vector3D class.
 */

function Vector3D (dx, dy, dz) {
    
    this.value = new Float32Array(3);

    if (arguments.length >= 1) this.value[0] = dx;
    if (arguments.length >= 2) this.value[1] = dy;
    if (arguments.length >= 3) this.value[2] = dz;

    this.x = function () { return this.value[0]; }
    this.y = function () { return this.value[1]; }
    this.z = function () { return this.value[2]; }

    /** ---------------------------------------------------------------------
     *  A new vector that has the same values as the input argument
     */
    this.createFrom = function (from) {
        this.value[0] = from.value[0];
        this.value[1] = from.value[1];
        this.value[2] = from.value[2];
    };

    /** ---------------------------------------------------------------------
     * Copy a vector into another vector
     * @param  Vector3D  to - A vector that you want changed
     */
    this.copy = function () {
        var new_vector = new Vector3D(this.value[0], this.value[1], this.value[2]);
        return new_vector;
    };

    /** ---------------------------------------------------------------------
     * Set the components of a vector
     * @param  Number  dx - The change in x of the vector
     * @param  Number  dy - The change in y of the vector
     * @param  Number  dz - The change in z of the vector
     */
    this.set = function (dx, dy, dz) {
        if (arguments.length >= 1) this.value[0] = dx;
        if (arguments.length >= 2) this.value[1] = dy;
        if (arguments.length >= 3) this.value[2] = dz;
    };

    /** ---------------------------------------------------------------------
     * Calculate the norm of a vector
     * @return Number The norm of a vector
     */
    this.norm = function () {
        return Math.sqrt(this.value[0] * this.value[0] + 
                         this.value[1] * this.value[1] +
                         this.value[2] * this.value[2]);
    };

    /** ---------------------------------------------------------------------
     * Make a vector have a length of 1
     * @return Vector3D The input vector normalized to unit length. Or null if the vector is zero length
     */
    this.normalize = function () {
        var length, percent;

        length = this.norm();
        if (Math.abs(length) < 0.0000001) {
            return null; // Invalid vector
        }

        percent = 1.0 / length;
        var new_x = this.value[0] * percent;
        var new_y = this.value[1] * percent;
        var new_z = this.value[2] * percent;
        
        var new_vector = new Vector3D(new_x, new_y, new_z);
        return new_vector;
    };

    /** ---------------------------------------------------------------------
     * Add two vectors:  result = v0 + v1
     * @param  Vector3D  v1 - A vector
     * @return Vector3D The result of adding v and v1
     */
    this.add = function (v1) {
        var new_x = this.value[0] + v1.value[0];
        var new_y = this.value[1] + v1.value[1];
        var new_z = this.value[2] + v1.value[2];

        var new_vector = new Vector3D(new_x, new_y, new_z);
        return new_vector;
    };

    /** ---------------------------------------------------------------------
     * Subtract two vectors:  result = v0 - v1
     * @param  Vector3D  v1 - A vector
     * @return Vector3D The result of subtracting v1 from v0
     */
    this.subtract = function (v1) {
        var new_x = this.value[0] - v1.value[0];
        var new_y = this.value[1] - v1.value[1];
        var new_z = this.value[2] - v1.value[2];
        
        var new_vector = new Vector3D(new_x, new_y, new_z);
        return new_vector;
    };

	/** ---------------------------------------------------------------------
     * Scale a vector:  result = s * v0
     * @param  Number  s - A scale factor
     * @return Vector3D The result
     */
    this.multiply = function (s) {
        var new_x = this.value[0] * s;
        var new_y = this.value[1] * s;
        var new_z = this.value[2] * s;

        var new_vector = new Vector3D(new_x, new_y, new_z);
        return new_vector;
    };
	
    /** ---------------------------------------------------------------------
     * Calculate the dot product of 2 vectors
     * @param  Vector3D  v1 - A vector
     * @return Number The dot product of v0 and v1
     */
    this.dot = function (v1) {
        var dot_product = this.value[0] * v1.value[0] + 
                          this.value[1] * v1.value[1] +
                          this.value[2] * v1.value[2] ;
        return dot_product;
    };

    /** ---------------------------------------------------------------------
     * Calculate the cross product of 2 vectors
     * @param  Vector3D  v1 - A vector
     * @return Number The dot product of v0 and v1
     */
    this.cross = function (v1) {
        var new_x = this.value[1] * v1.value[2] - this.value[2] * v1.value[1];
        var new_y = this.value[2] * v1.value[0] - this.value[0] * v1.value[2];
        var new_z = this.value[0] * v1.value[1] - this.value[1] * v1.value[0];

        var new_vector = new Vector3D(new_x, new_y, new_z);
        return new_vector;
    }


    /** ---------------------------------------------------------------------
     * Determine if 2 vectors are equal
     * @param  Vector3D  v1 - A vector
     * @return Boolean if 2 vectors are equal
     */
    this.equal = function (v1) {
        var is_equal = (this.value[0] == v1.value[0] && 
                        this.value[1] == v1.value[1] &&
                        this.value[2] == v1.value[2] );
        return is_equal;
    };
}
 


/**
 * A simple half-edge mesh class
**/

class Vertex {
    constructor(x, y, z, idx) {
        this.position = new Vector3D(x, y, z);
        this.id = idx;
        this.isNew = false;
    }

    getPos() { return this.position; }
    getEdge()  { return this.he; }
    getId() { return this.id; }
    getNew() {return this.isNew;}

    setPos(dx, dy, dz) {
        this.position.value[0] = dx;
        this.position.value[1] = dy;
        this.position.value[2] = dz;
    }

    setEdge(e) {
        this.he = e;
    }

    setNew(x){
      this.isNew = x;
    }
}

class HalfEdge {
    constructor() {}

    // New;
    getCrease() { return this.crease; }
    setCrease(e) { this.crease = e; }

    getOrigin() { return this.origin; }
    getTwin() { return this.twin; }
    getPrev() { return this.prev; }
    getNext() { return this.next; }
    getFace() { return this.face; }
    getIsSplit() {return this.isSplit;}

    setOrigin(v) { this.origin = v; }
    setTwin(e) { this.twin = e; }
    setPrev(e) { this.prev = e; }
    setNext(e) { this.next = e; }
    setFace(f) { this.face = f; }
    setIsSplit(s) {this.isSplit = s; }
    goClockwise1(){return this.twin.next}
    goAnticlowise1(){return this.prev.twin}
    goStraight1(){return this.twin.goClockwise1().goClockwise1().goClockwise1()}
    goBack1(){return this.prev.twin.goAnticlowise1().goAnticlowise1().twin}

}

class Face {
    constructor() {}

    getEdge() { return this.he; }

    setEdge (e) { this.he = e; }

    vert(idx) {
        if (this.he) {
            switch (idx) {
                case 0: return this.he.origin;
                case 1: return this.he.next.origin;
                case 2: return this.he.prev.origin;
            }
        }
    }

    computeNormal () {
        var v0 = this.vert(0).position;
        var v1 = this.vert(1).position;
        var v2 = this.vert(2).position;

        var u = v1.subtract(v0);
        var u = u.normalize();
        var v = v2.subtract(v0);
        var v = v.normalize();
        var w = u.cross(v);

        return w.normalize();
    }

    isTriangle(){

      return (this.he.next.next.next == this.he);
    }
}

class Mesh {
    constructor () {
        this.vertices = [];
        this.edges = [];
        this.faces = [];
        this.normals = [];

        this.edgeMap = new Map();
    }

    SplitsLeft() {
      for(var x in this.getEdges()){
        if(this.getEdges()[x].getIsSplit() == false){
          return true;
        }
      }
      return false;
    }

    isNonTriangles() {
      for(var x in this.faces){
        if(this.getFaces()[x].notTriangle()){
          return true;
        }
      }
      return false;

    }

    exportMesh ()
    {
        var faces = this.faces;
        var posArray = [];

        for (var i = 0; i < faces.length; i++)
        {
            var he = faces[i].getEdge();

            var origin = he.getOrigin();
            var next = he.getNext().getOrigin();
            var prev = he.getPrev().getOrigin();

            var origin_pos = origin.getPos();
            var next_pos = next.getPos();
            var prev_pos = prev.getPos();

            posArray.push(origin_pos.value[0]); posArray.push(origin_pos.value[1]); posArray.push(origin_pos.value[2]);
            posArray.push(next_pos.value[0]);   posArray.push(next_pos.value[1]);   posArray.push(next_pos.value[2]);
            posArray.push(prev_pos.value[0]);   posArray.push(prev_pos.value[1]);   posArray.push(prev_pos.value[2]);
        }

        return posArray;
    }

    builMesh (verts, normals, flat) 
    {
        this.clear();

        // Add vertices and vertex normals to our trimesh.
        let z=0;
        for (var i = 0; i < verts.length/3; i++)
        {
            this.addVertexPos(verts[z], verts[z+1], verts[z+2], i);
            z+=3;
        };

        // Add triangles to our trimesh.
        z=0;
        for (var i = 0; i < flat.length/3; i++)
        {
            var v0 = this.vertices[flat[z]];
            var v1 = this.vertices[flat[z+1]];
            var v2 = this.vertices[flat[z+2]];
            this.addFaceByVerts(v0, v1, v2);
            z+=3;
        }

        this.edgeMap.clear();

        if (normals.length == 0) {
            this.computeNormal();
        }
    }

    copyMesh (m) {
        // Copy vertices
        for (var i = 0; i < m.getVertices().length; i++) {
            var v = m.getVertices()[i];
            var v_pos = v.getPos();
            this.addVertexPos(v_pos.value[0], v_pos.value[1], v_pos.value[2], i);
        }

        // Copy faces
        for (var i = 0; i < m.getFaces().length; i++)
        {
            var f = m.getFaces()[i];
            var v0 = this.vertices[f.vert(0).getId()];
            var v1 = this.vertices[f.vert(1).getId()];
            var v2 = this.vertices[f.vert(2).getId()];
            this.addFaceByVerts(v0, v1, v2);
        }

        this.edgeMap.clear();
    }

    clear () {
        this.vertices = [];
        this.edges = [];
        this.faces = [];
        this.normals = [];
        this.edgeMap.clear();
    }

    addVertexPos (x, y, z, i) {
        var v = new Vertex(x, y, z, i);
        this.vertices.push(v);
        return this.vertices[this.vertices.length - 1];
    }

    addFaceByVerts (v1, v2, v3) {
        var e1 = this.findEdge(v1, v2);
        if (!e1) { e1 = this.addEdge(v1, v2); }
        var e2 = this.findEdge(v2, v3);
        if (!e2) { e2 = this.addEdge(v2, v3); }
        var e3 = this.findEdge(v3, v1);
        if (!e3) { e3 = this.addEdge(v3, v1); }

        return this.addFaceByHE(e1, e2, e3);
    }

    addFaceByHE (e1, e2, e3) {
        // Add the face to the mesh
        var f = new Face();
        this.faces.push(f);

        // Initialize face-edge relationship
        f.setEdge(e1);

        // Initialize edge-face relationship
        e1.setFace(f); e2.setFace(f); e3.setFace(f);

        // Connect edge cycle around face
        e1.setNext(e2); e2.setPrev(e1);
        e2.setNext(e3); e3.setPrev(e2);
        e3.setNext(e1); e1.setPrev(e3);

        return f;
    }

    addFace () {
        var f = new Face();
        this.faces.push(f);
        return this.faces[this.faces.length - 1];
    }

    addHalfEdge () {
        var he = new HalfEdge();
        this.edges.push(he);
        return this.edges[this.edges.length - 1];
    }

    addEdge (v1, v2) {
        var he = new HalfEdge();
        this.edges.push(he);

        var key = String(v1.getId()) + "," + String(v2.getId());
        this.edgeMap.set(key, he);

        // Associate edge with its origin vertex
        he.setOrigin(v1);
        if (v1.getEdge() === undefined) {
            v1.setEdge(he);
        }

        // Associate edge with its twin, if it exists
        var t_he = this.findEdge(v2, v1);
        if (t_he === undefined) {}
        else {
            he.setTwin(t_he);
            t_he.setTwin(he);
        }

        return he;
    }

    findEdge (v1, v2) {
        var key = String(v1.getId()) + "," + String(v2.getId());
        if (this.edgeMap.has(key)) {
            return this.edgeMap.get(key);
        }
    }

    getBoundingBox () {
        if (this.vertices.length == 0) return;

        var min = this.vertices[0].getPos().copy();
        var max = this.vertices[0].getPos().copy();

        for (var i = 0; i < this.vertices.length; i++) {
            for (var j = 0; j < 3; j++) {
                var pos = this.vertices[i].getPos();

                if (min.value[j] > pos.value[j]) {
                    min.value[j] = pos.value[j];
                }
                if (max.value[j] < pos.value[j]) {
                    max.value[j] = pos.value[j];
                }
            }
        }

        return [min, max];
    }

    /*getCentroid () {
        var boundingbox = this.getBoundingBox();

        var min = boundingbox[0];
        var max = boundingbox[1];

        var centroid = min.add(max);
        centroid = centroid.multiply(0.5);

        return centroid;
    }*/

    computeNormal () {
        this.normals = [];

        var count = [];
        for (var i = 0; i < this.vertices.length; i++){
            this.normals.push(new Vector3D(0.0, 0.0, 0.0));
            count.push(0);
        }

        for (var i = 0; i < this.faces.length; i++) {
            var f = this.faces[i];
            var n = f.computeNormal();

            var v0_idx = this.faces[i].getEdge().getOrigin().getId();
            var v1_idx = this.faces[i].getEdge().getNext().getOrigin().getId();
            var v2_idx = this.faces[i].getEdge().getPrev().getOrigin().getId();

            this.normals[v0_idx] = this.normals[v0_idx].add(n);
            this.normals[v1_idx] = this.normals[v1_idx].add(n);
            this.normals[v2_idx] = this.normals[v2_idx].add(n);
            count[v0_idx] += 1;
            count[v1_idx] += 2;
            count[v2_idx] += 3;
        }

        for (var i = 0; i < this.normals.length; i++) {
            this.normals[i] = this.normals[i].multiply(count[i]);
            this.normals[i] = this.normals[i].normalize();
        }
    }

    getVertices() { return this.vertices; }
    getEdges() { return this.edges; }
    getFaces() { return this.faces; }
    getNormals() { return this.normals; }
}





function subdivider (input_mesh) {
    this.meshes = [];
    this.meshes.push(input_mesh);

    this.subdivide = function (level) 
    {
      while(level>=this.meshes.length){
        subIncrease();
      }

      return this.meshes[level];
    };

    this.clear = function (m) {
      this.meshes = [];
    }

    this.subIncrease = function(){
      m = new Mesh()
      m.copyMesh(this.meshes[this.meshes.length-1])

      //set all vertices to not-new
      m.getVertices().forEach(v => {
        v.setNew(false);
      })

      //set all edges to not-split
      m.getEdges().forEach(e => {
        e.setIsSplit(false);
        e.setCrease(1); // new;
      })

      origEdgeLength = m.getEdges().length;
      for(j = 0; j < origEdgeLength; j++){
        this.splitEdge(m.getEdges()[j],m);
      }

      m.getEdges().forEach(e=>{
        if(!e.getIsSplit()){
          this.splitEdge(e,m);
        }
      });

      // Trigger Butterfly Subdivision;
      this.positionSetter(m.getVertices(),m);

      origFaceLength = m.getFaces().length;
      for(j = 0; j<origFaceLength; j++){
        this.cutACorner(m.getFaces()[j],m);
      }

      m.computeNormal()
      this.meshes.push(m);
    }


    this.splitEdge = function(he,mesh){
      if(he.getIsSplit()){
        return;
      }
      l=mesh.getVertices().length;
      vert1 = he.getOrigin();
      vert2 = he.getNext().getOrigin();
      vadd = vert1.getPos().add(vert2.getPos());
      v = mesh.addVertexPos(
        vadd.x()/2,
        vadd.y()/2,
        vadd.z()/2,
        l);
      v.setEdge(he);
      he.setOrigin(v);
      v.setNew(true);


      nhe = mesh.addEdge(vert1,v);
      nhetwin = mesh.addEdge(v,vert1);

      pEdge = he.getPrev();

      he.setPrev(nhe);
      nhe.setNext(he);

      pEdge.setNext(nhe)
      nhe.setPrev(pEdge);

      nhetwin.setNext(he.getTwin().getNext());
      he.getTwin().getNext().setPrev(nhetwin);

      he.getTwin().setNext(nhetwin)
      nhetwin.setPrev(he.getTwin())

      he.setIsSplit(true);
      he.getTwin().setIsSplit(true);
      nhe.setIsSplit(true);
      nhetwin.setIsSplit(true);



    }
    this.cutACorner = function(f,mesh){
      while(!f.isTriangle()){
        while(!(f.getEdge().getOrigin().getNew() || f.getEdge().getNext().getNext().getOrigin().getNew())){
          f.setEdge(f.getEdge().getNext())
        }
          v1 = f.getEdge().getOrigin();
          v2 = f.getEdge().getNext().getOrigin();
          v3 = f.getEdge().getNext().getNext().getOrigin();

          nhe = mesh.addEdge(v3,v1);
          nhe.setIsSplit(true);
          nhe.setPrev(f.getEdge().getNext());
          nhe.setNext(f.getEdge());

          nhetwin = mesh.addEdge(v1,v3);
          nhetwin.setIsSplit(true);
          nhetwin.setPrev(f.getEdge().getPrev());
          nhetwin.setNext(f.getEdge().getNext().getNext());
          nhetwin.setFace(f);

          f.getEdge().getPrev().setNext(nhetwin);
          f.getEdge().getNext().getNext().setPrev(nhetwin);

          f.getEdge().setPrev(nhe);
          f.getEdge().getNext().setNext(nhe);

          mesh.addFaceByVerts(v1,v2,v3);
          f.setEdge(nhetwin.getNext().getNext());
      }
    }

    this.positionSetter = function(vertices, old_mesh){
      this.positionVert = function(vert)
      {
        // Function where subd happens and where edge creases would need to be introduced!
        // Look at gemini ai chat;

        // Return If Vertice Is Old;
        if(vert.isNew == false)
        {
          return;
        };

        while(vert.getEdge().next.origin.getNew()) {
          vert.setEdge(vert.goClockwise1());
        }

        origEdge = vert.getEdge();
        origEdgeTwin = origEdge.getTwin();

        // Check if the edge is creased
        if(0) // origEdge.getCrease()
        {
          // Between the two original vertices of the edge.
          let Left = origEdge.goBack1().origin;
          let Right = origEdgeTwin.origin;

          let sum = Left.getPos().multiply(0.5).add(Right.getPos().multiply(0.5));
          vert.setPos(sum.x(), sum.y(), sum.z());
          return; // Done for creased edge
        };

        topVert = origEdge.next.goStraight1().next.origin
        bottomVert = origEdgeTwin.goStraight1().next.goStraight1().next.origin;

        topRight = origEdge.twin.goClockwise1().goClockwise1().goStraight1().next.origin;
        topLeft = origEdge.goBack1().goAnticlowise1().goAnticlowise1().goStraight1().next.origin;

        bottomRight = origEdgeTwin.goAnticlowise1().goAnticlowise1().goStraight1().next.origin;
        bottomLeft = origEdge.goBack1().goClockwise1().goClockwise1().goStraight1().next.origin;

        Left = origEdge.goBack1().origin;
        Right = origEdgeTwin.origin

        var sum = new Vector3D(0,0,0)
        //console.log(sum.value);

        sum = sum.add(topVert.getPos().multiply(2/16));
        sum = sum.add(bottomVert.getPos().multiply(2/16));
        sum = sum.subtract(topRight.getPos().multiply(1/16));
        sum = sum.subtract(topLeft.getPos().multiply(1/16));
        sum = sum.subtract(bottomRight.getPos().multiply(1/16));
        sum = sum.subtract(bottomLeft.getPos().multiply(1/16));
        sum = sum.add(Left.getPos().multiply(8/16));
        sum = sum.add(Right.getPos().multiply(8/16));
        vert.setPos(sum.x(), sum.y(), sum.z());
        //vert.isNew = false;

      }

      old_verts = old_mesh.getVertices();
      for(j = 0; j < old_verts.length; j++){
        this.positionVert(old_verts[j]);
      }

  }

    return this;
}