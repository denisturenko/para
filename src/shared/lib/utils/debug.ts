export const infoLog = (str: unknown) => {
  const el = document.getElementById('info');

  if (el) {
    el.innerHTML = String(str);
  }
};
