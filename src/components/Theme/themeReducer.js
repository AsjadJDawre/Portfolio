// themeReducer.js
export const themeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { darkMode: !state.darkMode };
    case 'SET_DARK':
      return { darkMode: true };
    case 'SET_LIGHT':
      return { darkMode: false };
    default:
      return state;
  }
};
