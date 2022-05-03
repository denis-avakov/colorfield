export const styles = (theme) => ({
  cropContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    background: '#333',
    [theme.breakpoints.up('sm')]: {
      height: 400
    }
  },
  cropButton: {
    flexShrink: 0
  },
  controls: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  },
  sliderContainer: {
    display: 'flex',
    flex: '1',
    alignItems: 'center'
  },
  slider: {
    padding: '22px 0px',
    marginLeft: 16,
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: '0 16px'
    }
  }
});
