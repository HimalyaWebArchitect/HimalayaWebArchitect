"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function HeroSection() {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;
    
    // Colors
    const primaryColor = new THREE.Color('hsl(var(--primary))');
    const accentColor = new THREE.Color('hsl(var(--accent))');
    
    // Particle Effects
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xffffff,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.5
    });
    const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleMesh);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(primaryColor, 300, 100);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(accentColor, 200, 100);
    pointLight2.position.set(-20, -15, -20);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xffffff, 100, 100);
    pointLight3.position.set(0, -20, 15);
    scene.add(pointLight3);

    camera.position.z = 45;

    // Animation loop
    const clock = new THREE.Clock();
    let mouse = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
        animationFrameId.current = requestAnimationFrame(animate);
        
        const elapsedTime = clock.getElapsedTime();
        
        // Animate particles
        particleMesh.rotation.y = -0.3 * elapsedTime;
        
        // Mouse interaction
        camera.position.x += (mouse.x * 5 - camera.position.x) * 0.02;
        camera.position.y += (mouse.y * 5 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        controls.update();
        renderer.render(scene, camera);
    };
    animate();
    
    // Resize handler
    const handleResize = () => {
        if (currentMount) {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        }
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', onMouseMove);
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
        if (currentMount && renderer.domElement) {
            currentMount.removeChild(renderer.domElement);
        }
        controls.dispose();
    };
  }, []);

  return (
    <section id="hero" className="relative h-dvh min-h-[700px] w-full flex items-center justify-center p-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full z-0" ref={mountRef} />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
        <div className="relative z-20 text-center container mx-auto px-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-headline tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-primary/70">
                Architecting Digital Peaks.
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
                We design and build solid, scalable web foundations that elevate your business to new heights.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105">
                    <Link href="#contact">Start Your Project</Link>
                </Button>
                <Button asChild variant="ghost" size="lg" className="text-lg px-8 py-6 group">
                    <Link href="#portfolio">Explore Our Work <ArrowDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" /></Link>
                </Button>
            </div>
        </div>
    </section>
  );
}
