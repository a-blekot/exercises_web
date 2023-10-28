// Enumerations for various properties of the Exercise class
const MuscleGroup = {
    LEGS: "LEGS",
    PRESS: "PRESS",
    BACK: "BACK",
    CHEST: "CHEST",
    SHOULDERS: "SHOULDERS",
    NECK: "NECK"
};

const Inventory = {
    FLOOR: "FLOOR",
    WALL: "WALL",
    TAPE: "TAPE",
    DUMBBELLS_1_5: "DUMBBELLS_1_5",
    DUMBBELLS_2_5: "DUMBBELLS_2_5",
    HORIZONTAL_BAR: "HORIZONTAL_BAR",
    SOFA: "SOFA"
};

const Location = {
    HOME: "HOME",
    STREET: "STREET"
};

const Load = {
    HARD: "HARD",
    MEDIUM: "MEDIUM",
    LIGHT: "LIGHT"
};

const ExerciseType = {
    STRETCH: "STRETCH",
    STRENGTH: "STRENGTH",
    CARDIO: "CARDIO"
};

// Exercise class declaration
class Exercise {
    constructor(name, shortDescription, detailedDescription, image, gif, muscleGroup, inventory, location, load, type, duration) {
        this.name = name;
        this.shortDescription = shortDescription;
        this.detailedDescription = detailedDescription;
        this.image = image;
        this.gif = gif;
        this.muscleGroup = muscleGroup;
        this.inventory = inventory;
        this.location = location;
        this.load = load;
        this.type = type;
        this.duration = duration;
    }
}

var exercises = []; // Your list of exercises

document.addEventListener("DOMContentLoaded", function () {
    const durationInput = document.getElementById("duration");
    const exerciseCountInput = document.getElementById("exerciseCount");
    const locationInput = document.getElementById("location");
    const startButton = document.getElementById("startButton");
    const exerciseContainer = document.getElementById("exerciseContainer");
    const exerciseDescription = document.getElementById("exerciseDescription");
    const exerciseImage = document.getElementById("exerciseImage");
    const timerContainer = document.getElementById("timerContainer");
    const timer = document.getElementById("timer");
    const congratsContainer = document.getElementById("congratsContainer");


    let currentExerciseIndex = 0;
    let workoutTimer;

    startButton.addEventListener("click", startWorkout);

    function startWorkout() {
        const workoutDuration = parseInt(durationInput.value);
        const exerciseCount = parseInt(exerciseCountInput.value);
        const workoutLocation = locationInput.value;

        // Generate a random list of exercises based on parameters
        generateRandomExercises(exerciseCount);

        // Hide input elements and show exercise container
        durationInput.style.display = "none";
        exerciseCountInput.style.display = "none";
        locationInput.style.display = "none";
        startButton.style.display = "none";
        exerciseContainer.style.display = "block";

        // Start the workout
        displayExercise();
        startTimer(workoutDuration);

        // Show congrats message at the end of the workout
        setTimeout(() => {
            exerciseContainer.style.display = "none";
            timerContainer.style.display = "none";
            congratsContainer.style.display = "block";
        }, workoutDuration * 60000);
    }

    function endWorkout() {
        // Hide exercise and timer containers
        exerciseContainer.style.display = "none";
        timerContainer.style.display = "none";

        // Show congrats message
        congratsContainer.style.display = "block";
    }

    function displayExercise() {
        const exercise = getCurrentExercise();
        exerciseDescription.textContent = exercise.description;
        exerciseImage.src = exercise.image;
        exerciseContainer.querySelector("h2").textContent = `Exercise ${currentExerciseIndex + 1}`;
    }

    function startTimer(duration) {
        let seconds = duration * 5;
        workoutTimer = setInterval(function () {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            timer.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

            if (seconds === 0) {
                clearInterval(workoutTimer);
                // Increment the current exercise index
                currentExerciseIndex++;

                // Check if there are more exercises
                if (currentExerciseIndex < exercises.length) {
                    // Display the next exercise
                    displayExercise();
                    // Start the timer for the next exercise
                    startTimer(duration);
                } else {
                    // No more exercises, end the workout
                    endWorkout();
                }
            }

            seconds--;
        }, 1000);
    }

    function getCurrentExercise() {
        try {
            console.log("getCurrentExercise() index:", currentExerciseIndex);
            const current = exercises[currentExerciseIndex];
            console.log("getCurrentExercise:", current);
            return current;
        } catch (error) {
            console.error("getCurrentExercise:", error);
            return null;
        }
    }

    function generateRandomExercises(count) {
        // Implement logic to generate random exercises from your base
        // You can use Math.random() and select random exercises
        // Return an array of exercise objects
        console.log("generateRandomExercises:", count);

        exercises = [exercise1, exercise2, exercise3, exercise4];

        // For example, generate a random exercise
        const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
        // Use the randomExercise object in your workout logic
        console.log(randomExercise);

    }

    function loadJsonn() {

        fetch('db.json') // Replace with the actual URL of your JSON file
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the JSON response
            })
            .then((jsonArray) => {
                // Parse the JSON data into an array
                exercises = JSON.parse(data);

                // Now you can work with jsonArray as an array
                console.log('Loaded JSON data as an array:', jsonArray);
                // resultDiv.textContent = JSON.stringify(jsonArray, null, 2);
            })
            .catch((error) => {
                console.error('Error loading JSON:', error);
            });

        // // Read the JSON file
        // fs.readFile('db.json', 'utf8', (err, data) => {
        //     if (err) {
        //         console.error('Error reading JSON file:', err);
        //         return;
        //     }

        //     try {
        //         // Parse the JSON data into an array
        //         exercises = JSON.parse(data);

        //         // Now you can work with the jsonArray as an array
        //         console.log('Loaded JSON data as an array:', exercises[1]);
        //     } catch (error) {
        //         console.error('Error parsing JSON:', error);
        //     }
        // });
    }

    loadJsonn();
});
