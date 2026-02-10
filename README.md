# Do You Really Need That Framework?

A 2-minute architectural self-assessment for developers who are about to `npm install` something they may regret.

**[anotherframework.dev](https://anotherframework.dev)**

## Origin Story

It started on a Tuesday. The kind of Tuesday where the coffee is cold, the CI is red, and someone in the architecture channel types *"I've been thinking..."*

He was a Lead Dev. Experienced. Battle-scarred. The kind of engineer whose code reviews made juniors question their career choices. A man of principle — or so we thought.

Because at some point, between two sprints and a failed demo, he found LangChain. And LangChain found him. It was immediate. Electric. The kind of connection you usually reserve for a first salary or a perfectly typed generic.

From that day forward, every kickoff meeting started the same way. *"So obviously we'll use LangChain."* Every PR description: *"Integrated with LangChain."* Every architecture diagram: a single box labeled "LangChain" with arrows pointing everywhere and nowhere. The man didn't design systems anymore. He orchestrated LangChain YAMLs with the confidence of someone who has never read a stack trace past line 3.

One afternoon, after a 40-minute monologue about LangChain Expression Language, I asked one question:

*"What happens if you remove it?"*

He looked at me the way you look at someone who suggests we go back to horses. Then: silence. The kind of silence where you can hear a `node_modules` folder being created somewhere in the world.

Here's the thing: LangChain is about 3 years old. Born in October 2022 — one month before ChatGPT even existed. It's not battle-tested infrastructure. It's a moving target with a changelog that reads like a thriller. It's an abstraction layer, and abstractions don't reduce errors. They hide them. Somewhere between your prompt and your output, there are 47 function calls you've never read, 12 retry policies you didn't choose, and a serialization format that will change next quarter.

We're at the dawn of AI frameworks. The APIs are unstable, the patterns are evolving weekly, and the "best practices" are yesterday's blog posts. Building your entire architecture on top of one is like tattooing your girlfriend's name on your face after the second date.

Clean Architecture exists. Hexagonal Architecture exists. SOLID principles have been quietly working for decades. They're not trending on Twitter. They don't have a Discord server with 50k members. But they'll still be relevant when the framework you chose today is tomorrow's deprecated import.

This site exists because the question *"Do you really need that framework?"* deserved better than a Slack argument.

### To the LangChain team

Nothing personal. You ship fast, the community is huge, and the ambition is real. But let's be honest: any senior dev with a free weekend could rebuild the parts they actually use — minus the 200 transitive dependencies. In a hackathon? Go wild. In production with SLAs? Let's talk after the next breaking change.

This isn't anti-framework. It's anti-`pip install thinking`.

## What is this?

12 questions. 4 categories. Zero judgment. Okay, maybe a little.

A diagnostic tool disguised as a quiz. It evaluates how you approach framework adoption — not which framework you use, but whether your architecture actually needs one.

## How it works

Answer questions across 4 dimensions:

- **Context** — Why are you reaching for a framework?
- **Architecture** — How coupled is your system to it?
- **Contracts & Resilience** — Are your boundaries explicit?
- **Maturity** — Is this solving a real problem?

You get a score out of 30 and one of 4 profiles — from *Architect With Self-Control* to *Dependency Collector*.

## Stack

Pure vanilla HTML, CSS, and JS. Zero frameworks. Zero dependencies. Zero build step.

That's the point.

## Run locally

```bash
python3 -m http.server 3000
```

Open [http://localhost:3000](http://localhost:3000).

## License

MIT
