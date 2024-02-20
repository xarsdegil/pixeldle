const word = "ABCYN";
let remainingGuesses = 5;

const wordleContainer = document.getElementById("wordle-container");
const remainingGuessesElement = document.getElementById("remainingGuesses");

function getLetterPixels(letter) {
    const letters = {
        A: [0x3C, 0x42, 0x42, 0x42, 0x7E, 0x42, 0x42, 0x42], // A'nın piksel temsilci dizisi
        B: [0x7C, 0x42, 0x42, 0x7C, 0x42, 0x42, 0x42, 0x7C], // B'nin piksel temsilci dizisi
        C: [0x1C, 0x22, 0x40, 0x40, 0x40, 0x40, 0x22, 0x1C], // C'nin piksel temsilci dizisi
        D: [0x7C, 0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x7C], // D'nin piksel temsilci dizisi
        E: [0x7E, 0x40, 0x40, 0x78, 0x40, 0x40, 0x40, 0x7E], // E'nin piksel temsilci dizisi
        F: [0x7E, 0x40, 0x40, 0x7C, 0x40, 0x40, 0x40, 0x40], // F'nin piksel temsilci dizisi
        G: [0x1C, 0x22, 0x40, 0x40, 0x4E, 0x42, 0x22, 0x1C], // G'nin piksel temsilci dizisi
        H: [0x42, 0x42, 0x42, 0x7E, 0x42, 0x42, 0x42, 0x42], // H'nin piksel temsilci dizisi
        I: [0x38, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x38], // I'nin piksel temsilci dizisi
        J: [0x1E, 0x02, 0x02, 0x02, 0x02, 0x02, 0x42, 0x3C], // J'nin piksel temsilci dizisi
        K: [0x42, 0x44, 0x48, 0x50, 0x70, 0x48, 0x44, 0x42], // K'nin piksel temsilci dizisi
        L: [0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x7E], // L'nin piksel temsilci dizisi
        M: [0x42, 0x66, 0x5A, 0x42, 0x42, 0x42, 0x42, 0x42], // M'nin piksel temsilci dizisi
        N: [0x42, 0x62, 0x52, 0x52, 0x4A, 0x4A, 0x46, 0x42], // N'nin piksel temsilci dizisi
        O: [0x3C, 0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x3C], // O'nin piksel temsilci dizisi
        P: [0x7C, 0x42, 0x42, 0x7C, 0x40, 0x40, 0x40, 0x40], // P'nin piksel temsilci dizisi
        Q: [0x3C, 0x42, 0x42, 0x42, 0x42, 0x42, 0x3C, 0x02], // Q'nin piksel temsilci dizisi
        R: [0x7C, 0x42, 0x42, 0x7C, 0x50, 0x48, 0x44, 0x42], // R'nin piksel temsilci dizisi
        S: [0x3C, 0x42, 0x40, 0x20, 0x1C, 0x02, 0x42, 0x3C], // S'nin piksel temsilci dizisi
        T: [0xFE, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10], // T'nin piksel temsilci dizisi
        U: [0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x3C], // U'nin piksel temsilci dizisi
        V: [0x42, 0x42, 0x42, 0x24, 0x24, 0x24, 0x18, 0x18], // V'nin piksel temsilci dizisi
        W: [0x00, 0x82, 0x92, 0x54, 0x54, 0x28, 0x00, 0x00], // W'nin piksel temsilci dizisi
        X: [0x00, 0x42, 0x24, 0x18, 0x18, 0x24, 0x42, 0x00], // X'nin piksel temsilci dizisi
        Y: [0x82, 0x44, 0x28, 0x10, 0x10, 0x10, 0x10, 0x10], // Y'nin piksel temsilci dizisi
        Z: [0x7E, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x7E]  // Z'nin piksel temsilci dizisi
    };

    
    return letters[letter.toUpperCase()].map(byte => byte.toString(2).padStart(8, '0')).join('\n');
}

// Create wordle grid for each letter
for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    const letterContainer = document.createElement("div");
    letterContainer.classList.add("letter-container");
    const pixels = createLetterPixels(getLetterPixels(letter)); // Piksel temsilcilerini al ve kutuları oluştur
    Array.from(pixels).forEach(pixel => letterContainer.appendChild(pixel));
    wordleContainer.appendChild(letterContainer);
}

function createLetterPixels(pixelData) {
    const pixels = [];
    const lines = pixelData.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        for (let j = 0; j < line.length; j++) {
            const pixel = document.createElement("div");
            pixel.classList.add("pixel");
            if (line.charAt(j) === '1') {
                pixel.classList.add("letter-pixel");
            }
            pixels.push(pixel);
        }
    }
    return pixels;
}

// Check guess
function checkGuess() {
    const guess = document.getElementById("guessInput").value.toUpperCase();
    const letterContainers = document.querySelectorAll(".letter-container");

    if (guess.length !== word.length) {
        alert("Please enter a guess with the correct length.");
        return;
    }

    remainingGuesses--;

    if (remainingGuesses < 0) {
        alert("Out of guesses!");
        return;
    }

    remainingGuessesElement.textContent = `Remaining guesses: ${remainingGuesses}`;

    for (let i = 0; i < guess.length; i++) {
        const guessLetter = guess[i];
        const actualLetter = word[i];
        const pixels = Array.from(letterContainers[i].querySelectorAll(".pixel")); // NodeList'i diziye dönüştür
        const actualLetterPixels = getLetterPixels(actualLetter).split('\n'); // Actual letter's pixels

        for (let j = 0; j < pixels.length; j++) {
            const pixel = pixels[j];
            const actualPixel = actualLetterPixels[j].charAt(j); // Pixel value of the actual letter
            pixel.classList.remove("guess", "correct");
            if (guessLetter === actualLetter && actualPixel === '1') {
                pixel.classList.add("correct");
            }
            if (actualPixel === '1') {
                pixel.classList.add("guess");
            }
        }
    }

    if (guess === word) {
        alert("Congratulations! You guessed the word!");
        return;
    }
}
