const names = ["Vasil", "Lilly", "Atanas", "Stefan", "Panayot", "Nikol"];
const nameList = document.getElementById("nameList");
const resetButton = document.getElementById("resetButton");

// Initialize name counters
const counters = {};

// Retrieve stored counter values, or initialize to 0 if not found
chrome.storage.local.get(names, (result) => {
  names.forEach((name) => {
    counters[name] = result[name] || 0;
  });

  // Update the counters displayed
  updateCounters();
});

// Update the counters displayed
function updateCounters() {
  nameList.innerHTML = "";
  names.forEach((name) => {
    const button = document.createElement("button");
    button.textContent = `${name} (${counters[name]})`;
    button.addEventListener("click", () => {
      counters[name]++;
      updateCounters();
      saveCounters(); // Save the updated counter values
    });
    nameList.appendChild(button);
  });
}

// Save the counter values in storage
function saveCounters() {
  chrome.storage.local.set(counters);
}

// Reset all counters
resetButton.addEventListener("click", () => {
  names.forEach((name) => {
    counters[name] = 0;
  });
  updateCounters();
  saveCounters();
});

// Initial update
updateCounters();