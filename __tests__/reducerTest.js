import subject from '../client/state/reducers/mainReducer.js';

describe('Reducer Tests', () => {
  let state;

  beforeEach(() => {
    state = {
      user: null,
      login_state: null,
      signup_state: null,
      info: null,
      messages: {},
      view: 'userpage',
      user_info: null,
    };
  });

  // - Default State
  describe('default state', () => {
    it('should return true when passed an undefined input', () => {
      expect(subject(undefined, { type: undefined })).toEqual(state);
    });
  });

  // unrecongizable inputs
  describe('unrecognizable inputs', () => {
    it('should not make any changes to state when passed unrecognizable input', () => {
      const action = { type: 'sdfkjdsl;fjdsfkl;jdsf' };
      expect(subject(state, action)).toEqual(state);
    });
  });

  // - LOGIN
  describe('', () => {
    xit('should', () => {
      expect();
    });
  });

  // - SIGNUP
  describe('', () => {
    xit('should', () => {
      expect();
    });
  });

  // - USER_INFO
  describe('', () => {
    xit('should', () => {
      expect();
    });
  });

  // - UPDATE_MESSAGES
  describe('', () => {
    xit('should', () => {
      expect();
    });
  });
});
