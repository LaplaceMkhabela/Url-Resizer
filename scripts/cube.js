const canvas = document.getElementById('cubeCanvas');
        const ctx = canvas.getContext('2d');
        
        // Cube parameters
        const size = 20;
        let angle = 0;
        
        // Cube vertices (3D coordinates)
        const vertices = [
            [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
        ];
        
        // Cube edges (vertex indices)
        const edges = [
            [0, 1], [1, 2], [2, 3], [3, 0], // back face
            [4, 5], [5, 6], [6, 7], [7, 4], // front face
            [0, 4], [1, 5], [2, 6], [3, 7]  // connecting edges
        ];
        
        function projectVertex(vertex) {
            // Simple 3D to 2D projection
            const scale = 1 / (2 + vertex[2]);
            const x = vertex[0] * size * scale;
            const y = vertex[1] * size * scale;
            return [x + canvas.width/2, y + canvas.height/2];
        }
        
        function rotateVertex(vertex, angleX, angleY) {
            // Rotate around X axis
            const cosX = Math.cos(angleX);
            const sinX = Math.sin(angleX);
            const y1 = vertex[1] * cosX - vertex[2] * sinX;
            const z1 = vertex[1] * sinX + vertex[2] * cosX;
            
            // Rotate around Y axis
            const cosY = Math.cos(angleY);
            const sinY = Math.sin(angleY);
            const x2 = vertex[0] * cosY + z1 * sinY;
            const z2 = -vertex[0] * sinY + z1 * cosY;
            
            return [x2, y1, z2];
        }
        
        function animate() {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Rotate cube
            angle += 0.02;
            const rotatedVertices = vertices.map(v => rotateVertex(v, angle, angle * 0.7));
            
            // Project vertices to 2D
            const projectedVertices = rotatedVertices.map(projectVertex);
            
            // Draw edges
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            edges.forEach(edge => {
                const [i1, i2] = edge;
                const [x1, y1] = projectedVertices[i1];
                const [x2, y2] = projectedVertices[i2];
                
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
            });
            
            ctx.stroke();
            
            requestAnimationFrame(animate);
        }
        
        animate();
