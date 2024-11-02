import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const MatterAnimation = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          World = Matter.World,
          Bodies = Matter.Bodies,
          Mouse = Matter.Mouse,
          Events = Matter.Events,
          Common = Matter.Common;

    // Create engine
    const engine = Engine.create();
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;

    // Create renderer inside container
    const render = Render.create({
      element: container,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        width: container.clientWidth,
        height: container.clientHeight,
        wireframes: false,
        background: 'transparent',
      },
    });

    // Create attractive body and other bodies
    const attractiveBody = Bodies.circle(
      render.options.width / 2,
      render.options.height / 2,
      Math.max(render.options.width / 25, render.options.height / 25) / 2,
      { render: { fillStyle: '#000' } }
    );
    World.add(engine.world, attractiveBody);

    const bodies = [];
    for (let i = 0; i < 60; i++) {
      const x = Common.random(0, render.options.width);
      const y = Common.random(0, render.options.height);
      const s = Common.random(10, 80);
      const body = Bodies.polygon(x, y, Common.random(3, 6), s, {
        mass: s / 20,
        friction: 0,
        render: { fillStyle: '#222222', strokeStyle: '#000', lineWidth: 2 },
      });
      bodies.push(body);
      World.add(engine.world, body);
    }

    for (let i = 0; i < 30; i++) {
      const x = Common.random(0, render.options.width);
      const y = Common.random(0, render.options.height);
      const radius = Common.random(5, 25);
      const circle = Bodies.circle(x, y, radius, {
        mass: radius / 30,
        friction: 1,
        render: { fillStyle: '#333334', strokeStyle: '#000', lineWidth: 2 },
      });
      bodies.push(circle);
      World.add(engine.world, circle);
    }

    const mouse = Mouse.create(render.canvas);
    Events.on(engine, 'afterUpdate', () => {
      if (!mouse.position.x) return;

      bodies.forEach(body => {
        const forceX = (mouse.position.x - body.position.x) * 0.00001;
        const forceY = (mouse.position.y - body.position.y) * 0.00001;
        Matter.Body.applyForce(body, body.position, { x: forceX, y: forceY });
      });

      const forceX = (mouse.position.x - attractiveBody.position.x) * 0.00007;
      const forceY = (mouse.position.y - attractiveBody.position.y) * 0.00007;
      Matter.Body.applyForce(attractiveBody, attractiveBody.position, { x: forceX, y: forceY });
    });

    // Run the engine and renderer
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Resize event to adapt to container size
    const handleResize = () => {
      render.options.width = container.clientWidth;
      render.options.height = container.clientHeight;
      Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: container.clientWidth, y: container.clientHeight },
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      Matter.Runner.stop(runner);
      Matter.Render.stop(render);
      Matter.World.clear(engine.world);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height:  '100vh',
        position: 'relative',
        overflow: 'hidden',
        // zIndex: -1,
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
  
};

export default MatterAnimation;
