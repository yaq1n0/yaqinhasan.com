<template>
  <carousel-layout title="My Interests" :items="interestItems" :initial-item-id="activeInterest" minimal :scroll-speed="40">
    <template #default="{ activeItem }">
      <!-- Custom PCs -->
      <div v-show="activeItem.id === 'custom-pcs'">
        <carousel-detail
          title="Enthusiast Custom PCs"
          summary="I have built my own computers since I was 12. My current fascination is with small form factor (SFF) PCs."
        >
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

          <h3>I thought it'd be cool to see it in contrast to my first ever build which had the following specs:</h3>
          <ul>
            <li>Core i5-4690k</li>
            <li>an intel stock cooler -> Corsair H80i GT (intermediary, got stuck on the OG board)-> Noctua NH-D15</li>
            <li>Gigabyte H81M-HD3 -> Asus Z97 Pro-Gamer</li>
            <li>Kingston Fury Black 1x8GB DDR3-1600 CL10 -> 2x8GB of the same</li>
            <li>Kingston V300 120GB & WD Blue 1TB -> Samsung 850 evo 250GB & WD Blue 1 TB</li>
            <li>EVGA GTX 960 4GB SSC -> Asus Strix GTX 1070 8GB</li>
            <li>Gigabyte Hercules 500w (accidentally blew it up)-> EVGA 750w P2</li>
            <li>NZXT Source 210 windowed</li>
          </ul>
        </carousel-detail>
      </div>

      <!-- Overclocking -->
      <div v-show="activeItem.id === 'overclocking'">
        <carousel-detail
          title="Extreme Overclocking and PC modding"
          summary="I started overclocking with my 4690k back in 2015, back when overclocking was as simple as upping a clock multiplier and voltage and you'd get an extra 10-20% performance."
        >
          <p>
            I have since overclocked every one of the computers I have owned to some capacity, even if there's little to no real-world performance benefit these
            days with modern chips having pretty good stock boost algorithms.
          </p>

          <p>
            One of my more extreme OC forays was using BootCamp Windows on my i9-9980hk equipped MacBook Pro to have access to Intel Extreme Tuning Utility,
            which let me overclock the 9980hk mobile CPU. Granted, I couldn't squeeze much out of the limited stock thermal headroom (~35w), but by removing the
            back panel and cranking the fans, I managed to push it up to 45w. I was quite surprised by how overengineered the power delivery for the CPU was,
            since it was capable of pretty crazy peak turbo power draws of nearly 100w.
          </p>

          <p>
            One of the PC mods that I swear by is GPU deshrouding, I strongly believe that stock GPU fans are garbage replacing them with a quality set
            dramatically improves the noise characteristics of any card. On the topic of being a silent computing enthusiast, I went as far as to replace the
            internal fan on a TFX power supply just to quiet down my home server.
          </p>
        </carousel-detail>
      </div>

      <!-- HomeLab -->
      <div v-show="activeItem.id === 'homelab'">
        <carousel-detail
          title='"HomeLab" Server Hosting'
          summary="I've been hosting my own local home servers and setting up local networking since 2017, When I set up my Ethereum mining rig at the time to also function as a NAS."
        >
          <p>
            I then built my first purpose-built NAS using an SFF Dell Optiplex and a decommissioned IBM ServeRaid Raid card. I had to get creative with fitting
            it all so I grabbed a dremel and savaged a side panel to externally mount the drives.
          </p>

          <p>
            I also dabble in hosting my own DNS servers and web servers on a raspberry pi, such as using the pi hole DNS adblocker. I am also planning to shift
            my website hosting to a local server if I can find a place with a static IP, because I enjoy having my own computers :).
          </p>
        </carousel-detail>
      </div>

      <!-- SBCs -->
      <div v-show="activeItem.id === 'sbc'">
        <carousel-detail
          title="Single Board Computers and Microcontroller electronics"
          summary="I started with my first Raspberry Pi 3 nearly a decade ago now, I was always fascinated by how much compute could actually fit onto a single credit card sized PCB."
        >
          <p>
            As I became more educated in the realm of computer science, I learned more and more things that could be done on SBCs. Not just using them as a
            desktop/PC replacement, but writing specialized software that uses the unique capabilities of SBCs to interface with hardware. In other words, using
            them like a microcontroller, to interface with electronics!
          </p>

          <p>
            I've used the Raspberry Pi 3, 4 and 5 as well as the Nvidia Jetson Nano Developer Kit. I find it quite fascinating seeing the generational
            performance leaps of the Raspberry Pi platform, with the Pi 3 barely being able to run a graphical desktop environment to the Pi 5 being a nearly
            indistinguishable in basic use from a standard x86_PC.
          </p>

          <p>
            The Jetson Nano is even more interesting, having an onboard Nvidia Maxwell GPU. Which when used right, can massively accelerate a variety of tasks
            you might want to run on an SBC, like object classification neural networks.
          </p>
        </carousel-detail>
      </div>

      <!-- Game Design -->
      <div v-show="activeItem.id === 'game-design'">
        <carousel-detail
          title="Game Design and Modding"
          summary="As with a large portion of the developer population, I have been playing PC games since I was a kid. Consequently, I have always wanted to learn how to make and modify the things I have always enjoyed playing."
        >
          <p>
            My first foray into game design was actually through level design in the Source engine's "hammer" editor. I learned what made a good game level and
            some fundamentals of game design, and even made my own Counter-Strike map.
          </p>

          <p>
            My first real dive into game modding was with Cyberpunk 2077. I have been using REDEngine mods since The Witcher 3 and have always really liked the
            modding support that the engine offers. I was using a mod called CyberVehiclesOverhaul which made the cars in Cyberpunk actually feel like cars from
            the future. With the new update 2.0 and Phantom Liberty DLC adding new cars and the mod not having these new cars, I took the existing mod code and
            added the new cars that I wanted and made them even faster, to my own liking. This took learning the CyberEngineTweaks framework and Lua scripting
            to make these modifications to the code.
          </p>

          <div class="link-container">
            <a href="https://github.com/yaq1n0/cyber-vehicles-overhaul-mod-2.1PL" target="_blank" class="link">
              <font-awesome-icon :icon="['fab', 'github']" /> Source Code (GitHub)
            </a>
          </div>
        </carousel-detail>
      </div>

      <!-- Powerlifting -->
      <div v-show="activeItem.id === 'powerlifting'">
        <carousel-detail
          title="Powerlifting/Strength Sports"
          summary="I have been training for powerlifting since April 2021, I have since competed at the National British University Championships in 2023 and Co-founded Southampton University's Powerlifting Club."
        >
          <div class="link-container">
            <a href="https://www.openpowerlifting.org/u/yaqinhasan" target="_blank" class="link"> My OpenPowerlifting Page </a>
          </div>
        </carousel-detail>
      </div>
    </template>
  </carousel-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import CarouselLayout from "@/components/carousel/CarouselLayout.vue";
import CarouselDetail from "@/components/carousel/CarouselDetail.vue";
import { CarouselItem } from "@/components/carousel/types";

// State for active interest
const activeInterest = ref("custom-pcs");

// Interest items for the carousel
const interestItems: CarouselItem[] = [
  { id: "custom-pcs", label: "My Custom PCs" },
  { id: "overclocking", label: "Extreme Overclocking" },
  { id: "homelab", label: '"HomeLab" Server Hosting' },
  { id: "sbc", label: "SBCs and Microelectronics" },
  { id: "game-design", label: "Game Design and Modding" },
  { id: "powerlifting", label: "Powerlifting/Strength Sports" }
];

// Initialize with URL hash if present
onMounted(() => {
  const hash = window.location.hash.substring(1);
  if (hash && interestItems.some((item) => item.id === hash)) {
    activeInterest.value = hash;
  }
});
</script>

<style lang="scss" scoped>
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

.interests-picker {
  :deep(.groups) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: map.get($spacing, "xl");

    .group {
      flex: 1;
      min-width: 250px;

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
        width: 100%;
        margin-bottom: map.get($spacing, "md");
      }
    }
  }
}
</style>
