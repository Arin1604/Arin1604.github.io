import { Project, MediaItem, NavItem } from '@/types'
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';


export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Creative', href: '/creative' },
  { label: 'Reel', href: 'https://youtu.be/Mv9fZjKDHV0?si=E0RHpHYgqntDH9ty'},
  { label: 'Resume', href: 'https://drive.google.com/file/d/1ovfAtUsS8xev4nEhdVCBUYgCpxKu5uOS/view?usp=sharing'},
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
        <p>Here we can see the difference between naive vertex movement and ARAP:</p>

        <div className="grid grid-cols-1 gap-6 mt-4">

          <figure className="flex flex-col items-center">
            <img
              src="https://i.imgur.com/CKuVXBc.gif"
              alt="Side by side naive vs ARAP"
              className="rounded-lg border border-gray-700 w-full max-w-lg h-auto"
            />
            <figcaption className="text-sm mt-2 text-gray-400 text-center max-w-lg">
              Moving a single vertex without ARAP
            </figcaption>
          </figure>

          <figure className="flex flex-col items-center">
            <img
              src="https://i.imgur.com/d3gibgL.gif"
              alt="ARAP Armadillo wave"
              className="rounded-lg border border-gray-700 w-full max-w-lg h-auto"
            />
            <figcaption className="text-sm mt-2 text-gray-400 text-center max-w-lg">
              Armadillo waving using ARAP
            </figcaption>
          </figure>

          <h3 className="text-lg font-semibold mt-6">Some more results:</h3>
          <figure className="flex flex-col items-center">
            <img
              src="https://i.imgur.com/t6qgc5i.gif"
              alt="Moving teapot"
              className="rounded-lg border border-gray-700 w-full max-w-lg h-auto"
            />
            <figcaption className="text-sm mt-2 text-gray-400 text-center max-w-lg">
              Moving Teapot
            </figcaption>
          </figure>

          <figure className="flex flex-col items-center">
            <img
              src="https://i.imgur.com/tHesSC8.gif"
              alt="Moving bean"
              className="rounded-lg border border-gray-700 w-full max-w-lg h-auto"
            />
            <figcaption className="text-sm mt-2 text-gray-400 text-center max-w-lg">
              Moving Bean
            </figcaption>
          </figure>

        </div>

        <h3 className="text-lg font-semibold mt-8">Summary</h3>
        <p>
          But how exactly do we preserve local features? The key is to minimize local rigidity energy per cell! But what does <em>minimizing local rigidity energy per cell</em> mean?
           
          Each cell for a vertex <code>p_i</code> is defined as the one-ring neighborhood of vertices around <code>p_i</code>, denoted <code>C_i</code>.
        </p>

        <figure className="flex flex-col items-center">
  <img
    src="https://i.imgur.com/eQVjxLA.jpeg"
    alt="Cell diagram"
    className="rounded-lg border border-gray-700 w-full max-w-lg h-auto"
  />
  <figcaption className="text-sm mt-2 text-gray-400 text-center max-w-lg">
    Cell defined for vertex <code>p_i</code>
  </figcaption>
</figure>


        <p>
        When a user deforms the mesh, vertices are displaced. Let the new positions be <code>p_i'</code>, <code>p_j'</code>, and the new edge be <code>e_ij'</code>. 
        Let <code>R_i</code> denote the rotation describing the transformation from <code>e_ij</code> to <code>e_ij'</code>.
      </p>

        <figure className="flex flex-col items-center">
          <img
            src="https://i.imgur.com/txbu9Ui.jpeg"
            alt="Rotation matrix diagram"
            className="rounded-lg border border-gray-700 w-full max-w-lg h-auto"
          />
          <figcaption className="text-sm mt-2 text-gray-400 text-center max-w-lg">
            Rotation for vertex p_i
          </figcaption>
        </figure>

        <p>
          For a perfectly rigid transformation, we can say that: 
        </p>

        <BlockMath math={`\\mathbf{p}'_i - \\mathbf{p}'_j = \\mathbf{R}_i(\\mathbf{p}_i - \\mathbf{p}_j), \\quad \\forall j \\in \\mathcal{N}(i)`} />


        <p>
          But for our case, where the deformations aren’t perfectly rigid, we want to preserve local features by defining rotations that are as rigid as possible. That is, they minimize:
        </p>

        <BlockMath math={`E(\\mathcal{C}_i, \\mathcal{C}'_i) = \\sum_{j \\in \\mathcal{N}(i)} w_{ij} \\left\\| (\\mathbf{p}'_i - \\mathbf{p}'_j) - \\mathbf{R}_i(\\mathbf{p}_i - \\mathbf{p}_j) \\right\\|^2`} />


        <p>
          This is local rigidity energy, and minimizing it across all vertices helps us preserve local features.

        </p>

        <h3 className="text-lg font-semibold mt-6">Implementation Details</h3>
        <p>
          The key goal is to find the new vertices <code>p'</code> that minimize the local rigidity energy for a mesh after it has been deformed by a user. 
          This allows us to preserve local features while moving the mesh in interesting ways (like making our armadillo wave).
        </p>

        <p>
          We solve for these new vertices using an iterative approach:
        </p>

        <ul className="list-disc list-inside space-y-1">
          <li>Store the original configuration of the mesh.</li>
          <li>Get the initial new positions from the user when the vertices are moved.</li>
          <li>Compute rotations for each vertex that minimize the surface rigidity energy for the new positions. (Initially, these are the user-constrained input positions. Subsequent iterations use the updated vertices from the previous step.)</li>
          <li>Use these rotations to optimize for new vertices by solving the sparse linear system <code>L p' = b</code>.</li>
        </ul>

        <p>We will initialize a sparse Laplacian matrix that will encode the relationship between the vertices. This requires a preparatory step where we prepare the cotangent weights for all the edges in our mesh. It is defined as follows:</p>

        <figure className="flex flex-col items-center">
          <img
            src="https://i.imgur.com/gQx03DT.jpeg"
            alt="Cotangent weights"
            className="rounded-lg border border-gray-700 w-full max-w-lg h-auto"
          />
          <figcaption className="text-sm mt-2 text-gray-400 text-center max-w-lg">
            Cotangent weights for edges
          </figcaption>
        </figure>

        <p>Once these edges are defined, we initialize an NxN sparse matrix that stores the cotangent weights for the vertex and its neighbor.

Consider a vertex i and its neighbor p below:
</p>

        

        <figure className="flex flex-col items-center">
          <img
            src="https://i.imgur.com/UZ4zTWf.jpeg"
            alt="Vertex neighbors"
            className="rounded-lg border border-gray-700 w-full max-w-lg h-auto"
          />
          <figcaption className="text-sm mt-2 text-gray-400 text-center max-w-lg">
            One-ring neighbors for vertex i
          </figcaption>
        </figure>

        <p>We will add the following entries to L:</p>

        <ul className="list-disc list-inside space-y-1">
        <li><InlineMath math="L_{ip} = L_{pi} = -w_{ip}" /></li>
        <li><InlineMath math="L_{iq} = L_{qi} = -w_{iq}" /></li>
        <li><InlineMath math="L_{ir} = L_{ri} = -w_{ir}" /></li>
        <li><InlineMath math="L_{is} = L_{si} = -w_{is}" /></li>
        <li><InlineMath math="L_{ii} = \sum_{n \in N(i)} w_{in}" /></li>
      </ul>

      <figure className="flex flex-col items-center">
  <img
    src="https://i.imgur.com/fcHlcqp.jpeg"
    alt="Sparse L matrix example"
    className="rounded-lg border border-gray-700 w-full max-w-lg h-auto"
  />
  <figcaption className="text-sm mt-2 text-gray-400 text-center max-w-lg">
    Example of sparse <code>L</code> matrix entries for vertex <code>i</code> and its neighbor p
  </figcaption>
</figure>

        <p>
  We populate entries in the <code>L</code> matrix for all vertices and their neighbors. 
  Since we are only concerned with one-ring neighborhoods to define a cell, most entries in <code>L</code> remain empty, as each vertex only connects to its immediate one-ring neighbors.
</p>

<p>
  When a user anchors a point, we zero out the corresponding row and column in the <code>L</code> matrix. 
  This effectively removes that vertex from the iterative optimization and fixes its position in place.
</p>

<p>
  This gives us the <code>L</code> matrix in the equation we are trying to solve:
</p>

<BlockMath math={`L \\mathbf{p}' = \\mathbf{b}`} />

<p>
  Next, we compute rotation matrices for each vertex that best preserve the rigidity of its cell. 
  Once these rotations are determined, we use them to construct the right-hand side vector <code>b</code>.
</p>

<p>
  Finally, we apply Eigen’s <code>SimplicialLDLT</code> solver to efficiently solve this sparse system and compute the updated vertex positions <code>p'</code>.
</p>


      </div>
    ),
    skills: ["C++", "Eigen", "Solving Systems of Equations", "Mesh Deformation"],
    features: [
      "ARAP Surface Modeling",
      "Local Rigidity Preservation",
      "Sparse Linear System Solver",
      "Interactive Mesh Deformations"
    ],
   
    imageUrl: "https://i.imgur.com/d3gibgL.gif"
  },
  {
    title: "Maya JellyFish Tool",
    description: "A python tool to automate modeling, rigging, and animating tentacles.",
    fullDescription: (
    <div className="space-y-6 text-gray-300">

      <p>
        I find jellyfish incredibly fascinating! (so much so that I made an{" "}
        <a
          href="https://youtu.be/ey2iszBzwdg?si=aq11VxjG131S0-iG"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-indigo-400"
        >
          abstract film
        </a>{" "}
        about them). With this project, I set out to create a tool that lets you create, rig, and animate jellyfish tentacles
        with full artistic control.
      </p>

      <p>
        A key challenge was generating and managing a large number of geometry objects while keeping the workflow 
        efficient and usable. For the animations, I use a blend of procedural noise (to represent their natural 
        movements) and rigging (for artists to make more personable and expressive animations).
      </p>

      <h3 className="text-lg font-semibold mt-6">Demo</h3>
      <div className="mt-2">
        <iframe
          width="100%"
          height="450"
          src="https://www.youtube.com/embed/LYCowWiCWmY"
          title="Jellyfish Rigging Tool Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg border border-gray-700 w-full"
          style={{ maxWidth: "800px" }}
        ></iframe>
      </div>

      <h3 className="text-lg font-semibold mt-6">Outputs</h3>
      <div className="grid grid-cols-1 gap-6 mt-4">
        <img src="https://i.imgur.com/SGgHkC7.jpeg" alt="Jellyfish render 1" className="rounded-lg border border-gray-700 w-full max-w-4xl" />
        <img src="https://i.imgur.com/2DvEIXt.jpeg" alt="Jellyfish render 2" className="rounded-lg border border-gray-700 w-full max-w-4xl" />
        <img src="https://i.imgur.com/74t7Eub.jpeg" alt="Jellyfish render 3" className="rounded-lg border border-gray-700 w-full max-w-4xl" />
        <img src="https://i.imgur.com/f02F6n1.jpeg" alt="Jellyfish render 4" className="rounded-lg border border-gray-700 w-full max-w-4xl" />
      </div>

      <h3 className="text-lg font-semibold mt-8">Reflections</h3>
      <p>
        I am particularly happy with how I incorporated feedback from my mentors (
        huge shoutout to{" "}
        <a 
          href="https://www.aswf.io/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="underline hover:text-indigo-400"
        >
          Academy Software Foundation
        </a>{" "}
        and the{" "}
        <a 
          href="https://www.aswf.io/summer-learning-program/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="underline hover:text-indigo-400"
        >
          Summer Learning Program
        </a>
        ) while building this tool. One of my main goals was to create a tool useful to artists 
        working in the animation industry. Relying on the insights of people far more artistically 
        inclined than I was helped me drastically improve the tool and made the process collaborative and fun. 
      </p>

      <p>Some of the many insights I gained and incorporated into my design included:</p>
      <ul className="list-disc list-inside space-y-2 text-gray-400">
        <li>Reworking the UI workflow — my original layout had an inverted workflow, placing the actions artists wanted first at the bottom of the tool.</li>
        <li>Using Maya’s <strong>Sweep Mesh</strong> for generating the geometry — I had originally intended to use Cylinder geometry nodes, but Sweep Meshes proved more effective as they exposed parameters like tapering point and scale for more artistic control.</li>
        <li>Improving rigging smoothness by balancing level of detail against computation costs.</li>
        <li>Writing a function to interpolate between points and add extra joints, enabling smoother rigging that adapts to parameters.</li>
      </ul>

      <p className="mt-4">
        On that note, if you test my tool and have suggestions, please reach out at 
        <span className="font-mono"> arin_idhant@brown.edu</span>. 
        I’d love your feedback and am driven to keep improving this project.
      </p>

      <h3 className="text-lg font-semibold mt-8">Implementation Details</h3>
      <h4 className="font-semibold mt-4">Geometry Generation</h4>
      <ul className="list-disc list-inside space-y-2 text-gray-400">
  <li>Used procedurally generated Bézier curves. Points for these curves are generated in a for loop, with the distance between points controlled by artist-adjustable parameters.</li>
  <li>These points and the curve are stored in a tentacle object.</li>
  <li>A sweep mesh is created using the generated Bézier curve, which produces the tentacle geometry. The sweep mesh handle is stored in the tentacle object.</li>
</ul>

      <h4 className="font-semibold mt-4">Rigging Smoothness (Linear Point Interpolation)</h4>
      <ul className="list-disc list-inside space-y-2 text-gray-400">
        <li>For each tentacle, the point density is adjusted so joint density can later be controlled.</li>
        <li>We take two points from the existing collection and incrementally generate new points between them so the new points align with the curve.</li>
        <li>A line segment is computed by subtracting one point from another, and intermediate points are created along this segment. The number of interpolated points (which determines smoothness) is controlled by an artist parameter.</li>
      </ul>

      <h4 className="font-semibold mt-4">Rigging the Mesh</h4>
      <ul className="list-disc list-inside space-y-2 text-gray-400">
        <li>Smooth the mesh to ensure tentacles bend smoothly.</li>
        <li>Create joints at each point and store them in the tentacle object.</li>
        <li>Create an IK spline handle for the joints. This produces a curve for the spline handle, which can be manipulated directly.</li>
        <li>The spline handle curve has control vertices (CVs). Clusters are created at each CV so the curve (and thus the joints) can be manipulated.</li>
        <li>Important: We cluster the CVs of the spline handle curve, not the original sweep mesh curve. Clustering the sweep mesh curve would directly deform the geometry, but we would lose the benefits of using joints and spline handles.</li>
        <li>Set cluster visibility to false, then create NURBS curve controllers to manipulate the clusters. Parent constrain the clusters to these controllers.</li>
        <li>Parent controllers and clusters under the tentacle to keep the Outliner organized.</li>
        <li>Finally, call skinCluster on the joints and tentacle geometry to bind them.</li>
      </ul>

      <h4 className="font-semibold mt-4">Animation</h4>
      <ul className="list-disc list-inside space-y-2 text-gray-400">
        <li>Applied procedural animation using trigonometric and randomization functions to displace controllers.</li>
        <li>Keyframed controllers for final animation.</li>
      </ul>

    </div>
  ),
    skills: ["Maya CMDS library", "Python"],
    features: [
      "Automated Geometry Generation",
      "Automated materials",
      "Automated Rigging",
      "Procedural Animations",
    ],
    githubUrl: "https://github.com/Arin1604/jellyfish-maker.git",
    imageUrl: "https://i.imgur.com/2DvEIXt.jpeg"
  }
];



export const mediaItems: MediaItem[] = [
  //AAA
  {
    type: 'videoy',
    title: "Don't Wash Your Clothes With Jellyfish",
    description:
      "A one-minute experimental film that explores the experience of having a fever dream far away from the warmth of home. My submission won second place at Brown's Film Club and was screened at the Avon Theater.",
    thumbnail: '/creative/images/one.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=ey2iszBzwdg'
  },
  {
    type: 'video',
    title: 'My final project for our film practices course',
    description: 'Shot on 16mm film using the Bolex.',
    thumbnail: '/creative/images/th.jpg',
    videoUrl: 'https://vimeo.com/1116011823?share=copy'
  },
  {
    type: 'video',
    title: "Assistant Camera – Please Excuse Me, I'm Destructive",
    description: 'Film for Brown Motion Pictures, where I worked as an Assistant Camera.',
    thumbnail: '/creative/images/pemd.png',
    videoUrl: 'https://vimeo.com/780614102?fl=pl&fe=sh'
  },

  {
    type: 'photo',
    title: 'Film Fireworks Album',
    description: 'Fireworks captured on 35mm Kodak Ultramax 400 Color Print Film ',
    thumbnail: 'https://live.staticflickr.com/65535/54764182203_c6e5bafde6_h.jpg', // smaller size for preview
    fullImage: 'https://live.staticflickr.com/65535/54764182203_c6e5bafde6_h.jpg' // can use larger size if available
  },


  // Flickr Photos
  {
    type: 'photo',
    title: 'Film Stills',
    description: 'Still from film work.',
    thumbnail: 'https://live.staticflickr.com/65535/54764191718_6c185e366f_z.jpg',
    fullImage: 'https://live.staticflickr.com/65535/54764191718_6c185e366f_z.jpg'
  },
  {
    type: 'photo',
    title: 'Film Stills',
    description: 'Still from film work.',
    thumbnail: 'https://live.staticflickr.com/65535/54765123471_fcff118353_z.jpg',
    fullImage: 'https://live.staticflickr.com/65535/54765123471_fcff118353_z.jpg'
  },
  {
    type: 'photo',
    title: 'Film Stills',
    description: 'Still from film work.',
    thumbnail: 'https://live.staticflickr.com/65535/54765363638_7ea937fe3f_z.jpg',
    fullImage: 'https://live.staticflickr.com/65535/54765363638_7ea937fe3f_z.jpg'
  },
  {
    type: 'photo',
    title: 'Film Stills',
    description: 'Still from film work.',
    thumbnail: 'https://live.staticflickr.com/65535/54763954946_b7614f619a_z.jpg',
    fullImage: 'https://live.staticflickr.com/65535/54763954946_b7614f619a_z.jpg'
  },
  {
    type: 'photo',
    title: 'Film Stills',
    description: 'Still from film work.',
    thumbnail: 'https://live.staticflickr.com/65535/54763105447_a2999f3126_z.jpg',
    fullImage: 'https://live.staticflickr.com/65535/54763105447_a2999f3126_z.jpg'
  },
  {
    type: 'photo',
    title: 'Film Stills',
    description: 'Still from film work.',
    thumbnail: 'https://live.staticflickr.com/65535/54763954871_b8c728cbff_z.jpg',
    fullImage: 'https://live.staticflickr.com/65535/54763954871_b8c728cbff_z.jpg'
  },
  {
    type: 'photo',
    title: 'Film Stills',
    description: 'Still from film work.',
    thumbnail: 'https://live.staticflickr.com/65535/54764191613_64f0af4b0a_z.jpg',
    fullImage: 'https://live.staticflickr.com/65535/54764191613_64f0af4b0a_z.jpg'
  },
  {
    type: 'photo',
    title: 'Film Stills',
    description: 'Still from film work.',
    thumbnail: 'https://live.staticflickr.com/65535/54764191598_3c78b9eb40_z.jpg',
    fullImage: 'https://live.staticflickr.com/65535/54764191598_3c78b9eb40_z.jpg'
  },
  {
    type: 'photo',
    title: 'Film Stills',
    description: 'Still from film work.',
    thumbnail: 'https://live.staticflickr.com/65535/54765360989_e48a42bb41_z.jpg',
    fullImage: 'https://live.staticflickr.com/65535/54765360989_e48a42bb41_z.jpg'
  },
  {
    type: 'photo',
    title: 'Film Stills',
    description: 'Still from film work.',
    thumbnail: 'https://live.staticflickr.com/65535/54766265539_3a26ef0342_z.jpg',
    fullImage: 'https://live.staticflickr.com/65535/54766265539_3a26ef0342_z.jpg'
  },
  {
    type: 'photo',
    title: 'Film Stills',
    description: 'Still from film work.',
    thumbnail: 'https://live.staticflickr.com/65535/54766025186_c405b39bbd_z.jpg',
    fullImage: 'https://live.staticflickr.com/65535/54766025186_c405b39bbd_z.jpg'
  }
];


export const socialLinks = {
  github: "https://github.com/Arin1604",
  linkedin: "https://linkedin.com/in/arin-idhant-111860258/",
  email: "arin_idhant@brown.edu"
}

export { projects };
