import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Line,
  MeshReflectorMaterial,
  RoundedBox,
  Sparkles,
  Text,
} from "@react-three/drei";
import { MathUtils, Vector3 } from "three";
import { projects, skills } from "./sceneContent";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const ease = (value) => value * value * (3 - 2 * value);
const rangeProgress = (value, start, end) => clamp((value - start) / (end - start));

function IntroAssembly({ progress }) {
  const ringRef = useRef(null);
  const prismRef = useRef(null);

  useFrame(() => {
    if (!ringRef.current || !prismRef.current) {
      return;
    }
    const p = ease(progress);
    ringRef.current.position.x = MathUtils.lerp(-5.4, -0.25, p);
    ringRef.current.position.y = MathUtils.lerp(1.6, 0.6, p);
    ringRef.current.rotation.x += 0.012;
    ringRef.current.rotation.y = 0.8 + p * Math.PI * 1.3;
    ringRef.current.rotation.z = 0.3 + p * Math.PI * 0.8;
    ringRef.current.scale.setScalar(0.65 + p * 0.42);
    prismRef.current.position.x = MathUtils.lerp(4.2, 1.2, p);
    prismRef.current.position.y = MathUtils.lerp(-1.8, -0.5, p);
    prismRef.current.rotation.y = -0.6 + p * 1.1;
  });

  return (
    <group>
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.25}>
        <mesh ref={ringRef}>
          <torusKnotGeometry args={[1.1, 0.24, 256, 32, 2, 3]} />
          <meshStandardMaterial color={"#8bf8ff"} emissive={"#2aa9c7"} emissiveIntensity={1.8} metalness={0.96} roughness={0.14} />
        </mesh>
      </Float>
      <mesh ref={prismRef}>
        <octahedronGeometry args={[0.95, 0]} />
        <meshStandardMaterial color={"#dce7ff"} emissive={"#193978"} emissiveIntensity={0.45} metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

function AboutPortrait({ progress }) {
  const groupRef = useRef(null);
  const beamRef = useRef(null);

  useFrame(() => {
    if (!groupRef.current || !beamRef.current) {
      return;
    }
    const p = ease(progress);
    groupRef.current.position.x = MathUtils.lerp(3.2, 1.5, p);
    groupRef.current.position.y = MathUtils.lerp(0.6, -0.05, p);
    groupRef.current.rotation.y = MathUtils.lerp(0.9, 0.2, p);
    beamRef.current.position.x = MathUtils.lerp(4.8, 0.6, p);
    beamRef.current.material.opacity = 0.12 + p * 0.4;
  });

  return (
    <group>
      <group ref={groupRef}>
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.42, 48, 48]} />
          <meshStandardMaterial color={"#ebf7ff"} emissive={"#21558b"} emissiveIntensity={0.5} metalness={0.28} roughness={0.34} />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <capsuleGeometry args={[0.52, 1.95, 12, 24]} />
          <meshStandardMaterial color={"#9fd1ff"} metalness={0.35} roughness={0.3} />
        </mesh>
        <mesh position={[-0.76, 0.55, 0.08]} rotation={[0, 0, 0.45]}>
          <capsuleGeometry args={[0.13, 1.25, 8, 18]} />
          <meshStandardMaterial color={"#85c8ff"} metalness={0.3} roughness={0.34} />
        </mesh>
        <mesh position={[0.76, 0.52, 0.08]} rotation={[0, 0, -0.28]}>
          <capsuleGeometry args={[0.13, 1.25, 8, 18]} />
          <meshStandardMaterial color={"#85c8ff"} metalness={0.3} roughness={0.34} />
        </mesh>
      </group>
      <mesh ref={beamRef} position={[3.4, 0.7, 0.15]}>
        <planeGeometry args={[1.4, 4.8]} />
        <meshBasicMaterial color={"#9ffaff"} transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function ExperienceMachine({ progress }) {
  const trainRef = useRef(null);
  const chipRef = useRef(null);
  const milestones = useRef([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const p = ease(progress);
    if (trainRef.current) {
      trainRef.current.position.x = MathUtils.lerp(-6.5, 1.2, p);
      trainRef.current.position.y = -0.45 + Math.sin(time * 2.5) * 0.03;
    }
    if (chipRef.current) {
      chipRef.current.position.x = MathUtils.lerp(3.8, 0.2, p);
      chipRef.current.position.y = MathUtils.lerp(1.1, 0.35, p);
      chipRef.current.rotation.y = p * Math.PI * 1.3;
    }
    milestones.current.forEach((item, index) => {
      if (item) {
        const local = Math.max(0, p * 1.3 - index * 0.18);
        item.scale.setScalar(0.65 + local * 0.42);
      }
    });
  });

  return (
    <group>
      <group ref={trainRef}>
        {[-1.1, 0, 1.1].map((x, index) => (
          <RoundedBox key={x} args={[0.84, 0.48, 0.52]} radius={0.08} smoothness={4} position={[x, 0, 0]}>
            <meshStandardMaterial color={index === 1 ? "#79f1ff" : "#9aa7ff"} emissive={index === 1 ? "#20759a" : "#242f76"} emissiveIntensity={0.9} metalness={0.88} roughness={0.18} />
          </RoundedBox>
        ))}
      </group>
      <group ref={chipRef}>
        <RoundedBox args={[1.2, 1.2, 0.12]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color={"#d6f6ff"} metalness={0.9} roughness={0.14} />
        </RoundedBox>
        {[-0.78, -0.39, 0, 0.39, 0.78].map((x) => (
          <Line key={x} points={[[x, -1.2, 0], [x, -0.7, 0], [x * 0.6, -0.25, 0], [x, 0.7, 0], [x, 1.2, 0]]} color={"#8cf8ff"} lineWidth={1.8} />
        ))}
      </group>
      <group position={[0.4, -0.15, -1.3]}>
        {[0, 1, 2].map((index) => (
          <mesh
            key={index}
            ref={(node) => {
              milestones.current[index] = node;
            }}
            position={[index * 1.2 - 1.2, 0.8, 0]}
          >
            <sphereGeometry args={[0.12, 24, 24]} />
            <meshStandardMaterial color={"#9ef8ff"} emissive={"#2a93a5"} emissiveIntensity={1.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function ProjectsTrack({ progress }) {
  const groupRef = useRef(null);
  const cards = useRef([]);

  useFrame(() => {
    const p = ease(progress);
    if (groupRef.current) {
      groupRef.current.position.x = MathUtils.lerp(5.2, 0.8, p);
      groupRef.current.position.y = MathUtils.lerp(-0.6, 0.15, p);
      groupRef.current.rotation.y = MathUtils.lerp(-0.5, -0.12, p);
    }
    cards.current.forEach((card, index) => {
      if (card) {
        const local = clamp((p - index * 0.13) / 0.42);
        card.position.z = MathUtils.lerp(-3.8, index * 0.28, ease(local));
        card.position.y = MathUtils.lerp(1.1, 0, ease(local));
        card.rotation.x = MathUtils.lerp(-0.8, -0.1, ease(local));
      }
    });
  });

  return (
    <group ref={groupRef}>
      {projects.map((label, index) => (
        <group
          key={label}
          ref={(node) => {
            cards.current[index] = node;
          }}
          position={[index * 0.8, 0, -2.8]}
        >
          <RoundedBox args={[1.45, 1.9, 0.12]} radius={0.12} smoothness={4}>
            <meshStandardMaterial color={"#dbe8ff"} emissive={"#294b7a"} emissiveIntensity={0.25} metalness={0.88} roughness={0.15} />
          </RoundedBox>
          <Text position={[0, 0.06, 0.08]} fontSize={0.12} maxWidth={1.05} color={"#0a1024"} anchorX="center" anchorY="middle">
            {label}
          </Text>
        </group>
      ))}
    </group>
  );
}

function SkillsOrbit({ progress }) {
  const groupRef = useRef(null);
  const nodes = useRef([]);

  useFrame((state) => {
    const p = ease(progress);
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.x = MathUtils.lerp(-3.6, -0.2, p);
      groupRef.current.position.y = MathUtils.lerp(1, 0.1, p);
      groupRef.current.rotation.y += 0.003;
    }
    nodes.current.forEach((node, index) => {
      if (node) {
        const angle = time * 0.4 + index * (Math.PI / 3);
        const radius = 1.55 + Math.sin(time + index) * 0.08;
        node.position.x = Math.cos(angle) * radius;
        node.position.y = Math.sin(angle * 1.15) * 0.55;
        node.position.z = Math.sin(angle) * radius;
        node.rotation.y += 0.01;
      }
    });
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[0.78, 1]} />
        <meshStandardMaterial color={"#8cf8ff"} emissive={"#2c9cb2"} emissiveIntensity={1.3} metalness={0.92} roughness={0.16} />
      </mesh>
      {skills.map((label, index) => (
        <group
          key={label}
          ref={(node) => {
            nodes.current[index] = node;
          }}
        >
          <RoundedBox args={[0.88, 0.36, 0.14]} radius={0.08} smoothness={4}>
            <meshStandardMaterial color={"#eff8ff"} emissive={"#2b4d76"} emissiveIntensity={0.35} metalness={0.88} roughness={0.14} />
          </RoundedBox>
          <Text position={[0, 0.01, 0.08]} fontSize={0.08} maxWidth={0.62} color={"#0b1530"} anchorX="center" anchorY="middle">
            {label}
          </Text>
        </group>
      ))}
    </group>
  );
}

function Finale({ progress }) {
  const heroRef = useRef(null);
  const canRef = useRef(null);

  useFrame((state) => {
    const p = ease(progress);
    const time = state.clock.getElapsedTime();
    if (heroRef.current) {
      heroRef.current.position.x = MathUtils.lerp(2.8, 0, p);
      heroRef.current.position.y = MathUtils.lerp(1.1, 0.15, p);
      heroRef.current.rotation.y += 0.007;
      heroRef.current.scale.setScalar(0.6 + p * 0.5);
    }
    if (canRef.current) {
      const bounceRaw = Math.max(0, p - 0.7);
      const bounce = Math.sin(bounceRaw * Math.PI * 6) * Math.exp(-bounceRaw * 10);
      canRef.current.position.x = MathUtils.lerp(-2.2, 1.8, p);
      canRef.current.position.y = MathUtils.lerp(3.5, -0.2, p) + bounce;
      canRef.current.rotation.z = p * Math.PI * 5;
      canRef.current.rotation.x = 0.4 + time * 0.12;
    }
  });

  return (
    <group>
      <mesh ref={heroRef}>
        <torusGeometry args={[1.35, 0.16, 24, 160]} />
        <meshStandardMaterial color={"#e3f6ff"} emissive={"#3997be"} emissiveIntensity={1.05} metalness={0.98} roughness={0.1} />
      </mesh>
      <group ref={canRef}>
        <mesh>
          <cylinderGeometry args={[0.34, 0.34, 1.22, 48]} />
          <meshStandardMaterial color={"#8e0d18"} emissive={"#520a12"} emissiveIntensity={1} metalness={0.96} roughness={0.14} />
        </mesh>
        <mesh position={[0, 0, 0.36]}>
          <planeGeometry args={[0.34, 0.62]} />
          <meshBasicMaterial color={"#ffffff"} />
        </mesh>
      </group>
    </group>
  );
}

export default function Scene3D({ progressRef, pointerRef }) {
  const rootRef = useRef(null);
  const lightRef = useRef(null);
  const hazeRef = useRef(null);
  const cameraTarget = useMemo(() => new Vector3(0, 0, 0), []);
  const impactPoints = [0.36, 0.55, 0.9];

  useFrame((state) => {
    const t = progressRef.current;
    const camera = state.camera;
    const pointer = pointerRef.current;
    const intro = rangeProgress(t, 0, 0.16);
    const about = rangeProgress(t, 0.16, 0.32);
    const experience = rangeProgress(t, 0.32, 0.5);
    const project = rangeProgress(t, 0.5, 0.68);
    const orbit = rangeProgress(t, 0.68, 0.84);
    const ending = rangeProgress(t, 0.84, 1);

    const focusX = ease(intro) * -0.2 + ease(about) * 0.9 + ease(experience) * 0.15 + ease(project) * 0.8 + ease(orbit) * -0.2;
    const focusY = 0.35 + ease(intro) * 0.15 + ease(about) * 0.2 - ease(experience) * 0.15;
    const camX = -0.9 + ease(intro) * 0.7 + ease(about) * 1.45 + ease(experience) * 0.5 + ease(project) * 1.05 - ease(orbit) * 1.55 + ease(ending) * 0.15;
    const camY = 0.6 + ease(intro) * 0.4 - ease(experience) * 0.18 + ease(project) * 0.22 + ease(ending) * 0.1;
    const camZ = 8.6 - ease(intro) * 1.15 - ease(about) * 0.65 - ease(experience) * 0.75 - ease(project) * 0.95 + ease(ending) * 0.55;
    const impactShake = impactPoints.reduce((acc, point) => acc + Math.max(0, 1 - Math.abs(t - point) / 0.025), 0);
    const shake = impactShake * 0.06;

    camera.position.x = MathUtils.lerp(camera.position.x, camX + pointer.x * 0.25 + Math.sin(state.clock.elapsedTime * 30) * shake, 0.06);
    camera.position.y = MathUtils.lerp(camera.position.y, camY + pointer.y * 0.18 + Math.cos(state.clock.elapsedTime * 24) * shake, 0.06);
    camera.position.z = MathUtils.lerp(camera.position.z, camZ, 0.06);
    cameraTarget.set(focusX + pointer.x * 0.08, focusY + pointer.y * 0.06, 0);
    camera.lookAt(cameraTarget);

    if (rootRef.current) {
      rootRef.current.rotation.y = MathUtils.lerp(rootRef.current.rotation.y, pointer.x * 0.08, 0.05);
      rootRef.current.rotation.x = MathUtils.lerp(rootRef.current.rotation.x, pointer.y * 0.05, 0.05);
    }
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(t * Math.PI * 4) * 4.5 + pointer.x * 0.9;
      lightRef.current.position.y = 2.6 + Math.cos(t * Math.PI * 3) * 1.4 + pointer.y * 0.7;
      lightRef.current.intensity = 80 + t * 35;
    }
    if (hazeRef.current) {
      hazeRef.current.material.opacity = 0.08 + Math.sin(t * Math.PI * 3) * 0.04;
    }
  });

  return (
    <>
      <color attach="background" args={["#040713"]} />
      <fog attach="fog" args={["#040713", 8, 18]} />
      <ambientLight intensity={0.65} color={"#9abfff"} />
      <directionalLight position={[5, 7, 4]} intensity={1.9} color={"#f6fbff"} />
      <pointLight ref={lightRef} position={[2, 2.5, 2]} distance={12} intensity={95} color={"#79f7ff"} />
      <Sparkles count={200} scale={[16, 10, 16]} size={2.4} speed={0.26} color={"#c0fbff"} />
      <Environment preset="warehouse" />
      <mesh ref={hazeRef} position={[0, 1.8, -2.6]}>
        <planeGeometry args={[15, 8]} />
        <meshBasicMaterial color={"#79f7ff"} transparent opacity={0.08} />
      </mesh>
      <group ref={rootRef}>
        <IntroAssembly progress={rangeProgress(progressRef.current, 0, 0.16)} />
        <AboutPortrait progress={rangeProgress(progressRef.current, 0.16, 0.32)} />
        <ExperienceMachine progress={rangeProgress(progressRef.current, 0.32, 0.5)} />
        <ProjectsTrack progress={rangeProgress(progressRef.current, 0.5, 0.68)} />
        <SkillsOrbit progress={rangeProgress(progressRef.current, 0.68, 0.84)} />
        <Finale progress={rangeProgress(progressRef.current, 0.84, 1)} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.42, 0]}>
          <planeGeometry args={[24, 24]} />
          <MeshReflectorMaterial blur={[300, 80]} resolution={1024} mixBlur={1.2} mixStrength={16} mirror={0.4} color={"#080e1f"} metalness={0.85} roughness={0.28} />
        </mesh>
      </group>
    </>
  );
}
