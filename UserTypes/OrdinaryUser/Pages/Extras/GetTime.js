// Your utility file (e.g., utils.js)

import { useLocalization } from "../Localization/LocalizationContext";


const getFormattedDate = (locale) => {
  const currentTime = new Date();

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return currentTime.toLocaleDateString(locale, options);
};

export const formattedDate = () => {
  const { locale } = useLocalization(); 
  return getFormattedDate(locale);
};
