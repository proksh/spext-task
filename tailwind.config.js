module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: '#ffffff',
      black: '#000000',
      brand: '#e2ddff',
      brandLight: '#e1deea',
      grayLight: '#f8f8f8',
      gray100: '#eeeeee',
      gray200: '#dedde3',
    },
    maxWidth: {
      '6xl': '1140px',
    },
    spacing: {
      0: '0',
      4: '4px',
      6: '6px',
      8: '8px',
      10: '10px',
      12: '12px',
      16: '16px',
      20: '20px',
      24: '24px',
      28: '28px',
      32: '32px',
      40: '40px',
      48: '48px',
      56: '56px',
      64: '64px',
      72: '72px',
      80: '80px',
      88: '88px',
      96: '96px',
      104: '104px',
      112: '112px',
      120: '120px',
      200: '200px',
      208: '208px',
      216: '216px',
      224: '224px',
      232: '232px',
      240: '240px',
      1140: '1140px',
      'full': '100%',
    },
    textColor: {
      gray: '#aeaeae',
      light: '#beb7c0',
      medium: '#aa9bbe',
      dark: '#86748d',
    },
    boxShadow: {
      reg3: "0px 40px 66px rgba(65, 44, 100, 0.3)",
      reg5: "26px 20px 53px rgba(54, 48, 116, 0.3)",
      brand4:
        "3px 3px 6.5px rgba(37, 5, 57, 0.51), inset 6.5px 6.5px 10px rgba(255, 255, 255, 0.2)",
      neo1: "-3px -3px 5px #FFFFFF, 3px 3px 3px rgba(0, 0, 0, 0.03), inset 3px 3px 3px rgba(0, 0, 0, 0.02), inset -3px -3px 6px #FFFFFF",
      neo2:
        "-6px -6px 10px #FFFFFF, 6px 6px 6px rgba(0, 0, 0, 0.05), inset 6px 6px 6px rgba(0, 0, 0, 0.05), inset -6px -6px 13px #FFFFFF",
    },
    cursor: {
      "ew-resize": "ew-resize"
    },
    fontSize: {
      caption: "12px",
      body: "16px",
      subtitle: "22px",
    },
    borderRadius: {
      '20': '20px',
      '26': '26px',
      '40': '40px',
      'full': '9999px',
    },
    extend: {
      gridTemplateColumns: {
        '22': 'repeat(22, minmax(0, 1fr))',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
