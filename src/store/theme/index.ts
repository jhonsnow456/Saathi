import { atom, useRecoilState } from 'recoil';
import { ThemeMode } from '../../types';
import { themePair } from '../../config';

const themeModeState = atom<ThemeMode>({
  key: 'themeModeState',
  default: 'dark',
});

function useTheme(): [ThemeMode, { toggle: () => void }] {
  const [themeMode, setThemeMode] = useRecoilState(themeModeState);

  const toggle = () => {
    const newMode: ThemeMode = themeMode === themePair[0] ? themePair[1] : themePair[0];
    setThemeMode(newMode);
    localStorage.setItem('theme-mode', newMode);
  };

  return [themeMode, { toggle }];
}

function useIsDarkMode(): boolean {
  const [themeMode] = useTheme();
  return themeMode === 'dark';
}

function setTheme(mode: ThemeMode): void {
  localStorage.setItem('theme-mode', mode);
}

export { themeModeState, setTheme };
export default useTheme;
export { useIsDarkMode };
