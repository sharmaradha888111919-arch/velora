import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { SHOWROOM_HOTSPOTS } from '../data/products';
import { Hotspot } from '../types';
import { ArrowRight, RotateCw, Sparkles, X, Eye, Maximize2 } from 'lucide-react';

interface InteractiveShowroom3DProps {
  onSelectProduct?: (productName: string) => void;
  onExploreCollection?: () => void;
  heightClass?: string;
  isFullExperience?: boolean;
}

export const InteractiveShowroom3D: React.FC<InteractiveShowroom3DProps> = ({
  onSelectProduct,
  onExploreCollection,
  heightClass = 'h-[620px] sm:h-[720px]',
  isFullExperience = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [screenHotspots, setScreenHotspots] = useState<
    { id: string; x: number; y: number; visible: boolean; data: Hotspot }[]
  >([]);
  const [isRotating, setIsRotating] = useState(true);
  const [webGlSupported, setWebGlSupported] = useState(true);

  const isRotatingRef = useRef(isRotating);
  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  // Scene references for interaction
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsState = useRef({
    isMouseDown: false,
    prevMouseX: 0,
    prevMouseY: 0,
    targetRotationY: 0,
    targetRotationX: 0,
    currentRotationY: 0,
    currentRotationX: 0,
  });

  useEffect(() => {
    // Check WebGL
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    if (!containerRef.current) return;
    const container = containerRef.current;
    const isMobile = window.innerWidth < 768;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c0c0e);
    scene.fog = new THREE.Fog(0x0c0c0e, 8, 22);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.6, 7.2);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.2 : 1.75));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x282732, 2.0);
    scene.add(ambientLight);

    // Architectural Spotlights
    const mainSpot = new THREE.SpotLight(0xf7ecd7, 5, 20, Math.PI / 4, 0.4, 1.2);
    mainSpot.position.set(0, 7, 3);
    scene.add(mainSpot);

    const leftSpot = new THREE.SpotLight(0xcbb38d, 4, 18, Math.PI / 5, 0.5, 1.5);
    leftSpot.position.set(-5, 6, 2);
    scene.add(leftSpot);

    const rightSpot = new THREE.SpotLight(0x8fa4c2, 3.5, 18, Math.PI / 5, 0.5, 1.5);
    rightSpot.position.set(5, 6, 2);
    scene.add(rightSpot);

    // Central Showroom Rotunda Group
    const rotundaGroup = new THREE.Group();
    scene.add(rotundaGroup);

    // Reflective Polished Floor
    const floorGeo = new THREE.CircleGeometry(10, 64);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0e0e12,
      roughness: 0.22,
      metalness: 0.85,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.2;
    scene.add(floor);

    // Concentric gold inlay floor rings
    for (let r of [3.2, 5.5, 7.8]) {
      const ringGeo = new THREE.RingGeometry(r, r + 0.03, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xcbb38d,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = -1.19;
      scene.add(ring);
    }

    // Three Main Fashion Display Pedestals
    const pedestalLocations: [number, number, number][] = [
      [-2.2, 0.4, 0.5], // Left: The Signature
      [0, 0.8, -0.8],   // Center: The Essentials
      [2.2, 0.5, 0.6],  // Right: The Atelier
    ];

    const pedestalMeshes: THREE.Group[] = [];

    pedestalLocations.forEach((pos, idx) => {
      const pGroup = new THREE.Group();
      pGroup.position.set(pos[0], -1.2, pos[2]);

      // Cylinder Base
      const baseGeo = new THREE.CylinderGeometry(0.85, 0.95, 1.0, 32);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x16161c,
        roughness: 0.3,
        metalness: 0.4,
      });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.position.y = 0.5;
      pGroup.add(base);

      // Gold Trim Ring
      const trimGeo = new THREE.TorusGeometry(0.86, 0.015, 16, 32);
      const trimMat = new THREE.MeshStandardMaterial({
        color: 0xcbb38d,
        metalness: 0.9,
        roughness: 0.2,
      });
      const trim = new THREE.Mesh(trimGeo, trimMat);
      trim.rotation.x = Math.PI / 2;
      trim.position.y = 1.0;
      pGroup.add(trim);

      // Glass Showcase Bell/Panel
      const glassGeo = new THREE.CylinderGeometry(0.8, 0.8, 1.8, 32, 1, true);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.9,
        opacity: 0.35,
        transparent: true,
        roughness: 0.1,
        ior: 1.5,
      });
      const glass = new THREE.Mesh(glassGeo, glassMat);
      glass.position.y = 1.9;
      pGroup.add(glass);

      // Distinct Sculptural Display Form inside glass
      let sculptureGeo: THREE.BufferGeometry;
      if (idx === 0) {
        // Velvet Form sculpture
        sculptureGeo = new THREE.TorusKnotGeometry(0.38, 0.12, 64, 16, 2, 3);
      } else if (idx === 1) {
        // Noir Overshirt drape form
        sculptureGeo = new THREE.IcosahedronGeometry(0.48, 1);
      } else {
        // Atelier Silk kinetic helix
        sculptureGeo = new THREE.OctahedronGeometry(0.5, 0);
      }

      const sculptureMat = new THREE.MeshStandardMaterial({
        color: idx === 0 ? 0x24242d : idx === 1 ? 0x141416 : 0xd2c0a5,
        roughness: 0.25,
        metalness: 0.7,
      });
      const sculpture = new THREE.Mesh(sculptureGeo, sculptureMat);
      sculpture.position.y = 1.9;
      pGroup.add(sculpture);

      // Floating Hotspot Beacon Marker
      const beaconGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: 0xe6d5b8,
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.y = 3.0;
      pGroup.add(beacon);

      rotundaGroup.add(pGroup);
      pedestalMeshes.push(pGroup);
    });

    // Ambient floating particles
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = Math.random() * 5 - 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xcbb38d,
      size: 0.035,
      transparent: true,
      opacity: 0.5,
    });
    const showroomParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(showroomParticles);

    // Mouse Drag Rotation
    const onMouseDown = (e: MouseEvent) => {
      controlsState.current.isMouseDown = true;
      controlsState.current.prevMouseX = e.clientX;
      controlsState.current.prevMouseY = e.clientY;
      setIsRotating(false);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!controlsState.current.isMouseDown) return;
      const deltaX = e.clientX - controlsState.current.prevMouseX;
      const deltaY = e.clientY - controlsState.current.prevMouseY;

      controlsState.current.targetRotationY += deltaX * 0.005;
      controlsState.current.targetRotationX = Math.max(
        -0.2,
        Math.min(0.35, controlsState.current.targetRotationX + deltaY * 0.003)
      );

      controlsState.current.prevMouseX = e.clientX;
      controlsState.current.prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      controlsState.current.isMouseDown = false;
    };

    const canvasElement = renderer.domElement;
    canvasElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch Drag for Mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        controlsState.current.isMouseDown = true;
        controlsState.current.prevMouseX = e.touches[0].clientX;
        controlsState.current.prevMouseY = e.touches[0].clientY;
        setIsRotating(false);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!controlsState.current.isMouseDown || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - controlsState.current.prevMouseX;
      controlsState.current.targetRotationY += deltaX * 0.006;
      controlsState.current.prevMouseX = e.touches[0].clientX;
      controlsState.current.prevMouseY = e.touches[0].clientY;
    };

    canvasElement.addEventListener('touchstart', onTouchStart, { passive: true });
    canvasElement.addEventListener('touchmove', onTouchMove, { passive: true });
    canvasElement.addEventListener('touchend', onMouseUp);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Auto rotation if not interacting
      if (isRotatingRef.current) {
        controlsState.current.targetRotationY += 0.0025;
      }

      // Smooth interpolation
      controlsState.current.currentRotationY +=
        (controlsState.current.targetRotationY - controlsState.current.currentRotationY) * 0.06;
      controlsState.current.currentRotationX +=
        (controlsState.current.targetRotationX - controlsState.current.currentRotationX) * 0.06;

      rotundaGroup.rotation.y = controlsState.current.currentRotationY;
      rotundaGroup.rotation.x = controlsState.current.currentRotationX;

      // Rotate internal pedestal sculptures
      pedestalMeshes.forEach((pGroup, idx) => {
        const sculpture = pGroup.children[3];
        if (sculpture) {
          sculpture.rotation.y += (idx + 1) * 0.006;
          sculpture.rotation.x = Math.sin(elapsedTime + idx) * 0.1;
        }
      });

      // Project 3D Hotspot positions to 2D screen coordinates
      const tempV = new THREE.Vector3();
      const updatedScreenSpots = SHOWROOM_HOTSPOTS.map((hotspot, idx) => {
        const pos = pedestalLocations[idx];
        // Calculate world position taking rotundaGroup rotation into account
        tempV.set(pos[0], pos[1] + 1.2, pos[2]);
        tempV.applyEuler(rotundaGroup.rotation);
        tempV.project(camera);

        const isBehind = tempV.z > 1;
        const x = (tempV.x * 0.5 + 0.5) * container.clientWidth;
        const y = (-(tempV.y * 0.5) + 0.5) * container.clientHeight;

        return {
          id: hotspot.id,
          x,
          y,
          visible: !isBehind && x > 20 && x < container.clientWidth - 20,
          data: hotspot,
        };
      });

      setScreenHotspots(updatedScreenSpots);

      renderer.render(scene, camera);
    };

    // WebGL Context Lost safety handler
    const onContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(animationFrameId);
    };
    const onContextRestored = () => {
      animate();
    };
    canvasElement.addEventListener('webglcontextlost', onContextLost);
    canvasElement.addEventListener('webglcontextrestored', onContextRestored);

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvasElement.removeEventListener('webglcontextlost', onContextLost);
      canvasElement.removeEventListener('webglcontextrestored', onContextRestored);
      canvasElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvasElement.removeEventListener('touchstart', onTouchStart);
      canvasElement.removeEventListener('touchmove', onTouchMove);
      canvasElement.removeEventListener('touchend', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      
      // Deep traverse and dispose all geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((mat) => mat.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      floorGeo.dispose();
      floorMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  const handleResetCamera = () => {
    controlsState.current.targetRotationY = 0;
    controlsState.current.targetRotationX = 0;
    setIsRotating(true);
  };

  const handleHotspotClick = (spot: Hotspot) => {
    setActiveHotspot(spot);
    setIsRotating(false);
  };

  if (!webGlSupported) {
    return (
      <div className={`relative w-full ${heightClass} bg-[#0e0e13] border border-[#cbb38d]/20 rounded-2xl flex flex-col items-center justify-center p-8 text-center`}>
        <Sparkles className="w-10 h-10 text-[#cbb38d] mb-4" />
        <h3 className="text-2xl font-serif text-[#f5f2eb] mb-2">VELORA VIRTUAL SHOWROOM</h3>
        <p className="text-sm text-[#9c9a94] max-w-md mb-6">
          Experience our architectural gallery space featuring curations from The Signature, The Essentials, and The Atelier.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
          {SHOWROOM_HOTSPOTS.map((spot) => (
            <div
              key={spot.id}
              onClick={() => handleHotspotClick(spot)}
              className="p-4 bg-[#16161e] border border-[#cbb38d]/15 rounded-xl hover:border-[#cbb38d]/50 cursor-pointer transition-all"
            >
              <h4 className="font-serif text-lg text-[#e6d5b8] mb-1">{spot.title}</h4>
              <p className="text-xs text-[#8a8882] mb-3">{spot.subtitle}</p>
              <span className="text-[11px] tracking-wider text-[#dfccad] uppercase flex items-center justify-center gap-1">
                EXPLORE <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${heightClass} overflow-hidden rounded-2xl border border-[#cbb38d]/15 bg-[#0c0c0e] select-none group`}>
      {/* 3D Canvas Mount */}
      <div
        id="showroom-3d-canvas"
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Floating 3D Hotspots overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {screenHotspots.map((spot) => {
          if (!spot.visible) return null;
          const isSelected = activeHotspot?.id === spot.id;

          return (
            <div
              key={spot.id}
              style={{
                transform: `translate3d(${spot.x}px, ${spot.y}px, 0)`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-transform duration-75"
            >
              <button
                id={`hotspot-btn-${spot.id}`}
                onClick={() => handleHotspotClick(spot.data)}
                className="group/btn relative flex items-center justify-center focus:outline-none"
                aria-label={`View ${spot.data.title}`}
              >
                {/* Pulsing ring */}
                <span className="absolute w-8 h-8 rounded-full border border-[#dfccad] animate-ping opacity-40" />
                <span className="absolute w-10 h-10 rounded-full border border-[#cbb38d]/20 bg-[#cbb38d]/5 group-hover/btn:scale-125 transition-transform" />

                {/* Core button */}
                <span className="w-5 h-5 rounded-full bg-[#dfccad] flex items-center justify-center text-[#0c0c0e] shadow-[0_0_15px_rgba(223,204,173,0.8)]">
                  <span className="w-2 h-2 rounded-full bg-[#0c0c0e]" />
                </span>

                {/* Hotspot Floating Label Tag */}
                <span className="absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#121217]/90 backdrop-blur-md border border-[#dfccad]/25 px-3 py-1.5 rounded-md text-[11px] font-sans tracking-[0.15em] text-[#e6d5b8] shadow-lg flex items-center gap-2 group-hover/btn:border-[#dfccad] transition-all">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dfccad]" />
                  {spot.data.title}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Showroom Top Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-[#121217]/80 backdrop-blur-md border border-[#cbb38d]/20 px-3 py-1.5 rounded-full pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono tracking-wider text-[#d4c5a9]">
            3D DIGITAL ATELIER • ROTATE TO EXPLORE
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            id="showroom-rotate-toggle"
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2 rounded-full border text-xs flex items-center gap-1.5 backdrop-blur-md transition-all ${
              isRotating
                ? 'bg-[#cbb38d]/20 border-[#cbb38d] text-[#e6d5b8]'
                : 'bg-[#14141a]/80 border-[#333] text-[#888] hover:text-[#eee]'
            }`}
            title="Toggle Auto Rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline text-[10px] tracking-widest font-mono">
              {isRotating ? 'AUTO-PAN ON' : 'PAUSED'}
            </span>
          </button>

          <button
            id="showroom-reset-cam"
            onClick={handleResetCamera}
            className="p-2 rounded-full bg-[#14141a]/80 border border-[#333] text-[#999] hover:text-[#e6d5b8] hover:border-[#cbb38d]/40 transition-colors"
            title="Reset Perspective"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Selected Hotspot Modal Card */}
      <AnimatePresence>
        {activeHotspot && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-96 p-5 bg-[#121217]/95 backdrop-blur-xl border border-[#dfccad]/30 rounded-xl shadow-2xl z-30"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#cbb38d] uppercase">
                  SPOTLIGHT DISPLAY
                </span>
                <h3 className="font-serif text-2xl text-[#f4eee2] leading-tight">
                  {activeHotspot.title}
                </h3>
                <p className="text-xs text-[#a39f97] font-sans">{activeHotspot.subtitle}</p>
              </div>
              <button
                id="close-hotspot-card"
                onClick={() => setActiveHotspot(null)}
                className="p-1 rounded-full text-[#777] hover:text-[#fff] hover:bg-[#222]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Preview Image */}
            <div className="relative h-36 w-full rounded-lg overflow-hidden mb-3 border border-[#333]">
              <img
                src={activeHotspot.image}
                alt={activeHotspot.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e]/90 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px]">
                <span className="text-[#f5f2eb] font-serif tracking-wide">
                  {activeHotspot.featuredProduct}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#bbb8b0] leading-relaxed mb-4">
              {activeHotspot.description}
            </p>

            <div className="flex items-center gap-2">
              <button
                id="hotspot-view-product"
                onClick={() => {
                  if (onSelectProduct) onSelectProduct(activeHotspot.featuredProduct);
                  setActiveHotspot(null);
                }}
                className="flex-1 py-2 px-3 rounded-lg bg-[#cbb38d] text-[#0c0c0e] text-xs font-medium tracking-wider uppercase hover:bg-[#dfccad] transition-colors flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" /> Quick View
              </button>
              {onExploreCollection && (
                <button
                  id="hotspot-explore-full"
                  onClick={() => {
                    onExploreCollection();
                    setActiveHotspot(null);
                  }}
                  className="py-2 px-3 rounded-lg border border-[#cbb38d]/40 text-[#dfccad] hover:bg-[#cbb38d]/10 text-xs font-medium tracking-wider uppercase transition-colors"
                >
                  Collection &rarr;
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
