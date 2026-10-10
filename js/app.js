const $ = (id) => document.getElementById(id);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function addEvent(eventName, status) {
  const table = $("eventLog");
  if (table.querySelector(".empty")) table.innerHTML = "";
  const row = document.createElement("tr");
  [new Date().toLocaleTimeString(), eventName, status].forEach((value) => {
    const cell = document.createElement("td");
    cell.textContent = value;
    row.appendChild(cell);
  });
  table.prepend(row);
  while (table.rows.length > 8) table.deleteRow(table.rows.length - 1);
}

function qosStatus(score) {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 60) return "Fair";
  if (score >= 40) return "Poor";
  return "Critical";
}

function runSimulation(mode) {
  let latency, failureRate, jitter, throughput;
  switch (mode) {
    case "normal":
      latency = 20 + Math.random() * 20; failureRate = Math.random(); jitter = Math.random() * 8; throughput = 100 + Math.random() * 50; break;
    case "slow":
      latency = 150 + Math.random() * 100; failureRate = 1 + Math.random() * 3; jitter = 15 + Math.random() * 15; throughput = 40 + Math.random() * 30; break;
    case "loss":
      latency = 60 + Math.random() * 50; failureRate = 8 + Math.random() * 12; jitter = 10 + Math.random() * 20; throughput = 20 + Math.random() * 30; break;
    default:
      latency = 300 + Math.random() * 200; failureRate = 20 + Math.random() * 30; jitter = 50 + Math.random() * 50; throughput = 1 + Math.random() * 10;
  }
  const score = Math.round(
    clamp(100 - latency / 2, 0, 100) * .30 +
    clamp(100 - failureRate * 10, 0, 100) * .30 +
    clamp(100 - jitter * 2, 0, 100) * .20 +
    clamp(throughput / 1.5, 0, 100) * .20
  );
  const status = qosStatus(score);
  $("latency").textContent = latency.toFixed(1);
  $("loss").textContent = failureRate.toFixed(1);
  $("jitter").textContent = jitter.toFixed(1);
  $("qos").textContent = score;
  $("qosStatus").textContent = status + " performance";
  $("lastUpdated").textContent = new Date().toLocaleTimeString();
  $("systemStatus").textContent = "Demo simulation updated. These are sample values.";
  $("scenarioResult").textContent = `${mode.toUpperCase()} scenario · QoS status: ${status} · Score: ${score}/100`;
  addEvent(`Scenario: ${mode}`, status);
}

document.querySelectorAll("[data-scenario]").forEach((button) => {
  button.addEventListener("click", () => runSimulation(button.dataset.scenario));
});
$("clearLog").addEventListener("click", () => {
  $("eventLog").innerHTML = '<tr><td colspan="3" class="empty">No events yet.</td></tr>';
});

$("endpointForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const output = $("endpointResult");
  const button = $("testButton");
  let url;
  try {
    url = new URL($("endpoint").value.trim());
    if (!["http:", "https:"].includes(url.protocol)) throw new Error("Unsupported protocol");
  } catch {
    output.textContent = "Enter a valid HTTP or HTTPS URL.";
    return;
  }
  button.disabled = true;
  output.textContent = "Testing endpoint…";
  const start = performance.now();
  try {
    await fetch(url.href, {method:"GET", mode:"cors", cache:"no-store", signal:AbortSignal.timeout(10000)});
    const duration = performance.now() - start;
    output.textContent = `Browser request completed in ${duration.toFixed(1)} ms. This is not an ICMP ping test.`;
    addEvent("HTTP endpoint request completed", `${duration.toFixed(0)} ms`);
  } catch {
    output.textContent = "Request failed or was blocked by network/CORS rules. This does not prove the server is offline.";
    addEvent("HTTP endpoint request failed", "Check endpoint/CORS");
  } finally {
    button.disabled = false;
  }
});
runSimulation("normal");
