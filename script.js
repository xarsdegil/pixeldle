const word = "HELLO";
let remainingGuesses = 5;

const wordleContainer = document.getElementById("wordle-container");
const remainingGuessesElement = document.getElementById("remainingGuesses");

function getLetterPixels(letter) {
    const letters = {
        H: [0x00, 0x24, 0x24, 0x3C, 0x24, 0x24, 0x24, 0x00], // H'nin piksel temsilci dizisi
        E: [0x00, 0x3C, 0x20, 0x38, 0x20, 0x20, 0x3C, 0x00], // E'nin piksel temsilci dizisi
        L: [0x00, 0xFF, 0x81, 0x81, 0x81, 0x81, 0x81, 0x00], // L'nin piksel temsilci dizisi
        O: [0x00, 0x7E, 0x81, 0x81, 0x81, 0x81, 0x7E, 0x00]  // O'nun piksel temsilci dizisi
    };

    // Harf temsilcisini ikili forma dönüştürerek döndür
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
        const letterPixels = getLetterPixels(actualLetter); // Harf piksellerini al

        for (let i = 0; i < 8; i++) {
            const binaryValue = parseInt(letterPixels[i], 16).toString(2).padStart(8, '0');
            for (let j = 0; j < 8; j++) {
                const index = i * 8 + j;
                const pixel = pixels[index];
                
                // Her bir harf için uygun pikseli kontrol et
                if (binaryValue.charAt(j) === '1') {
                    pixel.classList.add("letter-pixel");
                }
            }
        }

        if (guessLetter === actualLetter) {
            for (let j = 0; j < pixels.length; j++) {
                if (pixels[j].classList.contains("letter-pixel")) {
                    pixels[j].classList.add("correct");
                }
            }
        } else {
            for (let j = 0; j < pixels.length; j++) {
                if (pixels[j].classList.contains("letter-pixel")) {
                    pixels[j].classList.add("guess");
                }
            }
        }
    }

    if (guess === word) {
        alert("Congratulations! You guessed the word!");
        return;
    }
}
