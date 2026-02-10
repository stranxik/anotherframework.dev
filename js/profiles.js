/**
 * 4 result profiles based on score ranges.
 * Each profile has multiple taglines — one is picked at random.
 */
const PROFILES = [
  {
    id: "architect",
    range: [24, 30],
    title: "Architect With Self-Control",
    color: "green",
    taglines: [
      "You evaluate tools like an engineer, not a consumer. Honestly, it's suspicious.",
      "You're the person who reads the source code before installing. We respect you. We also fear you.",
      "Your architecture doesn't need a framework. It barely needs you at this point.",
      "You said no to a trending library. In public. Absolute psychopath behavior.",
      "You've resisted the urge to npm install. Most people can't say that."
    ],
    diagnostic: "Your architecture is decoupled, your contracts are explicit, and your decisions are intentional. Either you've been burned before, or you're lying. Either way \u2014 you're the kind of person who can adopt a framework responsibly, precisely because you don't actually need one.",
    recommendations: [
      "Keep your adapters thin \u2014 the moment framework logic leaks into your domain, refactor.",
      "Document your architectural decisions (ADRs) so the next dev understands why, not just what.",
      "Mentor your team on these principles \u2014 this level of discipline is rare."
    ]
  },
  {
    id: "builder",
    range: [16, 23],
    title: "Optimistic Builder",
    color: "yellow",
    taglines: [
      "Good instincts, questionable boundaries. Like someone who meal-preps but orders Uber Eats on Fridays.",
      "You're one bad sprint away from enlightenment. Or from adding another dependency.",
      "Your architecture is solid. Your willpower around shiny new tools... less so.",
      "You read the docs before installing. Sometimes. When they're short.",
      "You know what coupling is. You just think yours is the acceptable kind."
    ],
    diagnostic: "You have a solid foundation, but some of your boundaries are... aspirational. The framework is helping today, but if you're not careful, it'll own your architecture by next quarter \u2014 and charge rent.",
    recommendations: [
      "Audit your framework boundaries \u2014 identify where framework types leak into your domain.",
      "Add strict schema validation on every LLM output before it hits your business logic.",
      "Write one integration test that runs without the framework \u2014 if you can't, that's your refactor target."
    ]
  },
  {
    id: "searcher",
    range: [8, 15],
    title: "Searching for Magic",
    color: "orange",
    taglines: [
      "You're not choosing a tool. You're hoping one will choose you.",
      "You've confused 'quick start guide' with 'architecture decision'.",
      "Somewhere in your codebase, a framework is making decisions you don't know about.",
      "You installed it for the demo. You kept it out of fear.",
      "Your architecture is a framework with extra steps."
    ],
    diagnostic: "There's a gap between what you need and what you've designed. The framework is filling that gap \u2014 with opinions you didn't choose, complexity you don't control, and a Discord server you'll be checking at 2am when things break.",
    recommendations: [
      "Stop and write down the 3 problems you're actually solving. If you can't, the framework is premature.",
      "Extract your core logic into plain functions with zero dependencies \u2014 test them in isolation.",
      "Replace at least one 'framework magic' feature with an explicit, boring implementation you fully understand."
    ]
  },
  {
    id: "collector",
    range: [0, 7],
    title: "Dependency Collector",
    color: "red",
    taglines: [
      "You don't need a framework. You need a mass, a lawyer, and possibly an exorcist.",
      "Your node_modules folder has its own gravitational field.",
      "You don't have a tech stack. You have a tech archaeological site.",
      "Somewhere, a clean architecture book is crying and it doesn't know why.",
      "Your dependency tree has more branches than your git repo."
    ],
    diagnostic: "Right now, the framework IS your architecture \u2014 and that's the problem. You've outsourced critical decisions to a library that might change its API next Tuesday. Every layer depends on it. Removing it would be less 'refactoring' and more 'rebuilding civilization after an extinction event.'",
    recommendations: [
      "Draw your system boundaries on paper. If every arrow points to the framework, you have a single point of failure.",
      "Implement one complete feature using only your language's standard library. Feel the difference.",
      "Read about Hexagonal Architecture \u2014 it's not academic theory, it's survival strategy for exactly your situation."
    ]
  }
];

/**
 * Pick a random tagline from a profile.
 */
function getRandomTagline(profile) {
  return profile.taglines[Math.floor(Math.random() * profile.taglines.length)];
}

export { PROFILES, getRandomTagline };
