(() => {
    const defaultSteps = [
        {
            line: 1,
            phase: "Creation phase",
            title: "Global execution context is created",
            details: [
                "The global scope becomes available.",
                "Function declarations are stored in memory.",
                "var bindings are hoisted and initialized to undefined.",
            ],
            callStack: ["Global Execution Context"],
            globalMemory: [
                ["a", "undefined"],
                ["test", "function test() {...}"],
            ],
            localMemory: [],
            scopeChain: ["Global"],
            code: "console.log(a);\n\nvar a = 10;\n\nfunction test() {\n    console.log(a);\n    var a = 20;\n    console.log(a);\n}\n\ntest();\nconsole.log(a);",
        },
        {
            line: 1,
            phase: "Execution phase",
            title: "console.log(a) reads the hoisted binding",
            details: [
                "JavaScript looks for a in the current scope.",
                "The global a exists, but its value is still undefined.",
            ],
            callStack: ["Global Execution Context"],
            globalMemory: [
                ["a", "undefined"],
                ["test", "function test() {...}"],
            ],
            localMemory: [],
            scopeChain: ["Global"],
            output: "undefined",
        },
        {
            line: 3,
            phase: "Execution phase",
            title: "Assignment updates global memory",
            details: [
                "The binding a is updated to 10.",
                "The reference stays the same; only the value changes.",
            ],
            callStack: ["Global Execution Context"],
            globalMemory: [
                ["a", "10"],
                ["test", "function test() {...}"],
            ],
            localMemory: [],
            scopeChain: ["Global"],
        },
        {
            line: 10,
            phase: "Function call",
            title: "test() creates a new function execution context",
            details: [
                "A new execution context is pushed on the call stack.",
                "A fresh local environment is created for the function.",
                "The local var a is hoisted inside test and starts as undefined.",
            ],
            callStack: ["Global Execution Context", "test() Execution Context"],
            globalMemory: [
                ["a", "10"],
                ["test", "function test() {...}"],
            ],
            localMemory: [["a", "undefined"]],
            scopeChain: ["Local (test)", "Global"],
            output: "Entering test()",
        },
        {
            line: 5,
            phase: "Execution phase",
            title: "Inner console.log(a) uses the local binding",
            details: [
                "The engine first checks the local context of test().",
                "It finds a there, so it stops before reading the global a.",
            ],
            callStack: ["Global Execution Context", "test() Execution Context"],
            globalMemory: [
                ["a", "10"],
                ["test", "function test() {...}"],
            ],
            localMemory: [["a", "undefined"]],
            scopeChain: ["Local (test)", "Global"],
            output: "undefined",
        },
        {
            line: 6,
            phase: "Execution phase",
            title: "Local assignment shadows the global a",
            details: [
                "The inner a is now 20.",
                "This does not touch the global a.",
            ],
            callStack: ["Global Execution Context", "test() Execution Context"],
            globalMemory: [
                ["a", "10"],
                ["test", "function test() {...}"],
            ],
            localMemory: [["a", "20"]],
            scopeChain: ["Local (test)", "Global"],
        },
        {
            line: 7,
            phase: "Execution phase",
            title: "console.log(a) now prints the local value",
            details: [
                "The lookup hits the local context first.",
                "That local a currently holds 20.",
            ],
            callStack: ["Global Execution Context", "test() Execution Context"],
            globalMemory: [
                ["a", "10"],
                ["test", "function test() {...}"],
            ],
            localMemory: [["a", "20"]],
            scopeChain: ["Local (test)", "Global"],
            output: "20",
        },
        {
            line: 12,
            phase: "Return phase",
            title: "test() finishes and its context is removed",
            details: [
                "The function context is popped from the stack.",
                "Its local memory disappears because execution is complete.",
            ],
            callStack: ["Global Execution Context"],
            globalMemory: [
                ["a", "10"],
                ["test", "function test() {...}"],
            ],
            localMemory: [],
            scopeChain: ["Global"],
        },
        {
            line: 11,
            phase: "Execution phase",
            title: "Final console.log(a) reads the global a",
            details: [
                "The function context is gone, so the lookup falls back to global.",
                "The global a still contains 10.",
            ],
            callStack: ["Global Execution Context"],
            globalMemory: [
                ["a", "10"],
                ["test", "function test() {...}"],
            ],
            localMemory: [],
            scopeChain: ["Global"],
            output: "10",
        },
    ];

    const defaultSnippet = defaultSteps[0].code;
    let steps = JSON.parse(JSON.stringify(defaultSteps));
    let currentSnippet = defaultSnippet;
    let codeLines = currentSnippet.split("\n");
    let currentStep = 0;
    let autoPlayId = null;

    const app = document.createElement("main");
    app.className = "app-shell";
    app.innerHTML = `
        <section class="hero">
            <div>
                <p class="eyebrow">JavaScript execution model</p>
                <h1>Execution Context Visualizer</h1>
                <p class="hero-copy">See how global memory, function contexts, the call stack, and scope lookup change while a JavaScript program runs.</p>
            </div>
            <div class="hero-meta">
                <section class="controls panel controls-panel">
                    <button id="prevBtn" type="button">Previous</button>
                    <button id="playBtn" type="button">Play</button>
                    <button id="nextBtn" type="button">Next</button>
                    <button id="resetBtn" type="button">Reset</button>
                    <div id="stepCounter" class="counter"></div>
                </section>

                <div class="hero-card">
                    <div class="hero-card-column">
                        <div class="hero-card-label">Current phase</div>
                        <div id="phaseBadge" class="phase-badge"></div>
                    </div>
                    <div class="hero-card-column">
                        <div id="stepTitle" class="step-title"></div>
                    </div>
                    <div class="hero-card-column">
                        <div id="stepDetails" class="step-details"></div>
                    </div>
                </div>
            </div>
        </section>

        <section class="panel snippet-panel">
            <div class="panel-head">
                <h2>Code snippet</h2>
                <span>Change the sample shown in the code pane</span>
            </div>
            <div class="snippet-actions">
                <button id="applySnippetBtn" type="button">Change snippet</button>
                <button id="resetSnippetBtn" type="button">Reset snippet</button>
            </div>
        </section>

        <section class="workspace">
            <article class="panel code-panel">
                <div class="panel-head">
                    <h2>Code</h2>
                    <span>Current line is highlighted</span>
                </div>
                <pre id="codeBlock" class="code-block"></pre>
            </article>

            <aside class="context-column">
                <article class="panel">
                    <div class="panel-head">
                        <h2>Call stack</h2>
                        <span>Top of the stack appears last</span>
                    </div>
                    <div id="stackView" class="stack-view"></div>
                </article>

                <article class="panel">
                    <div class="panel-head">
                        <h2>Memory</h2>
                        <span>Global and local bindings</span>
                    </div>
                    <div class="memory-grid">
                        <div>
                            <h3>Global</h3>
                            <div id="globalMemory"></div>
                        </div>
                        <div>
                            <h3>Local</h3>
                            <div id="localMemory"></div>
                        </div>
                    </div>
                </article>

                <article class="panel">
                    <div class="panel-head">
                        <h2>Scope chain</h2>
                        <span>Where name lookup travels</span>
                    </div>
                    <div id="scopeChain" class="scope-chain"></div>
                </article>
            </aside>
        </section>

        <section class="panel output-panel runtime-footer">
            <div class="panel-head">
                <h2>Runtime output</h2>
                <span>What the current step would print</span>
            </div>
            <div id="outputView" class="output-view">No output yet</div>
        </section>
    `;

    const style = document.createElement("style");
    style.textContent = `
        :root {
            color-scheme: dark;
            --bg: #0b1020;
            --bg-soft: rgba(15, 23, 42, 0.84);
            --panel: rgba(17, 24, 39, 0.82);
            --panel-border: rgba(148, 163, 184, 0.18);
            --text: #e5eefb;
            --muted: #9fb0cf;
            --accent: #7dd3fc;
            --accent-2: #c084fc;
            --good: #34d399;
            --warn: #fbbf24;
            --shadow: 0 20px 40px rgba(2, 6, 23, 0.35);
        }

        * { box-sizing: border-box; }

        body {
            margin: 0;
            min-height: 100vh;
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            color: var(--text);
            background:
                radial-gradient(circle at top left, rgba(124, 58, 237, 0.22), transparent 32%),
                radial-gradient(circle at top right, rgba(14, 165, 233, 0.22), transparent 28%),
                linear-gradient(180deg, #050816, var(--bg));
        }

        body::before {
            content: "";
            position: fixed;
            inset: 0;
            background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
            background-size: 36px 36px;
            mask-image: linear-gradient(180deg, rgba(0,0,0,0.35), transparent 75%);
            pointer-events: none;
        }

        .app-shell {
            position: relative;
            max-width: 1400px;
            margin: 0 auto;
            padding: 32px 20px 48px;
        }

        .hero {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 12px;
        }

        .hero-meta {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
        }

        .eyebrow {
            margin: 0 0 10px;
            color: var(--accent);
            text-transform: uppercase;
            letter-spacing: 0.18em;
            font-size: 12px;
            font-weight: 700;
        }

        h1 {
            margin: 0;
            font-size: clamp(2.2rem, 4vw, 1.6rem);
            line-height: 0.95;
            letter-spacing: -0.05em;
        }

        .hero-copy {
            max-width: 68ch;
            margin: 16px 0 0;
            color: var(--muted);
            font-size: 1.02rem;
            display: none;
        }

        .hero-card,
        .panel,
        .controls {
            background: var(--bg-soft);
            border: 1px solid var(--panel-border);
            box-shadow: var(--shadow);
            backdrop-filter: blur(18px);
        }

        .hero-card {
            border-radius: 24px;
            padding: 12px 16px;
            display: grid;
            grid-template-columns: minmax(110px, 0.85fr) minmax(0, 1.7fr) minmax(0, 1.15fr);
            gap: 12px;
            align-items: start;
        }

        .hero-card-column {
            display: flex;
            flex-direction: column;
            gap: 6px;
            min-width: 0;
        }

        .hero-card-label,
        .panel-head span,
        .counter,
        .step-details,
        .hero-copy,
        .memory-cell-value,
        .scope-node small,
        .output-view {
            color: var(--muted);
        }

        .phase-badge {
            display: inline-flex;
            align-self: flex-start;
            padding: 6px 12px;
            border-radius: 999px;
            background: rgba(125, 211, 252, 0.14);
            color: var(--accent);
            font-size: 0.86rem;
            font-weight: 700;
        }

        .step-title {
            font-size: 1.35rem;
            font-weight: 700;
            line-height: 1.15;
        }

        .step-details {
            display: grid;
            gap: 4px;
            line-height: 1.35;
        }

        .step-details p,
        .step-details ul {
            margin: 0;
        }

        .controls {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            align-items: center;
            border-radius: 18px;
            padding: 10px 12px;
            margin: 0;
        }

        button {
            appearance: none;
            border: 1px solid rgba(125, 211, 252, 0.26);
            background: linear-gradient(180deg, rgba(125, 211, 252, 0.2), rgba(125, 211, 252, 0.1));
            color: var(--text);
            padding: 10px 14px;
            border-radius: 12px;
            font: inherit;
            font-weight: 700;
            cursor: pointer;
        }

        button:hover {
            border-color: rgba(125, 211, 252, 0.6);
            transform: translateY(-1px);
        }

        .counter {
            margin-left: auto;
            font-weight: 700;
        }

        .workspace {
            display: grid;
            gap: 12px;
            grid-template-columns: minmax(0, 1.15fr) minmax(360px, 0.85fr);
            align-items: start;
        }

        .context-column {
            display: grid;
            gap: 12px;
            align-content: start;
        }

        .runtime-footer {
            margin-top: 12px;
            width: 100%;
        }

        .snippet-panel {
            margin-bottom: 12px;
        }

        .snippet-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
        }

        .panel {
            border-radius: 22px;
            padding: 12px 14px;
            min-height: 100%;
        }

        .code-panel {
            position: sticky;
            top: 18px;
        }

        .controls-panel {
            position: static;
            z-index: 1;
        }

        .panel-head {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            align-items: baseline;
            margin-bottom: 8px;
        }

        .panel-head h2,
        .panel-head h3 {
            margin: 0;
            font-size: 1.05rem;
        }

        .code-block {
            margin: 0;
            padding: 12px;
            border-radius: 18px;
            background: rgba(2, 6, 23, 0.6);
            border: 1px solid rgba(148, 163, 184, 0.16);
            overflow: auto;
            white-space: pre;
            font-size: 0.95rem;
            line-height: 1.6;
        }

        .code-line {
            display: block;
            padding: 0 10px;
            margin: 0 -10px;
            border-left: 3px solid transparent;
            border-radius: 10px;
        }

        .code-line.active {
            background: rgba(125, 211, 252, 0.13);
            border-left-color: var(--accent);
            color: #fff;
            font-weight: 700;
        }

        .stack-view,
        .scope-chain,
        .output-view {
            display: grid;
            gap: 6px;
        }

        .stack-item,
        .scope-node,
        .memory-cell,
        .output-view {
            border-radius: 16px;
            border: 1px solid rgba(148, 163, 184, 0.16);
            background: rgba(15, 23, 42, 0.5);
            padding: 8px 12px;
        }

        .stack-item.active {
            background: rgba(125, 211, 252, 0.16);
            border-color: rgba(125, 211, 252, 0.42);
            color: #eff6ff;
        }

        .memory-cell.active-global {
            background: rgba(192, 132, 252, 0.16);
            border-color: rgba(192, 132, 252, 0.42);
            color: #f5f3ff;
        }

        .memory-cell.active-local {
            background: rgba(52, 211, 153, 0.16);
            border-color: rgba(52, 211, 153, 0.42);
            color: #ecfdf5;
        }

        .scope-node.active {
            background: rgba(251, 191, 36, 0.16);
            border-color: rgba(251, 191, 36, 0.42);
            color: #fffbeb;
        }

        .output-view.active {
            background: rgba(251, 191, 36, 0.14);
            border-color: rgba(251, 191, 36, 0.42);
            color: #fffbeb;
        }

        .stack-item strong,
        .scope-node strong,
        .memory-cell strong {
            display: block;
            margin-bottom: 4px;
        }

        .memory-grid {
            display: grid;
            gap: 10px;
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .memory-list {
            display: grid;
            gap: 6px;
        }

        .memory-cell {
            display: flex;
            justify-content: space-between;
            gap: 12px;
        }

        .output-view {
            min-height: 48px;
            color: #dbeafe;
            font-weight: 600;
        }

        @media (max-width: 1080px) {
            .hero-meta {
                grid-template-columns: 1fr;
            }

            .workspace {
                grid-template-columns: 1fr;
            }

            .code-panel,
            .controls-panel {
                position: static;
            }
        }

        @media (max-width: 720px) {
            .app-shell {
                padding: 14px 12px 24px;
            }

            .hero-meta {
                gap: 8px;
            }

            .hero-card {
                grid-template-columns: 1fr;
            }

            .controls {
                align-items: stretch;
            }

            .counter {
                margin-left: 0;
            }

            .memory-grid {
                grid-template-columns: 1fr;
            }
        }
    `;

    document.head.append(style);
    document.body.innerHTML = "";
    document.body.append(app);

    const codeBlock = document.getElementById("codeBlock");
    const stackView = document.getElementById("stackView");
    const globalMemory = document.getElementById("globalMemory");
    const localMemory = document.getElementById("localMemory");
    const scopeChain = document.getElementById("scopeChain");
    const outputView = document.getElementById("outputView");
    const phaseBadge = document.getElementById("phaseBadge");
    const stepTitle = document.getElementById("stepTitle");
    const stepDetails = document.getElementById("stepDetails");
    const stepCounter = document.getElementById("stepCounter");
    const applySnippetBtn = document.getElementById("applySnippetBtn");
    const resetSnippetBtn = document.getElementById("resetSnippetBtn");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const playBtn = document.getElementById("playBtn");
    const resetBtn = document.getElementById("resetBtn");

    function renderList(items, container, emptyLabel, activeNames = [], activeClassName = "") {
        container.innerHTML = "";

        if (!items.length) {
            const empty = document.createElement("div");
            empty.className = "memory-cell";
            empty.textContent = emptyLabel;
            container.append(empty);
            return;
        }

        const list = document.createElement("div");
        list.className = "memory-list";

        items.forEach(([name, value]) => {
            const cell = document.createElement("div");
            const isActive = activeNames.includes(name);
            cell.className = `memory-cell${isActive && activeClassName ? ` ${activeClassName}` : ""}`;
            cell.innerHTML = `<strong>${name}</strong><span class="memory-cell-value">${value}</span>`;
            list.append(cell);
        });

        container.append(list);
    }

    function renderCode(activeLine) {
        codeBlock.innerHTML = codeLines
            .map((line, index) => {
                const lineNumber = index + 1;
                const isActive = lineNumber === Math.max(1, Math.min(activeLine, codeLines.length));
                return `<span class="code-line ${isActive ? "active" : ""}"><span class="line-number">${String(lineNumber).padStart(2, "0")}</span>  ${line || " "}</span>`;
            })
            .join("");
    }

    function formatValue(value) {
        if (typeof value === "string") {
            return value;
        }

        if (typeof value === "number" || typeof value === "boolean") {
            return String(value);
        }

        if (value === null) {
            return "null";
        }

        if (value === undefined) {
            return "undefined";
        }

        try {
            return JSON.stringify(value);
        } catch {
            return String(value);
        }
    }

    function runSnippetAndCaptureOutput(snippet) {
        const logs = [];
        const mockConsole = {
            log: (...args) => logs.push(args.map(formatValue).join(" ")),
            info: (...args) => logs.push(args.map(formatValue).join(" ")),
            warn: (...args) => logs.push(args.map(formatValue).join(" ")),
            error: (...args) => logs.push(args.map(formatValue).join(" ")),
        };

        try {
            const runner = new Function("console", `"use strict";\n${snippet}`);
            runner(mockConsole);
        } catch (error) {
            logs.push(`Error: ${error.message}`);
        }

        return logs;
    }

    function parseExpressionValue(rawValue) {
        if (!rawValue) {
            return "undefined";
        }

        const value = rawValue.trim().replace(/;$/, "");

        if (/^['"`].*['"`]$/.test(value)) {
            return value;
        }

        if (/^-?\d+(\.\d+)?$/.test(value)) {
            return value;
        }

        if (/^(true|false|null|undefined)$/i.test(value)) {
            return value;
        }

        return value;
    }

    function mapToMemoryEntries(memoryMap) {
        return Array.from(memoryMap.entries()).map(([name, value]) => [name, value]);
    }

    function buildDynamicSteps(snippet) {
        const lines = snippet.split("\n");
        const nonEmptyLineNumbers = lines
            .map((line, index) => ({ index, line }))
            .filter(({ line }) => line.trim().length > 0)
            .map(({ index }) => index + 1);

        const logs = runSnippetAndCaptureOutput(snippet);
        const declarationRegex = /^\s*(var|let|const)\s+([A-Za-z_$][\w$]*)\s*(?:=\s*(.+?))?\s*;?\s*$/;
        const assignmentRegex = /^\s*([A-Za-z_$][\w$]*)\s*=\s*(.+?)\s*;?\s*$/;
        const functionRegex = /^\s*function\s+([A-Za-z_$][\w$]*)\s*\(/;
        const globalMemoryState = new Map();

        lines.forEach((line) => {
            const declMatch = line.match(declarationRegex);
            const funcMatch = line.match(functionRegex);

            if (funcMatch) {
                const fnName = funcMatch[1];
                globalMemoryState.set(fnName, `function ${fnName}() {...}`);
            }

            if (!declMatch) {
                return;
            }

            const [, kind, name] = declMatch;
            if (kind === "var") {
                globalMemoryState.set(name, "undefined");
            } else if (!globalMemoryState.has(name)) {
                globalMemoryState.set(name, "<uninitialized>");
            }
        });

        let logCursor = 0;
        const dynamicSteps = [
            {
                line: 1,
                phase: "Creation phase",
                title: "Global execution context is created",
                details: [
                    "Custom snippet mode is active.",
                    "Declarations are scanned to build an initial memory model.",
                    "Execution updates memory for simple var/let/const assignments.",
                ],
                callStack: ["Global Execution Context"],
                globalMemory: mapToMemoryEntries(globalMemoryState),
                localMemory: [],
                scopeChain: ["Global"],
                code: snippet,
            },
        ];

        nonEmptyLineNumbers.forEach((lineNo) => {
            const sourceLine = lines[lineNo - 1];
            const trimmedLine = sourceLine.trim();
            const details = [trimmedLine || "(empty line)"];
            let stepOutput;

            const declMatch = sourceLine.match(declarationRegex);
            const assignmentMatch = sourceLine.match(assignmentRegex);

            if (declMatch) {
                const [, kind, name, rawValue] = declMatch;

                if (rawValue !== undefined) {
                    const computedValue = parseExpressionValue(rawValue);
                    globalMemoryState.set(name, computedValue);
                    details.push(`${kind} ${name} is initialized to ${computedValue}.`);
                } else if (kind === "let" || kind === "const") {
                    details.push(`${kind} ${name} is declared without assignment.`);
                }
            } else if (assignmentMatch) {
                const [, name, rawValue] = assignmentMatch;
                const computedValue = parseExpressionValue(rawValue);
                globalMemoryState.set(name, computedValue);
                details.push(`${name} is reassigned to ${computedValue}.`);
            }

            if (/^\s*console\.(log|info|warn|error)\s*\(/.test(sourceLine)) {
                stepOutput = logs[logCursor] || "(no console output captured)";
                logCursor += 1;
                details.push("Console output is captured for this line.");
            }

            dynamicSteps.push({
                line: lineNo,
                phase: "Execution phase",
                title: `Executing line ${lineNo}`,
                details,
                callStack: ["Global Execution Context"],
                globalMemory: mapToMemoryEntries(globalMemoryState),
                localMemory: [],
                scopeChain: ["Global"],
                output: stepOutput,
            });
        });

        const remainingLogs = logs.slice(logCursor);

        dynamicSteps.push({
            line: nonEmptyLineNumbers.length ? nonEmptyLineNumbers[nonEmptyLineNumbers.length - 1] : 1,
            phase: "Completion",
            title: "Snippet execution finished",
            details: [
                "Execution completed for the provided snippet.",
                "Memory view reflects inferred declaration and assignment updates.",
            ],
            callStack: ["Global Execution Context"],
            globalMemory: mapToMemoryEntries(globalMemoryState),
            localMemory: [],
            scopeChain: ["Global"],
            output: remainingLogs.length ? remainingLogs.join("\n") : "Execution complete",
        });

        return dynamicSteps;
    }

    function applySnippet(value) {
        currentSnippet = value;
        codeLines = currentSnippet.split("\n");

        if (currentSnippet.trim() === defaultSnippet.trim()) {
            steps = JSON.parse(JSON.stringify(defaultSteps));
        } else {
            steps = buildDynamicSteps(currentSnippet);
        }

        currentStep = 0;
        renderCode(steps[currentStep].line);
    }

    function render() {
        const step = steps[currentStep];
        phaseBadge.textContent = step.phase;
        stepTitle.textContent = step.title;
        stepDetails.innerHTML = step.details.map((detail) => `<p>${detail}</p>`).join("");
        stepCounter.textContent = `Step ${currentStep + 1} of ${steps.length}`;
        outputView.textContent = step.output ? step.output : "No output at this step";
        outputView.classList.toggle("active", Boolean(step.output));

        stackView.innerHTML = "";
        step.callStack.forEach((item, index) => {
            const stackItem = document.createElement("div");
            stackItem.className = `stack-item${index === step.callStack.length - 1 ? " active" : ""}`;
            stackItem.innerHTML = `<strong>${index === step.callStack.length - 1 ? "Top" : "Frame"}</strong>${item}`;
            stackView.append(stackItem);
        });

        if (!step.callStack.length) {
            const emptyStack = document.createElement("div");
            emptyStack.className = "stack-item";
            emptyStack.textContent = "Call stack is empty";
            stackView.append(emptyStack);
        }

        renderList(step.globalMemory, globalMemory, "No global bindings", step.globalMemory.map(([name]) => name), "active-global");
        renderList(step.localMemory, localMemory, "No local bindings", step.localMemory.map(([name]) => name), "active-local");

        scopeChain.innerHTML = "";
        step.scopeChain.forEach((scope, index) => {
            const node = document.createElement("div");
            node.className = `scope-node${index === 0 ? " active" : ""}`;
            node.innerHTML = `<strong>${scope}</strong><small>${index === 0 ? "Lookup starts here" : "Fallback if not found earlier"}</small>`;
            scopeChain.append(node);
        });

        renderCode(step.line);

        prevBtn.disabled = currentStep === 0;
        nextBtn.disabled = currentStep === steps.length - 1;
        playBtn.textContent = autoPlayId ? "Pause" : "Play";
    }

    function goToStep(index) {
        currentStep = Math.max(0, Math.min(index, steps.length - 1));
        render();
    }

    function stopAutoPlay() {
        if (autoPlayId) {
            clearInterval(autoPlayId);
            autoPlayId = null;
        }
        render();
    }

    nextBtn.addEventListener("click", () => {
        stopAutoPlay();
        goToStep(currentStep + 1);
    });

    prevBtn.addEventListener("click", () => {
        stopAutoPlay();
        goToStep(currentStep - 1);
    });

    resetBtn.addEventListener("click", () => {
        stopAutoPlay();
        goToStep(0);
    });

    applySnippetBtn.addEventListener("click", () => {
        stopAutoPlay();
        const nextSnippet = window.prompt("Paste the JavaScript snippet you want to show in the code pane.", currentSnippet);

        if (nextSnippet === null) {
            return;
        }

        applySnippet(nextSnippet);
        render();
    });

    resetSnippetBtn.addEventListener("click", () => {
        stopAutoPlay();
        applySnippet(defaultSnippet);
        render();
    });

    playBtn.addEventListener("click", () => {
        if (autoPlayId) {
            stopAutoPlay();
            return;
        }

        autoPlayId = setInterval(() => {
            if (currentStep >= steps.length - 1) {
                stopAutoPlay();
                return;
            }
            currentStep += 1;
            render();
        }, 1500);

        render();
    });

    render();
})();