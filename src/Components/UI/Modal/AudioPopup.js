import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
// import ReactAudioPlayer from 'react-audio-player';
import CloseIcon from '@material-ui/icons/Close';
// import AudioPlayer from 'react-audio-player';
import {makeStyles} from "@material-ui/styles";
import {createTheme} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import * as cdrActions from "../../../store/actions/cdr";
import ReactAudioPlayer from 'react-audio-player';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const defaultTheme = createTheme();
    const dispatchCdr = useDispatch();
    const pbxSetup = useSelector((state) => state);
    const [audio, setAudio] = React.useState("");
    const [active, isActive] = React.useState(false);
    React.useEffect(() => {
        dispatchCdr(cdrActions.getCdrUrl(pbxSetup.auth.token, props.activeCdr.id));
    }, []);
    React.useEffect(() => {
       if(pbxSetup.cdr.audioUrl){
           setAudio(`http://172.28.14.12/pbx_bakend/public/uploads/${pbxSetup.cdr.audioUrl}.wav`)
       }

    }, [pbxSetup.cdr.audioUrl]);
    const useStyles = makeStyles((theme) => ({
        wrap_121: {
            '&>div': {
                width: "50%"
            }, '&>div >span:first-child': {
                color: "#000", paddingRight: "5px"

            }, '&>div >span:last-child': {
                color: "#651fff"
            }, '&': {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                marginBottom: "25px",
                fontSize: "18px",
                position: "relative"
            }
        }
    }), {defaultTheme},);
    const classes = useStyles();
    const onCanceled=()=>{
        props.onCanceled();
        setAudio("");
    }


    return (<div>
        <Dialog
            maxWidth="md"
            fullWidth={true}
            open={props.active}
            onClose={onCanceled}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <CloseIcon onClick={onCanceled}
                       style={{position: "absolute", right: "15px", color: "#BABABA", cursor: "pointer"}}/>
            <DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <div>
                        <div className={classes.wrap_121}>
                            <div>
                <span>
                    Call Date:
                </span>
                                <span>
        {props.activeCdr.calldate}
                </span>
                            </div>
                            <div>
                <span>
                    Duration:
                </span>
                                <span>
        {props.activeCdr.billsec}
                </span>
                            </div>
                            <div>
                <span>
                    Extension:
                </span>
                                <span>
        {props.activeCdr.source}
                </span>
                            </div>
                            <div>
                <span>
                    Destination:
                </span>
                                <span>
        {props.activeCdr.destination}
                </span>
                            </div>
                        </div>
                        <ReactAudioPlayer style={{width:"100%"}}
                            // style={{ width: "300px" }}
                            // layout="horizontal"
                            src={audio}
                            autoPlay
                            controls
                            // other props here
                        />
                    </div>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    </div>);
}