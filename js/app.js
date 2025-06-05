// App entry point - loads all JS files in correct order
// This file is used by webpack to bundle everything properly

// Load config first (it defines global CONFIG)
import './config.js';

// Load core libraries
import 'particles.js';
import Typed from 'typed.js';
window.Typed = Typed;

// Load utilities
import './particles-config.js';
import './smooth-scroll.js';
import './theme.js';
import './terminal.js';

// Load data files
import './data/skills.js';
import './data/experience.js';
import './data/certifications.js';
import './data/projects.js';

// Load animations
import './animations.js';

// Finally load main app (depends on CONFIG)
import './init.js';