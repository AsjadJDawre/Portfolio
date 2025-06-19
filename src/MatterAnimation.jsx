import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import Matter from 'matter-js';

const MatterAnimation = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const runnerRef = useRef(null);

  // Memoize the physics engine configuration
  const engineConfig = useMemo(() => ({
    gravity: { x: 0, y: 0 },
    timing: { timeScale: 1 },
    constraintIterations: 2,
    positionIterations: 6,
    velocityIterations: 4
  }), []);

  // Memoize the renderer configuration
  const renderConfig = useMemo(() => ({
    wireframes: false,
    background: 'transparent',
    showSleeping: false,
    showDebug: false,
    showBroadphase: false,
    showBounds: false,
    showVelocity: false,
    showCollisions: false,
    showSeparations: false,
    showAxes: false,
    showPositions: false,
    showAngleIndicator: false,
    showIds: false,
    showShadows: false,
    showVertexNumbers: false,
    showConvexHulls: false,
    showInternalEdges: false,
    showMousePosition: false
  }), []);

  // Memoize the body creation function
  const createBodies = useCallback((render, Common, World, engine) => {
    const bodies = [];
    const bodyCount = 60;
    const circleCount = 30;

    // Create polygons
    for (let i = 0; i < bodyCount; i++) {
      const x = Common.random(0, render.options.width);
      const y = Common.random(0, render.options.height);
      const s = Common.random(10, 80);
      const body = Matter.Bodies.polygon(x, y, Common.random(3, 6), s, {
        mass: s / 20,
        friction: 0,
        restitution: 0.6,
        render: { fillStyle: '#222222', strokeStyle: '#000', lineWidth: 2 },
        sleepThreshold: 60
      });
      bodies.push(body);
      World.add(engine.world, body);
    }

    // Create circles
    for (let i = 0; i < circleCount; i++) {
      const x = Common.random(0, render.options.width);
      const y = Common.random(0, render.options.height);
      const radius = Common.random(5, 25);
      const circle = Matter.Bodies.circle(x, y, radius, {
        mass: radius / 30,
        friction: 1,
        restitution: 0.6,
        render: { fillStyle: '#333334', strokeStyle: '#000', lineWidth: 2 },
        sleepThreshold: 60
      });
      bodies.push(circle);
      World.add(engine.world, circle);
    }

    return bodies;
  }, []);

  // Memoize the mouse interaction handler
  const handleMouseInteraction = useCallback((engine, mouse, bodies, attractiveBody) => {
    if (!mouse.position.x) return;

    const forceMultiplier = 0.00001;
    const attractiveForceMultiplier = 0.00007;

    bodies.forEach(body => {
      const forceX = (mouse.position.x - body.position.x) * forceMultiplier;
      const forceY = (mouse.position.y - body.position.y) * forceMultiplier;
      Matter.Body.applyForce(body, body.position, { x: forceX, y: forceY });
    });

    const forceX = (mouse.position.x - attractiveBody.position.x) * attractiveForceMultiplier;
    const forceY = (mouse.position.y - attractiveBody.position.y) * attractiveForceMultiplier;
    Matter.Body.applyForce(attractiveBody, attractiveBody.position, { x: forceX, y: forceY });
  }, []);

  // Memoize the resize handler
  const handleResize = useCallback((container, render) => {
    const { width, height } = container.getBoundingClientRect();
    render.canvas.width = width;
    render.canvas.height = height;
    render.options.width = width;
    render.options.height = height;
    Matter.Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: width, y: height },
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create engine with optimized settings
    const engine = Matter.Engine.create(engineConfig);
    engineRef.current = engine;

    // Create renderer with optimized settings
    const render = Matter.Render.create({
      element: container,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        ...renderConfig,
        width: container.clientWidth,
        height: container.clientHeight,
      },
    });
    renderRef.current = render;

    // Create attractive body
    const attractiveBody = Matter.Bodies.circle(
      render.options.width / 2,
      render.options.height / 2,
      Math.max(render.options.width / 25, render.options.height / 25) / 2,
      { 
        render: { fillStyle: '#000' },
        isStatic: true
      }
    );
    Matter.World.add(engine.world, attractiveBody);

    // Create bodies
    const bodies = createBodies(render, Matter.Common, Matter.World, engine);

    // Set up mouse interaction
    const mouse = Matter.Mouse.create(render.canvas);
    Matter.Events.on(engine, 'afterUpdate', () => 
      handleMouseInteraction(engine, mouse, bodies, attractiveBody)
    );

    // Run the engine and renderer
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    // Set up resize handler
    const resizeHandler = () => handleResize(container, render);
    window.addEventListener('resize', resizeHandler);
    resizeHandler();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeHandler);
      Matter.Runner.stop(runner);
      Matter.Render.stop(render);
      Matter.World.clear(engine.world);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [engineConfig, renderConfig, createBodies, handleMouseInteraction, handleResize]);

  return (
    <div
      ref={containerRef}
      style={{
        top:'10%',
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default React.memo(MatterAnimation);