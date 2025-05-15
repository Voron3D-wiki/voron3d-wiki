# Stepper Motor Viewer

Search and compare stepper motors interactively. You can choose from a list of predefined motors or define a custom motor.

<div id="motor-viewer-root">
  <div class="motor-search">
    <label for="motor-search-input">Search for a motor:</label>
    <input type="text" id="motor-search-input" placeholder="Type model, brand, or NEMA size..." />
    <button id="add-custom-motor-btn">Add Custom Motor</button>
  </div>

  <div id="motor-list"></div>
  <canvas id="motor-chart" height="300"></canvas>
</div>

<link rel="stylesheet" href="assets/js/motor-viewer.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="assets/js/motor-viewer.js"></script>
