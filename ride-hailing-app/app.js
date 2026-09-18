class DriverProfile {
  #driverRating = 5;

  get rating() {
    return this.#driverRating;
  }

  set rating(newRating) {
    if (typeof newRating === 'number' && newRating >= 0 && newRating <= 5) {
      this.#driverRating = newRating;
    } else {
      throw new Error('Rating must be a number between 0 and 5.');
    }
  }

  // TODO: Add your setter for 'rating' here
}

const driverProfile = new DriverProfile();
driverProfile.rating = 4; // Example of setting the rating
console.log(driverProfile.rating); // Example of getting the rating