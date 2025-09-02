import { Project, MediaItem, NavItem } from '@/types'

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Creative', href: '/creative' },
  { label: 'Resume', href: 'https://drive.google.com/file/d/108JVdP6HlZitvbNiJOApy3CdLCLKe363/view?usp=sharing'},
]

const projects: Project[] = [
  {
    title: "ReSTIR for Realtime Path-Tracing",
description: "An implementation of Nvidia's ReSTIR Algorithm for improving real time rendering",
fullDescription: (
  <div className="space-y-6 text-gray-300">

    <p>
      Path Tracing captures some beautiful light phenomena (color bleeding, soft shadows, caustics, the list goes on). 
      As amazing as this algorithm is, it is also computationally expensive (the offline path tracer I wrote for our graphics course can take minutes to render a high sample frame). 
      For our final project in our Advanced Graphics Course, we wanted to make this algorithm fast, real-time fast.
    </p>

    <p>
      We explore Nvidia’s paper on <a href="https://benedikt-bitterli.me/restir/" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-400">
      Spatiotemporal Reservoir Resampling for Real-Time Ray Tracing (ReSTIR)</a> as a potential solution to real-time path tracing. 
      We build our ReSTIR implementation on top of an existing OpenGL ray tracer (<a href="https://github.com/knightcrawler25/GLSL-PathTracer" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-400">GitHub repo</a>).
    </p>

    <h3 className="text-lg font-semibold mt-6">Results</h3>
    <p>Here are some results that show the effect of our implementation. Both sides use the same number of samples, but our implementation significantly reduces noise:</p>

    <div className="grid grid-cols-1 gap-6 mt-4">

      <figure className="flex flex-col items-center">
        <img
          src="https://i.imgur.com/iS65lhs.gif"
          alt="Hyperion scene ReSTIR vs naive sampling"
          className="rounded-lg border border-gray-700 w-full max-w-4xl"
        />
        <figcaption className="text-sm mt-2 text-gray-400 text-center max-w-4xl">
          Hyperion Scene with 500 lights — Left: ReSTIR, Right: Naive sampling
        </figcaption>
      </figure>

      <figure className="flex flex-col items-center space-y-4">
        <img
          src="https://i.imgur.com/diCPTVD.png"
          alt="Armadillo naive sampling"
          className="rounded-lg border border-gray-700 w-full max-w-4xl"
        />
        <img
          src="https://i.imgur.com/AgGsnOb.png"
          alt="Armadillo ReSTIR sampling"
          className="rounded-lg border border-gray-700 w-full max-w-4xl"
        />
        <figcaption className="text-sm text-gray-400 text-center max-w-4xl">
          Armadillo scene with 1000 lights — Left: Naive sampling, Right: ReSTIR sampling
        </figcaption>
      </figure>

      <figure className="flex flex-col items-center">
        <img
          src="https://i.imgur.com/sc4sgT4.png"
          alt="ReSTIR enhances denoisers"
          className="rounded-lg border border-gray-700 w-full max-w-4xl"
        />
        <figcaption className="text-sm mt-2 text-gray-400 text-center max-w-4xl">
          ReSTIR enhances denoisers by providing better input samples
        </figcaption>
      </figure>

      <figure className="flex flex-col items-center">
        <img
          src="https://i.imgur.com/LpIZGkP.png"
          alt="Candlelit scene with ReSTIR"
          className="rounded-lg border border-gray-700 w-full max-w-4xl"
        />
        <figcaption className="text-sm mt-2 text-gray-400 text-center max-w-4xl">
          Complex candlelit scene
        </figcaption>
      </figure>

    </div>

    <h3 className="text-lg font-semibold mt-8">Summary</h3>
    <p>
      Naive Path Tracing involves randomly sampling lights to solve the lighting contribution from direct lighting. 
      For complex scenes with multiple lights, this creates noise, especially when tracing a few rays per pixel due to computational constraints (games, and other real-time cases). 
      ReSTIR smartly samples the lights based on their lighting contributions. Lights are now sampled proportionally to how much light (radiance) they bring to a point. 
      Further, the algorithm comes up with a clever way for pixels to share insights about the ideal light candidates across neighbor pixels (spatial sharing) and their ancestors from previous frames (temporal sharing). 
      This helps us drastically reduce the noise and produces higher quality images with fewer compute.
    </p>

    <h3 className="text-lg font-semibold mt-8">My Contributions</h3>
    <p>
      I specifically worked on implementing spatial reservoir reuse. Here, we combine the reservoirs of neighboring pixels if they are mergeable. 
      We merge two reservoirs if the normals and distance to the camera of the samples are within a fixed threshold. 
      This makes sure we don’t merge the reservoirs of neighbors that are very far apart or differently oriented.
    </p>

    <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm font-mono text-gray-100">
{`const int num_iters = 4;
const int num_neighs = 4;

void main(void)
{
    ivec2 cur_pix = ivec2(gl_FragCoord.xy);
    Reservoir cur = GetReservoirFromPosition(ivec2(gl_FragCoord.xy));

    bool useSpatial = (TexCoords.x > (2.0/3.0));

    for (int i = 0; i < num_iters; i++) {
        for (int n = 0; n < num_neighs; n++) {
            ivec2 offset = get_offset();
            ivec2 neigh = cur_pix + offset;
            if (in_bounds(neigh)) {
                Reservoir neighbor = GetReservoirFromPosition(neigh);
                if (mergeable(cur, neighbor)) {
                    cur = CombineReservoirs(cur, neighbor);
                }
            }
        }
    }

    SaveReservoir(cur);
}`}
    </pre>

    <p>
      Further, I worked on implementing the math behind resampled importance sampling, where we compute the weight of a light sample based on its lighting contribution. 
      We use the unshadowed path contribution <code className="bg-gray-800 px-1 rounded">P(x) = p(x) L_e(x) G(x)</code> as the measure of this lighting contribution.
    </p>

    <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm font-mono text-gray-100">
{`ReservoirSample ret;
float pHat = CalculatePHat(Ld);
if (lightSample.pdf > 0.0f)
    ret.weight = (pHat / lightSample.pdf);
else
    ret.weight = 0;

cur = UpdateReservoir(cur, ret, ret.weight);

Reservoir UpdateReservoir(Reservoir r, ReservoirSample sam, float weight) {
    if (weight <= 0.000001) {
        return r;
    }

    r.sumWeights += weight;
    r.numberOfWeights += 1;
    float weightDiv = weight / r.sumWeights;
    if (rand() < (weightDiv)) {
        r.sam = sam;
    }
    return r;
}`}
    </pre>

    <p>
      Finally, I worked on generating the initial candidate light samples and ray casting for these samples. The complete code is shared below.
    </p>

  </div>
),


    skills: ["C++", "OpenGL", "GLSL", "Realtime Rendering"],
    features: [
      "Realtime Path Tracing",
      "Variance Reduction",
      "Resampled Importance Sampling",
      "Reservoir Sampling",
      "Spatial and Temporal Reuse"
    ],
    liveUrl: "https://imgur.com/a/7oP3Gkv",
    githubUrl: "https://github.com/Arin1604/2240-restir.git",
    imageUrl: "https://i.imgur.com/22jWCY0.png"
  },
  {
    title: "ARAP (As Rigid As Possible Mesh Deformations)",
    description: "A mesh deformation application that preserves surface rigidity",
    fullDescription: (
      <div className="space-y-6 text-gray-300">

        <p>
          Making meshes move is incredibly fun (look at the Armadillo wave!). 
          But how exactly do you go from moving vertices to physically plausible movement that preserves the form of the mesh? Enter ARAP!
        </p>

        <p>
          I implemented the <a href="https://igl.ethz.ch/projects/ARAP/arap_web.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-400">
          As-Rigid-As-Possible Surface Modeling</a> paper for our assignment in Advanced Computer Graphics. 
          The goal is to define a locally shape-preserving deformation, which preserves details in the mesh during deformation.
        </p>

        <h3 className="text-lg font-semibold mt-6">Results</h3>
        <p>Here are some examples comparing naive vertex movement vs ARAP:</p>

        <div className="grid grid-cols-1 gap-6 mt-4">

          <figure className="flex flex-col items-center">
            <img
              src="https://i.imgur.com/CKuVXBc.gif"
              alt="Side by side naive vs ARAP"
              className="rounded-lg border border-gray-700 w-full max-w-4xl h-auto"
            />
            <figcaption className="text-sm mt-2 text-gray-400 text-center max-w-4xl">
              Left: Moving a single vertex naively, Right: ARAP deformation
            </figcaption>
          </figure>

          <figure className="flex flex-col items-center">
            <img
              src="https://i.imgur.com/d3gibgL.gif"
              alt="ARAP Armadillo wave"
              className="rounded-lg border border-gray-700 w-full max-w-4xl h-auto"
            />
            <figcaption className="text-sm mt-2 text-gray-400 text-center max-w-4xl">
              Armadillo waving using ARAP
            </figcaption>
          </figure>

          <figure className="flex flex-col items-center">
            <img
              src="https://i.imgur.com/t6qgc5i.gif"
              alt="Moving teapot"
              className="rounded-lg border border-gray-700 w-full max-w-4xl h-auto"
            />
            <figcaption className="text-sm mt-2 text-gray-400 text-center max-w-4xl">
              Moving Teapot
            </figcaption>
          </figure>

          <figure className="flex flex-col items-center">
            <img
              src="https://i.imgur.com/tHesSC8.gif"
              alt="Moving bean"
              className="rounded-lg border border-gray-700 w-full max-w-4xl h-auto"
            />
            <figcaption className="text-sm mt-2 text-gray-400 text-center max-w-4xl">
              Moving Bean
            </figcaption>
          </figure>

        </div>

        <h3 className="text-lg font-semibold mt-8">Summary</h3>
        <p>
          The key to preserving local features is minimizing local rigidity energy per cell. 
          Each cell for a vertex <code>p_i</code> is defined as the one-ring neighborhood of vertices around <code>p_i</code>, denoted <code>C_i</code>.
        </p>

        <figure className="flex flex-col items-center">
          <img
            src="https://i.imgur.com/eQVjxLA.jpeg"
            alt="Cell diagram"
            className="rounded-lg border border-gray-700 w-full max-w-4xl h-auto"
          />
          <figcaption className="text-sm mt-2 text-gray-400 text-center max-w-4xl">
            Cell defined for vertex p_i
          </figcaption>
        </figure>

        <p>
          When a user deforms the mesh, vertices are displaced. Let the new positions be <code>p_i'</code>, <code>p_j'</code> and edge <code>e_ij'</code>. 
          Let <code>R_i</code> denote the rotation describing the transformation from <code>e_ij</code> to <code>e_ij'</code>.
        </p>

        <figure className="flex flex-col items-center">
          <img
            src="https://i.imgur.com/txbu9Ui.jpeg"
            alt="Rotation matrix diagram"
            className="rounded-lg border border-gray-700 w-full max-w-4xl h-auto"
          />
          <figcaption className="text-sm mt-2 text-gray-400 text-center max-w-4xl">
            Rotation for vertex p_i
          </figcaption>
        </figure>

        <p className="font-mono bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm text-gray-100">
          {'p_i\' - p_j\' = R_i * (p_i - p_j), ∀ j ∈ N(i)'}
        </p>

        <p className="font-mono bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm text-gray-100">
          {'E(C_i, C_i\') = Σ_{j∈N(i)} w_ij ||(p_i\' - p_j\') - R_i(p_i - p_j)||^2'}
        </p>

        <h3 className="text-lg font-semibold mt-6">Implementation Details</h3>
        <p>
          The goal is to find new vertices <code>p'</code> that minimize the local rigidity energy after a user moves vertices. 
          We solve for <code>p'</code> using an iterative approach:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Store the original mesh configuration.</li>
          <li>Get initial new positions from user input.</li>
          <li>Iteratively compute rotations per vertex minimizing surface rigidity energy.</li>
          <li>Use these rotations to optimize new vertices by solving the sparse linear system <code>L p' = b</code>.</li>
        </ul>

        <figure className="flex flex-col items-center">
          <img
            src="https://i.imgur.com/gQx03DT.jpeg"
            alt="Cotangent weights"
            className="rounded-lg border border-gray-700 w-full max-w-4xl h-auto"
          />
          <figcaption className="text-sm mt-2 text-gray-400 text-center max-w-4xl">
            Cotangent weights for edges
          </figcaption>
        </figure>

        <figure className="flex flex-col items-center">
          <img
            src="https://i.imgur.com/UZ4zTWf.jpeg"
            alt="Vertex neighbors"
            className="rounded-lg border border-gray-700 w-full max-w-4xl h-auto"
          />
          <figcaption className="text-sm mt-2 text-gray-400 text-center max-w-4xl">
            One-ring neighbors for vertex i
          </figcaption>
        </figure>

        <p>
          We populate the <code>L</code> matrix for all vertices and neighbors, zeroing out rows/columns for anchored vertices. 
          Then, using computed rotations, we construct <code>b</code> and solve <code>L p' = b</code> with Eigen’s <code>SimplicialLDLT</code> solver.
        </p>

      </div>
    ),
    skills: ["C++", "Eigen", "Sparse Linear Algebra", "Mesh Deformation"],
    features: [
      "ARAP Surface Modeling",
      "Local Rigidity Preservation",
      "Sparse Linear System Solver",
      "Interactive Mesh Deformations"
    ],
    liveUrl: "https://i.imgur.com/CKuVXBc.gif",
    githubUrl: "https://github.com/Arin1604/ARAP-Mesh-Deformation",
    imageUrl: "https://i.imgur.com/CKuVXBc.gif"
  },
  {
    title: "Fitness Tracker",
    description: "A mobile app for tracking workouts and nutrition.",
    fullDescription: (
      <div className="space-y-4 text-gray-300">
        <p>
          Fitness Tracker is a mobile application designed to help users log their workouts and monitor their nutrition.
        </p>
        <img
          src="/images/fitness-dashboard.png"
          alt="Fitness App Dashboard"
          className="rounded-lg border border-gray-700"
        />
        <p>
          Users receive personalized workout suggestions based on their fitness goals, as well as nutritional advice.
          Progress is visualized with interactive charts and graphs.
        </p>
        <img
          src="/images/fitness-graph.png"
          alt="Fitness Progress Chart"
          className="rounded-lg border border-gray-700"
        />
        <p>
          The app integrates with Firebase for backend services like authentication and real-time data sync.
        </p>
      </div>
    ),
    skills: ["React Native", "Firebase"],
    features: [
      "Workout logging and tracking",
      "Nutritional information and meal logging",
      "Progress analytics and charts",
      "Workout suggestions based on user goals",
      "Social sharing of achievements"
    ],
    liveUrl: "https://fitness-tracker-app.com",
    githubUrl: "https://github.com/yourusername/fitness-tracker",
    imageUrl: "/projects/fitness-tracker.jpg"
  }
];


export const mediaItems: MediaItem[] = [
  {
    type: 'video',
    title: 'Animation Project',
    description: 'A short animated piece exploring...',
    thumbnail: '/creative/video1-thumb.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=QHscMam4W7s'
  },
  {
    type: 'video',
    title: 'Another Animation Project',
    description: 'A second animated piece...',
    thumbnail: '/creative/video2-thumb.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=7aWL2iEb6y4'
  },
  {
    type: 'photo',
    title: 'Photography Series',
    description: 'Exploring urban landscapes...',
    thumbnail: '/creative/images/one.jpg',
    fullImage: '/creative/photo1-full.jpg'
  },
  {
    type: 'photo',
    title: 'Photography Series',
    description: 'Exploring urban landscapes...',
    thumbnail: '/creative/images/two.jpg',
    fullImage: '/creative/photo2-full.jpg'
  },
];

export const socialLinks = {
  github: "https://github.com/Arin1604",
  linkedin: "https://linkedin.com/in/arin-idhant-111860258/",
  email: "arin_idhant@brown.edu"
}

export { projects };
