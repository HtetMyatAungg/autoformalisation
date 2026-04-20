export class AutoFormalisationHomePageDiv {
    private readonly div: HTMLDivElement;

    public constructor() {
        this.div = document.createElement("div");
        this.div.id = "home-page-div";
        this.build();
    }

    private build(): void {
        // Hero placeholder (replace src with real image when available)
        const hero = document.createElement("div");
        hero.id = "hero-placeholder";
        hero.textContent = "Autoformalization Papers";
        this.div.appendChild(hero);

        // Sections
        this.addSection("What is autoformalization?", `
            <p>Autoformalization is the automatic transformation of informal or semi-formal language into a formal language that supports automated reasoning or verification. Although the term originated in the formalization of mathematics with interactive theorem provers, it can more broadly be seen as a form of semantic parsing in which the output is a formal, machine-interpretable representation.</p>
            <p>In this sense, autoformalization refers to the translation of such language into any machine-executable formal language used for knowledge representation and reasoning.</p>
            <div class="example-block">
                <strong>Example:</strong><br/>
                From<br/>
                <em>"All humans are mortal. Socrates is a human. Therefore, Socrates is mortal."</em>
                <code>∀x (Human(x) → Mortal(x)), Human(Socrates), Mortal(Socrates).</code>
                <br/>A formal reasoner can then verify that the conclusion follows.
            </div>
        `);

        this.addSection("Why does it matter?", `
            <p>Autoformalization helps connect human language and machine verification. It matters because it can:</p>
            <ul>
                <li>bridge informal mathematical text and formal proofs</li>
                <li>make AI-generated reasoning more reliable and checkable</li>
                <li>enable systems that combine language understanding with symbolic verification</li>
            </ul>
            <p>As AI systems become more capable but remain error-prone, autoformalization offers a path toward reasoning that is both flexible and verifiable.</p>
        `);

        this.addSection("What is this repository?", `
            <p>This repository is a structured, community-driven collection of research papers on autoformalization.</p>
            <p>It covers work across formal mathematics, logical reasoning, planning, and knowledge representation, with metadata for domain, target languages and repositories.</p>
            <p>This repository is curated but not exhaustive.</p>
        `);

        this.addSection("How can I contribute?", `
            <p>Help us improve coverage and metadata across the field. You can:</p>
            <ul>
                <li>suggest a paper</li>
                <li>open a pull request</li>
                <li>fix links or metadata</li>
                <li>propose new tags or categories</li>
            </ul>
        `);
    }
    private addSection(title: string, html: string): void {
        const section = document.createElement("div");
        section.className = "home-section";
        section.innerHTML = `<h2>${title}</h2>${html}`;
        this.div.appendChild(section);
    }

    public getDiv(): HTMLDivElement {
        return this.div;
    }

    public show(): void { this.div.hidden = false; }
    public hide(): void { this.div.hidden = true; }
}