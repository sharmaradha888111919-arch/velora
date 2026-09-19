import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Hero3DSceneProps {
  scrollY?: number;
}

export const Hero3DScene: React.FC<Hero3DSceneProps> = ({ scrollY = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);
  const [isLowPower, setIsLowPower] = useState<boolean>(false);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
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
    setIsLowPower(isMobile);

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0b0e, 0.08);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.2, 5.2);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.2 : 1.75));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 4. Lighting setup (Luxury Fashion Studio Lighting)
    const ambientLight = new THREE.AmbientLight(0x23222a, 1.8);
    scene.add(ambientLight);

    // Warm Key Light
    const keyLight = new THREE.DirectionalLight(0xf5e3c8, 3.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Cool Metallic Rim Light
    const rimLight = new THREE.DirectionalLight(0x7c94b8, 2.5);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    // Dramatic overhead spotlight
    const spotLight = new THREE.SpotLight(0xcbb38d, 4.0, 15, Math.PI / 4, 0.45, 1.2);
    spotLight.position.set(0, 6, 2);
    scene.add(spotLight);

    // 5. Fashion Showroom Centerpiece (Sculptural Mannequin Silhouette / Flowing Draped Form)
    const fashionGroup = new THREE.Group();
    scene.add(fashionGroup);

    // Main draped torso form - Torus knot with custom proportions resembling structured atelier fabric
    const drapeGeometry = new THREE.TorusKnotGeometry(1.05, 0.32, isMobile ? 80 : 160, isMobile ? 24 : 48, 2, 3);
    const luxuryMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x141419,
      roughness: 0.35,
      metalness: 0.15,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      reflectivity: 0.9,
      sheen: 1.0,
      sheenColor: new THREE.Color(0xd6c2a5),
      sheenRoughness: 0.3,
    });
    const drapeMesh = new THREE.Mesh(drapeGeometry, luxuryMaterial);
    drapeMesh.position.y = 0.15;
    fashionGroup.add(drapeMesh);

    // Inner floating golden core ring
    const goldRingGeo = new THREE.TorusGeometry(1.65, 0.02, 16, isMobile ? 50 : 100);
    const goldRingMat = new THREE.MeshStandardMaterial({
      color: 0xcbb38d,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x221a10,
      emissiveIntensity: 0.3,
    });
    const goldRing = new THREE.Mesh(goldRingGeo, goldRingMat);
    goldRing.rotation.x = Math.PI / 2.2;
    fashionGroup.add(goldRing);

    // Second intersecting fine halo ring
    const haloGeo = new THREE.TorusGeometry(1.4, 0.012, 16, isMobile ? 40 : 80);
    const haloRing = new THREE.Mesh(haloGeo, goldRingMat);
    haloRing.rotation.x = Math.PI / 3.8;
    haloRing.rotation.y = Math.PI / 4;
    fashionGroup.add(haloRing);

    // Rotating Showcase Pedestal base
    const pedestalGeo = new THREE.CylinderGeometry(1.9, 2.1, 0.2, isMobile ? 32 : 64);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x0f0f13,
      roughness: 0.5,
      metalness: 0.6,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -2.0;
    fashionGroup.add(pedestal);

    // Gold trim on pedestal
    const trimGeo = new THREE.TorusGeometry(1.92, 0.02, 16, 64);
    const trim = new THREE.Mesh(trimGeo, goldRingMat);
    trim.rotation.x = Math.PI / 2;
    trim.position.y = -1.9;
    fashionGroup.add(trim);

    // 6. Floating Luminous Champagne Particles
    const particleCount = isMobile ? 70 : 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      particleScales[i] = Math.random() * 0.03 + 0.01;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xdfccad,
      size: 0.04,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Mouse and Interactive Tilt
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 8. Resize Observer
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Rotate fashion form
      drapeMesh.rotation.y = elapsedTime * 0.28 + mouse.x * 0.35;
      drapeMesh.rotation.x = Math.sin(elapsedTime * 0.3) * 0.12 + mouse.y * 0.25;

      goldRing.rotation.z = elapsedTime * 0.15;
      goldRing.rotation.y = Math.cos(elapsedTime * 0.2) * 0.2;

      haloRing.rotation.z = -elapsedTime * 0.18;

      // Subtle breathing float on whole group
      fashionGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.08 - (scrollY * 0.001);

      // Camera subtle parallax
      camera.position.x = mouse.x * 0.45;
      camera.position.y = 0.2 + mouse.y * 0.35;
      camera.lookAt(0, 0.1, 0);

      // Rotate particle dust
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      renderer.render(scene, camera);
    };

    const canvasElement = renderer.domElement;
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

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      canvasElement.removeEventListener('webglcontextlost', onContextLost);
      canvasElement.removeEventListener('webglcontextrestored', onContextRestored);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
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
      drapeGeometry.dispose();
      goldRingGeo.dispose();
      haloGeo.dispose();
      pedestalGeo.dispose();
      particleGeo.dispose();
      luxuryMaterial.dispose();
      goldRingMat.dispose();
      pedestalMat.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Stylized luxury SVG silhouette fallback */}
        <div className="relative w-[340px] h-[480px] sm:w-[440px] sm:h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(203,179,141,0.18)_0%,transparent_70%)] animate-pulse" />
          <svg viewBox="0 0 200 300" className="w-full h-full opacity-80 filter drop-shadow-[0_0_25px_rgba(203,179,141,0.2)]">
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#dfccad" />
                <stop offset="50%" stopColor="#1a1a20" />
                <stop offset="100%" stopColor="#9c835c" />
              </linearGradient>
            </defs>
            <ellipse cx="100" cy="50" rx="22" ry="28" fill="none" stroke="#cbb38d" strokeWidth="1.5" />
            <path d="M70,85 Q100,105 130,85 L145,210 Q100,240 55,210 Z" fill="url(#goldGrad)" opacity="0.85" />
            <ellipse cx="100" cy="225" rx="75" ry="12" fill="none" stroke="#cbb38d" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="100" cy="140" r="85" fill="none" stroke="#dfccad" strokeWidth="0.8" opacity="0.4" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div
      id="hero-3d-canvas-container"
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
};
