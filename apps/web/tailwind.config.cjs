const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    '../../packages/ion/src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        bungee: ['Bungee', ...defaultTheme.fontFamily.sans],
        inter: ['Inter Variable', 'Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          focus: 'var(--primary-focus)',
          darkest: 'var(--primary-darkest)',
          foreground: 'var(--primary-foreground)',
          darker: 'var(--primary-darker)',
          dark: 'var(--primary-dark)',
          DEFAULT: 'var(--primary-base)',
          light: 'var(--primary-light)',
          lighter: 'var(--primary-lighter)',
          lightest: 'var(--primary-lightest)',
        },
        secondary: {
          focus: 'var(--secondary-focus)',
          darkest: 'var(--secondary-darkest)',
          foreground: 'var(--secondary-foreground)',
          darker: 'var(--secondary-darker)',
          dark: 'var(--secondary-dark)',
          DEFAULT: 'var(--secondary-base)',
          light: 'var(--secondary-light)',
          lighter: 'var(--secondary-lighter)',
          lightest: 'var(--secondary-lightest)',
        },
        danger: {
          focus: 'var(--danger-focus)',
          darkest: 'var(--danger-darkest)',
          foreground: 'var(--danger-foreground)',
          darker: 'var(--danger-darker)',
          dark: 'var(--danger-dark)',
          DEFAULT: 'var(--danger-base)',
          light: 'var(--danger-light)',
          lighter: 'var(--danger-lighter)',
          lightest: 'var(--danger-lightest)',
        },
        state: {
          success: 'var(--state-success)',
          foreground: 'var(--state-foreground)',
          warning: 'var(--state-warning)',
          error: 'var(--state-error)',
          information: 'var(--state-information)',
          away: 'var(--state-away)',
          feature: 'var(--state-feature)',
          neutral: 'var(--state-neutral)',
          verified: 'var(--state-verified)',
        },
        soft: {
          DEFAULT: 'var(--soft)',
          foreground: 'var(--soft-foreground)',
          stroke: 'var(--soft-stroke)',
        },
        weak: {
          DEFAULT: 'var(--weak)',
          foreground: 'var(--weak-foreground)',
          stroke: 'var(--weak-stroke)',
        },
        sub: {
          DEFAULT: 'var(--sub)',
          foreground: 'var(--sub-foreground)',
          stroke: 'var(--sub-stroke)',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        tremor: {
          brand: {
            faint: 'var(--primary-lightest)',
            muted: 'var(--primary-lighter)',
            subtle: 'var(--primary-light)',
            DEFAULT: 'var(--primary-base)',
            emphasis: 'var(--primary-dark)',
            inverted: 'var(--primary-foreground)',
          },
          background: {
            muted: 'var(--weak)',
            subtle: 'var(--soft)',
            DEFAULT: 'var(--background)',
            emphasis: 'var(--sub)',
          },
          border: {
            DEFAULT: 'var(--sub-stroke)',
          },
          ring: {
            DEFAULT: 'var(--primary-base)',
          },
          content: {
            subtle: 'var(--weak-foreground)',
            DEFAULT: 'var(--soft-foreground)',
            emphasis: 'var(--sub-foreground)',
            strong: 'var(--foreground)',
            inverted: 'var(--background)',
          },
        },
        coolblue: '#0ea5e9',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // primary: {
        //   DEFAULT: 'hsl(var(--primary))',
        //   foreground: 'hsl(var(--primary-foreground))',
        // },
        // secondary: {
        //   DEFAULT: 'hsl(var(--secondary))',
        //   foreground: 'hsl(var(--secondary-foreground))',
        // },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        error: {
          DEFAULT: 'hsl(var(--error))',
          foreground: 'hsl(var(--error-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      boxShadow: {
        low: '0px 1px 1px 0px rgba(0, 0, 0, 0.07), 0px 1px 2px 0px rgba(0, 0, 0, 0.08),0px 2px 2px 0px rgba(0, 0, 0, 0.1), 0px 0px 8px 0px rgba(0, 0, 0, 0.05)',
        medium:
          '0px 1px 1px 0px rgba(0, 0, 0, 0.05), 0px 2px 2px 0px rgba(0, 0, 0, 0.05),0px 5px 5px 0px rgba(0, 0, 0, 0.05), 0px 10px 10px 0px rgba(0, 0, 0, 0.05), 0px 0px 8px 0px rgba(0, 0, 0, 0.05)',
        high: '0px 2px 4px 0px rgba(0, 0, 0, 0.03), 0px 6px 6px 0px rgba(0, 0, 0, 0.03),0px 15px 20px 0px rgba(0, 0, 0, 0.03), 0px 30px 40px 0px rgba(0, 0, 0, 0.03),0px 40px 70px 0px rgba(0, 0, 0, 0.03), 0px 4px 30px 0px rgba(0, 0, 0, 0.03), 0px 0px 8px 0px rgba(0, 0, 0, 0.03)',
      },
      borderRadius: {
        'radius-none': 'var(--radius-none)',
        'radius-xs': 'var(--radius-xs)',
        'radius-sm': 'var(--radius-sm)',
        radius: 'var(--radius-base)',
        'radius-md': 'var(--radius-md)',
        'radius-lg': 'var(--radius-lg)',
        'radius-full': 'var(--radius-full)',
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      fontSize: {
        'tremor-label': [
          '0.75rem',
          {
            lineHeight: '1rem',
          },
        ],
        'tremor-default': [
          '0.875rem',
          {
            lineHeight: '1.25rem',
          },
        ],
        'tremor-title': [
          '1.125rem',
          {
            lineHeight: '1.75rem',
          },
        ],
        'tremor-metric': [
          '1.875rem',
          {
            lineHeight: '2.25rem',
          },
        ],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--kb-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--kb-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    ...['primary', 'secondary', 'danger'].flatMap((customColor) => [
      ...[
        'lightest',
        'lighter',
        'light',
        '',
        'dark',
        'darker',
        'darkest',
      ].flatMap((shade) => [
        `bg-${customColor}${shade ? `-${shade}` : ''}`,
        `border-${customColor}${shade ? `-${shade}` : ''}`,
        `hover:bg-${customColor}${shade ? `-${shade}` : ''}`,
        `hover:border-${customColor}${shade ? `-${shade}` : ''}`,
        `hover:text-${customColor}${shade ? `-${shade}` : ''}`,
        `active:bg-${customColor}${shade ? `-${shade}` : ''}`,
        `active:border-${customColor}${shade ? `-${shade}` : ''}`,
        `active:text-${customColor}${shade ? `-${shade}` : ''}`,
        `fill-${customColor}${shade ? `-${shade}` : ''}`,
        `ring-${customColor}${shade ? `-${shade}` : ''}`,
        `stroke-${customColor}${shade ? `-${shade}` : ''}`,
        `text-${customColor}${shade ? `-${shade}` : ''}`,
        `text-${customColor}-foreground`,
      ]),
      `fill-${customColor}`,
      `ring-${customColor}`,
      `stroke-${customColor}`,
      `text-${customColor}`,
      `ui-selected:bg-${customColor}`,
      `ui-selected:border-${customColor}`,
      `ui-selected:text-${customColor}`,
    ]),
  ],
  plugins: [],
};
