// ================= FIREBASE CONFIG (DATABASE ONLY) =================
const firebaseConfig = {
  apiKey: "AIzaSyAg-sw9I-0YEN4rZmiXeWv5jbFar28MLPo",
  databaseURL: "https://solar-panel-211c6-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "solar-panel-211c6",
  appId: "1:307495629699:web:b9d0e1c2a9b7b8c71d307f"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

// ================= LOGIN + PAGE GUARD =================
document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname.split("/").pop();
  const loginForm = document.getElementById("login-form");
  const signupLink = document.getElementById("signup-link");

  if ((page === "home.html" || page === "dashboard.html") &&
      sessionStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
    return;
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (email === "admin@gmail.com" && password === "madhu@123") {
        sessionStorage.setItem("loggedIn", "true");
        window.location.href = "home.html";
      } else {
        alert("Invalid credentials");
      }
    });
  }

  if (signupLink) {
    signupLink.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Signup disabled in demo mode");
    });
  }
});

// ================= LOGOUT =================
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "logout-btn") {
    e.preventDefault();
    sessionStorage.removeItem("loggedIn");
    window.location.href = "index.html";
  }
});

// ================= DASHBOARD ONLY =================
if (document.getElementById("iop-chart")) {

  const currentIopElement = document.getElementById("current-iop");
  const iopStatusElement = document.getElementById("iop-status");
  const deviceStatusElement = document.getElementById("status-text");
  const lastUpdatedElement = document.getElementById("last-updated");
  const manualIopForm = document.getElementById("manual-iop-form");
  const riskResultElement = document.getElementById("risk-result");

  let iopChart = null;

  const iopData = {
    labels: [],
    datasets: [{
      label: "IOP (mmHg)",
      data: [],
      borderWidth: 2,
      tension: 0.4
    }]
  };

  function initChart() {
    if (iopChart) return;
    const ctx = document.getElementById("iop-chart").getContext("2d");
    iopChart = new Chart(ctx, {
      type: "line",
      data: iopData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: {
          y: {
            suggestedMin: 10,
            suggestedMax: 30
          }
        }
      }
    });
  }

  function getIopStatus(iop) {
    if (iop < 10) return ["Low IOP", "status-warning"];
    if (iop <= 21) return ["Normal IOP", "status-normal"];
    return ["High IOP - Risk", "status-danger"];
  }

  function updateIopDisplay(iop) {
    currentIopElement.textContent = iop.toFixed(1);
    const [text, cls] = getIopStatus(iop);
    iopStatusElement.textContent = text;
    iopStatusElement.className = "iop-status " + cls;
  }

  function updateChart(iop) {
    iopData.labels.push(new Date().toLocaleTimeString());
    iopData.datasets[0].data.push(iop);
    if (iopData.labels.length > 10) {
      iopData.labels.shift();
      iopData.datasets[0].data.shift();
    }
    iopChart.update();
  }

  function calculateRisk(iop, age, familyHistory, medicalConditions) {
    let score = 0;
    if (iop > 21) score += 3;
    else if (iop > 18) score += 1;
    if (age > 60) score += 2;
    else if (age > 40) score += 1;
    if (familyHistory === "yes") score += 2;
    if (!medicalConditions.includes("none")) score += medicalConditions.length;

    if (score <= 2) return ["Low Risk", "status-normal"];
    if (score <= 5) return ["Moderate Risk", "status-warning"];
    return ["High Risk", "status-danger"];
  }

  document.addEventListener("DOMContentLoaded", () => {
    initChart();

    manualIopForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const iop = parseFloat(document.getElementById("manual-iop").value);
      const age = parseInt(document.getElementById("age").value);
      const familyHistory = document.getElementById("family-history").value;
      const medicalConditions = Array.from(
        document.getElementById("medical-conditions").selectedOptions
      ).map(o => o.value);

      const [level, cls] = calculateRisk(iop, age, familyHistory, medicalConditions);
      riskResultElement.innerHTML = `<div class="iop-status ${cls}">${level}</div>`;
    });

    database.ref("/IOP_Measurements").off();
    database.ref("/IOP_Measurements").on("value", snapshot => {
      const data = snapshot.val();
      if (!data) return;

      if (data.Completed) deviceStatusElement.textContent = "Measurement Complete";
      else if (data.Count) deviceStatusElement.textContent = `Measuring (${data.Count}/5)`;
      else deviceStatusElement.textContent = "Idle";

      const value = data.AverageIOP || data.LastIOP;
      if (value) {
        updateIopDisplay(value);
        updateChart(value);
      }

      lastUpdatedElement.textContent = new Date().toLocaleString();
    });
  });
}