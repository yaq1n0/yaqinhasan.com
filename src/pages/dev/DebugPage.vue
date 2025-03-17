<template>
  <div class="debug-page">
    <h1>Component Debug Page</h1>
    <p class="description">This page demonstrates all components in isolation with their variants.</p>

    <!-- Button Component -->
    <section>
      <h2>Button Component</h2>
      
      <div class="component-grid">
        <!-- Default Button -->
        <div class="component-variant">
          <h3>Default Button</h3>
          <Button label="Default Button" />
        </div>

        <!-- Default Button with Icon -->
        <div class="component-variant">
          <h3>Default Button with Icon</h3>
          <Button label="Default Button" icon="close" />
        </div>
        
        <!-- Button with Icon -->
        <div class="component-variant">
          <h3>Label Right + Icon</h3>
          <Button label="Label Right" icon="arrow-right" labelPos="right"/>
        </div>
        
        <!-- Button with Icon Left -->
        <div class="component-variant">
          <h3>Label Left + Icon</h3>
          <Button label="Label Left" icon="arrow-left" labelPos="left" />
        </div>
        
        <!-- Button with Icon Above -->
        <div class="component-variant">
          <h3>Label Above + Icon</h3>
          <Button label="Label Above" icon="arrow-up" labelPos="above" />
        </div>
        
        <!-- Button with Icon Below -->
        <div class="component-variant">
          <h3>Label Below + Icon</h3>
          <Button label="Label Below" icon="arrow-down" labelPos="below" />
        </div>
        
        <!-- Button Shapes -->
        <div class="component-variant">
          <h3>Shape: Rounded</h3>
          <Button label="Rounded Button" shape="rounded" />
        </div>
        
        <div class="component-variant">
          <h3>Shape: Squircle (Default)</h3>
          <Button label="Squircle Button" shape="squircle" />
        </div>
        
        <!-- Button Borders -->
        <div class="component-variant">
          <h3>Border: Thin</h3>
          <Button label="Thin Border" border="thin" />
        </div>
        
        <div class="component-variant">
          <h3>Border: Thick</h3>
          <Button label="Thick Border" border="thick" />
        </div>
        
        <div class="component-variant">
          <h3>Border: None</h3>
          <Button label="No Border" border="none" />
        </div>
        
        <!-- Button as Link -->
        <div class="component-variant">
          <h3>Router Link (to="/")</h3>
          <Button label="Go to Home" to="/" icon="home" />
        </div>
        
        <div class="component-variant">
          <h3>External Link (href)</h3>
          <Button label="GitHub" href="https://github.com" icon="code-branch" iconPrefix="fab" />
        </div>
        
        <!-- Custom Background -->
        <div class="component-variant">
          <h3>Custom Background</h3>
          <Button label="Custom Color" background="rgba(255, 0, 0, 0.3)" />
        </div>
      </div>
    </section>

    <!-- CollapsibleSection Component -->
    <section>
      <h2>CollapsibleSection Component</h2>
      
      <div class="component-grid">
        <div class="wide">
          <CollapsibleSection title="Closed by default" :modelValue="false">
            <p>This is the content of the collapsible section. It can contain any content.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </CollapsibleSection>
        </div>

        <div class="wide">
          <CollapsibleSection title="Open by default" :modelValue="true">
            <p>This section is initially open.</p>
            <p>You can toggle it by clicking on the header.</p>
          </CollapsibleSection>
        </div>
      </div>
    </section>

    <!-- DarkModeToggle Component -->
    <section>
      <h2>DarkModeToggle Component</h2>
      
      <div class="component-grid">
        <div class="component-variant">
          <h3>Dark Mode Toggle</h3>
          <DarkModeToggle />
          <p class="mt-4">Current theme is stored in localStorage</p>
        </div>
      </div>
    </section>

    <!-- DevModeToggle Component -->
    <section>
      <h2>DevModeToggle Component</h2>
      
      <div class="component-grid">
        <div class="component-variant">
          <h3>Dev Mode Toggle</h3>
          <DevModeToggle />
          <p class="mt-4">Toggle to show developer-only content</p>
          <div class="show-dev-only mt-4 p-4 border rounded">
            <p>This content is only visible in dev mode</p>
          </div>
        </div>
      </div>
    </section>

    <!-- NavBar Component -->
    <section>
      <h2>NavBar Component</h2>
      
      <div class="component-grid">
        <div class="component-variant wide">
          <h3>Navigation Bar (Normal)</h3>
          <div class="nav-container">
            <NavBar />
          </div>
          <p class="mt-4">Try toggling dev mode to see additional nav items</p>
        </div>
        
        <div class="component-variant wide narrow-demo-container">
          <h3>Navigation Bar (Narrow/Mobile View)</h3>
          <div class="nav-container narrow-demo">
            <NavBar />
          </div>
          <p class="mt-4">This demonstrates how the navbar appears on mobile devices with the overflow menu</p>
        </div>
      </div>
    </section>

    <!-- ProjectCard Component -->
    <section>
      <h2>ProjectCard Component</h2>
      
      <div class="component-grid">
        <div class="component-variant wide">
          <h3>Basic Project Card</h3>
          <ProjectCard :project="projects.basic">
            <p>This is the default content slot for the project card.</p>
            <p>You can add any content here.</p>
          </ProjectCard>
        </div>
        
        <div class="component-variant wide">
          <h3>Project Card with GitHub Link</h3>
          <ProjectCard :project="projects.withGithub">
            <p>This project card includes a GitHub link in the header.</p>
            <h4>Features:</h4>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
          </ProjectCard>
        </div>
        
        <div class="component-variant wide">
          <h3>Project Card with Dev Content</h3>
          <ProjectCard :project="projects.withDevContent">
            <p>This project card includes developer-only content.</p>
            <p>Toggle dev mode to see it.</p>
            
            <template #dev-content>
              <h4>Developer Notes</h4>
              <p>These notes are only visible when dev mode is enabled.</p>
              <pre>const code = "This is some example code";</pre>
            </template>
          </ProjectCard>
        </div>
        
        <div class="component-variant wide">
          <h3>Project Card with Extra Links</h3>
          <ProjectCard :project="projects.withExtraLinks">
            <p>This project card demonstrates the extra-links slot.</p>
            
            <template #extra-links>
              <a href="https://example.com" target="_blank" class="link">
                <font-awesome-icon :icon="['fas', 'globe']" /> Live Demo
              </a>
              <a href="https://docs.example.com" target="_blank" class="link">
                <font-awesome-icon :icon="['fas', 'book']" /> Documentation
              </a>
            </template>
          </ProjectCard>
        </div>
      </div>
    </section>

    <!-- Carousel Components -->
    <section>
      <h2>Carousel Components</h2>
      
      <div class="component-variant wide">
        <h3>Carousel Layout with Picker and Detail</h3>
        <div class="carousel-demo">
          <CarouselLayout 
            title="Demo Carousel" 
            pickerTitle="Select an Item" 
            :items="carouselItems.map(item => item.id)"
            v-model:activeItem="activeCarouselItem"
          >
            <template #picker>
              <CarouselPicker 
                :groups="carouselGroups" 
                v-model="activeCarouselItem"
              />
            </template>
            
            <template #content>
              <div v-for="item in carouselItems" :key="item.id" v-show="activeCarouselItem === item.id">
                <CarouselDetail 
                  :title="item.title" 
                  :summary="item.summary"
                  :showDevContent="item.showDevContent"
                >
                  <template #actions>
                    <Button 
                      v-if="item.githubUrl"
                      :href="item.githubUrl"
                      label="Source Code"
                      icon="github"
                      iconPrefix="fab"
                    />
                    <Button 
                      v-if="item.demoUrl"
                      :href="item.demoUrl"
                      label="Live Demo"
                      icon="globe"
                    />
                  </template>
                  
                  <div v-html="item.content"></div>
                  
                  <template #dev-content v-if="item.devContent">
                    <div v-html="item.devContent"></div>
                  </template>
                </CarouselDetail>
              </div>
            </template>
          </CarouselLayout>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick, ref } from 'vue';
import Button from '@/components/Button.vue';
import CollapsibleSection from '@/components/CollapsibleSection.vue';
import DarkModeToggle from '@/components/DarkModeToggle.vue';
import DevModeToggle from '@/components/DevModeToggle.vue';
import NavBar from '@/components/NavBar.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import CarouselLayout from '@/components/CarouselLayout.vue';
import CarouselPicker from '@/components/CarouselPicker.vue';
import CarouselDetail from '@/components/CarouselDetail.vue';

// Sample projects for ProjectCard component
const projects = {
  basic: {
    title: 'Basic Project',
    summary: 'A simple project with minimal information'
  },
  withGithub: {
    title: 'Project with GitHub',
    githubUrl: 'https://github.com/username/project',
    summary: 'This project includes a link to its GitHub repository'
  },
  withDevContent: {
    title: 'Project with Dev Content',
    summary: 'This project includes developer-only content',
    showDevContent: true
  },
  withExtraLinks: {
    title: 'Project with Extra Links',
    githubUrl: 'https://github.com/username/project',
    summary: 'This project demonstrates the extra-links slot'
  }
}

// Sample data for Carousel components
const activeCarouselItem = ref('item1');

const carouselItems = [
  {
    id: 'item1',
    title: 'First Project',
    summary: 'This is the first project in our carousel',
    githubUrl: 'https://github.com/username/project1',
    demoUrl: 'https://example.com/demo1',
    content: `
      <h3>Project Overview</h3>
      <p>This is a sample project to demonstrate the carousel components.</p>
      <p>You can navigate between items using the picker or the arrow buttons.</p>
      <h4>Features</h4>
      <ul>
        <li>Feature 1: Lorem ipsum dolor sit amet</li>
        <li>Feature 2: Consectetur adipiscing elit</li>
        <li>Feature 3: Sed do eiusmod tempor incididunt</li>
      </ul>
    `,
    showDevContent: true,
    devContent: `
      <h4>Developer Notes</h4>
      <p>These notes are only visible when dev mode is enabled.</p>
      <pre>const code = "This is some example code for project 1";</pre>
    `
  },
  {
    id: 'item2',
    title: 'Second Project',
    summary: 'A more complex project with additional details',
    githubUrl: 'https://github.com/username/project2',
    content: `
      <h3>Project Details</h3>
      <p>This is the second project in our carousel demonstration.</p>
      <p>It has different content to show how the carousel handles various items.</p>
    `
  },
  {
    id: 'item3',
    title: 'Third Project',
    summary: 'A project with minimal information',
    demoUrl: 'https://example.com/demo3',
    content: `
      <p>This project has minimal content but still works perfectly in the carousel.</p>
    `
  },
  {
    id: 'item4',
    title: 'Fourth Project',
    summary: 'Another project with dev content',
    content: `
      <h3>Project Information</h3>
      <p>This is the fourth project in our carousel.</p>
      <p>It demonstrates how multiple items can be managed in the carousel.</p>
    `,
    showDevContent: true,
    devContent: `
      <h4>Technical Implementation</h4>
      <p>This project uses the following technologies:</p>
      <ul>
        <li>Vue.js for the frontend</li>
        <li>Node.js for the backend</li>
        <li>MongoDB for the database</li>
      </ul>
    `
  }
];

const carouselGroups = [
  {
    title: 'Group 1',
    items: [
      { id: 'item1', label: 'First Project' },
      { id: 'item2', label: 'Second Project' }
    ]
  },
  {
    title: 'Group 2',
    items: [
      { id: 'item3', label: 'Third Project' },
      { id: 'item4', label: 'Fourth Project' }
    ]
  }
];

</script>

<style lang="scss" scoped>
.debug-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--color-accent);
    text-align: center;
  }
  
  .description {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 1.2rem;
    color: var(--color-text-secondary);
  }
  
  section {
    margin-bottom: 4rem;
    
    h2 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--color-border);
      color: var(--color-accent-light);
    }
  }
  
  .component-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    
    .wide {
      grid-column: 1 / -1;
    }
  }
  
  .component-variant {
    background: var(--color-bg-tertiary);
    border-radius: 0.5rem;
    padding: 1.5rem;
    
    h3 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      color: var(--color-text-secondary);
    }
    
    .mt-4 {
      margin-top: 1rem;
    }
    
    .p-4 {
      padding: 1rem;
    }
    
    .border {
      border: 1px solid var(--color-border);
    }
    
    .rounded {
      border-radius: 0.5rem;
    }
  }
  
  .nav-container {
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    overflow: hidden;
    
    &.narrow-demo {
      max-width: 480px;
      margin: 0 auto;
      overflow: visible;
      
      // Force mobile view styles regardless of actual screen width
      :deep(.hide-on-mobile) {
        display: none !important;
      }
      
      :deep(.menu-toggle) {
        display: flex !important;
        order: -1;
      }
    }
  }

  .carousel-demo {
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    overflow: hidden;
    margin-top: 1rem;
  }
}

@media (max-width: 768px) {
  .debug-page {
    padding: 1rem;
    
    .component-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
