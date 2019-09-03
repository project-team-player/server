const Bet = require('../models/Bet');
const userController = require('./user-controller');
const gamethreadController = require('./gamethread-controller');

/**
 *
 * @param {Object} bet -> the bet object
 * @param {Object} options -> optional parameters
 * @returns {Object} created object or error message
 */
const createOne = async (bet, options) => {
  /**
   * MVP feature -> prevent user from making duplicate bet by a message
   * thats it. Logic for deleting bets is not in scope of MVPP
   */
  const exist = await Bet.find({
    owner: bet.owner,
    key: bet.key,
    slug: bet.slug
  });
  if (exist.length !== 0) {
    const returnedMsg = {
      serverMessage: `Error. This user already bet ${exist[0].slicesBet} slices on ${exist[0].key} on game ${exist[0].slug}`
    };
    return returnedMsg;
  }
  // make sure the user has enough slices to bet
  const userBetCheck = await userController.readOne({
    _id: bet.owner
  });
  if (userBetCheck.pizzaSlicesWeekly < bet.slicesBet || userBetCheck < 1) {
    // return back to front end with serverMessage.
    const returnedMsg = {
      serverMessage: `User has ${userBetCheck.pizzaSlicesWeekly} slices left to bet, not enough for current bet`
    };
    return returnedMsg;
  }
  // the actual creation of BET if both checks pass
  const returnAwait = await Bet.create(bet);
  const passToSync = {
    _id: returnAwait._id,
    slicesBet: returnAwait.slicesBet,
    key: returnAwait.key,
    slug: returnAwait.slug
  };
  const fromSync = await syncUserAndGamethread(passToSync, 1);
  const returnObj = {
    _id: returnAwait._id,
    slicesBet: returnAwait.slicesBet,
    key: returnAwait.key,
    slug: returnAwait.slug,
    serverMessage: fromSync
  };
  return returnObj;
};

/**
 *
 * @param {Array of Objects} bets -> bets to be inserted
 * @param {Object} options -> optional parameters
 * @returns {Object} returned object
 */
const createMany = async (bets, options) => {
  const returnAwait = await Bet.insertMany(bets, { ordered: false });
  return returnAwait;
};

/**
 *
 * @param {Object} options -> defines parameters to find
 * @returns {Object} -> found object
 */
const readOne = async options => {
  const returnAwait = await Bet.findOne(options).populate(
    'gameThreadReference'
  );
  return returnAwait;
};

/**
 *
 * @param {Options} options -> defines parameters to find
 * @returns {Options} -> found objects
 */
const readMany = async options => {
  const returnAwait = await Bet.find(options);
  return returnAwait;
};

/**
 *
 * @param {ObjectId} bet -> id of the bet object
 * @param {Object} options -> parameters to be updated on.
 * @returns {Object} -> updated object
 */
const updateOne = async (bet, options) => {
  const returnAwait = await Bet.findByIdAndUpdate(
    bet,
    { $set: options },
    { new: true }
  );
  return returnAwait;
};

/**
 *
 * @param {Object} options -> defines the parameters of what Object to delete
 * @returns Response
 */

const deleteOne = async options => {
  const returnAwait = await Bet.deleteOne(options);
  return returnAwait;
};

/**
 * Deletes many users with a batch request
 * @param {Object} options defines objects to delete
 * @returns Response
 */
const deleteMany = async options => {
  const returnAwait = await Bet.deleteMany(options);
  return returnAwait;
};

/**
 *
 * @param {Object} syncRequest -> a reduced bet obj.
 * @param {Integer} analog -> analog switch
 * Synchronizes user and gamethreads on the database
 * accordingly for every bet.
 */
const syncUserAndGamethread = async (syncRequest, analog) => {
  if (analog === 1) {
    const betObj = await Bet.findOne({ _id: syncRequest._id })
      .populate('owner')
      .populate('gameThreadReference');
    const user = betObj.owner;
    const gamethread = betObj.gameThreadReference;
    betsArrayUser = user.bets;
    betsArrayGamethread = gamethread.bets;
    betsArrayUser.push(syncRequest._id);
    betsArrayGamethread.push(syncRequest._id);
    const userUpdate = await userController.updateOne(user._id.toString(), {
      // update the bets array of the user and pizza slices weekly
      bets: betsArrayUser,
      pizzaSlicesWeekly: user.pizzaSlicesWeekly - syncRequest.slicesBet
    });
    const gamethreadUpdate = await gamethreadController.updateOne(
      gamethread._id.toString(),
      {
        // update the bets array of the gamethread.
        bets: betsArrayGamethread
      }
    );
    if (userUpdate && gamethreadUpdate) {
      return `Success betting ${syncRequest.slicesBet} slices on ${syncRequest.key} on game ${syncRequest.slug}. User has ${userUpdate.pizzaSlicesWeekly} slices left.`;
    } else {
      return `Failed to bet on ${syncRequest.slug}`;
    }
  } else if (analog === 2) {
    // TODO
    return `this analog has yet to be implemented`;
  } else {
    return `Hit bottom else`;
  }
};

module.exports = {
  createOne,
  createMany,
  readOne,
  readMany,
  updateOne,
  deleteOne,
  deleteMany
};
