function calculateBitrate() {
    const internetSpeed = parseFloat(document.getElementById('internetSpeed').value);
    const resolutionFactor = parseFloat(document.getElementById('resolution').value);
    const frameRateFactor = parseFloat(document.getElementById('frameRate').value);
    const encodingEfficiency = parseFloat(document.getElementById('encodingEfficiency').value);
    
    const bitrate = (internetSpeed * 1000) / (resolutionFactor * frameRateFactor * encodingEfficiency);
    
    document.getElementById('result').textContent = bitrate.toFixed(2);
}