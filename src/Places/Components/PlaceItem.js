import React, { useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Spinner from '../../Shared/Components/UI Element/Spinner';
import Backdrop from '../../Shared/Components/Backdrop/Backdrop';
import { AuthContext } from '../../Shared/Contexts/Authentication-Context';
import Modal from '../../Shared/Components/Modal/Modal';
import classes from './PlaceItem.module.css';

const PlaceItem = props => {
    const dispatchPlaceDeleted = useDispatch()
    const Authenticated = useContext(AuthContext);
    const uid = useParams().uid;
    const [deleting, setDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const showDeleteModalhandler = () => {
        setShowDeleteModal(!showDeleteModal);
    }
    const deletePlaceHandler = async () => {
        setDeleting(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + Authenticated.userToken
                    },
                });
            const responseData = await response.json();
            if (!response.ok) {
                setDeleting(false);
                showDeleteModalhandler();
                alert(responseData.errorCode + "\n" + responseData.errorMsg)
            }
            else {
                setDeleting(false);
                dispatchPlaceDeleted({ type: 'PLACE_DELETED' })
                props.onDelete();
            }
        } catch (error) { setDeleting(false); alert(error) }
    }

    const deleteModalHeader = <h4>Are You Sure</h4>;
    const deleteModalMain = <React.Fragment>
        <p>Do You Want to proceed For Deleting The Specified Place </p>
        <p style={{ border: '3px solid #c20e0e4c ' }}><b>Caution : </b>Once a Place is Deleted It cannot be Undone</p>
    </React.Fragment>
    return (
        <React.Fragment>
            {showDeleteModal && <Modal
                modalHeader={deleteModalHeader}
                modalMain={deleteModalMain}
                deleteModal={true}
                changeModalState={showDeleteModalhandler}
                deletePlace={deletePlaceHandler}
            />}
            {deleting &&
                <Backdrop>
                    <Spinner />
                    <h2 style={{ color: 'gold' }}>Deleting Place...</h2>
                </Backdrop>
            }
            <li>
                <div className={classes.onePlace}>
                    <div>
                        {/* <img src = {props.image} alt=''/> */}
                        <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt='Place' />
                    </div>
                    <div className={classes.description}>
                        <h4>{props.title}</h4>
                        <h5>{props.address}</h5>
                    </div>
                    <hr />
                    <div className={classes.onePlaceBtns}>

                        <Link to={`/places/${props.id}/detail`}><button className='btn btn-dark m-1' >VIEW DETAIL</button></Link>
                        {Authenticated.userId === uid && (
                            <button className='btn btn-danger m-1' onClick={showDeleteModalhandler}>DELETE</button>
                        )}
                    </div>
                </div>

            </li>

        </React.Fragment>

    )
}

export default PlaceItem;