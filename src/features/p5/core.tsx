'use client';

import { useEffect, useRef } from 'react';

const GalaxyBackground = ({ className = '' }) => {
  const canvasRef = useRef(null);
  const p5InstanceRef = useRef(null);

  useEffect(() => {
    let p5;
    
    const loadP5 = async () => {
      // Dynamically import p5.js to avoid SSR issues
      const p5Module = await import('p5');
      p5 = p5Module.default;
      
      let stars = [];
      let numStars = 12;
      let trailPoints = []; // Store trail points for persistent trails

      const sketch = (p) => {
        p.setup = () => {
          const canvas = p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
          canvas.parent(canvasRef.current);
          
          // Create orbiting stars with different orbital patterns (very central)
          for (let i = 0; i < numStars; i++) {
            stars.push({
              angle: p.random(p.TWO_PI),
              radius: p.random(80, 150), // Much closer to center
              speed: p.random(0.01, 0.03),
              orbitType: i % 6, // 6 different orbit patterns
              size: p.random(4, 10),
              brightness: p.random(150, 255),
              trailHistory: [] // Store recent positions for this star
            });
          }
          
          // Initialize trail points array
          trailPoints = [];
        };

        p.draw = () => {
          p.background(5, 5, 20);
          
          // Add some ambient light
          p.ambientLight(30, 30, 60);
          p.pointLight(255, 255, 255, 0, 0, 200);
          
          // Rotate the entire scene slowly
          p.rotateY(p.frameCount * 0.002);
          
          // Update and draw orbiting stars
          for (let starIndex = 0; starIndex < stars.length; starIndex++) {
            let star = stars[starIndex];
            star.angle += star.speed;
            
            let x, y, z;
            
            // Different orbital patterns
            switch(star.orbitType) {
              case 0: // Front to bottom
                x = p.cos(star.angle) * star.radius;
                y = p.sin(star.angle) * star.radius;
                z = p.sin(star.angle * 2) * 100;
                break;
              case 1: // Bottom to front to back
                x = p.cos(star.angle) * star.radius;
                y = star.radius * 0.5;
                z = p.sin(star.angle) * star.radius;
                break;
              case 2: // Right to front to back
                x = p.sin(star.angle) * star.radius;
                y = p.cos(star.angle * 0.5) * star.radius * 0.3;
                z = p.cos(star.angle) * star.radius;
                break;
              case 3: // Left to front to back
                x = -p.sin(star.angle) * star.radius;
                y = p.cos(star.angle * 0.7) * star.radius * 0.4;
                z = p.cos(star.angle) * star.radius;
                break;
              case 4: // Top right to front to bottom left
                x = p.cos(star.angle) * star.radius - p.sin(star.angle) * star.radius * 0.5;
                y = -p.sin(star.angle) * star.radius;
                z = p.cos(star.angle * 1.5) * star.radius * 0.6;
                break;
              case 5: // Bottom left to front to top right
                x = -p.cos(star.angle) * star.radius + p.sin(star.angle) * star.radius * 0.5;
                y = p.sin(star.angle) * star.radius;
                z = p.sin(star.angle * 1.3) * star.radius * 0.7;
                break;
            }
            
            // Add current position to trail history
            star.trailHistory.push({ x, y, z, frame: p.frameCount });
            
            // Keep only recent trail points (last 60 frames = ~1 second at 60fps)
            star.trailHistory = star.trailHistory.filter(point => p.frameCount - point.frame < 60);
            
            // Draw persistent white trail
            if (star.trailHistory.length > 1) {
              for (let i = 1; i < star.trailHistory.length; i++) {
                let current = star.trailHistory[i];
                let previous = star.trailHistory[i - 1];
                
                // Calculate fade based on age
                let age = p.frameCount - current.frame;
                let alpha = p.map(age, 0, 60, 255, 0);
                
                p.stroke(255, 255, 255, alpha);
                p.strokeWeight(p.map(age, 0, 60, 3, 0.5));
                p.line(previous.x, previous.y, previous.z, current.x, current.y, current.z);
              }
            }
            
            // Draw star
            p.push();
            p.translate(x, y, z);
            p.fill(star.brightness, star.brightness, 255, 180);
            p.noStroke();
            p.sphere(star.size);
            
            // Add star glow effect
            p.fill(star.brightness, star.brightness, 255, 50);
            p.sphere(star.size * 2);
            p.pop();
          }
          
          // Add some distant background stars
          for (let i = 0; i < 50; i++) {
            p.push();
            let bgX = p.random(-1000, 1000);
            let bgY = p.random(-1000, 1000);
            let bgZ = p.random(-800, -400);
            p.translate(bgX, bgY, bgZ);
            p.fill(255, 255, 255, p.random(50, 150));
            p.noStroke();
            p.sphere(p.random(1, 3));
            p.pop();
          }
        };

        p.windowResized = () => {
          p.resizeCanvas(window.innerWidth, window.innerHeight);
        };
      };

      p5InstanceRef.current = new p5(sketch);
    };

    loadP5();

    // Cleanup function
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={canvasRef} 
      className={`fixed inset-0 -z-10 ${className}`}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
      }}
    />
  );
};

export default GalaxyBackground;