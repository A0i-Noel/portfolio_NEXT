'use client';

import { useEffect, useRef } from 'react';
import type p5 from 'p5';

const GalaxyBackground = ({ className = '' }: { className?: string }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);

  useEffect(() => {
    let p5Constructor: typeof import('p5');

    const loadP5 = async () => {
      const p5Module = await import('p5');
      p5Constructor = p5Module.default;

      const stars: Star[] = [];
      const numStars = 12;

      type TrailPoint = { x: number; y: number; z: number; frame: number };
      type Star = {
        angle: number;
        radius: number;
        speed: number;
        orbitType: number;
        size: number;
        brightness: number;
        trailHistory: TrailPoint[];
      };

      const sketch = (p: p5) => {
        p.setup = () => {
          const canvas = p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
          canvas.parent(canvasRef.current!);

          for (let i = 0; i < numStars; i++) {
            stars.push({
              angle: p.random(p.TWO_PI),
              radius: p.random(80, 150),
              speed: p.random(0.01, 0.03),
              orbitType: i % 6,
              size: p.random(4, 10),
              brightness: p.random(150, 255),
              trailHistory: [],
            });
          }
        };

        p.draw = () => {
          p.background(0, 20);

          p.ambientLight(30, 30, 60);
          p.pointLight(255, 255, 255, 0, 0, 200);
          p.rotateY(p.frameCount * 0.002);

          for (const star of stars) {
            star.angle += star.speed;

            let x = 0, y = 0, z = 0;
            switch (star.orbitType) {
              case 0:
                x = p.cos(star.angle) * star.radius;
                y = p.sin(star.angle) * star.radius;
                z = p.sin(star.angle * 2) * 100;
                break;
              case 1:
                x = p.cos(star.angle) * star.radius;
                y = star.radius * 0.5;
                z = p.sin(star.angle) * star.radius;
                break;
              case 2:
                x = p.sin(star.angle) * star.radius;
                y = p.cos(star.angle * 0.5) * star.radius * 0.3;
                z = p.cos(star.angle) * star.radius;
                break;
              case 3:
                x = -p.sin(star.angle) * star.radius;
                y = p.cos(star.angle * 0.7) * star.radius * 0.4;
                z = p.cos(star.angle) * star.radius;
                break;
              case 4:
                x = p.cos(star.angle) * star.radius - p.sin(star.angle) * star.radius * 0.5;
                y = -p.sin(star.angle) * star.radius;
                z = p.cos(star.angle * 1.5) * star.radius * 0.6;
                break;
              case 5:
                x = -p.cos(star.angle) * star.radius + p.sin(star.angle) * star.radius * 0.5;
                y = p.sin(star.angle) * star.radius;
                z = p.sin(star.angle * 1.3) * star.radius * 0.7;
                break;
            }

            star.trailHistory.push({ x, y, z, frame: p.frameCount });
            star.trailHistory = star.trailHistory.filter(tp => p.frameCount - tp.frame < 60);

            if (star.trailHistory.length > 1) {
              for (let i = 1; i < star.trailHistory.length; i++) {
                const prev = star.trailHistory[i - 1];
                const curr = star.trailHistory[i];
                const age = p.frameCount - curr.frame;
                const alpha = p.map(age, 0, 60, 255, 0);
                p.stroke(255, 255, 255, alpha);
                p.strokeWeight(p.map(age, 0, 60, 3, 0.5));
                p.line(prev.x, prev.y, prev.z, curr.x, curr.y, curr.z);
              }
            }

            p.push();
            p.translate(x, y, z);
            p.fill(star.brightness, star.brightness, 255, 180);
            p.noStroke();
            p.sphere(star.size);

            p.fill(star.brightness, star.brightness, 255, 50);
            p.sphere(star.size * 2);
            p.pop();
          }

          for (let i = 0; i < 50; i++) {
            p.push();
            const bgX = p.random(-1000, 1000);
            const bgY = p.random(-1000, 1000);
            const bgZ = p.random(-800, -400);
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

      if (canvasRef.current) {
        p5InstanceRef.current = new p5Constructor(sketch);
      }
    };

    loadP5();

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
      className={`${className}`}
      style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
    />
  );
};

export default GalaxyBackground;
