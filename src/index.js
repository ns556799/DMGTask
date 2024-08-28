/**
 * Class to observe and notify about the scroll depth milestones reached within an article.
 * Pushing attention time to provide more context to the observers.
 */
class ScrollDepthObserver {
	/**
	 * Initializes the ScrollDepthObserver with specified milestones.
	 *
	 * @param {number[]} milestones - An array of scroll depth milestones as fractions of total scrollable content.
	 */
	constructor(milestones) {
		this.milestones = milestones; // Array of scroll depth milestones (e.g., 0.25, 0.5, 1.0)
		this.reached = {}; // Object to track if milestones have been reached
		this.observers = []; // Array to hold observer callback functions
		this.startTime = Date.now(); // Start time to calculate attention time

		// Initialize the reached object with milestones as keys and set them to false
		milestones.forEach((m) => (this.reached[m] = false));

		// Bind the checkScrollDepth method to the instance to ensure correct 'this' context
		this.checkScrollDepth = this.checkScrollDepth.bind(this);

		// Add an event listener to monitor scroll events
		window.addEventListener("scroll", this.checkScrollDepth);
	}

	/**
	 * Adds an observer callback to the list of observers.
	 *
	 * @param {function} callback - A callback function to be notified when a milestone is reached.
	 */
	addObserver(callback) {
		this.observers.push(callback);
	}

	/**
	 * Removes an observer callback from the list of observers.
	 *
	 * @param {function} callback - A callback function to be removed from the notification list.
	 */
	removeObserver(callback) {
		this.observers = this.observers.filter((observer) => observer !== callback);
	}

	/**
	 * Notifies all observers about a reached milestone, along with the attention time.
	 *
	 * @param {number} percentage - The milestone reached as a fraction (e.g., 0.25 for 25%).
	 * @param {number} attentionTime - The time spent from the start until reaching the milestone in milliseconds.
	 */
	notifyObservers(percentage, attentionTime) {
		// Notify each observer with the milestone and attention time
		this.observers.forEach((observer) =>
			observer({ percentage: percentage * 100, attentionTime }),
		);

		// Dispatch a custom event to notify other potential listeners
		window.dispatchEvent(
			new CustomEvent("scrollDepthReached", {
				detail: { percentage: percentage * 100, attentionTime },
			}),
		);
	}

	/**
	 * Checks the current scroll depth and notifies observers if any milestone is reached.
	 */
	checkScrollDepth() {
		const article = document.querySelector(".article-body"); // Element to measure scroll depth
		const viewportHeight = window.innerHeight; // Height of the viewport
		const scrollDepth =
			(window.scrollY + viewportHeight) / article.scrollHeight; // Calculate scroll depth as a fraction of total content height

		// Iterate over milestones to check if they have been reached
		this.milestones.forEach((milestone) => {
			if (scrollDepth >= milestone && !this.reached[milestone]) {
				this.reached[milestone] = true; // Mark milestone as reached
				this.notifyObservers(milestone, Date.now() - this.startTime); // Notify observers
			}
		});
	}
}

const milestones = [0.25, 0.5, 1.0]; // Define milestones at 25%, 50%, and 100% scroll depth
const scrollObserver = new ScrollDepthObserver(milestones); // Instantiate ScrollDepthObserver with milestones

// Add an observer to log milestone and attention time when reached
scrollObserver.addObserver(({ percentage, attentionTime }) => {
	console.log(
		`Observer notified: ${percentage}% reached with ${attentionTime}ms attention time`,
	);
});
