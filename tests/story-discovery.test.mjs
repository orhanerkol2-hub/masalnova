import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isStoryDiscoveryEligible,
  isStoryIndexingEligible,
  isStoryMonetizationEligible,
} from '../src/lib/story-quality.mjs';

const bedtimeStory = {
  status: 'approved',
  substantial: true,
  section: 'masallar',
  categories: ['uyku'],
  words: 520,
  readingTime: 5,
};

test('long approved bedtime stories are discoverable but remain noindex', () => {
  assert.equal(isStoryDiscoveryEligible(bedtimeStory), true);
  assert.equal(isStoryIndexingEligible(bedtimeStory), false);
  assert.equal(isStoryMonetizationEligible({ ...bedtimeStory, indexable: false }), false);
});

test('short bedtime inventory stays outside internal discovery', () => {
  const shortBedtimeStory = { ...bedtimeStory, words: 280, readingTime: 2 };
  assert.equal(isStoryDiscoveryEligible(shortBedtimeStory), false);
});

test('review and retire decisions override internal discovery', () => {
  assert.equal(isStoryDiscoveryEligible({ ...bedtimeStory, qualityTier: 'review' }), false);
  assert.equal(isStoryDiscoveryEligible({ ...bedtimeStory, qualityTier: 'retire' }), false);
});

test('even reviewed core bedtime stories remain ad-free', () => {
  const sectionText = Array.from({ length: 40 }, (_, index) => `özgün${index}`).join(' ');
  const reviewedBedtimeStory = {
    ...bedtimeStory,
    qualityTier: 'core',
    qualityReviewedAt: '2026-08-10',
    parentAgeGuidance: sectionText,
    parentEmotionalNotes: sectionText,
    parentMessage: sectionText,
    parentEverydayUse: sectionText,
    activity: sectionText,
    discussionQuestions: [
      'Ay gecenin sonunda küçük yıldıza hangi seçimi sundu?',
      'Küçük yıldız dinlenmeye karar verirken neyi fark etti?',
      'Hikâyedeki bulut yatağını nasıl farklı tasarlardın?',
    ],
    indexable: true,
  };

  assert.equal(isStoryIndexingEligible(reviewedBedtimeStory), true);
  assert.equal(isStoryMonetizationEligible(reviewedBedtimeStory), false);
});
