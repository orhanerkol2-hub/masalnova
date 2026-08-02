'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');

const buildDirectory = process.argv[2];
if (!buildDirectory) {
  throw new Error('The compiled core directory is required.');
}

const { getDifficulty } = require(
  path.join(buildDirectory, 'core', 'DifficultyCurve.js'),
);
const { GamePhase, GameSession } = require(
  path.join(buildDirectory, 'core', 'GameSession.js'),
);
const { HighScoreStore } = require(
  path.join(buildDirectory, 'core', 'HighScoreStore.js'),
);
const {
  getStarObstacleSafetyDistance,
  hasHorizontalClearance,
} = require(
  path.join(buildDirectory, 'core', 'SpawnSafety.js'),
);
const { getNextJumpVelocity } = require(
  path.join(buildDirectory, 'core', 'JumpRules.js'),
);

function testSessionLifecycle() {
  const session = new GameSession();
  assert.equal(session.phase, GamePhase.Menu);
  assert.equal(session.lives, 3);

  session.startNewRun();
  session.tick(2.5);
  assert.equal(session.elapsedSeconds, 2.5);
  assert.equal(session.collectStar(), true);
  assert.equal(session.score, 10);

  assert.equal(session.pause(), true);
  session.tick(5);
  assert.equal(session.elapsedSeconds, 2.5);
  assert.equal(session.collectStar(), false);
  assert.equal(session.resume(), true);

  assert.equal(session.hitObstacle(), true);
  assert.equal(session.hitObstacle(), true);
  assert.equal(session.lives, 1);
  assert.equal(session.hitObstacle(), true);
  assert.equal(session.phase, GamePhase.GameOver);
  assert.equal(session.hitObstacle(), false);
}

function testDifficultyBounds() {
  const start = getDifficulty(0);
  const midpoint = getDifficulty(7.5);
  const later = getDifficulty(60);
  const farFuture = getDifficulty(60 * 60);

  assert.equal(start.level, 1);
  assert.equal(midpoint.level, 1);
  assert.equal(midpoint.scrollSpeed, 377);
  assert.ok(Math.abs(midpoint.obstacleInterval - 2.19) < 1e-9);
  assert.ok(Math.abs(midpoint.starInterval - 1.0525) < 1e-9);
  assert.ok(later.level > start.level);
  assert.ok(later.scrollSpeed > start.scrollSpeed);
  assert.ok(later.obstacleInterval < start.obstacleInterval);
  assert.ok(later.starInterval < start.starInterval);
  assert.equal(farFuture.scrollSpeed, 700);
  assert.equal(farFuture.obstacleInterval, 1.12);
  assert.equal(farFuture.starInterval, 0.62);
}

function testHighScorePersistence() {
  const data = new Map();
  const storage = {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
  };
  const store = new HighScoreStore(storage, 'score');

  assert.equal(store.read(), 0);
  assert.equal(store.commitIfHigher(120.9), 120);
  assert.equal(store.commitIfHigher(80), 120);
  assert.equal(store.read(), 120);

  const unavailable = new HighScoreStore(
    {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
    },
    'score',
  );
  assert.equal(unavailable.read(), 0);
  assert.equal(unavailable.commitIfHigher(50), 50);
}

function testSpawnSafety() {
  // iPhone portrait starts at 360 * 0.64 = 230.4 design units/s.
  assert.equal(getStarObstacleSafetyDistance(230.4), 230);
  assert.equal(getStarObstacleSafetyDistance(360), 259.2);
  assert.equal(getStarObstacleSafetyDistance(1000), 420);

  assert.equal(hasHorizontalClearance(500, [270], 230), true);
  assert.equal(hasHorizontalClearance(500, [271], 230), false);
  assert.equal(hasHorizontalClearance(500, [], 230), true);
  assert.equal(hasHorizontalClearance(Number.NaN, [], 230), false);
}

function testTripleJumpRules() {
  assert.equal(getNextJumpVelocity(0, 0), 790);
  assert.equal(getNextJumpVelocity(50, 1), 620);
  assert.equal(getNextJumpVelocity(790, 1), 880);
  assert.equal(getNextJumpVelocity(920, 2), 960);
  assert.equal(getNextJumpVelocity(0, 3), null);
  assert.equal(getNextJumpVelocity(Number.NaN, 0), null);
}

testSessionLifecycle();
testDifficultyBounds();
testHighScorePersistence();
testSpawnSafety();
testTripleJumpRules();

console.log(
  'Core tests passed: session, difficulty, high score, spawn safety, triple jump.',
);
