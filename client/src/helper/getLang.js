import i18n from "i18next";

export const getLanguage = () => {
  console.log({ i18n: i18n.language });
  return (
    i18n.language ||
    (typeof window !== "undefined" && window.localStorage.i18nextLng) ||
    "en"
  );
};
