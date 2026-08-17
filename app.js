const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const notifyBtn = document.getElementById("notifyBtn");
const notifyText = document.getElementById("notifyText");

function nextShow() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(14, 0, 0, 0);
  if (now >= next) next.setDate(next.getDate() + 1);
  return next;
}

function updateCountdown() {
  const diff = Math.max(0, nextShow() - new Date());
  const total = Math.floor(diff / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  hoursEl.textContent = String(h).padStart(2, "0");
  minutesEl.textContent = String(m).padStart(2, "0");
  secondsEl.textContent = String(s).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

notifyBtn.addEventListener("click", async () => {
  if (!("Notification" in window)) {
    notifyText.textContent = "Browser notifications are not supported here.";
    return;
  }

  if (Notification.permission === "granted") {
    notifyBtn.classList.toggle("active");
    notifyText.textContent = notifyBtn.classList.contains("active")
      ? "Notifications enabled"
      : "Notifications are off";
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    notifyBtn.classList.add("active");
    notifyText.textContent = "Notifications enabled";
  } else {
    notifyText.textContent = "Notifications were not enabled.";
  }
});
