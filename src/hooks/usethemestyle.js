import useThemes from './useTheme';

const useThemedStyles = styles => {
    const theme = useThemes();
    return styles(theme);
};

export default useThemedStyles;