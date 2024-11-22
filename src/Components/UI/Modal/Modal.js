import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ReactAudioPlayer from 'react-audio-player';
import CloseIcon from '@material-ui/icons/Close';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    return (<div>
            <Dialog
                maxWidth="md"
                fullWidth={true}
                open={props.active}
                onClose={props.onCanceled}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <CloseIcon onClick={props.onCanceled} style={{position:"absolute",right:"15px",color:"#BABABA",cursor:"pointer"}}/>
                <DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {props.content ? <props.content/> : null}
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </div>);
}