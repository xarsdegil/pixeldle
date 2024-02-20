document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById("container");
  const outputContainer = document.createElement("div");
  outputContainer.id = "outputContainer";
  document.body.appendChild(outputContainer); // Çıktı metnini sayfanın altına ekler

  // Oyun alanını oluştur
  for (let i = 0; i < 64; i++) {
    const button = document.createElement("button");
    button.classList.add("button");
    button.dataset.row = Math.floor(i / 8);
    button.dataset.column = i % 8;
    button.addEventListener("click", toggleColor);
    container.appendChild(button);
  }

  function toggleColor() {
    this.classList.toggle("black");
    updateOutput();
  }

  function updateOutput() {
    const hexValues = [];
    for (let i = 0; i < 8; i++) {
      let binaryRow = "";
      for (let j = 0; j < 8; j++) {
        const button = document.querySelector(`.button[data-row='${i}'][data-column='${j}']`);
        binaryRow += button.classList.contains("black") ? "1" : "0";
      }
      const hexValue = "0x" + (parseInt(binaryRow, 2).toString(16).toUpperCase()).padStart(2, '0');
      hexValues.push(hexValue);
    }
    outputContainer.textContent = "[" + hexValues.join(", ") + "]";
  }

  updateOutput(); // İlk açıldığında çıktıyı güncelle
});
