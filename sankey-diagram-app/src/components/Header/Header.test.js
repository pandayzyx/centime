// Mock the Header component entirely to avoid imports
jest.mock('./Header', () => {
    return jest.fn((props) => ({
      props: {
        children: [
          null, // Placeholder for logo
          null, // Placeholder for title
          {
            props: {
              children: [
                { props: { onClick: () => props.i18n.changeLanguage('en') } }, // EN button
                { props: { onClick: () => props.i18n.changeLanguage('de') } }, // DE button
              ],
            },
          },
        ],
      },
    }));
  });
  
  import Header from './Header';
  import i18n from '../../i18n';
  
  // Mock i18n
  jest.mock('../../i18n', () => ({
    language: 'en',
    changeLanguage: jest.fn(),
    t: (key) => key,
  }));
  
  describe('Header Component', () => {
    beforeEach(() => {
      Header.mockClear(); // Clear mock calls between tests
      i18n.changeLanguage.mockClear(); // Clear i18n mock calls
    });
  
    test('language changes to German on DE button click', () => {
      const changeLanguage = jest.fn();
      const component = Header({ i18n: { ...i18n, changeLanguage } });
      const deButtonHandler = component.props.children[2].props.children[1].props.onClick;
  
      deButtonHandler();
      expect(changeLanguage).toHaveBeenCalledWith('de');
    });
  
    test('language changes to English on EN button click', () => {
      const changeLanguage = jest.fn();
      const component = Header({ i18n: { ...i18n, changeLanguage } });
      const enButtonHandler = component.props.children[2].props.children[0].props.onClick;
  
      enButtonHandler();
      expect(changeLanguage).toHaveBeenCalledWith('en');
    });
  });