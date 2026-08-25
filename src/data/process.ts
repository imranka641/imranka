import { ProcessStep } from '../types';

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: 'Discover',
    tagline: 'Grasping the Vision & Constraints',
    description: 'We begin by thoroughly understanding your business objectives, target audience, core challenges, and feature requirements.',
    keyActivities: [
      'Clarifying target audience & user personas',
      'Defining functional specifications & core scope',
      'Evaluating technical feasibility & timeline'
    ]
  },
  {
    step: 2,
    title: 'Plan',
    tagline: 'System Architecture & Data Modeling',
    description: 'I architect the application roadmap, relational database schema, API contracts, and user journey workflows before writing code.',
    keyActivities: [
      'Entity relationship & database schema design',
      'API endpoint specifications & auth flows',
      'Wireframing core screens & navigational hierarchy'
    ]
  },
  {
    step: 3,
    title: 'Design',
    tagline: 'Clean, Accessible & Purposeful UI',
    description: 'Crafting responsive, high-contrast visual interfaces with clean typography, intuitive user interactions, and balanced negative space.',
    keyActivities: [
      'Tailored color palette & typographic scaling',
      'Mobile-first responsive layout design',
      'Interactive components, hover states & micro-animations'
    ]
  },
  {
    step: 4,
    title: 'Build',
    tagline: 'End-to-End Modular Development',
    description: 'Writing robust frontend components, server-side APIs, database tables, validation rules, and business logic using modern best practices.',
    keyActivities: [
      'Component-based frontend development in React',
      'Backend REST API implementation & routing',
      'Database integration with structured ORMs/queries'
    ]
  },
  {
    step: 5,
    title: 'Test',
    tagline: 'Rigorous Verification & Responsiveness',
    description: 'Testing every user flow, form validation, edge case, and screen breakpoint to guarantee smooth, bug-free performance.',
    keyActivities: [
      'Cross-browser and multi-device responsive testing',
      'Form validation, error boundaries & edge-case checks',
      'Performance audit, load time & asset optimization'
    ]
  },
  {
    step: 6,
    title: 'Launch',
    tagline: 'Production Deployment & Continuous Support',
    description: 'Deploying the application to live cloud hosting, connecting domain names, configuring SSL, and ensuring everything is primed for real users.',
    keyActivities: [
      'Production build pipeline & hosting deployment',
      'Custom domain routing & SSL certificate activation',
      'Post-launch smoke test & handoff documentation'
    ]
  }
];
