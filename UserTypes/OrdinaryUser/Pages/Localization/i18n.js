// i18n.js
import i18n from 'i18n-js';
import { Platform } from 'react-native';
//import * as Localization from 'expo-localization';

import {en, fr } from '../../../../Redux/Translation/Languages'


i18n.translations = {
  en,
  fr,
};

i18n.fallbacks = true;
i18n.locale = 'en'; 
export default i18n;
