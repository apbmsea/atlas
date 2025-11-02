import type { Preview, Decorator, StoryContext, StoryFn } from '@storybook/react';
import { ThemeProvider } from '../src/providers/ThemeProdiver';
import '../src/styles/global.css';

export const decorators: Decorator[] = [
  (Story: StoryFn, context: StoryContext) => {
    const theme = context.globals.theme === 'dark' ? 'dark' : 'light';

    return (
      <ThemeProvider key={theme} initialTheme={theme}>
        {Story({}, context)}
      </ThemeProvider>
    );
  },
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        showName: true,
      },
    },
  },
};

export default preview;
