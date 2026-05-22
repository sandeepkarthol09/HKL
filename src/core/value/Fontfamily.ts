// import { Platform } from 'react-native';

// const getFont = (filename: string, postscriptName: string) => {
//   return Platform.OS === 'ios' ? postscriptName : filename;
// };

// export default {
//   // *********************************** Google sans FontFamily ************************************
//   GoogleSansBold: getFont('GoogleSans-Bold', 'GoogleSans-Bold'),
//   GoogleSansBoldItalic: getFont('GoogleSans-BoldItalic', 'GoogleSans-BoldItalic'),
//   GoogleSansItalic: getFont('GoogleSans-Italic', 'GoogleSans-Italic'),
//   GoogleSansLight: getFont('GoogleSans-Light', 'GoogleSans-Light'),
//   GoogleSansMedium: getFont('GoogleSans-Medium', 'GoogleSans-Medium'),
//   GoogleSansRegular: getFont('GoogleSans-Regular', 'GoogleSans-Regular'),
//   GoogleSansThin: getFont('GoogleSans-Thin', 'GoogleSans-Thin'),
//   GoogleSansSemiBold: getFont('GoogleSans-SemiBold', 'GoogleSans-SemiBold'),
//   GoogleSansMediumItalic : getFont('GoogleSans-MediumItalic', 'GoogleSans-MediumItalic'),
//   GoogleSans17ptSemiBold : getFont('GoogleSans_17pt-SemiBold', 'GoogleSans_17pt-SemiBold'),
//   GoogleSans17ptRegular : getFont('GoogleSans_17pt-Regular', 'GoogleSans_17pt-Regular'),
// GoogleSans17ptMedium : getFont('GoogleSans_17pt-Medium', 'GoogleSans_17pt-Medium'),
// GoogleSans17ptBold :   'GoogleSans_17pt-Bold',

// };

import { Platform } from 'react-native';

const getFont = (filename: string, postscriptName: string) => {
  return Platform.OS === 'ios' ? postscriptName : filename;
};

const FontFamily = {
  // *********************************** Google Sans ***********************************

  GoogleSansBold: getFont(
    'GoogleSans-Bold',
    'GoogleSans-Bold',
  ),

  GoogleSansBoldItalic: getFont(
    'GoogleSans-BoldItalic',
    'GoogleSans-BoldItalic',
  ),

  GoogleSansItalic: getFont(
    'GoogleSans-Italic',
    'GoogleSans-Italic',
  ),

  GoogleSansMedium: getFont(
    'GoogleSans-Medium',
    'GoogleSans-Medium',
  ),

  GoogleSansMediumItalic: getFont(
    'GoogleSans-MediumItalic',
    'GoogleSans-MediumItalic',
  ),

  GoogleSansRegular: getFont(
    'GoogleSans-Regular',
    'GoogleSans-Regular',
  ),

  GoogleSansSemiBold: getFont(
    'GoogleSans-SemiBold',
    'GoogleSans-SemiBold',
  ),

  GoogleSansSemiBoldItalic: getFont(
    'GoogleSans-SemiBoldItalic',
    'GoogleSans-SemiBoldItalic',
  ),

  // *********************************** Google Sans 17pt ***********************************

  GoogleSans17ptBold: getFont(
    'GoogleSans_17pt-Bold',
    'GoogleSans_17pt-Bold',
  ),

  GoogleSans17ptBoldItalic: getFont(
    'GoogleSans_17pt-BoldItalic',
    'GoogleSans_17pt-BoldItalic',
  ),

  GoogleSans17ptItalic: getFont(
    'GoogleSans_17pt-Italic',
    'GoogleSans_17pt-Italic',
  ),

  GoogleSans17ptMedium: getFont(
    'GoogleSans_17pt-Medium',
    'GoogleSans_17pt-Medium',
  ),

  GoogleSans17ptMediumItalic: getFont(
    'GoogleSans_17pt-MediumItalic',
    'GoogleSans_17pt-MediumItalic',
  ),

  GoogleSans17ptRegular: getFont(
    'GoogleSans_17pt-Regular',
    'GoogleSans_17pt-Regular',
  ),

  GoogleSans17ptSemiBold: getFont(
    'GoogleSans_17pt-SemiBold',
    'GoogleSans_17pt-SemiBold',
  ),

  GoogleSans17ptSemiBoldItalic: getFont(
    'GoogleSans_17pt-SemiBoldItalic',
    'GoogleSans_17pt-SemiBoldItalic',
  ),
};

export default FontFamily;
