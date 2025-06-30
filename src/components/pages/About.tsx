export default function About() {
  return (
    <main className="min-h-screen bg-gray-1200 pt-20 text-white px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Me</h1>
        <p className="mb-4 text-lg">
          Hi! My name is Arin, and 
          I’m a senior at Brown University studying Computer Science. 
          I’m deeply passionate about Computer Graphics, Computer Vision, 
          and Software Engineering. Currently, I’m a Camera Software Intern at Metalenz, 
          where I’m working on Qualcomm-based camera pipeline drivers. I’m also a research assistant in 
          Brown’s Visual Computing Lab, focusing on improving depth completion models for our VR teleoperation project. 
          This fall, I’ll be returning as a teaching assistant for Brown’s Computer Graphics course. Outside the lab and classroom, you’ll likely find me taking pictures or gushing over the cinematography in my favorite films at the theater.
        </p>
        <p className="mb-4 text-lg">
          My recent work includes contributing to a VR teleoperation project using the Boston Dynamics Spot robot,
          building tools in Unity and C#, and developing a physically-based ray tracer from scratch.
        </p>
        <p className="mb-4 text-lg">
          Outside of tech, I enjoy exploring visual storytelling, writing tools for Maya, and experimenting
          with real-time shaders.
        </p>
      </div>
    </main>
  );
}
