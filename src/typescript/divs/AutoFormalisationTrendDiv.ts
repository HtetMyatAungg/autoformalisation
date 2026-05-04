import Chart from "chart.js/auto";
import { Paper } from "../papers/Paper";
import { AutoFormalisationValidator } from "../utils/AutoFormalisationValidator";
import { AutoFormalisationDiv } from "./AutoFormalisationDiv";
import { AutoFormalisationHTMLUtils } from "../utils/AutoFormalisationHTMLUtils";

export class AutoFormalisationTrendDiv implements AutoFormalisationDiv {
    private readonly div: HTMLDivElement;
    private readonly papers: Paper[];
    private yearChart!: HTMLCanvasElement;
    private llmChart!: HTMLCanvasElement;
    private yearChartInstance: Chart | null = null;
    private llmChartInstance: Chart | null = null;
    private packed: boolean;

    public constructor(papers: Paper[]) {
        AutoFormalisationValidator.ensureExists(papers, "The papers cannot be null or undefined.");
        AutoFormalisationValidator.ensureAllExist(papers, "The papers cannot contain null or undefined entries.");

        this.papers = papers;

        this.div = document.createElement("div");

        this.div.id = "trend-div";
        this.div.hidden = true;

        this.packed = false;
    }

    public getDiv(): HTMLDivElement {
        AutoFormalisationValidator.ensureExists(this.div, "The trend div is null or undefined.");

        if (!this.packed) {
            this.pack();
        }

        return this.div;
    }

    public hide(): void {
        AutoFormalisationValidator.ensureExists(this.div, "Cannot hide: the trend div is null or undefined.");

        if (this.div.hidden) {
            console.log("The trend div is already hidden.");
        }
        else if (this.packed) {
            this.div.hidden = true;
        }
        else {
            throw new TypeError("Cannot hide: the trend div is not packed.");
        }
    }

    public show(): void {
        AutoFormalisationValidator.ensureExists(this.div, "Cannot show: the trend div is null or undefined.");

        if (!this.div.hidden) {
            console.log("The trend div is already shown.");
        }
        else if (this.packed) {
            this.div.hidden = false;
        }
        else {
            throw new TypeError("Cannot show: the trend div is not packed.");
        }
    }

    public isHidden(): boolean {
        return !!this.div.hidden;
    }

    private packYearChart(byYear: Record<string, number>): void {
        this.yearChart = document.createElement("canvas");
        this.yearChart.id = "year-chart";

        this.div.appendChild(this.yearChart);

        this.yearChartInstance = new Chart(this.yearChart, {
            type: "bar",
            data: {
                labels: Object.keys(byYear),
                datasets: [
                    {
                        label: "Papers per Year",
                        data: Object.values(byYear),
                        backgroundColor: "rgba(100, 149, 237, 0.7)",
                        borderColor: "rgba(100, 149, 237, 1)",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: "#e0e0e0",
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: { color: "#e0e0e0" },
                        grid: { color: "#555" },
                    },
                    y: {
                        ticks: { color: "#e0e0e0" },
                        grid: { color: "#555" },
                    },
                },
            },
        });
    }

    private packLLMChart(byLLM: Record<string, number>): void {
        this.llmChart = document.createElement("canvas");
        this.llmChart.id = "llm-chart";

        this.div.appendChild(this.llmChart);

        this.llmChartInstance = new Chart(this.llmChart, {
            type: "pie",
            data: {
                labels: Object.keys(byLLM),
                datasets: [
                    {
                        label: "LLM usage",
                        data: Object.values(byLLM),
                        backgroundColor: [
                            "rgba(100, 149, 237, 0.7)",
                            "rgba(72, 191, 145, 0.7)",
                            "rgba(237, 162, 100, 0.7)",
                            "rgba(220, 100, 100, 0.7)",
                            "rgba(180, 130, 220, 0.7)",
                            "rgba(100, 210, 220, 0.7)",
                            "rgba(220, 220, 100, 0.7)",
                        ],
                        borderColor: "#1e1e1e",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: "#e0e0e0",
                        },
                    },
                },
            },
        });
    }

    private packCharts(): void {
        const byYear: Record<string, number> = {};
        const byLLM: Record<string, number> = {};

        for (const p of this.papers) {
            const y: string = p.year?.toString() ?? "Unknown";

            byYear[y] = (byYear[y] || 0) + 1;

            const l: string = p.llm ?? "None";

            byLLM[l] = (byLLM[l] || 0) + 1;
        }

        this.packYearChart(byYear);
        this.packLLMChart(byLLM);
    }

    public pack(): void {
        AutoFormalisationValidator.ensureExists(this.div, "Cannot pack: the trend div is null or undefined.");

        if (this.packed) {
            console.log("The trend div is already packed.");

            return;
        }

        if (!this.div.hidden) {
            throw new TypeError("Cannot pack: the trend div must be hidden before packing.");
        }

        this.packCharts();

        this.packed = true;
    }

    public destroyCharts(): void {
        if (this.yearChartInstance) {
            this.yearChartInstance.destroy();
            this.yearChartInstance = null;
        }

        if (this.llmChartInstance) {
            this.llmChartInstance.destroy();
            this.llmChartInstance = null;
        }
    }

    public unpack(): void {
        AutoFormalisationValidator.ensureExists(this.div, "Cannot unpack: the trend div is null or undefined.");

        if (!this.packed) {
            console.log("The trend div is already unpacked.");

            return;
        }

        if (!this.div.hidden) {
            throw new TypeError("Cannot unpack: the trend div must be hidden before unpacking.");
        }

        this.destroyCharts();

        AutoFormalisationHTMLUtils.clearElementChildren(this.div);

        this.packed = false;
    }

    public isPacked(): boolean {
        return this.packed;
    }
}
