'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';


export default function AboutPage() {
  
  return (
    <div className="min-h-screen bg-gray-1200 text-white px-6 py-16 space-y-24">
      
      {/* Section 1: About Me */}
      <section className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-20">
        <div className="w-[1600px] h-[400px] relative -ml-12">
          <Image
            src={'/Arin1.jpg'}
            alt="Arin"
            fill
            className="object-cover rounded-xl transition-all duration-700"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">Hi, I’m Arin!</h1>
          <p className="text-lg mb-4">
            I’m a senior at Brown University studying Computer Science. I adore working on problems at the intersection of Computer Graphics, Computer Vision, and Software Engineering. Currently, I’m a Camera Software Intern at Metalenz, where I’m developing CHI nodes for our Qualcomm based camera framework. 
            
          </p>
          <p className="text-lg mb-6">
           I’m also a research assistant in Brown’s Visual Computing Lab where I am improving depth completion models for our VR teleoperation project. This fall, I’ll be returning as a teaching assistant for Brown’s Computer Graphics course. Outside the lab and classroom, you’ll likely find me taking pictures or gushing over the cinematography in my favorite films.

          </p>
          <p className="text-lg">
            <span className="font-semibold">Relevant coursework:</span> Computer Graphics, Deep Learning, Computer Vision, Linear Algebra.
          </p>
        </div>
      </section>

      <hr className="border-gray-600" />

      {/* Section 2: Roles */}
      <section className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Roles</h2>
      <div className="flex overflow-x-auto space-x-6 pb-4">

        {/* Incoming Camera Software Intern */}
        <div className="min-w-[300px] bg-gray-1000 rounded-lg p-4 shadow-md">
          <h3 className="text-xl font-semibold">Camera Software Intern</h3>
          <p className="text-sm text-gray-300">Metalenz · Summer 2025</p>
          <p className="mt-2 text-sm">
            Developing custom CHI nodes for Metalenz' Qualcomm based Camera Pipeline.
          </p>
        </div>

        {/* VR Research Assistant */}
        <div className="min-w-[300px] bg-gray-1000 rounded-lg p-4 shadow-md">
          <h3 className="text-xl font-semibold">VR Research Assistant</h3>
          <p className="text-sm text-gray-300">Brown Visual Computing Lab · Fall 2024</p>
          <p className="mt-2 text-sm">
            Conducting research under Prof. James Tompkin for a VR teleoperation project using the Boston Dynamics Spot robot.
            Improving 3D point cloud rendering from Spot’s sensors by refining depth completion models for sparse-to-dense reconstruction.
            Probed depth completion models by overfitting on small batches to analyze edge reconstruction capabilities.
          </p>
        </div>

        {/* ASWF Summer Learning Program */}
        <div className="min-w-[300px] bg-gray-1000 rounded-lg p-4 shadow-md">
          <h3 className="text-xl font-semibold">ASWF Engagement Team</h3>
          <p className="text-sm text-gray-300">Academy Software Foundation · Summer 2025</p>
          <p className="mt-2 text-sm">
            Helped organize the Summer Learning Program at ASWF, organized and led career building workshops and social events for a cohort of 20 mentees.
          </p>
        </div>

        <div className="min-w-[300px] bg-gray-1000 rounded-lg p-4 shadow-md">
          <h3 className="text-xl font-semibold">Summer Learning Mentee</h3>
          <p className="text-sm text-gray-300">Academy Software Foundation · Summer 2024</p>
          <p className="mt-2 text-sm">
            Built 3 C++ games in Unreal Engine 5. Created dynamic sand shaders, physics handlers, and Maya tools using Qt, Python, and MEL.
          </p>
        </div>

        {/* Teaching Assistant Roles */}
        <div className="min-w-[300px] bg-gray-1000 rounded-lg p-4 shadow-md">
          <h3 className="text-xl font-semibold">Teaching Assistant & Course Developer</h3>
          <p className="text-sm text-gray-300">Brown University · Fall 2023 – Fall 2025</p>
          <p className="mt-2 text-sm">
            TA for Computer Graphics, Linear Algebra, and Data Structures. Graded 100+ projects, conducted 30+ design checks, and built course websites with React and Node.js.
          </p>
        </div>

        {/* Program Coordinator - International Mentoring Program */}
        <div className="min-w-[300px] bg-gray-1000 rounded-lg p-4 shadow-md">
          <h3 className="text-xl font-semibold">Program Coordinator</h3>
          <p className="text-sm text-gray-300">Global Brown Center · Spring 2024 – Fall 2025</p>
          <p className="mt-2 text-sm">
            Led International Orientation for 300+ students. Recruited and trained 25 student mentors, organized webinars, created info guides, and produced welcome video.
          </p>
        </div>

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
