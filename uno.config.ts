import { defineConfig } from 'unocss/vite';
import presetUno from 'unocss/preset-uno';
import presetIcons from 'unocss/preset-icons';
import { icons as antdIcons } from '@iconify-json/ant-design';
const antdIconNames = Object.keys(antdIcons.icons).map(
  (iconName) => `i-${antdIcons.prefix}:${iconName}`,
);

export default defineConfig({
  exclude: ['node_modules', 'dist', '.git', '.husky', '.vscode', 'public', 'build', 'mock'],
  presets: [
    presetUno({ dark: 'class' }),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
      },
    }),
  ],
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-center': 'flex justify-center items-center',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'fixed-lt': 'fixed left-0 top-0',
    'fixed-center': 'fixed-lt flex-center w-full h-full',
    'transition-base': 'transition-all duration-300 ease-in-out',
  },
  theme: {
    colors: {
      primary: 'var(--primary-color)',
      primary_hover: 'var(--primary-color-hover)',
      primary_pressed: 'var(--primary-color-pressed)',
      primary_active: 'var(--primary-color-active)',
      info: 'var(--info-color)',
      info_hover: 'var(--info-color-hover)',
      info_pressed: 'var(--info-color-pressed)',
      info_active: 'var(--info-color-active)',
      success: 'var(--success-color)',
      success_hover: 'var(--success-color-hover)',
      success_pressed: 'var(--success-color-pressed)',
      success_active: 'var(--success-color-active)',
      warning: 'var(--warning-color)',
      warning_hover: 'var(--warning-color-hover)',
      warning_pressed: 'var(--warning-color-pressed)',
      warning_active: 'var(--warning-color-active)',
      error: 'var(--error-color)',
      error_hover: 'var(--error-color-hover)',
      error_pressed: 'var(--error-color-pressed)',
      error_active: 'var(--error-color-active)',
      dark: '#18181c',
    },
  },
  safelist: [...'prose prose-sm m-auto text-left'.split(' '), ...antdIconNames],
});
