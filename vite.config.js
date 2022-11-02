import { sveltekit } from '@sveltejs/kit/vite'
import Unocss from 'unocss/vite'
import { extractorSvelte } from '@unocss/core'
import presetUno from '@unocss/preset-uno'
import presetWebFonts from '@unocss/preset-web-fonts'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'
import presetIcons from '@unocss/preset-icons'

const config = {
  plugins: [
    Unocss({
      presets: [
        presetUno(),
        presetIcons({}),
        presetWebFonts({
          provider: 'google', // default provider
          fonts: {
            // these will extend the default theme
            mono: ['Fira Code', 'Fira Mono:400,700'],
          },
        }),
      ],
      extractors: [extractorSvelte],
      transformers: [transformerVariantGroup(), transformerDirectives()],
    }),
    sveltekit(),
  ],
}

export default config
