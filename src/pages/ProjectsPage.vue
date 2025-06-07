<template>
  <carousel-layout title="My Projects" :items="projectItems" :initial-item-id="activeProject" minimal :scroll-speed="40">
    <template #default="{ activeItem }">
      <!-- Website Project -->
      <div v-show="activeItem.id === 'website'">
        <carousel-detail :title="projects.website.title" :summary="projects.website.summary">
          <p>I wanted a personal portfolio website to showcase and document my projects, most developers have one so I asked myself "how hard could it be?".</p>

          <h4>Initial Research, Abandoned Approaches</h4>
          <p>
            I thought about using React or Flutter to make the site, but I wanted to challenge myself to make something that looks and functions like a modern
            site, using nothing but raw HTML, CSS and JS. I initially tried to use a HTML template I found online, but it was terribly written and a nightmare
            to work with, so I decided to go even more RAW and write everything from scratch. As a result, all the code for this site is written by yours truly
            (me) from scratch!
          </p>

          <h4>A Minimalist Approach Begins</h4>
          <p>
            Writing everything from scratch meant learning the responsive CSS from scratch and developing a deep understanding of the responsive and adaptive
            layout tools. The initial versions of the site were made responsive using purely clever HTML and CSS. However, as I added more features to the site,
            I ended up using some plain ol' JavaScript. Such as for the mobile navigation bar overflow menu, carousel layout navigation logic and developer
            mode. I also took the liberty of splitting the files into more manageable sections and components, simplifying my workflow dramatically.
          </p>

          <template #dev-content>
            <h4>The functional development goals for this site are:</h4>
            <ul>
              <li>Implicitly showcase my web dev and web hosting skills</li>
              <li>List my technical skills</li>
              <li>Showcase and document my projects</li>
              <li>List some personal interests</li>
              <li>Contain my contact info and a copy of my CV</li>
            </ul>
          </template>
        </carousel-detail>
      </div>

      <!-- flopPy Project -->
      <div v-show="activeItem.id === 'floppy'">
        <carousel-detail :title="projects.floppy.title" :summary="projects.floppy.summary">
          <p>
            Inspired by Flutter's stateful widgets, I decided to make a Python library that incorporates statefulness into Tkinter. The name comes from flop and
            Py, with flop apparently being a synonym of flutter and Py being an obvious shorthand for Python.
          </p>
          <p>I will write more here once I have more implementation details.</p>
        </carousel-detail>
      </div>

      <!-- RoboCopyGUI Project -->
      <div v-show="activeItem.id === 'robocopy'">
        <carousel-detail :title="projects.robocopy.title" :summary="projects.robocopy.summary">
          <p>
            I couldn't find a lightweight local file backup solution to backup my main Windows PC to my SMB NAS, so I decided to look around. I found RoboCopy,
            a windows CLI tool which provides the backend functionality for this. I then wanted to make a GUI for this so that I can use this in a bit more
            refined way.
          </p>

          <h4>Flutter Solution</h4>
          <p>
            The current solution is a Flutter windows app, which I chose because I was currently learning how to use Flutter at the time. This solution is
            around 50% complete, as it does work, but the layout is nonexistent and it's not very thoroughly tested. You can find this in the repo linked above.
          </p>

          <h4>Windows Tray Solution</h4>
          <p>
            I am planning to make another version of the app, that will be windows tray native, so that it will stay in your tray notifications area. This would
            make it even better for the intended purpose, as it could then be unintrusively launched at startup and stay in the background. With the option to
            be manually run when needed and opened up to configure settings.
          </p>
        </carousel-detail>
      </div>

      <!-- Tracker Project -->
      <div v-show="activeItem.id === 'tracker'">
        <carousel-detail :title="projects.tracker.title" :summary="projects.tracker.summary">
          <p>
            I noticed a market gap for a certain kind of tracker app on the Google Play Store, I then decided to come up with a rough design for an app that
            could fill that niche. This project is highly speculative at this point.
          </p>
          <p>I will write more here once I have more implementation details.</p>
        </carousel-detail>
      </div>

      <!-- ThymPi Project -->
      <div v-show="activeItem.id === 'thympi'">
        <carousel-detail :title="projects.thympi.title" :summary="projects.thympi.summary">
          <h4>Project Definition</h4>
          <p>
            The official title of my dissertation was "An Intelligent Approach to Navigating Environments With Compliant Obstacles". Like most academic titles,
            it likely means very little to you. The gist of it is that obstacles fall on a spectrum of compliance, which is a fancy way of saying how easy they
            are to move aside or get through.
          </p>

          <p>
            Essentially, if you have a robot that is navigating solely visually, it has no context for what an obstacle's compliance is. You would have to
            manually add compliance context to the object detection and classification model. This is suboptimal for many reasons, which is why you'd probably
            want to have the robot to be able to do this on its own.
          </p>

          <p>
            A side note, with recent advancements in AI, training a model with a limited set of known object/compliance pairs and having it extrapolate the data
            is a lot more realistic and robust of a solution.
          </p>

          <h4>Summary of Final Prototype</h4>
          <p>
            The goal of my project was to design, implement and test a prototype robotics platform to demonstrate "An Intelligent Approach to Navigating
            Environments With Compliant Obstacles".
          </p>

          <p>
            I had a Raspberry Pi 3 running the OpenCV object classification model, compliance testing logic and Thymio control program (asebamedulla).
            Everything was written in Python with the Pi 3 was connected to a Pi camera, the MPU6050 inertial measurement unit (accelerometer and gyroscope) and
            the Thymio robot.
          </p>

          <p>
            The final prototype was able to identify and classify obstacles, then it would decide to test the compliance of the obstacle if it was unknown to
            it. In theory, this would then be coupled with a navigation algorithm, using the compliance values to augment the different path "weights" to come
            up with the most efficient real-life path.
          </p>

          <template #dev-content>
            <h4>Compliance Testing</h4>
            <p>I considered several methods of determining compliance from sensor values:</p>
            <ul>
              <li>Using the current draw of the robot's wheels/locomotion servos - higher current draw => lower compliance</li>
              <li>Using a pressure sensor at the front of the robot - higher pressure => lower compliance</li>
              <li>Using an accelerometer to measure deceleration on impact = higher deceleration => lower compliance</li>
            </ul>
            <p>I started with an accelerometer because the Thymio had one builtin that I could access.</p>

            <h4>Accelerometer selection</h4>
            <p>
              In order to be able to use a function to calculate a compliance_value from the deceleration on collision, the sensor must have the following
              properties:
            </p>
            <ul>
              <li>A high enough polling rate to detect rapid spikes in deceleration.</li>
              <li>A high enough precision to be used to meaningfully differentiate between different deceleration amounts.</li>
              <li>A way to interface with the computer or microcontroller that's running the control software.</li>
            </ul>

            <p>I played around with the following accelerometers before choosing one for the final approach:</p>
            <ul>
              <li>
                The robot I was using, the Thymio, has an internal accelerometer (read more in the next section). I attempted to use this as it reported sensor
                data using the same bus as the control signals which I would have to use anyway. However, it ended up not having a high enough polling rate and
                precision. The reasons for why these are important are highlighted above.
              </li>
              <li>
                I also had a Pico4ML microcontroller board on hand, which had an accelerometer on board that I thought could be repurposed to act like a USB
                accelerometer. I wrote a lightweight program for the microcontroller that read the accelerometer data and outputted it to the serial (USB port)
                bus that connected it to the computer running the primary control software. From there, it was just a simple matter of reading the serial bus,
                cleaning up the data and interfacing with the control code. However, using the serial interface raw proved the be slightly unreliable. I have no
                doubt that I could eventually find a way to make it consistent but I decided to try other options.
              </li>
              <li>
                Eventually, I bought an MPU6050 Inertial Measurement Unit (IMU), an IMU being a combination sensor with an 3-axis accelerometer and a 3-axis
                gyroscope. It had a good amount of documentation, was pre-calibrated and had a pre-written library which would perform the raw input sanitation
                for me.
              </li>
            </ul>

            <h4>Test Platform and Thymio</h4>
            <p>
              I would have needed some kind of mobile robotic test platform to develop the prototype on. In theory, I could've used anything that had the
              ability to move, a couple servos and wheels bolted to a slab.
            </p>

            <p>
              However, my supervisor had access and experience to Thymio robots, which were simple small robots with a few built in sensors. Most importantly
              though, they include a first party control library which meant that I won't have to directly control servos for movement.
            </p>

            <h4>Obstacle detection and classification</h4>
            <p>
              Up until this project, I had done some modules on ML theory, but I have never actually implemented or used anything in a practical setting. I did
              a lot of research and found out about OpenCV, which allowed me to use pre-trained object classification models to detect and classify objects. I
              eventually settled on using a model specifically for "everyday objects" which I believed would allow me to classify anything I would use in
              testing.
            </p>

            <p>
              Obviously running in object recognition model on a Raspberry Pi 3 single board computer was going to run into some performance constraints. I
              tried my best to optimize by disabling the preview and directly sending the camera input to the model. Eventually I had to sacrifice the input
              resolution to get the model to work in somewhat real-time, which meant less accurate object classification. However, I managed to get around this
              by caching the recognition data once and using it for subsequent frames. The final solution ended up with minimal recognition delay in the few
              hundred milliseconds range, but also being consistent and accurate enough practically.
            </p>

            <h4>Theoretical Improvements</h4>
            <p>
              By calculating compliance_value from f(internal_variable), we are mapping a single sensor's data to a numerical value. This inherently has 2
              issues, the first being that information is lost during the mapping process, regardless of what function is used. Secondly, using a single sensor
              value is inherently limiting, as it can often miss certain nuances.
            </p>

            <p>
              On the function side, the simplest function used to turn a range of values, such as deceleration, into a single value is an average. This would
              lead to a sharp single spike such as when colliding with a completely immovable and non-compliant obstacle to return a lower compliance_value than
              a prolonged deceleration as as from pushing a heavy but movable and slightly compliant obstacle.
            </p>

            <p>
              Therefore, it becomes a task in itself to choose or create a function best suited for the job that consistently outputs obstacle compliance values
              that are representative and useable for comparison purposes.
            </p>

            <p>
              On the variables side, using a single variable simplifies things but it can also be easily become inaccurate. For example, by only using a single
              accelerometer axis, if the robot tilts or otherwise doesn't collide with the obstacles directly every time, it will generate inconsistent data due
              to the vectoring of the values measured.
            </p>

            <p>
              Therefore, it makes sense to try and take into account as many variables as possible in calculating an obstacle's compliance_value, to allow for
              errors like this to either be accounted for with erroneous data detection and correction or though simple mathematical redundancy.
            </p>
          </template>
        </carousel-detail>
      </div>

      <!-- STQL Project -->
      <div v-show="activeItem.id === 'stql'">
        <carousel-detail :title="projects.stql.title" :summary="projects.stql.summary">
          <h4>Group Shenanigans</h4>
          <p>
            The coursework was meant to be done in a group of 3. I proposed that we split it such that one person designs the Toy language and interpreter, one
            person does the underlying querying logic, and another person links the 2 together and codes the evaluation logic. This would split the workload
            relatively evenly.
          </p>

          <p>
            However, one of my group members didn't show up to any of the "scrum" meetings, or contribute code at all. Despite confronting him about the lack of
            contribution and eventually reporting this to the module lead, we didn't get anywhere.
          </p>

          <p>
            Eventually, the other 2 of us decided to just split the work into 2, with me designing the Toy language, and coding the interpreter and evaluation
            logic. While my other groupmate ended up implementing the entire backend querying functionality and the actual execution in Haskell.
          </p>

          <h4>What I Implemented</h4>
          <p>
            While my groupmate worked on the backend logic, I requested that everything be encapsulated and available through an API that I could make function
            calls to. As the library was initially meant to modify files, I realized that I wouldn't actually need to implement runtime variables and I could
            instead use intermediary files as pseudo-variables.
          </p>

          <p>
            The second thing I realized was that the actual functionality could be implemented using a combination of simpler functions rather than using a
            larger set of more complex functions. Essentially reducing the interpreter complexity at the "cost" of requiring more effort to write the code in
            the Toy language.
          </p>
        </carousel-detail>
      </div>

      <!-- SEGP Project -->
      <div v-show="activeItem.id === 'segp'">
        <carousel-detail :title="projects.segp.title" :summary="projects.segp.summary">
          <p>
            The software product in question was a "runway redeclaration" application. Essentially, when there is an obstacle on the runway, instead of shutting
            down the runway, the airport can choose to "redeclare" its values instead, to avoid the obstacle. The application would have to recalculate these
            values and visualize these changes for the user.
          </p>

          <p>This project had us using a lot of industry standard things and some not so standard things:</p>
          <ul>
            <li>Git/GitHub for collaborative version control</li>
            <li>UML class diagrams for data modelling</li>
            <li>An MVC design pattern to decouple user interface and backend logic</li>
            <li>A Discord server (instead of Slack) for communications</li>
          </ul>

          <h4>What I did</h4>
          <p>
            The 6 of us were split into pairs to work on the Model, View and Controller code respectively. Initially, I was the main person who did the data
            modelling with UML class diagrams and the backend calculation logic. However, as the project progressed and the backend functionality reached
            completion ahead of the frontend, I switched over to help integrate the frontend with the backend.
          </p>
        </carousel-detail>
      </div>
    </template>
  </carousel-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import CarouselLayout from "@/components/carousel/CarouselLayout.vue";
import CarouselDetail from "@/components/carousel/CarouselDetail.vue";
import { type CarouselItem } from "@/components/carousel/types";

// State for active project
const activeProject = ref("website");

// Project data
const projects = {
  website: {
    title: "yaqinhasan.com - This Website!",
    githubUrl: "https://github.com/yaq1n0/yaqinhasan.com",
    summary: 'I wanted a personal portfolio website to showcase and document my projects, most developers have one so I asked myself "how hard could it be?".'
  },
  floppy: {
    title: "flopPy - A Simple Stateful Tk/Python GUI library",
    githubUrl: "https://github.com/yaq1n0/flopPy",
    summary:
      "Inspired by Flutter's stateful widgets, I decided to make a Python library that incorporates statefulness into Tkinter. The name comes from flop and Py, with flop apparently being a synonym of flutter and Py being an obvious shorthand for Python."
  },
  robocopy: {
    title: "RoboCopyGUI - Lightweight Windows File Backup App",
    githubUrl: "https://github.com/yaq1n0/RoboCopyGUI",
    summary:
      "I couldn't find a lightweight local file backup solution to backup my main Windows PC to my SMB NAS, so I decided to look around. I found RoboCopy, a windows CLI tool which provides the backend functionality for this. I then wanted to make a GUI for this so that I can use this in a bit more refined way."
  },
  tracker: {
    title: "Simple [REDACTED] Tracker - An Android App",
    githubUrl: "https://github.com/yaq1n0/SimpleTrack",
    summary:
      "I noticed a market gap for a certain kind of tracker app on the Google Play Store, I then decided to come up with a rough design for an app that could fill that niche. This project is highly speculative at this point."
  },
  thympi: {
    title: "ThymPi - My Final Year Project",
    githubUrl: "https://github.com/yaq1n0/ThymPi",
    summary:
      "The name of this project is a portmanteau of Thymio and Pi, with Thymio being the name of the robot platform that I used and Pi referencing the Raspberry Pi 3B+ that was the brains of the prototype."
  },
  stql: {
    title: "Structured Turtle Querying Language",
    githubUrl: "https://github.com/yaq1n0/STQL-haskell",
    summary:
      "The goal of this project was to design a querying language for Turtle RDF files, then implementing an interpreter for that language using Haskell. The name is a play on SQL, or structured querying language, which this querying language strongly resembled."
  },
  segp: {
    title: "AGILE Software Engineering Group Project",
    githubUrl: "https://github.com/yaq1n0/SEG-project-2021",
    summary:
      'The goal of this project was to work in a group of 6 developers, using AGILE project management and development practices to deliver a software product to "customers". With the customers being seniors who would give up feedback on deliverables.'
  }
};

// Project items for the carousel
const projectItems: CarouselItem[] = [
  { id: "website", label: "This Website" },
  { id: "floppy", label: "flopPy" },
  { id: "robocopy", label: "RoboCopyGUI" },
  { id: "tracker", label: "Tracker App" },
  { id: "thympi", label: "ThymPi" },
  { id: "segp", label: "SEGP" },
  { id: "stql", label: "STQL" }
];

// Initialize with URL hash if present
onMounted(() => {
  const hash = window.location.hash.substring(1);
  if (hash && projectItems.some((item) => item.id === hash)) {
    activeProject.value = hash;
  }
});
</script>

<style lang="scss" scoped>
.keyword-container {
  display: flex;
  flex-wrap: wrap;
  gap: map.get($spacing, "sm");
  margin-bottom: map.get($spacing, "lg");

  .keyword {
    background-color: var(--color-accent-translucent);
    padding: map.get($spacing, "xs") map.get($spacing, "sm");
    border-radius: map.get($border-radius, "sm");
    font-size: map.get($font-sizes, "sm");
    white-space: nowrap;
  }
}

.link-container {
  display: flex;
  flex-wrap: wrap;
  gap: map.get($spacing, "md");
  margin: map.get($spacing, "md") 0;

  .link {
    display: inline-flex;
    align-items: center;
    gap: map.get($spacing, "xs");
    background-color: var(--color-accent-translucent);
    padding: map.get($spacing, "xs") map.get($spacing, "md");
    border-radius: map.get($border-radius, "md");
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      background-color: var(--color-accent-light);
      color: var(--color-bg-primary);
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.projects-picker {
  :deep(.groups) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: map.get($spacing, "xl");

    .group {
      flex: 1;
      min-width: 250px;
      max-width: 48%;

      .title {
        font-weight: 600;
        color: var(--color-accent);
        font-size: map.get($font-sizes, "md");
      }

      .links {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: map.get($spacing, "md");

        :deep(.btn) {
          flex: 1 0 calc(50% - #{map.get($spacing, "md")});
          min-width: 140px;
          max-width: none;
          height: 40px;
          margin: map.get($spacing, "xs");
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }

  @media (max-width: map.get($breakpoints, "md")) {
    :deep(.groups) {
      flex-direction: column;

      .group {
        max-width: 100%;
        margin-bottom: map.get($spacing, "md");

        .links :deep(.btn) {
          flex: 1 0 calc(50% - #{map.get($spacing, "md")});
        }
      }
    }
  }

  @media (max-width: map.get($breakpoints, "sm")) {
    :deep(.groups .group .links :deep(.btn)) {
      flex: 1 0 calc(50% - #{map.get($spacing, "md")});
    }
  }
}
</style>
