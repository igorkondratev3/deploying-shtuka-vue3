export const goBack = (window, router) => {
  if (window.history.state.back) {
    window.history.back();
  } else {
    router.push({ path: '/' });
  }
};
