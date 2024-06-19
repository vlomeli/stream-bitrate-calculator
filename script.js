document.addEventListener("DOMContentLoaded", function () {
  const accordionButtons = document.querySelectorAll(".accordion-button");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  });
});

function calculateBitrate() {
  // Get internet speed input
  const internetSpeedInput = document.getElementById("internetSpeed");
  const internetSpeed = parseFloat(internetSpeedInput.value.trim());

  // Validate internet speed input
  if (isNaN(internetSpeed)) {
    alert("Please enter a valid number for Internet Speed.");
    return;
  }

  // Get resolution and frame rate inputs
  const resolution = document.getElementById("resolution").value;
  let frameRate = parseFloat(document.getElementById("frameRate").value);

  // Validate frame rate input
  if (isNaN(frameRate)) {
    alert("Please enter a valid number for Frame Rate.");
    return;
  }

  // Limit frame rate to maximum 60 FPS
  if (frameRate > 60) {
    frameRate = 60;
    document.getElementById("frameRate").value = frameRate;
    alert("Frame Rate reduced to 60 FPS maximum.");
  }

  // Get encoding technology input
  const encodingTechnology =
    document.getElementById("encodingTechnology").value;

  // Encoding efficiency factors based on selected technology
  const efficiencyFactors = {
    h264: 1.0,
    h265: 0.6,
    av1: 0.4,
  };

  // Get efficiency factor for the selected encoding technology
  const efficiencyFactor = efficiencyFactors[encodingTechnology];

  // Validate encoding technology input
  if (efficiencyFactor === undefined) {
    alert("Please select a valid encoding technology.");
    return;
  }

  // Recommended bitrates for different resolutions and frame rates
  const resolutionBitrateMap = {
    "720p": { baseBitrate: 2500, frameRateMultiplier: 1.5 },
    "936p": { baseBitrate: 3500, frameRateMultiplier: 1.6 },
    "1080p": { baseBitrate: 4500, frameRateMultiplier: 1.75 },
    "4K": { baseBitrate: 15000, frameRateMultiplier: 2 },
  };

  // Get base bitrate and frame rate multiplier for the selected resolution
  const resolutionSettings = resolutionBitrateMap[resolution];

  // Validate resolution input
  if (!resolutionSettings) {
    alert("Please select a valid resolution.");
    return;
  }

  const baseBitrate = resolutionSettings.baseBitrate;
  const frameRateMultiplier = resolutionSettings.frameRateMultiplier;

  // Calculate recommended bitrate
  let recommendedBitrate =
    baseBitrate * (frameRate / 30) * frameRateMultiplier * efficiencyFactor;

  // Ensure recommended bitrate doesn't exceed 70% of the user's internet speed
  const maxBitrate = parseFloat((internetSpeed * 1000 * 0.7).toFixed(0));
  if (recommendedBitrate > maxBitrate) {
    recommendedBitrate = maxBitrate;
  }

  // Log and display the recommended bitrate
  console.log("Recommended Bitrate:", recommendedBitrate);
  try {
    document.getElementById("result").innerText = recommendedBitrate.toFixed(0);
  } catch (error) {
    console.error("Error setting recommended bitrate:", error);
  }
}