// Electromagnetic Presentation Interactive Features

// Constante fizice
const SPEED_OF_LIGHT = 299792458; // m/s

// Quiz data
const quizData = [
    {
        question: "Care este viteza luminii în vid?",
        options: ["299,792,458 m/s", "300,000,000 m/s", "299,000,000 m/s", "298,792,458 m/s"],
        correct: 0,
        explanation: "Viteza luminii în vid este exact 299,792,458 m/s, o constantă fundamentală a fizicii."
    },
    {
        question: "Câte ecuații are sistemul de ecuații Maxwell?",
        options: ["2", "3", "4", "5"],
        correct: 2,
        explanation: "Ecuațiile lui Maxwell sunt 4: legea lui Gauss pentru E, legea lui Gauss pentru B, legea Faraday și legea Ampère (extinsă)."
    },
    {
        question: "Ce frecvență folosește WiFi-ul 2.4GHz?",
        options: ["2.4 MHz", "2.4 GHz", "24 GHz", "240 MHz"],
        correct: 1,
        explanation: "WiFi-ul folosește banda de 2.4 GHz (2,400,000,000 Hz) pentru comunicații wireless."
    },
    {
        question: "Ce tip de radiație folosesc cuptoarele cu microunde?",
        options: ["Infraroșu", "Raze X", "Microunde", "Ultraviolet"],
        correct: 2,
        explanation: "Cuptoarele cu microunde folosesc radiația cu microunde (≈2.45 GHz) pentru a încălzi alimentele."
    },
    {
        question: "Care este relația dintre frecvență și lungimea de undă?",
        options: ["f = c × λ", "f = c / λ", "f = λ / c", "f = c + λ"],
        correct: 1,
        explanation: "Relația fundamentală este f = c/λ, unde f este frecvența, c viteza luminii și λ lungimea de undă."
    }
];

// Spectrum data
const spectrumData = {
    radio: {
        name: "Unde Radio",
        frequency: "3 kHz - 300 MHz",
        wavelength: "100 km - 1 m",
        description: "Folosite pentru: comunicații radio, televiziune, navigație GPS",
        applications: "Radiodifuziune, comunicații maritime, radioamatori"
    },
    microwave: {
        name: "Microunde",
        frequency: "300 MHz - 300 GHz",
        wavelength: "1 m - 1 mm",
        description: "Folosite pentru: WiFi, Bluetooth, cuptoare cu microunde, radar",
        applications: "Comunicații mobile, încălzire alimente, detectare meteorologică"
    },
    infrared: {
        name: "Infraroșu",
        frequency: "300 GHz - 400 THz",
        wavelength: "1 mm - 750 nm",
        description: "Folosit pentru: viziune termică, telecomenzi, comunicații prin fibră optică",
        applications: "Termografie, astronomie infraroșie, securitate"
    },
    visible: {
        name: "Lumina Vizibilă",
        frequency: "400 - 800 THz",
        wavelength: "750 - 380 nm",
        description: "Singurul tip de radiație vizibil pentru ochiul uman",
        applications: "Fotografie, iluminat, fotosinteza, panouri solare"
    },
    ultraviolet: {
        name: "Ultraviolet",
        frequency: "800 THz - 30 PHz",
        wavelength: "380 - 10 nm",
        description: "Folosit pentru: sterilizare, bronzat, detecție de falsificări",
        applications: "Dezinfecție, analiză chimică, litografie"
    },
    xray: {
        name: "Raze X",
        frequency: "30 PHz - 30 EHz",
        wavelength: "10 nm - 10 pm",
        description: "Folosite pentru: imagistică medicală, securitate, cristalografie",
        applications: "Radiografii, CT scanuri, controlul bagajelor"
    },
    gamma: {
        name: "Raze Gamma",
        frequency: "> 30 EHz",
        wavelength: "< 10 pm",
        description: "Cele mai energetice radiații, folosite în medicină și astronomie",
        applications: "Radioterapie, sterilizare medicală, astronomie"
    }
};

// State variables
let currentQuestionIndex = 0;
let score = 0;
let quizAnswered = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Initialize spectrum interaction
    setupSpectrumInteraction();
    
    // Initialize calculator
    setupCalculator();
    
    // Initialize quiz
    setupQuiz();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    // Setup responsive navigation
    setupResponsiveNav();
}

// Smooth scrolling functionality
function setupSmoothScrolling() {
    const links = document.querySelectorAll('nav a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Spectrum interaction setup
function setupSpectrumInteraction() {
    const segments = document.querySelectorAll('.spectrum-segment');
    const infoContent = document.querySelector('.info-content');
    const infoTitle = document.querySelector('.spectrum-info h3');
    
    segments.forEach(segment => {
        segment.addEventListener('click', function() {
            const segmentType = this.classList[1]; // Get the second class name
            const data = spectrumData[segmentType];
            
            if (data) {
                infoTitle.textContent = data.name;
                infoContent.innerHTML = `
                    <div class="spectrum-detail">
                        <p><strong>Frecvența:</strong> ${data.frequency}</p>
                        <p><strong>Lungimea de undă:</strong> ${data.wavelength}</p>
                        <p><strong>Descriere:</strong> ${data.description}</p>
                        <p><strong>Aplicații:</strong> ${data.applications}</p>
                    </div>
                `;
                
                // Add visual feedback
                segments.forEach(s => s.classList.remove('active'));
                this.classList.add('active');
            }
        });
        
        // Add hover effects
        segment.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                const segmentType = this.classList[1];
                const data = spectrumData[segmentType];
                
                if (data) {
                    infoTitle.textContent = data.name;
                    infoContent.innerHTML = `
                        <p><em>Click pentru informații complete</em></p>
                        <p><strong>Frecvența:</strong> ${data.frequency}</p>
                        <p><strong>Lungimea de undă:</strong> ${data.wavelength}</p>
                    `;
                }
            }
        });
    });
}

// Calculator setup
function setupCalculator() {
    const frequencyInput = document.getElementById('frequency');
    const wavelengthInput = document.getElementById('wavelength');
    const calculateBtn = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');
    
    calculateBtn.addEventListener('click', calculateValues);
    
    // Allow Enter key to calculate
    [frequencyInput, wavelengthInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateValues();
            }
        });
    });
    
    function calculateValues() {
        const frequency = parseFloat(frequencyInput.value);
        const wavelength = parseFloat(wavelengthInput.value);
        
        resultDiv.innerHTML = '';
        
        if (frequency && !wavelength) {
            // Calculate wavelength from frequency
            const calculatedWavelength = SPEED_OF_LIGHT / frequency;
            const energy = calculatePhotonEnergy(frequency);
            
            resultDiv.innerHTML = `
                <div class="result-item">
                    <strong>Lungimea de undă calculată:</strong> ${formatWavelength(calculatedWavelength)}
                </div>
                <div class="result-item">
                    <strong>Energia fotonului:</strong> ${energy}
                </div>
                <div class="result-item">
                    <strong>Tipul radiației:</strong> ${identifyRadiationType(frequency)}
                </div>
                <div class="result-item">
                    <strong>Aplicații tipice:</strong> ${getTypicalApplications(frequency)}
                </div>
            `;
            
            wavelengthInput.value = calculatedWavelength.toExponential(3);
            
        } else if (wavelength && !frequency) {
            // Calculate frequency from wavelength
            const calculatedFrequency = SPEED_OF_LIGHT / wavelength;
            const energy = calculatePhotonEnergy(calculatedFrequency);
            
            resultDiv.innerHTML = `
                <div class="result-item">
                    <strong>Frecvența calculată:</strong> ${formatFrequency(calculatedFrequency)}
                </div>
                <div class="result-item">
                    <strong>Energia fotonului:</strong> ${energy}
                </div>
                <div class="result-item">
                    <strong>Tipul radiației:</strong> ${identifyRadiationType(calculatedFrequency)}
                </div>
                <div class="result-item">
                    <strong>Aplicații tipice:</strong> ${getTypicalApplications(calculatedFrequency)}
                </div>
            `;
            
            frequencyInput.value = calculatedFrequency.toExponential(3);
            
        } else if (frequency && wavelength) {
            // Verify the relationship
            const expectedWavelength = SPEED_OF_LIGHT / frequency;
            const expectedFrequency = SPEED_OF_LIGHT / wavelength;
            const error = Math.abs(expectedWavelength - wavelength) / wavelength * 100;
            
            if (error < 1) {
                resultDiv.innerHTML = `
                    <div class="result-success">
                        ✓ Valorile sunt consistente!
                    </div>
                    <div class="result-item">
                        <strong>Viteza calculată:</strong> ${formatSpeed(frequency * wavelength)}
                    </div>
                    <div class="result-item">
                        <strong>Eroarea:</strong> ${error.toFixed(4)}%
                    </div>
                `;
            } else {
                resultDiv.innerHTML = `
                    <div class="result-error">
                        ⚠ Valorile nu sunt consistente!
                    </div>
                    <div class="result-item">
                        <strong>Frecvența așteptată:</strong> ${formatFrequency(expectedFrequency)}
                    </div>
                    <div class="result-item">
                        <strong>Lungimea de undă așteptată:</strong> ${formatWavelength(expectedWavelength)}
                    </div>
                `;
            }
        } else {
            resultDiv.innerHTML = '<div class="result-error">Te rog introdu o valoare pentru frecvență sau lungimea de undă.</div>';
        }
    }
}

// Helper functions for calculator
function formatFrequency(freq) {
    if (freq >= 1e15) return (freq / 1e15).toFixed(2) + ' PHz';
    if (freq >= 1e12) return (freq / 1e12).toFixed(2) + ' THz';
    if (freq >= 1e9) return (freq / 1e9).toFixed(2) + ' GHz';
    if (freq >= 1e6) return (freq / 1e6).toFixed(2) + ' MHz';
    if (freq >= 1e3) return (freq / 1e3).toFixed(2) + ' kHz';
    return freq.toFixed(2) + ' Hz';
}

function formatWavelength(lambda) {
    if (lambda >= 1000) return (lambda / 1000).toFixed(2) + ' km';
    if (lambda >= 1) return lambda.toFixed(3) + ' m';
    if (lambda >= 1e-3) return (lambda * 1e3).toFixed(2) + ' mm';
    if (lambda >= 1e-6) return (lambda * 1e6).toFixed(2) + ' μm';
    if (lambda >= 1e-9) return (lambda * 1e9).toFixed(2) + ' nm';
    if (lambda >= 1e-12) return (lambda * 1e12).toFixed(2) + ' pm';
    return lambda.toExponential(3) + ' m';
}

function formatSpeed(speed) {
    const speedRatio = speed / SPEED_OF_LIGHT;
    return speed.toExponential(3) + ' m/s (' + (speedRatio * 100).toFixed(2) + '% din c)';
}

function calculatePhotonEnergy(frequency) {
    const h = 6.626e-34; // Planck constant
    const energy = h * frequency;
    const energyEv = energy / 1.602e-19; // Convert to eV
    
    if (energyEv >= 1) {
        return energyEv.toFixed(3) + ' eV';
    } else {
        return (energyEv * 1000).toFixed(3) + ' meV';
    }
}

function identifyRadiationType(frequency) {
    if (frequency < 3e8) return "Unde radio";
    if (frequency < 3e11) return "Microunde";
    if (frequency < 4e14) return "Infraroșu";
    if (frequency < 8e14) return "Lumină vizibilă";
    if (frequency < 3e16) return "Ultraviolet";
    if (frequency < 3e19) return "Raze X";
    return "Raze gamma";
}

function getTypicalApplications(frequency) {
    if (frequency < 3e8) return "Radiodifuziune, comunicații";
    if (frequency < 3e11) return "WiFi, radar, cuptoare cu microunde";
    if (frequency < 4e14) return "Viziune termică, telecomenzi";
    if (frequency < 8e14) return "Iluminat, fotografie, solar";
    if (frequency < 3e16) return "Sterilizare, analiză chimică";
    if (frequency < 3e19) return "Imagistică medicală, radiografii";
    return "Radioterapie, astronomie";
}

// Quiz setup
function setupQuiz() {
    loadQuestion();
    
    const nextBtn = document.getElementById('next-question');
    nextBtn.addEventListener('click', nextQuestion);
    
    // Hide next button initially
    nextBtn.style.display = 'none';
}

function loadQuestion() {
    const question = quizData[currentQuestionIndex];
    const questionText = document.getElementById('question-text');
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('next-question');
    
    questionText.textContent = question.question;
    
    options.forEach((option, index) => {
        option.textContent = question.options[index];
        option.className = 'quiz-option';
        option.onclick = () => selectAnswer(index);
        option.disabled = false;
    });
    
    feedback.textContent = '';
    nextBtn.style.display = 'none';
    quizAnswered = false;
    
    updateScore();
}

function selectAnswer(selectedIndex) {
    if (quizAnswered) return;
    
    const question = quizData[currentQuestionIndex];
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('next-question');
    
    quizAnswered = true;
    
    options.forEach((option, index) => {
        option.disabled = true;
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== question.correct) {
            option.classList.add('incorrect');
        }
    });
    
    if (selectedIndex === question.correct) {
        score++;
        feedback.innerHTML = `
            <div class="feedback-correct">
                ✓ Correct! ${question.explanation}
            </div>
        `;
    } else {
        feedback.innerHTML = `
            <div class="feedback-incorrect">
                ✗ Incorrect. ${question.explanation}
            </div>
        `;
    }
    
    updateScore();
    
    if (currentQuestionIndex < quizData.length - 1) {
        nextBtn.textContent = 'Următoarea întrebare';
        nextBtn.style.display = 'block';
    } else {
        showFinalScore();
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('next-question');
    const percentage = Math.round((score / quizData.length) * 100);
    
    let message = '';
    if (percentage >= 80) {
        message = '🏆 Excelent! Ești un expert în electromagnetism!';
    } else if (percentage >= 60) {
        message = '👏 Foarte bine! Cunoști bine principiile de bază!';
    } else if (percentage >= 40) {
        message = '📚 Nu e rău, dar mai ai de studiat!';
    } else {
        message = '💪 Încearcă din nou după ce studiezi mai mult!';
    }
    
    feedback.innerHTML = `
        <div class="final-score">
            <h3>Quiz Finalizat!</h3>
            <p><strong>Scorul final: ${score}/${quizData.length} (${percentage}%)</strong></p>
            <p>${message}</p>
        </div>
    `;
    
    nextBtn.textContent = 'Restart Quiz';
    nextBtn.onclick = restartQuiz;
    nextBtn.style.display = 'block';
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
    
    const nextBtn = document.getElementById('next-question');
    nextBtn.onclick = nextQuestion;
}

function updateScore() {
    document.getElementById('score').textContent = score;
    document.getElementById('total-questions').textContent = quizData.length;
}

// Scroll animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all cards and sections
    document.querySelectorAll('.card, .app-category, .equation-box').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Responsive navigation
function setupResponsiveNav() {
    // Add mobile menu functionality if needed
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('nav ul');
    
    // Close mobile menu when clicking on links
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            // Close mobile menu logic here if implemented
        }
    });
}

// Add some Easter eggs and advanced features
document.addEventListener('keydown', (e) => {
    // Konami code for fun facts
    if (e.code === 'KeyE' && e.ctrlKey) {
        showRandomElectromagneticFact();
    }
});

function showRandomElectromagneticFact() {
    const facts = [
        "Câmpurile electromagnetice se propagă la viteza luminii în toate mediile!",
        "Maxwell a prezis existența undelor radio cu 20 de ani înainte de demonstrația lui Hertz!",
        "Ecuațiile lui Maxwell unifică electricitatea și magnetismul într-o singură teorie!",
        "Lumina vizibilă reprezintă doar 0.0035% din întregul spectru electromagnetic!",
        "Radiațiile gamma pot avea energii de milioane de ori mai mari decât lumina vizibilă!"
    ];
    
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    alert(`🔬 Știai că...\n\n${randomFact}`);
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
window.addEventListener('scroll', debounce(() => {
    // Add scroll-based animations or effects here
}, 100));

console.log('🔬 Prezentare Electromagnetism încărcată cu succes!');
console.log('💡 Apasă Ctrl+E pentru fapte interesante!');

// Initialize the app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}