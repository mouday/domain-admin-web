import hljs from 'highlight.js/lib/core'

hljs.addPlugin({
  'before:highlightBlock': ({  el, result }) => {
    // console.log('before:highlight')
    console.log('before:highlightBlock')
  },

  'after:highlightElement': ({ el, result }) => {
    // move the language from the result into the dataset
    console.log('after:highlightElement')
    // el.dataset.language = result.language
    // console.log(el)
    // console.log(result)
  },

  'after:highlight': (result) => {
    // console.log(result)
  },
})

export const highlight = hljs.highlight
