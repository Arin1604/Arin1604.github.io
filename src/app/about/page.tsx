'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const images = ['/Arin1.jpg', '/Arin1.jpg', '/Arin1.jpg', '/Arin1.jpg']; // ✅ Place these in /public

export default function AboutPage() {
  const [current, setCurrent] = useState(0);

  // Rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-1200 text-white px-6 py-16 space-y-24">
      
      {/* Section 1: About Me */}
      <section className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="w-[700px] h-[200px] relative">
          <Image
            src={images[current]}
            alt="Arin"
            fill
            className="object-cover rounded-xl transition-all duration-700"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">Hi, I’m Arin!</h1>
          <p className="text-lg">
            I’m a creative technologist passionate about camera systems, real-time 3D, and immersive media.
            I currently study at an Ivy League university, where I work on VR teleoperation using Boston Dynamics Spot,
            develop tools in Unity/C#, and build physically-based rendering systems from scratch.
          </p>
        </div>
      </section>

      <hr className="border-gray-600" />

      {/* Section 2: Roles */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Roles</h2>
        <div className="flex overflow-x-auto space-x-6 pb-4">
          {/* Example Role Card */}
          <div className="min-w-[300px] bg-gray-1000 rounded-lg p-4 shadow-md">
            <h3 className="text-xl font-semibold">VR Research Assistant</h3>
            <p className="text-sm text-gray-300">Brown Visual Computing Lab · 2024–2025</p>
            <p className="mt-2 text-sm">
              Worked on a VR teleoperation interface for Boston Dynamics Spot using Unity and ROS.
            </p>
          </div>
          <div className="min-w-[300px] bg-gray-1000 rounded-lg p-4 shadow-md">
            <h3 className="text-xl font-semibold">VR Research Assistant</h3>
            <p className="text-sm text-gray-300">Brown Visual Computing Lab · 2024–2025</p>
            <p className="mt-2 text-sm">
              Worked on a VR teleoperation interface for Boston Dynamics Spot using Unity and ROS.
            </p>
          </div>
          <div className="min-w-[300px] bg-gray-1000 rounded-lg p-4 shadow-md">
            <h3 className="text-xl font-semibold">VR Research Assistant</h3>
            <p className="text-sm text-gray-300">Brown Visual Computing Lab · 2024–2025</p>
            <p className="mt-2 text-sm">
              Worked on a VR teleoperation interface for Boston Dynamics Spot using Unity and ROS.
            </p>
          </div>
          <div className="min-w-[300px] bg-gray-1000 rounded-lg p-4 shadow-md">
            <h3 className="text-xl font-semibold">VR Research Assistant</h3>
            <p className="text-sm text-gray-300">Brown Visual Computing Lab · 2024–2025</p>
            <p className="mt-2 text-sm">
              Worked on a VR teleoperation interface for Boston Dynamics Spot using Unity and ROS.
            </p>
          </div>
          <div className="min-w-[300px] bg-gray-1000 rounded-lg p-4 shadow-md">
            <h3 className="text-xl font-semibold">VR Research Assistant</h3>
            <p className="text-sm text-gray-300">Brown Visual Computing Lab · 2024–2025</p>
            <p className="mt-2 text-sm">
              Worked on a VR teleoperation interface for Boston Dynamics Spot using Unity and ROS.
            </p>
          </div>

          {/* Repeat for each role... */}
        </div>
      </section>

      <hr className="border-gray-600" />

      {/* Section 3: References */}
      <section className="max-w-5xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold">References</h2>

        {/* Example Reference */}
        <div className="bg-gray-1000 p-6 rounded-lg shadow">
          <p className="italic text-lg">
            “Arin is one of the most technically curious and dedicated students I’ve worked with.
            His work on our VR pipeline was instrumental in pushing the project forward.”
          </p>
          <p className="mt-4 text-sm text-gray-400">— Prof. James Tompkin, Brown University</p>
        </div>
        <div className="bg-gray-1000 p-6 rounded-lg shadow">
          <p className="italic text-lg">
            “Arin is one of the most technically curious and dedicated students I’ve worked with.
            His work on our VR pipeline was instrumental in pushing the project forward.”
          </p>
          <p className="mt-4 text-sm text-gray-400">— Prof. James Tompkin, Brown University</p>
        </div>
        <div className="bg-gray-1000 p-6 rounded-lg shadow">
          <p className="italic text-lg">
            “Arin is one of the most technically curious and dedicated students I’ve worked with.
            His work on our VR pipeline was instrumental in pushing the project forward.”
          </p>
          <p className="mt-4 text-sm text-gray-400">— Prof. James Tompkin, Brown University</p>
        </div>

        {/* Add more references here */}
      </section>
    </div>
  );
}
