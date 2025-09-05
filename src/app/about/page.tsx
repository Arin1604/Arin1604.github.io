'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';


export default function AboutPage() {
  
  return (
    <div className="min-h-screen bg-gray-1200 text-white px-6 py-16 space-y-12">
      
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
          <ul className="mt-2 text-sm list-disc list-inside space-y-2">
            <li>Developed a face detection camera node for Android using Qualcomm’s Camera Development Kit.</li>
            <li>Integrated the node into a new image processing pipeline in the Qualcomm CHI layer.</li>
            <li>Improved biometric data security and lowered pipeline latency by ~25%.</li>
          </ul>
        </div>

        {/* VR Research Assistant */}
        <div className="min-w-[300px] bg-gray-1000 rounded-lg p-4 shadow-md">
          <h3 className="text-xl font-semibold">Research Assistant</h3>
          <p className="text-sm text-gray-300">Brown Visual Computing Lab · Fall 2024 - Present</p>
          <ul className="mt-2 text-sm list-disc list-inside space-y-2">
            <li>Conducting research under Prof. James Tompkin for a VR teleoperation project using the Boston Dynamics Spot robot.</li>
            <li>Improving 3D point cloud rendering from Spot’s sensors by refining depth completion models for sparse-to-dense reconstruction.</li>
            <li>Probed depth completion models by overfitting on small batches to analyze edge reconstruction capabilities.</li>
          </ul>
        </div>

        {/* ASWF Summer Learning Program */}
        <div className="min-w-[300px] bg-gray-1000 rounded-lg p-4 shadow-md">
          <h3 className="text-xl font-semibold">ASWF Engagement Team</h3>
          <p className="text-sm text-gray-300">Academy Software Foundation · Summer 2025</p>
          <ul className="mt-2 text-sm list-disc list-inside space-y-2">
            <li>Helped organize the Summer Learning Program at ASWF.</li>
            <li>Organized and led career-building workshops and social events for a cohort of 20 mentees.</li>
          </ul>
        </div>

        <div className="min-w-[300px] bg-gray-1000 rounded-lg p-4 shadow-md">
          <h3 className="text-xl font-semibold">Summer Learning Mentee</h3>
          <p className="text-sm text-gray-300">Academy Software Foundation · Summer 2024</p>
          <ul className="mt-2 text-sm list-disc list-inside space-y-2">
            <li>Built 3 C++ games in Unreal Engine 5.</li>
            <li>Created dynamic sand shaders, physics handlers, and Maya tools using Qt, Python, and MEL.</li>
          </ul>
        </div>

        {/* Teaching Assistant Roles */}
        <div className="min-w-[300px] bg-gray-1000 rounded-lg p-4 shadow-md">
          <h3 className="text-xl font-semibold">Teaching Assistant & Course Developer</h3>
          <p className="text-sm text-gray-300">Brown University · Fall 2023 – Fall 2025</p>
          <ul className="mt-2 text-sm list-disc list-inside space-y-2">
            <li>TA for Computer Graphics, Linear Algebra, and Data Structures.</li>
            <li>Graded 100+ projects and conducted 30+ design checks.</li>
            <li>Built course websites with React and Node.js.</li>
          </ul>
        </div>

        {/* Program Coordinator - International Mentoring Program */}
        <div className="min-w-[300px] bg-gray-1000 rounded-lg p-4 shadow-md">
          <h3 className="text-xl font-semibold">Program Coordinator</h3>
          <p className="text-sm text-gray-300">Global Brown Center · Spring 2024 – Fall 2025</p>
          <ul className="mt-2 text-sm list-disc list-inside space-y-2">
            <li>Led International Orientation for 300+ students.</li>
            <li>Recruited and trained 25 student mentors.</li>
            <li>Organized webinars, created info guides, and produced welcome video.</li>
          </ul>
        </div>


      </div>
    </section>

      <hr className="border-gray-600" />

      
    </div>
  );
}
