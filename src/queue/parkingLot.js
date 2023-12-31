const Queue = require("../queue/queue");

/**
 * Implement a Parking Lot.
 *
 */
class ParkingLot {
  constructor(capacity, rate) {
    this.spaces = new Array(capacity).fill("vacant");
    this.rate = rate;
    this.revenue = 0;
    this.queue = new Queue();
  }

  /**
   * Returns the number of vacant parking spaces
   * @returns {Number}
   *  the total number of spaces where the value is "vacant".
   */

  get vacantSpaces() {
    return this.spaces.reduce(
      (sum, space, index) => sum + (space === "vacant" ? 1 : 0),
      0
    );
  }

  /**
   * As cars enter the parking lot, the license plate number is entered and the car is parked in the first vacant space.
   * If the lot is full, the car is added to the queue to be parked when a spot is available.
   *
   * @param licensePlateNumber
   *  the license plate number of the car entering
   */
  enter(licensePlateNumber) {
    // this.spaces is a array of spaces, if empty, it says 'vacant'
    let allSpaces = this.spaces;
    let vacantLot = allSpaces.findIndex((lot) => lot === "vacant");
    allSpaces[vacantLot] = licensePlateNumber;

    // if no vacantLot found (returns -1), enqueue licensePlateNumber
    if (vacantLot === -1) {
      this.queue.enqueue(licensePlateNumber);
    }
    //     console.log(this.queue);
  }

  /**
   * As a car leaves the parking lot, or the queue, the leave method is called with the license plate number of the car leaving.
   * @param licensePlateNumber
   *    *  the license plate number of the car leaving.
   */
  leave(licensePlateNumber) {
    //     console.log(this.spaces.includes(licensePlateNumber));
    // find licensePlateNumber in this.spaces, remove and replace with first in queue
    let spaces = this.spaces;
    let queue = this.queue;

    // if the requested licensePlateNumber is in the parking lot
    if (spaces.includes(licensePlateNumber)) {
      let leavingQueue = queue.dequeue();
      let parkingSpaceNum = spaces.indexOf(licensePlateNumber);
      spaces.splice(parkingSpaceNum, 1, leavingQueue);

      // adds rate to revenue
      this.revenue += this.rate;
    } else if (spaces.includes(licensePlateNumber) === false) {
      const tempQueue = new Queue();

      while (queue.isEmpty() === false) {
        const currentItem = queue.dequeue();
        //         console.log(queue, currentItem)
        if (currentItem !== licensePlateNumber) {
          tempQueue.enqueue(currentItem);
        }
      }
      //       console.log(tempQueue);
      while (tempQueue.isEmpty() === false) {
        queue.enqueue(tempQueue.dequeue());
      }
    }
    // if licensePlateNumber is in queue, remove from queue
  }

  /**
   * Lists each space in the parking lot along with the license plate number of the car parked there, or
   * "vacant" as the license plate if the spot is vacant.
   * @returns {{licensePlateNumber: string, space: Number}[]}
   */
  get occupants() {
    let result = this.spaces.map((licensePlateNumber, index) => ({
      space: index + 1,
      licensePlateNumber,
    }));
    return result;
  }

  /**
   * The total cumulative revenue for the parking lot. The parking rate is paid when the car leaves, it does not matter how long the car stays in the spot.
   * @returns {number}
   *  the total revenue for the parking lot.
   */
  get totalRevenue() {
    return this.revenue;
  }
}

module.exports = ParkingLot;
