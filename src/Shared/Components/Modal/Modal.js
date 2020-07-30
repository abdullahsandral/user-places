import React from "react";
import Backdrop from'../Backdrop/Backdrop';
import classes from './Modal.module.css';

const Modal = props =>
{
    
    return (
            <React.Fragment>
            <div onClick = {props.changeModalState}>
                <Backdrop/>
            </div>
            <div className={classes.mapDiv}>
                <header>
                    {props.modalHeader}
                </header>
                <main>
                    {props.modalMain}
                </main>
                <footer>
                    {props.mapModal && <button onClick = {props.changeModalState}>CLOSE</button>}
                    {props.deleteModal && <button onClick = {props.changeModalState}>CANCEL</button>}
                    {props.deleteModal && <button onClick = {props.deletePlace}>DELETE</button>}
                </footer>
            </div>
            </React.Fragment>
            )   
}

export default Modal;