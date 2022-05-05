import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Cancel } from 'iconoir-react';
import Slide from '@material-ui/core/Slide';
import ButtonLink from 'components/ButtonLink';

const styles = {
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  },
  imgContainer: {
    position: 'relative',
    flex: 1,
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%'
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ImgDialog extends React.Component {
  state = {
    open: false,
    email: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        fullScreen
        open={!!this.props.img}
        onClose={this.props.onClose}
        TransitionComponent={Transition}
      >
        <div className="space-y-4">
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.props.onClose} aria-label="Close">
                <Cancel strokeWidth={1.6} aria-hidden="true" />
              </IconButton>

              <Typography variant="title" color="inherit" className={classes.flex}>
                Превью будущей картины
              </Typography>
            </Toolbar>
          </AppBar>

          <div className={classes.imgContainer}>
            <img src={this.props.img} alt="Cropped" className={classes.img} />
          </div>

          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <ButtonLink
                href={
                  this.props.img ? this.props.img.replace('preview.jpg', 'with-colors.png') : '/'
                }
                buttonType="primary-outline"
                attrs={{
                  target: '_blank',
                  rel: 'noopener noreferrer'
                }}
              >
                Расскраска в цвете
              </ButtonLink>

              <ButtonLink
                href={
                  this.props.img ? this.props.img.replace('preview.jpg', 'with-borders.svg') : '/'
                }
                buttonType="primary-outline"
                attrs={{
                  target: '_blank',
                  rel: 'noopener noreferrer'
                }}
              >
                Бессцветная расскраска (SVG)
              </ButtonLink>

              <ButtonLink
                href={this.props.img ? this.props.img.replace('preview.jpg', 'guide.png') : '/'}
                buttonType="primary-outline"
                attrs={{
                  target: '_blank',
                  rel: 'noopener noreferrer'
                }}
              >
                Пронумерованные цвета
              </ButtonLink>
            </div>

            <span className="font-medium text-zinc-400">или отправить инструкцию на почту</span>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <input
                type="email"
                value={this.state.email}
                onChange={(event) => {
                  this.setState({ email: event.target.value });
                }}
                className="rounded-md border border-gray-300 p-4 text-xl font-semibold uppercase shadow-sm placeholder:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="foo@example.com"
              />

              <button
                type="button"
                className="button-secondary px-4"
                onClick={() => {
                  fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      email: this.state.email,
                      preview: `https://colorfield.denis-avakov.ru/output/${imageName}-preview.jpg`,
                      guide: `https://colorfield.denis-avakov.ru/output/${imageName}-guide.png`,
                      withColors: `https://colorfield.denis-avakov.ru/output/${imageName}-with-colors.png`,
                      withBorders: `https://colorfield.denis-avakov.ru/output/${imageName}-with-borders.svg`
                    })
                  });

                  this.setState({ email: '' });
                }}
              >
                отправить
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ImgDialog);
