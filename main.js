document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("haikuForm");
    const haikuDisplay = document.getElementById("haikuDisplay");
    const newInputButton = document.getElementById("newInputButton");

    // Words grouped by syllables
    const wordsBySyllables = {
        1: ['sky', 'leaf', 'wind', 'sun', 'rain', 'snow', 'bird', 'cloud'],
        2: ['morning', 'whisper', 'ocean', 'river', 'forest', 'silent', 'dreaming'],
        3: ['beautiful', 'harmony', 'quietly', 'imagine', 'wonderful', 'colorful'],
        4: ['tranquility', 'butterflies', 'memories', 'melancholy', 'gentleness'],
        5: ['overwhelming', 'unbelievable', 'unforgivable', 'irreplaceable']
    };

    // Function to estimate syllables in a word (basic version)
    function countSyllables(word) {
        word = word.toLowerCase();
        if (word.length <= 3) { return 1; } // Simple heuristic: short words usually 1 syllable
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, ''); // Remove silent 'e'
        word = word.replace(/^y/, ''); // Remove 'y' at the start
        const syllables = word.match(/[aeiouy]{1,2}/g);
        return syllables ? syllables.length : 1;
    }

    // Function to generate random word based on syllable count
    function getRandomWord(syllableCount) {
        const words = wordsBySyllables[syllableCount];
        return words[Math.floor(Math.random() * words.length)];
    }

    // Generate the 5-7-5 Haiku
    function generateHaiku(userWord, syllableCount) {
        let haiku = {
            line1: [],
            line2: [],
            line3: []
        };

        // Line 1: total 5 syllables
        let syllablesLeft = 5;
        if (syllableCount <= 5) {
            haiku.line1.push(userWord);
            syllablesLeft -= syllableCount;
        }
        while (syllablesLeft > 0) {
            let randomSyllableCount = Math.min(syllablesLeft, Math.floor(Math.random() * 3) + 1);
            haiku.line1.push(getRandomWord(randomSyllableCount));
            syllablesLeft -= randomSyllableCount;
        }

        // Line 2: total 7 syllables
        syllablesLeft = 7;
        if (syllableCount <= 7) {
            haiku.line2.push(userWord);
            syllablesLeft -= syllableCount;
        }
        while (syllablesLeft > 0) {
            let randomSyllableCount = Math.min(syllablesLeft, Math.floor(Math.random() * 3) + 1);
            haiku.line2.push(getRandomWord(randomSyllableCount));
            syllablesLeft -= randomSyllableCount;
        }

        // Line 3: total 5 syllables
        syllablesLeft = 5;
        if (syllableCount <= 5) {
            haiku.line3.push(userWord);
            syllablesLeft -= syllableCount;
        }
        while (syllablesLeft > 0) {
            let randomSyllableCount = Math.min(syllablesLeft, Math.floor(Math.random() * 3) + 1);
            haiku.line3.push(getRandomWord(randomSyllableCount));
            syllablesLeft -= randomSyllableCount;
        }

        return haiku;
    }

    // Display the generated haiku
    function displayHaiku(haiku) {
        document.getElementById("haikuLine1").textContent = haiku.line1.join(' ');
        document.getElementById("haikuLine2").textContent = haiku.line2.join(' ');
        document.getElementById("haikuLine3").textContent = haiku.line3.join(' ');
    }

    // On form submit, hide form and display Haiku
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get user input
        const userWord = document.getElementById("userWord").value.trim();
        const syllableCount = countSyllables(userWord); // Automatically count syllables

        // Generate and display Haiku
        const haiku = generateHaiku(userWord, syllableCount);
        displayHaiku(haiku);

        // Hide form and show Haiku section with "Generate Another Haiku" button
        form.style.display = "none";
        haikuDisplay.style.display = "block";
    });

    // Reset the form and allow the user to enter new input
    newInputButton.addEventListener("click", function() {
        haikuDisplay.style.display = "none"; // Hide the haiku display
        form.reset(); // Clear the form
        form.style.display = "block"; // Show the form again
    });
});
