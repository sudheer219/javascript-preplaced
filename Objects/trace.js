// 🚨 Make sure the word 'export' is exactly here:
export const trace = {
  obj: (name, data) => console.log(/*...*/),
  ctor: (name, data) => console.log(/*...*/),
  proto: (msg) => console.log(/*...*/),
  
  chain: (target, label = "INSTANCE") => {
    if (target === null || target === undefined) {
      console.log("%c Cannot trace null or undefined ", "background: red; color: white;");
      return;
    }

    console.log(`%c--- STARTING PROTOTYPE CHAIN TRACE: ${label} ---`, "color: #74b9ff; font-weight: bold; margin-top: 10px;");
    
    let current = target;
    let depth = 0;

    while (current !== null) {
      let typeName = current.constructor ? current.constructor.name : "Unknown";
      let indent = "   ".repeat(depth);
      let arrow = depth > 0 ? "└── 🔗 " : "⭐ ";

      if (depth === 0) {
        console.log(
          `${indent}${arrow}%c ${label.toUpperCase()} %c (Constructor: ${typeName}) `,
          "background: #4b7bec; color: white; font-weight: bold; padding: 1px 4px; border-radius: 3px 0 0 3px;",
          "background: #d1d8e0; color: black; padding: 1px 4px; border-radius: 0 3px 3px 0;",
          current
        );
      } else {
        console.log(
          `${indent}${arrow}%c PROTOTYPE %c ${typeName}.prototype `,
          "background: #ffa502; color: black; font-weight: bold; padding: 1px 4px; border-radius: 3px 0 0 3px;",
          "background: #ffeaa7; color: black; padding: 1px 4px; border-radius: 0 3px 3px 0;",
          current
        );
      }

      current = Object.getPrototypeOf(current);
      depth++;
    }

    console.log(`${"   ".repeat(depth)}└── 🛑 %c null `, "background: #2d3436; color: white; font-weight: bold; padding: 1px 4px; border-radius: 3px;");
    console.log("%c---------------------------------------", "color: #74b9ff; font-weight: bold; margin-bottom: 10px;");
  }
};
