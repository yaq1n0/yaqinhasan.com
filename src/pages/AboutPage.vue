<template>
  <div class="about-page">
    <section class="page-header">
      <h1>Stuff About Me</h1>
    </section>

    <!-- Navigation Shortcuts -->
    <details class="collapsible" id="page-shortcuts" open>
      <summary class="header">About Me Sections</summary>
      <div class="text-box">
        <a href="#skills" @click.prevent="activeSection = 'skills'" class="link"
          >Skills Summary</a
        >
        <a
          href="#modules"
          @click.prevent="activeSection = 'modules'"
          class="link"
          >Degree Modules Summary</a
        >
      </div>
    </details>

    <!-- Skills Section -->
    <section
      v-show="activeSection === 'skills'"
      id="skills"
      class="content-section"
    >
      <h2>
        Programming Languages, Development Tools and Environments I have
        experience in
      </h2>

      <h3>Programming Languages</h3>
      <div class="keyword-container">
        <span class="keyword">Assembly</span>
        <span class="keyword">C</span>
        <span class="keyword">C++</span>
        <span class="keyword">Java</span>
        <span class="keyword">Python</span>
        <span class="keyword">SQL</span>
        <span class="keyword">JavaScript</span>
        <span class="keyword">HTML</span>
        <span class="keyword">CSS</span>
      </div>

      <h3>Scripting Languages</h3>
      <div class="keyword-container">
        <span class="keyword">Python</span>
        <span class="keyword">Lua</span>
        <span class="keyword">Bash</span>
        <span class="keyword">Batch</span>
      </div>

      <h3>Markup Languages</h3>
      <div class="keyword-container">
        <span class="keyword">XML</span>
        <span class="keyword">JSON</span>
        <span class="keyword">YAML</span>
        <span class="keyword">Markdown</span>
      </div>

      <h3>Development tools</h3>
      <div class="keyword-container">
        <span class="keyword">Git</span>
        <span class="keyword">GitHub</span>
        <span class="keyword">GitLab</span>
        <span class="keyword">JetBrains</span>
        <span class="keyword">Visual Studio</span>
        <span class="keyword">Visual Studio Code</span>
        <span class="keyword">Sublime Text</span>
      </div>

      <h3>Build tools</h3>
      <div class="keyword-container">
        <span class="keyword">Cmake</span>
        <span class="keyword">GCC</span>
        <span class="keyword">Clang</span>
        <span class="keyword">Maven</span>
        <span class="keyword">Gradle</span>
      </div>

      <h3>General tools</h3>
      <div class="keyword-container">
        <span class="keyword">SSH</span>
        <span class="keyword">PuTTy</span>
        <span class="keyword">WinSCP/SCP</span>
        <span class="keyword">VMware Workstation</span>
        <span class="keyword">VirtualBox</span>
        <span class="keyword">WSL2</span>
        <span class="keyword">Docker</span>
      </div>

      <h3>Frameworks</h3>
      <div class="keyword-container">
        <span class="keyword">Qt</span>
        <span class="keyword">Tk</span>
        <span class="keyword">JavaFX</span>
        <span class="keyword">Flutter</span>
        <span class="keyword">React(learning)</span>
      </div>

      <h3>Desktop Environments</h3>
      <div class="keyword-container">
        <span class="keyword">Ubuntu 22 LTS</span>
        <span class="keyword">PopOS 22</span>
        <span class="keyword">Raspberry Pi OS</span>
        <span class="keyword">Windows 10</span>
        <span class="keyword">MacOS</span>
      </div>

      <h3>Cloud Service Providers</h3>
      <div class="keyword-container">
        <span class="keyword">AWS (EC2, Route 53 DNS, etc)</span>
        <span class="keyword">OVH (VPS, SSL Gateway, etc)</span>
      </div>
    </section>

    <!-- Modules Section -->
    <section
      v-show="activeSection === 'modules'"
      id="modules"
      class="content-section"
    >
      <h2>The BSc Computer Science experience briefly summarized</h2>

      <h3>The inspiration for the tone of this section</h3>
      <p class="centered">
        I debated on creating a purely factual list, detailing each module's
        contents by essentially copying their syllabuses. However, I decided
        against this as I was strongly inspired by the following youtube video.
      </p>

      <div class="video-container">
        <iframe
          class="youtube-embed"
          src="https://www.youtube.com/embed/XoSllabxqiQ?si=zuZ_RDH_WGIK-31N"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>

      <div class="year-navigation">
        <a href="#year1" @click.prevent="activeYear = 'year1'" class="link"
          >Year 1</a
        >
        <a href="#year2" @click.prevent="activeYear = 'year2'" class="link"
          >Year 2</a
        >
        <a href="#year3" @click.prevent="activeYear = 'year3'" class="link"
          >Year 3</a
        >
      </div>

      <!-- Year 1 -->
      <div v-show="activeYear === 'year1'" id="year1" class="year-section">
        <h3>Year 1</h3>
        <p>
          You are introduced to the basics of every CS degree. The courseworks
          will hold your hand with well-defined specs and robust testing suites.
        </p>

        <h4>Programming 1</h4>
        <p>
          Covers the basics of programming from writing your first hello world
          to the fundamentals of Object-Oriented Programming. We used Java,
          which I remember learning in a single night before the first day, only
          to realize that was unnecessary.
        </p>

        <h4>Programming 2 (electric boogaloo!)</h4>
        <p>
          Continuation of Programming 1 that introduced us to actual programs
          with large codebases. Introduction to Git/GitHub and Apache Maven as
          part of a Tetris clone coursework (TetrECS). I strongly remember that
          we could manipulate the raw scores and upload them to the
          "multiplayer" server, meaning anyone could set a high score
          illegitimately (I did no such thing :3).
        </p>

        <div class="link-container">
          <a
            href="https://github.com/yaq1n0/tetrecs"
            target="_blank"
            class="link"
          >
            <font-awesome-icon :icon="['fab', 'github']" /> Source Code (GitHub)
          </a>
        </div>

        <h4>Computer Systems 1</h4>
        <p>
          This module covers the basics of computer hardware and architectures,
          We got a Raspberry Pi 3B+ to play with, which I did definitely return
          and definitely didn't keep till the end of my degree. (There's a not
          so small chance that this Pi was eventually used as the platform for
          my ThymPi final year project).
        </p>

        <h4>Foundations of Computer Science</h4>
        <p>
          This module was basically the "Linear Algebra and Discrete
          Mathematics". Also known as the module that will weed out half the
          first year cohort.
        </p>

        <h4>Algorithmics</h4>
        <p>
          This module was just "Data Structures and Algorithms". I liked that
          this module was eventually built upon further in "Theory of Computing"
          in 2nd year, in the computability and complexity sections of that
          module.
        </p>

        <h4>Data Management</h4>
        <p>
          This module was basically "Relational Database Theory and Intro to
          SQL". I made some simple SQL queries, used MySQL a bit and wrote some
          simple unix Bash scripts.
        </p>

        <h4>Software Modelling and Design</h4>
        <p>
          This module was eventually made into a 2nd year optional, which it
          should have been from the start! Formal software design and
          verification is a huge field, and it's definitely useful to learn, but
          it is way too complex for an amoeba-brained freshman CS student to
          grasp and appreciate. We made a simple management system in the
          university's proprietary "Event-B" language and tools, to this day, my
          cohort regards the name "Event-B" as the language that shall not be
          named.
        </p>

        <h4>Professional Development</h4>
        <p>
          This is the token "career skills" module that for some reason,
          universities put in first year, instead of later in the degree.
          Freshmen don't have any real skills or experience, nor do they have
          any idea what they want to specialize in, asking them to write a CV
          and a career plan at that stage is asinine.
        </p>
      </div>

      <!-- Year 2 -->
      <div v-show="activeYear === 'year2'" id="year2" class="year-section">
        <h3>Year 2</h3>
        <p>
          Here you build on the basics of CS that you learned in the previous
          year. You are also given more freedom with your courseworks and given
          more autonomy and responsibility.
        </p>

        <h4>Programming 3</h4>
        <p>
          I do not know why the University of Southampton loves functional
          programming so much, a lot of CS degrees don't even cover it anymore,
          since it's barely used in production code. We taught the functional
          programming paradigm in general using Haskell, in contrast to the
          procedural and object-oriented paradigms we were used to by this
          point.
        </p>

        <p>
          At the time, I didn't see any use for this, it was just something I
          had to do to pass the module and get it over with, partly because the
          lecturers did a poor job of explaining the actual reasons for using a
          functional programming approach.
        </p>

        <p>
          In hindsight, I now appreciate and embrace functional programming as a
          useful paradigm in certain contexts. I think this is partly from
          becoming one of the dozens (yes, entire dozens!) of expert Haskell
          developers. However, I also started using some functional principles
          in other languages like Python and C, where I can now appreciate the
          benefits in code clarity, functional predictability and statelessness.
        </p>

        <h4>Software Engineering Group Project</h4>
        <p>
          We were put in groups of 6 and told that we had to make a big software
          project together. Then we were allocated some seniors to act as
          customers who gave us continuous feedback. We basically had the
          freedom to organize ourselves however we wanted, but the course
          strongly guided us towards the best practices. We used GitHub to
          manage collaborative programming, discord to have weekly scrum
          meetings, and made UML diagrams and burndown charts, like the good
          AGILE practitioners we are.
        </p>

        <p>
          We made an app to calculate runway distances, meant to be used by
          airports. We split the app using an MVC design pattern and I was the
          "lead backend developer" and part of the software architecture
          sub-team who designed the UML class diagrams and data flows. In other
          words, I made all the logic for the calculations and made the app
          actually do stuff and not just be a fancy UI.
        </p>

        <div class="link-container">
          <router-link to="/projects" class="link"
            >SEGP Project Page</router-link
          >
          <a
            href="https://github.com/yaq1n0/SEG-project-2021"
            target="_blank"
            class="link"
          >
            <font-awesome-icon :icon="['fab', 'github']" /> Source Code (GitHub)
          </a>
        </div>

        <h4>Theory of Computing</h4>
        <p>
          This module was the continuation of "Algorithmics" from the previous
          year, where we dug into computability and complexity. There was also
          some stuff about automata, Turing machines and context-free grammars.
          Which are really cool computer science theory things that I would have
          to study for many more years to be able to explain them and do them
          justice.
        </p>

        <h4>Programming Language Concepts</h4>
        <p>
          This module was a bit of a curve ball, we had heard about it in first
          year and in the first semester of second year that we would eventually
          have to design our own interpreter. Obviously, this was terrifying
          news to first years who had just about figured out how to use GCC and
          Clang to compile their first C helloworld.c program. We had heard
          rumors of the module where we would have to "design and code our own
          compiler" since 1st year. This module introduced us to compiler
          theory, the layers of abstraction from machine code to high-level
          languages and how compilers/interpretersa actually work. We were then
          put into groups of 3 to make our own programming language, which you
          can read more about on its dedicated project page linked below.
        </p>

        <div class="link-container">
          <router-link to="/projects" class="link"
            >STQL Project Page</router-link
          >
          <a
            href="https://github.com/yaq1n0/STQL-haskell"
            target="_blank"
            class="link"
          >
            <font-awesome-icon :icon="['fab', 'github']" /> Source Code (GitHub)
          </a>
        </div>

        <h4>Computer Systems 2</h4>
        <p>
          This was the only optional module that I was able to take in year 2,
          that I chose because I love hardware and enjoyed systems 1 in 1st
          year. This module built on systems 1 and introduced us to scheduling
          and prioritization on an OS level, firmware concepts, system buses,
          and embedded systems theory.
        </p>

        <p>
          We were also just given a Pi Pico microcontroller and literally told
          to have fun and make some cool projects with it. Literally, we were
          told that what we did didn't matter, as long as we built something,
          which I really enjoyed. This module really cemented my love for
          low-level systems programming and embedded programming.
        </p>

        <h4>Intelligent Systems</h4>
        <p>
          This module was "Intro to Machine Learning and Artificial
          Intelligence" as it went from the maths background for AI and the
          theory behind neural networks to how to implement them. It was quite
          interesting but I found it to be too bogged down in the theory, it
          would have been way more engaging if we were allowed to do some more
          hands-on stuff. Imagine how cool it would have been if we had a
          coursework where we implemented our own neural network and trained it!
        </p>

        <h4>Distributed Systems and Networking</h4>
        <p>
          I don't know why this module wasn't split up into 2 smaller ones, it
          basically was when we took it anyway. We started with the networking
          half which was as expected, an introduction to network architectures
          following the OSI 7-layer model. That was pretty unremarkable, pretty
          theory heavy and more or less got the points across. This module was
          basically 2 modules in one. The networking half came fist and was the
          "intro to networking" module that covered network architectures
          following the OSI 7-layer model. The distributed systems part of this
          module was all about distributed systems theory, concurrency,
          consistency and reliability.
        </p>

        <p>
          We were then told to implement a networked distributed file system in
          Java, which was really fun as it was a really neat way of tying
          everything together. However, the deadline was too short in my
          opinion, so I wasn't able to build something really fleshed out like I
          would've wanted.
        </p>

        <h4>Interaction Design</h4>
        <p>
          My cohort called this module "professional development 2" as it was
          the only non-technical module of the year. Though in actuality, this
          was essentially a Human-Computer interface theory module with an
          emphasis on User Interaction and Experience. Definitely a useful
          module to teach future developers, but I think it could have been done
          in a lot more technical way to keep us NERDS engaged.
        </p>
      </div>

      <!-- Year 3 -->
      <div v-show="activeYear === 'year3'" id="year3" class="year-section">
        <h3>Year 3</h3>
        <p>
          Here you get to be completely independent, you get to choose your own
          modules and your final year project topic. All the modules are now
          extremely specialized and take you up to near-expert level in the
          topics they cover. The final year project is also the first large and
          unique project you will make in academia (in theory).
        </p>

        <div class="link-container">
          <router-link to="/projects" class="link"
            >Final Year Project Page</router-link
          >
          <a
            href="https://github.com/yaq1n0/ThymPi"
            target="_blank"
            class="link"
          >
            <font-awesome-icon :icon="['fab', 'github']" /> Source Code (GitHub)
          </a>
        </div>

        <h4>Advanced Computer Architecture</h4>
        <p>
          I chose this because I love hardware and wanted to continue learning
          what was set up in systems 1 & 2 in this regard. We learned about CPU
          design from basic digital logic to a full superscalar pipelined
          multicore SoC design. We also covered assembly and microcode in a bit
          more detail, such as comparing RISC and CISC performance. We also
          covered a bit of highly parallel (GPU) architectures which was fun
          because I can now understand gpu whitepaper block diagrams!
        </p>

        <h4>Real-Time Computing and Embedded Systems</h4>
        <p>
          I loved playing with the Pi Pico in systems 2, and loved embedded
          programming, so I picked this module. The real-time systems part of
          this module covered real-time operating systems theory and had us
          actually play with scheduling algorithms in "Cheddar". the embedded
          systems part of this module had us installing FreeRTOS on a Pi Pico
          and trying out some practical process scheduling.
        </p>

        <h4>Computational Biology</h4>
        <p>
          I thought this was going to be able biologically inspired algorithms,
          systems and computing. This turned out to be a bioinformatics
          introduction course, which is basically large data set statistics. I
          was duped into doing scientific compute statistics with NumPy, Pandas
          and Jupyter Notebooks!
        </p>

        <h4>Web Architecture and HyperText Technologies</h4>
        <p>
          When "Computer Vision" turned out to be more digital signal processing
          and maths than the machine vision I wanted to actually do, I switched
          to this module. This module turned out to be much better than I
          expected, it taught me the web architecture in depth as well as gave
          me a deep understanding of REST and HTTP. I didn't realize this at the
          time, but when I ended up making my own website (this one!), I found
          myself connecting a lot of the concepts learned in this module to this
          practical experience. We were also told to play with the university's
          building information API, document it and propose improvements to it.
          This was incredibly fun and was a great opportunity to play with tools
          like curl, Wget and Postman.
        </p>

        <h4>Engineering Management and Law</h4>
        <p>
          This was the only "required" module in 3rd year, and covered some
          basic and trite "management" theory. The law part of this module was
          fun though, as we got to read about past legal cases, mostly involving
          engineering failures.
        </p>
      </div>
    </section>

    <!-- Navigation Controls -->
    <div class="navigation-controls">
      <button @click="previousSection" class="nav-button prev">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </button>
      <button @click="nextSection" class="nav-button next">
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// State for active section and year
const activeSection = ref("skills");
const activeYear = ref("year3");

// Navigation functions
const sections = ["skills", "modules"];
const years = ["year1", "year2", "year3"];

const nextSection = () => {
  const currentIndex = sections.indexOf(activeSection.value);
  const nextIndex = (currentIndex + 1) % sections.length;
  activeSection.value = sections[nextIndex];
};

const previousSection = () => {
  const currentIndex = sections.indexOf(activeSection.value);
  const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
  activeSection.value = sections[prevIndex];
};
</script>

<style lang="scss" scoped>
.about-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: map.get($spacing, "xl");
  position: relative;

  @media (max-width: map.get($breakpoints, "md")) {
    padding: map.get($spacing, "lg");
  }

  @media (max-width: map.get($breakpoints, "sm")) {
    padding: map.get($spacing, "md");
  }
}

.page-header {
  margin-bottom: map.get($spacing, "xl");
  text-align: center;

  h1 {
    font-size: map.get($font-sizes, "3xl");
    color: var(--color-accent);
    margin-bottom: map.get($spacing, "sm");
  }
}

.collapsible {
  background-color: var(--color-bg-tertiary);
  border-radius: map.get($border-radius, "lg");
  margin: map.get($spacing, "md") 0;
  padding: map.get($spacing, "lg");

  .header {
    background-color: var(--color-bg-tertiary);
    padding: map.get($spacing, "md");
    margin: -#{map.get($spacing, "lg")} -#{map.get($spacing, "lg")}
      map.get($spacing, "md") -#{map.get($spacing, "lg")};
    border-radius: map.get($border-radius, "lg") map.get($border-radius, "lg") 0
      0;
    font-size: map.get($font-sizes, "xl");
    font-weight: 600;
    cursor: pointer;

    &::-webkit-details-marker {
      display: none;
    }

    &::before {
      content: "▼";
      margin-right: map.get($spacing, "sm");
    }
  }

  &[open] .header::before {
    content: "▼";
  }

  &:not([open]) .header::before {
    content: "►";
  }
}

.content-section {
  background-color: var(--color-bg-tertiary);
  border-radius: map.get($border-radius, "lg");
  padding: map.get($spacing, "xl");
  margin-bottom: map.get($spacing, "xl");
  animation: fadeIn 0.5s ease;

  h2 {
    font-size: map.get($font-sizes, "2xl");
    color: var(--color-accent);
    margin-bottom: map.get($spacing, "lg");
    text-align: center;
  }

  h3 {
    font-size: map.get($font-sizes, "xl");
    color: var(--color-accent-light);
    margin: map.get($spacing, "lg") 0 map.get($spacing, "md");
  }

  h4 {
    font-size: map.get($font-sizes, "lg");
    color: var(--color-accent-light);
    margin: map.get($spacing, "lg") 0 map.get($spacing, "sm");
  }

  p {
    margin-bottom: map.get($spacing, "md");
    line-height: 1.6;
  }

  .centered {
    text-align: center;
  }
}

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

.text-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: map.get($spacing, "md");
  margin: map.get($spacing, "md") 0;

  .link {
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

.year-navigation {
  display: flex;
  justify-content: center;
  gap: map.get($spacing, "lg");
  margin: map.get($spacing, "xl") 0;

  .link {
    font-size: map.get($font-sizes, "lg");
    font-weight: 600;
    padding: map.get($spacing, "sm") map.get($spacing, "lg");
    background-color: var(--color-accent-translucent);
    border-radius: map.get($border-radius, "md");
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      background-color: var(--color-accent-light);
      color: var(--color-bg-primary);
    }
  }
}

.year-section {
  animation: fadeIn 0.5s ease;
}

.video-container {
  display: flex;
  justify-content: center;
  margin: map.get($spacing, "lg") 0;

  .youtube-embed {
    width: 100%;
    max-width: 800px;
    height: 450px;
    border-radius: map.get($border-radius, "lg");
    border: 2px solid var(--color-accent-light);

    @media (max-width: map.get($breakpoints, "md")) {
      height: 350px;
    }

    @media (max-width: map.get($breakpoints, "sm")) {
      height: 250px;
    }
  }
}

.navigation-controls {
  position: fixed;
  top: 50%;
  width: 100%;
  left: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 10;

  .nav-button {
    background-color: var(--color-bg-secondary);
    color: var(--color-text-primary);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    pointer-events: auto;
    opacity: 0.7;
    margin: 0 map.get($spacing, "md");

    &:hover {
      opacity: 1;
      background-color: var(--color-accent);
      color: var(--color-bg-primary);
    }

    &.prev {
      margin-left: map.get($spacing, "lg");
    }

    &.next {
      margin-right: map.get($spacing, "lg");
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

@media (max-width: map.get($breakpoints, "md")) {
  .navigation-controls {
    .nav-button {
      width: 40px;
      height: 40px;

      &.prev {
        margin-left: map.get($spacing, "sm");
      }

      &.next {
        margin-right: map.get($spacing, "sm");
      }
    }
  }
}
</style>
