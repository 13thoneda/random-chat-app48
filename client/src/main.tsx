// Basic test without React
console.log("Script loaded successfully!");

const root = document.getElementById("root");
if (root) {
  root.innerHTML = `
    <div style="
      min-height: 100vh;
      background: linear-gradient(135deg, #fef9f0 0%, #fffbf0 50%, #fef7f7 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-family: system-ui, sans-serif;
      padding: 20px;
    ">
      <h1 style="
        font-size: 3rem;
        background: linear-gradient(45deg, #ec4899, #f43f5e);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 20px;
        text-align: center;
      ">
        🎉 App is Working! 🎉
      </h1>
      <p style="
        font-size: 1.5rem;
        color: #6b7280;
        text-align: center;
        margin-bottom: 30px;
      ">
        JavaScript is loading and executing properly!
      </p>
      <div style="
        background: #ec4899;
        color: white;
        padding: 15px 30px;
        border-radius: 25px;
        font-size: 1.2rem;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
      ">
        Script Execution: SUCCESS ✅
      </div>
    </div>
  `;
  console.log("Content added to root successfully!");
} else {
  console.error("Root element not found!");
}
