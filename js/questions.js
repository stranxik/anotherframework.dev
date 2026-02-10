/**
 * 12 questions, 4 steps.
 * Each option has a label and a score delta.
 */
const QUESTIONS = [
  // === Step 1: Context (2 questions) ===
  {
    step: 1,
    stepTitle: "Context",
    id: "framework_type",
    text: "What type of framework are you evaluating?",
    options: [
      { label: "LLM / Agent framework", score: 1 },
      { label: "Backend / API framework", score: 1 },
      { label: "Orchestrator / Workflow engine", score: 1 },
      { label: '"Does everything"', score: -2 }
    ]
  },
  {
    step: 1,
    stepTitle: "Context",
    id: "motivation",
    text: "What's your primary motivation for adopting it?",
    options: [
      { label: "Ship faster with proven abstractions", score: 2 },
      { label: "Multi-provider / multi-model support", score: 2 },
      { label: "Workflow automation I can't build alone", score: 3 },
      { label: "Everyone in my feed uses it", score: -5 },
      { label: "The demo looked powerful", score: -1 }
    ]
  },

  // === Step 2: Architecture (3 questions) ===
  {
    step: 2,
    stepTitle: "Architecture",
    id: "business_logic",
    text: "Is your business logic independent from the framework?",
    options: [
      { label: "Yes — framework is an adapter", score: 3 },
      { label: "Partially — some coupling exists", score: 1 },
      { label: "No — it's deeply intertwined", score: -2 }
    ]
  },
  {
    step: 2,
    stepTitle: "Architecture",
    id: "remove_framework",
    text: "If you removed the framework tomorrow, what happens?",
    options: [
      { label: "Swap the adapter, everything else stays", score: 3 },
      { label: "Significant refactor, but doable", score: 1 },
      { label: "The product won't start", score: -4 }
    ]
  },
  {
    step: 2,
    stepTitle: "Architecture",
    id: "interfaces",
    text: "Have you defined abstract interfaces for external dependencies?",
    options: [
      { label: "Yes — ports/adapters or similar pattern", score: 3 },
      { label: "No, but I should", score: 0 },
      { label: "The framework manages all of that", score: -2 }
    ]
  },

  // === Step 3: Contracts & Resilience (4 questions) ===
  {
    step: 3,
    stepTitle: "Contracts & Resilience",
    id: "validation",
    text: "Do you validate inputs/outputs with strict schemas?",
    options: [
      { label: "Always — Zod, JSON Schema, or equivalent", score: 3 },
      { label: "Sometimes, when it's critical", score: 1 },
      { label: "I trust the model output", score: -3 }
    ]
  },
  {
    step: 3,
    stepTitle: "Contracts & Resilience",
    id: "idempotent",
    text: "Are your side effects idempotent?",
    options: [
      { label: "Yes — retries are safe", score: 2 },
      { label: "No, and we've had issues", score: -2 },
      { label: "We hope so", score: -1 }
    ]
  },
  {
    step: 3,
    stepTitle: "Contracts & Resilience",
    id: "retries",
    text: "How do you handle retries and error recovery?",
    options: [
      { label: "Centralized retry policies we control", score: 2 },
      { label: "Ad-hoc, varies by component", score: -1 },
      { label: "The framework handles it automatically", score: -2 }
    ]
  },
  {
    step: 3,
    stepTitle: "Contracts & Resilience",
    id: "limits",
    text: "Are rate limits, token budgets, and timeouts explicitly defined?",
    options: [
      { label: "Yes — all explicitly configured", score: 2 },
      { label: "Some are, others use defaults", score: 0 },
      { label: "Not yet, we'll add them later", score: -2 }
    ]
  },

  // === Step 4: Maturity (3 questions) ===
  {
    step: 4,
    stepTitle: "Maturity",
    id: "problem_solved",
    text: "Does the framework solve a problem you already identified?",
    options: [
      { label: "Yes — we hit the wall, then found the tool", score: 3 },
      { label: "Maybe — it might help with future needs", score: 0 },
      { label: "Not really — but it's interesting tech", score: -2 }
    ]
  },
  {
    step: 4,
    stepTitle: "Maturity",
    id: "complexity",
    text: "Have you measured the complexity the framework adds?",
    options: [
      { label: "Yes — we weighed trade-offs explicitly", score: 2 },
      { label: "No — we assumed it simplifies things", score: -2 }
    ]
  },
  {
    step: 4,
    stepTitle: "Maturity",
    id: "need_type",
    text: "Is this driven by a business need or a technical preference?",
    options: [
      { label: "Business need — users/revenue depend on it", score: 3 },
      { label: "Technical need — our stack requires it", score: 1 },
      { label: "Both — aligned business and technical", score: 2 },
      { label: "Hype — it's the hot tool right now", score: -5 }
    ]
  }
];

export { QUESTIONS };
