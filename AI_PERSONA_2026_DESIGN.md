# AI Persona 2.0 — Design Record

## 1. Purpose

AI Persona 2.0 is the next-generation version of the AI Persona system used in the Creative Industries Design graduate course.

The original AI Persona system was designed primarily as a simulated interviewee. Students interviewed multiple AI Personas to explore user perspectives, identify needs, compare responses, and develop ideas for their final projects. AI Persona 2.0 retains this role as its primary educational and service function, while extending the system from a conversational LLM-based persona into an interactive, stateful, and agentic research participant.

The goal is not to turn the Persona into a general-purpose assistant. The Persona remains primarily a participant in design research. The new agentic capabilities allow it to inspect artifacts, use tools, interact with prototypes, take bounded actions, accumulate experience, and expose its activity trace for analysis.

In short:

**AI Persona 1.0:** simulated interviewee

**AI Persona 2.0:** interactive, stateful, agentic research participant

---

## 2. Educational Context

The system supports a graduate-level course in Creative Industries Design. Many students do not have a strong programming background. Therefore, the system and development workflow should emphasize conceptual understanding, design reasoning, task specification, evaluation, and responsible delegation to AI rather than manual software engineering.

Students use AI Persona interviews as part of the development process for their final projects. They should be able to interview multiple Personas, compare different perspectives, test early concepts, present design artifacts, and later let Personas interact with prototypes.

The system therefore serves two purposes:

1. **Design research service:** support student interviews and iterative design development.
2. **AI literacy platform:** make important concepts of modern AI systems observable and learnable through direct use.

---

## 3. Core Design Principle

AI Persona 2.0 should preserve the strengths of the original Persona system while introducing agentic capability only where it improves the research interaction.

The system should not add tools or autonomous actions merely to demonstrate technology. Every capability should serve a meaningful research or educational function.

The central progression is:

```text
LLM
  ↓
Persona
  ↓
Memory
  ↓
Multimodal understanding
  ↓
Tool use
  ↓
Action
  ↓
Interaction with artifacts / prototypes
  ↓
Experience
  ↓
Persistent memory
```

---

## 4. Primary User Scenario

A student develops a final project through repeated interactions with multiple AI Personas.

### Stage A — Interview

The student interviews selected Personas about their lives, habits, needs, concerns, values, behaviors, and experiences.

Example:

> What are the biggest difficulties you experience when buying groceries?

The Persona answers naturally according to its identity, demographic attributes, personality tendencies, existing facts, and accumulated experience.

### Stage B — Concept Exposure

The student presents an early design concept to the Persona. The artifact may be a text description, image, concept card, PDF, storyboard, interface screenshot, or other design material.

Example:

> This is our initial concept for a community group-purchasing service. Please look at it and tell me what you think.

The Persona may use an artifact-inspection tool to examine the material before responding.

### Stage C — Prototype Interaction

The Persona is asked not only to comment on a prototype but to interact with it.

Example:

> Please use this service and select the option you would actually choose.

The Persona may perform bounded actions such as:

```text
inspect_options()
open_details(option)
select_option(option)
change_setting(value)
submit_choice()
```

The student can observe the difference between what the Persona says it would do and what it actually does when interacting with the design.

### Stage D — Iteration

The student revises the design and returns to the same Persona.

Because the Persona can retain selected experience memory, it may compare the new version with its previous experience.

Example:

> Last time I had trouble finding the pricing information. This version is clearer because the price is now visible immediately.

### Stage E — Cross-Persona Comparison

Students repeat this process with multiple Personas and identify patterns, differences, contradictions, and emerging design implications.

---

## 5. Persona Model

Each Persona should preserve a coherent identity over time.

The Persona model may include:

### Seed identity

- Persona ID
- Name
- Age
- Gender
- Marital status
- Income
- Occupation or life context where appropriate
- Innovation attitude
- Big Five personality tendencies
- Other course-specific attributes

### Durable facts

Facts generated or established during prior interactions that should remain true for that Persona.

Examples:

- personal preferences
- family circumstances
- recurring habits
- past experiences
- constraints
- opinions that have become stable through interaction

### Experience memory

Records of meaningful interactions with student projects or prototypes.

Examples:

- previously evaluated a concept
- had difficulty finding a function in a prototype
- selected a particular option
- rejected a proposal for a specific reason

Experience memory should be distinguished from generic Persona facts because it represents the Persona's interaction history with a particular project or environment.

---

## 6. Memory Architecture

AI Persona 2.0 should explicitly distinguish several forms of memory.

### Session context

Information required for the current conversation or interaction.

Purpose:

- maintain local conversational coherence
- remember recent questions and responses
- support short-term task completion

### Persistent Persona facts

Long-term facts associated with a specific Persona.

Purpose:

- maintain identity consistency
- avoid contradictions
- preserve autobiographical continuity

### Experience memory

Persistent records created through meaningful interaction with a student project or prototype.

Purpose:

- allow longitudinal interaction
- support comparison between design iterations
- let the Persona develop project-specific experience

### External knowledge

Information retrieved through tools or supplied artifacts should not automatically become Persona memory.

The system should distinguish:

**model knowledge ≠ context ≠ external information ≠ Persona memory ≠ experience memory**

This distinction is also an explicit AI literacy learning objective.

---

## 7. Tool Use

AI Persona 2.0 may use tools when direct interaction or external information is required.

Tools should initially be simple, bounded, and observable.

Possible tool categories:

### Artifact inspection

Examples:

```text
inspect_image()
inspect_document()
inspect_concept_card()
```

Purpose: allow the Persona to examine student-provided material before responding.

### Prototype interaction

Examples:

```text
inspect_options()
open_details()
select_option()
change_setting()
submit_choice()
```

Purpose: allow the Persona to interact with a controlled prototype environment.

### Research-context tools

Optional future tools may include:

- search within a supplied knowledge base
- inspect structured project data
- compare alternatives
- access controlled external information

Tools should not be added simply because they are technically available.

---

## 8. Agentic Action

The major conceptual change from AI Persona 1.0 to 2.0 is the distinction between language generation and action.

A Persona saying:

> I would probably select Option A.

is different from the Persona actually executing:

```text
select_option("A")
```

This distinction should remain visible in both system design and teaching.

The Agent should be able to:

1. receive a request
2. interpret the situation
3. decide whether a tool is needed
4. select a suitable tool
5. inspect the result
6. continue reasoning or interaction
7. perform an allowed action when appropriate
8. report or explain the outcome naturally as the Persona

---

## 9. Permission and Human-in-the-Loop

Not every action should be equally autonomous.

Actions should be classified according to risk and reversibility.

### Low-risk / read-only actions

May generally execute automatically.

Examples:

- inspect artifact
- inspect options
- open details
- retrieve project data

### State-changing actions

May require explicit approval depending on the prototype and teaching goal.

Examples:

- submit a choice
- create or delete data
- commit a final decision
- trigger an external service

Human approval should be implemented when it helps students understand agency, authority, responsibility, and system boundaries.

---

## 10. Trace and Observability

AI Persona 2.0 should expose an activity trace separate from the natural-language interview.

Example:

```text
Student question received
↓
Persona context loaded
↓
Tool selected: inspect_concept_card
↓
Artifact inspected
↓
Persona response generated
↓
Experience candidate detected
↓
Memory updated
```

During prototype interaction:

```text
Student request received
↓
Tool selected: inspect_options
↓
3 options returned
↓
Tool selected: open_details(A)
↓
Tool selected: open_details(B)
↓
Action: select_option(A)
↓
Persona explanation generated
```

The trace serves several purposes:

- make agent behavior understandable
- reveal when tools were used
- distinguish reasoning context from actual action
- support debugging
- support evaluation
- support classroom discussion of AI agency

The trace should not expose hidden chain-of-thought. It should report observable system events, decisions, tool calls, results, and state changes.

---

## 11. Multi-Persona Research Workflow

The system should support interviewing multiple Personas as a normal research workflow.

Example:

```text
Persona 007 ─┐
Persona 014 ─┤
Persona 031 ─┤
Persona 052 ─┤→ interviews / interactions
Persona 088 ─┘
                ↓
        student observations
                ↓
       patterns / differences
                ↓
         design direction
                ↓
            prototype
                ↓
      Persona interaction again
                ↓
             iteration
```

Students should not treat Persona responses as factual substitutes for real human research. The educational value includes learning to question simulation validity, identify model bias, compare AI-generated and human evidence, and understand what Persona-based simulation can and cannot support.

---

## 12. Interface Design

The first demo should use a simple web interface rather than Discord as the primary interface.

Discord may remain available later as an optional channel integration, but it should not define the architecture of the system.

A minimal interface should contain four areas:

### Interview / Interaction

Primary conversational interface between student and Persona.

### Persona

Displays the selected Persona and appropriate visible profile information.

### Memory / Tools

Shows relevant system state at a conceptual level, such as enabled memory types and available tools.

### Agent Activity / Trace

Displays observable tool calls, actions, approvals, and memory changes.

The interface should help students understand the difference between:

- Persona identity
- conversational response
- memory
- tool use
- action
- system trace

---

## 13. Development Workflow for the Course

The development workflow itself is part of the course's AI literacy goals.

Students should not primarily learn a copy-and-paste AI coding workflow.

The preferred workflow is:

```text
Design intent / requirement
        ↓
Architecture or task definition
        ↓
GitHub Issue
        ↓
Coding Agent
        ↓
Code changes
        ↓
Tests
        ↓
Pull Request
        ↓
Student review
        ↓
Revision if needed
        ↓
Merge
```

This workflow teaches:

- task decomposition
- specification
- delegation
- verification
- review
- responsibility for AI-generated implementation

The student remains responsible for deciding what should be built and whether the resulting implementation is acceptable.

---

## 14. Proposed Technical Stack

The initial development stack should minimize local setup requirements.

### Core

- GitHub
- GitHub Issues and Pull Requests
- GitHub Codespaces
- AI coding agent integrated with the GitHub workflow
- OpenAI API
- OpenAI Agents SDK
- Node.js / TypeScript where practical, to maintain continuity with the original JavaScript-based AI Persona project
- Web-based user interface

### Initial data storage

Simple local or repository-backed structured data is preferred for the first demo.

Examples:

```text
data/
personas/
memory/
prototype/
```

A production database should not be introduced until its need becomes clear.

### Not required for the first demo

- Docker
- n8n
- local VS Code installation
- Discord API
- external database
- OAuth
- Google Calendar integration
- complex deployment infrastructure
- custom MCP server

These may be introduced later only if they serve an explicit educational or project need.

---

## 15. First Demo Scope

The first AI Persona 2.0 demo should be intentionally small.

It should demonstrate the complete conceptual path rather than production completeness.

### Required capabilities

1. Select one of several Persona seeds.
2. Conduct a normal interview.
3. Maintain session context.
4. Load persistent Persona facts.
5. Present a simple design concept or artifact to the Persona.
6. Let the Persona use an explicit inspection tool.
7. Provide a small controlled prototype with a few options.
8. Let the Persona inspect and select an option through tools/actions.
9. Display an observable activity trace.
10. Save at least one meaningful experience memory.
11. Revisit the Persona and demonstrate continuity across an iteration.

### Example demo scenario

A student is developing a community group-purchasing service.

Phase 1:

> Interview the Persona about grocery-shopping habits and difficulties.

Phase 2:

> Show the Persona a concept card for the proposed service.

Phase 3:

> Ask the Persona to interact with a minimal prototype containing several purchasing options.

Phase 4:

> Record meaningful experience from the interaction.

Phase 5:

> Present a revised prototype and observe whether the Persona can compare it with its previous experience.

---

## 16. AI Concepts Exposed Through the System

AI Persona 2.0 should function as a teaching platform for the following concepts:

| Concept | How it appears in AI Persona 2.0 |
|---|---|
| LLM | Persona language generation |
| Instructions | Persona identity and behavioral rules |
| Sampling / temperature | Variation in generated responses |
| Context | Current interview state |
| Memory | Persistent Persona facts and experiences |
| Structured data | Persona seeds and tool inputs/outputs |
| Multimodality | Inspection of images, documents, or design artifacts |
| Tool use | Agent chooses an explicit capability |
| Agent | Model can decide when and how to use tools |
| Action | Agent changes or selects something in the environment |
| Human-in-the-loop | Permission boundary for selected actions |
| Trace | Observable history of agent activity |
| Coding agent | AI performs delegated software-development tasks |
| Evaluation | Students test reliability, consistency, and appropriateness |
| Governance | Students define permissions, limits, and responsibility |

---

## 17. Evaluation Questions

The system should support critical evaluation rather than presenting Persona simulation as inherently valid.

Possible questions include:

### Persona validity

- Does the Persona behave consistently with its seed and accumulated facts?
- Does it become stereotypical or overly deterministic?
- How much variation occurs across repeated runs?

### Memory

- What should be remembered?
- What should remain temporary?
- Does persistent memory create contradictions or inappropriate assumptions?

### Agent behavior

- Did the Agent choose an appropriate tool?
- Did it act when it should have asked instead?
- Did it perform an action consistent with the Persona's expressed preferences?

### Research validity

- What can simulated Persona interviews reasonably contribute to design research?
- What evidence still requires real participants?
- Where might model training data or cultural bias distort the simulated participant?

### Responsibility

- Who defines the Persona?
- Who determines what actions the Persona may take?
- Who is responsible when the Agent behaves incorrectly?

---

## 18. Design Constraints

The following constraints should guide development:

1. **Interview first.** The Persona's primary role remains a research participant.
2. **Agentic capability must serve research interaction.** Do not add autonomy without purpose.
3. **Keep actions bounded and observable.**
4. **Do not expose hidden chain-of-thought.** Use event-level trace instead.
5. **Separate Persona identity, memory, external knowledge, and tool state.**
6. **Preserve multi-Persona workflows.**
7. **Minimize student setup burden.** The first working Agent should not require local environment configuration.
8. **Prefer GitHub/Codespaces workflows over local installation.**
9. **Use coding agents for implementation delegation, but require human review.**
10. **Do not treat AI Persona as a substitute for real human participants.** Critical comparison is part of the learning objective.

---

## 19. Development Direction

AI Persona 2.0 should be developed incrementally.

A likely progression is:

```text
Phase 1
Interview + Persona + basic memory

Phase 2
Artifact inspection

Phase 3
Tool calling + visible trace

Phase 4
Controlled prototype interaction

Phase 5
Experience memory

Phase 6
Multi-Persona comparison and iteration

Phase 7
Optional external services / advanced tools
```

Each phase should remain independently testable.

---

## 20. Working Definition

For development and course design purposes, the project will use the following working definition:

> **AI Persona 2.0 is an interactive, stateful, agentic research participant designed to support student interviews, concept evaluation, prototype interaction, and iterative design research while simultaneously making the architecture, capabilities, limits, and governance of contemporary AI agents observable for learning.**

This definition should serve as the current design baseline. Future implementation decisions should be evaluated against it.
