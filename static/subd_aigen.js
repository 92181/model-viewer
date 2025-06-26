/**
 * Modified Butterfly Subdivision Scheme
 * @param {Array} vertices - Array of vertex positions, e.g. [[x, y, z], ...]
 * @param {Array} faces - Array of faces, each as array of 3 vertex indices, e.g. [[0,1,2], ...]
 * @param {Array} normals - Array of vertex normals, e.g. [[nx, ny, nz], ...]
 * @returns {{vertices: Array, faces: Array, normals: Array}}
 */
function modifiedButterflySubdivision(vertices, faces, normals) {
    const newVertices = vertices.map(v => v.slice());
    const newNormals = normals.map(n => n.slice());
    const edgeMap = new Map();
    const faceAdj = new Map();

    // Helper to get edge key
    function edgeKey(a, b) {
        return a < b ? `${a}_${b}` : `${b}_${a}`;
    }

    // Build edge map and face adjacency
    faces.forEach((face, fi) => {
        for (let i = 0; i < 3; i++) {
            const a = face[i];
            const b = face[(i + 1) % 3];
            const key = edgeKey(a, b);
            if (!edgeMap.has(key)) edgeMap.set(key, []);
            edgeMap.get(key).push(fi);

            // Build adjacency for each vertex
            if (!faceAdj.has(a)) faceAdj.set(a, []);
            faceAdj.get(a).push(fi);
        }
    });

    // Store new vertex indices for each edge
    const edgeVertexMap = new Map();

    // Compute new vertices on each edge
    edgeMap.forEach((adjFaces, key) => {
        const [a, b] = key.split('_').map(Number);

        // Find opposite vertices in adjacent faces
        let opp = [];
        adjFaces.forEach(fi => {
            const face = faces[fi];
            for (let i = 0; i < 3; i++) {
                const v = face[i];
                if (v !== a && v !== b) opp.push(v);
            }
        });

        // Modified Butterfly weights
        let newPos = [0, 0, 0];
        let newNorm = [0, 0, 0];

        function addWeighted(vIdx, weight) {
            for (let i = 0; i < 3; i++) {
                newPos[i] += vertices[vIdx][i] * weight;
                newNorm[i] += normals[vIdx][i] * weight;
            }
        }

        if (opp.length === 2) {
            // Interior edge
            addWeighted(a, 0.5);
            addWeighted(b, 0.5);
            addWeighted(opp[0], 0.125);
            addWeighted(opp[1], 0.125);

            // Find 2 more neighbors for each opp vertex
            for (let j = 0; j < 2; j++) {
                const v = opp[j];
                const adj = faceAdj.get(v).filter(fi => !adjFaces.includes(fi));
                let found = 0;
                for (let fi of adj) {
                    const face = faces[fi];
                    for (let i = 0; i < 3; i++) {
                        const u = face[i];
                        if (u !== v && u !== a && u !== b && !opp.includes(u)) {
                            addWeighted(u, -0.0625);
                            found++;
                            if (found === 2) break;
                        }
                    }
                    if (found === 2) break;
                }
            }
        } else {
            // Boundary edge: simple midpoint
            addWeighted(a, 0.5);
            addWeighted(b, 0.5);
        }

        // Normalize normal
        const len = Math.hypot(...newNorm);
        if (len > 0) newNorm = newNorm.map(x => x / len);

        const idx = newVertices.length;
        newVertices.push(newPos);
        newNormals.push(newNorm);
        edgeVertexMap.set(key, idx);
    });

    // Build new faces
    const newFaces = [];
    faces.forEach(face => {
        const [a, b, c] = face;
        const ab = edgeVertexMap.get(edgeKey(a, b));
        const bc = edgeVertexMap.get(edgeKey(b, c));
        const ca = edgeVertexMap.get(edgeKey(c, a));

        newFaces.push([a, ab, ca]);
        newFaces.push([ab, b, bc]);
        newFaces.push([ca, bc, c]);
        newFaces.push([ab, bc, ca]);
    });

    return {
        vertices: newVertices,
        faces: newFaces,
        normals: newNormals
    };
}

// Export for use in browser or Node.js
if (typeof module !== 'undefined') module.exports = modifiedButterflySubdivision;