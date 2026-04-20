export type Page = "home" | "browse" | "trends" | "contribute" | "about";

export class AutoFormalisationSidebarDiv {
    private readonly div: HTMLElement;
    private activePage: Page = "home";
    private readonly onNavigate: (page: Page) => void;

    public constructor(onNavigate: (page: Page) => void) {
        this.onNavigate = onNavigate;
        this.div = document.createElement("aside");
        this.div.id = "sidebar";
        this.build();
    }

    private build(): void {
        // Title
        const titleDiv = document.createElement("div");
        titleDiv.id = "sidebar-title";
        titleDiv.innerHTML = `
            <h1>Autoformalization Papers</h1>
            <p>A curated repository of research on translating informal language into formal representations for automated reasoning and verification.</p>
        `;
        this.div.appendChild(titleDiv);

        // Nav
        const nav = document.createElement("nav");
        const items: { page: Page; icon: string; label: string }[] = [
            { page: "home",       icon: "🏠", label: "Home" },
            { page: "browse",     icon: "📄", label: "Browse Papers" },
            { page: "trends",     icon: "∿",  label: "Explore Trends" },
            { page: "contribute", icon: "➕", label: "Contribute" },
            { page: "about",      icon: "❓", label: "About/FAQ" },
        ];

        for (const item of items) {
            const btn = document.createElement("button");
            btn.className = "nav-item";
            btn.innerHTML = `<span class="nav-icon">${item.icon}</span>${item.label}`;
            if (item.page === this.activePage) btn.classList.add("active");

            btn.addEventListener("click", () => {
                this.setActive(item.page);
                this.onNavigate(item.page);
            });

            nav.appendChild(btn);
        }

        this.div.appendChild(nav);
    }

    private setActive(page: Page): void {
        this.activePage = page;
        const buttons = this.div.querySelectorAll(".nav-item");
        const pages: Page[] = ["home", "browse", "trends", "contribute", "about"];
        buttons.forEach((btn, i) => {
            btn.classList.toggle("active", pages[i] === page);
        });
    }

    public getDiv(): HTMLElement {
        return this.div;
    }
}