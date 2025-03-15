<template>
  <div class="interests-page">
    <section class="page-header">
      <h1>My Interests</h1>
    </section>

    <!-- Navigation Shortcuts -->
    <details class="collapsible" id="page-shortcuts" open>
      <summary class="header">Interests List</summary>
      <div class="groups">
        <div class="group">
          <h3 class="title">Enthusiast PCs</h3>
          <div class="links">
            <a
              href="#custom-pcs"
              @click.prevent="activeInterest = 'custom-pcs'"
              class="link"
              >My Custom PCs</a
            >
            <a
              href="#overclocking"
              @click.prevent="activeInterest = 'overclocking'"
              class="link"
              >Extreme Overclocking</a
            >
          </div>
        </div>
        <div class="group">
          <h3 class="title">Other Tech Stuff</h3>
          <div class="links">
            <a
              href="#homelab"
              @click.prevent="activeInterest = 'homelab'"
              class="link"
              >"HomeLab" Server Hosting</a
            >
            <a href="#sbc" @click.prevent="activeInterest = 'sbc'" class="link"
              >SBCs and Microelectronics</a
            >
          </div>
        </div>
        <div class="group">
          <h3 class="title">Miscellaneous</h3>
          <div class="links">
            <a
              href="#game-design"
              @click.prevent="activeInterest = 'game-design'"
              class="link"
              >Game Design and Modding</a
            >
            <a
              href="#powerlifting"
              @click.prevent="activeInterest = 'powerlifting'"
              class="link"
              >Powerlifting/Strength Sports</a
            >
          </div>
        </div>
      </div>
    </details>

    <!-- Interest Content -->
    <div class="interest-content">
      <!-- Custom PCs -->
      <div v-show="activeInterest === 'custom-pcs'" class="interest-item">
        <div class="interest-header">
          <h2>Enthusiast Custom PCs</h2>
        </div>

        <p class="summary">
          I have built my own computers since I was 12. My current fascination
          is with small form factor (SFF) PCs.
        </p>

        <h3>My current main PC's specs are:</h3>
        <ul>
          <li>Ryzen 7 7800x3d</li>
          <li>Noctua NH-L12S</li>
          <li>MSI B650I Edge</li>
          <li>Corsair Vengeance LPX 2x16GB DDR5-6000 CL30</li>
          <li>Samsung 980 Pro 2TB & Crucial P5 Plus 2TB</li>
          <li>MSI Ventus RTX 4080 16G</li>
          <li>Silverstone SX800</li>
          <li>Fractal Design Ridge (white)</li>
        </ul>

        <h3>
          I thought it'd be cool to see it in contrast to my first ever build
          which had the following specs:
        </h3>
        <ul>
          <li>Core i5-4690k</li>
          <li>
            an intel stock cooler -> Corsair H80i GT (intermediary, got stuck on
            the OG board)-> Noctua NH-D15
          </li>
          <li>Gigabyte H81M-HD3 -> Asus Z97 Pro-Gamer</li>
          <li>Kingston Fury Black 1x8GB DDR3-1600 CL10 -> 2x8GB of the same</li>
          <li>
            Kingston V300 120GB & WD Blue 1TB -> Samsung 850 evo 250GB & WD Blue
            1 TB
          </li>
          <li>EVGA GTX 960 4GB SSC -> Asus Strix GTX 1070 8GB</li>
          <li>
            Gigabyte Hercules 500w (accidentally blew it up)-> EVGA 750w P2
          </li>
          <li>NZXT Source 210 windowed</li>
        </ul>
      </div>

      <!-- Overclocking -->
      <div v-show="activeInterest === 'overclocking'" class="interest-item">
        <div class="interest-header">
          <h2>Extreme Overclocking and PC modding</h2>
        </div>

        <p class="summary">
          I started overclocking with my 4690k back in 2015, back when
          overclocking was as simple as upping a clock multiplier and voltage
          and you'd get an extra 10-20% performance.
        </p>

        <p>
          I have since overclocked every one of the computers I have owned to
          some capacity, even if there's little to no real-world performance
          benefit these days with modern chips having pretty good stock boost
          algorithms.
        </p>

        <p>
          One of my more extreme OC forays was using BootCamp Windows on my
          i9-9980hk equipped MacBook Pro to have access to Intel Extreme Tuning
          Utility, which let me overclock the 9980hk mobile CPU. Granted, I
          couldn't squeeze much out of the limited stock thermal headroom
          (~35w), but by removing the back panel and cranking the fans, I
          managed to push it up to 45w. I was quite surprised by how
          overengineered the power delivery for the CPU was, since it was
          capable of pretty crazy peak turbo power draws of nearly 100w.
        </p>

        <p>
          One of the PC mods that I swear by is GPU deshrouding, I strongly
          believe that stock GPU fans are garbage replacing them with a quality
          set dramatically improves the noise characteristics of any card. On
          the topic of being a silent computing enthusiast, I went as far as to
          replace the internal fan on a TFX power supply just to quiet down my
          home server.
        </p>
      </div>

      <!-- HomeLab -->
      <div v-show="activeInterest === 'homelab'" class="interest-item">
        <div class="interest-header">
          <h2>"HomeLab" Server Hosting</h2>
        </div>

        <p class="summary">
          I've been hosting my own local home servers and setting up local
          networking since 2017, When I set up my Ethereum mining rig at the
          time to also function as a NAS.
        </p>

        <p>
          I then built my first purpose-built NAS using an SFF Dell Optiplex and
          a decommissioned IBM ServeRaid Raid card. I had to get creative with
          fitting it all so I grabbed a dremel and savaged a side panel to
          externally mount the drives.
        </p>

        <p>
          I also dabble in hosting my own DNS servers and web servers on a
          raspberry pi, such as using the pi hole DNS adblocker. I am also
          planning to shift my website hosting to a local server if I can find a
          place with a static IP, because I enjoy having my own computers :).
        </p>
      </div>

      <!-- SBCs -->
      <div v-show="activeInterest === 'sbc'" class="interest-item">
        <div class="interest-header">
          <h2>Single Board Computers and Microcontroller electronics</h2>
        </div>

        <p class="summary">
          I started with my first Raspberry Pi 3 nearly a decade ago now, I was
          always fascinated by how much compute could actually fit onto a single
          credit card sized PCB.
        </p>

        <p>
          As I became more educated in the realm of computer science, I learned
          more and more things that could be done on SBCs. Not just using them
          as a desktop/PC replacement, but writing specialized software that
          uses the unique capabilities of SBCs to interface with hardware. In
          other words, using them like a microcontroller, to interface with
          electronics!
        </p>

        <p>
          I've used the Raspberry Pi 3, 4 and 5 as well as the Nvidia Jetson
          Nano Developer Kit. I find it quite fascinating seeing the
          generational performance leaps of the Raspberry Pi platform, with the
          Pi 3 barely being able to run a graphical desktop environment to the
          Pi 5 being a nearly indistinguishable in basic use from a standard
          x86_PC.
        </p>

        <p>
          The Jetson Nano is even more interesting, having an onboard Nvidia
          Maxwell GPU. Which when used right, can massively accelerate a variety
          of tasks you might want to run on an SBC, like object classification
          neural networks.
        </p>
      </div>

      <!-- Game Design -->
      <div v-show="activeInterest === 'game-design'" class="interest-item">
        <div class="interest-header">
          <h2>Game Design and Modding</h2>
        </div>

        <p class="summary">
          As with a large portion of the developer population, I have been
          playing PC games since I was a kid. Consequently, I have always wanted
          to learn how to make and modify the things I have always enjoyed
          playing.
        </p>

        <p>
          My first foray into game design was actually through level design in
          the Source engine's "hammer" editor. I learned what made a good game
          level and some fundamentals of game design, and even made my own
          Counter-Strike map.
        </p>

        <p>
          My first real dive into game modding was with Cyberpunk 2077. I have
          been using REDEngine mods since The Witcher 3 and have always really
          liked the modding support that the engine offers. I was using a mod
          called CyberVehiclesOverhaul which made the cars in Cyberpunk actually
          feel like cars from the future. With the new update 2.0 and Phantom
          Liberty DLC adding new cars and the mod not having these new cars, I
          took the existing mod code and added the new cars that I wanted and
          made them even faster, to my own liking. This took learning the
          CyberEngineTweaks framework and Lua scripting to make these
          modifications to the code.
        </p>

        <div class="link-container">
          <a
            href="https://github.com/yaq1n0/cyber-vehicles-overhaul-mod-2.1PL"
            target="_blank"
            class="link"
          >
            <font-awesome-icon :icon="['fab', 'github']" /> Source Code (GitHub)
          </a>
        </div>
      </div>

      <!-- Powerlifting -->
      <div v-show="activeInterest === 'powerlifting'" class="interest-item">
        <div class="interest-header">
          <h2>Powerlifting/Strength Sports</h2>
        </div>

        <p class="summary">
          I have been training for powerlifting since April 2021, I have since
          competed at the National British University Championships in 2023 and
          Co-founded Southampton University's Powerlifting Club.
        </p>

        <div class="link-container">
          <a
            href="https://www.openpowerlifting.org/u/yaqinhasan"
            target="_blank"
            class="link"
          >
            My OpenPowerlifting Page
          </a>
        </div>
      </div>
    </div>

    <!-- Navigation Controls -->
    <div class="navigation-controls">
      <button @click="previousInterest" class="nav-button prev">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </button>
      <button @click="nextInterest" class="nav-button next">
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// State for active interest
const activeInterest = ref("custom-pcs");

// Interest order for navigation
const interestOrder = [
  "custom-pcs",
  "overclocking",
  "homelab",
  "sbc",
  "game-design",
  "powerlifting",
];

// Navigation functions
const nextInterest = () => {
  const currentIndex = interestOrder.indexOf(activeInterest.value);
  const nextIndex = (currentIndex + 1) % interestOrder.length;
  activeInterest.value = interestOrder[nextIndex];
};

const previousInterest = () => {
  const currentIndex = interestOrder.indexOf(activeInterest.value);
  const prevIndex =
    (currentIndex - 1 + interestOrder.length) % interestOrder.length;
  activeInterest.value = interestOrder[prevIndex];
};

// Initialize with URL hash if present
onMounted(() => {
  const hash = window.location.hash.substring(1);
  if (hash && interestOrder.includes(hash)) {
    activeInterest.value = hash;
  }
});
</script>

<style lang="scss" scoped>
.interests-page {
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

.groups {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: map.get($spacing, "lg");
  margin-top: map.get($spacing, "md");

  .group {
    flex: 1;
    min-width: 250px;
    background-color: var(--color-bg-secondary);
    border-radius: map.get($border-radius, "md");
    overflow: hidden;
    border: 1px solid var(--color-border);

    .title {
      background-color: var(--color-accent-translucent);
      padding: map.get($spacing, "md");
      margin: 0;
      font-size: map.get($font-sizes, "lg");
      color: var(--color-accent);
      text-align: center;
      border-bottom: 1px solid var(--color-border);
    }

    .links {
      display: flex;
      flex-direction: column;
      padding: map.get($spacing, "md");
      gap: map.get($spacing, "sm");

      .link {
        background-color: var(--color-accent-translucent);
        padding: map.get($spacing, "xs") map.get($spacing, "md");
        border-radius: map.get($border-radius, "md");
        transition: all 0.2s ease;
        text-align: center;

        &:hover {
          transform: translateY(-2px);
          background-color: var(--color-accent-light);
          color: var(--color-bg-primary);
        }
      }
    }
  }
}

.interest-content {
  margin-top: map.get($spacing, "xl");
  animation: fadeIn 0.5s ease;
}

.interest-item {
  background-color: var(--color-bg-tertiary);
  border-radius: map.get($border-radius, "lg");
  padding: map.get($spacing, "xl");
  margin-bottom: map.get($spacing, "xl");
  animation: fadeIn 0.5s ease;

  .interest-header {
    text-align: center;
    margin-bottom: map.get($spacing, "lg");
    padding-bottom: map.get($spacing, "md");
    border-bottom: 1px solid var(--color-border);

    h2 {
      font-size: map.get($font-sizes, "2xl");
      color: var(--color-accent);
      margin: 0;
    }
  }

  .summary {
    font-size: map.get($font-sizes, "lg");
    text-align: center;
    margin-bottom: map.get($spacing, "lg");
    color: var(--color-accent-light);
  }

  h3 {
    font-size: map.get($font-sizes, "lg");
    color: var(--color-accent-light);
    margin: map.get($spacing, "lg") 0 map.get($spacing, "sm");
  }

  p {
    margin-bottom: map.get($spacing, "md");
    line-height: 1.6;
  }

  ul {
    margin-bottom: map.get($spacing, "md");
    padding-left: map.get($spacing, "xl");

    li {
      margin-bottom: map.get($spacing, "xs");
    }
  }

  .link-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: map.get($spacing, "md");
    margin: map.get($spacing, "lg") 0;

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
