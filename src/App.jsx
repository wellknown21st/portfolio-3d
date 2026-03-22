import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, MeshDistortMaterial } from '@react-three/drei';
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';
import { FiGithub, FiExternalLink, FiLinkedin, FiMail, FiMoon, FiSun, FiCode, FiAward, FiStar, FiTrendingUp, FiHome, FiUser, FiBriefcase } from 'react-icons/fi';
import * as THREE from 'three';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import profile from "./file_0000000015a47208aff998e4a24528a4.png";
import { TypeAnimation } from 'react-type-animation';
// ------------------------------------------------------------
// ENHANCED 3D ENVIRONMENT COMPONENT
// -------------------------------------------------------------

// Procedurally Generated Low-Poly Journey Rocket (Background 3D) - ONLY DARK MODE
const ProceduralRocket = ({ scrollPercent }) => {
  const rocketRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (rocketRef.current) {
      const targetY = -7 + (scrollPercent * 25) + Math.sin(time) * 0.3;
      rocketRef.current.position.y = THREE.MathUtils.lerp(rocketRef.current.position.y, targetY, 0.1);
      
      const targetX = Math.sin(scrollPercent * Math.PI * 2) * 5;
      rocketRef.current.position.x = THREE.MathUtils.lerp(rocketRef.current.position.x, targetX, 0.1);
      
      const targetRotZ = Math.sin(scrollPercent * Math.PI * 2) * -0.3;
      rocketRef.current.rotation.z = THREE.MathUtils.lerp(rocketRef.current.rotation.z, targetRotZ, 0.1);
      
      rocketRef.current.rotation.y = time * 0.5;
    }
  });

  return (
    <group ref={rocketRef} scale={0.5}>
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.5, 1, 3, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={0.4} roughness={0.2} />
      </mesh>
      <mesh position={[0, 3, 0]}>
        <coneGeometry args={[0.5, 1.5, 16]} />
        <meshStandardMaterial color="#ff758f" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh position={[0.8, -0.2, 0]} rotation={[0, 0, -Math.PI / 4]}><boxGeometry args={[0.2, 1, 1]} /><meshStandardMaterial color="#9d4edd" /></mesh>
      <mesh position={[-0.8, -0.2, 0]} rotation={[0, 0, Math.PI / 4]}><boxGeometry args={[0.2, 1, 1]} /><meshStandardMaterial color="#9d4edd" /></mesh>
      <mesh position={[0, -0.2, 0.8]} rotation={[Math.PI / 4, 0, 0]}><boxGeometry args={[1, 1, 0.2]} /><meshStandardMaterial color="#9d4edd" /></mesh>
      <mesh position={[0, -0.2, -0.8]} rotation={[-Math.PI / 4, 0, 0]}><boxGeometry args={[1, 1, 0.2]} /><meshStandardMaterial color="#9d4edd" /></mesh>
      <mesh position={[0, 1.5, 0.45]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.3, 0.3, 0.1, 16]} /><meshStandardMaterial color="#00bcd4" metalness={0.9} roughness={0.1} /></mesh>
      
      <Float speed={10} floatIntensity={0} rotationIntensity={0}>
        <mesh position={[0, -1.2, 0]}>
          <coneGeometry args={[0.6, 2, 16]} />
          <MeshDistortMaterial color="#ff9800" distort={0.5} speed={10} emissive="#ffc107" emissiveIntensity={2} />
        </mesh>
      </Float>
    </group>
  );
};

// Procedural Birds
const Birds = () => {
  const birdsGroup = useRef();
  useFrame((state) => {
    if (birdsGroup.current) {
      const time = state.clock.getElapsedTime();
      birdsGroup.current.position.x = Math.sin(time * 0.3) * 8; 
      birdsGroup.current.position.y = Math.cos(time * 0.4) * 2 + 5;
      birdsGroup.current.rotation.y = Math.cos(time * 0.3) * 0.5;
    }
  });
  return (
    <group ref={birdsGroup}>
      {[[-2, 0, 0], [0, 0.5, -2], [2, 0.5, -2], [-1, -0.5, -1], [1, -0.5, -1]].map((pos, i) => (
        <group key={i} position={pos}>
           <mesh rotation={[0, 0, Math.PI / 4]}><boxGeometry args={[0.05, 0.5, 0.2]} /><meshStandardMaterial color="#333" /></mesh>
           <mesh rotation={[0, 0, -Math.PI / 4]} position={[0.3, 0, 0]}><boxGeometry args={[0.05, 0.5, 0.2]} /><meshStandardMaterial color="#333" /></mesh>
        </group>
      ))}
    </group>
  );
};

// Sea Animals
const SeaAnimals = ({ scrollPercent }) => {
    const seaGroup = useRef();
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (seaGroup.current) {
            seaGroup.current.position.x = Math.sin(time * 0.2) * 4 - 2;
            seaGroup.current.position.y = -10 + Math.abs(Math.sin(time * 1.5)) * 3; 
            const targetOpacity = scrollPercent > 0.7 ? 1 : 0;
            seaGroup.current.children.forEach(child => {
                if (child.material) {
                    child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, targetOpacity, 0.05);
                    child.material.transparent = true;
                }
            });
        }
    });
    return (
        <group ref={seaGroup}>
            <mesh rotation={[0, Math.PI / 2, 0]}>
                <capsuleGeometry args={[0.4, 1.5, 4, 8]} />
                <meshStandardMaterial color="#0277bd" roughness={0.1} metalness={0.5} transparent opacity={0}/>
            </mesh>
            <mesh position={[0, 0.6, 0]} rotation={[0, 0, -Math.PI / 4]}>
                <boxGeometry args={[0.5, 0.5, 0.1]} />
                <meshStandardMaterial color="#0277bd" transparent opacity={0}/>
            </mesh>
        </group>
    );
};

// Optimized Custom Clouds - Reduced segments drastically for mobile performance
const CustomClouds = () => {
  const cloudGroup = useRef();
  useFrame((state) => {
      const time = state.clock.getElapsedTime();
      if(cloudGroup.current) cloudGroup.current.position.x = Math.sin(time * 0.05) * 5;
  });

  const CloudPuff = ({ pos, size }) => (
    <mesh position={pos}><sphereGeometry args={[size, 12, 12]}/><meshStandardMaterial color="#ffffff" roughness={1} flatShading/></mesh>
  );

  return (
      <group ref={cloudGroup}>
          <group position={[-8, 3, -15]} scale={1.5}>
              <CloudPuff pos={[0,0,0]} size={1.5}/> <CloudPuff pos={[1.5,-0.5,0]} size={1.2}/> <CloudPuff pos={[-1.5,-0.3,0]} size={1.3}/>
          </group>
          <group position={[8, 5, -20]} scale={2}>
              <CloudPuff pos={[0,0,0]} size={1.5}/> <CloudPuff pos={[1.5,-0.5,0]} size={1.2}/> <CloudPuff pos={[-1.5,-0.3,0]} size={1.3}/>
          </group>
          <group position={[0, 6, -25]} scale={1.8}>
              <CloudPuff pos={[0,0,0]} size={1.5}/> <CloudPuff pos={[1.5,-0.5,0]} size={1.2}/> <CloudPuff pos={[-1.5,-0.3,0]} size={1.3}/>
          </group>
      </group>
  );
};

// Fast Galaxy system for night mode
const Galaxy = () => {
   const group = useRef();
   const particleCount = 2000;
   
   const [positions, colors] = useMemo(() => {
     const p = new Float32Array(particleCount * 3);
     const c = new Float32Array(particleCount * 3);
     const color1 = new THREE.Color("#9d4edd");
     const color2 = new THREE.Color("#ff758f");
     
     for(let i=0; i<particleCount; i++) {
        const radius = Math.random() * 20;
        const spinAngle = radius * 0.5;
        const branchAngle = ((i % 3) * Math.PI * 2) / 3;
        const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 2;
        const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 2;
        const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 2;
        
        p[i*3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        p[i*3+1] = randomY;
        p[i*3+2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
        
        const mixedColor = color1.clone().lerp(color2, radius/20);
        c[i*3] = mixedColor.r; c[i*3+1] = mixedColor.g; c[i*3+2] = mixedColor.b;
     }
     return [p, c];
   }, []);

   useFrame((state) => {
      if(group.current) {
          group.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      }
   });

   return (
       <points ref={group} position={[0, -10, -30]} rotation={[-Math.PI/4, 0, 0]}>
           <bufferGeometry>
              <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
              <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
           </bufferGeometry>
           <pointsMaterial size={0.1} vertexColors transparent opacity={0.8} />
       </points>
   )
}

// Interactive Sun rising from the sea and setting perfectly behind the picture based on scroll direction
const InteractiveSun = ({ scrollPercent }) => {
    const sunRef = useRef();
    
    useFrame(() => {
        if(sunRef.current) {
            // scrollPercent = 0 (top of page): Sun is at Y=0 (directly behind Profile Pic)
            // scrollPercent = 1 (bottom of page): Sun rests at Y=-10 (deep sunset into the sea)
            const targetY = THREE.MathUtils.lerp(0, -10, scrollPercent);
            sunRef.current.position.y = THREE.MathUtils.lerp(sunRef.current.position.y, targetY, 0.1);
        }
    });

    return (
        // Rendered perfectly at Z=-12 behind the profile picture
        <group ref={sunRef} position={[0, 0, -12]}>
             <mesh scale={2.5}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color="#ffeb3b" />
                <mesh scale={1.2}><sphereGeometry args={[1, 32, 32]} /><meshBasicMaterial color="#ffc107" transparent opacity={0.3} blending={THREE.AdditiveBlending} /></mesh>
                <mesh scale={1.4}><sphereGeometry args={[1, 32, 32]} /><meshBasicMaterial color="#ff9800" transparent opacity={0.1} blending={THREE.AdditiveBlending} /></mesh>
                <pointLight distance={50} intensity={3} color="#fff176" />
            </mesh>
        </group>
    );
};

const InteractiveOcean = ({ scrollPercent }) => {
    const oceanRef = useRef();
    useFrame(() => {
        if (oceanRef.current) {
            // Fades in naturally as user begins their journey
            const targetOpacity = Math.min(1, scrollPercent * 2); 
            oceanRef.current.material.opacity = THREE.MathUtils.lerp(oceanRef.current.material.opacity, targetOpacity, 0.1);
        }
    });
    return (
        <mesh ref={oceanRef} position={[0, -20, -10]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[100, 100, 4, 4]} />
            <meshStandardMaterial color="#0288d1" roughness={0.1} metalness={0.8} transparent opacity={0} />
        </mesh>
    );
};

const SceneObjects = ({ isDark }) => {
  const groupRef = useRef();
  const [scrollPercent, setScrollPercent] = useState(0);
  
  useFrame(() => {
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const scroll = window.scrollY / maxScroll;
    setScrollPercent(THREE.MathUtils.lerp(scrollPercent, scroll, 0.1));

    if (groupRef.current) {
      // Moves everything EXCEPT Sun/Moon up as user scrolls
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, scroll * 15, 0.05);
      // Rotations removed completely to prevent weird ocean/world twisting latency bounds
    }
  });

  return (
    <>
      {/* 🚀 Rocket only in Dark Mode */}
      {isDark && <ProceduralRocket scrollPercent={scrollPercent} />}
      
      {/* PERFECTLY BEHIND PROFILE PIC */}
      {isDark ? (
         <group position={[0, -0.5, -10]}>
             <mesh scale={3}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#f0f0f0" roughness={0.8} metalness={0.1} emissive="#bbbbbb" emissiveIntensity={0.5} />
                <pointLight distance={30} intensity={2} color="#ffffff" />
            </mesh>
         </group>
      ) : (
         <InteractiveSun scrollPercent={scrollPercent} />
      )}

      {/* World Background Group */}
      <group ref={groupRef}>
        {isDark ? (
          <>
            {/* Dark Mode ONLY: Abstract / Tech Geometry & Universe */}
            <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
            <Galaxy />
            <mesh position={[-8, 10, -15]}><sphereGeometry args={[2, 16, 16]} /><meshBasicMaterial color="#9d4edd" transparent opacity={0.2} blending={THREE.AdditiveBlending}/></mesh>
            <mesh position={[6, -5, -20]}><sphereGeometry args={[3, 16, 16]} /><meshBasicMaterial color="#ff758f" transparent opacity={0.2} blending={THREE.AdditiveBlending}/></mesh>
            <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
              <mesh position={[-5, 5, -8]} scale={1.2}>
                <torusKnotGeometry args={[1, 0.3, 64, 16]} />
                <MeshDistortMaterial color="#9d4edd" attach="material" distort={0.4} speed={2} roughness={0.2} metalness={0.8} />
              </mesh>
            </Float>
          </>
        ) : (
          <>
            {/* Light Mode ONLY: Beautiful Nature, Sea, Clouds, Birds */}
            <CustomClouds />
            <Birds />
            {/* The Ocean */}
            <InteractiveOcean scrollPercent={scrollPercent} />
            <SeaAnimals scrollPercent={scrollPercent} />
          </>
        )}
      </group>
    </>
  );
};

// Canvas wrapper ensures no touch interference with scrolling phone
const Background3D = ({ isDark }) => {
  return (
    <div className="canvas-container" style={{ background: isDark ? '#02000a' : 'linear-gradient(to bottom, #4fc3f7, #81d4fa, #b3e5fc, #0288d1)' }}>
      {/* Optimized Performance Props for Phones */}
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
        <ambientLight intensity={isDark ? 0.3 : 1} />
        <directionalLight position={[10, 10, 5]} intensity={isDark ? 1 : 1.5} color={isDark ? "#9d4edd" : "#ffffff"} />
        <directionalLight position={[-10, 5, -5]} intensity={0.5} color={isDark ? "#ff758f" : "#ffeb3b"} />
        <SceneObjects isDark={isDark} />
      </Canvas>
    </div>
  );
};

// -------------------------------------------------------------
// UI COMPONENTS
// -------------------------------------------------------------
const commonHover = { y: -10, borderColor: 'var(--primary)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' };

const ProjectCard = ({ title, desc, tech, link, github }) => {
  return (
    <motion.div style={{ width: '100%', maxWidth: '350px', display: 'flex' }}>
      <motion.div
        className="glass"
        style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '320px', width: '100%' }}
        whileHover={commonHover}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>{title}</h3>
          <p style={{ color: 'var(--text)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>{desc}</p>
        </div>
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {tech.map((t, i) => (
              <span key={i} style={{ background: 'var(--primary)', padding: '0.3rem 0.8rem', borderRadius: '15px', fontSize: '0.8rem', color: '#fff' }}>{t}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {link && <a href={link} target="_blank" rel="noreferrer" className="project-link" style={{ color: 'var(--text)', fontSize: '1.5rem', transition: 'all 0.3s ease' }}><FiExternalLink /></a>}
            {github && <a href={github} target="_blank" rel="noreferrer" className="project-link" style={{ color: 'var(--text)', fontSize: '1.5rem', transition: 'all 0.3s ease' }}><FiGithub /></a>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

function App() {
  // Start in Light mode by default as requested
  const [isDark, setIsDark] = useState(true);
  const formRef = useRef();
  
  const { scrollYProgress } = useScroll();
  const scaleOp = useTransform(scrollYProgress, [0, 0.1], [1, 1.1]);

  useEffect(() => {
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_o0uw8aq', 'template_fjebk6s', formRef.current, 'rQGNt0f_Ml5QfWl6J')
      .then(() => {
          toast.success("Message sent successfully 🚀");
          formRef.current.reset();
      }, (error) => {
          toast.error("Failed to send message. Please try again.");
      });
  };

  return (
    <>
      <ToastContainer theme={isDark ? "dark" : "light"} />
      <Background3D isDark={isDark} />
      {/* Scroll indicator rocket completely removed */}
      
      <div className="content-container">
        {/* Navigation */}
        <nav style={{ padding: '1.2rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', width: '100%', top: 0, zIndex: 100, backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--glass-border)', background: 'var(--glass-bg)' }}>
          <h2 className="heading-gradient" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Mayank Mishra</h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
             <div style={{ display: 'flex', gap: '2rem', fontSize: '1rem', fontWeight: 500 }} className="desktop-links">
              <a href="#about" style={{ color: 'var(--text)', textDecoration: 'none' }}>About</a>
              <a href="#dsa" style={{ color: 'var(--text)', textDecoration: 'none' }}>DSA</a>
              <a href="#skills" style={{ color: 'var(--text)', textDecoration: 'none' }}>Skills</a>
              <a href="#projects" style={{ color: 'var(--text)', textDecoration: 'none' }}>Projects</a>
              <a href="#contact" style={{ color: 'var(--text)', textDecoration: 'none' }}>Contact</a>
            </div>
            <button className="theme-toggle-btn" onClick={() => setIsDark(!isDark)} aria-label="Toggle Theme">
              {isDark ? <FiSun style={{color: '#ffeb3b'}} /> : <FiMoon style={{color: '#9d4edd'}} />}
            </button>
          </div>
        </nav>

        {/* Mobile Bottom Navigation Bar */}
        <div className="mobile-nav">
           <a href="#home"><FiHome /></a>
           <a href="#about"><FiUser /></a>
           <a href="#dsa"><FiAward /></a>
           <a href="#projects"><FiBriefcase /></a>
           <a href="#contact"><FiMail /></a>
        </div>

        {/* Hero Section */}
        <section id="home" className="hero-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 5%', paddingTop: '80px', position: 'relative' }}>
          
          <motion.div 
            className="hero-wrap"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ width: '100%', display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'center', justifyContent: 'center', gap: '6rem', pointerEvents: 'auto', zIndex: 2 }}
          >
          <motion.div 
              style={{ 
                maxWidth: '600px', 
                flex: '1 1 300px', 
                scale: scaleOp, 
                transformOrigin: "left center" 
              }}
            >
            
              {/* ✅ First line */}
             <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem' }}>
                            Hi, I'm <span className="heading-gradient">Mayank</span> <br/>
                            Mishra.
                          </h1>
              
            
              {/* ✅ Second line */}
              <p style={{ 
                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', 
                color: 'var(--text)', 
                marginBottom: '2.5rem', 
                fontWeight: 500,
                minHeight: '2.5em'   // 🔥 reserve space for 2 lines
              }}>
                <TypeAnimation
                  sequence={[
                    
                    "B.Tech Student.", 1500,
                    "Software Developer.", 1500,
                    "Competitive Programmer.", 2000,
                    "AI/ML Enthusiast.", 2000,
                  ]}
                  speed={50}
                  repeat={Infinity}
                  cursor={false}
                />
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <a href="#contact" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>📞 Contact Me</a>
                <a href="https://drive.google.com/file/d/1ndhia5httF7s4rmpacW1z8b160u8zxz_/view?usp=drive_link" rel="noreferrer" className="btn-primary" style={{ background: 'transparent', border: '2px solid var(--primary)', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FiFileText /> View Resume
                </a>
              </div>
            </motion.div>

            <motion.div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
               <div className="profile-container">
                  <img src={profile} onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=500&auto=format&fit=crop&q=60" }} alt="Mayank Mishra" className="profile-img" />
               </div>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" style={{ minHeight: '80vh', padding: '6rem 5%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 className="heading-gradient" style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>🌟 About Me</h2>
          
          <motion.div 
             className="glass" 
             style={{ padding: '3rem', maxWidth: '900px', margin: '0 auto', fontSize: '1.2rem', color: 'var(--text)', textAlign: 'center' }}
             initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}
             variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 50 } }}
             transition={{ duration: 0.6 }}
          >
            <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
              I am a passionate competitive coder, developer, and B.Tech student at UIET Rohtak specializing in 🤖 AI and Machine Learning. 
              My journey involves diving deep into logic, complex mathematical models, and algorithmic problem-solving.
            </p>
            <p>
              Strongly proficient in languages like C++, Python, and JavaScript, I blend my hardcore computational logic with interactive Web Technologies to bring scalable, robust architectural visions to life. I believe in writing code that solves real-world challenges efficiently.
            </p>
          </motion.div>
        </section>

        {/* DEDICATED DSA SECTION */}
        <section id="dsa" style={{ minHeight: '80vh', padding: '6rem 5%' }}>
           <h2 className="heading-gradient" style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center' }}>🏆 DSA & Problem Solving</h2>
           
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto' }}>
              
              {/* Profile Card Generation */}
              {[
                { label: 'CodeChef 5★', icon: <FiAward size={40} color="#3972FF"/>, color: 'rgba(57, 114, 255, 0.15)', link: 'https://www.codechef.com/users/mishra_mayank', desc: 'Highest Rating achieved. Proficient in rapidly solving complex algorithmic constraints.' },
                { label: 'Codeforces Expert', icon: <FiTrendingUp size={40} color="#FF0000"/>, color: 'rgba(255, 0, 0, 0.15)', link: 'https://codeforces.com/profile/03mishramayank123', desc: 'Maintained expert tier rating, focusing on dynamic programming and graph structures.' },
                { label: 'LeetCode', icon: <FiCode size={40} color="#FFA116"/>, color: 'rgba(255, 161, 22, 0.15)', link: 'https://leetcode.com/u/mayank211203mishra/', desc: 'Active participant, highly consistent daily solver with intricate optimizations.' },
                { label: 'GeeksForGeeks 5★', icon: <FiStar size={40} color="#2F8D46"/>, color: 'rgba(47, 141, 70, 0.15)', link: 'https://www.geeksforgeeks.org/user/mayank2112l6z8/', desc: '1000+ problems solved. Demonstrating sheer persistence and pattern recognition.' }
              ].map((item, idx) => (
                <motion.div key={idx} className="glass" style={{ padding: '2.5rem', flex: '1 1 250px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }} whileHover={commonHover}>
                  <div style={{ padding: '1rem', background: item.color, borderRadius: '50%', marginBottom: '1rem' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text)' }}>{item.label}</h3>
                  <p style={{ color: 'var(--text)', opacity: 0.9, marginBottom: '1rem' }}>{item.desc}</p>
                  <a href={item.link} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>View Profile</a>
                </motion.div>
              ))}
           </div>
        </section>

        {/* Education & Skills Section */}
        <section id="skills" style={{ minHeight: '80vh', padding: '6rem 5%' }}>
          <h2 className="heading-gradient" style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center' }}>Education & Skills</h2>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center', marginBottom: '4rem' }}>
             <motion.div className="glass" style={{ padding: '2.5rem', maxWidth: '600px', width: '100%' }} whileHover={commonHover}>
                <h3 className="heading-gradient" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🎓 B.Tech(CSE) in Artificial Intelligence and Machine Learning</h3>
                <p><strong>UIET Rohtak</strong> | 2026 (Expected)</p>
                <div style={{ marginTop: '1rem', color: 'var(--text)' }}>
                    <p>📈 <strong>7.8 CGPA</strong> in AI/ML-focused CSE degree</p>
                    <p>🏅 Top-tier performance in cutting-edge technology field</p>
                    <p>🎯 Proven results in advanced computing and machine learning</p>
                </div>
                <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                    <h4 style={{ color: 'var(--primary)' }}>📚 Higher Secondary Education</h4>
                    <p><strong>K.D Sr. Sec. School</strong> | Faridabad | 2022</p>
                    <p>📈 <strong>8.0 CGPA</strong></p>
                </div>
                <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                    <h4 style={{ color: 'var(--primary)' }}>📚 Secondary Education</h4>
                    <p><strong>K.D Sr. Sec. School</strong> | Faridabad | 2020</p>
                    <p>📈 <strong>8.8 CGPA</strong></p>
                </div>
             </motion.div>
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', maxWidth: '600px', alignContent: 'flex-start' }}>
                <motion.div className="glass" style={{ padding: '1.5rem', flex: '1 1 250px' }} whileHover={commonHover}>
                  <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>💻 Programming</h3>
                  <p style={{ color: 'var(--text)' }}>C++, Python, JavaScript</p>
                </motion.div>
                <motion.div className="glass" style={{ padding: '1.5rem', flex: '1 1 250px' }} whileHover={commonHover}>
                  <h3 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>🧠 DSA</h3>
                  <p style={{ color: 'var(--text)' }}>Competitive Programming, 1000+ problems</p>
                </motion.div>
                <motion.div className="glass" style={{ padding: '1.5rem', flex: '1 1 250px' }} whileHover={commonHover}>
                  <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>🌐 Web Dev</h3>
                  <p style={{ color: 'var(--text)' }}>Full-stack development, React, Three.js</p>
                </motion.div>
                <motion.div className="glass" style={{ padding: '1.5rem', flex: '1 1 250px' }} whileHover={commonHover}>
                  <h3 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>🤖 AI & ML</h3>
                  <p style={{ color: 'var(--text)' }}>Machine Learning, Computer Vision</p>
                </motion.div>
             </div>
          </div>
        </section>

        {/* Projects 3D Section */}
        <section id="projects" style={{ minHeight: '80vh', padding: '6rem 5%' }}>
          <h2 className="heading-gradient" style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center' }}>Featured Projects</h2>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center' }}>
            <ProjectCard 
              title="🚀 ML Facial Recognition" 
              desc="Spearheaded hackathon team to develop a cutting-edge Machine Learning-based facial recognition model. Automated attendance, reduced errors, and streamlined check-ins significantly."
              tech={['Python', 'OpenCV', 'TensorFlow']}
              github="https://github.com/wellknown21st/Anti-Spoofing-Face-Recognition-Model"
            />
            <ProjectCard 
              title="🌾 Farm Connect Platform" 
              desc="A full-stack agricultural platform connecting farmers directly to buyers, ensuring fair pricing, real-time market offers, and an admin verified secure ecosystem."
              tech={['React', 'Node.js', 'MongoDB', 'Sockets']}
              github="https://github.com/wellknown21st"
            />
            <ProjectCard 
              title="🤖 YouTube Summarizer Bot" 
              desc="An intelligent Telegram bot that instantly fetches YouTube video transcripts and uses AI to provide concise, accurate, and structured summaries on demand."
              tech={['Python', 'Telegram API', 'NLP', 'AI']}
              github="https://github.com/wellknown21st/telegram-youtube-bot"
            />
          </div>
        </section>

        {/* Footer / Contact */}
        <section id="contact" style={{ padding: '6rem 5%', paddingBottom: '120px' }}>
          <h2 className="heading-gradient" style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center' }}>Contact Me</h2>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'center', maxWidth: '1000px', margin: '0 auto' }}>
            
            <div className="glass" style={{ padding: '3rem', flex: '1 1 350px', textAlign: 'center' }}>
               <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Let's Connect</h3>
               <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text)' }}>📍 Faridabad, India</p>
               <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text)' }}>📞 <a href="tel:+91-9311085525" style={{ color: 'var(--primary)', textDecoration: 'none' }}>+91-9311085525</a></p>
               <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text)' }}>
                  📧 <a href="mailto:mayank211203mishra@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'none' }}>mayank211203mishra@gmail.com</a>
               </p>

               <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
                  <a href="https://www.linkedin.com/in/mayank2104/" target="_blank" rel="noreferrer" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FiLinkedin /> LinkedIn
                  </a>
                  <a href="https://github.com/wellknown21st" target="_blank" rel="noreferrer" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--secondary)' }}>
                    <FiGithub /> GitHub
                  </a>
               </div>
            </div>

            <div className="glass" style={{ padding: '3rem', flex: '1 1 400px' }}>
              <form ref={formRef} onSubmit={sendEmail} className="contact-form">
                <input type="text" name="from_name" placeholder="Your Name" required className="contact-input" />
                <input type="email" name="from_email" placeholder="Your Email" required className="contact-input" />
                <textarea name="message" rows="5" placeholder="Your Message" required className="contact-input"></textarea>
                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>Send Message</button>
              </form>
            </div>

          </div>

          <div style={{ textAlign: 'center', marginTop: '6rem', position: 'relative', zIndex: 10 }}>
            <p style={{ color: 'var(--text)', fontSize: '1rem', fontWeight: 'bold' }}>You have reached the destination.</p>
            <p style={{ color: 'var(--text)', fontSize: '0.9rem', marginTop: '0.5rem' }}>© 2026 Mayank Mishra. All rights reserved.</p>
          </div>
        </section>
      </div>
    </>
  );
}

const FiFileText = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);

export default App;
