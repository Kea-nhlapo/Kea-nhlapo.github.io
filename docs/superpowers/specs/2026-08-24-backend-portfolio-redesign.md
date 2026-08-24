# Backend Portfolio Redesign

Date: 24 August 2026
Status: Approved design

## Purpose

The portfolio should help Kea Nhlapo secure backend engineering interviews. A recruiter should understand Kea's target role, strongest technical evidence, and contact options within the first screen. The page should then support that first impression with project case studies, relevant experience, and verified credentials.

## Audience

The primary audience is recruiters hiring junior and early-career backend engineers. Engineering managers are a secondary audience. The page should scan quickly for recruiters while giving technical reviewers enough detail to open a repository and inspect the work.

## Positioning

The site will position Kea as a backend engineer who builds APIs and systems for real-world problems. It will emphasize backend architecture, data modeling, authentication and authorization, external service integration, testing, cloud deployment, and failure handling where the selected repositories support those claims.

The copy must not claim user counts, revenue, performance gains, production traffic, awards, or ownership that the available sources do not establish. TAMP is excluded because Kea does not own it. Hackathon projects may be presented as completed portfolio projects, but their descriptions must remain technically defensible.

## Visual direction

The approved direction is an editorial systems dossier.

- Warm off-white page background with near-black text and an electric green accent
- Strong typographic hierarchy, visible grid lines, and compact monospace labels
- Square or lightly rounded surfaces instead of glass cards
- Architecture-inspired details used as structure, not decoration
- Restrained entrance and hover motion
- High contrast, visible focus states, and full reduced-motion support
- Responsive layouts for narrow mobile screens through large desktops

The design should feel deliberate and technical without imitating a terminal or monitoring dashboard.

## Page structure

### Navigation

A compact sticky navigation bar will include Kea's name, Work, Experience, About, and Contact. External GitHub and LinkedIn links will be visually distinct and will identify that they open a new tab.

### Hero

The hero will state the target role directly. Supporting copy will mention the kinds of systems Kea builds and the technologies demonstrated by the featured work. The primary action will move to featured projects. The secondary action will open GitHub.

The hero may include a small availability or location line only if the public profile supports it. It will not use follower counts, generic passion statements, or a decorative avatar placeholder.

### Featured work

Three hackathon projects will form the core of the page:

1. CivicLens AI
2. WattWise
3. Mint Uptime Guarantee

Each case study will contain:

- The concrete user or operational problem
- What the system does
- Kea's backend contribution or the backend scope demonstrated in the repository
- A compact architecture or request-flow summary
- Relevant technologies
- Two or three engineering decisions supported by the code or documentation
- Links to the repository and a live demo when one exists and works

The project cards will not use invented results or generic statements such as "delivering real value." If a live deployment is unavailable, the interface will omit the demo action instead of showing a broken link.

### Experience

The experience section will prioritize software and systems roles. Each entry will use a role, organization, dates, and one concise description based on public profile information or existing portfolio content. Education will not appear as a job in the timeline.

The current public information supports these entries:

- Software Engineer, backend, at GIMSOI-AI
- Systems Development Intern at Dynamic DNA
- Internship Trainee in the Dynamic DNA skills program
- Web Development Intern at Oasis Infobyte

Dates will be checked against the existing site and LinkedIn before publication. If the public LinkedIn result does not expose a fact clearly, the existing portfolio will remain the source unless the user supplies an update.

### Technical toolkit

Skills will be grouped by practical use instead of displayed as an undifferentiated tag cloud:

- Languages and frameworks
- APIs and data
- Cloud and delivery
- Testing and engineering practices

Only technologies supported by the featured repositories, public profile, or current portfolio will appear.

### Education and credentials

Education will show the BSc in Computer Science and Informatics at the University of South Africa, listed as 2025 to 2028.

Credentials verified against the public LinkedIn profile are:

- Microsoft Certified: Azure Fundamentals, issued November 2024
- freeCodeCamp JavaScript Algorithms and Data Structures (Beta), issued September 2024
- freeCodeCamp Responsive Web Design, issued September 2024
- SoloLearn CSS, issued May 2020
- SoloLearn HTML, issued May 2020
- SoloLearn Java, issued April 2020

Azure Fundamentals will receive the strongest visual emphasis because it supports the cloud portion of Kea's backend profile. Credential IDs may appear in accessible detail text or links, but they should not dominate the page.

### About and contact

The about copy will retain Kea's personal starting point: learning HTML, CSS, and Java at 16. It will connect that history to current backend work without adding a motivational conclusion.

The final section will invite recruiters to discuss backend roles and will link to LinkedIn and GitHub. An email action will be included only if an address is available in the repository or supplied by Kea.

## Content rules

All copy will follow the no-ai-slop editing rules:

- Lead with concrete facts and direct verbs
- Remove inflated claims, filler, and generic professional language
- Avoid fake metrics and unsupported outcomes
- Avoid dramatic fragments, rhetorical questions, and repetitive card copy
- Keep Kea's straightforward first-person voice where personal copy is appropriate
- Use consistent names for technologies and projects
- Use no decorative emoji or unnecessary icon labels

## Implementation boundaries

The existing static GitHub Pages setup will remain. The redesign will use semantic HTML, CSS, and small amounts of JavaScript, with no build system or framework required. External runtime dependencies should be removed where practical. Fonts may be loaded from a reputable CDN with a system-font fallback, though local or system fonts are preferred for reliability.

JavaScript will handle only progressive enhancements such as navigation state or reveal motion. All content and links must work when JavaScript is unavailable.

## Accessibility and resilience

- Semantic landmarks and heading order
- Keyboard-accessible navigation and controls
- Visible focus styles
- WCAG AA color contrast for normal text
- Meaningful link labels and external-link cues
- `prefers-reduced-motion` support
- No content hidden permanently when JavaScript fails
- Layouts tested at 320px, tablet width, and desktop width
- Graceful font and icon fallbacks

## Verification

Before handoff, the implementation will be checked for:

- Valid document structure and absence of console errors
- Working internal navigation and external links
- Correct GitHub Pages asset paths
- Desktop and mobile layout quality
- Keyboard navigation and visible focus
- Reduced-motion behavior
- Missing or broken project actions
- Copy compliance with the no-ai-slop evaluation checklist

## Source hierarchy

When facts conflict, use this order:

1. Direct user instruction
2. Public LinkedIn profile
3. Project repository documentation and code
4. Existing portfolio content

No private company information or claims from repositories Kea does not own will be added.
